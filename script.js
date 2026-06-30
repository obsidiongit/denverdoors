/* ===================================
   WEBSITE TEMPLATE - JavaScript Utilities
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initHeroVideo();
    initLazyBackgrounds();
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
var DD_WIDGET_BASE = 'https://estimate.denverinteriordoors.com/widget/default?key=dd_wk_693ab533aea8893091e313544214852dcf7393af8f1e4567&mode=inline';
var DD_WIDGET_ORIGIN = 'https://estimate.denverinteriordoors.com';

function createWidgetSessionId() {
    return 'dd-site-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);
}

function buildWidgetSrc() {
    var url = new URL(DD_WIDGET_BASE);
    url.searchParams.set('clientSession', createWidgetSessionId());
    url.searchParams.set('fresh', '1');
    return url.toString();
}

function createEstimateWidgetController(options) {
    var widget = options.widget;
    var iframe = options.iframe;
    var closeBtn = options.closeBtn;
    var toggleBtn = options.toggleBtn;
    var onOpen = options.onOpen || function () {};
    var onClose = options.onClose || function () {};
    var loaded = false;
    var pendingMessage = '';

    function sendMessageToWidget(text) {
        if (!text || !iframe || !iframe.contentWindow) return;
        iframe.contentWindow.postMessage({
            type: 'dd-widget-message',
            text: text
        }, DD_WIDGET_ORIGIN);
    }

    function setOpenState(isOpen) {
        widget.classList.toggle('active', isOpen);
        widget.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        if (toggleBtn) {
            toggleBtn.classList.toggle('hidden', isOpen);
            toggleBtn.classList.toggle('is-open', isOpen);
        }
        if (isOpen) {
            onOpen();
        } else {
            onClose();
        }
    }

    function openChat(brief) {
        setOpenState(true);

        if (!loaded) {
            pendingMessage = brief || '';
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
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            if (widget.classList.contains('active')) {
                closeChat();
            } else {
                openChat();
            }
        });
    }

    window.addEventListener('message', function (e) {
        if (e.origin !== DD_WIDGET_ORIGIN) return;
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

    return {
        openChat: openChat,
        closeChat: closeChat
    };
}

function initHeroChatbot() {
    var hero = document.querySelector('.hero');
    var widget = document.getElementById('dd-widget');
    var iframe = document.getElementById('chatbotIframe');
    var closeBtn = document.getElementById('widgetCloseBtn');
    var input = document.getElementById('heroAiProposalInput');

    if (!widget || !iframe) return null;

    var controller = createEstimateWidgetController({
        widget: widget,
        iframe: iframe,
        closeBtn: closeBtn,
        onOpen: function () {
            if (hero) hero.classList.add('hero-chat-open');
            if (closeBtn) closeBtn.removeAttribute('hidden');
        },
        onClose: function () {
            if (hero) hero.classList.remove('hero-chat-open');
            if (closeBtn) closeBtn.setAttribute('hidden', '');
            window.setTimeout(function () {
                if (input) input.focus();
            }, 180);
        }
    });

    return controller.openChat;
}

function ensureFloatingChatbotMarkup() {
    var widget = document.getElementById('chatbotWidget');
    var toggle = document.getElementById('chatbotToggle');

    if (!widget) {
        widget = document.createElement('div');
        widget.className = 'chatbot-widget';
        widget.id = 'chatbotWidget';
        widget.setAttribute('aria-hidden', 'true');
        widget.innerHTML =
            '<div class="chatbot-header">' +
                '<div class="chatbot-header-info">' +
                    '<div class="chatbot-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1v-5a7 7 0 0 1 7-7h1V3.73C9 3.39 8.6 2.74 8.6 2a2 2 0 0 1 2-2z"></path></svg></div>' +
                    '<div class="chatbot-header-text"><span class="chatbot-title">Craftsman AI</span><span class="chatbot-status">Online</span></div>' +
                '</div>' +
                '<button class="chatbot-close" id="chatbotClose" aria-label="Close Chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>' +
            '</div>' +
            '<div class="chatbot-body"></div>';
        document.body.appendChild(widget);
    }

    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'chatbot-toggle';
        toggle.id = 'chatbotToggle';
        toggle.setAttribute('aria-label', 'Open Chat');
        toggle.innerHTML =
            '<div class="chatbot-toggle-icon">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-open"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-close"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
            '</div>' +
            '<span class="chatbot-toggle-label">Chat with us</span>';
        document.body.appendChild(toggle);
    }

    var body = widget.querySelector('.chatbot-body');
    var footer = widget.querySelector('.chatbot-footer');
    var iframe = document.getElementById('floatingChatbotIframe');

    if (footer) footer.remove();
    if (body) body.innerHTML = '';

    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'floatingChatbotIframe';
        iframe.title = 'Denver Interior & Doors — Free Estimate';
        iframe.setAttribute('allow', 'clipboard-write');
        if (body) body.appendChild(iframe);
    }

    widget.setAttribute('aria-hidden', 'true');

    return {
        widget: widget,
        iframe: iframe,
        closeBtn: document.getElementById('chatbotClose'),
        toggleBtn: toggle
    };
}

function initFloatingChatbot() {
    if (document.getElementById('dd-widget')) return null;

    var elements = ensureFloatingChatbotMarkup();
    var controller = createEstimateWidgetController(elements);
    return controller.openChat;
}

function initChatbot() {
    var openChat = initHeroChatbot() || initFloatingChatbot();
    if (openChat) {
        window.__openEstimateWidget = openChat;
    }
}

/* ===================================
   HERO VIDEO CAROUSEL
   =================================== */
