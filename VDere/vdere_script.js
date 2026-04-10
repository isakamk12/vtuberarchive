/* V-Dere Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.v-card');

    // Star animation generation
    const starContainer = document.querySelector('.v-star-bg');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.opacity = Math.random();
        star.style.boxShadow = `0 0 ${Math.random() * 10}px #fff`;
        star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite linear`;
        starContainer.appendChild(star);
    }

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 150);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });

    // Keyframe for twinkling
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0.3; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Console Branding
    console.log("%cV-Dere %cCelestial Sync Active", "color: #a855f7; font-size: 20px; font-weight: bold;", "color: #fff; font-size: 16px;");
});
