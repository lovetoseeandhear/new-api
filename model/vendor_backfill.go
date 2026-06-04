package model

import (
	"fmt"

	"github.com/QuantumNous/new-api/common"
)

// BackfillModelVendors retroactively fills vendor_id for models that still have no vendor.
// It is idempotent: models with vendor_id != 0 are skipped.
func BackfillModelVendors() (updatedModels int, createdVendors int, skippedModels int, err error) {
	var models []Model
	if err = DB.Where("vendor_id = ?", 0).Find(&models).Error; err != nil {
		return 0, 0, 0, err
	}
	if len(models) == 0 {
		return 0, 0, 0, nil
	}

	var vendors []Vendor
	if err = DB.Find(&vendors).Error; err != nil {
		return 0, 0, 0, err
	}
	vendorMap := make(map[int]*Vendor, len(vendors))
	for i := range vendors {
		vendorMap[vendors[i].Id] = &vendors[i]
	}

	for i := range models {
		modelName := models[i].ModelName
		vendorName := InferVendorName(modelName)
		if vendorName == "" {
			skippedModels++
			continue
		}

		before := len(vendorMap)
		vendorID := getOrCreateVendor(vendorName, vendorMap)
		if vendorID == 0 {
			skippedModels++
			continue
		}
		if len(vendorMap) > before {
			createdVendors++
		}

		result := DB.Model(&Model{}).
			Where("id = ? AND vendor_id = 0", models[i].Id).
			Update("vendor_id", vendorID)
		if result.Error != nil {
			return updatedModels, createdVendors, skippedModels, result.Error
		}
		if result.RowsAffected > 0 {
			updatedModels++
		}
	}

	common.SysLog(fmt.Sprintf(
		"model vendor backfill completed: updated=%d created_vendors=%d skipped=%d",
		updatedModels, createdVendors, skippedModels,
	))

	return updatedModels, createdVendors, skippedModels, nil
}
