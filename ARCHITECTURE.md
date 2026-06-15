# Liverse Hall — 前端架构说明

> 本文档定义项目的代码组织方式、模块边界和 AI 协作规范。
> **目的**：让 AI 在修改代码时清楚知道"改哪、不改哪、影响范围有多大"。

---

## 1. 目录结构总览

```
src/
├── composables/      # 可复用逻辑（纯 JS，无 UI）
│   ├── useCarousel.js          # 轮播逻辑：索引、自动播放、切换
│   ├── useModal.js             # 弹窗逻辑：显示/隐藏、ESC 关闭
│   ├── useIntersectionObserver.js  # 滚动显示动画触发
│   └── useFormatDate.js        # 日期格式化
│
├── components/       # Vue 组件（按复杂度分层）
│   ├── 原子组件（< 150 行，无业务逻辑）
│   │   ├── CarouselIndicators.vue   # 轮播指示器圆点
│   │   ├── CarouselControls.vue     # 轮播左右箭头
│   │   ├── CarouselSlide.vue        # 单张轮播幻灯片
│   │   ├── ModalImage.vue           # 弹窗图片区
│   │   ├── ModalInfo.vue            # 弹窗信息区
│   │   ├── ModalDetailItem.vue      # 弹窗详情项
│   │   ├── EventCard.vue            # 演出卡片
│   │   └── AccessCard.vue           # 交通信息卡片
│   │
│   ├── 复合组件（150-250 行，组装原子组件）
│   │   ├── HeroCarousel.vue         # 轮播容器（组装 Slide + Controls + Indicators）
│   │   ├── EventList.vue            # 演出列表（网格 + 骨架屏 + 空状态）
│   │   ├── ImageGallery.vue         # 图片画廊
│   │   ├── FAQSection.vue           # FAQ 手风琴
│   │   ├── AccessSection.vue        # 交通信息区（组装 AccessCard）
│   │   ├── EventModal.vue           # 弹窗容器（组装 ModalImage + ModalInfo）
│   │   ├── Navbar.vue               # 导航栏
│   │   └── Footer.vue               # 页脚
│   │
├── views/            # 页面级组件（只负责组装，不写业务逻辑）
│   └── HomeView.vue          # 首页：排列所有 section 组件
│
├── stores/           # 全局状态（Pinia）
│   └── eventStore.js         # 演出数据 + 加载状态 + 缓存策略
│
├── router/           # 路由
│   └── index.js              # 路由配置
│
├── styles/           # 全局样式
│   ├── variables.css         # CSS 变量（颜色/字体/间距/阴影）
│   └── animations.css        # 动画关键帧
│
├── utils/            # 工具函数
│   ├── api.js                # API 请求封装（含 fallback 逻辑）
│   └── constants.js          # 常量映射（状态/标签/导航链接）
│
└── main.js           # 应用入口
```

---

## 2. 模块边界规则

### 2.1 composables — 纯逻辑层
- **职责**：封装可复用的交互逻辑、数据转换
- **禁止**：
  - ❌ 引入 Vue 组件
  - ❌ 直接操作 DOM（除事件监听外）
  - ❌ 包含 UI 样式
- **示例**：`useCarousel` 只管理索引和定时器，不渲染任何 HTML

### 2.2 原子组件 — 最小可复用单元
- **职责**：展示单一 UI 元素，接收 props，发出事件
- **行数限制**：≤ 150 行
- **禁止**：
  - ❌ 直接调用 API
  - ❌ 使用 Pinia store
  - ❌ 包含复杂的条件渲染（> 3 个分支）
- **示例**：`CarouselIndicators` 只接收 `count` 和 `modelValue`，点击时 emit 事件

### 2.3 复合组件 — 业务组装层
- **职责**：组装原子组件，处理业务交互
- **行数限制**：≤ 250 行
- **禁止**：
  - ❌ 直接调用 fetch/axios（通过 store 或 api.js）
  - ❌ 包含重复的逻辑（提取到 composables）
- **示例**：`HeroCarousel` 组装 `CarouselSlide + Controls + Indicators`，调用 `useCarousel`

### 2.4 views — 页面编排层
- **职责**：决定页面上放哪些组件，传入静态数据
- **行数限制**：≤ 200 行
- **禁止**：
  - ❌ 包含业务逻辑
  - ❌ 包含动画/交互代码
  - ❌ 直接调用 API
- **示例**：`HomeView` 只排列组件顺序，传入 FAQ 数组

### 2.5 stores — 数据管理层
- **职责**：管理全局状态、API 调用、缓存策略
- **禁止**：
  - ❌ 包含 UI 相关代码（弹窗显示/隐藏等交给 composables）
  - ❌ 直接操作 DOM

---

## 3. AI 修改影响范围指南

当 AI 需要修改某个功能时，按以下优先级定位文件：

| 修改类型 | 优先查找 | 次选 | 避免修改 |
|---------|---------|------|---------|
| 改轮播切换速度/逻辑 | `composables/useCarousel.js` | — | `HeroCarousel.vue` |
| 改轮播指示器样式 | `components/CarouselIndicators.vue` | — | `HeroCarousel.vue` |
| 改弹窗打开/关闭行为 | `composables/useModal.js` | — | `EventModal.vue` |
| 改弹窗内详情布局 | `components/ModalInfo.vue` | — | `EventModal.vue` |
| 改日期显示格式 | `composables/useFormatDate.js` | — | 所有组件 |
| 改演出数据获取 | `stores/eventStore.js` | `utils/api.js` | 组件 |
| 改购票按钮颜色 | `styles/variables.css` | 组件 scoped | — |
| 改响应式断点 | `styles/variables.css` | 各组件 | — |
| 加新页面区块 | `views/HomeView.vue` + 新组件 | — | 现有组件 |
| 改导航链接 | `utils/constants.js` | `Navbar.vue` | — |

---

## 4. 代码规范

### 4.1 组件 props 定义
```vue
<script setup>
// 必须显式定义类型和默认值
defineProps({
  event: { type: Object, required: true },
  isActive: { type: Boolean, default: false }
})
</script>
```

### 4.2 composables 命名
- 必须以 `use` 开头
- 返回对象，键名清晰

### 4.3 样式隔离
- 组件内样式必须用 `<style scoped>`
- 全局样式只允许在 `styles/` 目录下
- 禁止在组件内硬编码颜色，必须使用 CSS 变量

### 4.4 常量集中管理
- 所有状态映射、标签文本、导航配置放在 `utils/constants.js`
- 禁止在组件内写死字符串映射

---

## 5. 技术决策记录

| 决策 | 原因 |
|------|------|
| Vue 3 Composition API | 更好的逻辑复用（composables） |
| Pinia（轻量 store） | 只存数据，UI 状态交给 composables |
| Scoped CSS | 避免样式污染，每个组件独立 |
| JSON fallback | 开发环境无需 PHP 也能运行 |
| Unsplash 占位图 | Demo 阶段快速展示效果 |

---

## 6. 后续扩展建议

| 扩展方向 | 涉及文件 |
|---------|---------|
| 添加用户系统 | 新建 `stores/userStore.js`，修改 `Navbar.vue` |
| 添加演出筛选 | 新建 `composables/useFilter.js`，修改 `EventList.vue` |
| 添加多语言 | 新建 `composables/useI18n.js`，修改 `utils/constants.js` + 所有文本 |
| 替换 JSON 为数据库 | 修改 `utils/api.js` + PHP API，前端组件不变 |
