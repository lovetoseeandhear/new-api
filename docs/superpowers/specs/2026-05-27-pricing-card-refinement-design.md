# Pricing Card Refinement — Design Spec

**Date:** 2026-05-27
**Scope:** `/pricing` 页面模型卡片（`PricingCardView.jsx`）的信息层次、倍率展示、标签展示重塑
**Out of scope:** 表格视图、过滤器、搜索栏、骨架屏以外的其他组件；任何功能/数据流变化

## 1. 背景与动机

模型广场 Glassmorphism 主体已于 2026-05-26 落地。卡片视图（`PricingCardView.jsx`）虽然已套用玻璃化外壳与 `pricing-chip-*` 体系，但卡片**内部信息结构**仍是早期堆叠布局：

- 倍率信息：3 列纯文本网格，缺乏视觉层次
- 标签行：计费、折扣、自定义三类语义混排，权重相同
- 价格信息贴在标题下方，与"身份信息"耦合
- 折扣 chip 出现在标题区，与其计价语义错位

目标是在不改变任何功能与数据流的前提下，让卡片**信息分区清晰、视觉权重正确、计价语义聚拢**。

## 2. 目标 / 非目标

**目标**
- 重组卡片为三个清晰区段：**身份 / 计价 / 标签**
- 倍率信息从 3-col 网格重构为安静的 chip 行
- 标签区采取实/实/描三档质感（计费实、折扣实、自定义描）
- 折扣 chip 从标题区下移到标签区（与计费 chip 相邻，计价语义聚拢）
- 暗色 + 浅色双主题下文本对比度满足 WCAG AA
- 骨架屏与新结构 1:1 对齐

**非目标**
- 不改变任何数据/状态/事件行为（click → openModelDetail；copy；checkbox；help tooltip 全部保留）
- 不改卡片整体 grid 布局（`grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3`）
- 不改表格视图（`PricingTableView`）
- 不引入新依赖
- 不改变可视区域之外的样式 token（`--plaza-*`）

## 3. 区段结构

```
┌────────────────────────────────────────────┐
│ ⓘ icon   Title …             [Copy] [☑]   │  ◀ 身份区
│                                            │
│         描述文案 line-clamp-2…             │
├ — — — — — — — — — — — — — — — — — — — — — ┤
│ 价格信息（3 行 mono）                       │  ◀ 计价区
│ [×2.0 模型] [×2.0 补全] [×1.0 分组]  ⓘ     │
├ — — — — — — — — — — — — — — — — — — — — — ┤
│ [按量计费] [5折] [自定义A] [自定义B]        │  ◀ 标签区
└────────────────────────────────────────────┘
```

**区段间距**：每段 `12px` 垂直 padding；区段之间用 `.pricing-section-divider` 细线。
**最后一段（标签区）下方无 divider**。
**身份区与计价区之间**：描述用 `flex-1` 撑开，divider 紧贴计价区上方。

## 4. 身份区

**结构**
- 第一行：模型 icon (48×48 `.pricing-card-icon-wrap`) + Title（`h3 text-base font-semibold truncate`） + 右侧操作（Copy + Checkbox）
- 第二行：描述（`text-xs line-clamp-2 leading-relaxed text-[var(--plaza-text-3)]`）

**与现状的差异**
- ❌ 折扣 chip 从 Title 右侧**移除**（迁到标签区）
- ❌ 价格信息（`formatPriceInfo`）从 Title 下方**移除**（迁到计价区）
- ✅ Copy 按钮与 Checkbox 行为/样式不变

## 5. 计价区

**结构**
```
价格信息（3 行 mono，与现有 formatPriceInfo 输出一致）
┌─ Ratio Row ───────────────────────────────────────┐
│ [×2.0 模型] [×2.0 补全] [×1.0 分组]   倍率信息 ⓘ │
└────────────────────────────────────────────────────┘
```

**显隐规则**
- `showRatio === false` → 整个**计价区只保留价格信息**，不渲染 ratio row，不渲染 caption + ⓘ。
- `quota_type === 1`（按次计费）→ ratio row 只渲染分组 chip（模型/补全不渲染）。
- `usedGroupRatio === undefined / null` → 分组 chip 显示 "—"。

