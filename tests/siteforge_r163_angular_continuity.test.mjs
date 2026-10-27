import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const src=readFileSync(new URL('../assets/siteforge-r116-sphere-only.js',import.meta.url),'utf8');
const fragment=src.slice(src.indexOf('const fragment='),src.indexOf('function compile('));
const material=fragment.slice(fragment.indexOf('if(uFlow.x<.5){'),fragment.indexOf('}else if(uFlow.x<1.5){'));

function shaderCurrent(angle,{x=-.49,z=.17,t=1.3,broad=.51,ribbonWidth=1}={}){
 const q={x,y:x*Math.tan(angle>0?angle-Math.PI:angle+Math.PI),z};
 const planar=Math.hypot(q.x,q.y)/.64;
 let statements='';
 for(const name of ['wander','depthTwist','basePhase','organicLane','localPhase','primaryVein','tributary','hairline','wisp','pulse','breakup']){
   const found=material.match(new RegExp('float '+name+'\\s*=([\\s\\S]*?);'));
   if(found)statements+='const '+name+'=('+found[1]+');\n';
 }
 const cur=material.match(/flowCurrents\s*=([\s\S]*?);/);
 assert.ok(cur,'missing flow currents');
 statements+='return ('+cur[1]+');';
 const functions='const sin=Math.sin,cos=Math.cos,log=Math.log,pow=Math.pow,max=Math.max; const smoothstep=(a,b,v)=>{const t=Math.max(0,Math.min(1,(v-a)/(b-a)));return t*t*(3-2*t)};\n';
 const fn=new Function('angle','q','planar','broad','t','ribbonWidth',functions+statements);
 return fn(angle,q,planar,broad,t,ribbonWidth);
}

test('R163: organic volumetric currents are continuous at the negative X angular branch cut',()=>{
 for(const z of [-.42,-.16,0,.17,.39]){
  for(const t of [.4,1.3,3.7]){
   const p={z,t};
   const upper=shaderCurrent(Math.PI-0.00001,p);
   const lower=shaderCurrent(-Math.PI+0.00001,p);
   assert.ok(Number.isFinite(upper)&&Number.isFinite(lower),'nonfinite volume current');
   assert.ok(Math.abs(upper-lower)<.012,`angle seam at z=${z}, t=${t}: ${upper} vs ${lower}`);
  }
 }
});

test('R163: angle harmonics are integer-periodic; detail remains depth-dependent',()=>{
 assert.match(material,/float organicLane=angle\*6\.\+basePhase/);
 assert.match(material,/float tributary=pow\(max\(0\.,\.5\+\.5\*cos\(angle\*9\.\+/);
 assert.match(material,/float hairline=pow\(max\(0\.,\.5\+\.5\*cos\(angle\*19\.\+/);
 assert.match(material,/float wisp=pow\(max\(0\.,\.5\+\.5\*cos\(angle\*3\.\+/);
 assert.doesNotMatch(material,/angle\*2\.3|angle\*\(6\.4/);
 assert.match(material,/q\.z/);
});

test('R163: no alteration to other 3D material families or the legacy JSON',()=>{
 for(const family of ['}else if(uFlow.x<1.5){','}else if(uFlow.x<2.5){','}else if(uFlow.x<3.5){'])assert.ok(fragment.includes(family));
 assert.equal((src.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.ok(src.includes("schema:'synestra.siteforge.plasma-settings.v1'"));
});
