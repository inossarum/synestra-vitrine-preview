"""R187.8 — independent count 3..8, spread, pulse speed/strength; backward-compatible JSON."""
from pathlib import Path
from hashlib import sha256
import re,base64
root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1877-autonome.html"
dst=root/"siteforge-r1878-autonome.html"
raw=src.read_bytes()
assert sha256(raw.replace(b"\r\n",b"\n")).hexdigest()=="098562085378f2b7bdc1a6525ec9f1b3fc55d4707c3cc05dd1dfeb8f3e00fd1b","BASELINE_SHA"
s=raw.decode('utf8').replace("\r\n","\n")
def replace(old,new):
 global s
 if s.count(old)!=1:
  # Source uses one-space JS indentation; tolerate one older two-space template layer.
  shifted=re.sub(r"(?m)^ ","",old)
  if s.count(shifted)==1: old=shifted
 assert s.count(old)==1,("MISSING_TARGET",old,s.count(old))
 s=s.replace(old,new,1)
# Four controls are not added to 18 historical data-sphere-control values.
ui="""<fieldset class="control-group flow-lab" data-flow-lab>
<legend>⚡ Architecture des flux · R187.8</legend>
<div class="control-row"><label class="control-label" for="sf-flowCount"><span>Nombre de flux</span><output data-flow-value="count" for="sf-flowCount">5</output></label><input id="sf-flowCount" data-flow-control="count" type="range" min="3" max="8" step="1" value="5" data-default="5"></div>
<div class="control-row"><label class="control-label" for="sf-flowSpread"><span>Écartement des trajectoires</span><output data-flow-value="spread" for="sf-flowSpread">100 %</output></label><input id="sf-flowSpread" data-flow-control="spread" type="range" min="70" max="130" step="1" value="100" data-default="100"></div>
<div class="control-row"><label class="control-label" for="sf-pulseSpeed"><span>Vitesse des impulsions</span><output data-flow-value="pulseSpeed" for="sf-pulseSpeed">100 %</output></label><input id="sf-pulseSpeed" data-flow-control="pulseSpeed" type="range" min="0" max="250" step="1" value="100" data-default="100"></div>
<div class="control-row"><label class="control-label" for="sf-pulseIntensity"><span>Intensité des impulsions</span><output data-flow-value="pulseIntensity" for="sf-pulseIntensity">100 %</output></label><input id="sf-pulseIntensity" data-flow-control="pulseIntensity" type="range" min="0" max="200" step="1" value="100" data-default="100"></div>
<p class="help">Les nouveaux contrôles modifient uniquement les flux R187.8. Le diamètre reste indépendant. À zéro, la vitesse des impulsions arrête leur animation interne.</p>
</fieldset>
"""
# Place the important density controls above volume/nucleus (not beneath them).
section=re.search(r'<fieldset class="control-group"><legend>[^<]*Volume et noyau</legend>',s)
assert section,"VOLUME_SECTION_NOT_FOUND"
replace(section.group(0),ui+section.group(0))
replace(" const num=k=>Number(controls[k]?.value??defaults[k])/100;",
"""  // R187.8 four optional live energy controls: never expand v1 18-field parameters.
  const flowControls=Object.fromEntries([...document.querySelectorAll('[data-flow-control]')].map(e=>[e.dataset.flowControl,e]));
  const flowDefaults=Object.fromEntries(Object.entries(flowControls).map(([k,e])=>[k,e.dataset.default??e.value]));
  const flowValue=k=>Number(flowControls[k]?.value??flowDefaults[k]);
  const num=k=>Number(controls[k]?.value??defaults[k])/100;""")
replace("  function sync(){",
"""  function sync(){
   for(const [k,e] of Object.entries(flowControls)){
    const out=document.querySelector('[data-flow-value="'+k+'"]');
    if(out)out.textContent=e.value+(k==='count'?'':' %');
   }""")
replace("e.target?.hasAttribute('data-sphere-control')||e.target?.hasAttribute('data-mote-control')",
        "e.target?.hasAttribute('data-sphere-control')||e.target?.hasAttribute('data-mote-control')||e.target?.hasAttribute('data-flow-control')")
