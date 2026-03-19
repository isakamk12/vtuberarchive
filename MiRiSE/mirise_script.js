// Mi→RiSE — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const reveals = document.querySelectorAll('.mr-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.mr-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.mr-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Generate upward rising particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const numParticles = 30; // Number of particles
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('mr-particle');

            // Random properties
            const left = Math.random() * 100; // 0 to 100vw
            const delay = Math.random() * 5; // 0 to 5s delay
            const duration = Math.random() * 3 + 4; // 4 to 7s duration
            const height = Math.random() * 20 + 10; // 10px to 30px height

            // Some pink particles for variety
            if (Math.random() > 0.7) {
                particle.style.background = 'var(--mr-pink)';
                particle.style.boxShadow = '0 0 10px var(--mr-pink)';
            }

            particle.style.left = `${left}vw`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.height = `${height}px`;

            particlesContainer.appendChild(particle);
        }
    }
});


