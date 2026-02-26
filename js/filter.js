/**
 * COIMBATORE EXPLORE — filter.js
 * Category filter for explore.html cards using data-category attribute
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const exploreCards = document.querySelectorAll('.explore-card');
  const noResults    = document.getElementById('no-results');

  if (!filterBtns.length) return;

  let activeFilter = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter = category;
      applyFilter(category);
    });
  });

  function applyFilter(category) {
    let visibleCount = 0;

    exploreCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const matches = category === 'all' || cardCat === category;

      if (matches) {
        // Show
        card.setAttribute('data-hidden', 'false');
        card.style.display = '';
        card.classList.remove('hiding');
        card.classList.add('showing');
        visibleCount++;

        // Remove showing class after animation
        card.addEventListener('animationend', () => {
          card.classList.remove('showing');
        }, { once: true });
      } else {
        // Hide
        card.classList.add('hiding');
        card.setAttribute('data-hidden', 'true');

        setTimeout(() => {
          if (card.getAttribute('data-hidden') === 'true') {
            card.style.display = 'none';
          }
          card.classList.remove('hiding');
        }, 350);
      }
    });

    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Initialize with "all"
  applyFilter('all');
});
