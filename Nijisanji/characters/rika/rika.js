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

    // Baseballs flying out from center
    const createBaseball = () => {
        const layer = document.querySelector('.baseball-layer');
        if (!layer) return;
        const ball = document.createElement('div');
        ball.className = 'baseball';
        ball.innerHTML = '⚾';
        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * 50;
        ball.style.setProperty('--target-x', `${50 + Math.cos(angle) * dist}%`);
        ball.style.setProperty('--target-y', `${50 + Math.sin(angle) * dist}%`);
        layer.appendChild(ball);
        setTimeout(() => ball.remove(), 5000);
    };

    setInterval(createBaseball, 1000);

    // Confetti Cannon
    const fireConfetti = (x, y) => {
        const colors = ['#FF8C3C', '#FFD200', '#ffffff', '#228b22'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 10;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 5;

            document.querySelector('.confetti-layer').appendChild(confetti);

            let posX = x;
            let posY = y;
            let curVx = vx;
            let curVy = vy;

            const update = () => {
                posX += curVx;
                posY += curVy;
                curVy += 0.2; // gravity
                confetti.style.left = `${posX}px`;
                confetti.style.top = `${posY}px`;
                if (posY < window.innerHeight) {
                    requestAnimationFrame(update);
                } else {
                    confetti.remove();
                }
            };
            update();
        }
    };

    // Mode Toggle - Roar!
    const btn = document.getElementById('mode-toggle');
    btn.addEventListener('click', (e) => {
        document.body.classList.add('roar-active');
        fireConfetti(e.clientX, e.clientY);
        setTimeout(() => document.body.classList.remove('roar-active'), 1000);
    });

    // Hover effect on sections - mini roar
    document.querySelectorAll('section').forEach(s => {
        s.addEventListener('mouseenter', () => {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.border = '2px solid var(--rika-orange)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.transition = 'all 0.5s ease-out';
            ripple.style.pointerEvents = 'none';
            s.style.position = 'relative';
            s.appendChild(ripple);

            setTimeout(() => {
                ripple.style.width = '200%';
                ripple.style.height = '200%';
                ripple.style.opacity = '0';
            }, 10);
            setTimeout(() => ripple.remove(), 500);
        });
    });

    // Special click - "Homerun!"
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return;

        const text = document.createElement('div');
        text.style.position = 'fixed';
        text.style.left = `${e.clientX}px`;
        text.style.top = `${e.clientY}px`;
        text.style.fontFamily = 'Bebas Neue, sans-serif';
        text.style.fontSize = '2rem';
        text.style.color = 'var(--rika-gold)';
        text.style.pointerEvents = 'none';
        text.style.zIndex = '1000';
        text.innerText = 'HOME RUN!!';
        text.style.transition = 'all 0.6s ease-out';

        document.body.appendChild(text);

        setTimeout(() => {
            text.style.transform = 'translateY(-50px) scale(2)';
            text.style.opacity = '0';
        }, 10);
        setTimeout(() => text.remove(), 600);
    });
});
