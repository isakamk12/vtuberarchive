// 3AM — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Reveal Observer for chaotic reveals
    const reveals = document.querySelectorAll('.am-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('active'), i * 150 + (Math.random() * 200));
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Randomize initial rotation and set hover rotation for cards
    const cards = document.querySelectorAll('.am-member-card');
    cards.forEach(card => {
        // Slight random rotation for the messy look
        const initialRot = (Math.random() * 4) - 2;
        card.style.transform = `rotate(${initialRot}deg)`;

        // Random hover rotation
        const hoverRot = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 5 + 2);
        card.style.setProperty('--hover-deg', `${hoverRot}deg`);

        const link = card.querySelector('.am-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    // Glitch out before navigating
                    card.style.animation = 'glitch1 0.2s infinite alternate-reverse';
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }
            });
        }
    });

    // Generate random creepy eyes in background
    const eyesContainer = document.getElementById('creepy-eyes');
    if (eyesContainer) {
        for (let i = 0; i < 8; i++) {
            const eye = document.createElement('div');
            eye.classList.add('am-eye');
            eye.innerHTML = '<i class="fa-solid fa-eye"></i>';

            eye.style.top = `${Math.random() * 100}vh`;
            eye.style.left = `${Math.random() * 100}vw`;
            eye.style.animationDelay = `${Math.random() * 5}s`;
            eye.style.fontSize = `${Math.random() * 2 + 1}rem`;

            if (Math.random() > 0.5) eye.style.color = 'var(--am-purple)';
            if (Math.random() > 0.8) eye.style.color = 'var(--am-red)';

            eyesContainer.appendChild(eye);
        }
    }

    // Occasional glitch on the main clock
    const clock = document.getElementById('clock');
    if (clock) {
        setInterval(() => {
            if (Math.random() > 0.8) {
                clock.style.transform = `skewX(${(Math.random() * 40) - 20}deg)`;
                clock.style.color = 'var(--am-red)';
                setTimeout(() => {
                    clock.style.transform = 'skewX(0)';
                    clock.style.color = 'var(--am-green)';
                }, 100);
            }
        }, 2000);
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
