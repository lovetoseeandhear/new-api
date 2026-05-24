package main

import (
	"fmt"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/setting/ratio_setting"
	"gorm.io/gorm"
)

type pricingSeed struct {
	ModelName       string
	InputPrice      float64
	CacheWritePrice *float64
	CacheReadPrice  *float64
	OutputPrice     float64
}

var pricingSeeds = []pricingSeed{
	{ModelName: "minimax-m2.7", InputPrice: 0.30, CacheWritePrice: ptr(0.375), CacheReadPrice: ptr(0.06), OutputPrice: 1.20},
	{ModelName: "minimax-m2.5", InputPrice: 0.30, CacheWritePrice: ptr(0.30), CacheReadPrice: ptr(0.03), OutputPrice: 1.20},
	{ModelName: "kimi-k2.6", InputPrice: 0.95, CacheWritePrice: ptr(0.95), CacheReadPrice: ptr(0.16), OutputPrice: 4.00},
	{ModelName: "kimi-k2.5", InputPrice: 0.59, CacheWritePrice: ptr(0.59), CacheReadPrice: ptr(0.177), OutputPrice: 3.00},
	{ModelName: "glm-5.1", InputPrice: 1.40, CacheWritePrice: ptr(1.40), CacheReadPrice: ptr(0.26), OutputPrice: 4.40},
	{ModelName: "glm-5", InputPrice: 1.00, CacheWritePrice: ptr(1.00), CacheReadPrice: ptr(0.20), OutputPrice: 3.20},
	{ModelName: "deepseek-v3.2", InputPrice: 0.29, CacheWritePrice: ptr(0.29), CacheReadPrice: ptr(0.145), OutputPrice: 0.44},
	{ModelName: "deepseek-v4-flash", InputPrice: 0.28, CacheWritePrice: ptr(0.28), CacheReadPrice: ptr(0.0056), OutputPrice: 0.56},
	{ModelName: "deepseek-v4-pro", InputPrice: 0.87, CacheWritePrice: ptr(0.87), CacheReadPrice: ptr(0.0087), OutputPrice: 1.74},
	{ModelName: "gpt-5.5", InputPrice: 5.00, CacheWritePrice: ptr(5.00), CacheReadPrice: ptr(0.50), OutputPrice: 30.00},
	{ModelName: "gpt-5.5-instant", InputPrice: 5.00, CacheWritePrice: ptr(5.00), CacheReadPrice: ptr(0.50), OutputPrice: 30.00},
	{ModelName: "gpt-5.5-pro", InputPrice: 30.00, CacheWritePrice: ptr(30.00), OutputPrice: 180.00},
	{ModelName: "gpt-5.4", InputPrice: 2.50, CacheWritePrice: ptr(2.50), CacheReadPrice: ptr(0.25), OutputPrice: 15.00},
	{ModelName: "gpt-5.4-pro", InputPrice: 30.00, CacheWritePrice: ptr(30.00), OutputPrice: 180.00},
	{ModelName: "gpt-5.4-mini", InputPrice: 0.75, CacheWritePrice: ptr(0.75), CacheReadPrice: ptr(0.075), OutputPrice: 4.50},
	{ModelName: "gpt-5.4-nano", InputPrice: 0.20, CacheWritePrice: ptr(0.20), CacheReadPrice: ptr(0.02), OutputPrice: 1.25},
	{ModelName: "gpt-5.2", InputPrice: 1.75, CacheWritePrice: ptr(1.75), CacheReadPrice: ptr(0.175), OutputPrice: 14.00},
	{ModelName: "gpt-5", InputPrice: 1.25, CacheWritePrice: ptr(1.25), CacheReadPrice: ptr(0.125), OutputPrice: 10.00},
	{ModelName: "gpt-5-pro", InputPrice: 15.00, CacheWritePrice: ptr(15.00), OutputPrice: 120.00},
	{ModelName: "gpt-5-mini", InputPrice: 0.25, CacheWritePrice: ptr(0.25), CacheReadPrice: ptr(0.025), OutputPrice: 2.00},
	{ModelName: "gpt-5-nano", InputPrice: 0.05, CacheWritePrice: ptr(0.05), CacheReadPrice: ptr(0.005), OutputPrice: 0.40},
	{ModelName: "claude-opus-4.7", InputPrice: 5.00, CacheWritePrice: ptr(6.25), CacheReadPrice: ptr(0.50), OutputPrice: 25.00},
	{ModelName: "claude-opus-4-6", InputPrice: 5.00, CacheWritePrice: ptr(6.25), CacheReadPrice: ptr(0.50), OutputPrice: 25.00},
	{ModelName: "claude-opus-4.5", InputPrice: 5.00, CacheWritePrice: ptr(6.25), CacheReadPrice: ptr(0.50), OutputPrice: 25.00},
	{ModelName: "claude-sonnet-4.6", InputPrice: 3.00, CacheWritePrice: ptr(3.75), CacheReadPrice: ptr(0.30), OutputPrice: 15.00},
	{ModelName: "claude-sonnet-4.5", InputPrice: 3.00, CacheWritePrice: ptr(3.75), CacheReadPrice: ptr(0.30), OutputPrice: 15.00},
	{ModelName: "claude-haiku-4.5", InputPrice: 1.00, CacheWritePrice: ptr(1.25), CacheReadPrice: ptr(0.10), OutputPrice: 5.00},
	{ModelName: "gemini-3.1-pro", InputPrice: 2.00, CacheWritePrice: ptr(2.00), CacheReadPrice: ptr(0.20), OutputPrice: 12.00},
	{ModelName: "gemini-3-flash", InputPrice: 0.50, CacheWritePrice: ptr(0.50), CacheReadPrice: ptr(0.05), OutputPrice: 3.00},
}

