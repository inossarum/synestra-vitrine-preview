import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {CAPTURE_SCHEMA} from '../tools/web_pilot_core.mjs';
const sample=()=>({
 schema:CAPTURE_SCHEMA,viewport:{width:390,height:844},
 ids:['contenu'],sections:['contenu'],headings:[{level:1,text:'Synestra'}],
 links:[{href:'#contenu',name:'Aller au contenu'}],
 axInteractive:[{role:'link',name:'Aller au contenu'}],
 focus:[{name:'Aller au contenu',visible:true}],overflowPixels:0,externalRequests:0
});
const msg=(id,method,params)=>({jsonrpc:'2.0',id,method,...(params?{params}:{})});
const init=()=>msg(1,'initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'synthetic-test',version:'1'}});
function talk(messages){
 const p=spawnSync(process.execPath,[new URL('../tools/web_pilot_mcp_stdio.mjs',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1')],{
  input:messages.map(v=>typeof v==='string'?v:JSON.stringify(v)).join('\n')+'\n',
  encoding:'utf8',timeout:5000,maxBuffer:1024*1024
 });
 assert.equal(p.status,0,'stdio failed: '+p.stderr);
 return p.stdout.split(/\r?\n/).filter(Boolean).map(JSON.parse);
}
test('handshake MCP, catalogue deux outils non destructifs',()=>{
 const r=talk([init(),msg(2,'tools/list')]);
 assert.equal(r[0].result.protocolVersion,'2025-06-18');
 assert.equal(r[1].result.tools.length,2);
 assert.ok(r[1].result.tools.every(t=>t.annotations.readOnlyHint===true));
});
test('appel réel outil analyse snapshot renvoie advisory',()=>{
 const r=talk([init(),msg(2,'tools/call',{name:'synestra_web_inspect_capture',arguments:{capture:sample()}})]);
 assert.equal(r[1].result.structuredContent.status,'ADVISORY_NO_FLAGS');
 assert.equal(r[1].result.structuredContent.qualityProven,false);
});
test('appel réel outil compare fournit régression',()=>{
 const before=sample(),after=sample();after.links.push({href:'#missing',name:'Missing'});
 const r=talk([init(),msg(2,'tools/call',{name:'synestra_web_compare_captures',arguments:{before,after}})]);
 assert.equal(r[1].result.structuredContent.newIssues[0].code,'BROKEN_ANCHOR');
 assert.equal(r[1].result.structuredContent.autoFixAuthorized,false);
});
test('notification initialized ne produit pas de réponse',()=>{
 const r=talk([init(),{jsonrpc:'2.0',method:'notifications/initialized'},msg(2,'ping')]);
 assert.equal(r.length,2);
});
test('avant initialization refus',()=>{
 const r=talk([msg(7,'tools/list')]);
 assert.equal(r[0].error.code,-32002);
});
test('outil inconnu et paramètres supplémentaires refusés',()=>{
 const r=talk([init(),msg(2,'tools/call',{name:'shell.exec',arguments:{command:'whoami'}}),
 msg(3,'tools/call',{name:'synestra_web_inspect_capture',arguments:{capture:sample(),path:'C:\\'}})]);
 assert.equal(r[1].error.code,-32602);
 assert.equal(r[2].error.code,-32602);
});
test('injection résultat PASS est rejetée',()=>{
 const c=sample();c.qualityProven=true;
 const r=talk([init(),msg(2,'tools/call',{name:'synestra_web_inspect_capture',arguments:{capture:c}})]);
 assert.equal(r[1].result.structuredContent.status,'REJECTED');
 assert.equal(r[1].result.isError,true);
});
test('méthodes inconnues ne peuvent lancer une commande',()=>{
 const r=talk([init(),msg(2,'exec',{command:'shutdown'})]);
 assert.equal(r[1].error.code,-32601);
});
test('JSON invalide renvoie erreur protocole',()=>{
 const r=talk([init(),'{broken json']);
 assert.equal(r[1].error.code,-32700);
});
test('payload trop volumineux est refusé',()=>{
 const r=talk([init(),' '.repeat(65540)]);
 assert.equal(r[1].error.code,-32700);
});
test('un ID invalide est refusé',()=>{
 const r=talk([init(),{jsonrpc:'2.0',id:{bad:true},method:'tools/list'}]);
 assert.equal(r[1].error.code,-32600);
});
