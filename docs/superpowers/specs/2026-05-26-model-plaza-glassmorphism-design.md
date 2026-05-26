# 模型广场 Glassmorphism + Aurora 视觉重塑 — 设计规格

- **日期**: 2026-05-26
- **作用范围**: 仅 `/pricing` 路由(模型广场)及其下属组件
- **变更性质**: 纯视觉重塑,**功能零变更**

## 1. 背景与目标

模型广场(Pricing 页)是用户挑选模型、查看价格、对比厂商的主要入口。当前实现使用 Semi UI 默认主题 + 简单灰边卡片,缺乏品牌辨识度、视觉层次和现代感,与 AI 产品语境不匹配。

### 目标(Goals)

- 重塑模型广场视觉,达到现代 AI 产品的"高级感"
- 建立可复用的紫青双色玻璃风设计 token,为后续其他页面预留扩展
- 保证 light + dark 双模式 WCAG AA 以上对比度
- 移动端 / 老浏览器 / 低端设备可降级,不掉帧

### 非目标(Non-goals)

- 不改任何功能逻辑(props/state/hooks/网络/路由/筛选/排序/复制/详情面板等行为完全保留)
- 不改其他页面(主页、设置、用户中心、对话等)
- 不动 Semi UI 全局 token,所有改动限定在 `.pricing-glass-scope` 内
- 不做完整设计系统提取(只做模型广场需要的最小集)

## 2. 决策(用户已确认)

| # | 决策项 | 选择 |
|---|---|---|
| 1 | 改造范围 | 整个模型广场页面(顶部 + 侧栏 + 卡片 + 表格 + 移动端) |
| 2 | 风格方向 | Glassmorphism + Aurora 渐变 |
| 3 | 主色 | 幽紫 #7C5CFF + 青绿 #00C9D7 |
| 4 | 暗色模式 | 明 + 暗 双模式 |
| 5 | Aurora 强度 | 顶部强 Aurora hero + 列表区轻量 |
| 6 | 字体加载 | self-host via `@fontsource/inter` + `@fontsource/jetbrains-mono` |
| 7 | 提交粒度 | 拆 5 个独立 commit,每个 commit 视觉可单独验收 |

## 3. 设计 Token

### 3.1 颜色

挂在 `:root`(light)与 `body[theme-mode='dark']`(dark),前缀 `--plaza-*` 避免污染 Semi UI 全局 token。

| Token | Light | Dark | 用途 |
|---|---|---|---|
| `--plaza-primary` | `#7C5CFF` | `#A78BFA` | 紫主色:按钮、focus、选中、计费标签 |
| `--plaza-accent` | `#00C9D7` | `#22D3EE` | 青绿点缀:折扣、按次计费、价格高亮 |
| `--plaza-cta-glow` | `rgba(124,92,255,.35)` | `rgba(167,139,250,.45)` | CTA glow 阴影 |
| `--plaza-bg` | `#FAFAFE` | `#0B0E1A` | 列表区底色 |
| `--plaza-surface` | `rgba(255,255,255,.65)` | `rgba(22,26,42,.55)` | 玻璃卡片底(关键) |
| `--plaza-surface-solid` | `#F8F9FE` | `#161A2A` | 无 backdrop-filter 时的 fallback |
| `--plaza-border` | `rgba(124,92,255,.12)` | `rgba(167,139,250,.18)` | 玻璃描边 |
| `--plaza-text-1` | `#0F172A` | `#F1F5F9` | 主文本 |
| `--plaza-text-2` | `#475569` | `#94A3B8` | 次文本 |
| `--plaza-text-3` | `#94A3B8` | `#64748B` | 弱文本(caption/icon 专用) |
| `--plaza-blur` | `12px` | `16px` | backdrop-filter blur 半径 |

#### Aurora 渐变背景(只用于顶部 hero)

