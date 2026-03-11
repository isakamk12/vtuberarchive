document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Maid Mode Logic
    const maidBtn = document.getElementById('trigger-maid');
    const maidLabel = document.getElementById('maid-label');
    const maidOverlay = document.getElementById('maid-outfit');
    let isMaid = false;

    maidBtn.addEventListener('click', () => {
        isMaid = !isMaid;
        maidLabel.innerText = isMaid ? 'MAID OUTFIT! 🐈' : 'PROMOTER';
        maidLabel.style.color = isMaid ? '#FFB6C1' : '#FFF';
        maidOverlay.style.display = isMaid ? 'block' : 'none';
        
        if (isMaid) {
            alert("Seible: Lock in!! Today I am Seinyan-maid!");
        }
    });

    // Kansai-ben Interaction
    const kansaiArea = document.getElementById('kansai-area');
    const wordVal = document.getElementById('word-val');
    const wordList = [
        'さっぱりピーマンやわ！',
        'ごちゃまぜモンキー！',
        'ヤバみプリンやんけ！',
        'なんやそれ！最高やん！',
        'ほんまにありがとうやで。'
    ];

    kansaiArea.addEventListener('click', () => {
        const word = wordList[Math.floor(Math.random() * wordList.length)];
        wordVal.innerText = word;
        wordVal.animate([
            { transform: 'scale(1.2)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 }
        ], 300);
    });

    // Cry Logic (Secret Trigger: Press C)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c') {
            const cry = document.getElementById('cry-fx');
            cry.style.display = 'flex';
            setTimeout(() => cry.style.display = 'none', 3000);
        }
    });

    // Falling Gems
    const gemContainer = document.getElementById('gems');
    function createGem() {
        const g = document.createElement('div');
        g.className = 'gem';
        g.innerText = '💎';
        g.style.left = `${Math.random() * 100}%`;
        g.style.top = `-20px`;
        gemContainer.appendChild(g);
        
        g.animate([
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: `translateY(${window.innerHeight}px) rotate(360deg)` }
        ], { duration: 3000 + Math.random()*2000 }).onfinish = () => g.remove();
    }
    setInterval(createGem, 1000);

    // Spotlight movement
    const spotlight = document.getElementById('spotlight');
    document.addEventListener('mousemove', (e) => {
        spotlight.style.left = `${e.clientX - 150}px`;
        spotlight.style.top = `${e.clientY - 150}px`;
    });

    // Pet float
    const pet = document.getElementById('pet-icon');
    let isPetDog = true;
    pet.addEventListener('click', () => {
        isPetDog = !isPetDog;
        pet.innerText = isPetDog ? '🐶' : '🐱';
    });
});
