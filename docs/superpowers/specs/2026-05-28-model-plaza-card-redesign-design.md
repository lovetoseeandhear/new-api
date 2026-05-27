# 模型广场卡片重塑（v2）

**Date:** 2026-05-28
**Scope:** Model Plaza pricing card view (`web/src/components/table/model-pricing/view/card/`)
**Type:** UI redesign — contrast, hierarchy, and information balance
**Status:** Approved (awaiting implementation plan)

## 背景与动机

模型广场卡片当前为四段式垂直布局（身份／描述／计价＋倍率／标签），最近一次（2026-05-27）已做过卡片重塑，引入区段分隔线和 ratio chip 行。但用户反馈仍存在四个具体问题：

1. **折扣信息埋没** — 折扣 chip 与「按量计费」「自定义 tag」并列在最底部标签区，权重最低，但实际是用户最关心的促销信号。
2. **倍率信息几乎隐形** — `pricing-ratio-chip` 透明背景 + 灰色文字，对比度过低。
3. **整体色彩寡淡** — `pricing-chip-primary`（按量计费）使用 12% 透明度主色，缺乏鲜明感。
4. **节奏不均** — 身份区 + 描述区占垂直空间过半，下方计价/倍率/标签三段被挤压；区段分隔线 margin 过大造成无谓留白。

本次重塑将折扣信息提升为标题级元素，强化色彩对比，并通过移除冗余分隔线和重排价格区平衡信息密度。

## 设计目标

- **D1 折扣最显眼**：折扣徽章紧贴模型名右侧，红橙渐变实心 pill，一眼可见。
- **D2 倍率与标签鲜明**：背景填充替代描边，色彩饱和度提升。
- **D3 信息分布均匀**：减少身份/描述区与底部三段的失衡，移除一根分隔线，缩短余下间距。
- **D4 不破坏其它视图**：所有改动限定在卡片视图（`PricingCardView`、`PricingCardSkeleton`）和 `pricing-glass-scope` 选择器内的 CSS，不影响表格视图。

## 视觉骨架

```
┌──────────────────────────────────────────────┐
│ [图标] 模型名  [7.0折徽章]            [☑]    │  身份区（mb-2.5）
│                                              │
│ 描述文案两行 line-clamp...                   │  描述区（min-h ≈ 2.25rem，mb-3）
│                                              │
│ 输入价格   $0.50 / 1M Tokens                 │  计价区（两列：label 灰小字 / value mono 粗体）
│ 补全价格   $1.50 / 1M Tokens                 │
│ 缓存读取   $0.05 / 1M Tokens                 │
│                                              │
│ [×1.0 模型] [×3.0 补全] [×1.0 分组]    ⓘ     │  倍率行（可选；showRatio=true 才出现）
│ ─────────────────────────────────            │  唯一一根分隔线（margin 10px）
│ [按量计费] [Vision] [Function]        [📋]   │  标签区 + 复制按钮（justify-between）
└──────────────────────────────────────────────┘
```

要点：
- 折扣徽章原本所在的「标签区折扣 chip 分支」**移除**，避免重复展示。
- 计价区**上方**的分隔线**移除**，只保留标签区上方一根。
- 复制按钮从右上角**迁至底部标签行最右端**。
- 选择框（`rowSelection`）仍保留在右上角。
- 倍率行不变位置（计价区下方、标签区分隔线上方）。

## 详细设计

### 1. 折扣徽章（DiscountBadge）

**JSX 位置**：身份区内，紧贴 `<h3>` 模型名之后，处于同一 flex 行。

**显示条件**：`getDiscountZheByGroupRatio(priceData?.usedGroupRatio) !== null`，维持现有判定，不引入新阈值。

**布局保护**：模型名 `<h3>` 沿用 `truncate min-w-0`，徽章容器 `flex-shrink: 0`；模型名超长时先省略号截断，徽章始终完整。

**视觉规格**：
- 形状：`border-radius: 999px`，`padding: 2px 10px`，`height: 22px`
- 背景：`linear-gradient(135deg, #ff5470 0%, #ff8a3d 100%)`
- 文字：白色（`#ffffff`），`font-weight: 600`，`font-size: 12px`
- 阴影：`box-shadow: 0 2px 8px rgba(255, 84, 112, 0.35)`
- 内容：`{zhe}折`（如 `7.0折`、`9.9折`）
- 暗色模式：渐变与阴影不变（暖色在暗底依然吸睛），不做 `[data-theme='dark']` 分支。