**Caption 与 Help**
- 文本 "倍率信息" 与 ⓘ Help icon 移动到 ratio row 行末，使用 `pricing-caption` + 已有 Tooltip + click handler 打开 `ratio.png` modal。
- 当 `showRatio === false` 时不渲染。

## 6. 倍率 chip 规范

**HTML 结构**
```jsx
<span className="pricing-ratio-chip">
  <span className="pricing-ratio-chip-value">×2.0</span>
  <span className="pricing-ratio-chip-label">模型</span>
</span>
```

**视觉规则（`.pricing-ratio-chip`）**
- 半径：`999px`（pill）
- Padding：`2px 8px`
- Gap：`6px`
- 字号：`11px`
- 背景：透明
- 边框：`1px solid var(--plaza-border)`
- Value：`pricing-mono` + `font-weight: 500` + `color: var(--plaza-text-1)`
- Label：`color: var(--plaza-text-3)`
- Hover：边框 `color-mix(in srgb, var(--plaza-primary) 35%, var(--plaza-border))`

**容器（`.pricing-ratio-row`）**
- `display: flex; flex-wrap: wrap; gap: 6px; align-items: center;`

**安静性**：刻意比下方计费/折扣 chip 视觉更轻，避免与"状态"chip 争权重。

## 7. 标签区

**结构（一行，wrap）**
```
[按量计费]  [5折]  [自定义A] [自定义B] [自定义C]
   实         实       描         描         描
```

**容器（`.pricing-tags-row`）**
- `display: flex; flex-wrap: wrap; align-items: center; gap: 8px;`
- 替换现有 `flex items-center justify-between`

**渲染顺序**
1. 计费 chip（`按量计费` / `按次计费`）
2. 折扣 chip（仅当 `getDiscountZheByGroupRatio(usedGroupRatio) !== null`）
3. 自定义 tags（来自 `record.tags`，逗号分隔；用 `renderLimitedItems` maxDisplay 3）

**三档质感**

| Chip | className | 填充 | 边框 |
|---|---|---|---|
| 计费 `按量计费` | `pricing-chip pricing-chip-primary` | primary 14% | 无 |
| 计费 `按次计费` | `pricing-chip pricing-chip-accent` | accent 14% | 无 |
| 折扣 `5折` | `pricing-chip pricing-chip-accent` | accent 14% | 无 |
| 自定义 | `pricing-chip pricing-chip-neutral` + inline `border-left` | 透明 | 1px border（top/right/bottom）+ inline `border-left: 2px solid stringToColor(tag)` |

**清理**
- 移除 Semi `<Tag color='teal'>` `color='violet'` `color='green'` props——与 `pricing-chip-*` 的 `!important` 重复，会引入冗余样式声明。

## 8. CSS 新增 / 调整

新增到 `web/src/index.css` 已有 plaza CSS 段尾部（scope 内）：

```css
.pricing-glass-scope .pricing-section-divider {
  height: 1px;
  background: color-mix(in srgb, var(--plaza-border) 60%, transparent);
  margin: 12px 0;
}

.pricing-glass-scope .pricing-ratio-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.pricing-glass-scope .pricing-ratio-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--plaza-border);
  background: transparent;
  font-size: 11px;
  line-height: 1.6;
  transition: border-color 160ms ease;
}

.pricing-glass-scope .pricing-ratio-chip:hover {
  border-color: color-mix(in srgb, var(--plaza-primary) 35%, var(--plaza-border));
}

.pricing-glass-scope .pricing-ratio-chip-value {
  font-family: var(--plaza-font-mono);
  font-weight: 500;
  color: var(--plaza-text-1);
}

.pricing-glass-scope .pricing-ratio-chip-label {
  color: var(--plaza-text-3);
}

.pricing-glass-scope .pricing-tags-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
```

**不需要改动**：`.pricing-chip-*` 系列、`--plaza-*` token、`.pricing-card-icon-wrap`、`.pricing-glass-card`、`pricing-caption`、`pricing-mono`。

## 9. JSX 修改清单（`PricingCardView.jsx`）

**`renderDiscountTag`**：不再在 Title 区调用，移到 `renderTags` 内部按计价语义顺序渲染。

