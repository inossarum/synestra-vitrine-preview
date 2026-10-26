/* SiteForge R129 — actual meshed orb shaders; derived from the R121 electric look.
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
const fragment="#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec3 vNormal,vWorld;\nuniform vec3 uPrimary,uSecondary,uGlowColor;\nuniform float uTime,uSpeed,uDensity,uIntensity,uTurbulence,uExposure,uInner;\nfloat sat(float x){return clamp(x,0.,1.);}\nfloat hash3(vec3 p){\n p=fract(p*.1031);p+=dot(p,p.yzx+33.33);\n return fract((p.x+p.y)*p.z);\n}\nfloat noise3(vec3 x){\n vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);\n return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),\n                mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),\n            mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),\n                mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);\n}\nvoid main(){\n vec3 n=normalize(vNormal);\n float tm=uTime*uSpeed;\n if(uInner>.5){\n  // A second physically meshed luminous sphere, not a flat sprite.\n  float pulse=.85+.15*sin(tm*4.5);\n  float micro=noise3(n*9.+vec3(tm*.42,-tm*.31,tm*.27));\n  float fres=pow(1.-sat(n.z),1.8);\n  vec3 light=uGlowColor*(2.0+uIntensity*1.3)*pulse\n    +mix(uPrimary,uSecondary,micro)*(.38+.7*fres);\n  light=mix(light,vec3(1.),.48);\n  gl_FragColor=vec4(min(light,vec3(1.)),.94);\n  return;\n }\n // R121 identity: electric-blue/violet 3D storm, with refractive-looking wisps.\n float f1=noise3(n*3.9+vec3(tm*.17,tm*.06,-tm*.14));\n float f2=noise3(n*8.2+vec3(-tm*.26,tm*.22,tm*.11));\n vec3 warp=n+vec3((f1-.5)*.24,(f2-.5)*.20,(f1-f2)*.19)*uTurbulence;\n float f3=noise3(warp*13.4+vec3(tm*.24,-tm*.29,tm*.08));\n float wave=sin(atan(warp.y,warp.x)*8.+warp.z*19.+f1*7.-tm*.8);\n float wave2=sin(warp.x*23.-warp.y*17.+f2*8.+tm*1.1);\n float vein=pow(sat(.5+.5*wave),9.);\n float filaments=pow(sat(.5+.5*wave2),14.);\n float plasma=sat(.30+.48*f1+.16*f2);\n float storm=sat(vein*.64+filaments*.47+f3*.23);\n float nv=sat(n.z);\n float rim=pow(1.-nv,2.55);\n float fresnel=pow(1.-nv,5.);\n vec3 deep=vec3(.004,.012,.047);\n vec3 mid=mix(vec3(.025,.071,.20),vec3(.037,.14,.33),plasma);\n vec3 cyan=mix(vec3(.19,.78,1.),uPrimary,.36);\n vec3 violet=mix(vec3(.56,.28,1.),uSecondary,.46);\n vec3 base=mix(deep,mid,.62+.25*plasma);\n // Layered 3D current sheets: bright cyan, thin violet, turbulent blue fog.\n base+=cyan*(vein*(.17+.21*f1)+filaments*.085)*uDensity;\n base+=violet*(filaments*.13+f3*.055)*uDensity;\n base+=cyan*storm*.10;\n float wisp=pow(sat(.5+.5*sin(n.x*14.+n.y*17.+f3*8.-tm*.42)),7.);\n base+=mix(cyan,violet,f2)*wisp*.13*uDensity;\n // Hard luminous glass rim, with controlled bloom in the separate halo pass.\n float thin=pow(1.-nv,13.);\n base+=cyan*(rim*.41+thin*1.25);\n base+=vec3(.75,.91,1.)*fresnel*.85;\n float spec=pow(sat(dot(reflect(normalize(vec3(.47,-.65,-1.)),n),vec3(0.,0.,1.))),44.);\n base+=vec3(.78,.91,1.)*spec*.30;\n float centreGlow=exp(-dot(vWorld.xy,vWorld.xy)*24.);\n base+=uGlowColor*centreGlow*.095*uIntensity;\n vec3 mapped=vec3(1.)-exp(-max(base,vec3(0.))*uExposure*1.18);\n float alpha=clamp(.30+.12*plasma+.43*rim+.20*thin,.24,.94);\n gl_FragColor=vec4(mapped,alpha);\n}";
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
