document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Wireframe Grid (Blender Style)
    const wireframeBg = document.getElementById('wireframe-bg');
    for (let i = 0; i < 50; i++) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.background = 'var(--rou-purple)';
        line.style.opacity = '0.2';
        if (Math.random() > 0.5) {
            line.style.width = '100%';
            line.style.height = '1px';
            line.style.top = `${Math.random() * 100}%`;
        } else {
            line.style.height = '100%';
            line.style.width = '1px';
            line.style.left = `${Math.random() * 100}%`;
        }
        wireframeBg.appendChild(line);
    }

    // Ghost Particles
    const spawnGhost = () => {
        const ghost = document.createElement('div');
        ghost.className = 'ghost-particle';
        ghost.innerHTML = Math.random() > 0.5 ? '🔪' : '👻';
        ghost.style.left = `${Math.random() * 100}%`;
        ghost.style.top = `${Math.random() * 100}%`;
        document.body.appendChild(ghost);

        ghost.animate([
            { transform: 'scale(1) translateY(0)', opacity: 0.2 },
            { transform: 'scale(2) translateY(-100px)', opacity: 0 }
        ], { duration: 2000 });
        setTimeout(() => ghost.remove(), 2000);
    };

    setInterval(spawnGhost, 3000);

    // Fever Mode Toggle
    const modeBtn = document.getElementById('mode-toggle');
    let isFever = false;

    modeBtn.addEventListener('click', () => {
        isFever = !isFever;
        if (isFever) {
            document.body.classList.add('fever-active');
            modeBtn.innerText = 'BATTOU_FEVER: ON';
            modeBtn.style.borderColor = 'var(--rou-blood)';
            modeBtn.style.color = 'var(--rou-blood)';
            // Faster ghosts
            const itv = setInterval(spawnGhost, 200);
            setTimeout(() => clearInterval(itv), 5000);
        } else {
            document.body.classList.remove('fever-active');
            modeBtn.innerText = 'BATTOU_FEVER: OFF';
            modeBtn.style.borderColor = 'var(--rou-purple)';
            modeBtn.style.color = 'var(--rou-purple)';
        }
    });

    // Shadow Strike on Click
    document.addEventListener('mousedown', (e) => {
        if (isFever) {
            const line = document.createElement('div');
            line.className = 'strike-line';
            line.style.top = `${e.clientY}px`;
            line.style.left = '0';
            line.style.transform = `rotate(${(Math.random() - 0.5) * 90}deg)`;
            document.body.appendChild(line);
            setTimeout(() => line.remove(), 300);
        }
    });

    // Gera Laughing Effect
    document.querySelectorAll('.profile-item').forEach(item => {
        item.addEventListener('dblclick', (e) => {
            const laugh = document.createElement('div');
            laugh.innerText = '😭 アハハハハ！！涙出るって！！';
            laugh.style.position = 'fixed';
            laugh.style.left = `${e.clientX}px`;
            laugh.style.top = `${e.clientY}px`;
            laugh.style.color = 'white';
            laugh.style.fontWeight = '900';
            laugh.style.zIndex = '1000';
            laugh.style.pointerEvents = 'none';
            document.body.appendChild(laugh);

            laugh.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-50px)' }
            ], { duration: 1000 });
            setTimeout(() => laugh.remove(), 1000);
        });
    });

    // Parallax mouse effect for wolf shadow
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        document.querySelector('.wolf-shadow').style.transform = `rotate(15deg) translate(${x}px, ${y}px)`;
    });
});
