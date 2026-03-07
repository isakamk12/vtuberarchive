document.addEventListener('DOMContentLoaded', () => {
    // Generate Haunted "Ofuda" (Talismans)
    const container = document.body;
    const phrases = ["青血注意", "概念存在", "ショタ爺", "火気厳禁"];

    for (let i = 0; i < 4; i++) {
        const ofuda = document.createElement('div');
        ofuda.className = 'ofuda';
        ofuda.innerText = phrases[i];
        ofuda.style.top = `${20 + Math.random() * 60}%`;
        ofuda.style.left = `${Math.random() * 90}%`;
        ofuda.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        ofuda.style.opacity = '0.3';
        container.appendChild(ofuda);

        // Gentle floating animation
        ofuda.animate([
            { transform: `rotate(${-5}deg) translateY(0)` },
            { transform: `rotate(${5}deg) translateY(-20px)` }
        ], {
            duration: 3000 + Math.random() * 2000,
            direction: 'alternate',
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    // Scroll Reveal for Panels
    const panels = document.querySelectorAll('.panel');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) skew(0)';
            }
        });
    }, { threshold: 0.1 });

    panels.forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(40px) skewY(2deg)';
        panel.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(panel);
    });

    // Suble Flickering of Blood Glow
    const lab = document.querySelector('.avatar-lab');
    setInterval(() => {
        if (Math.random() > 0.98) {
            lab.style.borderColor = 'white';
            setTimeout(() => lab.style.borderColor = 'var(--color-blood)', 50);
        }
    }, 200);

    console.log("HAUNTED INTERFACE SYNCED.");
});
