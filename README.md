# 静心书斋

> 修身养性，博闻强识

一个文艺书香风格的个人读书笔记网站。

## 📁 项目结构

```
静心书斋/
├── index.html              # 主页面（首页 + 书斋入口）
├── books.html              # 书斋完整列表页
├── book-detail.html        # 读书笔记详情页
├── css/
│   ├── style.css           # 主样式文件
│   ├── books.css           # 书籍列表页样式
│   └── book-detail.css     # 详情页样式
├── js/
│   ├── main.js             # 主逻辑（背景、诗词、导航等）
│   ├── quotes.js           # 诗词名句数据
│   ├── books.js            # 书籍数据配置 ⭐ 在这里添加书籍
│   ├── images.js           # 背景图片列表（自动生成）
│   ├── books-page.js       # 书籍列表页逻辑
│   └── book-detail.js      # 详情页逻辑
├── images/
│   ├── backgrounds/        # 🖼️ 风景照片放这里
│   └── covers/             # 📚 书籍封面放这里
├── tools/
│   └── generate-images.py  # 图片列表生成脚本
└── README.md               # 本文件
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
    id: "book-003",           // 唯一ID
    title: "书名",
    author: "作者",
    nationality: "国籍",
    publisher: "出版社",
    isbn: "978-x-xxx-xxxxx-x",
    date: "2024-03-15",       // 阅读日期
    cover: "images/covers/bookname.jpg",  // 封面图片路径
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

- 🎨 **动态取色**：从背景图片自动提取主色调，动态调整页面配色
- 🖼️ **Ken Burns 效果**：背景图片带有电影级的缓动缩放动画
- 📜 **诗词飘动**：首页随机展示古诗词名句，随机位置、随机字体
- 📚 **手风琴结构**：读书笔记详情页使用折叠式章节展示
- 🎯 **导航交互**：滚动隐藏，右上角悬停触发显示

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

## 📝 待办事项

- [ ] 添加移动端适配
- [ ] 添加思维导图展示
- [ ] 添加搜索功能
- [ ] 添加标签分类

## 📄 许可

个人项目，仅供学习参考。

---

*静心读书，修身养性*
