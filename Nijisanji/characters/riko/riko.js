document.addEventListener('DOMContentLoaded', () => {
    // Winner's Stamp Interaction
    const stampTrigger = document.querySelector('.winner-stamp-trigger');
    const stampContainer = document.getElementById('stamp-container');

    document.addEventListener('click', (e) => {
        // Create a stamp everywhere on click
        const stamp = document.createElement('div');
        stamp.className = 'stamp';
        stamp.textContent = 'しがりこが勝つよ。';
        stamp.style.left = (e.clientX - 50) + 'px';
        stamp.style.top = (e.clientY - 20) + 'px';
        stamp.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;

        stampContainer.appendChild(stamp);

        // Remove after animation
        setTimeout(() => {
            stamp.style.opacity = '0';
            setTimeout(() => stamp.remove(), 500);
        }, 2000);
    });

    // Piano Keys Interaction
    const keys = document.querySelectorAll('.key');
    const notes = {
        'C': 261.63, 'Cs': 277.18, 'D': 293.66, 'Ds': 311.13,
        'E': 329.63, 'F': 349.23, 'Fs': 369.99, 'G': 392.00,
        'Gs': 415.30, 'A': 440.00, 'As': 466.16, 'B': 493.88
    };

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    keys.forEach(key => {
        key.addEventListener('mousedown', () => {
            const note = key.getAttribute('data-note');
            playNote(notes[note]);
        });
    });

    function playNote(freq) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1);
    }

    // Cicada Scroller
    const cicadaContainer = document.getElementById('cicada-container');
    window.addEventListener('scroll', () => {
        if (Math.random() > 0.98) {
            const cicada = document.createElement('div');
            cicada.innerHTML = '🦟'; // Closest emoji
            cicada.style.position = 'fixed';
            cicada.style.left = Math.random() * 100 + '%';
            cicada.style.top = '-50px';
            cicada.style.fontSize = '2rem';
            cicada.style.zIndex = '5';
            cicada.style.pointerEvents = 'none';
            document.body.appendChild(cicada);

            cicada.animate([
                { top: '-50px', transform: 'rotate(0deg)' },
                { top: '110vh', transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 200 - 100}px)` }
            ], {
                duration: 2000 + Math.random() * 3000,
                easing: 'linear'
            }).onfinish = () => cicada.remove();
        }
    });

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.notebook-page, .legend-card').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
