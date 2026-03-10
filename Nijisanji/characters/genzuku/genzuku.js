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

    // Musical Note particles
    const notes = ['♩', '♪', '♫', '♬', '♭', '♮', '♯', '🎻', '🎹'];
    const createNote = () => {
        const container = document.querySelector('.instrument-particles');
        if (!container) return;

        const note = document.createElement('div');
        note.className = 'note';
        note.innerHTML = notes[Math.floor(Math.random() * notes.length)];

        const startX = Math.random() * window.innerWidth;
        const duration = 5 + Math.random() * 5;
        const delay = Math.random() * 5;

        note.style.left = `${startX}px`;
        note.style.animationDuration = `${duration}s`;
        note.style.animationDelay = `-${delay}s`;

        container.appendChild(note);

        setTimeout(() => note.remove(), duration * 1000);
    };

    for (let i = 0; i < 15; i++) {
        setTimeout(createNote, i * 500);
    }
    setInterval(createNote, 1000);

    // Score parallax
    window.addEventListener('scroll', () => {
        const score = document.querySelector('.score-layer');
        if (score) {
            score.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
    });
});