**`renderTags(record, priceData)`**：签名加 `priceData` 参数，内部按 `[billing, discount, ...customs]` 顺序输出，容器改为 `.pricing-tags-row`。

**主渲染区（line ~263-370）**：
- 删除 line 281-283（折扣 chip 在 Title 旁）
- 删除 line 285-287（价格信息在 Title 下方）
- `身份区`（line 273-316）保留 header + Copy + Checkbox
- `描述区`（line 318-323）保留
- **新增** `mt-auto` 后：
  - `.pricing-section-divider`（仅当价格或倍率会显示时渲染）
  - 价格信息块（从 line 285 迁移）
  - 倍率区：`.pricing-section-divider` + `.pricing-ratio-row` + caption + ⓘ（仅当 `showRatio` 为真时）
- 标签区：`.pricing-section-divider` + `renderTags(model, priceData)`

**移除冗余**：删除 Semi `<Tag>` 上的 `color='teal'` `color='violet'` `color='green'` 等 prop。

## 10. 骨架屏（`PricingCardSkeleton.jsx`）

镜像新结构：

```
┌────────────────────────────────────────────┐
│ ▢ icon  ▭▭▭▭▭ title              ▢ ▢      │
│         ▭▭▭▭▭▭▭▭▭▭▭▭▭ desc                │
├ — — — — — — — — — — — — — — — — — — — — — ┤
│ ▭▭ price ▭▭ price ▭▭ price                 │
│ ▰ ▰ ▰   (3 个 ratio chip 占位)              │
├ — — — — — — — — — — — — — — — — — — — — — ┤
│ ▰ ▰▰▰ ▰▰▰   (4 个 tag chip 占位)            │
└────────────────────────────────────────────┘
```

- ratio chip 占位：`24px × 12px` 圆角矩形，3 个，`pricing-skeleton` 的浅色
- tag chip 占位：`52px × 18px` pill，3-4 个
- `showRatio === false` 时去掉 ratio chip 占位与一道 divider

## 11. 可访问性

- **对比**：所有文本对 `--plaza-surface-*` 背景对比 ≥ 4.5:1（AA）。`pricing-chip-primary` / `pricing-chip-accent` 已是 WCAG 修正色，不动。Ratio chip value 用 `var(--plaza-text-1)`，label 用 `var(--plaza-text-3)`，浅/暗双模式都通过。
- **键盘**：现有 `cursor: pointer` 卡片点击保留，Copy 按钮 / Checkbox 焦点环不动。
- **降级**：`prefers-reduced-motion` 下 `.pricing-ratio-chip:hover` 的过渡 0ms（与 plaza scope 全局规则一致，无需新增）。

## 12. 验收

**视觉**
- [ ] 卡片三个区段视觉分层清晰，分隔细线可见但不抢眼
- [ ] 倍率 chip 行视觉比下方计费/折扣 chip "更安静"
- [ ] 折扣 chip 出现时与计费 chip 视觉权重一致
- [ ] 自定义 tag 左色条与现有逻辑一致（不被 `border-color` shorthand 覆盖）

**功能（不变）**
- [ ] 卡片点击 → `openModelDetail` 行为不变
- [ ] Copy / Checkbox / ⓘ 三处 `stopPropagation` 不变
- [ ] ⓘ Help tooltip 点开 ratio.png modal 不变

**响应式**
- [ ] 移动端 ratio chip 与 tag chip 自然 wrap，无 overflow
- [ ] 1 / 2 / 3 列布局下卡片高度协调

**主题**
- [ ] `body[theme-mode='dark']` + `html.dark` 双选择器下文字对比 ≥ AA
- [ ] 选中态 `data-selected` hover/glow 边框继续生效

**骨架屏**
- [ ] 骨架结构与真实卡片 1:1 对齐，加载切换无跳动

## 13. 不会发生的变更

- 不改任何上游 API / DTO / store
- 不改卡片网格列数与外部 padding
- 不改 `--plaza-*` token 值
- 不改其他视图（表格、过滤器、搜索栏、骨架屏外的组件）
- 不改 `formatPriceInfo` 输出格式
- 不改 `getDiscountZheByGroupRatio` 计算逻辑
- 不改 `stringToColor` 算法
