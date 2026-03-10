document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Tea Steam Particles
    const createSteam = () => {
        const layer = document.querySelector('.tea-steam-layer');
        if (!layer) return;

        const particle = document.createElement('div');
        particle.className = 'steam-particle';

        const size = Math.random() * 40 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 4 + 4}s`;

        layer.appendChild(particle);
        setTimeout(() => particle.remove(), 8000);
    };

    setInterval(createSteam, 800);

    // Parallax background move
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallax = document.querySelector('.academic-parallax');
        if (parallax) {
            parallax.style.backgroundPositionY = `${scrolled * 0.2}px`;
        }
    });

    // Custom Header Interaction
    const header = document.getElementById('main-header');
    header.addEventListener('mousemove', (e) => {
        const glow = document.querySelector('.tea-glow');
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;
    });
});
