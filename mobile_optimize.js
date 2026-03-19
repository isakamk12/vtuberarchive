
// Universal Mobile Optimizer for VTuber Archive
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Hide heavy elements immediately
        const heavyElements = document.querySelectorAll('.bg-wrap, .bg-mesh, .bg-noise, .omni-bg, .stage-bg, .nr-bg, .screen-vignette');
        heavyElements.forEach(el => el.style.display = 'none');
        
        // Inject Banner
        const banner = document.createElement('div');
        banner.style.cssText = 'background: #ffc83d; color: #000; text-align: center; font-size: 0.85rem; padding: 4px; font-weight: 900; position: fixed; bottom: 0; width: 100%; z-index: 9999; box-shadow: 0 -2px 10px rgba(255, 200, 60, 0.4); font-family: Inter, sans-serif;';
        banner.innerHTML = '🚀 スマホ向け軽量モード (Heavy FX Disabled)';
        document.body.appendChild(banner);
        
        // Stop Intersection Observers and Animations globally by throwing a class
        document.body.classList.add('mobile-lite-mode');
    }
});
