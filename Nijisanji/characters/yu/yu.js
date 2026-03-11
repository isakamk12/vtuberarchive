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

    // Hiccup / Coffee System
    const hiccupBtn = document.getElementById('trigger-hiccup');
    const yuLabel = document.getElementById('yu-label');
    const yuImg = document.getElementById('yu-img');
    let hiccupCount = 0;

    hiccupBtn.addEventListener('click', () => {
        hiccupCount++;
        yuLabel.innerText = "COFFEE RUN!!";
        yuLabel.style.color = "#FFCC00";
        
        if (hiccupCount % 3 === 0) {
            triggerHiccup();
        }
    });

    function triggerHiccup() {
        yuLabel.innerText = "*HICCUP*";
        yuLabel.style.color = "#FF4444";
        yuImg.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0)' }
        ], { duration: 100 });
        
        const h = document.createElement('div');
        h.innerText = "HIC!";
        h.style.position = 'fixed';
        h.style.left = '50%'; h.style.top = '40%';
        h.style.color = 'white';
        h.style.fontWeight = '900';
        document.body.appendChild(h);
        h.animate([{ opacity: 1, top: '40%' }, { opacity: 0, top: '30%' }], 500).onfinish = () => h.remove();
    }

    // Mention Jar Interaction
    const jarArea = document.getElementById('jar-area');
    const balance = document.getElementById('balance');
    let penalty = 0;

    jarArea.addEventListener('click', (e) => {
        penalty += 10;
        balance.innerText = penalty;
        
        const c = document.getElementById('coin');
        const coin = c.cloneNode(true);
        coin.style.opacity = '1';
        coin.style.left = `${e.clientX - jarArea.getBoundingClientRect().left}px`;
        coin.style.top = `${e.clientY - jarArea.getBoundingClientRect().top}px`;
        jarArea.appendChild(coin);
        
        coin.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-100px) rotate(360deg)', opacity: 0 }
        ], 500).onfinish = () => coin.remove();
        
        if (penalty > 100) {
            triggerBabubabu();
        }
    });

    function triggerBabubabu() {
        const b = document.createElement('div');
        b.innerText = "GOOOO GAGA GANG!";
        b.style.position = 'fixed';
        b.style.bottom = '10%';
        b.style.width = '100%';
        b.style.textAlign = 'center';
        b.style.fontSize = '3rem';
        b.style.fontFamily = 'Bangers';
        b.style.color = '#FFCC00';
        document.body.appendChild(b);
        b.animate([{ opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1.2 }, { opacity: 0, scale: 2 }], 1500).onfinish = () => b.remove();
        penalty = 0;
        balance.innerText = "0";
    }

    // Tentapod tracking
    const tentapod = document.getElementById('tentapod');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        tentapod.style.left = `${x + 20}px`;
        tentapod.style.top = `${y + 20}px`;
    });

    // ASH Scan (Secret)
    document.addEventListener('keydown', (e) => {
        if (e.key === 's') {
            const scan = document.getElementById('ash-scan');
            scan.style.display = 'block';
            setTimeout(() => scan.style.display = 'none', 1000);
        }
    });

    // Pigeon float
    const pigeon = document.getElementById('pigeon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 60;
        const y = (e.clientY - window.innerHeight / 2) / 60;
        pigeon.style.transform = `translate(${x}px, ${y}px)`;
    });
});
