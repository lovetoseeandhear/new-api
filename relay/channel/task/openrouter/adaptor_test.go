package openrouter

import (
	"io"
	"net/http"
	"strings"
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/gin-gonic/gin"
)

func TestOpenRouterModelSlugStripsProviderPrefix(t *testing.T) {
	if got := openRouterModelSlug("openrouter/google/veo-3.1"); got != "google/veo-3.1" {
		t.Fatalf("openRouterModelSlug() = %q", got)
	}
	if got := openRouterModelSlug("google/veo-3.1"); got != "google/veo-3.1" {
		t.Fatalf("openRouterModelSlug() = %q", got)
	}
}

func TestBuildRequestURLHandlesDefaultAndVersionedBaseURL(t *testing.T) {
	adaptor := &TaskAdaptor{baseURL: "https://openrouter.ai/api"}
	got, err := adaptor.BuildRequestURL(nil)
	if err != nil {
		t.Fatalf("BuildRequestURL() error = %v", err)
	}
	if got != "https://openrouter.ai/api/v1/videos" {
		t.Fatalf("BuildRequestURL() = %q", got)
	}

	adaptor.baseURL = "https://openrouter.ai/api/v1"
	got, err = adaptor.BuildRequestURL(nil)
	if err != nil {
		t.Fatalf("BuildRequestURL() error = %v", err)
	}
	if got != "https://openrouter.ai/api/v1/videos" {
		t.Fatalf("BuildRequestURL() = %q", got)
	}
}

func TestBuildRequestBodyUsesSizeAndResolutionSeparately(t *testing.T) {
	gin.SetMode(gin.TestMode)

	t.Run("pixel size uses size only", func(t *testing.T) {
		ctx := newTaskContext(t, relaycommon.TaskSubmitReq{
			Prompt:  "make video",
			Model:   "openrouter/google/veo-3.1",
			Size:    "1280x720",
			Seconds: "6",
		})
		adaptor := &TaskAdaptor{}
		body, err := adaptor.BuildRequestBody(ctx, &relaycommon.RelayInfo{ChannelMeta: &relaycommon.ChannelMeta{ChannelType: constant.ChannelTypeOpenRouter}, OriginModelName: "openrouter/google/veo-3.1"})
		if err != nil {
			t.Fatalf("BuildRequestBody() error = %v", err)
		}
		raw, _ := io.ReadAll(body)
		if !strings.Contains(string(raw), `"size":"1280x720"`) {
			t.Fatalf("request body missing size: %s", raw)
		}
		if strings.Contains(string(raw), `"resolution"`) {
			t.Fatalf("request body unexpectedly contains resolution: %s", raw)
		}
	})

	t.Run("resolution alias uses resolution only", func(t *testing.T) {
		ctx := newTaskContext(t, relaycommon.TaskSubmitReq{
			Prompt:     "make video",
			Model:      "openrouter/google/veo-3.1",
			Size:       "720p",
			Resolution: "",
		})
		adaptor := &TaskAdaptor{}
		body, err := adaptor.BuildRequestBody(ctx, &relaycommon.RelayInfo{ChannelMeta: &relaycommon.ChannelMeta{ChannelType: constant.ChannelTypeOpenRouter}, OriginModelName: "openrouter/google/veo-3.1"})
		if err != nil {
			t.Fatalf("BuildRequestBody() error = %v", err)
		}
		raw, _ := io.ReadAll(body)
		if !strings.Contains(string(raw), `"resolution":"720p"`) {
			t.Fatalf("request body missing resolution: %s", raw)
		}
		if strings.Contains(string(raw), `"size":"`) {
			t.Fatalf("request body unexpectedly contains size: %s", raw)
		}
	})
}

func TestBuildRequestBodyMapsOpenRouterVideoFields(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctx := newTaskContext(t, relaycommon.TaskSubmitReq{
		Prompt:      "make video",
		Size:        "720p",
		Resolution:  "1080p",
		AspectRatio: "16:9",
		Metadata: map[string]any{
			"seed":           "123",
			"generate_audio": true,
			"provider":       map[string]any{"sort": "throughput"},
			"frame_images":   []any{"https://example.com/frame.png"},
		},
	})

	body, err := (&TaskAdaptor{}).BuildRequestBody(ctx, &relaycommon.RelayInfo{ChannelMeta: &relaycommon.ChannelMeta{ChannelType: constant.ChannelTypeOpenRouter}, OriginModelName: "openrouter/google/veo-3.1"})
	if err != nil {
		t.Fatalf("BuildRequestBody() error = %v", err)
	}
	raw, _ := io.ReadAll(body)
	var request createVideoRequest
	if err := common.Unmarshal(raw, &request); err != nil {
		t.Fatalf("unmarshal request body: %v", err)
	}
	if request.Model != "google/veo-3.1" {
		t.Fatalf("model = %q", request.Model)
	}
	if request.Resolution != "1080p" {
		t.Fatalf("resolution = %q", request.Resolution)
	}
	if request.AspectRatio != "16:9" {
		t.Fatalf("aspect ratio = %q", request.AspectRatio)
	}
	if request.Seed == nil || *request.Seed != 123 {
		t.Fatalf("seed = %v", request.Seed)
	}
	if request.GenerateAudio == nil || !*request.GenerateAudio {
		t.Fatalf("generate audio = %v", request.GenerateAudio)
	}
	if request.Provider == nil {
		t.Fatalf("provider missing")
	}
	if request.FrameImages == nil {
		t.Fatalf("frame_images missing")
	}
}

func newTaskContext(t *testing.T, req relaycommon.TaskSubmitReq) *gin.Context {
	t.Helper()
	ctx, _ := gin.CreateTestContext(nil)
	ctx.Request = &http.Request{Header: make(http.Header)}
	ctx.Set("task_request", req)
	return ctx
}
