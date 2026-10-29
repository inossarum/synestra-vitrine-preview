import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {evolveAdaptiveBudget} from '../r204-build/adaptive-tier.mjs';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const scene=readFileSync(join(root,'r204-build/scene.mjs'),'utf8');
const start={currentTier:3,slowWindows:0,fastWindows:0,quality:1,frameMs:35,targetIntervalMs:20};

test('Three consecutive slow windows downgrade effective tier and shader samples, not GPU hardware classification',()=>{
 let s=start;for(let i=0;i<3;i++){const r=evolveAdaptiveBudget(s);s={...s,currentTier:r.tier,slowWindows:r.slowWindows,fastWindows:r.fastWindows,quality:r.quality};}
 assert.equal(s.currentTier,2);assert.equal(s.quality,.9);assert.equal(s.slowWindows,0);
 assert.match(scene,/stage\.dataset\.gpuTier=String\(renderTier\)/);
 assert.match(scene,/stage\.dataset\.renderTier=String\(renderTier\)/);
 assert.match(scene,/uniforms\.uEnergySteps\.value=budget\[renderTier\]/);
 assert.match(scene,/uniforms\.uVolumeSteps\.value=\[8,10,14,18\]\[renderTier\]/);
 assert.match(scene,/targetInterval=renderTier<=0\?1000\/18/);
});
test('Tier zero never turns a live WebGL scene off',()=>{
 let s={...start,currentTier:0,quality:.7};
 for(let i=0;i<20;i++){const r=evolveAdaptiveBudget(s);s={...s,currentTier:r.tier,slowWindows:r.slowWindows,fastWindows:r.fastWindows,quality:r.quality};}
 assert.equal(s.currentTier,0);assert.equal(s.quality,.6);
 assert.match(scene,/stage\.dataset\.autoTierDrops/);
});
test('Ten stable fast windows recover pixel ratio without blindly upgrading shader tier',()=>{
 let s={...start,currentTier:1,quality:.7,frameMs:12,targetIntervalMs:1000/24};
 for(let i=0;i<10;i++){const r=evolveAdaptiveBudget(s);s={...s,currentTier:r.tier,slowWindows:r.slowWindows,fastWindows:r.fastWindows,quality:r.quality};}
 assert.equal(s.currentTier,1);assert.ok(s.quality>.7);
 const stable=evolveAdaptiveBudget({...start,quality:1,fastWindows:9,frameMs:10});
 assert.equal(stable.fastWindows,0,'At full quality, fast counters must not grow without bound');
});
test('Intermediate frame latency resets degradation counters; hidden tabs reset frame baselines',()=>{
 const r=evolveAdaptiveBudget({...start,slowWindows:2,frameMs:24});
 assert.equal(r.slowWindows,0);assert.equal(r.tier,3);
 assert.match(scene,/last=now;drawStart=0;drawCount=0;slow=0;fast=0/);
});
test('Invalid tiers or frame times fail closed rather than silently raising load',()=>{
 for(const input of [{...start,currentTier:4},{...start,frameMs:-3},{...start,quality:Infinity},{...start,targetIntervalMs:0}]){
  assert.throws(()=>evolveAdaptiveBudget(input),/INVALID_R205_GPU_BUDGET/);
 }
});

test('R205 review branch preserves exact R204 export and never changes production routing',()=>{
 const exporter=readFileSync(join(root,'tools/build_vitrine_static.mjs'),'utf8');
 assert.match(exporter,/const r205ReviewBranch='task\/SYN_SITEFORGE_R205_ADAPTIVE_GPU_20261029'/);
 assert.match(exporter,/\[r204ReviewBranch,r205ReviewBranch(?:,r206ReviewBranch)?\]\.includes\(process\.env\.CF_PAGES_BRANCH\)/);
 assert.match(exporter,/\[r202ReviewBranch,r204ReviewBranch,r205ReviewBranch(?:,r206ReviewBranch)?\]\.includes\(process\.env\.CF_PAGES_BRANCH\)/);
 assert.match(exporter,/const rootFiles=\['index.html','_headers'\]/);
});
