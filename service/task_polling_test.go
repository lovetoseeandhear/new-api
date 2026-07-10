package service

import (
	"context"
	"testing"
	"time"

	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/model"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestSweepTimedOutTasksRefundDisabled(t *testing.T) {
	truncate(t)

	oldTimeout := constant.TaskTimeoutMinutes
	oldRefundEnabled := constant.TaskTimeoutRefundEnabled
	t.Cleanup(func() {
		constant.TaskTimeoutMinutes = oldTimeout
		constant.TaskTimeoutRefundEnabled = oldRefundEnabled
	})

	const userID, tokenID, channelID = 101, 101, 101
	const initQuota, preConsumed, tokenRemain = 10000, 3000, 5000

	seedUser(t, userID, initQuota)
	seedToken(t, tokenID, userID, "sk-timeout-no-refund", tokenRemain)
	seedChannel(t, channelID)

	task := makeTask(userID, channelID, preConsumed, tokenID, BillingSourceWallet, 0)
	task.TaskID = "task_timeout_no_refund"
	task.SubmitTime = time.Now().Add(-2 * time.Hour).Unix()
	task.Progress = "50%"
	require.NoError(t, model.DB.Create(task).Error)

	constant.TaskTimeoutMinutes = 60
	constant.TaskTimeoutRefundEnabled = false

	sweepTimedOutTasks(context.Background())

	var reloaded model.Task
	require.NoError(t, model.DB.Where("task_id = ?", task.TaskID).First(&reloaded).Error)
	assert.EqualValues(t, model.TaskStatusFailure, reloaded.Status)
	assert.Equal(t, "100%", reloaded.Progress)
	assert.Contains(t, reloaded.FailReason, "任务超时")
	assert.Equal(t, initQuota, getUserQuota(t, userID))
	assert.Equal(t, tokenRemain, getTokenRemainQuota(t, tokenID))
	assert.Equal(t, int64(0), countLogs(t))
}

func TestSweepTimedOutTasksRefundEnabled(t *testing.T) {
	truncate(t)

	oldTimeout := constant.TaskTimeoutMinutes
	oldRefundEnabled := constant.TaskTimeoutRefundEnabled
	t.Cleanup(func() {
		constant.TaskTimeoutMinutes = oldTimeout
		constant.TaskTimeoutRefundEnabled = oldRefundEnabled
	})

	const userID, tokenID, channelID = 102, 102, 102
	const initQuota, preConsumed, tokenRemain = 10000, 3000, 5000

	seedUser(t, userID, initQuota)
	seedToken(t, tokenID, userID, "sk-timeout-refund", tokenRemain)
	seedChannel(t, channelID)

	task := makeTask(userID, channelID, preConsumed, tokenID, BillingSourceWallet, 0)
	task.TaskID = "task_timeout_refund"
	task.SubmitTime = time.Now().Add(-2 * time.Hour).Unix()
	task.Progress = "50%"
	require.NoError(t, model.DB.Create(task).Error)

	constant.TaskTimeoutMinutes = 60
	constant.TaskTimeoutRefundEnabled = true

	sweepTimedOutTasks(context.Background())

	var reloaded model.Task
	require.NoError(t, model.DB.Where("task_id = ?", task.TaskID).First(&reloaded).Error)
	assert.EqualValues(t, model.TaskStatusFailure, reloaded.Status)
	assert.Equal(t, "100%", reloaded.Progress)
	assert.Equal(t, initQuota+preConsumed, getUserQuota(t, userID))
	assert.Equal(t, tokenRemain+preConsumed, getTokenRemainQuota(t, tokenID))
	log := getLastLog(t)
	require.NotNil(t, log)
	assert.Equal(t, model.LogTypeRefund, log.Type)
	assert.Equal(t, preConsumed, log.Quota)
}
