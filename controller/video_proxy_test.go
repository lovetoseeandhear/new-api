package controller

import (
	"net/http/httptest"
	"testing"

	"github.com/QuantumNous/new-api/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestOpenRouterVideoContentRequestUsesUpstreamTaskIDAndStoredKey(t *testing.T) {
	task := &model.Task{
		TaskID: "task_public",
		PrivateData: model.TaskPrivateData{
			Key:            "stored-openrouter-key",
			UpstreamTaskID: "or-video-123",
		},
	}

	targetURL, apiKey, err := buildOpenRouterVideoContentRequest(
		"https://openrouter.ai/api/v1",
		"channel-key",
		task,
	)

	require.NoError(t, err)
	assert.Equal(t, "https://openrouter.ai/api/v1/videos/or-video-123/content?index=0", targetURL)
	assert.Equal(t, "stored-openrouter-key", apiKey)
}

func TestOpenRouterVideoContentRequestFallsBackToChannelKey(t *testing.T) {
	task := &model.Task{TaskID: "or-video-123"}

	targetURL, apiKey, err := buildOpenRouterVideoContentRequest(
		"https://openrouter.ai/api",
		"channel-key",
		task,
	)

	require.NoError(t, err)
	assert.Equal(t, "https://openrouter.ai/api/v1/videos/or-video-123/content?index=0", targetURL)
	assert.Equal(t, "channel-key", apiKey)
}

func TestMediaProxyURLUsesServerAddress(t *testing.T) {
	req := httptest.NewRequest("GET", "http://localhost:3030/v1/images/generations", nil)

	url := buildMediaProxyURL(req, "https://api.example.com", "media_123")

	assert.Equal(t, "https://api.example.com/v1/media/media_123/content", url)
}