func main() {
	common.InitEnv()
	ratio_setting.InitRatioSettings()

	if err := model.InitDB(); err != nil {
		panic(err)
	}
	model.InitOptionMap()

	modelPriceMap := ratio_setting.GetModelPriceCopy()
	modelRatioMap := ratio_setting.GetModelRatioCopy()
	completionRatioMap := ratio_setting.GetCompletionRatioCopy()
	cacheRatioMap := ratio_setting.GetCacheRatioCopy()
	createCacheRatioMap := ratio_setting.GetCreateCacheRatioCopy()

	created := 0
	updated := 0
	for _, seed := range pricingSeeds {
		if err := ensureModel(seed.ModelName); err != nil {
			panic(err)
		}
		created++

		delete(modelPriceMap, seed.ModelName)
		modelRatioMap[seed.ModelName] = safeDiv(seed.InputPrice, 2)
		completionRatioMap[seed.ModelName] = safeDiv(seed.OutputPrice, seed.InputPrice)
		setPriceRatio(cacheRatioMap, seed.ModelName, seed.CacheReadPrice, seed.InputPrice)
		setPriceRatio(createCacheRatioMap, seed.ModelName, seed.CacheWritePrice, seed.InputPrice)
		updated++
	}

	mustUpdateOptionJSON("ModelPrice", modelPriceMap)
	mustUpdateOptionJSON("ModelRatio", modelRatioMap)
	mustUpdateOptionJSON("CompletionRatio", completionRatioMap)
	mustUpdateOptionJSON("CacheRatio", cacheRatioMap)
	mustUpdateOptionJSON("CreateCacheRatio", createCacheRatioMap)

	fmt.Printf("done: seeds=%d, touched=%d, model_rows_checked=%d\n", len(pricingSeeds), updated, created)
	fmt.Println("note: Web Search pricing is not written here (project uses global tool pricing settings).")
}

func ensureModel(modelName string) error {
	var m model.Model
	err := model.DB.Where("model_name = ?", modelName).First(&m).Error
	if err == nil {
		return nil
	}
	if err != nil && err != gorm.ErrRecordNotFound {
		return err
	}
	now := common.GetTimestamp()
	n := &model.Model{
		ModelName:    modelName,
		Description:  "",
		Status:       1,
		SyncOfficial: 0,
		NameRule:     model.NameRuleExact,
		CreatedTime:  now,
		UpdatedTime:  now,
	}
	return n.Insert()
}

func mustUpdateOptionJSON(key string, val any) {
	b, err := common.Marshal(val)
	if err != nil {
		panic(err)
	}
	if err = model.UpdateOption(key, string(b)); err != nil {
		panic(err)
	}
}

func safeDiv(a float64, b float64) float64 {
	if b == 0 {
		return 0
	}
	return a / b
}

func setPriceRatio(target map[string]float64, modelName string, price *float64, basePrice float64) {
	if price == nil || basePrice == 0 {
		delete(target, modelName)
		return
	}
	target[modelName] = *price / basePrice
}

func ptr(v float64) *float64 {
	return &v
}
