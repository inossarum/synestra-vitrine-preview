import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const u=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(u)+'\0'+u).digest('hex')};
const js=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
test('R174 invariant approved vitrine, one renderer, same 6 materials and 18 JSON parameters',()=>{
 assert.equal(sha(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<option value="\d"/g)||[]).length,6);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
});
test('R174 per-depth optical shaping rather than additional shell passes',()=>{
 assert.match(js,/uniform float uDepthRefine;/);
 assert.match(js,/float frontLayer=/);
 assert.match(js,/float filamentPeak=/);
 assert.match(js,/float refinedDensity=/);
 assert.match(js,/float refinedRadianceScale=/);
 assert.match(js,/mix\(density,refinedDensity,uDepthRefine\)/);
 assert.match(js,/gl\.uniform1f\(U\.uDepthRefine,depthVariant\)/);
 assert.doesNotMatch(js,/gl\.createFramebuffer|sampler2D uDepth/);
});
test('R174 instant before/after for any family, magnetic A/B preserved and no JSON drift',()=>{
 assert.match(html,/data-depth-compare="prior"/);
 assert.match(html,/data-depth-compare="r174"/);
 assert.match(html,/R174 · RELIEF VOLUMÉTRIQUE/);
 assert.match(js,/stage\.dataset\.depthVariant/);
 assert.match(js,/depthVariant=depthToggle\.dataset\.depthCompare==='r174'\?1:0/);
 assert.match(html,/data-magnetic-compare="r171"/);
 assert.match(html,/data-magnetic-compare="r172"/);
 assert.match(html,/data-liquid-demo/);
});
