package middleware

import "testing"

func TestShouldSkipWebRateLimit(t *testing.T) {
	tests := []struct {
		name string
		path string
		want bool
	}{
		{name: "asset js chunk", path: "/assets/index-DnuAJBnb.js", want: true},
		{name: "asset css", path: "/assets/index.css", want: true},
		{name: "font", path: "/assets/inter.woff2", want: true},
		{name: "vendor icon", path: "/vendor-icons/openai.svg", want: true},
		{name: "docs static file", path: "/docs/index.html", want: true},
		{name: "home route", path: "/", want: false},
		{name: "spa route", path: "/console/channel", want: false},
		{name: "login route", path: "/login", want: false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := shouldSkipWebRateLimit(tt.path); got != tt.want {
				t.Fatalf("shouldSkipWebRateLimit(%q) = %v, want %v", tt.path, got, tt.want)
			}
		})
	}
}
