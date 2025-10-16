/**
 * Service Page Interactions
 *
 * This script handles:
 * - FAQ accordion functionality (click to expand/collapse)
 * - Scroll animations using IntersectionObserver
 *
 * Used on all service pages for consistent behavior.
 * Externalized for CSP compliance.
 */

// 🎯 FAQ Accordion Functionality (All Devices)
document.addEventListener('DOMContentLoaded', () => {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const accordionItem = trigger.parentElement?.parentElement;
      const chevron = trigger.querySelector('i.fa-chevron-down');

      if (accordionItem && chevron) {
        accordionItem.classList.toggle('accordion-open');

        if (accordionItem.classList.contains('accordion-open')) {
          chevron.style.transform = 'rotate(180deg)';
        } else {
          chevron.style.transform = 'rotate(0)';
        }
      }
    });
  });
});

// 📊 Enhanced scroll animations for service page
document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all cards and important elements
    const elementsToAnimate = document.querySelectorAll('.card-glass, .heading-lg, .heading-xl');
    elementsToAnimate.forEach(el => observer.observe(el));
  }
});
