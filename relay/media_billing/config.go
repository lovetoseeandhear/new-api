package media_billing

import (
	"regexp"
	"strings"
	"sync"

	"github.com/QuantumNous/new-api/common"
)

const (
	OptionKeyMediaRatio = "MediaRatio"

	BillingModePerCall   = "per_call"
	BillingModePerSecond = "per_second"

	UnknownSpecDefault = "default"
	UnknownSpecIgnore  = "ignore"
	UnknownSpecReject  = "reject"
)

type Config struct {
	Image MediaSection[ImageRule] `json:"image,omitempty"`
	Video MediaSection[VideoRule] `json:"video,omitempty"`
}

type MediaSection[T any] struct {
	Global   T            `json:"global,omitempty"`
	Channels map[string]T `json:"channels,omitempty"`
	Models   map[string]T `json:"models,omitempty"`
}

type ImageRule struct {
	DefaultSize          string             `json:"default_size,omitempty"`
	DefaultQuality       string             `json:"default_quality,omitempty"`
	UnknownSpecPolicy    string             `json:"unknown_spec_policy,omitempty"`
	SizeRatios           map[string]float64 `json:"size_ratios,omitempty"`
	QualityRatios        map[string]float64 `json:"quality_ratios,omitempty"`
	SizeQualityOverrides map[string]float64 `json:"size_quality_overrides,omitempty"`
}

type VideoRule struct {
	BillingMode            string             `json:"billing_mode,omitempty"`
	DefaultDurationSeconds int                `json:"default_duration_seconds,omitempty"`
	DefaultResolution      string             `json:"default_resolution,omitempty"`
	UnknownSpecPolicy      string             `json:"unknown_spec_policy,omitempty"`
	ResolutionRatios       map[string]float64 `json:"resolution_ratios,omitempty"`
	SizeRatios             map[string]float64 `json:"size_ratios,omitempty"`
}

type ModelMediaPricing struct {
	Image *ImageRule `json:"image,omitempty"`
	Video *VideoRule `json:"video,omitempty"`
}

var (
	configMu sync.RWMutex
	config   = defaultConfig()
)

func defaultConfig() Config {
	return Config{
		Image: MediaSection[ImageRule]{
			Global:   ImageRule{UnknownSpecPolicy: UnknownSpecDefault},
			Channels: map[string]ImageRule{},
			Models:   map[string]ImageRule{},
		},
		Video: MediaSection[VideoRule]{
			Global:   VideoRule{UnknownSpecPolicy: UnknownSpecDefault},
			Channels: map[string]VideoRule{},
			Models:   map[string]VideoRule{},
		},
	}
}

func DefaultMediaRatioJSONString() string {
	return `{"image":{"models":{}},"video":{"models":{}}}`
}

func UpdateMediaRatioByJSONString(jsonStr string) error {
	if strings.TrimSpace(jsonStr) == "" {
		jsonStr = DefaultMediaRatioJSONString()
	}
	next := defaultConfig()
	if err := common.UnmarshalJsonStr(jsonStr, &next); err != nil {
		return err
	}
	if err := validateConfig(next); err != nil {
		return err
	}
	normalizeConfig(&next)
	configMu.Lock()
	config = next
	configMu.Unlock()
	return nil
}

func GetMediaRatioConfig() Config {
	configMu.RLock()
	defer configMu.RUnlock()
	return config
}

func MediaRatio2JSONString() string {
	cfg := GetMediaRatioConfig()
	b, err := common.Marshal(cfg)
	if err != nil {
		return DefaultMediaRatioJSONString()
	}
	return string(b)
}

func FindImageRule(modelName, channelName string) (ImageRule, bool) {
	cfg := GetMediaRatioConfig()
	return findRule(modelName, channelName, cfg.Image, mergeImageRule, imageRuleConfigured)
}

func FindVideoRule(modelName, channelName string) (VideoRule, bool) {
	cfg := GetMediaRatioConfig()
	return findRule(modelName, channelName, cfg.Video, mergeVideoRule, videoRuleConfigured)
}

func HasVideoModelRule(modelName string) bool {
	cfg := GetMediaRatioConfig()
	if cfg.Video.Models == nil {
		return false
	}
	if _, ok := cfg.Video.Models[modelName]; ok {
		return true
	}
	for key := range cfg.Video.Models {
		if !strings.HasPrefix(key, "regex:") {
			continue
		}
		re, err := regexp.Compile(strings.TrimPrefix(key, "regex:"))
		if err != nil {
			continue
		}
		if re.MatchString(modelName) {
			return true
		}
	}
	return false
}

func GetModelMediaPricing(modelName string) *ModelMediaPricing {
	var out ModelMediaPricing
	if image, ok := FindImageRule(modelName, ""); ok && imageRuleConfigured(image) {
		out.Image = &image
	}
	if video, ok := FindVideoRule(modelName, ""); ok && videoRuleConfigured(video) {
		out.Video = &video
	}
	if out.Image == nil && out.Video == nil {
		return nil
	}
	return &out
}

