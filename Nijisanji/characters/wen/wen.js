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

    // Floating Karaage
    const karaageLayer = document.querySelector('.karaage-layer');
    const createKaraage = () => {
        const food = document.createElement('div');
        food.className = 'karaage';
        food.innerHTML = '🍗';
        food.style.left = `${Math.random() * 100}%`;
        food.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
        food.style.animationDuration = `${Math.random() * 3 + 5}s`;
        karaageLayer.appendChild(food);
        setTimeout(() => food.remove(), 8000);
    };

    setInterval(createKaraage, 2000);

    // Whiskey Drips
    const dripLayer = document.querySelector('.whiskey-drip-layer');
    const createDrip = () => {
        const drip = document.createElement('div');
        drip.className = 'drip';
        drip.style.left = `${Math.random() * 100}%`;
        dripLayer.appendChild(drip);
        setTimeout(() => drip.remove(), 2100);
    };

    setInterval(createDrip, 300);

    // KP Button Interaction
    const kpBtn = document.getElementById('mode-toggle');
    kpBtn.addEventListener('click', (e) => {
        const cheers = document.createElement('div');
        cheers.className = 'cheers-text';
        cheers.innerText = 'KANPAI!!';
        cheers.style.left = `${e.clientX - 100}px`;
        cheers.style.top = `${e.clientY - 50}px`;
        document.body.appendChild(cheers);

        document.body.classList.add('kp-active');

        // Clinking glasses FX
        for (let i = 0; i < 5; i++) {
            const glass = document.createElement('div');
            glass.innerHTML = '🥃';
            glass.style.position = 'fixed';
            glass.style.left = `${e.clientX}px`;
            glass.style.top = `${e.clientY}px`;
            glass.style.fontSize = '2rem';
            glass.style.zIndex = '999';
            glass.style.transition = 'all 0.6s ease-out';
            document.body.appendChild(glass);

            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const dist = 100 + Math.random() * 50;
                glass.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${Math.random() * 360}deg)`;
                glass.style.opacity = '0';
                setTimeout(() => glass.remove(), 600);
            }, 10);
        }

        setTimeout(() => {
            document.body.classList.remove('kp-active');
            cheers.remove();
        }, 1200);
    });

    // Dino roar hover on silhouettes
    const dino = document.querySelector('.dino-silhouette');
    dino.addEventListener('mouseenter', () => {
        dino.style.transition = 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        dino.style.transform = 'translateX(-50%) scale(1.1) rotate(-5deg)';
        dino.style.opacity = '0.1';
    });
    dino.addEventListener('mouseleave', () => {
        dino.style.transform = 'translateX(-50%) scale(1) rotate(0deg)';
        dino.style.opacity = '0.05';
    });
});
