// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    const searchForm = document.querySelector('.search-form');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Search overlay toggle
    if (searchToggle && searchOverlay) {
        searchToggle.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            const searchInput = searchOverlay.querySelector('input');
            if (searchInput) searchInput.focus();
        });
    }
    
    // Close search
    if (closeSearch && searchOverlay) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
    }
    
    // Close search on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
    // Close search on overlay click
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    }
    
    // Search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchForm.querySelector('input[type="text"]').value.trim();
            if (query) {
                // Redirect to search results page
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.className = mainNav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });
    }
    
    // Close mobile menu on link click
    if (mainNav) {
        mainNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                mainNav.classList.remove('active');
                const icon = mobileMenuToggle?.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }
});