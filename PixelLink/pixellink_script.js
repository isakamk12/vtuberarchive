/* PixelLink Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.px-card');

    // Glitch effect on scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, i * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'all 0.4s steps(4)'; // Pixelated movement
        observer.observe(card);
    });

    // Console Branding
    console.log("%cPIXEL_LINK %cEST_2022 %cOFFLINE", 
        "color: #ff00ff; font-weight: bold; background: #000; padding: 2px 5px;",
        "color: #00ffff; font-weight: bold; background: #000; padding: 2px 5px;",
        "color: #fff; font-weight: bold; background: #f00; padding: 2px 5px;");
});
