/**
 * GTM Verification Test Script
 *
 * Usage:
 * 1. Open your website in browser
 * 2. Open DevTools (F12) → Console tab
 * 3. Copy and paste this entire script
 * 4. Press Enter
 * 5. Review the results
 */

(function() {
  console.log('🔍 Starting GTM Verification Test...\n');

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0
  };

  // Test 1: Check if GTM script is loaded
  console.log('Test 1: GTM Container Loading');
  if (typeof window.dataLayer !== 'undefined') {
    console.log('✅ PASS: window.dataLayer exists');
    console.log('   dataLayer:', window.dataLayer);
    results.passed++;
  } else {
    console.log('❌ FAIL: window.dataLayer is undefined');
    console.log('   GTM script not loaded or blocked');
    results.failed++;
  }
  console.log('');

  // Test 2: Check if gtag function exists
  console.log('Test 2: GTM gtag Function');
  if (typeof window.gtag === 'function') {
    console.log('✅ PASS: window.gtag function exists');
    results.passed++;
  } else {
    console.log('⚠️  WARNING: window.gtag is not a function');
    console.log('   This is normal if GA4 tag hasn\'t loaded yet');
    results.warnings++;
  }
  console.log('');

  // Test 3: Check dataLayer contents
  console.log('Test 3: dataLayer Contents');
  if (window.dataLayer && window.dataLayer.length > 0) {
    console.log('✅ PASS: dataLayer has entries');
    console.log('   Entries:', window.dataLayer.length);

    // Check for GTM container
    const gtmEntry = window.dataLayer.find(item => item['gtm.start']);
    if (gtmEntry) {
      console.log('✅ PASS: GTM container initialized');
      console.log('   GTM Start:', new Date(gtmEntry['gtm.start']));
      results.passed++;
    } else {
      console.log('❌ FAIL: GTM container not found in dataLayer');
      results.failed++;
    }
  } else {
    console.log('❌ FAIL: dataLayer is empty');
    results.failed++;
  }
  console.log('');

  // Test 4: Check for consent configuration
  console.log('Test 4: Consent Mode Configuration');
  if (window.dataLayer) {
    const consentEntry = window.dataLayer.find(item =>
      item[0] === 'consent' && item[1] === 'default'
    );
    if (consentEntry) {
      console.log('✅ PASS: Consent Mode v2 configured');
      console.log('   Consent settings:', consentEntry[2]);
      results.passed++;
    } else {
      console.log('⚠️  WARNING: Consent Mode entry not found');
      console.log('   Check if consent was initialized before GTM');
      results.warnings++;
    }
  }
  console.log('');

  // Test 5: Check for GTM script in DOM
  console.log('Test 5: GTM Script Tags in DOM');
  const gtmScripts = document.querySelectorAll('script[src*="gtm"]');
  if (gtmScripts.length > 0) {
    console.log('✅ PASS: Found GTM script tags');
    gtmScripts.forEach((script, i) => {
      console.log(`   Script ${i + 1}:`, script.src);
    });
    results.passed++;
  } else {
    console.log('❌ FAIL: No GTM script tags found in DOM');
    results.failed++;
  }
  console.log('');

  // Test 6: Check for GTM noscript iframe
  console.log('Test 6: GTM NoScript Fallback');
  const gtmIframe = document.querySelector('iframe[src*="gtm"]');
  if (gtmIframe) {
    console.log('✅ PASS: GTM noscript iframe present');
    console.log('   Iframe src:', gtmIframe.src);
    results.passed++;
  } else {
    console.log('⚠️  WARNING: GTM noscript iframe not found');
    console.log('   This is okay if JavaScript is enabled');
    results.warnings++;
  }
  console.log('');

  // Test 7: Check external GTM initialization script
  console.log('Test 7: External GTM Script File');
  fetch('/js/gtm-init.js')
    .then(response => {
      if (response.ok) {
        console.log('✅ PASS: /js/gtm-init.js loads successfully');
        console.log('   Status:', response.status);
        results.passed++;
      } else {
        console.log('❌ FAIL: /js/gtm-init.js failed to load');
        console.log('   Status:', response.status);
        results.failed++;
      }
      printSummary();
    })
    .catch(error => {
      console.log('❌ FAIL: Error loading /js/gtm-init.js');
      console.log('   Error:', error.message);
      results.failed++;
      printSummary();
    });

  // Test 8: Check for CSP violations
  console.log('Test 8: Content Security Policy');
  console.log('⏳ Check Console for CSP violation warnings above');
  console.log('   If you see "Refused to load..." → CSP blocking');
  console.log('   If no CSP warnings → Configuration is correct');
  console.log('');

  function printSummary() {
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('📊 TEST SUMMARY');
    console.log('═══════════════════════════════════════════');
    console.log(`✅ Passed:   ${results.passed}`);
    console.log(`❌ Failed:   ${results.failed}`);
    console.log(`⚠️  Warnings: ${results.warnings}`);
    console.log('');

    if (results.failed === 0) {
      console.log('🎉 All tests passed! GTM is configured correctly.');
    } else if (results.failed <= 2) {
      console.log('⚠️  Some tests failed. Review the failures above.');
    } else {
      console.log('❌ Multiple failures detected. GTM may not be working.');
    }
    console.log('');
    console.log('Next Steps:');
    console.log('1. Check Network tab for GTM requests');
    console.log('2. Use GTM Preview Mode for detailed debugging');
    console.log('3. Verify GA4 Measurement ID in GTM dashboard');
    console.log('4. See GTM_VERIFICATION_CHECKLIST.md for full guide');
    console.log('═══════════════════════════════════════════');
  }

  // If script fetch is blocked, still show summary
  setTimeout(() => {
    if (results.passed + results.failed + results.warnings < 8) {
      printSummary();
    }
  }, 2000);

})();

/**
 * Additional Debugging Commands
 *
 * After running the test above, try these commands:
 */

// 1. View all dataLayer entries
// window.dataLayer

// 2. Check GTM container ID
// window.dataLayer.find(item => item['gtm.start'])

// 3. Manually trigger consent update (after accepting cookies)
// gtag('consent', 'update', { analytics_storage: 'granted' })

// 4. Check if GA4 is loaded
// window.google_tag_manager

// 5. View all GTM events
// window.dataLayer.filter(item => item.event)

// 6. Monitor new dataLayer pushes
// const originalPush = window.dataLayer.push;
// window.dataLayer.push = function() {
//   console.log('📤 dataLayer push:', arguments);
//   return originalPush.apply(this, arguments);
// }
