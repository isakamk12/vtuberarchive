document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Lore Card Colors
    const colors = ['#D4AF37', '#8B0000', '#1E90FF', '#745BFF', '#228B22'];
    const cards = document.querySelectorAll('.lore-card');
    cards.forEach((card, index) => {
        card.style.borderTop = `8px solid ${colors[index % colors.length]}`;
        card.style.boxShadow = `8px 8px 0 #000`;

        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `15px 15px 0 ${colors[index % colors.length]}`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = `8px 8px 0 #000`;
        });
    });

    // Random Glitch Effect (Reference to broken PC)
    const enName = document.querySelector('.en-name');
    setInterval(() => {
        if (Math.random() > 0.95) {
            enName.style.transform = `translate(${Math.random() * 5}px, ${Math.random() * 5}px)`;
            enName.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
            setTimeout(() => {
                enName.style.transform = 'none';
                enName.style.filter = 'none';
            }, 100);
        }
    }, 500);

    // Parallax background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelector('.diamond-pattern').style.backgroundPositionY = -(scrolled * 0.2) + 'px';
    });
});
