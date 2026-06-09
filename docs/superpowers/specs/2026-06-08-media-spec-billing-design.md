# Multimedia Specification Billing Design

## Goal

Add configurable image and video specification billing to new-api. The feature must charge image/video requests by request specifications such as image size, image quality, video duration, video resolution, and video size while preserving existing model pricing and channel mapping behavior.

## Scope

This design covers backend core support:

- A new `MediaRatio` option stored through the existing `options` table and `common.OptionMap`.
- Image specification billing for `/v1/images/generations` and `/v1/images/edits`.
- Video specification billing for existing task video adapters through `PriceData.OtherRatios`.
- OpenRouter video task support for `/v1/videos` using OpenRouter's async video API.
- Pricing/model-square exposure of the configured media billing data.

This design does not require a new database table. Admin UI can initially edit `MediaRatio` as JSON through the existing option flow. A richer form editor can be added later.

## Non-Goals

- Do not infer actual output resolution by downloading completed videos.
- Do not depend on upstream responses returning actual resolution or size.
- Do not change non-media text, embedding, audio, rerank, or moderation billing.
- Do not rename or remove protected project identities.

## Existing Behavior

new-api already has a generic multiplier mechanism:

- `types.PriceData.OtherRatios` stores extra billing multipliers.
- `relay/relay_task.go` multiplies task `Quota` by every `OtherRatios` value before pre-consume.
- `service/text_quota.go` multiplies text/image final quota by every `OtherRatios` value during settlement.
- `relay/image_handler.go` already adds `n` as `OtherRatio("n")`.
- `dto/openai_image.go` currently hardcodes DALL-E image `size` and `quality` into `TokenCountMeta.ImagePriceRatio`.
- Sora, Gemini/Veo, Vertex/Veo, and Ali video adapters have partial hardcoded duration/resolution multipliers.

The new feature should reuse `OtherRatios` instead of adding a second quota path.

## Model Name Matching

Media specification billing must use the same model name that current model pricing uses.

For the user's OpenRouter mapping example:

```text
new-api exposed/priced model: veo-3.1
OpenRouter upstream model: openrouter/google/veo-3.1 or google/veo-3.1
billing config key: veo-3.1
```

The implementation must therefore resolve the billing model name from `info.OriginModelName` after the existing channel model mapping flow has run. `info.UpstreamModelName` is used only for the upstream request body.

## Configuration

Add option key:

```text
MediaRatio
```

Default value:

```json
{"image":{"models":{}},"video":{"models":{}}}
```

Supported schema:

```json
{
  "image": {
    "global": {
      "default_size": "1024x1024",
      "default_quality": "standard",
      "unknown_spec_policy": "default"
    },
    "channels": {
      "openrouter": {
        "size_ratios": {
          "1024x1024": 1
        }
      }
    },
    "models": {
      "flux-pro": {
        "default_size": "1024x1024",
        "default_quality": "standard",
        "size_ratios": {
          "1024x1024": 1,
          "1024x1792": 1.4,
          "1792x1024": 1.4,
          "2048x2048": 4
        },
        "quality_ratios": {
          "standard": 1,
          "hd": 2
        },
        "size_quality_overrides": {
          "1024x1792:hd": 3,
          "1792x1024:hd": 3
        }
      },
      "regex:^openrouter/.*/image.*": {
        "default_size": "1024x1024",
        "size_ratios": {
          "1024x1024": 1
        }
      }
    }
  },
  "video": {
    "global": {
      "billing_mode": "per_call",
      "default_duration_seconds": 8,
      "default_resolution": "720p",
      "unknown_spec_policy": "default"
    },
    "channels": {
      "openrouter": {
        "resolution_ratios": {
          "720p": 1,
          "1080p": 1.8,
          "4k": 4
        }
      }
    },
    "models": {
      "veo-3.1": {
        "billing_mode": "per_second",
        "default_duration_seconds": 8,
        "default_resolution": "720p",
        "unknown_spec_policy": "default",
        "resolution_ratios": {
          "720p": 1,
          "1080p": 1.8,
          "4k": 4
        },
        "size_ratios": {
          "1280x720": 1,
          "1920x1080": 1.8,
          "3840x2160": 4
        }
      }
    }
  }
}
```

Matching precedence:

```text
exact model > regex model > channel > global
```

`models` keys starting with `regex:` are regular expressions. Exact model keys are preferred over regex keys.

Unknown specification policy:

- `default`: use the configured default size/resolution/duration.
- `ignore`: do not add a multiplier for the unknown specification.
- `reject`: reject the request before upstream submission.

Initial implementation must support `default` and `ignore`. `reject` can be parsed but should only be enforced when the request path has a clear API-error return path; otherwise return a local request error in the adapter/helper.

## Billing Modes

Image mode:

```text
final quota = base model quota * size ratio * quality ratio * n
```

Video `per_call` mode:

```text
final quota = base model quota * size/resolution ratio * n
```

