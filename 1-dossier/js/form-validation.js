// Form Validation
class FormValidation {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }
    
    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.handleFormSubmit(e);
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
    }
    
    handleFormSubmit(e) {
        const form = e.target;
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            this.showFormMessage(form, 'يرجى تصحيح الأخطاء في النموذج', 'error');
        } else {
            // Form is valid, you can proceed with submission
            this.showFormMessage(form, 'جاري إرسال النموذج...', 'info');
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        
        this.clearFieldError(field);
        
        // Required field validation
        if (field.required && !value) {
            this.showFieldError(field, 'هذا الحقل مطلوب');
            return false;
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'يرجى إدخال بريد إلكتروني صحيح');
                return false;
            }
        }
        
        // Phone validation
        if (name === 'phone' && value) {
            const phoneRegex = /^[\+]?[0-9]{10,15}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'يرجى إدخال رقم هاتف صحيح');
                return false;
            }
        }
        
        // Minimum length validation
        if (field.dataset.minLength && value.length < field.dataset.minLength) {
            this.showFieldError(field, `يجب أن يكون طول النص ${field.dataset.minLength} حرف على الأقل`);
            return false;
        }
        
        return true;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            const errorId = `error-${field.name}-${Date.now()}`;
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.id = errorId;
            errorElement.setAttribute('role', 'alert');
            field.setAttribute('aria-describedby', errorId);
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e53e3e;
            font-size: 0.8rem;
            margin-top: 0.3rem;
            display: block;
        `;
    }
    
    clearFieldError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        field.removeAttribute('aria-describedby');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    showFormMessage(form, message, type) {
        // Remove existing message
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'assertive');
        messageElement.setAttribute('aria-atomic', 'true');
        
        form.insertBefore(messageElement, form.firstChild);
        
        // Auto remove success messages
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
    new FormValidation();
});