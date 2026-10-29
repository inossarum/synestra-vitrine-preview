"""SiteForge R188.0: adaptive energy-ray budget + lazy optional 3D paths + stable GPU uniforms.

Built on immutable local R187.9. No dependencies, no new shaders/Workers,
no changes to materials 0..5, controls/JSON contract or default visual reference.
"""
from pathlib import Path
from hashlib import sha256
import base64,re
root=Path(__file__).resolve().parent.parent
base=root/"siteforge-r1879-autonome.html"
dest=root/"siteforge-r1880-autonome.html"
s=base.read_bytes().decode("utf-8").replace("\r\n","\n")
assert sha256(s.encode("utf-8")).hexdigest()=="8b6a0f4de28cbe9c2ce8ffaee5d31fc53655c3fab398963c97828251bd83ce63","BASE_SHA_MISMATCH"
def sub(a,b):
 global s
 if s.count(a)!=1:
  variants=[a[1:],a[2:],a.lstrip(" ")] if a.startswith(" ") else []
  a=next((v for v in variants if s.count(v)==1),a)
 assert s.count(a)==1, ("TARGET_COUNT",a[:110],s.count(a))
 s=s.replace(a,b,1)
# Presets and scripts are already present; describe energy renderer's effective budget near quality.
sub('<p class="help">Cadence observ',
    '<p class="help">Échantillonnage énergétique effectif : <output data-energy-samples>34 couches 3D</output>. '
    'Équilibrée conserve le rendu R187.9, Performance réduit le coût du septième matériau, '
    'Détaillée affine la continuité des flux fins.</p>\n'
    '<p class="help">Cadence observ')
sub("uniform vec4 uFlowLab; // count, path spacing, pulse speed, pulse intensity",
    "uniform vec4 uFlowLab; // count, path spacing, pulse speed, pulse intensity\n uniform float uEnergySteps; // R188.0 quality budget, energy material only")
sub("'uFlowLab','uEnergyMouse'",
    "'uFlowLab','uEnergySteps','uEnergyMouse'")
# Localized energy shader: all other materials byte-identical.
start="if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
end="if(uPass>3.5&&uPass<4.5){"
a=s.index(start);b=s.index(end,a+len(start))
shader=s[a:b]
def subshader(a,b):
 global shader
 assert shader.count(a)==1, ("SHADER_TARGET",a[:110],shader.count(a))
 shader=shader.replace(a,b,1)
subshader("float stepsNeon=max(34.,uVolumeSteps);",
          """// Adaptive integration: preserve 34 layers for the reference look,
    // permit cheaper 24/26 steps on Performance, 40 on Detailed.
    // Extremely thin filaments get at least 30 layers to avoid breakup.
    float stepsNeon=clamp(max(uEnergySteps,widthNeon<.48?30.:24.),24.,40.);""")
# widthNeon is defined AFTER stepsNeon in R187.9; move the control to precede step budget.
widthBlock="""    // R187.7: the visual diameter slider maps 30-250% one-to-one;
    // old hidden clamp [.55,1.75] made the existing control misleading.
    float widthNeon=clamp(uFlow.y,.30,2.50);
    // Optical anti-aliasing for very thin currents. Preserve true user
    // control and exact reference thickness at 100%, no opaque geometry.
    float kernelWidth=widthNeon+.19*(1.-smoothstep(.30,1.,widthNeon));
"""
widthMatch=re.search(r"(?m)^ *// R187\.7:[^\n]*\n *// old hidden clamp[^\n]*\n *float widthNeon=[^\n]*\n *// Optical anti-aliasing[^\n]*\n *// control and exact reference[^\n]*\n *float kernelWidth=[^\n]*\n",shader)
assert widthMatch, "WIDTH_BLOCK_MISSING"
widthBlock=widthMatch.group(0)
shader=shader.replace(widthBlock,"",1)
marker="// Sampling density keeps fine filaments continuous, not dotted by ray-step aliasing."
assert shader.count(marker)==1
lineAt=shader.index(marker)
shader=shader[:lineAt]+widthBlock+shader[lineAt:]
# Critical optimization: costly three new optional toroidal centerlines are not
# evaluated at all in 3/4/5-flow scenes. WebGL1 dynamically uniform branch.
begin="    vec3 f=vec3(q.z*.51-q.y*.86,q.x,q.z*.86+q.y*.51);"
finish="    float crossing=(aCore*bCore"
assert shader.count(begin)==1 and shader.count(finish)==1
x=shader.index(begin);y=shader.index(finish,x)
part=shader[x:y]
for family in "FGH":
 for var in ["Core","Halo","Braid","Orbit"]:
  pass
 # Each lF/G/H and fCore/gCore/hCore must have outer scope for Aneon / color.
 part=part.replace("float "+family.lower()+"Core=",family.lower()+"Core=",1)
 part=part.replace("float l"+family+"=","l"+family+"=",1)
 # within one var group e.g fCore=...,fHalo=... declared together, preserve first item
assert "float fCore=" not in part and "float gCore=" not in part and "float hCore=" not in part
# declarations originally 'float fCore=...,fHalo=...' so fHalo still valid after change? fHalo must declared!
for family in "fgh":
 part=part.replace(f"{family}Core=exp(",f"{family}Core=exp(",1)
 part=part.replace(f"{family}Halo=exp(",f"float {family}Halo=exp(",1)
