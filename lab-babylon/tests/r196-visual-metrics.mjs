import {readFileSync,writeFileSync} from 'node:fs';
import {comparePngPixels,decodePNG} from '../../tests/siteforge_r174_png_diff.mjs';
const file=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
function countCenter(n){
 const img=decodePNG(file(n));
 let white=0,bright=0,colored=0,total=0;
 const bounds={x1:320,x2:425,y1:415,y2:555};
 for(let y=bounds.y1;y<bounds.y2;y++)for(let x=bounds.x1;x<bounds.x2;x++){
  const k=(y*img.w+x)*img.bpp,r=img.pixels[k],g=img.pixels[k+1],b=img.pixels[k+2];
  if(r>230&&g>230&&b>230)white++;
  if((r+g+b)/3>150)bright++;
  if(Math.max(r,g,b)>110&&Math.max(r,g,b)-Math.min(r,g,b)>50)colored++;
  total++;
 }
 return {name:n,bounds,total,white,bright,colored};
}
const base=countCenter('r195-fork-core0-1100.png'),next=countCenter('r196-core-core0-1100.png');
const diffs=[1100,390].map(width=>{
 const m=comparePngPixels(file('r195-fork-core0-'+width+'.png'),file('r196-core-core0-'+width+'.png'));
 return {width,changed:m.changed,changedPercent:m.changedPercent};
});
const result={schema:'synestra.lab.r196.visual-delta.v1',reference:'R195@277c7054e5becd6c0cd923a87428bc9ad222f39d',region:'desktop center rectangular ROI, not reference image',base,next,diffs};
console.log('R196_VISUAL_METRICS',JSON.stringify(result));
if(diffs.some(x=>x.changedPercent<=1))throw Error('NO_SIGNIFICANT_R196_RENDER_DELTA');
if(!(next.white<base.white))throw Error('NUCLEUS_NOT_LESS_SATURATED');
if(!(next.white>15))throw Error('LUMINOUS_NUCLEUS_MISSING');
writeFileSync(new URL('../evidence/R196_VISUAL_METRICS.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
