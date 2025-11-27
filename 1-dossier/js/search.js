// Comprehensive search database
const searchDatabase = [
    // News articles
    {
        title: 'قائمة أفضل أنمي لعام 2025',
        keywords: 'أنمي، أفضل، 2025، قائمة، حلقات، مسلسل، anime، best',
        description: 'كان عام 2025 أحد أهم الأعوام في العقد، حيث جمع بين adaptations جديدة ضخمة، وسلاسل ملحمية، وأفلام سيطرت على شباك التذاكر.',
        url: 'newsdetails/news1.html',
        category: 'أخبار',
        image: 'images/image1.png',
        tags: ['أنمي', 'تقييمات', '2025']
    },
    {
        title: 'الأنميات المؤهلة لجوائز الأوسكار 2026',
        keywords: 'أوسكار، جوائز، أنمي، فيلم، 2026، chainsaw، demon slayer',
        description: 'أعلنت أكاديمية الأوسكار عن قائمة الأفلام الـ 35 المؤهلة لنيل جائزة أفضل فيلم رسوم متحركة لعام 2026',
        url: 'newsdetails/news2.html',
        category: 'أخبار',
        image: 'images/image2.png',
        tags: ['جوائز', 'أوسكار', 'أفلام']
    },
    {
        title: 'التصنيف الأسبوعي',
        keywords: 'تصنيف، أسبوعي، تقييمات، imdb، hero academia، spy family',
        description: 'جميع التقييمات مبنية على أحدث تقييمات منصة IMDb مع أبرز التطورات هذا الأسبوع في عالم الأنمي',
        url: 'newsdetails/news3.html',
        category: 'تحليل',
        image: 'images/image3.png',
        tags: ['تصنيفات', 'تقييمات', 'أسبوعي']
    },
    // Pages
    {
        title: 'عن الموقع',
        keywords: 'عن، موقع، أنمي، مانجا، anime garden، معلومات',
        description: 'تعرف على موقع Anime Garden - بوابة أخبار الأنمي والمانجا العربية الشاملة',
        url: 'about.html',
        category: 'معلومات',
        image: 'images/logo.png',
        tags: ['عن', 'موقع', 'معلومات']
    },
    {
        title: 'اتصل بنا',
        keywords: 'اتصل، تواصل، contact، رسالة، بريد، email',
        description: 'تواصل معنا من خلال نموذج الاتصال السريع أو وسائل التواصل الاجتماعي',
        url: 'contact.html',
        category: 'تواصل',
        image: 'images/logo.png',
        tags: ['اتصال', 'تواصل']
    },
    {
        title: 'الأخبار',
        keywords: 'أخبار، news، تحديثات، latest، جديد',
        description: 'أحدث أخبار الأنمي والمانجا والأفلام والمسلسلات والتطورات في عالم الترفيه',
        url: 'news.html',
        category: 'أخبار',
        image: 'images/logo.png',
        tags: ['أخبار', 'تحديثات']
    },
    {
        title: 'الخصوصية والشروط',
        keywords: 'خصوصية، شروط، privacy، terms، سياسة',
        description: 'سياسة الخصوصية والشروط والأحكام لموقع Anime Garden',
        url: 'privacy.html',
        category: 'قانوني',
        image: 'images/logo.png',
        tags: ['خصوصية', 'شروط']
    },
    {
        title: 'شروط الاستخدام',
        keywords: 'شروط، استخدام، terms of use، أحكام، agreement',
        description: 'شروط الاستخدام والأحكام والقوانين الخاصة بموقعنا',
        url: 'terms.html',
        category: 'قانوني',
        image: 'images/logo.png',
        tags: ['شروط', 'استخدام']
    }
];

// Advanced search function
function performSearch(query) {
    if (!query || query.trim().length === 0) {
        return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    const terms = searchTerm.split(' ');
    
    return searchDatabase
        .map(item => {
            let score = 0;
            const itemText = `${item.title} ${item.keywords} ${item.description}`.toLowerCase();
            
            // Exact title match (highest priority)
            if (item.title.toLowerCase().includes(searchTerm)) {
                score += 100;
            }
            
            // Keywords match
            if (item.keywords.includes(searchTerm)) {
                score += 80;
            }
            
            // Word-by-word matching
            terms.forEach(term => {
                if (item.title.toLowerCase().includes(term)) score += 30;
                if (item.keywords.includes(term)) score += 20;
                if (item.description.toLowerCase().includes(term)) score += 10;
                item.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(term)) score += 15;
                });
            });
            
            return { item, score };
        })
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.item);
}

// Display search results
function displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem 2rem;">
                <i class="fas fa-search" style="font-size: 4rem; color: var(--text-light); margin-bottom: 1.5rem; opacity: 0.5;"></i>
                <h3 style="font-size: 1.3rem; color: var(--text-dark); margin-bottom: 0.5rem;">لم يتم العثور على نتائج</h3>
                <p style="color: var(--text-light); margin-bottom: 1rem;">لا توجد نتائج لـ "<strong>${query}</strong>"</p>
                <p style="color: var(--text-light); font-size: 0.95rem;">جرب البحث عن:</p>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
                    <a href="search.html?q=أنمي" class="tag-link" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border-radius: 20px; text-decoration: none; font-size: 0.9rem;">أنمي</a>
                    <a href="search.html?q=جوائز" class="tag-link" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border-radius: 20px; text-decoration: none; font-size: 0.9rem;">جوائز</a>
                    <a href="search.html?q=أخبار" class="tag-link" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border-radius: 20px; text-decoration: none; font-size: 0.9rem;">أخبار</a>
                    <a href="search.html?q=تقييم" class="tag-link" style="padding: 0.5rem 1rem; background: var(--primary); color: white; border-radius: 20px; text-decoration: none; font-size: 0.9rem;">تقييم</a>
                </div>
            </div>
        `;
        return;
    }
    
    // Build results HTML
    let html = `
        <div style="text-align: right; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid var(--border-light);">
            <p style="color: var(--text-dark); font-size: 1.1rem;">
                <i class="fas fa-check-circle" style="color: var(--primary); margin-left: 0.5rem;"></i>
                تم العثور على <strong style="color: var(--primary);">${results.length}</strong> نتيجة
            </p>
        </div>
        <div class="search-results-grid">
    `;
    
    results.forEach((item, index) => {
        const delay = (index * 0.05);
        html += `
            <a href="${item.url}" class="search-result-card" style="animation: slideUp 0.4s ease forwards; animation-delay: ${delay}s;">
                <div class="search-result-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <span class="search-result-overlay"><i class="fas fa-arrow-left"></i></span>
                </div>
                <div class="search-result-content">
                    <span class="search-result-category">${item.category}</span>
                    <h3 class="search-result-title">${item.title}</h3>
                    <p class="search-result-description">${item.description}</p>
                    <div class="search-result-tags">
                        ${item.tags.map(tag => `<span class="search-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `;
    });
    
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// Initialize search results page
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (!query) {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '<p style="font-size: 1.1rem; color: var(--text-light); text-align: center; padding: 2rem;">لم يتم تحديد كلمة للبحث</p>';
        }
        return;
    }
    
    // Update page title and header
    document.title = `البحث عن: ${query} - Anime Garden`;
    const searchQueryElement = document.getElementById('search-query');
    if (searchQueryElement) {
        searchQueryElement.textContent = `البحث عن: "${query}"`;
    }
    
    // Perform search and display results
    const results = performSearch(query);
    displaySearchResults(results, query);
});

