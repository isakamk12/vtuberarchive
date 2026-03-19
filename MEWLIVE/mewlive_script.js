// MEWLIVE — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const reveals = document.querySelectorAll('.ml-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.ml-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.ml-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Generate hero mini visualizer bars
    const heroVisualizer = document.getElementById('hero-visualizer');
    if (heroVisualizer) {
        for (let i = 0; i < 15; i++) {
            const bar = document.createElement('div');
            bar.classList.add('ml-vs-bar');
            bar.style.animationDelay = `${Math.random()}s`;
            bar.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
            // Randomly colour some bars pink
            if (Math.random() > 0.7) {
                bar.style.background = 'var(--ml-pink)';
            }
            heroVisualizer.appendChild(bar);
        }
    }

    // Generate background massive soundwaves
    const bgWavesContainer = document.getElementById('bg-soundwaves');
    if (bgWavesContainer) {
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.classList.add('ml-sw-bar');
            bar.style.animationDelay = `${Math.random()}s`;
            bar.style.animationDuration = `${Math.random() * 1 + 1}s`;

            if (i % 3 === 0) {
                bar.style.background = 'var(--ml-cyan)';
            } else if (i % 5 === 0) {
                bar.style.background = 'var(--ml-purple)';
            }

            bgWavesContainer.appendChild(bar);
        }
    }
});


