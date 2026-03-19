// Universe Production — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer for soft scroll fades
    const reveals = document.querySelectorAll('.up-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Make entire member card clickable
    const cards = document.querySelectorAll('.up-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.up-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Generate floating lantern background effects
    const lanternsContainer = document.getElementById('lanterns');
    if (lanternsContainer) {
        const numLanterns = 15;
        for (let i = 0; i < numLanterns; i++) {
            const lantern = document.createElement('div');
            lantern.classList.add('up-lantern');

            // Random properties
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 15 + 10; // 10s to 25s

            // Make some slightly red for variety
            if (Math.random() > 0.7) {
                lantern.style.background = 'var(--up-red)';
                lantern.style.boxShadow = '0 0 15px 5px rgba(229, 57, 53, 0.5)';
            }

            lantern.style.left = `${left}vw`;
            lantern.style.animationDelay = `${delay}s`;
            lantern.style.animationDuration = `${duration}s`;

            lanternsContainer.appendChild(lantern);
        }
    }
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
