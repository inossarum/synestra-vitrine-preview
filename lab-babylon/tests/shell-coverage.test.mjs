import test from 'node:test';
import assert from 'node:assert/strict';
import {shellAnchor,shellAnchorPair,shellCoverageMetrics,R197_RIBBONS} from '../src/shell-coverage.js';
const eps = 1e-10;
const magnitude = p => Math.hypot(...p);

test('28 unique sphere anchors, unit radius, both hemispheres',()=>{
  const points=Array.from({length:R197_RIBBONS},(_,i)=>shellAnchor(i));
  assert.equal(new Set(points.map(p=>p.map(x=>x.toFixed(7)).join(','))).size,28);
  assert.ok(points.every(p=>Math.abs(magnitude(p)-1)<eps));
  const coverage=shellCoverageMetrics(28);
  assert.equal(coverage.occupiedOctants,8);
  assert.equal(coverage.north,14);
  assert.equal(coverage.south,14);
  assert.ok(coverage.octants.every(n=>n>=3));
});
test('first eight ribbons spread across the sphere at economy quality',()=>{
  const coverage=shellCoverageMetrics(8);
  assert.ok(coverage.occupiedOctants>=7);
  assert.ok(coverage.north>=3&&coverage.south>=3);
});
test('balanced and ultra use the full volume without extra ribbons',()=>{
  for(const n of [12,22,26,28]) assert.equal(shellCoverageMetrics(n).occupiedOctants,8);
  assert.equal(R197_RIBBONS,28);
});
test('28 diverse paired endpoints, never coincident, deterministic',()=>{
  const pairs=Array.from({length:28},(_,i)=>shellAnchorPair(i));
  assert.deepEqual(shellAnchorPair(12),shellAnchorPair(12));
  assert.ok(pairs.every(([a,b])=>Math.abs(magnitude(b)-1)<eps && Math.hypot(...a.map((x,i)=>x-b[i]))>.5));
  assert.equal(new Set(pairs.map(([a,b])=>b.map(x=>x.toFixed(7)).join(','))).size,28);
});
test('bad inputs fail clearly, no silent NaN geometry',()=>{
  for(const x of [-1,.2,NaN,Infinity]) assert.throws(()=>shellAnchor(x),/R197_INVALID_INDEX/);
  for(const x of [0,29,2.2]) assert.throws(()=>shellCoverageMetrics(x),/R197_INVALID_ACTIVE_RIBBONS/);
});
