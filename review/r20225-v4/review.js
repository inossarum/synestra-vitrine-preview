'use strict';
const CHANNEL='synestra.lab.review.sync.v1';
const urls=Object.freeze({
 r20224:'./versions/r20224/index.html?labFrame=6&qaQuality=ultra&qaPower=145',
 r20225:'./versions/r20225/index.html?labFrame=6&qaQuality=ultra&qaPower=145'
});
const labels=Object.freeze({
 r20224:'R202.24 — noyau au premier plan',
 r20225:'R202.25 — profondeur optique'
});
const frame=document.getElementById('scene-frame');
const label=document.getElementById('current-label');
const buttons=[...document.querySelectorAll('[data-variant]')];
const pending=new Map();
let current='r20225',busy=false,blocked=false,sequence=0;
window.addEventListener('message',e=>{
 if(e.source!==frame.contentWindow||e.data?.channel!==CHANNEL)return;
 const request=pending.get(e.data.id);
 if(!request)return;
 pending.delete(e.data.id);clearTimeout(request.timer);
 e.data.status==='PASS'?request.resolve(e.data.image??e.data.state):request.reject(Error(e.data.error||'SYNC_FAILED'));
});
function request(action,state){
 return new Promise((resolve,reject)=>{
  if(!frame.contentWindow){reject(Error('FRAME_MISSING'));return}
  const id=++sequence;
  const timer=setTimeout(()=>{pending.delete(id);reject(Error('SYNC_TIMEOUT'))},1700);
  pending.set(id,{resolve,reject,timer});
  frame.contentWindow.postMessage({channel:CHANNEL,id,action,state},'*');
 });
}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function retry(action,state){
 let last;
 for(let i=0;i<14;i++){
  try{return await request(action,state)}
  catch(e){last=e;if(e.message!=='NOT_READY')break;await pause(130)}
 }
 throw last||Error('SYNC_NOT_READY');
}
function loadVersion(src){
 return new Promise((resolve,reject)=>{
  const timeout=setTimeout(()=>{frame.removeEventListener('load',ready);reject(Error('FRAME_LOAD_TIMEOUT'))},8500);
  const ready=()=>{clearTimeout(timeout);resolve()};
  frame.addEventListener('load',ready,{once:true});
  frame.src=src;
 });
}
function verifyState(applied,expected){
 if(!applied?.camera||!applied.settings)throw Error('APPLY_NOT_VERIFIED');
 for(const k of ['alpha','beta','radius']){
  if(Math.abs(Number(applied.camera[k])-Number(expected.camera[k]))>1e-5)throw Error('CAMERA_MISMATCH_'+k);
 }
 for(const [key,value] of Object.entries(expected.settings)){
  if(applied.settings[key]!==value)throw Error('SETTING_MISMATCH_'+key);
 }
}
function selectActive(version){
 for(const b of buttons)b.setAttribute('aria-pressed',String(b.dataset.variant===version));
}
function choose(version){
 if(blocked||busy||!Object.hasOwn(urls,version)||version===current)return;
 busy=true;for(const b of buttons)b.disabled=true;
 const previous=current;
 let snapshot=null,navigationStarted=false;
 label.textContent='Mémorisation de l’angle et des réglages…';
 (async()=>{
  snapshot=await retry('capture');
  if(!snapshot?.camera||!snapshot.settings)throw Error('INVALID_CAPTURE');
  label.textContent='Chargement de '+version+' à angle identique…';
  navigationStarted=true;
  await loadVersion(urls[version]);
  const applied=await retry('apply',snapshot);
  verifyState(applied,snapshot);
  current=version;
  selectActive(version);
  label.textContent=labels[version]+' — angle, zoom et paramètres conservés';
 })().catch(async err=>{
  console.warn('SYNESTRA_AB_SYNC_FAIL',previous,version,err);
  // A failed capture never navigated: keep the unchanged scene.
  if(!navigationStarted){
   label.textContent=labels[previous]+' — changement refusé : '+String(err.message||err).slice(0,80);
   return;
  }
  // If the target loaded but apply failed, recover the exact previous camera/controls.
  try{
   if(!snapshot)throw Error('ROLLBACK_SNAPSHOT_MISSING');
   label.textContent='Échec de synchronisation — restauration en cours…';
   await loadVersion(urls[previous]);
   verifyState(await retry('apply',snapshot),snapshot);
   current=previous;
   selectActive(previous);
   label.textContent=labels[previous]+' — version précédente restaurée';
   console.info('SYNESTRA_AB_ROLLBACK_PASS',previous);
  }catch(recoveryError){
   // Never present an unqualified target as an approved comparison.
   blocked=true;
   for(const b of buttons)b.setAttribute('aria-pressed','false');
   label.textContent='COMPARAISON SUSPENDUE — rechargez la page avant de continuer';
   console.error('SYNESTRA_AB_ROLLBACK_FAILED',recoveryError);
  }
 }).finally(()=>{
  busy=false;
  for(const b of buttons)b.disabled=blocked;
 });
}
for(const button of buttons)button.addEventListener('click',()=>choose(button.dataset.variant));
frame.addEventListener('load',()=>{
 if(!busy&&!blocked)label.textContent=labels[current]+' — prêt pour comparaison synchronisée';
});

