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

    // Star System
    const starContainer = document.getElementById('stars');
    function createStar() {
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.random() * 3;
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        starContainer.appendChild(s);
        
        const duration = Math.random() * 3000 + 2000;
        s.animate([
            { opacity: 0, transform: 'scale(0)' },
            { opacity: 0.8, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0)' }
        ], { duration: duration, iterations: Infinity });
    }
    for(let i=0; i<100; i++) createStar();

    // Uki Mama Consult
    const consultBtn = document.getElementById('trigger-consult');
    const bubble = document.getElementById('bubble');
    const quotes = [
        '"Everything will be okay, stargazer."',
        '"Remember to take a deep breath today."',
        '"You are doing amazing, sweetie."',
        '"Mama is always watching over you."',
        '"Drink some water, okay?"'
    ];

    consultBtn.addEventListener('click', () => {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        bubble.innerText = quote;
        bubble.classList.add('show');
        setTimeout(() => bubble.classList.remove('show'), 4000);
    });

    // Ube Incident
    const ube = document.getElementById('ube');
    const mold = document.getElementById('mold');
    const msg = document.getElementById('energy-msg');
    let ubeClicks = 0;

    ube.addEventListener('click', () => {
        ubeClicks++;
        if (ubeClicks >= 5) {
            mold.classList.add('active');
            msg.innerText = "OH NO. THE MOLD.";
            msg.style.color = "#00FF00";
        }
    });

    // Stardust trail on mouse move in energy area
    const area = document.getElementById('energy-area');
    area.addEventListener('mousemove', (e) => {
        const p = document.createElement('div');
        p.className = 'star';
        p.style.left = `${e.clientX - area.getBoundingClientRect().left}px`;
        p.style.top = `${e.clientY - area.getBoundingClientRect().top}px`;
        p.style.width = '5px'; p.style.height = '5px';
        area.appendChild(p);
        p.animate([
            { opacity: 1, transform: 'scale(2)' },
            { opacity: 0, transform: 'scale(0)' }
        ], { duration: 500 }).onfinish = () => p.remove();
    });

    // Crystal movement
    const crystal = document.getElementById('crystal');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        crystal.style.transform = `translate(${x}px, ${y}px)`;
    });
});
