// ProjectNebula — Agency Script
document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('stars');
    
    // 1. Star Genesis (Dynamic Generation)
    function createStars() {
        const count = 100;
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'pn-star';
            
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            const duration = Math.random() * 3 + 2;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starContainer.appendChild(star);
        }
    }
    
    if (starContainer) createStars();

    // 2. Stardust Hover Effect
    const cards = document.querySelectorAll('.pn-member-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            createStardust(e, card);
        });
    });

    function createStardust(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = 0; i < 2; i++) {
            const dust = document.createElement('div');
            dust.className = 'pn-stardust';
            dust.style.left = `${x}px`;
            dust.style.top = `${y}px`;
            
            const size = Math.random() * 4 + 2;
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            
            card.appendChild(dust);
            
            setTimeout(() => {
                dust.remove();
            }, 1000);
        }
    }

    // 3. Clickable Cards
    cards.forEach(card => {
        const link = card.querySelector('.pn-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });
});
