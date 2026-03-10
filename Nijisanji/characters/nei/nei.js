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

    // Spicy Gauge
    setTimeout(() => {
        const fill = document.getElementById('gauge-fill');
        if (fill) fill.style.width = '1000%'; // "Taste End-of-Service"
    }, 500);

    // Tabasco Drips
    const createDrip = () => {
        const layer = document.querySelector('.tabasco-drip-layer');
        if (!layer) return;
        const drip = document.createElement('div');
        drip.className = 'tabasco-drop';
        drip.style.left = `${Math.random() * 100}%`;
        drip.style.animationDuration = `${Math.random() * 2 + 1}s`;
        layer.appendChild(drip);
        setTimeout(() => drip.remove(), 3000);
    };

    setInterval(createDrip, 500);

    // Blueberry Fairies (Roo, Be, Lee)
    const fairies = [];
    const fairyCount = 3;
    const fairyContainer = document.querySelector('.blueberry-fairy-layer');

    for (let i = 0; i < fairyCount; i++) {
        const f = document.createElement('div');
        f.className = 'fairy';
        f.innerHTML = '🫐';
        fairyContainer.appendChild(f);
        fairies.push({ el: f, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateFairies = () => {
        fairies.forEach((f, index) => {
            // Fairies float around the mouse with different offsets
            const offset = (index + 1) * 50;
            const targetX = mouseX + Math.sin(Date.now() / 1000 + index) * offset;
            const targetY = mouseY + Math.cos(Date.now() / 1000 + index) * offset;

            f.x += (targetX - f.x) * 0.05;
            f.y += (targetY - f.y) * 0.05;

            f.el.style.left = `${f.x}px`;
            f.el.style.top = `${f.y}px`;
            f.el.style.transform = `rotate(${Math.sin(Date.now() / 500) * 20}deg)`;
        });
        requestAnimationFrame(animateFairies);
    };

    animateFairies();

    // "Ufff-un" neon trigger on scroll to bottom
    window.addEventListener('scroll', () => {
        const neon = document.getElementById('ufff-un');
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            neon.classList.add('active');
        } else {
            neon.classList.remove('active');
        }
    });

    // Click toツッコミ
    const tsukkomi = ["ダボネズミが！", "味覚サ終しとんねん", "やかましいわ", "孫か？", "うっふ～～～～ん"];
    document.addEventListener('click', (e) => {
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.left = `${e.clientX}px`;
        burst.style.top = `${e.clientY}px`;
        burst.style.color = 'var(--nei-blue)';
        burst.style.fontWeight = '900';
        burst.style.fontSize = '1.2rem';
        burst.style.pointerEvents = 'none';
        burst.style.zIndex = '500';
        burst.style.textShadow = '2px 2px 0 white';
        burst.innerText = tsukkomi[Math.floor(Math.random() * tsukkomi.length)];
        document.body.appendChild(burst);

        setTimeout(() => {
            burst.style.transform = 'scale(1.5) rotate(-10deg)';
            burst.style.opacity = '0';
        }, 10);
        setTimeout(() => burst.remove(), 600);
    });
});
