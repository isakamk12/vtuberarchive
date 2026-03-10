document.addEventListener('DOMContentLoaded', () => {
    // Sumeragi Reo JS

    // DJ Scratching
    const scratchArea = document.getElementById('scratch-area');
    const djMsg = document.getElementById('dj-msg');
    let rotating = false;
    let lastAngle = 0;
    let currentRotation = 0;

    scratchArea.addEventListener('mousedown', (e) => {
        rotating = true;
        scratchArea.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        rotating = false;
        scratchArea.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
        if (!rotating) return;

        const rect = scratchArea.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

        if (lastAngle) {
            const diff = angle - lastAngle;
            currentRotation += diff;
            scratchArea.style.transform = `rotate(${currentRotation}deg)`;
            djMsg.textContent = "SCRATCH! SCRATCH!";
            djMsg.style.color = "var(--reo-pink)";

            // Randomly show wink effect on scratch
            if (Math.random() > 0.9) showWink(e.clientX, e.clientY);
        }
        lastAngle = angle;
    });

    // Beetle Hunting
    const searchBtn = document.getElementById('search-beetle');
    const bCountDisplay = document.getElementById('b-count');
    const beetleBg = document.getElementById('beetle-bg');
    let beetlesFound = 0;

    searchBtn.addEventListener('click', () => {
        const beetle = document.createElement('div');
        beetle.className = 'beetle-small';
        beetle.textContent = '🪲';
        beetle.style.left = Math.random() * 90 + 'vw';
        beetle.style.top = Math.random() * 90 + 'vh';

        beetle.addEventListener('click', () => {
            beetlesFound++;
            bCountDisplay.textContent = beetlesFound;
            beetle.remove();
            showWink(parseFloat(beetle.style.left) * window.innerWidth / 100, parseFloat(beetle.style.top) * window.innerHeight / 100);
        });

        beetleBg.appendChild(beetle);
        searchBtn.textContent = "探し続ける... 🔍";
    });

    // Wink Effect
    const wink = document.getElementById('wink');
    function showWink(x, y) {
        const w = wink.cloneNode(true);
        w.style.left = x + 'px';
        w.style.top = y + 'px';
        w.style.opacity = '1';
        w.style.animation = 'winkSpread 1s forwards';
        document.body.appendChild(w);
        setTimeout(() => w.remove(), 1000);
    }

    // Hero visual wink on click
    const reoImg = document.getElementById('reo-img');
    reoImg.addEventListener('click', (e) => {
        showWink(e.clientX, e.clientY);
        djMsg.textContent = "HEAVENLY WINK! ❤️";
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.dj-deck, .neon-card, .episode-box').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
