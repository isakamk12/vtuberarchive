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

    // Uniform Toggle
    const toggleBtn = document.getElementById('toggle-uniform');
    const dutyLabel = document.getElementById('duty-label');
    const albanImg = document.getElementById('alban-img');
    let isKonbini = false;

    toggleBtn.addEventListener('click', () => {
        isKonbini = !isKonbini;
        document.body.classList.toggle('konbini-mode');
        dutyLabel.innerText = isKonbini ? 'CONVENIENCE (Manager)' : 'STEALTH (Thief)';
        toggleBtn.innerText = isKonbini ? 'REVERT TO THIEF 🎭' : 'SWITCH TO KONBINI 🛒';
        
        // Simple visual feedback
        albanImg.style.filter = isKonbini ? 'sepia(0.5) hue-rotate(100deg)' : 'none';
        
        if (isKonbini) triggerCatPop("IRASSHAIMASE! 🏪");
    });

    // Treasure Hunt
    const treasure = document.getElementById('treasure');
    const huntArea = document.getElementById('hunt-area');
    const huntMsg = document.getElementById('hunt-msg');

    function hideTreasure() {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 60 + 20;
        treasure.style.left = `${x}%`;
        treasure.style.top = `${y}%`;
        treasure.classList.remove('found');
    }

    treasure.addEventListener('click', () => {
        treasure.classList.add('found');
        huntMsg.innerText = "YOU FOUND IT! Alban's HEART! ❤️";
        huntMsg.style.color = "#FF5F00";
        triggerCatPop("POG! NYA! 💎");
        setTimeout(() => {
            hideTreasure();
            huntMsg.innerText = "Find the diamond!";
            huntMsg.style.color = "white";
        }, 2000);
    });

    hideTreasure();

    // Cat Appears randomly or on click
    const meow = document.getElementById('meow');
    const ears = document.getElementById('cat-ears');
    
    ears.addEventListener('click', () => {
        triggerCatPop("NYA~~! 🐱");
    });

    function triggerCatPop(text) {
        meow.innerText = text;
        meow.style.display = 'block';
        setTimeout(() => meow.style.display = 'none', 1500);
    }

    // Floating Ears follow mouse
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 60;
        const y = (e.clientY - window.innerHeight / 2) / 60;
        ears.style.transform = `translate(${x}px, ${y}px) rotate(${x*2}deg)`;
    });
});