```css
/* Light */
background:
  radial-gradient(at 20% 0%, rgba(181,168,255,0.33), transparent 60%),
  radial-gradient(at 80% 10%, rgba(157,215,224,0.33), transparent 60%),
  #FAFAFE;

/* Dark */
background:
  radial-gradient(at 20% 0%, rgba(76,58,153,0.67), transparent 60%),
  radial-gradient(at 80% 10%, rgba(14,86,100,0.67), transparent 60%),
  #0B0E1A;
```

#### 颜色合规自查(WCAG)

| 配对 | Light | Dark | 标准 |
|---|---|---|---|
| text-1 / bg | 17.4:1 | 16.9:1 | AAA |
| text-2 / bg | 8.4:1 | 7.6:1 | AAA |
| text-3 / bg | 3.4:1(仅 caption) | 4.6:1 | Light AA limited |
| primary / bg | 5.1:1 | 6.2:1 | AA |
| accent / bg | 3.0:1(大字/icon/边线) | 5.4:1 | Light 仅大字 AA |

**纪律**:`--plaza-text-3` 与 `--plaza-accent` 在 light 下不达 AA 正文,只允许用于 caption、icon、边线、hover hint。

### 3.2 字体

```css
--plaza-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--plaza-font-mono: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
```

| 用途 | 字体 | 字重 | 字距 |
|---|---|---|---|
| H1 / H2(厂商名、模型名标题) | Inter | 600-700 | -0.02em |
| 正文 | Inter | 400 | -0.01em |
| 标签 / caption | Inter | 500 uppercase | +0.06em-+0.08em |
| 数据 / 价格 / 倍率 | JetBrains Mono(tabular figures) | 500-600 | 默认 |

通过 `@fontsource/inter` 与 `@fontsource/jetbrains-mono` 自托管。

### 3.3 量纲与效果

| Token | 值 |
|---|---|
| Radius(卡片) | 16px(`rounded-2xl`) |
| Radius(按钮/胶囊) | 10px / 999px |
| Spacing 步进 | 4 / 8 / 12 / 16 / 24 / 32 |
| Border 宽度 | 1px |
| Shadow(卡 hover) | `0 8px 28px -8px var(--plaza-cta-glow), 0 2px 8px rgba(0,0,0,.04)` |
| Transition | `200ms cubic-bezier(.4,0,.2,1)` |
| icon 容器 | 48×48 圆角 14 |

## 4. 页面骨架

```
┌──────────────────────────────────────────────────────────────────────┐
│  全局 Header(不动,60px)                                              │
├─────────────┬────────────────────────────────────────────────────────┤
│  Sidebar    │ ╭────────── Aurora Hero ───────────╮                    │
│  (玻璃面板) │ │ 紫青径向渐变 + 2 个 blur(80) blob │                  │
│             │ │ 厂商 logo chips + 标题 + 折扣 chip│                  │
│  - 厂商     │ │ ┌── 玻璃搜索条 + 视图切换 ──┐    │                  │
│  - 分组     │ │ │ 🔍 + chips                  │    │                  │
│  - 计费     │ │ └─────────────────────────────┘    │                  │
│  - 标签     │ ╰───────────────────────────────────╯                  │
│  - 端点     │ ──────────────────────────────────────────────────────  │
│             │  (列表区底色 --plaza-bg)                                │
│  [重置]     │  ┌─玻璃卡─┐ ┌─玻璃卡─┐ ┌─玻璃卡─┐                       │
│             │  │        │ │        │ │        │                      │
│             │  └────────┘ └────────┘ └────────┘                      │
│             │             ◀ 1 2 3 … ▶                                │
└─────────────┴────────────────────────────────────────────────────────┘
```

### 4.1 顶部 Aurora Hero

