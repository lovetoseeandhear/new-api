/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React from 'react';

const homePageHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI模型中转站（商用版）</title>
    <style>
      html,
      body,
      #root {
        height: 100%;
        margin: 0;
        overflow: hidden;
      }
      #root > div {
        min-height: 100% !important;
        height: 100% !important;
        padding: 0 !important;
      }
      #root > div > div.relative > header,
      #root > div > div.relative > footer {
        display: none !important;
      }
      #root > div > div.relative {
        width: 100vw !important;
        max-width: none !important;
        min-height: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        gap: 0 !important;
      }
      #root > div > div.relative > div.grid {
        width: 100vw !important;
        height: 100% !important;
        max-height: 100% !important;
        gap: 0 !important;
      }
      #root > div > div.relative > div.grid > div {
        border-radius: 0 !important;
      }
      .bay-live-data-badge {
        position: fixed;
        top: 14px;
        right: 18px;
        z-index: 80;
        display: flex;
        gap: 8px;
        padding: 8px 10px;
        border: 1px solid rgba(226, 232, 240, 0.9);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.78);
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
        backdrop-filter: blur(14px);
        color: #475569;
        font: 700 10px/1.2 Inter, sans-serif;
        pointer-events: none;
      }
      .bay-live-data-badge span {
        color: #2563eb;
      }
    </style>
    <script type="module" crossorigin src="/home/assets/index-BZ_m5dZ6.js"></script>
    <link rel="stylesheet" crossorigin href="/home/assets/index-CLXkFstn.css" />
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.__BAY_HOME_MODEL_DATA__ = {
        totals: { channels: 14, models: 74, groups: 12 },
        groups: [
          { name: 'gpt', title: 'GPT 官Key', models: ['gpt-5.4', 'gpt-5.2', 'gpt-5.4-pro', 'gpt-5.4-mini', 'gpt-5-mini', 'gpt-5.4-nano', 'gpt-5-nano', 'gpt-5.5', 'gpt-5.5-instant'] },
          { name: 'codex', title: 'Codex 编程模型', models: ['gpt-5.3-codex', 'gpt-5.2-codex', 'gpt-5.4', 'gpt-5.5', 'codex-auto-review'] },
          { name: 'gemini', title: 'Gemini 多模态', models: ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-3.1-pro-preview', 'gemini-3-flash-preview'] },
          { name: 'cc', title: 'Claude CC', models: ['claude-opus-4-6', 'claude-sonnet-4-6', 'claude-haiku-4-5-20251001'] },
          { name: 'cc-aws', title: 'Claude AWS', models: ['claude-opus-4-7', 'claude-opus-4-6', 'claude-sonnet-4-5-20250929', 'claude-haiku-4-5-20251001'] },
          { name: 'kling', title: 'Kling 视频模型', models: ['kling-v3', 'kling-v3-omni', 'kling-v2-6', 'kling-video-o1'] },
          { name: '国产模型', title: 'DeepSeek / GLM / Kimi / MiniMax', models: ['deepseek-v3.2', 'deepseek-v4-pro', 'glm-5.1', 'kimi-k2.5', 'minimax-m2.7'] }
        ]
      };

      function walkTextNodes(root, visitor) {
        if (!root) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(visitor);
      }

      function applyBayHomeData() {
        var data = window.__BAY_HOME_MODEL_DATA__;
        var exact = {
          '核心业务指标': '模型网关配置概览',
          '单节点QPS': '启用渠道',
          '10,000+': data.totals.channels + ' 个',
          '转发延迟': '可调用模型',
          '10ms级': data.totals.models + ' 个',
          'GPT-5 (Dev Edition)': 'GPT 官Key',
          'Claude-3.5-Opus': 'Claude CC / AWS',
          'Gemini 1.5 Pro': 'Gemini 多模态',
          '国内主流模型汇聚': 'Kling 与国产模型',
          'Discount': 'Models',
          '0.8x': '9款',
          '0.9x': '18款',
          '0.5x': '10款',
          '0.1x': '21款',
          '核心实力模块': '已接入能力模块',
          '高并发AI转发能力': 'Codex 编程模型',
          '单节点QPS 10000+，10ms级延迟': 'gpt-5.3-codex、gpt-5.2-codex、gpt-5.4-mini、codex-auto-review',
          '全场景适配与灵活兼容': 'GPT 官Key模型',
          '兼容HTTP/HTTPS/WS，协议双向转换': 'gpt-5.4、gpt-5.4-pro、gpt-5.5、gpt-5.5-instant',
          '商用级安全与精细化管控': 'Claude CC / AWS模型',
          'API Key/Token/OAuth2三重鉴权': 'claude-opus-4-6、claude-sonnet-4-6、claude-opus-4-7',
          '高可用容错与智能运维': 'Gemini 模型',
          '故障自动剔除，可视化指标面板': 'gemini-2.5-pro、gemini-2.5-flash、gemini-3.1-pro-preview',
          '定制化扩展与全周期支持': '视频与国产模型',
          '7×24h护航，支持离线部署与脱敏': 'kling-v3、deepseek-v3.2、glm-5.1、kimi-k2.5、minimax-m2.7',
          'AI Model Global Latency': 'Bay API Model Gateway',
          '全球模型加速中转态势': '当前模型分组与渠道态势',
          'GPT-4o': 'gpt',
          'Claude-3.5': 'cc-aws',
          'Gemini-1.5': 'gemini',
          'Llama-3-70B': 'kling',
          '模型系列调用分布 (Traffic)': '模型分组配置分布',
          'GPT': 'gpt',
          'Claude': 'cc',
          'Gemini': 'gemini',
          'DeepSeek': 'codex',
          'Qwen': 'kling',
          'Others': '国产',
          '商用级价值': '分组接入概览',
          '降低AI对接成本': 'gpt：9 个官Key模型',
          '提升AI服务稳定性': 'cc / cc-aws：Claude 4.x 系列',
          '强化安全管控': 'gemini：Pro / Flash / Lite 多模型',
          '助力高效运维': 'kling：视频生成模型组',
          '核心定位': '当前配置',
          '专为企业级AI应用打造，打通前端请求、AI模型服务与第三方系统的对接壁垒，实现AI模型调用的转发、管控、监控全流程闭环。': '当前 new-api 已启用 14 个渠道、12 个业务分组、74 个可调用模型，覆盖 GPT、Claude、Gemini、Codex、Kling、DeepSeek、GLM、Kimi、MiniMax 等模型族。',
          '安全审计与风控中心': '渠道同步与模型状态',
          'Admin Key 权限校验成功 - HK节点': 'gpt 分组已启用：gpt-5.4 / gpt-5.5 / gpt-5.5-instant',
          '触发关键词过滤策略: 异常会话闭环': 'cc-aws 分组已启用：Claude Opus / Sonnet / Haiku 4.x',
          'Key: sk-v3...4z 触发100QPM流控限制': 'codex 分组已启用：gpt-5.3-codex / gpt-5.2-codex',
          '请求载荷 AES-256 加密传输已开启': 'gemini 分组已启用：2.5 Pro / 2.5 Flash / 3.x Preview',
          '来自 211.95.*.* 的非法IP已被黑名单拦截': 'kling 分组已启用：v1 到 v3、omni、video-o1',
          '多租户配额同步完成 (延迟 4ms)': 'deepseek / glm / kimi / minimax 分组已同步'
        };

        walkTextNodes(document.getElementById('root'), function (node) {
          var value = node.nodeValue.trim();
          if (exact[value]) node.nodeValue = node.nodeValue.replace(value, exact[value]);
          if (node.nodeValue.indexOf('中转延迟:') !== -1) {
            node.nodeValue = node.nodeValue.replace(/中转延迟: .*/, '模型状态: Online');
          }
          if (node.nodeValue.indexOf('SSL加速') !== -1) {
            node.nodeValue = node.nodeValue.replace('SSL加速', '已启用');
          }
        });

        var badge = document.querySelector('.bay-live-data-badge');
        if (!badge) {
          badge = document.createElement('div');
          badge.className = 'bay-live-data-badge';
          badge.innerHTML = '<span>' + data.totals.channels + '</span> 启用渠道 <span>' + data.totals.models + '</span> 模型 <span>' + data.totals.groups + '</span> 分组';
          document.body.appendChild(badge);
        }
      }

      var bayHomeAttempts = 0;
      var bayHomeTimer = window.setInterval(function () {
        bayHomeAttempts += 1;
        applyBayHomeData();
        if (bayHomeAttempts > 40) window.clearInterval(bayHomeTimer);
      }, 250);
    </script>
  </body>
</html>`;

const Home = () => (
  <iframe
    title='AI模型中转站（商用版）'
    srcDoc={homePageHtml}
    className='w-full border-none'
    style={{ height: 'calc(100dvh - 64px)', marginTop: 64 }}
  />
);

export default Home;
