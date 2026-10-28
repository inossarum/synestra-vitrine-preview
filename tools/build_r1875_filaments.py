"""R187.5 zero pipe cross-sections: retain 5 luminous magnetic path centerlines only."""
from pathlib import Path
from hashlib import sha256
import re,base64

root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1874-autonome.html"
dst=root/"siteforge-r1875-autonome.html"
raw=src.read_bytes()
expected="58cfbd4aa4dd9bc5c7240502f2acee206b0988885b32312c839dfea12f9551fa"
assert sha256(raw.replace(b"\r\n",b"\n")).hexdigest()==expected,"SOURCE_SHA_NOT_PINNED"
source=raw.decode("utf-8").replace("\r\n","\n")
head="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
tail=" if(uPass>3.5&&uPass<4.5){"
assert source.count(head)==1
a,b=source.index(head),source.index(tail,source.index(head)+len(head))
old=source[a:b]
new="""  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){
   // R187.5: -100% geometric pipe section. Five moving zero-radius paths.
   // Nonzero Gaussian footprint is an optical anti-alias/emission halo, NOT tube geometry.
   float flowTime=uLabTime;
   float radiusNeon=.98*clamp(uShape.x,.5,1.5);
   float srNeon=length(p);
   vec3 cyanNeon=mix(uCyan,vec3(.035,.94,1.),.83);
   vec3 pinkNeon=mix(uViolet,vec3(1.,.07,.82),.86);
   if(srNeon>=radiusNeon){gl_FragColor=vec4(0.);return;}
   float halfNeon=sqrt(max(0.,radiusNeon*radiusNeon-dot(p,p)));
   // Sampling density keeps fine filaments continuous, not dotted by ray-step aliasing.
   float stepsNeon=max(34.,uVolumeSteps);
   float dzNeon=2.*halfNeon/stepsNeon;
   float syNeon=sin(uTilt.x*1.5),cyNeon=cos(uTilt.x*1.5);
   float sxNeon=sin(uTilt.y*1.5),cxNeon=cos(uTilt.y*1.5);
   float caNeon=cos(uSpinPhase),saNeon=sin(uSpinPhase);
   float widthNeon=clamp(uFlow.y,.55,1.75);
   vec3 Lneon=vec3(0.);
   float Aneon=0.;
   for(int i=0;i<40;i++){
    if(float(i)>=stepsNeon)break;
    float zNeon=halfNeon-(float(i)+.5)*dzNeon;
    vec3 q=vec3(p,zNeon)/radiusNeon;
    q=vec3(q.x*cyNeon+q.z*syNeon,
           q.y*cxNeon-(q.z*cyNeon-q.x*syNeon)*sxNeon,
           q.y*sxNeon+(q.z*cyNeon-q.x*syNeon)*cxNeon);
    q.xy=mat2(caNeon,-saNeon,saNeon,caNeon)*q.xy;
    vec2 wp=q.xy-uPointer.xy/radiusNeon;
    q.xy+=wp*uPointer.z*.11*(1.-smoothstep(.12,.70,length(wp)));
    float front=.31+.77*smoothstep(-.83,.83,q.z);
    float border=1.-smoothstep(.89,1.02,length(q));

    vec3 a=vec3(q.x,q.y*.83-q.z*.56,q.y*.56+q.z*.83);
    float ta=atan(a.y,a.x),ra=length(a.xy);
    float ca=.52+.026*sin(ta*5.-flowTime*1.20);
    float dA=length(vec2(ra-ca,a.z+.029*sin(ta*4.+flowTime*.89)));

    vec3 b=vec3(q.z*.70+q.x*.71,q.y,q.z*.71-q.x*.70);
    float tb=atan(b.z,b.y),rb=length(b.yz);
    float cb=.51+.029*cos(tb*6.+flowTime*1.06);
    float dB=length(vec2(rb-cb,b.x+.031*cos(tb*5.-flowTime*.98)));

    vec3 c=vec3(q.x*.86-q.y*.51,q.x*.51+q.y*.86,q.z);
    float tc=atan(c.z,c.x),rc=length(c.xz);
    float cc=.49+.022*sin(tc*7.-flowTime*.93);
    float dC=length(vec2(rc-cc,c.y+.025*sin(tc*5.+flowTime*1.1)));

    vec3 d=vec3(q.y*.76+q.z*.65,q.x,q.z*.76-q.y*.65);
    float td=atan(d.y,d.x),rd=length(d.xy);
    float cd=.57+.020*sin(td*7.+flowTime*1.08);
    float dD=length(vec2(rd-cd,d.z+.022*cos(td*5.-flowTime*.92)));

    vec3 e=vec3(q.x*.62+q.y*.78,q.z,q.x*.78-q.y*.62);
    float te=atan(e.z,e.x),re=length(e.xz);
    float ce=.55+.021*cos(te*6.-flowTime*.99);
    float dE=length(vec2(re-ce,e.y+.024*sin(te*4.+flowTime*.85)));

    // Every peak is on distance=0: no radius / no pipe section / no opaque wall.
    float aCore=exp(-pow(dA*46./widthNeon,2.));
    float bCore=exp(-pow(dB*46./widthNeon,2.));
    float cCore=exp(-pow(dC*48./widthNeon,2.));
    float dCore=exp(-pow(dD*46./widthNeon,2.));
    float eCore=exp(-pow(dE*48./widthNeon,2.));
    float aHalo=exp(-pow(dA*18./widthNeon,2.))*.26;
    float bHalo=exp(-pow(dB*18./widthNeon,2.))*.26;
    float cHalo=exp(-pow(dC*19./widthNeon,2.))*.23;
    float dHalo=exp(-pow(dD*18./widthNeon,2.))*.25;
    float eHalo=exp(-pow(dE*19./widthNeon,2.))*.25;
    // Traveling electrical crests keep each path clearly alive.
    float pa=.58+.42*sin(ta*17.-flowTime*5.3);
    float pb=.58+.42*sin(tb*19.+flowTime*5.0);
    float pc=.59+.41*sin(tc*18.-flowTime*4.7);
    float pd=.60+.40*sin(td*20.+flowTime*5.4);
    float pe=.60+.40*sin(te*21.-flowTime*5.2);
    float lA=(aCore*(.65+pa*1.15)+aHalo)*front*border;
    float lB=(bCore*(.65+pb*1.15)+bHalo)*front*border;
    float lC=(cCore*(.48+pc*1.00)+cHalo)*front*border;
    float lD=(dCore*(.55+pd*1.10)+dHalo)*front*border;
    float lE=(eCore*(.55+pe*1.10)+eHalo)*front*border;
    Lneon+=(cyanNeon*(lA+lD*.83)+pinkNeon*(lB+lE*.83)
            +mix(cyanNeon,pinkNeon,.43)*lC)*dzNeon*28.;
    Aneon+=(aCore+bCore+cCore+dCore+eCore)*front*border*dzNeon*12.0;
   }
   float coreNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*43.);
   float haloNeon=exp(-dot(p,p)/(radiusNeon*radiusNeon)*7.2);
   Lneon+=uCore*coreNeon*.18+(cyanNeon*.09+pinkNeon*.07)*haloNeon;
   vec3 outNeon=vec3(1.)-exp(-max(Lneon,vec3(0.))*1.32);
   float alphaNeon=clamp(.010+Aneon*.95+coreNeon*.40+haloNeon*.055,0.,1.);
   float edgeNeon=1.-smoothstep(.89,1.,srNeon/radiusNeon);
   gl_FragColor=vec4(outNeon,alphaNeon*edgeNeon*uEffects.w);
   return;
  }
"""
out=source[:a]+new+source[b:]
assert out.replace(new,old,1)==source
for before,after in [
("<title>SiteForge — Laboratoire énergétique 3D R187.4</title>","<title>SiteForge — Laboratoire énergétique 3D R187.5</title>"),
("Cinq flux fins · R187.4","Filaments sans tubes · R187.5"),
("LAB R187.4","LAB R187.5")
]:
 assert out.count(before)==1,(before,out.count(before))
 out=out.replace(before,after,1)
script=re.search(r"(?s)<script>(.*?)</script>",out)
assert script and out.count("<script>")==1
digest=base64.b64encode(sha256(script.group(1).encode("utf-8")).digest()).decode("ascii")
oldhash=re.search(r"script-src 'sha256-[^']+'",out)
assert oldhash and "script-src 'unsafe-inline'" not in out
out=out.replace(oldhash.group(0),"script-src 'sha256-"+digest+"'",1)
assert out.count('data-sphere-control=')==source.count('data-sphere-control=')
assert out.count('data-mote-control=')==source.count('data-mote-control=')
dst.write_bytes(out.encode("utf-8"))
print("R1875_ZERO_PIPE_SECTION_BUILD_PASS",sha256(dst.read_bytes()).hexdigest(),"CSP",digest)
