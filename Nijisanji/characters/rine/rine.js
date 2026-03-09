document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Secret "Yuta" reveal
    const mainName = document.getElementById('main-name');
    mainName.addEventListener('click', () => {
        const originalText = mainName.innerText;
        mainName.style.color = '#ff7f50';
        mainName.innerText = "SHE IS YUTA.";

        setTimeout(() => {
            mainName.innerText = originalText;
            mainName.style.color = 'var(--text-main)';
        }, 1500);
    });

    // Profile Glitch Logic
    const glitchItems = document.querySelectorAll('.glitch-item');
    glitchItems.forEach(item => {
        const valueSpan = item.querySelector('.value');
        const originalValue = valueSpan.innerText;
        const glitchValue = item.getAttribute('data-glitch');

        item.addEventListener('mouseenter', () => {
            valueSpan.innerText = glitchValue;
        });

        item.addEventListener('mouseleave', () => {
            valueSpan.innerText = originalValue;
        });
    });

    // Corn Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const cornLayer = document.querySelector('.floating-corn');
        if (cornLayer) {
            cornLayer.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
        }
    });
});
