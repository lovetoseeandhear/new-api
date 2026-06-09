package media_billing

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/dto"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
)

func ApplyImageSpecRatios(req *dto.ImageRequest, modelName, channelName string) (map[string]float64, error) {
	rule, ok := FindImageRule(modelName, channelName)
	if !ok {
		return nil, nil
	}
	size := imageSpecSize(req)
	quality := strings.ToLower(strings.TrimSpace(req.Quality))
	if quality == "" {
		quality = strings.ToLower(strings.TrimSpace(rule.DefaultQuality))
	}
	if size == "" {
		size = rule.DefaultSize
	}

	if strings.TrimSpace(size) == "" {
		switch strings.ToLower(strings.TrimSpace(rule.UnknownSpecPolicy)) {
		case UnknownSpecReject:
			return nil, fmt.Errorf("image size is required")
		case UnknownSpecIgnore:
			return map[string]float64{}, nil
		default:
			return map[string]float64{}, nil
		}
	}

	ratios := map[string]float64{}
	if ratio, ok := lookupImageRatio(rule, size, quality); ok {
		ratios["media_image"] = ratio
	}
	return ratios, nil
}

func ImagePriceRatio(req *dto.ImageRequest, modelName, channelName string) (float64, bool, error) {
	ratios, err := ApplyImageSpecRatios(req, modelName, channelName)
	if err != nil {
		return 0, false, err
	}
	if len(ratios) == 0 {
		return 0, false, nil
	}
	if ratio, ok := ratios["media_image"]; ok {
		return ratio, true, nil
	}
	return 0, false, nil
}

func ApplyVideoSpecRatios(req relaycommon.TaskSubmitReq, modelName, channelName string) (map[string]float64, error) {
	rule, ok := FindVideoRule(modelName, channelName)
	if !ok {
		return nil, nil
	}
	size := videoSpecSize(req)
	resolution := videoSpecResolution(req, rule)
	if resolution == "" {
		switch strings.ToLower(strings.TrimSpace(rule.UnknownSpecPolicy)) {
		case UnknownSpecReject:
			return nil, fmt.Errorf("video resolution is required")
		case UnknownSpecIgnore:
			resolution = ""
		default:
			resolution = rule.DefaultResolution
		}
	}
	duration := videoSpecDuration(req, rule)
	if duration <= 0 {
		duration = rule.DefaultDurationSeconds
	}

	ratios := map[string]float64{}
	if ratio, ok := lookupVideoRatio(rule, size, resolution); ok {
		ratios["media_video"] = ratio
	}
	if strings.EqualFold(rule.BillingMode, BillingModePerSecond) && duration > 0 {
		ratios["seconds"] = float64(duration)
	}
	return ratios, nil
}

func imageSpecSize(req *dto.ImageRequest) string {
	if req == nil {
		return ""
	}
	if s := strings.TrimSpace(req.Size); s != "" {
		return NormalizeSize(s)
	}
	if s := strings.TrimSpace(requestExtraString(req.Extra, "image_size")); s != "" {
		return NormalizeSize(s)
	}
	if s := strings.TrimSpace(requestExtraString(req.Extra, "imageSize")); s != "" {
		return NormalizeSize(s)
	}
	w, h := requestExtraInt(req.Extra, "width"), requestExtraInt(req.Extra, "height")
	if w > 0 && h > 0 {
		return fmt.Sprintf("%dx%d", w, h)
	}
	if s := strings.TrimSpace(requestExtraString(req.Extra, "size")); s != "" {
		return NormalizeSize(s)
	}
	return ""
}

func videoSpecResolution(req relaycommon.TaskSubmitReq, rule VideoRule) string {
	if s := strings.TrimSpace(req.Size); s != "" {
		if normalizedSize := NormalizeSize(s); normalizedSize != "" {
			if strings.Contains(normalizedSize, "x") {
				return NormalizeResolution(ResolutionFromSize(normalizedSize))
			}
		}
		if normalizedResolution := NormalizeResolution(s); normalizedResolution != "" {
			return normalizedResolution
		}
	}
	if s := strings.TrimSpace(req.Resolution); s != "" {
		return NormalizeResolution(s)
	}
	if s := strings.TrimSpace(metadataString(req.Metadata, "resolution")); s != "" {
		return NormalizeResolution(s)
	}
	if s := strings.TrimSpace(metadataString(req.Metadata, "size")); s != "" {
		if normalizedSize := NormalizeSize(s); normalizedSize != "" {
			return NormalizeResolution(ResolutionFromSize(normalizedSize))
		}
		return NormalizeResolution(s)
	}
	if req.Width > 0 && req.Height > 0 {
		return NormalizeResolution(ResolutionFromSize(fmt.Sprintf("%dx%d", req.Width, req.Height)))
	}
	if w, h := metadataInt(req.Metadata, "width"), metadataInt(req.Metadata, "height"); w > 0 && h > 0 {
		return NormalizeResolution(ResolutionFromSize(fmt.Sprintf("%dx%d", w, h)))
	}
	return NormalizeResolution(rule.DefaultResolution)
}

