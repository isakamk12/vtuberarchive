document.addEventListener('DOMContentLoaded', () => {
    // Chick Follow Effect (Hao-like)
    const chick = document.getElementById('tamachick');
    let mouseX = 0, mouseY = 0;
    let chickX = 0, chickY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateChick() {
        const dx = mouseX - chickX;
        const dy = mouseY - chickY;
        chickX += dx * 0.08;
        chickY += dy * 0.08;
        chick.style.left = (chickX + 10) + 'px';
        chick.style.top = (chickY + 10) + 'px';
        requestAnimationFrame(animateChick);
    }
    animateChick();

    // Blindfold Rhythm Interaction
    const rhythmArea = document.getElementById('rhythm-area');
    const blindfold = document.getElementById('blindfold');
    const resultMsg = document.getElementById('rhythm-msg');
    const faceStampOverlay = document.getElementById('face-stamps');
    let rhythmActive = false;

    rhythmArea.addEventListener('click', () => {
        if (!rhythmActive) {
            rhythmActive = true;
            blindfold.classList.add('active');
            resultMsg.textContent = "盲目リズム中… 音に合わせてキーを叩け！";
            startRhythmLoop();
        } else {
            rhythmActive = false;
            blindfold.classList.remove('active');
            resultMsg.textContent = "目隠しモード解除！";
        }
    });

    function startRhythmLoop() {
        if (!rhythmActive) return;
        // Mock rhythm - check keypresses
        document.addEventListener('keydown', handleHit, { once: true });
    }

    function handleHit() {
        if (!rhythmActive) return;
        const stamp = document.createElement('div');
        stamp.className = 'face-stamp';
        stamp.textContent = 'ーヮー';
        stamp.style.left = Math.random() * 80 + 10 + 'vw';
        stamp.style.top = Math.random() * 80 + 10 + 'vh';
        faceStampOverlay.appendChild(stamp);

        setTimeout(() => stamp.remove(), 1000);
        startRhythmLoop();
    }

    // Guitar Strings Interaction
    const strings = document.querySelectorAll('.string');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = {
        'E': 164.81, 'A': 220.00, 'D': 293.66, 'G': 392.00, 'B': 493.88, 'E2': 659.25
    };

    strings.forEach(s => {
        s.addEventListener('mouseenter', () => {
            const note = s.getAttribute('data-note');
            playString(notes[note]);
        });
    });

    function playString(freq) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
    }

    // Sunny Particles
    const particles = document.getElementById('particles');
    function createSun() {
        const p = document.createElement('div');
        p.textContent = '☀️';
        p.style.position = 'absolute';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.opacity = '0.2';
        p.style.fontSize = Math.random() * 20 + 10 + 'px';
        particles.appendChild(p);

        p.animate([
            { transform: 'scale(1) rotate(0deg)', opacity: 0.2 },
            { transform: 'scale(1.5) rotate(180deg)', opacity: 0.4 },
            { transform: 'scale(1) rotate(360deg)', opacity: 0.2 }
        ], { duration: 5000 + Math.random() * 5000, iterations: Infinity });
    }
    for (let i = 0; i < 15; i++) createSun();

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.omurice-card, .legend-box, .rhythm-game').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
