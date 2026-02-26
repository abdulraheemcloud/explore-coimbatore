/**
 * COIMBATORE EXPLORE — theme.js
 * Dark / Light mode toggle with localStorage persistence
 */

'use strict';

(function() {
  /* ── Apply saved theme immediately (before paint) ──── */
  const saved = localStorage.getItem('cbe-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  /* ── After DOM loaded ──────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const knob   = document.getElementById('theme-knob');
    if (!toggle) return;

    // Sync knob icon with current theme
    const syncKnob = (theme) => {
      if (knob) knob.textContent = theme === 'dark' ? '🌙' : '☀️';
      toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    };

    syncKnob(saved);

    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next    = current === 'dark' ? 'light' : 'dark';

      // Brief flash animation
      const flash = document.createElement('div');
      flash.className = 'theme-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 300);

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cbe-theme', next);
      syncKnob(next);
    });
  });
})();
