/* GEMS COMPANY Script */
document.addEventListener('DOMContentLoaded', () => {
    // Stage Light Effect
    const hero = document.querySelector('.gems-hero');
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        hero.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`;
    });

    // Member Card Reveal
    const cards = document.querySelectorAll('.gems-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
    });

    // Console Branding
    console.log("%cGEMS COMPANY %cOfficial Archive", "color: #d4af37; font-size: 24px; font-weight: 900; text-shadow: 2px 2px #000;", "color: #fff; font-size: 18px;");
});
