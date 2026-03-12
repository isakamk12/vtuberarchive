// Sakuya Specific Interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log("Konohana Sakuya page loaded.");
    
    // Simple greeting effect
    const nameElement = document.querySelector('.cp-hero-name');
    nameElement.addEventListener('mouseover', () => {
        nameElement.style.textShadow = "0 0 50px var(--char-glow)";
    });
});
