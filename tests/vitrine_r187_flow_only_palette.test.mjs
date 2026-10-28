import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('vitrine-r169-studio-palette-preview.html');
const shader=read('assets/siteforge-lab-r182-vitrine.js');
const preset=JSON.parse(read('assets/synestra-studio-plasma-preset-18.json'));
const extract=(kind,key)=>html.match(new RegExp('data-'+kind+'-control="'+key+'" data-default="([^"]+)" value="([^"]+)"'));
test('R187 preserves all preset geometry and dynamics with one explicitly approved opacity exception',()=>{
 for(const [key,v] of Object.entries(preset.parameters)){
  if(['primary','secondary','core','rim'].includes(key)) continue;
  const m=extract('sphere',key);
  assert.ok(m,'missing sphere parameter: '+key);
  const val=key==='opacity'?100:v;
  assert.equal(m[1],String(val),key+' default');
  assert.equal(m[2],String(val),key+' value');
 }
 for(const [key,v] of Object.entries(preset.motes)){
  if(['motePrimary','moteSecondary','enabled'].includes(key)) continue;
  const m=extract('mote',key);
  assert.ok(m,'missing motes parameter: '+key);
  assert.equal(m[1],String(v),key);
  assert.equal(m[2],String(v),key);
 }
 assert.equal(preset.parameters.opacity,0);
 assert.equal(preset.motes.enabled,false);
 assert.match(html,/data-motes-enabled="false"/);
 assert.match(shader,/let motesEnabled=stage\.dataset\.motesEnabled!=='false'/);
});
test('R187 Studio palette is assigned to flowing filaments, not sphere base material',()=>{
 const fields={primary:preset.parameters.primary,secondary:preset.parameters.secondary,core:preset.parameters.core,rim:preset.parameters.rim,motePrimary:preset.motes.motePrimary,moteSecondary:preset.motes.moteSecondary};
 assert.equal(Object.keys(fields).length,6);
 for(const [key,hex] of Object.entries(fields)){
  assert.ok(html.includes('data-flow-color="'+key+'" value="'+hex+'"'),key+' missing in flow palette');
 }
 assert.equal((html.match(/data-flow-color="/g)||[]).length,6);
 const sphere={primary:'#08142e',secondary:'#53318d',core:'#eaffff',rim:'#8ceafa'};
 for(const [key,hex] of Object.entries(sphere)){
  const m=extract('sphere',key);assert.ok(m,key);
  assert.equal(m[1],hex,'sphere base material should not be recolored');
  assert.equal(m[2],hex,'sphere base material should not be recolored');
 }
 assert.match(shader,/uniform vec3 uFlowDeep,uFlowViolet,uFlowSilver,uFlowGreen,uFlowCyan,uFlowAccent;/);
 assert.match(shader,/vec3 baseVolumeColor=mix\(blue,ion,/);
 assert.match(shader,/float flowIsolation=smoothstep\(\.11,\.65,currents\)/);
 assert.match(shader,/vec3 filamentColor=mix\(baseVolumeColor,flowInk,flowIsolation\)/);
 assert.match(shader,/for\(const \[uniform,k\] of \[\['uCore','core'\],\['uCyan','rim'\],\['uViolet','secondary'\],\['uDeep','primary'\]\]\)/);
 assert.match(shader,/for\(const \[uniform,k\] of \[\['uFlowDeep','primary'\],\['uFlowViolet','secondary'\],\['uFlowSilver','core'\],\['uFlowGreen','rim'\],\['uFlowCyan','motePrimary'\],\['uFlowAccent','moteSecondary'\]\]\)/);
 assert.doesNotMatch(shader,/\bfetch\s*\(|XMLHttpRequest\s*\(/);
 assert.equal((html.match(/<canvas\b/g)||[]).length,1);
});
