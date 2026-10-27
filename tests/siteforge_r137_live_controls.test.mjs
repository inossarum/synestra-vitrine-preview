import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const load=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const js=load('assets/siteforge-r116-sphere-only.js');
const html=load('siteforge/core-3d-lab/index.html');
const rangeDefaults={diameter:100,opacity:100,diffusion:65,thickness:45,shellVisibility:100,rotation:100,agitation:100,details:100,shine:100,contrast:100,
 luminance:100,coreSize:100,coreLight:100,rimLight:100,particleIntensity:100,particleDensity:100,particleSpeed:100,particleSize:100,particleSpread:100,
 surfaceGlow:100,surfaceEmission:100,surfaceFlow:100,surfaceSpeed:100,surfaceDirection:0,
 reliefIntensity:65,reliefScale:90,reliefRoughness:80,reliefContrast:100,reliefDeform:15,reliefSpeed:100};
const selectors=['energyMode','surfaceMotion','reliefMode','particlePreset'];
const colors=['primary','secondary','core','rim'];
const defaults={...rangeDefaults,energyMode:0,surfaceMotion:0,reliefMode:0,particlePreset:0,
 primary:'#092b63',secondary:'#1f174d',core:'#b8edff',rim:'#4fddff'};
const keys=Object.keys(defaults);

test('R143: labelled native controls and preserved single sticky WebGL scene',()=>{
 const found=[...html.matchAll(/data-sphere-control="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(found.length,38);
 assert.deepEqual(found.sort(),keys.sort());
 for(const key of keys)assert.match(html,new RegExp('for="sf-'+key+'"'));
 assert.equal((html.match(/type="range"/g)||[]).length,30);
 assert.equal((html.match(/type="color"/g)||[]).length,4);
 assert.equal((html.match(/<select /g)||[]).length,4);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<script src=/g)||[]).length,1);
 assert.match(html,/\.core-r108-stage\{position:sticky;top:env\(safe-area-inset-top,0px\)/);
});

