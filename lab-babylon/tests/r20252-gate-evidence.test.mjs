import test from 'node:test';
import assert from 'node:assert/strict';
import {classifySnapshotEvidence} from '../scripts/r20252-gate-evidence.mjs';

const frame=(frame,power,uiDelta,facetDelta)=>({
  frame,power,candidate_minus_baseline:{
    ui_control:{mean:uiDelta},facet_focus:{mean:facetDelta}
  }
});
const nominal=()=>[frame(6,145,0,-13),frame(18,145,0,-12),frame(6,0,0,0)];

test('R202.52 gate semantics: unchanged mean is not native off/UI evidence',()=>{
  const gates=classifySnapshotEvidence(nominal());
  assert.equal(gates.ui_control_mean_delta,'PASS');
  assert.equal(gates.power_off_mean_delta,'PASS');
  assert.equal(gates.ui_control,'NOT_ATTESTED');
  assert.equal(gates.power_off,'NOT_ATTESTED');
});

test('R202.52 negative: power-off equal averages cannot prove actual shutdown',()=>{
  // Both baseline and candidate can have mean 50 at power=0; comparison still returns 0.
  const gates=classifySnapshotEvidence(nominal());
  assert.equal(gates.power_off,'NOT_ATTESTED');
});

test('R202.52 negative: spatially swapped UI pixels with same mean remain not attested',()=>{
  // A spatial permutation [5,15]->[15,5] produces delta mean 0.
  const gates=classifySnapshotEvidence(nominal());
  assert.equal(gates.ui_control,'NOT_ATTESTED');
});

test('R202.52 negative: changed UI mean is FAIL',()=>{
  const gates=classifySnapshotEvidence([frame(6,145,.5,-13),frame(18,145,0,-12),frame(6,0,0,0)]);
  assert.equal(gates.ui_control_mean_delta,'FAIL');
  assert.equal(gates.ui_control,'FAIL');
});

test('R202.52 negative: changed off-frame mean is FAIL',()=>{
  const gates=classifySnapshotEvidence([frame(6,145,0,-13),frame(18,145,0,-12),frame(6,0,0,.5)]);
  assert.equal(gates.power_off_mean_delta,'FAIL');
  assert.equal(gates.power_off,'FAIL');
});

test('R202.52 fail closed: missing or duplicate off frame',()=>{
  assert.throws(()=>classifySnapshotEvidence([frame(6,145,0,-13)]),/R20252_POWER_OFF_COMPARISON_AMBIGUOUS/);
  assert.throws(()=>classifySnapshotEvidence([...nominal(),frame(18,0,0,0)]),/R20252_POWER_OFF_COMPARISON_AMBIGUOUS/);
});

test('R202.52 fail closed: corrupt or nonnumeric input',()=>{
  assert.throws(()=>classifySnapshotEvidence([frame(6,145,NaN,0),frame(6,0,0,0)]),/R20252_UI_MEAN_DELTA_INVALID/);
  assert.throws(()=>classifySnapshotEvidence([frame(6,145,0,0),frame(6,0,0,NaN)]),/R20252_POWER_OFF_DELTA_INVALID/);
  assert.throws(()=>classifySnapshotEvidence([]),/R20252_EVIDENCE_INPUT_INVALID/);
});
