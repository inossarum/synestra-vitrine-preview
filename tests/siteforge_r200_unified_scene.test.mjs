import test from 'node:test';import assert from 'node:assert/strict';
import{readFileSync,existsSync}from'node:fs';import{join,dirname}from'node:path';import{fileURLToPath}from'node:url';import{createHash}from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(join(root,p),'utf8'),sha=p=>createHash('sha256').update(readFileSync(join(root,p))).digest('hex');
const h=read('r200/index.html'),js=read('assets/siteforge-r200-unified-scene.js'),css=read('assets/r200-unified-scene.css');
const routes=['','connect/','bridge/','siteforge/','offres/'];
test('R200 source R199 pinned and source shader unchanged',()=>{
 assert.equal(sha('r199/index.html'),'6f0dde1f7df804cfce38313e976cb691d0496059acf9edc3f6d9a59ba63e45d8');
 assert.equal(sha('assets/siteforge-r198-fixed-orientation.js'),'a0f16d77d636e331b5011d68b2412767ec3b595f284a4d4283462f60f9f2c90b');
 assert.equal((h.match(/class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((h.match(/siteforge-r200-unified-scene.js/g)||[]).length,1);
});
test('True shared WebGL ray intersections: floor, back wall, side walls, ceiling, plinth',()=>{
 for(const s of['sceneColor(vec2 uv)','float t=(-1.21-ro.y)/rd.y','float t=(-1.155-ro.y)/rd.y','float t=(-3.35-ro.z)/rd.z','float t=(-2.75-ro.x)/rd.x','float t=(2.75-ro.x)/rd.x','float t=(2.24-ro.y)/rd.y'])assert.ok(js.includes(s),s);
 assert.match(js,/vec3 ro=vec3\(scroll/);
 assert.match(js,/vec3 rd=normalize/);
});
test('Core is actual light at world origin, shading normal and attenuation',()=>{
 assert.match(js,/vec3 toward=vec3\(0\.,\.03,0\.\)-pos/);
 assert.match(js,/float lambert=max\(dot\(normal,l\),0\.\)/);
 assert.match(js,/float attenuation=1\.\//);
 assert.match(js,/vec3 lights=mix\(violetLight,greenLight/);
 assert.match(js,/uCore\*coreStar\*\.78/);
 assert.match(js,/float fog=1\.-exp\(/);
});
test('One canvas/program for geometry and plasma: no parallel renderer or CSS room',()=>{
 assert.equal((js.match(/getContext\('webgl'/g)||[]).length,1);
 assert.equal((js.match(/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/g)||[]).length,1);
 assert.equal((h.match(/class="r199-architecture"/g)||[]).length,0);
 assert.equal((h.match(/class="r192-floor"/g)||[]).length,0);
 assert.equal((js.match(/gl\.createProgram\(/g)||[]).length,1);
 assert.match(js,/vec3 background=sceneColor\(view\)/);
 assert.match(js,/gl_FragColor=vec4\(min\(vec3\(1\.\),composed\),1\.\)/);
});
test('Camera on scroll, fixed sphere mouse tilt and hover energy',()=>{
 assert.match(js,/uniform float uSceneScroll/);
 assert.match(js,/getScroll=\(\)=>/);
 assert.match(js,/gl\.uniform1f\(U\.uSceneScroll,getScroll\(\)\)/);
 assert.match(js,/gl\.uniform2f\(U\.uTilt,0,0\)/);
 assert.match(js,/gl\.uniform3f\(U\.uPointer,pointerX,pointerY,pointerEnergy\)/);
 assert.match(js,/pointerImpulse\*=Math\.exp\(-dt\*2\.5\)/);
});
test('Adaptive quality bounded with mobile and visible telemetry',()=>{
 assert.match(js,/qualityScale=Math\.max\(\.65/);
 assert.match(js,/qualityScale=Math\.min\(1/);
 assert.match(js,/mobile\?12:18/);
 assert.match(js,/mobile\?260000:720000/);
 assert.match(js,/stage\.dataset\.coreFps=/);
 assert.match(js,/stage\.dataset\.sceneScroll=/);
});
test('Five routes retain source features, anchors, assets, fallback semantics',()=>{
 for(const slug of routes){const doc=read('r200/'+slug+'index.html');
  assert.equal((doc.match(/<h1\b/g)||[]).length,1);
  assert.match(doc,/noindex,nofollow/);
  assert.ok(doc.includes('r194-scroll.js'));
  if(slug==='')assert.ok(doc.includes('r200-unified-scene.css'));else assert.ok(!doc.includes('r200-unified-scene.css'));
  for(const m of doc.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const href=m[1];if(href.startsWith('#'))continue;const u=new URL(href,'http://localhost/r200/'+slug);
   if(u.origin!=='http://localhost')continue;
   const f=join(root,u.pathname.replace(/^\//,''));
   assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+':'+href);
  }
 }
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/\.syn-r200-home \.r192-scene \.core-r109-canvas/);
});
test('Failure-first invalid duplicate canvas, revived mirror or stale R199 architecture',()=>{
 const validate=s=>{assert.equal((s.match(/class="core-r109-canvas"/g)||[]).length,1);assert.doesNotMatch(s,/class="r192-floor-reflection"/);assert.doesNotMatch(s,/class="r199-architecture"/)};
 assert.throws(()=>validate(h+'<canvas class="core-r109-canvas"></canvas>'));
 assert.throws(()=>validate(h+'<div class="r192-floor-reflection"></div>'));
 assert.throws(()=>validate(h+'<div class="r199-architecture"></div>'));
});
