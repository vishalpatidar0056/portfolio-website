// Lightweight per-section 2D canvas accents. Each section gets a themed
// generative backdrop (rendered with plain canvas 2D, not a new WebGL
// context per section) so every "planet" feels distinct without the
// performance cost of many simultaneous Three.js renderers.

function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio, 2);
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);
  return { ctx, resize };
}

function planetBase(ctx, w, h, cx, cy, r, colorA, colorB) {
  const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
  grad.addColorStop(0, colorA);
  grad.addColorStop(1, colorB);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

const SCENE_BUILDERS = {
  home(canvas) {
    const { ctx } = setupCanvas(canvas);
    let t = 0;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4, s: Math.random() * 0.3 + 0.1
    }));
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.006;
      particles.forEach(p => {
        const y = ((p.y + t * p.s) % 1) * h;
        ctx.beginPath();
        ctx.arc(p.x * w, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125,211,252,${0.25 + p.r * 0.15})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  },

  about(canvas) {
    // Earth-like: green/blue planet with rotating cloud bands + aurora glow
    const { ctx } = setupCanvas(canvas);
    let t = 0;
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.82, cy = h * 0.28, r = Math.min(w, h) * 0.22;
      t += 0.003;
      planetBase(ctx, w, h, cx, cy, r, '#3fae7a', '#0d3d2c');
      // cloud bands
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(cx, cy - r * 0.4 + i * r * 0.5, r * 0.9, r * 0.12, t + i, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      // aurora glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.15, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(167,139,250,${0.15 + Math.sin(t * 2) * 0.05})`;
      ctx.lineWidth = 6;
      ctx.stroke();
      requestAnimationFrame(draw);
    }
    draw();
  },

  skills(canvas) {
    // Neural planet: nodes connected by pulsing energy lines
    const { ctx } = setupCanvas(canvas);
    let t = 0;
    let nodes = [];
    function build() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      nodes = Array.from({ length: 14 }, () => ({
        x: Math.random() * w, y: Math.random() * h, phase: Math.random() * Math.PI * 2
      }));
    }
    build();
    window.addEventListener('resize', build);
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.01;
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (j <= i) return;
          const d = Math.hypot(n.x - m.x, n.y - m.y);
          if (d < 220) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(167,139,250,${(1 - d / 220) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      nodes.forEach(n => {
        const pulse = 2 + Math.sin(t + n.phase) * 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(125,211,252,0.6)';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  },

  experience(canvas) {
    // Industrial planet: faint skyline silhouettes + drifting embers
    const { ctx } = setupCanvas(canvas);
    let embers = [];
    function build() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      embers = Array.from({ length: 26 }, () => ({
        x: Math.random() * w, y: h + Math.random() * h, s: Math.random() * 0.6 + 0.2
      }));
    }
    build();
    window.addEventListener('resize', build);
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      // skyline
      ctx.fillStyle = 'rgba(20,22,45,0.5)';
      let x = 0;
      let seed = 1;
      while (x < w) {
        const bw = 30 + (seed * 53 % 40);
        const bh = 40 + (seed * 97 % (h * 0.35));
        ctx.fillRect(x, h - bh, bw, bh);
        x += bw + 6;
        seed++;
      }
      embers.forEach(e => {
        e.y -= e.s;
        if (e.y < 0) e.y = h;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251,191,36,0.5)';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  },

  projects(canvas) {
    // Technology planet: grid horizon + rising data bars
    const { ctx } = setupCanvas(canvas);
    let t = 0;
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.01;
      const horizon = h * 0.75;
      ctx.strokeStyle = 'rgba(125,211,252,0.1)';
      for (let i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(w / 2 + i * 60, horizon);
        ctx.lineTo(w / 2 + i * 260, h);
        ctx.stroke();
      }
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const y = horizon + i * (h - horizon) / 6;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = 'rgba(125,211,252,0.08)';
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    }
    draw();
  },

  websites(canvas) {
    // Moon system: a few orbiting circles
    const { ctx } = setupCanvas(canvas);
    let t = 0;
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.004;
      const cx = w / 2, cy = h / 2;
      [90, 150, 210].forEach((rad, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(160,180,255,0.06)';
        ctx.stroke();
        const angle = t * (1 + i * 0.4);
        const mx = cx + Math.cos(angle) * rad;
        const my = cy + Math.sin(angle) * rad * 0.4;
        ctx.beginPath();
        ctx.arc(mx, my, 5 - i, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(125,211,252,0.5)';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
    draw();
  },

  certificates(canvas) {
    // Crystal planet: faint refracted light shards
    const { ctx } = setupCanvas(canvas);
    let t = 0;
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.005;
      for (let i = 0; i < 5; i++) {
        const angle = t + i * 1.3;
        const cx = w * 0.5 + Math.cos(angle) * w * 0.3;
        const cy = h * 0.5 + Math.sin(angle * 0.7) * h * 0.2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx + 12, cy);
        ctx.lineTo(cx, cy + 20);
        ctx.lineTo(cx - 12, cy);
        ctx.closePath();
        ctx.fillStyle = `rgba(167,139,250,${0.06 + i * 0.01})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  },

  contact(canvas) {
    // Docking station: slow radar sweep
    const { ctx } = setupCanvas(canvas);
    let t = 0;
    function draw() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.012;
      const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.32;
      [1, 0.66, 0.33].forEach(f => {
        ctx.beginPath();
        ctx.arc(cx, cy, r * f, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(125,211,252,0.08)';
        ctx.stroke();
      });
      const grad = ctx.createConicGradient ? ctx.createConicGradient(t, cx, cy) : null;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, t, t + 0.5);
      ctx.closePath();
      ctx.fillStyle = 'rgba(125,211,252,0.06)';
      ctx.fill();
      ctx.restore();
      requestAnimationFrame(draw);
    }
    draw();
  }
};

export function initScenes() {
  document.querySelectorAll('.scene-canvas').forEach(canvas => {
    const key = canvas.dataset.scene;
    if (SCENE_BUILDERS[key]) SCENE_BUILDERS[key](canvas);
  });
}
