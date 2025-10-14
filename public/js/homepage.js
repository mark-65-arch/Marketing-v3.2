// Homepage-specific JavaScript functionality
// CSP-compliant external script

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Desktop Dropdown Functionality
const dropdowns = document.querySelectorAll('.nav-dropdown');

dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('button');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (button && menu) {
        // Click to toggle dropdown (for touch devices)
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });

        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
            }
        });

        // Handle keyboard navigation
        button.addEventListener('keydown', (e) => {
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
        menuLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
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

// Accordion functionality for FAQ
function setupAccordion() {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    if (accordionTriggers.length === 0) {
        return;
    }

    accordionTriggers.forEach(function(trigger) {
        // Use both click and touchstart for mobile
        const handleClick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            const accordionItem = trigger.parentElement;
            const chevron = trigger.querySelector('i');

            // Toggle accordion content
            accordionItem.classList.toggle('accordion-open');

            // Rotate chevron icon
            if (chevron) {
                if (accordionItem.classList.contains('accordion-open')) {
                    chevron.style.transform = 'rotate(180deg)';
                } else {
                    chevron.style.transform = 'rotate(0)';
                }
            }
        };

        trigger.addEventListener('click', handleClick);
        trigger.addEventListener('touchstart', handleClick, { passive: false });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAccordion);
} else {
    setupAccordion();
}
