document.addEventListener('DOMContentLoaded', () => {
    // Generate Flying Scraps (Recycle Center vibe)
    const scrapContainer = document.getElementById('scraps');
    const scrollIcons = ['fa-gear', 'fa-wrench', 'fa-microchip', 'fa-bolt'];

    for (let i = 0; i < 20; i++) {
        const scrap = document.createElement('i');
        scrap.className = `fa-solid ${scrollIcons[Math.floor(Math.random() * scrollIcons.length)]} scrap`;
        scrap.style.left = Math.random() * 100 + 'vw';
        scrap.style.top = Math.random() * 100 + 'vh';
        scrap.style.fontSize = (Math.random() * 15 + 10) + 'px';
        scrapContainer.appendChild(scrap);

        // Drift animation
        animateScrap(scrap);
    }

    function animateScrap(el) {
        const duration = 15000 + Math.random() * 15000;
        el.animate([
            { transform: `translate(0, 0) rotate(0deg)` },
            { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg)` }
        ], {
            duration: duration,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'linear'
        });
    }

    // Material Collection Effect on Click
    document.addEventListener('click', (e) => {
        const fragment = document.createElement('div');
        fragment.innerText = '+1 METAL';
        fragment.style.position = 'fixed';
        fragment.style.left = e.clientX + 'px';
        fragment.style.top = e.clientY + 'px';
        fragment.style.color = 'var(--color-cyan)';
        fragment.style.fontFamily = 'Bebas Neue';
        fragment.style.fontSize = '1rem';
        fragment.style.pointerEvents = 'none';
        fragment.style.zIndex = '10000';
        document.body.appendChild(fragment);

        fragment.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(-50px)' }
        ], { duration: 800, easing: 'ease-out' }).onfinish = () => fragment.remove();
    });

    // Animate Height Growth Chart
    const currBar = document.getElementById('curr-h');
    if (currBar) {
        currBar.style.height = '0px';
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    currBar.style.height = '140px';
                }, 500);
            }
        });
        observer.observe(currBar);
    }

    // Scroll Reveal for Panels
    const panels = document.querySelectorAll('.panel');
    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 100);
            }
        });
    }, { threshold: 0.05 });

    panels.forEach(p => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(30px)';
        p.style.transition = 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        panelObserver.observe(p);
    });

    console.log("RECYCLE CENTER SYNC COMPLETED.");
});
