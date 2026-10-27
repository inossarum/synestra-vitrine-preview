import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../assets/siteforge-r116-sphere-only.js',import.meta.url),'utf8');

test('R160: only pure plasma is offered; no redundant visual style picker',()=>{
 assert.doesNotMatch(html,/<label[^>]*for="sf-particlePreset"/);
 assert.doesNotMatch(html,/<select[^>]*id="sf-particlePreset"/);
 for(const label of ['Plasma originel','Plasma électrique','Vortex ionique','Fusion du noyau']){
  assert.doesNotMatch(html,new RegExp('<option[^>]*>'+label+'</option>'));
 }
 assert.match(html,/Flux pur, sans surcouche de particules/);
});

test('R160: legacy preset value 4 stays in the 18-field JSON and reset defaults',()=>{
 assert.match(html,/<input[^>]*id="sf-particlePreset"[^>]*type="hidden"[^>]*data-sphere-control="particlePreset"[^>]*data-default="4"[^>]*value="4"/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(js,/const extra=preset!==4&&/);
 assert.match(js,/for\(const \[key,input\] of Object\.entries\(controls\)\)input\.value=defaults\[key\]/);
});

test('R160: energy materials remain selectable and electric overlay stays absent in pure mode',()=>{
 assert.equal((html.match(/<select /g)||[]).length,1);
 for(const material of ['Flux plasma','Rubans magnétiques','Voiles d’aurore','Brume ionique','Jets de fusion']){
  assert.ok(html.includes('>'+material+'</option>'),material);
 }
 assert.match(js,/const electricalMode=sel\('flowType'\)===0&&preset===1/);
 assert.match(html,/data-electric-options hidden/);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<script src=/g)||[]).length,1);
});

test('R160: stage geometry, core and palette are untouched',()=>{
 for(const key of ['coreLight','coreSize','flowType','flowStructure','shellVisibility','particleIntensity','primary','secondary','core','rim']){
  assert.match(html,new RegExp('data-sphere-control="'+key+'"'));
 }
 assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/);
 assert.match(js,/float nucleusRadius=max\(/);
});
