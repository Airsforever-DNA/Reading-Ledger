/**
 * 静心书斋 - 主逻辑文件
 */

// ==========================================
// 全局配置
// ==========================================
const CONFIG = {
    // 背景切换间隔（毫秒）
    backgroundInterval: 12000,
    // 诗词展示间隔（毫秒）
    quoteInterval: 5000,
    // 诗词淡入淡出时间（毫秒）
    quoteFadeDuration: 1500,
    // 站名标语显示时长（毫秒）
    titleDisplayDuration: 10000,
    // 诗词字体大小范围（rem）
    quoteFontSize: {
        min: 1.4,
        max: 2.2
    },
    // 动态取色安全阈值
    colorThresholds: {
        minLuminance: 0.3,
        maxLuminance: 0.7,
        minSaturation: 0.2,
        maxSaturation: 0.6,
        minContrast: 4.5
    }
};

// ==========================================
// 工具函数
// ==========================================

/**
 * RGB转HSL
 */
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: h * 360, s, l };
}

/**
 * HSL转RGB
 */
function hslToRgb(h, s, l) {
    h /= 360;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/**
 * 计算相对亮度
 */
function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * 计算对比度
 */
function getContrastRatio(l1, l2) {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 调整颜色到安全范围
 */
function adjustColorToSafeRange(r, g, b) {
    const hsl = rgbToHsl(r, g, b);
    const { minLuminance, maxLuminance, minSaturation, maxSaturation } = CONFIG.colorThresholds;
    
    // 调整亮度
    if (hsl.l < minLuminance) hsl.l = minLuminance;
    if (hsl.l > maxLuminance) hsl.l = maxLuminance;
    
    // 调整饱和度
    if (hsl.s < minSaturation) hsl.s = minSaturation;
    if (hsl.s > maxSaturation) hsl.s = maxSaturation;
    
    return hslToRgb(hsl.h, hsl.s, hsl.l);
}

/**
 * 随机打乱数组
 */
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * 随机获取数组元素
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * 随机范围整数
 */
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// 背景管理器
// ==========================================
class BackgroundManager {
    constructor() {
        this.images = [...BACKGROUND_IMAGES]; // 复制数组
        this.lastImageIndex = -1; // 记录上一张图片索引，避免连续重复
        this.slide1 = document.getElementById('bg-slide-1');
        this.slide2 = document.getElementById('bg-slide-2');
        this.currentSlide = this.slide1;
        this.colorThief = typeof ColorThief !== 'undefined' ? new ColorThief() : null;
        this.kenburnsIndex = 1;
        
        this.init();
    }
    
    init() {
        // 随机选择第一张图片
        const firstIndex = this.getRandomImageIndex();
        this.lastImageIndex = firstIndex;
        
        this.loadImage(this.images[firstIndex]).then(img => {
            this.applyBackground(this.slide1, this.images[firstIndex], img);
            this.slide1.classList.add('active');
            this.startKenBurns(this.slide1);
            
            // 开始轮换
            setInterval(() => this.nextBackground(), CONFIG.backgroundInterval);
        });
    }
    
    // 获取随机图片索引，避免与上一张相同
    getRandomImageIndex() {
        if (this.images.length <= 1) return 0;
        
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.images.length);
        } while (newIndex === this.lastImageIndex);
        
        return newIndex;
    }
    
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
    
    applyBackground(slide, src, img) {
        slide.style.backgroundImage = `url(${src})`;
        
        // 动态取色
        if (this.colorThief && img.complete && img.naturalWidth > 0) {
            try {
                const palette = this.colorThief.getPalette(img, 5);
                if (palette && palette.length > 0) {
                    this.applyDynamicColors(palette);
                }
            } catch (e) {
                console.log('Color extraction failed, using default colors');
            }
        }
    }
    
    applyDynamicColors(palette) {
        // 取主色调
        const [r, g, b] = palette[0];
        const adjusted = adjustColorToSafeRange(r, g, b);
        
        // 计算亮度决定文字颜色
        const luminance = getLuminance(adjusted.r, adjusted.g, adjusted.b);
        const isDark = luminance < 0.5;
        
        // 生成配色方案
        const hsl = rgbToHsl(adjusted.r, adjusted.g, adjusted.b);
        
        // 主色
        const primaryHsl = { ...hsl, l: isDark ? 0.3 : 0.25 };
        const primary = hslToRgb(primaryHsl.h, primaryHsl.s, primaryHsl.l);
        
        // 次要色
        const secondaryHsl = { ...hsl, s: hsl.s * 0.8, l: isDark ? 0.35 : 0.3 };
        const secondary = hslToRgb(secondaryHsl.h, secondaryHsl.s, secondaryHsl.l);
        
        // 强调色
        const accentHsl = { h: (hsl.h + 30) % 360, s: Math.min(hsl.s * 1.2, 0.6), l: 0.45 };
        const accent = hslToRgb(accentHsl.h, accentHsl.s, accentHsl.l);
        
        // 应用到CSS变量
        const root = document.documentElement;
        root.style.setProperty('--primary-color', `rgb(${primary.r}, ${primary.g}, ${primary.b})`);
        root.style.setProperty('--secondary-color', `rgb(${secondary.r}, ${secondary.g}, ${secondary.b})`);
        root.style.setProperty('--accent-color', `rgb(${accent.r}, ${accent.g}, ${accent.b})`);
        
        // 根据亮度调整遮罩
        const overlayAlpha = isDark ? 0.8 : 0.85;
        root.style.setProperty('--bg-overlay', `rgba(245, 245, 240, ${overlayAlpha})`);
    }
    
    startKenBurns(slide) {
        // 移除所有kenburns类
        slide.classList.remove('kenburns-1', 'kenburns-2', 'kenburns-3', 'kenburns-4');
        // 强制重绘以重置动画
        void slide.offsetWidth;
        // 添加随机kenburns动画
        this.kenburnsIndex = randomRange(1, 4);
        slide.classList.add(`kenburns-${this.kenburnsIndex}`);
    }
    
    nextBackground() {
        // 真正随机选择下一张图片
        const nextIndex = this.getRandomImageIndex();
        this.lastImageIndex = nextIndex;
        const nextSrc = this.images[nextIndex];
        
        // 切换slide
        const nextSlide = this.currentSlide === this.slide1 ? this.slide2 : this.slide1;
        
        this.loadImage(nextSrc).then(img => {
            this.applyBackground(nextSlide, nextSrc, img);
            
            // 为新slide启动Ken Burns（在淡入前就开始）
            this.startKenBurns(nextSlide);
            
            // 淡入淡出切换 - 旧的保持当前放大状态淡出
            this.currentSlide.classList.remove('active');
            nextSlide.classList.add('active');
            
            this.currentSlide = nextSlide;
        });
    }
}

