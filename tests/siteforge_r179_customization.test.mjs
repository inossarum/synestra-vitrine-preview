import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const js=readFileSync(new URL('../assets/siteforge-lab-r166-flow.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const required=['moteCount','moteDistance','moteSpread','moteSize','moteBrightness','motePrimary','moteSecondary'];
test('R179 seven independent interactive controls, preserving exactly 18 plasma fields',()=>{
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 for(const key of required)assert.match(html,new RegExp('data-mote-control="'+key+'"'));
 assert.match(html,/data-mote-linked-speed/);
 assert.match(js,/e\.target\?\.hasAttribute\('data-mote-control'\)/);
});
test('R179 count: explicit 0 disables points, mobile and desktop bounded',()=>{
 assert.match(js,/Math\.min\(mobile\?96:160/);
 assert.match(js,/if\(motesEnabled&&moteCount>0\)/);
 assert.match(js,/Math\.round\(moteVal\('moteCount'\)\*\(mobile\?28\/46:1\)\)/);
 assert.match(js,/gl\.drawArrays\(gl\.POINTS,0,moteCount\)/);
});
test('R179 spacing, spread, apparent size and brightness reach actual WebGL uniforms',()=>{
 for(const name of ['moteDistance','moteSpread','moteSize','moteBrightness'])assert.match(js,new RegExp("moteVal\\('"+name+"'\\)"));
 assert.match(js,/float moteRadius=radius\*\(uMoteStyle\.x\+uMoteStyle\.y\*rnd/);
 assert.match(js,/uMoteStyle\.z\*uResolution\.y/);
 assert.match(js,/uPointer\.w\*uMoteStyle\.w/);
 assert.match(js,/gl\.uniform4f\(U\.uMoteStyle/);
});
test('R179 dual independent colors bound to GPU without affecting plasma palette',()=>{
 for(const name of ['motePrimary','moteSecondary'])assert.match(js,new RegExp("moteRGB\\('"+name+"'\\)"));
 assert.match(js,/uniform vec3 uMotePrimary,uMoteSecondary;/);
 assert.match(js,/vec3 col=mix\(uMotePrimary,uMoteSecondary/);
 assert.match(js,/for\(const \[uniform,k\] of \[\['uCore','core'\]/);
});
test('R179 JSON compatibility: schema v1 retained, 18 material parameters unchanged, optional motes object',()=>{
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(js,/version:1,/);
 assert.match(js,/parameters,\s*motes/);
 assert.match(js,/motes\.enabled=motesEnabled/);
 assert.match(js,/const motes=Object\.fromEntries\(Object\.entries\(moteControls\)/);
 assert.match(js,/for\(const \[key,input\] of Object\.entries\(moteControls\)\)input\.value=moteDefaults\[key\]/);
});
test('R179 shared phase and speed: no independent particle rotational speed control',()=>{
 assert.match(js,/const spinPhase=elapsed\*\.104/);
 assert.match(js,/stage\.dataset\.moteSpinPhase=spinPhase\.toFixed\(4\)/);
 assert.match(js,/stage\.dataset\.moteSpinLinkedSpeed=\(controls\.particleSpeed\?\.value\|\|'100'\)/);
 assert.match(js,/float spinCos=cos\(uSpinPhase\),spinSin=sin\(uSpinPhase\)/);
 assert.ok(!html.includes('data-mote-control="moteSpeed"'));
 assert.match(js,/if\(last\)elapsed\+=Math\.min\(\(now-last\)\/1000,\.15\)\*Math\.max\(0,num\('particleSpeed'\)\)/);
});
