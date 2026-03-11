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

    // Freo by the way Logic
    const freoBtn = document.getElementById('trigger-freo');
    const aliasLabel = document.getElementById('alias-label');
    let isByTheWay = false;

    freoBtn.addEventListener('click', () => {
        isByTheWay = !isByTheWay;
        aliasLabel.innerText = isByTheWay ? 'Freo by the way' : 'Freodore';
        aliasLabel.style.color = isByTheWay ? '#AA0037' : '#FFF';
        
        if (isByTheWay) {
            alert("Freodore: Oops! I forgot the comma again...");
        }
    });

    // Coffee Zatsu Interaction
    const coffeeArea = document.getElementById('coffee-area');
    const grinder = document.getElementById('grinder-icon');
    const msg = document.getElementById('extraction-msg');
    let clicks = 0;

    coffeeArea.addEventListener('click', () => {
        clicks++;
        grinder.style.transform = `rotate(${clicks * 90}deg)`;
        
        if (clicks === 4) msg.innerText = "Grinding...";
        if (clicks === 8) {
            msg.innerText = "Brewing with 4:6 Method... ☕";
            msg.style.color = "#AA0037";
            triggerAroma();
        }
    });

    function triggerAroma() {
        for(let i=0; i<10; i++) {
            const aroma = document.createElement('div');
            aroma.innerText = '✨';
            aroma.style.position = 'absolute';
            aroma.style.left = '50%';
            aroma.style.top = '50%';
            coffeeArea.appendChild(aroma);
            aroma.animate([
                { transform: 'translate(-50%, -50%)', opacity: 1 },
                { transform: `translate(${(Math.random()-0.5)*200}px, -200px)`, opacity: 0 }
            ], 1500).onfinish = () => aroma.remove();
        }
        clicks = 0;
    }

    // Spanish Lesson (Secret Trigger: Press S)
    document.addEventListener('keydown', (e) => {
        if (e.key === 's') {
            const lesson = document.getElementById('lesson-overlay');
            const words = ['Amigo', 'Gracia', 'Familia', 'Música', 'Diseño'];
            document.getElementById('word-val').innerText = words[Math.floor(Math.random() * words.length)];
            lesson.style.display = 'block';
            setTimeout(() => lesson.style.display = 'none', 3000);
        }
    });

    // IOTMO Click (Header)
    document.getElementById('iotmo-status').addEventListener('click', () => {
        alert("Freodore: It's Okay To Miss Out. Take care of yourself first.");
    });

    // Hedgehog float
    const hedgehog = document.getElementById('hedgehog-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 60;
        const y = (e.clientY - window.innerHeight / 2) / 60;
        hedgehog.style.transform = `translate(${x}px, ${y}px)`;
    });
});
