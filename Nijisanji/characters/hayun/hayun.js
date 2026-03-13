document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Parallax
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header-inner');
        const scrolled = window.scrollY;
        header.style.transform = `translateY(${scrolled * 0.2}px)`;
    });
});
