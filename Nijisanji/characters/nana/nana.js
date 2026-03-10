document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.circus-card, .record-box, .gluttony-meter').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Fire Ring / Hao's Jump Interaction
    const fireBtn = document.getElementById('fire-ring-trigger');
    const haoOverlay = document.getElementById('hao-overlay');

    fireBtn.addEventListener('click', () => {
        const hao = document.createElement('div');
        hao.className = 'hao-lion';
        hao.textContent = '🦁';
        hao.style.left = '-100px';
        hao.style.top = '50%';
        haoOverlay.appendChild(hao);

        // Create fire ring
        const ring = document.createElement('div');
        ring.style.position = 'fixed';
        ring.style.left = '50%';
        ring.style.top = '50%';
        ring.style.width = '200px';
        ring.style.height = '200px';
        ring.style.border = '10px solid orange';
        ring.style.borderRadius = '50%';
        ring.style.boxShadow = '0 0 20px red, inset 0 0 20px red';
        ring.style.transform = 'translate(-50%, -50%)';
        ring.style.zIndex = '999';
        haoOverlay.appendChild(ring);

        hao.animate([
            { left: '-100px', transform: 'translateY(-50%) rotate(0deg)' },
            { left: '50%', transform: 'translateY(-80%) rotate(360deg)', offset: 0.5 },
            { left: '110%', transform: 'translateY(-50%) rotate(720deg)' }
        ], {
            duration: 1500,
            easing: 'ease-in-out'
        }).onfinish = () => {
            hao.remove();
            ring.remove();
        };
    });

    // Gluttony Interaction
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(food => {
        food.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.textContent = food.textContent;
                particle.style.position = 'fixed';
                particle.style.left = (event.clientX) + 'px';
                particle.style.top = (event.clientY) + 'px';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '100';
                document.body.appendChild(particle);

                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * -200}px) scale(0)`, opacity: 0 }
                ], { duration: 1000 }).onfinish = () => particle.remove();
            }
        });
    });

    // Drum Interaction (Simple sounds)
    const drums = document.querySelectorAll('.drum');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const freqMap = {
        'crash': 400,
        'snare': 200,
        'tom': 150,
        'kick': 60
    };

    drums.forEach(drum => {
        drum.addEventListener('mousedown', () => {
            const type = drum.getAttribute('data-sound');
            playDrum(freqMap[type], type === 'crash');
        });
    });

    function playDrum(freq, isNoise) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        if (isNoise) {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.2);
        } else {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1, audioCtx.currentTime + 0.5);
        }

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }

    // Background Lights
    const lightsContainer = document.getElementById('lights-container');
    for (let i = 0; i < 20; i++) {
        const light = document.createElement('div');
        light.style.position = 'absolute';
        light.style.width = '10px';
        light.style.height = '10px';
        light.style.background = i % 2 === 0 ? 'var(--nana-gold)' : 'var(--nana-blue)';
        light.style.borderRadius = '50%';
        light.style.left = Math.random() * 100 + '%';
        light.style.top = Math.random() * 100 + '%';
        light.style.opacity = '0.3';
        lightsContainer.appendChild(light);

        light.animate([
            { opacity: 0.3, transform: 'scale(1)' },
            { opacity: 0.8, transform: 'scale(1.5)' },
            { opacity: 0.3, transform: 'scale(1)' }
        ], {
            duration: 1000 + Math.random() * 2000,
            iterations: Infinity
        });
    }
});
