/* Synestra SiteForge 3D Lab V1 — local scene editor, bounded JSON presets.
 * No external service, cookies, hidden persistence, arbitrary JS or uploads.
 */
(()=>{
'use strict';
const form=document.getElementById('sf3d-controls');
const api=window.SynestraSiteForge3D;
if(!form||!api)return;
const names=['width','depth','speed','yaw','pitch','material'];
const fields=Object.fromEntries(names.map(name=>[name,form.elements.namedItem(name)]));
const valueNode=name=>document.getElementById('sf3d-out-'+name);
const status=document.getElementById('sf3d-editor-status');
const say=text=>{if(status)status.textContent=text;};
const sync=config=>{
 for(const name of names){
   if(!fields[name])continue;
   fields[name].value=String(config[name]);
   if(valueNode(name))valueNode(name).textContent=typeof config[name]==='number'?config[name].toFixed(name==='yaw'||name==='pitch'?0:2):config[name];
 }
 const pause=document.getElementById('sf3d-pause');
 if(pause){pause.textContent=config.paused?'Reprendre l’animation':'Mettre en pause';pause.setAttribute('aria-pressed',String(config.paused));}
};
sync(api.snapshot().config);
const update=()=>{
 const data={};
 for(const name of names)if(fields[name])data[name]=name==='material'?fields[name].value:Number(fields[name].value);
 const result=api.configure(data);sync(result.config);say('Réglages appliqués dans la scène.');};
form.addEventListener('input',event=>{if(event.target?.name&&names.includes(event.target.name))update();});
form.addEventListener('change',event=>{if(event.target?.name&&names.includes(event.target.name))update();});
document.getElementById('sf3d-pause')?.addEventListener('click',()=>{const current=api.snapshot().config;sync(api.configure({paused:!current.paused}).config);say('Animation '+(current.paused?'reprise.':'en pause.'));});
document.getElementById('sf3d-reset')?.addEventListener('click',()=>{sync(api.reset().config);say('Configuration initiale restaurée.');});
document.getElementById('sf3d-export')?.addEventListener('click',()=>{
 const data=JSON.stringify(api.snapshot(),null,2)+'\n';
 const url=URL.createObjectURL(new Blob([data],{type:'application/json'}));
 const anchor=document.createElement('a');anchor.href=url;anchor.download='synestra-siteforge-3d-preset.json';
 document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),0);
 say('Configuration JSON exportée. Elle pourra être réutilisée dans SiteForge.');
});
document.getElementById('sf3d-import')?.addEventListener('change',async event=>{
 const file=event.target.files?.[0];event.target.value='';
 if(!file)return;
 if(file.size>16000){say('Refus : configuration trop volumineuse.');return;}
 try{
   const json=JSON.parse(await file.text());
   if(json?.schema!=='synestra.siteforge.3d-preset.v1'||!json.config||typeof json.config!=='object'||Array.isArray(json.config))
      throw new Error('invalid schema');
   sync(api.configure(json.config).config);say('Configuration validée et importée.');
 }catch{say('Import refusé : fichier JSON ou schéma invalide.');}
});
})();
