/* SYNESTRA / KINETIC SIGNAL — R&D visual engine, procedural Canvas 2D.
   Same synthetic ProofPath model, no IO, analytics, accounts or private calls. */
(() => {
"use strict";
const data=window.ProofPathData;
if(!data||data.schema!=="synestra.proofpath.machine.v0"||data.synthetic!==true||data.journeys?.length!==3)return;
const canvas=document.getElementById("signal-canvas");
const ctx=canvas?.getContext("2d",{alpha:true});
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
const modes={
 explorer:{primary:"#c7ff9a",secondary:"#b8a6ff",tertiary:"#ffffff",kind:0,label:"CRÉER"},
 comparer:{primary:"#ffb38b",secondary:"#ff7192",tertiary:"#ffffff",kind:1,label:"PILOTER"},
 verifier:{primary:"#8cf1e6",secondary:"#cad1ff",tertiary:"#ffffff",kind:2,label:"PROUVER"}
};
let intent="explorer",running=false,requestedMotion=!reduced.matches,visible=true,raf=0,frame=0,lastPaint=0,hoverX=0,hoverY=0,w=1,h=1,dpr=1;
const selectors=[...document.querySelectorAll(".mode-choice,.signal-node")];
const sections=[...document.querySelectorAll(".signal-panel")];
const label=document.getElementById("mode-label");
const status=document.getElementById("experience-status");
const pause=document.getElementById("motion-toggle");
const digits=document.getElementById("frame-digits");
const share=document.getElementById("share-mode");
const change=(next)=>{
 if(!Object.hasOwn(modes,next)||!data.journeys.some(j=>j.intent===next))return false;
 intent=next;
 const theme=modes[intent];
 document.documentElement.style.setProperty("--mode-accent",theme.primary);
 document.documentElement.style.setProperty("--mode-secondary",theme.secondary);
 selectors.forEach(b=>{
   const active=b.dataset.intent===intent;
   b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));
 });
 sections.forEach(s=>s.hidden=s.dataset.intent!==intent);
 label.textContent=theme.label;
 if(share){share.href="?mode="+intent;share.setAttribute("aria-label","Ouvrir le lien vers le mode "+theme.label)}
 status.textContent="Parcours "+theme.label+". "+data.journeys.find(j=>j.intent===intent).items.length+" informations fictives, sources non attestées.";
 if(!running)render(performance.now());
 return true;
};
const resize=()=>{
 if(!ctx)return;
 const r=canvas.getBoundingClientRect();
 dpr=Math.min(window.devicePixelRatio||1,1.5);
 w=Math.max(1,r.width);h=Math.max(1,r.height);
 canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
 ctx.setTransform(dpr,0,0,dpr,0,0);
 if(!running)render(performance.now());
};
function rgb(hex){
 const h=hex.slice(1);
 return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];
}
function rgba(hex,a){const [r,g,b]=rgb(hex);return "rgba("+r+","+g+","+b+","+a+")"}
function line(points,color,opacity,width){
 ctx.beginPath();
 for(let i=0;i<points.length;i++){const p=points[i];i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])}
 ctx.strokeStyle=rgba(color,opacity);ctx.lineWidth=width;ctx.stroke();
}
function render(now){
 if(!ctx)return;
 const theme=modes[intent],t=running?now*.00019:frame*.00019;
 ctx.clearRect(0,0,w,h);
 const cx=w*.54,cy=h*.51,size=Math.min(w*.4,h*.5),rx=Math.max(65,size);
 const aura=ctx.createRadialGradient(cx,cy,5,cx,cy,rx*1.5);
 aura.addColorStop(0,rgba(theme.secondary,.18));aura.addColorStop(.42,rgba(theme.primary,.065));aura.addColorStop(1,"rgba(0,0,0,0)");
 ctx.fillStyle=aura;ctx.fillRect(0,0,w,h);
 const c=Math.cos(t),s=Math.sin(t);
 // Deterministic 3D toroidal wave. Perspective, opacity and mode depend on depth.
 function project(u,v){
  const q=modes[intent].kind;
  const ring=q===1?1.25:q===2?.83:1.0;
  const big=1.65+(q===2?.07:0),small=.62+(q===1?.2:0);
  let x=(big+small*Math.cos(v))*Math.cos(u)*ring;
  let y=(big+small*Math.cos(v))*Math.sin(u);
  let z=small*Math.sin(v);
  if(q===1)y+=.16*Math.sin(u*3+t*7);
  if(q===2)z+=.38*Math.cos(u*4+v*2);
  const x1=x*c+z*s,z1=-x*s+z*c;
  const tilt=.23+hoverY*.18,yt=y*Math.cos(tilt)-z1*Math.sin(tilt);
  const zt=y*Math.sin(tilt)+z1*Math.cos(tilt);
  const persp=5.5/(6.4-zt);
  return [cx+(x1+hoverX*.2)*rx*.63*persp,cy+yt*rx*.62*persp,zt,persp];
 }
 ctx.lineCap="round";
 for(let j=0;j<16;j++){
  const v=j/16*Math.PI*2;
  const pts=[];
  for(let k=0;k<=160;k++)pts.push(project(k/160*Math.PI*2,v));
  line(pts, j%4===0?theme.primary:theme.secondary,j%4===0?.43:.21,j%4===0?1.5:.85);
 }
 for(let k=0;k<32;k++){
  const u=k/32*Math.PI*2;
  const pts=[];
  for(let j=0;j<=86;j++)pts.push(project(u,j/86*Math.PI*2));
  line(pts,k%3===0?theme.primary:theme.secondary,k%3===0?.35:.16,1.0);
 }
 for(let i=0;i<510;i++){
  const u=i*2.399963229728653, v=i*.61803398875*Math.PI*2;
  const p=project(u,v),front=(p[2]+2.6)/5.2;
  const flicker=.68+.32*Math.sin(t*20+i*.74);
  const alpha=Math.max(.22,Math.min(.98,front*.9+.3))*flicker;
  const r=i%31===0?2.7:i%6===0?1.5:.7;
  ctx.beginPath();ctx.arc(p[0],p[1],r*p[3],0,Math.PI*2);
  ctx.fillStyle=rgba(i%4===0?theme.primary:theme.secondary,alpha);ctx.fill();
  if(i%45===0){
   ctx.beginPath();ctx.arc(p[0],p[1],7*p[3],0,Math.PI*2);
   ctx.strokeStyle=rgba(theme.primary,.44);ctx.lineWidth=1.3;ctx.stroke();
  }
 }
 // Orbit cursors and graphic rules tethered to the visual core.
 for(let i=0;i<3;i++){
  const ang=t*1.4+i*2.094,px=cx+Math.cos(ang)*rx*1.32,py=cy+Math.sin(ang*.7)*rx*.75;
  ctx.beginPath();ctx.arc(px,py,3.2,0,Math.PI*2);
  ctx.fillStyle=theme.primary;ctx.fill();
  ctx.strokeStyle=rgba(theme.primary,.14);ctx.lineWidth=.8;
  ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(cx,cy);ctx.stroke();
 }
 ctx.font="10px monospace";ctx.fillStyle=rgba(theme.primary,.75);
 ctx.fillText("SYN / "+modes[intent].label+" / 01",Math.max(18,cx-rx*1.23),Math.max(24,cy-rx*.83));
 ctx.fillStyle=rgba(theme.secondary,.75);
 ctx.fillText("∞  SYSTEM / LIVE",Math.min(w-130,cx+rx*.55),Math.min(h-24,cy+rx*.82));
 if(digits)digits.textContent=String(Math.floor((running?now:frame)/1000)%9999).padStart(4,"0");
}
function loop(now){
 if(!running)return;
 const budget=window.innerWidth<=600?1000/30:1000/45;
 if(now-lastPaint>=budget){lastPaint=now;frame=now;render(now)}
 raf=requestAnimationFrame(loop);
}
function setMotion(shouldRun){
 if(!ctx)return;
 requestedMotion=shouldRun;
 running=requestedMotion&&!reduced.matches&&visible&&!document.hidden;
 cancelAnimationFrame(raf);
 pause.textContent=running?"PAUSE MOTION":reduced.matches?"MOTION RÉDUITE":requestedMotion?"MOTION EN VEILLE":"PLAY MOTION";
 pause.setAttribute("aria-pressed",String(!requestedMotion||reduced.matches));
 canvas.dataset.animating=String(running);
 if(running){lastPaint=0;raf=requestAnimationFrame(loop)}
 else render(frame);
}
selectors.forEach(b=>b.addEventListener("click",()=>change(b.dataset.intent)));
document.querySelector(".signal-rail")?.addEventListener("keydown",e=>{
 if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;
 const buttons=[...document.querySelectorAll(".signal-node")];
 const current=buttons.indexOf(document.activeElement);
 if(current<0)return;
 e.preventDefault();
 const next=e.key==="Home"?0:e.key==="End"?buttons.length-1:
  (current+((e.key==="ArrowDown"||e.key==="ArrowRight")?1:-1)+buttons.length)%buttons.length;
 buttons[next].focus();change(buttons[next].dataset.intent);
});
pause?.addEventListener("click",()=>setMotion(!requestedMotion));
reduced.addEventListener("change",()=>setMotion(requestedMotion));
document.addEventListener("visibilitychange",()=>setMotion(requestedMotion));
if("IntersectionObserver" in window){
 new IntersectionObserver(entries=>{
  visible=entries[0].isIntersecting;
  setMotion(requestedMotion);
 },{threshold:.03}).observe(canvas);
}
canvas?.addEventListener("pointermove",e=>{
 const r=canvas.getBoundingClientRect();
 hoverX=((e.clientX-r.left)/r.width-.5)*1.1;
 hoverY=((e.clientY-r.top)/r.height-.5)*1.1;
 if(!running)render(frame);
});
canvas?.addEventListener("pointerleave",()=>{hoverX=hoverY=0;if(!running)render(frame)});
window.addEventListener("resize",resize);
const initial=new URLSearchParams(window.location.search).get("mode");
resize();change(Object.hasOwn(modes,initial)?initial:"explorer");setMotion(!reduced.matches);
})();
