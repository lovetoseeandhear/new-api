package controller

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/logger"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/service"
	"github.com/QuantumNous/new-api/setting"
	"github.com/QuantumNous/new-api/setting/operation_setting"
	"github.com/QuantumNous/new-api/setting/system_setting"
	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
	"github.com/shopspring/decimal"
)

type AlipayDirectPayRequest struct {
	Amount        int64  `json:"amount"`
	PaymentMethod string `json:"payment_method"`
}

func getAlipayNotifyURL() string {
	if strings.TrimSpace(setting.AlipayNotifyURL) != "" {
		return strings.TrimSpace(setting.AlipayNotifyURL)
	}
	return strings.TrimRight(service.GetCallbackAddress(), "/") + "/api/alipay/notify"
}

func getAlipayReturnURL() string {
	if strings.TrimSpace(setting.AlipayReturnURL) != "" {
		return strings.TrimSpace(setting.AlipayReturnURL)
	}
	return strings.TrimRight(system_setting.ServerAddress, "/") + "/console/topup?show_history=true"
}

func getAlipaySubscriptionReturnURL() string {
	if strings.TrimSpace(setting.AlipaySubscriptionReturnURL) != "" {
		return strings.TrimSpace(setting.AlipaySubscriptionReturnURL)
	}
	return getAlipayReturnURL()
}

func RequestAlipayPay(c *gin.Context) {
	if !isAlipayTopUpEnabled() {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "支付宝支付未启用"})
		return
	}

	var req AlipayDirectPayRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "参数错误"})
		return
	}
	if req.PaymentMethod != model.PaymentMethodAlipayDirect {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "不支持的支付方式"})
		return
	}
	if req.Amount < getMinTopup() {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": fmt.Sprintf("充值数量不能小于 %d", getMinTopup())})
		return
	}

	id := c.GetInt("id")
	group, err := model.GetUserGroup(id, true)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "获取用户分组失败"})
		return
	}
	payMoney := getPayMoney(req.Amount, group)
	if payMoney < 0.01 {
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "充值金额过低"})
		return
	}

	client, err := service.NewAlipayClient()
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("支付宝客户端初始化失败 user_id=%d error=%q", id, err.Error()))
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "支付配置错误"})
		return
	}

	tradeNo := fmt.Sprintf("ALIUSR%dNO%s%d", id, common.GetRandomString(6), time.Now().Unix())
	amount := req.Amount
	if operation_setting.GetQuotaDisplayType() == operation_setting.QuotaDisplayTypeTokens {
		dAmount := decimal.NewFromInt(int64(amount))
		dQuotaPerUnit := decimal.NewFromFloat(common.QuotaPerUnit)
		amount = dAmount.Div(dQuotaPerUnit).IntPart()
	}
	topUp := &model.TopUp{
		UserId:        id,
		Amount:        amount,
		Money:         payMoney,
		TradeNo:       tradeNo,
		PaymentMethod: model.PaymentMethodAlipayDirect,
		CreateTime:    time.Now().Unix(),
		Status:        common.TopUpStatusPending,
	}
	if err := topUp.Insert(); err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("支付宝创建充值订单失败 user_id=%d trade_no=%s amount=%d error=%q", id, tradeNo, req.Amount, err.Error()))
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "创建订单失败"})
		return
	}

	payURL, err := client.BuildPagePayURL(&service.AlipayPagePayArgs{
		OutTradeNo:  tradeNo,
		TotalAmount: strconv.FormatFloat(payMoney, 'f', 2, 64),
		Subject:     fmt.Sprintf("TUC%d", req.Amount),
		Body:        "new-api recharge",
		NotifyURL:   getAlipayNotifyURL(),
		ReturnURL:   getAlipayReturnURL(),
	})
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("支付宝拉起支付失败 user_id=%d trade_no=%s amount=%d error=%q", id, tradeNo, req.Amount, err.Error()))
		_ = model.UpdatePendingTopUpStatus(tradeNo, model.PaymentMethodAlipayDirect, common.TopUpStatusFailed)
		c.JSON(http.StatusOK, gin.H{"message": "error", "data": "拉起支付失败"})
		return
	}

	logger.LogInfo(c.Request.Context(), fmt.Sprintf("支付宝充值订单创建成功 user_id=%d trade_no=%s amount=%d money=%.2f", id, tradeNo, req.Amount, payMoney))
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": gin.H{
			"pay_url": payURL,
		},
	})
}

