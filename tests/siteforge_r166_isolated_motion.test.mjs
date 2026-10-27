import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const homepage=read('index.html');
const labPage=read('siteforge/core-3d-lab/index.html');
const base=read('assets/siteforge-r116-sphere-only.js');
const canonicalHash=s=>{const v=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0'+v).digest('hex');};
test('R166: vitrine homepage and its original renderer remain bit-identical to approved R165',()=>{
 assert.equal(canonicalHash(homepage),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(canonicalHash(base),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.match(homepage,/src="\.\/assets\/siteforge-r116-sphere-only\.js"/);
});
test('R166: 3D lab loads a separate single WebGL renderer and preserves schema',()=>{
 assert.match(labPage,/<script src="\.\.\/\.\.\/assets\/siteforge-lab-r166-flow\.js" defer><\/script>/);
 assert.equal((labPage.match(/<canvas /g)||[]).length,1);
 assert.equal((labPage.match(/<script src=/g)||[]).length,1);
 assert.equal((labPage.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(labPage,/R172 · RUBANS 3D/);
});
test('R166: laboratory current field has depth-specific time advection and pulsing without a second rendering pass',()=>{
 const lab=read('assets/siteforge-lab-r166-flow.js');
 const pure=lab.slice(lab.indexOf('if(uFlow.x<.5){'),lab.indexOf('}else if(uFlow.x<1.5){'));
 for(const field of ['float flowAge=','vec3 drifted=','float internalShear=','float shearEnvelope=','float pulse='])assert.ok(pure.includes(field),field);
 assert.match(pure,/organicLane=angle\*6\./);
 assert.doesNotMatch(pure,/angle\*2\.3|angle\*\(6\.4/);
 assert.match(lab,/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/);
 assert.match(lab,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.equal((lab.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
