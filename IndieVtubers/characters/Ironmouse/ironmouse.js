/* ================================================================
   ironmouse.js  ─  Interaction & Particle Effects
   ================================================================ */

'use strict';

// ── Particle System (Magic Bells & Digital Sparks) ─────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  const PARTICLE_COUNT = 40;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.init();
    }

    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.isBell = Math.random() > 0.8; // 20% chance to be a symbol
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.globalAlpha = this.opacity;
      if (this.isBell) {
        ctx.font = `${this.size * 5}px serif`;
        ctx.fillText('🔔', this.x, this.y);
      } else {
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function setup() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', setup);
  setup();
  animate();
})();

// ── Navigation & Scroll Progress ──────────────────────────────
(function initNav() {
  const nav = document.getElementById('mouseNav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  function onScroll() {
    const scrollPos = window.scrollY;
    
    // Toggle nav background
    if (scrollPos > 50) {
      nav.style.background = 'rgba(10, 10, 12, 0.95)';
      nav.style.height = '60px';
    } else {
      nav.style.background = 'rgba(10, 10, 12, 0.8)';
      nav.style.height = '70px';
    }

    // Active Section Check
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (scrollPos >= top) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── Smooth Scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: 'smooth'
    });
  });
});

// ── Intersection Observer: Fade In ──────────────────────────────
(function initFadeIn() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = [
    ...document.querySelectorAll('.mouse-card'),
    ...document.querySelectorAll('.timeline-entry'),
    ...document.querySelectorAll('.ep-card'),
    ...document.querySelectorAll('.story-text-block')
  ];

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
  });

  // Dynamic class for visible state
  const style = document.createElement('style');
  style.textContent = `
    .visible { opacity: 1 !important; transform: translateY(0) !important; }
  `;
  document.head.appendChild(style);
})();

// ── Click Effect (Bell Splash) ─────────────────────────────────
window.addEventListener('click', (e) => {
  const ripple = document.createElement('span');
  ripple.textContent = '🔔';
  ripple.style.position = 'fixed';
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  ripple.style.pointerEvents = 'none';
  ripple.style.fontSize = '1.5rem';
  ripple.style.zIndex = '9999';
  ripple.style.transform = 'translate(-50%, -50%)';
  ripple.style.transition = 'all 0.6s ease-out';
  ripple.style.opacity = '1';
  document.body.appendChild(ripple);

  requestAnimationFrame(() => {
    ripple.style.transform = 'translate(-50%, -100%) scale(2)';
    ripple.style.opacity = '0';
  });

  setTimeout(() => ripple.remove(), 600);
});
