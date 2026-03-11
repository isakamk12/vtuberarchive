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

    // Snowflake Spawner
    const snowContainer = document.getElementById('snow');
    function createSnow() {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        const size = Math.random() * 5 + 2;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.top = '-10px';
        
        snowContainer.appendChild(flake);

        const duration = Math.random() * 5000 + 5000;
        const animation = flake.animate([
            { top: '-10px', transform: 'translateX(0)' },
            { top: '105%', transform: `translateX(${Math.random() * 100 - 50}px)` }
        ], { duration: duration, easing: 'linear' });

        animation.onfinish = () => flake.remove();
    }
    setInterval(createSnow, 200);

    // Peter Mode Toggle
    const peterBtn = document.getElementById('summon-peter');
    let peterActive = false;
    peterBtn.addEventListener('click', () => {
        peterActive = !peterActive;
        document.body.classList.toggle('peter-mode');
        peterBtn.innerText = peterActive ? 'PETER GURIN 🕶️' : 'SUMMON PETER 🕶️';
        
        // Frost effect
        const frost = document.getElementById('frost');
        frost.style.opacity = peterActive ? '1' : '0';
    });

    // Pity Falling Game
    const petraDisk = document.getElementById('target-petra');
    const fallArea = document.getElementById('fall-area');
    let isFalling = true;

    function resetPetra() {
        petraDisk.style.top = '20px';
        petraDisk.style.left = '50%';
        isFalling = true;
    }

    petraDisk.addEventListener('mousedown', () => {
        isDragon = false; // logic check
        isFalling = false;
        petraDisk.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isFalling = true;
        petraDisk.style.cursor = 'grab';
    });

    setInterval(() => {
        if (isFalling) {
            let top = parseInt(petraDisk.style.top || 20);
            if (top < 330) {
                petraDisk.style.top = `${top + 5}px`;
            } else {
                // Hit bottom!
                petraDisk.style.transform = 'scale(1.5) rotate(180deg)';
                setTimeout(() => {
                    petraDisk.style.transform = 'scale(1) rotate(0)';
                    resetPetra();
                }, 1000);
            }
        }
    }, 50);

    resetPetra();
});
