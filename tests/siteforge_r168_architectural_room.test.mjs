import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const u=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(u)+'\0'+u).digest('hex')};
const base=read('index.html');
test('R168 immutable approved home and its renderer',()=>{
 assert.equal(sha(base),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
});
test('R168 dedicated futurist room structure with physical wall ceiling floor and controlled lighting',()=>{
 const html=read('vitrine-r168-chamber-preview.html');
 const css=read('assets/vitrine-r168-chamber-preview.css');
 assert.match(html,/class="syn-r168-room"/);
 for(const key of ['syn-r168-ceiling','syn-r168-far-wall','syn-r168-left-wall','syn-r168-right-wall','syn-r168-floor','syn-r168-portal','syn-r168-wall-lights'])assert.match(html,new RegExp('class="'+key+'"'));
 assert.match(css,/\.syn-r168-room\{/);
 assert.match(html,/#53318d/i);
 assert.match(html,/#69dcb4/i);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.doesNotMatch(css,/animation:\s*(?!none\b)[a-z-]+/);
});
test('R168 retains exactly one WebGL canvas, 18 controls, prior radius and product links',()=>{
 const html=read('vitrine-r168-chamber-preview.html');
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(html,/siteforge-r116-sphere-only\.js/);
 assert.match(html,/scale\(\.49\)!important/);
 assert.match(html,/Créer/);
 assert.match(html,/Relier/);
 assert.match(html,/Agir/);
 assert.equal((html.match(/class="syn-r168-room"/g)||[]).length,1);
});
