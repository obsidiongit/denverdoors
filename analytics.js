window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }

window.addEventListener('load', function () {
    var script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-EN085Q6YPQ';
    script.async = true;
    script.onload = function () {
        gtag('js', new Date());
        gtag('config', 'G-EN085Q6YPQ');
    };
    document.head.appendChild(script);
}, { once: true });
