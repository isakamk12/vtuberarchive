// Stellar Verse Productions (SVP) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.svp-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Navigation shrink
    const nav = document.querySelector('.svp-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Make entire member card clickable
    const cards = document.querySelectorAll('.svp-card');
    cards.forEach(card => {
        const link = card.querySelector('a.svp-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Warp Speed Background Animation (Starfield effect)
    const canvas = document.getElementById('svp-warp-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        let speedMult = 1;

        // Accelerate on click/hold, decelerate on release
        let isBoosting = false;

        // Mobile support
        window.addEventListener('mousedown', () => isBoosting = true);
        window.addEventListener('mouseup', () => isBoosting = false);
        window.addEventListener('touchstart', () => isBoosting = true);
        window.addEventListener('touchend', () => isBoosting = false);

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initStars();
        }

        class Star {
            constructor() {
                this.x = (Math.random() - 0.5) * width;
                this.y = (Math.random() - 0.5) * height;
                this.z = Math.random() * width;
                this.pz = this.z; // Previous z for lines

                // Color variation
                const colors = ['#EC4899', '#7C3AED', '#3B82F6', '#FFFFFF'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.z -= 5 * speedMult; // Speed

                if (this.z < 1) {
                    this.z = width;
                    this.x = (Math.random() - 0.5) * width;
                    this.y = (Math.random() - 0.5) * height;
                    this.pz = this.z;
                }
            }

            draw() {
                let sx = (this.x / this.z) * width + width / 2;
                let sy = (this.y / this.z) * height + height / 2;

                let px = (this.x / this.pz) * width + width / 2;
                let py = (this.y / this.pz) * height + height / 2;

                this.pz = this.z;

                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);

                // Determine line width based on depth
                let lw = (1 - this.z / width) * 3;
                ctx.lineWidth = lw;

                ctx.strokeStyle = this.color;
                ctx.stroke();
            }
        }

        function initStars() {
            stars = [];
            const count = Math.min(Math.floor(width / 2), 600); // Amount of stars
            for (let i = 0; i < count; i++) {
                stars.push(new Star());
            }
        }

        function animate() {
            // Speed logic
            if (isBoosting) {
                speedMult = Math.min(speedMult + 0.2, 5); // Max speed 5x
            } else {
                speedMult = Math.max(speedMult - 0.1, 1); // Normal speed 1x
            }

            // Create trail effect
            ctx.fillStyle = `rgba(5, 5, 5, ${isBoosting ? 0.2 : 0.8})`; // Less alpha = longer trails
            ctx.fillRect(0, 0, width, height);

            ctx.translate(width / 2, height / 2);
            ctx.translate(-width / 2, -height / 2);

            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
                stars[i].draw();
            }

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }
});
