/* ProPro Production Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pp-card');

    // Elegant lift-up animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(25px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
    });

    // Console Branding
    console.log("%cPROPRO_PRODUCTION %cBoutique Agency Hub", "color: #f472b6; font-size: 20px; font-weight: bold;", "color: #6b7280; font-size: 16px;");
});
