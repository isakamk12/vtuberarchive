document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Feather Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const feather = document.querySelector('.feather-pattern');
        if (feather) {
            feather.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Random Hina-P Quote interaction
    const catchphrase = document.querySelector('.catchphrase');
    const quotes = [
        "「ことりさんたち ぴよぴよ、あすかひなだよ」",
        "「ぴーぴー あすかひなでした、またね」",
        "「クビにならない限りは辞めないよ」",
        "「健康で長生きしてね」"
    ];

    catchphrase.addEventListener('click', () => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        catchphrase.textContent = randomQuote;
        catchphrase.style.transform = 'scale(1.1)';
        setTimeout(() => catchphrase.style.transform = 'scale(1)', 200);
    });

    // Lore card color bounce
    const cards = document.querySelectorAll('.lore-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--hina-blue)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--hina-pink)';
        });
    });
});
