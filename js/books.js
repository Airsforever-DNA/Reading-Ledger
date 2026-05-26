/**
 * 静心书斋 - 书籍数据配置
 * 在此添加你的读书笔记
 *
 * 字段说明：
 *   tags       标签数组，用于筛选与分类
 *   excerpt    一句话摘要，展示在信息流卡片上
 *   wordCount  笔记字数（用于统计，约数即可）
 *   category   归类：classics(经典) / practical(致用) / poetry(诗词)
 */

const BOOKS_DATA = [
    {
        id: "book-001",
        title: "论语",
        author: "孔子及其弟子",
        nationality: "中国",
        publisher: "中华书局",
        isbn: "978-7-101-00000-0",
        date: "2024-01-15",
        cover: "images/covers/lunyu.jpg",
        category: "classics",
        tags: ["儒家", "经典", "修身"],
        excerpt: "半部论语治天下。以语录体记录孔子言行，是中国人精神世界的底色，读来常学常新。",
        wordCount: 4200,
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
        category: "classics",
        tags: ["道家", "经典", "哲学"],
        excerpt: "五千言道尽天地至理。以辩证之思讲\"道法自然\"与\"无为而治\"，是东方智慧的源头活水。",
        wordCount: 3800,
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
    },
    {
        id: "book-003",
        title: "史记",
        author: "司马迁",
        nationality: "中国",
        publisher: "中华书局",
        isbn: "978-7-101-00000-2",
        date: "2024-03-18",
        cover: "images/covers/shiji.jpg",
        category: "classics",
        tags: ["历史", "经典", "传记"],
        excerpt: "究天人之际，通古今之变，成一家之言。以人物为经纬写就三千年史诗，史家之绝唱。",
        wordCount: 5200,
        summary: "《史记》是中国第一部纪传体通史，记载了上自黄帝下至汉武帝太初年间共三千多年的历史。司马迁以\"究天人之际，通古今之变，成一家之言\"为宗旨，开创了以人物为中心的纪传体史书体例。",
        structure: [
            {
                chapter: "本纪",
                content: "记载帝王政绩与王朝兴替，为全书之纲。",
                sections: [
                    { title: "项羽本纪", content: "以失败者入本纪，见太史公之史识与胸襟。" }
                ]
            },
            {
                chapter: "列传",
                content: "为各阶层人物立传，刻画入木三分。",
                sections: [
                    { title: "廉颇蔺相如列传", content: "将相和的千古佳话，先国家之急而后私仇。" }
                ]
            }
        ],
        highlights: [
            { text: "人固有一死，或重于泰山，或轻于鸿毛。", note: "生命的价值不在长短，而在分量。" },
            { text: "桃李不言，下自成蹊。", note: "真正的德行无需自夸，自能感召人心。" }
        ]
    },
    {
        id: "book-004",
        title: "人类简史",
        author: "尤瓦尔·赫拉利",
        nationality: "以色列",
        publisher: "中信出版社",
        isbn: "978-7-5086-0000-0",
        date: "2024-04-26",
        cover: "images/covers/sapiens.jpg",
        category: "practical",
        tags: ["历史", "认知", "思维"],
        excerpt: "智人凭借\"虚构故事\"的能力跃居食物链顶端。一部跨越十万年的宏大叙事，重塑你看世界的尺度。",
        wordCount: 4600,
        summary: "《人类简史》从认知革命、农业革命到科学革命，梳理了智人如何从一种不起眼的动物成长为地球的主宰。作者认为，正是讲述\"虚构故事\"、构建共同想象的能力，让大规模协作成为可能。",
        structure: [
            {
                chapter: "认知革命",
                content: "语言与虚构故事让智人实现大规模灵活协作。",
                sections: [
                    { title: "想象的共同体", content: "国家、货币、宗教都是共同相信的\"故事\"。" }
                ]
            },
            {
                chapter: "科学革命",
                content: "承认无知，是现代科学进步的起点。",
                sections: []
            }
        ],
        highlights: [
            { text: "我们之所以能统治世界，是因为只有我们能编织共同的虚构故事。", note: "协作的基础是共同的信念。" },
            { text: "金钱是有史以来最普遍、最有效的互信系统。", note: "信任，才是金钱真正的价值所在。" }
        ]
    },
    {
        id: "book-005",
        title: "沉思录",
        author: "马可·奥勒留",
        nationality: "古罗马",
        publisher: "三联书店",
        isbn: "978-7-108-00000-0",
        date: "2024-05-12",
        cover: "images/covers/meditations.jpg",
        category: "practical",
        tags: ["哲学", "斯多葛", "修身"],
        excerpt: "一位皇帝写给自己的札记。在喧嚣世界里，学会区分\"能控制的\"与\"不能控制的\"，便得内心安宁。",
        wordCount: 3400,
        summary: "《沉思录》是古罗马皇帝马可·奥勒留写给自己的内心独白，是斯多葛哲学的经典。全书围绕理性、责任、克制与对命运的接纳展开，提醒人专注当下、躬身自省。",
        structure: [
            {
                chapter: "论理性",
                content: "唯有理性是人之所以为人的根本。",
                sections: []
            },
            {
                chapter: "论当下",
                content: "过去与未来皆不可控，唯当下可把握。",
                sections: []
            }
        ],
        highlights: [
            { text: "你拥有支配自己心灵的力量，而非外在事件。", note: "外境无法伤你，伤你的是你对它的看法。" },
            { text: "把每一天都当作最后一天来度过。", note: "向死而生，方知珍惜当下。" }
        ]
    },
    {
        id: "book-006",
        title: "思考，快与慢",
        author: "丹尼尔·卡尼曼",
        nationality: "美国",
        publisher: "中信出版社",
        isbn: "978-7-5086-0000-1",
        date: "2024-05-20",
        cover: "images/covers/thinking.jpg",
        category: "practical",
        tags: ["心理学", "认知", "决策"],
        excerpt: "大脑里住着快思考的系统1与慢思考的系统2。看清思维的捷径与陷阱，做更清醒的决策者。",
        wordCount: 4100,
        summary: "诺贝尔经济学奖得主卡尼曼提出，人的思维由两套系统驱动：直觉而快速的系统1，与理性而费力的系统2。本书揭示了大量认知偏差，帮助我们理解判断与决策中的系统性错误。",
        structure: [
            {
                chapter: "两个系统",
                content: "系统1快速直觉，系统2缓慢理性。",
                sections: [
                    { title: "锚定效应", content: "先入为主的数字会悄悄左右判断。" }
                ]
            },
            {
                chapter: "前景理论",
                content: "人对损失的厌恶远大于对等额收益的喜爱。",
                sections: []
            }
        ],
        highlights: [
            { text: "我们对自己的无知视而不见，这是一种安慰人心的错觉。", note: "承认认知局限，是理性的第一步。" },
            { text: "损失带来的痛苦，约为同等收益快乐的两倍。", note: "理解损失厌恶，才能克服非理性决策。" }
        ]
    }

    // 在此继续添加更多书籍...
];

