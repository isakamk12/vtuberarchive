document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Gonzalez Hamster Movement
    const gonzalez = document.getElementById('gonzalez-mascot');
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;

    const moveGonzalez = () => {
        posX = Math.random() * (window.innerWidth - 100);
        posY = Math.random() * (window.innerHeight - 100);
        gonzalez.style.left = posX + 'px';
        gonzalez.style.top = posY + 'px';
    };

    setInterval(moveGonzalez, 3000);
    moveGonzalez();

    // Height Madness Interaction
    const heightItem = document.getElementById('height-item');
    const heightValue = heightItem.querySelector('.value');
    const heightLabels = ["150cm未満", "5m", "1000億m", "3000万光年", "計測不能"];
    let hIndex = 0;

    heightItem.addEventListener('click', () => {
        hIndex = (hIndex + 1) % heightLabels.length;
        heightValue.innerText = heightLabels[hIndex];
        heightValue.style.transform = `scale(${1 + hIndex * 0.1})`;
        heightValue.style.color = hIndex > 0 ? 'var(--chima-accent)' : 'var(--text-main)';
    });

    // Wall Break Easter Egg
    const enName = document.getElementById('chima-name');
    const secretLayer = document.getElementById('secret-effect-layer');

    enName.addEventListener('click', () => {
        // Shaking effect
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => document.body.style.animation = '', 500);

        // Spawn fragments
        for (let i = 0; i < 20; i++) {
            const frag = document.createElement('div');
            frag.className = 'wall-fragment';
            frag.style.width = (20 + Math.random() * 50) + 'px';
            frag.style.height = (20 + Math.random() * 50) + 'px';
            frag.style.left = '50%';
            frag.style.top = '50%';

            const angle = Math.random() * Math.PI * 2;
            const dist = 200 + Math.random() * 500;
            const vx = Math.cos(angle) * dist;
            const vy = Math.sin(angle) * dist;

            secretLayer.appendChild(frag);

            frag.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, 1, 0.5, 1)'
            }).onfinish = () => frag.remove();
        }

        // Catchphrase change
        const catchphrase = document.querySelector('.catchphrase');
        catchphrase.innerText = "「にんげんっていいな（美声）」";
        setTimeout(() => catchphrase.innerText = "「上から読んでも下から読んでもまちたちま！ちまだよ～！」", 3000);
    });

    // Freesia Endurance Background
    const cardFreesia = document.getElementById('card-freesia');
    cardFreesia.addEventListener('mouseenter', () => {
        document.body.style.backgroundColor = '#fff0f5';
    });
    cardFreesia.addEventListener('mouseleave', () => {
        document.body.style.backgroundColor = 'var(--chima-bg)';
    });
});

// Animations
const style = document.createElement('style');
style.innerHTML = `
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        50% { transform: translate(-1px, 2px) rotate(1deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        100% { transform: translate(1px, -2px) rotate(0deg); }
    }
`;
document.head.appendChild(style);
