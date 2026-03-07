document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section-view');

    // Navigation Logic
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (!target) return; // Exit button or similar

            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === target) {
                    sec.classList.add('active');
                }
            });

            // Scroll to top of display on change
            document.querySelector('.console-display').scrollTop = 0;
        });
    });

    // Simple Glitch & Glow Flicker FX
    setInterval(() => {
        const glowElements = document.querySelectorAll('.chip, .avatar-frame, .title-ja');
        glowElements.forEach(el => {
            if (Math.random() > 0.98) {
                el.style.opacity = '0.5';
                setTimeout(() => el.style.opacity = '1', 150);
            }
        });
    }, 100);

    // Initial message or console-like appearance
    console.log("MUD-SHIP OS Initialized...");
});