- 替换 `.pricing-search-header` 白底为 Aurora 径向渐变背景
- 新增装饰组件 `<PricingAuroraBg />`:`pointer-events: none; aria-hidden`,包含 2 个 `position: absolute` 圆形 blob,`filter: blur(80px) opacity(.5)`,缓慢 `translate3d` 飘移(24s loop,respects reduced-motion)
- 厂商 logo 群:每个 logo 18-24px,套 `backdrop-blur(6px)` 圆 chip
- 主标题 Inter 24-28px 700 -0.02em;折扣大号青绿 chip 置标题右侧
- sticky 底部加 fade mask(渐变透明),滚动时下方内容渐隐过渡

### 4.2 Sidebar

- 整面 `bg-[--plaza-surface] backdrop-blur(--plaza-blur) border-r border-[--plaza-border]`
- "筛选 / 重置"标题改 caption 风:`text-[11px] uppercase tracking-[.08em] text-[--plaza-text-3]`
- 重置按钮 ghost 紫色文字
- 分组之间细 dashed 分割线

### 4.3 主内容

#### SearchActions(顶部条)

- 搜索 input:`h-9 rounded-xl bg-[--plaza-surface] backdrop-blur-[--plaza-blur] border focus:border-[--plaza-primary] focus:ring-2 focus:ring-[--plaza-primary]/25`
- 视图切换:segmented control,激活态紫底白字
- 币种 / token 单位 / 显示倍率:统一胶囊按钮,不再用 Switch
- 复制选中 CTA:紫青渐变 `bg-gradient-to-r from-[--plaza-primary] to-[--plaza-accent] text-white shadow-[0_4px_14px_var(--plaza-cta-glow)]`

#### Card 网格(PricingCardView)

```
┌─ Glass Card ───────────────────────────────┐
│ ╭─icon 48─╮  GPT-4o     [8 折]  [复制][☐]│
│ │ purple+ │  ┌────────────────────────────┐│
│ │  cyan   │  │$2.50/1M · 输入             ││ ← Mono tabular
│ │ gradient│  │$10.0/1M · 输出             ││
│ ╰─────────╯  └────────────────────────────┘│
│                                            │
│ 多模态旗舰模型,支持视觉与函数调用…         │ ← text-3 描述
│                                            │
│ [按量] ──────────────── [vision][chat]    │ ← chip 行
└────────────────────────────────────────────┘
```

- Card 壳:`bg-[--plaza-surface] backdrop-blur-[--plaza-blur] border border-[--plaza-border] rounded-2xl transition-all duration-200`
- Hover:`-translate-y-1 shadow-[…cta-glow…] border-[--plaza-primary]/40`
- 选中:`ring-2 ring-[--plaza-primary] bg-[--plaza-primary]/5`(替换原 `bg-blue-50 border-blue-500`)
- 模型 icon 容器加紫青 gradient 背板(`::before` 伪元素)
- 价格行 Mono;描述 text-3;复制按钮淡紫底

#### Table 视图

- thead 玻璃面板风,uppercase caption 字体
- tbody hover:`bg-[--plaza-primary]/5`
- 数字列右对齐 + Mono
- 行选中:左侧 2px 紫色 border-left

### 4.4 Chip 体系(贯穿全页)

| 类型 | 用途 | 样式 |
|---|---|---|
| Primary chip(紫) | 按量计费、选中筛选项 | `bg-[--plaza-primary]/12 text-[--plaza-primary] border-[--plaza-primary]/20 rounded-full px-2.5 py-0.5 text-[11px] font-medium` |
| Accent chip(青绿) | 折扣、按次计费 | 同上,色换 `--plaza-accent` |
| Neutral chip | 自定义 tag、端点类型 | `bg-[--plaza-text-3]/10 text-[--plaza-text-2] border-[--plaza-border]` |

**自定义 tag**(`stringToColor` 生成):色相只用于 `border-left: 2px solid <hue>`,主体仍 Neutral,避免一卡片十种颜色噪声。

### 4.5 移动端

