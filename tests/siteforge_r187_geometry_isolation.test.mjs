import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const js=readFileSync(new URL('../assets/siteforge-lab-r166-flow.js',import.meta.url),'utf8');
const old=execFileSync('git',['show','HEAD:assets/siteforge-lab-r166-flow.js'],{encoding:'utf8'});
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const oldHtml=execFileSync('git',['show','HEAD:siteforge/core-3d-lab/index.html'],{encoding:'utf8'});
test('R187 original materials remain byte-identical',()=>{
 const a='// True 3D ray integration.',b='function compile(type,src)';
 assert.equal(js.slice(js.indexOf(a),js.indexOf(b)),old.slice(old.indexOf(a),old.indexOf(b)));
});
test('R187 existing material settings and artistic recipes unchanged',()=>{
 for(let i=0;i<6;i++){
  const opt=oldHtml.match(new RegExp('<option value="'+i+'">[^<]*</option>'))?.[0];
  assert.ok(opt&&html.includes(opt));
 }
 assert.match(html,/data-sphere-control="flowType" data-default="0"/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 assert.equal((html.match(/data-art-preset=/g)||[]).length,3);
});
test('R187 new 3D ribbons use same WebGL program exclusively for flowType=6',()=>{
 assert.match(js,/if\(sel\('flowType'\)===6&&ribbonBuffer&&ribbonCount>0\)/);
 assert.match(js,/if\(uPass>5\.5&&uPass<6\.5\)/);
 assert.match(js,/ribbonPoint\(family,lane,t\)/);
 assert.match(js,/stage\.dataset\.ribbonVertices=String\(ribbonCount\)/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
test('R187 shared spin, shader mask and JSON v1 remain',()=>{
 assert.match(js,/const spinPhase=elapsed\*\.104/);
 assert.match(js,/stage\.dataset\.moteSpinPhase=spinPhase\.toFixed\(4\)/);
 assert.match(js,/gl_FragColor=vec4\(lightCol\*alpha,alpha\)/);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
});
