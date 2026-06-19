// Cookie Consent Banner for Super Agent Party website
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('cookieConsent') === 'accepted') return;
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = '<div style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#050505;border-top:2px solid #FFD700;padding:16px 24px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px;font-family:\'JetBrains Mono\',monospace;"><p style="color:#ccc;font-size:12px;margin:0;max-width:600px;line-height:1.6;">We use only essential local storage for theme preferences. No tracking, no analytics, no third-party cookies. By continuing, you agree to our <a href="privacy-policy.html" style="color:#FFD700;text-decoration:underline;">Privacy Policy</a>.</p><button id="cookie-accept" style="background:#FFD700;color:#050505;border:2px solid #fff;padding:8px 24px;font-weight:bold;font-family:inherit;font-size:12px;cursor:pointer;box-shadow:4px 4px 0px #fff;white-space:nowrap;">Accept</button></div>';
    document.body.appendChild(banner);
    document.getElementById('cookie-accept').addEventListener('click', function () {
        localStorage.setItem('cookieConsent', 'accepted');
        banner.remove();
    });
});
