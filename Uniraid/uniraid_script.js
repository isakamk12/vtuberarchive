// Uniraid! — Project Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.uniraid-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animated'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Simple particle effect (Sky motes)
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.position = 'absolute';
            particle.style.background = 'white';
            particle.style.opacity = Math.random() * 0.5;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.borderRadius = '50%';

            // Random floating animation
            particle.animate([
                { transform: 'translateY(0)', opacity: particle.style.opacity },
                { transform: `translateY(-${Math.random() * 100 + 50}px)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                iterations: Infinity,
                delay: Math.random() * 2000
            });

            particleContainer.appendChild(particle);
        }
    }
});
