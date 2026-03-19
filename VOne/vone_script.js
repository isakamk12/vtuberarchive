// VOne Production (ぶいわんプロダクション) — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Make entire spotlight card clickable
    const spotlightCards = document.querySelectorAll('.vo-member-card.spotlight');
    // Spotlight mouse tracking
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });

        const link = card.querySelector('.vo-member-name');
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
