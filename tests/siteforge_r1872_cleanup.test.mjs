import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const base=readFileSync(new URL('../siteforge-r1871-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const curr=readFileSync(new URL('../siteforge-r1872-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const script=s=>{const m=s.match(/<script>([\s\S]*?)<\/script>/); assert.ok(m);return m[1]};
const oldScript=script(base),newScript=script(curr);
const start='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){', end=' if(uPass>3.5&&uPass<4.5){';
const segment=s=>{const a=s.indexOf(start),b=s.indexOf(end,a+start.length);assert.ok(a>=0&&b>a);return {a,b,body:s.slice(a,b)}};
const old=segment(oldScript),next=segment(newScript);
test('strict CSP hash pinned to inline script, no unsafe-inline',()=>{
 const m=curr.match(/script-src 'sha256-([^']+)'/);assert.ok(m);
 assert.equal(m[1],createHash('sha256').update(newScript).digest('base64'));
 assert.ok(!curr.includes("script-src 'unsafe-inline'"));
});
test('all six historical material shader paths and JS unchanged',()=>{
 const energyLine="  if(launchDemo==='energy'){controls.flowType.value='6';sync();schedule();}";
 assert.equal(newScript.slice(0,next.a).replace(energyLine+String.fromCharCode(10),''),oldScript.slice(0,old.a));
 assert.equal(newScript.slice(next.b),oldScript.slice(old.b));
 assert.ok(newScript.includes("if(launchDemo==='energy')"));
 assert.ok(next.body.includes('widthNeon=clamp(uFlow.y,.55,1.75)'));
});
test('preserve complete scene/mote controls and 7 material variants',()=>{
 const scene=s=>[...s.matchAll(/<(?:input|select)[^>]*data-sphere-control="([^"]+)"/g)].map(x=>x[1]).sort();
 const motes=s=>[...s.matchAll(/<(?:input|select)[^>]*data-mote-control="([^"]+)"/g)].map(x=>x[1]).sort();
 assert.deepEqual(scene(curr),scene(base));assert.deepEqual(motes(curr),motes(base));
 assert.equal(scene(curr).length,18);assert.equal(motes(curr).length,10);
 const sel=curr.match(/<select id="sf-flowType"[\s\S]*?<\/select>/)?.[0];assert.ok(sel);
 assert.deepEqual([...sel.matchAll(/<option value="(\d+)"/g)].map(x=>x[1]),['0','1','2','3','4','5','6']);
 assert.ok(curr.includes('data-export-json')&&curr.includes('data-import-json'));
});
test('obsolete visual comparisons gone; useful recipe controls collapsed, not destroyed',()=>{
 const markup=curr.slice(0,curr.indexOf('<script>'));
 assert.ok(!markup.includes('data-depth-comparison'));
 assert.ok(!markup.includes('data-magnetic-compare-group'));
 assert.ok(!markup.includes('data-magnetic-demo'));
 assert.ok(!markup.includes('data-liquid-demo'));
 assert.ok(curr.includes('<details class="lab-optional" data-lab-optional>'));
 assert.ok(curr.includes('data-art-preset="pure"'));
 assert.ok(curr.includes('data-mote-toggle'));
 assert.ok(curr.indexOf('data-lab-optional')<curr.indexOf('data-mote-toggle'));
 assert.ok(curr.includes('Matériau énergétique'));
});
test('no external network dependencies added',()=>{
 assert.equal((curr.match(/<script>/g)||[]).length,1);
 assert.equal((curr.match(/<script src=/g)||[]).length,0);
 assert.ok(curr.includes('default-src \'none\''));
});
