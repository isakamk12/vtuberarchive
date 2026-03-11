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

    // Gold Particle System
    const particleContainer = document.getElementById('gold-particles');
    function createParticle() {
        const p = document.createElement('div');
        p.className = 'gold-particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = '-10px';
        particleContainer.appendChild(p);

        const duration = Math.random() * 3000 + 2000;
        p.animate([
            { top: '-10px', opacity: 1 },
            { top: '105%', opacity: 0 }
        ], { duration: duration, easing: 'linear' }).onfinish = () => p.remove();
    }
    setInterval(createParticle, 100);

    // POG Counter & BOOBA Training
    const booba = document.getElementById('booba-target');
    const pogNum = document.getElementById('pog-num');
    const flash = document.getElementById('flash');
    let pogs = 0;

    booba.addEventListener('click', (e) => {
        pogs++;
        pogNum.innerText = pogs;
        
        // POG Flash Effect
        flash.style.left = `${e.clientX - 50}px`;
        flash.style.top = `${e.clientY - 100}px`;
        flash.style.opacity = '1';
        flash.animate([
            { transform: 'scale(1) rotate(0deg)', opacity: 1 },
            { transform: 'scale(2) rotate(20deg)', opacity: 0 }
        ], { duration: 500 });
        
        // Visual bounce
        booba.style.transform = 'scale(1.2)';
        setTimeout(() => booba.style.transform = 'scale(1)', 100);
    });

    // Lucy Toggle
    const toggleLucy = document.getElementById('toggle-lucy');
    const modeStatus = document.getElementById('mode-status');
    let isLucy = false;

    toggleLucy.addEventListener('click', () => {
        isLucy = !isLucy;
        document.body.classList.toggle('lucy-mode');
        modeStatus.innerText = isLucy ? 'LUCY (GRILL)' : 'LUCA';
        toggleLucy.innerText = isLucy ? 'REVERT TO LUCA 🦁' : 'SWITCH TO LUCY 💄';
        
        // Lucy specific quote change?
        const catchphrase = document.querySelector('.catchphrase');
        catchphrase.innerText = isLucy ? 
            "「Hello everyone! I'm Lucy Kaneshiro, Luca's big sister~」" : 
            "「HELLO! I'm an EVIL and MEAN Mafia boss! ...POG!」";
    });

    // Weights hover effect
    const weights = document.getElementById('weights');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        weights.style.transform = `translate(${x}px, ${y}px) rotate(${x*2}deg)`;
    });
});
