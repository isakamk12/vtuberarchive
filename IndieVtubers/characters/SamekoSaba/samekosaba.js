/* ================================================================
   samekosaba.js  ─  Digital Ocean & Fish Interaction
   ================================================================ */

'use strict';

// ── Swimming Mackerel Canvas ──────────────────────────────────
(function initSabaCanvas() {
  const canvas = document.getElementById('sabaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let fishes = [];
  const FISH_COUNT = 15;
  const CODE_STRINGS = ['0', '1', '< >', '{ }', '鯖', 'saba'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class MackerelCode {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speed = Math.random() * 2 + 1;
      this.size = Math.random() * 20 + 10;
      this.text = CODE_STRINGS[Math.floor(Math.random() * CODE_STRINGS.length)];
      this.opacity = Math.random() * 0.4 + 0.1;
      this.angle = Math.random() * Math.PI * 2;
      this.wobble = Math.random() * 0.05;
    }

    update() {
      this.x += this.speed;
      this.y += Math.sin(this.angle) * 0.5;
      this.angle += this.wobble;

      if (this.x > canvas.width + 50) {
        this.x = -50;
        this.y = Math.random() * canvas.height;
      }
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#00ffff';
      ctx.font = `${this.size}px "Fira Code"`;
      
      // Draw a simple fish shape made of code/symbols
      ctx.fillText(`⪦${this.text}彡`, this.x, this.y);
    }
  }

  function setup() {
    resize();
    fishes = [];
    for (let i = 0; i < FISH_COUNT; i++) {
      fishes.push(new MackerelCode());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fishes.forEach(f => {
      f.update();
      f.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', setup);
  setup();
  animate();
})();

// ── Navigation & Scroll Effect ───────────────────────────────
(function initNav() {
  const nav = document.getElementById('sabaNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 100) {
      nav.style.background = 'rgba(5, 15, 25, 0.95)';
      nav.style.height = '60px';
    } else {
      nav.style.background = 'rgba(5, 15, 25, 0.85)';
      nav.style.height = '70px';
    }

    // Active Link Highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      if (scrollPos >= top) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.style.color = '#aaa';
      if (link.getAttribute('href').includes(current)) {
        link.style.color = '#00ffff';
      }
    });
  }, { passive: true });
})();

// ── Intersection Observer: Fade Up ───────────────────────────
(function initFade() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const targets = document.querySelectorAll('.saba-card, .dev-container, .life-card, .chaos-post, .profile-text');
  targets.forEach(t => {
    t.classList.add('fade-up-target');
    observer.observe(t);
  });

  // Inject animation styles
  const style = document.createElement('style');
  style.textContent = `
    .fade-up-target { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
    .is-visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);
})();

// ── Click Interaction: Binary Bubbles ────────────────────────
window.addEventListener('click', (e) => {
  const count = 5;
  for (let i = 0; i < count; i++) {
    createBubble(e.clientX, e.clientY);
  }
});

function createBubble(x, y) {
  const bubble = document.createElement('div');
  const isBinary = Math.random() > 0.5;
  bubble.textContent = isBinary ? (Math.random() > 0.5 ? '0' : '1') : '🫧';
  
  bubble.style.position = 'fixed';
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  bubble.style.pointerEvents = 'none';
  bubble.style.color = '#00ffff';
  bubble.style.fontSize = `${Math.random() * 1 + 1}rem`;
  bubble.style.zIndex = '9999';
  bubble.style.transition = 'all 1s ease-out';
  
  document.body.appendChild(bubble);

  const tx = (Math.random() - 0.5) * 100;
  const ty = -100 - Math.random() * 100;

  requestAnimationFrame(() => {
    bubble.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
    bubble.style.opacity = '0';
  });

  setTimeout(() => bubble.remove(), 1000);
}
