"""R188.8: versioned nucleus presets, A/B snapshots, deterministic capture time."""
from pathlib import Path
from hashlib import sha256
import base64,re
r=Path(__file__).resolve().parent.parent
b=(r/'siteforge-r1887-autonome.html').read_bytes().replace(b'\r\n',b'\n')
assert sha256(b).hexdigest()=='0726fc7d1e636395cc5db531a9373e124aa68a8aae304fe9224ba1b3ffc5a800'
s=b.decode('utf8')
def edit(a,b):
 global s
 assert s.count(a)==1,(a[:100],s.count(a))
 s=s.replace(a,b,1)
edit('LAB R188.7</span>','LAB R188.8</span>')
edit('SiteForge — Laboratoire énergétique 3D R188.7','SiteForge — Laboratoire énergétique 3D R188.8')
edit('<p class="help">Vitesse 0 : flux interne figé.',
'''<div class="lab-recipes" aria-label="Presets de noyaux">
<button type="button" data-nucleus-preset="original">Original</button>
<button type="button" data-nucleus-preset="vortex">Vortex</button>
<button type="button" data-nucleus-preset="braid">Tressage</button>
<button type="button" data-nucleus-preset="pulse">Impulsions</button>
</div>
<div class="lab-snapshot" aria-label="Comparateur A et B">
<button type="button" data-core-compare="save-a">Mémoriser A</button>
<button type="button" data-core-compare="save-b">Mémoriser B</button>
<button type="button" data-core-compare="load-a" disabled>Voir A</button>
<button type="button" data-core-compare="load-b" disabled>Voir B</button>
</div>
<p class="help" data-core-compare-status role="status" aria-live="polite">Comparateur A/B : enregistre deux réglages, puis bascule entre eux. Les paramètres du noyau sont restaurés ensemble.</p>
<p class="help">Vitesse 0 : flux interne figé.''')
css='''.lab-recipes,.lab-snapshot{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}
.lab-recipes button,.lab-snapshot button{min-height:43px;padding:8px;border:1px solid #426a83;border-radius:9px;background:#14283d;color:#dff8ff;cursor:pointer;font:inherit}
.lab-recipes button[aria-pressed="true"],.lab-snapshot button[aria-pressed="true"]{background:#1d625e;border-color:#82e7d8}
.lab-recipes button:focus-visible,.lab-snapshot button:focus-visible{outline:2px solid #8df2ff;outline-offset:2px}
.lab-snapshot button:disabled{opacity:.47;cursor:not-allowed}
'''
edit('</style>',css+'</style>')
edit("const coreMode=()=>Number(coreControls.mode.value);",
'''// R188.8 canonical, versioned library. No extra storage or provider call.
   const nucleusPresetLibrary=Object.freeze({
    schema:'synestra.lab.nucleus-presets.v1',version:1,
    original:{mode:0,speed:100,size:70,power:135},
    vortex:{mode:1,speed:110,size:75,power:145},
    braid:{mode:2,speed:85,size:80,power:160},
    pulse:{mode:3,speed:95,size:75,power:145}
   });
   const snapshotSlots={a:null,b:null};
   let snapshotActive=null;
   const snapshotStatus=document.querySelector('[data-core-compare-status]');
   const captureCore=()=>({
     mode:Number(coreControls.mode.value),speed:Number(coreControls.speed.value),
     size:Number(controls.coreSize.value),power:Number(controls.coreLight.value)
   });
   const restoreCore=values=>{
     if(!values||!Number.isInteger(values.mode)||values.mode<0||values.mode>3)return false;
     coreControls.mode.value=String(values.mode);
     coreControls.speed.value=String(values.speed);
     controls.coreSize.value=String(values.size);
     controls.coreLight.value=String(values.power);
     sync();schedule();return true;
   };
   const coreMode=()=>Number(coreControls.mode.value);''')
# Need ensure controls defined before this; in original const controls defined earlier than energyTurbulence, yes.
edit("if(event.target.closest('[data-energy-mouse-toggle]')){",
'''const presetButton=event.target.closest('[data-nucleus-preset]');
   if(presetButton){
    const preset=nucleusPresetLibrary[presetButton.dataset.nucleusPreset];
    if(preset){restoreCore(preset);snapshotActive=null;sync();return;}
   }
   const compareButton=event.target.closest('[data-core-compare]');
   if(compareButton){
    const operation=compareButton.dataset.coreCompare;
    const slot=operation.endsWith('a')?'a':'b';
    if(operation.startsWith('save-')){
     snapshotSlots[slot]=captureCore();
     const btn=document.querySelector('[data-core-compare="load-'+slot+'"]');
     if(btn)btn.disabled=false;
     if(snapshotStatus)snapshotStatus.textContent='Instantané '+slot.toUpperCase()+' enregistré en mémoire locale.';
    }else if(restoreCore(snapshotSlots[slot])){
     snapshotActive=slot;
     if(snapshotStatus)snapshotStatus.textContent='Comparaison : noyau '+slot.toUpperCase()+' actif.';
    }
    stage.dataset.snapshotActive=snapshotActive||'none';
    for(const btn of document.querySelectorAll('[data-core-compare^="load-"]'))
     btn.setAttribute('aria-pressed',String(btn.dataset.coreCompare==='load-'+snapshotActive));
    return;
   }
   if(event.target.closest('[data-energy-mouse-toggle]')){''')
edit("stage.dataset.coreMode=coreControls.mode.value;",
'''stage.dataset.coreMode=coreControls.mode.value;
    const activePreset=Object.keys(nucleusPresetLibrary).filter(k=>k!=='schema'&&k!=='version')
     .find(k=>JSON.stringify(nucleusPresetLibrary[k])===JSON.stringify(captureCore()));
    stage.dataset.nucleusPreset=activePreset||'custom';
    for(const btn of document.querySelectorAll('[data-nucleus-preset]'))
     btn.setAttribute('aria-pressed',String(btn.dataset.nucleusPreset===activePreset));''')
# deterministic clock guarded on query, explicit no URL/network side effect.
edit("let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,tiltX=0,tiltY=0;",
'''let active=true,visible=true,frame=0,last=0,lastFrame=0,elapsed=0,tiltX=0,tiltY=0;
 const labFrameText=new URLSearchParams(location.search).get('labFrame');
 const labFrameValue=labFrameText===null?NaN:Number(labFrameText);
 const fixedFrame=Number.isFinite(labFrameValue)&&labFrameValue>=0&&labFrameValue<=60?labFrameValue:null;
 stage.dataset.captureClock=fixedFrame===null?'realtime':'fixed';''')
edit("if(last)elapsed+=Math.min((now-last)/1000,.15)*Math.max(0,num('particleSpeed'));last=now;",
     "if(last)elapsed+=Math.min((now-last)/1000,.15)*Math.max(0,num('particleSpeed'));last=now;\n  if(fixedFrame!==null)elapsed=fixedFrame;")
edit("gl.uniform1f(U.uLabTime,(now*.001)%3600);",
     "gl.uniform1f(U.uLabTime,fixedFrame===null?(now*.001)%3600:fixedFrame);")
m=re.search(r'(?s)<script>(.*?)</script>',s);c=re.search(r"script-src 'sha256-[^']+'",s);assert m and c
s=s.replace(c.group(0),"script-src 'sha256-"+base64.b64encode(sha256(m.group(1).encode()).digest()).decode()+"'",1)
p=r/'siteforge-r1888-autonome.html';p.write_bytes(s.encode());print('R1888_BUILD_PASS',sha256(p.read_bytes()).hexdigest())
