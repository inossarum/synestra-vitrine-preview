"""SiteForge R188.4: shared flux controls + two energy flow families, one WebGL1 shader."""
from pathlib import Path
from hashlib import sha256
import base64,re
root=Path(__file__).resolve().parent.parent
src=root/'siteforge-r1883-autonome.html'
dst=root/'siteforge-r1884-autonome.html'
s=src.read_bytes().decode('utf8').replace('\r\n','\n')
assert sha256(s.encode()).hexdigest()=='942e587b7d4e18bc33b75cc2083cd5b6df37d3efa9b2cfab1583ca23167d9061','BASE_SHA_MISMATCH'
def sub(old,new):
 global s
 if s.count(old)!=1 and old.startswith(' '):
  old=next((q for q in (re.sub(r'(?m)^ ', '',old),old.lstrip()) if s.count(q)==1),old)
 assert s.count(old)==1,(old[:115],s.count(old))
 s=s.replace(old,new,1)
# Add new families to existing selection. No new renderer or second material list.
sub('<option value="6">Flux vivants · R188.3</option></select>',
    '<option value="6">Flux vivants · R188.4</option><option value="7">Arcs pulsés · R188.4</option><option value="8">Vortex polaire · R188.4</option></select>')
sub('Les nouveaux contrôles modifient uniquement les flux R188.2. Le diamètre reste indépendant.',
    'Ces commandes agissent maintenant sur les neuf matériaux. Nombre, écartement, vitesse, intensité, turbulence et diamètre restent indépendants.')
sub("if(launchDemo==='energy'){controls.flowType.value='6';sync();schedule();}",
    """if(launchDemo==='energy'){controls.flowType.value='6';sync();schedule();}
  // SiteForge linkable materials. Allow only a single known numeric material id.
  const linkMaterial=new URLSearchParams(window.location.search).get('material');
  if(linkMaterial!==null&&/^[0-8]$/.test(linkMaterial)){
    controls.flowType.value=linkMaterial;sync();schedule();
  }""")
sub('Les couleurs du matériau énergétique sont indépendantes de la palette plasma historique.',
    'La palette des flux agit sur tous les matériaux et reste indépendante de la couleur du noyau.')
sub('data-energy-turbulence type="range" min="0" max="200"',
    'data-energy-turbulence type="range" min="0" max="200"') if False else None
# New mode: energy material 6 is kept unchanged apart from a delicate micro-structure.
sub('float flowCount=clamp(floor(uFlowLab.x+.5),3.,8.);',
"""float flowCount=clamp(floor(uFlowLab.x+.5),3.,8.);
    float fluxFamily=floor(uFlow.x+.5); // 6 living, 7 arcs, 8 polar vortex""")
sub('     float front=.29+.80*smoothstep(-.80,.83,q.z);',
"""     // R188.4: individual signatures using the same 3D integration shader.
     if(fluxFamily>6.5&&fluxFamily<7.5){
       q.xy+=vec2(sin(q.z*10.5+flowTime*1.35),cos(q.z*8.2-flowTime*1.05))*.043;
     }else if(fluxFamily>7.5){
       float polarTwist=.38*sin(q.z*6.5+flowTime*.75);
       q.xy=mat2(cos(polarTwist),-sin(polarTwist),sin(polarTwist),cos(polarTwist))*q.xy;
       q.xy+=vec2(cos(q.z*6.1-flowTime),sin(q.z*6.1-flowTime))*.019;
     }
     float front=.29+.80*smoothstep(-.80,.83,q.z);""")
sub('Lneon+=(cyanNeon*(lA+lD*.83+lF*.72+lH*.72)',
"""float signature=fluxFamily<6.5?
        (.94+.06*sin(q.z*18.+atan(q.y,q.x)*7.-flowTime*3.4)):
        fluxFamily<7.5?
        (.63+.37*pow(max(0.,.5+.5*sin(q.z*15.+atan(q.y,q.x)*8.-flowTime*2.5)),2.)):
        (.72+.28*cos(q.z*11.-atan(q.y,q.x)*5.+flowTime*1.8));
     Lneon+=signature*(cyanNeon*(lA+lD*.83+lF*.72+lH*.72)""")
# Preserve prior material core/halo, optional thin 3D strands.
# Common controls in the six historical types, with default pulse speed 100 unchanged.
sub('float t=uTime;', 'float t=uTime*clamp(uFlowLab.z,0.,2.5);')
sub('q.xy+=waveWarp*(.72+.28*(1.-smoothstep(0.,radius,abs(z))));',
"""q.xy+=waveWarp*clamp(uEnergyMouse,0.,1.)*(.72+.28*(1.-smoothstep(0.,radius,abs(z))));
     // Shared controls, all historical families 0..5: slow 3D domain warp,
     // XY trajectory spread, real pointer toggle, pulse speed.
     float sharedTurbulence=clamp(uEnergyTurbulence,0.,2.);
     if(sharedTurbulence>.0001&&uFlowLab.z>.0001){
       vec2 eddy=vec2(sin(q.z*7.4+q.y*4.8-t*1.45),
                      cos(q.x*6.8-q.z*5.6+t*1.13));
       q.xy+=eddy*(sharedTurbulence*.027);
     }
     q.xy/=clamp(uFlowLab.y,.70,1.30);""")
sub('float ribbonWidth=clamp(uFlow.y,.3,2.);','float ribbonWidth=clamp(uFlow.y,.3,2.5);')
sub('float currents=0.;\n    currents=flowCurrents;',
"""// Shared topology and travelling pulse on all six original materials.
     // Count controls angular density, not extra physical meshes or sprites.
     float sharedCount=clamp(floor(uFlowLab.x+.5),3.,8.);
     float countLanes=.72+.28*(.5+.5*cos(angle*sharedCount+q.z*4.1));
     float sharedPulse=1.+.21*clamp(uFlowLab.w,0.,2.)*
                    sin(t*3.2+q.z*3.7+angle*sharedCount);
     float currents=max(0.,flowCurrents*countLanes*sharedPulse);""")
sub('flowCurrents=densityCloud*(.28+.28*swirls);',
    'flowCurrents=densityCloud*(.28+.28*swirls)*2.25; // R188.4 cloud visibility on small viewports')
sub('vec3 ion=mix(uCyan,uViolet,clamp(.12+.72*violetBand,0.,1.));',
    'vec3 ion=mix(uEnergyA,uEnergyB,clamp(.12+.72*violetBand,0.,1.));')
sub('vec3 blue=mix(uDeep*.65,uViolet*.69,clamp(distance3D*.72+broad*.42,0.,1.));',
    'vec3 blue=mix(uDeep*.45+uEnergyCore*.14,uEnergyB*.54,clamp(distance3D*.72+broad*.42,0.,1.));')
# No change to independently controlled nucleus uCore.
for old,new in [
 ('<title>SiteForge — Laboratoire énergétique 3D R188.3</title>','<title>SiteForge — Laboratoire énergétique 3D R188.4</title>'),
 ('Flux vivants · R188.3','Flux vivants · R188.4'),
 ('LAB R188.3','LAB R188.4'),
 ('Architecture des flux · R188.3','Architecture des flux · R188.4')
]:
 if old in s:sub(old,new)
m=re.search(r'(?s)<script>(.*?)</script>',s)
assert m and s.count('<script>')==1
digest=base64.b64encode(sha256(m.group(1).encode()).digest()).decode()
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert len(re.findall(r'<option value="[0-8]">',s))>=9
assert s.count('data-energy-color=')==src.read_text('utf8').count('data-energy-color=')
dst.write_bytes(s.encode())
print("R1884_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),digest)
