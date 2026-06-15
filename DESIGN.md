# Liverse Hall — 设计规范 (DESIGN.md)

> 最后更新: 2026-06-11
> 上游来源: PRD.md + 用户对话
> 交互档位: L2 — 流畅交互

---

## 1. 视觉主题与氛围

### 产品性格
**深邃 · 精致 · 沉浸 · 专业**

Liverse Hall 是一个现代化演出场馆的官方网站。设计追求暗色背景下的沉浸感，让访客进入页面的瞬间感受到「这里即将有一场不容错过的现场演出」。

### 一句话定调
"在深邃的黑中，橙色光芒照亮每一场精彩演出。"

### 氛围关键词
| 关键词 | 设计体现 |
|--------|---------|
| 深邃 | 纯黑背景，让演出图片成为视觉焦点 |
| 精致 | 克制的间距、细腻的字重层级、微妙的 hover 反馈 |
| 沉浸 | 全屏轮播图、图片上的渐变遮罩、流畅的切换动效 |
| 专业 | 清晰的信息层级、明确的购票入口、完整的场馆信息 |

### 目标用户视角
面向 18-45 岁的演出爱好者，他们习惯在手机上快速浏览演出信息，对视觉品质有要求，购票决策迅速。

---

## 2. 颜色体系

### 核心原则
- 背景统一使用深色，让演出图片/海报成为视觉焦点
- 橙色仅用于 CTA 和关键状态，克制使用
- 文字严格三级递减：主文字 → 次级文字 → 弱化文字

### 语义色板

```css
:root {
  /* ── 背景色 Background ── */
  --bg-primary:   #0a0a0a;   /* 页面主背景 */
  --bg-secondary: #111111;   /* 卡片/区块背景 */
  --bg-tertiary:  #1a1a1a;   /* hover/激活态背景 */
  --bg-elevated:  #1f1f1f;   /* 弹窗/下拉菜单背景 */

  /* ── 文字色 Text ── */
  --text-primary:   #f5f5f5;   /* 标题、正文 */
  --text-secondary: #a0a0a0;   /* 描述、辅助信息 */
  --text-muted:     #666666;   /* 时间戳、占位符 */
  --text-inverse:   #0a0a0a;   /* 橙色按钮上的文字 */

  /* ── 强调色 Accent（Logo 橙色）── */
  --accent-primary: #f26522;   /* CTA按钮、当前态、hover */
  --accent-hover:   #ff7a3d;   /* hover态 */
  --accent-active:  #d4551a;   /* active态 */
  --accent-glow:    rgba(242, 101, 34, 0.25);  /* 光晕阴影 */

  /* ── 功能色 Semantic ── */
  --success: #2ecc71;   /* 成功提示 */
  --warning: #f39c12;   /* 即将开售标签 */
  --error:   #e74c3c;   /* 错误提示 */

  /* ── 边框 Border ── */
  --border-subtle:  rgba(255, 255, 255, 0.06);  /* 卡片默认边框 */
  --border-default: rgba(255, 255, 255, 0.10);  /* hover态边框 */
  --border-strong:  rgba(255, 255, 255, 0.15);  /* 选中态边框 */
}
```

### 颜色使用规则

| 场景 | 使用的颜色 | 说明 |
|------|-----------|------|
| 页面背景 | `bg-primary` | 全局统一 |
| 卡片背景 | `bg-secondary` | 与页面背景形成微妙层级 |
| 按钮默认 | `accent-primary` | 只有 CTA 按钮使用 |
| 按钮 hover | `accent-hover` + `accent-glow` | 轻微上移 + 光晕 |
| 文字标题 | `text-primary` | 近白色，确保对比度 |
| 文字正文 | `text-primary` | 近白色 |
| 文字辅助 | `text-secondary` | 灰色 |
| 禁用状态 | `text-muted` + `bg-tertiary` | 降低存在感 |
| 边框 | `border-subtle` | 尽可能微弱 |

---

## 3. 字体规范

### 字体族

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap');

