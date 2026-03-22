/* ================================================================
   kawasakisui.js  ─  Logic & Data Interaction
   ================================================================ */

'use strict';

// ── Data Stream Multiplier (Background Animation) ─────────────
(function initDataStream() {
  const container = document.getElementById('dataStream');
  if (!container) return;

  const DATA_TYPES = ['01', 'DATA', 'ANALYZE', 'SUI', '6.5M', 'GROWTH', 'GT7', 'ESTRELLA'];
  const COLUMN_COUNT = 20;

  function createColumn() {
    const col = document.createElement('div');
    col.className = 'data-column';
    col.style.left = `${Math.random() * 100}vw`;
    col.style.animationDuration = `${Math.random() * 10 + 5}s`;
    col.style.animationDelay = `-${Math.random() * 10}s`;
    
    // Fill column with random data
    let text = '';
    for(let i=0; i<30; i++) {
      text += DATA_TYPES[Math.floor(Math.random() * DATA_TYPES.length)] + '<br>';
    }
    col.innerHTML = text;
    container.appendChild(col);
  }

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .data-column {
      position: absolute;
      top: -100%;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.6rem;
      color: #408269;
      opacity: 0.4;
      white-space: nowrap;
      animation: fall linear infinite;
      line-height: 2;
    }
    @keyframes fall {
      to { transform: translateY(200vh); }
    }
  `;
  document.head.appendChild(style);

  for (let i = 0; i < COLUMN_COUNT; i++) {
    createColumn();
  }
})();

// ── Navigation & Scroll Progress ──────────────────────────────
(function initNav() {
  const nav = document.getElementById('suiNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 50) {
      nav.style.height = '60px';
      nav.style.background = 'rgba(15, 20, 17, 0.98)';
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.height = '70px';
      nav.style.background = 'rgba(15, 20, 17, 0.9)';
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
      link.style.color = '#777';
      if (link.getAttribute('href').includes(current)) {
        link.style.color = '#408269';
      }
    });
  }, { passive: true });
})();

// ── Reveal on Scroll (Analyst Style) ──────────────────────────
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const targets = document.querySelectorAll('.profile-card-wrap, .bio-block, .consult-box, .hobby-card, .case-card');
  targets.forEach(t => {
    t.classList.add('reveal-hidden');
    observer.observe(t);
  });

  const style = document.createElement('style');
  style.textContent = `
    .reveal-hidden { opacity: 0; transform: translateX(-20px); transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1); }
    .reveal-active { opacity: 1; transform: translateX(0); }
    .consult-box.reveal-hidden { transform: translateY(30px); }
  `;
  document.head.appendChild(style);
})();

// ── Business Card Interaction ─────────────────────────────────
const card = document.querySelector('.sui-business-card');
if (card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
}
