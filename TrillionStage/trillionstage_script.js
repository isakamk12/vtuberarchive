// TRILLIONSTAGE — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.stage-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animated'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Scroll effect for nav
    const nav = document.querySelector('.stage-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = "1rem 4rem";
            nav.style.background = "rgba(3,4,10,0.95)";
        } else {
            nav.style.padding = "1.5rem 4rem";
            nav.style.background = "rgba(3,4,10,0.8)";
        }
    });

    // Random star twinkling
    const stars = document.querySelector('.stars');
    if (stars) {
        setInterval(() => {
            stars.style.opacity = Math.random() * 0.3 + 0.1;
        }, 3000);
    }

    console.log("%c[TRILLIONSTAGE] %cREADY FOR DEPLOYMENT.", "color: #D4AF37; font-weight: bold", "color: #00F5FF");
});
