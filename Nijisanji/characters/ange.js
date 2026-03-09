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
            name.style.textShadow = '2px 0 #ffcf78, -2px 0 #c78dff, 0 0 24px rgba(199, 141, 255, 0.65)';
        });

        name.addEventListener('mouseleave', () => {
            name.style.textShadow = '0 0 22px rgba(199, 141, 255, 0.35)';
        });
    }
});
