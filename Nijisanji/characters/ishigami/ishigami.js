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

    // Mode Toggle - Evil Eye
    const btn = document.getElementById('mode-toggle');
    btn.addEventListener('click', () => {
        document.body.classList.toggle('evil-eye-mode');
        if (document.body.classList.contains('evil-eye-mode')) {
            btn.innerText = 'SEAL EVIL EYE';

            // Random red splatter on activation
            const splatter = document.createElement('div');
            splatter.style.position = 'fixed';
            splatter.style.top = `${Math.random() * 80}%`;
            splatter.style.left = `${Math.random() * 80}%`;
            splatter.style.width = '300px';
            splatter.style.height = '300px';
            splatter.style.background = 'radial-gradient(circle, var(--ishigami-red) 0%, transparent 70%)';
            splatter.style.opacity = '0.3';
            splatter.style.zIndex = '99';
            splatter.style.pointerEvents = 'none';
            document.body.appendChild(splatter);
            setTimeout(() => splatter.remove(), 2000);

        } else {
            btn.innerText = 'RELEASE EVIL EYE';
        }
    });

    // Ink Splatter effect on click
    document.addEventListener('click', (e) => {
        if (e.target.id === 'mode-toggle') return;

        const splat = document.createElement('div');
        splat.style.position = 'fixed';
        splat.style.left = `${e.clientX - 20}px`;
        splat.style.top = `${e.clientY - 20}px`;
        splat.style.width = '40px';
        splat.style.height = '40px';
        splat.style.background = 'var(--ishigami-red)';
        splat.style.borderRadius = '50%';
        splat.style.opacity = '0.4';
        splat.style.pointerEvents = 'none';
        splat.style.zIndex = '1000';
        splat.style.transform = 'scale(0)';
        splat.style.transition = 'all 0.5s ease-out';

        document.body.appendChild(splat);

        setTimeout(() => {
            splat.style.transform = `scale(${Math.random() * 2 + 1}) translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px)`;
            splat.style.opacity = '0';
        }, 10);
        setTimeout(() => splat.remove(), 500);
    });
});
