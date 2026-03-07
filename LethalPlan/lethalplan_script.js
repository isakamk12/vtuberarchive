// Lethal Plan — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer for blocky arcade reveals
    const reveals = document.querySelectorAll('.lp-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Short brutal delay like arcade loading
                setTimeout(() => entry.target.classList.add('active'), i * 100 + 50);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.lp-member-card');

    // Add audio feedback effect simulation on hover (visual only)
    cards.forEach(card => {
        const link = card.querySelector('.lp-member-name');

        card.addEventListener('mouseenter', () => {
            // Random glitch effect on health bars when hovering a character
            const hbs = document.querySelectorAll('.lp-health-bar::before');
            const hbl = document.querySelector('.lp-hb-left');
            const hbr = document.querySelector('.lp-hb-right');

            if (hbl && hbr) {
                hbl.style.border = `2px solid ${card.classList.contains('lp-card-new') ? 'var(--lp-red)' : 'var(--lp-cyan)'}`;
            }
        });

        card.addEventListener('mouseleave', () => {
            const hbl = document.querySelector('.lp-hb-left');
            if (hbl) hbl.style.border = `2px solid #fff`;
        });

        if (link) {
            card.addEventListener('click', (e) => {
                // Simulate "Character Selected" lock-in visual
                if (!e.target.closest('a')) {
                    card.style.transform = 'scale(0.95)';
                    card.style.background = '#fff';
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 150);
                }
            });
        }
    });
});
