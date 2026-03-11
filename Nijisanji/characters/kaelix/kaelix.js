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

    // Cardboard Kaelix Logic
    const cardBtn = document.getElementById('trigger-cardboard');
    const presenceLabel = document.getElementById('presence-label');
    const cardboardVal = document.getElementById('cardboard-val');
    const cardboardPanel = document.getElementById('cardboard-kaelix');
    const kaelixImg = document.getElementById('kaelix-img');
    let isCardboard = false;

    cardBtn.addEventListener('click', () => {
        isCardboard = !isCardboard;
        presenceLabel.innerText = isCardboard ? 'CARDBOARD 📦' : 'PHYSICAL';
        cardboardVal.innerText = isCardboard ? 'NO (CARDBOARD)' : 'YES';
        cardboardPanel.style.display = isCardboard ? 'block' : 'none';
        kaelixImg.style.opacity = isCardboard ? '0.3' : '1';
        
        if (isCardboard) {
            alert("Kaelix: I'm not here right now. Please talk to Cardboard Kaelix.");
        }
    });

    // Vocal Range Interaction
    const vocalArea = document.getElementById('vocal-area');
    const bar = document.getElementById('bar');
    const note = document.getElementById('note-val');
    const ranges = [
        { height: '10%', note: 'G#2 - Low Bouncer' },
        { height: '40%', note: 'C3 - Smooth Jazz' },
        { height: '70%', note: 'A4 - Classical Peak' },
        { height: '100%', note: 'G5 - High Siren' }
    ];
    let rangeIdx = 0;

    vocalArea.addEventListener('click', () => {
        rangeIdx = (rangeIdx + 1) % ranges.length;
        bar.style.height = ranges[rangeIdx].height;
        note.innerText = ranges[rangeIdx].note;
    });

    // Dog Bark (Secret Trigger: Press D)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'd') {
            const bark = document.getElementById('bark-fx');
            bark.style.display = 'block';
            setTimeout(() => bark.style.display = 'none', 1000);
            console.log("Kaelix: Woof! Sorry, just practicing my barking.");
        }
    });

    // Monkey Army
    const monkeyContainer = document.getElementById('monkeys');
    function createMonkey() {
        const m = document.createElement('div');
        m.className = 'monkey';
        m.innerText = '🐒';
        m.style.left = `${Math.random() * 100}%`;
        m.style.top = `${Math.random() * 100}%`;
        monkeyContainer.appendChild(m);
        
        m.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 0.2, transform: 'scale(1.2)' },
            { opacity: 0, transform: 'scale(0)' }
        ], { duration: 3000 }).onfinish = () => m.remove();
    }
    setInterval(createMonkey, 2000);

    // Ticket float
    const ticket = document.getElementById('ticket-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 1.5) / 40;
        ticket.style.transform = `translate(${x}px, ${y}px) rotate(${x*2}deg)`;
    });

    // Small Finger Injury (Double click image)
    kaelixImg.addEventListener('dblclick', () => {
        alert("Kaelix: OUCH! I just hit my pinky finger on the bed frame while dancing...");
    });
});