:root {
  --font-display: 'DM Sans', 'Noto Sans SC', -apple-system, sans-serif;
  --font-body:    'DM Sans', 'Noto Sans SC', -apple-system, sans-serif;
  --font-mono:    'SF Mono', 'Monaco', 'Cascadia Code', monospace;
}
```

### 字号阶梯

| Token | 桌面端 | 移动端 | 字重 | 行高 | 字距 | 用途 |
|-------|--------|--------|------|------|------|------|
| display | 56px | 32px | 700 | 1.1 | -0.02em | Hero 主标题 |
| h1 | 40px | 28px | 700 | 1.15 | -0.02em | 页面大标题 |
| h2 | 32px | 24px | 600 | 1.2 | -0.01em | 区块标题 |
| h3 | 20px | 18px | 600 | 1.3 | 0 | 卡片标题 |
| body-lg | 18px | 16px | 400 | 1.7 | 0.01em | 大号正文 |
| body | 16px | 15px | 400 | 1.7 | 0.01em | 正文 |
| body-sm | 14px | 13px | 400 | 1.6 | 0.01em | 小号正文 |
| caption | 13px | 12px | 500 | 1.5 | 0.04em | 标签、时间 |
| overline | 11px | 11px | 600 | 1.4 | 0.08em | 眉标、大写英文 |

### 中文排版规则
- 行高 ≥ 1.7
- 字距 `letter-spacing: 0.02em`
- 正文字号 ≥ 15px
- 中英混排时中文字族在前，英文 fallback 在后

---

## 4. 间距系统

### 基础单位
基础单位为 **8px**，所有间距都是 8 的倍数。

### 间距 Scale

| Token | 值 | 用途 |
|-------|-----|------|
| space-1 | 4px | 图标与文字间隙 |
| space-2 | 8px | 紧凑内联间隙 |
| space-3 | 12px | 按钮内边距 |
| space-4 | 16px | 卡片内边距基准 |
| space-5 | 24px | 组件间距 |
| space-6 | 32px | 区块内部间距 |
| space-7 | 48px | 中等区块间距 |
| space-8 | 64px | 大区块间距 |
| space-9 | 96px | 区块垂直间距 |
| space-10 | 128px | Hero/超大间距 |

### 容器规范
```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;     /* 移动端 */
}
@media (min-width: 768px) {
  .container { padding: 0 32px; }
}
@media (min-width: 1024px) {
  .container { padding: 0 48px; }
}
```

---

## 5. 组件规范

### 5.1 按钮 Button

#### 主按钮 Primary
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-inverse);
  background: var(--accent-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 8px 24px var(--accent-glow);
}
.btn-primary:active {
  background: var(--accent-active);
  transform: translateY(0);
}
.btn-primary:disabled {
  background: var(--bg-tertiary);
  color: var(--text-muted);
  cursor: not-allowed;
  box-shadow: none;
}
```

#### 次级按钮 Secondary
```css
.btn-secondary {
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  background: transparent;
  border: 1px solid var(--border-default);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.btn-secondary:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}
```

### 5.2 卡片 Card

#### 演出卡片 Event Card
```css
.event-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s ease;
}
.event-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}
```

**卡片内部层级：**
- 图片区：aspect-ratio 16/10，hover 时 scale(1.05)
- 内容区：padding 20px 24px 24px
- 日期：caption 级别，橙色
- 标题：h3 级别
- 元信息：body-sm，灰色
- 购票按钮：底部通栏

### 5.3 导航栏 Navbar

```css
.navbar {
  height: 72px;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}
/* 滚动后 */
.navbar.scrolled {
  background: rgba(10, 10, 10, 0.95);
}
```

**移动端适配：**
- 高度缩减至 60px
- 汉堡菜单展开全屏覆盖

### 5.4 圆角规范

| 场景 | 圆角值 |
|------|--------|
| 按钮 | 4px |
| 卡片 | 8px |
| 弹窗 | 16px |
| 图片标签 | 4px |
| 图标容器 | 12px |

### 5.5 阴影规范

```css
--shadow-sm:  0 2px 8px  rgba(0, 0, 0, 0.2);
--shadow-md:  0 4px 16px rgba(0, 0, 0, 0.3);
--shadow-lg:  0 8px 32px rgba(0, 0, 0, 0.4);
--shadow-xl:  0 16px 48px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 40px rgba(242, 101, 34, 0.15);  /* 橙色光晕 */
```

### 5.6 状态徽章 Badge

| 状态 | 背景 | 文字 |
|------|------|------|
| 热售中 onsale | accent-primary | text-inverse |
| 已售罄 soldout | bg-elevated + border-default | text-secondary |
| 即将开售 upcoming | warning | text-inverse |

---

## 6. 动效规范

### 交互档位：L2 — 流畅交互

### 6.1 入场动画
- **fadeInUp**：通用入场，0.6s ease
- **fadeInScale**：卡片入场，0.5s ease
- 使用 IntersectionObserver 触发，threshold 0.1

### 6.2 Hover 反馈
- 按钮：上移 1px + 光晕阴影，0.25s
- 卡片：上移 4px + 放大阴影 + 图片 scale(1.05)，0.4s
- 导航链接：下划线 scaleX 展开，0.3s

### 6.3 轮播切换
- 淡入 + 轻微缩放，0.8s cubic-bezier(0.4, 0, 0.2, 1)

### 6.4 弹窗
- 打开：scale(0.95) + translateY(20px) → 正常，0.4s
- 关闭：opacity 淡出，0.3s

### 6.5 无障碍降级
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. 响应式断点

| 断点 | 名称 | 容器内边距 | 演出网格 | 导航 |
|------|------|-----------|---------|------|
| ≤ 640px | 手机 | 24px | 1列 | 汉堡菜单 |
| 641-1024px | 平板 | 32px | 2列 | 完整导航 |
| ≥ 1025px | 桌面 | 48px | 3列 | 完整导航 |

---

## 8. Do's & Don'ts

### ✅ Do
- 所有颜色通过 CSS 变量引用
- 橙色只用于 CTA 和当前状态
- 图片使用真实素材（Unsplash/用户素材）
- 触摸目标 ≥ 44×44px
- 每个可交互元素有 hover + focus 态

### ❌ Don't
- 不要用亮色背景破坏沉浸感
- 不要过度使用橙色（非 CTA 区域不用）
- 不要硬编码颜色值
- 不要用 emoji 代替图标
- 移动端不要出现横向滚动
