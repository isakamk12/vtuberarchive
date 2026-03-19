// VOLs — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.vols-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Respect inline transition delays if set
                if (!entry.target.style.transitionDelay) {
                    entry.target.style.transitionDelay = `${i * 0.05}s`;
                }
                setTimeout(() => entry.target.classList.add('animated'), 50);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Navigation shrink and blur
    const nav = document.querySelector('.vols-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Card click logic (eSports themed click sound mock)
    const cards = document.querySelectorAll('.vols-card.active');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const nameEl = card.querySelector('.vols-card-sub');
            if (nameEl) {
                const nameText = nameEl.textContent.trim().toLowerCase().replace(/ /g, '_');
                console.log(`[SYS-CMD] Navigating to: characters/${nameText}.html`);
                // window.location.href = `characters/${nameText}.html`;
            }
        });
    });

    const gradCards = document.querySelectorAll('.vols-card.graduated');
    gradCards.forEach(card => {
        card.addEventListener('click', () => {
            alert("ACCESS DENIED: Record is currently archived or terminated.");
        });
    });
});


