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

    // Cipher Background
    const cipherBg = document.getElementById('cipher-bg');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=';

    for (let i = 0; i < 40; i++) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        line.style.whiteSpace = 'nowrap';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;

        setInterval(() => {
            let text = '';
            for (let j = 0; j < 10; j++) {
                text += chars[Math.floor(Math.random() * chars.length)];
            }
            line.innerText = text;
        }, 100 + Math.random() * 400);

        cipherBg.appendChild(line);
    }

    // Text Decode Effect
    const decodeEl = document.querySelector('.decode-text');
    const originalText = decodeEl.dataset.original;
    let isDecoding = false;

    const decodeText = () => {
        if (isDecoding) return;
        isDecoding = true;
        let iteration = 0;
        const interval = setInterval(() => {
            decodeEl.innerText = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iteration >= originalText.length) {
                clearInterval(interval);
                isDecoding = false;
            }
            iteration += 3;
        }, 30);
    };

    // Initial decode
    setTimeout(decodeText, 1000);

    // Angry Mode Toggle (SF6 Mode)
    const toggleBtn = document.getElementById('mode-toggle');
    let isAngry = false;

    toggleBtn.addEventListener('click', () => {
        isAngry = !isAngry;
        if (isAngry) {
            document.body.classList.add('angry-mode');
            toggleBtn.innerText = 'MODE: BERSERKER / ANGRY';
            // Secret message decode
            decodeEl.innerText = "格ゲーの才能はあるかわからないが、\"格闘ゲーマー\"としての才能はある。Idios一の短気、ソフィア、参戦。清楚？何それ美味しいの？めんつゆの方が美味しいよ。";
        } else {
            document.body.classList.remove('angry-mode');
            toggleBtn.innerText = 'DECODE_MODE: OFF';
            decodeText();
        }
    });

    // Mentsuyu Drips
    const mentsuyuLayer = document.querySelector('.mentsuyu-layer');
    const createMentsuyu = () => {
        const bottle = document.createElement('div');
        bottle.className = 'mentsuyu-icon';
        bottle.innerHTML = '🍶';
        bottle.style.left = `${Math.random() * 100}%`;
        bottle.style.top = `-50px`;
        bottle.style.transition = `top ${Math.random() * 3 + 2}s linear, opacity 1s`;
        mentsuyuLayer.appendChild(bottle);

        setTimeout(() => {
            bottle.style.top = '110vh';
            setTimeout(() => {
                bottle.style.opacity = '0';
                setTimeout(() => bottle.remove(), 1000);
            }, 2000);
        }, 100);
    };

    setInterval(createMentsuyu, 4000);

    // Cipher Hover on Header
    const enName = document.querySelector('.en-name');
    enName.addEventListener('mouseover', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            enName.innerText = enName.innerText.split('').map((char, index) => {
                if (index < iterations) return enName.dataset.text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            if (iterations >= enName.dataset.text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
    });
});
