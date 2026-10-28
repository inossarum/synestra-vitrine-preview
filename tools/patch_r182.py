from pathlib import Path
r=Path(__file__).resolve().parent.parent
j=r/"assets"/"siteforge-lab-r166-flow.js"
h=r/"siteforge/core-3d-lab/index.html"
s=j.read_text(encoding="utf8"); t=h.read_text(encoding="utf8")
def R(old,new):
 global s
 n=s.count(old)
 if n!=1:raise RuntimeError("JS anchor count "+str(n)+" "+old[:100])
 s=s.replace(old,new)
def H(old,new):
 global t
 n=t.count(old)
 if n!=1:raise RuntimeError("HTML anchor count "+str(n)+" "+old[:100])
 t=t.replace(old,new)
R("varying float vMoteDepth;\nuniform float uMoteCount;",
  "varying float vMoteDepth;\nvarying float vMoteSeed;\nuniform float uMoteCount;")
R(" vMoteDepth=0.;vMoteCenter=vec2(10.);"," vMoteDepth=0.;vMoteCenter=vec2(10.);vMoteSeed=0.;")
R("  float moteRadius=radius*(uMoteStyle.x+uMoteStyle.y*rnd(i*7.19+17.));",
  "  vMoteSeed=rnd(i*11.87+3.1);\n  float moteRadius=radius*(uMoteStyle.x+uMoteStyle.y*rnd(i*7.19+17.));")
# Fragment only (separate prefix)
R("varying float vMoteDepth;\nuniform vec2 uResolution;",
  "varying float vMoteDepth;\nvarying float vMoteSeed;\nuniform vec2 uResolution;")
R("uniform float uMoteShape; // R180: 0 spark, 1 faceted shard, 2 ion orb",
  "uniform float uMoteShape; // R180: 0 spark, 1 faceted shard, 2 ion orb\nuniform vec2 uMoteFinish; // R182: surface roughness, crystal reflectance")
R("""   vec3 normal=normalize(vec3(mix(-.72,.68,faceSide),
                              mix(.18,-.52,faceTip),.90));
   vec3 sourceDir=normalize(vec3(-vMoteCenter*.95+.14,1.50));
   float diffuse=.30+.70*max(dot(normal,sourceDir),0.);
   vec3 reflected=reflect(-sourceDir,normal);
   float specular=pow(max(reflected.z,0.),18.);""",
"""   // R182: bounded, deterministic microfacet imperfections per crystal.
   // Material-space seed follows the 3D shard instead of tracking the screen.
   float roughness=clamp(uMoteFinish.x,0.,1.);
   float reflectionStrength=clamp(uMoteFinish.y,0.,2.);
   vec2 grainCell=floor((facetXY+vMoteSeed*2.7)*24.);
   float grain=fract(sin(dot(grainCell,vec2(127.1,311.7)))*43758.5453);
   float hairline=1.-smoothstep(.016,.056,
     abs(fract(facetXY.x*7.5+facetXY.y*3.1+grain*.42+vMoteSeed*8.)-.5));
   vec3 normal=normalize(vec3(mix(-.72,.68,faceSide),
                              mix(.18,-.52,faceTip),.90));
   normal=normalize(normal+vec3((grain-.5)*roughness*.19,
                    sin(facetXY.x*19.+vMoteSeed*11.)*roughness*.07,0.));
   vec3 sourceDir=normalize(vec3(-vMoteCenter*.95+.14,1.50));
   float diffuse=.30+.70*max(dot(normal,sourceDir),0.);
   vec3 reflected=reflect(-sourceDir,normal);
   float specular=pow(max(reflected.z,0.),mix(34.,8.,roughness));""")
R("""   lightCol=col*(.44+diffuse*.90)*facetTone+
            hot*(specular*1.75+bevel*(.25+.52*rim));
   // A crisp centre reflection, without turning the crystal into a flare.
   lightCol+=hot*.16*(1.-smoothstep(.02,.42,r2));""",
"""   float surfaceGrain=1.-roughness*(.065+hairline*.22);
   lightCol=col*(.44+diffuse*.90)*facetTone*surfaceGrain+
            hot*reflectionStrength*(specular*1.75+bevel*(.25+.52*rim));
   // A restrained star-like core glint that follows each crystal orientation.
   float streak=exp(-abs(facetXY.y+facetXY.x*.17)*24.)*
       (1.-smoothstep(.12,.79,abs(facetXY.x)));
   lightCol+=hot*reflectionStrength*(streak*.12+
      .16*(1.-smoothstep(.02,.42,r2)));""")
R("'uMoteShape'];","'uMoteShape','uMoteFinish'];")
R("  gl.uniform1f(U.uMoteShape,moteVal('moteShape'));",
 """  gl.uniform1f(U.uMoteShape,moteVal('moteShape'));
  gl.uniform2f(U.uMoteFinish,moteVal('moteRoughness')/100,
                            moteVal('moteReflectivity')/100);""")
# new interface, no other design perturbation.
H("<title>SiteForge — Laboratoire énergétique 3D R180</title>",
  "<title>SiteForge — Laboratoire énergétique 3D R182</title>")
H('<span class="preview-state">R180 · STYLES & IMPORT JSON</span>',
  '<span class="preview-state">R182 · CRISTAUX MICROFACETTÉS</span>')
H('<p class="help">R180 : éclats 3D à rotation synchronisée, styles énergétiques différents et rechargement des paramètres JSON sauvegardés. Toutes les commandes sont applicables en direct.</p>',
  '<p class="help">R182 : reflets directionnels et micro-imperfections ajustables sur les cristaux 3D. Les autres styles, le mouvement synchronisé et le rechargement des paramètres restent disponibles.</p>')
anchor='<div class="color-grid">\n<div class="control-row"><label class="control-label" for="sf-motePrimary">'
H(anchor,
'''<div class="control-row"><label class="control-label" for="sf-moteRoughness"><span>Micro-imperfections des cristaux</span><output for="sf-moteRoughness" data-mote-value="moteRoughness">35 %</output></label><input id="sf-moteRoughness" data-mote-control="moteRoughness" data-default="35" type="range" min="0" max="100" value="35" step="1"></div>
<div class="control-row"><label class="control-label" for="sf-moteReflectivity"><span>Réflectivité des facettes</span><output for="sf-moteReflectivity" data-mote-value="moteReflectivity">95 %</output></label><input id="sf-moteReflectivity" data-mote-control="moteReflectivity" data-default="95" type="range" min="0" max="200" value="95" step="1"></div>
<div class="color-grid">
<div class="control-row"><label class="control-label" for="sf-motePrimary">''')
H("Conserve les 18 paramètres du plasma et les 8 réglages des éclats (formes comprises). Les anciens exports restent compatibles.",
  "Conserve les 18 paramètres du plasma et les 10 réglages des éclats (dont imperfections et réflectivité). Les anciens exports restent compatibles.")
# update style if no explicit tag version in other docs.
j.write_text(s,encoding="utf8",newline="\n");h.write_text(t,encoding="utf8",newline="\n")
print("R182_PATCHED",len(s),len(t))
