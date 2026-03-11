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

    // Gym Mode Logic
    const gymBtn = document.getElementById('trigger-gym');
    const claudeLabel = document.getElementById('claude-label');
    const gymFx = document.getElementById('gym-fx');
    const claudeImg = document.getElementById('claude-img');
    let isGymMode = false;

    gymBtn.addEventListener('click', () => {
        isGymMode = !isGymMode;
        claudeLabel.innerText = isGymMode ? 'WORKING OUT! 💪' : 'CHILLING';
        claudeLabel.style.color = isGymMode ? '#FFD700' : '#FFF';
        gymFx.style.display = isGymMode ? 'block' : 'none';
        
        if (isGymMode) {
            claudeImg.style.filter = 'drop-shadow(0 0 10px gold)';
            alert("Claude: Time for the gym! Health is priority #1.");
        } else {
            claudeImg.style.filter = 'none';
        }
    });

    // Lamp (Clamp) Interaction
    const lampArea = document.getElementById('lamp-area');
    const clamp = document.getElementById('clamp');
    let lightOn = false;

    lampArea.addEventListener('click', () => {
        lightOn = !lightOn;
        clamp.innerText = lightOn ? '☀️' : '💡';
        clamp.style.textShadow = lightOn ? '0 0 20px #B088FF' : 'none';
        
        if (lightOn) {
            createParticles();
        }
    });

    function createParticles() {
        for(let i=0; i<15; i++) {
            const p = document.createElement('div');
            p.className = 'lamp-particle';
            p.style.left = `calc(50% + ${(Math.random()-0.5)*100}px)`;
            p.style.top = `calc(50% + ${(Math.random()-0.5)*100}px)`;
            document.getElementById('lamps').appendChild(p);
            
            p.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${(Math.random()-0.5)*200}px, -200px) scale(0)`, opacity: 0 }
            ], { duration: 1000 + Math.random()*1000 }).onfinish = () => p.remove();
        }
    }

    // Friday in California (Secret Trigger)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f') {
            const friday = document.getElementById('friday-overlay');
            friday.style.display = 'block';
            setTimeout(() => friday.style.display = 'none', 3000);
        }
    });

    // Maguro Hunger Interaction (Double Click Image)
    claudeImg.addEventListener('dblclick', () => {
        alert("Claude: ...Did someone say TUNA? I accidentally ate all the maguro at Kura Sushi!");
    });

    // Glove float
    const glove = document.getElementById('glove-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        glove.style.transform = `translate(${x}px, ${y}px) rotate(${x*2}deg)`;
    });
});
