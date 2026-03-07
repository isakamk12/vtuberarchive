// VOne Production (ぶいわんプロダクション) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Make entire spotlight card clickable
    const spotlightCards = document.querySelectorAll('.vo-member-card.spotlight');
    spotlightCards.forEach(card => {
        const link = card.querySelector('.vo-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });
});
