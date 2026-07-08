package model

import (
	"testing"
	"time"

	"github.com/QuantumNous/new-api/constant"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestInitTaskStoresChannelKeyForOpenRouterTasks(t *testing.T) {
	task := InitTask(constant.TaskPlatform("openai"), &relaycommon.RelayInfo{
		UserId:     1,
		UsingGroup: "default",
		ChannelMeta: &relaycommon.ChannelMeta{
			ChannelType: constant.ChannelTypeOpenRouter,
			ChannelId:   19,
			ApiKey:      "or-key",
		},
	})

	require.NotNil(t, task)
	assert.Equal(t, "or-key", task.PrivateData.Key)
}

func TestCreateAndGetMediaProxy(t *testing.T) {
	truncateTables(t)

	record := &MediaProxy{
		MediaID:     "media_test",
		UserID:      7,
		ChannelID:   19,
		ChannelType: constant.ChannelTypeOpenRouter,
		UpstreamURL: "https://openrouter.ai/api/v1/images/test/content",
		APIKey:      "or-key",
		ContentType: "image/png",
		ExpiresAt:   time.Now().Add(time.Hour).Unix(),
	}
	require.NoError(t, CreateMediaProxy(record))

	got, exists, err := GetMediaProxyByID(7, "media_test")

	require.NoError(t, err)
	require.True(t, exists)
	assert.Equal(t, record.UpstreamURL, got.UpstreamURL)
	assert.Equal(t, record.APIKey, got.APIKey)
}
