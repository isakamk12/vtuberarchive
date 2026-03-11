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

    // Crazy-dayo Logic
    const crazyBtn = document.getElementById('trigger-crazy');
    const vantaLabel = document.getElementById('vanta-label');
    const kurokocco = document.getElementById('kurokocco');
    let isCrazy = false;

    crazyBtn.addEventListener('click', () => {
        isCrazy = !isCrazy;
        vantaLabel.innerText = isCrazy ? 'CRAZY-DAYO! 👹' : 'COOL';
        vantaLabel.style.color = isCrazy ? '#CC0000' : '#FFF';
        
        if (isCrazy) {
            triggerFeatherBlast();
            kurokocco.style.transform = 'scale(2) rotate(360deg)';
        } else {
            kurokocco.style.transform = 'scale(1) rotate(0deg)';
        }
    });

    // Battle Cry Simulator
    const cryBtn = document.getElementById('cry-btn');
    const wave = document.getElementById('wave');
    cryBtn.addEventListener('click', () => {
        wave.animate([
            { transform: 'scaleY(1)', opacity: 0.3 },
            { transform: 'scaleY(6)', opacity: 1 },
            { transform: 'scaleY(1)', opacity: 0.3 }
        ], { duration: 500, iterations: 2 });
        
        const shout = document.createElement('div');
        shout.innerText = "NOT A SCREAM! IT'S A BATTLE CRY!!";
        shout.style.position = 'fixed';
        shout.style.left = '50%'; shout.style.top = '50%';
        shout.style.transform = 'translate(-50%, -50%)';
        shout.style.fontSize = '2rem';
        shout.style.fontWeight = '900';
        shout.style.color = '#CC0000';
        shout.style.zIndex = '1000';
        document.body.appendChild(shout);
        shout.animate([{ opacity: 1, scale: 1 }, { opacity: 0, scale: 3 }], 1000).onfinish = () => shout.remove();
    });

    // Shoe Shock (Secret prompt)
    const vantaImg = document.getElementById('vanta-img');
    const bootShock = document.getElementById('boot-shock');
    vantaImg.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        bootShock.style.display = 'flex';
        setTimeout(() => bootShock.style.display = 'none', 3000);
    });

    // Feather particles
    function triggerFeatherBlast() {
        for(let i=0; i<20; i++) {
            const f = document.createElement('div');
            f.className = 'feather';
            f.style.left = `${Math.random() * 100}%`;
            f.style.top = `${Math.random() * 100}%`;
            document.getElementById('feathers').appendChild(f);
            
            f.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random()*720}deg)`, opacity: 0 }
            ], { duration: 2000 + Math.random()*2000 }).onfinish = () => f.remove();
        }
    }

    // Kurokocco movement
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        kurokocco.style.left = `calc(80% + ${x}px)`;
        kurokocco.style.top = `calc(20% + ${y}px)`;
    });
});
