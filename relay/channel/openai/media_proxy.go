package openai

import (
	"fmt"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/dto"
	"github.com/QuantumNous/new-api/model"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/QuantumNous/new-api/setting/system_setting"
)

const openRouterImageProxyTTL = 24 * time.Hour

func rewriteOpenRouterImageResponseURLs(req *http.Request, info *relaycommon.RelayInfo, body []byte, serverAddress string, ttl time.Duration) ([]byte, []*model.MediaProxy, error) {
	if info == nil || info.ChannelMeta == nil || info.ChannelMeta.ChannelType != constant.ChannelTypeOpenRouter {
		return body, nil, nil
	}

	var imageResponse dto.ImageResponse
	if err := common.Unmarshal(body, &imageResponse); err != nil {
		return nil, nil, err
	}
	if len(imageResponse.Data) == 0 {
		return body, nil, nil
	}

	records := make([]*model.MediaProxy, 0, len(imageResponse.Data))
	expiresAt := time.Now().Add(ttl).Unix()
	for i := range imageResponse.Data {
		upstreamURL := strings.TrimSpace(imageResponse.Data[i].Url)
		if upstreamURL == "" || !isOpenRouterMediaURL(upstreamURL) {
			continue
		}

		randomID, err := common.GenerateRandomCharsKey(32)
		if err != nil {
			return nil, nil, err
		}
		mediaID := "media_" + randomID
		imageResponse.Data[i].Url = buildOpenRouterMediaProxyURL(req, serverAddress, mediaID)
		records = append(records, &model.MediaProxy{
			MediaID:     mediaID,
			UserID:      info.UserId,
			ChannelID:   info.ChannelMeta.ChannelId,
			ChannelType: info.ChannelMeta.ChannelType,
			UpstreamURL: upstreamURL,
			APIKey:      info.ChannelMeta.ApiKey,
			ContentType: "image/*",
			ExpiresAt:   expiresAt,
		})
	}

	if len(records) == 0 {
		return body, nil, nil
	}

	rewritten, err := common.Marshal(imageResponse)
	if err != nil {
		return nil, nil, err
	}
	return rewritten, records, nil
}

func persistOpenRouterImageMediaProxies(req *http.Request, info *relaycommon.RelayInfo, body []byte) ([]byte, error) {
	rewritten, records, err := rewriteOpenRouterImageResponseURLs(req, info, body, system_setting.ServerAddress, openRouterImageProxyTTL)
	if err != nil {
		return nil, err
	}
	for _, record := range records {
		if err := model.CreateMediaProxy(record); err != nil {
			return nil, err
		}
	}
	return rewritten, nil
}

func isOpenRouterMediaURL(rawURL string) bool {
	parsed, err := url.Parse(rawURL)
	if err != nil {
		return false
	}
	if parsed.Scheme != "http" && parsed.Scheme != "https" {
		return false
	}
	host := strings.ToLower(parsed.Hostname())
	return host == "openrouter.ai" || strings.HasSuffix(host, ".openrouter.ai")
}

func buildOpenRouterMediaProxyURL(req *http.Request, serverAddress string, mediaID string) string {
	base := strings.TrimRight(strings.TrimSpace(serverAddress), "/")
	if base == "" && req != nil {
		scheme := "http"
		if req.TLS != nil {
			scheme = "https"
		}
		if forwardedProto := strings.TrimSpace(req.Header.Get("X-Forwarded-Proto")); forwardedProto != "" {
			scheme = forwardedProto
		}
		base = scheme + "://" + req.Host
	}
	return fmt.Sprintf("%s/v1/media/%s/content", base, url.PathEscape(mediaID))
}
