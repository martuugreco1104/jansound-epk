/* ═══════════════════════════════════════
   WAVEFORM GENERATOR
═══════════════════════════════════════ */
function generateWaveform(id, seed) {
  const container = document.getElementById(id);
  if (!container) return;
  const rng = (s => () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; })(seed);
  const bars = 80;
  container.innerHTML = '';
  for (let i = 0; i < bars; i++) {
    const h = Math.max(6, Math.round(rng() * 100));
    const bar = document.createElement('div');
    bar.className = 'wf-bar';
    bar.style.height = h + '%';
    container.appendChild(bar);
  }
}
generateWaveform('wf1', 42);
generateWaveform('wf2', 77);
generateWaveform('wf3', 13);

/* ═══════════════════════════════════════
   ASSETS TAB SWITCHER
═══════════════════════════════════════ */
function switchTab(name) {
  ['rider','venues','hosp','press'].forEach(t => {
    const tab = document.getElementById('tab-' + t);
    const panel = document.getElementById('panel-' + t);
    const active = (t === name);
    
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active);
    panel.classList.toggle('active', active);
  });
}

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ═══════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════ */
const sections = ['hero','bio','music','gallery','assets','contact'];
const navLinks = {};
sections.forEach(id => { navLinks[id] = document.getElementById('link-' + id); });

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      sections.forEach(id => navLinks[id] && navLinks[id].classList.remove('active'));
      const key = e.target.id;
      if (navLinks[key]) navLinks[key].classList.add('active');
    }
  });
}, { threshold: 0.3, rootMargin: '-52px 0px 0px 0px' });
sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

/* ═══════════════════════════════════════
   LANGUAGE SWITCHER
   ═══════════════════════════════════════ */
const langButtons = document.querySelectorAll('.lang-btn');
const savedLang = localStorage.getItem('jansound-lang') || 'es';

function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  localStorage.setItem('jansound-lang', lang);
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.getAttribute('data-lang'));
  });
});

// Initialize language
setLanguage(savedLang);

/* ═══════════════════════════════════════
   PREMIUM CUSTOM CURSOR (60 FPS LERP & ELASTIC DISTORTION)
   ═══════════════════════════════════════ */
const arrow = document.querySelector('.custom-cursor-arrow');
const ring = document.querySelector('.custom-cursor-ring');

if (arrow && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let speed = 0;
  let angle = 0;
  let hoverScale = 1;
  let currentHoverScale = 1;

  window.addEventListener('mousemove', (e) => {
    const deltaX = e.clientX - mouseX;
    const deltaY = e.clientY - mouseY;

    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position the arrow tip instantly at mouse coordinates
    arrow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Calculate mouse velocity for distortion
    const currentSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    speed += (currentSpeed - speed) * 0.2; // Smooth out speed spikes

    if (currentSpeed > 0.1) {
      angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    }
  });

  // Smooth animation loop for the outer ring using LERP (Linear Interpolation)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    // Calculate stretch and squeeze factors
    const stretch = Math.min(1 + speed * 0.006, 1.4);
    const squeeze = 1 / stretch;

    // Smooth transition for scale during hover
    currentHoverScale += (hoverScale - currentHoverScale) * 0.15;

    const scaleX = currentHoverScale * stretch;
    const scaleY = currentHoverScale * squeeze;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

    // Speed decay
    speed *= 0.9;

    requestAnimationFrame(animateRing);
  }
  
  // Start loop
  animateRing();

  // Add hover effect listeners on all interactive elements
  const interactives = document.querySelectorAll('a, button, [role="tab"], .track-row, .social-card, .gallery-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      arrow.classList.add('hover');
      ring.classList.add('hover');
      hoverScale = 2; // Expand the ring on hover
    });
    el.addEventListener('mouseleave', () => {
      arrow.classList.remove('hover');
      ring.classList.remove('hover');
      hoverScale = 1;
    });
  });
}
