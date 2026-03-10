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

    // Bee Particles
    const beeLayer = document.querySelector('.bee-layer');
    for (let i = 0; i < 10; i++) {
        const bee = document.createElement('div');
        bee.className = 'bee-particle';
        bee.innerHTML = '🐝';
        bee.style.left = `${Math.random() * 100}%`;
        bee.style.top = `${Math.random() * 100}%`;
        bee.style.animationDelay = `${Math.random() * 5}s`;
        beeLayer.appendChild(bee);
    }

    // Dajare Attack
    const dajareBtn = document.getElementById('dajare-attack');
    const punContainer = document.getElementById('pun-container');
    const freezeOverlay = document.getElementById('freeze-screen');
    const puns = [
        "ゾーンにいるぞーん！",
        "まな板にマナ居た",
        "所詮初戦やから",
        "ふぁむゆになっちゃうふぁ…むゆ？",
        "お布団が吹っ飛んだ！",
        "アルミ缶の上に有るミカン",
        "電話に出んわ"
    ];

    dajareBtn.addEventListener('click', () => {
        // Spawn pun stream
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const pun = document.createElement('div');
                pun.className = 'pun-text';
                pun.innerText = puns[Math.floor(Math.random() * puns.length)];
                pun.style.top = `${Math.random() * 80 + 10}%`;
                pun.style.fontSize = `${Math.random() * 2 + 1}rem`;
                punContainer.appendChild(pun);
                setTimeout(() => pun.remove(), 3000);
            }, i * 200);
        }

        // Freeze effect
        document.body.classList.add('frozen');
        setTimeout(() => {
            document.body.classList.remove('frozen');
        }, 3000);
    });

    // IC Card Hen-shin Effect
    const icCard = document.getElementById('mode-toggle');
    icCard.addEventListener('click', () => {
        const flash = document.createElement('div');
        flash.className = 'hen-shin-flash';
        document.body.appendChild(flash);

        flash.animate([
            { opacity: 0.8 },
            { opacity: 0 }
        ], { duration: 500 });

        setTimeout(() => {
            flash.remove();
            alert("変身！……あ、ヒーローモードはまだ開発中やで！");
        }, 500);
    });

    // Logo Sketch Parallax
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        document.getElementById('sketch-bg').style.transform = `translate(${x}px, ${y}px)`;
    });

    // Random laughing effect
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.8) {
            const laugh = document.createElement('div');
            laugh.innerText = '🤣 アハハハ！';
            laugh.style.position = 'fixed';
            laugh.style.left = `${e.clientX}px`;
            laugh.style.top = `${e.clientY}px`;
            laugh.style.color = 'var(--mana-blue)';
            laugh.style.fontWeight = '900';
            laugh.style.zIndex = '1000';
            laugh.style.pointerEvents = 'none';
            document.body.appendChild(laugh);

            laugh.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-50px) scale(1.5)', opacity: 0 }
            ], { duration: 600 });
            setTimeout(() => laugh.remove(), 600);
        }
    });
});
