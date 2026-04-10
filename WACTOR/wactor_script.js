/* WACTOR Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.wa-card');

    // Scroll reveal with high-tech slide effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) skewX(0)';
                }, i * 50);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) skewX(2deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
    });

    // Interactive Neon Glow
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Console Branding
    console.log("%cWACTOR %cGlobal Archive Database", "color: #00f2ff; font-size: 20px; font-weight: bold;", "color: #bc00ff; font-size: 16px;");
});
