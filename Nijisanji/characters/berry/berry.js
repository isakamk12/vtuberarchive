document.addEventListener('DOMContentLoaded', () => {
    // Batapi-san Follow Effect
    const batapi = document.getElementById('batapi');
    let mouseX = 0, mouseY = 0;
    let batapiX = 0, batapiY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateBatapi() {
        const dx = mouseX - batapiX;
        const dy = mouseY - batapiY;
        batapiX += dx * 0.05;
        batapiY += dy * 0.05;
        batapi.style.left = (batapiX + 15) + 'px';
        batapi.style.top = (batapiY + 15) + 'px';
        requestAnimationFrame(animateBatapi);
    }
    animateBatapi();

    // Butter Churner Interaction
    const bottle = document.getElementById('bottle');
    const butterText = document.getElementById('butter-text');
    let shakeCount = 0;
    let lastX = 0;

    document.addEventListener('mousemove', (e) => {
        const speed = Math.abs(e.clientX - lastX);
        lastX = e.clientX;

        if (speed > 50) {
            shakeCount++;
            bottle.style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(1.2)`;

            if (shakeCount > 100 && !bottle.isButter) {
                bottle.textContent = '🧈';
                bottle.isButter = true;
                butterText.textContent = 'ばたぴぃさんが生まれました！';
                createDrips(true);
            }
        } else {
            bottle.style.transform = 'rotate(0deg) scale(1)';
        }
    });

    // FPS Shooter Interaction
    const targets = document.querySelectorAll('.target');
    const scoreVal = document.getElementById('aim-score');
    let score = 0;

    targets.forEach(t => {
        t.addEventListener('click', (e) => {
            const points = parseInt(t.getAttribute('data-points'));
            score += points;
            scoreVal.textContent = score;

            // Explosion effect
            for (let i = 0; i < 5; i++) {
                const p = document.createElement('div');
                p.textContent = '✨';
                p.style.position = 'fixed';
                p.style.left = e.clientX + 'px';
                p.style.top = e.clientY + 'px';
                p.style.pointerEvents = 'none';
                document.body.appendChild(p);
                p.animate([
                    { transform: 'translate(0,0) scale(1)', opacity: 1 },
                    { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`, opacity: 0 }
                ], { duration: 500 }).onfinish = () => p.remove();
            }

            // Move target
            t.style.transform = 'scale(0)';
            setTimeout(() => {
                t.style.transform = 'scale(1)';
            }, 1000);
        });
    });

    // Butter Drips Background
    const dripContainer = document.getElementById('drip-container');
    function createDrips(isGold = false) {
        for (let i = 0; i < 3; i++) {
            const drip = document.createElement('div');
            drip.style.position = 'absolute';
            drip.style.width = '20px';
            drip.style.height = '100px';
            drip.style.background = isGold ? 'var(--berry-butter)' : 'white';
            drip.style.borderRadius = '0 0 10px 10px';
            drip.style.left = Math.random() * 100 + '%';
            drip.style.top = '-100px';
            dripContainer.appendChild(drip);

            drip.animate([
                { top: '-100px', height: '100px' },
                { top: '0', height: Math.random() * 200 + 50 + 'px' }
            ], { duration: 1000 + Math.random() * 1000, fill: 'forwards' });
        }
    }
    createDrips();

    // 90 Minute (Melt) Timer
    const timerDisplay = document.getElementById('melt-timer');
    let totalMs = 90 * 60 * 1000;

    function updateTimer() {
        totalMs -= 103; // Real-timeish
        if (totalMs < 0) totalMs = 0;

        const m = Math.floor(totalMs / 60000).toString().padStart(2, '0');
        const s = Math.floor((totalMs % 60000) / 1000).toString().padStart(2, '0');
        const ms = (totalMs % 1000).toString().substring(0, 2).padStart(2, '0');

        timerDisplay.textContent = `${m}:${s}:${ms}`;

        // Add "melting" effect to body
        const meltFactor = (90 * 60 * 1000 - totalMs) / (90 * 60 * 1000);
        document.body.style.filter = `blur(${meltFactor * 0.5}px) contrast(${1 + meltFactor * 0.2})`;

        requestAnimationFrame(updateTimer);
    }
    updateTimer();

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.butter-churner, .cake-card, .fps-shooter').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
