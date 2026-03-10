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

    // Water ripple effect on hover
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            const container = document.querySelector('.water-ripple-layer');
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX}px`;
            ripple.style.top = `${e.clientY}px`;
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            container.appendChild(ripple);
            setTimeout(() => ripple.remove(), 2000);
        }

        // Crosshair follow
        const cross = document.querySelector('.crosshair-layer');
        if (cross) {
            cross.style.left = `${e.clientX}px`;
            cross.style.top = `${e.clientY}px`;
        }
    });

    // Dolphin animation
    const createDolphin = () => {
        const container = document.querySelector('.dolphin-particles');
        if (!container) return;
        const dolphin = document.createElement('div');
        dolphin.className = 'dolphin';
        dolphin.innerHTML = '🐬';
        dolphin.style.top = `${Math.random() * 80 + 10}%`;
        container.appendChild(dolphin);
        setTimeout(() => dolphin.remove(), 10000);
    };

    setInterval(createDolphin, 5000);

    // Click effect (Dolphin jump)
    document.addEventListener('click', (e) => {
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.left = `${e.clientX}px`;
        burst.style.top = `${e.clientY}px`;
        burst.innerHTML = '🌊';
        burst.style.fontSize = '2rem';
        burst.style.pointerEvents = 'none';
        burst.style.transition = 'all 0.5s ease-out';
        document.body.appendChild(burst);

        setTimeout(() => {
            burst.style.transform = 'translateY(-50px) scale(2)';
            burst.style.opacity = '0';
        }, 10);

        setTimeout(() => burst.remove(), 500);
    });
});
