document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.profile-card, .reading-slot, .voice-mimicry').forEach(el => {
        observer.observe(el);
    });

    // Feng Shui Reading Interaction
    const slots = document.querySelectorAll('.reading-slot');
    const resultDisplay = document.getElementById('reading-result');

    const basicTrivia = {
        'lucky-item': [
            "ラッキーアイテム: 鏡。一族に伝わる古鏡が導くわ。",
            "ラッキーアイテム: 筆。あなたの運命を描きなさい。",
            "ラッキーアイテム: 勾玉。調和を大切に。"
        ],
        'direction': [
            "吉方位: 東南。蘭阜の街並みを散策すると吉。",
            "吉方位: 北。静かな居酒屋で一杯いかが？",
            "吉方位: 西。ジャジーな音楽が幸運を運ぶわ。"
        ],
        'color': [
            "ラッキーカラー: 藤色。私の瞳と同じ色ね。",
            "ラッキーカラー: 琥珀色。美味しいお酒の色よ。",
            "ラッキーカラー: 銀鼠色。都会の霧に紛れて。"
        ]
    };

    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            const topic = slot.getAttribute('data-topic');
            const options = basicTrivia[topic];
            const random = options[Math.floor(Math.random() * options.length)];

            resultDisplay.style.opacity = 0;
            setTimeout(() => {
                resultDisplay.textContent = random;
                resultDisplay.style.opacity = 1;
            }, 200);

            // Trigger sparkle effect on icon
            const icon = slot.querySelector('.slot-icon');
            icon.animate([
                { boxShadow: '0 0 0px var(--kisara-purple)' },
                { boxShadow: '0 0 30px var(--kisara-purple)' },
                { boxShadow: '0 0 0px var(--kisara-purple)' }
            ], { duration: 500 });
        });
    });

    // Voice Mimicry "Visualization" (since no audio assets)
    const voiceBtns = document.querySelectorAll('.voice-btn');
    const voiceNote = document.querySelector('.voice-note');

    const voiceLabels = {
        'fujiko': "「ルパン、あのお宝...いただけないかしら？」",
        'kinopio': "「ハハッ！キノピオだよ！」",
        'nyarth': "「〜ニャースでニャンス！」"
    };

    voiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-voice');
            voiceNote.textContent = voiceLabels[type];
            voiceNote.style.color = "var(--kisara-purple)";
            voiceNote.style.fontSize = "1.5rem";

            setTimeout(() => {
                voiceNote.style.color = "inherit";
                voiceNote.style.fontSize = "1rem";
            }, 1000);
        });
    });

    // Smoke Effect Background
    const smokeContainer = document.getElementById('smoke-container');
    function createSmoke() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 200 + 100 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'radial-gradient(circle, rgba(147, 148, 178, 0.1) 0%, transparent 70%)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.filter = 'blur(40px)';

        smokeContainer.appendChild(particle);

        const anim = particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 0 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * -200}px) scale(1.5)`, opacity: 0.4 },
            { transform: `translate(${Math.random() * 400 - 200}px, ${Math.random() * -400}px) scale(2)`, opacity: 0 }
        ], {
            duration: 5000 + Math.random() * 5000,
            easing: 'ease-out'
        });

        anim.onfinish = () => particle.remove();
    }

    setInterval(createSmoke, 800);

    // Hand Fetish Mouse Follow (subtle)
    const visual = document.querySelector('.character-visual');
    const handSilhouettes = document.querySelector('.hand-silhouettes');

    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.95) {
            const hand = document.createElement('div');
            hand.textContent = '🖐️';
            hand.style.position = 'fixed';
            hand.style.left = e.clientX + 'px';
            hand.style.top = e.clientY + 'px';
            hand.style.fontSize = '2rem';
            hand.style.opacity = '0.3';
            hand.style.pointerEvents = 'none';
            hand.style.zIndex = '100';
            hand.style.filter = 'drop-shadow(0 0 10px var(--kisara-purple)) blur(5px)';

            document.body.appendChild(hand);

            hand.animate([
                { transform: 'scale(1) rotate(0deg)', opacity: 0.3 },
                { transform: 'scale(0.5) rotate(20deg)', opacity: 0 }
            ], { duration: 1000 }).onfinish = () => hand.remove();
        }
    });
});
