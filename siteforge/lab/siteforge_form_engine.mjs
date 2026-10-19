/* SiteForge R9 / Form Language Engine. Pure deterministic art recipe compiler.
   Safe for Node and browser. No IO, storage, network or credentials. */
export const MODES=Object.freeze(["orbit","weave","glyph"]);
export const PALETTES=Object.freeze({
  electric:Object.freeze(["#1e2345","#bfffe5","#8a76ff","#f9e961","#fb7d63"]),
  cobalt:Object.freeze(["#071d43","#3c65f2","#b9efff","#e2fc69","#ffffff"]),
  ceramic:Object.freeze(["#311d25","#fa8e70","#ffc8a0","#ffe5cb","#abf5ce"])
});
export const DEFAULT_RECIPE=Object.freeze({mode:"orbit",palette:"electric",seed:41,energy:64,complexity:5});
const finiteInt=(v,min,max,label)=>{
  if(typeof v!=="number"||!Number.isInteger(v)||v<min||v>max)
    throw Error("SITEFORGE_"+label+"_DENIED");
  return v;
};
export function parseRecipe(input={}){
  if(input===null||typeof input!=="object"||Array.isArray(input))throw Error("SITEFORGE_RECIPE_DENIED");
  if(Object.keys(input).some(k=>!["mode","palette","seed","energy","complexity"].includes(k)))
    throw Error("SITEFORGE_RECIPE_KEYS_DENIED");
  const out={...DEFAULT_RECIPE,...input};
  if(!MODES.includes(out.mode))throw Error("SITEFORGE_MODE_DENIED");
  if(!Object.hasOwn(PALETTES,out.palette))throw Error("SITEFORGE_PALETTE_DENIED");
  finiteInt(out.seed,1,999999,"SEED");
  finiteInt(out.energy,0,100,"ENERGY");
  finiteInt(out.complexity,1,8,"COMPLEXITY");
  return out;
}
function rng(seed){
  let a=seed>>>0;
  return ()=>{
    a=(a+0x6D2B79F5)>>>0;
    let t=Math.imul(a^(a>>>15),1|a);
    t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}
const r3=v=>Math.round(v*1000)/1000;
export function composeArt(input={}){
  const recipe=parseRecipe(input),colors=PALETTES[recipe.palette],random=rng(recipe.seed);
  const count=8+recipe.complexity*5,shapes=[],amplitude=.4+recipe.energy/100;
  for(let i=0;i<count;i++){
    const t=i/count*2*Math.PI,offset=random()*.55;
    const orbit=120+((i%5)*29)+(recipe.energy/100)*38;
    const x=500+Math.cos(t*amplitude+offset)*orbit;
    const y=500+Math.sin(t*amplitude+offset)*orbit;
    const s=18+random()*76+recipe.energy*.35;
    const color=colors[1+Math.floor(random()*(colors.length-1))];
    if(recipe.mode==="orbit"){
      shapes.push({kind:"circle",cx:r3(x),cy:r3(y),r:r3(s*.95),
        fill:i%4===0?"none":color,stroke:color,sw:r3(2+random()*4),opacity:r3(.55+random()*.45)});
    }else if(recipe.mode==="weave"){
      const x2=500+Math.cos(t+Math.PI/2)*(orbit+100);
      const y2=500+Math.sin(t+Math.PI/2)*(orbit+100);
      shapes.push({kind:"path",d:"M "+r3(x)+" "+r3(y)+" Q "+r3(500+(random()-.5)*280)+" "+r3(500+(random()-.5)*280)+" "+r3(x2)+" "+r3(y2),
        fill:"none",stroke:color,sw:r3(2+recipe.energy/12),opacity:r3(.3+random()*.7)});
    }else{
      shapes.push({kind:"rect",x:r3(x-s/2),y:r3(y-s/2),w:r3(s*(.6+random()*1.5)),h:r3(s*.7),
        rotation:r3((random()-.5)*150),cx:r3(x),cy:r3(y),fill:color,opacity:r3(.48+random()*.52)});
    }
  }
  return {schema:"synestra.siteforge.form-language.v1",status:"PASS",recipe,viewBox:"0 0 1000 1000",
    background:colors[0],colors,shapes,count:shapes.length,assets:0,network:false,
    animation_required:false,deploy_authorized:false,owner_approval:false};
}
export function serializedRecipe(recipe){
  const p=parseRecipe(recipe);return JSON.stringify({schema:"synestra.siteforge.recipe.v1",...p});
}
export function recipeFromHash(hash){
  if(typeof hash!=="string"||hash.length>210)throw Error("SITEFORGE_HASH_DENIED");
  if(!hash||hash==="#")return {...DEFAULT_RECIPE};
  if(!hash.startsWith("#"))throw Error("SITEFORGE_HASH_DENIED");
  const q=new URLSearchParams(hash.slice(1));
  if([...q.keys()].some(k=>!["mode","palette","seed","energy","complexity"].includes(k)))
    throw Error("SITEFORGE_HASH_DENIED");
  for(const key of q.keys())if(q.getAll(key).length!==1)throw Error("SITEFORGE_HASH_DENIED");
  return parseRecipe({mode:q.get("mode")??DEFAULT_RECIPE.mode,
    palette:q.get("palette")??DEFAULT_RECIPE.palette,
    seed:q.has("seed")?Number(q.get("seed")):DEFAULT_RECIPE.seed,
    energy:q.has("energy")?Number(q.get("energy")):DEFAULT_RECIPE.energy,
    complexity:q.has("complexity")?Number(q.get("complexity")):DEFAULT_RECIPE.complexity});
}
export function recipeHash(recipe){
  const p=parseRecipe(recipe);return "#"+new URLSearchParams(p).toString();
}