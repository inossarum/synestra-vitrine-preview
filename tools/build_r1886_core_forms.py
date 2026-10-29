"""R188.6 LAB: core energy forms, improved control hierarchy, v1-compatible JSON."""
from pathlib import Path
from hashlib import sha256
import base64,re
root=Path(__file__).resolve().parent.parent
src=root/'siteforge-r1885-autonome.html'
dst=root/'siteforge-r1886-autonome.html'
raw=src.read_bytes()
assert sha256(raw.replace(b'\r\n',b'\n')).hexdigest()=='f31f10c3210c6f840cb3b7cec3d372ddace9438def66cdb1b807627c29964741','BASE_MISMATCH'
s=raw.decode('utf8').replace('\r\n','\n')
def change(old,new):
 global s
 assert s.count(old)==1,('AMBIGUOUS',old[:75],s.count(old))
 s=s.replace(old,new,1)
change('<title>SiteForge — Laboratoire énergétique 3D R188.5</title>','<title>SiteForge — Laboratoire énergétique 3D R188.6</title>')
change('<span class="preview-state">LAB R188.5</span>','<span class="preview-state">LAB R188.6</span>')
change('<h1>SiteForge <span aria-hidden="true">·</span> Plasma Studio</h1>','<h1>Labo 3D <span aria-hidden="true">·</span> Énergie & matière</h1>')
change('Choisis un matériau, ajuste son volume et observe ses flux en mouvement. Les essais historiques sont retirés de la surface de travail.',
       'Un espace de création : choisis la matière, façonne un noyau d’énergie et affine les flux. Aperçu réel, modifications locales uniquement.')
change('<fieldset class="control-group"><legend>✨ Matériau et énergie</legend>','<fieldset class="control-group"><legend>01 · Matériau principal</legend>')
# Move the nucleus power control next to existing size control, not inside material.
power=re.search(r'<div class="control-row"><label class="control-label" for="sf-coreLight">.*?</div>\n',s)
size=re.search(r'<div class="control-row"><label class="control-label" for="sf-coreSize">.*?</div>\n',s)
assert power and size
s=s.replace(power.group(0),'',1).replace(size.group(0),'',1)
core_group='''<fieldset class="control-group nucleus-panel" data-nucleus-panel>
<legend>02 · Noyau énergétique</legend>
<p class="help">Le noyau original reste disponible. Trois variantes animées transforment son propre volume en flux, indépendamment des courants extérieurs.</p>
<div class="control-row"><label class="control-label" for="sf-coreMode"><span>Forme du noyau</span></label>
<select id="sf-coreMode" data-core-control="mode" data-default="0"><option value="0">Sphère lumineuse · Original</option><option value="1">Vortex interne</option><option value="2">Filaments tressés</option><option value="3">Ondes pulsées</option></select></div>
'''+size.group(0)+power.group(0)+'''<div class="control-row"><label class="control-label" for="sf-coreSpeed"><span>Vitesse de l'énergie interne</span><output data-core-value="speed">100 %</output></label><input id="sf-coreSpeed" data-core-control="speed" data-default="100" type="range" min="0" max="200" value="100" step="1"></div>
<p class="help">Vitesse 0 : flux interne figé. Taille ou puissance 0 : noyau éteint. Le mode original conserve son aspect R188.5.</p>
</fieldset>
'''
change('<fieldset class="control-group flow-lab" data-flow-lab>',core_group+'<details class="lab-panel lab-flows"><summary>03 · Architecture des flux <span>Trajectoires et turbulences</span></summary>\n<fieldset class="control-group flow-lab" data-flow-lab>')
change('<legend>⚡ Architecture des flux · R188.4</legend>','<legend>Trajectoires externes</legend>')
change('<fieldset class="control-group"><legend>🌐 Volume et noyau</legend>','<fieldset class="control-group"><legend>Diamètres et volume extérieur</legend>')
change('<p class="help">La coque opaque est supprimée. Seuls restent les flux énergétiques, le noyau et leur lumière.</p>\n</fieldset>\n<fieldset class="control-group energy-visual" data-energy-visual>',
       '<p class="help">Coque opaque désactivée. Le diamètre de la sphère reste indépendant du noyau.</p>\n</fieldset>\n</details>\n<details class="lab-panel lab-colors"><summary>04 · Interaction et couleurs <span>Palette, souris</span></summary>\n<fieldset class="control-group energy-visual" data-energy-visual>')
change('<legend>Interaction et couleurs · R187.9</legend>','<legend>Palette et interactions</legend>')
change('</fieldset>\n<details class="lab-optional" data-lab-optional>',
       '</fieldset>\n</details>\n<details class="lab-optional" data-lab-optional>')
change('<summary>Compositions et éclats 3D <span class="lab-meta">optionnel</span></summary>',
       '<summary>05 · Compositions et éclats 3D <span class="lab-meta">optionnel</span></summary>')
