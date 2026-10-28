import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const before=readFileSync(new URL('../siteforge-r1876-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const after=readFileSync(new URL('../siteforge-r1877-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const head='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){',tail=' if(uPass>3.5&&uPass<4.5){';
const portion=s=>{const a=s.indexOf(head),b=s.indexOf(tail,a+head.length);assert.ok(a>=0&&b>a);return {a,b,body:s.slice(a,b)}};
const orig=portion(before),next=portion(after);
const hash=s=>{const m=s.match(/script-src 'sha256-([^']+)'/);assert.ok(m);return m[1]};
test('strict CSP SHA-256 and no unsafe-inline',()=>{
 const script=after.match(/<script>([\s\S]*?)<\/script>/);assert.ok(script);
 assert.equal(hash(after),createHash('sha256').update(script[1]).digest('base64'));
 assert.ok(!after.includes("script-src 'unsafe-inline'"));
});
test('Slider exposes real diameter across 30-250 percent, sphere diameter distinct',()=>{
 const slider=after.match(/<input id="sf-flowStructure"[^>]*>/)?.[0];assert.ok(slider);
 assert.match(slider,/min="30" max="250" value="100"/);
 assert.match(after,/Diamètre des flux énergétiques/);
 assert.match(after,/Diamètre de la sphère/);
 assert.match(after,/data-flow-diameter-help/);
 assert.ok(next.body.includes('float widthNeon=clamp(uFlow.y,.30,2.50);'));
 assert.ok(!next.body.includes('float widthNeon=clamp(uFlow.y,.55,1.75);'));
});
test('Five braids retain their local optical width and motion',()=>{
 for(const c of 'ABCDE'){
  assert.ok(next.body.includes('float braid'+c+'='),c);
  assert.ok(next.body.includes('cross'+c+'-orbit'+c),c);
  assert.ok(next.body.includes('cross'+c+'+orbit'+c),c);
 }
 assert.ok(next.body.includes('float flowTime=uLabTime;'));
 assert.ok(!next.body.includes('float cylinderA='));
});
test('Material6 and expected UI delta only; legacy shader/JS unchanged',()=>{
 let old=after.slice(0,next.a)+orig.body+after.slice(next.b);
 old=old.replace('<title>SiteForge — Laboratoire énergétique 3D R187.7</title>','<title>SiteForge — Laboratoire énergétique 3D R187.6</title>')
 .replace('Flux tressés réglables · R187.7','Flux tressés vivants · R187.6')
 .replace('LAB R187.7','LAB R187.6')
 .replace('Diamètre des flux énergétiques','Largeur des courants')
 .replace('min="30" max="250" value="100" step="1"','min="30" max="200" value="100" step="1"')
 .replace('Diamètre de la sphère','Diamètre')
 .replace(/<p class="help" data-flow-diameter-help>.*?<\/p>\n/,'')
 .replace(hash(after),hash(before));
 assert.equal(old,before);
});
test('18 scene + 10 mote JSON controls, seven materials and clean lab preserved',()=>{
 const entries=(s,re)=>[...s.matchAll(re)].map(x=>x[1]).sort();
 assert.deepEqual(entries(after,/data-sphere-control="([^"]+)"/g),entries(before,/data-sphere-control="([^"]+)"/g));
 assert.equal(entries(after,/data-sphere-control="([^"]+)"/g).length,18);
 assert.deepEqual(entries(after,/data-mote-control="([^"]+)"/g),entries(before,/data-mote-control="([^"]+)"/g));
 assert.equal(entries(after,/data-mote-control="([^"]+)"/g).length,10);
 const materialSelect=after.match(/<select id="sf-flowType"[\s\S]*?<\/select>/)?.[0];assert.ok(materialSelect);assert.equal((materialSelect.match(/<option value="[0-6]"/g)||[]).length,7);
 assert.ok(after.includes('data-import-json')&&after.includes('data-export-json'));
 assert.ok(after.includes('data-lab-optional'));
});
