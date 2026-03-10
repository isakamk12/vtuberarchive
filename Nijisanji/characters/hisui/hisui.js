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

    // Shark fin particles
    const createShark = () => {
        const container = document.querySelector('.shark-particles');
        if (!container) return;

        const shark = document.createElement('div');
        shark.className = 'shark-fin';
        shark.innerHTML = '<i class="fa-solid fa-person-swimming"></i>'; // Simplified fin representation

        const startY = Math.random() * window.innerHeight;
        const speed = 15 + Math.random() * 20;

        shark.style.top = `${startY}px`;
        shark.style.animationDuration = `${speed}s`;

        container.appendChild(shark);

        setTimeout(() => {
            shark.remove();
        }, speed * 1000);
    };

    setInterval(createShark, 5000);

    // Dynamic Data Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const matrix = document.querySelector('.matrix-data-layer');
        if (matrix) {
            matrix.style.backgroundPositionY = `${scrolled * 0.2}px`;
        }
    });
});
