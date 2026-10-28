from pathlib import Path
root=Path(__file__).resolve().parent.parent
for name in ["siteforge_r179_customization.test.mjs","siteforge_r180_styles_import.test.mjs","siteforge_r181_crystal_optics.test.mjs"]:
 p=root/"tests"/name
 s=p.read_text("utf8")
 a="assert.equal((html.match(/data-mote-control=/g)||[]).length,8);"
 if s.count(a)!=1:raise RuntimeError(f"expected control count in {name}, {s.count(a)}")
 s=s.replace(a,"assert.equal((html.match(/data-mote-control=/g)||[]).length,10);")
 p.write_text(s,encoding="utf8",newline="\n")
 print("ADAPTED",name)
p=root/"tests"/"siteforge_r182_crystal_finish.test.mjs"
if p.exists():raise RuntimeError("TEST_EXISTS")
p.write_text(r"""import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const j=readFileSync(new URL('../assets/siteforge-lab-r166-flow.js',import.meta.url),'utf8');
const h=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const vertex=j.split('const vertex=')[1].split('const fragment=')[0];
const frag=j.split('const fragment=')[1].split('function compile(')[0];
test('R182: finish controls are real inputs, old 18 plasma controls kept',()=>{
 assert.equal((h.match(/data-mote-control=/g)||[]).length,10);
 assert.equal((h.match(/data-sphere-control=/g)||[]).length,18);
 for(const k of ['moteRoughness','moteReflectivity']){
  assert.match(h,new RegExp('data-mote-control="'+k+'"'));
  assert.match(j,new RegExp("moteVal\\('"+k+"'\\)"));
 }
 assert.match(j,/gl\.uniform2f\(U\.uMoteFinish/);
 assert.match(frag,/uniform vec2 uMoteFinish/);
});
test('R182: physical-looking fine facets are seeded by 3D mote identity, not screen-space',()=>{
 assert.match(vertex,/varying float vMoteSeed/);
 assert.match(vertex,/vMoteSeed=rnd\(i\*11\.87\+3\.1\)/);
 assert.match(frag,/varying float vMoteSeed/);
 assert.match(frag,/vec2 grainCell=floor\(\(facetXY\+vMoteSeed\*2\.7\)\*24\.\)/);
 assert.match(frag,/float hairline=1\.-smoothstep\(\.016,\.056,/);
 assert.match(frag,/normal=normalize\(normal\+vec3\(/);
 assert.match(frag,/mix\(34\.,8\.,roughness\)/);
 assert.match(frag,/reflectionStrength/);
});
test('R182: effects bounded, stable when animation pauses and no extra WebGL renderer',()=>{
 assert.match(frag,/float roughness=clamp\(uMoteFinish\.x,0\.,1\.\)/);
 assert.match(frag,/float reflectionStrength=clamp\(uMoteFinish\.y,0\.,2\.\)/);
 assert.equal((j.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.equal((h.match(/<canvas /g)||[]).length,1);
 assert.match(j,/const spinPhase=elapsed\*\.104/);
 assert.match(j,/if\(last\)elapsed\+=Math\.min\(\(now-last\)\/1000,\.15\)/);
});
test('R182 JSON compatible with old optional motes keys and unchanged schema',()=>{
 assert.match(j,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(j,/version:1,/);
 assert.match(j,/const values=doc\.motes===undefined\?\{\}:doc\.motes/);
 assert.match(j,/Object\.keys\(moteControls\)/);
 assert.match(j,/Object\.entries\(moteControls\)/);
});
test('R182 restores prior default shape and 2 new finish values',()=>{
 assert.match(h,/data-default="35" type="range" min="0" max="100" value="35"/);
 assert.match(h,/data-default="95" type="range" min="0" max="200" value="95"/);
 assert.match(j,/for\(const \[key,input\] of Object\.entries\(moteControls\)\)input\.value=moteDefaults\[key\]/);
});
""",encoding="utf8",newline="\n")
print("NEW_TEST",p)
