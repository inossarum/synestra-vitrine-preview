/** Synestra Web Pilot Lab Metrics V2 — bounded Chrome CDP runtime observations.
 * These numbers are *lab proxy indicators*, NOT field Core Web Vitals.
 * No independent provenance and no automatic performance verdict/thresholds.
 */
export const LAB_SCHEMA = 'synestra.web-pilot.lab-metrics.v1';
export const LAB_NAMES = Object.freeze([
  'nodes','jsHeapUsedBytes','layoutCountObserved','recalcStyleCountObserved',
  'taskDurationMsObserved','layoutDurationMsObserved','scriptDurationMsObserved'
]);
const schemaKeys=['schema','viewport','sampleWindow','timeDomain','metrics'];
const obj=(x,keys)=>x!==null && typeof x==='object' && !Array.isArray(x) &&
 Object.keys(x).sort().join('|')===keys.slice().sort().join('|');
const rejected=reason=>({status:'REJECTED',reason,fieldCoreWebVitalsProven:false,qualityImprovementProven:false,autoTuneAuthorized:false});
const flags={fieldCoreWebVitalsProven:false,qualityImprovementProven:false,autoTuneAuthorized:false,independentSourceVerified:false};
export function inspectLabMetrics(x) {
 if(!obj(x,schemaKeys))return rejected('SCHEMA_FIELDS_INVALID');
 if(x.schema!==LAB_SCHEMA||x.sampleWindow!=='POST_NAVIGATION_QA_OBSERVATION' ||x.timeDomain!=='timeTicks')
   return rejected('LAB_CONTEXT_INVALID');
 if(!obj(x.viewport,['width','height'])||
   !Number.isInteger(x.viewport.width)||x.viewport.width<240||x.viewport.width>7680||
   !Number.isInteger(x.viewport.height)||x.viewport.height<240||x.viewport.height>4320)
   return rejected('VIEWPORT_INVALID');
 if(!obj(x.metrics,LAB_NAMES))return rejected('METRICS_FIELDS_INVALID');
 const missing=[];
 for(const key of LAB_NAMES) {
   const n=x.metrics[key];
   if(n===null){missing.push(key);continue}
   if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>1e12)
     return rejected('METRIC_VALUE_INVALID');
   if(['nodes','jsHeapUsedBytes','layoutCountObserved','recalcStyleCountObserved'].includes(key) &&
       !Number.isSafeInteger(n))return rejected('COUNT_NOT_INTEGER');
 }
 return {
   status:missing.length?'PENDING_LAB_METRICS':'ADVISORY_LAB_OBSERVATION',
   missing,metrics:x.metrics,viewport:x.viewport,sampleWindow:x.sampleWindow,
   units:{nodes:'count',jsHeapUsedBytes:'bytes',layoutCountObserved:'count',
     recalcStyleCountObserved:'count',taskDurationMsObserved:'milliseconds',
     layoutDurationMsObserved:'milliseconds',scriptDurationMsObserved:'milliseconds'},
   ...flags
 };
}
export function compareLabMetrics(before,after) {
 const a=inspectLabMetrics(before),b=inspectLabMetrics(after);
 if(a.status==='REJECTED'||b.status==='REJECTED')return rejected('INVALID_LAB_INPUT');
 if(before.viewport.width!==after.viewport.width||
   before.viewport.height!==after.viewport.height||
   before.sampleWindow!==after.sampleWindow||
   before.timeDomain!==after.timeDomain)
   return rejected('LAB_CONTEXT_MISMATCH');
 const deltas={};
 for(const name of LAB_NAMES){
   const x=before.metrics[name],y=after.metrics[name];
   deltas[name]=x===null||y===null?null:Math.round((y-x)*1000)/1000;
 }
 const missing=LAB_NAMES.filter(name=>deltas[name]===null);
 return {status:missing.length?'PENDING_COMPARISON_METRICS':'ADVISORY_LAB_DIFF',
   viewport:before.viewport,sampleWindow:before.sampleWindow,deltas,missing,
   direction:'AFTER_MINUS_BEFORE',repeatability:'UNQUALIFIED_SINGLE_RUN',
   ...flags
 };
}
/** Convert one post-navigation Performance.getMetrics reading into observations.
 * CDP counters may reset across navigation, so NEVER subtract a pre-navigation
 * value from a post-navigation one. Observed values are not per-load timings.
 */
export function fromCdpMetrics(viewport,after){
 if(!Array.isArray(after)||after.length>128)throw Error('CDP_METRICS_INVALID');
 const m=new Map();
 for(const x of after){
   if(!x||typeof x.name!=='string'||typeof x.value!=='number'||
      !Number.isFinite(x.value)||x.value<0||m.has(x.name))throw Error('CDP_METRIC_ENTRY_INVALID');
   m.set(x.name,x.value);
 }
 const observed=(name,mult=1,round=false)=>{
   const v=m.get(name);
   if(v===undefined)return null;
   const raw=v*mult;
   return round?Math.round(raw):Math.round(raw*1000)/1000;
 };
 return {
   schema:LAB_SCHEMA,viewport,
   sampleWindow:'POST_NAVIGATION_QA_OBSERVATION',timeDomain:'timeTicks',
   metrics:{
     nodes:observed('Nodes',1,true),
     jsHeapUsedBytes:observed('JSHeapUsedSize',1,true),
     layoutCountObserved:observed('LayoutCount',1,true),
     recalcStyleCountObserved:observed('RecalcStyleCount',1,true),
     taskDurationMsObserved:observed('TaskDuration',1000),
     layoutDurationMsObserved:observed('LayoutDuration',1000),
     scriptDurationMsObserved:observed('ScriptDuration',1000)
   }
 };
}
