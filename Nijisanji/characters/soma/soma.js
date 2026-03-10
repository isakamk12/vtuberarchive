document.addEventListener('DOMContentLoaded', () => {
    // Fudo (Immovable) Effect
    const fudoVisual = document.getElementById('fudo-visual');
    const bgScroll = document.getElementById('bg-scroll');
    const fudoMsg = document.getElementById('fudo-msg');

    window.addEventListener('scroll', () => {
        // Character stays perfectly still relative to the viewport
        const scrollAmount = window.scrollY;
        fudoVisual.style.transform = `translateY(${scrollAmount * 0.5}px)`;
        bgScroll.style.backgroundPositionY = `${scrollAmount * 0.2}px`;

        if (Math.abs(scrollAmount) > 0) {
            fudoMsg.textContent = "STATUS: IMMOVABLE (不動)";
        }
    });

    // Sniper Scope (Right Click)
    const scope = document.getElementById('scope');
    const focusBar = document.getElementById('focus-bar');
    let scopeActive = false;
    let concentration = 100;

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        scopeActive = !scopeActive;
        scope.style.display = scopeActive ? 'block' : 'none';

        if (scopeActive) {
            concentration = 100;
            updateFocus();
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (scopeActive) {
            scope.style.left = (e.clientX - 100) + 'px';
            scope.style.top = (e.clientY - 100) + 'px';

            concentration -= 0.5;
            if (concentration <= 0) {
                concentration = 0;
                scopeActive = false;
                scope.style.display = 'none';
            }
            updateFocus();
        }
    });

    function updateFocus() {
        focusBar.style.width = concentration + '%';
    }

    // Scent Reader
    const scentItems = document.querySelectorAll('.scent-item');
    const scentResult = document.getElementById('scent-result');

    scentItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            scentResult.textContent = item.getAttribute('data-note');
        });
        item.addEventListener('mouseleave', () => {
            scentResult.textContent = "Find the aroma...";
        });
    });

    // Harmonica Blow
    const holes = document.querySelectorAll('.hole');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Virtual to LIVE snippet notes
    const somaNotes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00];

    holes.forEach((hole, idx) => {
        hole.addEventListener('mouseenter', () => {
            playNote(somaNotes[idx]);
        });
    });

    function playNote(freq) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square'; // Harmonic-like
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1);
    }

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.wine-card, .harmonica-performance, .lore-section').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
