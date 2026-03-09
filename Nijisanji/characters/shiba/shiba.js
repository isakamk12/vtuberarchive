document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Paw print parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const pawLayer = document.querySelector('.paw-prints');
        if (pawLayer) {
            pawLayer.style.backgroundPositionY = -(scrolled * 0.1) + 'px';
        }
    });

    // Dog Barking (Visual)
    const catchphrase = document.querySelector('.catchphrase');
    if (catchphrase) {
        catchphrase.addEventListener('click', () => {
            const originalText = catchphrase.innerText;
            catchphrase.innerText = "バウワウ！ (Woof!)";
            catchphrase.style.backgroundColor = "var(--shiba-orange)";

            setTimeout(() => {
                catchphrase.innerText = originalText;
                catchphrase.style.backgroundColor = "var(--shiba-brown)";
            }, 800);
        });
    }

    // Bone Gum Interaction
    const cards = document.querySelectorAll('.lore-card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px) rotate(1deg)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0) rotate(0)';
        });
    });
});
