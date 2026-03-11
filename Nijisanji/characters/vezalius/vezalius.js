document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Kanji Study Trigger
    const kanjiBtn = document.getElementById('trigger-kanji');
    const kanjiLabel = document.getElementById('kanji-label');
    const kanjiList = ['救済', '医療', '包帯', '絶叫', '西瓜', '仏蘭西'];
    
    kanjiBtn.addEventListener('click', () => {
        const word = kanjiList[Math.floor(Math.random() * kanjiList.length)];
        kanjiLabel.innerText = word;
        kanjiLabel.style.color = '#00BFFF';
        kanjiLabel.animate([
            { transform: 'scale(1.5)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 500 });
    });

    // Suika Master Interaction
    const melon = document.getElementById('melon');
    const melon2 = document.getElementById('melon-2');
    const msg = document.getElementById('game-msg');
    let doubleSuika = false;

    [melon, melon2].forEach(m => {
        m.addEventListener('click', () => {
            m.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.2)' },
                { transform: 'scale(1)' }
            ], 200);
            
            if (Math.random() > 0.9) {
                doubleSuika = true;
                msg.innerText = "ACHIEVED: DOUBLE SUIKA! 🍉🍉";
                msg.style.color = "#FF4500";
                triggerConfetti();
            }
        });
    });

    function triggerConfetti() {
        for(let i=0; i<30; i++) {
            const c = document.createElement('div');
            c.innerText = '🍉';
            c.style.position = 'fixed';
            c.style.left = `${Math.random() * 100}%`;
            c.style.top = `-20px`;
            document.body.appendChild(c);
            c.animate([
                { transform: 'translateY(0) rotate(0deg)' },
                { transform: `translateY(${window.innerHeight}px) rotate(360deg)` }
            ], { duration: 2000 + Math.random()*2000 }).onfinish = () => c.remove();
        }
    }

    // Croissant Burn Flash (Secret Trigger)
    const croissant = document.getElementById('croissant');
    const burnEffect = document.getElementById('burn-effect');
    croissant.addEventListener('mouseenter', () => {
        if (Math.random() > 0.95) {
            burnEffect.style.display = 'flex';
            setTimeout(() => burnEffect.style.display = 'none', 1500);
        }
    });

    // Croissant float
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        croissant.style.transform = `translate(${x}px, ${y}px) rotate(${x*5}deg)`;
    });

    // Bonjour Greeting
    const vezImg = document.getElementById('vez-img');
    vezImg.addEventListener('click', () => {
        alert("Vezalius: Bonjour, mon ami. Need some medical assistance? Or maybe a croissant?");
    });
});
