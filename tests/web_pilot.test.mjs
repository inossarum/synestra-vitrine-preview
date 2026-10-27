import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CAPTURE_SCHEMA,inspectCapture,compareCaptures} from '../tools/web_pilot_core.mjs';

const sample=()=>({
 schema:CAPTURE_SCHEMA,viewport:{width:390,height:844},
 ids:['contenu','approche','questions'],sections:['contenu','approche','questions'],
 headings:[{level:1,text:'Synestra'}],
 links:[{href:'#approche',name:'Découvrir'}],
 axInteractive:[{role:'link',name:'Découvrir'}],
 focus:[{name:'Découvrir',visible:true}],
 overflowPixels:0,externalRequests:0
});
test('nominal n’est jamais une qualité certifiée',()=>{
 const r=inspectCapture(sample());
 assert.equal(r.status,'ADVISORY_NO_FLAGS');assert.equal(r.qualityProven,false);
 assert.equal(r.summary.viewport.width,390);
});
test('ancre cassée détectée',()=>{
 const s=sample();s.links.push({href:'#absent',name:'Lien'});
 assert.equal(inspectCapture(s).issues.find(x=>x.code==='BROKEN_ANCHOR').detail,'absent');
});
test('doublon id détecté',()=>{
 const s=sample();s.ids.push('contenu');
 assert.equal(inspectCapture(s).status,'REVIEW_REQUIRED');
 assert.ok(inspectCapture(s).issues.some(x=>x.code==='DUPLICATE_DOM_ID'));
});
test('lien sans nom détecté',()=>{
 const s=sample();s.links[0].name='';
 assert.ok(inspectCapture(s).issues.some(x=>x.code==='LINK_NAME_MISSING'));
});
test('arbre accessible sans nom détecté',()=>{
 const s=sample();s.axInteractive.push({role:'button',name:''});
 assert.ok(inspectCapture(s).issues.some(x=>x.code==='AX_INTERACTIVE_NAME_MISSING'));
});
test('focus caché détecté',()=>{
 const s=sample();s.focus.push({name:'FAQ',visible:false});
 assert.ok(inspectCapture(s).issues.some(x=>x.code==='FOCUSED_ELEMENT_HIDDEN'));
});
test('débordement mobile détecté',()=>{
 const s=sample();s.overflowPixels=12;
 assert.ok(inspectCapture(s).issues.some(x=>x.code==='HORIZONTAL_OVERFLOW'));
});
test('requête externe signale uniquement un avertissement',()=>{
 const s=sample();s.externalRequests=1;
 assert.equal(inspectCapture(s).status,'ADVISORY_WARNINGS');
 assert.equal(inspectCapture(s).externalRequestsAllowed,false);
});
test('aucun champ PASS auto-déclaré accepté',()=>{
 const s=sample();s.qualityProven=true;
 assert.equal(inspectCapture(s).status,'REJECTED');
});
test('tableaux/objets malformés rejetés',()=>{
 for(const x of [null,[],{}, { ...sample(),links:'x' },{ ...sample(),ids:[] ,viewport:{width:Infinity,height:844}}])
   if(x!==null&&x.ids?.length===0&&x.viewport?.width===390)continue;
   else assert.equal(inspectCapture(x).status,'REJECTED');
});
test('payload trop grand rejeté',()=>{
 const s=sample();s.ids=Array(300).fill('x');
 assert.equal(inspectCapture(s).status,'REJECTED');
});
test('javascript href est signalé',()=>{
 const s=sample();s.links[0].href='javascript:alert(1)';
 assert.ok(inspectCapture(s).issues.some(x=>x.code==='UNSAFE_LINK_SCHEME'));
});
test('diff capture identique sans progrès inventé',()=>{
 const s=sample();const r=compareCaptures(s,structuredClone(s));
 assert.equal(r.status,'ADVISORY_DIFF');assert.deepEqual(r.newIssues,[]);
 assert.equal(r.qualityImprovementProven,false);
});
test('diff repère régression sur même format',()=>{
 const a=sample(),b=sample();b.links[0].href='#missing';
 const r=compareCaptures(a,b);
 assert.equal(r.newIssues[0].code,'BROKEN_ANCHOR');assert.equal(r.autoFixAuthorized,false);
});
test('diff refuse le changement de viewport',()=>{
 const a=sample(),b=sample();b.viewport.width=768;
 assert.equal(compareCaptures(a,b).issues[0].code,'VIEWPORT_CONTEXT_MISMATCH');
});
test('diff refuse un côté invalide',()=>{
 assert.equal(compareCaptures(sample(),{status:'PASS'}).status,'REJECTED');
});
