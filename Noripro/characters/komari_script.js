document.addEventListener('DOMContentLoaded', () => {
    // Generate Clouds
    const cloudContainer = document.getElementById('clouds');
    if (cloudContainer) {
        for (let i = 0; i < 6; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud';
            cloud.style.top = `${Math.random() * 80}vh`;
            cloud.style.left = `-${100 + Math.random() * 500}px`;
            cloud.style.animationDelay = `${Math.random() * 20}s`;
            cloud.style.animationDuration = `${20 + Math.random() * 30}s`;
            cloud.style.transform = `scale(${0.5 + Math.random() * 1.5})`;
            cloudContainer.appendChild(cloud);
        }
    }

    // Scroll Transformation for Cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.98)';
        card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });

    // Zzz... effect (Sleeping)
    setInterval(() => {
        if (Math.random() > 0.9) {
            const z = document.createElement('span');
            z.innerText = 'Z';
            z.style.position = 'fixed';
            z.style.color = 'var(--color-pink)';
            z.style.left = '50%';
            z.style.top = '40%';
            z.style.fontSize = '2rem';
            z.style.opacity = '0.7';
            z.style.pointerEvents = 'none';
            z.style.zIndex = '100';
            document.body.appendChild(z);

            z.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 0.7 },
                { transform: 'translate(50px, -100px) scale(2)', opacity: 0 }
            ], { duration: 2000, easing: 'ease-out' });

            setTimeout(() => z.remove(), 2000);
        }
    }, 4000);

    console.log("ATELIER INTERFACE ONLINE.");
});
