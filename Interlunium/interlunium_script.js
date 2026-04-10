/* Interlunium Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.i-card');

    // Soft fade-in for studio aesthetic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Subunit filter logic (Future expansion placeholder)
    console.log("%cInterlunium %cVocal Database Initialized", "color: #1e3a8a; font-size: 20px; font-weight: bold;", "color: #64748b; font-size: 16px;");
});
