document.addEventListener('DOMContentLoaded', () => {
    // Generate Memory Meters
    const meterContainer = document.getElementById('memory-meter');
    if (meterContainer) {
        for (let i = 0; i < 15; i++) {
            const bar = document.createElement('div');
            bar.className = 'meter-bar';
            bar.style.height = `${20 + Math.random() * 80}%`;
            meterContainer.appendChild(bar);
        }

        // Animate meters
        setInterval(() => {
            const bars = meterContainer.querySelectorAll('.meter-bar');
            bars.forEach(bar => {
                const h = 20 + Math.random() * 80;
                bar.style.height = `${h}%`;
                bar.classList.toggle('active', h > 70);
            });
        }, 150);
    }

    // Scroll Transformation for Panels
    const panels = document.querySelectorAll('.panel');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.1 });

    panels.forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(30px) scale(0.98)';
        panel.style.transition = 'all 0.5s ease-out';
        observer.observe(panel);
    });

    // Flickering REC indicator
    const rec = document.querySelector('.status');
    if (rec) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                rec.style.visibility = 'hidden';
                setTimeout(() => rec.style.visibility = 'visible', 50);
            }
        }, 500);
    }

    // Random Glitch on Owl Icon
    const owl = document.querySelector('.player-section i');
    if (owl) {
        setInterval(() => {
            if (Math.random() > 0.97) {
                owl.style.color = 'var(--color-accent)';
                owl.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
                setTimeout(() => {
                    owl.style.color = '#1a1a1a';
                    owl.style.transform = 'translate(0, 0)';
                }, 100);
            }
        }, 1000);
    }

    console.log("CYBER CONSOLE SYNCED.");
});
