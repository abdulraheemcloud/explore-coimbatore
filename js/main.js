(function() {
    'use strict';
    
    // Header scroll effect
    function handleScroll() {
        const header = document.getElementById('header');
        const scrollTop = document.getElementById('scrollTop');
        
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        if (scrollTop) {
            if (window.scrollY > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        }
    }
    
    // Mobile menu
    function toggleMenu() {
        const menu = document.getElementById('navMenu');
        const toggle = document.getElementById('navToggle');
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
    
    // Scroll reveal
    function initScrollReveal() {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    }
    
    // Animated counters
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(c => observer.observe(c));
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current));
            }
        }, 30);
    }
    
    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
        return num + '+';
    }
    
    // Scroll to top
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Init
    function init() {
        window.addEventListener('scroll', handleScroll);
        
        const toggle = document.getElementById('navToggle');
        if (toggle) toggle.addEventListener('click', toggleMenu);
        
        const scrollBtn = document.getElementById('scrollTop');
        if (scrollBtn) scrollBtn.addEventListener('click', scrollToTop);
        
        initScrollReveal();
        initCounters();
        handleScroll();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
