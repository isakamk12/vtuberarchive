// Valiv — Agency Script
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.vl-member-card');
    
    // 1. Glass Ripple Effect (on click)
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'vl-glass-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Navigation
            const link = this.querySelector('.vl-member-name');
            if (link && !e.target.closest('a')) {
                setTimeout(() => {
                    window.location.href = link.href;
                }, 400);
            }
        });
    });

    // 2. Floating Nodes Parallax
    const bgContainer = document.querySelector('.vl-bg');
    if (bgContainer) {
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.className = 'vl-bg-node';
            const size = Math.random() * 80 + 20;
            node.style.width = `${size}px`;
            node.style.height = `${size}px`;
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.animationDelay = `${Math.random() * 5}s`;
            bgContainer.appendChild(node);
        }
    }

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const nodes = document.querySelectorAll('.vl-bg-node');
        nodes.forEach(node => {
            const speed = 20;
            node.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
});


