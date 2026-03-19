document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal animations with staggered stamps
    const reveals = document.querySelectorAll('.ssg-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains stamps, stamp them after some delay
                const stamps = entry.target.querySelectorAll('.ssg-stamp');
                stamps.forEach((stamp, i) => {
                    setTimeout(() => {
                        stamp.classList.add('stamped');
                    }, 500 + i * 200);
                });
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Special case for Hero stamp
    setTimeout(() => {
        const heroStamp = document.querySelector('.ssg-stamp-hero');
        if (heroStamp) heroStamp.classList.add('stamped');
    }, 1000);
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
