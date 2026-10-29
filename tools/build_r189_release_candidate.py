"""R189: lab qualification UI and explicit WebGL context recovery."""
from pathlib import Path
from hashlib import sha256
import re,base64
root=Path(__file__).resolve().parent.parent
b=(root/'siteforge-r1889-autonome.html').read_bytes().replace(b'\r\n',b'\n')
assert sha256(b).hexdigest()=='dc869bf6b68164150a88d0a3a20e78659409acb07a11b517650f0d4ee698ce19'
s=b.decode('utf8')
def edit(a,b):
 global s
 assert s.count(a)==1,(a[:80],s.count(a))
 s=s.replace(a,b,1)
edit('LAB R188.9</span>','LAB R189</span>')
edit('SiteForge — Laboratoire énergétique 3D R188.9','SiteForge — Laboratoire énergétique 3D R189')
edit('<p class="help" data-render-status role="status" aria-live="polite">Préparation du moteur WebGL…</p>',
'''<p class="help" data-render-status role="status" aria-live="polite">Préparation du moteur WebGL…</p>
<button type="button" class="reset" data-gpu-reload hidden aria-label="Relancer le rendu WebGL après une perte GPU">Relancer le moteur 3D</button>''')
edit('</style>','[data-gpu-reload][hidden]{display:none!important}\n</style>')
edit("const fpsOutput=document.querySelector('[data-quality-fps]');",
     "const fpsOutput=document.querySelector('[data-quality-fps]');\n const gpuReload=document.querySelector('[data-gpu-reload]');")
edit("const status=(target,value)=>{if(target&&target.textContent!==value)target.textContent=value;};",
     "const status=(target,value)=>{if(target&&target.textContent!==value)target.textContent=value;};\n gpuReload?.addEventListener('click',()=>window.location.reload());")
edit("stage.setAttribute('data-core-ready','true');",
     "stage.setAttribute('data-core-ready','true');\n   stage.dataset.gpuStatus='ready';")
edit("stage.removeAttribute('data-core-ready');\n  status(mainStatus,'GPU perdu : recharge la page.');",
     "stage.removeAttribute('data-core-ready');\n  stage.dataset.gpuStatus='lost';\n  if(gpuReload)gpuReload.hidden=false;\n  status(mainStatus,'GPU perdu : utilise Relancer le moteur 3D pour récupérer la scène.');")
m=re.search(r'(?s)<script>(.*?)</script>',s);c=re.search(r"script-src 'sha256-[^']+'",s);assert m and c
s=s.replace(c.group(0),"script-src 'sha256-"+base64.b64encode(sha256(m.group(1).encode()).digest()).decode()+"'",1)
p=root/'siteforge-r189-autonome.html';p.write_bytes(s.encode());print('R189_BUILD_PASS',sha256(p.read_bytes()).hexdigest())
