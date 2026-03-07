// MARBLE CREATORS — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const reveals = document.querySelectorAll('.mc-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.mc-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.mc-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Subtly track mouse movement to shift background blobs for interactive marble effect
    const blobs = document.querySelectorAll('.mc-blob');
    if (blobs.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            blobs.forEach((blob, index) => {
                // Different translation multiplier for each blob to create parallax
                const mult = (index + 1) * 20;
                blob.style.transform = `translate(${x * mult}px, ${y * mult}px)`;
            });
        });
    }
});
