"""R188.2 internal living turbulence; no extra engine, optional JSON v1 extension."""
from pathlib import Path
from hashlib import sha256
import re,base64
root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1881-autonome.html"
dst=root/"siteforge-r1882-autonome.html"
s=src.read_bytes().decode("utf8").replace("\r\n","\n")
assert sha256(s.encode("utf8")).hexdigest()=="22a0ab5a3f814b6c4dfc7f831319aa40f17241b475f29689bab0c774d9a4d9a8","BASE_SHA_CHANGED"
def swap(a,b):
 global s
 if s.count(a)!=1 and a.startswith(' '):
  a=next((t for t in (re.sub(r'(?m)^ ', '', a),re.sub(r'(?m)^  ', '', a),a[1:],a[2:]) if s.count(t)==1),a)
 assert s.count(a)==1, ("TARGET_COUNT",a[:110],s.count(a))
 s=s.replace(a,b,1)

# Minimal new input: existing lab's flow panel, not duplicated canvas or control authority.
newui='''<div class="control-row"><label class="control-label" for="sf-energyTurbulence"><span>Turbulence interne du plasma</span><output data-energy-turbulence-value for="sf-energyTurbulence">35 %</output></label><input id="sf-energyTurbulence" data-energy-turbulence type="range" min="0" max="100" step="1" value="35" data-default="35"></div>
<p class="help">0 % : rendu R188.1 inchangé. Augmente pour faire onduler le champ des flux de l'intérieur, sans épaissir les cylindres ni ajouter d'éclats. La vitesse des impulsions contrôle aussi celle de la turbulence.</p>
'''
swap('<p class="help">Les nouveaux contrôles modifient uniquement les flux R188.1.',newui+'<p class="help">Les nouveaux contrôles modifient uniquement les flux R188.2.')

swap("   const energyPalette=document.querySelector('[data-energy-palette]');",
"""   const energyPalette=document.querySelector('[data-energy-palette]');
   const energyTurbulence=document.querySelector('[data-energy-turbulence]');
   const turbulenceDefault=35;""")
swap("    refreshEnergyColors();\n    for(const [key,input] of Object.entries(energyColorControls)){",
"""    refreshEnergyColors();
    const turbulenceOutput=document.querySelector('[data-energy-turbulence-value]');
    if(turbulenceOutput)turbulenceOutput.textContent=energyTurbulence.value+' %';
    stage.dataset.energyTurbulence=energyTurbulence.value;
    for(const [key,input] of Object.entries(energyColorControls)){""")
swap("    if(e.target===energyPalette){",
"""    if(e.target===energyTurbulence){sync();schedule();return;}
    if(e.target===energyPalette){""")
swap("     energyMouseEnabled=true;energyPalette.value='synestra';useEnergyPalette('synestra');",
"""     energyMouseEnabled=true;energyPalette.value='synestra';useEnergyPalette('synestra');energyTurbulence.value=String(turbulenceDefault);""")
swap("     const documentJSON={",
"""     const energyDynamics={turbulence:Number(energyTurbulence.value)};
     const documentJSON={""")
swap("     energyVisual\n    };","     energyVisual,\n     energyDynamics\n    };")
swap("     return {nextPlasma,nextMotes,nextFlow,nextVisual,enabled:values.enabled===undefined?true:values.enabled};",
"""     const dynamics=doc.energyDynamics;
     if(dynamics!==undefined&&(!dynamics||typeof dynamics!=='object'||Array.isArray(dynamics)||
        Object.keys(dynamics).length!==1||!Object.prototype.hasOwnProperty.call(dynamics,'turbulence')||
        typeof dynamics.turbulence!=='number'||!Number.isInteger(dynamics.turbulence)||
        dynamics.turbulence<0||dynamics.turbulence>100))
        throw Error('Turbulence énergétique invalide.');
     const nextTurbulence=dynamics===undefined?turbulenceDefault:dynamics.turbulence;
     return {nextPlasma,nextMotes,nextFlow,nextVisual,nextTurbulence,enabled:values.enabled===undefined?true:values.enabled};""")
swap("      const visual=values.nextVisual;",
"""      energyTurbulence.value=String(values.nextTurbulence);
      const visual=values.nextVisual;""")
swap(" uniform float uEnergySteps; // R188.0 quality budget, energy material only",
""" uniform float uEnergySteps; // R188.0 quality budget, energy material only
 uniform float uEnergyTurbulence; // R188.2 dimensionless 0..1, material 6 only""")
swap("'uFlowLab','uEnergySteps','uEnergyMouse'",
     "'uFlowLab','uEnergySteps','uEnergyTurbulence','uEnergyMouse'")
swap("""     q.xy+=wp*mouseKick*.68*mouseWeight;
     float front=""",
"""     q.xy+=wp*mouseKick*.68*mouseWeight;
     // R188.2: smooth advected energy field, NOT opaque geometry or extra sprites.
     // Explicit zero/paused path leaves R188.1 sampling bit-for-bit untouched.
     float energyEddy=clamp(uEnergyTurbulence,0.,1.);
     if(energyEddy>.0001&&uFlowLab.z>.0001){
       float eddyTime=flowTime*.92;
       vec2 shear=vec2(sin(q.z*7.4+q.y*4.8-eddyTime*1.45),
                       cos(q.x*6.8-q.z*5.6+eddyTime*1.13));
       q.xy+=shear*(energyEddy*.027);
     }
     float front=""")
swap("    gl.uniform1f(U.uEnergyMouse,energyMouseEnabled?1:0);",
"""    gl.uniform1f(U.uEnergyMouse,energyMouseEnabled?1:0);
    gl.uniform1f(U.uEnergyTurbulence,Number(energyTurbulence.value)/100);""")
for a,b in [
 ("<title>SiteForge — Laboratoire énergétique 3D R188.1</title>","<title>SiteForge — Laboratoire énergétique 3D R188.2</title>"),
 ("Flux stratifiés · R188.1","Flux vivants · R188.2"),
 ("LAB R188.1","LAB R188.2"),
 ("Architecture des flux · R188.1","Architecture des flux · R188.2")
]:swap(a,b)
m=re.search(r"(?s)<script>(.*?)</script>",s)
assert m and s.count("<script>")==1
token=base64.b64encode(sha256(m.group(1).encode("utf8")).digest()).decode()
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+token+"'",1)
assert s.count('data-flow-control=')==src.read_text('utf8').count('data-flow-control=')
assert s.count('data-sphere-control=')==src.read_text('utf8').count('data-sphere-control=')
assert s.count('data-energy-turbulence ') == 1
dst.write_bytes(s.encode('utf8'))
print("R1882_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",token)
