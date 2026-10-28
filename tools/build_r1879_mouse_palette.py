"""R187.9: native mouse disturbance switch + six palettes / per-flux colors.
Isolated deterministic delta; older materials/18-key JSON remain unchanged.
"""
from pathlib import Path
from hashlib import sha256
import re,base64
root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1878-autonome.html"
dst=root/"siteforge-r1879-autonome.html"
raw=src.read_bytes()
assert sha256(raw.replace(b"\r\n",b"\n")).hexdigest()=="9a26a832d79b98f79cd77ad9e5e352b7e77cbfabaedbe75f6e19b810d90fbe69","R1878_BASE_SHA_MISMATCH"
s=raw.decode("utf-8").replace("\r\n","\n")
def replace_once(old,new,area="html"):
 global s
 if s.count(old)==0 and old.startswith("   ") and s.count(old[1:])==1: old=old[1:]
 assert s.count(old)==1,("TARGET_COUNT",area,repr(old[:120]),s.count(old))
 s=s.replace(old,new,1)

# Separate UI: no second WebGL engine, no new data-sphere-control or data-flow-control fields.
ui='''<fieldset class="control-group energy-visual" data-energy-visual>
<legend>Interaction et couleurs · R187.9</legend>
<div class="control-row"><label class="control-label" for="sf-energyMouseToggle"><span>Perturbation à la souris</span><output data-energy-mouse-value>Oui</output></label>
<button type="button" id="sf-energyMouseToggle" data-energy-mouse-toggle aria-pressed="true" aria-label="Perturbation des flux par la souris : activée">Oui — interaction activée</button></div>
<p class="help">Déplace la souris sur la sphère : les flux réagissent localement, laissent une impulsion et reviennent au repos. Non = aucune perturbation des flux.</p>
<div class="control-row"><label class="control-label" for="sf-energyPalette"><span>Palette des flux</span></label>
<select id="sf-energyPalette" data-energy-palette>
<option value="synestra" selected>Synestra — cyan et magenta</option>
<option value="emerald">Émeraude et violet</option><option value="gold">Or et ambre</option>
<option value="electric">Rouge et bleu électrique</option><option value="ice">Glace monochrome</option>
<option value="rose">Plasma rose monochrome</option><option value="custom">Personnalisée</option>
</select></div>
<div class="color-grid">
<div class="control-row"><label class="control-label" for="sf-energyA"><span>Flux principal</span><output data-energy-color-value="a">#18EDFF</output></label><input id="sf-energyA" type="color" data-energy-color="a" value="#18edff"></div>
<div class="control-row"><label class="control-label" for="sf-energyB"><span>Flux secondaire</span><output data-energy-color-value="b">#E817C8</output></label><input id="sf-energyB" type="color" data-energy-color="b" value="#e817c8"></div>
<div class="control-row"><label class="control-label" for="sf-energyCore"><span>Noyau lumineux</span><output data-energy-color-value="core">#EAFFFF</output></label><input id="sf-energyCore" type="color" data-energy-color="core" value="#eaffff"></div></div>
<p class="help">Les couleurs du matériau énergétique sont indépendantes de la palette plasma historique. Un changement manuel active le mode Personnalisée.</p>
</fieldset>
'''
replace_once('<details class="lab-optional" data-lab-optional>',ui+'<details class="lab-optional" data-lab-optional>','visual panel')
style='''\n.energy-visual{padding:13px 12px;border:1px solid #2c5369;border-radius:12px;background:linear-gradient(150deg,#102337,#0b1a2d)}
.energy-visual>legend{padding:0 5px}
.energy-visual [data-energy-mouse-toggle]{width:100%;min-height:43px;text-align:center;cursor:pointer;border:1px solid #6b97a9;border-radius:10px;background:#164c58;color:#ddfaff;font:inherit;font-weight:650}
.energy-visual [data-energy-mouse-toggle][aria-pressed="false"]{background:#152739;border-color:#466177;color:#a6bacc}
.energy-visual [data-energy-mouse-toggle]:focus-visible{outline:3px solid #8df2ff;outline-offset:3px}
.energy-visual select[data-energy-palette]{width:100%;min-height:44px;color:#eaf8ff;background:#132c44;border:1px solid #41627d;border-radius:10px;padding:9px;font:inherit}
.energy-visual select[data-energy-palette]:focus-visible{outline:3px solid #8df2ff;outline-offset:3px}
.energy-visual .color-grid{margin-top:12px}
'''
replace_once("</style>",style+"</style>","CSS")

