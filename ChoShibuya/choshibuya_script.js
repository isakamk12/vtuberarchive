// ChoShibuya — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.street-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animated'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Simple parallax effect for grid background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const grid = document.querySelector('.neon-grid');
        if (grid) {
            grid.style.transform = `perspective(1000px) rotateX(45deg) translateY(${scrolled * 0.1}px)`;
        }
    });

    // Navigation scroll effect
    const nav = document.querySelector('.street-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = "1rem 4rem";
            nav.style.background = "rgba(10,10,10,0.95)";
        } else {
            nav.style.padding = "1.5rem 4rem";
            nav.style.background = "rgba(10,10,10,0.8)";
        }
    });

    // Card Log (Simulating street vibes)
    console.log("%c[CHO SHIBUYA] %cSYSTEM LOADED. ENJOY THE BEAT.", "color: #A855F7; font-weight: bold", "color: #fff");
});
