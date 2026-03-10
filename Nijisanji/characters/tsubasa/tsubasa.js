document.addEventListener('DOMContentLoaded', () => {
    // Hanakago Tsubasa JS

    // Truth vs Romantic Mode (Toggle)
    const toggle = document.getElementById('truth-toggle');
    const label = document.getElementById('mode-label');
    const catchText = document.getElementById('catch-text');
    let isRomantic = true;

    toggle.addEventListener('click', () => {
        isRomantic = !isRomantic;
        document.body.classList.toggle('horror-mode');

        if (isRomantic) {
            label.textContent = "ROMANTIC MODE";
            catchText.textContent = "「よす～！満月の日は空を見上げて。月に買った俺の土地、輝いてるやろ？」";
            label.style.color = "var(--tsubasa-silver)";
        } else {
            label.textContent = "HORA-BASHIRA MODE";
            catchText.textContent = "「実は俺、昨日も月に帰って土地の草むしりしてきたんやけど、結構大変やったわ。」";
            label.style.color = "#ef4444";
        }
    });

    // MH Slash Effect
    const tsubasaImg = document.getElementById('tsubasa-img');
    const slashContainer = document.getElementById('slash');

    tsubasaImg.addEventListener('click', (e) => {
        createSlash(e.clientX, e.clientY);
    });

    function createSlash(x, y) {
        const line = document.createElement('div');
        line.className = 'slash-line';
        line.style.left = (x - 200) + 'px';
        line.style.top = y + 'px';

        // Random rotation for variety
        const rot = Math.random() * 360;
        line.style.transform = `rotate(${rot}deg)`;

        slashContainer.appendChild(line);
        setTimeout(() => line.remove(), 300;
    }

    // Moon Gazer Effect (Parallax faces in craters)
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) * 0.05;
        const y = (e.clientY - window.innerHeight / 2) * 0.05;
        tsubasaImg.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Intersection Observer for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.moon-card, .episode-box, .lore-section').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
