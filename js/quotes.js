/**
 * 静心书斋 - 诗词名句数据
 * 用于首页随机展示
 */

const QUOTES_DATA = [
    // 一、首页标语 / 立意
    {
        text: "腹有诗书气自华",
        author: "宋人语",
        category: "立意"
    },
    {
        text: "读书破万卷，下笔如有神",
        author: "杜甫",
        source: "《奉赠韦左丞丈二十二韵》",
        category: "立意"
    },
    {
        text: "书卷多情似故人，晨昏忧乐每相亲",
        author: "于谦",
        source: "《观书》",
        category: "立意"
    },
    {
        text: "立身以立学为先，立学以读书为本",
        author: "欧阳修",
        category: "立意"
    },
    
    // 二、读书与修身养性
    {
        text: "养心莫善寡欲，至乐无如读书",
        author: "郑成功",
        category: "修身"
    },
    {
        text: "非淡泊无以明志，非宁静无以致远",
        author: "诸葛亮",
        source: "《诫子书》",
        category: "修身"
    },
    {
        text: "书犹药也，善读之可以医愚",
        author: "刘向",
        source: "《说苑·劝学》",
        category: "修身"
    },
    
    // 三、厚积薄发 / 博闻强识
    {
        text: "不积跬步，无以至千里\n不积小流，无以成江海",
        author: "荀子",
        source: "《荀子·劝学》",
        category: "厚积"
    },
    {
        text: "积土成山，风雨兴焉\n积水成渊，蛟龙生焉",
        author: "荀子",
        source: "《荀子·劝学》",
        category: "厚积"
    },
    {
        text: "锲而舍之，朽木不折\n锲而不舍，金石可镂",
        author: "荀子",
        source: "《荀子·劝学》",
        category: "厚积"
    },
    {
        text: "纸上得来终觉浅，绝知此事要躬行",
        author: "陆游",
        source: "《冬夜读书示子聿》",
        category: "厚积"
    },
    {
        text: "古人学问无遗力，少壮工夫老始成",
        author: "陆游",
        source: "《冬夜读书示子聿》",
        category: "厚积"
    },
    {
        text: "读万卷书，行万里路",
        author: "古语",
        category: "厚积"
    },
    
    // 四、惜时勤学
    {
        text: "三更灯火五更鸡，正是男儿读书时\n黑发不知勤学早，白首方悔读书迟",
        author: "颜真卿",
        source: "《劝学》",
        category: "惜时"
    },
    {
        text: "少年易老学难成，一寸光阴不可轻\n未觉池塘春草梦，阶前梧叶已秋声",
        author: "朱熹",
        source: "《劝学诗》",
        category: "惜时"
    },
    {
        text: "少壮不努力，老大徒伤悲",
        author: "汉乐府",
        source: "《长歌行》",
        category: "惜时"
    },
    {
        text: "莫等闲，白了少年头，空悲切",
        author: "岳飞",
        source: "《满江红·写怀》",
        category: "惜时"
    },
    {
        text: "盛年不再来，一日难再晨\n及时当勉励，岁月不待人",
        author: "陶渊明",
        source: "《杂诗》",
        category: "惜时"
    },
    {
        text: "明日复明日，明日何其多\n我生待明日，万事成蹉跎",
        author: "钱福",
        source: "《明日歌》",
        category: "惜时"
    },
    
    // 五、学习方法与读书之道
    {
        text: "读书有三到，谓心到，眼到，口到",
        author: "朱熹",
        source: "《朱子语类》",
        category: "方法"
    },
    {
        text: "读书切戒在慌忙，涵泳工夫兴味长",
        author: "陆九渊",
        category: "方法"
    },
    {
        text: "熟读唐诗三百首，不会作诗也会吟",
        author: "孙洙",
        source: "《唐诗三百首》",
        category: "方法"
    },
    {
        text: "旧书不厌百回读，熟读精思子自知",
        author: "苏轼",
        category: "方法"
    },
    {
        text: "读书百遍，其义自见",
        author: "古语",
        category: "方法"
    },
    {
        text: "读书患不多，思义患不明\n患足己不学，既学患不行",
        author: "韩愈",
        source: "《劝学诗》",
        category: "方法"
    },
    
    // 六、立志、自强与读书
    {
        text: "发奋识遍天下字，立志读尽人间书",
        author: "苏轼",
        category: "立志"
    },
    {
        text: "鸟欲高飞先振翅，人求上进先读书",
        author: "李苦禅",
        category: "立志"
    },
    {
        text: "立志宜思真品格，读书须尽苦功夫",
        author: "阮元",
        category: "立志"
    },
    
    // 七、短句金句
    {
        text: "书到用时方恨少，事非经过不知难",
        author: "陆游",
        category: "金句"
    },
    {
        text: "要知天下事，须读古人书",
        author: "冯梦龙",
        category: "金句"
    },
    {
        text: "非读书，不明理",
        author: "李光庭",
        category: "金句"
    },
    {
        text: "积财千万，无过读书",
        author: "颜之推",
        source: "《颜氏家训》",
        category: "金句"
    },
    {
        text: "一个人可以无师自通，却不可无书自通",
        author: "闻一多",
        category: "金句"
    }
];

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QUOTES_DATA;
}
