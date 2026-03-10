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

    // Heart Particles on Mouse Move
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
            heart.style.left = `${e.clientX}px`;
            heart.style.top = `${e.clientY}px`;
            heart.style.fontSize = `${Math.random() * 1 + 0.5}rem`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    });

    // Tile Breaking Interaction
    const breakBtn = document.getElementById('mode-toggle');
    breakBtn.addEventListener('click', (e) => {
        // Impact flash
        const flash = document.createElement('div');
        flash.className = 'tile-impact';
        document.body.appendChild(flash);

        // Shards spawn
        for (let i = 0; i < 15; i++) {
            const shard = document.createElement('div');
            shard.className = 'tile-shard';
            shard.style.left = `${e.clientX}px`;
            shard.style.top = `${e.clientY}px`;

            const angle = Math.random() * Math.PI * 2;
            const dist = 200 + Math.random() * 300;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;

            shard.style.transition = 'all 0.6s cubic-bezier(0.1, 0.5, 0.5, 1)';
            document.body.appendChild(shard);

            setTimeout(() => {
                shard.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 720}deg)`;
                shard.style.opacity = '0';
                setTimeout(() => shard.remove(), 600);
            }, 10);
        }

        // Screen shake
        document.body.style.animation = 'shake 0.3s linear';
        setTimeout(() => document.body.style.animation = '', 300);

        // Flash behavior
        flash.animate([
            { opacity: 0.5 },
            { opacity: 0 }
        ], { duration: 200 });
        setTimeout(() => flash.remove(), 200);
    });

    // Hidden "ゲラ" (Gera) Effect
    // Click on profile items to hear/see a laugh effect
    document.querySelectorAll('.profile-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const laugh = document.createElement('div');
            laugh.innerText = 'アハハハハ！！';
            laugh.style.position = 'fixed';
            laugh.style.left = `${e.clientX}px`;
            laugh.style.top = `${e.clientY}px`;
            laugh.style.color = 'var(--meruto-pink)';
            laugh.style.fontWeight = '900';
            laugh.style.zIndex = '100';
            laugh.style.pointerEvents = 'none';
            laugh.style.fontSize = '2rem';
            document.body.appendChild(laugh);

            laugh.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-100px) scale(1.5)', opacity: 0 }
            ], { duration: 800 });
            setTimeout(() => laugh.remove(), 800);
        });
    });
});

// Adding shake animation dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translate(0,0); }
    10% { transform: translate(-10px, -10px); }
    20% { transform: translate(10px, 10px); }
    30% { transform: translate(-10px, 10px); }
    40% { transform: translate(10px, -10px); }
    50% { transform: translate(-10px, -10px); }
    100% { transform: translate(0,0); }
}
`;
document.head.appendChild(style);
