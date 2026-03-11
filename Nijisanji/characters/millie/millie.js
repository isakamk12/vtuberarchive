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

    // Sparkle Spawner
    const sparklesContainer = document.getElementById('sparkles');
    function createSparkle() {
        const s = document.createElement('div');
        s.className = 'sparkle';
        s.innerText = '✨';
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        sparklesContainer.appendChild(s);

        const duration = Math.random() * 2000 + 1000;
        s.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 0 },
            { transform: 'scale(1) rotate(180deg)', opacity: 1 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], { duration: duration }).onfinish = () => s.remove();
    }
    setInterval(createSparkle, 300);

    // Hat Slider
    const hatSlider = document.getElementById('hat-slider');
    const millieHat = document.getElementById('millie-hat');
    const hatSizeLabel = document.getElementById('hat-size');

    hatSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        millieHat.style.fontSize = `${val / 20}rem`;
        
        if (val > 250) {
            hatSizeLabel.innerText = 'CALAMITY SIZE';
            hatSizeLabel.style.color = '#FF8C00';
        } else if (val < 70) {
            hatSizeLabel.innerText = 'SMOL';
        } else {
            hatSizeLabel.innerText = 'NORMAL';
        }
    });

    // Pomu Leaf Clicker
    const leaf = document.getElementById('pomu-leaf');
    const leafCount = document.getElementById('leaf-count');
    let count = 0;

    leaf.addEventListener('click', (e) => {
        count++;
        leafCount.innerText = count;
        
        // Throw leaf particle
        const p = document.createElement('div');
        p.innerText = '🍃';
        p.style.position = 'fixed';
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        p.style.fontSize = '2rem';
        p.style.pointerEvents = 'none';
        document.body.appendChild(p);
        
        p.animate([
            { transform: 'translateY(0) rotate(0)', opacity: 1 },
            { transform: `translate(${(Math.random()-0.5)*300}px, -300px) rotate(${Math.random()*720}deg)`, opacity: 0 }
        ], { duration: 800 }).onfinish = () => p.remove();

        // Parfait Explosion on milestone
        if (count % 10 === 0) {
            triggerParfait();
        }
    });

    function triggerParfait() {
        const bomb = document.getElementById('bomb');
        bomb.style.opacity = '1';
        bomb.style.transform = 'scale(5)';
        setTimeout(() => {
            bomb.style.opacity = '0';
            bomb.style.transform = 'scale(1)';
        }, 500);
    }

    // Circle rotation follows mouse slightly
    const circle = document.getElementById('circle');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 100;
        const y = (e.clientY - window.innerHeight / 2) / 100;
        circle.style.transform = `translate(${x}px, ${y}px) rotate(${x*10}deg)`;
    });
});
