import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base=readFileSync(new URL('../siteforge-r1873-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const next=readFileSync(new URL('../siteforge-r1874-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const head='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){',tail=' if(uPass>3.5&&uPass<4.5){';
const branch=s=>{const a=s.indexOf(head),b=s.indexOf(tail,a+head.length);assert.ok(a>=0&&b>a);return {a,b,body:s.slice(a,b)}};
const a=branch(base),b=branch(next);
const hash=s=>{const m=s.match(/script-src 'sha256-([^']+)'/);assert.ok(m);return m[1]};
test('CSP exact hash; no unsafe-inline',()=>{
 const script=next.match(/<script>([\s\S]*?)<\/script>/);assert.ok(script);
 assert.equal(hash(next),createHash('sha256').update(script[1]).digest('base64'));
 assert.equal(next.includes("script-src 'unsafe-inline'"),false);
});
test('Exactly five independent 3D flow families with thinner sections',()=>{
 for(const c of 'ABCDE'){
  assert.ok(b.body.includes('float shell'+c+'='),'missing shell'+c);
  assert.ok(b.body.includes('float body'+c+'='),'missing body'+c);
  assert.ok(b.body.includes('float spec'+c+'='),'missing spec'+c);
 }
 assert.ok(b.body.includes('float tubeD='));
 assert.ok(b.body.includes('float tubeE='));
 assert.ok(b.body.includes('tubeA-.158'));
 assert.ok(b.body.includes('tubeB-.172'));
 assert.ok(b.body.includes('tubeC-.165'));
 assert.ok(b.body.includes('flowTime=uLabTime'));
});
test('R187.3 reconstructs exactly by reverting only shader 6 and version labels',()=>{
 let old=next.slice(0,b.a)+a.body+next.slice(b.b);
 old=old.replace('<title>SiteForge — Laboratoire énergétique 3D R187.4</title>','<title>SiteForge — Laboratoire énergétique 3D R187.3</title>')
 .replace('Cinq flux fins · R187.4','Flux cylindriques vivants · R187.3')
 .replace('LAB R187.4','LAB R187.3')
 .replace(hash(next),hash(base));
 assert.equal(old,base);
});
test('Seven materials, 18 scene controls and 10 mote controls intact',()=>{
 const options=s=>[...s.matchAll(/<option value="([0-6])"/g)].map(m=>m[1]);
 const ctl=(s,re)=>[...s.matchAll(re)].map(x=>x[1]).sort();
 assert.deepEqual(options(next),options(base));
 const scene=/data-sphere-control="([^"]+)"/g,motes=/data-mote-control="([^"]+)"/g;
 assert.deepEqual(ctl(next,scene),ctl(base,/data-sphere-control="([^"]+)"/g));
 assert.deepEqual(ctl(next,motes),ctl(base,/data-mote-control="([^"]+)"/g));
 assert.equal(ctl(next,/data-sphere-control="([^"]+)"/g).length,18);
 assert.equal(ctl(next,/data-mote-control="([^"]+)"/g).length,10);
 assert.ok(next.includes('data-export-json')&&next.includes('data-import-json'));
});
test('R187.4 remains translucent; no opaque tube SDF',()=>{
 assert.ok(b.body.includes('gl_FragColor=vec4(outNeon+skyNeon,alphaNeon*edgeNeon*uEffects.w)'));
 assert.ok(!b.body.includes('if(minimum<.011)'));
 assert.ok(b.body.includes('cyanNeon*(lightA+lightD*.76)'));
 assert.ok(b.body.includes('pinkNeon*(lightB+lightE*.76)'));
});
