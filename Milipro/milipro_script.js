// Milipro — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer for scroll animations
    const reveals = document.querySelectorAll('.mp-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.mp-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.mp-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Generate background gold/pink sparkles
    const sparklesContainer = document.getElementById('sparkles');
    if (sparklesContainer) {
        const numSparkles = 25;
        for (let i = 0; i < numSparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('mp-sparkle');

            // Random properties
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = Math.random() * 15 + 10; // 10px to 25px
            const duration = Math.random() * 2 + 2; // 2s to 4s
            const delay = Math.random() * 2;

            // Randomly assign some to pink
            if (Math.random() > 0.6) {
                sparkle.style.background = 'var(--mp-pink)';
            }

            sparkle.style.top = `${top}vh`;
            sparkle.style.left = `${left}vw`;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.animationDuration = `${duration}s`;
            sparkle.style.animationDelay = `${delay}s`;

            sparklesContainer.appendChild(sparkle);
        }
    }
});


