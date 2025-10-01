/**
 * 🔗 UTM Parameter Helper
 * Safely append UTM parameters to URLs without duplication
 *
 * Usage:
 * ```javascript
 * import { addUtm } from './lib/utm';
 *
 * const url = addUtm('/pricing', {
 *   utm_source: 'newsletter',
 *   utm_medium: 'email',
 *   utm_campaign: 'spring_promo'
 * });
 * // Returns: /pricing?utm_source=newsletter&utm_medium=email&utm_campaign=spring_promo
 * ```
 */

/**
 * Add UTM parameters to a URL without duplicating existing params
 * @param {string} href - Original URL or path
 * @param {object} params - UTM parameters to add
 * @returns {string} - URL with merged parameters
 */
export function addUtm(href, params = {}) {
  try {
    // Handle empty or invalid href
    if (!href || typeof href !== 'string') {
      return href || '';
    }

    // Filter out empty/null params
    const validParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = String(value);
      }
      return acc;
    }, {});

    // If no valid params, return original href
    if (Object.keys(validParams).length === 0) {
      return href;
    }

    // Try to use URL constructor (works for absolute and relative URLs)
    try {
      // For relative URLs, use a dummy base
      const base = href.startsWith('http') ? undefined : 'http://dummy.com';
      const url = new URL(href, base);

      // Merge params without overwriting existing ones
      Object.entries(validParams).forEach(([key, value]) => {
        if (!url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });

      // Return path + search for relative URLs, full URL for absolute
      if (base) {
        return url.pathname + url.search + url.hash;
      } else {
        return url.toString();
      }
    } catch (urlError) {
      // Fallback: manual string manipulation
      const separator = href.includes('?') ? '&' : '?';
      const paramString = Object.entries(validParams)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      return `${href}${separator}${paramString}`;
    }
  } catch (error) {
    // Safety fallback: return original href
    console.warn('UTM helper error:', error);
    return href;
  }
}

/**
 * Extract UTM parameters from current URL
 * @returns {object} - Object with utm_* parameters
 */
export function getUtmParams() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const utmParams = {};

    // Extract all utm_* parameters
    for (const [key, value] of params.entries()) {
      if (key.startsWith('utm_')) {
        utmParams[key] = value;
      }
    }

    return utmParams;
  } catch (error) {
    return {};
  }
}

/**
 * Store UTM parameters in sessionStorage for attribution
 * @param {number} expiryMinutes - How long to store (default: 30 minutes)
 */
export function storeUtmParams(expiryMinutes = 30) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const utmParams = getUtmParams();

    if (Object.keys(utmParams).length > 0) {
      const data = {
        params: utmParams,
        expiry: Date.now() + (expiryMinutes * 60 * 1000)
      };

      sessionStorage.setItem('utm_attribution', JSON.stringify(data));
    }
  } catch (error) {
    console.warn('Failed to store UTM params:', error);
  }
}

/**
 * Retrieve stored UTM parameters if not expired
 * @returns {object} - Stored UTM parameters or empty object
 */
export function getStoredUtmParams() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const stored = sessionStorage.getItem('utm_attribution');
    if (!stored) {
      return {};
    }

    const data = JSON.parse(stored);

    // Check if expired
    if (Date.now() > data.expiry) {
      sessionStorage.removeItem('utm_attribution');
      return {};
    }

    return data.params || {};
  } catch (error) {
    return {};
  }
}

/**
 * Add UTM params for external campaign links
 * Use this for promotional banners, email links, social media CTAs
 *
 * @example
 * // Email campaign link
 * const link = addCampaignUtm('/pricing', 'email', 'newsletter', 'spring_sale');
 *
 * @param {string} href - Original URL
 * @param {string} source - utm_source (e.g., 'newsletter', 'facebook')
 * @param {string} medium - utm_medium (e.g., 'email', 'social', 'cpc')
 * @param {string} campaign - utm_campaign (e.g., 'spring_sale', 'launch_2024')
 * @param {string} content - utm_content (optional, for A/B testing)
 * @returns {string} - URL with UTM parameters
 */
export function addCampaignUtm(href, source, medium, campaign, content = '') {
  const params = {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign
  };

  if (content) {
    params.utm_content = content;
  }

  return addUtm(href, params);
}

export default addUtm;
