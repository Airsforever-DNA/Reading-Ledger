/**
 * 静心书斋 - 读书笔记列表页逻辑
 * 搜索 + 标签筛选 + 排序，复用 site.js 的卡片渲染。
 */
document.addEventListener('DOMContentLoaded', () => {
    new NotesPage().init();
});

class NotesPage {
    constructor() {
        this.grid = document.getElementById('notesGrid');
        this.empty = document.getElementById('notesEmpty');
        this.tagBar = document.getElementById('tagBar');
        this.searchInput = document.getElementById('noteSearch');
        this.sortBtns = document.querySelectorAll('.sort-mini button');
        this.books = (typeof getAllBooks === 'function') ? getAllBooks() : [];
        this.sort = 'date';
        this.tag = '全部';
        this.query = '';
    }

    init() {
        if (!this.grid) return;
        this.buildTags();
        this.bindEvents();
        this.render();
    }

    buildTags() {
        if (!this.tagBar) return;
        const tags = (typeof getAllTags === 'function') ? getAllTags() : [];
        const all = ['全部', ...tags];
        this.tagBar.innerHTML = all.map(t =>
            `<button class="tag-chip${t === this.tag ? ' active' : ''}" data-tag="${t}">${t}</button>`
        ).join('');
        this.tagBar.querySelectorAll('.tag-chip').forEach(btn => {
            btn.addEventListener('click', () => {
                this.tag = btn.dataset.tag;
                this.tagBar.querySelectorAll('.tag-chip').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.render();
            });
        });
    }

    bindEvents() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', () => {
                this.query = this.searchInput.value.trim().toLowerCase();
                this.render();
            });
        }
        this.sortBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sort = btn.dataset.sort;
                this.sortBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.render();
            });
        });
    }

    filtered() {
        let list = [...this.books];

        if (this.tag !== '全部') {
            list = list.filter(b => (b.tags || []).includes(this.tag));
        }

        if (this.query) {
            const q = this.query;
            list = list.filter(b => {
                const hay = [
                    b.title, b.author, b.excerpt, b.summary,
                    (b.tags || []).join(' ')
                ].join(' ').toLowerCase();
                return hay.includes(q);
            });
        }

        if (this.sort === 'title') {
            list.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
        } else {
            list.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        return list;
    }

    render() {
        const list = this.filtered();
        const cardHTML = (window.SiteCard && window.SiteCard.noteCardHTML)
            ? window.SiteCard.noteCardHTML
            : null;

        if (!list.length) {
            this.grid.innerHTML = '';
            if (this.empty) this.empty.style.display = 'block';
            return;
        }
        if (this.empty) this.empty.style.display = 'none';

        if (cardHTML) {
            this.grid.innerHTML = list.map((b, i) => cardHTML(b, i)).join('');
        } else {
            // 退化渲染（site.js 未加载时）
            this.grid.innerHTML = list.map(b =>
                `<a class="note-card" href="book-detail.html?id=${encodeURIComponent(b.id)}">
                    <div class="note-body"><h3 class="note-title">${b.title}</h3>
                    <p class="note-author">${b.author}</p></div></a>`
            ).join('');
        }

        if (window.SiteReveal) window.SiteReveal();
    }
}
