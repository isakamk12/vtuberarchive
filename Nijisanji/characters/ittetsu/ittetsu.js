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

    // Scrolling 2ch-style text
    const textLayer = document.querySelector('.scroll-text-layer');
    const messages = [
        "ヒーロー見参ｗｗｗ",
        "ぬるぽ",
        "ガッ",
        "＼(＾o＾)／",
        "悪・即・斬！！",
        "Blender難しすぎワロタ",
        "世界の朝食（不穏）",
        "仁義を切るぜえええ",
        "MECHATU-A最高"
    ];

    const createScrollText = () => {
        const msg = document.createElement('div');
        msg.className = 'scrolling-msg';
        msg.innerText = messages[Math.floor(Math.random() * messages.length)];
        msg.style.top = `${Math.random() * 95}%`;
        msg.style.left = '100%';
        msg.style.transition = `left ${Math.random() * 5 + 5}s linear`;
        textLayer.appendChild(msg);

        setTimeout(() => {
            msg.style.left = '-100%';
        }, 50);

        setTimeout(() => msg.remove(), 10000);
    };

    setInterval(createScrollText, 1500);

    // Jingi Toggle
    const toggleBtn = document.getElementById('mode-toggle');
    const overlay = document.createElement('div');
    overlay.className = 'jingi-overlay';
    overlay.innerHTML = '<div class="jingi-text">仁義。</div>';
    document.body.appendChild(overlay);

    toggleBtn.addEventListener('click', () => {
        document.body.classList.add('active-jingi');

        // Random sound-effect-like text
        const sfx = document.createElement('div');
        sfx.style.position = 'fixed';
        sfx.style.left = '50%';
        sfx.style.top = '70%';
        sfx.style.transform = 'translate(-50%, -50%)';
        sfx.style.color = 'var(--ittetsu-gold)';
        sfx.style.fontSize = '2rem';
        sfx.style.zIndex = '1001';
        sfx.innerText = 'ドォォォン！！';
        document.body.appendChild(sfx);

        setTimeout(() => {
            document.body.classList.remove('active-jingi');
            sfx.remove();
        }, 800);
    });

    // Mouse Interaction - Wireframe jitter
    document.addEventListener('mousemove', (e) => {
        const grid = document.querySelector('.wireframe-grid');
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 10;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 10;
        grid.style.transform = `perspective(500px) rotateX(${60 + yPercent}deg) translateX(${xPercent}px)`;
    });

    // Retro click effect
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return;
        const dot = document.createElement('div');
        dot.style.position = 'fixed';
        dot.style.left = `${e.clientX - 5}px`;
        dot.style.top = `${e.clientY - 5}px`;
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.background = 'var(--ittetsu-gold)';
        dot.style.zIndex = '1000';
        dot.style.pointerEvents = 'none';
        document.body.appendChild(dot);

        setTimeout(() => {
            dot.style.transition = 'all 0.3s ease-out';
            dot.style.transform = 'scale(4)';
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 300);
        }, 10);
    });
});
