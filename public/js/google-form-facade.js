/**
 * Google Form Facade - Lazy Loading Handler
 *
 * Performance Strategy:
 * 1. User sees facade immediately (no blocking)
 * 2. User clicks "Load Form" button
 * 3. Script creates iframe and injects it
 * 4. Google Form loads ONLY when needed
 *
 * This prevents the massive 2.4MB Google payload from blocking
 * the critical rendering path and hero LCP.
 */

(function() {
  'use strict';

  let formLoaded = false;

  function loadGoogleForm() {
    if (formLoaded) return;

    const container = document.getElementById('google-form-container');
    if (!container) {
      console.error('❌ Google form container not found');
      return;
    }

    // Get form configuration from data attributes
    const formUrl = container.dataset.formUrl;
    const formHeight = container.dataset.formHeight || '2349';
    const formTitle = container.dataset.formTitle || 'Contact Form';

    if (!formUrl) {
      console.error('❌ Form URL not provided');
      return;
    }

    const facade = document.getElementById('form-facade');
    const loadingIndicator = document.getElementById('form-loading');
    const iframeContainer = document.getElementById('form-iframe-container');

    // Show loading indicator
    if (facade) facade.classList.add('hidden');
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');

    // Create iframe element
    const iframe = document.createElement('iframe');
    iframe.id = 'google-form-iframe';
    iframe.src = formUrl;
    iframe.width = '100%';
    iframe.height = formHeight;
    iframe.style.border = '0';
    iframe.title = formTitle;
    iframe.className = 'w-full rounded-lg';

    // Handle iframe load
    iframe.addEventListener('load', function() {
      // Hide loading, show iframe
      if (loadingIndicator) loadingIndicator.classList.add('hidden');
      if (iframeContainer) iframeContainer.classList.remove('hidden');

      console.log('✅ Google Form loaded successfully (lazy)');
    });

    // Inject iframe into container
    if (iframeContainer) {
      iframeContainer.appendChild(iframe);
      formLoaded = true;
      console.log('📋 Google Form iframe created and loading...');
    }
  }

  // Attach click event to button when DOM is ready
  function init() {
    console.log('🔍 Google Form Facade script is running!');
    console.log('🔍 Document ready state:', document.readyState);

    const loadButton = document.getElementById('load-form-btn');
    console.log('🔍 Load button found:', !!loadButton);

    if (loadButton) {
      loadButton.addEventListener('click', loadGoogleForm);
      console.log('✅ Google Form facade initialized (click-to-load)');
    } else {
      console.error('❌ Load form button NOT FOUND!');
      console.log('🔍 Available IDs on page:', Array.from(document.querySelectorAll('[id]')).map(el => el.id).slice(0, 20));
    }
  }

  // Initialize when DOM is ready
  console.log('📋 Google Form Facade script loaded');
  if (document.readyState === 'loading') {
    console.log('⏳ Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', init);
  } else {
    console.log('✅ DOM already loaded, initializing immediately');
    init();
  }
})();
