import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../assets/siteforge-r116-sphere-only.js',import.meta.url),'utf8');
const fragment=js.slice(js.indexOf('const fragment='),js.indexOf('function compile('));
test('R161: no visible sphere shell slider or shell haze in GPU raymarch',()=>{
 assert.doesNotMatch(html, /<label[^>]*for="sf-shellVisibility"/);
 assert.match(html, /<input[^>]*id="sf-shellVisibility"[^>]*type="hidden"[^>]*data-sphere-control="shellVisibility"[^>]*data-default="0"[^>]*value="0"/);
 assert.doesNotMatch(fragment, /shellFog|rimTint\*rim\*uShape\.y|rim\*\.16\*uShape\.y/);
 assert.match(fragment, /float density=\(currents\*\.43\*emission\+/);
});
test('R161: particles density and luminous sprite size controls hidden but JSON compatible',()=>{
 for(const k of ['particleDensity','particleSize']){
  assert.doesNotMatch(html,new RegExp('<label[^>]*for="sf-'+k+'"'));
  assert.match(html,new RegExp('<input[^>]*id="sf-'+k+'"[^>]*type="hidden"[^>]*data-sphere-control="'+k+'"'));
 }
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
});
test('R161: one WebGL engine, one canvas, five energy families, no altered GPU geometry',()=>{
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<select /g)||[]).length,3);
 assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/);
 for(const x of ['Flux plasma','Rubans magnétiques','Voiles d’aurore','Brume ionique','Jets de fusion'])assert.ok(html.includes('>'+x+'</option>'));
});
