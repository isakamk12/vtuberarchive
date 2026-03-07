document.addEventListener('DOMContentLoaded', () => {
    // VU Meter Needle Animation
    const needle = document.getElementById('needle');
    if (needle) {
        setInterval(() => {
            // Simulate audio levels
            const angle = -45 + Math.random() * 90;
            const smoothAngle = angle * 0.8; // Avoid too much jitter
            needle.style.transform = `translateX(-50%) rotate(${smoothAngle}deg)`;
        }, 80);
    }

    // Ink Canvas Animation (Hero)
    const canvas = document.getElementById('ink-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let particles = [];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 2;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 30; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Rack Unit Reveal
    const units = document.querySelectorAll('.unit, .spec-block');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
            }
        });
    }, { threshold: 0.1 });

    units.forEach(unit => {
        unit.style.opacity = '0';
        unit.style.transform = 'translateY(20px)';
        unit.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        observer.observe(unit);
    });

    console.log("PIROPARU STUDIO LIVE.");
});