func videoSpecSize(req relaycommon.TaskSubmitReq) string {
	if size := NormalizeSize(req.Size); size != "" {
		return size
	}
	if req.Width > 0 && req.Height > 0 {
		return fmt.Sprintf("%dx%d", req.Width, req.Height)
	}
	if size := NormalizeSize(metadataString(req.Metadata, "size")); size != "" {
		return size
	}
	if w, h := metadataInt(req.Metadata, "width"), metadataInt(req.Metadata, "height"); w > 0 && h > 0 {
		return fmt.Sprintf("%dx%d", w, h)
	}
	return ""
}

func videoSpecDuration(req relaycommon.TaskSubmitReq, rule VideoRule) int {
	if req.Duration > 0 {
		return req.Duration
	}
	if req.Seconds != "" {
		if v, err := strconv.Atoi(req.Seconds); err == nil && v > 0 {
			return v
		}
	}
	if v := metadataInt(req.Metadata, "duration"); v > 0 {
		return v
	}
	if v := metadataInt(req.Metadata, "seconds"); v > 0 {
		return v
	}
	return rule.DefaultDurationSeconds
}

func lookupImageRatio(rule ImageRule, size, quality string) (float64, bool) {
	size = NormalizeSize(size)
	quality = strings.ToLower(strings.TrimSpace(quality))
	if size != "" && quality != "" && len(rule.SizeQualityOverrides) > 0 {
		if ratio, ok := rule.SizeQualityOverrides[size+":"+quality]; ok {
			return ratio, true
		}
	}
	ratio := 1.0
	matched := false
	if size != "" && len(rule.SizeRatios) > 0 {
		if sizeRatio, ok := rule.SizeRatios[size]; ok {
			ratio *= sizeRatio
			matched = true
		}
	}
	if quality != "" && len(rule.QualityRatios) > 0 {
		if qualityRatio, ok := rule.QualityRatios[quality]; ok {
			ratio *= qualityRatio
			matched = true
		}
	}
	return ratio, matched
}

func lookupVideoRatio(rule VideoRule, size, resolution string) (float64, bool) {
	size = NormalizeSize(size)
	resolution = NormalizeResolution(resolution)
	if size != "" && len(rule.SizeRatios) > 0 {
		if ratio, ok := rule.SizeRatios[size]; ok {
			return ratio, true
		}
	}
	if size != "" && resolution == "" {
		resolution = NormalizeResolution(size)
	}
	if resolution != "" && len(rule.ResolutionRatios) > 0 {
		if ratio, ok := rule.ResolutionRatios[resolution]; ok {
			return ratio, true
		}
	}
	if size != "" {
		fallback := NormalizeResolution(ResolutionFromSize(size))
		if fallback == "" {
			fallback = NormalizeResolution(size)
		}
		if fallback != "" && len(rule.ResolutionRatios) > 0 {
			if ratio, ok := rule.ResolutionRatios[fallback]; ok {
				return ratio, true
			}
		}
	}
	return 1, false
}

func requestExtraString(extra map[string]json.RawMessage, key string) string {
	if len(extra) == 0 {
		return ""
	}
	raw, ok := extra[key]
	if !ok {
		return ""
	}
	var s string
	if err := common.Unmarshal(raw, &s); err == nil {
		return s
	}
	return string(raw)
}

func requestExtraInt(extra map[string]json.RawMessage, key string) int {
	if len(extra) == 0 {
		return 0
	}
	raw, ok := extra[key]
	if !ok {
		return 0
	}
	var i int
	if err := common.Unmarshal(raw, &i); err == nil {
		return i
	}
	var s string
	if err := common.Unmarshal(raw, &s); err == nil {
		if v, err := strconv.Atoi(s); err == nil {
			return v
		}
	}
	return 0
}

func metadataString(metadata map[string]any, key string) string {
	if len(metadata) == 0 {
		return ""
	}
	val, ok := metadata[key]
	if !ok {
		return ""
	}
	switch v := val.(type) {
	case string:
		return v
	case []byte:
		var s string
		if err := common.Unmarshal(v, &s); err == nil {
			return s
		}
	case json.RawMessage:
		var s string
		if err := common.Unmarshal(v, &s); err == nil {
			return s
		}
	}
	return fmt.Sprintf("%v", val)
}

func metadataInt(metadata map[string]any, key string) int {
	if len(metadata) == 0 {
		return 0
	}
	val, ok := metadata[key]
	if !ok {
		return 0
	}
	switch v := val.(type) {
	case int:
		return v
	case float64:
		return int(v)
	case string:
		if parsed, err := strconv.Atoi(v); err == nil {
			return parsed
		}
	case []byte:
		var i int
		if err := common.Unmarshal(v, &i); err == nil {
			return i
		}
	case json.RawMessage:
		var i int
		if err := common.Unmarshal(v, &i); err == nil {
			return i
		}
	}
	return 0
}
