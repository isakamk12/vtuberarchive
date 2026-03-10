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

    // Musical Notes
    const notes = ['♪', '♫', '♬', '♩'];
    const createNote = () => {
        const layer = document.querySelector('.note-layer');
        if (!layer) return;
        const note = document.createElement('div');
        note.className = 'note';
        note.innerText = notes[Math.floor(Math.random() * notes.length)];
        note.style.left = `${Math.random() * 100}%`;
        note.style.animationDuration = `${Math.random() * 5 + 5}s`;
        note.style.fontSize = `${Math.random() * 2 + 1}rem`;
        layer.appendChild(note);
        setTimeout(() => note.remove(), 10000);
    };

    setInterval(createNote, 1500);

    // Header interaction - Rocking
    const header = document.getElementById('main-header');
    header.addEventListener('mouseenter', () => {
        header.style.transition = 'transform 0.1s';
        const rock = () => {
            if (!header.matches(':hover')) {
                header.style.transform = 'rotate(0)';
                return;
            }
            const angle = (Math.random() - 0.5) * 2;
            header.style.transform = `rotate(${angle}deg)`;
            requestAnimationFrame(rock);
        };
        rock();
    });

    // Special click - Red Sparkle/Vibe
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = `${e.clientX - 5}px`;
        ripple.style.top = `${e.clientY - 5}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'var(--hibari-red)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '1000';
        ripple.style.boxShadow = '0 0 20px var(--hibari-bright-red)';
        ripple.style.transition = 'all 0.5s ease-out';

        document.body.appendChild(ripple);

        setTimeout(() => {
            ripple.style.transform = 'scale(10)';
            ripple.style.opacity = '0';
        }, 10);
        setTimeout(() => ripple.remove(), 500);
    });
});
