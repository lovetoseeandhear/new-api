package service

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"errors"
	"fmt"
	"net/url"
	"sort"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/setting"
)

const (
	alipayGatewayProduction = "https://openapi.alipay.com/gateway.do"
	alipayGatewaySandbox    = "https://openapi-sandbox.dl.alipaydev.com/gateway.do"
)

type AlipayPagePayArgs struct {
	OutTradeNo     string
	TotalAmount    string
	Subject        string
	Body           string
	NotifyURL      string
	ReturnURL      string
	PassbackParams string
}

type AlipayClient struct {
	appID      string
	privateKey *rsa.PrivateKey
	publicKey  *rsa.PublicKey
	gatewayURL string
}

func NewAlipayClient() (*AlipayClient, error) {
	appID := strings.TrimSpace(setting.AlipayAppID)
	if appID == "" {
		return nil, errors.New("missing alipay app id")
	}

	privateKey, err := parseAlipayPrivateKey(setting.AlipayPrivateKey)
	if err != nil {
		return nil, fmt.Errorf("invalid alipay private key: %w", err)
	}
	publicKey, err := parseAlipayPublicKey(setting.AlipayPublicKey)
	if err != nil {
		return nil, fmt.Errorf("invalid alipay public key: %w", err)
	}

	gatewayURL := strings.TrimSpace(setting.AlipayGatewayURL)
	if gatewayURL == "" {
		gatewayURL = alipayGatewayProduction
	}
	if setting.AlipaySandbox {
		gatewayURL = strings.TrimSpace(setting.AlipaySandboxGatewayURL)
		if gatewayURL == "" {
			gatewayURL = alipayGatewaySandbox
		}
	}

	return &AlipayClient{
		appID:      appID,
		privateKey: privateKey,
		publicKey:  publicKey,
		gatewayURL: gatewayURL,
	}, nil
}

func (c *AlipayClient) BuildPagePayURL(args *AlipayPagePayArgs) (string, error) {
	if args == nil {
		return "", errors.New("missing pay args")
	}
	if strings.TrimSpace(args.OutTradeNo) == "" {
		return "", errors.New("missing out_trade_no")
	}
	if strings.TrimSpace(args.TotalAmount) == "" {
		return "", errors.New("missing total_amount")
	}
	if strings.TrimSpace(args.Subject) == "" {
		return "", errors.New("missing subject")
	}

	bizContentMap := map[string]string{
		"out_trade_no":    strings.TrimSpace(args.OutTradeNo),
		"product_code":    "FAST_INSTANT_TRADE_PAY",
		"total_amount":    strings.TrimSpace(args.TotalAmount),
		"subject":         strings.TrimSpace(args.Subject),
		"timeout_express": "30m",
	}
	if body := strings.TrimSpace(args.Body); body != "" {
		bizContentMap["body"] = body
	}

	bizContentBytes, err := common.Marshal(bizContentMap)
	if err != nil {
		return "", fmt.Errorf("marshal alipay biz content: %w", err)
	}

	params := map[string]string{
		"app_id":      c.appID,
		"method":      "alipay.trade.page.pay",
		"format":      "JSON",
		"charset":     "utf-8",
		"sign_type":   "RSA2",
		"timestamp":   time.Now().Format("2006-01-02 15:04:05"),
		"version":     "1.0",
		"biz_content": string(bizContentBytes),
	}

	if notifyURL := strings.TrimSpace(args.NotifyURL); notifyURL != "" {
		params["notify_url"] = notifyURL
	}
	if returnURL := strings.TrimSpace(args.ReturnURL); returnURL != "" {
		params["return_url"] = returnURL
	}
	if passbackParams := strings.TrimSpace(args.PassbackParams); passbackParams != "" {
		params["passback_params"] = passbackParams
	}

	signContent := buildAlipaySignContent(params)
	signature, err := c.sign(signContent)
	if err != nil {
		return "", fmt.Errorf("sign alipay request: %w", err)
	}
	params["sign"] = signature

	values := url.Values{}
	for k, v := range params {
		values.Set(k, v)
	}
	return c.gatewayURL + "?" + values.Encode(), nil
}

func (c *AlipayClient) Verify(params map[string]string) (bool, error) {
	if len(params) == 0 {
		return false, errors.New("empty params")
	}
	signature := strings.TrimSpace(params["sign"])
	if signature == "" {
		return false, errors.New("missing sign")
	}
	signContent := buildAlipaySignContent(params)
	return c.verify(signContent, signature)
}

func (c *AlipayClient) sign(signContent string) (string, error) {
	if signContent == "" {
		return "", errors.New("empty sign content")
	}
	hash := sha256.Sum256([]byte(signContent))
	sig, err := rsa.SignPKCS1v15(rand.Reader, c.privateKey, crypto.SHA256, hash[:])
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(sig), nil
}

