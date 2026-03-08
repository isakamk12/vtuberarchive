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

    // Scroll Reveal Observer (Synchronized with cp-reveal)
    const options = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, options);

    document.querySelectorAll('.cp-reveal, .cp-panel-reveal, .card').forEach(el => {
        observer.observe(el);
    });

    // Flickering "Divine" effect on avatar
    const avatar = document.querySelector('.avatar-shrine');
    if (avatar) {
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
    }

    console.log("SHRINE INTERFACE STABILIZED.");
});
