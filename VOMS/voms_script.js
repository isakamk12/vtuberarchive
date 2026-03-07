// VOMS Project — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Make entire member card clickable
    const cards = document.querySelectorAll('.vm-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.vm-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Fun random wiggle on load for cards to look like restless monsters
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = `translateY(-5px) rotate(${Math.random() > 0.5 ? 2 : -2}deg)`;
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        }, index * 100 + 500);
    });
});
