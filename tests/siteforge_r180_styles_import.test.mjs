import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('assets/siteforge-lab-r166-flow.js');
const html=read('siteforge/core-3d-lab/index.html');
const frag=js.split('const fragment=')[1].split('function compile(')[0];
test('R180: 3 actual shader styles and 8 independent mote controls, original 18 plasma controls',()=>{
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 for(const n of ['Étincelles','Fragments cristallins','Orbes ioniques'])assert.ok(html.includes(n));
 assert.match(js,/uniform float uMoteShape/);
 assert.match(js,/gl\.uniform1f\(U\.uMoteShape,moteVal\('moteShape'\)\)/);
 assert.match(frag,/if\(uMoteShape>\.5&&uMoteShape<1\.5\)/);
 assert.match(frag,/else if\(uMoteShape>1\.5\)/);
});
test('R180: import is entirely local, bounded and validates before mutations',()=>{
 assert.match(html,/data-import-file accept="\.json,application\/json"/);
 assert.match(html,/data-import-json/);
 assert.match(js,/file\.size>65536/);
 assert.match(js,/const values=validateSettings\(doc\)/);
 const validation=js.indexOf('const values=validateSettings(doc)');
 const mutation=js.indexOf('for(const [k,v] of Object.entries(values.nextPlasma))');
 assert.ok(validation>0&&mutation>validation);
 assert.match(js,/!Number\.isFinite\(v\)/);
 assert.match(js,/\^#\[0-9a-f\]\{6\}\$/);
});
test('R180: legacy v1 plasma JSON supported and R179 mote style defaults to spark',()=>{
 assert.match(js,/doc\.schema!=='synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(js,/doc\.version!==1/);
 assert.match(js,/doc\.motes===undefined\?\{\}:doc\.motes/);
 assert.match(js,/moteDefaults\[k\]/);
 assert.match(js,/motes\.enabled=motesEnabled/);
 assert.match(js,/parameters,\s*motes/);
 assert.match(js,/version:1/);
});
test('R180: rejected unknown/malformed settings cannot partially change controls',()=>{
 assert.match(js,/Object\.keys\(doc\.parameters\)\.length!==pkeys\.length/);
 assert.match(js,/values\.enabled!==undefined&&typeof values\.enabled!=='boolean'/);
 assert.match(js,/Number\.isInteger\(v\)/);
 assert.match(js,/e\.hasAttribute\('min'\)&&v<Number\(e\.min\)/);
 assert.match(js,/e\.hasAttribute\('max'\)&&v>Number\(e\.max\)/);
 assert.match(js,/status\(importStatus,'Import refusé/);
});
test('R180: no additional GPU context and shared spin untouched',()=>{
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.match(js,/const spinPhase=elapsed\*\.104/);
 assert.match(js,/uSpinPhase/);
 assert.match(js,/uMoteCount/);
});
