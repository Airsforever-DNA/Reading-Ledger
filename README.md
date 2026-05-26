# 静心书斋

> 修身养性，博闻强识

一个文艺书香风格的个人读书笔记网站。

## 📁 项目结构

```
静心书斋/
├── index.html              # 首页（英雄区 + 统计 + 最新笔记流 + 脑图 + 社交/订阅）
├── books.html              # 读书笔记列表页（搜索 + 标签筛选）
├── book-detail.html        # 读书笔记详情页
├── mindmaps.html           # 脑图陈列页
├── chenghuaiweixiang.html  # 澄怀味象（经典）
├── jingshizhiyong.html     # 经世致用（致用）
├── shiciyaji.html          # 诗词雅集（含诗人堂入口）
├── css/
│   ├── premium.css         # ⭐ 高级设计系统（配色/导航/页脚/卡片/动效）
│   ├── style.css           # 旧版主样式
│   ├── books.css           # 列表页旧样式
│   ├── poetry.css          # 诗词/卡片样式
│   └── book-detail.css     # 详情页样式
├── js/
│   ├── site.js             # ⭐ 共享交互（统一导航/页脚/弹层、信息流、统计、订阅）
│   ├── books.js            # ⭐ 书籍数据配置（在这里添加笔记）
│   ├── books-page.js       # 笔记列表页逻辑（搜索/标签/排序）
│   ├── book-detail.js      # 详情页逻辑
│   ├── main.js             # （旧）首页逻辑，现已由 index.html 内联脚本取代
│   ├── quotes.js / images.js
├── images/
│   ├── backgrounds/        # 🖼️ 首页轮播风景照
│   ├── covers/             # 📚 书籍封面
│   ├── mindmaps/           # 🧠 脑图图片
│   └── social/             # 📱 wechat-qr.png（公众号二维码）
└── README.md
```

## 🚀 快速开始

### 1. 添加背景图片

将你的风景照片放入 `images/backgrounds/` 文件夹，然后运行：

```bash
python tools/generate-images.py
```

脚本会自动扫描图片并更新 `js/images.js`。

### 2. 添加书籍

编辑 `js/books.js` 文件，按照以下格式添加书籍：

```javascript
{
    id: "book-007",           // 唯一ID
    title: "书名",
    author: "作者",
    nationality: "国籍",
    publisher: "出版社",
    isbn: "978-x-xxx-xxxxx-x",
    date: "2024-03-15",       // 阅读日期（信息流按此排序）
    cover: "images/covers/bookname.jpg",  // 封面（缺失时自动用书脊式占位）
    category: "classics",     // classics(经典)/practical(致用)/poetry(诗词)
    tags: ["历史", "认知"],     // 标签，用于首页统计与列表页筛选
    excerpt: "一句话摘要，展示在信息流卡片上",
    wordCount: 4200,          // 笔记字数（用于统计与阅读时长）
    summary: "内容概述...",
    structure: [              // 结构框架（手风琴展示）
        {
            chapter: "第一章 章节名",
            content: "章节概述",
            sections: [       // 子章节（可选）
                { title: "小节标题", content: "小节内容" }
            ]
        }
    ],
    highlights: [             // 经典回顾
        { text: "经典语句", note: "个人感悟" }
    ]
}
```

### 3. 本地预览

由于使用了 ES6 模块和跨域资源，建议使用本地服务器预览：

**方式一：Python**
```bash
cd 静心书斋
python -m http.server 8000
```
然后访问 http://localhost:8000

**方式二：VS Code**
安装 "Live Server" 插件，右键 index.html 选择 "Open with Live Server"

**方式三：Node.js**
```bash
npx serve
```

## ✨ 功能特性

- 💎 **墨韵鎏金设计系统**：统一的高级东方视觉（墨色 + 宣纸 + 鎏金），玻璃拟态卡片、滚动揭示动效
- 📰 **最新读书笔记信息流**：首页与列表页用精美卡片展示笔记，自动取自 `books.js`
- 📊 **数据统计**：笔记数 / 诗词 / 字数 / 标签，滚动到时数字递增
- 🔎 **搜索 + 标签筛选**：笔记列表页支持按书名/作者/标签实时检索与归类
- 🧠 **脑图陈列**：独立页面展示思维导图，含 CSS 绘制的演示脑图
- 📱 **社交双向链接**：公众号（扫码弹层）/ 抖音 / 小红书 / 知乎，以及邮箱订阅入口
- 📜 **诗词飘动 + Ken Burns**：首页随机诗句与电影级背景缩放
- 📚 **手风琴结构**：详情页折叠式章节展示

## 🔧 自定义配置

### 修改背景切换间隔

编辑 `js/main.js` 中的 `CONFIG` 对象：

```javascript
const CONFIG = {
    backgroundInterval: 5000,  // 背景切换间隔（毫秒）
    quoteInterval: 6000,       // 诗词展示间隔（毫秒）
    // ...
};
```

### 修改诗词名句

编辑 `js/quotes.js` 文件，添加或删除诗词。

### 修改动态取色阈值

编辑 `js/main.js` 中的 `colorThresholds`：

```javascript
colorThresholds: {
    minLuminance: 0.3,    // 最小亮度
    maxLuminance: 0.7,    // 最大亮度
    minSaturation: 0.2,   // 最小饱和度
    maxSaturation: 0.6,   // 最大饱和度
    minContrast: 4.5      // 最小对比度
}
```

## 🔗 自定义社交链接与公众号二维码

- **社交主页链接**：编辑 `js/site.js` 顶部的 `SOCIAL` 对象，把抖音 / 小红书 / 知乎的 `#` 换成你的主页地址。
- **微信公众号二维码**：把二维码图片保存为 `images/social/wechat-qr.png` 即可（页面所有「微信公众号」入口会弹出该图）。
- 这些入口出现在首页「与我相连」区块、以及全站统一页脚，改一处即全站生效。

## 🧠 添加脑图

1. 用 XMind / 幕布 / Markmap 等绘制脑图，导出为图片放入 `images/mindmaps/`。
2. 在 `mindmaps.html` 中把对应卡片的占位 `<div class="mindmap-empty">…</div>` 换成 `<img src="images/mindmaps/你的图.png" alt="…">`，并设置卡片 `href`。

## 📝 待办事项

- [x] 移动端适配　- [x] 脑图展示　- [x] 搜索与标签
- [ ] 接入真实订阅后端（当前为前端占位提示）

## 📄 许可

个人项目，仅供学习参考。

---

*静心读书，修身养性*
