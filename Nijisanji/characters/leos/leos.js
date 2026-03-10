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

    // IQ Counter
    const counter = document.getElementById('iq-counter');
    let targetIQ = 10000;
    let currentIQ = 0;

    const updateIQ = () => {
        if (currentIQ < targetIQ) {
            currentIQ += Math.floor(targetIQ / 50);
            if (currentIQ > targetIQ) currentIQ = targetIQ;
            counter.innerText = currentIQ.toLocaleString();
            setTimeout(updateIQ, 20);
        } else {
            // Randomly jump for "Madness"
            setInterval(() => {
                const shift = Math.floor(Math.random() * 1000000);
                counter.innerText = (10000 + shift).toLocaleString() + " 垓";
            }, 3000);
        }
    };

    updateIQ();

    // Chemical Bubbles
    const createBubble = () => {
        const container = document.querySelector('.chemical-bubbles');
        if (!container) return;
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 30 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
        container.appendChild(bubble);
        setTimeout(() => bubble.remove(), 10000);
    };

    setInterval(createBubble, 1000);

    // Mame-neko Floor
    const floor = document.querySelector('.mameneko-floor');
    for (let i = 0; i < 5; i++) {
        const icon = document.createElement('div');
        icon.className = 'mameneko-icon';
        icon.innerHTML = '😺';
        icon.style.animationDelay = `${i * 0.4}s`;
        floor.appendChild(icon);
    }

    // Click to spawn Mame-neko
    document.addEventListener('click', (e) => {
        const pet = document.createElement('div');
        pet.style.position = 'fixed';
        pet.style.left = `${e.clientX - 10}px`;
        pet.style.top = `${e.clientY - 10}px`;
        pet.innerHTML = '😺';
        pet.style.fontSize = '2rem';
        pet.style.pointerEvents = 'none';
        pet.style.transition = 'all 0.8s ease-out';
        pet.style.zIndex = '200';
        document.body.appendChild(pet);

        setTimeout(() => {
            pet.style.transform = 'translateY(-100px) rotate(360deg)';
            pet.style.opacity = '0';
        }, 10);
        setTimeout(() => pet.remove(), 800);
    });
});
