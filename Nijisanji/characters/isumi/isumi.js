document.addEventListener('DOMContentLoaded', () => {
    // Shirose Isumi JS

    // Makeup Toggle
    const makeupBtn = document.getElementById('makeup-btn');
    const mainImg = document.getElementById('main-isumi');
    const sparkleContainer = document.getElementById('sparkles');
    let makeupOn = true;

    makeupBtn.addEventListener('click', () => {
        makeupOn = !makeupOn;
        makeupBtn.textContent = makeupOn ? "MAKEUP ON ✨" : "MAKEUP OFF 🧼";
        mainImg.style.filter = makeupOn ? "contrast(1.1) saturate(1.1)" : "grayscale(0.2) opacity(0.8)";

        if (makeupOn) {
            createSparkles(10);
        }
    });

    function createSparkles(count) {
        for (let i = 0; i < count; i++) {
            const s = document.createElement('div');
            s.className = 'sparkle';
            s.textContent = '✨';
            s.style.left = Math.random() * 100 + 'vw';
            s.style.top = '-20px';
            s.style.animationDelay = Math.random() * 2 + 's';
            sparkleContainer.appendChild(s);
            setTimeout(() => s.remove(), 3000);
        }
    }

    // Dreamy Sleep Mode
    const overlay = document.getElementById('sleep-overlay');
    let activityTimer;

    function resetTimer() {
        overlay.style.background = "rgba(0, 0, 50, 0)";
        clearTimeout(activityTimer);
        activityTimer = setTimeout(() => {
            overlay.style.background = "rgba(0, 0, 50, 0.4)";
            showStatus("Sleeping Beauty Mode... Zzz");
        }, 10000); // 10 seconds idle to sleep
    }

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('scroll', resetTimer);
    resetTimer();

    // Horror Jump-scare
    const ghost = document.getElementById('ghost');
    const visual = document.getElementById('isumi-visual');

    visual.addEventListener('mouseenter', () => {
        if (Math.random() > 0.8) { // 20% chance to scare
            ghost.style.opacity = "1";
            ghost.style.filter = "blur(0)";
            ghost.style.transform = "scale(2) translate(-50%, -50%)";
            mainImg.style.transform = "translateX(5px) rotate(2deg)";

            setTimeout(() => {
                ghost.style.opacity = "0";
                ghost.style.filter = "blur(5px)";
                ghost.style.transform = "scale(1)";
                mainImg.style.transform = "";
            }, 500);
        }
    });

    // Macaron interaction
    const macaron = document.getElementById('macaron');
    macaron.addEventListener('click', () => {
        const types = ['🍬', '🍭', '🧁', '🍮', '🍩'];
        macaron.textContent = types[Math.floor(Math.random() * types.length)];
        createSparkles(5);
    });

    function showStatus(msg) {
        console.log(msg); // Status hidden for now
    }
});
