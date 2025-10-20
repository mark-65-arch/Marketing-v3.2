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

/**
 * Performance Optimization: Load GTM ONLY after LCP element has painted
 *
 * Strategy:
 * 1. Wait for 'load' event (all critical resources loaded)
 * 2. Then use requestIdleCallback to defer GTM until browser is truly idle
 * 3. This prevents GTM from interfering with hero LCP rendering
 *
 * Expected Impact:
 * - GTM loads 2-5 seconds later than before
 * - Hero LCP paints without blocking from Google Tag Manager
 * - Analytics still captured, just slightly delayed
 */

// Load GTM ONLY after page load is complete (including LCP)
window.addEventListener('load', function() {
  // Additional delay to ensure LCP element has fully painted
  if ('requestIdleCallback' in window) {
    // Use requestIdleCallback for optimal performance
    // Increased timeout to 5s to prioritize LCP over analytics
    requestIdleCallback(function() {
      loadGTM();
      console.log('📊 GTM loaded after LCP (idle callback)');
    }, { timeout: 5000 });
  } else {
    // Fallback for browsers without requestIdleCallback (Safari)
    // Wait 3 seconds after load to ensure LCP is complete
    setTimeout(function() {
      loadGTM();
      console.log('📊 GTM loaded after LCP (timeout fallback)');
    }, 3000);
  }
});
