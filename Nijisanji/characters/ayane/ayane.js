document.addEventListener('DOMContentLoaded', () => {
    // Shirasa Ayane JS

    // Canvas Drawing
    const canvas = document.getElementById('art-canvas');
    const ctx = canvas.getContext('2d');
    const cursor = document.getElementById('cursor');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    document.addEventListener('mousedown', (e) => {
        drawing = true;
        [lastX, lastY] = [e.clientX, e.clientY];
    });

    document.addEventListener('mouseup', () => drawing = false);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        if (!drawing) return;

        ctx.strokeStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        [lastX, lastY] = [e.clientX, e.clientY];
    });

    // Mayo Bottle
    const mayoBtn = document.getElementById('mayo-btn');
    const mayoCount = document.getElementById('mayo-count');
    let mayoLevel = 0;

    mayoBtn.addEventListener('click', (e) => {
        mayoLevel += 5;
        if (mayoLevel > 100) mayoLevel = 100;
        mayoCount.textContent = mayoLevel + '%';

        // Creamy effect
        const splat = document.createElement('div');
        splat.className = 'paint-splat';
        splat.style.background = '#fffde7'; // Mayo color
        splat.style.left = (e.clientX - 25) + 'px';
        splat.style.top = (e.clientY - 25) + 'px';
        document.body.appendChild(splat);
        setTimeout(() => splat.remove(), 1000);
    });

    // Air Hockey Mini-Game
    const puck = document.getElementById('puck');
    const player = document.getElementById('player-paddle');
    const ai = document.getElementById('ai-paddle');
    const arena = document.getElementById('arena');
    const startBtn = document.getElementById('start-hockey');

    let puckX = 150, puckY = 150;
    let spdX = 3, spdY = 3;
    let gameActive = false;

    startBtn.addEventListener('click', () => {
        gameActive = true;
        startBtn.style.display = 'none';
        gameLoop();
    });

    arena.addEventListener('mousemove', (e) => {
        if (!gameActive) return;
        const rect = arena.getBoundingClientRect();
        let x = e.clientX - rect.left - 30;
        if (x < 0) x = 0;
        if (x > rect.width - 60) x = rect.width - 60;
        player.style.left = x + 'px';
    });

    function gameLoop() {
        if (!gameActive) return;

        const rect = arena.getBoundingClientRect();
        puckX += spdX;
        puckY += spdY;

        // Wall bounce
        if (puckX <= 0 || puckX >= rect.width - 14) spdX *= -1;

        // AI Logic
        let aiX = parseFloat(ai.style.left) || rect.width / 2;
        if (puckX > aiX + 30) aiX += 2;
        else aiX -= 2;
        ai.style.left = aiX + 'px';

        // Collision Player
        if (puckY >= rect.height - 30 && puckX + 7 > parseFloat(player.style.left) && puckX + 7 < parseFloat(player.style.left) + 60) {
            spdY *= -1;
            puckY = rect.height - 31;
        }

        // Collision AI
        if (puckY <= 20 && puckX + 7 > aiX && puckX + 7 < aiX + 60) {
            spdY *= -1;
            puckY = 21;
        }

        // Out of bounds
        if (puckY < 0 || puckY > rect.height) {
            puckX = rect.width / 2;
            puckY = rect.height / 2;
            spdY *= -1;
        }

        puck.style.left = puckX + 'px';
        puck.style.top = puckY + 'px';

        requestAnimationFrame(gameLoop);
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.canvas-card, .lore-section, .air-hockey-arena').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
