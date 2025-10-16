/**
 * Pricing Page Interactions
 *
 * This script handles:
 * - FAQ accordion functionality (click to expand/collapse)
 * - Optimized to prevent forced reflows
 *
 * Used on pricing pages for consistent behavior.
 * Externalized for CSP compliance.
 */

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
  // FAQ Accordion functionality - optimized to avoid forced reflows
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId || '');
      const icon = trigger.querySelector('.accordion-icon');

      // Update state FIRST
      const newState = !isOpen;

      // Close all other accordions
      accordionTriggers.forEach(function(otherTrigger) {
        if (otherTrigger !== trigger) {
          var otherContentId = otherTrigger.getAttribute('aria-controls');
          var otherContent = document.getElementById(otherContentId || '');
          var otherIcon = otherTrigger.querySelector('.accordion-icon');

          otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) {
            otherContent.setAttribute('aria-hidden', 'true');
            otherContent.classList.remove('accordion-open');
          }
          if (otherIcon) {
            otherIcon.classList.remove('rotate-180');
          }
        }
      });

      // Toggle current accordion - use class instead of scrollHeight to avoid forced reflow
      trigger.setAttribute('aria-expanded', newState ? 'true' : 'false');
      if (content) {
        content.setAttribute('aria-hidden', newState ? 'false' : 'true');

        if (newState) {
          content.classList.add('accordion-open');
          if (icon) {
            icon.classList.add('rotate-180');
          }
        } else {
          content.classList.remove('accordion-open');
          if (icon) {
            icon.classList.remove('rotate-180');
          }
        }
      }
    });
  });
});
