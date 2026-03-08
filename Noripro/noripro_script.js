/**
 * Noripro MangaFX Controller
 * Premium animations for the Creator agency
 */

class MangaFX {
    constructor() {
        this.speedContainer = document.getElementById('nr-speed-lines');
        this.init();
    }

    init() {
        if (!this.speedContainer) {
            console.warn("MangaFX: Speed lines container not found.");
        }
        this.createSpeedLines();
        this.handleScroll();
        this.handleMouseMove();
        this.initIntersectionObserver();
    }

    createSpeedLines() {
        if (!this.speedContainer) return;
        for (let i = 0; i < 30; i++) {
            const line = document.createElement('div');
            line.className = 'nr-speed-line';
            line.style.left = `${Math.random() * 100}%`;
            line.style.top = `${Math.random() * 100}%`;
            line.style.height = `${Math.random() * 300 + 100}px`;
            line.style.opacity = Math.random() * 0.5;
            line.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
            this.speedContainer.appendChild(line);
        }
    }

    handleScroll() {
        const threshold = 100;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled > threshold) {
                this.speedContainer?.classList.add('active');
            } else {
                this.speedContainer?.classList.remove('active');
            }

            // Parallax for speed lines
            const lines = document.querySelectorAll('.nr-speed-line');
            lines.forEach((line, i) => {
                const speed = 0.5 + (i % 5) * 0.1;
                line.style.transform = `translateY(${scrolled * speed}px) rotate(${i % 10 - 5}deg)`;
            });
        });
    }

    handleMouseMove() {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            const heroContent = document.querySelector('.nr-hero-content');
            if (heroContent) {
                heroContent.style.transform = `rotate(-1deg) translate(${x}px, ${y}px)`;
            }
        });
    }

    initIntersectionObserver() {
        if (this.observerInitialized) return;
        this.observerInitialized = true;

        const options = {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);

        document.querySelectorAll('.nr-reveal').forEach(el => {
            observer.observe(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MangaFX();
});
