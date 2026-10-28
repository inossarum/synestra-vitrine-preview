import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('assets/siteforge-lab-r166-flow.js');
const html=read('siteforge/core-3d-lab/index.html');
test('R176 public preview: pointer disturbance reaches actual volume',()=>{
 assert.match(js,/vec2 waveWarp=\(radial\*cos\(ripplePhase\)/);
 assert.match(js,/q\.xy\+=waveWarp/);
 assert.match(js,/vec3 undisturbedQ=q;/);
 assert.match(js,/pointerForce\*=Math\.exp\(-3\.6\*frameStep\)/);
});
test('R176 public preview: full interactive lab, no new exported fields',()=>{
 assert.match(html,/data-mote-toggle/);
 assert.match(html,/data-export-json/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.match(html,/\.\.\/\.\.\/assets\/siteforge-lab-r166-flow\.js/);
});
test('R176 public preview: no external data or second worker',()=>{
 assert.doesNotMatch(js,/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.doesNotMatch(html,/<iframe\b|<form\b[^>]*\baction=/i);
 assert.match(html,/<form class="lab-controls"/); // Local settings form; no remote submission
});