# first comma between core and halo must be semicolon instead.
for family in "fgh":
 part=part.replace(f",float {family}Halo=",f"; float {family}Halo=",1)
# count 6 has only F active; G and H expensive still if count=6,
# but 3-5 baseline is primary performance optimization.
assert part.count("float onF=step(5.5,flowCount),onG=step(6.5,flowCount),onH=step(7.5,flowCount);")==1
part=part.replace("float onF=step(5.5,flowCount),onG=step(6.5,flowCount),onH=step(7.5,flowCount);",
                  "onF=step(5.5,flowCount);onG=step(6.5,flowCount);onH=step(7.5,flowCount);",1)
wrapper="""    // R188.0 uniform-branch gate: 3 optional costly 3D fields exist only
    // when the sixth path is requested. Avoid trigonometric work at count<=5.
    float fCore=0.,gCore=0.,hCore=0.;
    float lF=0.,lG=0.,lH=0.;
    float onF=0.,onG=0.,onH=0.;
    if(flowCount>5.5){
"""+part+"""    }
"""
shader=shader[:x]+wrapper+shader[y:]
s=s[:a]+shader+s[b:]
# R188.0 budget policy matches 40-step shader loop max; stage reports actual shader budget.
sub("    const volumeSteps=chooseVolumeSteps(mobile,baselineSteps,qualityMode,autoPenalty);",
"""    const volumeSteps=chooseVolumeSteps(mobile,baselineSteps,qualityMode,autoPenalty);
    // R188.0: energy material uses its own bounded ray budget instead of
    // ignoring the quality menu with a hard 34-step shader minimum.
    const energyQualitySamples=qualityMode==='quality'?40:
       qualityMode==='performance'?(mobile?24:26):
       qualityMode==='auto'?Math.max(mobile?26:28,(mobile?32:34)-autoPenalty*(mobile?2:3)):34;
    const actualEnergySamples=Math.max(energyQualitySamples,num('flowStructure')<.48?30:24);
    gl.uniform1f(U.uEnergySteps,actualEnergySamples);
    stage.dataset.energyRaySamples=String(actualEnergySamples);
    const energySamplesOutput=document.querySelector('output[data-energy-samples]');
    if(energySamplesOutput&&energySamplesOutput.textContent!==actualEnergySamples+' couches 3D')
      energySamplesOutput.textContent=actualEnergySamples+' couches 3D';""")
# Color uniform cache — save 3 TypedArray allocations per draw without reallocating WebGL.
needle="   const energyRGB=k=>[1,3,5].map(i=>parseInt(energyColorControls[k].value.slice(i,i+2),16)/255);"
sub(needle,needle+"""
   const gpuEnergyColors={a:null,b:null,core:null};
   const gpuEnergyHex={a:'',b:'',core:''};
   const refreshEnergyColors=()=>{
    for(const key of ['a','b','core']){
     const hex=energyColorControls[key].value;
     if(hex!==gpuEnergyHex[key]){
      gpuEnergyHex[key]=hex;
      gpuEnergyColors[key]=new Float32Array(energyRGB(key));
     }
    }
   };
   refreshEnergyColors();""")
sub("   for(const [key,input] of Object.entries(energyColorControls)){",
    "   refreshEnergyColors();\n   for(const [key,input] of Object.entries(energyColorControls)){")
for key in ["a","b","core"]:
 old={"a":"gl.uniform3fv(U.uEnergyA,new Float32Array(energyRGB('a')));",
      "b":"gl.uniform3fv(U.uEnergyB,new Float32Array(energyRGB('b')));",
      "core":"gl.uniform3fv(U.uEnergyCore,new Float32Array(energyRGB('core')));"}[key]
 name={"a":"uEnergyA","b":"uEnergyB","core":"uEnergyCore"}[key]
 sub(old,f"gl.uniform3fv(U.{name},gpuEnergyColors.{key});")
for old,new in [
 ("<title>SiteForge — Laboratoire énergétique 3D R187.9</title>","<title>SiteForge — Laboratoire énergétique 3D R188.0</title>"),
 ("Flux interactifs · R187.9","Flux adaptatifs · R188.0"),
 ("LAB R187.9","LAB R188.0"),
 ("Architecture des flux · R187.9","Architecture des flux · R188.0"),
 ("Les nouveaux contrôles modifient uniquement les flux R187.9.","Les nouveaux contrôles modifient uniquement les flux R188.0.")
]:sub(old,new)
match=re.search(r"(?s)<script>(.*?)</script>",s)
assert match and s.count("<script>")==1
digest=base64.b64encode(sha256(match.group(1).encode()).digest()).decode()
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert s.count("data-sphere-control=")==base.read_text("utf-8").count("data-sphere-control=")
assert s.count("data-energy-color=")==base.read_text("utf-8").count("data-energy-color=")
dest.write_bytes(s.encode("utf-8"))
print("R1880_BUILD_PASS",sha256(dest.read_bytes()).hexdigest(),"CSP",digest)
