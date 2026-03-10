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

    // Rose Petals
    const createPetal = () => {
        const layer = document.querySelector('.rose-particle-layer');
        if (!layer) return;
        const petal = document.createElement('div');
        petal.className = 'rose-petal';
        petal.innerHTML = '🌸';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        layer.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    };

    setInterval(createPetal, 1000);

    // Gastroscopy Modal
    const modal = document.getElementById('gastroscopy-modal');
    const btn = document.getElementById('reveal-inner-self');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function () {
        modal.style.display = 'block';
    }

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Special click - "O-herb" / Grass spawning
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return;

        const grass = document.createElement('div');
        grass.style.position = 'fixed';
        grass.style.left = `${e.clientX - 15}px`;
        grass.style.top = `${e.clientY - 15}px`;
        grass.style.fontSize = '2rem';
        grass.style.pointerEvents = 'none';
        grass.style.zIndex = '1100';
        grass.innerHTML = '🌿';
        grass.style.transition = 'all 1s cubic-bezier(0.18, 0.89, 0.32, 1.28)';

        document.body.appendChild(grass);

        setTimeout(() => {
            grass.style.transform = `translateY(-100px) rotate(${Math.random() * 360}deg) scale(2)`;
            grass.style.opacity = '0';
        }, 10);
        setTimeout(() => grass.remove(), 1000);
    });

    // Ringlet rotation on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const stencil = document.querySelector('.scorpion-stencil');
        if (stencil) {
            stencil.style.transform = `rotate(${-15 + scrolled * 0.05}deg)`;
        }
    });
});
