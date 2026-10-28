import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';import{join,dirname}from'node:path';import{fileURLToPath}from'node:url';
import{createHash}from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8'),hash=p=>createHash('sha256').update(readFileSync(join(root,p))).digest('hex');
const h=read('r198/index.html'),shader=read('assets/siteforge-r198-fixed-orientation.js'),css=read('assets/r198-chamber.css');
const paths=['','connect/','bridge/','siteforge/','offres/'];
test('R198 pinned source and source R197 untouched',()=>{
 assert.equal(hash('r197/index.html'),'5c726b9bb61236b82d899247f110a0cb60d93dbeb40327145f417a63c9ce4159');
 assert.equal(hash('assets/siteforge-r197-depth.js'),'d551966abcce5bf862dddddd487b55629efa3eb4ad4258298c732976e1d75751');
 assert.equal((h.match(/class="core-r109-canvas"/g)||[]).length,1);
});
test('Original sphere orientation restored, pointer only perturbs flow',()=>{
 assert.match(shader,/float rotY=uTilt\.x\*1\.5,rotX=uTilt\.y\*1\.5/);
 assert.doesNotMatch(shader,/float rotY=sin\(t\*\.10\)/);
 assert.match(shader,/gl\.uniform2f\(U\.uTilt,0,0\)/);
 assert.match(shader,/gl\.uniform3f\(U\.uPointer,pointerX,pointerY,pointerEnergy\)/);
 assert.match(shader,/uVolumeSteps,mobile\?14:22/);
 assert.equal((shader.match(/getContext\('webgl'/g)||[]).length,1);
});
test('Scene has concrete 3D ambient structure around, not over pointer',()=>{
 for(const s of ['r198-chamber','r198-rear-frame','r198-inner-frame','r198-rail-left','r198-rail-right','r198-horizon','r198-bounce-pool','r198-foreground-rim'])assert.ok(h.includes(s),s);
 assert.match(css,/\.r198-chamber\{[\s\S]*?pointer-events:none/);
 assert.match(css,/\.r198-rear-frame/);
 assert.match(css,/rotateY\(-27deg\)/);
 assert.match(css,/\.r198-rail-left\{/);
 assert.match(css,/\.r198-rail-right\{/);
 assert.match(css,/\.r198-foreground-rim/);
});
test('Illumination is localized on metallic surfaces, not image reflection',()=>{
 assert.match(css,/\.r198-bounce-pool/);
 assert.match(css,/rgba\(118,77,175,\.13\)/);
 assert.match(css,/rgba\(69,153,115,\.135\)/);
 assert.match(css,/rgba\(190,151,234,\.65\)/);
 assert.match(css,/rgba\(155,228,191,\.65\)/);
 assert.doesNotMatch(h,/class="r192-floor-light"/);
 assert.doesNotMatch(css,/box-reflect|filter:blur|backdrop-filter/);
 assert.doesNotMatch(h,/class="r192-floor-reflection"/);
});
test('Reduced motion, mobile, pointer passthrough',()=>{
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/max-width:700px/);
 assert.match(css,/\.r198-rail,\.r198-grazing\{display:none/);
 assert.match(css,/pointer-events:none/);
});
test('Five local paths resolve, no extra canvas or changed product copies',()=>{
 for(const slug of paths){
  const doc=read('r198/'+slug+'index.html');
  assert.equal((doc.match(/<h1\b/g)||[]).length,1);
  assert.equal((doc.match(/r198-chamber\.css/g)||[]).length,slug?0:1);
  assert.equal((doc.match(/r194-scroll\.js/g)||[]).length,1);
  assert.match(doc,/noindex,nofollow/);
  for(const m of doc.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   if(m[1].startsWith('#'))continue;
   const u=new URL(m[1],'http://localhost/r198/'+slug);
   if(u.origin!=='http://localhost')continue;
   const f=join(root,u.pathname.replace(/^\//,''));
   assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+' '+m[1]);
  }
 }
});
test('Failure-first invalid additions fail contracts',()=>{
 const validate=s=>{
  assert.equal((s.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
  assert.ok(!s.includes('class="r192-floor-light"'));
  assert.ok(!s.includes('class="r192-floor-reflection"'));
 };
 assert.throws(()=>validate(h+'<canvas class="core-r109-canvas"></canvas>'));
 assert.throws(()=>validate(h+'<div class="r192-floor-light"></div>'));
 assert.throws(()=>validate(h+'<div class="r192-floor-reflection"></div>'));
});