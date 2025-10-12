// 🧭 Global Navigation Scripts
// Purpose: Mobile menu, dropdown, and sticky CTA functionality
// CSP-compliant external JavaScript module

// Mobile Menu Functionality
(function() {
  // Only run once
  if (window.globalNavInitialized) return;
  window.globalNavInitialized = true;

  function initMobileMenu() {
    const mobileMenuButton = document.getElementById('global-nav-mobile-menu-button');
    const mobileMenu = document.getElementById('global-nav-mobile-menu');

    if (!mobileMenuButton || !mobileMenu) return;

    // Toggle menu function
    function toggleMenu() {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      // Update button state
      mobileMenuButton.setAttribute('aria-expanded', String(newState));

      // Update menu visibility
      mobileMenu.setAttribute('aria-hidden', String(!newState));

      if (newState) {
        mobileMenu.classList.add('active');
        mobileMenu.classList.remove('hidden');
      } else {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
      }

      // Update tabindex for menu items
      const menuLinks = mobileMenu.querySelectorAll('a');
      menuLinks.forEach(function(link) {
        link.tabIndex = newState ? 0 : -1;
      });

      // Update icon
      const icon = mobileMenuButton.querySelector('svg');
      if (icon) {
        if (newState) {
          icon.outerHTML = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 384 512" aria-hidden="true"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
        } else {
          icon.outerHTML = '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>';
        }
      }

      // Focus first menu item when opened
      if (newState) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
          setTimeout(function() {
            focusableElements[0].focus();
          }, 100);
        }
      }
    }

    // Button click handler
    mobileMenuButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      const isClickInsideMenu = mobileMenu.contains(e.target);
      const isClickOnButton = mobileMenuButton.contains(e.target);

      if (!isClickInsideMenu && !isClickOnButton && mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      const isMenuOpen = mobileMenu.classList.contains('active');

      if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
        mobileMenuButton.focus();
      }
    });

    // Close menu when window is resized to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();

// Desktop Dropdown Functionality
(function() {
  if (window.dropdownsInitialized) return;
  window.dropdownsInitialized = true;

  function initDropdowns() {
    // 📋 Desktop Dropdown Functionality
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(function(dropdown) {
      const button = dropdown.querySelector('button');
      const menu = dropdown.querySelector('.dropdown-menu');

      if (button && menu) {
        // Click to toggle dropdown (for touch devices)
        button.addEventListener('click', function(e) {
          e.preventDefault();

          // Close other dropdowns
          dropdowns.forEach(function(otherDropdown) {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove('active');
            }
          });

          // Toggle current dropdown
          dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
          }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            dropdown.classList.remove('active');
          }
        });

        // Handle keyboard navigation
        button.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropdown.classList.toggle('active');
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            dropdown.classList.add('active');
            const firstLink = menu.querySelector('a');
            if (firstLink) firstLink.focus();
          }
        });

        // Focus management within dropdown
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(function(link, index) {
          link.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              const nextLink = menuLinks[index + 1] || menuLinks[0];
              nextLink.focus();
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              const prevLink = menuLinks[index - 1] || menuLinks[menuLinks.length - 1];
              prevLink.focus();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              dropdown.classList.remove('active');
              button.focus();
            }
          });
        });
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdowns);
  } else {
    initDropdowns();
  }
})();

// Sticky Mobile CTA Functionality
(function() {
  if (window.stickyCtaInitialized) return;
  window.stickyCtaInitialized = true;

  function initStickyCta() {
    // 📱 Sticky Mobile CTA - Show on scroll down
    const stickyMobileCta = document.getElementById('global-nav-sticky-mobile-cta');
    if (stickyMobileCta) {
      let lastScrollTop = 0;
      let scrollTimeout;

      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(function() {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

          // Show sticky CTA when scrolled down more than 300px and not at bottom
          if (scrollTop > 300 && scrollTop > lastScrollTop) {
            stickyMobileCta.style.transform = 'translateY(0)';
          } else {
            stickyMobileCta.style.transform = 'translateY(100%)';
          }

          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, 100);
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickyCta);
  } else {
    initStickyCta();
  }
})();
