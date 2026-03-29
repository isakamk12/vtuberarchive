// Universal Mobile Optimizer & Global Transition Manager
document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. Mobile Optimizer Section ----
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Hide heavy elements immediately
        const heavyElements = document.querySelectorAll('.bg-wrap, .bg-mesh, .bg-noise, .omni-bg, .stage-bg, .nr-bg, .screen-vignette, .bg-fx, .bg-layer');
        heavyElements.forEach(el => el.style.display = 'none');
        
        // Inject Banner
        const banner = document.createElement('div');
        banner.style.cssText = 'background: #ffc83d; color: #000; text-align: center; font-size: 0.85rem; padding: 4px; font-weight: 900; position: fixed; bottom: 0; width: 100%; z-index: 9999; box-shadow: 0 -2px 10px rgba(255, 200, 60, 0.4); font-family: Inter, sans-serif;';
        banner.innerHTML = '🚀 スマホ向け軽量モード (Heavy FX Disabled)';
        document.body.appendChild(banner);
        
        // Stop Intersection Observers and Animations globally by throwing a class
        document.body.classList.add('mobile-lite-mode');
    }

    // ---- 2. Global Return/Dive Transition (Agency to Index) ----
    // Inject the CSS styles for the return warp transition dynamically
    const warpStyle = document.createElement('style');
    warpStyle.innerHTML = `
        /* Agency Return Warp Layer */
        #globalReturnWarp {
            position: fixed; inset: 0; z-index: 99999;
            background: #030305;
            opacity: 0; pointer-events: none;
            display: flex; justify-content: center; align-items: center;
            perspective: 800px;
        }
        #globalReturnWarp::after {
            content: ''; position: absolute; inset: -50%;
            background: repeating-linear-gradient(180deg, transparent 0, transparent 40px, rgba(255, 0, 123, 0.2) 40px, rgba(0, 229, 255, 0.1) 42px);
            opacity: 0; transform: scaleZ(2) translateZ(-500px);
        }
        .is-returning #globalReturnWarp {
            pointer-events: auto;
            animation: warpOutBg 0.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
        .is-returning #globalReturnWarp::after {
            animation: warpOutGrid 0.5s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
        @keyframes warpOutBg {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 1; background: #000; }
        }
        @keyframes warpOutGrid {
            0% { opacity: 0; transform: scaleZ(1) translateZ(500px); filter: blur(20px); }
            100% { opacity: 1; transform: scaleZ(1) translateZ(0); filter: blur(0px); }
        }

        /* Agency Entrance Animation (from Index Dive) */
        body { 
            animation: agencyEnter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
        }
        @keyframes agencyEnter {
            0% { opacity: 0; transform: scale(1.5); filter: blur(15px); }
            100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
    `;
    document.head.appendChild(warpStyle);

    // Append the warp layer to DOM
    const warpLayer = document.createElement('div');
    warpLayer.id = 'globalReturnWarp';
    document.body.appendChild(warpLayer);

    // Intercept clicks on links going back to the main index
    document.body.addEventListener('click', (e) => {
        // Find closest anchor tag
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        // Validate if it's pointing to the root index.html
        if (href && (href.endsWith('../index.html') || href === '../index.html')) {
            e.preventDefault();
            // Trigger the warp back animation
            document.body.classList.add('is-returning');
            
            // Wait for CSS animation to finish before navigating
            setTimeout(() => {
                window.location.href = link.href;
            }, 460);
        }
    });
});
