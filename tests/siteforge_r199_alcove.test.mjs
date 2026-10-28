import test from'node:test';import assert from'node:assert/strict';
import {readFileSync,existsSync} from'node:fs';import{join,dirname}from'node:path';import{fileURLToPath}from'node:url';
import{createHash}from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8'),sha=p=>createHash('sha256').update(readFileSync(join(root,p))).digest('hex');
const h=read('r199/index.html'),css=read('assets/r199-alcove.css'),shader=read('assets/siteforge-r198-fixed-orientation.js');
const paths=['','connect/','bridge/','siteforge/','offres/'];
test('R199 created from pinned, unchanged R198 and unmodified shader',()=>{
 assert.equal(sha('r198/index.html'),'776c14cc165836c5949f3670651ac2274e2ebbaa3edce0bf6e412ed518ff04f2');
 assert.equal(sha('assets/siteforge-r198-fixed-orientation.js'),'a0f16d77d636e331b5011d68b2412767ec3b595f284a4d4283462f60f9f2c90b');
 assert.equal((h.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((h.match(/siteforge-r198-fixed-orientation.js/g)||[]).length,1);
});
test('R198 rejected chrome rings and posts truly removed from R199 DOM',()=>{
 for(const token of ['class="r198-chamber"','class="r198-rear-frame"','class="r198-rail-left"','class="r198-foreground-rim"','class="r197-foreground-arc"','class="r196-core-apparatus"','class="r197-volume-backdrop"'])assert.ok(!h.includes(token),token);
 for(const token of ['r199-architecture','r199-panel-left','r199-panel-right','r199-back-wall','r199-ceiling','r199-material-light'])assert.ok(h.includes(token),token);
});
test('True perspective panels and material-only lateral bounce rather than open-space screen glow',()=>{
 assert.match(css,/perspective:1050px/);
 assert.match(css,/\.r199-panel-left\{/);
 assert.match(css,/clip-path:polygon\(0 0,100% 17%,100% 83%,0 100%\)/);
 assert.match(css,/\.r199-panel-right\{/);
 assert.match(css,/rotateY\(18deg\)/);
 assert.match(css,/rotateY\(-18deg\)/);
 assert.match(css,/\.r199-face-light-left/);
 assert.match(css,/\.r199-face-light-right/);
 assert.match(css,/rgba\(160,107,208,\.32\)/);
 assert.match(css,/rgba\(100,195,151,\.29\)/);
});
test('Ground only receives limited, separated RGB bounce; no mirrored or GPU doubles',()=>{
 assert.match(css,/\.r199-material-light/);
 assert.match(css,/rgba\(223,239,236,\.24\)/);
 assert.match(css,/rgba\(142,85,198,\.21\)/);
 assert.match(css,/rgba\(79,178,135,\.21\)/);
 assert.ok(!h.includes('class="r192-floor-light"'));
 assert.ok(!h.includes('class="r192-floor-reflection"'));
 assert.doesNotMatch(css,/box-reflect|filter:blur\(|backdrop-filter:blur\(/);
 assert.doesNotMatch(css,/getContext\(/);
});
test('Original sphere pose and local pointer impulse preserved',()=>{
 assert.match(shader,/float rotY=uTilt\.x\*1\.5,rotX=uTilt\.y\*1\.5/);
 assert.match(shader,/gl\.uniform2f\(U\.uTilt,0,0\)/);
 assert.match(shader,/gl\.uniform3f\(U\.uPointer,pointerX,pointerY,pointerEnergy\)/);
 assert.match(shader,/uVolumeSteps,mobile\?14:22/);
});
test('Reduced motion and mobile preserved',()=>{
 assert.match(css,/@media\(max-width:620px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/pointer-events:none/);
});
test('Five page asset paths and route links resolve',()=>{
 for(const slug of paths){
 const doc=read('r199/'+slug+'index.html');
 assert.equal((doc.match(/<h1\b/g)||[]).length,1);
 assert.match(doc,/noindex,nofollow/);
 assert.equal((doc.match(/r199-alcove\.css/g)||[]).length,slug?0:1);
 for(const m of doc.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   if(m[1].startsWith('#'))continue;
   const url=new URL(m[1],'http://localhost/r199/'+slug);
   if(url.origin!=='http://localhost')continue;
   const f=join(root,url.pathname.replace(/^\//,''));
   assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+':'+m[1]);
 }
 }
});
test('Failure-first guards against reviving rings, floor mirror or extra canvas',()=>{
 const validate=s=>{
  assert.equal((s.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
  assert.ok(!s.includes('class="r198-chamber"'));
  assert.ok(!s.includes('class="r192-floor-reflection"'));
 };
 assert.throws(()=>validate(h+'<canvas class="core-r109-canvas"></canvas>'));
 assert.throws(()=>validate(h+'<div class="r198-chamber"></div>'));
 assert.throws(()=>validate(h+'<div class="r192-floor-reflection"></div>'));
});
