document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects on cursor
    const interactiveElements = document.querySelectorAll('button, a, .glitch');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = 'var(--neon-cyan)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = 'var(--neon-pink)';
        });
    });

    // Loader logic
    const loader = document.getElementById('loader');
    const startBtn = document.getElementById('start-btn');
    
    // Prevent scrolling initially
    document.body.style.overflowY = 'hidden';

    // Start MV
    startBtn.addEventListener('click', () => {
        window.scrollTo(0, 0); // Reset scroll
        loader.classList.add('hidden');
        document.body.style.overflowY = 'auto'; // Enable scroll
    });

    // Intersection Observer for scroll triggers
    const scenes = document.querySelectorAll('.scene');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.35 // Trigger when 35% visible
    };

    const sceneObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                
                // Handle body color inversion
                if (entry.target.classList.contains('invert-scene')) {
                    document.body.classList.add('invert');
                }
            } else {
                // If you want animations to replay upon scrolling up/down
                entry.target.classList.remove('is-active');
                
                if (entry.target.classList.contains('invert-scene')) {
                    document.body.classList.remove('invert');
                }
            }
        });
    }, observerOptions);

    scenes.forEach(scene => {
        sceneObserver.observe(scene);
    });
});
