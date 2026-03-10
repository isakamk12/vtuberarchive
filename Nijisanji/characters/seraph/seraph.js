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

    // Violin Strings (Fixed horizontal lines)
    const stringLayer = document.querySelector('.violin-string-layer');
    for (let i = 0; i < 4; i++) {
        const str = document.createElement('div');
        str.className = 'violin-string';
        str.style.top = `${25 + i * 15}%`;
        stringLayer.appendChild(str);
    }

    // Owl Feathers
    const createFeather = () => {
        const layer = document.querySelector('.owl-feather-layer');
        if (!layer) return;
        const feather = document.createElement('div');
        feather.className = 'feather';
        feather.innerHTML = '<i class="fa-solid fa-feather"></i>';
        feather.style.left = `${Math.random() * -10}%`;
        feather.style.top = `${Math.random() * 100}%`;
        feather.style.animationDuration = `${Math.random() * 5 + 8}s`;
        layer.appendChild(feather);
        setTimeout(() => feather.remove(), 12000);
    };

    setInterval(createFeather, 2000);

    // Glitch effect on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (Math.abs(currentScroll - lastScroll) > 100) {
            const overlay = document.querySelector('.glitch-overlay');
            overlay.classList.add('glitch-active');
            setTimeout(() => overlay.classList.remove('glitch-active'), 200);
            lastScroll = currentScroll;
        }
    });

    // Special click - Pizzicato Sound Effect (Visual)
    document.addEventListener('click', (e) => {
        const pizz = document.createElement('div');
        pizz.style.position = 'fixed';
        pizz.style.left = `${e.clientX}px`;
        pizz.style.top = `${e.clientY}px`;
        pizz.style.color = 'var(--seraph-crimson)';
        pizz.style.fontFamily = 'Oswald, sans-serif';
        pizz.style.fontWeight = 'bold';
        pizz.style.pointerEvents = 'none';
        pizz.style.zIndex = '1000';
        pizz.innerText = 'PIZZ.';
        pizz.style.transition = 'all 0.4s ease-out';

        document.body.appendChild(pizz);

        setTimeout(() => {
            pizz.style.transform = 'translateY(-30px) scale(1.5)';
            pizz.style.opacity = '0';
        }, 10);
        setTimeout(() => pizz.remove(), 400);

        // Strings vibrate on click nearby
        document.querySelectorAll('.violin-string').forEach(s => {
            const rect = s.getBoundingClientRect();
            if (Math.abs(e.clientY - rect.top) < 50) {
                s.style.transition = 'none';
                s.style.transform = 'translateY(-50%) skewY(1deg)';
                setTimeout(() => {
                    s.style.transition = 'transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
                    s.style.transform = 'translateY(-50%) skewY(0)';
                }, 50);
            }
        });
    });
});
