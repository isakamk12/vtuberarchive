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

    // Zeepaw Mode Logic
    const zeepawBtn = document.getElementById('trigger-zeepaw');
    const zeepawLabel = document.getElementById('zeepaw-label');
    let isZeepaw = false;

    zeepawBtn.addEventListener('click', () => {
        isZeepaw = !isZeepaw;
        zeepawLabel.innerText = isZeepaw ? 'ZEEPAW (4:3 PPT) 👴' : 'MODERN';
        zeepawLabel.style.color = isZeepaw ? '#FFD700' : '#FFF';
        
        if (isZeepaw) {
            document.body.style.filter = 'sepia(0.5)';
            alert("Zeal: Back in my day, we only had 4:3 aspect ratio PowerPoints...");
        } else {
            document.body.style.filter = 'none';
        }
    });

    // Mixology Interaction
    const mixArea = document.getElementById('mix-area');
    const glass = document.getElementById('cocktail');
    const msg = document.getElementById('pour-msg');
    const shakerIcon = document.getElementById('shaker-icon');
    let shakeCount = 0;

    mixArea.addEventListener('click', () => {
        shakeCount++;
        shakerIcon.animate([
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: 'translateY(-20px) rotate(45deg)' },
            { transform: 'translateY(0) rotate(0deg)' }
        ], 200);

        if (shakeCount === 5) {
            msg.innerText = "Pouring Cuba Libre...";
            glass.innerText = "🍷";
        }
        if (shakeCount === 10) {
            msg.innerText = "Matcha Special Ready!";
            glass.innerText = "🍵";
            triggerProsekai();
            shakeCount = 0;
        }
    });

    function triggerProsekai() {
        const fx = document.getElementById('rhythm-overlay');
        fx.style.display = 'block';
        setTimeout(() => fx.style.display = 'none', 1000);
    }

    // Microwaved Coffee Interaction (Right click shaker)
    shakerIcon.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert("Zeal: Just putting the cold coffee in the microwave... Don't tell Freodore.");
    });

    // Shaker float
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        shakerIcon.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Wink/Kiss service (Double click Zeal)
    const zealImg = document.getElementById('zeal-img');
    zealImg.addEventListener('dblclick', () => {
        alert("Zeal: *Winks* This one is on the house, Zerpents! 😉😘");
    });
});