func AlipayNotify(c *gin.Context) {
	if !isAlipayWebhookEnabled() {
		logger.LogWarn(c.Request.Context(), fmt.Sprintf("支付宝 webhook 被拒绝 reason=webhook_disabled path=%q client_ip=%s", c.Request.RequestURI, c.ClientIP()))
		_, _ = c.Writer.Write([]byte("fail"))
		return
	}

	params, err := parseAlipayCallbackParams(c)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("支付宝 webhook 参数解析失败 path=%q client_ip=%s error=%q", c.Request.RequestURI, c.ClientIP(), err.Error()))
		_, _ = c.Writer.Write([]byte("fail"))
		return
	}

	client, err := service.NewAlipayClient()
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("支付宝 webhook client 初始化失败 path=%q client_ip=%s error=%q", c.Request.RequestURI, c.ClientIP(), err.Error()))
		_, _ = c.Writer.Write([]byte("fail"))
		return
	}
	verified, err := client.Verify(params)
	if err != nil || !verified {
		if err != nil {
			logger.LogWarn(c.Request.Context(), fmt.Sprintf("支付宝 webhook 验签失败 path=%q client_ip=%s error=%q", c.Request.RequestURI, c.ClientIP(), err.Error()))
		} else {
			logger.LogWarn(c.Request.Context(), fmt.Sprintf("支付宝 webhook 验签失败 path=%q client_ip=%s verify=false", c.Request.RequestURI, c.ClientIP()))
		}
		_, _ = c.Writer.Write([]byte("fail"))
		return
	}

	tradeNo := strings.TrimSpace(params["out_trade_no"])
	if tradeNo == "" {
		logger.LogWarn(c.Request.Context(), fmt.Sprintf("支付宝 webhook 缺少 out_trade_no client_ip=%s params=%q", c.ClientIP(), common.GetJsonString(params)))
		_, _ = c.Writer.Write([]byte("fail"))
		return
	}

	tradeStatus := strings.TrimSpace(params["trade_status"])
	totalAmount := strings.TrimSpace(params["total_amount"])
	logger.LogInfo(c.Request.Context(), fmt.Sprintf("支付宝 webhook 验签成功 trade_no=%s trade_status=%s total_amount=%s client_ip=%s", tradeNo, tradeStatus, totalAmount, c.ClientIP()))

	LockOrder(tradeNo)
	defer UnlockOrder(tradeNo)

	switch tradeStatus {
	case "TRADE_SUCCESS", "TRADE_FINISHED":
		if err := fulfillAlipayPaidOrder(c, tradeNo, params); err != nil {
			logger.LogError(c.Request.Context(), fmt.Sprintf("支付宝 webhook 处理成功订单失败 trade_no=%s trade_status=%s client_ip=%s error=%q", tradeNo, tradeStatus, c.ClientIP(), err.Error()))
			_, _ = c.Writer.Write([]byte("fail"))
			return
		}
	case "TRADE_CLOSED":
		if err := expireAlipayOrder(c, tradeNo); err != nil {
			logger.LogError(c.Request.Context(), fmt.Sprintf("支付宝 webhook 处理关闭订单失败 trade_no=%s client_ip=%s error=%q", tradeNo, c.ClientIP(), err.Error()))
			_, _ = c.Writer.Write([]byte("fail"))
			return
		}
	default:
		logger.LogInfo(c.Request.Context(), fmt.Sprintf("支付宝 webhook 忽略事件 trade_no=%s trade_status=%s client_ip=%s", tradeNo, tradeStatus, c.ClientIP()))
	}

	_, _ = c.Writer.Write([]byte("success"))
}

func AlipayReturn(c *gin.Context) {
	c.Redirect(http.StatusFound, getAlipayReturnURL())
}

func SubscriptionAlipayNotify(c *gin.Context) {
	AlipayNotify(c)
}

func SubscriptionAlipayReturn(c *gin.Context) {
	AlipayReturn(c)
}

func parseAlipayCallbackParams(c *gin.Context) (map[string]string, error) {
	if err := c.Request.ParseForm(); err != nil {
		return nil, err
	}
	params := lo.Reduce(lo.Keys(c.Request.Form), func(r map[string]string, t string, i int) map[string]string {
		r[t] = c.Request.Form.Get(t)
		return r
	}, map[string]string{})
	return params, nil
}

func fulfillAlipayPaidOrder(c *gin.Context, tradeNo string, params map[string]string) error {
	payload := common.GetJsonString(params)
	if err := model.CompleteSubscriptionOrder(tradeNo, payload, model.PaymentMethodAlipayDirect); err == nil {
		logger.LogInfo(c.Request.Context(), fmt.Sprintf("支付宝订阅订单处理成功 trade_no=%s client_ip=%s", tradeNo, c.ClientIP()))
		return nil
	} else if !errors.Is(err, model.ErrSubscriptionOrderNotFound) {
		return err
	}

	topUp := model.GetTopUpByTradeNo(tradeNo)
	if topUp == nil {
		return errors.New("充值订单不存在")
	}
	if topUp.PaymentMethod != model.PaymentMethodAlipayDirect {
		return model.ErrPaymentMethodMismatch
	}
	if !isAlipayAmountEqual(params["total_amount"], topUp.Money) {
		return fmt.Errorf("支付金额不一致 callback=%s local=%.2f", params["total_amount"], topUp.Money)
	}
	return model.RechargeAlipayDirect(tradeNo, c.ClientIP())
}

func expireAlipayOrder(c *gin.Context, tradeNo string) error {
	if err := model.ExpireSubscriptionOrder(tradeNo, model.PaymentMethodAlipayDirect); err != nil && !errors.Is(err, model.ErrSubscriptionOrderNotFound) {
		return err
	}
	err := model.UpdatePendingTopUpStatus(tradeNo, model.PaymentMethodAlipayDirect, common.TopUpStatusExpired)
	if err != nil && !errors.Is(err, model.ErrTopUpNotFound) && !errors.Is(err, model.ErrTopUpStatusInvalid) {
		return err
	}
	return nil
}

func isAlipayAmountEqual(callbackAmount string, localAmount float64) bool {
	callbackDecimal, err := decimal.NewFromString(strings.TrimSpace(callbackAmount))
	if err != nil {
		return false
	}
	localDecimal := decimal.NewFromFloat(localAmount)
	return callbackDecimal.Round(2).Equal(localDecimal.Round(2))
}
