import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const get=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
test('Babylon native RTX3090 renders four independent modes at both viewports',()=>{
 const r=JSON.parse(get('R190_BABYLON_BROWSER.json').toString());
 assert.equal(r.status,'PASS');
 assert.equal(r.frames.length,8);
 for(const width of [1100,390]){
  const frames=r.frames.filter(s=>s.width===width);
  assert.equal(frames.length,4);
  for(const frame of frames){
   assert.equal(frame.state.canvas,1);
   assert.equal(frame.state.error,0);
   assert.equal(frame.state.engine,'babylon');
   assert.equal(frame.state.ready,'true');
   assert.ok(frame.state.filaments>=20);
   assert.match(frame.state.renderer,/RTX 3090/);
  }
  for(let mode=1;mode<=3;mode++){
   const delta=comparePngPixels(get('r190-babylon-core0-'+width+'.png'),get('r190-babylon-core'+mode+'-'+width+'.png'));
   assert.ok(delta.changed>200,'No visible difference '+width+' '+mode);
  }
 }
});
test('source has no remote resources, no second renderer, and provides rollback link',()=>{
 const src=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const page=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.equal((src.match(/new Engine\(/g)||[]).length,1);
 assert.equal((page.match(/<canvas /g)||[]).length,1);
 assert.match(page,/siteforge-r189-autonome\.html/);
 assert.doesNotMatch(src,/fetch\(|https?:\/\//);
 assert.match(page,/default-src 'self'/);
});
