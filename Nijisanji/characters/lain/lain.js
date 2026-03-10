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

    // Crimson Heart Particles
    const createHeart = () => {
        const layer = document.querySelector('.crimson-heart-layer');
        if (!layer) return;

        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = Math.random() > 0.5 ? '❤' : '🔥';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${window.scrollY + window.innerHeight - 50}px`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;

        layer.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    };

    setInterval(createHeart, 1000);

    // GOD slayer Badge Appearance
    const badge = document.createElement('div');
    badge.className = 'god-slayer-badge';
    badge.innerText = 'GOD SLAYER';
    document.body.appendChild(badge);

    // Shark (Hohiro-san) surprise click
    document.addEventListener('click', (e) => {
        const shark = document.createElement('div');
        shark.style.position = 'fixed';
        shark.style.left = `${e.clientX - 25}px`;
        shark.style.top = `${e.clientY - 25}px`;
        shark.innerHTML = '🦈';
        shark.style.fontSize = '3rem';
        shark.style.pointerEvents = 'none';
        shark.style.transition = 'all 0.5s ease-out';
        shark.style.zIndex = '200';
        document.body.appendChild(shark);

        setTimeout(() => {
            shark.style.transform = 'scale(2.5) rotate(20deg)';
            shark.style.opacity = '0';
        }, 10);
        setTimeout(() => shark.remove(), 500);
    });

    // Parallax move for ammo strips
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const ammo = document.querySelector('.ammo-strips');
        if (ammo) {
            ammo.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
});
