import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const u=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(u)+'\0'+u).digest('hex')};
test('R169: approved homepage and WebGL engine byte-for-byte unchanged',()=>{
 assert.equal(sha(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
});
test('R169: room has material depth, rear instrumentation, industrial details and photometric layers',()=>{
 const svg=read('assets/vitrine-r169-room.svg');
 for(const tag of ['r169-ceiling-machinery','r169-portal-mechanics','r169-left-equipment','r169-right-equipment','r169-floor-detail','r169-ambient-light','r169-fasteners','r169-rear-console'])assert.match(svg,new RegExp('class="'+tag+'"'),tag);
 assert.match(svg,/feTurbulence/);assert.match(svg,/metal-grain/);
 assert.ok((svg.match(/<linearGradient/g)||[]).length>=12);
 assert.ok((svg.match(/<path /g)||[]).length>=32);
 assert.match(svg,/#69dcb4/i);assert.match(svg,/#53318d/i);
});
test('R169: separate review html keeps one canvas, exact radius and all 18 controls',()=>{
 const h=read('vitrine-r169-chamber-preview.html');
 assert.match(h,/class="syn-r169-room"/);assert.match(h,/src="\.\/assets\/siteforge-r116-sphere-only\.js"/);
 assert.equal((h.match(/<canvas /g)||[]).length,1);
 assert.equal((h.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(h,/scale\(\.49\)!important/);
 assert.match(h,/PROTOTYPE \/ 01/);
 assert.match(h,/SiteForge/);assert.match(h,/Connect/);assert.match(h,/Bridge/);
});
test('R169: no generated texture URLs, no additional animation or billable render pipeline',()=>{
 const css=read('assets/vitrine-r169-chamber.css'),svg=read('assets/vitrine-r169-room.svg');
 assert.doesNotMatch(css,/animation:\s*(?!none\b)[a-z-]+/i);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.doesNotMatch(svg,/<image[^>]+(?:href|xlink:href)=/);
 assert.doesNotMatch(css,/https?:\/\//);
});
