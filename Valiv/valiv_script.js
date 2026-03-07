// vα-liv (ヴイアライヴ) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Member card click -> character page
    document.querySelectorAll('.vl-member-card').forEach(card => {
        const link = card.querySelector('a.vl-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Parallax effect on Hero stars
    const stars = document.querySelector('.vl-bg-stars');
    if (stars) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            stars.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});
