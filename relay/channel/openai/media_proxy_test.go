package openai

import (
	"net/http/httptest"
	"testing"
	"time"

	"github.com/QuantumNous/new-api/constant"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRewriteOpenRouterImageResponseURLs(t *testing.T) {
	body := []byte(`{"created":123,"data":[{"url":"https://openrouter.ai/api/v1/images/img_123/content","revised_prompt":"ok"}]}`)
	req := httptest.NewRequest("POST", "http://localhost:3030/v1/images/generations", nil)
	info := &relaycommon.RelayInfo{
		UserId: 7,
		ChannelMeta: &relaycommon.ChannelMeta{
			ChannelType: constant.ChannelTypeOpenRouter,
			ChannelId:   19,
			ApiKey:      "or-key",
		},
	}

	rewritten, records, err := rewriteOpenRouterImageResponseURLs(req, info, body, "https://api.example.com", time.Hour)

	require.NoError(t, err)
	require.Len(t, records, 1)
	assert.Equal(t, "https://openrouter.ai/api/v1/images/img_123/content", records[0].UpstreamURL)
	assert.Equal(t, "or-key", records[0].APIKey)
	assert.Contains(t, string(rewritten), "https://api.example.com/v1/media/")
	assert.NotContains(t, string(rewritten), "https://openrouter.ai/api/v1/images/img_123/content")
}
