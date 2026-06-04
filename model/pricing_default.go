package model

import (
	"strings"
)

type vendorRule struct {
	Pattern    string
	VendorName string
}

// providerVendorNames 优先按 provider 前缀识别供应商，适配 OpenRouter 这类 provider/model 命名。
var providerVendorNames = map[string]string{
	"openai":          "OpenAI",
	"openrouter":      "OpenRouter",
	"anthropic":       "Anthropic",
	"google":          "Google",
	"moonshot":        "Moonshot",
	"minimax":         "MiniMax",
	"perplexity":      "Perplexity",
	"deepseek":        "DeepSeek",
	"microsoft":       "Microsoft",
	"amazon":          "Amazon",
	"nvidia":          "NVIDIA",
	"bytedance":       "字节跳动",
	"bytedance-seed":  "字节跳动",
	"xiaomi":          "Xiaomi",
	"stepfun":         "StepFun",
	"tencent":         "腾讯",
	"liquid":          "Liquid",
	"aion-labs":       "Aion Labs",
	"arcee-ai":        "Arcee AI",
	"essentialai":     "Essential AI",
	"gryphe":          "Gryphe",
	"ibm-granite":     "IBM Granite",
	"inception":       "Inception",
	"inclusionai":     "InclusionAI",
	"inflection":      "Inflection",
	"kwaipilot":       "KwaiPilot",
	"nousresearch":    "NousResearch",
	"relace":          "Relace",
	"switchpoint":     "SwitchPoint",
	"thedrummer":      "TheDrummer",
	"upstage":         "Upstage",
	"writer":          "Writer",
}

// 简化的供应商映射规则
var defaultVendorRules = []vendorRule{
	{Pattern: "gpt", VendorName: "OpenAI"},
	{Pattern: "dall-e", VendorName: "OpenAI"},
	{Pattern: "whisper", VendorName: "OpenAI"},
	{Pattern: "o4", VendorName: "OpenAI"},
	{Pattern: "o3", VendorName: "OpenAI"},
	{Pattern: "o1", VendorName: "OpenAI"},
	{Pattern: "claude", VendorName: "Anthropic"},
	{Pattern: "gemini", VendorName: "Google"},
	{Pattern: "gemma", VendorName: "Google"},
	{Pattern: "moonshot", VendorName: "Moonshot"},
	{Pattern: "kimi", VendorName: "Moonshot"},
	{Pattern: "chatglm", VendorName: "智谱"},
	{Pattern: "glm-", VendorName: "智谱"},
	{Pattern: "qwen", VendorName: "阿里巴巴"},
	{Pattern: "deepseek", VendorName: "DeepSeek"},
	{Pattern: "abab", VendorName: "MiniMax"},
	{Pattern: "minimax", VendorName: "MiniMax"},
	{Pattern: "nova", VendorName: "Amazon"},
	{Pattern: "ernie", VendorName: "百度"},
	{Pattern: "spark", VendorName: "讯飞"},
	{Pattern: "hunyuan", VendorName: "腾讯"},
	{Pattern: "command", VendorName: "Cohere"},
	{Pattern: "@cf/", VendorName: "Cloudflare"},
	{Pattern: "360", VendorName: "360"},
	{Pattern: "yi", VendorName: "零一万物"},
	{Pattern: "jina", VendorName: "Jina"},
	{Pattern: "mistral", VendorName: "Mistral"},
	{Pattern: "grok", VendorName: "xAI"},
	{Pattern: "llama", VendorName: "Meta"},
	{Pattern: "nemotron", VendorName: "NVIDIA"},
	{Pattern: "phi", VendorName: "Microsoft"},
	{Pattern: "wizardlm", VendorName: "Microsoft"},
	{Pattern: "sonar", VendorName: "Perplexity"},
	{Pattern: "doubao", VendorName: "字节跳动"},
	{Pattern: "seed", VendorName: "字节跳动"},
	{Pattern: "kling", VendorName: "快手"},
	{Pattern: "jimeng", VendorName: "即梦"},
	{Pattern: "mimo", VendorName: "Xiaomi"},
	{Pattern: "vidu", VendorName: "Vidu"},
	{Pattern: "aion", VendorName: "Aion Labs"},
}

