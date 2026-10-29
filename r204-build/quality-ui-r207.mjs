import {sanitizeQualityMode,resolveQualityTier} from './quality-policy.mjs';
export function createQualityPanel({stage,detectedTier,coarse,onChange}){
 let initial='auto';
 try{initial=sanitizeQualityMode(localStorage.getItem('synestra-core-quality-v1'));}catch(_){}
 const root=document.createElement('div');root.className='r207-quality-panel';
 const label=document.createElement('label');label.htmlFor='r207-quality-select';label.textContent='Qualité 3D';
 const select=document.createElement('select');select.id='r207-quality-select';
 for(const [v,title] of [['auto','Auto (recommandé)'],['eco','Économie'],['balanced','Équilibré'],
   ['high','Élevée'],['ultra','Ultra']]){
  const option=document.createElement('option');option.value=v;option.textContent=title;select.appendChild(option);
 }
 select.value=initial;
 const readout=document.createElement('span');readout.className='r207-quality-readout';
 readout.setAttribute('aria-live','polite');
 root.append(label,select,readout);
 stage.appendChild(root);
 const update=(tier,fps)=>{
  readout.textContent='GPU '+detectedTier+' · rendu '+tier+' / 3'+(fps?' · '+fps+' FPS':'');
  stage.dataset.qualityPreference=select.value;
 };
 const handle=()=>{
  const mode=sanitizeQualityMode(select.value);
  try{localStorage.setItem('synestra-core-quality-v1',mode);}catch(_){}
  const tier=resolveQualityTier(mode,detectedTier,coarse);
  onChange(tier,mode);update(tier);
 };
 select.addEventListener('change',handle);
 const tier=resolveQualityTier(initial,detectedTier,coarse);
 update(tier);
 return {tier,update,getMode(){return select.value;},dispose(){select.removeEventListener('change',handle);root.remove();}};
}