# Site-only inputs kept separate from old parameter contract.
replace_once("   const flowValue=k=>Number(flowControls[k]?.value??flowDefaults[k]);",
"""   const flowValue=k=>Number(flowControls[k]?.value??flowDefaults[k]);
   const energyPalette=document.querySelector('[data-energy-palette]');
   const energyMouseToggle=document.querySelector('[data-energy-mouse-toggle]');
   const energyColorControls=Object.fromEntries([...document.querySelectorAll('[data-energy-color]')].map(e=>[e.dataset.energyColor,e]));
   const energyPalettes={
    synestra:['#18edff','#e817c8','#eaffff'],
    emerald:['#37f0aa','#ae6bff','#d5fff0'],
    gold:['#ffdc6c','#f49a35','#fff1c8'],
    electric:['#fb5260','#438dff','#f7fbff'],
    ice:['#64e9ff','#abd8ff','#ebfdff'],
    rose:['#fc77d7','#f8b3f0','#fff1fc']
   };
   const energyColorDefaults={a:'#18edff',b:'#e817c8',core:'#eaffff'};
   let energyMouseEnabled=true;
   const energyRGB=k=>[1,3,5].map(i=>parseInt(energyColorControls[k].value.slice(i,i+2),16)/255);
   const useEnergyPalette=name=>{
    const values=energyPalettes[name];
    if(!values)return;
    for(const [i,k] of ['a','b','core'].entries())energyColorControls[k].value=values[i];
   };""","energy state")
replace_once("   for(const [k,e] of Object.entries(flowControls)){",
"""   for(const [key,input] of Object.entries(energyColorControls)){
    const out=document.querySelector('[data-energy-color-value="'+key+'"]');
    if(out)out.textContent=input.value.toUpperCase();
   }
   if(energyMouseToggle){
    energyMouseToggle.setAttribute('aria-pressed',String(energyMouseEnabled));
    energyMouseToggle.textContent=energyMouseEnabled?'Oui — interaction activée':'Non — interaction désactivée';
    energyMouseToggle.setAttribute('aria-label','Perturbation des flux par la souris : '+(energyMouseEnabled?'activée':'désactivée'));
    stage.dataset.energyMouseEnabled=String(energyMouseEnabled);
    const output=document.querySelector('[data-energy-mouse-value]');
    if(output)output.textContent=energyMouseEnabled?'Oui':'Non';
   }
   stage.dataset.energyPalette=energyPalette?.value||'synestra';
   for(const [k,e] of Object.entries(flowControls)){""","sync visual")
replace_once("""   if(e.target?.hasAttribute('data-sphere-control')||e.target?.hasAttribute('data-mote-control')||e.target?.hasAttribute('data-flow-control')){""",
"""   if(e.target===energyPalette){
    useEnergyPalette(energyPalette.value);sync();schedule();return;
   }
   if(e.target?.hasAttribute('data-energy-color')){
    energyPalette.value='custom';sync();schedule();return;
   }
   if(e.target?.hasAttribute('data-sphere-control')||e.target?.hasAttribute('data-mote-control')||e.target?.hasAttribute('data-flow-control')){""","UI events")
replace_once("   const art=event.target.closest('[data-art-preset]');",
"""   if(event.target.closest('[data-energy-mouse-toggle]')){
    energyMouseEnabled=!energyMouseEnabled;
    pointerForce=0;lastPointerX=null;lastPointerY=null;
    sync();schedule();return;
   }
   const art=event.target.closest('[data-art-preset]');""","toggle click")
replace_once("    for(const [key,input] of Object.entries(flowControls))input.value=flowDefaults[key];",
"""    for(const [key,input] of Object.entries(flowControls))input.value=flowDefaults[key];
    energyMouseEnabled=true;energyPalette.value='synestra';useEnergyPalette('synestra');
    pointerForce=0;lastPointerX=null;lastPointerY=null;""","reset")
replace_once("    const documentJSON={",
"""    const energyVisual={
     mouseEnabled:energyMouseEnabled,
     palette:energyPalette.value,
     colorA:energyColorControls.a.value.toLowerCase(),
     colorB:energyColorControls.b.value.toLowerCase(),
     coreColor:energyColorControls.core.value.toLowerCase()
    };
    const documentJSON={""","export visual object")
replace_once("    energyFlow\n   };","    energyFlow,\n    energyVisual\n   };","JSON sibling")
replace_once("""    return {nextPlasma,nextMotes,nextFlow,enabled:values.enabled===undefined?true:values.enabled};""",
"""    const ev=doc.energyVisual;
    if(ev!==undefined&&(!ev||typeof ev!=='object'||Array.isArray(ev)))throw Error('Interaction et couleurs invalides.');
    const visualKeys=['mouseEnabled','palette','colorA','colorB','coreColor'];
    if(ev!==undefined&&(Object.keys(ev).length!==visualKeys.length||visualKeys.some(k=>!Object.prototype.hasOwnProperty.call(ev,k))))
     throw Error('Les cinq options visuelles sont requises.');
    if(ev!==undefined&&(typeof ev.mouseEnabled!=='boolean'||typeof ev.palette!=='string'||
       !Array.from(energyPalette.options).some(x=>x.value===ev.palette)||
       ['colorA','colorB','coreColor'].some(k=>typeof ev[k]!=='string'||!/^#[0-9a-f]{6}$/i.test(ev[k]))))
     throw Error('Palette ou couleur invalide.');
    const nextVisual=ev===undefined?
     {mouseEnabled:true,palette:'synestra',colorA:energyColorDefaults.a,colorB:energyColorDefaults.b,coreColor:energyColorDefaults.core}:
     {mouseEnabled:ev.mouseEnabled,palette:ev.palette,colorA:ev.colorA.toLowerCase(),colorB:ev.colorB.toLowerCase(),coreColor:ev.coreColor.toLowerCase()};
    return {nextPlasma,nextMotes,nextFlow,nextVisual,enabled:values.enabled===undefined?true:values.enabled};""","validate atomic")
