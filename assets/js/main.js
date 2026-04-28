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
