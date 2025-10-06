// 🍪 Cookie Consent Management Module
// Purpose: Handle user consent preferences with localStorage/cookie persistence
// Features: 12-month persistence, default analytics enabled, consent enforcement

export interface ConsentPreferences {
  strictlyNecessary: boolean; // Always true
  analytics: boolean; // Default true
  functional: boolean; // Default false
  marketing: boolean; // Default false
  timestamp: number;
  version: string; // For future consent version migrations
}

const CONSENT_COOKIE_NAME = 'mah_cookie_consent';
const CONSENT_VERSION = '1.0';
const CONSENT_EXPIRY_DAYS = 365; // 12 months

/**
 * Default consent preferences
 * Analytics enabled by default as per requirements
 */
const DEFAULT_PREFERENCES: ConsentPreferences = {
  strictlyNecessary: true, // Always on
  analytics: true, // Enabled by default
  functional: false,
  marketing: false,
  timestamp: Date.now(),
  version: CONSENT_VERSION
};

/**
 * Get consent preferences from storage
 * Returns null if no consent has been given yet
 */
export function getConsentPreferences(): ConsentPreferences | null {
  // Try localStorage first (more reliable)
  try {
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (stored) {
      const preferences = JSON.parse(stored) as ConsentPreferences;

      // Check if consent is still valid (not expired)
      const expiryMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      if (Date.now() - preferences.timestamp < expiryMs) {
        // Always ensure strictly necessary is true
        preferences.strictlyNecessary = true;
        return preferences;
      } else {
        // Expired - remove it
        removeConsentPreferences();
        return null;
      }
    }
  } catch (e) {
    console.warn('Failed to read consent from localStorage:', e);
  }

  // Fallback to cookie
  try {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

    if (cookie) {
      const value = cookie.split('=')[1];
      const preferences = JSON.parse(decodeURIComponent(value)) as ConsentPreferences;

      // Check expiry
      const expiryMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      if (Date.now() - preferences.timestamp < expiryMs) {
        preferences.strictlyNecessary = true;
        return preferences;
      } else {
        removeConsentPreferences();
        return null;
      }
    }
  } catch (e) {
    console.warn('Failed to read consent from cookie:', e);
  }

  return null;
}

/**
 * Save consent preferences to storage
 * Persists to both localStorage and cookie for redundancy
 */
export function saveConsentPreferences(preferences: Partial<ConsentPreferences>): void {
  const fullPreferences: ConsentPreferences = {
    strictlyNecessary: true, // Always true
    analytics: preferences.analytics ?? DEFAULT_PREFERENCES.analytics,
    functional: preferences.functional ?? DEFAULT_PREFERENCES.functional,
    marketing: preferences.marketing ?? DEFAULT_PREFERENCES.marketing,
    timestamp: Date.now(),
    version: CONSENT_VERSION
  };

  const json = JSON.stringify(fullPreferences);

  // Save to localStorage
  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, json);
  } catch (e) {
    console.warn('Failed to save consent to localStorage:', e);
  }

  // Save to cookie as backup
  try {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);

    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(json)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  } catch (e) {
    console.warn('Failed to save consent to cookie:', e);
  }

  // Dispatch custom event so other parts of the app can react
  window.dispatchEvent(new CustomEvent('consentChanged', {
    detail: fullPreferences
  }));
}

/**
 * Remove all consent preferences
 */
export function removeConsentPreferences(): void {
  // Remove from localStorage
  try {
    localStorage.removeItem(CONSENT_COOKIE_NAME);
  } catch (e) {
    console.warn('Failed to remove consent from localStorage:', e);
  }

  // Remove cookie
  try {
    document.cookie = `${CONSENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (e) {
    console.warn('Failed to remove consent cookie:', e);
  }
}

/**
 * Accept all cookies
 */
export function acceptAllCookies(): void {
  saveConsentPreferences({
    strictlyNecessary: true,
    analytics: true,
    functional: true,
    marketing: true
  });
}

/**
 * Reject non-essential cookies (only strictly necessary)
 */
export function rejectNonEssentialCookies(): void {
  saveConsentPreferences({
    strictlyNecessary: true,
    analytics: false,
    functional: false,
    marketing: false
  });
}

/**
 * Check if user has given consent (any type)
 */
export function hasGivenConsent(): boolean {
  return getConsentPreferences() !== null;
}

/**
 * Check if analytics is enabled
 */
export function isAnalyticsEnabled(): boolean {
  const preferences = getConsentPreferences();
  if (!preferences) {
    // If no consent given yet, analytics is enabled by default
    return true;
  }
  return preferences.analytics;
}

/**
 * Check if marketing is enabled
 */
export function isMarketingEnabled(): boolean {
  const preferences = getConsentPreferences();
  return preferences?.marketing ?? false;
}

/**
 * Check if functional is enabled
 */
export function isFunctionalEnabled(): boolean {
  const preferences = getConsentPreferences();
  return preferences?.functional ?? false;
}

/**
 * Get default preferences (for initial modal state)
 */
export function getDefaultPreferences(): ConsentPreferences {
  return { ...DEFAULT_PREFERENCES };
}

/**
 * Remove Google Analytics cookies (when user opts out)
 */
export function removeAnalyticsCookies(): void {
  // Remove GA cookies
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