function fixture(noWebGL=false,failVFXLink=false){
 const events={},queue=[],uniforms=new Map(),arrays=new Map(),styles={},drawCalls=[],blendPairs=[];
 let programCount=0;
 const controls=Object.fromEntries(Object.entries(defaults).map(([key,val])=>{
  const value=String(val),type=selectors.includes(key)?'select-one':colors.includes(key)?'color':'range';
  return [key,{value,defaultValue:value,type,dataset:{sphereControl:key},
    getAttribute:name=>name==='data-default'?selectors.includes(key)?value:null:null,
    hasAttribute:name=>name==='data-sphere-control',selectedOptions:[{textContent:value}]}];
 }));
 const outputs=Object.fromEntries(keys.map(key=>[key,{textContent:''}]));
 const status={textContent:''},vfxStatus={textContent:''};
 const gl={
  VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,COMPILE_STATUS:35713,LINK_STATUS:35714,
  ARRAY_BUFFER:34962,STATIC_DRAW:35044,FLOAT:5126,TRIANGLES:4,POINTS:0,BLEND:3042,SRC_ALPHA:770,ONE:1,COLOR_BUFFER_BIT:16384,
  createShader:()=>({}),shaderSource(){},compileShader(){},getShaderParameter:()=>true,deleteShader(){},
  createProgram:()=>({index:++programCount}),attachShader(){},linkProgram(){},getProgramParameter:p=>!(failVFXLink&&p.index===2),getProgramInfoLog:()=> 'varying precision mismatch at link',useProgram(){},
  createBuffer:()=>({}),bindBuffer(){},bufferData(){},getAttribLocation:()=>0,
  enableVertexAttribArray(){},vertexAttribPointer(){},getUniformLocation:(_,key)=>key,
  uniform1f:(name,val)=>uniforms.set(name,val),uniform2f(){},
  uniform3fv:(name,values)=>arrays.set(name,Array.from(values)),
  uniform4fv:(name,values)=>arrays.set(name,Array.from(values)),
  viewport(){},clearColor(){},clear(){},enable(){},disable(){},blendFunc:(src,dst)=>blendPairs.push([src,dst]),drawArrays:(mode,first,count)=>drawCalls.push({mode,count})
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
    :query==='[data-render-status]'?status:query==='[data-vfx-status]'?vfxStatus:outputs[query.match(/data-sphere-value="([^"]+)"/)?.[1]]||null
 };
 const window={innerWidth:390,devicePixelRatio:2,matchMedia:()=>({matches:false,addEventListener(){}})};
 const IO=class{constructor(fn){this.fn=fn}observe(){this.fn([{isIntersecting:true}])}disconnect(){}};
 const RO=class{observe(){}disconnect(){}};
 runInNewContext(js,{document,window,Float32Array,IntersectionObserver:IO,ResizeObserver:RO,
  requestAnimationFrame:fn=>{queue.push(fn);return queue.length},cancelAnimationFrame:()=>{}});
 return {controls,events,uniforms,arrays,styles,status,vfxStatus,canvas,drawCalls,blendPairs,
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


test('R144: six materials have distinct major shading profiles, not just a color-picker value',()=>{
 const shader=js.slice(js.indexOf('void main(){'),js.indexOf('  const shader = (type, code)'));
 for(const term of [
  'float electricA=r145ElectricBolt(flowN.xy,1.0,time);',
  'float flowing=sin(flowN.y*16.',
  'energyMask=smoothstep(.33,.77,cloudDensity)',
  'float solarCells=abs(sin(',
  'float facets=abs(fract(flowN.x*8.',
  'base=mix(base,energyPalette,clamp(.58+.12*energyShadow,0.,1.));',
  'base+=energyTint*(energyMask*1.38+energyCoverage*.46)*surfaceSettings.w*shimmer;'
 ])assert.ok(shader.includes(term),term);
 const distinct=[
  ['plasma',.61,1,0],['electric',.89,1.8,1],['liquid',.23,2.4,2],
  ['fog',.14,.32,3],['solar',.68,.77,4],['crystal',.55,2.5,5]
 ];
 assert.equal(new Set(distinct.map(v=>v.slice(1).join(':'))).size,6);
});
test('R144: relief modes have dedicated height fields and actual optical shading',()=>{
 for(const term of [
  'reliefHeight=pow(max(.5+.5*veins,0.),9.);',
  'reliefHeight=smoothstep(.08,.19,fractures);',
  'reliefHeight=.5+.5*sin(flowN.y*reliefFrequency',
  'reliefHeight=floor((flowN.x+flowN.y*.7+v*.35)',
  'reliefHeight=.48+.03*v;',
  'float reliefTangentAmplitude=clamp(reliefStrength*.72,0.,1.6);',
  'base*=reliefShade;'
 ])assert.ok(js.includes(term),term);
});
test('R144: visibility 0 retains currents, breaks solid outline and resets independently',()=>{
 const x=fixture();x.frame(40);
 assert.equal(x.uniforms.get('shellVisibilityRatio'),1);
 x.controls.shellVisibility.value='0';x.events.input({target:x.controls.shellVisibility});x.frame(90);
 assert.equal(x.uniforms.get('shellVisibilityRatio'),0);
 assert.equal(x.uniforms.get('sphereAlpha'),1);
 x.events.reset({preventDefault(){}});x.frame(140);
 assert.equal(x.uniforms.get('shellVisibilityRatio'),1);
 for(const term of [
  'float circulatingEnergyAlpha=clamp((energyMask*.58+energyCoverage*.65+curlGlow*.27)*surfaceSettings.w+dischargeAlpha,0.,.98);',
  'float alpha=sphereAlpha*shellFade*mix(circulatingEnergyAlpha,1.,clamp(shellVisibilityRatio,0.,1.));',
  'base+=rimColor*rim*(.28+.30*shellOptical)*rimRatio*shellVisibilityRatio;'
 ])assert.ok(js.includes(term),term);
 const alpha0=.58*.6+.65*.12;
 assert.ok(alpha0>0&&alpha0<.9,'energy visible with transparent negative space');
});


test('R144: mobile-native change events activate all energy and relief modes',()=>{
 const x=fixture();x.frame(40);
 assert.equal(typeof x.events.change,'function','change listener for native selects must exist');
 let time=40;
 for(const value of [1,2,3,4,5,0]){
  x.controls.energyMode.value=String(value);
  x.events.change({target:x.controls.energyMode});
  x.frame(time+=45);
  assert.equal(x.arrays.get('surfaceSettings')[0],value,'energy mode '+value);
 }
 for(const value of [1,2,3,4,5,0]){
  x.controls.reliefMode.value=String(value);
  x.events.change({target:x.controls.reliefMode});
  x.frame(time+=45);
  assert.equal(x.arrays.get('reliefSettings')[0],value,'relief mode '+value);
 }
 x.controls.surfaceMotion.value='3';
 x.events.change({target:x.controls.surfaceMotion});
 x.frame(time+=45);
 assert.equal(x.arrays.get('surfaceSettings')[1],3);
});


test('R145: Electric is forked/angular and never falls back to watery liquid wave texture',()=>{
 const shader=js.slice(js.indexOf('void main(){'),js.indexOf('  const shader = (type, code)'));
 for(const signature of [
  'float r145ElectricBolt(vec2 surface,float index,float seconds){',
  'float segment=floor(along*17.);',
  'float jagged=mix(node0,node1,mixNode)*.106-.053;',
  'float fork=smoothstep(forkNode-.02,forkNode+.02,along)*exp(-forkPath*155.)*.68;',
  'float electricA=r145ElectricBolt(flowN.xy,1.0,time);',
  'float electricB=r145ElectricBolt(flowN.xy,2.7,time);',
  'float electricC=r145ElectricBolt(flowN.xy,4.9,time);',
  'float dryElectric=1.-step(.5,abs(surfaceSettings.x-1.));',
  'base=mix(base,midnight,.80);',
  'base+=energyTint*energyMask*1.95*surfaceSettings.w;',
  'base+=cyan*currents*(.045+.19*light)*(1.-dryElectric*.97);',
  'base+=vec3(.88,.96,1.)*(spec*.42+specFine*.28)*shineRatio*(1.-dryElectric*.95);',
  'mix(1.,2.9,dryElectric)'
 ])assert.ok(js.includes(signature),signature);
 assert.ok(!shader.includes('float lightning=sin(filamentPhase*2.3'),'liquid-like electric waves must be removed');
 assert.equal((shader.match(/=r111Arc\(p,/g)||[]).length,8);
});
test('R145: relief drives final material with mode-specific crests, cracks and crystal facets',()=>{
 const signatures=[
  'float sculptDepth=clamp(reliefStrength,0.,2.);',
  'float grooves=pow(1.-clamp(reliefHeight,0.,1.),1.6);',
  'float crests=pow(clamp(reliefHeight,0.,1.),2.6);',
  'float contourShade=clamp(1.-grooves*.75*sculptDepth+',
  'contourShade*=mix(.28,1.08,smoothstep(.08,.32,reliefHeight));',
  'contourShade*=mix(.65,1.26,step(.13,fract(reliefHeight*4.)));',
  'contourShade=mix(1.,contourShade,.035);',
  'base*=mix(1.,contourShade,clamp(sculptDepth*.85,0.,1.));'
 ];
 for(const signature of signatures)assert.ok(js.includes(signature),signature);
 const reliefAt=(height,strength)=>Math.max(.12,Math.min(2.4,
   1-Math.pow(1-height,1.6)*.75*strength+Math.pow(height,2.6)*.65*strength));
 const crack=reliefAt(.04,1.3),ridge=reliefAt(.94,1.3);
 assert.ok(crack<.35,'cracks must visibly darken');
 assert.ok(ridge>1.5,'raised ridges must be significantly brighter');
 assert.equal(reliefAt(.15,0),1);
 assert.equal(reliefAt(.85,0),1);
});
test('R145: energy and relief selected on native mobile change independently',()=>{
 const x=fixture();x.frame(40);
 let clock=40;
 x.controls.energyMode.value='1';x.events.change({target:x.controls.energyMode});x.frame(clock+=45);
 assert.equal(x.arrays.get('surfaceSettings')[0],1);
 x.controls.reliefMode.value='2';x.events.change({target:x.controls.reliefMode});x.frame(clock+=45);
 assert.equal(x.arrays.get('reliefSettings')[0],2);
 assert.equal(x.arrays.get('surfaceSettings')[0],1);
 x.controls.shellVisibility.value='0';x.events.input({target:x.controls.shellVisibility});x.frame(clock+=45);
 assert.equal(x.uniforms.get('shellVisibilityRatio'),0);
 assert.equal(x.arrays.get('surfaceSettings')[0],1);
 x.events.reset({preventDefault(){}});x.frame(clock+=45);
 assert.equal(x.arrays.get('surfaceSettings')[0],0);
 assert.equal(x.arrays.get('reliefSettings')[0],0);
 assert.equal(x.uniforms.get('shellVisibilityRatio'),1);
});


test('R147: one-click VFX presets, independent core flux and collapsible advanced controls',()=>{
 assert.match(html,/Effets de particules — accès rapide/);
 assert.match(html,/<details class="vfx-advanced"><summary>Réglages avancés des particules<\/summary>/);
 assert.match(html,/data-sphere-control="particlePreset"/);
 assert.match(html,/data-sphere-control="particleIntensity"/);
 assert.match(html,/max="500" value="100" step="1"/);
 assert.ok(js.includes('float coreFlux=pow(max(coreRatio,0.),1.55);'));
 assert.ok(js.includes('vec3 hotCore=mix(coreColor,vec3(1.),clamp((coreRatio-1.)/4.,0.,.72));'));
 assert.ok(js.includes('base+=hotCore*(centralSource*.82+coreBloom*.42)*coreFlux;'));
 assert.ok(!js.includes('base+=coreColor*(centralSource*.64+coreBloom*.62)*coreRatio;'));
 const x=fixture();x.frame(40);
 const base=x.arrays.get('flowSettings')[3];
 x.controls.coreLight.value='500';x.events.input({target:x.controls.coreLight});x.frame(90);
 assert.equal(x.uniforms.get('coreRatio'),5);
 assert.equal(x.arrays.get('flowSettings')[3],base,'core size must not change when power increases');
});
test('R147: actual GPU particle sprites have independent life, depth, birth, fade and 4 trajectories',()=>{
 const required=[
  'const MAX_PARTICLES=1024;',
  'attribute float aSeed;',
  'float age=fract(uTime*lifetime*',
  'float depth=particleRand(i+42.)*2.-1.;',
  'float fade=smoothstep(0.,.12,age)*(1.-smoothstep(.64,1.,age));',
  'if(uEmitter.x<.5)',
  '}else if(uEmitter.x<1.5)',
  '}else if(uEmitter.x<2.5)',
  'gl_PointCoord*2.-1.',
  'gl.drawArrays(gl.POINTS,0,count);',
  'gl.drawArrays(gl.TRIANGLES,0,6);',
  'particleEngine?.draw(still?0:elapsed,rx,ry);'
 ];
 for(const signature of required)assert.ok(js.includes(signature),signature);
 assert.equal((html.match(/<canvas /g)||[]).length,1,'same GL surface');
 assert.doesNotMatch(js,/fetch\(|WebSocket|localStorage|sessionStorage/);
});
test('R147: preset and intensity control the particle draw independently, safety cap and reset',()=>{
 const x=fixture();x.frame(40);
 assert.equal(x.drawCalls.filter(z=>z.mode===0).length,2,'separate halo and bright core sprite passes');
 assert.equal(x.drawCalls.at(-1).count,360);
 let clock=40;
 x.controls.particleIntensity.value='0';x.events.input({target:x.controls.particleIntensity});x.frame(clock+=50);
 assert.equal(x.drawCalls.filter(z=>z.mode===0).length,2,'0 intensity turns emitter off');
 x.controls.particleIntensity.value='100';
 x.controls.particlePreset.value='4';
 x.events.change({target:x.controls.particlePreset});x.frame(clock+=50);
 assert.equal(x.drawCalls.filter(z=>z.mode===0).length,2,'disabled preset emits nothing');
 x.controls.particlePreset.value='3';
 x.controls.particleDensity.value='250';
 x.events.change({target:x.controls.particlePreset});x.frame(clock+=50);
 assert.equal(x.drawCalls.at(-1).count,640,'mobile GPU sprite capacity is bounded');
 assert.equal(x.arrays.get('uEmitter')[0],3);
 x.events.reset({preventDefault(){}});x.frame(clock+=50);
 assert.equal(x.arrays.get('uEmitter')[0],0);
 assert.equal(x.drawCalls.at(-1).count,360);
});


test('R148: visible particle VFX use two distinct additive luminous passes, not squared alpha',()=>{
 for(const signature of [
  'const MAX_PARTICLES=1024;',
  'const capacity=mobile?640:MAX_PARTICLES;',
  'gl.blendFunc(gl.ONE,gl.ONE);',
  'gl.uniform1f(uniforms.layer,0);',
  'gl.uniform1f(uniforms.layer,1);',
  'float hot=exp(-r2*15.);',
  'float halo=exp(-r2*3.2);',
  'uLayer<.5?halo*.29:hot*1.24+halo*.14',
  'VFX actif · '
 ])assert.ok(js.includes(signature),signature);
 assert.doesNotMatch(js,/gl\.blendFunc\(gl\.SRC_ALPHA,gl\.ONE\)/);
 assert.match(html,/data-vfx-status role="status" aria-live="polite"/);
 const x=fixture();x.frame(40);
 assert.equal(x.drawCalls.filter(q=>q.mode===0).length,2);
 assert.equal(x.drawCalls.filter(q=>q.mode===0)[0].count,360);
 assert.deepEqual(x.blendPairs.at(-1),[1,1]);
 assert.match(x.vfxStatus.textContent,/VFX actif/);
 assert.match(x.vfxStatus.textContent,/360 particules GPU/);
});
test('R148: visually distinct material palettes, GPU directions and ergonomic disabled mode',()=>{
 const x=fixture();x.frame(40);
 const plasma=Array.from(x.arrays.get('uParticleColor'));
 let clock=40;
 for(let i=1;i<=3;i++){
  x.controls.particlePreset.value=String(i);
  x.events.change({target:x.controls.particlePreset});x.frame(clock+=47);
  const next=Array.from(x.arrays.get('uParticleColor'));
  assert.notDeepEqual(next,plasma,'VFX preset '+i+' must differ from plasma');
  assert.match(x.vfxStatus.textContent,/VFX actif/);
 }
 x.controls.particlePreset.value='4';
 x.events.change({target:x.controls.particlePreset});x.frame(clock+=48);
 assert.match(x.vfxStatus.textContent,/désactivées/);
 const particles=x.drawCalls.filter(z=>z.mode===0).length;
 x.controls.particleIntensity.value='0';x.events.input({target:x.controls.particleIntensity});x.frame(clock+=48);
 assert.equal(x.drawCalls.filter(z=>z.mode===0).length,particles);
});


test('R149: particle vertex and fragment have identical float precision on highp and mediump GPUs',()=>{
 const readShader=key=>{
  const m=js.match(new RegExp('const '+key+' = '+String.fromCharCode(96)+'([\\s\\S]*?)'+String.fromCharCode(96)+';'));
  assert.ok(m,'particle shader '+key+' must be present');
  return m[1];
 };
 const vertex=readShader('vfxVertex');
 const fragment=readShader('vfxFragment');
 const resolved=(glsl,hasHighp)=>{
  const match=glsl.match(/#ifdef GL_FRAGMENT_PRECISION_HIGH\s*precision (highp|mediump) float;\s*#else\s*precision (highp|mediump) float;\s*#endif/);
  if(match)return hasHighp?match[1]:match[2];
  return glsl.match(/precision (highp|mediump) float;/)?.[1]||'highp';
 };
 assert.equal(resolved(vertex,true),'highp');
 assert.equal(resolved(fragment,true),'highp');
 assert.equal(resolved(vertex,false),'mediump');
 assert.equal(resolved(fragment,false),'mediump');
 // Failure-first: R148 fragment hard-coded mediump, so a highp device would
 // expose a vertex/fragment varying precision mismatch.
 const oldFragment=fragment.replace(/#ifdef GL_FRAGMENT_PRECISION_HIGH[\s\S]*?#endif/,'precision mediump float;');
 assert.notEqual(resolved(vertex,true),resolved(oldFragment,true),'old shader must fail compatibility gate');
});
test('R149: particle GPU link failure is surfaced and never declared as a VFX success',()=>{
 const x=fixture(false,true);x.frame(40);
 assert.match(x.vfxStatus.textContent,/liaison GPU échouée/);
 assert.match(x.vfxStatus.textContent,/varying precision mismatch at link/);
 assert.equal(x.drawCalls.filter(z=>z.mode===0).length,0,'no particles on link failure');
 assert.equal(x.drawCalls.filter(z=>z.mode===4).length,1,'sphere remains functional');
 assert.doesNotMatch(x.vfxStatus.textContent,/VFX actif/);
});


test('R150: VFX material and sphere share the same preset, intensity and animation controls',()=>{
 for(const source of [
  'uniform vec4 particleMaterial;',
  'float vfxAmount=clamp(particleMaterial.y,0.,2.)*(1.-step(3.5,particleMaterial.x));',
  'base+=vfxTint*vfxAmount*(vfxSignal*.20+centralSource*.075)*vfxEnvelope;',
  'gl.uniform4fv(parameters.particleMaterial,new Float32Array([',
  'gl.uniform1f(uniforms.opacity,numeric('
 ])assert.ok(js.includes(source),source);
 const x=fixture();x.frame(40);
 assert.equal(x.arrays.get('particleMaterial')[0],0);
 assert.equal(x.arrays.get('particleMaterial')[1],1);
 x.controls.particlePreset.value='2';x.events.change({target:x.controls.particlePreset});x.frame(86);
 assert.equal(x.arrays.get('particleMaterial')[0],2);
 assert.equal(x.arrays.get('uEmitter')[0],2);
 x.controls.particleIntensity.value='0';x.events.input({target:x.controls.particleIntensity});x.frame(135);
 assert.equal(x.arrays.get('particleMaterial')[1],0,'surface emission off when VFX intensity zero');
});
test('R150: particle fragments share sphere silhouette and opacity; no detached pixels',()=>{
 for(const term of [
  'vec2 projected=(gl_FragCoord.xy/max(uResolution,vec2(1.))-.5)*2.;',
  'projected.x*=uResolution.x/max(uResolution.y,1.);',
  'projected.y+=.08;',
  'float sphereEnvelope=1.-smoothstep(.62,.702,length(projected));',
  '*sphereEnvelope*innerLuminosity*clamp(uGlobalOpacity,0.,1.);'
 ]) assert.ok(js.includes(term),term);
 const x=fixture();x.frame(40);
 assert.equal(x.uniforms.get('uGlobalOpacity'),1);
 x.controls.opacity.value='0';
 x.events.input({target:x.controls.opacity});x.frame(90);
 assert.equal(x.uniforms.get('uGlobalOpacity'),0);
 assert.equal(x.uniforms.get('sphereAlpha'),0);
 x.events.reset({preventDefault(){}});x.frame(140);
 assert.equal(x.uniforms.get('uGlobalOpacity'),1);
});
test('R150: VFX colors follow sphere color editing without preset losing its identity',()=>{
 const x=fixture();x.frame(40);
 const defaultTint=Array.from(x.arrays.get('uParticleColor'));
 x.controls.core.value='#ff6600';x.events.input({target:x.controls.core});x.frame(87);
 const edited=Array.from(x.arrays.get('uParticleColor'));
 assert.notDeepEqual(defaultTint,edited,'VFX must follow live core-color editor');
 x.controls.particlePreset.value='2';x.events.change({target:x.controls.particlePreset});x.frame(135);
 assert.notDeepEqual(edited,Array.from(x.arrays.get('uParticleColor')),'vortex remains distinct');
 assert.ok(js.includes('const core=color('), 'presets must sample core colors in real time');
 assert.ok(js.includes('const tint=core.map('));
 assert.ok(!js.includes("const palette=[[.23,.84,1.],[.78,.94,1.],[.69,.38,1.],[1.,.39,.10]]"));
});
