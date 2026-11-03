import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {sampleSphereStructuralMotion} from '../src/sphere-structural-motion.mjs';

const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('R202.54 coherent three-axis motion moves the entire existing sphere, not its lights',()=>{
 const start=sampleSphereStructuralMotion(0);
 const later=sampleSphereStructuralMotion(12);
 assert.ok(Math.abs(later.yaw-start.yaw)>.4);
 assert.ok(Math.abs(later.pitch-start.pitch)>.02);
 assert.ok(Math.abs(later.roll-start.roll)>.01);
 for(let t=0;t<=180;t+=.5){
  const m=sampleSphereStructuralMotion(t);
  assert.ok(m.scale>.98&&m.scale<1.02);
  assert.ok(Math.abs(m.pitch)<=.091&&Math.abs(m.roll)<=.056);
  assert.ok(Object.values(m).every(Number.isFinite));
 }
 assert.deepEqual(sampleSphereStructuralMotion(12),sampleSphereStructuralMotion(12));
});

test('R202.54 reduced-motion and invalid input fail safely',()=>{
 assert.deepEqual(sampleSphereStructuralMotion(0),sampleSphereStructuralMotion(90,{reducedMotion:true}));
 for(const t of [-1,NaN,Infinity])assert.throws(()=>sampleSphereStructuralMotion(t),/STRUCTURAL_TIME_INVALID/);
});

test('R202.54 core and its exact facet mask follow the same root and local transform',()=>{
 assert.match(source,/import \{sampleSphereStructuralMotion\} from '\.\/sphere-structural-motion\.mjs';/);
 assert.match(source,/\[core,coreDepthMask,halo,/);
 assert.match(source,/sphereRoot\.rotation\.set\(spatial\.pitch,spatial\.yaw,spatial\.roll\)/);
 assert.match(source,/sphereRoot\.scaling\.setAll\(spatial\.scale\)/);
 assert.match(source,/coreDepthMask\.scaling\.copyFrom\(core\.scaling\)/);
 assert.match(source,/coreDepthMask\.rotation\.copyFrom\(core\.rotation\)/);
 assert.equal((source.match(/new Engine\(/g)||[]).length,1);
 assert.equal((source.match(/new Scene\(/g)||[]).length,1);
});
