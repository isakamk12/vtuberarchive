// V&U (Virtual & Universe) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations
    const reveals = document.querySelectorAll('.vu-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    // Navigation shrink
    const nav = document.querySelector('.vu-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Make entire member card clickable placeholder logic
    cards.forEach(card => {
        const nameEl = card.querySelector('.vu-card-name');
        if (nameEl) {
            card.addEventListener('click', () => {
                // In a real implementation this would navigate to the character page.
                // Creating a basic slug from the name.
                const nameText = nameEl.textContent.trim().toLowerCase().replace(/ /g, '_');
                console.log(`Navigating to: characters/${nameText}.html`);
                // window.location.href = `characters/${nameText}.html`;
            });
        }
    });
});
