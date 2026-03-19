document.addEventListener('DOMContentLoaded', () => {
    // 1. Staggered reveal for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    cards.forEach(card => observer.observe(card));

    // 2. Connector Lines Logic (Hub Visual)
    const hubContainer = document.querySelector('.main-content');
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('class', 'hub-connectors');
    hubContainer.appendChild(svg);

    function updateConnectors() {
        svg.innerHTML = '';
        const sidebarHero = document.querySelector('.sidebar-hero');
        if (!sidebarHero || window.innerWidth <= 900) return;

        const heroRect = sidebarHero.getBoundingClientRect();
        const startX = heroRect.right - hubContainer.getBoundingClientRect().left;
        const startY = heroRect.top + heroRect.height / 2 - hubContainer.getBoundingClientRect().top;

        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const endX = cardRect.left - hubContainer.getBoundingClientRect().left;
            const endY = cardRect.top + cardRect.height / 2 - hubContainer.getBoundingClientRect().top;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute('x1', startX);
            line.setAttribute('y1', startY);
            line.setAttribute('x2', endX);
            line.setAttribute('y2', endY);
            line.setAttribute('class', 'connector-line');
            svg.appendChild(line);

            // Add a small node at the end
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute('cx', endX);
            circle.setAttribute('cy', endY);
            circle.setAttribute('r', '3');
            circle.setAttribute('class', 'connector-node');
            svg.appendChild(circle);
        });
    }

    // Initial draw and resize listener
    setTimeout(updateConnectors, 100);
    window.addEventListener('resize', updateConnectors);
});


