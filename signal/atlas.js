/* SYNESTRA SIGNAL R14 / PROOF ATLAS — public synthetic ProofPath only, zero network. */
(() => {
"use strict";
const data=window.ProofPathData,digest=window.ProofPathDigest;
if(!data||data.schema!=="synestra.proofpath.machine.v0"||data.synthetic!==true||
   !Array.isArray(data.journeys)||data.journeys.length!==3||!/^[a-f0-9]{64}$/.test(digest||""))return;
const order=["explorer","comparer","verifier"];
const colors={explorer:"#c7ff9a",comparer:"#ffb38b",verifier:"#8cf1e6"};
const labels={explorer:"CRÉER",comparer:"PILOTER",verifier:"PROUVER"};
if(!order.every(id=>data.journeys.some(j=>j.intent===id&&j.items.length===2)))return;
const container=document.getElementById("main"),before=document.getElementById("concept");
if(!container||!before||document.getElementById("atlas"))return;
const make=(tag,cls,value)=>{
 const e=document.createElement(tag);
 if(cls)e.className=cls;
 if(value!==undefined)e.textContent=String(value);
 return e;
};
const section=make("section","atlas-stage");
section.id="atlas";section.setAttribute("aria-labelledby","atlas-title");
const layout=make("div","shell atlas-layout");section.append(layout);
const intro=make("div","atlas-editorial");layout.append(intro);
intro.append(make("span","atlas-kicker","R14 / PROOFPATH — ATLAS VIVANT"));
const title=make("h2","atlas-title");
title.id="atlas-title";title.append(document.createTextNode("CHAQUE IDÉE"),make("em","","A UNE TRACE."));
intro.append(title);
intro.append(make("p","atlas-lead","Une constellation de décisions. Changez d'intention, choisissez un signal : ses faits, sa provenance déclarée et ses limites apparaissent sans rupture."));
const switcher=make("div","atlas-switcher");
switcher.setAttribute("role","group");switcher.setAttribute("aria-label","Choisir une intention");
intro.append(switcher);
const status=make("p","atlas-status");status.setAttribute("role","status");status.setAttribute("aria-live","polite");intro.append(status);
const integrity=make("div","atlas-integrity");
integrity.append(make("span","","CONTRAT / SHA-256"),make("code","",digest.slice(0,12)),make("span","","FICTION · AUCUNE ATTESTATION"));
intro.append(integrity);
const deepLink=make("a","atlas-deeplink","PARTAGER CE SIGNAL ↗");
deepLink.id="atlas-deeplink";deepLink.setAttribute("aria-label","Lien partageable vers ce signal fictif");intro.append(deepLink);
const field=make("div","atlas-field");field.setAttribute("aria-label","Constellation des six faits fictifs");layout.append(field);
const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
svg.setAttribute("class","atlas-threads");svg.setAttribute("viewBox","0 0 100 100");svg.setAttribute("preserveAspectRatio","none");svg.setAttribute("aria-hidden","true");
field.append(svg);
const core=make("div","atlas-core");core.setAttribute("aria-hidden","true");
core.append(make("span","","S / ∞"),make("small","","SOURCE / FICTION"));field.append(core);
const positions=[[17,27],[25,75],[51,12],[83,30],[81,78],[51,90]];
const records=[];
for(const [j,journey] of data.journeys.entries()){
 for(const [k,f] of journey.items.entries()){
  if(!order.includes(journey.intent)||typeof f.id!=="string"||typeof f.title!=="string"||
     typeof f.detail!=="string"||typeof f.source?.title!=="string"||
     typeof f.valid_until!=="string")return;
  const i=j*2+k, [x,y]=positions[i];
  const line=document.createElementNS("http://www.w3.org/2000/svg","path");
  line.setAttribute("d","M 50 50 Q "+((50+x)/2+(i%2?6:-6))+" "+((50+y)/2+(i%2?-4:4))+" "+x+" "+y);
  line.setAttribute("class","atlas-thread");svg.append(line);
  const button=make("button","atlas-point");button.type="button";
  button.dataset.intent=journey.intent;button.dataset.factId=f.id;
  button.setAttribute("aria-label",labels[journey.intent]+" : "+f.title+". Afficher sa source déclarée");
  button.setAttribute("aria-pressed","false");
  button.style.left=x+"%";button.style.top=y+"%";
  button.append(make("span","atlas-point-index","0"+(i+1)),make("strong","",f.title),make("span","atlas-point-sigil","↗"));
  field.append(button);records.push({button,line,fact:f,intent:journey.intent});
 }
}
const lens=make("aside","atlas-lens");lens.setAttribute("aria-label","Détail et provenance déclarée");
const lensTag=make("div","atlas-lens-label","SIGNAL / DONNÉE FICTIVE");
const lensTitle=make("h3","atlas-lens-title");
const detail=make("p","atlas-lens-detail");
const source=make("p","atlas-lens-source");
const expiry=make("p","atlas-lens-expiry");
lens.append(lensTag,lensTitle,detail,source,expiry);field.append(lens);
let current="explorer",selected=null;
const toggles=order.map((id,i)=>{
 const b=make("button","atlas-mode","0"+(i+1)+" / "+labels[id]);
 b.type="button";b.dataset.intent=id;b.setAttribute("aria-pressed","false");
 b.addEventListener("click",()=>setMode(id));switcher.append(b);return b;
});
function select(record){
 selected=record;
 for(const r of records){
  const active=r===record;
  r.button.classList.toggle("selected",active);
  r.button.setAttribute("aria-pressed",String(active));
  r.line.classList.toggle("selected",active);
 }
 lensTitle.textContent=record.fact.title;
 detail.textContent=record.fact.detail;
 source.textContent="SOURCE DÉCLARÉE · NON ATTESTÉE : "+record.fact.source.title;
 expiry.textContent="VALIDITÉ DÉCLARÉE : "+record.fact.valid_until.slice(0,10);
 status.textContent=labels[current]+" — "+record.fact.title+". Source non attestée.";
 deepLink.href="?mode="+current+"&fact="+encodeURIComponent(record.fact.id)+"#atlas";
}
function sync(id){
 if(!Object.hasOwn(colors,id))return;
 const changed=current!==id;current=id;
 section.style.setProperty("--atlas-accent",colors[id]);
 for(const b of toggles)b.setAttribute("aria-pressed",String(b.dataset.intent===id));
 for(const r of records){
  r.button.classList.toggle("in-mode",r.intent===id);
  r.line.classList.toggle("in-mode",r.intent===id);
 }
 if(changed||!selected||selected.intent!==id)select(records.find(r=>r.intent===id));
}
function setMode(id){
 if(!Object.hasOwn(colors,id))return;
 const origin=document.querySelector('.signal-node[data-intent="'+id+'"]');
 if(origin&&origin.getAttribute("aria-pressed")!=="true")origin.click();
 sync(id);
}
records.forEach(r=>r.button.addEventListener("click",()=>{
 if(r.intent!==current)setMode(r.intent);
 select(r);
}));
const rail=document.querySelector(".signal-rail");
rail?.addEventListener("click",e=>{
 const b=e.target.closest?.(".signal-node");
 if(b?.dataset.intent)queueMicrotask(()=>sync(b.dataset.intent));
});
document.addEventListener("signal:modechange",e=>sync(e.detail?.intent));
const watcher=new MutationObserver(()=>{
 const active=document.querySelector('.signal-node[aria-pressed="true"]');
 if(active?.dataset.intent!==current)sync(active.dataset.intent);
});
if(rail)watcher.observe(rail,{subtree:true,attributes:true,attributeFilter:["aria-pressed"]});
container.insertBefore(section,before);
sync(document.querySelector('.signal-node[aria-pressed="true"]')?.dataset.intent||"explorer");
const requested=new URLSearchParams(window.location.search).get("fact");
const match=records.find(r=>r.fact.id===requested&&r.intent===current);
if(match)select(match);
section.dataset.ready="true";
window.SignalR14Diagnostics=Object.freeze({ready:true,nodes:records.length,digest,synthetic:true});
})();