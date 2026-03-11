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

    // Feather Spawner
    const feathersContainer = document.getElementById('feathers');
    function createFeather() {
        const f = document.createElement('div');
        f.className = 'feather';
        f.style.left = `${Math.random() * 100}%`;
        f.style.top = '-20px';
        f.style.transform = `rotate(${Math.random() * 360}deg)`;
        feathersContainer.appendChild(f);

        const duration = Math.random() * 5000 + 5000;
        f.animate([
            { top: '-20px', transform: 'rotate(0deg) translateX(0)' },
            { top: '105%', transform: `rotate(360deg) translateX(${Math.random() * 100 - 50}px)` }
        ], { duration: duration, easing: 'ease-in-out' }).onfinish = () => f.remove();
    }
    setInterval(createFeather, 1000);

    // Gremlin Toggle
    const gremlinBtn = document.getElementById('unleash-gremlin');
    const gremlinVal = document.getElementById('gremlin-val');
    const glitch = document.getElementById('glitch');
    let gremlinLevel = 0;

    gremlinBtn.addEventListener('click', () => {
        gremlinLevel += 10;
        if (gremlinLevel > 100) gremlinLevel = 100;
        gremlinVal.innerText = `${gremlinLevel}%`;
        
        if (gremlinLevel >= 50) {
            document.body.classList.add('gremlin-active');
            glitch.style.opacity = '1';
        }
        
        // Random "Finals Stenosis" popups?
        if (Math.random() > 0.7) {
            showStenosis();
        }
    });

    function showStenosis() {
        const popup = document.createElement('div');
        popup.innerText = "FINALS STENOSIS";
        popup.style.position = 'fixed';
        popup.style.left = `${Math.random() * 80}%`;
        popup.style.top = `${Math.random() * 80}%`;
        popup.style.color = '#B0C4DE';
        popup.style.fontWeight = '900';
        popup.style.fontSize = '2rem';
        popup.style.zIndex = '1000';
        popup.style.pointerEvents = 'none';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1000);
    }

    // Music Visualizer Mock
    const viz = document.getElementById('viz');
    const singBtn = document.getElementById('sing-btn');
    const numBars = 15;
    for(let i=0; i<numBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        viz.appendChild(bar);
    }

    let isSinging = false;
    singBtn.addEventListener('click', () => {
        isSinging = !isSinging;
        singBtn.innerText = isSinging ? 'STOP SINGING 🔇' : 'SING FOR US 🎤';
        if (isSinging) animateBars();
    });

    function animateBars() {
        if (!isSinging) return;
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const h = Math.random() * 100 + 10;
            bar.style.height = `${h}px`;
        });
        setTimeout(animateBars, 100);
    }

    // Notes hover
    const notes = document.getElementById('notes');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 40;
        const y = (e.clientY - window.innerHeight / 2) / 40;
        notes.style.transform = `translate(${x}px, ${y}px)`;
    });
});
