import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {decodePNG} from './siteforge_r174_png_diff.mjs';
const source=name=>readFileSync(new URL('../'+name,import.meta.url));
const original=source('siteforge-r1884-autonome.html').toString('utf8');
const candidate=source('siteforge-r1885-autonome.html').toString('utf8');
test('R188.5 is SHA-anchored LAB-only, no original source mutation',()=>{
 assert.equal(createHash('sha256').update(source('siteforge-r1884-autonome.html')).digest('hex'),
  'faa9a7a50ebda90e2d417063004abc7a1fe1fed300854054eb562a8aae3b8cab');
 assert.match(candidate,/LAB R188\.5/);
 assert.match(original,/LAB R188\.4/);
 assert.equal((candidate.match(/<canvas /g)||[]).length,(original.match(/<canvas /g)||[]).length);
 assert.equal((candidate.match(/new WebGLRenderingContext/g)||[]).length,0);
});
test('Nucleus restored in real R187/R188 energy branch 6..8, not only 0..5',()=>{
 const begin=candidate.indexOf('if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5)');
 const end=candidate.indexOf('if(uPass>3.5&&uPass<4.5){',begin);
 assert.ok(begin>=0&&end>begin,'Energy branch bounds required');
 const branch=candidate.slice(begin,end);
 for(const clause of ['float centralPower=clamp(uShape.w,0.,5.);',
  'float centralSize=clamp(uShape.z,0.,2.);',
  'float centralEnabled=step(.001,centralPower)*step(.001,centralSize);',
  'float centralOrb=1.-smoothstep(.56,1.10,cr);',
  'Lneon+=centralWhite*','centralEnabled*(centralOrb*.85+centralHalo*.22)']){
  assert.ok(branch.includes(clause),clause);
 }
 assert.doesNotMatch(original,/centralOrb/);
 assert.match(candidate,/vec3 coreLight=coreWhite/);
 assert.match(candidate,/uEnergyCore/);
});
test('Existing CSP remains strict and matches its modified single script',()=>{
 const script=candidate.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 assert.ok(script);
 assert.ok(candidate.includes("script-src 'sha256-"+createHash('sha256').update(script).digest('base64')+"'"));
 assert.doesNotMatch(candidate,/script-src[^;]*'unsafe-inline'/);
 const options=candidate.match(/<select id="sf-flowType"[^>]*>([\s\S]*?)<\/select>/)?.[1];
 assert.deepEqual([...options.matchAll(/<option value="(\d+)"/g)].map(x=>Number(x[1])),[0,1,2,3,4,5,6,7,8]);
});
function brightNucleusPixels(name){
 const pic=decodePNG(source('evidence/'+name));let bright=0;
 for(let y=Math.floor(pic.h*.40);y<Math.ceil(pic.h*.60);y++)
 for(let x=Math.floor(pic.w*.40);x<Math.ceil(pic.w*.60);x++){
  const k=(y*pic.w+x)*pic.bpp;
  if((pic.pixels[k]+pic.pixels[k+1]+pic.pixels[k+2])/3>190)bright++;
 }
 return bright;
}
test('Actual Chrome RTX3090 material 6 central light is distinguishable at both viewports',()=>{
 for(const width of [1100,390]){
  const before=brightNucleusPixels('r1885-1884-'+width+'.png');
  const after=brightNucleusPixels('r1885-1885-'+width+'.png');
  assert.ok(after>before+350,'nucleus not visible '+width+' before='+before+' after='+after);
  const powerOff=brightNucleusPixels('r1885-power-zero-'+width+'.png');
  const sizeOff=brightNucleusPixels('r1885-size-zero-'+width+'.png');
  assert.ok(after>powerOff+350,'power control ineffective '+width+': '+after+' <= '+powerOff);
  assert.ok(after>sizeOff+350,'size control ineffective '+width+': '+after+' <= '+sizeOff);
 }
});

test('Native RTX3090 E2E also covers legacy material 0 and polar family 8',()=>{
 const packet=JSON.parse(source('evidence/SITEFORGE_LAB_R1885_BROWSER_20261029.json').toString('utf8'));
 assert.equal(packet.status,'PASS');
 for(const family of [0,8]){
  const frame=packet.screens.find(x=>x.family===family);
  assert.ok(frame,'missing family '+family);
  assert.equal(frame.state.error,0);
  assert.ok(frame.name.endsWith('.png'));
 }
 for(const width of [1100,390]){
  for(const control of ['sf-coreLight','sf-coreSize'])
   assert.ok(packet.screens.some(x=>x.width===width&&x.control===control&&x.state.error===0),control+' '+width);
 }
});
