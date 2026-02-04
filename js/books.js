/**
 * 静心书斋 - 书籍数据配置
 * 在此添加你的读书笔记
 */

const BOOKS_DATA = [
    // 示例数据，请按此格式添加你的书籍
    {
        id: "book-001",
        title: "论语",
        author: "孔子及其弟子",
        nationality: "中国",
        publisher: "中华书局",
        isbn: "978-7-101-00000-0",
        date: "2024-01-15",
        cover: "images/covers/lunyu.jpg",
        summary: "《论语》是儒家学派的经典著作之一，由孔子的弟子及其再传弟子编撰而成。它以语录体和对话文体为主，记录了孔子及其弟子言行，集中体现了孔子的政治主张、伦理思想、道德观念及教育原则等。",
        structure: [
            {
                chapter: "学而篇",
                content: "论述学习的态度和方法，强调\"学而时习之\"的重要性，以及\"吾日三省吾身\"的修身之道。",
                sections: [
                    { title: "学而时习之", content: "学习并时常温习，是求学的基本方法。" },
                    { title: "巧言令色", content: "警惕花言巧语、表面功夫的人。" }
                ]
            },
            {
                chapter: "为政篇",
                content: "论述为政之道，以德治国的理念。",
                sections: [
                    { title: "为政以德", content: "以道德教化来治理国家。" },
                    { title: "吾十有五而志于学", content: "孔子自述一生修学历程。" }
                ]
            }
        ],
        highlights: [
            { text: "学而不思则罔，思而不学则殆。", note: "学习与思考必须结合，二者缺一不可。" },
            { text: "温故而知新，可以为师矣。", note: "温习旧知识，从中获得新领悟。" },
            { text: "三人行，必有我师焉。", note: "虚心向他人学习的态度。" }
        ]
    },
    {
        id: "book-002",
        title: "道德经",
        author: "老子",
        nationality: "中国",
        publisher: "中华书局",
        isbn: "978-7-101-00000-1",
        date: "2024-02-20",
        cover: "images/covers/daodejing.jpg",
        summary: "《道德经》是道家哲学思想的重要来源，论述了道与德的深刻含义，以朴素的辩证法思想，提出\"无为而治\"的治国理念和\"道法自然\"的哲学主张。",
        structure: [
            {
                chapter: "道经",
                content: "论\"道\"，探讨宇宙本源与万物规律。",
                sections: [
                    { title: "道可道", content: "道的不可言说性与超越性。" },
                    { title: "上善若水", content: "以水喻道，柔弱胜刚强。" }
                ]
            },
            {
                chapter: "德经",
                content: "论\"德\"，探讨修身处世之道。",
                sections: [
                    { title: "上德不德", content: "真正的德行是自然而然的。" }
                ]
            }
        ],
        highlights: [
            { text: "道可道，非常道。名可名，非常名。", note: "道的本质是超越语言的。" },
            { text: "上善若水，水善利万物而不争。", note: "最高的善像水一样，滋养万物而不争功。" },
            { text: "千里之行，始于足下。", note: "再远大的目标也要从脚下开始。" }
        ]
    }
    
    // 在此继续添加更多书籍...
    // {
    //     id: "book-003",
    //     title: "书名",
    //     author: "作者",
    //     ...
    // }
];

/**
 * 获取首页预览的书籍（最新几本）
 * @param {number} count - 显示数量
 * @returns {Array} 书籍数组
 */
function getPreviewBooks(count = 4) {
    return BOOKS_DATA
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
}

/**
 * 根据ID获取书籍详情
 * @param {string} id - 书籍ID
 * @returns {Object|null} 书籍对象
 */
function getBookById(id) {
    return BOOKS_DATA.find(book => book.id === id) || null;
}

/**
 * 获取所有书籍
 * @returns {Array} 全部书籍数组
 */
function getAllBooks() {
    return BOOKS_DATA;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BOOKS_DATA, getPreviewBooks, getBookById, getAllBooks };
}
