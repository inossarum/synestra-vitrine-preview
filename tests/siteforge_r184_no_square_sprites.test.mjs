import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const js=readFileSync(new URL('../assets/siteforge-lab-r166-flow.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const shader=js.split('const fragment=')[1].split('function compile(')[0];
test('R184 root cause: additive ONE ONE ignores alpha; shader must premultiply emission',()=>{
 assert.match(js,/gl\.blendFunc\(gl\.ONE,gl\.ONE\)/);
 assert.match(shader,/if\(alpha<\.012\)discard/);
 assert.match(shader,/gl_FragColor=vec4\(lightCol\*alpha,alpha\)/);
 assert.doesNotMatch(shader,/gl_FragColor=vec4\(lightCol,alpha\)/);
});
test('R184 crystal shape bounded inside point sprite (cannot show square edges)',()=>{
 assert.match(shader,/float sideCut=max\(lateral\*1\.13\+axial\*\.48,axial\*\.98\)/);
 assert.match(shader,/silhouette=1\.-smoothstep\(\.67,\.85,sideCut\)/);
 assert.match(shader,/float alpha=clamp\(silhouette,0\.,1\.\)\*vLife/);
 assert.match(js,/if\(uPass>4\.5\)gl_PointSize=clamp\(\(9\.0\+7\.0\*rnd/);
});
test('R184 restrained aesthetic defaults, fully customizable and v1 contract intact',()=>{
 for(const [k,v] of [['moteCount','30'],['moteSize','60'],['moteBrightness','65']]){
  assert.match(html,new RegExp('data-mote-control="'+k+'" data-default="'+v+'"'));
 }
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(js,/version:1,/);
 assert.match(js,/motes\.enabled=motesEnabled/);
});
test('R184 shared GPU clock, opt-in quality and 3 particle styles preserved',()=>{
 assert.match(js,/const spinPhase=elapsed\*\.104/);
 assert.match(js,/stage\.dataset\.moteSpinPhase=spinPhase\.toFixed\(4\)/);
 assert.match(html,/data-render-quality/);
 assert.match(js,/uMoteShape/);
 assert.match(shader,/else if\(uMoteShape>1\.5\)/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
