// < Language Switcher Scripts
// Purpose: Language toggle functionality with persistent storage
// CSP-compliant external JavaScript module

// Language switcher functionality with persistent storage
document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-toggle-button');

  // Check for stored language preference and redirect if needed
  const storedLang = localStorage.getItem('preferredLanguage');
  const currentPath = window.location.pathname;
  // Detect base URL from current path (works for both localhost and production)
  const baseUrl = window.location.pathname.includes('/Marketing-v3.2/') ? '/Marketing-v3.2/' : '/';

  if (storedLang) {
    const isCurrentlySpanish = currentPath.includes('/es/') || currentPath.includes('/es');
    const shouldBeSpanish = storedLang === 'es';

    // Only redirect if preference doesn't match current language
    if (shouldBeSpanish && !isCurrentlySpanish) {
      // Redirect to Spanish version
      let cleanPath = currentPath;
      if (cleanPath.startsWith(baseUrl) && baseUrl !== '/') {
        cleanPath = cleanPath.slice(baseUrl.length);
      }
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.slice(1);
      }
      if (!cleanPath || cleanPath === '') {
        // Homepage
        window.location.href = `${baseUrl}es/`;
      } else if (cleanPath === 'seo-growth-strategy') {
        // Special case: English SEO page -> Spanish version is in services/
        window.location.href = `${baseUrl}es/services/seo-growth-strategy`;
      } else {
        window.location.href = `${baseUrl}es/${cleanPath}`;
      }
    } else if (!shouldBeSpanish && isCurrentlySpanish) {
      // Redirect to English version
      let cleanPath = currentPath;
      if (cleanPath.startsWith(baseUrl) && baseUrl !== '/') {
        cleanPath = cleanPath.slice(baseUrl.length);
      }
      if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.slice(1);
      }
      if (cleanPath.startsWith('es/')) {
        cleanPath = cleanPath.slice(3);
      } else if (cleanPath === 'es') {
        cleanPath = '';
      }
      if (cleanPath === 'services/seo-growth-strategy') {
        // Special case: Spanish SEO page -> English version is at root
        window.location.href = `${baseUrl}seo-growth-strategy`;
      } else {
        window.location.href = `${baseUrl}${cleanPath}`;
      }
    }
  }

  langButtons.forEach(button => {
    const dropdown = button.nextElementSibling;

    // Click to toggle dropdown
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', (!isExpanded).toString());

      // Toggle dropdown visibility
      if (!isExpanded) {
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.transform = 'translateY(0)';
      } else {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-0.5rem)';
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!button.contains(e.target) && !dropdown.contains(e.target)) {
        button.setAttribute('aria-expanded', 'false');
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-0.5rem)';
      }
    });

    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      } else if (e.key === 'Escape') {
        button.setAttribute('aria-expanded', 'false');
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-0.5rem)';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const firstLink = dropdown.querySelector('a');
        if (firstLink) {
          button.setAttribute('aria-expanded', 'true');
          dropdown.style.opacity = '1';
          dropdown.style.visibility = 'visible';
          dropdown.style.transform = 'translateY(0)';
          firstLink.focus();
        }
      }
    });

    // Handle arrow key navigation within dropdown
    const dropdownLinks = dropdown.querySelectorAll('a');
    dropdownLinks.forEach((link, index) => {
      // Store language preference when clicking a language option
      link.addEventListener('click', (e) => {
        const selectedLang = link.getAttribute('hreflang');
        if (selectedLang) {
          localStorage.setItem('preferredLanguage', selectedLang);
        }
      });

      link.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextLink = dropdownLinks[index + 1] || dropdownLinks[0];
          nextLink.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevLink = dropdownLinks[index - 1] || dropdownLinks[dropdownLinks.length - 1];
          prevLink.focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          button.setAttribute('aria-expanded', 'false');
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
          dropdown.style.transform = 'translateY(-0.5rem)';
          button.focus();
        }
      });
    });
  });
});
