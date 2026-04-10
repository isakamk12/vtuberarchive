/* VERSE Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.v-card');

    // Subtle scroll reveal with slow-release effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 200);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
    });

    // Grain effect variation (Soft flicker)
    const overlay = document.querySelector('.v-noise');
    let timer;
    window.addEventListener('scroll', () => {
        if (timer) clearTimeout(timer);
        overlay.style.opacity = '0.08';
        timer = setTimeout(() => {
            overlay.style.opacity = '0.05';
        }, 150);
    });

    // Console Branding
    console.log("%cVERSEⁿ %cArchival Synchronized", "color: #3182ce; font-size: 20px; font-weight: bold;", "color: #fff; font-size: 16px;");
});
