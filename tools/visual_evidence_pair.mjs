/** Visual Gate R3 -> Web App Evidence digest pair (local-only).
 * The manifest binds byte contents to a claimed repo/commit; NO signature,
 * issuer authentication, provenance claim, or quality verdict is conferred.
 */
import {createHash} from 'node:crypto';

export const REVIEW_SCHEMA='synestra.web-pilot.visual-review.v1';
export const DIGEST_SCHEMA='synestra.web-pilot.visual-evidence-digest.v1';
const MAX_REPORT=64*1024,MAX_MANIFEST=4096;
const exact=(v,ks)=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&
 Object.keys(v).sort().join('|')===ks.slice().sort().join('|');
const checked=(v,name)=>{if(!v)throw Error(name);};
const comparisonKeys=[
 'status','viewport','thresholdMeanRgb','meanTileDelta','maxTileDelta',
 'sourceVerified','totalTiles','changedTileCount','prominentTileCount',
 'subtleTileCount','changedTiles','identicalPixels','qualityProven',
 'visualDefectProven','autoChangeAuthorized','screenshotBytesTransferred'
];
function validateComparison(x){
 checked(exact(x,comparisonKeys),'COMPARISON_FIELDS_INVALID');
 checked(exact(x.viewport,['width','height'])&&Number.isInteger(x.viewport.width)&&
 x.viewport.width>=16&&x.viewport.width<=7680&&Number.isInteger(x.viewport.height)&&
 x.viewport.height>=12&&x.viewport.height<=4320,'VIEWPORT_INVALID');
 checked(x.totalTiles===192&&x.thresholdMeanRgb===12&&
 x.sourceVerified===false&&x.qualityProven===false&&
 x.visualDefectProven===false&&x.autoChangeAuthorized===false&&
 x.screenshotBytesTransferred===false,'UNAUTHORIZED_QUALITY_OR_FORMAT_CLAIM');
 checked(Number.isFinite(x.meanTileDelta)&&x.meanTileDelta>=0&&x.meanTileDelta<=255&&
 Number.isFinite(x.maxTileDelta)&&x.maxTileDelta>=0&&x.maxTileDelta<=255,'MEASURES_INVALID');
 checked(Number.isInteger(x.changedTileCount)&&x.changedTileCount>=0&&x.changedTileCount<=192&&
 Number.isInteger(x.prominentTileCount)&&Number.isInteger(x.subtleTileCount)&&
 x.prominentTileCount>=0&&x.subtleTileCount>=0&&
 x.prominentTileCount+x.subtleTileCount===x.changedTileCount&&
 Array.isArray(x.changedTiles)&&x.changedTiles.length===x.changedTileCount,'COUNTS_INVALID');
 checked((x.changedTileCount>0?x.status==='ADVISORY_VISUAL_CHANGE':x.status==='ADVISORY_NO_VISUAL_CHANGE')&&
 x.identicalPixels===(x.changedTileCount===0),'STATUS_INVALID');
 const seen=new Set();let prominent=0,subtle=0;
 for(const t of x.changedTiles){
  checked(exact(t,['col','row','meanRgbDelta','visibilityBand'])&&
   Number.isInteger(t.col)&&t.col>=0&&t.col<16&&
   Number.isInteger(t.row)&&t.row>=0&&t.row<12&&
   typeof t.meanRgbDelta==='number'&&Number.isFinite(t.meanRgbDelta)&&
   t.meanRgbDelta>=0&&t.meanRgbDelta<=255&&
   ['PROMINENT','SUBTLE'].includes(t.visibilityBand),'TILE_INVALID');
  let key=t.col+':'+t.row;checked(!seen.has(key),'DUPLICATE_TILE');seen.add(key);
  if(t.visibilityBand==='PROMINENT')prominent++;else subtle++;
 }
 checked(prominent===x.prominentTileCount&&subtle===x.subtleTileCount,'TILE_COUNTS_INCONSISTENT');
}
export function createLocalVisualEvidencePair({repository,commit,comparison,recovery=null}){
 checked(typeof repository==='string'&&repository.length<=128&&
  /^[A-Za-z0-9_][A-Za-z0-9_.-]*\/[A-Za-z0-9_][A-Za-z0-9_.-]*$/.test(repository)&&
  !repository.split('/').some(part=>part.includes('..')),'SOURCE_REPO_INVALID');
 checked(typeof commit==='string'&&/^[a-f0-9]{40}$/.test(commit),'SOURCE_COMMIT_INVALID');
 validateComparison(comparison);
 if(recovery!==null){
  validateComparison(recovery);
  checked(recovery.viewport.width===comparison.viewport.width&&
   recovery.viewport.height===comparison.viewport.height,'RECOVERY_VIEWPORT_MISMATCH');
 }
 const report={
  schema:REVIEW_SCHEMA,
  source:{repository,commit,origin:'LOCAL_CHROME',provenance:'UNVERIFIED'},
  comparison,recovery
 };
 const reportJson=JSON.stringify(report,null,2)+'\n';
 checked(Buffer.byteLength(reportJson,'utf8')<=MAX_REPORT,'REPORT_TOO_LARGE');
 const reportSha256=createHash('sha256').update(reportJson,'utf8').digest('hex');
 const manifest={
  schema:DIGEST_SCHEMA,algorithm:'SHA-256',reportSha256,
  source:{repository,commit},provenance:'UNVERIFIED',attestation:'NONE'
 };
 const manifestJson=JSON.stringify(manifest,null,2)+'\n';
 checked(Buffer.byteLength(manifestJson,'utf8')<=MAX_MANIFEST,'MANIFEST_TOO_LARGE');
 return {reportJson,manifestJson,reportSha256};
}
