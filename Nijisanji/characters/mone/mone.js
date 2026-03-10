document.addEventListener('DOMContentLoaded', () => {
    // Smoke Effect
    const smokeContainer = document.getElementById('smoke-container');
    function createSmoke() {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = Math.random() * 150 + 50 + 'px';
        p.style.height = p.style.width;
        p.style.background = 'radial-gradient(circle, rgba(222, 205, 252, 0.15) 0%, transparent 70%)';
        p.style.borderRadius = '50%';
        p.style.left = Math.random() * 100 + '%';
        p.style.bottom = '-100px';
        p.style.filter = 'blur(30px)';
        smokeContainer.appendChild(p);

        p.animate([
            { bottom: '-100px', opacity: 0, transform: 'scale(1) translateX(0)' },
            { bottom: '50%', opacity: 0.5, transform: 'scale(1.5) translateX(50px)', offset: 0.5 },
            { bottom: '110%', opacity: 0, transform: 'scale(2) translateX(-50px)' }
        ], {
            duration: 8000 + Math.random() * 4000,
            easing: 'ease-out'
        }).onfinish = () => p.remove();
    }
    setInterval(createSmoke, 1000);

    // Poya-Tanu Mode Toggle
    const tanuToggle = document.getElementById('tanu-toggle');
    tanuToggle.addEventListener('click', () => {
        tanuToggle.classList.toggle('active');
        document.body.classList.toggle('tanu-mode');
        // Add tanuki leaf particles
        if (document.body.classList.contains('tanu-mode')) {
            spawnLeaves();
        }
    });

    function spawnLeaves() {
        for (let i = 0; i < 10; i++) {
            const leaf = document.createElement('div');
            leaf.textContent = '🍃';
            leaf.style.position = 'fixed';
            leaf.style.left = Math.random() * 100 + 'vw';
            leaf.style.top = '-50px';
            leaf.style.fontSize = '1.5rem';
            document.body.appendChild(leaf);
            leaf.animate([
                { top: '-50px', transform: 'rotate(0deg)' },
                { top: '110vh', transform: `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 200 - 100}px)` }
            ], { duration: 3000 + Math.random() * 2000 }).onfinish = () => leaf.remove();
        }
    }

    // Curiosity Kitchen Drag & Drop
    const ingredients = document.querySelectorAll('.ingredient');
    const pot = document.getElementById('pot');
    const kitchenResult = document.getElementById('kitchen-result');
    let potMixed = [];

    ingredients.forEach(ing => {
        ing.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', ing.getAttribute('data-name'));
        });
    });

    pot.addEventListener('dragover', (e) => e.preventDefault());
    pot.addEventListener('drop', (e) => {
        e.preventDefault();
        const item = e.dataTransfer.getData('text/plain');
        potMixed.push(item);

        pot.classList.add('cooking-animation');
        setTimeout(() => pot.classList.remove('cooking-animation'), 500);

        if (potMixed.length >= 2) {
            checkCuisine();
        }
    });

    const cuisineLogic = {
        'natto-chocolate': "「チョコ納豆…意外とイケるかも…？散ッ！」",
        'natto-sugar': "「納豆に砂糖は、私の村（出身地）の常識ですよ？」",
        'kimchi-chocolate': "「チョコキムチ…これは好奇心が勝りましたね。」",
        'tapioca-kimchi': "「惣菜タピオカです。モチモチピリ辛…新次元！」"
    };

    function checkCuisine() {
        const key = potMixed.sort().join('-');
        kitchenResult.textContent = cuisineLogic[key] || "「未知の味…！これぞ好奇心の極みです。」";
        potMixed = [];
    }

    // Endurance Timer
    const timerDisplay = document.getElementById('endurance-timer');
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${h}:${m}:${s}`;
    }, 1000);

    // World Straightness msg on scroll shake
    const shakingVisual = document.getElementById('shaking-visual');
    const straightMsg = document.getElementById('straight-msg');
    window.addEventListener('scroll', () => {
        const speed = Math.abs(window.scrollY - (window.lastY || 0));
        window.lastY = window.scrollY;

        if (speed > 50) {
            shakingVisual.style.transform = `rotate(${Math.random() * 10 - 5}deg) translateX(${Math.random() * 10 - 5}px)`;
            straightMsg.classList.add('visible');
            setTimeout(() => straightMsg.classList.remove('visible'), 2000);
        } else {
            shakingVisual.style.transform = 'none';
        }
    });

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.profile-card, .curiosity-kitchen, .endurance-clock').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
