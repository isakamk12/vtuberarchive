// VOMS Project — Agency Script

document.addEventListener('DOMContentLoaded', () => {
    // Make entire member card clickable
    const cards = document.querySelectorAll('.vm-member-card');
    cards.forEach(card => {
        const link = card.querySelector('.vm-member-name');
        if (link) {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('a')) {
                    window.location.href = link.href;
                }
            });
        }
    });

    // Fun random wiggle on load for cards to look like restless monsters
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = `translateY(-5px) rotate(${Math.random() > 0.5 ? 2 : -2}deg)`;
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        }, index * 100 + 500);
    });

    // Generate monster particles in the background
    const bg = document.querySelector('.vm-bg');
    const icons = ['fa-ghost', 'fa-skull', 'fa-bolt', 'fa-fire', 'fa-dragon'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('i');
        particle.className = `fa-solid ${icons[Math.floor(Math.random() * icons.length)]} vm-particle`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.fontSize = `${Math.random() * 20 + 10}px`;
        particle.style.opacity = Math.random() * 0.1 + 0.05;
        particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        bg.appendChild(particle);
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