Video `per_second` mode:

```text
final quota = base model quota * duration seconds * size/resolution ratio * n
```

The base model quota remains whatever existing model pricing produces:

- fixed price path: `ModelPrice * QuotaPerUnit * group ratio`
- ratio path: existing model ratio formula

## Specification Extraction

Video extraction order:

```text
1. request.size
2. request.resolution
3. request.width + request.height
4. request.metadata.resolution / metadata.size / metadata.width + metadata.height
5. model default_resolution
```

Image extraction order:

```text
1. request.size
2. request.width + request.height
3. request.extra_fields or request.Extra keys: image_size, imageSize, size, width, height
4. model default_size
```

`size` has priority over `resolution`. Exact `size_ratios` matches use normalized lowercase `WIDTHxHEIGHT`. If no `size_ratios` match exists, the helper normalizes size to a resolution bucket and tries `resolution_ratios`.

Resolution normalization:

```text
max(width,height) >= 3840 => 4k
max(width,height) >= 2048 => 2k
max(width,height) >= 1920 => 1080p
max(width,height) >= 1280 => 720p
otherwise => 480p
```

Supported resolution aliases:

```text
480p, 720p, 1080p, 1k, 2k, 4k
```

## OpenRouter Video

OpenRouter's current video API is asynchronous:

- Submit: `POST /api/v1/videos`
- Poll: `GET /api/v1/videos/{jobId}`
- Content: `GET /api/v1/videos/{jobId}/content`

OpenRouter request parameters include `duration`, `resolution`, `aspect_ratio`, and `size`. The `size` parameter is exact pixel dimensions and is interchangeable with `resolution + aspect_ratio`. OpenRouter's video model discovery endpoint returns `supported_resolutions`, `supported_sizes`, and `pricing_skus`.

Important design decision: charge by request parameters and configured defaults, not by poll response fields. The poll response returns status, URLs, and usage cost, but does not provide a stable actual resolution field.

Implementation details:

- Add `relay/channel/task/openrouter`.
- Register `ChannelTypeOpenRouter` in `GetTaskAdaptor`.
- Build upstream request with `model = info.UpstreamModelName` when present, after stripping `openrouter/` prefix if the configured upstream model includes it and OpenRouter expects slugs like `google/veo-3.1`.
- Preserve pass-through fields relevant to OpenRouter: `duration`, `resolution`, `size`, `aspect_ratio`, `seed`, `generate_audio`, `provider`, `frame_images`, `input_references`.
- Implement polling and result parsing compatible with existing task polling.

## Pricing Exposure

`model.Pricing` should expose configured media pricing:

```go
MediaRatio *media_billing.ModelMediaPricing `json:"media_ratio,omitempty"`
```

Only attach this field when a model has configured image or video media pricing. The pricing/model-square UI can show:

```text
veo-3.1
Video: per_second, default 720p, 8s
720p 1x, 1080p 1.8x, 4k 4x
```

## Logging

Logs should continue recording final quota through existing consume/task logs.

Add configured media ratios into `other` data where practical:

```json
{
  "media_type": "video",
  "billing_model": "veo-3.1",
  "upstream_model_name": "google/veo-3.1",
  "media_duration_seconds": 8,
  "media_resolution": "1080p",
  "media_resolution_ratio": 1.8,
  "media_billing_mode": "per_second"
}
```

Existing `OtherRatios` keys should remain numeric multipliers so quota calculation can reuse them:

```json
{
  "seconds": 8,
  "resolution": 1.8,
  "n": 1
}
```

## Compatibility

- Existing models with no `MediaRatio` config are unaffected.
- Existing image `n` behavior remains exactly-once.
- Existing DALL-E hardcoded size/quality behavior should remain as a fallback until equivalent config exists. Do not silently remove current DALL-E behavior.
- Existing video adapters with custom `EstimateBilling` should be migrated conservatively. If no media config matches, preserve their existing hardcoded ratios.
- All JSON marshal/unmarshal calls must use `common.Marshal`, `common.Unmarshal`, `common.UnmarshalJsonStr`, or `common.DecodeJson`.
- No raw SQL is needed.

## Verification Requirements

Tests must cover:

- `MediaRatio` parsing and invalid JSON validation.
- Exact model and regex matching precedence.
- Image size/quality ratio calculation, including DALL-E fallback unchanged.
- Video `per_call` and `per_second` calculation.
- Size-to-resolution fallback.
- OpenRouter request conversion uses upstream model for API body but billing config uses the new-api model name.
- Pricing response includes `media_ratio` only for configured models.

Primary references:

- OpenRouter create videos: https://openrouter.ai/docs/api/api-reference/video-generation/create-videos
- OpenRouter video generation guide: https://openrouter.ai/docs/guides/overview/multimodal/video-generation/
- OpenRouter video models endpoint: https://openrouter.ai/docs/api/api-reference/video-generation/list-videos-models/