replace_once("""    for(const [k,v] of Object.entries(values.nextFlow))flowControls[k].value=v;
    motesEnabled=values.enabled;pointerForce=0;setCustomArt();""",
"""     for(const [k,v] of Object.entries(values.nextFlow))flowControls[k].value=v;
     const visual=values.nextVisual;
     energyMouseEnabled=visual.mouseEnabled;energyPalette.value=visual.palette;
     energyColorControls.a.value=visual.colorA;energyColorControls.b.value=visual.colorB;energyColorControls.core.value=visual.coreColor;
     motesEnabled=values.enabled;pointerForce=0;lastPointerX=null;lastPointerY=null;setCustomArt();""","import apply")

# No duplicate renderer; separate uniforms only for energy material.
replace_once("uniform vec4 uFlowLab; // count, path spacing, pulse speed, pulse intensity",
"""uniform vec4 uFlowLab; // count, path spacing, pulse speed, pulse intensity
 uniform float uEnergyMouse;
 uniform vec3 uEnergyA,uEnergyB,uEnergyCore;""","shader uniforms")
replace_once("   vec3 cyanNeon=mix(uCyan,vec3(.035,.94,1.),.83);",
             "   vec3 cyanNeon=uEnergyA;","energy color A")
replace_once("   vec3 pinkNeon=mix(uViolet,vec3(1.,.07,.82),.86);",
             "   vec3 pinkNeon=uEnergyB;","energy color B")
replace_once("    q.xy+=wp*uPointer.z*.11*(1.-smoothstep(.12,.70,length(wp)));",
"""    // Screen-local disturbance driven by pointer velocity; bounded, reversible.
    // Switched off: no cursor influence in the energy shader.
    float mouseKick=uPointer.z*uEnergyMouse;
    float mouseWeight=(1.-smoothstep(.07,.74,length(wp)));
    q.xy+=wp*mouseKick*.68*mouseWeight;""","3d mouse disturbance")
replace_once("Lneon+=uCore*coreNeon*(.14+.045*sin(flowTime*3.5))",
             "Lneon+=uEnergyCore*coreNeon*(.14+.045*sin(flowTime*3.5))","core color")
replace_once("'uFlowLab','uCompare'","'uFlowLab','uEnergyMouse','uEnergyA','uEnergyB','uEnergyCore','uCompare'","shader key list")
replace_once("""   gl.uniform4f(U.uFlowLab,flowValue('count'),flowValue('spread')/100,flowValue('pulseSpeed')/100,flowValue('pulseIntensity')/100);""",
"""   gl.uniform4f(U.uFlowLab,flowValue('count'),flowValue('spread')/100,flowValue('pulseSpeed')/100,flowValue('pulseIntensity')/100);
   gl.uniform1f(U.uEnergyMouse,energyMouseEnabled?1:0);
   gl.uniform3fv(U.uEnergyA,new Float32Array(energyRGB('a')));
   gl.uniform3fv(U.uEnergyB,new Float32Array(energyRGB('b')));
   gl.uniform3fv(U.uEnergyCore,new Float32Array(energyRGB('core')));""","uniform binding")

for before,after in [
 ("<title>SiteForge — Laboratoire énergétique 3D R187.8</title>","<title>SiteForge — Laboratoire énergétique 3D R187.9</title>"),
 ("Flux architecturés · R187.8","Flux interactifs · R187.9"),
 ("LAB R187.8","LAB R187.9"),
 ("Architecture des flux · R187.8","Architecture des flux · R187.9"),
 ("Les nouveaux contrôles modifient uniquement les flux R187.8.","Les nouveaux contrôles modifient uniquement les flux R187.9.")
]:replace_once(before,after,"UI version")

m=re.search(r"(?s)<script>(.*?)</script>",s)
assert m and s.count("<script>")==1
hash64=base64.b64encode(sha256(m.group(1).encode("utf8")).digest()).decode()
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+hash64+"'",1)
assert s.count("data-sphere-control=")==raw.decode("utf8").count("data-sphere-control=")
assert s.count("data-flow-control=")==raw.decode("utf8").count("data-flow-control=")
assert s.count("data-mote-control=")==raw.decode("utf8").count("data-mote-control=")
assert s.count('data-energy-color=')==3
assert "const nextVisual=" in s and "gl.uniform1f(U.uEnergyMouse" in s
dst.write_bytes(s.encode("utf8"))
print("R1879_MOUSE_PALETTE_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",hash64)
