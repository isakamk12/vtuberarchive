document.addEventListener('DOMContentLoaded', () => {
    // HUD Flicker Effect
    const hudElements = document.querySelectorAll('.hud-corner, .avatar-container');
    setInterval(() => {
        if (Math.random() > 0.97) {
            hudElements.forEach(el => {
                el.style.opacity = '0.4';
                setTimeout(() => el.style.opacity = '1', 100);
            });
        }
    }, 150);

    // Stomach Gauge Pulse
    const gauge = document.querySelector('.eat-fill');
    if (gauge) {
        setInterval(() => {
            const pulse = 95 + Math.sin(Date.now() / 500) * 2;
            gauge.style.width = `${pulse}%`;
        }, 50);
    }

    // Scroll reveal logic for panels
    const panels = document.querySelectorAll('.panel');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    panels.forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        panel.style.transition = 'all 0.6s ease-out';
        observer.observe(panel);
    });

    console.log("ROYAL HUD INITIALIZED.");
});
