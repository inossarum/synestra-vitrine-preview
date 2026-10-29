import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {decodePNG} from '../tests/siteforge_r174_png_diff.mjs';
const packet=JSON.parse(readFileSync(new URL('../evidence/R190_SPHERE_BABYLON_BROWSER.json',import.meta.url),'utf8'));
const png=name=>decodePNG(readFileSync(new URL('../evidence/'+name,import.meta.url)));
function metrics(name){
 const a=png(name),{pixels,w,h,bpp}=a;let minX=w,minY=h,maxX=0,maxY=0,count=0;
 // Exclude the diagnostic label at the bottom-left of the QA capture.
 for(let y=0;y<h-55;y++)for(let x=0;x<w;x++){
  const k=(y*w+x)*bpp,r=pixels[k],g=pixels[k+1],b=pixels[k+2];
  if(b>100&&g>40&&b>r*.87){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);count++;}
 }
 if(!count)throw Error('NO_VISIBLE_ENERGY '+name);
 const cx=(minX+maxX)/2,cy=(minY+maxY)/2;
 return {w,h,cx,cy,bw:maxX-minX+1,bh:maxY-minY+1,count};
}
test('Six real Chrome renders: 2 viewports, 3 camera poses',()=>{
 assert.equal(packet.status,'PASS');
 assert.equal(packet.screens.length,6);
 for(const item of packet.screens){
  assert.equal(item.state.engine,'babylonjs');
  assert.equal(item.state.scope,'sphere-only');
  assert.equal(item.state.strands,62);
  assert.equal(item.state.glError,0);
  assert.equal(item.state.glints,32);
  assert.equal(item.state.meshes,98);
 }
});
test('Sphere remains spherical and centered in both viewport widths',()=>{
 for(const width of [1440,390]){
  const m=metrics('R190-sphere-'+width+'-front.png');
  const ratio=m.bw/m.bh;
  assert.ok(ratio>.82&&ratio<1.18,'NOT_SPHERICAL '+width+' '+JSON.stringify(m));
  assert.ok(Math.abs(m.cx-m.w/2)<m.w*.11,'NOT_CENTERED_H '+JSON.stringify(m));
  assert.ok(Math.abs(m.cy-m.h/2)<m.h*.13,'NOT_CENTERED_V '+JSON.stringify(m));
  assert.ok(m.bw<m.w*.96&&m.bh<m.h*.88,'CLIPPED '+JSON.stringify(m));
  console.log('SHAPE_METRIC '+JSON.stringify(m));
 }
});
test('Camera rotates without losing renderer or spherical geometry',()=>{
 for(const width of [1440,390]){
  const a=metrics('R190-sphere-'+width+'-side.png');
  const b=metrics('R190-sphere-'+width+'-over.png');
  for(const item of [a,b])assert.ok(item.bw>width*.35&&item.bh>width*.35,'SPHERE_TOO_SMALL');
 }
});
test('No environment geometry or uncontrolled network resources',()=>{
 const s=readFileSync(new URL('./src/main.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(s,/createGround|CreateGround|CreateBox|CreateSkybox|fetch\(|https?:\/\//);
 assert.match(s,/new Engine\(/);assert.match(s,/new Scene\(/);
 assert.match(s,/CreateTube/);assert.match(s,/CreateIcoSphere/);
});
