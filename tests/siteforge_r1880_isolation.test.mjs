import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const baseline=readFileSync(new URL('../siteforge-r1879-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const candidate=readFileSync(new URL('../siteforge-r1880-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const shaderBranch=s=>{const start=s.indexOf('if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){'),end=s.indexOf('if(uPass>3.5&&uPass<4.5){',start+1);assert.ok(start>0&&end>start);return s.slice(start,end)};
test('strict CSP hash remains exact',()=>{
 const script=candidate.match(/<script>([\s\S]*?)<\/script>/)?.[1];
 const hash=candidate.match(/script-src 'sha256-([^']+)'/)?.[1];
 assert.ok(script&&hash);
 assert.equal(hash,createHash('sha256').update(script).digest('base64'));
 assert.ok(!candidate.includes("script-src 'unsafe-inline'"));
});
test('all seven materials and prior data schema preserved',()=>{
 for(const field of ['sphere','mote','flow']){
  const regex=new RegExp('data-'+field+'-control="([^"]+)"','g');
  assert.deepEqual([...candidate.matchAll(regex)].map(x=>x[1]).sort(),[...baseline.matchAll(regex)].map(x=>x[1]).sort());
 }
 assert.equal((candidate.match(/data-energy-color="/g)||[]).length,3);
 assert.equal((candidate.match(/<option value="[0-6]"/g)||[]).length,(baseline.match(/<option value="[0-6]"/g)||[]).length);
 assert.ok(candidate.includes("schema:'synestra.siteforge.plasma-settings.v1'"));
});
test('adaptive ray step respects modes, reference quality unchanged',()=>{
 const block=shaderBranch(candidate);
 assert.ok(block.includes('float stepsNeon=clamp(max(uEnergySteps,widthNeon<.48?30.:24.),24.,40.);'));
 assert.ok(!block.includes('float stepsNeon=max(34.,uVolumeSteps);'));
 assert.ok(candidate.includes("qualityMode==='quality'?40"));
 assert.ok(candidate.includes("qualityMode==='performance'?(mobile?24:26)"));
 assert.ok(candidate.includes("qualityMode==='auto'?Math.max(mobile?26:28"));
 assert.ok(candidate.includes(")):34;"));
 assert.ok(candidate.includes("gl.uniform1f(U.uEnergySteps,actualEnergySamples)"));
});
test('expensive 6-8 paths do not execute when only 3-5 are selected',()=>{
 const block=shaderBranch(candidate);
 const start=block.indexOf('if(flowCount>5.5){');
 const a=block.indexOf('vec3 f=',start),cross=block.indexOf('float crossing=',a);
 assert.ok(start>=0&&a>start&&cross>a);
 assert.ok(block.slice(start,cross).includes('float lH=')===false);
 assert.ok(block.includes('float lF=0.,lG=0.,lH=0.;'));
 assert.ok(block.includes('float onF=0.,onG=0.,onH=0.;'));
 assert.ok(block.includes('lF=(fCore*'));
});
test('telemetry display cannot delete the 3D canvas, color uploads cached',()=>{
 assert.ok(candidate.includes('stage.dataset.energyRaySamples=String(actualEnergySamples)'));
 assert.ok(candidate.includes("document.querySelector('output[data-energy-samples]')"));
 assert.ok(!candidate.includes('stage.dataset.energySamples='));
 assert.ok(candidate.includes('gl.uniform3fv(U.uEnergyA,gpuEnergyColors.a)'));
 assert.ok(candidate.includes('gl.uniform3fv(U.uEnergyB,gpuEnergyColors.b)'));
 assert.ok(candidate.includes('gl.uniform3fv(U.uEnergyCore,gpuEnergyColors.core)'));
 assert.equal(candidate.match(/<canvas class="core-r109-canvas"/g)?.length,1);
});
