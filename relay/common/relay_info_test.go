package common

import (
	"bytes"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/QuantumNous/new-api/types"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
)

func TestRelayInfoGetFinalRequestRelayFormatPrefersExplicitFinal(t *testing.T) {
	info := &RelayInfo{
		RelayFormat:             types.RelayFormatOpenAI,
		RequestConversionChain:  []types.RelayFormat{types.RelayFormatOpenAI, types.RelayFormatClaude},
		FinalRequestRelayFormat: types.RelayFormatOpenAIResponses,
	}

	require.Equal(t, types.RelayFormat(types.RelayFormatOpenAIResponses), info.GetFinalRequestRelayFormat())
}

func TestRelayInfoGetFinalRequestRelayFormatFallsBackToConversionChain(t *testing.T) {
	info := &RelayInfo{
		RelayFormat:            types.RelayFormatOpenAI,
		RequestConversionChain: []types.RelayFormat{types.RelayFormatOpenAI, types.RelayFormatClaude},
	}

	require.Equal(t, types.RelayFormat(types.RelayFormatClaude), info.GetFinalRequestRelayFormat())
}

func TestRelayInfoGetFinalRequestRelayFormatFallsBackToRelayFormat(t *testing.T) {
	info := &RelayInfo{
		RelayFormat: types.RelayFormatGemini,
	}

	require.Equal(t, types.RelayFormat(types.RelayFormatGemini), info.GetFinalRequestRelayFormat())
}

func TestRelayInfoGetFinalRequestRelayFormatNilReceiver(t *testing.T) {
	var info *RelayInfo
	require.Equal(t, types.RelayFormat(""), info.GetFinalRequestRelayFormat())
}

func TestValidateBasicTaskRequestKeepsMultipartParsedRequest(t *testing.T) {
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	_ = writer.WriteField("prompt", "hello")
	_ = writer.WriteField("model", "sora-2")
	_ = writer.WriteField("size", "720x1280")
	_ = writer.WriteField("width", "720")
	_ = writer.WriteField("height", "1280")
	_ = writer.WriteField("n", "2")
	_ = writer.Close()

	req := httptest.NewRequest(http.MethodPost, "/v1/videos", body)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	ctx, _ := gin.CreateTestContext(httptest.NewRecorder())
	ctx.Request = req

	info := &RelayInfo{}
	err := ValidateBasicTaskRequest(ctx, info, "generate")
	require.Nil(t, err)

	taskReq, getErr := GetTaskRequest(ctx)
	require.NoError(t, getErr)
	require.Equal(t, "hello", taskReq.Prompt)
	require.Equal(t, "sora-2", taskReq.Model)
	require.Equal(t, "720x1280", taskReq.Size)
	require.Equal(t, 720, taskReq.Width)
	require.Equal(t, 1280, taskReq.Height)
	require.Equal(t, 2, taskReq.N)
}
