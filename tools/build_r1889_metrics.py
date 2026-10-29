"""R188.9 GPU query if supported, bounded fallback reporting."""
from pathlib import Path
from hashlib import sha256
import base64,re
root=Path(__file__).resolve().parent.parent
b=(root/'siteforge-r1888-autonome.html').read_bytes().replace(b'\r\n',b'\n')
assert sha256(b).hexdigest()=='f2e9988041feed9a414ac8213dd690a9d888a8853f96faaa8ed0884a15aa3d1c'
s=b.decode()
def edit(x,y):
 global s
 assert s.count(x)==1,(x[:70],s.count(x))
 s=s.replace(x,y,1)
edit('LAB R188.8</span>','LAB R188.9</span>')
edit('SiteForge — Laboratoire énergétique 3D R188.8','SiteForge — Laboratoire énergétique 3D R188.9')
edit('Cadence observée : <output data-quality-fps>mesure en cours</output>.',
     'Cadence observée : <output data-quality-fps>mesure en cours</output>. Temps de rendu GPU : <output data-gpu-time>vérification en cours</output>.')
edit("const fpsOutput=document.querySelector('[data-quality-fps]');",
     "const fpsOutput=document.querySelector('[data-quality-fps]');\n const gpuOutput=document.querySelector('[data-gpu-time]');")
edit("let cadenceMs=0,cadenceSamples=0,autoPenalty=0,lastQualityChange=0,lastTelemetry=0,priorQualityMode='balanced';",
'''let cadenceMs=0,cadenceSamples=0,autoPenalty=0,lastQualityChange=0,lastTelemetry=0,priorQualityMode='balanced';
 const gpuTiming=gl.getExtension('EXT_disjoint_timer_query');
 let gpuQuery=null,gpuActive=false,gpuFrame=0;
 stage.dataset.gpuTimer=gpuTiming?'available':'unsupported';
 stage.dataset.gpuMs='unavailable';
 if(!gpuTiming&&gpuOutput)gpuOutput.textContent='Extension indisponible (cadence CPU seulement)';
 const beginGpuSample=()=>{
  if(!gpuTiming)return;
  if(gpuQuery){
   if(gpuTiming.getQueryObjectEXT(gpuQuery,gpuTiming.QUERY_RESULT_AVAILABLE_EXT)){
    const disjoint=gl.getParameter(gpuTiming.GPU_DISJOINT_EXT);
    if(!disjoint){
     const ms=gpuTiming.getQueryObjectEXT(gpuQuery,gpuTiming.QUERY_RESULT_EXT)/1000000;
     if(Number.isFinite(ms)&&ms>=0&&ms<10000){
      stage.dataset.gpuMs=ms.toFixed(3);
      if(gpuOutput)gpuOutput.textContent=ms.toFixed(2)+' ms (GPU)';
     }
    }else stage.dataset.gpuTimer='disjoint';
    gpuTiming.deleteQueryEXT(gpuQuery);gpuQuery=null;
   }
  }
  if(!gpuQuery&&(gpuFrame++%24===0)){
   const q=gpuTiming.createQueryEXT();
   if(q){gpuTiming.beginQueryEXT(gpuTiming.TIME_ELAPSED_EXT,q);gpuQuery=q;gpuActive=true;}
  }
 };
 const endGpuSample=()=>{if(gpuTiming&&gpuActive){gpuTiming.endQueryEXT(gpuTiming.TIME_ELAPSED_EXT);gpuActive=false;}};
''')
edit('gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);',
     'gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);\n  beginGpuSample();')
edit("  gl.disable(gl.BLEND);\n  status(vfxStatus,",
     "  gl.disable(gl.BLEND);\n  endGpuSample();\n  status(vfxStatus,")
edit("observer.disconnect();resizeObserver.disconnect();",
     "observer.disconnect();resizeObserver.disconnect();\n  if(gpuTiming&&gpuQuery&&!gpuActive){gpuTiming.deleteQueryEXT(gpuQuery);gpuQuery=null;}")
m=re.search(r'(?s)<script>(.*?)</script>',s);c=re.search(r"script-src 'sha256-[^']+'",s);assert m and c
s=s.replace(c.group(0),"script-src 'sha256-"+base64.b64encode(sha256(m.group(1).encode()).digest()).decode()+"'",1)
p=root/'siteforge-r1889-autonome.html';p.write_bytes(s.encode());print('R1889_BUILD_PASS',sha256(p.read_bytes()).hexdigest())
