/**
 * Site Utilities: Performance and Security
 *
 * This script provides:
 * 1. Lazy loading for images (performance optimization)
 * 2. Form validation with XSS and SQL injection protection
 * 3. Honeypot spam detection
 */

// =============================================================================
// IMAGE LAZY LOADING
// =============================================================================

/**
 * Lazy load images when they enter the viewport
 * Uses IntersectionObserver for efficient performance
 */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  });
}

// =============================================================================
// FORM SECURITY AND VALIDATION
// =============================================================================

/**
 * Enhanced form security with XSS and SQL injection protection
 * Validates all form submissions before allowing them through
 */
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form:not([data-skip-validation])');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const formData = new FormData(form);
      let hasIssues = false;

      // Check honeypot field (spam detection)
      const honeypot = formData.get('website');
      if (honeypot && String(honeypot).trim().length > 0) {
        e.preventDefault();
        console.warn('Form validation failed: honeypot triggered');
        return false;
      }

      // XSS pattern detection
      const xssPatterns = [
        /<script[^>]*>/gi,
        /<iframe[^>]*>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<img[^>]*onerror/gi,
        /eval\(/gi,
        /vbscript:/gi,
      ];

      // SQL injection pattern detection
      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b)/gi,
        /--/g,
        /'\s*(OR|AND)\s*'?\w+/gi,
      ];

      // Validate each form field
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string' && key !== 'website') {
          // Check for XSS patterns
          for (const pattern of xssPatterns) {
            if (pattern.test(value)) {
              hasIssues = true;
              console.warn('Potential XSS pattern detected in form field:', key);
              break;
            }
          }

          // Check for SQL injection patterns
          for (const pattern of sqlPatterns) {
            if (pattern.test(value)) {
              hasIssues = true;
              console.warn('Potential SQL injection pattern detected in form field:', key);
              break;
            }
          }
        }
      }

      // Block submission if issues detected
      if (hasIssues) {
        e.preventDefault();
        alert('Form submission blocked: Invalid input detected. Please check your entries.');
        return false;
      }
    });
  });
});
