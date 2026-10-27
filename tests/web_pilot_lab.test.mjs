import {test} from 'node:test';
import assert from 'node:assert/strict';
import {LAB_SCHEMA,inspectLabMetrics,compareLabMetrics,fromCdpMetrics} from '../tools/web_pilot_lab.mjs';
const metrics=()=>({nodes:90,jsHeapUsedBytes:450000,layoutCountObserved:2,recalcStyleCountObserved:4,
 taskDurationMsObserved:5.5,layoutDurationMsObserved:1.25,scriptDurationMsObserved:0});
const sample=()=>({schema:LAB_SCHEMA,viewport:{width:390,height:844},
 sampleWindow:'POST_NAVIGATION_QA_OBSERVATION',timeDomain:'timeTicks',metrics:metrics()});
test('nominal lab remains advisory; never claims field CWV',()=>{
 const r=inspectLabMetrics(sample());assert.equal(r.status,'ADVISORY_LAB_OBSERVATION');
 assert.equal(r.fieldCoreWebVitalsProven,false);assert.equal(r.autoTuneAuthorized,false);
});
test('extra PASS field rejected',()=>{
 const x=sample();x.status='PASS';assert.equal(inspectLabMetrics(x).status,'REJECTED');
});
test('non finite metric rejected',()=>{
 for(const n of [NaN,Infinity,-1,'100',true]){
  const x=sample();x.metrics.taskDurationMsObserved=n;
  assert.equal(inspectLabMetrics(x).status,'REJECTED');
 }
});
test('missing reported pending, never set to 0',()=>{
 const x=sample();x.metrics.scriptDurationMsObserved=null;
 const r=inspectLabMetrics(x);assert.equal(r.status,'PENDING_LAB_METRICS');
 assert.deepEqual(r.missing,['scriptDurationMsObserved']);
});
test('count must be integer',()=>{
 const x=sample();x.metrics.layoutCountObserved=0.2;
 assert.equal(inspectLabMetrics(x).reason,'COUNT_NOT_INTEGER');
});
test('unknown metric key rejected',()=>{
 const x=sample();x.metrics.password='sensitive';
 assert.equal(inspectLabMetrics(x).status,'REJECTED');
});
test('impossible viewport rejected',()=>{
 const x=sample();x.viewport.width=0;
 assert.equal(inspectLabMetrics(x).status,'REJECTED');
});
test('wrong domain and sample window rejected',()=>{
 const x=sample();x.timeDomain='wallclock';
 assert.equal(inspectLabMetrics(x).status,'REJECTED');
 const y=sample();y.sampleWindow='FIELD_LCP_P75';
 assert.equal(inspectLabMetrics(y).status,'REJECTED');
});
test('diff equals after-minus-before without performance judgment',()=>{
 const a=sample(),b=sample();b.metrics.taskDurationMsObserved=9.5;
 const r=compareLabMetrics(a,b);
 assert.equal(r.status,'ADVISORY_LAB_DIFF');
 assert.equal(r.deltas.taskDurationMsObserved,4);
 assert.equal(r.qualityImprovementProven,false);
 assert.equal(r.repeatability,'UNQUALIFIED_SINGLE_RUN');
});
test('diff mismatched viewport rejects',()=>{
 const a=sample(),b=sample();b.viewport.width=1440;
 assert.equal(compareLabMetrics(a,b).reason,'LAB_CONTEXT_MISMATCH');
});
test('diff with missing keeps unknown',()=>{
 const a=sample(),b=sample();b.metrics.jsHeapUsedBytes=null;
 const r=compareLabMetrics(a,b);
 assert.equal(r.status,'PENDING_COMPARISON_METRICS');
 assert.equal(r.deltas.jsHeapUsedBytes,null);
});
test('compare with forged PASS fails closed',()=>{
 const a=sample(),b=sample();b.fieldCoreWebVitalsProven=true;
 assert.equal(compareLabMetrics(a,b).status,'REJECTED');
});
test('post navigation counters use observed values, never pre-reload subtraction',()=>{
 const base=[{name:'LayoutCount',value:7},{name:'TaskDuration',value:0.1},
 {name:'JSHeapUsedSize',value:200000},{name:'Nodes',value:90},
 {name:'RecalcStyleCount',value:2},{name:'LayoutDuration',value:0.01},
 {name:'ScriptDuration',value:0}];
 const after=structuredClone(base);
 after.find(x=>x.name==='LayoutCount').value=10;
 after.find(x=>x.name==='TaskDuration').value=0.112;
 after.find(x=>x.name==='LayoutDuration').value=0.014;
 const c=fromCdpMetrics({width:390,height:844},after);
 assert.equal(c.metrics.layoutCountObserved,10);
 assert.equal(c.metrics.taskDurationMsObserved,112);
 assert.equal(c.metrics.layoutDurationMsObserved,14);
 assert.equal(inspectLabMetrics(c).status,'ADVISORY_LAB_OBSERVATION');
});
test('CDP missing metrics remain null',()=>{
 const c=fromCdpMetrics({width:390,height:844},[]);
 assert.deepEqual(inspectLabMetrics(c).missing,Object.keys(metrics()));
});
test('single post-navigation reading never subtracts prior navigation',()=>{
 const c=fromCdpMetrics({width:390,height:844},[{name:'TaskDuration',value:1}]);
 assert.equal(c.metrics.taskDurationMsObserved,1000);
});
test('CDP duplicate and invalid entries rejected',()=>{
 assert.throws(()=>fromCdpMetrics({width:390,height:844},[{name:'Nodes',value:1},{name:'Nodes',value:2}]),/INVALID/);
 assert.throws(()=>fromCdpMetrics({width:390,height:844},[{name:'Nodes',value:Infinity}]),/INVALID/);
});
test('input objects are not mutated',()=>{
 const a=sample(),b=sample();b.metrics.nodes=105;
 const original=JSON.stringify([a,b]);compareLabMetrics(a,b);
 assert.equal(JSON.stringify([a,b]),original);
});
