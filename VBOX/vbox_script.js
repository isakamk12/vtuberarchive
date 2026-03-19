// VBOX (ぶいぼっくす) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Make entire member card clickable
    const cards = document.querySelectorAll('.vb-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.vb-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Subtle compass/logo rotation effect based on scroll
    const logoIcon = document.querySelector('.vb-logo-icon');
    const hero = document.querySelector('.vb-hero');
    
    if (hero) {
        setTimeout(() => hero.classList.add('active'), 300);
    }

    window.addEventListener('scroll', () => {
        const rot = window.scrollY * 0.15;
        if (logoIcon) logoIcon.style.transform = `rotate(${rot}deg)`;
        
        // Parallax for bg map
        const bgMap = document.querySelector('.vb-bg-map');
        if (bgMap) bgMap.style.backgroundPosition = `0 ${window.scrollY * 0.2}px`;
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
