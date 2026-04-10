/**
 * LightUp Agency Archive System
 * Handles member filtering, search, and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('memberSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');

    /**
     * Filter Logic
     */
    const updateRoster = () => {
        const query = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

        memberCards.forEach(card => {
            const name = card.dataset.name.toLowerCase();
            const unit = card.dataset.unit;
            const matchesSearch = name.includes(query);
            const matchesFilter = activeFilter === 'all' || unit === activeFilter;

            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                // Trigger animation reset
                card.style.animation = 'none';
                card.offsetHeight; // trigger reflow
                card.style.animation = null;
            } else {
                card.style.display = 'none';
            }
        });
    };

    /**
     * Event Listeners
     */
    searchInput.addEventListener('input', updateRoster);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateRoster();
        });
    });

    /**
     * Scroll Reveal Logic
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
