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

    // Redbull Sparkles
    const sparkleContainer = document.getElementById('sparkles');
    function createSparkle() {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        sparkleContainer.appendChild(s);
        
        s.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 1, transform: 'scale(1.5)' },
            { opacity: 0, transform: 'scale(0)' }
        ], { duration: 1500 }).onfinish = () => s.remove();
    }
    setInterval(createSparkle, 200);

    // Buriho Toggle
    const burihoBtn = document.getElementById('toggle-buriho');
    const personaLabel = document.getElementById('persona-label');
    const messyLevel = document.getElementById('messy-level');
    let isBuriho = false;

    burihoBtn.addEventListener('click', () => {
        isBuriho = !isBuriho;
        document.body.classList.toggle('buriho-mode');
        personaLabel.innerText = isBuriho ? 'BURIHO ONEESAN' : 'SCARLE';
        burihoBtn.innerText = isBuriho ? 'REVERT TO SCARLE 💋' : 'BURIHO ONEESAN MODE 🌯';
        
        // Messy room humor
        if (isBuriho) {
            messyLevel.innerText = "CRITICAL (REDBULL CANS EVERYWHERE)";
            messyLevel.style.color = "#FF4444";
        } else {
            messyLevel.innerText = "MESSY";
            messyLevel.style.color = "white";
        }
    });

    // Food Crime Cooker
    const liquid = document.getElementById('soup-color');
    const msg = document.getElementById('cook-msg');
    const ingreds = document.querySelectorAll('.ing-btn');
    const flash = document.getElementById('flash');
    let fill = 0;

    ingreds.forEach(btn => {
        btn.addEventListener('click', () => {
            fill += 33;
            if (fill > 100) fill = 100;
            liquid.style.height = `${fill}%`;
            
            const type = btn.dataset.type;
            if (type === 'redbull') {
                liquid.style.background = '#55AAFF';
                msg.innerText = "Adding Red Bull Sugarfree... ✨";
                flash.style.opacity = '0.5';
                setTimeout(() => flash.style.opacity = '0', 200);
            } else if (type === 'icecream') {
                liquid.style.background = '#FFF5EE';
                msg.innerText = "Melting the ice cream into soup... 🍦";
            } else {
                msg.innerText = "Pineapple on pizza! Food crime! 🍍";
            }

            if (fill >= 100) {
                msg.innerText = "THE VOID IS HUNGRY. FOOD CRIME COMPLETE. 💋";
                msg.style.color = "#E60012";
            }
        });
    });

    // Floating Redbull can
    const rbCan = document.getElementById('rb-can');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        rbCan.style.transform = `translate(${x}px, ${y}px) rotate(${x*10}deg)`;
    });
});
