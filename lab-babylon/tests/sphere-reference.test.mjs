import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SPHERE_REFERENCE} from '../src/reference-contract.js';
import {decodePNG,comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const local=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
const packet=JSON.parse(local('R191_REFERENCE_BROWSER.json').toString('utf8'));

test('Owner artistic reference explicit, scoped sphere-only, with four logo hues',()=>{
 assert.equal(SPHERE_REFERENCE.version,'1.0.0');
 assert.equal(SPHERE_REFERENCE.imageSha256,'584e2e8ac90e5fab3996ad1047cdf9e66586f910952b9514b4f5e3927b36b881');
 assert.deepEqual(SPHERE_REFERENCE.colors.map(x=>x.id),['violet','cyan','dark-blue','green']);
 assert.equal(SPHERE_REFERENCE.energyNodes,6);
 assert.ok(SPHERE_REFERENCE.exclusions.includes('platform'));
 assert.equal(SPHERE_REFERENCE.sceneScope,'sphere-only');
});

test('R191 real native browser GPU, four forms, desktop and mobile; single renderer',()=>{
 assert.equal(packet.status,'PASS'); assert.equal(packet.frames.length,8);
 for(const width of [1100,390]){
  for(let mode=0;mode<4;mode++){
   const frame=packet.frames.find(f=>f.width===width&&f.mode===mode);
   assert.ok(frame,'missing '+width+' mode '+mode);
   assert.equal(frame.state.error,0);
   assert.equal(frame.state.canvas,1);
   assert.equal(frame.state.energyNodes,6);
   assert.equal(frame.state.palette,'violet,cyan,dark-blue,green');
   assert.equal(frame.state.artReference,SPHERE_REFERENCE.id);
  }
 }
});
function hue(r,g,b){
 r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min;
 const saturation=max===0?0:delta/max;
 if(max<.20||saturation<.37)return null;
 let h;if(max===r)h=((g-b)/delta)%6;else if(max===g)h=(b-r)/delta+2;else h=(r-g)/delta+4;
 h=(h*60+360)%360;return h;
}
function countChroma(buffer){
 const image=decodePNG(buffer);const counts={violet:0,cyan:0,'dark-blue':0,green:0,white:0};
 // desktop screenshot: include only the left render stage, excluding the UI controls.
 const xmin=Math.floor(image.w*.055),xmax=Math.floor(image.w*.63);
 const ymin=Math.floor(image.h*.19),ymax=Math.floor(image.h*.85);
 for(let y=ymin;y<ymax;y+=2)for(let x=xmin;x<xmax;x+=2){
  const i=(y*image.w+x)*image.bpp;
  const r=image.pixels[i],g=image.pixels[i+1],b=image.pixels[i+2];
  if(r>195&&g>195&&b>195){counts.white++;continue;}
  const h=hue(r,g,b);if(h===null)continue;
  if(h>=255&&h<345)counts.violet++;
  if(h>=170&&h<211)counts.cyan++;
  if(h>=211&&h<255)counts['dark-blue']++;
  if(h>=75&&h<170)counts.green++;
 }
 return counts;
}
test('Rendered sphere shows all four reference chromatic families, not metadata only',()=>{
 const result=countChroma(local('r191-reference-core0-1100.png'));
 for(const key of ['violet','cyan','dark-blue','green'])assert.ok(result[key]>50,key+' pixels: '+JSON.stringify(result));
 assert.ok(result.white>20,'central white nucleus '+JSON.stringify(result));
});
test('Four nucleus modes remain visually distinct with fixed frame',()=>{
 for(const width of [1100,390]){
  const shots=[0,1,2,3].map(m=>local('r191-reference-core'+m+'-'+width+'.png'));
  for(let mode=1;mode<4;mode++)assert.ok(comparePngPixels(shots[0],shots[mode]).changed>200,'mode delta '+width+' '+mode);
 }
});
