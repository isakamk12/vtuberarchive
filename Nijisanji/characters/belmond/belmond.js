document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Sexy Voice Glow Interaction
    const catchphrase = document.querySelector('.catchphrase');
    if (catchphrase) {
        catchphrase.addEventListener('mouseenter', () => {
            document.body.style.transition = 'background-color 2s';
            document.body.style.backgroundColor = '#1a0c0e';
        });
        catchphrase.addEventListener('mouseleave', () => {
            document.body.style.backgroundColor = '#0c0c0d';
        });

        catchphrase.addEventListener('click', () => {
            const originalText = catchphrase.innerText;
            catchphrase.style.color = 'var(--belmond-gold)';
            catchphrase.innerText = "「おバンでした。また夢でお会いしましょう。」";

            setTimeout(() => {
                catchphrase.innerText = originalText;
                catchphrase.style.color = '#fff';
            }, 3000);
        });
    }

    // Parallax Smoke
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const smoke = document.querySelector('.smoke-layer');
        if (smoke) {
            smoke.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Lore Cards hover effect
    const cards = document.querySelectorAll('.lore-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.paddingLeft = '60px';
        });
        card.addEventListener('mouseleave', () => {
            card.style.paddingLeft = '50px';
        });
    });
});
