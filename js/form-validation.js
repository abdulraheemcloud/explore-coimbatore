(function() {
    'use strict';
    
    function initForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', handleSubmit);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        
        // Required check
        if (field.required && !value) {
            showError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (name === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                showError(field, 'Please enter a valid email');
                return false;
            }
        }
        
        // Message length
        if (name === 'message' && value.length < 10) {
            showError(field, 'Message must be at least 10 characters');
            return false;
        }
        
        clearError(field);
        return true;
    }
    
    function showError(field, message) {
        field.style.borderColor = '#c84b31';
        let error = field.parentNode.querySelector('.error-message');
        if (!error) {
            error = document.createElement('span');
            error.className = 'error-message';
            error.style.color = '#c84b31';
            error.style.fontSize = '12px';
            field.parentNode.appendChild(error);
        }
        error.textContent = message;
    }
    
    function clearError(field) {
        field.style.borderColor = '';
        const error = field.parentNode.querySelector('.error-message');
        if (error) error.textContent = '';
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) isValid = false;
        });
        
        if (!isValid) return;
        
        // Show success
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            form.reset();
            
            // Show success message
            let success = form.querySelector('.form-success');
            if (!success) {
                success = document.createElement('div');
                success.className = 'form-success';
                success.style.cssText = 'margin-top:20px;padding:15px;background:#d4edda;color:#155724;border-radius:6px;';
                success.textContent = 'Thank you! Your message has been sent.';
                form.appendChild(success);
            }
            success.style.display = 'block';
            
            setTimeout(() => {
                success.style.display = 'none';
            }, 5000);
        }, 1500);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initForm);
    } else {
        initForm();
    }
})();
