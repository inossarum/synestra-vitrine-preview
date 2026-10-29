import test from 'node:test';import assert from 'node:assert/strict';
import{readFileSync,existsSync,readdirSync}from'node:fs';import{join,dirname}from'node:path';import{fileURLToPath}from'node:url';import{createHash}from'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..'),read=p=>readFileSync(join(root,p),'utf8');
const sha=p=>createHash('sha256').update(readFileSync(join(root,p))).digest('hex');
const home=read('r201/index.html'),src=read('r201-build/scene.mjs'),bundle=read('assets/r201-scene.bundle.mjs');
const gpuFiles=readdirSync(join(root,'assets/r201-gpu-benchmarks')).filter(x=>x.endsWith('.json'));
test('Source R200 pinned; independent R201 with one canvas, not old WebGL program',()=>{
 assert.equal(sha('r200/index.html'),'00f54dcc6212fa4c80391b80f814f25346ccd795f691d150c771a758e6d2acf1');
 assert.equal((home.match(/class="core-r109-canvas"/g)||[]).length,1);
 assert.equal((home.match(/r201-scene\.bundle\.mjs/g)||[]).length,1);
 assert.doesNotMatch(home,/<script src="\.\.\/assets\/siteforge-r200-unified-scene\.js"/);
 assert.match(home,/type="module"/);
 assert.match(home,/connect-src 'self'/);
});
test('Pinned open source dependencies and self-hosted build',()=>{
 const p=JSON.parse(read('r201-build/package.json')),lock=JSON.parse(read('r201-build/package-lock.json'));
 assert.equal(p.dependencies.three,'0.186.1');
 assert.equal(p.dependencies['@theatre/core'],'0.7.2');
 assert.equal(p.dependencies['detect-gpu'],'5.0.70');
 assert.equal(lock.lockfileVersion,3);
 assert.ok(bundle.length>300000);
 assert.ok(existsSync(join(root,'assets/r201-scene.bundle.mjs.LEGAL.txt')));
 assert.ok(gpuFiles.length>=15);
 assert.doesNotMatch(src,/@theatre\/studio|https:\/\/unpkg|https:\/\/cdn|createElement\('canvas'\)/);
});
test('Three renderer, PBR materials, world-space geometry and direct Core light',()=>{
 for(const k of ['new THREE.WebGLRenderer','new THREE.Scene','new THREE.PerspectiveCamera','new THREE.MeshStandardMaterial','new THREE.PointLight','new THREE.CylinderGeometry','new THREE.PlaneGeometry','new THREE.FogExp2','renderer.shadowMap.enabled=true'])assert.ok(src.includes(k),k);
 assert.equal((src.match(/new THREE\.WebGLRenderer/g)||[]).length,1);
 assert.match(src,/sphereUniforms\.uCyan\.value\.copy/);
 assert.match(src,/a\.intensity=17\*intensity/);
});
test('Actual original raymarch filaments are integrated into THREE.ShaderMaterial',()=>{
 const shader=read('r201-build/plasma-shader.mjs');
 assert.ok(shader.includes('float flowDeflection'));
 assert.ok(shader.includes('vec3 radiance=filamentColor'));
 assert.match(src,/new THREE\.ShaderMaterial/);
 assert.match(src,/plasmaFragment/);
 assert.match(src,/glslVersion:THREE\.GLSL1/);
 assert.match(src,/depthWrite:false/);
 assert.match(src,/stage\.addEventListener\('pointermove',onPointer/);
});
test('Theatre Core controls camera + light with scrolling',()=>{
 assert.match(src,/getProject\('Synestra R201'/);
 assert.match(src,/\.sheet\('Core Arrival'\)/);
 assert.match(src,/\.object\('Camera \+ Light'/);
 assert.match(src,/shot\.onValuesChange/);
 assert.match(src,/shot\.initialValue=/);
 assert.match(src,/sheet\.sequence\.position=t\*4/);
 assert.match(src,/stage\.dataset\.cameraPos=/);
});
test('GPU tier determines shadow and bloom profiles; no external runtime',()=>{
 assert.match(src,/await getGPUTier/);
 assert.match(src,/benchmarksURL:new URL\('\.\/r201-gpu-benchmarks'/);
 assert.match(src,/if\(tierCap===3\)/);
 assert.match(src,/new UnrealBloomPass/);
 assert.match(src,/composer\.render\(\)/);
 assert.match(src,/quality=Math\.max\(\.55/);
 assert.match(src,/Math\.abs\(ratio-lastPixelRatio\)<\.001/);
});
test('Fallback reduced motion and lost context preserve static product',()=>{
 assert.match(src,/if\(reduced\.matches\)/);
 assert.match(src,/stage\.dataset\.coreError='low-tier'/);
 assert.match(src,/webglcontextlost/);
 assert.match(read('assets/r201-three.css'),/prefers-reduced-motion:reduce/);
 assert.match(home,/class="core-r108-art"/);
});
test('All five routes preserve navigation/assets and prevent horizontal link breakage',()=>{
 for(const slug of ['','connect/','bridge/','siteforge/','offres/']){
  const doc=read('r201/'+slug+'index.html');assert.match(doc,/noindex,nofollow/);
  assert.equal((doc.match(/<h1\b/g)||[]).length,1);
  for(const m of doc.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   if(m[1].startsWith('#'))continue;
   const u=new URL(m[1],'http://localhost/r201/'+slug);if(u.origin!=='http://localhost')continue;
   const f=join(root,u.pathname.replace(/^\//,''));
   assert.ok(existsSync(f)||existsSync(join(f,'index.html')),slug+' '+m[1]);
  }
 }
});
test('Failure-first guard: duplicate engine, remote dependencies, or missing CSP must fail',()=>{
 const validate=(h,s)=>{
  assert.equal((h.match(/class="core-r109-canvas"/g)||[]).length,1);
  assert.match(h,/connect-src 'self'/);
  assert.doesNotMatch(s,/https:\/\/unpkg/);
  assert.equal((s.match(/new THREE\.WebGLRenderer/g)||[]).length,1);
 };
 assert.throws(()=>validate(home+'<canvas class="core-r109-canvas"></canvas>',src));
 assert.throws(()=>validate(home.replace("connect-src 'self'",""),src));
 assert.throws(()=>validate(home,src+'https://unpkg.com/three'));
 assert.throws(()=>validate(home,src+'new THREE.WebGLRenderer()'));
});
