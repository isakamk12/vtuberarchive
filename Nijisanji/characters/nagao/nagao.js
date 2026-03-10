document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Talisman particles
    const createTalisman = () => {
        const container = document.querySelector('.talisman-particles');
        if (!container) return;

        const talisman = document.createElement('div');
        talisman.className = 'talisman';
        talisman.innerText = '☯ 桜魔 ☯';
        
        const startX = Math.random() * window.innerWidth;
        const duration = 5 + Math.random() * 5;
        
        talisman.style.left = `${startX}px`;
        talisman.style.top = `-120px`;
        talisman.style.transition = `transform ${duration}s linear, opacity ${duration}s ease-in`;
        
        container.appendChild(talisman);

        setTimeout(() => {
            talisman.style.transform = `translateY(${window.innerHeight + 200}px) rotate(${Math.random() * 360}deg)`;
            talisman.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            talisman.remove();
        }, duration * 1000);
    };

    setInterval(createTalisman, 2000);

    // Dynamic Header Glow
    const header = document.querySelector('.character-header');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (header) {
            header.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
});
