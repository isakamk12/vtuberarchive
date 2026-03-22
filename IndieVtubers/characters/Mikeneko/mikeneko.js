/* ================================================================
   mikeneko.js  ─  Emotional Rain & Mirror Interaction
   ================================================================ */

'use strict';

// ── Emotional Rain (Tears) Animation ──────────────────────────
(function initRain() {
  const container = document.getElementById('rainContainer');
  if (!container) return;

  const RAIN_COUNT = 60;

  function createDrop() {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    
    const startX = Math.random() * 100;
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 5;
    const height = Math.random() * 20 + 10;

    drop.style.left = `${startX}vw`;
    drop.style.height = `${height}px`;
    drop.style.animationDuration = `${duration}s`;
    drop.style.animationDelay = `-${delay}s`;

    container.appendChild(drop);
  }

  // Add rain CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    .rain-drop {
      position: absolute;
      top: -20px;
      width: 1px;
      background: linear-gradient(to bottom, transparent, rgba(168, 218, 220, 0.4));
      animation: rainFall linear infinite;
    }
    @keyframes rainFall {
      to { transform: translateY(110vh); }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < RAIN_COUNT; i++) {
    createDrop();
  }
})();

// ── Mirror Shard Particles ────────────────────────────────────
(function initShards() {
  const container = document.getElementById('mirrorShards');
  if (!container) return;

  const SHARD_COUNT = 15;

  function createShard() {
    const shard = document.createElement('div');
    shard.className = 'mirror-shard-item';
    
    const size = Math.random() * 50 + 20;
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const rotation = Math.random() * 360;

    shard.style.width = `${size}px`;
    shard.style.height = `${size}px`;
    shard.style.left = `${startX}vw`;
    shard.style.top = `${startY}vh`;
    shard.style.transform = `rotate(${rotation}deg)`;

    container.appendChild(shard);
  }

  // Add shard CSS
  const style = document.createElement('style');
  style.textContent = `
    .mirror-shard-item {
      position: absolute;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(2px);
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
      animation: shardGlint 8s ease-in-out infinite alternate;
    }
    @keyframes shardGlint {
      from { opacity: 0.1; transform: scale(1) rotate(0deg); }
      to { opacity: 0.3; transform: scale(1.1) rotate(10deg); color: #fff; }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < SHARD_COUNT; i++) {
    createShard();
  }
})();

// ── Navigation & Scroll Progress ──────────────────────────────
(function initNav() {
  const nav = document.getElementById('mikenekoNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 100) {
      nav.style.background = 'rgba(13, 27, 42, 0.95)';
    } else {
      nav.style.background = 'rgba(13, 27, 42, 0.85)';
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
        link.style.color = '#ffc2d1';
      }
    });
  }, { passive: true });
})();

// ── Hover Interations for Fragments ───────────────────────────
document.querySelectorAll('.fragment').forEach(f => {
  f.addEventListener('mouseenter', () => {
    f.style.background = 'rgba(255, 194, 209, 0.1)';
    f.style.borderColor = '#ffc2d1';
  });
  f.addEventListener('mouseleave', () => {
    f.style.background = 'rgba(255, 255, 255, 0.03)';
    f.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  });
});

// ── Reveal on Scroll ──────────────────────────────────────────
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const targets = document.querySelectorAll('.glass-panel, .tl-item, .ep-card, .mind-block');
  targets.forEach(t => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(30px)';
    t.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(t);
  });

  const style = document.createElement('style');
  style.textContent = `
    .visible { opacity: 1 !important; transform: translateY(0) !important; }
  `;
  document.head.appendChild(style);
})();
