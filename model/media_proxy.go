package model

import (
	"time"

	"gorm.io/gorm"
)

const MediaProxyStatusActive = "active"

type MediaProxy struct {
	ID          int64  `json:"id" gorm:"primaryKey"`
	MediaID     string `json:"media_id" gorm:"type:varchar(191);uniqueIndex;not null"`
	UserID      int    `json:"user_id" gorm:"index;not null"`
	ChannelID   int    `json:"channel_id" gorm:"index;not null"`
	ChannelType int    `json:"channel_type" gorm:"index;not null"`
	UpstreamURL string `json:"-" gorm:"type:text;not null"`
	APIKey      string `json:"-" gorm:"type:text"`
	ContentType string `json:"content_type" gorm:"type:varchar(100)"`
	Status      string `json:"status" gorm:"type:varchar(32);index;default:'active'"`
	CreatedAt   int64  `json:"created_at" gorm:"index"`
	ExpiresAt   int64  `json:"expires_at" gorm:"index"`
}

func CreateMediaProxy(media *MediaProxy) error {
	if media.CreatedAt == 0 {
		media.CreatedAt = time.Now().Unix()
	}
	if media.Status == "" {
		media.Status = MediaProxyStatusActive
	}
	return DB.Create(media).Error
}

func GetMediaProxyByID(userID int, mediaID string) (*MediaProxy, bool, error) {
	var media MediaProxy
	err := DB.Where("user_id = ? AND media_id = ? AND status = ?", userID, mediaID, MediaProxyStatusActive).First(&media).Error
	if err == nil {
		return &media, true, nil
	}
	if err == gorm.ErrRecordNotFound {
		return nil, false, nil
	}
	return nil, false, err
}
