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

    // Multi-layer parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Grid parallax
        const grid = document.querySelector('.neon-grid');
        if (grid) {
            grid.style.transform = `perspective(1000px) rotateX(45deg) translateY(${scrolled * 0.15}px)`;
        }

        // Graffiti parallax
        const graffiti = document.querySelector('.graffiti-layer');
        if (graffiti) {
            graffiti.style.transform = `translateX(${scrolled * -0.2}px)`;
        }

        // Glow parallax
        const glow = document.querySelector('.street-glow');
        if (glow) {
            glow.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.05}px)`;
        }
    });

    // Enhanced navigation scroll effect
    const nav = document.querySelector('.street-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.style.padding = "0.8rem 4rem";
            nav.style.background = "rgba(10,10,10,0.92)";
            nav.style.backdropFilter = "blur(15px)";
            nav.style.borderBottomColor = "rgba(168, 85, 247, 0.3)";
        } else {
            nav.style.padding = "1.5rem 4rem";
            nav.style.background = "rgba(10,10,10,0.8)";
            nav.style.backdropFilter = "blur(10px)";
            nav.style.borderBottomColor = "rgba(255, 255, 255, 0.05)";
        }
    });

    // Card Log (Simulating street vibes)
    console.log("%c[CHO SHIBUYA] %cSYSTEM LOADED. ENJOY THE BEAT.", "color: #A855F7; font-weight: bold", "color: #fff");
});