// ==========================================
// 诗词展示管理器
// ==========================================
class QuoteManager {
    constructor() {
        this.quotes = [...QUOTES_DATA];
        this.currentIndex = 0;
        this.container = document.getElementById('quoteContainer');
        this.textEl = document.getElementById('quoteText');
        this.authorEl = document.getElementById('quoteAuthor');
        this.fonts = ['font-1', 'font-2', 'font-3', 'font-4', 'font-5', 'font-6', 'font-7'];
        
        // 阶段控制
        this.phase = 'above'; // 'above' | 'below' | 'free'
        this.quoteCount = 0;  // 已显示的诗词数量
        
        // 站名标语元素
        this.homeContent = document.querySelector('.home-content');
        
        this.init();
    }
    
    init() {
        // 打乱诗词顺序
        this.shuffleQuotes();
        
        // 显示第一条诗词（在标题上方）
        this.showQuote();
        
        // 启动诗词轮换
        this.quoteTimer = setInterval(() => this.nextQuote(), CONFIG.quoteInterval);
        
        // 10秒后隐藏站名标语和滚动提示，切换到自由模式
        setTimeout(() => {
            this.phase = 'free';
            if (this.homeContent) {
                this.homeContent.classList.add('fade-out');
            }
            const scrollHint = document.querySelector('.scroll-hint');
            if (scrollHint) {
                scrollHint.classList.add('fade-out');
            }
        }, CONFIG.titleDisplayDuration);
    }
    
