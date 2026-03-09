document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Dynamic Header Glow
    const header = document.querySelector('.character-header');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        header.style.backgroundPositionY = -(scrolled * 0.2) + 'px';

        const opacity = Math.min(0.5, scrolled / 500);
        header.style.backgroundColor = `rgba(52, 152, 219, ${opacity * 0.1})`;
    });

    // Catchphrase interaction
    const catchphrase = document.querySelector('.catchphrase');
    let age = 33;
    catchphrase.addEventListener('click', () => {
        age++;
        catchphrase.innerText = `夢追い続けて${age}年、シンガーソングライターの夢追翔です`;
        catchphrase.style.borderColor = '#ffb7c5';
        catchphrase.style.color = '#ffb7c5';
        setTimeout(() => {
            catchphrase.style.borderColor = 'var(--yumeo-accent)';
            catchphrase.style.color = 'var(--yumeo-accent)';
        }, 500);
    });

    // Johnny Float Effect
    const description = document.querySelector('.description-box');
    description.addEventListener('mousemove', (e) => {
        const { offsetX, offsetY } = e;
        const { offsetWidth, offsetHeight } = description;
        const moveX = (offsetX / offsetWidth - 0.5) * 20;
        const moveY = (offsetY / offsetHeight - 0.5) * 20;
        description.style.boxShadow = `${moveX}px ${moveY}px 50px rgba(52, 152, 219, 0.1)`;
    });
});
