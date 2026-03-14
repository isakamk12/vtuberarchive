// V4Mirai — Agency Script
document.addEventListener('DOMContentLoaded', () => {
    // 1. Digital Mist (Particles)
    const body = document.body;
    for (let i = 0; i < 20; i++) {
        const mist = document.createElement('div');
        mist.className = 'digital-mist';
        mist.style.left = `${Math.random() * 100}vw`;
        mist.style.animationDelay = `${Math.random() * 5}s`;
        mist.style.opacity = Math.random() * 0.3;
        body.appendChild(mist);
    }

    // 2. Intersection Observer for Reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => observer.observe(el));

    // 3. Dynamic Scanline (Active Tracker)
    const scanner = document.createElement('div');
    scanner.className = 'active-scanline';
    document.body.appendChild(scanner);

    window.addEventListener('scroll', () => {
        // Subtle perspective shift on scroll
        const scrolled = window.scrollY;
        document.body.style.backgroundPosition = `0 ${scrolled * 0.2}px`;
    });
});