const exportButton=document.getElementById('export-comparison');
const exportStatus=document.getElementById('export-status');
const previewPanel=document.getElementById('export-preview');
const previewImage=document.getElementById('export-preview-image');
const downloadLink=document.getElementById('download-png');
let lastPreviewUrl=null;
function imageFromDataUrl(data){
 return new Promise((resolve,reject)=>{
  if(typeof data!=='string'||!data.startsWith('data:image/png;base64,')||data.length>12000000){reject(Error('INVALID_PNG_INPUT'));return}
  const img=new Image();
  img.onload=()=>resolve(img);
  img.onerror=()=>reject(Error('PNG_DECODE_FAILED'));
  img.src=data;
 });
}
async function prepareComparisonPNG(images){
 const a=images.r20224,b=images.r20225;
 if(!a||!b||a.width!==b.width||a.height!==b.height||a.width<200||a.height<200||a.width*a.height>3200000)throw Error('INVALID_DIMENSIONS');
 const [left,right]=await Promise.all([imageFromDataUrl(a.dataUrl),imageFromDataUrl(b.dataUrl)]);
 if(left.naturalWidth!==a.width||right.naturalWidth!==b.width)throw Error('IMAGE_DIMENSIONS_MISMATCH');
 const gap=18,margin=24,header=76;
 const w=margin*2+left.naturalWidth+right.naturalWidth+gap,h=header+left.naturalHeight+margin;
 if(w*h>8200000)throw Error('EXPORT_TOO_LARGE');
 const result=document.createElement('canvas');
 result.width=w;result.height=h;
 const ctx=result.getContext('2d',{alpha:false});
 if(!ctx)throw Error('EXPORT_CONTEXT_UNAVAILABLE');
 ctx.fillStyle='#061020';ctx.fillRect(0,0,w,h);
 ctx.font='bold 20px system-ui,sans-serif';ctx.fillStyle='#dff6ff';
 ctx.fillText('R202.24 — référence',margin,39);
 ctx.fillText('R202.25 — profondeur corrigée',margin+left.naturalWidth+gap,39);
 ctx.font='12px system-ui,sans-serif';ctx.fillStyle='#9db5cb';
 ctx.fillText('Même angle · mêmes réglages · frame 6 · 80 triangles',margin,60);
 ctx.drawImage(left,margin,header);ctx.drawImage(right,margin+left.naturalWidth+gap,header);
 const blob=await new Promise(resolve=>result.toBlob(resolve,'image/png'));
 if(!blob||blob.size<3000)throw Error('EXPORT_EMPTY');
 if(lastPreviewUrl)URL.revokeObjectURL(lastPreviewUrl);
 lastPreviewUrl=URL.createObjectURL(blob);
 downloadLink.href=lastPreviewUrl;
 previewImage.src=lastPreviewUrl;
 previewPanel.hidden=false;
 return blob.size;
}
async function exportComparison(){
 if(blocked||busy)return;
 busy=true;for(const b of [...buttons,exportButton])b.disabled=true;
 const initial=current,other=initial==='r20224'?'r20225':'r20224';
 let state=null,navigated=false,error=null,restored=true,images={};
 try{
  exportStatus.textContent='Capture de '+initial+'…';
  state=await retry('capture');
  if(!state?.camera||!state.settings)throw Error('EXPORT_STATE_MISSING');
  images[initial]=await retry('capturePng');
  exportStatus.textContent='Capture de '+other+' au même angle…';
  navigated=true;
  await loadVersion(urls[other]);
  verifyState(await retry('apply',state),state);
  images[other]=await retry('capturePng');
 }catch(e){error=e;console.warn('SYNESTRA_EXPORT_CAPTURE_FAILURE',e)}
 finally{
  if(navigated){
   try{
    exportStatus.textContent='Restauration du rendu d’origine…';
    await loadVersion(urls[initial]);
    verifyState(await retry('apply',state),state);
    current=initial;selectActive(initial);
   }catch(e){
    restored=false;blocked=true;
    for(const b of buttons)b.setAttribute('aria-pressed','false');
    label.textContent='COMPARAISON SUSPENDUE — rechargez la page';
    error=error||e;
    console.error('SYNESTRA_EXPORT_RESTORE_FAILURE',e);
   }
  }
  if(restored&&!error){
   try{
    const bytes=await prepareComparisonPNG(images);
    exportStatus.textContent='PNG prêt — '+Math.round(bytes/1024)+' Ko. Cliquez sur « Enregistrer le PNG » pour le télécharger.';
    console.info('SYNESTRA_EXPORT_PNG_READY',{bytes,versions:Object.keys(images)});
   }catch(e){error=e;exportStatus.textContent='Export refusé : '+String(e.message||e);console.warn('SYNESTRA_EXPORT_PNG_FAILURE',e)}
  }else{
   exportStatus.textContent=restored?'Export refusé : '+String(error?.message||error):'Comparaison suspendue — rechargez la page';
  }
  if(restored)label.textContent=labels[initial]+' — angle et paramètres restaurés';
  busy=false;
  for(const b of [...buttons,exportButton])b.disabled=blocked;
 }
}
exportButton.addEventListener('click',exportComparison);
