/* ===================================
   WEBSITE TEMPLATE - JavaScript Utilities
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initHeroVideo();
    initSmoothScroll();
    initScrollEffects();
    initForms();
    initReviewCarousel();
    initChatbot();
});

/* ===================================
   CHATBOT WIDGET
   =================================== */
function initChatbot() {
    const toggleBtn = document.getElementById('chatbotToggle');
    const closeBtn = document.getElementById('chatbotClose');
    const widget = document.getElementById('chatbotWidget');

    if (!toggleBtn || !widget) return;

    function toggleChat() {
        const isHidden = !widget.classList.contains('active');

        if (isHidden) {
            widget.classList.add('active');
            toggleBtn.classList.add('active');
        } else {
            widget.classList.remove('active');
            toggleBtn.classList.remove('active');
        }
    }

    toggleBtn.addEventListener('click', toggleChat);

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            widget.classList.remove('active');
            toggleBtn.classList.remove('active');
        });
    }

    // Optional: Auto-open after a delay (can be annoying, so maybe just a wiggle or notification)
    // setTimeout(() => {
    //    if (!widget.classList.contains('active')) {
    //        toggleBtn.classList.add('bounce'); // Would need keyframes
    //    }
    // }, 5000);
}

/* ===================================
   HERO VIDEO CAROUSEL
   =================================== */
function initHeroVideo() {
    const videos = document.querySelectorAll('.hero-video');
    if (!videos.length) return;

    const overlapTime = 1.5; // Seconds of overlap (matches CSS transition)

    // Play the first video
    const firstVideo = videos[0];
    firstVideo.play().catch(error => {
        console.log("Video autoplay prevented:", error);
    });

    videos.forEach((video, index) => {
        // Use timeupdate to trigger next video before current one ends
        video.addEventListener('timeupdate', () => {
            const timeRemaining = video.duration - video.currentTime;

            // Check if we're entering the overlap window and haven't triggered yet
            if (timeRemaining < overlapTime && !video.dataset.transitioning && !video.paused) {
                video.dataset.transitioning = "true";

                // Calculate next index
                const nextIndex = (index + 1) % videos.length;
                const nextVideo = videos[nextIndex];

                // Prepare and play next video
                nextVideo.currentTime = 0;
                nextVideo.classList.add('active');
                nextVideo.play().catch(e => console.log("Next video play prevented:", e));

                // Fade out current video
                video.classList.remove('active');

                // Cleanup after transition completes
                setTimeout(() => {
                    video.pause();
                    video.currentTime = 0;
                    delete video.dataset.transitioning;
                }, overlapTime * 1000);
            }
        });

        // Fallback catch-all in case timeupdate misses or logic drifts
        video.addEventListener('ended', () => {
            if (!video.dataset.transitioning) {
                const nextIndex = (index + 1) % videos.length;
                const nextVideo = videos[nextIndex];

                video.classList.remove('active');
                nextVideo.classList.add('active');
                nextVideo.play().catch(e => console.log("Next video play prevented:", e));
            }
        });
    });
}

/* ===================================
   NAVIGATION
   =================================== */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ===================================
   SMOOTH SCROLL
   =================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const topBarHeight = document.querySelector('.top-bar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===================================
   SCROLL EFFECTS
   =================================== */
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.service-card, .visual-card, .testimonial-card, .stat, .contact-item'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ===================================
   FORMS
   =================================== */
function initForms() {
    // Quote form
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmit(this, 'Quote request submitted! We\'ll be in touch soon.');
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmit(this, 'Thank you! Your message has been sent.');
        });
    }

    // Hero Quote Form Expansion
    const heroQuoteBtn = document.getElementById('heroQuoteBtn');
    const heroQuoteContainer = document.getElementById('heroQuoteFormContainer');
    const heroShortForm = document.getElementById('heroShortForm');

    if (heroQuoteBtn && heroQuoteContainer) {
        heroQuoteBtn.addEventListener('click', function () {
            // Hide button
            this.style.display = 'none';
            // Show form
            heroQuoteContainer.classList.add('expanded');
            // Focus first input
            setTimeout(() => {
                const firstInput = heroShortForm.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 300);
        });
    }

    if (heroShortForm) {
        heroShortForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmit(this, 'Quote request received! We will call you shortly.');

            // Optional: Collapse form after delay? 
            // For now, keep it open to show success clearly or maybe reset it.
        });
    }
}

function handleFormSubmit(form, successMessage) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification(successMessage, 'success');

        // Reset form
        form.reset();

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${type === 'success'
            ? '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
        }
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;

    // Add styles - uses CSS variable for primary color
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success, #3A7A52)' : 'var(--destructive, #DC2626)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 10px 40px rgba(26, 23, 20, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-content svg {
                width: 24px;
                height: 24px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ===================================
   REVIEW CAROUSEL
   =================================== */
function initReviewCarousel() {
    const prevBtn = document.getElementById('reviewPrev');
    const nextBtn = document.getElementById('reviewNext');
    const wrapper = document.querySelector('.review-card-wrapper');

    if (!prevBtn || !nextBtn || !wrapper) return;

    // For now, just add a subtle animation on button click
    // Expand this for multiple reviews as needed

    let currentIndex = 0;

    prevBtn.addEventListener('click', () => {
        wrapper.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            wrapper.style.transform = 'translateX(0)';
        }, 150);
    });

    nextBtn.addEventListener('click', () => {
        wrapper.style.transform = 'translateX(10px)';
        setTimeout(() => {
            wrapper.style.transform = 'translateX(0)';
        }, 150);
    });

    wrapper.style.transition = 'transform 0.15s ease';
}

/* ===================================
   UTILITY FUNCTIONS
   =================================== */

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Phone number formatting (US format)
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        e.target.value = value;
    });
});

// Console branding (customize as needed)
console.log('%c🚀 Denver Interior & Doors', 'font-size: 24px; font-weight: bold; color: #1A1714;');
console.log('%cCrafted with care.', 'font-size: 14px; color: #B07D3A;');
