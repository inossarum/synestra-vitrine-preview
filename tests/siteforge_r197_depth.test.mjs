import test from'node:test';import assert from'node:assert/strict';
import {readFileSync,existsSync} from'node:fs';import {join,dirname} from'node:path';
import {fileURLToPath} from'node:url';import {createHash} from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),read=p=>readFileSync(join(root,p),'utf8');
const h=read('r197/index.html'),css=read('assets/r197-depth.css'),shader=read('assets/siteforge-r197-depth.js');
const paths=['','connect/','bridge/','siteforge/','offres/'];
test('R197 base and original GPU shader are pinned and unchanged',()=>{
 assert.equal(createHash('sha256').update(readFileSync(join(root,'r196/index.html'))).digest('hex'),'43c2fa3845b2b0cdc7072dcd369c30df442e8c4fa3a8e882ce2fce5853773574');
 assert.equal(createHash('sha256').update(readFileSync(join(root,'assets/siteforge-r190-hover-flux.js'))).digest('hex'),'d5b64dfccba2096d6cc6f1198a4656c6320569ff627caf11f84fb5eb0e493eae');
 assert.equal((h.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((h.match(/siteforge-r197-depth\.js/g)||[]).length,1);
 assert.equal((h.match(/siteforge-r190-hover-flux\.js/g)||[]).length,0);
 assert.match(h,/syn-r197-home/);
});
test('R197 removes physical DOM floor reflection, bloom, and wide green strip',()=>{
 for(const s of ['class="r192-floor-sheen"','class="r192-floor-light"','class="r192-light-falloff"','class="r192-floor-reflection"'])assert.ok(!h.includes(s),s);
 assert.match(h,/class="r197-contact-shadow"/);
 assert.match(css,/\.syn-r197-home \.r192-floor/);
 assert.match(css,/background:linear-gradient\(180deg,#101827/);
 assert.match(css,/rgba\(0,0,0,\.49\)/);
 assert.ok(!/box-reflect:below|filter:blur\(|backdrop-filter:blur\(/.test(css));
});
test('R197 actual WebGL ray marching shaded by front/back depth, directional light',()=>{
 assert.match(shader,/float frontness=smoothstep\(-\.67,\.78,z\/max\(radius,\.001\)\)/);
 assert.match(shader,/float keyLight=clamp\(/);
 assert.match(shader,/float depthShade=mix\(\.68,1\.21,frontness\)/);
 assert.match(shader,/radiance=filamentColor\*\(\.48\+currents\*1\.31\)\*depthShade/);
 assert.match(shader,/float rotY=sin\(t\*\.10\)\*\.24,rotX=sin\(t\*\.075\)\*\.105/);
 assert.match(shader,/uTilt,0,0/); // pointer never rotates camera
 assert.match(shader,/uPointer,pointerX,pointerY,pointerEnergy/);
 assert.match(shader,/uVolumeSteps,mobile\?14:22/);
 assert.match(shader,/const MAX=2048/);
 assert.equal((shader.match(/getContext\('webgl'/g)||[]).length,1);
 assert.equal((shader.match(/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/g)||[]).length,1);
});
test('R197 foreground and behind-layer occlusion preserves pointer and reduced motion',()=>{
 assert.match(h,/class="r197-volume-backdrop"/);
 assert.match(h,/class="r197-foreground-arc"/);
 assert.match(css,/\.r197-foreground-arc\{/);
 assert.match(css,/z-index:6;pointer-events:none/);
 assert.match(css,/mask-image:linear-gradient/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
test('R197 all five paths preserve links, one stylesheet each, no staging promotion',()=>{
 for(const slug of paths){
  const doc=read('r197/'+slug+'index.html');
  assert.equal((doc.match(/<h1\b/g)||[]).length,1);
  assert.match(doc,/noindex,nofollow/);
  if(slug==='')assert.equal((doc.match(/r197-depth\.css/g)||[]).length,1);
  else assert.equal((doc.match(/r197-depth\.css/g)||[]).length,0);
  for(const m of doc.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const val=m[1];if(val.startsWith('#'))continue;
   const u=new URL(val,'http://localhost/r197/'+slug);if(u.origin!=='http://localhost')continue;
   const f=join(root,u.pathname.replace(/^\//,''));
   assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+':'+val);
  }
 }
 assert.doesNotMatch(h,/synestra-client-portal-staging/);
});
test('R197 failure first — any revived mirror or duplicated canvas is rejected',()=>{
 const validate=s=>{
  assert.equal((s.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
  assert.ok(!s.includes('class="r192-floor-light"'));
  assert.ok(!s.includes('class="r192-floor-reflection"'));
 };
 assert.throws(()=>validate(h.replace('</main>','<canvas class="core-r109-canvas"></canvas></main>')));
 assert.throws(()=>validate(h+'<div class="r192-floor-reflection"></div>'));
 assert.throws(()=>validate(h+'<div class="r192-floor-light"></div>'));
});
