// 📊 Analytics Loader Module
// Purpose: Consent-aware loading of GTM and GA4
// Features: Only loads when analytics consent is given, removes tracking on opt-out

import { isAnalyticsEnabled, removeAnalyticsCookies } from './consent';

// Global flag to track if GTM has been initialized
let gtmInitialized = false;
let ga4Initialized = false;

/**
 * Initialize Google Tag Manager
 * Only loads if analytics consent is enabled
 */
export function initializeGTM(containerId: string): void {
  if (gtmInitialized) {
    console.log('GTM already initialized');
    return;
  }

  if (!isAnalyticsEnabled()) {
    console.log('GTM blocked: Analytics consent not given');
    return;
  }

  try {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Add consent state to dataLayer
    window.dataLayer.push({
      event: 'consent_initialized',
      consent: {
        analytics_storage: 'granted',
        ad_storage: 'denied', // Can be updated based on marketing consent
        functionality_storage: 'denied',
        personalization_storage: 'denied'
      }
    });

    // Load GTM script
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const f = d.getElementsByTagName(s)[0];
      const j = d.createElement(s) as HTMLScriptElement;
      const dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode?.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', containerId);

    gtmInitialized = true;
    console.log('GTM initialized:', containerId);
  } catch (e) {
    console.error('Failed to initialize GTM:', e);
  }
}

/**
 * Initialize Google Analytics 4
 * Only loads if analytics consent is enabled
 */
export function initializeGA4(measurementId: string): void {
  if (ga4Initialized) {
    console.log('GA4 already initialized');
    return;
  }

  if (!isAnalyticsEnabled()) {
    console.log('GA4 blocked: Analytics consent not given');
    return;
  }

  try {
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      anonymize_ip: true, // Privacy-friendly
      cookie_flags: 'SameSite=None;Secure'
    });

    ga4Initialized = true;
    console.log('GA4 initialized:', measurementId);
  } catch (e) {
    console.error('Failed to initialize GA4:', e);
  }
}

/**
 * Disable analytics tracking
 * Removes cookies and sets opt-out flag
 */
export function disableAnalytics(measurementId?: string): void {
  // Remove GA cookies
  removeAnalyticsCookies();

  // Set GA opt-out flag if measurement ID provided
  if (measurementId) {
    window[`ga-disable-${measurementId}`] = true;
  }

  // Update GTM consent state if GTM is loaded
  if (gtmInitialized && window.dataLayer) {
    window.dataLayer.push({
      event: 'consent_updated',
      consent: {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied'
      }
    });
  }

  console.log('Analytics disabled and cookies removed');
}

/**
 * Enable analytics tracking
 * Re-initializes GTM/GA4 if consent is granted
 */
export function enableAnalytics(containerId?: string, measurementId?: string): void {
  // Update GTM consent state if GTM is loaded
  if (gtmInitialized && window.dataLayer) {
    window.dataLayer.push({
      event: 'consent_updated',
      consent: {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied'
      }
    });
  }

  // Initialize GTM if not already done
  if (containerId && !gtmInitialized) {
    initializeGTM(containerId);
  }

  // Initialize GA4 if not already done
  if (measurementId && !ga4Initialized) {
    initializeGA4(measurementId);
  }

  console.log('Analytics enabled');
}

/**
 * Push event to GTM dataLayer
 * Only works if GTM is initialized
 */
export function pushToDataLayer(data: Record<string, any>): void {
  if (!gtmInitialized) {
    console.warn('Cannot push to dataLayer: GTM not initialized');
    return;
  }

  if (!isAnalyticsEnabled()) {
    console.warn('Cannot push to dataLayer: Analytics consent not given');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/**
 * Track page view
 */
export function trackPageView(path: string, title: string): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  // GTM event
  pushToDataLayer({
    event: 'page_view',
    page_path: path,
    page_title: title
  });

  // GA4 event (if gtag is available)
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }
}

/**
 * Track custom event
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>): void {
  if (!isAnalyticsEnabled()) {
    return;
  }

  // GTM event
  pushToDataLayer({
    event: eventName,
    ...eventData
  });

  // GA4 event (if gtag is available)
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
}

// Type declarations for window
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    [key: `ga-disable-${string}`]: boolean;
  }
}