    shuffleQuotes() {
        // Fisher-Yates 洗牌
        for (let i = this.quotes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.quotes[i], this.quotes[j]] = [this.quotes[j], this.quotes[i]];
        }
    }
    
    getRandomFontSize() {
        const { min, max } = CONFIG.quoteFontSize;
        const size = min + Math.random() * (max - min);
        return size.toFixed(2);
    }
    
    showQuote() {
        const quote = this.quotes[this.currentIndex];
        
        // 获取容器和窗口尺寸
        const containerRect = this.container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // 诗词预估尺寸
        const quoteWidth = 500;
        const quoteHeight = 120;
        
        let x, y;
        
        if (this.phase === 'above') {
            // 标题上方区域（顶部 5% - 25%）
            const minY = containerHeight * 0.05;
            const maxY = containerHeight * 0.25 - quoteHeight;
            x = randomRange(50, containerWidth - quoteWidth - 50);
            y = randomRange(Math.max(minY, 60), Math.max(maxY, minY + 50));
            
        } else if (this.phase === 'below') {
            // 标题下方区域（底部 65% - 85%）
            const minY = containerHeight * 0.65;
            const maxY = containerHeight * 0.85 - quoteHeight;
            x = randomRange(50, containerWidth - quoteWidth - 50);
            y = randomRange(minY, Math.max(maxY, minY + 50));
            
        } else {
            // 自由模式：全屏随机（避开底部滚动提示）
            const margin = 60;
            const bottomMargin = 120; // 避开滚动提示
            x = randomRange(margin, Math.max(containerWidth - quoteWidth - margin, margin + 100));
            y = randomRange(margin, Math.max(containerHeight - quoteHeight - bottomMargin, margin + 100));
        }
        
        // 确保坐标有效
        x = Math.max(30, Math.min(x, containerWidth - quoteWidth - 30));
        y = Math.max(30, Math.min(y, containerHeight - quoteHeight - 100));
        
        // 设置位置
        this.textEl.style.left = `${x}px`;
        this.textEl.style.top = `${y}px`;
        
        // 随机字体和大小（诗句与作者一致）
        const font = getRandomItem(this.fonts);
        const fontSize = this.getRandomFontSize();

        // 设置内容（先写入，便于精确测量高度）
        this.textEl.textContent = quote.text;
        this.authorEl.textContent = `—— ${quote.author}${quote.source ? '《' + quote.source.replace(/《|》/g, '') + '》' : ''}`;

        // 应用字体与字号
        this.textEl.className = 'quote-text ' + font;
        this.authorEl.className = 'quote-author ' + font;
        this.textEl.style.fontSize = `${fontSize}rem`;

        // 作者位置跟随：根据诗句实际高度计算，避免两行/多行重叠
        this.authorEl.style.left = `${x}px`;

        // 强制一次 reflow，确保尺寸可测
        void this.textEl.offsetHeight;

        const textRect = this.textEl.getBoundingClientRect();
        const textHeight = textRect.height;
        const textWidth = textRect.width;
        this.authorEl.style.width = `${textWidth}px`;

        const gap = Math.max(12, parseFloat(fontSize) * 8); // px
        let authorTop = y + textHeight + gap;

        // 避免超出容器底部
        const authorHeight = this.authorEl.getBoundingClientRect().height || 18;
        const bottomPad = (this.phase === 'free') ? 120 : 80;
        const maxBottom = containerHeight - bottomPad;
        const overflow = (authorTop + authorHeight) - maxBottom;
        if (overflow > 0) {
            y = Math.max(30, y - overflow);
            this.textEl.style.top = `${y}px`;
            authorTop = y + textHeight + gap;
        }

        this.authorEl.style.top = `${authorTop}px`;

        // 淡入
        setTimeout(() => {
            this.textEl.classList.add('visible');
            this.authorEl.classList.add('visible');
        }, 100);
        
        // 更新计数
        this.quoteCount++;
    }
    
    hideQuote() {
        this.textEl.classList.remove('visible');
        this.authorEl.classList.remove('visible');
    }
    
    nextQuote() {
        this.hideQuote();
        
        // 第二条诗词时切换到标题下方
        if (this.quoteCount === 1 && this.phase === 'above') {
            this.phase = 'below';
        }
        
        setTimeout(() => {
            // 切换到下一条诗词
            this.currentIndex = (this.currentIndex + 1) % this.quotes.length;
            
            // 如果循环完一轮，重新打乱
            if (this.currentIndex === 0) {
                this.shuffleQuotes();
            }
            
            this.showQuote();
        }, CONFIG.quoteFadeDuration);
    }
}

// ==========================================
// 导航栏管理器
// ==========================================
class NavbarManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.triggerZone = document.getElementById('navTrigger');
        this.lastScrollY = 0;
        this.isAtTop = true;
        
        this.init();
    }
    
    init() {
        // 初始显示（在顶部时）
        this.navbar.classList.add('at-top');
        
        // 滚动监听
        window.addEventListener('scroll', () => this.handleScroll());
        
        // 触发区悬停
        this.triggerZone.addEventListener('mouseenter', () => this.showNavbar());
        this.navbar.addEventListener('mouseenter', () => this.showNavbar());
        this.navbar.addEventListener('mouseleave', () => this.hideNavbarIfNotAtTop());
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY <= 50) {
            // 在顶部
            this.isAtTop = true;
            this.navbar.classList.add('at-top');
            this.navbar.classList.remove('visible');
        } else {
            // 不在顶部
            this.isAtTop = false;
            this.navbar.classList.remove('at-top');
            
            // 向下滚动时隐藏
            if (scrollY > this.lastScrollY) {
                this.navbar.classList.remove('visible');
            }
        }
        
        this.lastScrollY = scrollY;
    }
    
    showNavbar() {
        if (!this.isAtTop) {
            this.navbar.classList.add('visible');
        }
    }
    
    hideNavbarIfNotAtTop() {
        if (!this.isAtTop) {
            this.navbar.classList.remove('visible');
        }
    }
}

// ==========================================
// 书籍卡片渲染
// ==========================================
class BookGridRenderer {
    constructor() {
        this.grid = document.getElementById('bookPreviewGrid');
        this.init();
    }
    
    init() {
        const books = getPreviewBooks(4);
        this.render(books);
    }
    
    render(books) {
        if (!this.grid) return;
        
        this.grid.innerHTML = books.map(book => `
            <a href="book-detail.html?id=${book.id}" class="book-card">
                <img src="${book.cover}" alt="${book.title}" class="book-cover" 
                     onerror="this.src='https://via.placeholder.com/180x240/f5f5f0/666?text=${encodeURIComponent(book.title)}'">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                </div>
            </a>
        `).join('');
    }
}

// ==========================================
// 平滑滚动
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==========================================
// 初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化各管理器
    new BackgroundManager();
    new QuoteManager();
    new NavbarManager();
    new BookGridRenderer();
    
    // 初始化平滑滚动
    initSmoothScroll();
    
    console.log('静心书斋 - 初始化完成');
});
