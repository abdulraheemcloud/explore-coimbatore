/**
 * COIMBATORE EXPLORE — form-validation.js
 * Contact form validation: required fields, email format, submission handling
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name:    { el: form.querySelector('#name'),    errorId: 'name-error'    },
    email:   { el: form.querySelector('#email'),   errorId: 'email-error'   },
    subject: { el: form.querySelector('#subject'), errorId: 'subject-error' },
    message: { el: form.querySelector('#message'), errorId: 'msg-error'     },
  };

  const submitBtn     = form.querySelector('.form-submit');
  const successMsg    = form.querySelector('.form-success-msg');

  /* ── Live validation ──────────────────────────────────── */
  Object.keys(fields).forEach(key => {
    const { el } = fields[key];
    if (!el) return;

    el.addEventListener('blur', () => validateField(key));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateField(key);
    });
  });

  /* ── Submit handler ───────────────────────────────────── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.keys(fields).forEach(key => {
      if (!validateField(key)) isValid = false;
    });

    if (!isValid) {
      // Focus first error
      const firstError = form.querySelector('.form-control.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate submission (replace with real API in production)
    setLoading(true);

    await delay(1600);

    setLoading(false);
    showSuccess();
    showToast('✅ Message sent! We\'ll reply within 24 hours.');
  });

  /* ── Validation logic ─────────────────────────────────── */
  function validateField(key) {
    const { el, errorId } = fields[key];
    if (!el) return true;

    const value   = el.value.trim();
    const errorEl = document.getElementById(errorId);
    let   message = '';

    switch (key) {
      case 'name':
        if (!value)           message = 'Full name is required.';
        else if (value.length < 2) message = 'Name must be at least 2 characters.';
        break;

      case 'email':
        if (!value)                    message = 'Email address is required.';
        else if (!isValidEmail(value)) message = 'Please enter a valid email address.';
        break;

      case 'subject':
        if (!value)            message = 'Subject is required.';
        else if (value.length < 4) message = 'Subject must be at least 4 characters.';
        break;

      case 'message':
        if (!value)             message = 'Message cannot be empty.';
        else if (value.length < 20) message = 'Message must be at least 20 characters.';
        break;
    }

    if (message) {
      setError(el, errorEl, message);
      return false;
    } else {
      clearError(el, errorEl);
      return true;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setError(input, errorEl, message) {
    input.classList.add('error');
    input.classList.remove('success');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  }

  function clearError(input, errorEl) {
    input.classList.remove('error');
    input.classList.add('success-input');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  /* ── UI helpers ───────────────────────────────────────── */
  function setLoading(state) {
    if (!submitBtn) return;
    submitBtn.disabled = state;
    submitBtn.classList.toggle('loading', state);
  }

  function showSuccess() {
    if (successMsg) {
      form.querySelector('.form-fields').style.display = 'none';
      successMsg.style.display = 'block';
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
