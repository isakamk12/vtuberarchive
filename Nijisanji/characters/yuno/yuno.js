document.addEventListener('DOMContentLoaded', () => {
    // Shinomiya Yuno JS

    // Wanko Soba Game
    const addSobaBtn = document.getElementById('add-soba');
    const sobaCount = document.getElementById('soba-count');
    const stackContainer = document.getElementById('soba-stack');
    let count = 0;

    addSobaBtn.addEventListener('click', () => {
        count++;
        sobaCount.textContent = count;

        const bowl = document.createElement('div');
        bowl.className = 'soba-bowl-visual';
        bowl.style.left = (Math.random() * 20 - 10) + 'px'; // Random tilt
        stackContainer.appendChild(bowl);

        if (count === 197) {
            alert('わんこそば記録197杯達成！お腹いっぱい！（たぶんまだ食べられる）');
            document.body.style.overflow = 'hidden';
            stackContainer.style.height = '100vh';
        }
    });

    // Penlight Colors
    const penlights = document.querySelectorAll('.penlight');
    document.addEventListener('keydown', (e) => {
        const colors = ['#AAD9F4', '#F8F482', '#ff0000', '#00ff00', '#ff00ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        penlights.forEach(p => {
            p.style.setProperty('--color', randomColor);
            p.style.boxShadow = `0 0 30px ${randomColor}`;
        });
    });

    // Hover effect for episodes
    const epBoxes = document.querySelectorAll('.episode-box');
    epBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.backgroundColor = 'var(--yuno-blue)';
            box.style.color = 'white';
        });
        box.addEventListener('mouseleave', () => {
            box.style.backgroundColor = '#fffdf5';
            box.style.color = 'var(--yuno-dark)';
        });
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.wanko-soba-game, .idol-card, .episode-box').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
