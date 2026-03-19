// Tsunderia — Agency Script
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 1. Theme Toggle Logic
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dere-mode');
            updateSpeechBubbles('dere');
        } else {
            body.classList.remove('dere-mode');
            updateSpeechBubbles('tsun');
        }
    });

    const tsunLines = [
        "B-Baka!", "Hmpf!", "IDIOT!", "Shut up!", "Don't look!", "Whatever...", "Hah?", "No way."
    ];
    const dereLines = [
        "A-Arigato.", "Ehehe...", "S-senpai...", "D-don't stare.", "Uhh...", "Maybe...", "Warm.", "Soft."
    ];

    function updateSpeechBubbles(mode) {
        const bubbles = document.querySelectorAll('.speech-bubble');
        bubbles.forEach(bubble => {
            const lines = mode === 'dere' ? dereLines : tsunLines;
            bubble.textContent = lines[Math.floor(Math.random() * lines.length)];
        });
    }

    // 2. Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => observer.observe(el));

    // 3. Manga Action Lines Reveal (on hover)
    const panels = document.querySelectorAll('.manga-panel');
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            panel.classList.add('hover-active');
        });
        panel.addEventListener('mouseleave', () => {
            panel.classList.remove('hover-active');
        });
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