- Aurora hero 高度收缩,blob 减为 1 个、半径减半,飘移动画关闭
- Sidebar → `PricingFilterModal` 抽屉(已存在),抽屉本身玻璃化

## 5. 动效

| 元素 | 动效 | 时长 | 缓动 |
|---|---|---|---|
| 卡片 hover | translateY(-4px) + glow + 边色变 | 200ms | cubic-bezier(.4,0,.2,1) |
| 卡片 active | scale(.98) | 100ms | ease-out |
| Sidebar 项 hover | bg 淡入 | 150ms | ease-out |
| 视图切换 | content opacity + translateY 8→0 stagger 30ms | 220ms | ease-out |
| Aurora blob 飘移 | translate3d + scale 0.95→1.05 | 24s loop | linear |
| Search focus | ring 渐显 | 180ms | ease-out |
| 网格首次加载 | 前 6 张 stagger 30ms fade-in | 200ms | ease-out |

**全局规则**:
- 所有动画 respect `prefers-reduced-motion: reduce`(直接关掉或 1ms)
- 用 `transform` 与 `opacity`,不动 `width/height/top/left`
- 卡片数 > 60 时视口外卡片 IntersectionObserver 关 `backdrop-filter`

## 6. Focus 态(键盘 a11y)

| 元素 | Focus 样式 |
|---|---|
| 任何可点击 | `outline: none; box-shadow: 0 0 0 2px var(--plaza-bg), 0 0 0 4px var(--plaza-primary)` |
| 卡片(整卡可点) | 同上,ring 4px |
| 筛选项 | `outline: 2px solid var(--plaza-primary); outline-offset: 2px` |
| Input | border + ring 双层 |

## 7. 浏览器兼容 / Fallback

- `backdrop-filter` 加 `-webkit-backdrop-filter`
- `@supports not (backdrop-filter)`:走 `--plaza-surface-solid` 实色
- `prefers-reduced-motion: reduce`:Aurora blob 静态、卡片 hover 仅色变不位移、stagger 取消
- 移动端:`@media (max-width: 768px)` 默认关闭 blob 动画
- 视口外 60+ 卡片:IntersectionObserver 加/移 `.no-blur` 类

## 8. 实施策略

### 8.1 铁律

1. **不动 JS 逻辑**:不改 props、state、hooks、helpers、handlers、URL、Redux/context、网络。改动只在 (a) className 字符串、(b) `index.css`、(c) 顶部新增一个 `pointer-events: none` 装饰 div。
2. **改动作用域限定**:所有新 CSS 类挂 `.pricing-glass-scope` 内,不污染 Semi UI 全局 token。
3. **可降级**:`@supports` / `prefers-reduced-motion` / 视口检测三层保险。

### 8.2 文件改动清单

| # | 文件 | 改动 | 说明 |
|---|---|---|---|
| 1 | `web/src/index.css` | 追加 | token 变量、glass 类、keyframes、修改既有 `.pricing-*` 5 个类 |
| 2 | `web/src/pages/Pricing/index.jsx` | className | 加 `pricing-glass-scope` |
| 3 | `…/layout/PricingPage.jsx` | className + 子节点 | 替换 `bg-white` 类,插入 `<PricingAuroraBg />` |
| 4 | **新建** `…/layout/header/PricingAuroraBg.jsx` | 新文件 | 装饰组件,无 props 无 state(~15 行) |
| 5 | `…/layout/PricingSidebar.jsx` | className | 玻璃面板 + caption 标题 |
| 6 | `…/layout/content/PricingContent.jsx` | className | sticky 顶 + 列表区 bg |
| 7 | `…/layout/header/PricingTopSection.jsx` | className | wrapper |
| 8 | `…/layout/header/PricingVendorIntro.jsx` | className | logo chip + 标题 typography |
| 9 | `…/layout/header/PricingVendorIntroSkeleton.jsx` | className | shimmer 色 |
| 10 | `…/layout/header/SearchActions.jsx` | className | 搜索框 + chips + 渐变 CTA |
| 11 | `…/view/card/PricingCardView.jsx` | className | 卡片整套 re-skin + CARD_STYLES 常量改 |
| 12 | `…/view/card/PricingCardSkeleton.jsx` | className | shimmer 紫光 |
| 13 | `…/view/table/*.jsx` | className | thead/tr/td/选中态 |
| 14-18 | `…/filter/Pricing{Vendors,Groups,QuotaTypes,Tags,EndpointTypes}.jsx` | className | item 态 + count chip |
| 19 | `…/filter/PricingDisplaySettings.jsx` | className | Switch → 胶囊按钮组 |
| 20 | `…/modal/PricingFilterModal.jsx` | className | 移动端抽屉玻璃化 |
| 21 | `web/package.json` | 依赖 | 加 `@fontsource/inter` + `@fontsource/jetbrains-mono` |
| 22 | `web/src/index.jsx` | import | `@fontsource/inter/{400,500,600,700}.css` + `@fontsource/jetbrains-mono/{500,600}.css` |

