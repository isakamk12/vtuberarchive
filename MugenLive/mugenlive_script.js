// MUGEN LIVE — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer
    const reveals = document.querySelectorAll('.mu-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Nav shrink on scroll
    const nav = document.querySelector('.mu-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Make entire member card clickable
    const cards = document.querySelectorAll('.mu-member-card');
    cards.forEach(card => {
        const link = card.querySelector('a.mu-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Danmaku Generator (Background floating comments)
    const danmakuContainer = document.getElementById('mu-danmaku');
    const comments = [
        "MUGEN LIVE!!!", "wkwkwkwk", "草", "Kawaii~", "GG!!",
        "888888888", "Love from JP!", "Infinite Possibilities",
        "Bilibili", "最高！", "Pikachu", "VUP", "Aya-chan!!",
        "Global Stream", "Nihao", "Hello everyone", "Kusa"
    ];

    function createDanmaku() {
        if (!danmakuContainer) return;

        const el = document.createElement('div');
        el.className = 'mu-danmaku-item';
        el.textContent = comments[Math.floor(Math.random() * comments.length)];

        // Random top position (0 to 90%)
        el.style.top = Math.random() * 90 + '%';

        // Random speed (10s to 25s)
        const duration = Math.random() * 15 + 10;

        // Random opacity based on speed (faster = slightly more opaque)
        el.style.opacity = Math.random() * 0.3 + 0.1;

        // Random color
        const colors = ['#fff', '#FF6699', '#00A1D6'];
        if (Math.random() > 0.7) {
            el.style.color = colors[Math.floor(Math.random() * colors.length)];
        }

        el.style.animation = `flyDanmaku ${duration}s linear forwards`;

        danmakuContainer.appendChild(el);

        // Remove element after animation
        setTimeout(() => {
            if (el.parentNode) el.parentNode.removeChild(el);
        }, duration * 1000);
    }

    // Spawn danmaku regularly
    setInterval(createDanmaku, 800);

    // Initial burst
    for (let i = 0; i < 5; i++) {
        setTimeout(createDanmaku, i * 200);
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
