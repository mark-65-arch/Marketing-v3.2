/**
 * Google Tag Manager Initialization with Consent Mode v2
 * OPTIMIZED FOR PERFORMANCE - Loads after page is interactive
 *
 * This script initializes GTM with privacy-first consent defaults.
 * All tracking consent is denied by default until the user explicitly accepts
 * via the cookie consent banner.
 *
 * GTM Container ID: GTM-KQS29VV6
 * Consent Mode: v2 (GDPR, CCPA, TDPSA compliant)
 *
 * Performance Optimization:
 * - Uses requestIdleCallback to load GTM when browser is idle
 * - Fallback to setTimeout after 3 seconds for browsers without requestIdleCallback
 * - Reduces main-thread blocking during critical page load
 */

// Initialize dataLayer and gtag function immediately (required for consent)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent state (all DENIED for privacy-first approach)
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'denied',
  'personalization_storage': 'denied',
  'wait_for_update': 500
});

// GTM Loading function
function loadGTM() {
  (function(w,d,s,l,i){
    w[l]=w[l]||[];
    w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-KQS29VV6');
}

// Load GTM when browser is idle (reduces main-thread blocking)
if ('requestIdleCallback' in window) {
  // Use requestIdleCallback for optimal performance
  requestIdleCallback(function() {
    loadGTM();
  }, { timeout: 3000 }); // Load within 3s even if not idle
} else {
  // Fallback for browsers without requestIdleCallback (Safari)
  // Wait 2 seconds to let critical content load first
  setTimeout(function() {
    loadGTM();
  }, 2000);
}
