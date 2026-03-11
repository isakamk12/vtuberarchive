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

    // Credit Card Swipe Logic
    const swipeBtn = document.getElementById('trigger-swipe');
    const ryomaLabel = document.getElementById('ryoma-label');
    const limitVal = document.getElementById('limit-val');

    swipeBtn.addEventListener('click', () => {
        ryomaLabel.innerText = "SWIPING!! 💳";
        ryomaLabel.style.color = "#00ECFF";
        
        limitVal.innerText = "VOID";
        limitVal.style.color = "red";
        
        triggerCarDrift();
        
        setTimeout(() => {
            alert("Ryoma: New PC parts? Custom JDM exhaust? SWIPE.");
        }, 500);
    });

    function triggerCarDrift() {
        const car = document.getElementById('car-fx');
        car.animate([
            { left: '-100px' },
            { left: '110%' }
        ], { duration: 1500, easing: 'cubic-bezier(0.19, 1, 0.22, 1)' });
    }

    // Apex Aim Training
    const apexArea = document.getElementById('game-area');
    const target = document.getElementById('target');
    const comboVal = document.getElementById('combo');
    let combo = 0;

    function moveTarget() {
        const x = Math.random() * (apexArea.offsetWidth - 50);
        const y = Math.random() * (apexArea.offsetHeight - 50);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    target.addEventListener('mousedown', () => {
        combo++;
        comboVal.innerText = combo;
        moveTarget();
        
        if (combo % 5 === 0) {
            apexArea.style.borderColor = "#00ECFF";
            setTimeout(() => apexArea.style.borderColor = "#FFD700", 200);
        }
    });

    moveTarget();

    // Escape Logic (Secret: Click Ryoma Image)
    const ryomaImg = document.getElementById('ryoma-img');
    const escapeMsg = document.getElementById('escape-msg');
    
    ryomaImg.addEventListener('click', () => {
        escapeMsg.style.display = 'block';
        ryomaImg.style.transform = 'skew(30deg) translateX(500px)';
        ryomaImg.style.opacity = '0';
        
        setTimeout(() => {
            escapeMsg.style.display = 'none';
            ryomaImg.style.transform = 'none';
            ryomaImg.style.opacity = '1';
        }, 3000);
    });

    // Card float
    const cardIcon = document.getElementById('card-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        cardIcon.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Cold Shower Reveal (Double Click Card)
    cardIcon.addEventListener('dblclick', () => {
        alert("Ryoma: 365-Day Cold Shower Challenge is active! 60 seconds of ice water builds character.");
    });
});