replace("   for(const [key,input] of Object.entries(moteControls))input.value=moteDefaults[key];",
"""   for(const [key,input] of Object.entries(moteControls))input.value=moteDefaults[key];
   for(const [key,input] of Object.entries(flowControls))input.value=flowDefaults[key];""")
replace("""   const documentJSON={
    schema:'synestra.siteforge.plasma-settings.v1',
    version:1,
    engine:'siteforge-plasma-webgl1',
    parameters,
    motes
   };""",
"""   // Backward compatible: v1 parameters retain exactly 18 old keys.
   const energyFlow=Object.fromEntries(Object.entries(flowControls).map(([key,input])=>[key,Number(input.value)]));
   const documentJSON={
    schema:'synestra.siteforge.plasma-settings.v1',
    version:1,
    engine:'siteforge-plasma-webgl1',
    parameters,
    motes,
    energyFlow
   };""")
replace("""   return {nextPlasma,nextMotes,enabled:values.enabled===undefined?true:values.enabled};""",
"""   const eflow=doc.energyFlow;
   if(eflow!==undefined&&(!eflow||typeof eflow!=='object'||Array.isArray(eflow)))throw Error('Contrôles des flux invalides.');
   const fkeys=Object.keys(flowControls);
   if(eflow!==undefined&&(Object.keys(eflow).length!==fkeys.length||fkeys.some(k=>!Object.prototype.hasOwnProperty.call(eflow,k))))
    throw Error('Les quatre paramètres énergétiques sont requis.');
   const nextFlow=Object.fromEntries(fkeys.map(k=>[k,validateControl(flowControls[k],eflow===undefined?Number(flowDefaults[k]):eflow[k])]));
   return {nextPlasma,nextMotes,nextFlow,enabled:values.enabled===undefined?true:values.enabled};""")
replace("""    for(const [k,v] of Object.entries(values.nextMotes))moteControls[k].value=v;
    motesEnabled=values.enabled;pointerForce=0;setCustomArt();""",
"""    for(const [k,v] of Object.entries(values.nextMotes))moteControls[k].value=v;
    for(const [k,v] of Object.entries(values.nextFlow))flowControls[k].value=v;
    motesEnabled=values.enabled;pointerForce=0;setCustomArt();""")
# JS WebGL uniforms are wired alongside the existing uFlow; no second renderer.
replace("uniform vec2 uFlow;","uniform vec2 uFlow;\n uniform vec4 uFlowLab; // count, path spacing, pulse speed, pulse intensity")
replace("'uVolumeSteps','uFlow','uCompare'","'uVolumeSteps','uFlow','uFlowLab','uCompare'")
replace("   gl.uniform2f(U.uFlow,sel('flowType'),num('flowStructure'));",
"""   gl.uniform2f(U.uFlow,sel('flowType'),num('flowStructure'));
   gl.uniform4f(U.uFlowLab,flowValue('count'),flowValue('spread')/100,flowValue('pulseSpeed')/100,flowValue('pulseIntensity')/100);""")
head="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
tail=" if(uPass>3.5&&uPass<4.5){"
a=s.index(head);b=s.index(tail,a+len(head))
shader=s[a:b]
def shaderReplace(old,new):
 global shader
 assert shader.count(old)==1,("SHADER_TARGET",old,shader.count(old))
 shader=shader.replace(old,new,1)
shaderReplace("float flowTime=uLabTime;","""float flowCount=clamp(floor(uFlowLab.x+.5),3.,8.);
    float flowSpread=clamp(uFlowLab.y,.70,1.30);
    float pulseIntensity=clamp(uFlowLab.w,0.,2.);
    float flowTime=uLabTime*clamp(uFlowLab.z,0.,2.5);""")
