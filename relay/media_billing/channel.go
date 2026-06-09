package media_billing

import (
	"strings"

	"github.com/QuantumNous/new-api/constant"
)

func GetStableChannelKey(channelType int) string {
	if channelType == 0 {
		return ""
	}
	switch channelType {
	case constant.ChannelTypeOpenRouter:
		return "openrouter"
	default:
		if name, ok := constant.ChannelTypeNames[channelType]; ok {
			return strings.ToLower(strings.TrimSpace(name))
		}
		return strings.ToLower(strings.TrimSpace(constant.GetChannelTypeName(channelType)))
	}
}
