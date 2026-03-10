document.addEventListener('DOMContentLoaded', () => {
    // Lunlun (Choma) JS

    // 800g Float Physics
    const lunlunVisual = document.getElementById('lunlun-visual');
    const floatCounter = document.getElementById('float-counter');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        const diff = currentScroll - lastScroll;

        // Gentle floating effect: moves slower than the scroll
        lunlunVisual.style.transform = `translateY(${currentScroll * 0.15}px)`;

        lastScroll = currentScroll;

        // Update "speed" status
        if (Math.abs(diff) > 0) {
            floatCounter.textContent = "SPEED: 1.2 km/h (浮遊中)";
            floatCounter.style.color = "var(--lunlun-flame)";
        } else {
            setTimeout(() => {
                floatCounter.textContent = "SPEED: 1 km/h (停滞中)";
                floatCounter.style.color = "var(--lunlun-blue)";
            }, 500);
        }
    });

    // Detective Case Deduction
    const evidenceItems = document.querySelectorAll('.evidence');
    const deductionMsg = document.getElementById('deduction-msg');
    const cases = {
        "壁の設計ミス": "「この要塞の壁、設計がお人間さんすぎます！」",
        "お人間さんのアリバイ": "「犯行時刻、お人間さんはプレッツェルを食べていたはずです！」",
        "8番ののぼり旗": "「異変？！泣いちゃう...泣いちゃいますよ？！」",
        "プレッツェルの破片": "「この欠片、己の朝ごはんと同じ形です！」"
    };

    evidenceItems.forEach(item => {
        item.addEventListener('click', () => {
            const fact = item.getAttribute('data-fact');
            deductionMsg.style.transform = "scale(1.1)";
            deductionMsg.textContent = cases[fact];

            setTimeout(() => {
                deductionMsg.style.transform = "scale(1)";
            }, 200);
        });
    });

    // Particle system (flame sparks)
    const particleContainer = document.getElementById('particles');
    function createParticle() {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 5 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '100vh';

        particleContainer.appendChild(p);

        const duration = Math.random() * 3000 + 2000;
        const animation = p.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.3 },
            { transform: `translateY(-110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });

        animation.onfinish = () => p.remove();
    }

    setInterval(createParticle, 300);

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.detective-case, .pastel-card, .rap-visualizer').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
