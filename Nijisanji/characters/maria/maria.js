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

    // Doll Mode Toggle
    const dollBtn = document.getElementById('toggle-doll');
    const stateLabel = document.getElementById('state-label');
    const dollForm = document.getElementById('doll-form');
    let isDoll = false;

    dollBtn.addEventListener('click', () => {
        isDoll = !isDoll;
        document.body.classList.toggle('doll-mode');
        stateLabel.innerText = isDoll ? 'DOLL (Original)' : 'EVOLVED';
        dollForm.innerText = isDoll ? 'DOLL' : 'HUMAN';
        dollBtn.innerText = isDoll ? 'WAKE UP TO HUMANITY 🐰' : 'REVERT TO DOLL FORM 🩹';
        
        if (isDoll) {
            triggerKanjiSpread();
        }
    });

    // Kanji Flash (10-hour grind celebration)
    function triggerKanjiSpread() {
        const kanjis = ['あ','い','う','え','お','か','き','く','け','こ','漢','字'];
        for(let i=0; i<20; i++) {
            const k = document.createElement('div');
            k.className = 'kanji-flash';
            k.innerText = kanjis[Math.floor(Math.random() * kanjis.length)];
            k.style.left = `${Math.random() * 100}%`;
            k.style.top = `${Math.random() * 100}%`;
            document.body.appendChild(k);
            
            k.animate([
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1.5 },
                { opacity: 0, scale: 0 }
            ], { duration: 1000 }).onfinish = () => k.remove();
        }
    }

    // Potato Haiku Generator
    const haikuBtn = document.getElementById('generate-haiku');
    const output = document.getElementById('haiku-output');
    const haikulines = [
        ["I like potato", "Potato is nice", "I eat potato"],
        ["Soft ball of starch", "Fries are very good to me", "Potato my love"],
        ["Dolls don't eat food", "But potato is a soul", "Mashed with love today"],
        ["5-7-5", "Potato has five syllables?", "No, I just want it"]
    ];

    haikuBtn.addEventListener('click', () => {
        const set = haikulines[Math.floor(Math.random() * haikulines.length)];
        output.innerHTML = set.join('<br>');
        output.style.color = '#E55A9B';
        output.animate([
            { transform: 'scale(0.8)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 500 });
    });

    // String interaction
    const area = document.getElementById('string-area');
    area.addEventListener('click', (e) => {
        const s = document.createElement('div');
        s.className = 'm-string';
        s.style.left = `${e.clientX - area.getBoundingClientRect().left}px`;
        s.style.top = `0`;
        s.style.height = `${e.clientY - area.getBoundingClientRect().top}px`;
        area.appendChild(s);
        setTimeout(() => s.remove(), 1000);
    });

    // Bunny float
    const bunny = document.getElementById('bunny');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        bunny.style.transform = `translate(${x}px, ${y}px)`;
    });
});
