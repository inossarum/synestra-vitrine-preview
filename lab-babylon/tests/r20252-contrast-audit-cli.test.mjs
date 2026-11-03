import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const staging=process.env.SYNESTRA_STAGING_ROOT||'I:\\_STUDIO_STAGING';
const png=join(staging,'SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102','run-base-1793647103370-57096','base-frame6-power145.png');
const reportFile=join(staging,'SYN_LAB_R20252_CONTRAST_QA_20261102','r20252-contrast-audit.json');
const executable=fileURLToPath(new URL('../scripts/r20252-contrast-audit.mjs',import.meta.url));
const haveFixture=existsSync(png);
const strictFixtures=process.env.R20252_REQUIRE_NATIVE_FIXTURES==='1';
const expectedFixtures=[
 ['run-base-1793647103370-57096','base-frame6-power145.png'],
 ['run-candidate-1793647119472-56808','candidate-frame6-power145.png'],
 ['run-base-1793647103370-57096','base-frame18-power145.png'],
 ['run-candidate-1793647119472-56808','candidate-frame18-power145.png'],
 ['run-base-1793647103370-57096','base-frame6-power0.png'],
 ['run-candidate-1793647119472-56808','candidate-frame6-power0.png'],
];
test('R202.52 strict native fixture gate: all six screenshots must exist before acceptance', {skip:!strictFixtures},()=>{
 for(const [runFolder,name] of expectedFixtures){
  const file=join(staging,'SYN_LAB_R20251_NATIVE_BABYLON_INSTRUMENTED_QA_20261102',runFolder,name);
  assert.ok(existsSync(file),'MISSING_NATIVE_BABYLON_FIXTURE: '+file);
 }
});
function run(args=[]){
 const r=spawnSync(process.execPath,[executable,...args],{encoding:'utf8',timeout:60000});
 if(r.error)throw r.error;
 return r;
}
test('R202.52: diagnostic-only execution records FAIL without falsely failing read-only analysis', {skip:!haveFixture}, ()=>{
 const result=run();
 assert.equal(result.status,0,result.stderr);
 const report=JSON.parse(readFileSync(reportFile,'utf8'));
 assert.equal(report.gates.diagnostic_integrity,'PASS');
 assert.equal(report.gates.ui_control,'NOT_ATTESTED');
 assert.equal(report.gates.ui_control_mean_delta,'PASS');
 assert.equal(report.gates.ui_roi_rgb_exact,'PASS');
 assert.deepEqual(report.gates.ui_roi_rgb_pairs.map(x=>[x.frame,x.power,x.pixels,x.changed_pixels]),[[6,145,154000,0],[18,145,154000,0],[6,0,154000,0]]);
 assert.equal(report.gates.power_off,'NOT_ATTESTED');
 assert.equal(report.gates.power_off_mean_delta,'PASS');
 assert.equal(report.gates.facet_visibility_screen,'FAIL');
 assert.equal(report.gates.exact_rebuild,'NOT_VERIFIED');
 assert.equal(report.gates.owner_art_signoff,'PENDING');
 assert.deepEqual(report.gates.observed.map(x=>x.frame),[6,18]);
 assert.deepEqual(report.gates.observed.map(x=>x.lit150_pp),[-7.996,-7.933]);
});
test('R202.52: strict visibility mode fails closed with code 3 and retains SHA-pinned evidence', {skip:!haveFixture}, ()=>{
 const result=run(['--require-visibility-pass']);
 assert.equal(result.status,3,result.stderr);
 assert.match(result.stderr,/R20252_FACET_VISIBILITY_GATE_FAIL/);
 const buf=readFileSync(reportFile);
 const digest=createHash('sha256').update(buf).digest('hex');
 const displayedSha=result.stdout.match(/R20252_CONTRAST_SHA256 ([a-f0-9]{64})/);
 assert.ok(displayedSha,'PERSISTED_AUDIT_SHA_MISSING');
 assert.equal(digest,displayedSha[1]);
 assert.equal(JSON.parse(buf.toString('utf8')).gates.facet_visibility_screen,'FAIL');
});
