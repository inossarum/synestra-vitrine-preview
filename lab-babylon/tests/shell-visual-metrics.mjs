import {readFileSync,writeFileSync} from 'node:fs';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
import {shellCoverageMetrics} from '../src/shell-coverage.js';
const read=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
const packet=JSON.parse(read('R197_SHELL_BROWSER.json'));
if(packet.status!=='PASS')throw Error('R197_BROWSER_NOT_PASS');
const compare=(before,after)=>{
 const d=comparePngPixels(read(before),read(after));
 return {before,after,changed:d.changed,changedPercent:d.changedPercent,majorPercent:d.majorPercent};
};
const report={
 schema:'synestra.lab.r197.shell-visual-metrics.v1',
 base:'R196@2ee6097ffeebdb2699f9a9222c884f686aa862b1',
 artReference:'SYN_SPHERE_ART_REFERENCE_20261029',
 scope:'sphere shell only, nucleus kept untouched',
 comparisons:[
  compare('r196-core-core0-1100.png','r197-shell-core0-1100.png'),
  compare('r196-core-core0-390.png','r197-shell-core0-390.png')
 ],
 orbit:[
  compare('r197-orbit-front-1100.png','r197-orbit-side-1100.png'),
  compare('r197-orbit-front-1100.png','r197-orbit-above-1100.png')
 ],
 coverage:{economy:shellCoverageMetrics(8),balanced:shellCoverageMetrics(26),ultra:shellCoverageMetrics(28)},
 checks:{
  nucleusModes:packet.frames.filter(x=>Number.isInteger(x.mode)).length,
  qualityModes:packet.frames.filter(x=>x.profile).length,
  cameraPoses:packet.frames.filter(x=>x.pose).length,
  powerZeroCases:packet.frames.filter(x=>x.coreZero).length,
  gpuErrorCount:packet.frames.filter(x=>x.state?.error!==undefined&&x.state.error!==0).length
 },
 caveat:'Differences and anchor octants are not proof of exact artistic reference fidelity; mobile 390 is viewport emulation.'
};
if(report.comparisons.some(x=>x.changedPercent<=2))throw Error('R197_RENDER_DELTA_TOO_SMALL');
if(report.orbit.some(x=>x.changedPercent<=2))throw Error('R197_ORBIT_NOT_3D');
if(report.checks.gpuErrorCount!==0)throw Error('R197_GPU_ERROR');
writeFileSync(new URL('../evidence/R197_SHELL_METRICS.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log('R197_VISUAL_METRICS_PASS '+JSON.stringify(report));
