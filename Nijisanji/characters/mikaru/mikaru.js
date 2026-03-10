document.addEventListener('DOMContentLoaded', () => {
    // Kadou Mikaru JS

    // Endurance Clock (Mock)
    const clock = document.getElementById('clock');
    let startTime = Date.now();
    function updateClock() {
        const now = Date.now();
        const diff = now - startTime;
        const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        clock.textContent = `777y ${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);

    // Gokigen Sway
    const visual = document.getElementById('mikaru-visual');
    const gokigenMsg = document.getElementById('gokigen-msg');

    visual.addEventListener('mouseenter', () => {
        visual.style.animation = "sway 1.5s ease-in-out infinite";
        gokigenMsg.textContent = "STATUS: SUPER GOKIGEN ♫♫";
    });

    visual.addEventListener('mouseleave', () => {
        visual.style.animation = "";
        gokigenMsg.textContent = "STATUS: GOKIGEN ♫";
    });

    // Snail Trail (Cursor slime)
    const trailContainer = document.getElementById('trail');
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) { // Slower trail
            const p = document.createElement('div');
            p.className = 'trail-particle';
            p.style.left = e.clientX + 'px';
            p.style.top = e.clientY + 'px';
            trailContainer.appendChild(p);

            p.animate([
                { transform: 'scale(1)', opacity: 0.5 },
                { transform: 'scale(2)', opacity: 0 }
            ], { duration: 2000, easing: 'ease-out' }).onfinish = () => p.remove();
        }
    });

    // Sock Memory Game
    const sockGame = document.getElementById('sock-game');
    const status = document.getElementById('game-status');
    const sockEmojis = ['🧦', '🧤', '👟', '👗', '👒', '🧢', '👕', '👖'];
    let cards = [...sockEmojis, ...sockEmojis];
    cards.sort(() => Math.random() - 0.5);

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matches = 0;

    cards.forEach((emoji, idx) => {
        const card = document.createElement('div');
        card.className = 'sock-card hidden';
        card.textContent = emoji;
        card.dataset.index = idx;
        card.addEventListener('click', () => flipCard(card));
        sockGame.appendChild(card);
    });

    function flipCard(card) {
        if (lockBoard || card === firstCard || !card.classList.contains('hidden')) return;

        card.classList.remove('hidden');

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        checkMatch();
    }

    function checkMatch() {
        lockBoard = true;
        const isMatch = firstCard.textContent === secondCard.textContent;

        if (isMatch) {
            matches++;
            status.textContent = `Pairs: ${matches}/8`;
            resetBoard();
            if (matches === 8) status.textContent = "部屋が片付きました！ (部屋はまだ汚い)";
        } else {
            setTimeout(() => {
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                resetBoard();
            }, 1000);
        }
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Instrument interaction
    const instruments = document.querySelectorAll('.instrument');
    const soundMsg = document.getElementById('sound-msg');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    instruments.forEach(inst => {
        inst.addEventListener('click', () => {
            const type = inst.getAttribute('data-sound');
            soundMsg.textContent = type === 'flute' ? "🪈 Playing Flute Trio..." : "🎸 Strumming Guitar...";
            playTone(type === 'flute' ? 440 : 220, type);
        });
    });

    function playTone(freq, type) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type === 'flute' ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
    }
});

// Add keyframes via JS for sway
const style = document.createElement('style');
style.textContent = `
    @keyframes sway {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-2deg); }
        75% { transform: translateX(10px) rotate(2deg); }
    }
`;
document.head.appendChild(style);