change('<details class="vfx-advanced"><summary>Réglages avancés</summary>',
       '<details class="vfx-advanced"><summary>06 · Réglages techniques et performances</summary>')
change('Ray marching WebGL 3D · noyau et flux pur sans particules additionnelles · aperçu expérimental SiteForge.',
       'Ray marching WebGL1 · noyau à quatre formes · neuf matériaux · laboratoire expérimental isolé.')
style='''
/* R188.6: legible studio hierarchy, no duplicate controls or extra canvas. */
.lab-controls{gap:16px;background:linear-gradient(160deg,#0d1b2d,#081321);border-color:#34516a}
.lab-controls>.control-group{padding:16px;border:1px solid #2d4860;border-radius:14px;background:#0d1d30}
.lab-controls>.control-group+ .control-group{border-top:1px solid #365572}
.nucleus-panel{background:linear-gradient(150deg,rgba(82,53,143,.18),rgba(21,80,75,.11))!important;border-color:#665b9a!important}
.nucleus-panel select,.lab-panel select{width:100%;min-height:44px;background:#142b43;color:#e9f8ff;border:1px solid #416882;border-radius:10px;padding:8px;font:inherit}
.lab-panel{border:1px solid #2e4b64;border-radius:13px;background:#0b1b2d;min-width:0}
.lab-panel>summary{min-height:55px;cursor:pointer;padding:16px;list-style-position:inside;color:#d8edff;font-weight:700}
.lab-panel>summary span{display:block;font-size:.72rem;font-weight:400;color:#8aabc4;margin:4px 0 0 19px}
.lab-panel>summary:focus-visible{outline:2px solid #94e4ee;outline-offset:2px}
.lab-panel[open]>summary{border-bottom:1px solid #2a4b64}
.lab-panel>.control-group{padding:16px;margin:0}
.lab-flows>.control-group+.control-group{border-top:1px solid #2e4960}
.lab-colors .energy-visual{border:0;border-radius:0;background:transparent}
.lab-controls>.panel-head{padding:3px 1px}
.lab-controls>.help{line-height:1.55}
@media(max-width:700px){.lab-controls>.control-group,.lab-panel>.control-group{padding:12px}}
'''
change('</style>',style+'</style>')
# Controls outside the legacy 18 plasma settings; export a validated optional sibling.
change('const turbulenceDefault=35;','''const turbulenceDefault=35;
   const coreControls=Object.fromEntries([...document.querySelectorAll('[data-core-control]')].map(e=>[e.dataset.coreControl,e]));
   const coreDefaults={mode:'0',speed:'100'};
   const coreMode=()=>Number(coreControls.mode.value);
   const coreSpeed=()=>Number(coreControls.speed.value)/100;''')
change('stage.dataset.energyTurbulence=energyTurbulence.value;', '''stage.dataset.energyTurbulence=energyTurbulence.value;
    stage.dataset.coreMode=coreControls.mode.value;
    stage.dataset.coreSpeed=coreControls.speed.value;
    document.querySelector('[data-core-value="speed"]').textContent=coreControls.speed.value+' %';''')
change("if(e.target===energyTurbulence){sync();schedule();return;}","if(e.target===energyTurbulence||e.target?.hasAttribute('data-core-control')){sync();schedule();return;}")
change("energyMouseEnabled=true;energyPalette.value='synestra';useEnergyPalette('synestra');energyTurbulence.value=String(turbulenceDefault);",
       "energyMouseEnabled=true;energyPalette.value='synestra';useEnergyPalette('synestra');energyTurbulence.value=String(turbulenceDefault);for(const [k,e] of Object.entries(coreControls))e.value=coreDefaults[k];")
change("const energyDynamics={turbulence:Number(energyTurbulence.value)};",
       "const energyDynamics={turbulence:Number(energyTurbulence.value)};\n     const nucleusDynamics={mode:coreMode(),speed:Number(coreControls.speed.value)};")
change("     energyDynamics\n    };","     energyDynamics,\n     nucleusDynamics\n    };")
change("const nextTurbulence=dynamics===undefined?turbulenceDefault:dynamics.turbulence;",
       """const nextTurbulence=dynamics===undefined?turbulenceDefault:dynamics.turbulence;
     const nd=doc.nucleusDynamics;
     if(nd!==undefined&&(!nd||typeof nd!=='object'||Array.isArray(nd)||
       Object.keys(nd).length!==2||!Object.prototype.hasOwnProperty.call(nd,'mode')||
       !Object.prototype.hasOwnProperty.call(nd,'speed')||
       !Number.isInteger(nd.mode)||nd.mode<0||nd.mode>3||
       !Number.isInteger(nd.speed)||nd.speed<0||nd.speed>200))
      throw Error('Paramètres du noyau invalides.');
     const nextNucleus=nd===undefined?{mode:0,speed:100}:{mode:nd.mode,speed:nd.speed};""")
