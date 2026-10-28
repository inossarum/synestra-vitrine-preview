import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const old=readFileSync(new URL('../siteforge-r1874-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const next=readFileSync(new URL('../siteforge-r1875-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const head='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){';
const tail=' if(uPass>3.5&&uPass<4.5){';
function section(s){const a=s.indexOf(head),b=s.indexOf(tail,a+head.length);assert.ok(a>=0&&b>a);return {a,b,text:s.slice(a,b)}}
const original=section(old),current=section(next);
const hash=s=>{const h=s.match(/script-src 'sha256-([^']+)'/);assert.ok(h);return h[1]};
test('Exact CSP SHA256, no unsafe-inline',()=>{
 const m=next.match(/<script>([\s\S]*?)<\/script>/);assert.ok(m);
 assert.equal(hash(next),createHash('sha256').update(m[1]).digest('base64'));
 assert.equal(next.includes("script-src 'unsafe-inline'"),false);
});
test('Five independent zero-radius energy lines, not cylinder material',()=>{
 for(const family of 'ABCDE'){
  assert.ok(current.text.includes('float d'+family+'=length('));
  assert.ok(current.text.includes(family.toLowerCase()+'Core=exp(-pow(d'+family+'*'));
  assert.ok(current.text.includes(family.toLowerCase()+'Halo=exp(-pow(d'+family+'*'));
 }
 assert.ok(!current.text.includes('float cylinderA'));
 assert.ok(!current.text.includes('float bodyA'));
 assert.ok(!current.text.includes('float shellA'));
 assert.ok(!current.text.includes('float specA'));
 assert.ok(current.text.includes('uLabTime'));
 assert.ok(current.text.includes('NO opaque wall')===false); // no opaque surfaces
});
test('Original R187.4 exactly reconstructible; only material6 and labels changed',()=>{
 const restored=(next.slice(0,current.a)+original.text+next.slice(current.b))
 .replace('<title>SiteForge — Laboratoire énergétique 3D R187.5</title>','<title>SiteForge — Laboratoire énergétique 3D R187.4</title>')
 .replace('Filaments sans tubes · R187.5','Cinq flux fins · R187.4')
 .replace('LAB R187.5','LAB R187.4')
 .replace(hash(next),hash(old));
 assert.equal(restored,old);
});
test('Preserve seven materials, JSON state and clean lab',()=>{
 const options=s=>[...s.matchAll(/<option value="([0-6])"/g)].map(m=>m[1]);
 assert.deepEqual(options(next),options(old));
 assert.equal((next.match(/data-sphere-control=/g)||[]).length,(old.match(/data-sphere-control=/g)||[]).length);
 assert.equal((next.match(/data-mote-control=/g)||[]).length,(old.match(/data-mote-control=/g)||[]).length);
 assert.ok(next.includes('data-lab-optional'));
 assert.ok(next.includes('data-export-json')&&next.includes('data-import-json'));
});
test('Animated filaments do not depend on particle speed or global rotation',()=>{
 assert.ok(current.text.includes('float flowTime=uLabTime;'));
 assert.ok(current.text.includes('flowTime*5.3'));
 assert.ok(current.text.includes('gl_FragColor=vec4(outNeon,alphaNeon*edgeNeon*uEffects.w)'));
 assert.ok(!current.text.includes('if(minimum<.011)'));
});
