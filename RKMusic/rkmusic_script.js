/* ============================================================
   RK Music - rkmusic_script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.rk-member-card');

    cards.forEach((card) => {
        const link = card.querySelector('.rk-member-name[href]:not([href="#"])');
        if (!link) {
            return;
        }

        card.tabIndex = 0;
        card.setAttribute('role', 'link');

        card.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                return;
            }
            window.location.href = link.href;
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                window.location.href = link.href;
            }
        });
    });
});


