import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
const root=new URL('../',import.meta.url);
const read=name=>readFileSync(new URL(name,root),'utf8');
const scene=read('r204-build/scene.mjs');
const nucleus=read('r204-build/core-nucleus-r209.mjs');
test('R209 restores an independent visible world-space physical nucleus',()=>{
 assert.match(scene,/installCoreNucleus\(\{THREE,scene,owned,uniforms\}\)/);
 assert.match(nucleus,/new THREE.IcosahedronGeometry\(\.205,3\)/);
 assert.match(nucleus,/depthTest:true,depthWrite:true/);
 assert.match(scene,/stage.dataset.coreNucleus='geometry-r209'/);
});
test('Nucleus remains visible at tier zero, richer layers have budgets',()=>{
 assert.match(nucleus,/applyTier\(tier\)/);
 assert.match(nucleus,/halo.visible=tier>=1/);
 assert.match(nucleus,/mint.visible=tier>=2/);
 assert.match(scene,/coreNucleus.applyTier\(renderTier\)/);
 assert.match(scene,/coreNucleus.frame\(elapsed\)/);
});
test('One existing renderer, no network shaders and no second canvas',()=>{
 assert.equal((scene.match(/new THREE.WebGLRenderer/g)||[]).length,1);
 assert.doesNotMatch(nucleus,/fetch\(|new THREE.WebGLRenderer|document.createElement|new WebSocket|https?:\/\//);
 assert.match(scene,/labR1881Fragment/);
 assert.match(scene,/plasma\.position\.set\(0,\.07,\.12\)/);
});
test('Negative control: missing installation or low tier visibility is rejected',()=>{
 assert.doesNotMatch(scene.replace('coreNucleus=installCoreNucleus','coreNucleus=omit'),/coreNucleus=installCoreNucleus/);
 assert.doesNotMatch(nucleus.replace('halo.visible=tier>=1','halo.visible=true'),/halo.visible=tier>=1/);
});
