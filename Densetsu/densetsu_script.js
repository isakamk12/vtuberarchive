// Densetsu.EXE — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const reveals = document.querySelectorAll('.dx-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.dx-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.dx-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Terminal typing effect
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
        const text = "Connecting to Densetsu Network... Standby.";
        let i = 0;

        // Start typing after a delay to let the initial "boot up" impression land
        setTimeout(() => {
            const typer = setInterval(() => {
                if (i < text.length) {
                    typingSpan.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typer);
                }
            }, 50);
        }, 1500);
    }

    // Generate falling purely aesthetic data particles
    const particlesContainer = document.getElementById('dx-particles');
    if (particlesContainer) {
        const numParticles = 40;
        for (let i = 0; i < numParticles; i++) {
            const p = document.createElement('div');
            p.classList.add('dx-particle');

            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 3; // 3s to 8s

            p.style.left = `${left}vw`;
            p.style.animationDelay = `${delay}s`;
            p.style.animationDuration = `${duration}s`;

            if (Math.random() > 0.7) p.style.background = 'var(--dx-pink)';
            if (Math.random() > 0.9) p.style.background = 'var(--dx-mint)';

            particlesContainer.appendChild(p);
        }
    }
});


