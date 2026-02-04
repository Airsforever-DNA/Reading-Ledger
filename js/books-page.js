/**
 * 静心书斋 - 书籍列表页逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
    // 初始化
    const booksManager = new BooksPageManager();
    booksManager.init();
});

class BooksPageManager {
    constructor() {
        this.grid = document.getElementById('booksGrid');
        this.emptyState = document.getElementById('emptyState');
        this.totalBooksEl = document.getElementById('totalBooks');
        this.sortBtns = document.querySelectorAll('.sort-btn');
        this.currentSort = 'date';
        this.books = [];
    }
    
    init() {
        // 获取所有书籍
        this.books = getAllBooks();
        
        // 更新统计
        this.updateStats();
        
        // 渲染书籍
        this.renderBooks();
        
        // 绑定排序事件
        this.bindSortEvents();
    }
    
    updateStats() {
        this.totalBooksEl.textContent = this.books.length;
    }
    
    renderBooks() {
        if (this.books.length === 0) {
            this.grid.style.display = 'none';
            this.emptyState.style.display = 'block';
            return;
        }
        
        this.grid.style.display = 'grid';
        this.emptyState.style.display = 'none';
        
        // 排序
        const sortedBooks = this.sortBooks(this.books, this.currentSort);
        
        // 渲染
        this.grid.innerHTML = sortedBooks.map(book => `
            <a href="book-detail.html?id=${book.id}" class="book-card">
                <img src="${book.cover}" alt="${book.title}" class="book-cover"
                     onerror="this.src='https://via.placeholder.com/200x280/f5f5f0/666?text=${encodeURIComponent(book.title)}'">
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-date">${this.formatDate(book.date)}</p>
                </div>
            </a>
        `).join('');
    }
    
    sortBooks(books, sortBy) {
        const sorted = [...books];
        
        switch (sortBy) {
            case 'date':
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'title':
                sorted.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
                break;
            default:
                break;
        }
        
        return sorted;
    }
    
    bindSortEvents() {
        this.sortBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 更新按钮状态
                this.sortBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 更新排序方式并重新渲染
                this.currentSort = btn.dataset.sort;
                this.renderBooks();
            });
        });
    }
    
    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    }
}
