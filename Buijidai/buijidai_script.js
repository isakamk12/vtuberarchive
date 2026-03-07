// ぶいじだい (Buijidai) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bj-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.bj-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });
});
