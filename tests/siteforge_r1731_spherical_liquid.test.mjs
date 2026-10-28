import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const t=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(t)+'\0'+t).digest('hex')};
const js=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
test('R173.1: four or more angular sectors in actual 3D volume instead of single linear sine band',()=>{
 const liquid=js.slice(js.indexOf('// R173.1: spherical'),js.indexOf('float currents=0.;'));
 assert.ok(liquid.length>200,'liquid shader exists');
 assert.match(liquid,/float liquidFlowAngle=angle\*4\./);
 assert.match(liquid,/float liquidMain=/);
 assert.match(liquid,/float liquidCrest=/);
 assert.match(liquid,/float liquidTributary=/);
 assert.match(liquid,/float depthSeparation=/);
 assert.doesNotMatch(liquid,/float liquidPhase=q\.y\*7\.6/);
 assert.match(liquid,/flowCurrents=/);
});
test('R173.1: keep 6 materials, 18 JSON parameters, magnetic A/B and approved site byte-for-byte',()=>{
 assert.equal(sha(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<option value="\d"/g)||[]).length,6);
 assert.match(html,/data-magnetic-compare="r171"/);
 assert.match(html,/data-magnetic-compare="r172"/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.match(html,/R175 · ÉCLATS INTERACTIFS/);
});
