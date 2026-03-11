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

    // Police Lights
    const lights = document.getElementById('lights');
    setInterval(() => {
        lights.style.background = (Date.now() % 1000 < 500) ? 
            'linear-gradient(90deg, rgba(255,0,0,0.2) 0%, transparent 50%, rgba(0,0,255,0.2) 100%)' :
            'linear-gradient(90deg, rgba(0,0,255,0.2) 0%, transparent 50%, rgba(255,0,0,0.2) 100%)';
    }, 500);

    // Battle Mode
    const toggleBattle = document.getElementById('toggle-battle');
    const safetyStatus = document.getElementById('safety-status');
    const sonnyImg = document.getElementById('sonny-img');
    let isBattle = false;

    toggleBattle.addEventListener('click', () => {
        isBattle = !isBattle;
        document.body.classList.toggle('battle-active');
        safetyStatus.innerText = isBattle ? 'OFF (ENGAGED)' : 'ON';
        safetyStatus.style.color = isBattle ? '#FF0000' : '#00FF00';
        toggleBattle.innerText = isBattle ? 'DISENGAGE WEAPONS 🛡️' : 'ENGAGE COMBAT MODE 🔫';
        
        if (isBattle) {
            triggerLaugh();
        }
    });

    function triggerLaugh() {
        const p = document.createElement('div');
        p.innerText = "AHAHAHAHA! KILL!";
        p.style.position = 'fixed';
        p.style.left = '50%';
        p.style.top = '40%';
        p.style.transform = 'translate(-50%, -50%)';
        p.style.fontFamily = 'Black Ops One';
        p.style.fontSize = '3rem';
        p.style.color = '#FFF321';
        p.style.zIndex = '1000';
        document.body.appendChild(p);
        p.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -100%) scale(1.5)' }
        ], { duration: 1000 }).onfinish = () => p.remove();
    }

    // Dubbing Interaction
    const dubBtn = document.getElementById('dub-btn');
    const wave = document.getElementById('wave');
    dubBtn.addEventListener('click', () => {
        wave.animate([
            { transform: 'scaleY(1)' },
            { transform: 'scaleY(3)' },
            { transform: 'scaleY(0.5)' },
            { transform: 'scaleY(1)' }
        ], { duration: 500, iterations: 2 });
        
        const popup = document.createElement('div');
        popup.innerText = "I AM THE LAW (若本規夫風)";
        popup.style.position = 'absolute';
        popup.style.color = '#FFF321';
        popup.style.fontWeight = '900';
        document.getElementById('voice-area').appendChild(popup);
        setTimeout(() => popup.remove(), 800);
    });

    // Negi floating
    const negis = document.getElementById('negis');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        negis.style.transform = `translate(${x}px, ${y}px) rotate(${x*5}deg)`;
    });

    // Pomu Interaction
    sonnyImg.addEventListener('click', () => {
        if(Math.random() > 0.8) {
            alert("Sonny: Pomu, my woman...?");
        }
    });
});
