/**
 * COIMBATORE EXPLORE — main.js
 * Core JS: Navbar, Scroll, Counter, Reveal, Scroll-to-top, Component loading
 */

'use strict';

/* ── DOM Ready ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollProgress();
  initScrollReveal();
  initScrollTop();
  initCounters();
  highlightActiveNav();
  initLightbox();
});

/* ── Navbar: scroll state + hamburger ──────────────────────── */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  if (!navbar) return;

  // Scroll behaviour
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ── Scroll Progress Bar ────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const docH   = document.documentElement.scrollHeight - window.innerHeight;
    const pct    = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct.toFixed(1) + '%';
  }, { passive: true });
}

/* ── Scroll Reveal (Intersection Observer) ──────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── Scroll to Top Button ───────────────────────────────────── */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Animated Counters ──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1800; // ms
  const start    = performance.now();

  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
      el.classList.add('popped');
      setTimeout(() => el.classList.remove('popped'), 350);
    }
  };

  requestAnimationFrame(update);
}

/* ── Highlight Active Nav Link ──────────────────────────────── */
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Lightbox ───────────────────────────────────────────────── */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg  = lightbox.querySelector('.lightbox-img');
  const lightboxCap  = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  // Open lightbox on card click
  document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const src = trigger.getAttribute('data-lightbox');
      const cap = trigger.getAttribute('data-caption') || '';
      if (lightboxImg) lightboxImg.src = src;
      if (lightboxCap) lightboxCap.textContent = cap;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lightboxImg) setTimeout(() => lightboxImg.src = '', 300);
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ── Toast Notification ─────────────────────────────────────── */
window.showToast = function(message, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
};
