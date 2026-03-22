/* ================================================================
   shigureui.js  ─  しぐれうい キャラクターページ
   ================================================================ */

'use strict';

// ── 雨粒アニメーション ──────────────────────────────────────────
(function initRain() {
  const canvas = document.getElementById('rainCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let drops = [];
  const RAIN_COUNT = 80;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createDrop() {
    return {
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height - canvas.height,
      len:     Math.random() * 18 + 8,
      speed:   Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.4 + 0.1,
      width:   Math.random() * 1 + 0.5,
    };
  }

  function initDrops() {
    drops = Array.from({ length: RAIN_COUNT }, createDrop);
  }

  function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.len * 0.15, d.y + d.len);
      ctx.strokeStyle = `rgba(180, 210, 240, ${d.opacity})`;
      ctx.lineWidth   = d.width;
      ctx.stroke();

      d.y += d.speed;
      d.x -= d.speed * 0.15;

      if (d.y > canvas.height + 20) {
        Object.assign(d, createDrop());
        d.y = -20;
      }
    });
    requestAnimationFrame(drawRain);
  }

  resize();
  initDrops();
  drawRain();
  window.addEventListener('resize', () => { resize(); initDrops(); });
})();


// ── ナビ・スクロール連動 ─────────────────────────────────────────
(function initNav() {
  const nav      = document.getElementById('uiNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  function onScroll() {
    // スクロールでナビ背景を強化
    nav.classList.toggle('scrolled', window.scrollY > 60);

    // アクティブセクションを判定
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ── スムーススクロール ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // nav height
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth',
    });
  });
});


// ── IntersectionObserver: フェードイン ───────────────────────────
(function initFadeIn() {
  // フェード対象要素に class を付与
  const targets = [
    ...document.querySelectorAll('.ep-card'),
    ...document.querySelectorAll('.timeline-item'),
    ...document.querySelectorAll('.bio-detail-card'),
    ...document.querySelectorAll('.record-item'),
  ];

  targets.forEach(el => el.classList.add('fade-in-up'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
})();


// ── 傘カーソルエフェクト (ヒーローエリアのみ) ────────────────────
(function initUmbrellaTrail() {
  const hero = document.getElementById('heroSection');
  if (!hero) return;

  const particles = [];
  let lastEmit = 0;

  hero.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastEmit < 80) return;
    lastEmit = now;

    const p = document.createElement('span');
    p.textContent = '☂';
    p.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      font-size: ${Math.random() * 14 + 10}px;
      opacity: 0.7;
      pointer-events: none;
      z-index: 999;
      transform: translate(-50%, -50%);
      transition: opacity 0.8s ease, transform 0.8s ease;
      will-change: opacity, transform;
      color: rgba(232, 114, 154, 0.65);
    `;
    document.body.appendChild(p);
    particles.push(p);

    requestAnimationFrame(() => {
      p.style.opacity   = '0';
      p.style.transform = `translate(-50%, -120%) scale(0.5)`;
    });

    setTimeout(() => {
      p.remove();
      const idx = particles.indexOf(p);
      if (idx > -1) particles.splice(idx, 1);
    }, 900);
  });
})();


// ── ページ読み込み時のちいさなスプラッシュ演出 ───────────────────
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ── マウス連動パララックス（背景オーブ＆スプラッシュ） ──────────────
(function initParallax() {
  const inkBg = document.querySelector('.ink-bg');
  const splashes = document.querySelectorAll('.watercolor-splash');
  if (!inkBg && !splashes.length) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // 目標値（スムーズ追従用）
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateParallax() {
    // スムーズな遅延（慣性）の設定
    const ease = 0.05;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    // 画面中心を(0,0)としたときのオフセット割合 (-1.0 ~ 1.0)
    const offsetX = (currentX / window.innerWidth) * 2 - 1;
    const offsetY = (currentY / window.innerHeight) * 2 - 1;

    // 背景全体への適用（既存の個別CSSアニメーションと干渉しないためコンテナを動かす）
    if (inkBg) {
      inkBg.style.transform = `translate(${offsetX * -30}px, ${offsetY * -40}px) scale(1.05)`;
    }

    // ヒーローのスプラッシュへの適用
    splashes.forEach((splash, i) => {
      const multX = (i === 0) ? 15 : -15;
      const multY = 10;
      splash.style.transform = `translate(${offsetX * multX}px, ${offsetY * multY}px) scale(1.05)`;
    });

    requestAnimationFrame(updateParallax);
  }

  updateParallax();
})();
