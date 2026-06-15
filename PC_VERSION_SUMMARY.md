# Liverse 官网 PC 版本总结

> 当前版本：PC 端官网（Vue 3 + Vite）
> 状态：可正常访问、浏览，基础功能已完成
> 后续：小程序版本将基于同一套数据接口与内容结构进行适配

---

## 一、已上线页面

| 页面 | 路由 | 说明 |
|---|---|---|
| 首页 | `/` | Hero 轮播、即将上演演出、图片画廊、FAQ、交通入口、Footer |
| 演出日程 | `/events` | 日历组件 + 参考 Zepp Haneda 的演出列表 |
| 场馆 | `/venue?city=xxx` | 多城市场馆切换：北京/上海/苏州 |
| 新闻 | `/news` | 新闻列表页（占位内容） |
| 招聘 | `/jobs` | 招聘职位页（占位内容） |
| 交通/访问 | `/access` | 保留页面，但已从导航栏移除，内容并入场馆页 |

---

## 二、核心功能

### 1. 首页
- 顶部固定导航栏，滚动后背景加深
- Hero 轮播：自动播放、手动切换、指示器
- 演出卡片列表：点击卡片或"立即购票"弹出详情弹窗
- 图片画廊：横向拖拽切换
- FAQ 手风琴
- 交通信息入口
- Footer：导航 + 社交媒体图标

### 2. 演出日程 `/events`
- 月份切换日历
- 有演出的日期带橙色圆点
- 今天日期高亮
- 点击日期筛选对应演出
- 列表样式参考 Zepp Haneda：日期块 + 图片 + 标题/副标题 + OPEN/START + 多档票价 + 联系方式

### 3. 场馆 `/venue?city=xxx`
- 城市切换：北京 / 上海 / 苏州
- 每个城市独立内容：
  - SPACE 空间介绍
  - 资料下载
  - 楼层导览（含北京 CAD 剖面图）
  - 场馆设施
  - HOTEL 周边酒店（列表分页 + 高德地图）
  - 交通方式

### 4. 导航交互
- Logo 点击返回首页
- "场馆"导航项带下拉菜单，按城市分组
- 移动端汉堡菜单

### 5. 弹窗
- 点击"立即购票"/"查看详情"/演出卡片 → 弹出 EventModal
- 弹窗包含：演出图片、日期、时间、票价、场馆、介绍
- ESC 关闭、点击遮罩关闭

---

## 三、组件清单

### 原子组件
- `AccessCard.vue`
- `Calendar.vue`
- `CarouselControls.vue`
- `CarouselIndicators.vue`
- `CarouselSlide.vue`
- `EventCard.vue`
- `Icon.vue`
- `ModalDetailItem.vue`
- `ModalImage.vue`
- `ModalInfo.vue`

### 复合组件
- `HeroCarousel.vue`
- `EventList.vue`
- `EventModal.vue`
- `FAQSection.vue`
- `Footer.vue`
- `ImageGallery.vue`
- `Navbar.vue`
- `AccessSection.vue`

### Composables
- `useCarousel.js` — 轮播逻辑
- `useFormatDate.js` — 日期格式化
- `useIntersectionObserver.js` — 滚动动画
- `useModal.js` — 弹窗逻辑

### 状态管理
- `eventStore.js` — 演出数据 + 画廊数据 + 本地缓存

---

## 四、数据结构

### events.json
```json
{
  "id": "evt-001",
  "title": "星空交响音乐会",
  "subtitle": "上海交响乐团 × Liverse Hall",
  "date": "2026-06-20",
  "time": "19:30",
  "doorTime": "18:30",
  "venue": "Liverse Hall 主厅",
  "status": "onsale",
  "image": "...",
  "ticketUrl": "#",
  "description": "...",
  "tags": ["..."],
  "ticketPrices": [
    { "type": "VIP 席", "price": "¥880" }
  ],
  "contact": {
    "name": "...",
    "phone": "...",
    "email": "...",
    "hours": "..."
  }
}
```

### gallery.json
```json
{
  "id": "gal-001",
  "src": "...",
  "alt": "...",
  "caption": "..."
}
```

### VenueView 多城市数据
VenueView 内部维护 `venueData` 对象，按 `beijing/shanghai/suzhou` 切换：
- title / heroImage
- description / specs / images
- downloadFiles
- floors / facilities
- hotels / mapUrl / access

---

## 五、后端接口（PHP）

| 接口 | 路径 | 说明 |
|---|---|---|
| 演出列表 | `/api/events.php` | 返回 events.json |
| 画廊图片 | `/api/gallery.php` | 返回 gallery.json |
| 联系表单 | `/api/contact.php` | 接收表单提交 |
| 文件上传 | `/api/upload.php` | 通用上传接口 |

当前环境未安装 PHP，前端通过 fallback 直接读取 `/data/*.json`。

---

## 六、已知限制 / 待完善

1. **新闻页、招聘页**：目前为占位内容，需填充真实数据
2. **图片资源**：当前使用 Unsplash 占位图，需替换为真实场馆/演出照片
3. **苏州场馆**：数据为占位，地址/酒店/交通待确认
4. **高德地图**：使用 iframe 嵌入，未配置 JS API Key
5. **用户登录/购票**：V1 不做，后续扩展
6. **多语言**：V1 不做
7. **SEO/meta 标签**：待补充
8. **骨架屏/加载态**：部分页面已加，可统一完善

---

## 七、小程序版本建议

### 7.1 复用内容
- 同一套 `events.json` / `gallery.json` 数据
- 同一套场馆数据（北京/上海/苏州）
- 同一套演出列表逻辑、筛选逻辑

### 7.2 页面映射
| PC 页面 | 小程序页面 | 适配建议 |
|---|---|---|
| 首页 | `pages/index/index` | 简化轮播，突出今日/热门演出 |
| 演出日程 | `pages/events/events` | 保留日历 + 列表，列表改为纵向卡片 |
| 演出详情 | `pages/event-detail/event-detail` | 由弹窗升级为独立页面 |
| 场馆 | `pages/venue/venue` | 城市切换用顶部 tab，酒店+地图组合 |
| 新闻 | `pages/news/news` | 列表页 |
| 我的 | `pages/profile/profile` | 新增，用于订单/收藏 |

### 7.3 技术栈建议
- 微信小程序原生 / Taro / uni-app
- 复用现有 API 接口
- 地图组件替换为腾讯地图或高德地图小程序 SDK

### 7.4 需要新增的能力
- 用户登录（微信授权）
- 演出收藏/关注
- 购票入口跳转
- 消息通知

---

## 八、文件位置速查

```
public/
├── logo.png
├── data/
│   ├── events.json
│   └── gallery.json
└── 北京_订场Web_01.png
└── 北京_订场Web_02.png

src/
├── components/     # 组件
├── composables/    # 可复用逻辑
├── views/          # 页面
├── stores/         # Pinia 状态
├── router/         # 路由
├── styles/         # 全局样式
├── utils/          # 工具函数
└── main.js         # 入口
```
