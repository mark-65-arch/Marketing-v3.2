// 🔙 Footer Scripts: Back to Top & Newsletter
// CSP-compliant external JavaScript

// Back to Top Functionality
document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('back-to-top');

  if (backToTopButton) {
    // Show/hide button based on scroll position
    const toggleButton = () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        backToTopButton.classList.add('opacity-100');
      } else {
        backToTopButton.classList.add('opacity-0', 'pointer-events-none');
        backToTopButton.classList.remove('opacity-100');
      }
    };

    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    // Event listeners
    window.addEventListener('scroll', toggleButton);
    backToTopButton.addEventListener('click', scrollToTop);

    // Keyboard accessibility
    backToTopButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });
  }
});

// Newsletter form handling (if present)
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('form[aria-label="Newsletter signup"]');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(newsletterForm);
      const email = formData.get('email');

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      try {
        // Future: Integrate with newsletter service (Mailchimp, ConvertKit, etc.)
        console.log('Newsletter signup:', email);

        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button?.textContent;
        if (button) {
          button.textContent = 'Subscribed!';
          button.classList.add('bg-green-600');
          setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-600');
          }, 3000);
        }

        // Reset form
        newsletterForm.reset();

      } catch (error) {
        console.error('Newsletter signup error:', error);
        alert('There was an error subscribing. Please try again.');
      }
    });
  }
});
