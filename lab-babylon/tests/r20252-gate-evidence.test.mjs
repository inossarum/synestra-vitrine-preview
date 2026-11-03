import test from 'node:test';
import assert from 'node:assert/strict';
import {classifySnapshotEvidence,compareRoiRgb} from '../scripts/r20252-gate-evidence.mjs';

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

const mean=samples=>samples.reduce((total,value)=>total+value,0)/samples.length;
const measuredFrame=(frameId,power,uiReference,uiCandidate,facetReference,facetCandidate)=>frame(
  frameId,power,mean(uiCandidate)-mean(uiReference),mean(facetCandidate)-mean(facetReference)
);

test('R202.52 negative: power-off equal nonzero averages cannot prove actual shutdown',()=>{
  const reference=[50,50],candidate=[50,50];
  assert.equal(mean(reference),50);
  assert.equal(mean(candidate),50);
  const off=measuredFrame(6,0,[10,10],[10,10],reference,candidate);
  const gates=classifySnapshotEvidence([...nominal().filter(x=>x.power!==0),off]);
  assert.equal(gates.power_off_mean_delta,'PASS');
  assert.equal(gates.power_off,'NOT_ATTESTED');
});

test('R202.52 negative: swapped UI pixels with equal means remain not attested',()=>{
  const uiReference=[5,15],uiCandidate=[15,5];
  assert.notDeepEqual(uiReference,uiCandidate);
  assert.equal(mean(uiReference),mean(uiCandidate));
  const powered=measuredFrame(6,145,uiReference,uiCandidate,[120],[108]);
  const gates=classifySnapshotEvidence([powered,nominal()[1],nominal()[2]]);
  assert.equal(gates.ui_control_mean_delta,'PASS');
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

const rgbImage=(values)=>({width:2,height:1,bpp:3,stride:6,data:Uint8Array.from(values)});
const twoPixels={x0:0,x1:2,y0:0,y1:1};

test('R202.52 pixelwise negative: swapped UI pixels with equal means are detected',()=>{
  const ref=rgbImage([5,5,5,15,15,15]),cand=rgbImage([15,15,15,5,5,5]);
  const result=compareRoiRgb(ref,cand,twoPixels);
  assert.equal(result.pixels,2);
  assert.equal(result.changed_pixels,2);
  assert.equal(result.exact_rgb_match,false);
  assert.equal(result.max_channel_delta,10);
  assert.equal(result.rgb_mean_absolute_delta,10);
});

test('R202.52 pixelwise positive: bit-identical UI region is attested',()=>{
  const ref=rgbImage([5,5,5,15,15,15]);
  assert.deepEqual(compareRoiRgb(ref,rgbImage([5,5,5,15,15,15]),twoPixels),
    {pixels:2,changed_pixels:0,max_channel_delta:0,rgb_mean_absolute_delta:0,exact_rgb_match:true});
});

test('R202.52 pixelwise fail closed: invalid images and out-of-bounds ROI',()=>{
  const ref=rgbImage([5,5,5,15,15,15]);
  assert.throws(()=>compareRoiRgb(ref,{...ref,data:Uint8Array.of(0)},twoPixels),/R20252_ROI_IMAGE_INVALID/);
  assert.throws(()=>compareRoiRgb(ref,ref,{x0:0,x1:3,y0:0,y1:1}),/R20252_ROI_BOUNDS_INVALID/);
  assert.throws(()=>compareRoiRgb(ref,ref,{x0:1,x1:1,y0:0,y1:1}),/R20252_ROI_BOUNDS_INVALID/);
});
