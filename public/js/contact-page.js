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
 * Special handling for #contact-form link to also load the Google Form
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const element = e.target.closest('a');
    const href = element ? element.getAttribute('href') : null;

    if (href) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Special handling: If link is to #contact-form, trigger form load
        if (href === '#contact-form') {
          // Wait for scroll to complete, then trigger form load
          setTimeout(() => {
            const loadFormBtn = document.getElementById('load-form-btn');
            if (loadFormBtn && !loadFormBtn.classList.contains('hidden')) {
              // Only click if button is still visible (form hasn't been loaded yet)
              loadFormBtn.click();
            }
          }, 800); // Wait for smooth scroll animation
        }
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
