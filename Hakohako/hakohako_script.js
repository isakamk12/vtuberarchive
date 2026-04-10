/* Hakohako Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.box-card');

    // Box Reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, i * 150);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(card);
    });

    // Generate background shapes
    const bg = document.querySelector('.box-bg-layer');
    for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        const size = Math.random() * 400 + 100;
        shape.className = 'box-shape';
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.animationDuration = `${Math.random() * 20 + 20}s`;
        bg.appendChild(shape);
    }

    // Console Branding
    console.log("%c箱箱THE_BOX %cMeridian Project Sync", "color: #8b5cf6; font-size: 20px; font-weight: bold;", "color: #fff; font-size: 16px;");
});