func findRule[T any](modelName, channelName string, section MediaSection[T], merge func(T, T) T, configured func(T) bool) (T, bool) {
	result := section.Global
	found := configured(result)
	channelName = strings.ToLower(strings.TrimSpace(channelName))
	if channelName != "" && section.Channels != nil {
		if channelRule, ok := section.Channels[channelName]; ok {
			result = merge(result, channelRule)
			found = true
		}
	}
	if section.Models != nil {
		if exact, ok := section.Models[modelName]; ok {
			result = merge(result, exact)
			return result, true
		}
		for key, rule := range section.Models {
			if !strings.HasPrefix(key, "regex:") {
				continue
			}
			re, err := regexp.Compile(strings.TrimPrefix(key, "regex:"))
			if err != nil {
				continue
			}
			if re.MatchString(modelName) {
				result = merge(result, rule)
				return result, true
			}
		}
	}
	return result, found && configured(result)
}

func normalizeConfig(cfg *Config) {
	if cfg.Image.Models == nil {
		cfg.Image.Models = map[string]ImageRule{}
	}
	if cfg.Image.Channels == nil {
		cfg.Image.Channels = map[string]ImageRule{}
	}
	if cfg.Video.Models == nil {
		cfg.Video.Models = map[string]VideoRule{}
	}
	if cfg.Video.Channels == nil {
		cfg.Video.Channels = map[string]VideoRule{}
	}
	cfg.Image.Global = normalizeImageRule(cfg.Image.Global)
	cfg.Video.Global = normalizeVideoRule(cfg.Video.Global)
	for key, rule := range cfg.Image.Channels {
		delete(cfg.Image.Channels, key)
		cfg.Image.Channels[strings.ToLower(strings.TrimSpace(key))] = normalizeImageRule(rule)
	}
	for key, rule := range cfg.Video.Channels {
		delete(cfg.Video.Channels, key)
		cfg.Video.Channels[strings.ToLower(strings.TrimSpace(key))] = normalizeVideoRule(rule)
	}
	for key, rule := range cfg.Image.Models {
		cfg.Image.Models[key] = normalizeImageRule(rule)
	}
	for key, rule := range cfg.Video.Models {
		cfg.Video.Models[key] = normalizeVideoRule(rule)
	}
}

func normalizeImageRule(rule ImageRule) ImageRule {
	rule.DefaultSize = NormalizeSize(rule.DefaultSize)
	rule.DefaultQuality = strings.ToLower(strings.TrimSpace(rule.DefaultQuality))
	rule.UnknownSpecPolicy = normalizeUnknownSpecPolicy(rule.UnknownSpecPolicy)
	rule.SizeRatios = normalizeFloatMap(rule.SizeRatios, NormalizeSize)
	rule.QualityRatios = normalizeFloatMap(rule.QualityRatios, func(key string) string {
		return strings.ToLower(strings.TrimSpace(key))
	})
	rule.SizeQualityOverrides = normalizeSizeQualityOverrides(rule.SizeQualityOverrides)
	return rule
}

func normalizeVideoRule(rule VideoRule) VideoRule {
	rule.BillingMode = strings.ToLower(strings.TrimSpace(rule.BillingMode))
	if rule.BillingMode == "" {
		rule.BillingMode = BillingModePerCall
	}
	rule.DefaultResolution = NormalizeResolution(rule.DefaultResolution)
	rule.UnknownSpecPolicy = normalizeUnknownSpecPolicy(rule.UnknownSpecPolicy)
	rule.ResolutionRatios = normalizeFloatMap(rule.ResolutionRatios, NormalizeResolution)
	rule.SizeRatios = normalizeFloatMap(rule.SizeRatios, NormalizeSize)
	return rule
}

func normalizeUnknownSpecPolicy(policy string) string {
	switch strings.ToLower(strings.TrimSpace(policy)) {
	case UnknownSpecIgnore:
		return UnknownSpecIgnore
	case UnknownSpecReject:
		return UnknownSpecReject
	default:
		return UnknownSpecDefault
	}
}

func normalizeFloatMap(source map[string]float64, normalizeKey func(string) string) map[string]float64 {
	if len(source) == 0 {
		return nil
	}
	result := make(map[string]float64, len(source))
	for key, value := range source {
		normalizedKey := normalizeKey(key)
		if normalizedKey != "" && value > 0 {
			result[normalizedKey] = value
		}
	}
	return result
}

