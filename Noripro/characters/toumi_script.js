document.addEventListener('DOMContentLoaded', () => {
    // 1. Matrix/Math Stream Animation
    const matrixContainer = document.getElementById('matrix-strings');
    const mathChars = 'sin(θ) cos(φ) Σ Δ λ π √x ∫ dy 010101 < > { } ;'.split(' ');

    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = mathChars[Math.floor(Math.random() * mathChars.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + 'vw';
        span.style.top = Math.random() * 100 + 'vh';
        span.style.opacity = Math.random() * 0.3;
        matrixContainer.appendChild(span);

        animateString(span);
    }

    function animateString(el) {
        el.animate([
            { transform: 'translateY(0)', opacity: 0 },
            { opacity: 0.3, offset: 0.5 },
            { transform: 'translateY(100px)', opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 3000,
            iterations: Infinity,
            easing: 'linear'
        });
    }

    // 2. Smash Bros Combat Power Counting
    const combatPower = document.getElementById('combat-power');
    if (combatPower) {
        let current = 12000000;
        const target = 13540201; // Specific VIP number feel
        const step = Math.floor((target - current) / 100);

        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            combatPower.innerText = current.toLocaleString();
        }, 20);
    }

    // 3. Jellyfish Canvas (Sine Wave Movement)
    const canvas = document.getElementById('jellyfish-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let time = 0;

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#00e5ff';
            ctx.lineWidth = 1;

            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                const offsetX = (canvas.width / 8) * i + 10;
                for (let y = 150; y < 300; y += 5) {
                    const x = offsetX + Math.sin(y * 0.02 + time + i) * 15;
                    if (y === 150) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            time += 0.05;
            requestAnimationFrame(draw);
        }
        draw();
    }

    // 4. Scroll Reveal
    const modules = document.querySelectorAll('.module');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.animate([
                        { opacity: 0, transform: 'scale(0.9) translateY(20px)' },
                        { opacity: 1, transform: 'scale(1) translateY(0)' }
                    ], {
                        duration: 600,
                        easing: 'ease-out',
                        fill: 'forwards'
                    });
                }, i * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    modules.forEach(m => {
        m.style.opacity = '0';
        observer.observe(m);
    });

    console.log("DIGITAL_ABYSS_CORE_STABLE.");
});
