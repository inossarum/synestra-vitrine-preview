import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=name=>readFileSync(new URL('../'+name,import.meta.url),'utf8').replace(/\r\n/g,'\n');
const catalogue=JSON.parse(read('siteforge-materials-r1884.json'));
const page=read('siteforge-catalogue-r1884.html'),lab=read('siteforge-r1884-autonome.html');
test('manifest identifies nine backward-compatible materials with shared controls',()=>{
 assert.equal(catalogue.schema,'synestra.siteforge.3d-material-catalog.v1');
 assert.deepEqual(catalogue.materials.map(x=>x.id),[0,1,2,3,4,5,6,7,8]);
 assert.equal(new Set(catalogue.materials.map(x=>x.slug)).size,9);
 assert.equal(catalogue.external_dependencies.length,0);
 for(const m of catalogue.materials){
  assert.equal(m.preview,'siteforge-r1884-autonome.html?demo=energy&material='+m.id);
  for(const key of ['count','spread','pulseSpeed','pulseIntensity','turbulence','diameter','mouse','palette','flowStructure'])assert.ok(m.controls.includes(key));
 }
});
test('source fingerprint and query allowlist are exact',()=>{
 assert.equal(catalogue.artifact_sha256_lf,createHash('sha256').update(lab).digest('hex'));
 assert.match(lab,/const linkMaterial=new URLSearchParams\(window\.location\.search\)\.get\('material'\)/);
 assert.match(lab,/\/\^\[0-8\]\$\/\.test\(linkMaterial\)/);
 assert.match(lab,/controls\.flowType\.value=linkMaterial;sync\(\);schedule\(\)/);
});
test('catalogue links all materials with responsive one-column layout',()=>{
 for(const material of catalogue.materials){
  assert.ok(page.includes('href="'+material.preview.replaceAll('&','&amp;')+'"')||page.includes('href="'+material.preview+'"'),material.slug);
 }
 assert.match(page,/@media\(max-width:570px\)\{\.grid\{grid-template-columns:1fr\}/);
 assert.equal((page.match(/<article>/g)||[]).length,9);
 assert.equal((page.match(/<script/g)||[]).length,0);
});
