package media_billing

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

func NormalizeSize(size string) string {
	size = strings.ToLower(strings.TrimSpace(size))
	if size == "" {
		return ""
	}
	separators := []string{"x", "*", "×"}
	for _, sep := range separators {
		if strings.Contains(size, sep) {
			parts := strings.Split(size, sep)
			if len(parts) != 2 {
				return size
			}
			w, err1 := strconv.Atoi(strings.TrimSpace(parts[0]))
			h, err2 := strconv.Atoi(strings.TrimSpace(parts[1]))
			if err1 != nil || err2 != nil || w <= 0 || h <= 0 {
				return size
			}
			return fmt.Sprintf("%dx%d", w, h)
		}
	}
	return size
}

func NormalizeResolution(res string) string {
	res = strings.ToLower(strings.TrimSpace(res))
	switch res {
	case "480", "480p":
		return "480p"
	case "720", "720p", "1k":
		return "720p"
	case "1080", "1080p", "2k":
		return "1080p"
	case "4k":
		return "4k"
	default:
		return res
	}
}

func ResolutionFromSize(size string) string {
	size = NormalizeSize(size)
	parts := strings.Split(size, "x")
	if len(parts) != 2 {
		return ""
	}
	w, err1 := strconv.Atoi(parts[0])
	h, err2 := strconv.Atoi(parts[1])
	if err1 != nil || err2 != nil {
		return ""
	}
	maxSide := int(math.Max(float64(w), float64(h)))
	switch {
	case maxSide >= 3840:
		return "4k"
	case maxSide >= 2048:
		return "2k"
	case maxSide >= 1920:
		return "1080p"
	case maxSide >= 1280:
		return "720p"
	default:
		return "480p"
	}
}