**新增 CSS class**：`.pricing-discount-badge`（在 `pricing-glass-scope` 范围内生效）。

### 2. 复制按钮迁底

**移除**：身份区右上角的复制按钮 JSX。
**新增**：标签区容器改为 `flex justify-between items-center`，左侧仍是 `tags + customTags` 集合，右侧追加复制按钮。
**样式沿用**：`size='small' theme='borderless' type='tertiary' icon={<Copy size={12} />}` 配 `!bg-[var(--plaza-primary)]/8 hover:!bg-[var(--plaza-primary)]/15` 不变。

注：之前 brainstorm 阶段曾讨论"复制按钮 hover 显示"，最终取消（避免移动端异常 + 减少状态复杂度），按钮改为常驻底部。

### 3. 选择框

**保留位置**：右上角。
**结构调整**：折扣徽章上提后，身份区右侧只剩选择框，`<div className='ml-3'>` 仅在 `rowSelection` 存在时渲染。

### 4. 价格区两列结构

**目标**：标签静音、数值跳出。

**渲染方式**：新增 `formatPriceInfoCard(priceData, t, quotaDisplayType)`，复用 `getModelPriceItems` 拆分出的 items；不修改 `formatPriceInfo`（表格/其它视图保持不变）。

**JSX 结构**（每个 item）：
```jsx
<div className='pricing-price-row'>
  <span className='pricing-price-label'>{item.label}</span>
  <span className='pricing-price-value pricing-mono'>{item.value}{item.suffix}</span>
</div>
```

**CSS 规格**：
- `.pricing-price-row`：`display: flex; align-items: baseline; gap: 12px;`
- `.pricing-price-label`：`flex: 0 0 72px; font-size: 11px; color: var(--plaza-text-3);`
- `.pricing-price-value`：`font-size: 13px; font-weight: 600; color: var(--plaza-text-1); flex: 1; min-width: 0;`（数值占剩余空间，必要时换行）

**调用替换**：`PricingCardView.jsx` 把 `formatPriceInfo(priceData, t, siteDisplayType)` 改为 `formatPriceInfoCard(...)`。

### 5. 倍率 chip 强化

更新 `.pricing-glass-scope .pricing-ratio-chip` 与子元素：

| 属性 | 旧 | 新 |
|------|----|----|
| 背景 | `transparent` | `color-mix(in srgb, var(--plaza-primary) 8%, transparent)` |
| 边框 | `1px solid var(--plaza-border)` | 移除（`border: none`） |
| 字号 | 11px | 12px |
| 数值色 | `var(--plaza-text-1)` | `var(--plaza-primary)` |
| 数值字重 | 500 | 600 |
| 标签色 | `var(--plaza-text-3)` | 保持 |
| hover 边框 | 加深主色 | 改为背景再加深 4% |

暗色模式：背景填充改为 `var(--plaza-primary) 12%` 以保证对比。

### 6. 计费 chip 实心化

更新 `.pricing-glass-scope .semi-tag.pricing-chip-primary` 和 `pricing-chip-accent`：

- `pricing-chip-primary`（按量计费）：
  - `background: var(--plaza-primary) !important`
  - `color: #ffffff !important`
  - `border-color: var(--plaza-primary) !important`
- `pricing-chip-accent`（按次计费 / 含旧折扣分支但折扣分支会被移除）：
  - `background: var(--plaza-accent) !important`
  - `color: #ffffff !important`
  - `border-color: var(--plaza-accent) !important`
- `pricing-chip-neutral`（自定义 tag）：
  - 背景：`color-mix(in srgb, var(--plaza-text-3) 4%, transparent)` → `8%`
  - 左色条 2px 保留（`borderLeftColor` inline）

### 7. 节奏紧凑

- 身份区容器：`mb-3` → `mb-2.5`
- 描述区容器：`mb-4` → `mb-3`，新增 `min-h-[2.25rem]` 给短描述兜底
- **移除**计价区上方 `<div className='pricing-section-divider' />`（标签区上方那根保留）
- `.pricing-glass-scope .pricing-section-divider`：`margin: 12px 0` → `margin: 10px 0`

### 8. renderTags 调整

