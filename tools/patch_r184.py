from pathlib import Path
root=Path(__file__).resolve().parent.parent
js=root/"assets/siteforge-lab-r166-flow.js"
html=root/"siteforge/core-3d-lab/index.html"
s=js.read_text(encoding="utf8");h=html.read_text(encoding="utf8")
def j(a,b):
 global s
 n=s.count(a)
 if n!=1:raise RuntimeError("JS_ANCHOR_"+str(n)+"_"+a[:90])
 s=s.replace(a,b)
def v(a,b):
 global h
 n=h.count(a)
 if n!=1:raise RuntimeError("HTML_ANCHOR_"+str(n)+"_"+a[:100])
 h=h.replace(a,b)
j("   float sideCut=max(lateral*.94+axial*.46,axial*.67);\n   silhouette=1.-smoothstep(.74,.86,sideCut);",
"""   // R184: the old horizontal tip reached the point-sprite square edge.
   // Keep the entire beveled crystal INSIDE its sprite and feather the cut.
   float sideCut=max(lateral*1.13+axial*.48,axial*.98);
   silhouette=1.-smoothstep(.67,.85,sideCut);""")
j("  float alpha=clamp(silhouette,0.,1.)*vLife*clamp(uEffects.w,0.,1.);\n  gl_FragColor=vec4(lightCol,alpha);",
"""   // R184 critical bugfix: gl.blendFunc(ONE, ONE) ignores alpha entirely.
   // Previously even alpha-zero sprite corners added their RGB to the scene,
   // producing opaque cyan/violet rectangles and giant X-shaped highlights.
   float alpha=clamp(silhouette,0.,1.)*vLife*clamp(uEffects.w,0.,1.);
   if(alpha<.012)discard;
   // Premultiplied emission is mandatory with additive ONE/ONE blending.
   gl_FragColor=vec4(lightCol*alpha,alpha);""")
j(" if(uPass>4.5)gl_PointSize=clamp((11.0+9.0*rnd(i+8.))*sizeFactor*uMoteStyle.z*uResolution.y/518.,2.,38.);",
"""  if(uPass>4.5)gl_PointSize=clamp((9.0+7.0*rnd(i+8.))*sizeFactor*uMoteStyle.z*uResolution.y/518.,1.5,32.);""")
v("<title>SiteForge — Laboratoire énergétique 3D R183</title>","<title>SiteForge — Laboratoire énergétique 3D R184</title>")
v('<span class="preview-state">R183 · QUALITÉ ADAPTATIVE</span>',
  '<span class="preview-state">R184 · ÉCLATS SANS CARRÉS</span>')
v('<p class="help">R183 : contrôle de la fidélité volumétrique et cadence de rendu observée. Le mode Auto réduit la charge du shader en cas de lenteur, sans modifier les matériaux, les réglages ni la rotation des éclats.</p>',
  '<p class="help">R184 : éclats affinés, lumineux et transparents, sans cadres carrés ni effets de croix. Le rendu de plasma, les trois styles et la qualité adaptative restent disponibles.</p>')
v('data-mote-control="moteCount" data-default="46" type="range" min="0" max="160" value="46"',
  'data-mote-control="moteCount" data-default="30" type="range" min="0" max="160" value="30"')
v('data-mote-value="moteCount">46 éclats','data-mote-value="moteCount">30 éclats')
v('data-mote-control="moteSize" data-default="100" type="range" min="40" max="220" value="100"',
  'data-mote-control="moteSize" data-default="60" type="range" min="40" max="220" value="60"')
v('data-mote-value="moteSize">100 %','data-mote-value="moteSize">60 %')
v('data-mote-control="moteBrightness" data-default="100" type="range" min="20" max="200" value="100"',
  'data-mote-control="moteBrightness" data-default="65" type="range" min="20" max="200" value="65"')
v('data-mote-value="moteBrightness">100 %','data-mote-value="moteBrightness">65 %')
js.write_text(s,encoding="utf8",newline="\n")
html.write_text(h,encoding="utf8",newline="\n")
print("R184_PREMULTIPLIED_ALPHA_AND_CLIPPED_CRYSTALS_PASS")
