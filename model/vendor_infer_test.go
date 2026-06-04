package model

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestInferVendorName(t *testing.T) {
	tests := []struct {
		name     string
		model    string
		expected string
	}{
		{
			name:     "provider prefix minimax",
			model:    "minimax/minimax-01",
			expected: "MiniMax",
		},
		{
			name:     "provider prefix google",
			model:    "google/gemma-3-4b-it",
			expected: "Google",
		},
		{
			name:     "provider prefix openrouter",
			model:    "openrouter/auto",
			expected: "OpenRouter",
		},
		{
			name:     "provider prefix openai",
			model:    "openai/o4-mini",
			expected: "OpenAI",
		},
		{
			name:     "bare fallback",
			model:    "gemma-3-4b-it",
			expected: "Google",
		},
		{
			name:     "unknown model",
			model:    "something-unrelated",
			expected: "",
		},
		{
			name:     "removed ai21 family",
			model:    "ai21/jamba-1.7-large",
			expected: "",
		},
		{
			name:     "removed allenai family",
			model:    "allenai/olmo-2-112b",
			expected: "",
		},
		{
			name:     "removed anthracite family",
			model:    "anthracite-org/magnum-v2",
			expected: "",
		},
		{
			name:     "removed undi95 family",
			model:    "undi95/remm-slerp-l2-13b",
			expected: "",
		},
		{
			name:     "removed reka family",
			model:    "rekaai/reka-core-1",
			expected: "",
		},
		{
			name:     "removed deepcogito family",
			model:    "deepcogito/cogito-v2.1-671b",
			expected: "",
		},
		{
			name:     "removed mancer family",
			model:    "mancer/weaver-alpha",
			expected: "",
		},
		{
			name:     "removed morph family",
			model:    "morph/morph-v3-large",
			expected: "",
		},
		{
			name:     "removed poolside family",
			model:    "poolside/laguna-m1",
			expected: "",
		},
		{
			name:     "removed prime intellect family",
			model:    "prime-intellect/intellect-3",
			expected: "",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			require.Equal(t, tc.expected, InferVendorName(tc.model))
		})
	}
}
