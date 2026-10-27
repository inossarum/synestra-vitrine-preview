import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const load=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const js=load('assets/siteforge-r116-sphere-only.js');
const html=load('siteforge/core-3d-lab/index.html');
const rangeDefaults={diameter:100,opacity:100,diffusion:65,thickness:45,shellVisibility:100,rotation:100,agitation:100,details:100,shine:100,contrast:100,
 luminance:100,coreSize:100,coreLight:100,rimLight:100,
 surfaceGlow:100,surfaceEmission:100,surfaceFlow:100,surfaceSpeed:100,surfaceDirection:0,
 reliefIntensity:65,reliefScale:90,reliefRoughness:80,reliefContrast:100,reliefDeform:15,reliefSpeed:100};
const selectors=['energyMode','surfaceMotion','reliefMode'];
const colors=['primary','secondary','core','rim'];
const defaults={...rangeDefaults,energyMode:0,surfaceMotion:0,reliefMode:0,
 primary:'#092b63',secondary:'#1f174d',core:'#b8edff',rim:'#4fddff'};
const keys=Object.keys(defaults);

test('R143: labelled native controls and preserved single sticky WebGL scene',()=>{
 const found=[...html.matchAll(/data-sphere-control="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(found.length,32);
 assert.deepEqual(found.sort(),keys.sort());
 for(const key of keys)assert.match(html,new RegExp('for="sf-'+key+'"'));
 assert.equal((html.match(/type="range"/g)||[]).length,25);
 assert.equal((html.match(/type="color"/g)||[]).length,4);
 assert.equal((html.match(/<select /g)||[]).length,3);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<script src=/g)||[]).length,1);
 assert.match(html,/\.core-r108-stage\{position:sticky;top:env\(safe-area-inset-top,0px\)/);
});

function fixture(noWebGL=false){
 const events={},queue=[],uniforms=new Map(),arrays=new Map(),styles={};
 const controls=Object.fromEntries(Object.entries(defaults).map(([key,val])=>{
  const value=String(val),type=selectors.includes(key)?'select-one':colors.includes(key)?'color':'range';
  return [key,{value,defaultValue:value,type,dataset:{sphereControl:key},
    getAttribute:name=>name==='data-default'?selectors.includes(key)?value:null:null,
    hasAttribute:name=>name==='data-sphere-control',selectedOptions:[{textContent:value}]}];
 }));
 const outputs=Object.fromEntries(keys.map(key=>[key,{textContent:''}]));
 const status={textContent:''};
 const gl={
  VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,COMPILE_STATUS:35713,LINK_STATUS:35714,
  ARRAY_BUFFER:34962,STATIC_DRAW:35044,FLOAT:5126,TRIANGLES:4,COLOR_BUFFER_BIT:16384,
  createShader:()=>({}),shaderSource(){},compileShader(){},getShaderParameter:()=>true,deleteShader(){},
  createProgram:()=>({}),attachShader(){},linkProgram(){},getProgramParameter:()=>true,useProgram(){},
  createBuffer:()=>({}),bindBuffer(){},bufferData(){},getAttribLocation:()=>0,
  enableVertexAttribArray(){},vertexAttribPointer(){},getUniformLocation:(_,key)=>key,
  uniform1f:(name,val)=>uniforms.set(name,val),uniform2f(){},
  uniform3fv:(name,values)=>arrays.set(name,Array.from(values)),
  uniform4fv:(name,values)=>arrays.set(name,Array.from(values)),
  viewport(){},clearColor(){},clear(){},drawArrays(){}
 };
 const canvas={clientWidth:420,clientHeight:260,width:960,height:570,getContext:()=>noWebGL?null:gl,addEventListener(){}};
 const scene={
  querySelector:query=>query==='.core-r109-canvas'?canvas:{querySelector:()=>({setAttribute(){}})},
  style:{setProperty:(k,v)=>styles[k]=v},
  addEventListener(){},hasAttribute:()=>false,setAttribute(){},removeAttribute(){}
 };
 const document={
  visibilityState:'visible',addEventListener(){},
  querySelectorAll:query=>query==='[data-sphere-control]'?Object.values(controls):[],
  querySelector:query=>query==='.core-r108-stage'?scene:query==='.lab-controls'?{addEventListener:(k,fn)=>events[k]=fn}
    :query==='[data-render-status]'?status:outputs[query.match(/data-sphere-value="([^"]+)"/)?.[1]]||null
 };
 const window={innerWidth:390,devicePixelRatio:2,matchMedia:()=>({matches:false,addEventListener(){}})};
 const IO=class{constructor(fn){this.fn=fn}observe(){this.fn([{isIntersecting:true}])}disconnect(){}};
 const RO=class{observe(){}disconnect(){}};
 runInNewContext(js,{document,window,Float32Array,IntersectionObserver:IO,ResizeObserver:RO,
  requestAnimationFrame:fn=>{queue.push(fn);return queue.length},cancelAnimationFrame:()=>{}});
 return {controls,events,uniforms,arrays,styles,status,canvas,
  frame:time=>{const fn=queue.shift();assert.equal(typeof fn,'function');fn(time)}};
}

