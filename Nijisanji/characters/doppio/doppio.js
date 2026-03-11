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

    // "The D stands for..." logic
    const dBtn = document.getElementById('trigger-d');
    const dLabel = document.getElementById('d-label');
    const dWords = [
        'DELIGHTFUL', 'DISCIPLINE', 'DYNAMIC', 'DORKY', 'DANTE', 'DOOM', 'DOLCE', 'DOPPIO'
    ];

    dBtn.addEventListener('click', () => {
        const word = dWords[Math.floor(Math.random() * dWords.length)];
        dLabel.innerText = word;
        dLabel.style.color = '#FF00FF';
        dLabel.animate([
            { transform: 'scale(1.2)', opacity: 0.5 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 300 });
    });

    // Ball Pool Dive Interaction
    const poolArea = document.getElementById('pool-area');
    const colors = ['#FF00FF', '#00FFFF', '#FFFF00', '#FFFFFF'];
    
    poolArea.addEventListener('click', (e) => {
        for(let i=0; i<10; i++) {
            createBall(e.clientX - poolArea.getBoundingClientRect().left, e.clientY - poolArea.getBoundingClientRect().top);
        }
    });

    function createBall(x, y) {
        const b = document.createElement('div');
        b.className = 'ball';
        b.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        b.style.left = `${x}px`;
        b.style.top = `${y}px`;
        poolArea.appendChild(b);

        b.animate([
            { transform: 'translate(-50%, -50%) scale(0.5)', top: `${y}px`, left: `${x}px` },
            { transform: `translate(${(Math.random()-0.5)*300}px, ${(Math.random()-0.5)*300}px) scale(1)`, top: '120%', opacity: 0 }
        ], { duration: 800 + Math.random()*500 }).onfinish = () => b.remove();
    }

    // Doppio Nugget click
    const nugget = document.getElementById('nugget');
    nugget.addEventListener('click', () => {
        alert("Doppio: Did someone say NUGGETS? Try my special recipe!");
    });

    // Oliver Evans Fall Effect (Secret Trigger)
    const doppioImg = document.getElementById('doppio-img');
    const fallOverlay = document.getElementById('fall-overlay');
    
    doppioImg.addEventListener('dblclick', () => {
        fallOverlay.style.display = 'flex';
        doppioImg.style.transform = 'rotate(90deg) translateY(100px)';
        setTimeout(() => {
            fallOverlay.style.display = 'none';
            doppioImg.style.transform = 'none';
        }, 2000);
    });

    // Scythe float
    const scythe = document.getElementById('scythe');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        scythe.style.transform = `translate(${x}px, ${y}px) rotate(${x*2}deg)`;
    });
});
