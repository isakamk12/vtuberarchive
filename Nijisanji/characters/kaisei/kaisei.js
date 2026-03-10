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

    // Teddy Bear Background
    const kumaContainer = document.getElementById('kuma-container');
    for (let i = 0; i < 6; i++) {
        const bear = document.createElement('div');
        bear.className = 'teddy-bear';
        bear.innerText = '🧸';
        bear.style.left = `${Math.random() * 100}%`;
        bear.style.top = `${Math.random() * 100}%`;
        bear.style.animationDelay = `${Math.random() * 5}s`;
        kumaContainer.appendChild(bear);
    }

    // Pick Lock Mode
    const lockBtn = document.getElementById('lock-pick-btn');
    let isLocking = false;
    lockBtn.addEventListener('click', () => {
        isLocking = !isLocking;
        if (isLocking) {
            document.body.classList.add('lock-picking');
            lockBtn.innerText = 'UNLOCKING... 🔑';
            lockBtn.style.background = 'var(--kaisei-brass)';
            lockBtn.style.color = 'white';
        } else {
            document.body.classList.remove('lock-picking');
            lockBtn.innerText = 'PICK_THE_LOCK 🔑';
            lockBtn.style.background = 'white';
            lockBtn.style.color = 'var(--kaisei-teal)';
            document.querySelectorAll('section').forEach(s => s.classList.remove('unlocked'));
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isLocking) {
            document.querySelectorAll('section').forEach(sec => {
                const rect = sec.getBoundingClientRect();
                if (e.clientX > rect.left && e.clientX < rect.right &&
                    e.clientY > rect.top && e.clientY < rect.bottom) {
                    sec.classList.add('unlocked');
                } else {
                    sec.classList.remove('unlocked');
                }
            });
        }
    });

    // 3KUMA Generator
    const kumaBtn = document.getElementById('kuma-btn');
    kumaBtn.addEventListener('click', () => {
        const bear = document.createElement('div');
        bear.innerText = '🧸';
        bear.style.position = 'fixed';
        bear.style.left = `${Math.random() * 90}%`;
        bear.style.top = `-50px`;
        bear.style.fontSize = '3rem';
        bear.style.zIndex = '1100';
        bear.style.transition = 'top 3s linear';
        document.body.appendChild(bear);

        setTimeout(() => {
            bear.style.top = '110vh';
        }, 100);
        setTimeout(() => bear.remove(), 3500);
    });

    // Snake Mouse Tracer (Delay effect)
    const segments = 5;
    const dots = [];
    for (let i = 0; i < segments; i++) {
        const d = document.createElement('div');
        d.className = 'snake-trace';
        document.body.appendChild(d);
        dots.push({ el: d, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateSnake = () => {
        let lx = mouseX, ly = mouseY;
        dots.forEach((dot, i) => {
            const dx = lx - dot.x;
            const dy = ly - dot.y;
            dot.x += dx * 0.2;
            dot.y += dy * 0.2;
            dot.el.style.left = `${dot.x - 5}px`;
            dot.el.style.top = `${dot.y - 5}px`;
            dot.el.style.opacity = (segments - i) / segments * 0.5;
            lx = dot.x;
            ly = dot.y;
        });
        requestAnimationFrame(animateSnake);
    };
    animateSnake();

    // Random Dialect comments
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.85) {
            const comments = [
                "あらゆる壁は扉となります。",
                "鍵、開けときますね。",
                "ロックスミスです。",
                "お疲れ様です（九州訛り）",
                "コーヒー、淹れますか？",
                "助けて、すぐ帰ります（GTA）"
            ];
            const msg = document.createElement('div');
            msg.innerText = comments[Math.floor(Math.random() * comments.length)];
            msg.style.position = 'fixed';
            msg.style.left = `${e.clientX}px`;
            msg.style.top = `${e.clientY}px`;
            msg.style.color = 'var(--kaisei-teal)';
            msg.style.fontWeight = '900';
            msg.style.zIndex = '1200';
            msg.style.pointerEvents = 'none';
            msg.style.fontFamily = 'Shippori Mincho';
            document.body.appendChild(msg);

            msg.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-30px)' }
            ], { duration: 1000 });
            setTimeout(() => msg.remove(), 1000);
        }
    });
});
