# OpenRouter 图片/视频下载代理分期方案

## 背景

OpenRouter 生成的图片和视频结果，可能返回上游内容地址，例如 `unsigned_urls` 或图片 URL。用户直接访问这些地址时，可能遇到以下问题：

- 内容地址需要 OpenRouter 渠道 key。
- 地址有过期时间。
- 浏览器端不能也不应该持有渠道 key。
- 直接暴露上游 URL 不利于权限控制和审计。
- SSRF 校验可能拦截上游内容地址。

目标是让用户始终访问 NewAPI 域名下的下载地址，由 NewAPI 后台使用任务或媒体记录对应的渠道和渠道 key 去 OpenRouter 拉取内容，再返回给用户。

## 总体原则

- 用户只访问 NewAPI 下载地址。
- OpenRouter key 只在服务端使用，不返回给用户。
- 优先使用本次任务实际使用的渠道 key。
- 如果本次任务没有保存 key，再 fallback 到当前渠道配置的 key。
- 第一版只做流式代理，不落盘、不缓存。
- 后续用户量增大后，再接入对象存储和 CDN。

## 下载链路

第一版目标链路：

```text
用户浏览器
  -> NewAPI /v1/videos/{task_id}/content
  -> NewAPI 使用任务绑定渠道和 OpenRouter key 请求 OpenRouter
  -> OpenRouter 返回视频内容
  -> NewAPI 流式转发给用户
```

图片代理后续目标链路：

```text
用户浏览器
  -> NewAPI /v1/media/{media_id}/content
  -> NewAPI 查询 media 记录
  -> NewAPI 使用记录中的渠道和 OpenRouter key 请求 OpenRouter
  -> OpenRouter 返回图片内容
  -> NewAPI 流式转发给用户
```

## 第一期：OpenRouter 视频流式代理

### 目标

先解决 OpenRouter 视频生成后的下载问题：

- 用户调用 NewAPI 的视频内容接口下载。
- NewAPI 后台用渠道配置的 OpenRouter key 拉取视频。
- 不再依赖用户直接访问 OpenRouter `unsigned_urls`。
- 不落盘、不缓存，只做 `io.Copy` 流式转发。

### 范围

需要支持：

```text
GET /v1/videos/{task_id}/content
```

OpenRouter 视频下载时，NewAPI 内部请求：

```text
GET {openrouter_base}/v1/videos/{upstream_task_id}/content?index=0
Authorization: Bearer <openrouter_key>
```

`openrouter_base` 需要兼容：

```text
https://openrouter.ai/api
https://openrouter.ai/api/v1
```

### 关键改动点

1. 任务初始化时保存本次渠道 key

   当前任务需要在 `PrivateData.Key` 中保存本次实际使用的渠道 key。这样多 key 轮换时，下载阶段仍能使用当时生成视频的 key。

   建议保存范围：

   ```text
   所有异步任务渠道都保存 relayInfo.ChannelMeta.ApiKey
   ```

   而不是只给 Gemini / Vertex 保存。

2. `VideoProxy` 增加 OpenRouter 分支

   OpenRouter 不走默认 `ResultURL` 下载逻辑，而是根据 `UpstreamTaskID` 拼接 OpenRouter 内容接口。

   key 选择优先级：

   ```text
   task.PrivateData.Key
   channel.Key
   ```

3. 权限校验

   继续沿用现有逻辑：

   - 用户必须带 NewAPI token。
   - 只能查询自己的 task。
   - 只有成功状态的任务允许下载。

4. SSRF 校验

   不建议全局关闭 SSRF。

   OpenRouter 特殊分支可以做受控放行：

   - 目标 host 必须等于当前渠道 base URL 的 host。
   - 只允许 `http` / `https`。
   - 仍然禁止任意 URL 透传。

5. 流式返回

   使用流式转发：

   ```text
   upstream response body -> NewAPI response writer
   ```

   不把整个视频读进内存。

### 第一版不做

- 不落盘。
- 不上传 OSS/R2/S3。
- 不生成 CDN 地址。
- 不做公开分享链接。
- 不长期保存视频文件。
- 不做图片代理。

### 验收标准

- OpenRouter 视频任务完成后，用户访问 `/v1/videos/{task_id}/content` 能下载视频。
- 浏览器不需要 OpenRouter key。
- 返回内容不暴露 OpenRouter key。
- 下载失败时日志能看到上游状态码或请求失败原因。
- 原有 Gemini、Vertex、OpenAI、Sora 视频下载逻辑不受影响。

### 第一版压力说明

第一版会增加服务器带宽压力：

```text
OpenRouter -> NewAPI：入站流量
NewAPI -> 用户：出站流量
```

一份 100MB 视频，大约产生：

```text
100MB 入站 + 100MB 出站 = 200MB 服务器流量
```

内存压力较小，因为采用流式转发，不整文件读入内存。

## 第二期：OpenRouter 图片流式代理

### 目标

解决 OpenRouter 图片生成结果需要 key 才能下载的问题。

图片生成通常不是异步 task，没有天然的 `task_id` 可复用，所以建议新增媒体代理记录。

### 建议新增接口

```text
GET /v1/media/{media_id}/content
```

或图片专用：

```text
GET /v1/images/{image_id}/content
```

推荐统一使用 `/v1/media/{media_id}/content`，后续可以同时承载图片、音频、视频缩略图等资源。

### 媒体记录字段

建议新增 media proxy 记录，字段包括：

```text
media_id
user_id
channel_id
channel_type
upstream_url
api_key
content_type
created_at
expires_at
status
```

如果担心数据库保存 key，可以保存加密后的 key，或只保存 channel_id 并优先使用当前 channel key。但多 key 场景下，保存本次实际 key 更稳。

### 图片返回改写

OpenRouter 图片生成返回时，如果 `data[].url` 是 OpenRouter 内容地址，则改写为：

```text
{ServerAddress}/v1/media/{media_id}/content
```

原始 URL 存在服务端 media 记录里。

### 验收标准

- 用户收到的是 NewAPI 域名下的图片 URL。
- 用户访问图片 URL 不需要 OpenRouter key。
- NewAPI 后台带 OpenRouter key 拉取图片并流式返回。
- 图片 URL 支持过期时间。
- 用户不能下载其他用户的 media。

## 第三期：对象存储缓存和 CDN

### 目标

当视频或图片下载量变大后，减少 NewAPI 服务器带宽和连接压力。

### 推荐链路

```text
OpenRouter
  -> NewAPI 后台拉取一次
  -> S3 / R2 / OSS
  -> CDN
  -> 用户下载
```

### 适用场景

- 视频下载并发较高。
- 单个视频较大。
- 同一视频会被重复下载。
- 服务器出站流量费用明显上升。

### 需要新增能力

- 对象存储配置。
- 上传失败重试。
- 存储 key 命名规则。
- 过期清理任务。
- CDN URL 返回。
- 下载缓存命中统计。

## 第四期：下载治理和审计

### 目标

提升下载安全性、可观测性和运营能力。

### 可做能力

- 单用户下载并发限制。
- 单任务下载次数限制。
- 下载流量统计。
- 下载失败原因统计。
- media/task 下载日志。
- 管理员手动刷新或删除缓存。
- 过期任务或媒体自动清理。

## 推荐实施顺序

优先级：

```text
1. OpenRouter 视频流式代理
2. OpenRouter 图片流式代理
3. 对象存储缓存和 CDN
4. 下载治理和审计
```

第一期可以快速解决当前下载问题，并且不会引入额外基础设施。等确认下载链路稳定、用户量上来后，再进入对象存储和 CDN 阶段。
