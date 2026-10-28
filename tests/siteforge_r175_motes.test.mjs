import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const git=s=>{const b=Buffer.from(s.replace(/\r\n/g,'\n'));return createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex')};
const js=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
test('R175 preserve approved vitrine, six materials, A/B and exactly 18 JSON values',()=>{
 assert.equal(git(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(git(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<option value="\d"/g)||[]).length,6);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.match(html,/data-depth-compare="prior"/);
 assert.match(html,/data-magnetic-compare="r171"/);
});
test('R175 one-program 3D motes with screen-space pointer repulsion',()=>{
 assert.match(js,/uniform vec4 uPointer;/);
 assert.match(js,/uPass>4\.5/);
 assert.match(js,/float moteDepth=/);
 assert.match(js,/float moteRadius=/);
 assert.match(js,/float proximity=/);
 assert.match(js,/p\.xy\+=away\/max\(length\(away\)/);
 assert.match(js,/gl\.uniform4f\(U\.uPointer/);
 assert.match(js,/gl\.drawArrays\(gl\.POINTS,0,moteCount\)/);
 assert.match(js,/const moteCount=mobile\?28:46/);
});
test('R175 small user-controlled effect, hover interaction, reduced motion inherited',()=>{
 assert.match(html,/data-mote-toggle/);
 assert.match(html,/R175 · ÉCLATS INTERACTIFS/);
 assert.match(js,/stage\.addEventListener\('pointermove'/);
 assert.match(js,/stage\.dataset\.motesEnabled/);
 assert.match(js,/pointerForce=Math\.max/);
 assert.match(js,/motesEnabled=!motesEnabled/);
 assert.match(js,/if\(reduced\.matches\)/);
});
