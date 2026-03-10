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

    // Voxel/Block particles
    const createVoxel = () => {
        const container = document.querySelector('.voxel-particles');
        if (!container) return;

        const voxel = document.createElement('div');
        voxel.className = 'voxel';

        const size = 10 + Math.random() * 20;
        voxel.style.width = `${size}px`;
        voxel.style.height = `${size}px`;

        const startX = Math.random() * window.innerWidth;
        const duration = 10 + Math.random() * 10;

        voxel.style.left = `${startX}px`;
        voxel.style.bottom = `-50px`;
        voxel.style.transition = `transform ${duration}s linear, opacity ${duration}s ease-in`;

        container.appendChild(voxel);

        setTimeout(() => {
            voxel.style.transform = `translateY(${-window.innerHeight - 200}px) rotate(${Math.random() * 720}deg)`;
            voxel.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            voxel.remove();
        }, duration * 1000);
    };

    setInterval(createVoxel, 1500);
});
