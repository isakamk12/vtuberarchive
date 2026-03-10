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

    // Flamingo & Heart particles
    const createFlamingo = () => {
        const container = document.querySelector('.flamingo-particles');
        if (!container) return;

        const flamingo = document.createElement('div');
        flamingo.className = 'flamingo';
        flamingo.innerHTML = '🦩';

        const startX = Math.random() * window.innerWidth;
        const duration = 10 + Math.random() * 10;

        flamingo.style.left = `${startX}px`;
        flamingo.style.animationDuration = `${duration}s`;

        container.appendChild(flamingo);

        setTimeout(() => flamingo.remove(), duration * 1000);
    };

    setInterval(createFlamingo, 3000);

    // Spotlight mouse follow
    const spotlight = document.querySelector('.spotlight');
    document.addEventListener('mousemove', (e) => {
        if (spotlight) {
            spotlight.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(255, 255, 255, 0.4) 0%, transparent 40%)`;
        }
    });

    // Heart trail
    document.addEventListener('click', (e) => {
        const trail = document.querySelector('.heart-trail-layer');
        const heart = document.createElement('div');
        heart.innerHTML = '💞';
        heart.style.position = 'absolute';
        heart.style.left = `${e.clientX - 10}px`;
        heart.style.top = `${e.clientY - 10}px`;
        heart.style.transition = 'all 1s ease-out';
        heart.style.pointerEvents = 'none';

        trail.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translateY(-100px) scale(2)`;
            heart.style.opacity = '0';
        }, 10);

        setTimeout(() => heart.remove(), 1000);
    });
});