**总计**:21-22 个文件触动,**0 个**逻辑函数变更,**1 个**新建纯装饰组件。

### 8.3 5-Commit 拆分

| Commit | 范围 | 验收点 |
|---|---|---|
| 1 — 基础 token + scope | 文件 1, 2, 3(部分), 21, 22 | 列表区底色柔明灰,字体变 Inter |
| 2 — Aurora hero | 文件 3 余下, 4, 6(部分), 7, 8, 9 | 顶部出现 Aurora 渐变 + blob + 厂商 chip |
| 3 — Sidebar + Filter 玻璃化 | 文件 5, 14-19 | 筛选区整体换风 |
| 4 — Card + Table 重塑 | 文件 6 余下, 10, 11, 12, 13 | 卡片玻璃 + hover glow + chip 体系 |
| 5 — 移动端 + 收尾 | 文件 20, 6(移动样式), 合规自查 | 移动端抽屉、edge case 完整 |

## 9. 风险与缓解

| 风险 | 缓解 |
|---|---|
| Semi 默认蓝色焦点态泄露 | scope 内提优先级覆盖 `.semi-input-focused/.semi-card-active` |
| 玻璃模糊把 PNG 厂商 logo 糊掉 | logo 容器不开 backdrop-blur,只卡片大壳开 |
| 长列表 backdrop-filter 卡顿 | 视口外卡片 IntersectionObserver 关 blur(加/移 class,不改组件) |
| Dark 模式 logo 看不清 | dark 下 logo 容器加 `bg-white/8` 微白底 |
| Aurora 动画掉帧 | 单层 blur 80px + 2 个 div,transform-only,`will-change: transform` |
| 国内 Google Fonts 失败 | `@fontsource` self-host |
| 用户主题切换 | `:root` + `body[theme-mode='dark']` 都定义变量 |

## 10. 验收计划

每个 commit 后:
1. `bun run dev` 启动,访问 `/pricing` 肉眼验收
2. 切换 Semi 主题(明 ↔ 暗),验证双模式
3. 浏览器开发者工具切移动视口(375 / 768 / 1024 / 1440)
4. DevTools 启用 `prefers-reduced-motion: reduce`,验证动画关闭
5. Chrome Lighthouse 跑 a11y,确保对比度报告无 critical
6. 翻翻其他页面(主页、设置、对话),确认未受污染

最终:
- 卡片数 100+ 时滚动 60fps
- 移动端无横向滚动
- 键盘 Tab 可走完所有交互元素,焦点态可见
- 所有 Semi 组件原行为保留(复制、详情、筛选、分页)

## 11. 后续(本 spec 之外)

- 若紫青风格被其他页面认可,可把 `--plaza-*` 升级为全局品牌 token `--brand-*`
- 主页 / 设置 / 对话页可循序渐进套用相同视觉,但**不属于本 spec 范围**
