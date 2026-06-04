package model

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestBackfillModelVendors(t *testing.T) {
	require.NoError(t, DB.AutoMigrate(&Vendor{}, &Model{}))
	t.Cleanup(func() {
		DB.Exec("DELETE FROM models")
		DB.Exec("DELETE FROM vendors")
	})

	require.NoError(t, DB.Create(&Model{
		ModelName: "minimax-01",
		VendorID:  0,
		Status:    1,
		NameRule:  NameRuleExact,
	}).Error)
	require.NoError(t, DB.Create(&Model{
		ModelName: "unmatched-model",
		VendorID:  0,
		Status:    1,
		NameRule:  NameRuleExact,
	}).Error)

	updatedModels, createdVendors, skippedModels, err := BackfillModelVendors()
	require.NoError(t, err)
	require.Equal(t, 1, updatedModels)
	require.Equal(t, 1, createdVendors)
	require.Equal(t, 1, skippedModels)

	var backfilled Model
	require.NoError(t, DB.Where("model_name = ?", "minimax-01").First(&backfilled).Error)
	require.NotZero(t, backfilled.VendorID)

	var vendor Vendor
	require.NoError(t, DB.First(&vendor, backfilled.VendorID).Error)
	require.Equal(t, "MiniMax", vendor.Name)

	var skipped Model
	require.NoError(t, DB.Where("model_name = ?", "unmatched-model").First(&skipped).Error)
	require.Zero(t, skipped.VendorID)
}
