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

    // Clovers
    const createClover = () => {
        const container = document.querySelector('.clover-particles');
        if (!container) return;
        const clover = document.createElement('div');
        clover.className = 'clover-particle';
        clover.innerHTML = '🍀';
        clover.style.left = `${Math.random() * 100}%`;
        clover.style.animationDuration = `${Math.random() * 5 + 5}s`;
        clover.style.opacity = Math.random() * 0.3 + 0.1;
        container.appendChild(clover);
        setTimeout(() => clover.remove(), 10000);
    };

    setInterval(createClover, 1500);

    // Shrimp Float
    const shrimpContainer = document.querySelector('.floating-shrimp-container');
    for (let i = 0; i < 3; i++) {
        const shrimp = document.createElement('div');
        shrimp.className = 'shrimp-float';
        shrimp.innerHTML = '🦐';
        shrimp.style.left = `${Math.random() * 80 + 10}%`;
        shrimp.style.top = `${Math.random() * 80 + 10}%`;
        shrimp.style.animationDelay = `${i * 3}s`;
        shrimpContainer.appendChild(shrimp);
    }

    // Spinal Talk interaction
    const phrases = [
        "一旦、一旦ね！",
        "あんにょー！",
        "七転び八起きです！",
        "エビ、食べたいな...",
        "妹ちゃんかわええ～",
        "数え役満！？うそぉ！？"
    ];

    document.addEventListener('click', (e) => {
        const bubble = document.createElement('div');
        bubble.style.position = 'fixed';
        bubble.style.left = `${e.clientX}px`;
        bubble.style.top = `${e.clientY - 20}px`;
        bubble.style.background = 'var(--yotsuha-yellow)';
        bubble.style.padding = '5px 15px';
        bubble.style.borderRadius = '20px';
        bubble.style.fontSize = '0.9rem';
        bubble.style.fontWeight = 'bold';
        bubble.style.pointerEvents = 'none';
        bubble.style.zIndex = '1000';
        bubble.style.transition = 'all 0.5s ease-out';
        bubble.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        document.body.appendChild(bubble);

        setTimeout(() => {
            bubble.style.transform = 'translateY(-50px)';
            bubble.style.opacity = '0';
        }, 10);
        setTimeout(() => bubble.remove(), 500);
    });
});
