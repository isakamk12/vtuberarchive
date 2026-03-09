document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Eye Opening Easter Egg
    const title = document.getElementById('shoichi-title');
    if (title) {
        title.addEventListener('mouseenter', () => {
            title.style.webkitTextStroke = '4px #fff';
            title.style.color = '#000';
            document.body.style.backgroundColor = '#f5c71a';
        });
        title.addEventListener('mouseleave', () => {
            title.style.webkitTextStroke = '4px #000';
            title.style.color = '#fff';
            document.body.style.backgroundColor = '#fff';
        });
    }

    // Lore card box shadow randomness
    const cards = document.querySelectorAll('.lore-card');
    cards.forEach(card => {
        card.style.boxShadow = '8px 8px 0 #000';
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '15px 15px 0 var(--kanda-yellow)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '8px 8px 0 #000';
        });
    });

    // Knife Icon Spinning
    const icons = document.querySelectorAll('.fa-shield-halved, .fa-eye, .fa-microphone');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            icon.style.transform = 'rotate(360deg) scale(1.2)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });
});
