/* SiteForge R127 — genuine XYZ pulse geometry, CPU-bounded and local WebGL1.
 * Independent physics and trajectory shapes; no network/assets.
 */
(()=>{
'use strict';
const TAU=6.283185307179586;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const norm=a=>{const k=Math.hypot(...a)||1;return a.map(x=>x/k);};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const add=(a,b,s=1)=>a.map((x,i)=>x+b[i]*s);
const rnd=n=>{const v=Math.sin(n*127.17+11.31)*43758.5453;return v-Math.floor(v);};
const types=Object.freeze(['radial','spiral','branching','wave','burst','orbiting']);
const natures=Object.freeze(['electric','plasma','filament','ribbon','particles','shockwave','crystalline','wisps']);
// Golden-angle spherical distribution: positive and negative Z are meaningful.
const direction=(i,count,zSpread=1,seed=7)=>{
 const z=(1.-2.*(i+.5)/count)*clamp(zSpread,.15,1.);
 const az=i*2.399963229728653+seed*.019,xy=Math.sqrt(Math.max(0,1-z*z));
 return norm([Math.cos(az)*xy,Math.sin(az)*xy,z]);
};
const build=(p,time)=>{
 const count=clamp(Math.round(p.pulseCount??8),1,16);
 const quality=({eco:14,balanced:26,high:38}[p.quality]||26);
 const tm=time*clamp(p.energySpeed??1,0,3);
 const glow=[],filaments=[],endpoints=[];
 const shape=types.indexOf(p.pulseType),nature=natures.indexOf(p.pulseNature);
 const twist=clamp(p.twist??.5,0,3),chaos=clamp(p.chaos??.25,0,1);
 const turbulence=clamp(p.turbulence??.48,0,2),spread=clamp(p.spread??.6,0,2);
 const flicker=clamp(p.flicker??.25,0,1),branch=clamp(p.branching??.4,0,1);
 const amplitude=clamp(p.amplitude??1,0,2.5),length=clamp(p.pulseLength??1,.2,1.4);
 const seed=clamp(p.seed??7,0,999);
 const emit=(target,from,to,width,fade,id)=>{
  const tangent=norm(to.map((x,k)=>x-from[k]));
  let side=cross(tangent,[.09,.04,1]);
  if(Math.hypot(...side)<.035)side=cross(tangent,[0,1,0]);
  side=norm(side);
  const a=add(from,side,width),b=add(from,side,-width),c=add(to,side,width),d=add(to,side,-width);
  const push=(v,l)=>target.push(v[0],v[1],v[2],l,id);
  push(a,fade);push(b,fade);push(c,fade);push(c,fade);push(b,fade);push(d,fade);
 };
 const draw=(points,id,strength)=>{
  for(let j=1;j<points.length;j++){
   if(nature===4&&j%4===0)continue;
   const fade=strength*(.3+.7*Math.sin(Math.PI*j/(points.length+1)));
   const thickness=clamp(p.thickness??.65,.08,3);
   const width=[.8,1.3,.55,2,.48,1.7,.65,1.15][Math.max(0,nature)]||1;
   emit(glow,points[j-1],points[j],.017*thickness*width,fade*.32,id);
   emit(filaments,points[j-1],points[j],.0037*thickness*width,fade,id);
  }
 };
 for(let i=0;i<count;i++){
  const id=i+seed*.12,phase=rnd(id*7.1);
  const D=direction(i,count,p.depthSpread??1,seed);
  const aux=Math.abs(D[2])>.88?[0,1,0]:[0,0,1];
  const U=norm(cross(D,aux)),V=norm(cross(D,U));
  const tip=.18+.82*((tm*.22+phase)%1);
  const extent=clamp((.67*amplitude*length)*tip,.015,.93);
  const points=[];
  for(let j=0;j<=quality;j++){
   const q=j/quality,r=.055+extent*q,w=spread*(.018+.035*q);
   let u=0,v=0;
   if(shape===1){const a=q*TAU*(1.5+twist)+tm*.75;u=Math.cos(a)*w*2.4;v=Math.sin(a)*w*2.4;}
   if(shape===2){u=Math.sin(q*37.+id*5.)*w*.6;v=Math.cos(q*27.+id*9.)*w*.5;}
   if(shape===3){u=Math.sin(q*TAU*(1.+twist)+tm*2.)*w*2.2;v=Math.cos(q*TAU*1.3+id)*w*.7;}
   if(shape===4){u=Math.sin(q*TAU*.9+tm*1.8)*w*.9;v=Math.sin(q*TAU*1.7)*w*.75;}
   if(shape===5){const a=q*TAU*(.6+twist)+tm*.75;u=Math.cos(a)*(.11+q*.15)*spread;v=Math.sin(a)*(.11+q*.15)*spread;}
   const micro=Math.sin(q*(28.+seed*.01)+id*11.+tm*(2.+flicker*4));
   const rough=(nature===0||nature===6)?1.5:nature===1?.25:.6;
   u+=micro*w*turbulence*rough+chaos*rnd(j*11.+id)*w;
   v+=Math.sin(q*41.+id*4.-tm*4.)*w*turbulence*rough;
   points.push(add(add(D.map(x=>x*r),U,u),V,v));
  }
  draw(points,id,1);
  endpoints.push(points[points.length-1]);
  if((shape===2||nature===0)&&branch>.03){
   const forks=branch>.65?2:1,segments=Math.max(5,Math.round(quality*.27));
   for(let k=0;k<forks;k++){
    const pivot=Math.round(quality*(.32+k*.18)),start=points[pivot],arm=[];
    const drift=norm(add(add(D,U,(k===0?1:-1)*(.35+branch*.6)),V,.35));
    for(let j=0;j<=segments;j++)arm.push(add(start,drift,j/segments*extent*(.16+branch*.21)));
    draw(arm,id+.3+k*.17,.62);
   }
  }
 }
 return {glow:new Float32Array(glow),filaments:new Float32Array(filaments),directions:Array.from({length:count},(_,i)=>direction(i,count,p.depthSpread??1,seed)),endpoints,quality,nature:natures[Math.max(0,nature)]};
};
window.SynestraPulseGeometry=Object.freeze({build,direction,types,natures});
})();
