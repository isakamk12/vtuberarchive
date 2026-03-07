document.addEventListener('DOMContentLoaded', () => {
    // Generate Foxfire Particles
    const container = document.body;
    for (let i = 0; i < 15; i++) {
        const fire = document.createElement('div');
        fire.className = 'foxfire';
        fire.style.left = `${Math.random() * 100}vw`;
        fire.style.top = `${Math.random() * 100}vh`;
        fire.style.animationDelay = `${Math.random() * 5}s`;
        fire.style.animationDuration = `${3 + Math.random() * 4}s`;
        container.appendChild(fire);
    }

    // Scroll Reveal for Cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(card);
    });

    // Flickering "Divine" effect on avatar
    const avatar = document.querySelector('.avatar-shrine');
    setInterval(() => {
        if (Math.random() > 0.95) {
            avatar.style.borderColor = 'var(--color-gold)';
            avatar.style.boxShadow = '0 0 40px rgba(241, 196, 15, 0.4)';
            setTimeout(() => {
                avatar.style.borderColor = 'var(--color-inari)';
                avatar.style.boxShadow = 'var(--glow-inari)';
            }, 100);
        }
    }, 2000);

    console.log("SHRINE INTERFACE STABILIZED.");
});
