document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
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

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Randomize Lore Card Accents
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B'];
    const cards = document.querySelectorAll('.lore-card');
    cards.forEach((card, index) => {
        card.style.borderColor = '#000';
        card.style.boxShadow = `6px 6px 0 ${colors[index % colors.length]}`;
    });

    // Title Hover Effect
    const title = document.querySelector('.en-name');
    if (title) {
        title.addEventListener('mouseover', () => {
            title.style.textShadow = '8px 8px 0 #000';
        });
        title.addEventListener('mouseout', () => {
            title.style.textShadow = '4px 4px 0 var(--accent-light)';
        });
    }
});
