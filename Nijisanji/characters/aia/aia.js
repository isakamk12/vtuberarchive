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

    // Hand-kun Movement
    const hand = document.getElementById('hand-kun');
    let angle = 0;
    function animateHand() {
        angle += 0.05;
        const x = Math.sin(angle) * 100;
        const y = Math.cos(angle * 0.7) * 50;
        hand.style.left = `calc(80% + ${x}px)`;
        hand.style.top = `calc(20% + ${y}px)`;
        requestAnimationFrame(animateHand);
    }
    animateHand();

    // MS Amare Toggle
    const toggleMs = document.getElementById('toggle-ms');
    const personaLabel = document.getElementById('persona-label');
    const glance = document.getElementById('glance');
    let isMs = false;

    toggleMs.addEventListener('click', () => {
        isMs = !isMs;
        document.body.classList.toggle('ms-mode');
        personaLabel.innerText = isMs ? 'MS AMARE (S)' : 'NORMAL';
        personaLabel.style.color = isMs ? '#FF4444' : '#87CEEB';
        toggleMs.innerText = isMs ? 'WEAR GLASSES 👓' : 'REMOVE GLASSES 🕶️';
        
        if (isMs) {
            glance.style.display = 'block';
            setTimeout(() => glance.style.display = 'none', 1000);
            triggerShout("SILENCE, DORK!");
        }
    });

    function triggerShout(text) {
        const p = document.createElement('div');
        p.innerText = text;
        p.style.position = 'fixed';
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.transform = 'translate(-50%, -50%)';
        p.style.fontSize = '4rem';
        p.style.fontWeight = '900';
        p.style.color = 'white';
        p.style.zIndex = '1000';
        document.body.appendChild(p);
        p.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(2)' }
        ], { duration: 1000 }).onfinish = () => p.remove();
    }

    // Collection items
    const items = document.querySelectorAll('.collect-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            if(!isMs) {
                const bubble = document.createElement('div');
                bubble.innerText = "Don't touch my hobby stuff! Dork!";
                bubble.style.position = 'absolute';
                bubble.style.color = '#87CEEB';
                item.parentElement.appendChild(bubble);
                setTimeout(() => bubble.remove(), 1000);
            }
        });
    });

    // Stars floating
    const stars = document.getElementById('stars');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        stars.style.transform = `translate(${x}px, ${y}px)`;
    });
});
