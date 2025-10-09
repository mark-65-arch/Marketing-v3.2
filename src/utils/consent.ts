// 🍪 Simplified Cookie Consent Module
// Purpose: Simple consent tracking for Texas TDPSA compliance
// Features: Boolean consent state, localStorage/cookie persistence

const CONSENT_COOKIE_NAME = 'mah_cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

/**
 * Check if user has accepted cookies
 */
export function hasAcceptedCookies(): boolean {
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

/**
 * Save user consent (accepts all cookies)
 */
export function saveConsent(): void {
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

  // Dispatch event so other components can react
  window.dispatchEvent(new CustomEvent('cookieConsentAccepted'));
}

/**
 * Remove consent preferences (for testing or user request)
 */
export function removeConsent(): void {
  // Remove from localStorage
  try {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
  } catch (e) {
    console.warn('Failed to remove from localStorage:', e);
  }

  // Remove cookie
  try {
    document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (e) {
    console.warn('Failed to remove cookie:', e);
  }
}

/**
 * Remove Google Analytics cookies (for privacy/opt-out)
 */
export function removeAnalyticsCookies(): void {
  const gaCookies = ['_ga', '_gat', '_gid', '_gat_gtag_'];
  const hostname = window.location.hostname;

  gaCookies.forEach(name => {
    // Remove for current domain
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`;

    // Try with leading dot
    const parts = hostname.split('.');
    if (parts.length > 1) {
      const domain = '.' + parts.slice(-2).join('.');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    }
  });
}

// Legacy compatibility exports (in case other code references these)
export const hasGivenConsent = hasAcceptedCookies;
export const isAnalyticsEnabled = hasAcceptedCookies;
