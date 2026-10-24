/* SiteForge instrument: private-by-design browser UI. Same-origin only.
   Uses the pure Form Language Engine; no analytics, network or storage. */
import {composeArt,parseRecipe,recipeHash,recipeFromHash,serializedRecipe,PALETTES}
  from "./siteforge_form_engine.mjs";
const svgNS="http://www.w3.org/2000/svg";
const q=id=>document.getElementById(id);
const stage=q("art-stage"),recipeOut=q("recipe-output"),status=q("engine-status");
const mode=q("mode"),palette=q("palette"),energy=q("energy"),complexity=q("complexity");
const counter=q("variant"),energyOut=q("energy-value"),complexityOut=q("complexity-value");
const poster=q("poster"),previewTitle=q("art-name");
const node=(tag,attrs={})=>{
  const e=document.createElementNS(svgNS,tag);
  for(const [key,value] of Object.entries(attrs))e.setAttribute(key,String(value));
  return e;
};
let recipe;
try{recipe=recipeFromHash(location.hash)}catch{recipe=undefined;status.textContent="Lien de création invalide : paramètres ignorés."}
recipe=parseRecipe(recipe);
function draw(){
  const art=composeArt(recipe),fragment=document.createDocumentFragment();
  const background=node("rect",{x:0,y:0,width:1000,height:1000,fill:art.background});
  fragment.appendChild(background);
  const colors=art.colors,ring=node("circle",{cx:500,cy:500,r:320,fill:"none",stroke:colors[1],"stroke-width":1,opacity:.25});
  fragment.appendChild(ring);
  for(const shape of art.shapes){
    let element;
    if(shape.kind==="circle"){
      element=node("circle",{cx:shape.cx,cy:shape.cy,r:shape.r,fill:shape.fill,
        stroke:shape.stroke,"stroke-width":shape.sw,opacity:shape.opacity});
    }else if(shape.kind==="path"){
      element=node("path",{d:shape.d,fill:"none",stroke:shape.stroke,
        "stroke-width":shape.sw,"stroke-linecap":"round",opacity:shape.opacity});
    }else{
      element=node("rect",{x:shape.x,y:shape.y,width:shape.w,height:shape.h,rx:3,
        transform:"rotate("+shape.rotation+" "+shape.cx+" "+shape.cy+")",
        fill:shape.fill,opacity:shape.opacity});
    }
    fragment.appendChild(element);
  }
  stage.replaceChildren(fragment);
  mode.value=recipe.mode;palette.value=recipe.palette;
  energy.value=String(recipe.energy);complexity.value=String(recipe.complexity);
  counter.textContent=String(recipe.seed).padStart(4,"0");
  energyOut.textContent=String(recipe.energy);
  complexityOut.textContent=String(recipe.complexity);
  recipeOut.textContent=serializedRecipe(recipe);
  poster.style.setProperty("--poster-bg",art.background);
  poster.style.setProperty("--poster-accent",colors[1]);
  previewTitle.textContent={orbit:"ORBITAL / FORMS",weave:"WEAVE / FIELDS",glyph:"GLYPH / SYSTEMS"}[recipe.mode];
  status.textContent="Composition "+recipe.seed+" créée localement. "+art.count+" formes, aucune donnée transmise.";
}
function update(delta){
  try{
    recipe=parseRecipe({...recipe,...delta});
    const h=recipeHash(recipe);
    if(location.hash!==h)history.replaceState(null,"",h);
    draw();
  }catch{
    status.textContent="Configuration refusée : le dernier rendu valide est conservé.";
  }
}
q("controls").addEventListener("input",e=>{
  if(!["energy","complexity"].includes(e.target?.id))return;
  update({[e.target.id]:Number(e.target.value)});
});
q("controls").addEventListener("change",e=>{
  if(!["mode","palette"].includes(e.target?.id))return;
  update({[e.target.id]:e.target.value});
});
q("new-form").addEventListener("click",()=>update({seed:recipe.seed===999999?1:recipe.seed+1}));
q("reset-form").addEventListener("click",()=>update({mode:"orbit",palette:"electric",energy:64,complexity:5,seed:41}));
q("export-svg").addEventListener("click",()=>{
  const source=new XMLSerializer().serializeToString(stage);
  const anchor=document.createElement("a");
  anchor.download="synestra-open-form-"+String(recipe.seed).padStart(4,"0")+".svg";
  anchor.href="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
  document.body.appendChild(anchor);anchor.click();anchor.remove();
  status.textContent="Composition SVG exportée localement, sans transmission.";
});
q("copy-recipe").addEventListener("click",()=>{
  recipeOut.focus();
  const selection=window.getSelection();
  const range=document.createRange();
  range.selectNodeContents(recipeOut);
  selection.removeAllRanges();selection.addRange(range);
  status.textContent="Recette sélectionnée : Ctrl+C pour la copier. Le lien de cette page conserve aussi les paramètres.";
});
window.addEventListener("hashchange",()=>{
  try{recipe=recipeFromHash(location.hash);draw()}catch{status.textContent="Paramètres de lien non valides : rendu conservé."}
});
draw();