`renderTags(record, priceData)`：
- **删除**「2. 折扣 chip」分支（折扣已上提为徽章）
- 计费 chip + 自定义 tag 渲染逻辑保持
- 返回容器从 `<div className='pricing-tags-row'>` 改为 `<div className='pricing-tags-row flex justify-between items-center'>`，并在内部分两组：左侧 `<div className='flex flex-wrap gap-2 items-center'>{tags + customTags}</div>`，右侧 `<button>` 复制按钮（条件复用现有 `copyText`）。
  - 实现上把"复制按钮"作为 `renderTags` 的一个参数（或在外层 JSX 直接 `flex justify-between` 包裹 `renderTags()` 与复制按钮）—— 倾向后者，避免 `renderTags` 函数签名复杂化。

### 9. PricingCardSkeleton 同步

骨架屏镜像新结构：
- 身份区右侧：移除复制按钮骨架，仅保留 `rowSelection` 时的选择框骨架
- 身份区模型名后追加一个折扣徽章骨架（`width: 56px; height: 22px; borderRadius: 999px`），50% 概率出现以模拟混合数据
- 移除计价区上方分隔线骨架
- 计价区改为 2~3 行，每行模拟「label 短 + value 长」两块（label 64px，value 120~160px）
- 标签区右端追加复制按钮骨架（`width: 24px; height: 22px; borderRadius: 6px`）

## 改动文件清单

| 文件 | 改动类型 | 说明 |
|------|---------|------|
| `web/src/components/table/model-pricing/view/card/PricingCardView.jsx` | 重构 JSX | 折扣徽章上提、复制按钮迁底、移除上分隔线、价格区改用 `formatPriceInfoCard`、`renderTags` 容器改 `justify-between` 并外层加复制按钮、节奏数值更新 |
| `web/src/components/table/model-pricing/view/card/PricingCardSkeleton.jsx` | 重构 JSX | 镜像新结构 |
| `web/src/index.css` | 新增 + 更新 CSS | 新增 `.pricing-discount-badge`、`.pricing-price-row/-label/-value`；更新 `.pricing-chip-primary/-accent/-neutral`、`.pricing-ratio-chip*`、`.pricing-section-divider` |
| `web/src/helpers/utils.jsx` | 新增函数 | `formatPriceInfoCard(priceData, t, quotaDisplayType)`，不动 `formatPriceInfo` |

不动：表格视图（`PricingTable.jsx`、`PricingTableColumns.jsx`）、详情侧边栏（`ModelDetailSideSheet.jsx`）、其它消费 `formatPriceInfo` 的位置。

## 边界与兼容

- **长模型名**：徽章 `flex-shrink:0` + 模型名 `truncate`，截断在前，徽章始终可见。
- **多模态价格**：`getModelPriceItems` 在多模态时可能返回 6+ 条，价格区纵向不设上限，跟随内容增高。
- **暗色模式**：徽章配色保持；倍率 chip 用 12% 填充。
- **移动端**：单列布局不变；复制按钮始终可见（不引入 hover-only 行为）。
- **i18n**：`{zhe}折` 中"折"字使用 `t('折')`；徽章不抽词义键。
- **国际化字串**：`输入价格`/`补全价格` 等已有键沿用 `getModelPriceItems`，不新增 i18n key。

## 不在本次范围

- 表格视图的色彩调整（用户未提及，下一轮再说）
- 详情侧边栏配色（同上）
- 顶部搜索栏 / 筛选栏色彩
- 折扣计算逻辑（`getDiscountZheByGroupRatio`、`DISCOUNT_BASE_RATIO`）
- 价格计算逻辑（`calculateModelPrice`）

## 测试与验收

实现完成后人工验收点：

1. **折扣可见性**：折扣徽章出现在模型名右侧，红橙渐变可见，长名字下不被截断。
2. **复制按钮**：底部标签行最右端，点击仍触发 `copyText(model_name)`。
3. **倍率行**：开启「显示倍率」后，三个 chip 都有可见的主色调填充。
4. **计费 chip**：「按量计费」「按次计费」为白字实心，色彩明显。
5. **价格区两列**：标签灰、数值粗，纵向对齐良好。
6. **节奏**：卡片高度比改造前小或持平，区段间不出现明显空隙。
7. **骨架屏**：加载中骨架结构与真实卡片结构一致，无跳动。
8. **暗色模式**：所有元素在暗底下保持对比；徽章未与背景争色。
9. **表格视图**：未变化（基线检验）。
10. **移动端单列**：单列下卡片各区段不溢出，徽章不挤压。
