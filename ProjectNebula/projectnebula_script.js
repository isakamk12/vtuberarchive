// PROJECT NEBULA — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Generate twinkling stars for background
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const numStars = 50;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('pn-star');
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            // Random size (1px to 3px)
            const size = Math.random() * 2 + 1;
            // Random animation duration and delay
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;

            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;

            starsContainer.appendChild(star);
        }
    }

    // Make entire member card clickable
    const cards = document.querySelectorAll('.pn-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.pn-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });
});
