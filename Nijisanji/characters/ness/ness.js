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

    // Tea Set Background
    const teasetContainer = document.getElementById('teaset-container');
    const teaEmojis = ['🫖', '☕', '🧁', '🍰'];
    for (let i = 0; i < 8; i++) {
        const t = document.createElement('div');
        t.className = 'teaset';
        t.innerText = teaEmojis[Math.floor(Math.random() * teaEmojis.length)];
        t.style.left = `${Math.random() * 100}%`;
        t.style.top = `${Math.random() * 100}%`;
        t.style.animationDelay = `${Math.random() * 5}s`;
        teasetContainer.appendChild(t);
    }

    // Pachinko Slot Interaction
    const spinBtn = document.getElementById('spin-btn');
    const reels = document.querySelectorAll('.slot-reel');
    const slotEmojis = ['🎰', '💎', '🍒', '🔔', '7️⃣'];

    spinBtn.addEventListener('click', () => {
        document.body.classList.add('spin-active');
        let spins = 0;
        const interval = setInterval(() => {
            reels.forEach(r => {
                r.innerText = slotEmojis[Math.floor(Math.random() * slotEmojis.length)];
            });
            spins++;
            if (spins > 20) {
                clearInterval(interval);
                // Force a win or near miss
                const win = Math.random() > 0.7;
                if (win) {
                    reels.forEach(r => r.innerText = '7️⃣');
                    alert("FEVER!!! 確変突入！！");
                } else {
                    reels[0].innerText = '7️⃣';
                    reels[1].innerText = '7️⃣';
                    reels[2].innerText = '🍒';
                }
                setTimeout(() => {
                    document.body.classList.remove('spin-active');
                }, 2000);
            }
        }, 100);
    });

    // Mode Toggle (Butler / Off)
    const modeBtn = document.getElementById('mode-toggle');
    let isOff = false;
    modeBtn.addEventListener('click', () => {
        isOff = !isOff;
        if (isOff) {
            document.body.classList.add('off-mode');
            modeBtn.innerText = 'OFF_MODE: 俺';
            modeBtn.style.background = 'var(--ness-pachinko)';
            modeBtn.style.color = 'white';
        } else {
            document.body.classList.remove('off-mode');
            modeBtn.innerText = 'OFF_MODE: 執事';
            modeBtn.style.background = 'transparent';
            modeBtn.style.color = 'var(--ness-mint)';
        }
    });

    // Mun-mun Aura on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            document.body.classList.add('aura-active');
        } else {
            document.body.classList.remove('aura-active');
        }
    });

    // Random Ness comments
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.85) {
            const comments = isOff ?
                ["これ激アツじゃね？！", "負けた...また負けた...", "ムンムンしてきたな", "俺の執事服、どこ行った？"] :
                ["お呼びでしょうか、旦那様。", "最高の一杯を淹れました。", "ゾロ目、素晴らしいですね。", "14針、縫いました。"];

            const msg = document.createElement('div');
            msg.innerText = comments[Math.floor(Math.random() * comments.length)];
            msg.style.position = 'fixed';
            msg.style.left = `${e.clientX}px`;
            msg.style.top = `${e.clientY}px`;
            msg.style.color = isOff ? 'var(--ness-pachinko)' : 'var(--ness-mint)';
            msg.style.fontWeight = '900';
            msg.style.zIndex = '1200';
            msg.style.pointerEvents = 'none';
            msg.style.background = 'rgba(0,0,0,0.7)';
            msg.style.padding = '5px 15px';
            document.body.appendChild(msg);

            msg.animate([
                { opacity: 1, transform: 'scale(1)' },
                { opacity: 0, transform: 'scale(1.5)' }
            ], { duration: 1000 });
            setTimeout(() => msg.remove(), 1000);
        }
    });
});
