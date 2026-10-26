/* SiteForge R128 — actual meshed orb shaders; derived from the R121 electric look.
 * Isolated lab asset. Local WebGL1, finite procedural 3D noise, no network.
 */
(()=>{
'use strict';
const vertex=`attribute vec3 aPosition;
uniform mat3 uView;
uniform vec2 uResolution;
uniform float uRadius;
varying vec3 vNormal,vWorld;
void main(){
 vec3 p=uView*(aPosition*uRadius);
 vNormal=normalize(uView*aPosition);vWorld=p;
 gl_Position=vec4(p.x/(uResolution.x/max(uResolution.y,1.)),p.y-.08,-p.z/1.45,1.);
}`;
const fragment=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec3 vNormal,vWorld;
uniform vec3 uPrimary,uSecondary,uGlowColor;
uniform float uTime,uSpeed,uDensity,uIntensity,uTurbulence,uExposure;
float hash3(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
float noise3(vec3 x){
 vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),
                mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
            mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),
                mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);
}
void main(){
 vec3 n=normalize(vNormal);
 float tm=uTime*uSpeed*.28;
 float v=noise3(n*3.7+vec3(tm*.65,tm*.22,-tm*.25));
 float v2=noise3(n*7.5+vec3(tm*.3,-tm*.6,tm*.47));
 float angle=atan(n.y,n.x);
 float filament=sin(angle*5.+n.z*9.5+v*5.-tm*2.);
 float currents=pow(max(0.,filament*.5+.5),7.);
 float secondary=pow(max(0.,sin(angle*8.-n.z*11.+v2*4.+tm)*.5+.5),12.);
 float light=max(dot(n,normalize(vec3(-.45,.58,1.))),0.);
 float rim=pow(1.-max(n.z,0.),2.2);
 float soft=clamp(.18+v*.63+light*.55,0.,1.);
 vec3 cyan=mix(vec3(.31,.87,1.),uPrimary,.24);
 vec3 lavender=mix(vec3(.64,.47,1.),uSecondary,.24);
 vec3 base=mix(vec3(.009,.034,.108),vec3(.035,.17,.39),soft);
 base=mix(base,vec3(.12,.09,.30),smoothstep(.52,.88,v)*.17);
 base+=cyan*currents*(.045+.19*light)*uDensity;
 base+=lavender*secondary*(.035+.10*v)*uDensity;
 base+=cyan*rim*.54;
 float spec=pow(max(dot(reflect(normalize(vec3(.53,-.71,-1.)),n),vec3(0.,0.,1.)),0.),24.);
 base+=vec3(.88,.96,1.)*spec*.29;
 base+=vec3(.70,.83,.95)*pow(max(dot(n,normalize(vec3(-.28,.46,1.))),0.),22.)*.11;
 base+=vec3(.09,.22,.35)*smoothstep(-.2,.8,n.y)*rim;
 float centre=exp(-dot(vWorld.xy,vWorld.xy)*115.);
 base+=uGlowColor*centre*uIntensity*.30;
 float t3=sin(n.x*19.+n.y*17.-tm*3.)*sin(n.z*22.+tm*2.);
 base+=cyan*max(t3,0.)*uTurbulence*.025;
 gl_FragColor=vec4(clamp(base*uExposure,0.,1.),.97);
}`;
const halo=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform vec2 uResolution;
uniform vec3 uPrimaryColor,uSecondaryColor,uPulseColor,uGlowColor;
uniform float uTime,uEnergyType,uPulseType,uPulseCount,uEnergySpeed,uAmplitude,uThickness,uTurbulence,uChaos,uGlow,uDensity,uCoreIntensity,uCoreRadius;
void main(){
 vec2 p=vec2(vUv.x*uResolution.x/max(uResolution.y,1.),vUv.y+.08);
 float r=length(p),R=.69*clamp(uCoreRadius,.55,1.18);
 float haze=exp(-pow(r/(R*1.19),2.)*3.1)*uGlow*.17;
 float outer=exp(-pow((r-R)/max(R*.23,.06),2.))*.055*uGlow;
 gl_FragColor=vec4(mix(uPrimaryColor,uGlowColor,.73),min(.35,(haze+outer)*.62));
}`;
window.SynestraSphere3DShaders=Object.freeze({vertex,fragment,halo});
})();
