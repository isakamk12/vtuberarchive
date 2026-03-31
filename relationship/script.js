/**
 * Relationship Archive - Interaction Logic
 * 2026 VTuber Industry Data Visualizer
 */

 document.addEventListener('DOMContentLoaded', () => {
    // 1. Entrance Animation - Horizontal Slide
    setTimeout(() => {
        document.body.classList.add('is-loaded');
    }, 100);

    // 2. Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 3. Scroll Reveal Animation for Sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.rel-section');
    sections.forEach(section => {
        section.classList.add('reveal-init');
        observer.observe(section);
    });

    // 4. Subtle Parallax for Background Orbs
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');

        if (orb1) orb1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        if (orb2) orb2.style.transform = `translate(${-x * 30}px, ${-y * 30}px)`;
    });

    // 5. Card Hover Sound FX - Console Logic (Placeholder for future SFX)
    const cards = document.querySelectorAll('.node-item, .node-card, .leaf-item, .entities-cloud span');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Future: play slight click/hover sound
        });
    });
});

// Reveal Animation Setup
const revealStyles = document.createElement('style');
revealStyles.innerHTML = `
    .reveal-init {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);
