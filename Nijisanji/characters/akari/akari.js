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

    // Stars background
    const starLayer = document.querySelector('.star-layer');
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '<i class="fa-solid fa-star"></i>';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.fontSize = `${Math.random() * 1 + 0.5}rem`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starLayer.appendChild(star);
    }

    // GAO! Button - Screaming Jitter
    const gaoBtn = document.getElementById('mode-toggle');
    gaoBtn.addEventListener('click', () => {
        document.body.classList.add('screaming-mode');

        // Spawn "AAAAAAAAA" text
        const scream = document.createElement('div');
        scream.className = 'scream-text';
        scream.innerText = 'GAOOOO!!!';
        scream.style.left = `${Math.random() * 40 + 20}%`;
        scream.style.top = `${Math.random() * 40 + 20}%`;
        scream.style.transform = `rotate(${(Math.random() - 0.5) * 40}deg)`;
        document.body.appendChild(scream);

        setTimeout(() => {
            document.body.classList.remove('screaming-mode');
            scream.style.transition = 'all 0.5s ease-out';
            scream.style.opacity = '0';
            scream.style.transform += ' scale(2)';
            setTimeout(() => scream.remove(), 500);
        }, 1200);
    });

    // Cat paw print on click
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return;

        const paw = document.createElement('div');
        paw.style.position = 'fixed';
        paw.style.left = `${e.clientX - 25}px`;
        paw.style.top = `${e.clientY - 25}px`;
        paw.style.fontSize = '2rem';
        paw.style.color = 'var(--akari-yellow)';
        paw.style.pointerEvents = 'none';
        paw.style.zIndex = '50';
        paw.innerHTML = '<i class="fa-solid fa-paw"></i>';
        paw.style.transition = 'all 0.8s ease-out';
        paw.style.opacity = '0.4';

        document.body.appendChild(paw);

        setTimeout(() => {
            paw.style.transform = 'translateY(-20px)';
            paw.style.opacity = '0';
            setTimeout(() => paw.remove(), 800);
        }, 10);
    });

    // Stamina Ticker Scroll
    const ticker = document.querySelector('.stamina-ticker');
    let offset = 0;
    const scrollTicker = () => {
        offset -= 1;
        if (offset < -500) offset = window.innerWidth;
        ticker.style.paddingLeft = `${offset}px`;
        requestAnimationFrame(scrollTicker);
    };
    scrollTicker();
});
