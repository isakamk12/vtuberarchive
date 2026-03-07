// Stellaverse Production — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.sv-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Navigation shrink
    const nav = document.querySelector('.sv-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Make entire member card clickable
    const cards = document.querySelectorAll('.sv-card');
    cards.forEach(card => {
        const link = card.querySelector('a.sv-card-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Dynamic Constellation Background
    const canvas = document.getElementById('sv-constellation');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        const STAR_COUNT = 150; // Depending on screen size later
        // Mouse interaction
        let mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initStars();
        }

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3; // Very slow movement
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 0.5;
                // Brightness
                this.baseAlpha = Math.random() * 0.5 + 0.1;
                this.alpha = this.baseAlpha;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(253, 224, 71, ${this.alpha})`; // Gold color
                ctx.fill();
            }

            update() {
                // Movement
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges smoothly
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;

                // Mouse interaction - slightly dodge mouse
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        this.alpha = Math.min(this.baseAlpha + 0.5, 1); // brighten up
                    } else {
                        // Return to base alpha
                        if (this.alpha > this.baseAlpha) {
                            this.alpha -= 0.01;
                        }
                    }
                }

                this.draw();
            }
        }

        function initStars() {
            stars = [];
            const count = Math.floor((width * height) / 15000) || 50;
            const finalCount = Math.min(Math.max(count, 50), 250); // bounds

            for (let i = 0; i < finalCount; i++) {
                stars.push(new Star());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < stars.length; i++) {
                stars[i].update();

                // Connect nearby stars with lines
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        // Connections become stronger near the mouse
                        let lineOpacity = (1 - (distance / 100)) * 0.2;

                        if (mouse.x != null && mouse.y != null) {
                            let mouseDist = Math.min(
                                Math.sqrt((mouse.x - stars[i].x) ** 2 + (mouse.y - stars[i].y) ** 2),
                                Math.sqrt((mouse.x - stars[j].x) ** 2 + (mouse.y - stars[j].y) ** 2)
                            );
                            if (mouseDist < 150) {
                                lineOpacity *= 3; // Make lines near mouse much brighter
                            }
                        }

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(253, 224, 71, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    }
});
