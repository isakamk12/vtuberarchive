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

    // Bubble Spawner
    const bubblesContainer = document.getElementById('bubbles');
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 40 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.bottom = '-50px';
        
        bubblesContainer.appendChild(bubble);

        const duration = Math.random() * 3000 + 4000;
        const animation = bubble.animate([
            { bottom: '-50px', transform: 'translateX(0)', opacity: 0.6 },
            { bottom: '110%', transform: `translateX(${Math.random() * 100 - 50}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        });

        animation.onfinish = () => bubble.remove();
    }
    setInterval(createBubble, 800);
    for(let i=0; i<10; i++) createBubble();

    // Keypress Interaction
    const keyBtn = document.getElementById('click-key');
    const keySounds = ['tap', 'click', 'clack'];
    keyBtn.addEventListener('click', () => {
        // Visual feedback
        keyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => keyBtn.style.transform = 'scale(1)', 100);
        
        // Spawn keycap particle
        const cap = document.createElement('div');
        cap.innerText = '⌨️';
        cap.style.position = 'fixed';
        cap.style.left = `${event.clientX}px`;
        cap.style.top = `${event.clientY}px`;
        cap.style.pointerEvents = 'none';
        cap.style.fontSize = '2rem';
        document.body.appendChild(cap);
        
        cap.animate([
            { transform: 'translateY(0) rotate(0)', opacity: 1 },
            { transform: `translate(${(Math.random()-0.5)*200}px, -200px) rotate(${Math.random()*360}deg)`, opacity: 0 }
        ], { duration: 1000 }).onfinish = () => cap.remove();
    });

    // Stress Squeeze
    const squeezeTarget = document.getElementById('squeeze-target');
    const moodLabel = document.getElementById('mood-label');
    let squeezeCount = 0;

    squeezeTarget.addEventListener('mousedown', () => {
        squeezeCount++;
        if (squeezeCount > 10) {
            moodLabel.innerText = 'ULTRA RELAXED';
            moodLabel.style.color = '#FFB7B2';
        } else if (squeezeCount > 5) {
            moodLabel.innerText = 'COMFY';
        }
    });

    // Ripple Effect
    document.addEventListener('click', (e) => {
        const ripple = document.getElementById('ripple');
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '0.5';
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 0.5 },
            { transform: 'scale(4)', opacity: 0 }
        ], { duration: 600 });
    });
});
