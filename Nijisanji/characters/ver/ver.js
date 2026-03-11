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

    // Soul Reading Interaction
    const readBtn = document.getElementById('trigger-read');
    const overlay = document.getElementById('card-overlay');
    const resultCard = document.getElementById('result-card');
    const prophecyMsg = document.getElementById('prophecy-msg');
    
    const fateCards = [
        { icon: '🐯', msg: 'The White Tiger guards your path.' },
        { icon: '♦', msg: 'A wealth of souls awaits you.' },
        { icon: '🌙', msg: 'Stargazing will reveal your answer.' },
        { icon: '🧪', msg: 'A bit of experimental luck is coming.' },
        { icon: '☕', msg: 'Forget coffee. Have some cake.' }
    ];

    readBtn.addEventListener('click', () => {
        const fate = fateCards[Math.floor(Math.random() * fateCards.length)];
        resultCard.innerText = fate.icon;
        prophecyMsg.innerText = fate.msg;
        
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 3000);
    });

    // Cabbage Avoidance Game
    const cabbageArea = document.getElementById('game-area');
    const target = document.getElementById('target');
    const scoreVal = document.getElementById('score');
    let purity = 100;

    function moveCabbage() {
        const x = Math.random() * (cabbageArea.offsetWidth - 40);
        const y = Math.random() * (cabbageArea.offsetHeight - 40);
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
    }

    target.addEventListener('click', () => {
        moveCabbage();
        purity = Math.min(100, purity + 5);
        scoreVal.innerText = purity;
    });

    setInterval(() => {
        purity = Math.max(0, purity - 1);
        scoreVal.innerText = purity;
        if (purity < 50) {
            scoreVal.style.color = '#800000';
        } else {
            scoreVal.style.color = '#E5C100';
        }
    }, 1000);

    moveCabbage();

    // Shooting Stars
    const starContainer = document.getElementById('stars');
    function createStar() {
        const s = document.createElement('div');
        s.className = 'star';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        starContainer.appendChild(s);
        
        s.animate([
            { transform: 'translateX(0) translateY(0)', opacity: 0 },
            { transform: 'translateX(300px) translateY(300px)', opacity: 1 },
            { transform: 'translateX(600px) translateY(600px)', opacity: 0 }
        ], { duration: 2000 }).onfinish = () => s.remove();
    }
    setInterval(createStar, 800);

    // Card Icon float
    const cardIcon = document.getElementById('card-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        cardIcon.style.transform = `translate(${x}px, ${y}px) rotate(${x*5}deg)`;
    });
});
