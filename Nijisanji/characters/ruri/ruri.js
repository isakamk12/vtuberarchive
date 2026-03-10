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

    // Vertical Text Background
    const textLayer = document.getElementById('text-bg');
    const classicalQuotes = [
        "祇園精舎の鐘の声",
        "諸行無常の響きあり",
        "春はあけぼの",
        "やうやう白くなりゆく山ぎは",
        "つれづれなるままに",
        "日暮らし、硯にむかひて",
        "世の中にたえて桜のなかりせば"
    ];

    for (let i = 0; i < 15; i++) {
        const text = document.createElement('div');
        text.className = 'vert-text';
        text.innerText = classicalQuotes[Math.floor(Math.random() * classicalQuotes.length)];
        text.style.left = `${Math.random() * 100}%`;
        text.style.top = `${Math.random() * 100}%`;
        text.style.fontSize = `${Math.random() * 2 + 1}rem`;
        textLayer.appendChild(text);
    }

    // Origami Dogs
    const origamiContainer = document.getElementById('origami-container');
    for (let i = 0; i < 8; i++) {
        const dog = document.createElement('div');
        dog.className = 'origami-dog';
        dog.innerText = '🐕';
        dog.style.left = `${Math.random() * 100}%`;
        dog.style.top = `${Math.random() * 100}%`;
        dog.style.transform = `rotate(${Math.random() * 360}deg)`;
        origamiContainer.appendChild(dog);
    }

    // Interrogation Mode
    const interrogationBtn = document.getElementById('interrogation-toggle');
    const spotlight = document.getElementById('spotlight');
    let isInterrogation = false;

    interrogationBtn.addEventListener('click', () => {
        isInterrogation = !isInterrogation;
        if (isInterrogation) {
            document.body.classList.add('interrogation-active');
            document.body.classList.add('patrol-active'); // Add police lights too
            interrogationBtn.innerText = '尋問終了';
            interrogationBtn.style.background = 'var(--ruri-blue)';
            interrogationBtn.style.color = 'white';
        } else {
            document.body.classList.remove('interrogation-active');
            document.body.classList.remove('patrol-active');
            interrogationBtn.innerText = 'INTERROGATION_MODE: OFF';
            interrogationBtn.style.background = 'white';
            interrogationBtn.style.color = 'var(--ruri-blue)';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isInterrogation) {
            spotlight.style.left = `${e.clientX - 150}px`;
            spotlight.style.top = `${e.clientY - 150}px`;

            // Focus effect on sections
            document.querySelectorAll('section').forEach(sec => {
                const rect = sec.getBoundingClientRect();
                if (e.clientX > rect.left && e.clientX < rect.right &&
                    e.clientY > rect.top && e.clientY < rect.bottom) {
                    sec.classList.add('active-focus');
                } else {
                    sec.classList.remove('active-focus');
                }
            });
        }
    });

    // Literature Archive Toggle
    const litBtn = document.getElementById('lit-archive-toggle');
    let isLit = false;

    litBtn.addEventListener('click', () => {
        isLit = !isLit;
        if (isLit) {
            document.body.classList.add('lit-mode');
            litBtn.innerText = 'NORMAL_MODE';
        } else {
            document.body.classList.remove('lit-mode');
            litBtn.innerText = 'LITERATURE_ARCHIVE';
        }
    });

    // Patrol Lights flashing setup
    const patrolFx = document.getElementById('patrol-fx');
    const r = document.createElement('div'); r.className = 'light-red';
    const b = document.createElement('div'); b.className = 'light-blue';
    patrolFx.appendChild(r);
    patrolFx.appendChild(b);

    // Random Barking or Literature commentary
    document.addEventListener('click', (e) => {
        if (Math.random() > 0.8) {
            const bark = document.createElement('div');
            bark.innerText = isInterrogation ? '「ホシは君ですね？（音割れ）」' : 'わん。';
            bark.style.position = 'fixed';
            bark.style.left = `${e.clientX}px`;
            bark.style.top = `${e.clientY}px`;
            bark.style.color = 'var(--ruri-blue)';
            bark.style.fontWeight = '900';
            bark.style.zIndex = '1100';
            bark.style.pointerEvents = 'none';
            document.body.appendChild(bark);

            bark.animate([
                { opacity: 1, transform: 'translateY(0)' },
                { opacity: 0, transform: 'translateY(-30px)' }
            ], { duration: 600 });
            setTimeout(() => bark.remove(), 600);
        }
    });

    // Skydiving scroll effect (fade in header)
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        const scroll = window.scrollY;
        if (scroll < 300) {
            header.style.transform = `translateY(${scroll * 0.5}px)`;
            header.style.opacity = 1 - (scroll / 500);
        }
    });
});
