import { content } from './content.js';

export const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

// Section registry — order here drives the HUD nav and the journey.
// Add a new planet by adding one entry; no HTML edits required.
export const SECTIONS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'websites', label: 'WEB APPS' },
  { id: 'certificates', label: 'CERTIFICATES' },
  { id: 'contact', label: 'CONTACT' }
];

const imgOrFallback = (src, alt, fallbackText) => src
  ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy">`
  : `<span class="fallback">${escapeHtml(fallbackText)}</span>`;

export function renderHero() {
  const el = document.getElementById('heroContent');
  if (!el) return;
  const p = content.profile;
  el.innerHTML = `
    <div class="hero-copy">
      <span class="hero-eyebrow">DATA ANALYTICS · GENAI · BUILDER</span>
      <h1>${escapeHtml(p.name)}</h1>
      <p class="hero-tagline">${escapeHtml(p.tagline)}</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#contact" data-hover>Get in touch</a>
        <a class="btn btn-secondary" href="#projects" data-hover>View my work</a>
      </div>
      <div class="hero-meta">
        <span class="hero-chip">📍 ${escapeHtml(p.location)}</span>
        <a class="hero-chip" href="mailto:${escapeHtml(p.email)}" data-hover>✉ ${escapeHtml(p.email)}</a>
        <a class="hero-chip" href="tel:${escapeHtml(p.phone)}" data-hover>☎ ${escapeHtml(p.phone)}</a>
      </div>
    </div>
    <div class="hero-badge">
      <div class="hero-badge-ring"></div>
      <div class="hero-badge-ring r2"></div>
      <div class="hero-badge-photo">
        ${imgOrFallback(p.photo, p.name, p.name.split(' ').map(w => w[0]).join(''))}
      </div>
    </div>
  `;
}

export function renderAbout() {
  const el = document.getElementById('aboutContent');
  if (!el) return;
  const e = content.education;
  el.innerHTML = `
    <span class="section-tag">01 · TERRA</span>
    <h2 class="section-title">About <span class="accent">&amp; Education</span></h2>
    <div class="about-grid">
      <div class="glass-card about-bio">
        <p>${escapeHtml(content.profile.bio)}</p>
      </div>
      <div class="glass-card edu-list">
        <h3>Education</h3>
        <dl>
          <div><dt>Degree</dt><dd>${escapeHtml(e.degree)}</dd></div>
          <div><dt>Institution</dt><dd>${escapeHtml(e.institution)}</dd></div>
          <div><dt>Based in</dt><dd>${escapeHtml(e.location)}</dd></div>
          <div><dt>Classes</dt><dd>${e.classes.map(escapeHtml).join('<br>')}</dd></div>
          <div><dt>Schools</dt><dd>${e.schools.map(escapeHtml).join('<br>')}</dd></div>
        </dl>
      </div>
    </div>
  `;
}

export function renderSkills() {
  const el = document.getElementById('skillsContent');
  if (!el) return;
  const clusters = Object.entries(content.skills).map(([category, items]) => `
    <div class="glass-card skill-cluster">
      <h3>${escapeHtml(category)}</h3>
      <div class="skill-tags">
        ${items.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
      </div>
    </div>
  `).join('');
  el.innerHTML = `
    <span class="section-tag">02 · NEURAL PLANET</span>
    <h2 class="section-title">Skills <span class="accent">&amp; Tools</span></h2>
    <div class="skills-orbit-wrap">${clusters}</div>
  `;
}

export function renderExperience() {
  const el = document.getElementById('experienceContent');
  if (!el) return;
  const stations = content.experience.map(exp => `
    <div class="station">
      <div class="glass-card">
        <div class="station-meta">
          <span class="station-org">${escapeHtml(exp.organization)}</span>
          <span class="station-date">${escapeHtml(exp.date)}</span>
        </div>
        <h3>${escapeHtml(exp.role)}</h3>
        <p class="station-program">${escapeHtml(exp.program)}</p>
        <ul>${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
      </div>
    </div>
  `).join('');
  el.innerHTML = `
    <span class="section-tag">03 · INDUSTRIAL PLANET</span>
    <h2 class="section-title">Experience <span class="accent">Railway</span></h2>
    <div class="railway">${stations}</div>
  `;
}

