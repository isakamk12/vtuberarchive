document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Simple Glitch Effect Simulation on Hover
    const heroName = document.querySelector('.en-name');
    heroName.addEventListener('mouseover', () => {
        heroName.style.textShadow = `2px 0 red, -2px 0 blue, 0 0 20px var(--glow)`;
    });
    heroName.addEventListener('mouseout', () => {
        heroName.style.textShadow = `0 0 20px var(--glow)`;
    });
});
