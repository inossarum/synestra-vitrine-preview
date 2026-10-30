import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {decodePNG} from '../../tests/siteforge_r174_png_diff.mjs';
const read=n=>readFileSync(new URL('../'+n,import.meta.url));
const main=read('src/main.js').toString();
const browser=JSON.parse(read('evidence/R196_CORE_BROWSER.json').toString());
const metrics=JSON.parse(read('evidence/R196_VISUAL_METRICS.json').toString());

test('R196 keeps one engine and disables old rigid shell and meridian rings',()=>{
 assert.equal((main.match(/new Engine\(/g)||[]).length,1);
 assert.equal((main.match(/new Scene\(/g)||[]).length,1);
 assert.match(main,/No meridian ring meshes/);
 assert.match(main,/organic plasma ribbon meshes remain the sole envelope/);
 assert.match(main,/core-shell-fusion-r201/); // active release must retain R196 single-engine invariant
 assert.match(main,/mountCoreAtAtlasSocket/);
});
test('Native Chrome covers 4 modes at 2 widths, budgets, orbit and core-off',()=>{
 assert.equal(browser.status,'PASS');
 for(const width of [1100,390]){
  for(let mode=0;mode<4;mode++){
   const x=browser.frames.find(f=>f.width===width&&f.mode===mode);
   assert.ok(x);assert.equal(x.state.canvas,1);assert.equal(x.state.error,0);
   assert.equal(x.state.filaments,0);
   assert.equal(x.state.nodeForks,12);
   assert.equal(x.state.nodePhotons,6);
   assert.equal(x.state.plasmaVersion,'core-balance-r196');
   assert.equal(x.state.palette,'violet,cyan,dark-blue,green');
  }
  const off=browser.frames.find(f=>f.width===width&&f.coreZero);
  assert.equal(off?.coreZero.forks,0);assert.equal(off?.coreZero.photons,0);
  for(const profile of ['economy','balanced','ultra']){
   const x=browser.frames.find(f=>f.width===width&&f.profile===profile);
   assert.ok(x);assert.equal(x.budget.error,0);
  }
 }
 for(const pose of ['front','side','above'])assert.ok(browser.frames.some(f=>f.pose===pose));
});
test('Native central saturated area reduced, bright nucleus remains and chromatic energy persists',()=>{
 assert.ok(metrics.next.white < metrics.base.white*.8,'core still clipped');
 assert.ok(metrics.next.white > 100,'nucleus extinguished');
 assert.ok(metrics.next.colored >= metrics.base.colored*.72,'chromatic detail disappeared');
 for(const d of metrics.diffs)assert.ok(d.changedPercent>4,'weak R196 visual delta '+d.width);
});
function hue(r,g,b){
 const max=Math.max(r,g,b),min=Math.min(r,g,b),range=max-min;
 if(max<55||range<32)return null;
 let h;
 if(max===r)h=((g-b)/range)%6;
 else if(max===g)h=(b-r)/range+2;
 else h=(r-g)/range+4;
 return (h*60+360)%360;
}
test('The GPU screenshot still visibly contains violet cyan dark blue and green',()=>{
 const p=decodePNG(read('evidence/r196-core-core0-1100.png'));
 const colors={violet:0,cyan:0,blue:0,green:0};
 for(let y=170;y<760;y+=2)for(let x=95;x<675;x+=2){
  const k=(y*p.w+x)*p.bpp,h=hue(p.pixels[k],p.pixels[k+1],p.pixels[k+2]);
  if(h===null)continue;
  if(h>=255&&h<345)colors.violet++;
  if(h>=170&&h<211)colors.cyan++;
  if(h>=211&&h<255)colors.blue++;
  if(h>=75&&h<170)colors.green++;
 }
 for(const [name,n] of Object.entries(colors))assert.ok(n>40,name+' only '+n+' pixels');
});
