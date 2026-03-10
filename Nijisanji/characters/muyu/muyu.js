document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Clouds
    const createCloud = () => {
        const layer = document.getElementById('cloud-layer');
        if (!layer) return;
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const size = Math.random() * 200 + 100;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size * 0.6}px`;
        cloud.style.top = `${Math.random() * 80}%`;
        cloud.style.left = `-300px`;
        cloud.style.animationDuration = `${Math.random() * 10 + 20}s`;
        layer.appendChild(cloud);
        setTimeout(() => cloud.remove(), 30000);
    };

    for (let i = 0; i < 5; i++) createCloud();
    setInterval(createCloud, 5000);

    // Stars (Hidden initially)
    const starLayer = document.querySelector('.star-layer');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starLayer.appendChild(star);
    }

    // Mode Toggle
    const btn = document.getElementById('mode-toggle');
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dream-mode');
        if (document.body.classList.contains('dream-mode')) {
            btn.innerText = 'WAKE UP';
        } else {
            btn.innerText = 'TOGGLE DREAM MODE';
        }
    });

    // Bubble interaction
    document.addEventListener('click', (e) => {
        if (e.target.id === 'mode-toggle') return;

        const bubble = document.createElement('div');
        bubble.style.position = 'fixed';
        bubble.style.left = `${e.clientX - 10}px`;
        bubble.style.top = `${e.clientY - 10}px`;
        bubble.style.width = '20px';
        bubble.style.height = '20px';
        bubble.style.border = '2px solid var(--muyu-soft-blue)';
        bubble.style.borderRadius = '50%';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '1000';
        bubble.style.transition = 'all 0.6s ease-out';

        document.body.appendChild(bubble);

        setTimeout(() => {
            bubble.style.transform = 'scale(5) translateY(-50px)';
            bubble.style.opacity = '0';
        }, 10);
        setTimeout(() => bubble.remove(), 600);
    });
});
