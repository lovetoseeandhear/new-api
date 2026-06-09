package media_billing

import "testing"

func TestUpdateMediaRatioByJSONStringParsesConfig(t *testing.T) {
	raw := `{
		"image":{"models":{"flux-pro":{"default_size":"1024x1024","size_ratios":{"1024x1024":1,"2048x2048":4}}}},
		"video":{"models":{"veo-3.1":{"billing_mode":"per_second","default_duration_seconds":8,"default_resolution":"720p","resolution_ratios":{"720p":1,"1080p":1.8}}}}
	}`
	if err := UpdateMediaRatioByJSONString(raw); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	cfg := GetMediaRatioConfig()
	if cfg.Image.Models["flux-pro"].SizeRatios["2048x2048"] != 4 {
		t.Fatalf("image size ratio not loaded")
	}
	if cfg.Video.Models["veo-3.1"].BillingMode != BillingModePerSecond {
		t.Fatalf("video billing mode = %q", cfg.Video.Models["veo-3.1"].BillingMode)
	}
}

func TestFindVideoRulePrefersExactOverRegex(t *testing.T) {
	raw := `{
		"video":{"models":{
			"regex:^veo-.*":{"billing_mode":"per_call","default_resolution":"720p","resolution_ratios":{"720p":1}},
			"veo-3.1":{"billing_mode":"per_second","default_duration_seconds":8,"default_resolution":"1080p","resolution_ratios":{"1080p":2}}
		}}
	}`
	if err := UpdateMediaRatioByJSONString(raw); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	rule, ok := FindVideoRule("veo-3.1", "")
	if !ok {
		t.Fatalf("FindVideoRule() missing")
	}
	if rule.BillingMode != BillingModePerSecond || rule.DefaultResolution != "1080p" {
		t.Fatalf("exact rule not preferred: %+v", rule)
	}
}

func TestUpdateMediaRatioByJSONStringRejectsInvalidJSON(t *testing.T) {
	if err := UpdateMediaRatioByJSONString(`{"video":`); err == nil {
		t.Fatalf("expected invalid JSON error")
	}
}

func TestUpdateMediaRatioByJSONStringNormalizesChannelsAndKeys(t *testing.T) {
	raw := `{
		"image":{
			"channels":{" OpenRouter ":{"size_ratios":{"1024X1024":2}}},
			"models":{"flux-pro":{"size_ratios":{"1024X1024":3}}}
		},
		"video":{
			"models":{"veo-3.1":{"billing_mode":"per_second","default_duration_seconds":8,"default_resolution":"720P","resolution_ratios":{" 1080P ":1.8}}}
		}
	}`
	if err := UpdateMediaRatioByJSONString(raw); err != nil {
		t.Fatalf("UpdateMediaRatioByJSONString() error = %v", err)
	}
	cfg := GetMediaRatioConfig()
	if cfg.Image.Channels["openrouter"].SizeRatios["1024x1024"] != 2 {
		t.Fatalf("channel normalization failed: %+v", cfg.Image.Channels["openrouter"])
	}
	if cfg.Video.Models["veo-3.1"].ResolutionRatios["1080p"] != 1.8 {
		t.Fatalf("resolution normalization failed: %+v", cfg.Video.Models["veo-3.1"])
	}
}
