# Liverse Hall PC 官网

这是 **Liverse Hall** 的 PC 端官方网站项目，基于 **Vue 3 + Vite** 开发。

---

## 🌐 在线预览链接

**直接访问：** https://liaojianquan9-source.github.io/liverse-pc/

你可以把这个链接复制给老板、家人或朋友，他们在手机或电脑上都能直接打开看。

---

## 📦 这个项目里有什么

| 目录/文件 | 说明 |
|---|---|
| `src/` | 网站的页面、组件、样式等源代码 |
| `public/` | 静态资源，比如图片、logo |
| `data/` | 演出活动和图集的数据（JSON 文件） |
| `api/` | PHP 后端接口（仅供开发/服务器环境使用） |
| `index.html` | 网站入口文件 |
| `package.json` | 项目依赖和脚本命令 |
| `vite.config.js` | 构建工具配置 |

---

## ⚙️ 本地开发（可选）

如果你以后想自己修改网站内容，可以在本地运行：

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
```

运行后，浏览器打开 `http://localhost:3000` 即可预览。

---

## 🚀 如何更新网站

因为网站是部署在 **GitHub Pages** 上的，所以更新步骤是：

1. 修改 `src/` 里的代码或 `data/` 里的数据
2. 运行 `npm run build`，生成新的 `dist/` 文件夹
3. 把 `dist/` 里的所有文件上传到 GitHub 的 `gh-pages` 分支
4. 等待 1~2 分钟，访问上面的链接即可看到更新后的内容

> 如果你不会操作，也可以直接告诉我，我帮你更新。

---

## ⚠️ 重要说明：GitHub Pages 能做什么、不能做什么

**GitHub Pages 是一个免费的静态网站托管服务**，意思是：

- ✅ 可以展示网页、图片、文字内容
- ✅ 可以运行 Vue/React 等前端代码
- ❌ **不能运行 PHP 后端代码**

所以目前这个网站：

| 功能 | 在 GitHub Pages 上是否可用 |
|---|---|
| 首页展示 | ✅ 可用 |
| 演出活动列表 | ✅ 可用 |
| 场馆介绍 | ✅ 可用 |
| 图集展示 | ✅ 可用 |
| 联系表单提交 | ❌ 不可用（会显示“演示模式：提交成功”，但实际不会发送） |

如果以后需要真实的联系表单提交功能，需要额外接入一个后端服务（比如 Formspree、腾讯云函数、或者自己租服务器跑 PHP）。

---

## 🛠️ 技术栈

- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)

---

## 📮 有问题怎么办？

如果你看不懂、不会更新，或者想把网站改得更好看，随时告诉我。
