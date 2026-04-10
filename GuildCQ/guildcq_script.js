/* GuildCQ Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.gcq-card');

    // Mystic reveal with 'ancient' fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, i * 150);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.98)';
        card.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(card);
    });

    // Console Branding (Mythic theme)
    console.log("%cGuildCQ %cAgartha_Connection_Synced", "color: #d97706; font-size: 20px; font-weight: bold;", "color: #94a3b8; font-size: 16px;");
});