for old,new in [
 ("float ca=.52+.026*sin(ta*5.-flowTime*1.20);","float ca=(.52+.026*sin(ta*5.-flowTime*1.20))*flowSpread;"),
 ("float cb=.51+.029*cos(tb*6.+flowTime*1.06);","float cb=(.51+.029*cos(tb*6.+flowTime*1.06))*flowSpread;"),
 ("float cc=.49+.022*sin(tc*7.-flowTime*.93);","float cc=(.49+.022*sin(tc*7.-flowTime*.93))*flowSpread;"),
 ("float cd=.57+.020*sin(td*7.+flowTime*1.08);","float cd=(.57+.020*sin(td*7.+flowTime*1.08))*flowSpread;"),
 ("float ce=.55+.021*cos(te*6.-flowTime*.99);","float ce=(.55+.021*cos(te*6.-flowTime*.99))*flowSpread;")
]:shaderReplace(old,new)
for before,after in [
 ("float pa=.58+.42*sin(ta*17.-flowTime*5.3);","float pa=.58+.42*pulseIntensity*sin(ta*17.-flowTime*5.3);"),
 ("float pb=.58+.42*sin(tb*19.+flowTime*5.0);","float pb=.58+.42*pulseIntensity*sin(tb*19.+flowTime*5.0);"),
 ("float pc=.59+.41*sin(tc*18.-flowTime*4.7);","float pc=.59+.41*pulseIntensity*sin(tc*18.-flowTime*4.7);"),
 ("float pd=.60+.40*sin(td*20.+flowTime*5.4);","float pd=.60+.40*pulseIntensity*sin(td*20.+flowTime*5.4);"),
 ("float pe=.60+.40*sin(te*21.-flowTime*5.2);","float pe=.60+.40*pulseIntensity*sin(te*21.-flowTime*5.2);")
]:shaderReplace(before,after)
# At 3 only A/B/C survive. At 5 exact base family layout preserved.
shaderReplace("float lD=(dCore*(.55+pd*1.10)+dHalo+braidD*(.20+.27*pd))*front*border;",
              "float lD=(dCore*(.55+pd*1.10)+dHalo+braidD*(.20+.27*pd))*front*border*step(3.5,flowCount);")
shaderReplace("float lE=(eCore*(.55+pe*1.10)+eHalo+braidE*(.20+.27*pe))*front*border;",
              "float lE=(eCore*(.55+pe*1.10)+eHalo+braidE*(.20+.27*pe))*front*border*step(4.5,flowCount);")
# Add physically separate tilted toroidal centerlines F/G/H (not extra post-processing glow).
extra="""    // Three optional independent paths F/G/H — 6 to 8 total, no opaque cylinders.
    vec3 f=vec3(q.z*.51-q.y*.86,q.x,q.z*.86+q.y*.51);
    float tf=atan(f.z,f.x),rf=length(f.xz);
    float cf=(.53+.019*sin(tf*6.+flowTime*.84))*flowSpread;
    vec2 crossF=vec2(rf-cf,f.y+.023*sin(tf*4.-flowTime*1.07));
    float dF=length(crossF);
    vec3 g=vec3(q.x*.57-q.z*.82,q.y,q.x*.82+q.z*.57);
    float tg=atan(g.y,g.x),rg=length(g.xy);
    float cg=(.56+.018*cos(tg*7.-flowTime*.91))*flowSpread;
    vec2 crossG=vec2(rg-cg,g.z+.026*cos(tg*5.+flowTime*.95));
    float dG=length(crossG);
    vec3 h=vec3(q.y*.61-q.x*.79,q.z,q.y*.79+q.x*.61);
    float th=atan(h.z,h.y),rh=length(h.yz);
    float ch=(.50+.021*sin(th*8.+flowTime*.88))*flowSpread;
    vec2 crossH=vec2(rh-ch,h.x+.024*cos(th*5.-flowTime*1.02));
    float dH=length(crossH);
    float fCore=exp(-pow(dF*46./kernelWidth,2.)),fHalo=exp(-pow(dF*18./kernelWidth,2.))*.24;
    float gCore=exp(-pow(dG*46./kernelWidth,2.)),gHalo=exp(-pow(dG*18./kernelWidth,2.))*.24;
    float hCore=exp(-pow(dH*46./kernelWidth,2.)),hHalo=exp(-pow(dH*18./kernelWidth,2.))*.24;
    float tfB=tf*9.-flowTime*4.1+1.9;
    float tgB=tg*8.-flowTime*4.3+2.7;
    float thB=th*10.-flowTime*3.8+3.3;
    vec2 fOrbit=vec2(cos(tfB),sin(tfB))*.030;
    vec2 gOrbit=vec2(cos(tgB),sin(tgB))*.030;
    vec2 hOrbit=vec2(cos(thB),sin(thB))*.030;
    float fBraid=exp(-pow(length(crossF-fOrbit)*83./kernelWidth,2.))+exp(-pow(length(crossF+fOrbit)*83./kernelWidth,2.));
    float gBraid=exp(-pow(length(crossG-gOrbit)*83./kernelWidth,2.))+exp(-pow(length(crossG+gOrbit)*83./kernelWidth,2.));
    float hBraid=exp(-pow(length(crossH-hOrbit)*83./kernelWidth,2.))+exp(-pow(length(crossH+hOrbit)*83./kernelWidth,2.));
    float pf=.59+.41*pulseIntensity*sin(tf*18.-flowTime*5.2);
    float pg=.59+.41*pulseIntensity*sin(tg*17.+flowTime*5.1);
    float ph=.59+.41*pulseIntensity*sin(th*20.-flowTime*5.4);
    float onF=step(5.5,flowCount),onG=step(6.5,flowCount),onH=step(7.5,flowCount);
    float lF=(fCore*(.55+pf*1.10)+fHalo+fBraid*(.20+.27*pf))*front*border*onF;
    float lG=(gCore*(.55+pg*1.10)+gHalo+gBraid*(.20+.27*pg))*front*border*onG;
    float lH=(hCore*(.55+ph*1.10)+hHalo+hBraid*(.20+.27*ph))*front*border*onH;
"""
shaderReplace("    float crossing=(aCore*bCore+bCore*cCore+cCore*dCore+dCore*eCore+",extra+"    float crossing=(aCore*bCore+bCore*cCore+cCore*dCore*step(3.5,flowCount)+dCore*eCore*step(4.5,flowCount)+")
shaderReplace("eCore*aCore)*.22;","eCore*aCore*step(4.5,flowCount))* .22;")
shaderReplace("float flash=.55+.45*sin(flowTime*7.4+q.z*12.);","float flash=.55+.45*pulseIntensity*sin(flowTime*7.4+q.z*12.);")
shaderReplace("Lneon+=(cyanNeon*(lA+lD*.83)+pinkNeon*(lB+lE*.83)\n            +mix(cyanNeon,pinkNeon,.43)*lC)*dzNeon*29.;",
"""Lneon+=(cyanNeon*(lA+lD*.83+lF*.72+lH*.72)
            +pinkNeon*(lB+lE*.83+lG*.72)
            +mix(cyanNeon,pinkNeon,.43)*lC)*dzNeon*29.;""")
