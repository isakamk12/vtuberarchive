document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Demon Eyes Follow
    const header = document.querySelector('.character-header');
    const eyes = document.querySelectorAll('.eye');

    header.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = header.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        eyes.forEach(eye => {
            eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
            eye.style.opacity = '0.4';
        });
    });

    header.addEventListener('mouseleave', () => {
        eyes.forEach(eye => {
            eye.style.transform = `translate(0, 0)`;
            eye.style.opacity = '0.2';
        });
    });

    // Koala Secret Mode
    const koalaTrigger = document.getElementById('koala-trigger');
    const body = document.body;
    let isKoala = false;

    koalaTrigger.addEventListener('click', () => {
        isKoala = !isKoala;
        body.classList.toggle('koala-mode');

        const valueSpan = koalaTrigger.querySelector('.value');
        if (isKoala) {
            valueSpan.innerHTML = 'ユーカリ大好きコアラ様 <span class="tiny-text">(悪魔ではない)</span>';
        } else {
            valueSpan.innerHTML = '異世界の悪魔 <span class="tiny-text">(コアラではない)</span>';
        }
    });

    // Catchphrase interaction
    const catchphrase = document.querySelector('.catchphrase');
    catchphrase.addEventListener('click', () => {
        catchphrase.innerText = "「おそろしいだろ！ あがめろ！ 崇拝しろ！」";
        catchphrase.style.color = "var(--debi-gold)";
        setTimeout(() => {
            catchphrase.innerText = "「いかいのとびらが、ひらかれた」";
            catchphrase.style.color = "var(--debi-red)";
        }, 2000);
    });
});
