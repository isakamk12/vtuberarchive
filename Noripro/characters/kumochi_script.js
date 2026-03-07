document.addEventListener('DOMContentLoaded', () => {
    // Generate Snowflakes
    const snowContainer = document.getElementById('snow');
    const snowflakeChars = ['❄', '❅', '❆', '•'];

    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.innerText = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        span.style.position = 'absolute';
        span.style.color = 'white';
        span.style.opacity = Math.random();
        span.style.left = Math.random() * 100 + 'vw';
        span.style.top = -20 + 'px';
        span.style.fontSize = (Math.random() * 10 + 10) + 'px';
        span.style.pointerEvents = 'none';

        snowContainer.appendChild(span);

        // Falling animation
        const duration = 5000 + Math.random() * 10000;
        span.animate([
            { transform: `translateY(0) rotate(0)` },
            { transform: `translateY(110vh) rotate(360deg)` }
        ], {
            duration: duration,
            iterations: Infinity,
            delay: -Math.random() * duration
        });
    }

    // Mochi Ripple Effect on Click
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(240, 98, 146, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = (e.clientX - 10) + 'px';
        ripple.style.top = (e.clientY - 10) + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        document.body.appendChild(ripple);

        ripple.animate([
            { transform: 'scale(1)', opacity: 0.8 },
            { transform: 'scale(10)', opacity: 0 }
        ], { duration: 600, easing: 'ease-out' }).onfinish = () => ripple.remove();
    });

    // Scroll Reveal
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        observer.observe(card);
    });

    console.log("MOCHI ARCHIVE ACTIVATED.");
});
