document.addEventListener('DOMContentLoaded', () => {
    // Hitotsubashi Ayato JS

    // Noodle Machine
    const crank = document.getElementById('crank');
    const noodleContainer = document.getElementById('noodles');
    const nCount = document.getElementById('n-count');
    let noodlesMade = 0;

    crank.addEventListener('click', () => {
        crank.style.transform += 'rotate(360deg)';
        noodlesMade += 5;
        nCount.textContent = noodlesMade;

        const strand = document.createElement('div');
        strand.className = 'noodle-strand';
        noodleContainer.appendChild(strand);

        if (noodleContainer.children.length > 10) {
            noodleContainer.removeChild(noodleContainer.firstChild);
        }
    });

    // Fumu-fumu Tooltip
    const tooltip = document.getElementById('tooltip');
    const anaItems = document.querySelectorAll('.ana-item');

    anaItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const diag = item.getAttribute('data-diag');
            tooltip.textContent = diag;
            tooltip.style.display = 'block';
        });

        item.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 15) + 'px';
        });

        item.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });

    // TRPG 1D100 Sanity Check
    const rollBtn = document.getElementById('roll-btn');
    const rollResult = document.getElementById('roll-result');
    const sanVal = document.getElementById('san-val');
    let currentSan = 100;

    rollBtn.addEventListener('click', () => {
        const result = Math.floor(Math.random() * 100) + 1;
        rollResult.textContent = `Result: ${result}`;

        if (result > currentSan) {
            const loss = Math.floor(Math.random() * 6) + 1;
            currentSan -= loss;
            if (currentSan < 0) currentSan = 0;
            rollResult.style.color = '#e74c3c';
            rollResult.textContent += ` (SAN LOSS: -${loss})`;
        } else {
            rollResult.style.color = 'var(--ayato-teal)';
            rollResult.textContent += " (SUCCESS)";
        }

        sanVal.textContent = currentSan;

        if (currentSan < 30) {
            document.body.style.filter = `contrast(${1 + (30 - currentSan) / 10})`;
        }
    });

    // Reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.noodle-lab, .medical-card, .trpg-section').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 1s ease-out';
        observer.observe(el);
    });
});
