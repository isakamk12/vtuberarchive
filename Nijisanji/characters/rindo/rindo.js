document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Dynamic Lore Card Accents
    const rindoColors = ['#745BFF', '#9179ff', '#5b44d1', '#A594FF'];
    const cards = document.querySelectorAll('.lore-card');
    cards.forEach((card, index) => {
        card.style.boxShadow = `6px 6px 0 ${rindoColors[index % rindoColors.length]}`;
        const icon = card.querySelector('i');
        if (icon) icon.style.color = rindoColors[index % rindoColors.length];
    });

    // Header Title Mouse Effect
    const enName = document.querySelector('.en-name');
    if (enName) {
        enName.addEventListener('mousemove', (e) => {
            const bound = enName.getBoundingClientRect();
            const x = (e.clientX - bound.left) / bound.width;
            const y = (e.clientY - bound.top) / bound.height;
            enName.style.textShadow = `${(x - 0.5) * 20}px ${(y - 0.5) * 20}px 0 var(--rindo-primary)`;
        });

        enName.addEventListener('mouseleave', () => {
            enName.style.textShadow = '4px 4px 0 var(--rindo-primary)';
        });
    }

    // Parallax background effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const iris = document.querySelector('.iris-overlay');
        if (iris) {
            iris.style.transform = `rotate(${scrolled * 0.05}deg) scale(${1 + scrolled * 0.0001})`;
        }
    });
});
