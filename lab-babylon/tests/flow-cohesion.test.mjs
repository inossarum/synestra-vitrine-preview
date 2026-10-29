import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {Vector3} from '@babylonjs/core';
import {organicPlasmaCenterline} from '../src/plasma-ribbons.js';
import {shellAnchorPair,shellCoverageMetrics} from '../src/shell-coverage.js';
import {comparePngPixels} from '../../tests/siteforge_r174_png_diff.mjs';
const dirs=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]].map(p=>new Vector3(...p).normalize());
const image=n=>readFileSync(new URL('../evidence/'+n,import.meta.url));
test('R198 convergence keeps 28 individual surface anchor pairs, both ends unchanged',()=>{
 assert.equal(shellCoverageMetrics(28).occupiedOctants,8);
 for(let i=0;i<28;i++){
  const path=organicPlasmaCenterline(i,1.4,dirs),[a,b]=shellAnchorPair(i);
  assert.equal(path.length,85);
  assert.ok(path.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z)));
  assert.ok(Vector3.Distance(path[0],new Vector3(...a).scale(1.54))<1e-7,'start moved '+i);
  assert.ok(Vector3.Distance(path.at(-1),new Vector3(...b).scale(1.54))<1e-6,'end moved '+i);
 }
});
test('R198 convergence field increases mean midpoint alignment to shared knots', {skip:!process.env.SYNESTRA_R197_PLASMA_SOURCE&&'R197 source unavailable'}, async()=>{
 const prior=await import(pathToFileURL(process.env.SYNESTRA_R197_PLASMA_SOURCE).href);
 let newProjection=0,oldProjection=0;
 for(let i=0;i<28;i++){
  const node=dirs[Math.floor(i/4)%dirs.length];
  const current=organicPlasmaCenterline(i,1.4,dirs)[42].normalize();
  const previous=prior.organicPlasmaCenterline(i,1.4,dirs)[42].normalize();
  newProjection+=Vector3.Dot(current,node);
  oldProjection+=Vector3.Dot(previous,node);
 }
 const gain=(newProjection-oldProjection)/28;
 console.log('R198_COHESION_PROJECTION_GAIN',gain);
 assert.ok(gain>.06,'convergence field too weak: '+gain);
});
test('Native R198 Chrome: 4 modes, 3 graphics budgets, 3 camera angles',()=>{
 const b=JSON.parse(image('R198_COHESION_BROWSER.json'));
 assert.equal(b.status,'PASS');
 assert.equal(b.frames.filter(f=>Number.isInteger(f.mode)).length,8);
 assert.equal(b.frames.filter(f=>f.profile).length,6);
 assert.equal(b.frames.filter(f=>f.pose).length,3);
 for(const f of b.frames.filter(f=>Number.isInteger(f.mode))){
  assert.equal(f.state.error,0);
  assert.equal(f.state.canvas,1);
  assert.equal(f.state.palette,'violet,cyan,dark-blue,green');
  assert.equal(f.state.plasmaRibbons,28);
 }
 for(const width of [1100,390]){
  const off=b.frames.find(f=>f.width===width&&f.coreZero);
  assert.ok(off);assert.equal(off.coreZero.forks,0);assert.equal(off.coreZero.photons,0);
 }
});
test('Real R198 screenshots change visible spatial distribution, not just JS',()=>{
 for(const width of [1100,390]){
  const delta=comparePngPixels(image('r197-shell-core0-'+width+'.png'),image('r198-cohesion-core0-'+width+'.png'));
  console.log('R198_PIXEL_DELTA',width,delta.changedPercent);
  assert.ok(delta.changedPercent>2);
 }
});
