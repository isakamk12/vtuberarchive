// ENILIS — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.enilis-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('animated'), i * 100);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // VLiver Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.roster-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active to current
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Navigation back effect
    const nav = document.querySelector('.enilis-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = "0.7rem 5%";
            nav.style.boxShadow = "0 10px 40px rgba(0,0,0,0.05)";
        } else {
            nav.style.padding = "1rem 5%";
            nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.02)";
        }
    });
});
