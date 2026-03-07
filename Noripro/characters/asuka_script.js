document.addEventListener('DOMContentLoaded', () => {
    // 1. Boot Sequence Simulation
    const bootScreen = document.getElementById('boot-screen');
    const bootLog = document.getElementById('boot-log');
    const logLines = [
        "INITIALIZING WASHU_SYSTEM_V.1.0...",
        "CHECKING DISCIPLINARY_COMMITTEE_STATUS... [OK]",
        "LOADING MORNING_GREETING_PROTOCOL... [ACTIVE]",
        "SCANNING FOR VEGETABLES... [WARNING: ASPARA_DETECTED]",
        "CALIBRATING TYPING_SPEED... [EXCEEDING_LIMITS]",
        "SYNCING CREATOR_TOOLS... [READY]",
        "WELCOME, WASHU ASUKA."
    ];

    let lineIndex = 0;
    function typeBootLog() {
        if (lineIndex < logLines.length) {
            const line = document.createElement('div');
            line.textContent = `> ${logLines[lineIndex]}`;
            bootLog.appendChild(line);
            lineIndex++;
            setTimeout(typeBootLog, 150 + Math.random() * 200);
        } else {
            setTimeout(() => {
                bootScreen.style.opacity = '0';
                setTimeout(() => bootScreen.remove(), 1000);
            }, 500);
        }
    }
    typeBootLog();

    // 2. Typewriter Description
    const descText = "風紀を取り締まる女子高生、鷲羽アスカです。イラスト、動画編集、そして誰にも負けない高速タイピング。毎朝の「おはよう」を力に変えて、今日も風紀を見守ります。……アスカマンではありませんよ？";
    const descContainer = document.getElementById('typewriter-desc');
    let charIndex = 0;

    function typeDesc() {
        if (charIndex < descText.length) {
            descContainer.textContent += descText.charAt(charIndex);
            charIndex++;
            setTimeout(typeDesc, 30);
        }
    }
    // Start after boot
    setTimeout(typeDesc, 3000);

    // 3. Morning Streak Counter
    const startDate = new Date('2024-03-07'); // Debut or start of streak
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('days-count').textContent = diffDays;

    // 4. Skill Bar Animation
    const skillFills = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));

    // 5. Aspara Avoidance Humor
    const aspara = document.querySelector('.aspara-item');
    aspara.addEventListener('mouseenter', () => {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;
        aspara.animate([
            { transform: `translate(${x}px, ${y}px)` }
        ], { duration: 100, fill: 'forwards' });
    });

    console.log("WASHU TERMINAL ONLINE.");
});
