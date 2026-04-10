/* Synthmaniacs Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.sm-card');

    // Electronic reveal with 'glitch' entry
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'skewX(0) translateX(0)';
                }, i * 120);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'skewX(5deg) translateX(20px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
        observer.observe(card);
    });

    // Console Branding
    console.log("%cSYNTHMANIACS %cNEON_WAVE_READY", "color: #10b981; font-size: 20px; font-weight: bold;", "color: #ec4899; font-size: 16px;");
});
