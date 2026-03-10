document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Honey drip effect
    const createDrip = () => {
        const container = document.querySelector('.honey-drip-layer');
        if (!container) return;

        const drip = document.createElement('div');
        drip.className = 'honey-drip';
        drip.style.left = `${Math.random() * 100}%`;

        container.appendChild(drip);

        setTimeout(() => drip.remove(), 5000);
    };

    setInterval(createDrip, 2000);

    // Gacha Sparkle effect on click
    document.addEventListener('click', (e) => {
        const container = document.querySelector('.gacha-sparkles');
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-gold';
            sparkle.innerHTML = '✦';
            sparkle.style.left = `${e.clientX + (Math.random() - 0.5) * 50}px`;
            sparkle.style.top = `${e.clientY + (Math.random() - 0.5) * 50}px`;
            sparkle.style.fontSize = `${10 + Math.random() * 20}px`;
            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }
    });

    // Parallax drip move on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const drips = document.querySelectorAll('.honey-drip');
        drips.forEach(drip => {
            drip.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    });
});
