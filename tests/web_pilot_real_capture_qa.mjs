/** Real local browser capture -> actual MCP child process -> pure tools.
 * Run AFTER tests/browser_cdp_qa.mjs. Does not connect to Site MCP or PC Bridge.
 */
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join,dirname} from 'node:path';
import assert from 'node:assert/strict';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const mcp=join(root,'tools','web_pilot_mcp_stdio.mjs');
const msg=(id,method,params)=>({jsonrpc:'2.0',id,method,...(params?{params}:{})});
const real=[];
const labs=[];
for(const label of ['mobile','desktop']){
 const packet=JSON.parse(readFileSync(join(root,'web-pilot-'+label+'.json'),'utf8'));
 assert.equal(packet.schema,'synestra.web-pilot.audit.v1');
 assert.equal(packet.audit.status,'ADVISORY_NO_FLAGS');
 real.push(packet.capture);
 assert.ok(packet.lab,'missing actual CDP metrics '+label);
 assert.notEqual(packet.labAudit.status,'REJECTED');
 labs.push(packet.lab);
}
const messages=[
 msg(1,'initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'synestra-web-e2e',version:'1'}}),
 msg(2,'tools/list'),
 msg(3,'tools/call',{name:'synestra_web_inspect_capture',arguments:{capture:real[0]}}),
 msg(4,'tools/call',{name:'synestra_web_inspect_capture',arguments:{capture:real[1]}}),
 msg(5,'tools/call',{name:'synestra_web_compare_captures',arguments:{before:real[0],after:real[0]}}),
 msg(6,'tools/call',{name:'synestra_web_inspect_lab_performance',arguments:{lab:labs[0]}}),
 msg(7,'tools/call',{name:'synestra_web_inspect_lab_performance',arguments:{lab:labs[1]}}),
 msg(8,'tools/call',{name:'synestra_web_compare_lab_performance',arguments:{before:labs[0],after:labs[0]}})
];
const child=spawnSync(process.execPath,[mcp],{input:messages.map(JSON.stringify).join('\n')+'\n',encoding:'utf8',timeout:5000,maxBuffer:1024*1024});
assert.equal(child.status,0,child.stderr);
const results=child.stdout.trim().split(/\r?\n/).map(JSON.parse);
assert.equal(results.length,8);
assert.deepEqual(results[1].result.tools.map(x=>x.name),[
 'synestra_web_inspect_capture','synestra_web_compare_captures',
 'synestra_web_inspect_lab_performance','synestra_web_compare_lab_performance',
 'synestra_web_inspect_visual_fingerprint','synestra_web_compare_visual_fingerprints'
]);
for(const item of [results[2],results[3]]){
 assert.equal(item.result.structuredContent.status,'ADVISORY_NO_FLAGS');
 assert.equal(item.result.structuredContent.qualityProven,false);
 assert.equal(item.result.structuredContent.summary.externalRequests,0);
 assert.equal(item.result.structuredContent.summary.overflowPixels,0);
}
assert.equal(results[4].result.structuredContent.status,'ADVISORY_DIFF');
assert.deepEqual(results[4].result.structuredContent.newIssues,[]);
assert.equal(results[4].result.structuredContent.qualityImprovementProven,false);
for(const item of [results[5],results[6]]){
 const o=item.result.structuredContent;
 assert.ok(['ADVISORY_LAB_OBSERVATION','PENDING_LAB_METRICS'].includes(o.status));
 assert.equal(o.fieldCoreWebVitalsProven,false);
}
assert.ok(['ADVISORY_LAB_DIFF','PENDING_COMPARISON_METRICS'].includes(results[7].result.structuredContent.status));
assert.equal(results[7].result.structuredContent.autoTuneAuthorized,false);
console.log('REAL_BROWSER_TO_LOCAL_MCP=PASS viewports=390,1440 tool_calls=6 lab_cwv_proven=false');
