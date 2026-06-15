# Liverse Hall 官方网站 — 项目规范

> 本文档是面向 AI 编程 Agent（Cursor / Claude Code / Trae 等）的项目执行规范。

| 字段 | 内容 |
|------|------|
| 版本 | v1.0 |
| 创建日期 | 2026-06-11 |
| 最后更新 | 2026-06-11 |
| 状态 | 已完成 |
| 目标 Agent | Claude Code |
| 技术栈 | Vue.js 3 + Vite + 原生 PHP |

---

## 目录
1. [项目概述](#1-项目概述)
2. [技术栈与环境配置](#2-技术栈与环境配置)
3. [设计交接清单](#3-设计交接清单)
4. [页面与组件清单](#4-页面与组件清单)
5. [AI 能力配置](#5-ai-能力配置)
6. [数据模型](#6-数据模型)
7. [核心业务逻辑](#7-核心业务逻辑)
8. [状态管理](#8-状态管理)
9. [错误处理与兜底策略](#9-错误处理与兜底策略)
10. [迭代 Roadmap](#10-迭代-roadmap)

---

## 1. 项目概述

### 产品名称
Liverse Hall 官方网站

### 一句话描述
Liverse Hall 是一个现代化演出场馆的官方网站，以演出票务销售为核心，为观众提供演出信息浏览、场馆展示和购票入口的一站式服务。

### 核心价值主张
- **用户痛点**：观众难以在一个平台获取完整的演出信息、场馆信息和便捷的购票入口
- **我们的解法**：整合演出轮播展示、详细演出列表、场馆高清画廊和购票转化入口，让观众快速找到并购买心仪演出的门票
- **差异化**：以票务转化为核心目标，购票入口清晰明显；暗色风格营造演出氛围感

### 目标用户
- **主要用户**：18-45 岁的演出爱好者、音乐粉丝、文化活动参与者
- **使用场景**：在手机上或电脑上浏览即将上演的演出，查看演出详情，跳转购票

### MVP 范围声明
- ✅ V1 做：
  1. 首页 Hero 轮播图（自动+手动切换，展示重点演出）
  2. 演出列表网格（演出卡片 + 购票按钮）
  3. 场馆高清图片画廊（左右滑动切换）
  4. 固定顶部导航栏（含下拉菜单）
  5. FAQ 手风琴组件
  6. 交通信息与 Footer
  7. PHP 后端 API（演出数据、画廊数据、表单提交、图片上传）
- ❌ V1 不做：
  - 用户登录/注册系统（后续做，第一版预留入口按钮即可）
  - 在线支付/下单流程（仅提供购票入口跳转）
  - 后台管理系统（通过 JSON + 上传接口管理数据）
  - 多语言切换（仅中文）
  - 演出详情独立页面（点击后弹窗/展开即可）

### 核心用户流程
```
用户进入首页 → 浏览 Hero 轮播 → 查看演出列表 → 点击演出卡片 → 
查看详情弹窗 → 点击购票按钮 → 跳转外部购票平台
```

---

## 2. 技术栈与环境配置

### 技术栈总览
| 层面 | 选型 | 版本 | 用途 |
|------|------|------|------|
| 前端框架 | Vue.js | 3.4.x | 核心框架，单页应用 |
| 构建工具 | Vite | 5.x | 开发与构建 |
| 样式方案 | 手写 CSS | — | CSS 变量 + 动画关键帧 |
| 图标 | 内联 SVG / Lucide Vue | latest | 图标系统 |
| 路由 | Vue Router | 4.x | 单页路由 |
| 状态管理 | Pinia | 2.x | 全局状态 |
| 后端 | 原生 PHP | 8.2+ | RESTful API |
| 数据存储 | JSON 文件 | — | Demo 阶段数据持久化 |
| 部署 | 静态文件 + PHP 服务器 | — | 传统 Web 托管 |

### 项目初始化命令
```bash
# 前端初始化
npm create vue@latest liverse-website -- --typescript --router --pinia
cd liverse-website
npm install

# 额外依赖
npm install vue-router@4 pinia
```

### 项目目录结构
```
liverse_官网/
├── index.html                  # Vite 入口 HTML
├── vite.config.js              # Vite 配置
├── package.json                # 依赖管理
├── PRD.md                      # 本规范文档
├── DESIGN.md                   # 视觉规范（由 /design-spec 产出）
├── public/                     # 静态资源
│   └── images/                 # 图片资源
├── src/
│   ├── main.js                 # Vue 应用入口
│   ├── App.vue                 # 根组件
│   ├── router/                 # 路由配置
│   │   └── index.js
│   ├── stores/                 # Pinia 状态管理
│   │   └── eventStore.js
│   ├── components/             # 全局组件
│   │   ├── Navbar.vue          # 固定导航栏 + 下拉菜单
│   │   ├── HeroCarousel.vue    # 全屏轮播图
│   │   ├── EventCard.vue       # 演出卡片
│   │   ├── EventList.vue       # 演出列表网格
│   │   ├── ImageGallery.vue    # 场馆图片画廊
│   │   ├── FAQSection.vue      # FAQ 手风琴
│   │   ├── AccessSection.vue   # 交通信息
│   │   ├── Footer.vue          # 页脚
│   │   └── EventModal.vue      # 演出详情弹窗
│   ├── views/
│   │   └── HomeView.vue        # 首页（单页应用，仅一个视图）
│   ├── styles/
│   │   ├── variables.css       # CSS 变量（Design Tokens）
│   │   └── animations.css      # 动画关键帧
│   └── utils/
│       └── api.js              # API 封装（fetch 封装）
├── api/                         # PHP 后端
│   ├── config.php              # 配置（CORS、路径等）
│   ├── events.php              # GET 演出列表 / 单个演出
│   ├── gallery.php             # GET 场馆图片
│   ├── contact.php             # POST 联系表单
│   └── upload.php              # POST 图片上传
├── data/                        # JSON 数据文件
│   ├── events.json             # 演出数据
│   └── gallery.json            # 画廊数据
└── uploads/                     # 上传图片目录
```

### 环境变量
前端无需环境变量（MVP 阶段 API 使用相对路径）。

---

## 3. 设计交接清单（Design Handoff）

> 🔒 本文件不含视觉 token——只列设计输入清单，供下一步 `/design-spec` 读取并产出 `DESIGN.md`。
> 如果你看到这份 PRD 时还没跑 design-spec，请按以下流程：
> 1. 在项目根目录运行 `/design-spec`
> 2. design-spec 会读取本文件 + 第 4 节页面组件清单
> 3. 产出 `./DESIGN.md`（含完整 token + 组件样式）
> 4. 之后 AI 编程 Agent 同时加载 `PRD.md` + `DESIGN.md` 实现代码

### 3.1 产品调性关键词
深邃、精致、律动、沉浸式、专业演出空间

> 来源：用户对话 — 参考 Zepp Haneda 演出场馆官网风格

### 3.2 目标用户视觉感受
- 打开瞬间应感受到「这是一个专业的演出场馆，即将有一场不容错过的演出」
- 用户场景：在手机上快速浏览今晚或近期的演出，决定要不要买票

### 3.3 目标市场与语言
- **主市场**：中国大陆
- **主语言**：zh-CN
- **多语言切换**：不需要
- **特殊字族要求**：需 Noto Sans SC 适配中文

### 3.4 参考竞品 / 灵感方向

| 竞品/参考 | 借鉴什么 | 不借鉴什么 |
|---------|---------|-----------|
| Zepp Haneda 官网 | 暗色背景、演出列表排布、信息层级 | 日语内容、过于复杂的底部信息 |
| Live Nation | 购票按钮的突出设计、演出卡片的信息密度 | 整体亮色风格 |
| 大麦网 | 票务转化的紧迫感、清晰的购票入口 | 信息过载的页面布局 |

### 3.5 必备的视觉约束（硬性要求）
- [ ] 必须支持暗色模式（主色调为深色背景）
- [ ] 必须考虑可访问性：WCAG AA 对比度
- [ ] 必须避免：过于鲜艳的高饱和色彩（演出类网站应避免像儿童产品的色彩）
- [ ] 必须传递的核心感受：沉浸感、期待感、专业可信

### 3.6 组件清单的视觉密度提示

| 页面/组件 | 信息密度 | 操作密度 | 视觉重点 |
|---------|---------|---------|---------|
| Hero 轮播 | 低（单张大幅图片 + 标题） | 低（切换按钮 + 指示器） | 视觉冲击力、氛围感 |
| 演出列表 | 中（每屏 3-6 张卡片） | 中（卡片 hover + 购票按钮） | 卡片的信息层级、购票按钮突出 |
| 场馆画廊 | 低（单张大图展示） | 低（左右切换箭头） | 图片质量、全屏沉浸感 |
| FAQ | 高（多个问题堆叠） | 低（点击展开） | 分组清晰、可扫读 |
| 导航栏 | 中（多个菜单项 + 下拉） | 中（hover 下拉） | 清晰可点击、固定可见 |

### 3.7 design-spec 必须回答的问题（输出契约）

design-spec 在产出 `DESIGN.md` 时必须覆盖以下条目，否则视为 handoff 不完整：

- [ ] 完整色板（hex）
- [ ] 字体系统（含中文 Noto Sans SC 的 Google Fonts 引入方式）
- [ ] 间距与圆角的统一栅格（推荐 4px 或 8px）
- [ ] 动效规范（默认 L1 静态优雅，可升级至 L2）
- [ ] 组件基础样式指引（按本文件 §3.6 列出的组件类型给样式）
- [ ] 暗色模式（本文件 §3.5 要求）

---

> 📝 本模块由 PRD 产出，不含视觉 token。完整 token 由 `/design-spec` 产出 `./DESIGN.md`。

---

## 4. 页面与组件清单

### 页面路由

| 路由 | 页面名称 | 文件路径 | 功能描述 | 布局 |
|------|---------|---------|---------|------|
| / | 首页 | src/views/HomeView.vue | 包含所有模块的单页首页 | 默认布局 |

> MVP 阶段为单页应用，所有内容在首页通过滚动锚点访问。

### 组件树
```
App.vue
├── Navbar.vue                    # 固定导航
│   └── DropdownMenu.vue          # 下拉菜单（内部）
├── HomeView.vue
│   ├── HeroCarousel.vue          # 全屏轮播
│   │   ├── CarouselSlide.vue     # 单张轮播幻灯片
│   │   └── CarouselIndicators.vue # 指示器
│   ├── EventList.vue             # 演出列表区块
│   │   └── EventCard.vue         # 演出卡片（循环渲染）
│   ├── ImageGallery.vue          # 场馆画廊
│   ├── FAQSection.vue            # FAQ 手风琴
│   ├── AccessSection.vue         # 交通信息
│   └── Footer.vue                # 页脚
└── EventModal.vue                # 演出详情弹窗（全局）
```

### 核心组件定义

#### Navbar
- **文件路径**：`src/components/Navbar.vue`
- **职责**：页面顶部固定导航栏，包含 Logo、导航链接、下拉菜单
- **Props**：无（自包含）
- **内部状态**：
  - `scrolled: boolean` — 是否已滚动（控制背景透明度变化）
  - `mobileMenuOpen: boolean` — 移动端菜单是否展开
  - `activeDropdown: string | null` — 当前展开的下拉菜单标识
- **依赖**：无
- **交互行为**：
  - 滚动页面 > 50px → 导航栏背景 opacity 增加，添加阴影
  - 点击导航项 → 平滑滚动到对应锚点区域
  - hover 下拉菜单触发器 → 显示下拉菜单（延迟 150ms 隐藏）
  - 点击移动端汉堡按钮 → 展开/收起移动端菜单

#### HeroCarousel
- **文件路径**：`src/components/HeroCarousel.vue`
- **职责**：首页全屏轮播图，展示重点演出
- **Props**：
  ```typescript
  interface HeroCarouselProps {
    events: Event[];        // 要展示的演出数组（取前 5 条）
    autoPlayInterval?: number; // 自动播放间隔（默认 5000ms）
  }
  ```
- **内部状态**：
  - `currentIndex: number` — 当前显示的幻灯片索引
  - `isAutoPlaying: boolean` — 是否正在自动播放
  - `isTransitioning: boolean` — 是否正在切换中（防重复点击）
- **依赖**：无
- **交互行为**：
  - 页面加载 → 自动开始轮播
  - 点击左右箭头 → 切换上一张/下一张
  - 点击底部指示器 → 跳转到对应幻灯片
  - 鼠标悬停 → 暂停自动播放
  - 鼠标离开 → 恢复自动播放

#### EventCard
- **文件路径**：`src/components/EventCard.vue`
- **职责**：单个演出信息卡片，展示演出的核心信息和购票入口
- **Props**：
  ```typescript
  interface EventCardProps {
    event: Event;           // 演出数据对象
  }
  ```
- **内部状态**：无
- **依赖**：无
- **交互行为**：
  - hover 卡片 → 图片放大、卡片上浮、显示 spotlight 光效
  - 点击卡片 → 打开 EventModal 显示详情
  - 点击购票按钮 → 阻止事件冒泡，跳转外部购票链接

#### EventList
- **文件路径**：`src/components/EventList.vue`
- **职责**：演出列表的容器，负责网格布局和筛选展示
- **Props**：
  ```typescript
  interface EventListProps {
    events: Event[];        // 全部演出数据
    title?: string;         // 区块标题（默认"即将上演"）
  }
  ```
- **内部状态**：无
- **依赖**：EventCard
- **交互行为**：
  - 滚动到视口 → 触发卡片 stagger 入场动画

#### ImageGallery
- **文件路径**：`src/components/ImageGallery.vue`
- **职责**：场馆高清图片画廊，支持左右滑动切换
- **Props**：
  ```typescript
  interface ImageGalleryProps {
    images: GalleryImage[]; // 图片数组
  }
  ```
- **内部状态**：
  - `currentIndex: number` — 当前显示的图片索引
  - `isDragging: boolean` — 是否正在拖拽
  - `startX: number` — 拖拽起始 X 坐标
- **依赖**：无
- **交互行为**：
  - 点击左右箭头 → 切换上一张/下一张
  - 鼠标/触摸拖拽 → 跟随移动，释放后判断是否切换
  - 键盘左右方向键 → 切换图片

#### FAQSection
- **文件路径**：`src/components/FAQSection.vue`
- **职责**：常见问题手风琴组件
- **Props**：
  ```typescript
  interface FAQSectionProps {
    faqs: FAQ[];            // FAQ 数据数组
  }
  ```
- **内部状态**：
  - `openIndex: number | null` — 当前展开的问题索引
- **依赖**：无
- **交互行为**：
  - 点击问题 → 展开/收起答案，带高度过渡动画

#### EventModal
- **文件路径**：`src/components/EventModal.vue`
- **职责**：演出详情弹窗，展示演出的完整信息
- **Props**：
  ```typescript
  interface EventModalProps {
    event: Event | null;    // 当前展示的演出
    visible: boolean;       // 是否可见
  }
  ```
- **内部状态**：无
- **依赖**：无
- **交互行为**：
  - 点击关闭按钮 → 关闭弹窗
  - 点击遮罩层 → 关闭弹窗
  - 按 ESC 键 → 关闭弹窗
  - 点击购票按钮 → 跳转外部购票链接

---

## 5. AI 能力配置

> 本产品不涉及 AI 调用，本模块跳过。

---

## 6. 数据模型

### 数据实体

#### Event（演出）
```typescript
interface Event {
  id: string;                    // 唯一标识（如 "evt-001"）
  title: string;                 // 演出标题
  subtitle?: string;             // 副标题/演出者
  date: string;                  // 演出日期（ISO 格式：YYYY-MM-DD）
  time: string;                  // 演出时间（如 "19:30"）
  doorTime?: string;             // 入场时间（如 "18:30"）
  venue: string;                 // 场馆名称
  description: string;           // 演出简介
  image: string;                 // 封面图片 URL
  price: string;                 // 票价信息（如 "¥180 - ¥580"）
  ticketUrl: string;             // 购票链接
  status: 'onsale' | 'soldout' | 'upcoming'; // 售票状态
  tags: string[];                // 标签（如 ["摇滚", "Live"]）
  createdAt: string;             // 创建时间（ISO）
  updatedAt: string;             // 更新时间（ISO）
}
```

#### GalleryImage（画廊图片）
```typescript
interface GalleryImage {
  id: string;                    // 唯一标识
  src: string;                   // 图片 URL
  alt: string;                   // 图片描述
  caption?: string;              // 图片标题/说明
  category: string;              // 分类（如 "场馆外景", "舞台", "观众席"）
}
```

#### FAQ（常见问题）
```typescript
interface FAQ {
  id: string;                    // 唯一标识
  question: string;              // 问题
  answer: string;                // 答案
}
```

#### ContactForm（联系表单）
```typescript
interface ContactForm {
  name: string;                  // 姓名
  email: string;                 // 邮箱
  subject: string;               // 主题
  message: string;               // 留言内容
  submittedAt: string;           // 提交时间（ISO，后端生成）
}
```

### 本地存储
| Key | 数据类型 | 用途 | 过期策略 |
|-----|---------|------|---------|
| liverse_events_cache | string | 演出数据缓存 | 5 分钟 |
| liverse_gallery_cache | string | 画廊数据缓存 | 10 分钟 |

### 数据流向
```
用户访问首页 → 前端调用 GET /api/events.php → PHP 读取 data/events.json → 返回 JSON → 前端渲染
用户访问首页 → 前端调用 GET /api/gallery.php → PHP 读取 data/gallery.json → 返回 JSON → 前端渲染
用户提交表单 → 前端 POST /api/contact.php → PHP 保存到 data/contacts.json → 返回成功状态
管理员上传图片 → POST /api/upload.php → PHP 保存到 uploads/ → 返回图片 URL
```

---

## 7. 核心业务逻辑

### 7.1 演出数据展示

#### 触发条件
页面加载时自动调用

#### 处理流程
```
页面加载 → 调用 GET /api/events.php
         → 检查缓存是否有效
         → 有效：读取 localStorage 缓存
         → 无效：发起 API 请求 → 后端读取 events.json → 返回 JSON → 存入 localStorage
         → 按日期排序（最近的在前）
         → 渲染 HeroCarousel（取前 5 条）
         → 渲染 EventList（取全部）
```

#### 业务规则
- 演出按日期升序排列（最近的在前）
- HeroCarousel 最多展示 5 条
- 已售罄的演出显示"售罄"标签，购票按钮禁用
- 日期已过期的演出自动隐藏

#### 边界情况
| 场景 | 系统行为 | 用户感知 |
|------|---------|---------|
| 无演出数据 | 显示"暂无演出"占位 | 看到空状态提示 |
| API 请求失败 | 显示缓存数据或错误提示 | 看到"数据加载失败，请刷新" |
| 所有演出已过期 | 显示"敬请期待下一场演出" | 看到空状态提示 |

### 7.2 轮播图交互

#### 触发条件
用户操作或自动播放

#### 处理流程
```
触发切换 → 判断切换方式
         → 自动：定时器触发
         → 手动箭头：用户点击左右箭头
         → 指示器：用户点击底部圆点
         → 计算新索引（判断是否越界，越界则循环）
         → 执行切换动画
         → 更新当前索引和指示器状态
```

#### 业务规则
- 自动播放间隔 5000ms
- 切换动画持续时间 800ms
- 切换过程中禁止重复触发
- 鼠标悬停时暂停自动播放
- 支持无限循环（到最后一张后回到第一张）

### 7.3 演出详情弹窗

#### 触发条件
用户点击演出卡片

#### 处理流程
```
用户点击卡片 → 阻止事件冒泡
              → 设置当前演出数据
              → 显示弹窗
              → 锁定 body 滚动
              → 弹窗内容 fadeIn + scaleIn 动画
              → 等待用户操作（关闭/购票/ESC）
              → 关闭时恢复 body 滚动
```

### 7.4 图片画廊交互

#### 触发条件
用户点击切换按钮或拖拽

#### 处理流程
```
用户操作 → 判断操作类型
         → 点击箭头：计算新索引
         → 拖拽：记录拖拽距离，判断阈值
         → 键盘：计算新索引
         → 判断是否越界（越界则循环）
         → 执行切换动画
         → 更新索引和指示器
```

#### 业务规则
- 拖拽阈值：50px
- 切换动画：300ms ease-out
- 支持键盘导航（左右方向键）
- 移动端支持触摸滑动

### 7.5 联系表单提交

#### 触发条件
用户填写并提交联系表单

#### 处理流程
```
用户点击提交 → 前端表单验证
              → 验证通过 → 发送 POST /api/contact.php
              → 后端接收数据 → 验证必填字段
              → 验证通过 → 保存到 contacts.json → 返回 200
              → 验证失败 → 返回 400 错误
              → 前端显示成功/错误提示
              → 成功时清空表单
```

#### 业务规则
- 必填字段：name、email、message
- email 必须符合邮箱格式
- 后端做 XSS 过滤（htmlspecialchars）
- 提交成功后清空表单

---

## 8. 状态管理

### 全局状态结构（Pinia Store）

```typescript
// stores/eventStore.ts
import { defineStore } from 'pinia'

export interface EventState {
  // 数据状态
  events: Event[]
  galleryImages: GalleryImage[]
  faqs: FAQ[]
  
  // UI 状态
  selectedEvent: Event | null
  modalVisible: boolean
  
  // 加载状态
  eventsLoading: boolean
  galleryLoading: boolean
  
  // 错误状态
  eventsError: string | null
  galleryError: string | null
}

export const useEventStore = defineStore('events', {
  state: (): EventState => ({
    events: [],
    galleryImages: [],
    faqs: [],
    selectedEvent: null,
    modalVisible: false,
    eventsLoading: false,
    galleryLoading: false,
    eventsError: null,
    galleryError: null
  }),
  
  getters: {
    upcomingEvents: (state) => {
      const now = new Date()
      return state.events
        .filter(e => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    },
    heroEvents: (state) => {
      const now = new Date()
      return state.events
        .filter(e => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)
    }
  },
  
  actions: {
    async fetchEvents() {
      this.eventsLoading = true
      this.eventsError = null
      try {
        const response = await fetch('/api/events.php')
        if (!response.ok) throw new Error('加载失败')
        this.events = await response.json()
      } catch (error) {
        this.eventsError = error instanceof Error ? error.message : '未知错误'
      } finally {
        this.eventsLoading = false
      }
    },
    
    async fetchGallery() {
      this.galleryLoading = true
      this.galleryError = null
      try {
        const response = await fetch('/api/gallery.php')
        if (!response.ok) throw new Error('加载失败')
        this.galleryImages = await response.json()
      } catch (error) {
        this.galleryError = error instanceof Error ? error.message : '未知错误'
      } finally {
        this.galleryLoading = false
      }
    },
    
    openEventModal(event: Event) {
      this.selectedEvent = event
      this.modalVisible = true
      document.body.style.overflow = 'hidden'
    },
    
    closeEventModal() {
      this.modalVisible = false
      this.selectedEvent = null
      document.body.style.overflow = ''
    }
  }
})
```

### Store 划分
| Store 名称 | 职责 | 包含状态 |
|-----------|------|---------|
| eventStore | 演出数据与 UI | events, galleryImages, selectedEvent, modalVisible, loading/error |

### 持久化策略
- 演出数据：API 响应后存入 localStorage（5 分钟缓存）
- 画廊数据：API 响应后存入 localStorage（10 分钟缓存）
- UI 状态（弹窗等）：不持久化，页面刷新后重置

---

## 9. 错误处理与兜底策略

### 错误分类
| 错误类型 | 触发条件 | 处理方式 | 用户提示 | 恢复策略 |
|---------|---------|---------|---------|---------|
| API 请求失败 | fetch 返回非 200 | 捕获错误 | "数据加载失败，请稍后重试" | 提供"重新加载"按钮 |
| 网络断开 | fetch 抛出异常 | 检测网络 | "网络连接中断" | 自动重试 3 次 |
| 数据解析错误 | JSON 解析失败 | 捕获错误 | "数据格式异常" | 提示联系管理员 |
| 图片加载失败 | img onerror | 显示占位图 | 无提示（静默处理） | 使用灰色占位背景 |
| 表单验证失败 | 必填字段为空 | 阻止提交 | 字段级红色提示 | 用户修正后重试 |
| 表单提交失败 | API 返回错误 | 捕获错误 | "提交失败，请稍后重试" | 保留表单数据 |

### Loading 状态规范
| 场景 | Loading 方式 | 持续时间预期 | 超时处理 |
|------|-----------|------------|---------|
| 演出列表加载 | 骨架屏（3 个卡片占位） | < 1s | 显示错误提示 |
| 画廊加载 | 图片淡入（灰色占位 → 图片） | < 2s | 显示占位图 |
| 表单提交 | 按钮 loading（文字变 spinner） | < 3s | 按钮恢复可点击 |

### 空状态设计
| 页面/组件 | 空状态文案 | 引导动作 |
|----------|-----------|---------|
| 演出列表 | "暂无即将上演的演出，敬请期待" | 无 |
| 画廊 | "暂无图片" | 无 |
| 轮播图 | 显示默认占位图 | 无 |

---

## 10. 迭代 Roadmap

### V1 → V2 升级清单
| 功能 | 优先级 | 前置依赖 | 预估复杂度 | 备注 |
|------|-------|---------|-----------|------|
| 演出详情独立页面 | P1 | 路由配置 | 中 | 从弹窗升级为独立页面，支持分享 |
| 后台管理界面 | P1 | 用户认证 | 高 | 演出增删改查、图片管理 |
| 用户登录/收藏 | P2 | 数据库 | 高 | 用户收藏演出、购票历史 |
| 演出筛选/搜索 | P2 | — | 中 | 按日期、类型、价格筛选 |
| 在线选座预览 | P2 | 座位数据 | 高 | 可视化选座图 |
| 多语言支持 | P3 | i18n 配置 | 中 | 中英文切换 |
| 新闻/公告模块 | P3 | — | 低 | 场馆新闻展示 |

### 长期方向
成为区域内最具影响力的演出场馆数字门户，不仅提供票务信息，更成为演出文化的内容平台和社区。

### 已知技术债
| 技术债 | 影响范围 | 建议解决时机 |
|-------|---------|------------|
| JSON 文件存储 | 数据管理、并发写入 | V2 迁移到 MySQL/PostgreSQL |
| 无用户认证 | 无法做个性化 | V2 引入 JWT 认证 |
| 单页应用 SEO | 搜索引擎收录 | V2 引入 SSR 或预渲染 |
| 图片无 CDN | 加载速度 | V2 接入云存储 CDN |

---

## 质量审查记录

**文件结构**：
- [x] 所有必含模块齐全（1-10 章）
- [x] 可选模块正确跳过（第 5 章 AI 能力，本产品不涉及 AI）

**各模块质量**：
| 文件 | 结果 | 备注 |
|------|------|------|
| 1. 项目概述 | ✅ | 一句话描述通过电梯测试，MVP 范围明确 |
| 2. 技术栈 | ✅ | 版本具体，初始化命令完整 |
| 3. 设计交接 | ✅ | 无 hex/字体 URL/CSS 变量越界 |
| 4. 页面组件 | ✅ | 每个组件有 Props 接口定义 |
| 5. AI 能力 | — | 本产品不涉及 AI，已跳过 |
| 6. 数据模型 | ✅ | TypeScript 接口定义完整 |
| 7. 业务逻辑 | ✅ | 每个功能有流程描述 |
| 8. 状态管理 | ✅ | Pinia Store 定义完整 |
| 9. 错误处理 | ✅ | 边界情况覆盖 ≥ 3 种 |
| 10. Roadmap | ✅ | V2 功能来自"不做清单" |

**跨文件一致性**：
- [x] 数据一致性：V1 功能与 MVP 范围声明对齐
- [x] 反模糊：无模糊描述
- [x] 技术栈一致性：Vue.js 与组件 Props 格式吻合
