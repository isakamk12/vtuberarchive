document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const name = document.getElementById('main-name');
    if (name) {
        name.addEventListener('mouseenter', () => {
            name.style.textShadow = '2px 0 #ffe27a, -2px 0 #e7adff, 0 0 24px rgba(231, 173, 255, 0.68)';
        });

        name.addEventListener('mouseleave', () => {
            name.style.textShadow = '0 0 22px rgba(231, 173, 255, 0.40)';
        });
    }
});
