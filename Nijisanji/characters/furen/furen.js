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

    // Laughter "Gera" sparkles
    const createSparkle = () => {
        const container = document.querySelector('.sparkle-particles');
        if (!container) return;

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✦';

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        sparkle.style.left = `${startX}px`;
        sparkle.style.top = `${startY}px`;
        sparkle.style.fontSize = `${10 + Math.random() * 20}px`;

        container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    };

    // More sparkles when mouse moves (high energy)
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            const container = document.querySelector('.sparkle-particles');
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✧';
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            container.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    });

    setInterval(createSparkle, 500);
});
