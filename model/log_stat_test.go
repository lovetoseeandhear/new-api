package model

import (
	"testing"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func insertConsumeLogForStatTest(t *testing.T, username string, modelName string, quota int, promptTokens int, completionTokens int, createdAt int64) {
	t.Helper()
	require.NoError(t, LOG_DB.Create(&Log{
		UserId:           1,
		Username:         username,
		CreatedAt:        createdAt,
		Type:             LogTypeConsume,
		ModelName:        modelName,
		Quota:            quota,
		PromptTokens:     promptTokens,
		CompletionTokens: completionTokens,
	}).Error)
}

func TestSumUsedQuotaIncludesTotalTokensForFilteredRange(t *testing.T) {
	truncateTables(t)
	now := time.Now().Unix()

	insertConsumeLogForStatTest(t, "alice", "gpt-5", 100, 12, 8, now-30)
	insertConsumeLogForStatTest(t, "alice", "gpt-5", 200, 30, 20, now-20)
	insertConsumeLogForStatTest(t, "alice", "gpt-4o", 300, 100, 100, now-10)
	insertConsumeLogForStatTest(t, "bob", "gpt-5", 400, 200, 200, now-5)
	require.NoError(t, LOG_DB.Create(&Log{
		UserId:           1,
		Username:         "alice",
		CreatedAt:        now - 15,
		Type:             LogTypeError,
		ModelName:        "gpt-5",
		Quota:            500,
		PromptTokens:     300,
		CompletionTokens: 300,
	}).Error)

	stat, err := SumUsedQuota(LogTypeUnknown, now-60, now, "gpt-5", "alice", "", 0, "")

	require.NoError(t, err)
	assert.Equal(t, 300, stat.Quota)
	assert.Equal(t, 70, stat.Token)
}

func TestSumUsedQuotaReturnsZeroTokensWhenNoConsumeLogsMatch(t *testing.T) {
	truncateTables(t)

	stat, err := SumUsedQuota(LogTypeUnknown, common.GetTimestamp()-60, common.GetTimestamp(), "missing-model", "missing-user", "", 0, "")

	require.NoError(t, err)
	assert.Equal(t, 0, stat.Quota)
	assert.Equal(t, 0, stat.Token)
}
