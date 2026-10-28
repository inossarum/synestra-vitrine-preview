import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const js=readFileSync(new URL('../assets/siteforge-lab-r166-flow.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
test('R185 has three explicit art-direction choices with accessible pressed states',()=>{
 for(const v of ['pure','organic','crystal'])assert.match(html,new RegExp('data-art-preset="'+v+'" aria-pressed="false"'));
 assert.match(html,/data-art-caption role="status" aria-live="polite"/);
 assert.match(js,/stage\.dataset\.artPreset=artPreset/);
 assert.match(js,/btn\.setAttribute\('aria-pressed'/);
});
test('R185 art presets differ in shape, density, spacing, brightness while respecting base visual restrictions',()=>{
 for(const v of ['pure','organic','crystal'])assert.match(js,new RegExp(v+':\\{enabled:'));
 assert.match(js,/pure:\{enabled:false,shape:0,count:0/);
 assert.match(js,/organic:\{enabled:true,shape:2,count:28/);
 assert.match(js,/crystal:\{enabled:true,shape:1,count:14/);
 assert.match(js,/for\(const \[key,value\] of Object\.entries\(values\)\)moteControls\[key\]\.value=String\(value\)/);
 assert.doesNotMatch(js,/applyArtPreset=id=>\{[\s\S]{0,650}controls\[/);
});
test('R185 manual edits and JSON import invalidate art label, but changing plasma does not',()=>{
 assert.match(js,/if\(e\.target\?\.hasAttribute\('data-mote-control'\)\)setCustomArt\(\)/);
 assert.match(js,/motesEnabled=values\.enabled;pointerForce=0;setCustomArt\(\)/);
 assert.match(js,/motesEnabled=true;\s+setCustomArt\(\)/);
 assert.match(js,/const art=event\.target\.closest\('\[data-art-preset\]'\)/);
 assert.match(js,/if\(art\)\{applyArtPreset\(art\.dataset\.artPreset\);return;\}/);
});
test('R185 one WebGL engine and backward-compatible 18 plasma + 10 motes JSON settings unchanged',()=>{
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(js,/const spinPhase=elapsed\*\.104/);
 assert.match(js,/gl_FragColor=vec4\(lightCol\*alpha,alpha\)/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
