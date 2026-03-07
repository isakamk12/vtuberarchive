// VRegion — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Make entire member card clickable
    const cards = document.querySelectorAll('.vr-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.vr-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Parallax background elements
    const bgPattern = document.querySelector('.vr-bg-pattern');
    if (bgPattern) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY * 0.1;
            bgPattern.style.backgroundPositionY = `${offset}px`;
        });
    }
});
