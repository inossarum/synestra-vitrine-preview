"""R188.7: spatial nucleus fields sampled within the existing ray integrators."""
from pathlib import Path
from hashlib import sha256
import base64,re
root=Path(__file__).resolve().parent.parent
source=root/'siteforge-r1886-autonome.html'
b=source.read_bytes().replace(b'\r\n',b'\n')
assert sha256(b).hexdigest()=='4460f80f51f76389ef5c24d4131f74c96a693b2b52cc34db87e02e1433ff7cd3','BASE_SHA_MISMATCH'
s=b.decode('utf8')
def one(old,new):
 global s
 assert s.count(old)==1,(old[:80],s.count(old))
 s=s.replace(old,new,1)
one('LAB R188.6</span>','LAB R188.7</span>')
one('SiteForge — Laboratoire énergétique 3D R188.6','SiteForge — Laboratoire énergétique 3D R188.7')
one('Trois variantes animées transforment son propre volume en flux','Trois variantes animées en volume 3D transforment son propre noyau en flux')
field="""
float nucleusFlow3D(vec3 x){
 // True object-space field: the same XYZ sample rotates with the 3D sphere.
 float r=length(x),t=uLabTime*uCoreForm.y,phi=atan(x.z,x.x);
 if(r>1.8)return 0.;
 float envelope=1.-smoothstep(.65,1.55,r);
 if(uCoreForm.x<1.5){
  float axis=length(x.xz);
  float lane=exp(-pow((axis-.48)*5.0,2.))*exp(-x.y*x.y*1.7);
  return lane*pow(.5+.5*cos(phi*3.+x.y*9.0-t*2.2),5.)*envelope;
 }
 if(uCoreForm.x<2.5){
  float ribbon=exp(-pow((length(x.xy)-(.44+.06*sin(x.z*10.+t)))*8.,2.));
  float braid=pow(.5+.5*cos(phi*5.0+x.z*12.-t*2.5),7.);
  return ribbon*braid*envelope;
 }
 return pow(.5+.5*cos(r*18.0-t*3.0+
          sin(phi*4.+x.y*4.+t)*.65),7.)*envelope;
}
"""
one('float hash3(vec3 v){',field+'float hash3(vec3 v){')
one('float Aneon=0.;\n   for(int i=0;i<40;i++){','float Aneon=0.;\n   vec3 coreVolume=vec3(0.);float coreDepth=0.;\n   for(int i=0;i<40;i++){')
one('float front=.29+.80*smoothstep(-.80,.83,q.z);',
'''if(uCoreForm.x>.5&&uShape.z>.01&&uShape.w>.01){
       float v=nucleusFlow3D(q/max(uShape.z*.19,.018));
       float depthWeight=dzNeon*9.0;
       coreVolume+=mix(uEnergyA,uEnergyB,.5+.5*sin(q.x*6.+q.z*3.))*v*depthWeight;
       coreDepth+=v*depthWeight*.14;
     }
     float front=.29+.80*smoothstep(-.80,.83,q.z);''')
one('float coreCurrent=nucleusFlow(p,cr);','float coreCurrent=uCoreForm.x<.5?nucleusFlow(p,cr):0.;')
one('centralWhite*=mix(1.,.41,flowing);','centralWhite*=mix(1.,.22,flowing);')
one('Lneon+=centralWhite*(centralOrb*.95+centralHot*1.44)*centralGlow',
    'Lneon+=coreVolume*centralGlow*2.6;\n   Lneon+=centralWhite*(centralOrb*.95+centralHot*1.44)*centralGlow')
one('centralHalo*.22+coreCurrent*.5','centralHalo*.22+coreCurrent*.5+coreDepth')
one('vec3 accum=vec3(0.);\n  float trans=1.;',
    'vec3 accum=vec3(0.);\n  vec3 nucleusVolume=vec3(0.);float nucleusDepth=0.;\n  float trans=1.;')
one('float coreHalo=exp(-dot(undisturbedQ,undisturbedQ)/(nucleusRadius*nucleusRadius)*.18);',
'''float coreHalo=exp(-dot(undisturbedQ,undisturbedQ)/(nucleusRadius*nucleusRadius)*.18);
    if(uCoreForm.x>.5&&uShape.z>.01&&uShape.w>.01){
     float v=nucleusFlow3D(q/max(nucleusRadius*1.8,.018));
     nucleusVolume+=mix(uEnergyA,uEnergyB,.5+.5*sin(q.x*9.+q.z*5.))*v*stride*7.;
     nucleusDepth+=v*stride*.9;
    }
    float projectedCore=(uCoreForm.x<.5?1.:.11);
    core*=projectedCore;coreHalo*=projectedCore;''')
one('float current=nucleusFlow(p,nr);','float current=uCoreForm.x<.5?nucleusFlow(p,nr):0.;')
one("vec3 result=accum*2.05+coreLight;","vec3 result=accum*2.05+coreLight+nucleusVolume*corePower*2.4;")
one('heart*.88+bloom*.30+current*.5','heart*.88+bloom*.30+current*.5+nucleusDepth')
m=re.search(r'(?s)<script>(.*?)</script>',s);assert m
c=re.search(r"script-src 'sha256-[^']+'",s);assert c
s=s.replace(c.group(0),"script-src 'sha256-"+base64.b64encode(sha256(m.group(1).encode()).digest()).decode()+"'",1)
target=root/'siteforge-r1887-autonome.html';target.write_bytes(s.encode('utf8'))
print('R1887_BUILD_PASS',sha256(target.read_bytes()).hexdigest())
