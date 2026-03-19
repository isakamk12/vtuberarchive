// Mahoroba — Agency Script
document.addEventListener('DOMContentLoaded', () => {
    // 1. Warm Reveal (Intersection Observer)
    const reveals = document.querySelectorAll('.mh-reveal, .mh-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Soft delay for staggered feel
                setTimeout(() => {
                    entry.target.classList.add('active');
                    entry.target.style.filter = 'blur(0)';
                }, i * 150);
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => {
        el.style.filter = 'blur(10px)'; // Initial state for warm fade
        observer.observe(el);
    });

    // 2. Hanko Stamp Pulse
    const cards = document.querySelectorAll('.mh-member-card');
    cards.forEach(card => {
        // Create Hanko Element if it doesn't exist
        const stamps = ["幸", "雅", "結", "和", "楽"];
        const stampStr = stamps[Math.floor(Math.random() * stamps.length)];
        
        const hanko = document.createElement('div');
        hanko.className = 'mh-hanko-hover';
        hanko.textContent = stampStr;
        card.appendChild(hanko);

        card.addEventListener('mouseenter', () => {
            hanko.classList.add('pulse');
        });
        
        card.addEventListener('mouseleave', () => {
            hanko.classList.remove('pulse');
        });

        // Click Logic
        const link = card.querySelector('.mh-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });
});


const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

const app = createApp({
    setup() {
        const windowWidth = ref(window.innerWidth);
        const isMobile = computed(() => windowWidth.value <= 768);

        const handleResize = () => {
            windowWidth.value = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            isMobile
        }
    }
});

app.mount('#app');
