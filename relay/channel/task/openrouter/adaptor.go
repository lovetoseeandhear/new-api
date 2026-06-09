package openrouter

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/QuantumNous/new-api/dto"
	"github.com/QuantumNous/new-api/model"
	"github.com/QuantumNous/new-api/relay/channel"
	"github.com/QuantumNous/new-api/relay/channel/task/taskcommon"
	relaycommon "github.com/QuantumNous/new-api/relay/common"
	"github.com/QuantumNous/new-api/relay/media_billing"
	"github.com/QuantumNous/new-api/service"
	"github.com/gin-gonic/gin"
)

type createVideoRequest struct {
	Model         string `json:"model"`
	Prompt        string `json:"prompt,omitempty"`
	Duration      *int   `json:"duration,omitempty"`
	Resolution    string `json:"resolution,omitempty"`
	Size          string `json:"size,omitempty"`
	AspectRatio   string `json:"aspect_ratio,omitempty"`
	Seed          *int   `json:"seed,omitempty"`
	GenerateAudio *bool  `json:"generate_audio,omitempty"`
	Provider      any    `json:"provider,omitempty"`
	FrameImages   any    `json:"frame_images,omitempty"`
	InputRefs     any    `json:"input_references,omitempty"`
}

type createVideoResponse struct {
	ID   string `json:"id"`
	Data struct {
		ID string `json:"id"`
	} `json:"data"`
}

type fetchVideoResponse struct {
	ID       string `json:"id"`
	Status   string `json:"status"`
	Progress int    `json:"progress"`
	Error    struct {
		Message string `json:"message"`
	} `json:"error"`
}

type TaskAdaptor struct {
	taskcommon.BaseBilling
	baseURL string
	apiKey  string
}

func (a *TaskAdaptor) Init(info *relaycommon.RelayInfo) {
	a.baseURL = info.ChannelBaseUrl
	a.apiKey = info.ApiKey
}

func (a *TaskAdaptor) ValidateRequestAndSetAction(c *gin.Context, info *relaycommon.RelayInfo) *dto.TaskError {
	return relaycommon.ValidateBasicTaskRequest(c, info, constant.TaskActionGenerate)
}

func (a *TaskAdaptor) BuildRequestURL(info *relaycommon.RelayInfo) (string, error) {
	baseURL := strings.TrimRight(strings.TrimSpace(a.baseURL), "/")
	if strings.HasSuffix(baseURL, "/v1") {
		return fmt.Sprintf("%s/videos", baseURL), nil
	}
	return fmt.Sprintf("%s/v1/videos", baseURL), nil
}

func (a *TaskAdaptor) BuildRequestHeader(c *gin.Context, req *http.Request, info *relaycommon.RelayInfo) error {
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+a.apiKey)
	return nil
}

func (a *TaskAdaptor) BuildRequestBody(c *gin.Context, info *relaycommon.RelayInfo) (io.Reader, error) {
	taskReq, err := relaycommon.GetTaskRequest(c)
	if err != nil {
		return nil, err
	}
	modelName := info.UpstreamModelName
	if strings.TrimSpace(modelName) == "" {
		modelName = info.OriginModelName
	}
	body := createVideoRequest{
		Model:  openRouterModelSlug(modelName),
		Prompt: taskReq.Prompt,
	}
	if taskReq.Duration > 0 {
		body.Duration = &taskReq.Duration
	}
	if taskReq.Seconds != "" {
		if duration, err := strconv.Atoi(taskReq.Seconds); err == nil && duration > 0 {
			body.Duration = &duration
		}
	}
	if size := strings.TrimSpace(taskReq.Size); size != "" {
		if isPixelSize(size) {
			body.Size = media_billing.NormalizeSize(size)
		} else {
			body.Resolution = media_billing.NormalizeResolution(size)
		}
	}
	if resolution := strings.TrimSpace(taskReq.Resolution); resolution != "" {
		body.Resolution = media_billing.NormalizeResolution(resolution)
	}
	if aspectRatio := strings.TrimSpace(taskReq.AspectRatio); aspectRatio != "" {
		body.AspectRatio = aspectRatio
	}
	if len(taskReq.Metadata) > 0 {
		if seed, ok := parseIntMetadata(taskReq.Metadata["seed"]); ok {
			body.Seed = &seed
		}
		if audio, ok := taskReq.Metadata["generate_audio"].(bool); ok {
			body.GenerateAudio = &audio
		}
		if resolution, ok := metadataStringValue(taskReq.Metadata["resolution"]); ok && body.Resolution == "" {
			body.Resolution = strings.ToLower(strings.TrimSpace(resolution))
		}
		if aspectRatio, ok := metadataStringValue(taskReq.Metadata["aspect_ratio"]); ok {
			body.AspectRatio = strings.TrimSpace(aspectRatio)
		}
		if provider, ok := taskReq.Metadata["provider"]; ok {
			body.Provider = provider
		}
		if frameImages, ok := taskReq.Metadata["frame_images"]; ok {
			body.FrameImages = frameImages
		}
		if inputReferences, ok := taskReq.Metadata["input_references"]; ok {
			body.InputRefs = inputReferences
		}
	}
	data, err := common.Marshal(body)
	if err != nil {
		return nil, err
	}
	return bytes.NewReader(data), nil
}

