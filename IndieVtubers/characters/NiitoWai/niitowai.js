/* ================================================================
   niitowai.js  ─  Neet Life & Pop Interaction
   ================================================================ */

'use strict';

// ── Floating Items (Neet Essentials) ──────────────────────────
(function initFloatingItems() {
  const container = document.getElementById('floatingItems');
  if (!container) return;

  const ITEMS = ['🎮', '🧃', '🍱', '🐰', '2⃣', '🔟', '💻', '✨'];
  const COUNT = 15;

  function createItem() {
    const item = document.createElement('div');
    item.className = 'wai-floating-item';
    item.textContent = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    
    const startX = Math.random() * 100;
    const duration = Math.random() * 8 + 4;
    const delay = Math.random() * 5;
    const size = Math.random() * 1.5 + 1;

    item.style.left = `${startX}vw`;
    item.style.fontSize = `${size}rem`;
    item.style.animationDuration = `${duration}s`;
    item.style.animationDelay = `-${delay}s`;

    container.appendChild(item);
  }

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .wai-floating-item {
      position: absolute;
      top: -10vh;
      opacity: 0.15;
      animation: waiFloatDown linear infinite;
      pointer-events: none;
    }
    @keyframes waiFloatDown {
      to { transform: translateY(110vh) rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < COUNT; i++) {
    createItem();
  }
})();

// ── Navigation & Scroll Progress ──────────────────────────────
(function initNav() {
  const nav = document.getElementById('waiNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 50) {
      nav.style.height = '60px';
      nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
      nav.style.height = '75px';
      nav.style.boxShadow = 'none';
    }

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (scrollPos >= top) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.style.color = '#555';
      if (link.getAttribute('href').includes(current)) {
        link.style.color = '#ff8c00';
      }
    });
  }, { passive: true });
})();

// ── Reveal on Scroll (Pop Style) ──────────────────────────────
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const targets = document.querySelectorAll('.wai-id-card, .family-box, .s-card, .game-item, .ep-card');
  targets.forEach(t => {
    t.classList.add('reveal-hidden');
    observer.observe(t);
  });

  const style = document.createElement('style');
  style.textContent = `
    .reveal-hidden { opacity: 0; transform: scale(0.9) translateY(20px); transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
    .reveal-active { opacity: 1; transform: scale(1) translateY(0); }
  `;
  document.head.appendChild(style);
})();

// ── ID Card Tilt ─────────────────────────────────────────────
const idCard = document.querySelector('.wai-id-card');
if (idCard) {
  idCard.addEventListener('mousemove', (e) => {
    const rect = idCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    idCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  idCard.addEventListener('mouseleave', () => {
    idCard.style.transform = 'rotateX(0) rotateY(0)';
  });
}
