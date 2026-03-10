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

    // Stars/Constellation Background
    const starsContainer = document.getElementById('stars-container');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }

    // Tentacle Silhouettes
    const tentacleLayer = document.querySelector('.tentacle-silhouette-layer');
    for (let i = 0; i < 4; i++) {
        const t = document.createElement('div');
        t.className = 'tentacle';
        t.innerHTML = '<i class="fa-solid fa-octopus-deploy"></i>';
        t.style.left = `${Math.random() * 80}%`;
        t.style.top = `${Math.random() * 80}%`;
        t.style.transform = `rotate(${Math.random() * 360}deg)`;
        tentacleLayer.appendChild(t);
    }

    // Mode Toggle (Appraisal Mode)
    const modeBtn = document.getElementById('mode-toggle');
    let isAppraising = false;

    modeBtn.addEventListener('click', () => {
        isAppraising = !isAppraising;
        if (isAppraising) {
            document.body.classList.add('appraisal-mode');
            modeBtn.innerText = '鑑定モード：アクティブ';
            modeBtn.style.color = 'var(--sho-gold)';
            modeBtn.style.borderColor = 'var(--sho-gold)';
        } else {
            document.body.classList.remove('appraisal-mode');
            modeBtn.innerText = '鑑定モード：OFF';
            modeBtn.style.color = 'var(--sho-purple)';
            modeBtn.style.borderColor = 'var(--sho-purple)';
        }
    });

    // Cosmic Transformation on Header Hover
    const header = document.querySelector('.character-header');
    header.addEventListener('mouseenter', () => {
        document.body.classList.add('transform-active');
    });
    header.addEventListener('mouseleave', () => {
        document.body.classList.remove('transform-active');
    });

    // Random Fake Price Tags on click
    document.addEventListener('mousedown', (e) => {
        if (isAppraising) {
            const tag = document.createElement('div');
            tag.style.position = 'fixed';
            tag.style.left = `${e.clientX}px`;
            tag.style.top = `${e.clientY}px`;
            tag.style.background = 'var(--sho-gold)';
            tag.style.color = 'black';
            tag.style.padding = '2px 5px';
            tag.style.fontSize = '0.6rem';
            tag.style.fontWeight = '900';
            tag.style.zIndex = '1000';
            tag.style.pointerEvents = 'none';
            tag.innerText = `鑑定額：${Math.floor(Math.random() * 100000000)}宇宙円`;
            document.body.appendChild(tag);

            setTimeout(() => {
                tag.style.transition = 'all 1s ease-out';
                tag.style.transform = 'translateY(-50px) rotate(10deg)';
                tag.style.opacity = '0';
                setTimeout(() => tag.remove(), 1000);
            }, 10);
        }
    });

    // Mouse movement parallax for tentacles
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        document.querySelectorAll('.tentacle').forEach(t => {
            t.style.transform += ` translate(${x}px, ${y}px)`;
        });
    });
});
