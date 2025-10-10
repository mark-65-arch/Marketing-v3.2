/**
 * Google Tag Manager Initialization with Consent Mode v2
 *
 * This script initializes GTM with privacy-first consent defaults.
 * All tracking consent is denied by default until the user explicitly accepts
 * via the cookie consent banner.
 *
 * GTM Container ID: GTM-KQS29VV6
 * Consent Mode: v2 (GDPR, CCPA, TDPSA compliant)
 */

// Initialize dataLayer and gtag function
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

// Load GTM container
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KQS29VV6');
