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
            name.style.textShadow = '2px 0 #ff8ab7, -2px 0 #7ac7ff, 0 0 26px rgba(122, 199, 255, 0.6)';
        });
        name.addEventListener('mouseleave', () => {
            name.style.textShadow = '0 0 24px rgba(122, 199, 255, 0.35)';
        });
    }
});
