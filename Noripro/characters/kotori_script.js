document.addEventListener('DOMContentLoaded', () => {
    // Walking Kotori Animation
    const walker = document.getElementById('walker');
    const stepCount = walker.querySelector('.step-count');
    let steps = 0;
    let pos = -100;
    const goalPos = window.innerWidth + 100;

    function walk() {
        pos += 2;
        steps += 17; // Fast counting to hit 10k feel
        walker.style.right = 'auto';
        walker.style.left = pos + 'px';
        stepCount.innerText = `${steps.toLocaleString()} steps`;

        if (pos > goalPos) {
            pos = -100;
            // Chance to reset steps or just keep counting
        }
        requestAnimationFrame(walk);
    }
    walk();

    // Palette Paint Interaction
    const patches = document.querySelectorAll('.paint-patch');
    patches.forEach(patch => {
        patch.addEventListener('mouseenter', () => {
            const colors = ['#ffeb3b', '#81d4fa', '#c5e1a5', '#f48fb1'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            patch.style.borderColor = randomColor;
            patch.style.boxShadow = `0 10px 30px ${randomColor}33`;
        });
        patch.addEventListener('mouseleave', () => {
            patch.style.borderColor = 'transparent';
            patch.style.boxShadow = 'none';
        });
    });

    // Scroll Reveal with Ink Spread effect
    const reveals = document.querySelectorAll('.paint-patch, .hero, .easel-frame');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'scale(0.9) translateY(20px)' },
                    { opacity: 1, transform: 'scale(1) translateY(0)' }
                ], {
                    duration: 800,
                    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
                    fill: 'forwards'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Suika Game Egg Homage (Click Palette to spawn "Eggs")
    const easel = document.querySelector('.easel-frame');
    easel.addEventListener('click', () => {
        const egg = document.createElement('div');
        egg.innerHTML = '🥚';
        egg.style.position = 'fixed';
        egg.style.left = Math.random() * 100 + 'vw';
        egg.style.top = '-50px';
        egg.style.fontSize = '2rem';
        egg.style.zIndex = '1000';
        egg.style.pointerEvents = 'none';
        document.body.appendChild(egg);

        egg.animate([
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: `translateY(110vh) rotate(${Math.random() * 720}deg)` }
        ], { duration: 2000, easing: 'ease-in' }).onfinish = () => egg.remove();
    });

    console.log("KOTORI ATELIER SYNC COMPLETE.");
});
