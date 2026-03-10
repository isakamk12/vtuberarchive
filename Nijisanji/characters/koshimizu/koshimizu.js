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

    // Neet Clock
    const clock = document.getElementById('neet-clock');
    const updateTime = () => {
        const now = new Date();
        clock.innerText = now.toTimeString().split(' ')[0];
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Mode Toggle - Poya
    const btn = document.getElementById('mode-toggle');
    btn.addEventListener('click', () => {
        document.body.classList.toggle('poya-mode');
        if (document.body.classList.contains('poya-mode')) {
            btn.innerText = 'WAKE UP ( maybe )';
        } else {
            btn.innerText = 'TOGGLE POYA MODE';
        }
    });

    // Bubbles
    const createBubble = () => {
        const layer = document.querySelector('.bubble-layer');
        if (!layer) return;
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 50 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubble.style.opacity = Math.random() * 0.5 + 0.1;
        layer.appendChild(bubble);
        setTimeout(() => bubble.remove(), 20000);
    };

    for (let i = 0; i < 10; i++) createBubble();
    setInterval(createBubble, 2000);

    // Mouse Interaction - Bubbles pop
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('bubble')) {
            e.target.style.transform = 'scale(1.5)';
            e.target.style.opacity = '0';
            setTimeout(() => e.target.remove(), 200);
        }
    });

    // Cat follow effect (subtle)
    const cat = document.querySelector('.cat-silhouette');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        cat.style.transform = `translate(${x}px, ${y}px)`;
    });
});
