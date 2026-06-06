package controller

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/service"
	"github.com/gin-gonic/gin"
)

type SubscriptionAlipayPayRequest struct {
	PlanId int `json:"plan_id"`
}

func SubscriptionRequestAlipayPay(c *gin.Context) {
	if !isAlipayTopUpEnabled() {
		common.ApiErrorMsg(c, "支付宝支付未启用")
		return
	}

	var req SubscriptionAlipayPayRequest
	if err := c.ShouldBindJSON(&req); err != nil || req.PlanId <= 0 {
		common.ApiErrorMsg(c, "参数错误")
		return
	}

	plan, err := model.GetSubscriptionPlanById(req.PlanId)
	if err != nil {
		common.ApiError(c, err)
		return
	}
	if !plan.Enabled {
		common.ApiErrorMsg(c, "套餐未启用")
		return
	}
	if plan.PriceAmount < 0.01 {
		common.ApiErrorMsg(c, "套餐金额过低")
		return
	}

	userId := c.GetInt("id")
	if plan.MaxPurchasePerUser > 0 {
		count, err := model.CountUserSubscriptionsByPlan(userId, plan.Id)
		if err != nil {
			common.ApiError(c, err)
			return
		}
		if count >= int64(plan.MaxPurchasePerUser) {
			common.ApiErrorMsg(c, "已达到该套餐购买上限")
			return
		}
	}

	client, err := service.NewAlipayClient()
	if err != nil {
		common.ApiErrorMsg(c, "支付配置错误")
		return
	}

	tradeNo := fmt.Sprintf("SUBALIUSR%dNO%s%d", userId, common.GetRandomString(6), time.Now().Unix())
	order := &model.SubscriptionOrder{
		UserId:        userId,
		PlanId:        plan.Id,
		Money:         plan.PriceAmount,
		TradeNo:       tradeNo,
		PaymentMethod: model.PaymentMethodAlipayDirect,
		CreateTime:    time.Now().Unix(),
		Status:        common.TopUpStatusPending,
	}
	if err := order.Insert(); err != nil {
		common.ApiErrorMsg(c, "创建订单失败")
		return
	}

	payURL, err := client.BuildPagePayURL(&service.AlipayPagePayArgs{
		OutTradeNo:  tradeNo,
		TotalAmount: strconv.FormatFloat(plan.PriceAmount, 'f', 2, 64),
		Subject:     fmt.Sprintf("SUB:%s", plan.Title),
		Body:        "new-api subscription",
		NotifyURL:   getAlipayNotifyURL(),
		ReturnURL:   getAlipaySubscriptionReturnURL(),
	})
	if err != nil {
		_ = model.ExpireSubscriptionOrder(tradeNo, model.PaymentMethodAlipayDirect)
		common.ApiErrorMsg(c, "拉起支付失败")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": gin.H{
			"pay_url": payURL,
		},
	})
}
