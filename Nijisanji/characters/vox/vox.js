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

    // Ember Spawner
    const emberContainer = document.getElementById('embers');
    function createEmber() {
        const e = document.createElement('div');
        e.className = 'ember';
        e.style.left = `${Math.random() * 100}%`;
        e.style.bottom = '-10px';
        const size = Math.random() * 4 + 2;
        e.style.width = `${size}px`;
        e.style.height = `${size}px`;
        emberContainer.appendChild(e);

        const duration = Math.random() * 4000 + 3000;
        e.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: `translate(${(Math.random()-0.5)*100}px, -110vh) scale(0)`, opacity: 0 }
        ], { duration: duration }).onfinish = () => e.remove();
    }
    setInterval(createEmber, 100);

    // Unbound Transform
    const unboundBtn = document.getElementById('unbound-btn');
    const formLabel = document.getElementById('form-label');
    const voxImg = document.getElementById('vox-img');
    const flash = document.getElementById('flash');
    let isUnbound = false;

    unboundBtn.addEventListener('click', () => {
        isUnbound = !isUnbound;
        document.body.classList.toggle('unbound');
        formLabel.innerText = isUnbound ? 'UNBOUND (220cm)' : 'VOX';
        unboundBtn.innerText = isUnbound ? 'REVERT 👺' : 'UNBOUND FORM 👹';
        
        flash.style.opacity = '1';
        setTimeout(() => flash.style.opacity = '0', 300);
        voxImg.style.filter = isUnbound ? 'sepia(1) saturate(5) hue-rotate(-50deg)' : 'none';
        
        if(isUnbound) triggerShout("HAHAHAHA!");
    });

    // Gorilla Mode
    const gorillaBtn = document.getElementById('gorilla-btn');
    gorillaBtn.addEventListener('click', () => {
        triggerShout("🦍 OOH OOH AAH AAH!");
    });

    function triggerShout(text) {
        const popup = document.createElement('div');
        popup.innerText = text;
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%) scale(0)';
        popup.style.fontSize = '4rem';
        popup.style.fontWeight = '900';
        popup.style.color = 'white';
        popup.style.textShadow = '0 0 20px black';
        popup.style.zIndex = '500';
        document.body.appendChild(popup);
        
        popup.animate([
            { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
        ], { duration: 1000 }).onfinish = () => popup.remove();
    }

    // Voice Visualizer
    const viz = document.getElementById('viz');
    const voiceBtn = document.getElementById('voice-btn');
    const voiceMsg = document.getElementById('voice-msg');
    const numCircles = 5;
    for(let i=0; i<numCircles; i++){
        const c = document.createElement('div');
        c.className = 'v-circle';
        viz.appendChild(c);
    }

    let isPlaying = false;
    voiceBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        voiceBtn.innerText = isPlaying ? "COMMANDING... 🤫" : "HEAR THE VOICE 👹";
        if(isPlaying) {
            voiceMsg.innerText = '"You are mine, Kindred."';
            animateCircles();
        } else {
            voiceMsg.innerText = '"Hello, my Kindred..."';
        }
    });

    function animateCircles() {
        if(!isPlaying) return;
        const circles = document.querySelectorAll('.v-circle');
        circles.forEach((c, idx) => {
            const s = Math.sin(Date.now() / 200 + idx) * 0.5 + 1.5;
            c.style.transform = `scale(${s})`;
            c.style.borderColor = `rgba(150, 0, 24, ${s-0.5})`;
        });
        requestAnimationFrame(animateCircles);
    }

    // Box Luck
    const box = document.getElementById('luck-box');
    box.addEventListener('click', () => {
        box.innerText = "💨";
        setTimeout(() => {
            box.innerText = Math.random() > 0.9 ? "🍌" : "👹";
            setTimeout(() => box.innerText = "📦", 1000);
        }, 500);
    });
});
