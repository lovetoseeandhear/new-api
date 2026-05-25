package model

import (
	"testing"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func insertInviteRewardUser(t *testing.T, id int, username string, inviterId int) {
	t.Helper()
	user := &User{
		Id:        id,
		Username:  username,
		Status:    common.UserStatusEnabled,
		InviterId: inviterId,
		AffCode:   username + "_aff",
	}
	require.NoError(t, DB.Create(user).Error)
}

func getInviteRewardUser(t *testing.T, id int) User {
	t.Helper()
	var user User
	require.NoError(t, DB.First(&user, id).Error)
	return user
}

func TestRechargeWaffo_AddsInviteRewardByTopUpRatio(t *testing.T) {
	truncateTables(t)
	originalEnabled := common.InviteTopupRewardEnabled
	originalRatio := common.InviteTopupRewardRatio
	originalFirstOnly := common.InviteTopupRewardFirstOnly
	originalQuotaPerUnit := common.QuotaPerUnit
	t.Cleanup(func() {
		common.InviteTopupRewardEnabled = originalEnabled
		common.InviteTopupRewardRatio = originalRatio
		common.InviteTopupRewardFirstOnly = originalFirstOnly
		common.QuotaPerUnit = originalQuotaPerUnit
	})

	common.InviteTopupRewardEnabled = true
	common.InviteTopupRewardRatio = 10
	common.InviteTopupRewardFirstOnly = false
	common.QuotaPerUnit = 1000

	insertInviteRewardUser(t, 201, "invite_reward_inviter", 0)
	insertInviteRewardUser(t, 202, "invite_reward_invitee", 201)
	require.NoError(t, (&TopUp{
		UserId:        202,
		Amount:        20,
		Money:         20,
		TradeNo:       "invite-reward-waffo",
		PaymentMethod: PaymentMethodWaffo,
		Status:        common.TopUpStatusPending,
		CreateTime:    time.Now().Unix(),
	}).Insert())

	require.NoError(t, RechargeWaffo("invite-reward-waffo", "127.0.0.1"))

	inviter := getInviteRewardUser(t, 201)
	assert.Equal(t, 2000, inviter.AffQuota)
	assert.Equal(t, 2000, inviter.AffHistoryQuota)
}

func TestRechargeWaffo_FirstOnlySkipsRewardAfterPriorSuccessfulTopUp(t *testing.T) {
	truncateTables(t)
	originalEnabled := common.InviteTopupRewardEnabled
	originalRatio := common.InviteTopupRewardRatio
	originalFirstOnly := common.InviteTopupRewardFirstOnly
	originalQuotaPerUnit := common.QuotaPerUnit
	t.Cleanup(func() {
		common.InviteTopupRewardEnabled = originalEnabled
		common.InviteTopupRewardRatio = originalRatio
		common.InviteTopupRewardFirstOnly = originalFirstOnly
		common.QuotaPerUnit = originalQuotaPerUnit
	})

	common.InviteTopupRewardEnabled = true
	common.InviteTopupRewardRatio = 10
	common.InviteTopupRewardFirstOnly = true
	common.QuotaPerUnit = 1000

	insertInviteRewardUser(t, 211, "invite_first_inviter", 0)
	insertInviteRewardUser(t, 212, "invite_first_invitee", 211)
	require.NoError(t, (&TopUp{
		UserId:        212,
		Amount:        10,
		Money:         10,
		TradeNo:       "invite-first-old",
		PaymentMethod: PaymentMethodWaffo,
		Status:        common.TopUpStatusSuccess,
		CompleteTime:  time.Now().Unix() - 10,
		CreateTime:    time.Now().Unix() - 20,
	}).Insert())
	require.NoError(t, (&TopUp{
		UserId:        212,
		Amount:        20,
		Money:         20,
		TradeNo:       "invite-first-new",
		PaymentMethod: PaymentMethodWaffo,
		Status:        common.TopUpStatusPending,
		CreateTime:    time.Now().Unix(),
	}).Insert())

	require.NoError(t, RechargeWaffo("invite-first-new", "127.0.0.1"))

	inviter := getInviteRewardUser(t, 211)
	assert.Equal(t, 0, inviter.AffQuota)
	assert.Equal(t, 0, inviter.AffHistoryQuota)
}
