/* ================================================================
   yuukisakuna.js  ─  Ribbon Particles & Interaction
   ================================================================ */

'use strict';

// ── Floating Decorations (Ribbons & Sakura) ───────────────────
(function initDecorations() {
  const container = document.getElementById('sakunaDecor');
  if (!container) return;

  const DECOR_ITEMS = ['🎀', '🌸', '✨', '🐾'];
  const MAX_ITEMS = 30;

  function createItem() {
    const item = document.createElement('div');
    item.className = 'sakuna-decor-item';
    item.textContent = DECOR_ITEMS[Math.floor(Math.random() * DECOR_ITEMS.length)];
    
    const startX = Math.random() * 100;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    const size = Math.random() * 1.5 + 0.8;

    item.style.left = `${startX}vw`;
    item.style.animationDuration = `${duration}s`;
    item.style.animationDelay = `-${delay}s`;
    item.style.fontSize = `${size}rem`;

    container.appendChild(item);

    // Remove after one cycle and recreate
    setTimeout(() => {
      item.remove();
      createItem();
    }, (duration + delay) * 1000);
  }

  for (let i = 0; i < MAX_ITEMS; i++) {
    setTimeout(createItem, Math.random() * 5000);
  }
})();

// ── Navigation & Scroll Progress ──────────────────────────────
(function initNav() {
  const nav = document.getElementById('sakunaNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 50) {
      nav.style.height = '60px';
      nav.style.boxShadow = '0 5px 20px rgba(255, 105, 180, 0.1)';
    } else {
      nav.style.height = '75px';
      nav.style.boxShadow = 'none';
    }

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (scrollPos >= top) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.style.color = '#887777';
      if (link.getAttribute('href').includes(current)) {
        link.style.color = '#ff69b4';
      }
    });
  }, { passive: true });
})();

// ── Click Interaction: Cat Paw Prints ────────────────────────
window.addEventListener('mousedown', (e) => {
  createPaw(e.clientX, e.clientY);
});

function createPaw(x, y) {
  const paw = document.createElement('div');
  paw.textContent = '🐾';
  paw.style.position = 'fixed';
  paw.style.left = `${x}px`;
  paw.style.top = `${y}px`;
  paw.style.fontSize = '2rem';
  paw.style.color = '#ffb7c5';
  paw.style.pointerEvents = 'none';
  paw.style.zIndex = '9999';
  paw.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
  paw.style.opacity = '1';
  paw.style.transition = 'all 0.8s ease-out';
  
  document.body.appendChild(paw);

  requestAnimationFrame(() => {
    paw.style.transform += ' scale(1.5)';
    paw.style.opacity = '0';
  });

  setTimeout(() => paw.remove(), 800);
}

// ── Reveal on Scroll ──────────────────────────────────────────
(function initReveal() {
  const threshold = 0.1;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  const targets = document.querySelectorAll('.sakuna-card, .ep-card, .passion-block, .record-item, .bio-box');
  targets.forEach(t => {
    t.classList.add('reveal-hidden');
    observer.observe(t);
  });

  // Inject animation styles
  const style = document.createElement('style');
  style.textContent = `
    .reveal-hidden { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1); }
    .reveal-active { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);
})();
