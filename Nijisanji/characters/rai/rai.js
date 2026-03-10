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

    // Gear Generator
    const gearLayer = document.getElementById('gear-container');
    const gearPositions = [
        { left: '5%', top: '10%', size: '10rem' },
        { right: '5%', top: '20%', size: '15rem', dir: -1 },
        { left: '80%', bottom: '5%', size: '12rem' },
        { right: '70%', bottom: '15%', size: '8rem', dir: -1 }
    ];

    gearPositions.forEach(pos => {
        const gear = document.createElement('div');
        gear.className = 'gear';
        gear.innerHTML = '<i class="fa-solid fa-gear"></i>';
        if (pos.left) gear.style.left = pos.left;
        if (pos.right) gear.style.right = pos.right;
        if (pos.top) gear.style.top = pos.top;
        if (pos.bottom) gear.style.bottom = pos.bottom;
        gear.style.fontSize = pos.size;
        if (pos.dir === -1) gear.style.animationDirection = 'reverse';
        gearLayer.appendChild(gear);
    });

    // Audio Visualizer
    const visualizer = document.getElementById('visualizer');
    const barCount = 40;
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'viz-bar';
        visualizer.appendChild(bar);
    }

    const bars = document.querySelectorAll('.viz-bar');
    setInterval(() => {
        bars.forEach(bar => {
            const h = Math.random() * (document.body.classList.contains('overclock-active') ? 80 : 30);
            bar.style.height = `${h}%`;
            bar.style.opacity = (h / 100) + 0.1;
        });
    }, 100);

    // Overclock Toggle
    const modeBtn = document.getElementById('mode-toggle');
    let isOverclock = false;

    modeBtn.addEventListener('click', () => {
        isOverclock = !isOverclock;
        if (isOverclock) {
            document.body.classList.add('overclock-active');
            modeBtn.innerText = 'OVERCLOCK_MODE: ACTIVE';
            modeBtn.style.background = 'var(--rai-green)';
            modeBtn.style.color = 'var(--rai-bg)';
        } else {
            document.body.classList.remove('overclock-active');
            modeBtn.innerText = 'OVERCLOCK_MODE: OFF';
            modeBtn.style.background = 'transparent';
            modeBtn.style.color = 'var(--rai-green)';
        }
    });

    // Sparkle effect on profiles
    document.querySelectorAll('.profile-item').forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            for (let i = 0; i < 5; i++) {
                const p = document.createElement('div');
                p.className = 'light-particle';
                const rect = item.getBoundingClientRect();
                p.style.left = `${rect.left + rect.width / 2}px`;
                p.style.top = `${rect.top + rect.height / 2}px`;
                p.style.setProperty('--x', `${(Math.random() - 0.5) * 100}px`);
                p.style.setProperty('--y', `${(Math.random() - 0.5) * 100}px`);
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 1000);
            }
        });
    });

    // Mechanic Tool Follow
    document.addEventListener('mousemove', (e) => {
        if (isOverclock && Math.random() > 0.8) {
            const tool = document.createElement('div');
            tool.innerHTML = '🔧';
            tool.style.position = 'fixed';
            tool.style.left = `${e.clientX}px`;
            tool.style.top = `${e.clientY}px`;
            tool.style.fontSize = '1rem';
            tool.style.pointerEvents = 'none';
            tool.style.zIndex = '1000';
            tool.style.opacity = '0.5';
            document.body.appendChild(tool);

            tool.animate([
                { transform: 'translate(0,0) rotate(0deg)', opacity: 0.5 },
                { transform: `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) rotate(360deg)`, opacity: 0 }
            ], { duration: 500 });
            setTimeout(() => tool.remove(), 500);
        }
    });
});
