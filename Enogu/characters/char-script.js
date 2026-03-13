// char-script.js
document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal animation
    const reveals = document.querySelectorAll('.cp-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Add staggered delay for child cards if needed
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, i * 100);
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
    });

    reveals.forEach(el => observer.observe(el));
});
