/* ===================================
   WEBSITE TEMPLATE - JavaScript Utilities
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initHeroVideo();
    initHeroAiProposal();
    initStickyCtaBar();
    initSmoothScroll();
    initScrollEffects();
    initForms();
    initChatbot();
    initExternalLinks();
    initGlowTrack();
    initReviewsCarousel();
});

/* ===================================
   HERO AI PROPOSAL BAR (home)
   =================================== */
function initHeroAiProposal() {
    const form = document.getElementById('heroAiProposalForm');
    const input = document.getElementById('heroAiProposalInput');
    const bar = form ? form.querySelector('.hero-ai-proposal-bar') : null;

    if (!form || !input || !bar) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) {
            bar.classList.remove('hero-ai-proposal-bar--pulse');
            void bar.offsetWidth;
            bar.classList.add('hero-ai-proposal-bar--pulse');
            input.focus();
            return;
        }
        if (typeof window.__openEstimateWidget === 'function') {
            window.__openEstimateWidget(text);
            input.value = '';
        }
    });
}

/* ===================================
   ESTIMATE CHAT WIDGET
   =================================== */
function initChatbot() {
    var WIDGET_BASE = 'https://estimate.denverinteriordoors.com/widget/default?key=dd_wk_693ab533aea8893091e313544214852dcf7393af8f1e4567&mode=inline';
    var WIDGET_ORIGIN = 'https://estimate.denverinteriordoors.com';

    var hero = document.querySelector('.hero');
    var widget = document.getElementById('dd-widget');
    var iframe = document.getElementById('chatbotIframe');
    var closeBtn = document.getElementById('widgetCloseBtn');
    var input = document.getElementById('heroAiProposalInput');

    if (!widget || !iframe) return;

    var loaded = false;
    var pendingMessage = '';

    function createWidgetSessionId() {
        return 'dd-site-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
    }

    function buildWidgetSrc() {
        var url = new URL(WIDGET_BASE);
        url.searchParams.set('clientSession', createWidgetSessionId());
        url.searchParams.set('fresh', '1');
        return url.toString();
    }

    function configureIframe() {
        if (!iframe) return;
    }

    configureIframe();

    function setOpenState(isOpen) {
        widget.classList.toggle('active', isOpen);
        widget.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        if (hero) {
            hero.classList.toggle('hero-chat-open', isOpen);
        }
        if (closeBtn) {
            if (isOpen) {
                closeBtn.removeAttribute('hidden');
            } else {
                closeBtn.setAttribute('hidden', '');
            }
        }
    }

    function sendMessageToWidget(text) {
        if (!text || !iframe || !iframe.contentWindow) return;
        iframe.contentWindow.postMessage({
            type: 'dd-widget-message',
            text: text
        }, WIDGET_ORIGIN);
    }

    function openChat(brief) {
        setOpenState(true);

        if (!loaded) {
            pendingMessage = brief || '';
            configureIframe();
            iframe.src = buildWidgetSrc();
            loaded = true;
            return;
        }

        if (brief) {
            sendMessageToWidget(brief);
        }
    }

    function closeChat() {
        setOpenState(false);
        window.setTimeout(function () {
            if (input) input.focus();
        }, 180);
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }

    // Listen for close signal from iframe
    window.addEventListener('message', function (e) {
        if (e.origin !== WIDGET_ORIGIN) return;
        if (e.data === 'dd:close') {
            closeChat();
            return;
        }
        if (e.data && e.data.type === 'dd-widget-ready' && pendingMessage) {
            sendMessageToWidget(pendingMessage);
            pendingMessage = '';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && widget.classList.contains('active')) {
            closeChat();
        }
    });

    // Expose so hero form can call it
    window.__openEstimateWidget = openChat;
}

/* ===================================
   HERO VIDEO CAROUSEL
   =================================== */
