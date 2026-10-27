import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createLocalVisualEvidencePair} from '../tools/visual_evidence_pair.mjs';
const commit='12d7e2f91d73c7f696cb2fc845be340fd2c48a67';
const sample=(value=18)=>({
 status:'ADVISORY_VISUAL_CHANGE',viewport:{width:390,height:844},
 thresholdMeanRgb:12,totalTiles:192,sourceVerified:false,
 changedTileCount:1,prominentTileCount:1,subtleTileCount:0,
 changedTiles:[{col:3,row:4,meanRgbDelta:value,visibilityBand:'PROMINENT'}],
 meanTileDelta:1.25,maxTileDelta:value,
 identicalPixels:false,qualityProven:false,visualDefectProven:false,
 autoChangeAuthorized:false,screenshotBytesTransferred:false
});
const generate=(change=sample(),restore=null)=>createLocalVisualEvidencePair({
 repository:'inossarum/synestra-vitrine-preview',commit,comparison:change,recovery:restore
});
test('exports R3 report + exact sha256 manifest without authenticating issuer',()=>{
 const b=generate();
 const report=JSON.parse(b.reportJson),manifest=JSON.parse(b.manifestJson);
 assert.equal(report.schema,'synestra.web-pilot.visual-review.v1');
 assert.equal(manifest.schema,'synestra.web-pilot.visual-evidence-digest.v1');
 assert.equal(report.source.provenance,'UNVERIFIED');assert.equal(manifest.attestation,'NONE');
 assert.equal(report.comparison.qualityProven,false);
 assert.equal(manifest.reportSha256,createHash('sha256').update(b.reportJson,'utf8').digest('hex'));
 assert.equal(manifest.source.commit,commit);
});
test('two executions with unchanged data are byte identical',()=>assert.deepEqual(generate(),generate()));
test('recovering zero changed cells yields valid advisory packet',()=>{
 const clean={...sample(),status:'ADVISORY_NO_VISUAL_CHANGE',changedTileCount:0,prominentTileCount:0,
  subtleTileCount:0,changedTiles:[],identicalPixels:true};
 const x=generate(sample(),clean);
 assert.equal(JSON.parse(x.reportJson).recovery.changedTileCount,0);
});
test('changed report content changes emitted manifest hash',()=>{
 assert.notEqual(generate(sample(15)).reportSha256,generate(sample(25)).reportSha256);
});
test('rejects forged quality, provenance, filesystem and screenshot input',()=>{
 for(const [field,value] of [
  ['qualityProven',true],['sourceVerified',true],['autoChangeAuthorized',true],
  ['screenshotBytesTransferred',true],['path','C:\\sensitive'],['png','data:image/png;base64,...']
 ]){const c=sample();c[field]=value;assert.throws(()=>generate(c),/INVALID|CLAIM/)}
});
test('rejects mismatched viewport after restoration',()=>{
 const restore=sample();restore.viewport.width=1440;
 assert.throws(()=>generate(sample(),restore),/VIEWPORT_MISMATCH/);
});
test('rejects forged source references and arbitrary paths',()=>{
 for(const x of ['localhost','../repo','a/b/other','<svg>/repo',''])assert.throws(()=>createLocalVisualEvidencePair({
  repository:x,commit,comparison:sample()
 }),/SOURCE_REPO_INVALID/);
 assert.throws(()=>createLocalVisualEvidencePair({
  repository:'inossarum/repo',commit:'1234',comparison:sample()
 }),/SOURCE_COMMIT_INVALID/);
});
test('rejects mismatched status, counts and pixel-identity claims',()=>{
 let a=sample();a.changedTileCount=0;assert.throws(()=>generate(a),/COUNTS_INVALID/);
 a=sample();a.identicalPixels=true;assert.throws(()=>generate(a),/STATUS_INVALID/);
 a=sample();a.prominentTileCount=0;assert.throws(()=>generate(a),/COUNTS_INVALID/);
});
test('rejects duplicate, out of range, and nonfinite tiles',()=>{
 let a=sample();a.changedTileCount=2;a.prominentTileCount=2;a.changedTiles.push({...a.changedTiles[0]});
 assert.throws(()=>generate(a),/DUPLICATE_TILE/);
 a=sample();a.changedTiles[0].col=16;assert.throws(()=>generate(a),/TILE_INVALID/);
 a=sample();a.changedTiles[0].meanRgbDelta=NaN;assert.throws(()=>generate(a),/TILE_INVALID/);
});
test('rejects extra report fields despite plausible numeric result',()=>{
 const c=sample();c.fakeProof='PASS';assert.throws(()=>generate(c),/FIELDS_INVALID/);
});
test('does not mutate caller source objects',()=>{
 const c=sample(),r=sample();const original=JSON.stringify([c,r]);generate(c,r);
 assert.equal(JSON.stringify([c,r]),original);
});
