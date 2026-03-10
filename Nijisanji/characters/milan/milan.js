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

    // Hourglass Fall Effect
    const hourglassContainer = document.getElementById('hourglass-container');
    for (let i = 0; i < 15; i++) {
        const hour = document.createElement('div');
        hour.className = 'hourglass';
        hour.innerText = '⏳';
        hour.style.left = `${Math.random() * 100}%`;
        hour.style.animationDuration = `${3 + Math.random() * 5}s`;
        hour.style.animationDelay = `${Math.random() * 5}s`;
        hourglassContainer.appendChild(hour);
    }

    // Butterfly Shadow Effect
    const butterflyContainer = document.getElementById('butterfly-container');
    for (let i = 0; i < 5; i++) {
        const b = document.createElement('div');
        b.className = 'butterfly';
        b.innerText = '🦋';
        b.style.left = `${Math.random() * 100}%`;
        b.style.top = `${Math.random() * 100}%`;
        b.style.animationDelay = `${Math.random() * 4}s`;
        butterflyContainer.appendChild(b);
    }

    // Audio Tuning Slider
    const slider = document.getElementById('audio-slider');
    const tuningFx = document.getElementById('tuning-fx');

    slider.addEventListener('input', (e) => {
        const val = e.target.value; // 0 to 100
        const blurVal = (100 - val) / 10;
        const noiseVal = (100 - val) / 200;
        tuningFx.style.setProperty('--blur', `${blurVal}px`);
        tuningFx.style.setProperty('--noise', noiseVal);
    });

    // Chronostasis Toggle
    const chronoBtn = document.getElementById('chrono-btn');
    let isStasis = false;
    chronoBtn.addEventListener('click', () => {
        isStasis = !isStasis;
        if (isStasis) {
            document.body.classList.add('stasis-active');
            chronoBtn.innerText = 'STA-SIS...';
        } else {
            document.body.classList.remove('stasis-active');
            chronoBtn.innerText = 'CHRONOSTASIS ⏳';
        }
    });

    // Villain Mode Toggle
    const villainBtn = document.getElementById('villain-btn');
    let isVillain = false;
    villainBtn.addEventListener('click', () => {
        isVillain = !isVillain;
        if (isVillain) {
            document.body.classList.add('villain-active');
            villainBtn.innerText = 'VILLAIN_MODE: ON';
        } else {
            document.body.classList.remove('villain-active');
            villainBtn.innerText = 'VILLAIN_MODE';
        }
    });

    // Random Audio Geek/Time Mage comments
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.85) {
            const comment = document.createElement('div');
            comment.innerText = isVillain ? '「破壊の音色、素晴らしいですね」' : '「この真空管の温かみ、分かりますか？」';
            comment.style.position = 'fixed';
            comment.style.left = `${e.clientX}px`;
            comment.style.top = `${e.clientY}px`;
            comment.style.color = 'var(--milan-gold)';
            comment.style.fontWeight = '900';
            comment.style.zIndex = '1100';
            comment.style.pointerEvents = 'none';
            document.body.appendChild(comment);

            comment.animate([
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(1.5)' }
            ], { duration: 1000 });
            setTimeout(() => comment.remove(), 1000);
        }
    });
});
