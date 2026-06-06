package controller

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"

	"github.com/QuantumNous/new-api/setting"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestParseAlipayCallbackParams_PostIgnoresQueryParams(t *testing.T) {
	gin.SetMode(gin.TestMode)

	body := url.Values{}
	body.Set("app_id", "app_123")
	body.Set("out_trade_no", "ALI123")
	body.Set("total_amount", "1.00")

	req := httptest.NewRequest(http.MethodPost, "/api/alipay/notify?debug=1", strings.NewReader(body.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = req

	params, err := parseAlipayCallbackParams(c)
	require.NoError(t, err)

	assert.Equal(t, "app_123", params["app_id"])
	assert.Equal(t, "ALI123", params["out_trade_no"])
	assert.Equal(t, "1.00", params["total_amount"])
	assert.NotContains(t, params, "debug")
}

func TestParseAlipayCallbackParams_GetReadsQueryParams(t *testing.T) {
	gin.SetMode(gin.TestMode)

	req := httptest.NewRequest(http.MethodGet, "/api/alipay/notify?app_id=app_123&out_trade_no=ALI123", nil)
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Request = req

	params, err := parseAlipayCallbackParams(c)
	require.NoError(t, err)

	assert.Equal(t, "app_123", params["app_id"])
	assert.Equal(t, "ALI123", params["out_trade_no"])
}

func TestValidateAlipayCallbackAppID(t *testing.T) {
	originalAppID := setting.AlipayAppID
	t.Cleanup(func() {
		setting.AlipayAppID = originalAppID
	})

	setting.AlipayAppID = "expected_app"

	require.NoError(t, validateAlipayCallbackAppID(map[string]string{"app_id": "expected_app"}))
	require.Error(t, validateAlipayCallbackAppID(map[string]string{"app_id": "other_app"}))
	require.Error(t, validateAlipayCallbackAppID(map[string]string{}))
}
