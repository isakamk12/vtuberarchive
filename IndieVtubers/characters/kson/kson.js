/* ================================================================
   kson.js  ─  Cinematic & Soul Interaction
   ================================================================ */

'use strict';

// ── Smoke Overlay (Background Animation) ──────────────────────
(function initSmoke() {
  const container = document.getElementById('smokeOverlay');
  if (!container) return;

  const SMOKE_COUNT = 10;

  function createSmoke() {
    const smoke = document.createElement('div');
    smoke.className = 'smoke-particle';
    
    const size = Math.random() * 400 + 200;
    const startX = Math.random() * 100;
    const startY = Math.random() * 50 + 50;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 10;

    smoke.style.width = `${size}px`;
    smoke.style.height = `${size}px`;
    smoke.style.left = `${startX}vw`;
    smoke.style.top = `${startY}vh`;
    smoke.style.animationDuration = `${duration}s`;
    smoke.style.animationDelay = `-${delay}s`;

    container.appendChild(smoke);
  }

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .smoke-particle {
      position: absolute;
      background: radial-gradient(circle, rgba(218, 165, 32, 0.03) 0%, transparent 70%);
      border-radius: 50%;
      filter: blur(50px);
      animation: smokeMove linear infinite alternate;
      pointer-events: none;
    }
    @keyframes smokeMove {
      from { transform: translate(0, 0) scale(1); opacity: 0.3; }
      to { transform: translate(-50px, -50px) scale(1.5); opacity: 0.1; }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < SMOKE_COUNT; i++) {
    createSmoke();
  }
})();

// ── Navigation & Scroll Progress ──────────────────────────────
(function initNav() {
  const nav = document.getElementById('ksonNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 100) {
      nav.style.height = '60px';
      nav.style.background = 'rgba(0, 0, 0, 0.98)';
      nav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
    } else {
      nav.style.height = '75px';
      nav.style.background = 'rgba(0, 0, 0, 0.9)';
      nav.style.boxShadow = 'none';
    }

    // Active link highlighting
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      if (scrollPos >= top) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.style.color = '#888';
      if (link.getAttribute('href').includes(current)) {
        link.style.color = '#daa520';
      }
    });
  }, { passive: true });
})();

// ── Reveal on Scroll (Cinematic) ─────────────────────────────
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const targets = document.querySelectorAll('.persona-card, .rgg-box, .tl-item, .ep-card, .stat-item');
  targets.forEach(t => {
    t.classList.add('reveal-hidden');
    observer.observe(t);
  });

  const style = document.createElement('style');
  style.textContent = `
    .reveal-hidden { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1); }
    .reveal-active { opacity: 1; transform: translateY(0); }
    .stat-item.reveal-hidden { transform: scale(0.8); }
    .stat-item.reveal-active { transform: scale(1); }
  `;
  document.head.appendChild(style);
})();

// ── Hover Effects for Persona Cards ─────────────────────────
document.querySelectorAll('.persona-card').forEach(p => {
  p.addEventListener('mouseenter', () => {
    p.style.transform = 'scale(1.02) translateY(-5px)';
    p.style.boxShadow = '0 20px 50px rgba(0,0,0,0.6)';
  });
  p.addEventListener('mouseleave', () => {
    p.style.transform = 'scale(1) translateY(0)';
    p.style.boxShadow = 'none';
  });
});
