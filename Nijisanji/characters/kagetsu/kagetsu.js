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

    // RTA Timer Loop
    const timerEl = document.getElementById('rta-timer');
    let startTime = Date.now();
    setInterval(() => {
        const diff = Date.now() - startTime;
        const ms = String(diff % 1000).padStart(3, '0');
        const s = String(Math.floor(diff / 1000) % 60).padStart(2, '0');
        const m = String(Math.floor(diff / 60000)).padStart(2, '0');
        timerEl.innerText = `${m}:${s}:${ms}`;
    }, 10);

    // Crosshair Follow
    const crosshair = document.getElementById('crosshair');
    document.addEventListener('mousemove', (e) => {
        crosshair.style.left = `${e.clientX - 20}px`;
        crosshair.style.top = `${e.clientY - 20}px`;

        // Wata-kun follow logic (delayed)
        const wata = document.getElementById('wata-path');
        setTimeout(() => {
            wata.style.left = `${e.clientX - 10}px`;
            wata.style.top = `${e.clientY - 10}px`;
        }, 500);
    });

    // Ninpou Mode (Clip)
    const modeBtn = document.getElementById('mode-toggle');
    let isClipped = false;

    modeBtn.addEventListener('click', () => {
        isClipped = !isClipped;
        if (isClipped) {
            document.body.classList.add('clipped-mode');
            modeBtn.innerText = '忍法解除';
            // Flash effect
            document.body.style.background = '#6EB487';
            setTimeout(() => document.body.style.background = '', 100);
        } else {
            document.body.classList.remove('clipped-mode');
            modeBtn.innerText = '忍法：壁抜け (CLIP)';
        }
    });

    // Stealth Shadows
    const spawnShadow = () => {
        const shadow = document.createElement('div');
        shadow.className = 'stealth-shadow';
        shadow.innerHTML = '<i class="fa-solid fa-user-ninja"></i>';
        shadow.style.left = `${Math.random() * 100}%`;
        shadow.style.top = `${Math.random() * 100}%`;
        document.body.appendChild(shadow);

        shadow.animate([
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: 0.1, transform: 'scale(1.2)' },
            { opacity: 0, transform: 'scale(1.5)' }
        ], { duration: 1000 });
        setTimeout(() => shadow.remove(), 1000);
    };

    setInterval(() => {
        if (Math.random() > 0.7) spawnShadow();
    }, 2000);

    // Only Up! jump sound trigger (visual)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            const jump = document.createElement('div');
            jump.innerText = 'WAIT! DON\'T FALL!';
            jump.style.position = 'fixed';
            jump.style.left = '50%';
            jump.style.bottom = '20%';
            jump.style.transform = 'translateX(-50%)';
            jump.style.color = 'white';
            jump.style.fontWeight = '900';
            jump.style.zIndex = '1000';
            document.body.appendChild(jump);
            setTimeout(() => jump.remove(), 500);
        }
    });
});
