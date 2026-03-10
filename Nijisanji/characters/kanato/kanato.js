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

    // Pasta Drips
    const createPasta = () => {
        const layer = document.querySelector('.pasta-drip-layer');
        if (!layer) return;
        const drip = document.createElement('div');
        drip.className = 'pasta-drop';
        drip.style.left = `${Math.random() * 100}%`;
        drip.style.animationDuration = `${Math.random() * 3 + 2}s`;
        layer.appendChild(drip);
        setTimeout(() => drip.remove(), 5000);
    };

    setInterval(createPasta, 1000);

    // Personality Toggle
    const btnBibiri = document.getElementById('toggle-bibiri');
    const btnIkiri = document.getElementById('toggle-ikiri');

    btnBibiri.addEventListener('click', () => {
        btnBibiri.classList.add('active');
        btnIkiri.classList.remove('active');
        document.body.classList.remove('ikiri-mode');
    });

    btnIkiri.addEventListener('click', () => {
        btnIkiri.classList.add('active');
        btnBibiri.classList.remove('active');
        document.body.classList.add('ikiri-mode');
    });

    // Special click - Money/Chip effect
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') return;

        const chip = document.createElement('div');
        chip.style.position = 'fixed';
        chip.style.left = `${e.clientX - 10}px`;
        chip.style.top = `${e.clientY - 10}px`;
        chip.style.width = '20px';
        chip.style.height = '20px';
        chip.style.border = '2px dashed var(--kanato-gold)';
        chip.style.borderRadius = '50%';
        chip.style.pointerEvents = 'none';
        chip.style.zIndex = '1000';
        chip.style.transition = 'all 0.5s ease-out';
        chip.innerHTML = '<span style="color:var(--kanato-gold);font-size:10px;display:block;text-align:center;line-height:16px;">$</span>';

        document.body.appendChild(chip);

        setTimeout(() => {
            chip.style.transform = 'translateY(-100px) rotate(360deg)';
            chip.style.opacity = '0';
        }, 10);
        setTimeout(() => chip.remove(), 500);

        // If in Bibiri mode, add a jump effect to header on click
        if (btnBibiri.classList.contains('active')) {
            const header = document.querySelector('.header-inner');
            header.style.transition = 'none';
            header.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                header.style.transition = 'transform 0.1s';
                header.style.transform = 'translateY(0)';
            }, 50);
        }
    });
});
