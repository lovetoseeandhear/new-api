package controller

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/logger"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/service"
	"github.com/QuantumNous/new-api/setting/system_setting"

	"github.com/gin-gonic/gin"
)

func MediaProxy(c *gin.Context) {
	mediaID := c.Param("media_id")
	if mediaID == "" {
		videoProxyError(c, http.StatusBadRequest, "invalid_request_error", "media_id is required")
		return
	}

	userID := c.GetInt("id")
	media, exists, err := model.GetMediaProxyByID(userID, mediaID)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Failed to query media %s: %s", mediaID, err.Error()))
		videoProxyError(c, http.StatusInternalServerError, "server_error", "Failed to query media")
		return
	}
	if !exists || media == nil {
		videoProxyError(c, http.StatusNotFound, "invalid_request_error", "Media not found")
		return
	}
	if media.ExpiresAt > 0 && media.ExpiresAt < time.Now().Unix() {
		videoProxyError(c, http.StatusGone, "invalid_request_error", "Media URL expired")
		return
	}

	channel, err := model.CacheGetChannel(media.ChannelID)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Failed to get channel for media %s: %s", mediaID, err.Error()))
		videoProxyError(c, http.StatusInternalServerError, "server_error", "Failed to retrieve channel information")
		return
	}

	upstreamURL := strings.TrimSpace(media.UpstreamURL)
	if upstreamURL == "" {
		videoProxyError(c, http.StatusBadGateway, "server_error", "Failed to fetch media content")
		return
	}
	channelBaseURL := channel.GetBaseURL()
	if media.ChannelType == constant.ChannelTypeOpenRouter && channelBaseURL == "" {
		channelBaseURL = "https://openrouter.ai/api"
	}

	fetchSetting := system_setting.GetFetchSetting()
	if media.ChannelType != constant.ChannelTypeOpenRouter || !sameURLHost(upstreamURL, channelBaseURL) {
		err = common.ValidateURLWithFetchSetting(upstreamURL, fetchSetting.EnableSSRFProtection, fetchSetting.AllowPrivateIp, fetchSetting.DomainFilterMode, fetchSetting.IpFilterMode, fetchSetting.DomainList, fetchSetting.IpList, fetchSetting.AllowedPorts, fetchSetting.ApplyIPFilterForDomain)
	}
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Media URL blocked for media %s: %v", mediaID, err))
		videoProxyError(c, http.StatusForbidden, "server_error", fmt.Sprintf("request blocked: %v", err))
		return
	}

	proxy := channel.GetSetting().Proxy
	client, err := service.GetHttpClientWithProxy(proxy)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Failed to create proxy client for media %s: %s", mediaID, err.Error()))
		videoProxyError(c, http.StatusInternalServerError, "server_error", "Failed to create proxy client")
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 60*time.Second)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, upstreamURL, nil)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Failed to create media proxy request: %s", err.Error()))
		videoProxyError(c, http.StatusInternalServerError, "server_error", "Failed to create proxy request")
		return
	}
	if media.ChannelType == constant.ChannelTypeOpenRouter {
		apiKey := firstNonEmpty(media.APIKey, channel.Key)
		if apiKey == "" {
			videoProxyError(c, http.StatusInternalServerError, "server_error", "API key not stored for media")
			return
		}
		req.Header.Set("Authorization", "Bearer "+apiKey)
	}

	resp, err := client.Do(req)
	if err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Failed to fetch media from %s: %s", upstreamURL, err.Error()))
		videoProxyError(c, http.StatusBadGateway, "server_error", "Failed to fetch media content")
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Upstream returned status %d for %s", resp.StatusCode, upstreamURL))
		videoProxyError(c, http.StatusBadGateway, "server_error", fmt.Sprintf("Upstream service returned status %d", resp.StatusCode))
		return
	}

	for key, values := range resp.Header {
		for _, value := range values {
			c.Writer.Header().Add(key, value)
		}
	}
	if media.ContentType != "" && c.Writer.Header().Get("Content-Type") == "" {
		c.Writer.Header().Set("Content-Type", media.ContentType)
	}
	c.Writer.Header().Set("Cache-Control", "private, max-age=3600")
	c.Writer.WriteHeader(resp.StatusCode)
	if _, err = io.Copy(c.Writer, resp.Body); err != nil {
		logger.LogError(c.Request.Context(), fmt.Sprintf("Failed to stream media content: %s", err.Error()))
	}
}

func buildMediaProxyURL(req *http.Request, serverAddress string, mediaID string) string {
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
