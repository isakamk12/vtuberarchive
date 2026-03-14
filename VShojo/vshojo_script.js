document.addEventListener('DOMContentLoaded', () => {
    // 1. Particle Spray for cards/buttons
    const cards = document.querySelectorAll('.brutal-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.3) return; // Limit particles
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            createSpray(card, x, y);
        });
    });

    function createSpray(parent, x, y) {
        const particle = document.createElement('div');
        const colors = ['#f900ff', '#00f3ff', '#9000ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        particle.style.borderRadius = '50%';
        
        parent.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${vx * 10}px, ${vy * 10}px)`, opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }

    // 2. Intersection Observer (Existing)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
