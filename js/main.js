import { renderAll, SECTIONS } from './render.js';
import { initUniverse } from './universe.js';
import { initScenes } from './scenes.js';

// 1. Render all content-driven sections first so the DOM exists.
renderAll();

// 2. Boot sequence
const boot = document.getElementById('boot');
const skipBoot = document.getElementById('skipBoot');
const bootLines = Array.from(document.querySelectorAll('.boot-line'));
const bootBarFill = document.querySelector('.boot-bar-fill');

function runBoot() {
  bootBarFill.classList.add('run');
  bootLines.forEach((line, i) => {
    setTimeout(() => line.classList.add('active'), i * 800 + 200);
  });
  setTimeout(hideBoot, bootLines.length * 800 + 900);
}

let bootHidden = false;
function hideBoot() {
  if (bootHidden) return;
  bootHidden = true;
  boot.classList.add('hidden');
  document.body.style.overflow = '';
}

document.body.style.overflow = 'hidden';
skipBoot.addEventListener('click', hideBoot);
runBoot();

// 3. Persistent 3D universe background
const bgCanvas = document.getElementById('bgCanvas');
initUniverse(bgCanvas);

// 4. Lightweight per-section canvases
initScenes();

// 5. Custom cursor
const cursor = document.getElementById('cursor');
if (window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, { passive: true });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [data-hover]')) cursor.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, [data-hover]')) cursor.classList.remove('hovering');
  });
}

// 6. Scroll-reveal for each scene's content block
const revealTargets = Array.from(document.querySelectorAll('.scene-content'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealTargets.forEach(t => revealObserver.observe(t));

// 7. HUD active-link scroll-spy + trajectory progress
const navLinks = Array.from(document.querySelectorAll('.hud-nav a'));
const sectionEls = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.dataset.nav === entry.target.id));
    }
  });
}, { threshold: 0.4 });
sectionEls.forEach(el => spyObserver.observe(el));

const progressFill = document.getElementById('hudProgressFill');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressFill.style.width = `${Math.min(100, Math.max(0, pct))}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// 8. Recruiter Mode — same content, calm static presentation
const recruiterToggle = document.getElementById('recruiterToggle');
const RECRUITER_KEY = 'recruiterMode';
function setRecruiterMode(on) {
  document.body.classList.toggle('recruiter-mode', on);
  try { sessionStorage.setItem(RECRUITER_KEY, on ? '1' : '0'); } catch (_) {}
}
recruiterToggle.addEventListener('click', () => {
  setRecruiterMode(!document.body.classList.contains('recruiter-mode'));
});
try {
  if (sessionStorage.getItem(RECRUITER_KEY) === '1') setRecruiterMode(true);
} catch (_) {}