shaderReplace("Aneon+=(aCore+bCore+cCore+dCore+eCore)*front*border*dzNeon*12.0;",
"""Aneon+=(aCore+bCore+cCore+dCore*step(3.5,flowCount)+eCore*step(4.5,flowCount)
            +fCore*onF+gCore*onG+hCore*onH)*front*border*dzNeon*12.0;""")
# Brightness balancing per number of lines; reference count=5 is exactly preserved.
shaderReplace("vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.32*radiusGain);",
"""float densityGain=pow(5./flowCount,.28);
    vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.32*radiusGain*densityGain);""")
shaderReplace("float alphaNeon=clamp(.010+Aneon*.95+coreNeon*.40+haloNeon*.055,0.,1.);",
"""float alphaNeon=clamp(.010+Aneon*.95*densityGain+coreNeon*.40+haloNeon*.055,0.,1.);""")
assert "float lF=" in shader and "float lG=" in shader and "float lH=" in shader
s=s[:a]+shader+s[b:]
for o,n in [
 ("<title>SiteForge — Laboratoire énergétique 3D R187.7</title>","<title>SiteForge — Laboratoire énergétique 3D R187.8</title>"),
 ("Flux tressés réglables · R187.7","Flux architecturés · R187.8"),
 ("LAB R187.7","LAB R187.8"),
 ("Ajuste les cinq trajectoires et leur tressage","Ajuste les trajectoires et leur tressage")
]:replace(o,n)
m=re.search(r"(?s)<script>(.*?)</script>",s)
assert m and s.count("<script>")==1
digest=base64.b64encode(sha256(m.group(1).encode("utf8")).digest()).decode("ascii")
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert s.count("data-sphere-control=")==raw.decode("utf8").count("data-sphere-control=")
assert s.count("data-mote-control=")==raw.decode("utf8").count("data-mote-control=")
assert s.count('data-flow-control=')==4
dst.write_bytes(s.encode("utf8"))
print("R1878_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",digest)
