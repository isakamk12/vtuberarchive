// Mythic Talent — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const reveals = document.querySelectorAll('.my-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Nav shrink on scroll
    const nav = document.querySelector('.my-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Search functionality for the large roster
    const searchInput = document.getElementById('my-search');
    const cards = document.querySelectorAll('.my-talent-card');
    const countSpan = document.getElementById('talent-count');
    const noResults = document.getElementById('no-results');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            cards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                const tagsStr = card.querySelector('.my-talent-tags').textContent.toLowerCase();

                if (name.includes(term) || tagsStr.includes(term)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            countSpan.textContent = visibleCount;

            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        });
    }

    // Spark Particles for elegance
    const sparksContainer = document.getElementById('my-sparks');
    if (sparksContainer) {
        const numSparks = 25;
        for (let i = 0; i < numSparks; i++) {
            const spark = document.createElement('div');
            spark.classList.add('my-spark');

            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 8 + 4; // 4s to 12s

            spark.style.left = `${left}vw`;
            spark.style.animationDelay = `${delay}s`;
            spark.style.animationDuration = `${duration}s`;

            // Random opacity
            spark.style.opacity = Math.random() * 0.5 + 0.1;

            sparksContainer.appendChild(spark);
        }
    }
});


