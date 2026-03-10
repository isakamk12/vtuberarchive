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

    // Dynamic Volume Meters
    const bars = document.querySelectorAll('.meter-bar');
    setInterval(() => {
        bars.forEach(bar => {
            const h = 20 + Math.random() * 70;
            bar.style.height = `${h}%`;
            if (h > 80) bar.style.background = '#ff4d4d';
            else bar.style.background = 'var(--rito-yellow)';
        });
    }, 150);

    // Lightning Bolts
    const boltContainer = document.getElementById('lightning-container');
    for (let i = 0; i < 5; i++) {
        const bolt = document.createElement('div');
        bolt.className = 'bolt';
        bolt.innerHTML = '<i class="fa-solid fa-bolt"></i>';
        bolt.style.left = `${Math.random() * 100}%`;
        bolt.style.top = `${Math.random() * 100}%`;
        bolt.style.animationDelay = `${Math.random() * 2}s`;
        boltContainer.appendChild(bolt);
    }

    // MAX VOLUME ROAR Interaction
    const roarBtn = document.getElementById('roar-btn');
    roarBtn.addEventListener('click', (e) => {
        // Ripple
        const ripple = document.createElement('div');
        ripple.className = 'roar-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);

        // Text Pop
        const shout = document.createElement('div');
        shout.className = 'roar-text';
        shout.innerText = 'U!!!';
        document.body.appendChild(shout);

        // Screen Shake
        document.body.style.animation = 'shake 0.2s 3';

        setTimeout(() => {
            ripple.remove();
            shout.remove();
            document.body.style.animation = '';
        }, 600);
    });

    // Musical Mode Toggle
    const musicalBtn = document.getElementById('musical-mode');
    const spotlightContainer = document.getElementById('spotlight-container');
    let isMusical = false;

    musicalBtn.addEventListener('click', () => {
        isMusical = !isMusical;
        if (isMusical) {
            document.body.classList.add('musical-active');
            musicalBtn.innerText = 'MUSICAL_MODE: ON';
            spawnSpotlights();
        } else {
            document.body.classList.remove('musical-active');
            musicalBtn.innerText = 'MUSICAL_MODE: OFF';
            spotlightContainer.innerHTML = '';
        }
    });

    const spawnSpotlights = () => {
        for (let i = 0; i < 3; i++) {
            const spot = document.createElement('div');
            spot.className = 'spotlight';
            spot.style.left = `${20 + i * 30}%`;
            spot.style.animationDelay = `${i * 0.5}s`;
            spotlightContainer.appendChild(spot);
        }
    };

    // Protein shake click effect
    document.addEventListener('mousedown', (e) => {
        if (Math.random() > 0.7) {
            const shake = document.createElement('div');
            shake.innerHTML = '🥤';
            shake.style.position = 'fixed';
            shake.style.left = `${e.clientX}px`;
            shake.style.top = `${e.clientY}px`;
            shake.style.fontSize = '2rem';
            shake.style.pointerEvents = 'none';
            shake.style.zIndex = '1000';
            document.body.appendChild(shake);

            shake.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-100px) rotate(360deg) scale(0)', opacity: 0 }
            ], { duration: 800 });
            setTimeout(() => shake.remove(), 800);
        }
    });
});

// Adding shake animation dynamically
if (!document.getElementById('shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.innerHTML = `
    @keyframes shake {
        0% { transform: translate(0,0); }
        25% { transform: translate(-10px, 10px); }
        50% { transform: translate(10px, -10px); }
        75% { transform: translate(-10px, -10px); }
        100% { transform: translate(0,0); }
    }
    `;
    document.head.appendChild(style);
}
