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

    // Talisman & Burger Backgrounds
    const talismanContainer = document.getElementById('talisman-container');
    const burgerContainer = document.getElementById('burger-container');

    for (let i = 0; i < 10; i++) {
        const t = document.createElement('div');
        t.className = 'talisman';
        t.innerText = '急急如律令';
        t.style.left = `${Math.random() * 100}%`;
        t.style.top = `${Math.random() * 100}%`;
        t.style.animationDelay = `${Math.random() * 5}s`;
        talismanContainer.appendChild(t);
    }

    for (let i = 0; i < 8; i++) {
        const b = document.createElement('div');
        b.className = 'burger-icon';
        b.innerText = '🍔';
        b.style.left = `${Math.random() * 100}%`;
        b.style.top = `${Math.random() * 100}%`;
        b.style.transform = `rotate(${Math.random() * 360}deg)`;
        burgerContainer.appendChild(b);
    }

    // Exorcism Strike Interaction
    const strikeBtn = document.getElementById('exorcism-strike');
    strikeBtn.addEventListener('click', (e) => {
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('div');
            line.className = 'strike-line';
            const size = Math.random() * 300 + 200;
            line.style.width = `${size}px`;
            line.style.height = '4px';
            line.style.left = `${e.clientX - size / 2}px`;
            line.style.top = `${e.clientY}px`;
            line.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(line);
            setTimeout(() => line.remove(), 300);
        }
    });

    // HBCG Mode Toggle
    const hbcgBtn = document.getElementById('hbcg-toggle');
    let isHBCG = false;
    hbcgBtn.addEventListener('click', () => {
        isHBCG = !isHBCG;
        if (isHBCG) {
            document.body.classList.add('hbcg-active');
            hbcgBtn.innerText = 'HBCG_MODE: ON 😎';
            hbcgBtn.style.background = 'black';
            hbcgBtn.style.color = 'var(--kitami-yellow)';
        } else {
            document.body.classList.remove('hbcg-active');
            hbcgBtn.innerText = 'HBCG_MODE: OFF 😎';
            hbcgBtn.style.background = 'transparent';
            hbcgBtn.style.color = 'var(--kitami-red)';
        }
    });

    // Dignity Meter draining
    const dignityFill = document.getElementById('dignity-fill');
    let dignity = 100;
    setInterval(() => {
        dignity -= 0.1;
        if (dignity < 10) dignity = 100; // Reset as "New Bottle"
        dignityFill.style.width = `${dignity}%`;
    }, 1000);

    // Random "Kitami-gotoku" comments
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.9) {
            const comments = [
                "北見が来たぜ！",
                "アチィな！！",
                "俺はHBCGだ...",
                "バーガー、マジでうまい",
                "おけ（即答）",
                "尊厳が危うい！！"
            ];
            const msg = document.createElement('div');
            msg.innerText = comments[Math.floor(Math.random() * comments.length)];
            msg.style.position = 'fixed';
            msg.style.left = `${e.clientX}px`;
            msg.style.top = `${e.clientY}px`;
            msg.style.color = 'var(--kitami-yellow)';
            msg.style.fontWeight = '900';
            msg.style.zIndex = '1200';
            msg.style.pointerEvents = 'none';
            msg.style.background = 'rgba(0,0,0,0.5)';
            msg.style.padding = '5px 10px';
            document.body.appendChild(msg);

            msg.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-40px)' }
            ], { duration: 800 });
            setTimeout(() => msg.remove(), 800);
        }
    });
});
