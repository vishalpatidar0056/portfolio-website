import * as THREE from 'three';

// Persistent deep-space background that lives behind the entire page.
// Cheap by design: point clouds + a couple of soft nebula sprites,
// no post-processing, so it stays smooth even on modest laptops.
export function initUniverse(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.z = 60;

  // ---- Starfield (three depth layers for parallax) ----
  const starLayers = [];
  function makeStars(count, spread, size, color, opacity) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * spread;
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color, size, sizeAttenuation: true, transparent: true, opacity, depthWrite: false });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    starLayers.push(points);
    return points;
  }
  makeStars(1400, 1800, 1.1, 0xffffff, 0.85);
  makeStars(900, 1200, 1.6, 0x9fd8ff, 0.6);
  makeStars(500, 700, 2.2, 0xffe9a8, 0.5);

  // ---- Soft nebula sprites ----
  function makeNebulaTexture(hue1, hue2) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, hue1);
    grad.addColorStop(0.5, hue2);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }
  const nebulaGroup = new THREE.Group();
  const nebulaConfigs = [
    { tex: makeNebulaTexture('rgba(125,211,252,0.35)', 'rgba(125,211,252,0.05)'), pos: [-160, 40, -400], scale: 500 },
    { tex: makeNebulaTexture('rgba(167,139,250,0.3)', 'rgba(167,139,250,0.04)'), pos: [220, -60, -600], scale: 620 },
    { tex: makeNebulaTexture('rgba(251,191,36,0.18)', 'rgba(251,191,36,0.02)'), pos: [0, 120, -800], scale: 700 }
  ];
  nebulaConfigs.forEach(cfg => {
    const mat = new THREE.SpriteMaterial({ map: cfg.tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const sprite = new THREE.Sprite(mat);
    sprite.position.set(...cfg.pos);
    sprite.scale.set(cfg.scale, cfg.scale, 1);
    nebulaGroup.add(sprite);
  });
  scene.add(nebulaGroup);

  // ---- Occasional shooting star ----
  let shootingStar = null;
  function spawnShootingStar() {
    if (shootingStar) return;
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(-14,-4,0)]);
    const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
    const line = new THREE.Line(geo, mat);
    line.position.set((Math.random()-0.5)*300, 80 + Math.random()*60, -200 - Math.random()*200);
    line.rotation.z = -0.5 + Math.random() * -0.3;
    scene.add(line);
    shootingStar = { line, t: 0, mat };
  }
  setInterval(() => { if (Math.random() < 0.6) spawnShootingStar(); }, 4000);

  // ---- Mouse parallax + scroll drift ----
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let scrollProgress = 0;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? window.scrollY / max : 0;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onResize);

  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();

    starLayers.forEach((layer, i) => {
      layer.rotation.y = t * 0.004 * (i + 1);
    });
    nebulaGroup.rotation.z = t * 0.01;

    camera.position.x += (mouse.x * 6 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 4 - camera.position.y) * 0.02;
    camera.position.z = 60 - scrollProgress * 40;
    camera.lookAt(0, 0, -100);

    if (shootingStar) {
      shootingStar.t += 0.02;
      shootingStar.line.position.x += 5;
      shootingStar.line.position.y -= 1.6;
      shootingStar.mat.opacity = Math.max(0, 1 - shootingStar.t);
      if (shootingStar.t >= 1) {
        scene.remove(shootingStar.line);
        shootingStar = null;
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  return { scene, camera, renderer };
}