function loadHeroVideoSource(video) {
    if (video.dataset.loaded === 'true') {
        return Promise.resolve();
    }

    var src = video.getAttribute('data-src');
    if (!src) {
        return Promise.resolve();
    }

    var source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.dataset.loaded = 'true';
    video.load();

    return new Promise(function (resolve) {
        if (video.readyState >= 2) {
            resolve();
            return;
        }

        video.addEventListener('loadeddata', resolve, { once: true });
    });
}

function initHeroVideo() {
    var videos = Array.prototype.slice.call(document.querySelectorAll('.hero-video'));
    if (!videos.length) {
        return;
    }

    var overlapTime = 1.5;
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var saveData = navigator.connection && navigator.connection.saveData;

    if (reduceMotion || saveData) {
        videos.slice(1).forEach(function (video) {
            video.remove();
        });
        return;
    }

    if (isMobile) {
        videos.slice(1).forEach(function (video) {
            video.remove();
        });
        videos[0].loop = true;
        videos[0].play().catch(function () {});
        return;
    }

    videos[0].play().catch(function () {});

    videos.forEach(function (video, index) {
        video.addEventListener('timeupdate', function () {
            if (!video.duration || video.paused) {
                return;
            }

            var timeRemaining = video.duration - video.currentTime;

            if (timeRemaining < overlapTime && !video.dataset.transitioning) {
                video.dataset.transitioning = 'true';

                var nextIndex = (index + 1) % videos.length;
                var nextVideo = videos[nextIndex];

                loadHeroVideoSource(nextVideo).then(function () {
                    nextVideo.currentTime = 0;
                    nextVideo.classList.add('active');
                    nextVideo.play().catch(function () {});

                    video.classList.remove('active');

                    window.setTimeout(function () {
                        video.pause();
                        video.currentTime = 0;
                        delete video.dataset.transitioning;
                    }, overlapTime * 1000);
                });
            }
        });

        video.addEventListener('ended', function () {
            if (video.dataset.transitioning) {
                return;
            }

            var nextIndex = (index + 1) % videos.length;
            var nextVideo = videos[nextIndex];

            loadHeroVideoSource(nextVideo).then(function () {
                video.classList.remove('active');
                nextVideo.classList.add('active');
                nextVideo.play().catch(function () {});
            });
        });
    });
}

/* ===================================
   LAZY BACKGROUND IMAGES
   =================================== */
function initLazyBackgrounds() {
    var elements = document.querySelectorAll('[data-bg]');
    if (!elements.length) {
        return;
    }

    function applyBackground(element) {
        var webp = element.getAttribute('data-bg-webp');
        var fallback = element.getAttribute('data-bg');

        if (webp) {
            element.style.backgroundImage =
                "image-set(url('" + webp + "') type('image/webp'), url('" + fallback + "') type('image/jpeg'))";
        } else {
            element.style.backgroundImage = "url('" + fallback + "')";
        }

        element.classList.add('lazy-bg-loaded');
    }

    if (!('IntersectionObserver' in window)) {
        elements.forEach(applyBackground);
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            applyBackground(entry.target);
            observer.unobserve(entry.target);
        });
    }, { rootMargin: '240px 0px' });

    elements.forEach(function (element) {
        observer.observe(element);
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
                showNotification('Something went wrong. Please call us at (720) 807-0766.', 'error');
            }
        })
        .catch(() => {
            showNotification('Something went wrong. Please call us at (720) 807-0766.', 'error');
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