test('R143: four packed GPU vectors map surface/core/relief controls independently',()=>{
 const x=fixture();x.frame(40);
 assert.equal(x.arrays.get('surfaceSettings')[0],0);
 assert.equal(x.arrays.get('flowSettings')[3],1);
 assert.ok(Math.abs(x.arrays.get('reliefSettings')[1]-.65)<.00001);
 const steps=[
  ['energyMode','5','surfaceSettings',0,5],
  ['surfaceMotion','3','surfaceSettings',1,3],
  ['surfaceEmission','200','surfaceSettings',3,2],
  ['surfaceFlow','30','flowSettings',0,.3],
  ['surfaceDirection','180','flowSettings',2,180],
  ['coreSize','170','flowSettings',3,1.7],
  ['reliefMode','4','reliefSettings',0,4],
  ['reliefIntensity','180','reliefSettings',1,1.8],
  ['reliefScale','20','reliefSettings',2,.2],
  ['reliefRoughness','140','reliefSettings',3,1.4],
  ['reliefContrast','80','reliefDynamics',0,.8],
  ['reliefDeform','50','reliefDynamics',1,.5],
  ['reliefSpeed','170','reliefDynamics',2,1.7]
 ];
 let clock=40;
 for(const [name,value,group,index,expected] of steps){
  x.controls[name].value=value;
  x.events.input({target:x.controls[name]});
  x.frame(clock+=45);
  assert.ok(Math.abs(x.arrays.get(group)[index]-expected)<.00001,name);
 }
 assert.equal(x.uniforms.get('sphereAlpha'),1);
 x.events.reset({preventDefault(){}});x.frame(clock+45);
 assert.equal(x.arrays.get('surfaceSettings')[0],0);
 assert.equal(x.arrays.get('flowSettings')[3],1);
 assert.ok(Math.abs(x.arrays.get('reliefSettings')[1]-.65)<.00001);
 assert.ok(Math.abs(x.arrays.get('reliefDynamics')[1]-.15)<.00001);
});

test('R143: coherent calm baseline and six energy families; relief changes shading and silhouette gently',()=>{
 for(const signature of [
  'float calmFlow=.14;',
  'float drift=time*.28*(calmFlow+.86*agitation)*flowSettings.y;',
  'vec3 warp=(.035+agitation*.155)*vec3(',
  'float turbulenceGlow=(.10+.90*agitation)*(',
  'float curlGlow=(.16+.84*agitation)*(',
  'vec3 bumpNormal=normalize(geomN+vec3(reliefGrad*reliefTangentAmplitude,0.));',
  'float silhouetteRadius=radius+reliefDynamics.y*.006*(',
  'float coreSize=max(flowSettings.w,.003);',
  'float centralSource=exp(-d*d*115./(coreSize*coreSize));',
  'float alpha=sphereAlpha*shellFade*mix(circulatingEnergyAlpha,1.,clamp(shellVisibilityRatio,0.,1.));'
 ])assert.ok(js.includes(signature),signature);
 for(const mode of ['surfaceSettings.x>.5','surfaceSettings.x>1.5','surfaceSettings.x>2.5','surfaceSettings.x>3.5','surfaceSettings.x>4.5'])
  assert.ok(js.includes(mode),mode);
 const fragment=js.slice(js.indexOf('void main(){'),js.indexOf('  const shader = (type, code)'));
 assert.equal((fragment.match(/=r111Arc\(p,/g)||[]).length,8);
 assert.ok(fragment.includes('vec3 geomN=vec3(p,'));
 assert.ok(fragment.includes('float light=.32+.68*smoothstep(-.90,.95,dot(geomN,'));
 assert.doesNotMatch(fragment,/wallMask|innerRadius|innerShadow/);
 assert.match(js,/new ResizeObserver\(\(\)=>scheduleDraw\(\)\)/);
});

test('R143: no WebGL keeps an accessible fallback and never declares GPU ready',()=>{
 const x=fixture(true);
 assert.match(x.status.textContent,/WebGL indisponible/);
 assert.equal(x.uniforms.size,0);
});

test('R143: baseline R142 shader remains local and uses one context with bounded GPU resolution',()=>{
 assert.match(js,/canvas\.clientWidth, logicalHeight = canvas\.clientHeight/);
 assert.match(js,/1900000/);
 assert.match(js,/webglcontextlost/);
 assert.ok(js.includes('float cloudDensity=clamp(v*.52+v2*.31+eddyA*.17,0.,1.);'));
 assert.ok(js.includes('float microThreads=pow(max(.5+.5*sin(filamentPhase),0.),13.);'));
 assert.doesNotMatch(js,/fetch\(|WebSocket|localStorage|sessionStorage|document\.cookie/);
});
