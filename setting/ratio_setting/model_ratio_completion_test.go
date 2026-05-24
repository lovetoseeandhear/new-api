package ratio_setting

import (
	"testing"

	"github.com/QuantumNous/new-api/common"
)

func TestGetCompletionRatioDefaultsToConfiguredValue(t *testing.T) {
	InitRatioSettings()

	name := "claude-opus-4-6"
	want := 7.25

	original := completionRatioMap.ReadAll()
	defer func() {
		_ = UpdateCompletionRatioByJSONString(mapToJSONString(original))
	}()

	if err := UpdateCompletionRatioByJSONString(`{"claude-opus-4-6":7.25}`); err != nil {
		t.Fatalf("update completion ratio: %v", err)
	}

	got := GetCompletionRatio(name)
	if got != want {
		t.Fatalf("GetCompletionRatio(%q) = %v, want %v", name, got, want)
	}

	info := GetCompletionRatioInfo(name)
	if info.Ratio != want {
		t.Fatalf("GetCompletionRatioInfo(%q).Ratio = %v, want %v", name, info.Ratio, want)
	}
	if info.Locked {
		t.Fatalf("GetCompletionRatioInfo(%q).Locked = true, want false", name)
	}
}

func TestGetCompletionRatioFallsBackToOne(t *testing.T) {
	InitRatioSettings()

	name := "model-without-config"
	got := GetCompletionRatio(name)
	if got != 1 {
		t.Fatalf("GetCompletionRatio(%q) = %v, want 1", name, got)
	}
	info := GetCompletionRatioInfo(name)
	if info.Ratio != 1 {
		t.Fatalf("GetCompletionRatioInfo(%q).Ratio = %v, want 1", name, info.Ratio)
	}
	if info.Locked {
		t.Fatalf("GetCompletionRatioInfo(%q).Locked = true, want false", name)
	}
}

func mapToJSONString(m map[string]float64) string {
	b, err := common.Marshal(m)
	if err != nil {
		panic(err)
	}
	return string(b)
}
