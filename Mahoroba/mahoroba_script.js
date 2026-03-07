// MAHOROBA — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer with a slower, more elegant timing
    const reveals = document.querySelectorAll('.mh-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 200);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.mh-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.mh-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Add staggered entrance animations for grid items on load
    const gridItems = document.querySelectorAll('.mh-member-card');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});
