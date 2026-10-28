import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../vitrine-r169-studio-palette-preview.html',import.meta.url),'utf8');
const engine=readFileSync(new URL('../assets/siteforge-lab-r182-vitrine.js',import.meta.url),'utf8');

test('R185 uses real SiteForge R182 engine, not the legacy R157 renderer',()=>{
 assert.match(html,/src="\.\/assets\/siteforge-lab-r182-vitrine\.js" defer/);
 assert.doesNotMatch(html,/<script[^>]*src="\.\/assets\/siteforge-r116-sphere-only\.js"/);
 assert.match(engine,/uSpinPhase/);
 assert.match(engine,/uMoteFinish/);
 assert.match(engine,/stage\.dataset\.mobileQuality/);
 assert.match(engine,/stage\.dataset\.moteSpinPhase/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
 assert.equal((html.match(/<script\b/g)||[]).length,1);
});

test('R185 carries all 18 plasma controls and 10 microfacet controls',()=>{
 assert.equal((html.match(/data-sphere-control="/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control="/g)||[]).length,10);
 assert.match(html,/data-lab-engine="R182"/);
 assert.match(html,/data-sphere-control="diameter" data-default="100" value="100"/);
 assert.match(html,/data-mote-control="moteCount" data-default="0" value="0"/);
 assert.match(html,/tabindex="0" role="group" data-lab-engine="R182"/);
});

test('R185 floor receives violet-cyan light without scanning effects or network dependencies',()=>{
 assert.match(html,/class="r185-floor-plane" aria-hidden="true"/);
 assert.match(html,/radial-gradient\(ellipse 29% 21% at 50% 64%/);
 assert.match(html,/@keyframes r185-floor-glow/);
 assert.match(html,/@media\(prefers-reduced-motion:reduce\)\{[^}]*r185-floor-plane::before\{animation:none!important/);
 assert.doesNotMatch(html,/r173-beam-one|r173-scan-travel|r173-card-shimmer/);
 assert.doesNotMatch(engine,/\bfetch\s*\(|XMLHttpRequest\s*\(/);
});

test('R186 uploaded preset 18: all original parameters retained except official six colors',()=>{
 const preset=JSON.parse(readFileSync(new URL('../assets/synestra-studio-plasma-preset-18.json',import.meta.url),'utf8'));
 assert.equal(preset.schema,'synestra.siteforge.plasma-settings.v1');
 assert.equal(preset.engine,'siteforge-plasma-webgl1');
 assert.equal(Object.keys(preset.parameters).length,18);
 assert.equal(Object.keys(preset.motes).length,11);
 assert.equal(preset.motes.enabled,false);
 assert.deepEqual(
  [preset.parameters.primary,preset.parameters.secondary,preset.parameters.core,preset.parameters.rim,preset.motes.motePrimary,preset.motes.moteSecondary],
  ['#060b12','#8a58ec','#e9f0f7','#20dba9','#00c4f1','#8a58ec']
 );
 assert.deepEqual(
  [preset.parameters.flowType,preset.parameters.particlePreset,preset.parameters.particleIntensity,preset.parameters.coreLight,preset.parameters.arcIntensity,preset.parameters.arcDensity,preset.parameters.flowStructure,preset.parameters.diameter,preset.parameters.shellVisibility,preset.parameters.coreSize,preset.parameters.particleDensity,preset.parameters.particleSpeed,preset.parameters.particleSize,preset.parameters.opacity],
  [0,4,200,117,140,100,200,100,0,157,100,145,100,0]
 );
 assert.deepEqual(
  [preset.motes.moteShape,preset.motes.moteCount,preset.motes.moteDistance,preset.motes.moteSpread,preset.motes.moteSize,preset.motes.moteBrightness,preset.motes.moteRoughness,preset.motes.moteReflectivity],
  [0,0,0,0,106,200,100,200]
 );
 for(const [name,value] of Object.entries(preset.parameters)){
  const literal='data-sphere-control="'+name+'" data-default="'+String(value)+'" value="'+String(value)+'"';
  assert.ok(html.includes(literal),name);
 }
 for(const [name,value] of Object.entries(preset.motes)){
  if(name==='enabled')continue;
  const literal='data-mote-control="'+name+'" data-default="'+String(value)+'" value="'+String(value)+'"';
  assert.ok(html.includes(literal),name);
 }
 assert.match(html,/data-motes-enabled="false"/);
 assert.match(engine,/let motesEnabled=stage\.dataset\.motesEnabled!=='false'/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
});
