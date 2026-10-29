import {readFileSync,writeFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const file=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
const metadata=JSON.parse(file('R195_FORK_BROWSER.json').toString());
if(metadata.status!=='PASS')throw Error('R195_BROWSER_NOT_PASS');
const compare=(a,b)=>{
 const delta=comparePngPixels(file(a),file(b));
 return {before:a,after:b,pixels:delta.pixels,changed:delta.changed,changedPercent:Number(delta.changedPercent.toFixed(4)),majorPercent:Number(delta.majorPercent.toFixed(4))};
};
const report={
 schema:'synestra.lab.r195.visual-delta.v1',
 base:'R194@d052d65f338e64f4fbc0c21bc5aafe3494b7a19b',
 source:'Babylon Chrome RTX 3090 real screenshots, same labFrame=4.5',
 artRef:'SYN_SPHERE_ART_REFERENCE_20261029',
 scope:'actual A/B changes and orbit response, not proof of artistic fidelity',
 baseline:[
  compare('r194-glow-core0-1100.png','r195-fork-core0-1100.png'),
  compare('r194-glow-core0-390.png','r195-fork-core0-390.png')
 ],
 orbit:[
  compare('r195-orbit-front-1100.png','r195-orbit-side-1100.png'),
  compare('r195-orbit-front-1100.png','r195-orbit-above-1100.png')
 ],
 browser:{
  nucleusModes:metadata.frames.filter(x=>Number.isInteger(x.mode)).length,
  qualityCases:metadata.frames.filter(x=>x.profile).length,
  cameraPoses:metadata.frames.filter(x=>x.pose).length,
  zeroPowerCases:metadata.frames.filter(x=>x.coreZero).length,
  errors:metadata.frames.filter(x=>x.state?.error!==undefined&&x.state.error!==0).length
 }
};
if(report.baseline.some(x=>x.changedPercent<1))throw Error('INSUFFICIENT_RENDER_DELTA');
if(report.orbit.some(x=>x.changedPercent<1))throw Error('NO_ORBIT_RESPONSE');
if(report.browser.errors)throw Error('BROWSER_GPU_ERROR');
writeFileSync(new URL('../evidence/R195_VISUAL_METRICS.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log('R195_VISUAL_METRICS_PASS '+JSON.stringify(report));
