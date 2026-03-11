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

    // Ghost Invoke Logic (She laughs)
    const scareBtn = document.getElementById('trigger-scare');
    const klaraLabel = document.getElementById('klara-label');
    const spirits = document.getElementById('spirits');

    scareBtn.addEventListener('click', () => {
        klaraLabel.innerText = "Smiling... 😊";
        klaraLabel.style.color = "#D2691E";
        
        createSpirit();
        setTimeout(() => {
            alert("Klara: (Giggles) How lovely! A new friend from the mansion?");
        }, 500);
    });

    function createSpirit() {
        const s = document.createElement('div');
        s.className = 'spirit';
        s.innerText = '👻';
        s.style.left = `${Math.random() * 80 + 10}%`;
        s.style.top = `${Math.random() * 80 + 10}%`;
        spirits.appendChild(s);
        
        s.animate([
            { opacity: 0, scale: 0 },
            { opacity: 0.5, scale: 2 },
            { opacity: 0, scale: 0 }
        ], { duration: 2000 }).onfinish = () => s.remove();
    }

    // Lostwood GPS Interaction
    const gpsArea = document.getElementById('gps-area');
    const marker = document.getElementById('marker');
    
    gpsArea.addEventListener('click', () => {
        const x = Math.random() * 80;
        const y = Math.random() * 80;
        marker.style.left = `${x}%`;
        marker.style.top = `${y}%`;
        
        console.log("Klara: Oh dear, I'm Lostwood again...");
    });

    // Scorpion Taste (Secret: Click Teapot)
    const teapot = document.getElementById('teapot-icon');
    const scorpFx = document.getElementById('scorpion-fx');
    teapot.addEventListener('click', () => {
        scorpFx.style.display = 'block';
        setTimeout(() => scorpFx.style.display = 'none', 3000);
    });

    // Teapot float
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        teapot.style.transform = `translate(${x}px, ${y}px) rotate(${x*5}deg)`;
    });

    // Klara Image interaction (Potato Hate)
    const klaraImg = document.getElementById('klara-img');
    klaraImg.addEventListener('mouseenter', () => {
        if (Math.random() > 0.8) {
            alert("Klara: Please... any bug is fine, but no potatoes today.");
        }
    });
});
