/**
 * COIMBATORE EXPLORE — components.js
 * Dynamically loads header and footer into every page
 */

'use strict';

async function loadComponent(id, file) {
  try {
    const res  = await fetch(file);
    const html = await res.text();
    const el   = document.getElementById(id);
    if (el) el.innerHTML = html;
  } catch (err) {
    console.warn(`Component load failed: ${file}`, err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Load header and footer
  await Promise.all([
    loadComponent('header-placeholder', 'components/header.html'),
    loadComponent('footer-placeholder', 'components/footer.html'),
  ]);

  // After components load — run these
  highlightActiveNav();
  initThemeToggle();
});

function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const knob   = document.getElementById('theme-knob');
  if (!toggle) return;

  const saved = localStorage.getItem('cbe-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  if (knob) knob.textContent = saved === 'dark' ? '🌙' : '☀️';

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cbe-theme', next);
    if (knob) knob.textContent = next === 'dark' ? '🌙' : '☀️';
  });
}
