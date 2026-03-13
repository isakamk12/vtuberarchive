/* ============================================================
   エアリープロダクション — airylee_script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Make entire member cards clickable
    const memberCards = document.querySelectorAll('.ay-member-card');
    memberCards.forEach(card => {
        const link = card.querySelector('.ay-member-name');
        if (link) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Prevent double navigation if the user actually clicked the link text
                if (e.target.tagName.toLowerCase() !== 'a') {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Reveal Animation
    const reveals = document.querySelectorAll('.ay-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
});
