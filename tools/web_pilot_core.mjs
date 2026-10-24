/** Synestra Web Pilot v0.1 — bounded, read-only, evidence-first web audit.
 * Not WCAG certification, not Lighthouse or Core Web Vitals field measurement.
 * Pure function: no network, filesystem, eval, process or browser access.
 */
export const CAPTURE_SCHEMA = 'synestra.web-pilot.capture.v1';
const LIMIT = 256;
const text = x => typeof x === 'string' && x.length <= 256;
const array = (x,max=LIMIT) => Array.isArray(x) && x.length<=max;
const validItem = (x,fields) => x && typeof x==='object' && !Array.isArray(x) &&
  Object.keys(x).sort().join('|')===fields.slice().sort().join('|');
const has = (o,k) => Object.prototype.hasOwnProperty.call(o,k);
const noBadControl = x => !/[\u0000-\u001f\u007f]/u.test(x);
const bad = code => ({status:'REJECTED',issues:[{code,severity:'ERROR'}],qualityProven:false,automatedScope:'PARTIAL',externalRequestsAllowed:false});

export function inspectCapture(c) {
  if(!validItem(c,['schema','viewport','ids','headings','sections','links','axInteractive','focus','overflowPixels','externalRequests']))return bad('SCHEMA_FIELDS_INVALID');
  if(c.schema!==CAPTURE_SCHEMA || !validItem(c.viewport,['width','height']) ||
    !Number.isInteger(c.viewport.width)||c.viewport.width<240||c.viewport.width>7680||
    !Number.isInteger(c.viewport.height)||c.viewport.height<240||c.viewport.height>4320)
    return bad('VIEWPORT_INVALID');
  if(!array(c.ids)||!array(c.headings)||!array(c.sections)||!array(c.links)||
     !array(c.axInteractive)||!array(c.focus)||
     !Number.isInteger(c.overflowPixels)||c.overflowPixels<0||c.overflowPixels>1e6||
     !Number.isInteger(c.externalRequests)||c.externalRequests<0||c.externalRequests>1e6)
    return bad('CAPTURE_BOUNDS_INVALID');
  if(!c.ids.every(x=>text(x)&&noBadControl(x))||
     !c.sections.every(x=>text(x)&&noBadControl(x))||
     !c.headings.every(x=>validItem(x,['level','text'])&&Number.isInteger(x.level)&&x.level>=1&&x.level<=6&&text(x.text))||
     !c.links.every(x=>validItem(x,['href','name'])&&text(x.href)&&text(x.name)&&noBadControl(x.href)&&noBadControl(x.name))||
     !c.axInteractive.every(x=>validItem(x,['role','name'])&&text(x.role)&&text(x.name))||
     !c.focus.every(x=>validItem(x,['name','visible'])&&text(x.name)&&typeof x.visible==='boolean'))
    return bad('CAPTURE_ENTRY_INVALID');
  const issues=[];
  const emit=(code,severity='ERROR',detail='')=>{
    if(issues.length<64)issues.push({code,severity,...(detail?{detail}: {})});
  };
  const ids=new Set(c.ids);
  if(ids.size!==c.ids.length)emit('DUPLICATE_DOM_ID');
  if(!c.sections.includes('contenu'))emit('MAIN_LANDMARK_MISSING');
  const h1=c.headings.filter(x=>x.level===1).length;
  if(h1!==1)emit('H1_COUNT_INVALID','ERROR',String(h1));
  for(const l of c.links) {
    if(!l.name.trim())emit('LINK_NAME_MISSING');
    if(l.href.startsWith('#')&&l.href.length>1&&!ids.has(l.href.slice(1)))emit('BROKEN_ANCHOR','ERROR',l.href.slice(1));
    if(/^javascript:/i.test(l.href))emit('UNSAFE_LINK_SCHEME');
  }
  for(const a of c.axInteractive)if(!a.name.trim())emit('AX_INTERACTIVE_NAME_MISSING','ERROR',a.role);
  for(const f of c.focus)if(!f.visible)emit('FOCUSED_ELEMENT_HIDDEN','ERROR',f.name.slice(0,100));
  if(c.overflowPixels>1)emit('HORIZONTAL_OVERFLOW','ERROR',String(c.overflowPixels));
  if(c.externalRequests>0)emit('EXTERNAL_NETWORK_REQUESTS','WARNING',String(c.externalRequests));
  const summary={
    viewport:c.viewport,
    sectionCount:c.sections.length,
    headingCount:c.headings.length,
    linkCount:c.links.length,
    interactiveAxCount:c.axInteractive.length,
    focusChecks:c.focus.length,
    overflowPixels:c.overflowPixels,
    externalRequests:c.externalRequests
  };
  return {
    status:issues.some(x=>x.severity==='ERROR')?'REVIEW_REQUIRED':issues.length?'ADVISORY_WARNINGS':'ADVISORY_NO_FLAGS',
    issues,summary,qualityProven:false,automatedScope:'PARTIAL',
    externalRequestsAllowed:false
  };
}
export function compareCaptures(before,after) {
  const a=inspectCapture(before),b=inspectCapture(after);
  if(a.status==='REJECTED'||b.status==='REJECTED')return bad('INVALID_COMPARISON_INPUT');
  if(before.viewport.width!==after.viewport.width||before.viewport.height!==after.viewport.height)
    return bad('VIEWPORT_CONTEXT_MISMATCH');
  const key=i=>[i.code,i.severity,i.detail||''].join('|');
  const prev=new Set(a.issues.map(key)),next=new Set(b.issues.map(key));
  return {
    status:'ADVISORY_DIFF',
    viewport:before.viewport,
    newIssues:b.issues.filter(i=>!prev.has(key(i))),
    noLongerFlagged:a.issues.filter(i=>!next.has(key(i))),
    beforeStatus:a.status,afterStatus:b.status,
    qualityImprovementProven:false,
    sourceProvenanceVerified:false,
    autoFixAuthorized:false
  };
}