func (a *TaskAdaptor) DoRequest(c *gin.Context, info *relaycommon.RelayInfo, requestBody io.Reader) (*http.Response, error) {
	return channel.DoTaskApiRequest(a, c, info, requestBody)
}

func (a *TaskAdaptor) DoResponse(c *gin.Context, resp *http.Response, info *relaycommon.RelayInfo) (taskID string, taskData []byte, taskErr *dto.TaskError) {
	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", nil, service.TaskErrorWrapper(err, "read_response_body_failed", http.StatusInternalServerError)
	}
	_ = resp.Body.Close()

	var result createVideoResponse
	if err := common.Unmarshal(responseBody, &result); err != nil {
		return "", nil, service.TaskErrorWrapper(err, "unmarshal_response_failed", http.StatusInternalServerError)
	}
	if strings.TrimSpace(result.ID) == "" {
		result.ID = result.Data.ID
	}
	if strings.TrimSpace(result.ID) == "" {
		return "", nil, service.TaskErrorWrapper(fmt.Errorf("missing task id"), "invalid_response", http.StatusInternalServerError)
	}

	ov := dto.NewOpenAIVideo()
	ov.ID = info.PublicTaskID
	ov.TaskID = info.PublicTaskID
	ov.CreatedAt = time.Now().Unix()
	ov.Model = info.OriginModelName
	c.JSON(http.StatusOK, ov)
	return result.ID, responseBody, nil
}

func (a *TaskAdaptor) FetchTask(baseUrl, key string, body map[string]any, proxy string) (*http.Response, error) {
	taskID, ok := body["task_id"].(string)
	if !ok {
		return nil, fmt.Errorf("invalid task_id")
	}
	uri := fmt.Sprintf("%s/v1/videos/%s", baseUrl, taskID)
	req, err := http.NewRequest(http.MethodGet, uri, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+key)
	client, err := service.GetHttpClientWithProxy(proxy)
	if err != nil {
		return nil, fmt.Errorf("new proxy http client failed: %w", err)
	}
	return client.Do(req)
}

func (a *TaskAdaptor) ParseTaskResult(respBody []byte) (*relaycommon.TaskInfo, error) {
	var result fetchVideoResponse
	if err := common.Unmarshal(respBody, &result); err != nil {
		return nil, err
	}
	ti := &relaycommon.TaskInfo{}
	switch strings.ToLower(result.Status) {
	case "queued", "pending":
		ti.Status = model.TaskStatusQueued
		ti.Progress = "20%"
	case "processing", "in_progress":
		ti.Status = model.TaskStatusInProgress
		ti.Progress = "50%"
	case "completed", "succeeded", "success":
		ti.Status = model.TaskStatusSuccess
		ti.Progress = "100%"
	case "failed", "cancelled":
		ti.Status = model.TaskStatusFailure
		ti.Progress = "100%"
		if result.Error.Message != "" {
			ti.Reason = result.Error.Message
		}
	default:
		ti.Status = model.TaskStatusInProgress
	}
	return ti, nil
}

func (a *TaskAdaptor) ConvertToOpenAIVideo(task *model.Task) ([]byte, error) {
	openAIVideo := dto.NewOpenAIVideo()
	openAIVideo.ID = task.TaskID
	openAIVideo.TaskID = task.TaskID
	openAIVideo.Model = task.Properties.OriginModelName
	openAIVideo.Status = task.Status.ToVideoStatus()
	openAIVideo.SetProgressStr(task.Progress)
	openAIVideo.CreatedAt = task.CreatedAt
	if task.FinishTime > 0 {
		openAIVideo.CompletedAt = task.FinishTime
	}
	return common.Marshal(openAIVideo)
}

func (a *TaskAdaptor) GetModelList() []string {
	return []string{}
}

func (a *TaskAdaptor) GetChannelName() string {
	return "openrouter"
}

func openRouterModelSlug(modelName string) string {
	modelName = strings.TrimSpace(modelName)
	if strings.HasPrefix(modelName, "openrouter/") {
		return strings.TrimPrefix(modelName, "openrouter/")
	}
	return modelName
}

func isPixelSize(size string) bool {
	size = strings.ToLower(strings.TrimSpace(size))
	if !strings.Contains(size, "x") {
		return false
	}
	parts := strings.SplitN(size, "x", 2)
	if len(parts) != 2 {
		return false
	}
	_, err1 := strconv.Atoi(strings.TrimSpace(parts[0]))
	_, err2 := strconv.Atoi(strings.TrimSpace(parts[1]))
	return err1 == nil && err2 == nil
}

func parseIntMetadata(value any) (int, bool) {
	switch v := value.(type) {
	case int:
		return v, true
	case int64:
		return int(v), true
	case float64:
		if float64(int(v)) == v {
			return int(v), true
		}
		return 0, false
	case string:
		if parsed, err := strconv.Atoi(strings.TrimSpace(v)); err == nil {
			return parsed, true
		}
		return 0, false
	default:
		return 0, false
	}
}

func metadataStringValue(value any) (string, bool) {
	switch v := value.(type) {
	case string:
		return v, true
	default:
		return "", false
	}
}
