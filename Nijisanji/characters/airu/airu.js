document.addEventListener('DOMContentLoaded', () => {
    // Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Catchphrase interaction
    const catchphrase = document.querySelector('.catchphrase');
    if (catchphrase) {
        catchphrase.addEventListener('click', () => {
            catchphrase.innerText = "大好き！";
            catchphrase.style.backgroundColor = "#ff4791";
            catchphrase.style.boxShadow = "6px 6px 0 #000";

            setTimeout(() => {
                catchphrase.innerText = "僕のこと、好き？";
                catchphrase.style.backgroundColor = "var(--airu-blue)";
            }, 1000);
        });
    }

    // Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelector('.candy-float').style.backgroundPositionY = -(scrolled * 0.1) + 'px';
    });
});
