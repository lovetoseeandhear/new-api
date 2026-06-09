package media_billing

import (
	"testing"

	"github.com/QuantumNous/new-api/dto"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
)

func TestNormalizeSizeAndResolutionFallback(t *testing.T) {
	if got := NormalizeSize("1024 x 1792"); got != "1024x1792" {
		t.Fatalf("NormalizeSize() = %q", got)
	}
	if got := ResolutionFromSize("3840x2160"); got != "4k" {
		t.Fatalf("ResolutionFromSize() = %q", got)
	}
	if got := ResolutionFromSize("1920x1080"); got != "1080p" {
		t.Fatalf("ResolutionFromSize() = %q", got)
	}
}

func TestApplyVideoSpecRatiosReturnsRejectError(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"video":{"models":{"veo-3.1":{"unknown_spec_policy":"reject"}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	_, err := ApplyVideoSpecRatios(relaycommon.TaskSubmitReq{}, "veo-3.1", "")
	if err == nil {
		t.Fatalf("expected reject error")
	}
}

func TestApplyVideoSpecRatiosRejectsUnknownResolution(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"video":{"models":{"veo-3.1":{"unknown_spec_policy":"reject","resolution_ratios":{"720p":1}}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	_, err := ApplyVideoSpecRatios(relaycommon.TaskSubmitReq{
		Resolution: "1440p",
		Size:       "",
		Metadata:   map[string]any{},
	}, "veo-3.1", "")
	if err == nil {
		t.Fatalf("expected reject error")
	}
}

func TestApplyImageSpecRatiosRejectsUnknownSize(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"image":{"models":{"gpt-image-2":{"unknown_spec_policy":"reject","size_ratios":{"1024x1024":1},"quality_ratios":{"hd":2}}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	_, err := ApplyImageSpecRatios(&dto.ImageRequest{
		Size:    "999x999",
		Quality: "hd",
	}, "gpt-image-2", "")
	if err == nil {
		t.Fatalf("expected reject error")
	}
}

func TestApplyImageSpecRatiosRejectsUnknownQuality(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"image":{"models":{"gpt-image-2":{"unknown_spec_policy":"reject","size_ratios":{"1024x1024":1},"quality_ratios":{"standard":1}}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	_, err := ApplyImageSpecRatios(&dto.ImageRequest{
		Size:    "1024x1024",
		Quality: "ultra",
	}, "gpt-image-2", "")
	if err == nil {
		t.Fatalf("expected reject error")
	}
}

func TestApplyVideoSpecRatiosRejectsUnknownSize(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"video":{"models":{"veo-3.1":{"unknown_spec_policy":"reject","size_ratios":{"1280x720":1},"resolution_ratios":{"720p":1}}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	_, err := ApplyVideoSpecRatios(relaycommon.TaskSubmitReq{
		Size: "999x999",
	}, "veo-3.1", "")
	if err == nil {
		t.Fatalf("expected reject error")
	}
}

func TestApplyImageSpecRatiosMultipliesSizeAndQuality(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"image":{"models":{"flux-pro":{"size_ratios":{"1024x1024":2},"quality_ratios":{"hd":3}}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	ratios, err := ApplyImageSpecRatios(&dto.ImageRequest{
		Size:    "1024x1024",
		Quality: "hd",
	}, "flux-pro", "")
	if err != nil {
		t.Fatalf("ApplyImageSpecRatios() error = %v", err)
	}
	if got := ratios["media_image"]; got != 6 {
		t.Fatalf("media_image ratio = %v", got)
	}
}

func TestApplyImageSpecRatiosMatchesOpenRouterChannel(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"image":{"channels":{"openrouter":{"size_ratios":{"1024x1024":2}}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	ratios, err := ApplyImageSpecRatios(&dto.ImageRequest{Size: "1024x1024"}, "any-model", "OpenRouter")
	if err != nil {
		t.Fatalf("ApplyImageSpecRatios() error = %v", err)
	}
	if got := ratios["media_image"]; got != 2 {
		t.Fatalf("media_image ratio = %v", got)
	}
}

func TestApplyVideoSpecRatiosPerSecond(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"video":{"models":{"veo-3.1":{"billing_mode":"per_second","default_duration_seconds":8,"default_resolution":"720p","resolution_ratios":{"720p":1,"1080p":1.8},"size_ratios":{"1920x1080":2}}}}}`); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	ratios, err := ApplyVideoSpecRatios(relaycommon.TaskSubmitReq{
		Size:     "1920x1080",
		Duration: 6,
	}, "veo-3.1", "")
	if err != nil {
		t.Fatalf("ApplyVideoSpecRatios() error = %v", err)
	}
	if got := ratios["media_video"]; got != 2 {
		t.Fatalf("media_video ratio = %v", got)
	}
	if got := ratios["seconds"]; got != 6 {
		t.Fatalf("seconds ratio = %v", got)
	}
}
