// Astraline — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Elegant Reveal Observer
    const reveals = document.querySelectorAll('.as-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 200);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Nav shrink on scroll
    const nav = document.querySelector('.as-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Make entire member card clickable
    const cards = document.querySelectorAll('.as-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.as-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Generate magical dust (like motes of dust in an old library)
    const dustContainer = document.getElementById('magic-dust');
    if (dustContainer) {
        const numDust = 30;
        for (let i = 0; i < numDust; i++) {
            const dust = document.createElement('div');
            dust.classList.add('as-dust');

            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 5 + 5; // 5s to 10s

            dust.style.left = `${left}vw`;
            dust.style.top = `${top}vh`;
            dust.style.animationDelay = `${delay}s`;
            dust.style.animationDuration = `${duration}s`;

            // Random sizes
            const size = Math.random() * 3 + 1;
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;

            dustContainer.appendChild(dust);
        }
    }
});
