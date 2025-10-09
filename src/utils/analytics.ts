// 📊 Analytics Helper Module
// Purpose: Simplified event tracking for GTM/GA4
// Note: GTM loads via BaseLayout.astro with Consent Mode v2

/**
 * Push event to GTM dataLayer
 * GTM must already be loaded (happens in BaseLayout.astro)
 */
export function pushToDataLayer(data: Record<string, any>): void {
  if (typeof window === 'undefined') {
    console.warn('Cannot push to dataLayer: not in browser context');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

/**
 * Track page view
 * Sends event to both GTM dataLayer and GA4 gtag
 */
export function trackPageView(path: string, title: string): void {
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
 * Sends to both GTM and GA4
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>): void {
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

/**
 * Update GTM consent state
 * Used when user accepts/rejects cookies
 */
export function updateConsent(analyticsStorage: 'granted' | 'denied'): void {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsStorage
    });
    console.log(`Consent updated: analytics_storage=${analyticsStorage}`);
  }
}

/**
 * Remove Google Analytics cookies
 * Call this when user opts out of analytics
 */
export function removeAnalyticsCookies(): void {
  const gaCookies = ['_ga', '_gat', '_gid', '_gat_gtag_'];
  const hostname = window.location.hostname;

  gaCookies.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`;

    const parts = hostname.split('.');
    if (parts.length > 1) {
      const domain = '.' + parts.slice(-2).join('.');
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    }
  });
}

// Type declarations for window
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}
