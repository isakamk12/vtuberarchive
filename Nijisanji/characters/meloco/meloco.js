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

    // Kaiun Luck Trigger
    const luckBtn = document.getElementById('trigger-kaiun');
    const luckVal = document.getElementById('luck-val');
    const flash = document.getElementById('flash-fx');
    const kaiunImg = document.getElementById('kaiun-img');
    let luckClicks = 0;

    luckBtn.addEventListener('click', () => {
        luckClicks++;
        flash.style.opacity = '0.3';
        setTimeout(() => flash.style.opacity = '0', 200);

        if (luckClicks % 5 === 0) {
            luckVal.innerText = "MAX (KAIUN!!)";
            luckVal.style.color = "#FFD700";
            showKaiunFace();
        } else {
            luckVal.innerText = "UP";
            luckVal.style.color = "white";
        }
    });

    function showKaiunFace() {
        kaiunImg.style.display = 'block';
        kaiunImg.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'scale(1.2) rotate(360deg)', opacity: 1 },
            { transform: 'scale(0) rotate(720deg)', opacity: 0 }
        ], { duration: 1500 }).onfinish = () => kaiunImg.style.display = 'none';
        
        alert("Meloco: 運気上昇！海運メロコ界隈へようこそ！");
    }

    // Ghost Ritual Interaction
    const ghost = document.getElementById('ghost');
    ghost.addEventListener('click', (e) => {
        ghost.style.transform = 'scale(0)';
        setTimeout(() => {
            ghost.style.transform = 'scale(1)';
            ghost.style.left = `${Math.random() * 80}%`;
            ghost.style.top = `${Math.random() * 80}%`;
        }, 500);

        // Falling Charms (Ofuda)
        createCharm(e.clientX, e.clientY);
    });

    function createCharm(x, y) {
        const c = document.createElement('div');
        c.className = 'charm';
        c.innerText = "急急如律令";
        c.style.left = `${x}px`;
        c.style.top = `${y}px`;
        document.body.appendChild(c);

        c.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(300px) rotate(${Math.random()*90}deg)`, opacity: 0 }
        ], { duration: 2000 }).onfinish = () => c.remove();
    }

    // Umbrella float
    const umbrella = document.getElementById('umbrella-icon');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        umbrella.style.transform = `translate(${x}px, ${y}px) rotate(${x*5}deg)`;
    });

    // Meloco Image hover interaction (Japanese greeting)
    const melocoImg = document.getElementById('meloco-img');
    melocoImg.addEventListener('mouseenter', () => {
        console.log("Meloco: こんにちは！おもしれー女・メロコです。");
    });
});
