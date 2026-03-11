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

    // Cloud Spawner
    const cloudsContainer = document.getElementById('clouds');
    function createCloud() {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        const size = Math.random() * 200 + 100;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size / 2}px`;
        cloud.style.top = `${Math.random() * 80}%`;
        cloud.style.left = '-300px';
        
        cloudsContainer.appendChild(cloud);

        const duration = Math.random() * 20000 + 10000;
        const animation = cloud.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(${window.innerWidth + 600}px)` }
        ], {
            duration: duration,
            easing: 'linear'
        });

        animation.onfinish = () => cloud.remove();
    }
    setInterval(createCloud, 3000);
    for(let i=0; i<5; i++) createCloud();

    // Dragon Transform
    const toggleBtn = document.getElementById('toggle-dragon');
    const dragonStatus = document.getElementById('dragon-status');
    const eliraImg = document.getElementById('elira-img');
    let isDragon = false;

    toggleBtn.addEventListener('click', () => {
        isDragon = !isDragon;
        document.body.classList.toggle('dragon-active');
        dragonStatus.innerText = isDragon ? 'ON (1,432cm)' : 'OFF';
        toggleBtn.innerText = isDragon ? 'REVERT 🌤' : 'TRANSFORM ☀️';
        
        // Simple visual feedback
        eliraImg.style.transform = isDragon ? 'scale(1.1) brightness(1.2)' : 'scale(1)';
        
        const flare = document.getElementById('flare');
        flare.style.opacity = '1';
        setTimeout(() => flare.style.opacity = '0', 500);
    });

    // Niagara Niagara Machinegun Talk
    const talkBtn = document.getElementById('talk-btn');
    const stream = document.getElementById('niagara-stream');
    const niagaraWords = [
        "NIAGARA", "FALLS", "WATER", "CANADA", "FAST", "TALK", "ELIRA", "PENDORA", 
        "LazuLight", "Dragon", "Solar", "Sky", "SkyDragon", "Fastest", "Machinegun",
        "ナイアガラ", "滝", "カナダ人", "構文", "マシンガントーク", "竜人", "エリーラ"
    ];

    let talkInterval;
    talkBtn.addEventListener('mousedown', () => {
        talkInterval = setInterval(() => {
            const word = document.createElement('span');
            word.className = 'word-particle';
            word.innerText = niagaraWords[Math.floor(Math.random() * niagaraWords.length)];
            word.style.color = `hsl(${Math.random() * 40 + 190}, 70%, 70%)`;
            stream.appendChild(word);
            stream.scrollTop = stream.scrollHeight;
            
            // Limit count
            if (stream.children.length > 100) stream.removeChild(stream.firstChild);
        }, 50);
    });

    window.addEventListener('mouseup', () => {
        clearInterval(talkInterval);
    });

    // Pichi Floating
    const pichi = document.getElementById('pichi');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        pichi.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
    });
});