function initHeroVideo() {
    const videos = document.querySelectorAll('.hero-video');
    if (!videos.length) return;

    const overlapTime = 1.5;

    const firstVideo = videos[0];
    firstVideo.play().catch(error => {
        console.log("Video autoplay prevented:", error);
    });

    videos.forEach((video, index) => {
        video.addEventListener('timeupdate', () => {
            const timeRemaining = video.duration - video.currentTime;

            if (timeRemaining < overlapTime && !video.dataset.transitioning && !video.paused) {
                video.dataset.transitioning = "true";

                const nextIndex = (index + 1) % videos.length;
                const nextVideo = videos[nextIndex];

                nextVideo.currentTime = 0;
                nextVideo.classList.add('active');
                nextVideo.play().catch(e => console.log("Next video play prevented:", e));

                video.classList.remove('active');

                setTimeout(() => {
                    video.pause();
                    video.currentTime = 0;
                    delete video.dataset.transitioning;
                }, overlapTime * 1000);
            }
        });

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
   STICKY CTA BAR
   =================================== */
function initStickyCtaBar() {
    const bar = document.getElementById('stickyCtaBar');
    if (!bar) return;

    const threshold = 400;
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;

        if (scrollY > threshold) {
            bar.classList.add('visible');
        } else {
            bar.classList.remove('visible');
        }
        lastScroll = scrollY;
    }, { passive: true });
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

    const animatedElements = document.querySelectorAll(
        '.service-card, .visual-card, .stat, .contact-card, .gallery-item, .section-header'
    );

    const siblingIndex = new Map();
    animatedElements.forEach((el) => {
        const parent = el.parentElement;
        const count = siblingIndex.get(parent) || 0;
        const delay = Math.min(count * 80, 400);
        siblingIndex.set(parent, count + 1);

        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
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
            const action = this.getAttribute('action') || '';
            if (action.includes('formspree.io') && !action.includes('YOUR_FORM_ID')) {
                submitToFormspree(this, 'Thank you! Your message has been sent.');
            } else {
                handleFormSubmit(this, 'Thank you! Your message has been sent.');
            }
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
                const firstInput = heroShortForm.querySelector('#heroName');
                if (firstInput) firstInput.focus();
            }, 300);
        });
    }

    if (heroShortForm) {
        heroShortForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const action = this.getAttribute('action') || '';
            if (action.includes('formspree.io') && !action.includes('YOUR_FORM_ID')) {
                submitToFormspree(this, 'Quote request received! We will call you shortly.');
            } else {
                handleFormSubmit(this, 'Quote request received! We will call you shortly.');
            }
        });
    }
}

function submitToFormspree(form, successMessage) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
        .then(response => {
            if (response.ok) {
                showNotification(successMessage, 'success');
                form.reset();
            } else {
                showNotification('Something went wrong. Please call us at (720) 744-2553.', 'error');
            }
        })
        .catch(() => {
            showNotification('Something went wrong. Please call us at (720) 744-2553.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
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
   UTILITY FUNCTIONS
   =================================== */

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

/* ===================================
   EXTERNAL LINK PROTECTION
   =================================== */
function initExternalLinks() {
    let recentlyOpened = false;
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (recentlyOpened) return;
            recentlyOpened = true;
            window.open(this.href, '_blank', 'noopener,noreferrer');
            setTimeout(() => { recentlyOpened = false; }, 1000);
        });
    });
}

/* ===================================
   MOUSE-TRACKING GLOW
   =================================== */
function initGlowTrack() {
    const selectors = '.btn, .btn-hero-cta, .btn-cta-outline, .service-card';
    const elements = document.querySelectorAll(selectors);

    elements.forEach(el => {
        const glow = document.createElement('div');
        glow.className = 'glow-track';
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(glow);

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.opacity = '1';
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
        });

        el.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    });
}

/* ===================================
   REVIEWS CAROUSEL
   =================================== */
function initReviewsCarousel() {
    const carousel = document.getElementById('reviewsCarousel');
    const track = document.getElementById('carouselTrack');
    if (!carousel || !track) return;

    const gap = 24;
    const speed = 50;
    const originalCards = Array.from(track.querySelectorAll('.review-card'));

    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    let totalOriginalWidth = 0;
    let offset = 0;
    let isDragging = false;
    let startX = 0;
    let dragStartOffset = 0;
    let rafId = null;
    let lastTime = 0;
    let paused = false;

    function measure() {
        const cardWidth = track.querySelector('.review-card').offsetWidth;
        totalOriginalWidth = originalCards.length * (cardWidth + gap);
    }

    function wrapOffset() {
        if (totalOriginalWidth > 0) {
            offset = ((offset % totalOriginalWidth) + totalOriginalWidth) % totalOriginalWidth;
        }
    }

    function render() {
        track.style.transform = `translateX(${-offset}px)`;
    }

    function tick(timestamp) {
        if (!paused && !isDragging) {
            if (lastTime) {
                const delta = (timestamp - lastTime) / 1000;
                offset += speed * delta;
                wrapOffset();
                render();
            }
            lastTime = timestamp;
        } else {
            lastTime = 0;
        }
        rafId = requestAnimationFrame(tick);
    }

    function getPointerX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    function onDragStart(e) {
        isDragging = true;
        startX = getPointerX(e);
        dragStartOffset = offset;
        carousel.classList.add('dragging');
    }

    function onDragMove(e) {
        if (!isDragging) return;
        const diff = startX - getPointerX(e);
        offset = dragStartOffset + diff;
        wrapOffset();
        render();
    }

    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('dragging');
    }

    carousel.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    carousel.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('touchend', onDragEnd);

    track.addEventListener('dragstart', e => e.preventDefault());
    track.addEventListener('click', e => {
        if (Math.abs(offset - dragStartOffset) > 5) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { if (!isDragging) paused = false; });

    document.addEventListener('visibilitychange', () => {
        paused = document.hidden;
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { measure(); wrapOffset(); render(); }, 200);
    });

    measure();
    render();
    rafId = requestAnimationFrame(tick);
}

// Console branding (customize as needed)
console.log('%c🚀 Denver Interior & Doors', 'font-size: 24px; font-weight: bold; color: #1A1714;');
console.log('%cCrafted with care.', 'font-size: 14px; color: #B07D3A;');
