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

    // Mascot Ono Floating
    const onoLayer = document.getElementById('ono-container');
    const positions = [
        { left: '5%', top: '15%' },
        { right: '10%', top: '40%' },
        { left: '15%', bottom: '10%' }
    ];

    positions.forEach(pos => {
        const ono = document.createElement('div');
        ono.className = 'mascot-ono';
        ono.innerText = '🪓';
        if (pos.left) ono.style.left = pos.left;
        if (pos.right) ono.style.right = pos.right;
        if (pos.top) ono.style.top = pos.top;
        if (pos.bottom) ono.style.bottom = pos.bottom;
        ono.style.animationDelay = `${Math.random() * 5}s`;
        onoLayer.appendChild(ono);
    });

    // Berserker Smash Interaction
    const smashBtn = document.getElementById('smash-mode');
    const crackContainer = document.getElementById('crack-container');
    const sparkContainer = document.getElementById('spark-container');

    smashBtn.addEventListener('click', (e) => {
        // Crack effect
        const crack = document.createElement('div');
        crack.className = 'crack';
        crack.style.left = `${e.clientX - 100}px`;
        crack.style.top = `${e.clientY - 100}px`;
        crackContainer.appendChild(crack);
        setTimeout(() => crack.remove(), 1000);

        // Screen shake
        document.body.style.animation = 'shake 0.1s 3';
        setTimeout(() => document.body.style.animation = '', 300);

        // Spark effect
        for (let i = 0; i < 8; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.left = `${e.clientX}px`;
            spark.style.top = `${e.clientY}px`;
            spark.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
            spark.style.setProperty('--ty', `${(Math.random() - 0.5) * 200}px`);
            sparkContainer.appendChild(spark);
            setTimeout(() => spark.remove(), 500);
        }
    });

    // Kawaii Mode Toggle
    const kawaiiBtn = document.getElementById('kawaii-toggle');
    let isKawaii = false;

    kawaiiBtn.addEventListener('click', () => {
        isKawaii = !isKawaii;
        if (isKawaii) {
            document.body.classList.add('kawaii-active');
            kawaiiBtn.innerText = 'KAWAII_MODE: ON 🎀';
            kawaiiBtn.style.background = 'var(--toto-pink)';
            kawaiiBtn.style.color = 'white';
            startHeartSpawn();
        } else {
            document.body.classList.remove('kawaii-active');
            kawaiiBtn.innerText = 'KAWAII_MODE: OFF 🎀';
            kawaiiBtn.style.background = 'white';
            kawaiiBtn.style.color = 'var(--toto-pink)';
            stopHeartSpawn();
        }
    });

    let heartInterval;
    const startHeartSpawn = () => {
        heartInterval = setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerText = '💖';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.bottom = '0';
            heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
            document.getElementById('heart-container').appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, 300);
    };

    const stopHeartSpawn = () => {
        clearInterval(heartInterval);
    };

    // Random Laughing/Kawaii voice lines
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.9) {
            const msg = document.createElement('div');
            msg.innerText = isKawaii ? '可愛すぎてごめんなさ〜い！' : 'アハハハハ！壊れちゃった！';
            msg.style.position = 'fixed';
            msg.style.left = `${e.clientX}px`;
            msg.style.top = `${e.clientY}px`;
            msg.style.color = 'var(--toto-pink)';
            msg.style.fontWeight = '900';
            msg.style.zIndex = '1100';
            msg.style.pointerEvents = 'none';
            document.body.appendChild(msg);

            msg.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-50px)' }
            ], { duration: 800 });
            setTimeout(() => msg.remove(), 800);
        }
    });
});

// Adding shake animation dynamically
if (!document.getElementById('shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.innerHTML = `
    @keyframes shake {
        0% { transform: translate(0,0); }
        25% { transform: translate(-5px, 5px); }
        50% { transform: translate(5px, -5px); }
        75% { transform: translate(-5px, -5px); }
        100% { transform: translate(0,0); }
    }
    `;
    document.head.appendChild(style);
}