// 供应商默认图标映射
var defaultVendorIcons = map[string]string{
	"OpenAI":     "OpenAI",
	"Anthropic":  "Claude.Color",
	"Google":     "Gemini.Color",
	"Moonshot":   "Moonshot",
	"OpenRouter": "OpenRouter",
	"智谱":         "Zhipu.Color",
	"阿里巴巴":       "Qwen.Color",
	"DeepSeek":   "DeepSeek.Color",
	"MiniMax":    "Minimax.Color",
	"百度":         "Wenxin.Color",
	"讯飞":         "Spark.Color",
	"腾讯":         "Hunyuan.Color",
	"Cohere":     "Cohere.Color",
	"Cloudflare": "Cloudflare.Color",
	"360":        "Ai360.Color",
	"零一万物":       "Yi.Color",
	"Jina":       "Jina",
	"Mistral":    "Mistral.Color",
	"xAI":        "XAI",
	"Meta":       "Ollama",
	"字节跳动":       "Doubao.Color",
	"快手":         "Kling.Color",
	"即梦":         "Jimeng.Color",
	"Vidu":       "Vidu",
	"微软":         "AzureAI",
	"Microsoft":  "AzureAI",
	"Azure":      "AzureAI",
	"Amazon":     "AWS",
	"NVIDIA":     "Nvidia.Color",
	"Xiaomi":     "Xiaomi",
}

func inferVendorNameFromProvider(provider string) string {
	if provider == "" {
		return ""
	}
	if vendorName, ok := providerVendorNames[strings.ToLower(strings.TrimSpace(provider))]; ok {
		return vendorName
	}
	return ""
}

func inferVendorNameFromModelName(modelName string) string {
	trimmed := strings.TrimSpace(modelName)
	if trimmed == "" {
		return ""
	}
	if provider, _, ok := strings.Cut(trimmed, "/"); ok {
		if vendorName := inferVendorNameFromProvider(provider); vendorName != "" {
			return vendorName
		}
	}

	modelLower := strings.ToLower(trimmed)
	for _, rule := range defaultVendorRules {
		if strings.Contains(modelLower, rule.Pattern) {
			return rule.VendorName
		}
	}
	return ""
}

// InferVendorName 尝试根据模型名推断供应商名称。
func InferVendorName(modelName string) string {
	return inferVendorNameFromModelName(modelName)
}

// initDefaultVendorMapping 简化的默认供应商映射
func initDefaultVendorMapping(metaMap map[string]*Model, vendorMap map[int]*Vendor, enableAbilities []AbilityWithChannel) {
	for _, ability := range enableAbilities {
		modelName := ability.Model
		if _, exists := metaMap[modelName]; exists {
			continue
		}

		vendorID := 0
		if vendorName := inferVendorNameFromModelName(modelName); vendorName != "" {
			vendorID = getOrCreateVendor(vendorName, vendorMap)
		}

		// 创建模型元数据
		metaMap[modelName] = &Model{
			ModelName: modelName,
			VendorID:  vendorID,
			Status:    1,
			NameRule:  NameRuleExact,
		}
	}
}

// 查找或创建供应商
func getOrCreateVendor(vendorName string, vendorMap map[int]*Vendor) int {
	// 查找现有供应商
	for id, vendor := range vendorMap {
		if vendor.Name == vendorName {
			return id
		}
	}

	// 创建新供应商
	newVendor := &Vendor{
		Name:   vendorName,
		Status: 1,
		Icon:   getDefaultVendorIcon(vendorName),
	}

	if err := newVendor.Insert(); err != nil {
		return 0
	}

	vendorMap[newVendor.Id] = newVendor
	return newVendor.Id
}

// 获取供应商默认图标
func getDefaultVendorIcon(vendorName string) string {
	if icon, exists := defaultVendorIcons[vendorName]; exists {
		return icon
	}
	return ""
}
