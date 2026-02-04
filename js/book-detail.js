/**
 * 静心书斋 - 读书笔记详情页逻辑
 */

document.addEventListener('DOMContentLoaded', () => {
    // 获取URL参数中的书籍ID
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    
    if (!bookId) {
        showEmptyState('未找到书籍信息');
        return;
    }
    
    // 获取书籍数据
    const book = getBookById(bookId);
    
    if (!book) {
        showEmptyState('书籍不存在');
        return;
    }
    
    // 渲染页面
    renderBookDetail(book);
    
    // 初始化手风琴
    initAccordion();
});

/**
 * 渲染书籍详情
 */
function renderBookDetail(book) {
    // 更新页面标题
    document.title = `${book.title} - 静心书斋`;
    
    // 基本信息
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookAuthor').textContent = book.author;
    document.getElementById('bookNationality').textContent = book.nationality || '-';
    document.getElementById('bookPublisher').textContent = book.publisher || '-';
    document.getElementById('bookIsbn').textContent = book.isbn || '-';
    document.getElementById('bookDate').textContent = formatDate(book.date);
    
    // 封面
    const coverEl = document.getElementById('bookCover');
    coverEl.src = book.cover;
    coverEl.alt = book.title;
    coverEl.onerror = function() {
        this.src = `https://via.placeholder.com/200x280/f5f5f0/666?text=${encodeURIComponent(book.title)}`;
    };
    
    // 内容概述
    document.getElementById('bookSummary').textContent = book.summary || '暂无概述';
    
    // 结构框架
    renderStructure(book.structure || []);
    
    // 经典回顾
    renderHighlights(book.highlights || []);
}

/**
 * 渲染结构框架（手风琴）
 */
function renderStructure(structure) {
    const container = document.getElementById('structureAccordion');
    
    if (!structure || structure.length === 0) {
        container.innerHTML = '<p class="empty-hint">暂无结构框架</p>';
        return;
    }
    
    container.innerHTML = structure.map((chapter, index) => `
        <div class="accordion-item${index === 0 ? ' active' : ''}">
            <div class="accordion-header">
                <span class="accordion-title">${chapter.chapter}</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </div>
            <div class="accordion-content">
                <div class="accordion-body">
                    ${chapter.content ? `<p class="chapter-overview">${chapter.content}</p>` : ''}
                    ${chapter.sections && chapter.sections.length > 0 ? `
                        <div class="sub-sections">
                            ${chapter.sections.map(section => `
                                <div class="sub-section">
                                    <h4 class="sub-section-title">${section.title}</h4>
                                    <p class="sub-section-content">${section.content}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 渲染经典回顾
 */
function renderHighlights(highlights) {
    const container = document.getElementById('highlightsList');
    
    if (!highlights || highlights.length === 0) {
        container.innerHTML = '<p class="empty-hint">暂无经典回顾</p>';
        return;
    }
    
    container.innerHTML = highlights.map(item => `
        <div class="highlight-item">
            <p class="highlight-text">${item.text}</p>
            ${item.note ? `<p class="highlight-note">${item.note}</p>` : ''}
        </div>
    `).join('');
}

/**
 * 初始化手风琴交互
 */
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // 关闭所有其他项（可选：如果想要同时只展开一个）
            // document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            // 切换当前项
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

/**
 * 格式化日期
 */
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

/**
 * 显示空状态
 */
function showEmptyState(message) {
    const main = document.querySelector('.book-detail-main');
    main.innerHTML = `
        <div class="empty-state">
            <h2>${message}</h2>
            <p>请返回书斋选择一本书籍</p>
            <a href="books.html" class="back-button" style="margin-top: 30px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span>返回书斋</span>
            </a>
        </div>
    `;
}
