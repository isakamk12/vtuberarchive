// TrillionStage — Agency Script
document.addEventListener('DOMContentLoaded', () => {
    const spotlights = document.querySelectorAll('.spotlight');
    const nav = document.querySelector('.stage-nav');
    
    // 1. Dynamic Spotlight Sweep & Nav Shrink
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        const rotate = scroll * 0.1;
        
        if (spotlights[0]) spotlights[0].style.transform = `translateX(-50%) rotate(${15 + rotate}deg)`;
        if (spotlights[1]) spotlights[1].style.transform = `translateX(-50%) rotate(${-15 - rotate}deg)`;

        // Nav Shrink
        if (scroll > 100) {
            nav.classList.add('shrunk');
        } else {
            nav.classList.remove('shrunk');
        }
    });

    // 2. Intersection Observer (Reveals)
    const reveals = document.querySelectorAll('.stage-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, i * 100);
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => observer.observe(el));

    // 3. Glitch Case Logs
    const epiCards = document.querySelectorAll('.episode-card');
    epiCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'glitch-mini 0.3s infinite';
        });
        card.addEventListener('mouseleave', () => {
            card.style.animation = 'none';
        });
    });
});
