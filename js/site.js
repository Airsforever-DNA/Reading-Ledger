/**
 * 静心书斋 - 共享站点交互 (site.js)
 * 统一渲染导航/页脚/二维码弹层（单一数据源），并处理：
 * 滚动揭示 / 统计递增 / 信息流 / 微信弹层 / 订阅 / 移动端菜单
 * 所有逻辑均做存在性检查，可安全用于任意页面。
 */
(function () {
    'use strict';

    /* ---------- 平台图标（单一来源） ---------- */
    const ICONS = {
        wechat: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4C6.9 4 3 7.35 3 11.4c0 2.3 1.27 4.32 3.3 5.62L5.7 21l3.65-1.9c.85.2 1.74.3 2.65.3 5.1 0 9-3.35 9-7.4S17.1 4 12 4Zm-3.2 6.05a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Zm6.4 0a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"/></svg>',
        douyin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 3c.45 2.62 2.06 4.4 4.6 4.72v3.02c-1.66-.04-3.16-.6-4.6-1.66v6.42A5.73 5.73 0 1 1 8.27 9.8c.32 0 .63.03.93.08v3.1a2.64 2.64 0 1 0 1.8 2.5V3H14Z"/></svg>',
        xhs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.5C9.8 4.9 6.7 4.6 4 5.4v12c2.7-.8 5.8-.5 8 1.1 2.2-1.6 5.3-1.9 8-1.1v-12c-2.7-.8-5.8-.5-8 1.1Z"/><path d="M12 6.5v12.1"/></svg>',
        zhihu: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-6.7L7 21v-4.5H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm4 4.4c-1 0-1.7.6-2 1.5l1.2.5c.12-.4.36-.7.74-.7.4 0 .62.26.62.62 0 .5-.42.9-1 1.5-.5.5-.74.96-.74 1.6v.3h1.32v-.2c0-.42.22-.7.7-1.16.62-.6 1.06-1.1 1.06-1.94 0-1.04-.82-1.72-1.92-1.72Zm5.2 0c-1 0-1.7.6-2 1.5l1.2.5c.12-.4.36-.7.74-.7.4 0 .62.26.62.62 0 .5-.42.9-1 1.5-.5.5-.74.96-.74 1.6v.3h1.32v-.2c0-.42.22-.7.7-1.16.62-.6 1.06-1.1 1.06-1.94 0-1.04-.82-1.72-1.92-1.72Z"/></svg>'
    };

    // 社交链接：把 href 替换为你的真实主页；微信使用二维码弹层(data-wechat)
    const SOCIAL = {
        douyin: '#',
        xhs: '#',
        zhihu: '#'
    };

    /* ---------- 导航（统一渲染） ---------- */
    function navHTML(active, overHero) {
        const item = (href, key, label, cta) =>
            `<li><a href="${href}" class="${cta ? 'pnav-cta ' : ''}${active === key ? 'active' : ''}">${label}</a></li>`;
        return `
        <nav class="pnav ${overHero ? 'over-hero' : 'pnav-static'}" id="pnav">
            <a href="index.html" class="pnav-brand">
                <span class="pnav-seal">斋</span>
                <span class="pnav-brand-text">
                    <span class="pnav-brand-cn">静心书斋</span>
                    <span class="pnav-brand-en">Reading Ledger</span>
                </span>
            </a>
            <ul class="pnav-links">
                ${item('index.html', 'home', '首页')}
                ${item('chenghuaiweixiang.html', 'classics', '澄怀味象')}
                ${item('jingshizhiyong.html', 'practical', '经世致用')}
                ${item('shiciyaji.html', 'poetry', '诗词雅集')}
                ${item('mindmaps.html', 'mindmaps', '脑图')}
                ${item('books.html', 'notes', '笔记')}
                ${item('index.html#connect', 'connect', '关注我', true)}
            </ul>
            <button class="pnav-burger" aria-label="菜单"><span></span></button>
        </nav>`;
    }

    /* ---------- 页脚（统一渲染） ---------- */
    function footerHTML() {
        return `
        <footer class="site-footer">
            <div class="u-container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <span class="fb-logo"><span class="fb-seal">斋</span><span class="fb-name">静心书斋</span></span>
                        <p>修身养性，博闻强识。一个记录阅读、沉淀思考、分享见识的个人空间。</p>
                        <div class="footer-social">
                            <a href="#" data-wechat aria-label="微信公众号">${ICONS.wechat}</a>
                            <a href="${SOCIAL.douyin}" target="_blank" rel="noopener" aria-label="抖音">${ICONS.douyin}</a>
                            <a href="${SOCIAL.xhs}" target="_blank" rel="noopener" aria-label="小红书">${ICONS.xhs}</a>
                            <a href="${SOCIAL.zhihu}" target="_blank" rel="noopener" aria-label="知乎">${ICONS.zhihu}</a>
                        </div>
                    </div>
                    <div class="footer-col">
                        <h5>探索</h5>
                        <ul>
                            <li><a href="chenghuaiweixiang.html">澄怀味象</a></li>
                            <li><a href="jingshizhiyong.html">经世致用</a></li>
                            <li><a href="shiciyaji.html">诗词雅集</a></li>
                            <li><a href="mindmaps.html">脑图陈列</a></li>
                            <li><a href="books.html">全部笔记</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h5>连接</h5>
                        <ul>
                            <li><a href="#" data-wechat>微信公众号</a></li>
                            <li><a href="${SOCIAL.douyin}" target="_blank" rel="noopener">抖音</a></li>
                            <li><a href="${SOCIAL.xhs}" target="_blank" rel="noopener">小红书</a></li>
                            <li><a href="${SOCIAL.zhihu}" target="_blank" rel="noopener">知乎</a></li>
                            <li><a href="index.html#connect">订阅更新</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span>© <span data-year>2024</span> 静心书斋 · 修身养性，博闻强识</span>
                    <span class="seal-mark">❖ 静心读书，修身养性</span>
                </div>
            </div>
        </footer>`;
    }

    function qrModalHTML() {
        return `
        <div class="qr-modal" id="qrModal" aria-hidden="true">
            <div class="qr-panel">
                <button class="qr-close" aria-label="关闭">&times;</button>
                <h4>微信公众号</h4>
                <p>扫描二维码，关注「静心书斋」</p>
                <div class="qr-img">
                    <img src="images/social/wechat-qr.png" alt="公众号二维码"
                         onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                    <span style="display:none;">在此放置二维码<br>images/social/wechat-qr.png</span>
                </div>
            </div>
        </div>`;
    }

    function renderChrome() {
        const navMount = document.getElementById('site-nav');
        if (navMount) {
            navMount.outerHTML = navHTML(navMount.dataset.active || '', navMount.dataset.overHero === 'true');
        }
        const ftMount = document.getElementById('site-footer');
        if (ftMount) {
            ftMount.outerHTML = footerHTML();
        }
        if ((navMount || ftMount) && !document.getElementById('qrModal')) {
            document.body.insertAdjacentHTML('beforeend', qrModalHTML());
        }
    }

    /* ---------- 高级导航栏交互 ---------- */
    function initNav() {
        const nav = document.querySelector('.pnav');
        if (!nav) return;

        const burger = nav.querySelector('.pnav-burger');
        if (burger) {
            burger.addEventListener('click', () => nav.classList.toggle('menu-open'));
            nav.querySelectorAll('.pnav-links a').forEach(a =>
                a.addEventListener('click', () => nav.classList.remove('menu-open')));
        }

        if (nav.classList.contains('over-hero')) {
            const onScroll = () => {
                const scrolled = window.scrollY > window.innerHeight * 0.7;
                nav.classList.toggle('solid', scrolled);
                nav.classList.toggle('over-hero', !scrolled);
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }
    }

    /* ---------- 滚动揭示动效 ---------- */
    function initReveal() {
        const items = document.querySelectorAll('.reveal:not(.in)');
        if (!items.length) return;
        if (!('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
        items.forEach(el => io.observe(el));
    }

    /* ---------- 统计数字递增 ---------- */
    function animateCount(el) {
        const target = parseFloat(el.dataset.count || '0');
        const dur = 1600;
        const start = performance.now();
        const fmt = (n) => Math.floor(n).toLocaleString('en-US');
        function step(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(target * eased);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = fmt(target);
        }
        requestAnimationFrame(step);
    }

    function initCounters() {
        const nums = document.querySelectorAll('[data-count]');
        if (!nums.length) return;
        if (!('IntersectionObserver' in window)) { nums.forEach(animateCount); return; }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); }
            });
        }, { threshold: 0.5 });
        nums.forEach(n => io.observe(n));
    }

    function fillStats() {
        if (typeof getSiteStats !== 'function') return;
        const s = getSiteStats();
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.dataset.count = val; };
        set('statBooks', s.books);
        set('statNotes', s.notes);
        set('statWords', s.words);
        set('statTags', s.tags);
    }

    /* ---------- 封面占位（书脊式） ---------- */
    function escapeHTML(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function coverMarkup(book) {
        const fallback = `
            <div class="note-cover-fallback">
                <span class="nc-title">${escapeHTML(book.title)}</span>
                <span class="nc-author">${escapeHTML(book.author)}</span>
            </div>`;
        if (!book.cover) return fallback;
        return `<img src="${escapeHTML(book.cover)}" alt="${escapeHTML(book.title)}"
                     onerror="this.style.display='none';this.insertAdjacentHTML('afterend', this.dataset.fb)"
                     data-fb='${fallback.replace(/'/g, '&#39;')}'>`;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d)) return dateStr;
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    }

    const CAT_LABEL = { classics: '澄怀味象', practical: '经世致用', poetry: '诗词雅集' };

    function noteCardHTML(b, i) {
        const mins = (typeof estimateReadMinutes === 'function') ? estimateReadMinutes(b.wordCount) : 5;
        const tags = (b.tags || []).slice(0, 3).map(t => `<span class="note-tag">${escapeHTML(t)}</span>`).join('');
        return `
        <a href="book-detail.html?id=${encodeURIComponent(b.id)}" class="note-card reveal" data-reveal-delay="${i % 3}">
            <div class="note-cover">
                <span class="note-badge">${CAT_LABEL[b.category] || '读书笔记'}</span>
                ${coverMarkup(b)}
            </div>
            <div class="note-body">
                <div class="note-tags">${tags}</div>
                <h3 class="note-title">${escapeHTML(b.title)}</h3>
                <p class="note-author">${escapeHTML(b.author)}</p>
                <p class="note-excerpt">${escapeHTML(b.excerpt || b.summary || '')}</p>
                <div class="note-meta">
                    <span>${formatDate(b.date)} · 约 ${mins} 分钟</span>
                    <span class="read-more">研读 <span class="arrow">→</span></span>
                </div>
            </div>
        </a>`;
    }
    // 暴露给其他页面脚本（如笔记列表页）复用
    window.SiteCard = { noteCardHTML: noteCardHTML, formatDate: formatDate };
    window.SiteReveal = function () { initReveal(); };

    /* ---------- 最新读书笔记信息流 ---------- */
    function renderFeed() {
        const grid = document.getElementById('notesFeed');
        if (!grid || typeof getPreviewBooks !== 'function') return;
        const count = parseInt(grid.dataset.feedCount || '3', 10);
        const books = getPreviewBooks(count);
        grid.innerHTML = books.map((b, i) => noteCardHTML(b, i)).join('');
        initReveal();
    }

    /* ---------- 微信二维码弹层 ---------- */
    function initWechat() {
        const modal = document.getElementById('qrModal');
        if (!modal) return;
        const open = () => modal.classList.add('open');
        const close = () => modal.classList.remove('open');
        document.querySelectorAll('[data-wechat]').forEach(el =>
            el.addEventListener('click', (e) => { e.preventDefault(); open(); }));
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        const btn = modal.querySelector('.qr-close');
        if (btn) btn.addEventListener('click', close);
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    }

    /* ---------- 订阅（无后端，友好提示） ---------- */
    function initSubscribe() {
        const form = document.getElementById('subscribeForm');
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const note = document.getElementById('subscribeNote');
            const val = (input && input.value || '').trim();
            if (!val) return;
            if (note) note.textContent = '感谢关注！订阅功能即将开通，亦欢迎通过下方公众号与我相遇。';
            if (input) input.value = '';
        });
    }

    function initYear() {
        document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderChrome();   // 先注入导航/页脚/弹层
        initNav();
        fillStats();
        renderFeed();
        initReveal();
        initCounters();
        initWechat();
        initSubscribe();
        initYear();
    });
})();
