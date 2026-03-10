document.addEventListener('DOMContentLoaded', () => {
    // Nanase Suzuna JS

    // Kabu-kun Clock
    const clock = document.getElementById('time-now');
    const bgSky = document.getElementById('bg-sky');
    const sunriseStatus = document.getElementById('sunrise-status');

    function updateTime() {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();

        const hours = now.getHours();

        // Sunrise Mode Logic (Morning sync)
        if (hours >= 5 && hours < 9) {
            document.body.style.backgroundColor = "#fff9e6";
            sunriseStatus.textContent = "SUNRISE MODE: ACTIVE ☀️";
        } else if (hours >= 22 || hours < 5) {
            document.body.style.backgroundColor = "#e0e0e0";
            sunriseStatus.textContent = "SUNRISE MODE: SLEEPING 😴";
        } else {
            document.body.style.backgroundColor = "#ffffff";
            sunriseStatus.textContent = "SUNRISE MODE: NORMAL 🌤️";
        }
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Smoothie Spill
    const blender = document.getElementById('blender');
    const splash = document.getElementById('smoothie-splash');
    const msg = document.getElementById('blender-msg');
    let shakeCount = 0;

    blender.addEventListener('click', () => {
        shakeCount++;
        blender.classList.add('shaking');
        msg.textContent = "Mixing... " + "🌪️".repeat(shakeCount);

        if (shakeCount >= 5) {
            // SPILL!
            splash.style.opacity = 1;
            msg.textContent = "こぼしたぁ！！！冷たぁい！！🥤😱";

            setTimeout(() => {
                splash.style.opacity = 0;
                shakeCount = 0;
                blender.classList.remove('shaking');
            }, 3000);
        } else {
            setTimeout(() => {
                blender.classList.remove('shaking');
            }, 500);
        }
    });

    // Bedrock Miner
    const blocks = document.querySelectorAll('.block');
    const minerNotes = [
        "Coal: Found some fuel!",
        "Stone: Just another day in the mines.",
        "Diamond: SHINY! 💎",
        "Bedrock: The Ground Queen's throne."
    ];

    blocks.forEach((block, idx) => {
        block.addEventListener('click', () => {
            block.style.transform = "scale(1.2) rotate(10deg)";
            const tooltip = document.createElement('div');
            tooltip.className = 'mine-tooltip';
            tooltip.textContent = minerNotes[idx];
            tooltip.style.position = 'absolute';
            tooltip.style.left = block.offsetLeft + 'px';
            tooltip.style.top = (block.offsetTop - 30) + 'px';
            tooltip.style.background = "black";
            tooltip.style.color = "white";
            tooltip.style.padding = "5px";
            tooltip.style.fontSize = "0.7rem";
            tooltip.style.zIndex = "10";

            block.parentElement.appendChild(tooltip);

            setTimeout(() => {
                block.style.transform = "";
                tooltip.remove();
            }, 1000);
        });
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

    document.querySelectorAll('.breakfast-blender, .veggie-card, .lore-section').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
