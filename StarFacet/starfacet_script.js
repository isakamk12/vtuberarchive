// Star Facet Production — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.sf-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Determine if element already has a transition-delay set inline
                const hasDelay = entry.target.style.transitionDelay;
                if (!hasDelay) {
                    entry.target.style.transitionDelay = `${i * 0.05}s`;
                }
                setTimeout(() => entry.target.classList.add('active'), 50);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Navigation shrink
    const nav = document.querySelector('.sf-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Particle background generation
    const particlesContainer = document.getElementById('sf-particles');
    if (particlesContainer) {
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.className = 'sf-particle';

            // Randomize properties
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 20;
            const opacity = Math.random() * 0.5 + 0.1;

            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.left = `${left}%`;
            el.style.setProperty('--duration', `${duration}s`);
            el.style.setProperty('--opacity', opacity);
            el.style.animationDelay = `-${delay}s`; // Start at different times

            particlesContainer.appendChild(el);
        }
    }

    // Card click logic
    const cards = document.querySelectorAll('.sf-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const nameEl = card.querySelector('.sf-card-sub');
            if (nameEl) {
                const nameText = nameEl.textContent.trim().toLowerCase().replace(/ /g, '_');
                const targetUrl = `characters/${nameText}/${nameText}.html`;
                console.log(`Navigating to: ${targetUrl}`);
                window.location.href = targetUrl;
            }
        });
    });
});


