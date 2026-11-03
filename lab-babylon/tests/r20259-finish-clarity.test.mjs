import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {r20215VolumePolicy} from '../src/plasma-volume-policy.mjs';
const ribbons=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
const volume=readFileSync(new URL('../src/plasma-volume-r20215.js',import.meta.url),'utf8');

test('final candidate keeps the luminous core and lowers the obscuring shell without removing volume',()=>{
 const profiles=['economy','balanced','auto','ultra'].map(quality=>r20215VolumePolicy(quality,1.45,1));
 assert.ok(profiles.every(p=>p.visible&&Number.isFinite(p.opacity)&&p.opacity>0));
 assert.ok(profiles[0].opacity<profiles[1].opacity&&profiles[1].opacity<=profiles[3].opacity);
 assert.ok(profiles[1].opacity>=.37&&profiles[1].opacity<=.43,'balanced fog must be materially lower than R202.58');
 assert.ok(profiles[3].opacity<=.50);
 for(const quality of ['economy','balanced','auto','ultra'])assert.deepEqual(r20215VolumePolicy(quality,0,1),{visible:false,steps:r20215VolumePolicy(quality,1,1).steps,opacity:0});
 assert.match(volume,/float coreRadiance=1\.48\*clamp\(uCorePower,0\.0,2\.5\)\*coreRayIntegral\*coreTransmission;/);
});
test('final candidate retains 14 existing soft sheaths but contracts their widths',()=>{
 assert.equal((ribbons.match(/organicPlasmaRibbonPaths\(path,i,0,2\.35\)/g)||[]).length,1);
 assert.equal((ribbons.match(/organicPlasmaRibbonPaths\(organicPlasmaCenterline\(i,time,nodes,mode,transitionWeights\),i,time,2\.35\)/g)||[]).length,1);
 assert.match(ribbons,/for\(let i=0;i<Math\.min\(14,count\);i\+\+\)/);
 assert.match(ribbons,/const sheathBudget=quality==='economy'\?0:quality==='ultra'\?sheaths\.length:Math\.min\(10,sheaths\.length\);/);
});

test('the final faceted white-violet nucleus remains independently legible with zero-power fail closed',()=>{
 const heart=readFileSync(new URL('../src/plasma-field.js',import.meta.url),'utf8');
 assert.match(heart,/float finalFacetHighlight=smoothstep\(\.32,\.80,facetLight\)\*smoothstep\(\.24,\.84,face\);/);
 assert.match(heart,/coreEmission\+=vec3\(1\.02,1\.08,1\.24\)\*finalFacetHighlight\*powerRamp;/);
 assert.match(heart,/alpha=clamp\(alpha\+\.075\*finalFacetHighlight\*powerRamp,0\.0,\.79\);/);
 assert.equal((heart.match(/new ShaderMaterial\(/g)||[]).length,2);
 const smooth=(lo,hi,x)=>{const t=Math.max(0,Math.min(1,(x-lo)/(hi-lo)));return t*t*(3-2*t)};
 const lift=(facet,face,power)=>smooth(.32,.80,facet)*smooth(.24,.84,face)*smooth(.2,1,power);
 for(const power of [0,.1,.2])assert.equal(lift(1,1,power),0);
 assert.ok(lift(.72,.9,1.45)>.75);
 assert.equal(lift(.15,.7,1.45),0);
});
