import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const js=readFileSync(new URL('../assets/siteforge-lab-r166-flow.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const frag=js.split('const fragment=')[1].split('function compile(')[0];
test('R181 crystal has three planar normals and core-directed 3D lighting',()=>{
 assert.match(frag,/vec2 facetXY=vec2\(along\*cs-across\*sn,along\*sn\+across\*cs\)/);
 assert.match(frag,/vec3 normal=normalize\(vec3\(mix\(-\.72,\.68,faceSide\)/);
 assert.match(frag,/vec3 sourceDir=normalize\(vec3\(-vMoteCenter\*\.95\+\.14,1\.50\)\)/);
 assert.match(frag,/float diffuse=\.30\+\.70\*max\(dot\(normal,sourceDir\),0\.\)/);
 assert.match(frag,/float specular=pow\(max\(reflected\.z,0\.\),mix\(34\.,8\.,roughness\)\)/);
 assert.match(frag,/float bevel=smoothstep\(\.64,\.78,sideCut\)/);
});
test('R181 old silhouettes and exact shared spin preserved',()=>{
 assert.match(frag,/else if\(uMoteShape>1\.5\)/);
 assert.match(frag,/float orb=exp\(-r2\*7\.5\)/);
 assert.match(frag,/float filament=exp\(-across\*across\*23\.0-along\*along\*4\.5\)/);
 assert.match(js,/const spinPhase=elapsed\*\.104/);
 assert.match(js,/stage\.dataset\.moteSpinPhase=spinPhase\.toFixed\(4\)/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
});
test('R181 mobile adjusts volumetric sampling only when fill-rate heavy',()=>{
 assert.match(js,/const mobileDense=mobile&&\(canvas\.width\*canvas\.height>240000\|\|moteCount>75\)/);
 assert.match(js,/const baselineSteps=mobile\?\(mobileDense\?12:14\):22/);
 assert.match(js,/gl\.uniform1f\(U\.uVolumeSteps,volumeSteps\)/);
 assert.match(js,/stage\.dataset\.volumeSteps=String\(volumeSteps\)/);
 assert.match(js,/stage\.dataset\.mobileQuality=qualityMode==='balanced'\?\(mobile\?\(mobileDense\?'adaptive':'balanced'\):'desktop'\):qualityMode/);
});
test('R181 compatibility: all 18 plasma and 8 mote controls unchanged',()=>{
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(js,/version:1,/);
 assert.match(js,/motes\.enabled=motesEnabled/);
 assert.match(html,/data-mote-control="moteShape"/);
});
