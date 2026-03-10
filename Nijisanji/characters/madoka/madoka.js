document.addEventListener('DOMContentLoaded', () => {
    // Minamo Madoka JS

    // Cursor
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hydration System
    const waterBtn = document.getElementById('water-btn');
    const hydroDisplay = document.getElementById('hydro-level');
    let hydroLevel = 0;

    waterBtn.addEventListener('click', () => {
        hydroLevel += 10;
        if (hydroLevel > 100) hydroLevel = 100;
        hydroDisplay.textContent = hydroLevel + '%';

        // Saturation effect
        document.body.style.filter = `saturate(${1 + hydroLevel / 100})`;

        // Splash effect
        createSteam('💧');
    });

    // Overheat System
    const steamLayer = document.getElementById('steam-layer');
    const patch = document.getElementById('patch');
    const madokaImg = document.getElementById('madoka-img');
    let steamInterval;

    function startOverheat() {
        steamInterval = setInterval(() => {
            createSteam('💨');
        }, 1000);
    }

    function createSteam(icon) {
        const s = document.createElement('div');
        s.className = 'steam-particle';
        s.textContent = icon;
        s.style.left = (Math.random() * 80 + 10) + 'vw';
        s.style.top = '100vh';
        steamLayer.appendChild(s);
        setTimeout(() => s.remove(), 3000);
    }

    madokaImg.addEventListener('click', () => {
        patch.style.opacity = "1";
        clearInterval(steamInterval);
        setTimeout(() => {
            patch.style.opacity = "0";
            startOverheat();
        }, 5000);
    });

    startOverheat();

    // 14GB Upload Simulation
    const bar = document.getElementById('upload-bar');
    const status = document.getElementById('upload-status');
    let progress = 0;

    function simulateUpload() {
        progress += Math.random() * 0.1;
        if (progress > 100) progress = 100;
        bar.style.width = progress + '%';

        if (progress < 100) {
            requestAnimationFrame(simulateUpload);
        } else {
            status.textContent = "STATUS: UPLOADED! (Wait, file corrupted?)";
        }
    }
    simulateUpload();

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.aqua-card, .episode-box, .lore-section').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
