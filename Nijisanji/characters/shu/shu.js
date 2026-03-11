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

    // ASCII Particle System (Matrix style but Shupport)
    const particles = document.getElementById('particles');
    const codes = ['0', '1', 'shu', 'sorcerer', '☯'];
    function createParticle() {
        const p = document.createElement('div');
        p.className = 'ascii-particle';
        p.innerText = codes[Math.floor(Math.random() * codes.length)];
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.fontSize = `${Math.random() * 1 + 0.5}rem`;
        particles.appendChild(p);
        
        setTimeout(() => p.remove(), 3000);
    }
    setInterval(createParticle, 200);

    // Hikari Mode Toggle
    const hikariBtn = document.getElementById('toggle-hikari');
    const aspectLabel = document.getElementById('aspect-label');
    const irasutoya = document.getElementById('irasutoya-bg');
    let isHikari = false;

    hikariBtn.addEventListener('click', () => {
        isHikari = !isHikari;
        document.body.classList.toggle('hikari-mode');
        aspectLabel.innerText = isHikari ? 'HIKARINO' : 'YAMINO';
        hikariBtn.innerText = isHikari ? 'REVERT TO YAMINO ☯' : 'GREET HIKARINO 🕊️';
        
        // Randomly show irasutoya effect
        if (Math.random() > 0.5) {
            irasutoya.style.display = 'block';
            setTimeout(() => irasutoya.style.display = 'none', 2000);
        }
    });

    // Cereal Interaction
    const milk = document.getElementById('milk-layer');
    const addCereal = document.getElementById('add-cereal');
    const addMilk = document.getElementById('add-milk');
    const msg = document.getElementById('cereal-msg');
    const bowl = document.getElementById('bowl');
    
    let hasMilk = false;
    let hasCereal = false;

    addMilk.addEventListener('click', () => {
        if (!hasMilk) {
            milk.style.height = '60%';
            hasMilk = true;
            updateCerealMsg();
        }
    });

    addCereal.addEventListener('click', () => {
        if (!hasCereal) {
            hasCereal = true;
            for(let i=0; i<15; i++) {
                const flake = document.createElement('div');
                flake.className = 'cereal-flake';
                flake.style.left = `${Math.random() * 80 + 10}%`;
                flake.style.top = `${Math.random() * 40 + 20}%`;
                bowl.appendChild(flake);
            }
            updateCerealMsg();
        }
    });

    function updateCerealMsg() {
        if (hasMilk && !hasCereal) {
            msg.innerText = "SHU APPROVES. Milk is first.";
            msg.style.color = "#00FFCC";
        } else if (hasCereal && !hasMilk) {
            msg.innerText = "YAMINO DISAPPROVES. Where is the order?";
            msg.style.color = "#FF4444";
        } else if (hasMilk && hasCereal) {
            msg.innerText = "THE PERFECT MEAL.";
        }
    }

    // Banana floating
    const banana = document.getElementById('banana');
    document.addEventListener('mousedown', () => {
        banana.innerText = "🍌 HELLO.";
        setTimeout(() => banana.innerText = "🍌", 1000);
    });
});
