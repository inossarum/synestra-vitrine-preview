/* Synestra R109 — one lightweight WebGL plasma orb.
 * Local only. No remote imports, telemetry, network calls or third-party libs.
 * WebGL failure, lost context and reduced-motion leave the original SVG visible.
 */
(() => {
  'use strict';
  // R111 ambient field: bounded decorative DOM, shared by all public pages.
  // No telemetry, listeners on document activity only, no external dependencies.
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const startAmbient = () => {
    if (motionPreference.matches || document.querySelector('.syn-ambient-field')) return;
    const field = document.createElement('div');
    field.className = 'syn-ambient-field';
    field.setAttribute('aria-hidden', 'true');
    // R114: ambient animation continues without pointer, keyboard, or scroll activity.
    // CSS-only motion on all public pages; paused solely when tab is hidden/reduced-motion.
    const reducedCount = window.innerWidth < 640 ? 22 : 38;
    for (let i = 0; i < reducedCount; i++) {
      const particle = document.createElement('i');
      const comet = i % 11 === 0;
      particle.className = comet ? 'syn-ambient-comet' : i % 7 === 0 ? 'syn-ambient-glint' : 'syn-ambient-particle';
      const seed = Math.random();
      particle.style.setProperty('--px', (3 + Math.random() * 94).toFixed(2) + '%');
      particle.style.setProperty('--py', (4 + Math.random() * 92).toFixed(2) + '%');
      particle.style.setProperty('--size', (i % 7 === 0 ? 2.5 : 1.1 + Math.random() * 1.7).toFixed(2) + 'px');
      particle.style.setProperty('--drift', (14 + Math.random() * 42).toFixed(1) + 'px');
      particle.style.setProperty('--period', (comet ? 17 + Math.random() * 20 : 12 + Math.random() * 23).toFixed(2) + 's');
      particle.style.setProperty('--offset', (-Math.random() * 37).toFixed(2) + 's');
      particle.style.setProperty('--alpha', (.18 + seed * .28).toFixed(2));
      field.appendChild(particle);
    }
    // R115: autonomous ambient events without any additional JS animation loop.
    // Existing tab visibility and reduced-motion controls apply to this aria-hidden layer.
    const wispCount = window.innerWidth < 640 ? 2 : 3;
    for (let i = 0; i < wispCount; i++) {
      const wisp = document.createElement('i');
      wisp.className = 'syn-ambient-wisp';
      wisp.style.setProperty('--px', (12 + Math.random() * 74).toFixed(1) + '%');
      wisp.style.setProperty('--py', (8 + Math.random() * 80).toFixed(1) + '%');
      wisp.style.setProperty('--period', (21 + Math.random() * 18).toFixed(2) + 's');
      wisp.style.setProperty('--offset', (-Math.random() * 30).toFixed(2) + 's');
      field.appendChild(wisp);
    }
    const beaconCount = window.innerWidth < 640 ? 2 : 3;
    for (let i = 0; i < beaconCount; i++) {
      const beacon = document.createElement('i');
      beacon.className = 'syn-ambient-beacon';
      beacon.style.setProperty('--px', (9 + Math.random() * 82).toFixed(1) + '%');
      beacon.style.setProperty('--py', (10 + Math.random() * 79).toFixed(1) + '%');
      beacon.style.setProperty('--period', (11 + Math.random() * 15).toFixed(2) + 's');
      beacon.style.setProperty('--offset', (-Math.random() * 20).toFixed(2) + 's');
      field.appendChild(beacon);
    }
    document.body.insertBefore(field, document.body.firstChild);
  };
  startAmbient();
  const updateAmbient = () => {
    if (motionPreference.matches) {
      document.querySelector('.syn-ambient-field')?.remove();
      return;
    }
    startAmbient();
    document.documentElement.classList.toggle('syn-ambient-paused', document.visibilityState !== 'visible');
  };
  motionPreference.addEventListener('change', updateAmbient);
  document.addEventListener('visibilitychange', updateAmbient);
})();
