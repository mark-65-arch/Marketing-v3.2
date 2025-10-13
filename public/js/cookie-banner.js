// 🍪 Simple Cookie Consent Management
// CSP-compliant external JavaScript

const CONSENT_COOKIE_NAME = 'mah_cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

class SimpleCookieBanner {
  constructor() {
    this.banner = document.getElementById('cookie-banner');
    this.init();
  }

  init() {
    // Check if user has already accepted
    if (!this.hasAcceptedCookies()) {
      this.showBanner();
    } else {
      // User previously accepted - update GTM consent
      this.updateGTMConsent('granted');
    }

    this.bindEvents();
  }

  bindEvents() {
    const acceptBtn = document.getElementById('cookie-accept-btn');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        this.handleAccept();
      });
    }
  }

  hasAcceptedCookies() {
    // Check localStorage first
    try {
      const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
      if (stored === 'true') return true;
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }

    // Fallback to cookie
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

    return cookie?.split('=')[1] === 'true';
  }

  saveConsent() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);

    // Save to localStorage
    try {
      localStorage.setItem(CONSENT_COOKIE_NAME, 'true');
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }

    // Save to cookie as backup
    try {
      document.cookie = `${CONSENT_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
    } catch (e) {
      console.warn('Failed to save cookie:', e);
    }
  }

  handleAccept() {
    this.saveConsent();
    this.updateGTMConsent('granted');
    this.hideBanner();
  }

  updateGTMConsent(state) {
    // Update GTM Consent Mode v2
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': state
      });
      console.log(`GTM consent updated: analytics_storage=${state}`);
    } else {
      console.warn('gtag function not available');
    }
  }

  showBanner() {
    if (this.banner) {
      this.banner.classList.remove('translate-y-full');
      this.banner.setAttribute('aria-hidden', 'false');

      // Focus accept button for accessibility
      setTimeout(() => {
        const acceptButton = document.getElementById('cookie-accept-btn');
        if (acceptButton) {
          acceptButton.focus();
        }
      }, 300);
    }
  }

  hideBanner() {
    if (this.banner) {
      this.banner.classList.add('translate-y-full');
      this.banner.setAttribute('aria-hidden', 'true');
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SimpleCookieBanner();
  });
} else {
  new SimpleCookieBanner();
}