/**
 * 获取首页预览的书籍（最新几本）
 * @param {number} count - 显示数量
 * @returns {Array} 书籍数组
 */
function getPreviewBooks(count = 4) {
    return [...BOOKS_DATA]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, count);
}

/**
 * 根据ID获取书籍详情
 */
function getBookById(id) {
    return BOOKS_DATA.find(book => book.id === id) || null;
}

/**
 * 获取所有书籍
 */
function getAllBooks() {
    return BOOKS_DATA;
}

/**
 * 获取所有标签（去重，按出现频次排序）
 */
function getAllTags() {
    const counts = {};
    BOOKS_DATA.forEach(b => (b.tags || []).forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}

/**
 * 估算阅读笔记所需时间（按每分钟 400 字中文计）
 */
function estimateReadMinutes(wordCount) {
    return Math.max(1, Math.round((wordCount || 0) / 400));
}

/**
 * 站点统计数据
 */
function getSiteStats() {
    const totalWords = BOOKS_DATA.reduce((sum, b) => sum + (b.wordCount || 0), 0);
    return {
        books: BOOKS_DATA.length,
        notes: BOOKS_DATA.length,
        words: totalWords,
        tags: getAllTags().length
    };
}

// 导出（Node 环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BOOKS_DATA, getPreviewBooks, getBookById, getAllBooks,
        getAllTags, estimateReadMinutes, getSiteStats
    };
}
