import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const before=readFileSync(new URL('../siteforge-r1875-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const after=readFileSync(new URL('../siteforge-r1876-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const head='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){',tail=' if(uPass>3.5&&uPass<4.5){';
const portion=s=>{const a=s.indexOf(head),b=s.indexOf(tail,a+head.length);assert.ok(a>=0&&b>a);return {a,b,body:s.slice(a,b)}};
const old=portion(before),newPart=portion(after);
const hash=s=>{const m=s.match(/script-src 'sha256-([^']+)'/);assert.ok(m);return m[1]};
test('strict CSP hashes exactly the inline JavaScript',()=>{
 const m=after.match(/<script>([\s\S]*?)<\/script>/);assert.ok(m);
 assert.equal(hash(after),createHash('sha256').update(m[1]).digest('base64'));
 assert.ok(!after.includes("script-src 'unsafe-inline'"));
});
test('five centerlines and ten attached counterphase braids remain optically thin',()=>{
 for(const c of 'ABCDE'){
  assert.ok(newPart.body.includes('vec2 cross'+c+'='),'cross '+c);
  assert.ok(newPart.body.includes('vec2 orbit'+c+'='),'orbit '+c);
  assert.ok(newPart.body.includes('float braid'+c+'='),'braid '+c);
  assert.ok(newPart.body.includes('length(cross'+c+'-orbit'+c+')'),'near '+c);
  assert.ok(newPart.body.includes('length(cross'+c+'+orbit'+c+')'),'far '+c);
 }
 assert.ok(!newPart.body.includes('float shellA='));
 assert.ok(!newPart.body.includes('float bodyA='));
 assert.ok(!newPart.body.includes('float cylinderA='));
 assert.ok(newPart.body.includes('float flowTime=uLabTime;'));
});
test('front/back depth separation, crossings, pulsing nucleus',()=>{
 assert.ok(newPart.body.includes('float front=.29+.80*smoothstep(-.80,.83,q.z)'));
 assert.ok(newPart.body.includes('float crossing='));
 assert.ok(newPart.body.includes('float flash='));
 assert.ok(newPart.body.includes('coreNeon*(.14+.045*sin(flowTime*3.5))'));
});
test('R187.5 reconstructs exactly outside seventh material, labels and CSP',()=>{
 const recovered=(after.slice(0,newPart.a)+old.body+after.slice(newPart.b))
 .replace('<title>SiteForge — Laboratoire énergétique 3D R187.6</title>','<title>SiteForge — Laboratoire énergétique 3D R187.5</title>')
 .replace('Flux tressés vivants · R187.6','Filaments sans tubes · R187.5')
 .replace('LAB R187.6','LAB R187.5')
 .replace(hash(after),hash(before));
 assert.equal(recovered,before);
});
test('all seven materials, 18 scene/10 mote controls and JSON preserved',()=>{
 const options=s=>[...s.matchAll(/<option value="([0-6])"/g)].map(m=>m[1]);
 assert.deepEqual(options(after),options(before));
 assert.equal((after.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((after.match(/data-mote-control=/g)||[]).length,10);
 assert.ok(after.includes('data-lab-optional'));
 assert.ok(after.includes('data-export-json')&&after.includes('data-import-json'));
});