func normalizeSizeQualityOverrides(source map[string]float64) map[string]float64 {
	if len(source) == 0 {
		return nil
	}
	result := make(map[string]float64, len(source))
	for key, value := range source {
		parts := strings.SplitN(key, ":", 2)
		if len(parts) != 2 || value <= 0 {
			continue
		}
		size := NormalizeSize(parts[0])
		quality := strings.ToLower(strings.TrimSpace(parts[1]))
		if size != "" && quality != "" {
			result[size+":"+quality] = value
		}
	}
	return result
}

func validateConfig(cfg Config) error {
	validateImageRule := func(rule ImageRule) error {
		switch strings.TrimSpace(rule.UnknownSpecPolicy) {
		case "", UnknownSpecDefault, UnknownSpecIgnore, UnknownSpecReject:
		default:
			return &ConfigError{Field: "image.unknown_spec_policy", Value: rule.UnknownSpecPolicy}
		}
		return nil
	}
	validateVideoRule := func(rule VideoRule) error {
		switch strings.TrimSpace(rule.BillingMode) {
		case "", BillingModePerCall, BillingModePerSecond:
		default:
			return &ConfigError{Field: "video.billing_mode", Value: rule.BillingMode}
		}
		switch strings.TrimSpace(rule.UnknownSpecPolicy) {
		case "", UnknownSpecDefault, UnknownSpecIgnore, UnknownSpecReject:
		default:
			return &ConfigError{Field: "video.unknown_spec_policy", Value: rule.UnknownSpecPolicy}
		}
		return nil
	}

	if err := validateImageRule(cfg.Image.Global); err != nil {
		return err
	}
	if err := validateVideoRule(cfg.Video.Global); err != nil {
		return err
	}
	for name, rule := range cfg.Image.Models {
		if err := validateImageRule(rule); err != nil {
			return &ConfigError{Field: "image.models." + name, Value: err.Error()}
		}
	}
	for name, rule := range cfg.Video.Models {
		if err := validateVideoRule(rule); err != nil {
			return &ConfigError{Field: "video.models." + name, Value: err.Error()}
		}
	}
	for name, rule := range cfg.Image.Channels {
		if err := validateImageRule(rule); err != nil {
			return &ConfigError{Field: "image.channels." + name, Value: err.Error()}
		}
	}
	for name, rule := range cfg.Video.Channels {
		if err := validateVideoRule(rule); err != nil {
			return &ConfigError{Field: "video.channels." + name, Value: err.Error()}
		}
	}
	return nil
}

type ConfigError struct {
	Field string
	Value string
}

func (e *ConfigError) Error() string {
	return "invalid value for " + e.Field + ": " + e.Value
}

func imageRuleConfigured(rule ImageRule) bool {
	return strings.TrimSpace(rule.DefaultSize) != "" ||
		strings.TrimSpace(rule.DefaultQuality) != "" ||
		len(rule.SizeRatios) > 0 ||
		len(rule.QualityRatios) > 0 ||
		len(rule.SizeQualityOverrides) > 0
}

func videoRuleConfigured(rule VideoRule) bool {
	return strings.TrimSpace(rule.BillingMode) != "" ||
		rule.DefaultDurationSeconds > 0 ||
		strings.TrimSpace(rule.DefaultResolution) != "" ||
		len(rule.ResolutionRatios) > 0 ||
		len(rule.SizeRatios) > 0
}

func mergeImageRule(base, override ImageRule) ImageRule {
	if strings.TrimSpace(override.DefaultSize) != "" {
		base.DefaultSize = override.DefaultSize
	}
	if strings.TrimSpace(override.DefaultQuality) != "" {
		base.DefaultQuality = override.DefaultQuality
	}
	if strings.TrimSpace(override.UnknownSpecPolicy) != "" {
		base.UnknownSpecPolicy = override.UnknownSpecPolicy
	}
	if len(override.SizeRatios) > 0 {
		base.SizeRatios = override.SizeRatios
	}
	if len(override.QualityRatios) > 0 {
		base.QualityRatios = override.QualityRatios
	}
	if len(override.SizeQualityOverrides) > 0 {
		base.SizeQualityOverrides = override.SizeQualityOverrides
	}
	return base
}

func mergeVideoRule(base, override VideoRule) VideoRule {
	if strings.TrimSpace(override.BillingMode) != "" {
		base.BillingMode = override.BillingMode
	}
	if override.DefaultDurationSeconds > 0 {
		base.DefaultDurationSeconds = override.DefaultDurationSeconds
	}
	if strings.TrimSpace(override.DefaultResolution) != "" {
		base.DefaultResolution = override.DefaultResolution
	}
	if strings.TrimSpace(override.UnknownSpecPolicy) != "" {
		base.UnknownSpecPolicy = override.UnknownSpecPolicy
	}
	if len(override.ResolutionRatios) > 0 {
		base.ResolutionRatios = override.ResolutionRatios
	}
	if len(override.SizeRatios) > 0 {
		base.SizeRatios = override.SizeRatios
	}
	return base
}
