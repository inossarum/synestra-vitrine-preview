import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const v=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0'+v).digest('hex');};
const lab=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
test('R172.1 preserve approved vitrine and 18 exportable control ABI',()=>{
 assert.equal(sha(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((lab.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.match(lab,/schema:'synestra.siteforge.plasma-settings.v1'/);
});
test('R172.1 substantial braided volume contrast versus exact R171 magnetic baseline',()=>{
 assert.match(lab,/float r171Currents=fieldLoop\*\(\.40\+\.68\*layering\);/);
 for(const n of ['float ridgeA=','float ridgeB=','float braidTrace=','float volumetricContrast=','float r172Currents=','mix(r171Currents,r172Currents,uCompare)'])assert.ok(lab.includes(n),n);
 assert.match(lab,/uniform float uCompare;/);
 assert.match(lab,/gl\.uniform1f\(U\.uCompare,compareVariant\);/);
});
test('R172.1 immediately accessible comparison and reproducible magnetic demo',()=>{
 assert.match(html,/R172\.1 · COMPARER/);
 assert.match(html,/data-magnetic-compare="r171"/);
 assert.match(html,/data-magnetic-compare="r172"/);
 assert.match(html,/data-magnetic-demo/);
 assert.match(lab,/demo=magnetic/);
 assert.match(lab,/compareVariant=1/);
 assert.match(lab,/toggle\.dataset\.magneticCompare==='r172'\?1:0/);
 assert.match(lab,/compareVariant=1/);
 assert.match(lab,/aria-pressed/);
});
