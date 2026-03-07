document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Bubbles
    const container = document.getElementById('bubbles-container');
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 40 + 10;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDuration = (Math.random() * 5 + 5) + 's';
        bubble.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(bubble);
    }

    // 2. Animate Gacha Luck Meter
    const luckFill = document.getElementById('luck-fill');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            luckFill.style.width = (Math.random() * 20 + 80) + '%'; // Lucky high values
            observer.unobserve(luckFill);
        }
    });
    observer.observe(luckFill);

    // 3. Spata (SuperChat) Deletion Humor
    // If user hovers over "Episodes" or specific text, briefly "hide" them as if deleted
    const spataCard = document.querySelector('.glass-card:nth-child(5)'); // Episodes or similar
    if (spataCard) {
        spataCard.addEventListener('dblclick', () => {
            spataCard.style.opacity = '0';
            setTimeout(() => {
                spataCard.style.opacity = '1';
                alert("スパチャ（言論統制）を解除しました。");
            }, 1000);
        });
    }

    // 4. Scroll Reveal
    const cards = document.querySelectorAll('.glass-card, .hero, .unit-banner');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.animate([
                        { opacity: 0, transform: 'translateY(30px) scale(0.95)' },
                        { opacity: 1, transform: 'translateY(0) scale(1)' }
                    ], {
                        duration: 800,
                        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
                        fill: 'forwards'
                    });
                }, i * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        revealObserver.observe(card);
    });

    console.log("LUCCICA_GHOST_LINK_ESTABLISHED.");
});
