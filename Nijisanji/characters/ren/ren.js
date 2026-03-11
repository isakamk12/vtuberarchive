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

    // Nebula Movement
    const nebula = document.getElementById('nebula');
    document.addEventListener('mousemove', (e) => {
        nebula.style.left = `${e.clientX - 300}px`;
        nebula.style.top = `${e.clientY - 300}px`;
    });

    // Risotto Toggle
    const risottoBtn = document.getElementById('toggle-risotto');
    const modeLabel = document.getElementById('mode-label');
    const horns = document.getElementById('horns');
    let isRisotto = false;

    risottoBtn.addEventListener('click', () => {
        isRisotto = !isRisotto;
        document.body.classList.toggle('risotto-mode');
        modeLabel.innerText = isRisotto ? 'RIZOTTO 🍚' : 'PRINCE';
        risottoBtn.innerText = isRisotto ? 'REVERT TO PRINCE 😈' : 'ENTER RISOTTO MODE 🍚';
        
        if (isRisotto) {
            horns.innerText = "🍚";
            triggerRipple(window.innerWidth / 2, window.innerHeight / 2, "RIZOTTO!!");
        } else {
            horns.innerText = "😈";
        }
    });

    // Musical Interaction
    const insts = document.querySelectorAll('.inst-item');
    const msg = document.getElementById('jam-msg');
    
    insts.forEach(inst => {
        inst.addEventListener('click', (e) => {
            const type = inst.dataset.inst;
            msg.innerText = `Ensnaring Earth with the ${type}... 🎶`;
            msg.style.color = '#429B76';
            
            triggerRipple(e.clientX, e.clientY);
            
            // Goofy voice easter egg
            if (type === 'kazoo' && Math.random() > 0.8) {
                msg.innerText = "Ahyuck! (Goofy voice activated)";
            }
        });
    });

    function triggerRipple(x, y, text = "") {
        const r = document.createElement('div');
        r.className = 'ripple';
        r.style.left = `${x}px`;
        r.style.top = `${y}px`;
        r.style.width = '10px'; r.style.height = '10px';
        document.body.appendChild(r);
        
        r.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.5 },
            { transform: 'translate(-50%, -50%) scale(50)', opacity: 0 }
        ], { duration: 1000 }).onfinish = () => r.remove();

        if (text) {
            const p = document.createElement('div');
            p.innerText = text;
            p.style.position = 'fixed';
            p.style.left = `${x}px`; p.style.top = `${y}px`;
            p.style.color = 'var(--ren-primary)';
            p.style.fontWeight = '900';
            p.style.fontSize = '2rem';
            document.body.appendChild(p);
            p.animate([
                { opacity: 1, transform: 'translate(-50%, -100%)' },
                { opacity: 0, transform: 'translate(-50%, -200%)' }
            ], { duration: 1000 }).onfinish = () => p.remove();
        }
    }

    // Breathing Logic (Oxygen level change)
    const oxVal = document.getElementById('ox-val');
    const breathOverlay = document.getElementById('breath');
    let breathingIn = true;

    function doBreathing() {
        if (breathingIn) {
            breathOverlay.style.opacity = '0.3';
            oxVal.innerText = '100%';
        } else {
            breathOverlay.style.opacity = '0';
            oxVal.innerText = '98%';
        }
        breathingIn = !breathingIn;
        setTimeout(doBreathing, 4000); // 4 seconds inhale/exhale
    }
    doBreathing();

    // Horns float
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 60;
        const y = (e.clientY - window.innerHeight / 2) / 60;
        horns.style.transform = `translate(${x}px, ${y}px)`;
    });
});
