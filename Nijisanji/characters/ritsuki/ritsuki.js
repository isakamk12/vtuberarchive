document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Petal Fall
    const petalLayer = document.querySelector('.sakura-petals');
    const movePetals = () => {
        const scrolled = window.pageYOffset;
        petalLayer.style.backgroundPositionY = (scrolled * 0.3) + 'px';
    };
    window.addEventListener('scroll', movePetals);

    // Ritsu-penguin launcher
    const launcher = document.getElementById('penguin-launcher');
    launcher.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const penguin = document.createElement('div');
                penguin.className = 'flying-penguin';
                penguin.innerHTML = '🐧';
                penguin.style.left = (e.clientX + (Math.random() - 0.5) * 50) + 'px';
                penguin.style.top = (e.clientY + (Math.random() - 0.5) * 50) + 'px';
                penguin.style.fontSize = (20 + Math.random() * 30) + 'px';
                document.body.appendChild(penguin);

                setTimeout(() => penguin.remove(), 3000);
            }, i * 200);
        }
    });

    // Catchphrase Uchu-ben toggle
    const catchphrase = document.querySelector('.catchphrase');
    let isStandard = false;
    catchphrase.addEventListener('click', () => {
        isStandard = !isStandard;
        if (isStandard) {
            catchphrase.innerText = "「こんにちは！桜の妖精のプリンセスですよ！」";
        } else {
            catchphrase.innerText = "「こんりつきーん🌸 桜の妖精のプリンセスっちゃね！」";
        }
    });
});
