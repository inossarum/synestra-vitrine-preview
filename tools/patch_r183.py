from pathlib import Path
r=Path(__file__).resolve().parent.parent
js=r/"assets/siteforge-lab-r166-flow.js"
html=r/"siteforge/core-3d-lab/index.html"
s=js.read_text("utf8");h=html.read_text("utf8")
def J(a,b):
 global s
 if s.count(a)!=1: raise RuntimeError("JS_ANCHOR_COUNT_"+str(s.count(a))+"_"+a[:100])
 s=s.replace(a,b)
def H(a,b):
 global h
 if h.count(a)!=1: raise RuntimeError("HTML_ANCHOR_COUNT_"+str(h.count(a))+"_"+a[:100])
 h=h.replace(a,b)
H("<title>SiteForge — Laboratoire énergétique 3D R182</title>","<title>SiteForge — Laboratoire énergétique 3D R183</title>")
H('<span class="preview-state">R182 · CRISTAUX MICROFACETTÉS</span>','<span class="preview-state">R183 · QUALITÉ ADAPTATIVE</span>')
H('<p class="help">R182 : reflets directionnels et micro-imperfections ajustables sur les cristaux 3D. Les autres styles, le mouvement synchronisé et le rechargement des paramètres restent disponibles.</p>',
  '<p class="help">R183 : contrôle de la fidélité volumétrique et cadence de rendu observée. Le mode Auto réduit la charge du shader en cas de lenteur, sans modifier les matériaux, les réglages ni la rotation des éclats.</p>')
H("</div></fieldset>\n</details>\n<button class=\"reset\" type=\"reset\">Restaurer le plasma d'origine</button>",
"""</div></fieldset>
<fieldset class="control-group" data-quality-panel><legend>Performance du rendu 3D</legend>
<div class="control-row"><label class="control-label" for="sf-renderQuality"><span>Qualité volumétrique</span><output data-quality-steps>14 échantillons</output></label>
<select id="sf-renderQuality" data-render-quality>
<option value="balanced" selected>Équilibrée — rendu R182</option>
<option value="auto">Adaptative — selon la cadence</option>
<option value="performance">Économie GPU — moins d’échantillons</option>
<option value="quality">Détaillée — maximum WebGL1</option>
</select></div>
<p class="help">Cadence observée : <output data-quality-fps>mesure en cours</output>. Mesure indicative des images calculées par Chrome, pas un benchmark du GPU physique. Les réglages de scène et la vitesse de rotation restent inchangés.</p>
</fieldset>
</details>
<button class="reset" type="reset">Restaurer le plasma d'origine</button>""")
J(" const vfxStatus=document.querySelector('[data-vfx-status]');",
""" const vfxStatus=document.querySelector('[data-vfx-status]');
 const qualitySelect=document.querySelector('[data-render-quality]');
 const fpsOutput=document.querySelector('[data-quality-fps]');
 const samplesOutput=document.querySelector('[data-quality-steps]');""")
J(" panel?.addEventListener('change',onChange);",
""" panel?.addEventListener('change',onChange);
 qualitySelect?.addEventListener('change',()=>{
  if(qualitySelect.value==='balanced'||qualitySelect.value==='performance'||qualitySelect.value==='quality'||qualitySelect.value==='auto')schedule();
 });""")
J("  motesEnabled=true;\n  compareVariant=1;depthVariant=1;sync();schedule();",
"""  motesEnabled=true;
  if(qualitySelect)qualitySelect.value='balanced';
  compareVariant=1;depthVariant=1;sync();schedule();""")
J(" let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,tiltX=0,tiltY=0;",
""" let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,tiltX=0,tiltY=0;
 // R183: CPU/browser frame cadence, not an unproven physical GPU timer.
 // This affects only uVolumeSteps: no animation speed, no particle count.
 let cadenceMs=0,cadenceSamples=0,autoPenalty=0,lastQualityChange=0,lastTelemetry=0,priorQualityMode='balanced';
 const chooseVolumeSteps=(mobile,baseline,mode,penalty)=>{
  if(mode==='performance')return mobile?10:16;
  if(mode==='quality')return mobile?18:22; // shader loop hard maximum = 22
  if(mode==='auto')return Math.max(mobile?8:14,baseline-penalty*(mobile?2:3));
  return baseline;
 };
 // Hysteresis and cooldown prevent toggling on one slow frame.
 const nextAutoPenalty=(old,avgMs,validSamples,now,lastChange)=>{
  if(validSamples<24||now-lastChange<3500)return old;
  if(avgMs>62)return Math.min(2,old+1);
  if(avgMs<42&&now-lastChange>8500)return Math.max(0,old-1);
  return old;
 };""")
J("  const frameStep=lastFrame?Math.min(.15,Math.max(0,(now-lastFrame)/1000)):.033;",
"""  const frameDelta=lastFrame?now-lastFrame:0;
  const frameStep=lastFrame?Math.min(.15,Math.max(0,frameDelta/1000)):.033;
  if(frameDelta>=32&&frameDelta<250){
   cadenceMs=cadenceSamples===0?frameDelta:cadenceMs*.88+frameDelta*.12;
   cadenceSamples=Math.min(240,cadenceSamples+1);
  }else if(frameDelta>=250){
   cadenceMs=0;cadenceSamples=0;lastQualityChange=now;
  }""")
J("""  const volumeSteps=mobile?(mobileDense?12:14):22;
  gl.uniform1f(U.uVolumeSteps,volumeSteps);
  stage.dataset.volumeSteps=String(volumeSteps);
  stage.dataset.mobileQuality=mobile?(mobileDense?'adaptive':'balanced'):'desktop';""",
"""  const baselineSteps=mobile?(mobileDense?12:14):22;
  const qualityMode=qualitySelect?.value||'balanced';
  if(qualityMode!==priorQualityMode){
   priorQualityMode=qualityMode;autoPenalty=0;
   // Mode changes must not inherit slow frames from a former quality level.
   cadenceMs=0;cadenceSamples=0;lastQualityChange=now;
  }
  if(qualityMode==='auto'){
   const adjusted=nextAutoPenalty(autoPenalty,cadenceMs,cadenceSamples,now,lastQualityChange);
   if(adjusted!==autoPenalty){autoPenalty=adjusted;lastQualityChange=now;}
  }else autoPenalty=0;
  const volumeSteps=chooseVolumeSteps(mobile,baselineSteps,qualityMode,autoPenalty);
  gl.uniform1f(U.uVolumeSteps,volumeSteps);
  stage.dataset.volumeSteps=String(volumeSteps);
  stage.dataset.mobileQuality=qualityMode==='balanced'?(mobile?(mobileDense?'adaptive':'balanced'):'desktop'):qualityMode;
  stage.dataset.qualityMode=qualityMode;
  stage.dataset.qualityPenalty=String(autoPenalty);
  stage.dataset.renderCadenceMs=cadenceMs.toFixed(1);
  if(now-lastTelemetry>650){
   const cadenceFps=cadenceSamples>=3?Math.min(60,1000/Math.max(1,cadenceMs)):0;
   stage.dataset.renderFps=cadenceFps.toFixed(1);
   if(fpsOutput)fpsOutput.textContent=cadenceFps?cadenceFps.toFixed(0)+' img/s (Chrome)':'mesure en cours';
   if(samplesOutput)samplesOutput.textContent=volumeSteps+' échantillons';
   lastTelemetry=now;
  }""")
js.write_text(s,encoding="utf8",newline="\n");html.write_text(h,encoding="utf8",newline="\n")
print("R183_FRAMEBUDGET_PATCHED",len(s),len(h))
