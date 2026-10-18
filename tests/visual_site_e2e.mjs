/** Visual R3 real site boundary test: Chrome -> PNG -> derived tile data -> MCP.
 * Only edits/restores HTML inside an isolated QA checkout. Never deploys.
 */
import {readFileSync,writeFileSync,copyFileSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {fingerprintPng,compareVisualFingerprints} from '../tools/visual_fingerprint.mjs';
const root=process.cwd(),html=join(root,'index.html');
const baseline=readFileSync(html);const original=baseline.toString('utf8');
const anchor='--mint: #a7e7ca;',replacement='--mint: #ff0055;';
assert.ok(original.includes(anchor),'HTML_PATCH_ANCHOR_MISSING');
const runChrome=(label)=>{
 const r=spawnSync(process.execPath,[join(root,'tests/browser_cdp_qa.mjs')],{cwd:root,encoding:'utf8',timeout:65000,maxBuffer:2*1024*1024});
 assert.equal(r.status,0,'CHROME_'+label+'_FAILED '+String(r.stderr).slice(-1200));
 const out={};for(const name of ['mobile','desktop']){
  const png=readFileSync(join(root,'cdp-'+name+'.png'));
  out[name]=fingerprintPng(png);
 }
 return out;
};
function mcp(before,after){
 const msg=(id,method,params)=>({jsonrpc:'2.0',id,method,...(params?{params}:{})});
 const jobs=[
  msg(1,'initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'visual-e2e',version:'1'}}),
  msg(2,'tools/call',{name:'synestra_web_compare_visual_fingerprints',arguments:{before,after}})
 ];
 const r=spawnSync(process.execPath,[join(root,'tools/web_pilot_mcp_stdio.mjs')],{
  input:jobs.map(JSON.stringify).join('\n')+'\n',encoding:'utf8',timeout:6000});
 assert.equal(r.status,0,'MCP_FAILED '+r.stderr);
 const lines=r.stdout.trim().split(/\r?\n/).map(JSON.parse);
 return lines[1].result.structuredContent;
}
let before,changed,restored;
try{
 before=runChrome('BASELINE');
 writeFileSync(html,original.replace(anchor,replacement),'utf8');
 changed=runChrome('CSS_CHANGED');
} finally {
 writeFileSync(html,baseline);
}
assert.deepEqual(readFileSync(html),baseline,'SOURCE_NOT_RESTORED');
restored=runChrome('RESTORED');
const results={schema:'synestra.web-pilot.visual-site-e2e.v1',
  scope:'ISOLATED_LOCAL_CHROME',sourceRestored:true,qualityProven:false,viewports:{}};
for(const name of ['mobile','desktop']){
 const detected=mcp(before[name],changed[name]);
 const recovery=mcp(before[name],restored[name]);
 assert.equal(detected.status,'ADVISORY_VISUAL_CHANGE','NO_VISUAL_CHANGE_'+name);
 assert.ok(detected.changedTileCount>0);
 assert.equal(detected.qualityProven,false);
 if(recovery.status==='REJECTED')throw Error('RESTORE_COMPARE_REJECTED '+name);
 assert.equal(recovery.prominentTileCount,0,'PROMINENT_VISUAL_CHANGE_AFTER_RESTORE '+name);
 results.viewports[name]={
  viewport:before[name].viewport,changedTiles:detected.changedTileCount,
  prominentTiles:detected.prominentTileCount,
  restoredDiffTiles:recovery.changedTileCount,
  restoredProminentTiles:recovery.prominentTileCount,
  restoredSubtleTiles:recovery.subtleTileCount,
  restoredStatus:recovery.status,
  defectsProven:false
 };
}
console.log('VISUAL_SITE_REAL_E2E='+JSON.stringify(results));
