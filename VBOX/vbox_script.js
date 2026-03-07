// VBOX (ぶいぼっくす) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Make entire member card clickable
    const cards = document.querySelectorAll('.vb-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.vb-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Subtle compass rotation effect based on scroll
    const logoIcon = document.querySelector('.vb-logo-icon.fa-box-open, .vb-nav-back .fa-compass');
    if (logoIcon) {
        window.addEventListener('scroll', () => {
            const rot = window.scrollY * 0.2;
            logoIcon.style.transform = `rotate(${rot}deg)`;
        });
    }
});
