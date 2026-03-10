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

    // Paper Flutter
    const createPaper = () => {
        const layer = document.querySelector('.paper-flutter-layer');
        if (!layer) return;
        const paper = document.createElement('div');
        paper.className = 'paper-particle';
        paper.style.left = `${Math.random() * 100}%`;
        paper.style.animationDuration = `${Math.random() * 4 + 6}s`;
        paper.style.transform = `rotate(${Math.random() * 360}deg)`;
        layer.appendChild(paper);
        setTimeout(() => paper.remove(), 10000);
    };

    setInterval(createPaper, 1000);

    // Mujo Text Glitch
    const mujo = document.getElementById('mujo-display');
    setInterval(() => {
        if (Math.random() > 0.95) {
            mujo.style.color = '#00ffff';
            setTimeout(() => mujo.style.color = 'var(--akira-glitch)', 50);
        }
    }, 100);

    // Scroll reveal "Contract" effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const bg = document.querySelector('.manuscript-grid');
        if (bg) {
            bg.style.backgroundPositionY = `${scrolled * 0.2}px`;
        }
    });

    // Special click - BL Sparkle (Purple/Blue)
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = i % 2 === 0 ? 'var(--akira-blue)' : 'var(--akira-glitch)';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';

            const angle = (i / 8) * Math.PI * 2;
            const velocity = 5 + Math.random() * 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            document.body.appendChild(sparkle);

            let posX = e.clientX;
            let posY = e.clientY;
            let opacity = 1;

            const move = () => {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                sparkle.style.left = `${posX}px`;
                sparkle.style.top = `${posY}px`;
                sparkle.style.opacity = opacity;

                if (opacity > 0) {
                    requestAnimationFrame(move);
                } else {
                    sparkle.remove();
                }
            };
            requestAnimationFrame(move);
        }
    });
});
