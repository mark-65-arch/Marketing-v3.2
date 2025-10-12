// =Ä Main Layout Scripts
// Purpose: Email tracking, accessibility enhancements, and lazy loading
// CSP-compliant external JavaScript module

// Get page type and current path from data attributes
const pageData = document.body.dataset || {};
const pageType = pageData.pageType || 'home';
const currentPath = pageData.currentPath || window.location.pathname;

// Email Click Tracking
document.addEventListener('DOMContentLoaded', () => {
  // 	 Track email clicks
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Future: Send to analytics
      // e.g., gtag('event', 'email_click', { page: currentPath });
      console.log('Email link clicked:', link.href);
    });
  });
});

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Skip link functionality (link is in GlobalNav component)
  const skipLink = document.querySelector('a[href="#main-content"]');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Enhanced focus management for better keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-tabbing');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-tabbing');
  });
});

// Lazy Load Background Images
document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const bgImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const bgImage = element.getAttribute('data-bg');
          if (bgImage) {
            element.style.backgroundImage = `url(${bgImage})`;
            element.classList.add('bg-loaded');
            bgImageObserver.unobserve(element);
          }
        }
      });
    });

    document.querySelectorAll('[data-bg]').forEach(element => {
      bgImageObserver.observe(element);
    });
  }
});
