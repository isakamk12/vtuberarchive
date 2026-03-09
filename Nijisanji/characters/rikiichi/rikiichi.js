document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Kiriko Transformation
    const btn = document.getElementById('transform-btn');
    const body = document.body;
    const catchphrase = document.querySelector('.catchphrase');
    const enName = document.querySelector('.en-name');
    const jpName = document.querySelector('.jp-name');

    let isKiriko = false;

    btn.addEventListener('click', () => {
        isKiriko = !isKiriko;
        body.classList.toggle('kiriko-mode');

        if (isKiriko) {
            jpName.innerText = "鹿鳴館 キリコ";
            enName.innerText = "KIRIKO ROKUMEIKAN";
            catchphrase.innerText = "「スーパーロイヤルハイパーマックスお嬢様ですわ！」";
            btn.innerHTML = '<i class="fa-solid fa-gem"></i>';
            btn.style.borderColor = 'var(--kiriko-gold)';
            btn.style.color = 'var(--kiriko-gold)';
        } else {
            jpName.innerText = "ジョー・力一";
            enName.innerText = "JOE RIKIICHI";
            catchphrase.innerText = "「ティーンエイジの終わりに天啓を受けた道化師。」";
            btn.innerHTML = '<i class="fa-solid fa-mask"></i>';
            btn.style.borderColor = 'var(--riki-purple)';
            btn.style.color = 'var(--riki-purple)';
        }
    });

    // Radio Wave Animation
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const waves = document.querySelector('.radio-waves');
        if (waves) {
            waves.style.backgroundPosition = (scrolled * 0.5) + 'px ' + (scrolled * 0.5) + 'px';
        }
    });
});
