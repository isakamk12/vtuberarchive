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

    // Sunbeam rotation
    const beam = document.querySelector('.sunbeam-layer');
    if (beam) {
        let angle = 0;
        setInterval(() => {
            angle += 0.1;
            beam.style.transform = `rotate(${angle}deg)`;
        }, 50);
    }

    // Tomato Warning Easter Egg
    const createTomatoWarning = () => {
        const warning = document.createElement('div');
        warning.className = 'tomato-warning';
        warning.innerHTML = '🍅 TOMATO DETECTED!';
        document.body.appendChild(warning);

        const showWarning = () => {
            warning.style.display = 'block';
            setTimeout(() => {
                warning.style.display = 'none';
            }, 3000);
        };

        // Randomly show warning
        setInterval(() => {
            if (Math.random() > 0.95) showWarning();
        }, 10000);
    };

    createTomatoWarning();

    // Guitar string interaction (simple line particles)
    document.addEventListener('mousedown', () => {
        const glow = document.querySelector('.sun-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle, var(--kaida-cyan) 0%, transparent 70%)`;
        }
    });

    document.addEventListener('mouseup', () => {
        const glow = document.querySelector('.sun-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle, var(--kaida-yellow) 0%, transparent 70%)`;
        }
    });
});
