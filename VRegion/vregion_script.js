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
    const nodes = document.querySelector('.vr-map-nodes');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (bgPattern) {
            bgPattern.style.backgroundPositionY = `${scrolled * 0.15}px`;
        }
        
        if (nodes) {
            nodes.style.transform = `translateY(${scrolled * 0.25}px)`;
            nodes.style.opacity = Math.max(0.1, 0.4 - scrolled / 1000);
        }
    });
});
