/**
 * Google Form Iframe Handler
 *
 * This script handles Google Form iframe height adjustment after submission.
 * When the user submits the form, the iframe is resized to show the confirmation message.
 */

let formLoadCounter = 0;

// Attach event listener to iframe after DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
  const iframe = document.getElementById('google-form-iframe');

  if (iframe) {
    console.log('✅ Iframe found, attaching load listener...');

    iframe.addEventListener('load', function() {
      formLoadCounter += 1;
      console.log('🔄 Form iframe loaded - Count:', formLoadCounter);

      // On second load, the form has been submitted and shows confirmation page
      if (formLoadCounter === 2) {
        console.log('✅ Form submitted! Resizing iframe...');

        // Smoothly transition to smaller height for confirmation message
        iframe.style.height = '300px';
        console.log('📏 Iframe height changed to 300px');

        // Scroll to show the confirmation message
        setTimeout(() => {
          iframe.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
          console.log('📜 Scrolled to confirmation message');
        }, 300);
      }
    });
  } else {
    console.error('❌ Iframe not found!');
  }
});
