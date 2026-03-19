// AKA Virtual — Agency Script

document.addEventListener('DOMContentLoaded', () => {
   // Reveal Observer
   const reveals = document.querySelectorAll('.ak-reveal');
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
         if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 150);
         }
      });
   }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
   reveals.forEach(el => observer.observe(el));

   // Make entire member card clickable
   const cards = document.querySelectorAll('.ak-member-card');
   cards.forEach(card => {
      const link = card.querySelector('a.ak-member-name');
      if (link) {
         card.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
               window.location.href = link.href;
            }
         });
      }
   });

   // Hexagon / Data Canvas Background
   const canvas = document.getElementById('ak-hex-canvas');
   if (canvas) {
      const ctx = canvas.getContext('2d');
      let width, height;
      let points = [];

      function resize() {
         width = canvas.width = window.innerWidth;
         height = canvas.height = window.innerHeight;
         initPoints();
      }

      window.addEventListener('resize', resize);

      function initPoints() {
         points = [];
         const spacing = 40;
         const cols = Math.floor(width / spacing) + 1;
         const rows = Math.floor(height / spacing) + 1;

         for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
               points.push({
                  x: i * spacing + (Math.random() * 10 - 5),
                  y: j * spacing + (Math.random() * 10 - 5),
                  baseY: j * spacing,
                  angle: Math.random() * Math.PI * 2,
                  speed: 0.02 + Math.random() * 0.03
               });
            }
         }
      }

      function animate() {
         ctx.clearRect(0, 0, width, height);

         ctx.fillStyle = 'rgba(0, 240, 255, 0.4)'; // Cyan dots

         for (let i = 0; i < points.length; i++) {
            let p = points[i];
            p.angle += p.speed;
            // Delicate floating motion
            p.y = p.baseY + Math.sin(p.angle) * 3;

            ctx.beginPath();
            ctx.rect(p.x, p.y, 2, 2);
            ctx.fill();
         }

         requestAnimationFrame(animate);
      }

      resize();
      animate();
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