change('return {nextPlasma,nextMotes,nextFlow,nextVisual,nextTurbulence,enabled:values.enabled===undefined?true:values.enabled};',
       'return {nextPlasma,nextMotes,nextFlow,nextVisual,nextTurbulence,nextNucleus,enabled:values.enabled===undefined?true:values.enabled};')
change("energyTurbulence.value=String(values.nextTurbulence);",
       "energyTurbulence.value=String(values.nextTurbulence);for(const [k,v] of Object.entries(values.nextNucleus))coreControls[k].value=String(v);")
change('uniform float uLabTime; // R187.1 energy flux time, material 6 only',
       'uniform float uLabTime; // R187.1 energy flux time\nuniform vec2 uCoreForm; // R188.6 mode 0..3, speed 0..2')
change("'uMoteFinish','uLabTime'];","'uMoteFinish','uLabTime','uCoreForm'];")
change("gl.uniform1f(U.uEnergyTurbulence,Number(energyTurbulence.value)/100);",
       "gl.uniform1f(U.uEnergyTurbulence,Number(energyTurbulence.value)/100);\n   gl.uniform2f(U.uCoreForm,coreMode(),coreSpeed());")
# Shared analytic flow field: no second pass, no opaque meshes, no new GPU context.
helper='''float nucleusFlow(vec2 screen,float nr){
 float phi=atan(screen.y,screen.x),phase=uLabTime*uCoreForm.y;
 if(uCoreForm.x<.5)return 0.;
 if(uCoreForm.x<1.5){
  float twirl=phi*3.0-nr*10.0-phase*2.7;
  return pow(.5+.5*cos(twirl),6.0)*(1.-smoothstep(.35,1.75,nr));
 }
 if(uCoreForm.x<2.5){
  float braid=sin(phi*5.0+nr*13.0+phase*1.8)*sin(phi*3.0-nr*11.0-phase*2.3);
  return pow(.5+.5*braid,5.0)*(1.-smoothstep(.25,1.8,nr));
 }
 float rings=sin(nr*19.0-phase*3.6+sin(phi*4.0+phase)*1.5);
 return pow(.5+.5*rings,7.0)*(1.-smoothstep(.2,1.8,nr));
}
'''
change('float hash3(vec3 v){',helper+'float hash3(vec3 v){')
# Add line volume energy branch 6..8
change('vec3 centralWhite=mix(uEnergyCore,vec3(1.),.34);',
       '''vec3 centralWhite=mix(uEnergyCore,vec3(1.),.34);
   float coreCurrent=nucleusFlow(p,cr);
   float flowing=step(.5,uCoreForm.x);
   centralWhite*=mix(1.,.41,flowing);
   Lneon+=mix(cyanNeon,pinkNeon,.5+.5*sin(atan(p.y,p.x)*2.0+uLabTime*uCoreForm.y))
          *coreCurrent*centralGlow*2.7;''')
change('float alphaNeon=clamp(.010+Aneon*.95*densityGain+centralEnabled*(centralOrb*.85+centralHalo*.22)*min(centralPower,1.),0.,1.);',
       'float alphaNeon=clamp(.010+Aneon*.95*densityGain+centralEnabled*(centralOrb*.85+centralHalo*.22+coreCurrent*.5)*min(centralPower,1.),0.,1.);')
change('vec3 coreLight=coreWhite*(heart*.76+hot*1.48)*corePower',
       '''float current=nucleusFlow(p,nr);
  float flowing=step(.5,uCoreForm.x);
  vec3 coreLight=coreWhite*(heart*.76+hot*1.48)*corePower*mix(1.,.43,flowing)
     +mix(uEnergyA,uEnergyB,.5+.5*sin(atan(p.y,p.x)*2.+uLabTime*uCoreForm.y))
      *current*corePower*2.6''')
change('float alpha=(1.-trans)+coreVisible*clamp(heart*.88+bloom*.30,0.,1.);',
       'float alpha=(1.-trans)+coreVisible*clamp(heart*.88+bloom*.30+current*.5,0.,1.);')
# Ensure CSP for single changed inline script.
m=re.search(r'(?s)<script>(.*?)</script>',s)
assert m and s.count('<script>')==1
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
digest=base64.b64encode(sha256(m.group(1).encode()).digest()).decode()
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert s.count('id="sf-coreMode"')==1 and s.count('id="sf-coreSize"')==1 and s.count('id="sf-coreLight"')==1
assert s.count("new WebGLRenderingContext(")==0
dst.write_bytes(s.encode())
print('R1886_BUILD_PASS',sha256(dst.read_bytes()).hexdigest(),'CSP_SHA',digest)
