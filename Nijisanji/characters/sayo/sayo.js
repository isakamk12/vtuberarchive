document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Multiplication (Anti-Bot) Effect
    const header = document.querySelector('.character-header');
    const enName = document.querySelector('.en-name');
    const dupeLayer = document.querySelector('.duplication-layer');

    let isDuplicating = false;

    header.addEventListener('mouseenter', () => {
        if (isDuplicating) return;
        isDuplicating = true;

        for (let i = 0; i < 8; i++) {
            const clone = enName.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.top = '50%';
            clone.style.left = '50%';
            clone.style.transform = 'translate(-50%, -50%)';
            clone.style.opacity = '0.3';
            clone.style.zIndex = '1';
            clone.style.width = '100%';
            clone.classList.add('sayo-clone');
            dupeLayer.appendChild(clone);

            animateClone(clone, i);
        }
    });

    header.addEventListener('mouseleave', () => {
        isDuplicating = false;
        const clones = document.querySelectorAll('.sayo-clone');
        clones.forEach(c => c.remove());
    });

    function animateClone(el, index) {
        const speed = 0.5 + Math.random();
        const range = 50 + (index * 20);

        function move() {
            if (!isDuplicating) return;
            const x = Math.sin(Date.now() / 200 * speed) * range;
            el.style.transform = `translate(calc(-50% + ${x}px), -50%)`;
            requestAnimationFrame(move);
        }
        move();
    }

    // Audio glitch interaction? No, let's keep it visual.
    // Text scramble for "復帰"
    const loreCards = document.querySelectorAll('.lore-card');
    loreCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--sayo-red)';
            card.style.backgroundColor = 'rgba(139, 0, 0, 0.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--sayo-gray)';
            card.style.backgroundColor = 'transparent';
        });
    });
});
