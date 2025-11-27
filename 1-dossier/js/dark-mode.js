// Dark Mode Functionality
class DarkMode {
    constructor() {
        this.toggleButton = document.getElementById('dark-mode-toggle');
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        this.init();
    }
    
    init() {
        this.applyDarkMode();
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }
    }
    
    applyDarkMode() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.body.classList.add('dark-mode');
            if (this.toggleButton) {
                this.toggleButton.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
                this.toggleButton.title = 'تفعيل الوضع النهاري';
                this.toggleButton.setAttribute('aria-pressed', 'true');
            }
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.body.classList.remove('dark-mode');
            if (this.toggleButton) {
                this.toggleButton.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
                this.toggleButton.title = 'تفعيل الوضع الليلي';
                this.toggleButton.setAttribute('aria-pressed', 'false');
            }
        }
    }
    
    toggle() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        this.applyDarkMode();
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('darkModeChange', {
            detail: { isDarkMode: this.isDarkMode }
        }));
    }
    
    // Public method to check current mode
    getCurrentMode() {
        return this.isDarkMode;
    }
}

// Initialize Dark Mode immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.darkMode = new DarkMode();
    });
} else {
    window.darkMode = new DarkMode();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkMode;
}