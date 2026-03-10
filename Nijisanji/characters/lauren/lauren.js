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

    // Low-sensi mouse tracer
    // To represent low-sensi, the tracer will follow with a slight delay and a long tail
    const tracerCount = 20;
    const tracers = [];
    const container = document.querySelector('.mouse-tracer-layer');

    for (let i = 0; i < tracerCount; i++) {
        const t = document.createElement('div');
        t.className = 'mouse-tracer';
        t.style.opacity = (1 - i / tracerCount) * 0.5;
        t.style.scale = 1 - i / tracerCount;
        container.appendChild(t);
        tracers.push({ el: t, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateTracers = () => {
        let prevX = mouseX;
        let prevY = mouseY;

        tracers.forEach((t, index) => {
            // "Low sensi" logic: tracer reacts slowly
            const delay = 0.1 + (index * 0.02);
            t.x += (prevX - t.x) * delay;
            t.y += (prevY - t.y) * delay;

            t.el.style.left = `${t.x}px`;
            t.el.style.top = `${t.y}px`;

            prevX = t.x;
            prevY = t.y;
        });

        requestAnimationFrame(animateTracers);
    };

    animateTracers();

    // Random bullet holes on scroll
    window.addEventListener('scroll', () => {
        if (Math.random() > 0.95) {
            const layer = document.querySelector('.bullet-impacts');
            const bullet = document.createElement('div');
            bullet.className = 'bullet';
            bullet.style.left = `${Math.random() * 100}%`;
            bullet.style.top = `${window.scrollY + Math.random() * window.innerHeight}px`;
            layer.appendChild(bullet);
        }
    });

    // Wanted Flicker
    setInterval(() => {
        const enName = document.querySelector('.en-name');
        if (Math.random() > 0.98) {
            enName.style.opacity = '0.5';
            setTimeout(() => enName.style.opacity = '1', 50);
        }
    }, 100);
});
