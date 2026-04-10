/**
 * Irodori Post Office Archive System
 * Specialized for the Virtual Actor project archiving.
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('memberSearch');
    const memberGrid = document.getElementById('memberGrid');
    const memberCards = document.querySelectorAll('.member-card');

    /**
     * Search functionality
     */
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            memberCards.forEach(card => {
                const name = card.dataset.name.toLowerCase();
                const matches = name.includes(query);
                
                if (matches) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /**
     * Reveal on Scroll
     */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