func (c *AlipayClient) verify(signContent string, signature string) (bool, error) {
	sigBytes, err := base64.StdEncoding.DecodeString(signature)
	if err != nil {
		return false, fmt.Errorf("decode sign: %w", err)
	}
	hash := sha256.Sum256([]byte(signContent))
	if err := rsa.VerifyPKCS1v15(c.publicKey, crypto.SHA256, hash[:], sigBytes); err != nil {
		return false, err
	}
	return true, nil
}

func buildAlipaySignContent(params map[string]string) string {
	keys := make([]string, 0, len(params))
	for k, v := range params {
		if k == "sign" || strings.TrimSpace(v) == "" {
			continue
		}
		keys = append(keys, k)
	}
	sort.Strings(keys)

	var b strings.Builder
	for i, k := range keys {
		if i > 0 {
			b.WriteString("&")
		}
		b.WriteString(k)
		b.WriteString("=")
		b.WriteString(params[k])
	}
	return b.String()
}

func parseAlipayPrivateKey(privateKeyPem string) (*rsa.PrivateKey, error) {
	keyBytes := normalizeAlipayPEM(privateKeyPem)
	block, _ := pem.Decode([]byte(keyBytes))
	if block != nil {
		if key, err := x509.ParsePKCS8PrivateKey(block.Bytes); err == nil {
			rsaKey, ok := key.(*rsa.PrivateKey)
			if !ok {
				return nil, errors.New("private key is not rsa key")
			}
			return rsaKey, nil
		}
		if rsaKey, err := x509.ParsePKCS1PrivateKey(block.Bytes); err == nil {
			return rsaKey, nil
		}
	}

	decoded, err := base64.StdEncoding.DecodeString(removeAlipayKeyDecorators(keyBytes))
	if err != nil {
		return nil, errors.New("failed to decode private key")
	}
	if key, err := x509.ParsePKCS8PrivateKey(decoded); err == nil {
		rsaKey, ok := key.(*rsa.PrivateKey)
		if !ok {
			return nil, errors.New("private key is not rsa key")
		}
		return rsaKey, nil
	}
	if rsaKey, err := x509.ParsePKCS1PrivateKey(decoded); err == nil {
		return rsaKey, nil
	}
	return nil, errors.New("invalid private key")
}

func parseAlipayPublicKey(publicKeyPem string) (*rsa.PublicKey, error) {
	keyBytes := normalizeAlipayPEM(publicKeyPem)
	block, _ := pem.Decode([]byte(keyBytes))
	if block != nil {
		if key, err := x509.ParsePKIXPublicKey(block.Bytes); err == nil {
			rsaKey, ok := key.(*rsa.PublicKey)
			if !ok {
				return nil, errors.New("public key is not rsa key")
			}
			return rsaKey, nil
		}
		if cert, err := x509.ParseCertificate(block.Bytes); err == nil {
			rsaKey, ok := cert.PublicKey.(*rsa.PublicKey)
			if !ok {
				return nil, errors.New("certificate public key is not rsa key")
			}
			return rsaKey, nil
		}
		if rsaKey, err := x509.ParsePKCS1PublicKey(block.Bytes); err == nil {
			return rsaKey, nil
		}
	}

	decoded, err := base64.StdEncoding.DecodeString(removeAlipayKeyDecorators(keyBytes))
	if err != nil {
		return nil, errors.New("failed to decode public key")
	}
	if key, err := x509.ParsePKIXPublicKey(decoded); err == nil {
		rsaKey, ok := key.(*rsa.PublicKey)
		if !ok {
			return nil, errors.New("public key is not rsa key")
		}
		return rsaKey, nil
	}
	if rsaKey, err := x509.ParsePKCS1PublicKey(decoded); err == nil {
		return rsaKey, nil
	}
	return nil, errors.New("invalid public key")
}

func normalizeAlipayPEM(raw string) string {
	normalized := strings.TrimSpace(raw)
	normalized = strings.ReplaceAll(normalized, "\r", "")
	normalized = strings.ReplaceAll(normalized, "\\n", "\n")
	return normalized
}

func removeAlipayKeyDecorators(raw string) string {
	s := strings.TrimSpace(raw)
	s = strings.ReplaceAll(s, "-----BEGIN PRIVATE KEY-----", "")
	s = strings.ReplaceAll(s, "-----END PRIVATE KEY-----", "")
	s = strings.ReplaceAll(s, "-----BEGIN RSA PRIVATE KEY-----", "")
	s = strings.ReplaceAll(s, "-----END RSA PRIVATE KEY-----", "")
	s = strings.ReplaceAll(s, "-----BEGIN PUBLIC KEY-----", "")
	s = strings.ReplaceAll(s, "-----END PUBLIC KEY-----", "")
	s = strings.ReplaceAll(s, "-----BEGIN CERTIFICATE-----", "")
	s = strings.ReplaceAll(s, "-----END CERTIFICATE-----", "")
	s = strings.ReplaceAll(s, "\n", "")
	s = strings.ReplaceAll(s, " ", "")
	return s
}
