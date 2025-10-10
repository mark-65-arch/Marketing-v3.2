/**
 * Contact Page Interactive Features
 *
 * This script provides:
 * 1. Smooth scrolling for anchor links
 * 2. FAQ accordion functionality (mobile only)
 */

// =============================================================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// =============================================================================

/**
 * Enable smooth scrolling when clicking internal anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const element = e.target;
    const href = element.getAttribute('href');
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// =============================================================================
// FAQ ACCORDION (Mobile Only)
// =============================================================================

/**
 * Toggle FAQ accordion items on mobile devices
 * Note: Accordion is disabled on desktop (via CSS)
 */
const accordionTriggers = document.querySelectorAll('.accordion-trigger');

accordionTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const accordionItem = trigger.parentElement;
    const chevron = trigger.querySelector('i');

    // Toggle accordion content
    accordionItem.classList.toggle('accordion-open');

    // Rotate chevron icon
    if (accordionItem.classList.contains('accordion-open')) {
      chevron.style.transform = 'rotate(180deg)';
    } else {
      chevron.style.transform = 'rotate(0)';
    }
  });
});
