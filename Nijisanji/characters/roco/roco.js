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

    // Pizza Layer
    const pizzaLayer = document.querySelector('.pizza-layer');
    for (let i = 0; i < 15; i++) {
        const pizza = document.createElement('div');
        pizza.className = 'pizza-icon';
        pizza.innerHTML = '🍕';
        pizza.style.left = `${Math.random() * 100}%`;
        pizza.style.top = `${Math.random() * 100}%`;
        pizza.style.animationDelay = `${Math.random() * 10}s`;
        pizzaLayer.appendChild(pizza);
    }

    // Delusion Mode Interaction
    const modeBtn = document.getElementById('mode-toggle');
    const delusionContainer = document.querySelector('.delusion-container');
    const delusions = [
        "遊園地再建したらピザ屋100店舗作る",
        "ジェットコースターの軌道で文字を書く",
        "妖怪として教科書に載る",
        "マウス操作で神絵師になる",
        "ロンの『ろ』、殺すの『こ』…ふふ",
        "身長あと10cm伸びる予定",
        "にじ鯖を遊園地化する"
    ];

    let isDelusionMode = false;
    modeBtn.addEventListener('click', () => {
        isDelusionMode = !isDelusionMode;
        if (isDelusionMode) {
            modeBtn.innerText = "妖怪モード：覚醒";
            modeBtn.style.background = "var(--roco-orange)";
            spawnDelusions();
        } else {
            modeBtn.innerText = "妄順モード：起動";
            modeBtn.style.background = "var(--roco-green)";
            delusionContainer.innerHTML = '';
            document.body.classList.remove('youkai-mode');
        }
    });

    const spawnDelusions = () => {
        if (!isDelusionMode) return;

        const bubble = document.createElement('div');
        bubble.className = 'delusion-bubble';
        bubble.innerText = delusions[Math.floor(Math.random() * delusions.length)];
        bubble.style.left = `${Math.random() * 70 + 5}%`;
        bubble.style.top = `${Math.random() * 70 + 5}%`;
        bubble.style.width = '120px';
        bubble.style.height = '120px';

        delusionContainer.appendChild(bubble);

        // One-time youkai effect
        if (Math.random() > 0.8) {
            document.body.classList.add('youkai-mode');
            setTimeout(() => document.body.classList.remove('youkai-mode'), 1000);
        }

        setTimeout(() => {
            bubble.style.transition = 'all 1s ease-out';
            bubble.style.opacity = '0';
            bubble.style.transform = 'scale(0.5)';
            setTimeout(() => bubble.remove(), 1000);
        }, 3000);

        setTimeout(spawnDelusions, 1500);
    };

    // Rollercoaster mouse ride
    document.addEventListener('mousemove', (e) => {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 20;
        document.querySelector('.rollercoaster-track-bg').style.transform = `translate(${xPercent}px, ${yPercent}px)`;
    });

    // Youkai Shadow Peek
    const shadowLayer = document.querySelector('.youkai-shadow-layer');
    setInterval(() => {
        if (Math.random() > 0.95) {
            const shadow = document.createElement('div');
            shadow.innerText = '👁️';
            shadow.style.position = 'fixed';
            shadow.style.left = `${Math.random() * 100}%`;
            shadow.style.top = `${Math.random() * 100}%`;
            shadow.style.fontSize = '5rem';
            shadow.style.opacity = '0';
            shadow.style.transition = 'opacity 0.2s';
            shadowLayer.appendChild(shadow);

            setTimeout(() => {
                shadow.style.opacity = '0.05';
                setTimeout(() => {
                    shadow.style.opacity = '0';
                    setTimeout(() => shadow.remove(), 200);
                }, 500);
            }, 10);
        }
    }, 2000);
});
