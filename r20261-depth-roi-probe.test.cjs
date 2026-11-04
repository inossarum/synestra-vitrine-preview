'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {measureRois,compareRois}=require('./r20261-depth-roi-probe.cjs');
function canvas(w=600,h=600){
 const pixels=Buffer.alloc(w*h*4);
 for(let i=0;i<pixels.length;i+=4){pixels[i]=30;pixels[i+1]=25;pixels[i+2]=50;pixels[i+3]=255;}
 return {w,h,bpp:4,pixels};
}
test('R20261 ROI diagnostics distinguish central and exterior layers',()=>{
 const original=measureRois(canvas());
 const altered=canvas();
 const center=(Math.floor(300)*600+Math.floor(300))*4;
 altered.pixels[center]=200;altered.pixels[center+1]=190;altered.pixels[center+2]=255;
 const next=measureRois(altered),delta=compareRois(original,next);
 assert.equal(original.core.count>0,true);
 assert.equal(original.ring.count>0,true);
 assert.equal(original.outer.count>0,true);
 assert.ok(delta.core.meanLuma>0);
 assert.equal(delta.outer.meanLuma,0);
 assert.ok(delta.core.blueVsRG>0);
 assert.equal(delta.ring.meanLuma,0);
});
test('R20261 ROI metrics reject malformed images',()=>{
 assert.throws(()=>measureRois({w:10,h:10,bpp:4,pixels:Buffer.alloc(40)}),/PIXEL_BUFFER_INVALID/);
 assert.throws(()=>measureRois({w:0,h:1,bpp:4,pixels:Buffer.alloc(0)}),/IMAGE_DIMENSIONS_INVALID/);
});