export function renderProjects() {
  const el = document.getElementById('projectsContent');
  if (!el) return;
  const cards = content.projects.map(p => `
    <article class="glass-card project-panel">
      <div class="project-visual">${imgOrFallback(p.image, p.title, 'PREVIEW')}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <ul>${p.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
    </article>
  `).join('');
  el.innerHTML = `
    <span class="section-tag">04 · TECHNOLOGY PLANET</span>
    <h2 class="section-title">Featured <span class="accent">Projects</span></h2>
    <div class="project-grid">${cards}</div>
  `;
}

export function renderWebsites() {
  const el = document.getElementById('websitesContent');
  if (!el) return;
  const cards = content.websites.map(w => `
    <article class="glass-card moon-card">
      <div class="moon-visual">${imgOrFallback(w.image, w.title, 'PREVIEW')}</div>
      <h3>${escapeHtml(w.title)}</h3>
      <p>${escapeHtml(w.description)}</p>
      ${w.technologies?.length ? `<div class="moon-tech">${w.technologies.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>` : ''}
      <a class="moon-link" href="${escapeHtml(w.url)}" target="_blank" rel="noreferrer" data-hover>Visit site ↗</a>
    </article>
  `).join('');
  el.innerHTML = `
    <span class="section-tag">05 · MOON SYSTEM</span>
    <h2 class="section-title">Web <span class="accent">Applications</span></h2>
    <div class="moon-grid">${cards}</div>
  `;
}

export function renderCertificates() {
  const el = document.getElementById('certificatesContent');
  if (!el) return;
  const cards = content.certificates.map(c => `
    <article class="glass-card crystal-card">
      <div class="crystal-visual">${imgOrFallback(c.image, c.name, '◆')}</div>
      <h3>${escapeHtml(c.name)}</h3>
      <span class="issuer">${escapeHtml(c.issuer)}</span>
      ${c.verifyUrl ? `<a class="crystal-verify" href="${escapeHtml(c.verifyUrl)}" target="_blank" rel="noreferrer" data-hover>Verify credential ↗</a>` : ''}
    </article>
  `).join('');
  el.innerHTML = `
    <span class="section-tag">06 · CRYSTAL PLANET</span>
    <h2 class="section-title">Certificates <span class="accent">&amp; Credentials</span></h2>
    <div class="crystal-grid">${cards}</div>
  `;
}

export function renderContact() {
  const el = document.getElementById('contactContent');
  if (!el) return;
  const p = content.profile;
  el.innerHTML = `
    <span class="section-tag">07 · DOCKING STATION</span>
    <h2 class="section-title">Let's <span class="accent">talk</span> data</h2>
    <div class="glass-card contact-panel">
      <p>Open to conversations about analytics, GenAI, research-driven reporting, and the kind of work that rewards careful reading.</p>
      <div class="contact-links">
        <a href="mailto:${escapeHtml(p.email)}" data-hover>${escapeHtml(p.email)}</a>
        <a href="tel:${escapeHtml(p.phone)}" data-hover>${escapeHtml(p.phone)}</a>
      </div>
      <div class="social-row">
        <a href="${escapeHtml(p.linkedin)}" target="_blank" rel="noreferrer" data-hover>LinkedIn</a>
        <a href="${escapeHtml(p.github)}" target="_blank" rel="noreferrer" data-hover>GitHub</a>
        <a href="${escapeHtml(p.instagram)}" target="_blank" rel="noreferrer" data-hover>Instagram</a>
      </div>
    </div>
  `;
}

export function renderHudNav() {
  const nav = document.getElementById('hudNav');
  if (!nav) return;
  nav.innerHTML = SECTIONS.map(s => `<a href="#${s.id}" data-nav="${s.id}">${s.label}</a>`).join('');
}

export function renderAll() {
  renderHudNav();
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderWebsites();
  renderCertificates();
  renderContact();

  const brand = document.getElementById('hudBrand');
  if (brand) brand.textContent = content.profile.name.split(' ').map(w => w[0]).join('.').toUpperCase() + '.';
  document.title = `${content.profile.name} — Mission Log`;
  const footYear = document.getElementById('footYear');
  if (footYear) footYear.textContent = new Date().getFullYear();
}
