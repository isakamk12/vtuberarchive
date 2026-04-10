/* SpringFish Script */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.sf-card');

    // Smooth scroll reveal with gradual stagger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 120);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
    });

    // Subunit Section Reveal
    const sections = document.querySelectorAll('.sf-unit');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.05 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 1s ease-in-out';
        sectionObserver.observe(section);
    });

    // Console Branding (Traditional Chinese / Japanese Mix)
    console.log("%c春魚創意 %cSPRINGFISH_CREATIVE %cARCHIVE_SYNCED", 
        "color: #f59e0b; font-size: 20px; font-weight: bold;", 
        "color: #1c2541; background: #f59e0b; padding: 2px 5px;",
        "color: #fff;");
});
