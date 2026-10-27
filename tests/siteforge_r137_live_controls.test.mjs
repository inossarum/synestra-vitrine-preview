import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('assets/siteforge-r116-sphere-only.js');
const html=read('siteforge/core-3d-lab/index.html');
const defaults={
 particlePreset:4,particleIntensity:100,coreLight:135,arcIntensity:140,arcDensity:100,
 diameter:100,shellVisibility:0,coreSize:70,particleDensity:100,
 particleSpeed:100,particleSize:100,opacity:100,flowType:0,flowStructure:100,
 primary:'#08142e',secondary:'#53318d',core:'#eaffff',rim:'#51dfff'
};
const colorKeys=['primary','secondary','core','rim'];

function fixture({failLink=false,failCompile=false,noWebGL=false,reduceMotion=false}={}){
 const callbacks={},queue=[],uniforms=new Map(),draws=[],attrs={};
 const download={filename:null,blob:null,clicked:0,revoked:[]};
 const exportCallbacks={};
 const exportButton={addEventListener:(name,cb)=>exportCallbacks[name]=cb};
 const exportStatus={textContent:''};
 const outputs=Object.fromEntries(Object.keys(defaults).map(k=>[k,{textContent:''}]));
 const controls=Object.fromEntries(Object.entries(defaults).map(([key,val])=>{
  const v=String(val),type=key==='particlePreset'?'hidden':key==='flowType'?'select-one':colorKeys.includes(key)?'color':'range';
  return [key,{value:v,defaultValue:v,type,dataset:{sphereControl:key},
   getAttribute:k=>k==='data-default'&&(key==='particlePreset'||key==='flowType')?v:null,
   hasAttribute:k=>k==='data-sphere-control',
   selectedOptions:[{textContent:v}]}];
 }));
 const mainStatus={textContent:''},vfxStatus={textContent:''};
 let programCount=0,contextCalls=0;
 const gl={
  VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,COMPILE_STATUS:35713,LINK_STATUS:35714,
  ARRAY_BUFFER:34962,STATIC_DRAW:35044,FLOAT:5126,
  TRIANGLES:4,POINTS:0,LINES:1,BLEND:3042,ONE:1,COLOR_BUFFER_BIT:16384,
  createShader:()=>({}),shaderSource(){},compileShader(){},getShaderParameter:()=>!failCompile,
  getShaderInfoLog:()=> 'synthetic compile failure',deleteShader(){},
  createProgram:()=>({id:++programCount}),attachShader(){},linkProgram(){},
  getProgramParameter:()=>!failLink,getProgramInfoLog:()=> 'synthetic linker failure',
  deleteProgram(){},useProgram(){},createBuffer:()=>({}),bindBuffer(){},bufferData(){},
  getAttribLocation:(_,key)=>key==='aPosition'?0:1,
  enableVertexAttribArray(){},disableVertexAttribArray(){},vertexAttribPointer(){},
  vertexAttrib1f(){},vertexAttrib2f(){},
  getUniformLocation:(_,name)=>name,uniform1f:(k,v)=>uniforms.set(k,v),
  uniform2f:(k,a,b)=>uniforms.set(k,[a,b]),
  uniform3fv:(k,v)=>uniforms.set(k,Array.from(v)),
  uniform4fv:(k,v)=>uniforms.set(k,Array.from(v)),
  viewport(){},clearColor(){},clear(){},enable(){},disable(){},blendFunc(){},
  drawArrays:(mode,first,count)=>draws.push({mode,count})
 };
 const canvas={clientWidth:390,clientHeight:248,width:960,height:570,
  getContext:()=>{contextCalls++;return noWebGL?null:gl},addEventListener(){}};
 const stage={
  querySelector:selector=>selector==='.core-r109-canvas'?canvas:null,
  style:{setProperty:(k,v)=>attrs[k]=v},
  hasAttribute:k=>k==='data-core-ready'?Boolean(attrs.ready):false,
  setAttribute:(k,v)=>{if(k==='data-core-ready')attrs.ready=v},
  removeAttribute:k=>{if(k==='data-core-ready')delete attrs.ready},
  addEventListener(){},getBoundingClientRect:()=>({left:0,top:0,width:390,height:248})
 };
 const panel={addEventListener:(k,fn)=>callbacks[k]=fn};
 const document={
  visibilityState:'visible',
  body:{appendChild(link){download.link=link;}},
  createElement(tag){assert.equal(tag,'a');return {href:'',download:'',click(){download.clicked++;download.filename=this.download;},remove(){download.removed=true;}};},
  querySelectorAll:selector=>selector==='[data-sphere-control]'?Object.values(controls):[],
  querySelector:selector=>{
   if(selector==='.core-r108-stage')return stage;
   if(selector==='.lab-controls')return panel;
   if(selector==='[data-render-status]')return mainStatus;
   if(selector==='[data-vfx-status]')return vfxStatus;
   if(selector==='[data-export-json]')return exportButton;
   if(selector==='[data-export-status]')return exportStatus;
   const match=selector.match(/data-sphere-value="([^"]+)"/);
   return match?outputs[match[1]]||null:null;
  },
  addEventListener(){}
 };
 const window={innerWidth:390,devicePixelRatio:2,matchMedia:()=>({matches:reduceMotion}),setTimeout:fn=>{download.revokeLater=fn}};
 const URL={createObjectURL:blob=>{download.blob=blob;return 'blob:siteforge-export-test';},revokeObjectURL:uri=>download.revoked.push(uri)};
 class BlobMock{constructor(parts,opts){this.parts=parts;this.type=opts.type;}}
 const context={document,window,console,Float32Array,Blob:BlobMock,URL,
  requestAnimationFrame:fn=>{queue.push(fn);return queue.length},
  cancelAnimationFrame(){},
  IntersectionObserver:class{constructor(cb){this.cb=cb}observe(){this.cb([{isIntersecting:true}])}disconnect(){}},
  ResizeObserver:class{observe(){}disconnect(){}}
 };
 runInNewContext(js,context);
 return {controls,draws,uniforms,attrs,mainStatus,vfxStatus,callbacks,download,exportStatus,exportCallbacks,
  frame(t=40){const fn=queue.shift();if(fn)fn(t)},contextCalls};
}

test('R152: legacy marble sphere and all its old controls truly removed',()=>{
 for(const token of ['r111Arc','r145ElectricBolt','reliefSettings','surfaceSettings',
   'agitationRatio','shellThicknessRatio','metalGyro','SynestraSphere3DShaders'])
  assert.ok(!js.includes(token),token+' should not exist in new engine');
 for(const key of ['energyMode','reliefMode','agitation','diffusion','thickness','surfaceFlow','rimLight'])
  assert.doesNotMatch(html,new RegExp('id="sf-'+key+'"'));
 assert.match(js,/SiteForge R157/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
});
test('R152: only one WebGL shader program, canvas and source script',()=>{
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/<script src=/g)||[]).length,1);
 assert.equal((js.match(/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/g)||[]).length,1);
 assert.match(js,/gl\.blendFunc\(gl\.ONE,gl\.ONE\)/);
 assert.doesNotMatch(js,/fetch\(|XMLHttpRequest|WebSocket|sendBeacon/);
});
test('R152: source plasma reference uses original cyan, white, violet, midnight',()=>{
 for(const hex of ['#08142e','#53318d','#eaffff','#51dfff'])assert.ok(html.includes(hex));
 assert.match(js,/float winding=angle\*5\.0\+5\.8\*log\(planar\+\.15\)/);
 assert.match(js,/float core=exp\(-dot\(q,q\)\/\(nucleusRadius\*nucleusRadius\)/);
 assert.match(js,/float volumeFog=clamp\(/);
 assert.match(js,/float noise3\(vec3 p\)/);
});
test('R152: native quick controls, safe defaults and accessible advanced settings',()=>{
 assert.match(html,/<details class="vfx-advanced">/);
 assert.match(html,/Restaurer le plasma d'origine/);
 assert.match(html,/aria-live="polite"/);
 assert.match(html,/default-src 'none'; script-src 'self'/);
 assert.match(html,/noindex,nofollow/);
 assert.equal((html.match(/type="range"/g)||[]).length,9);
 assert.equal((html.match(/type="color"/g)||[]).length,4);
 assert.equal((html.match(/<select /g)||[]).length,1);
 const keys=Object.keys(defaults);
 for(const key of keys)assert.match(html,new RegExp('data-sphere-control="'+key+'"'));
});
test('R160: pure-mode default draws exactly one volumetric pass',()=>{
 const x=fixture();x.frame();
 assert.deepEqual(x.draws.map(d=>[d.mode,d.count]),[
  [4,6]
 ]);
 assert.match(x.mainStatus.textContent,/Nouvelle sphère plasma WebGL active/);
 assert.match(x.vfxStatus.textContent,/Plasma GPU actif/);
 assert.equal(x.contextCalls,1);
});
test('R152: disabling supplemental particles keeps plasma shell, internal arcs and nucleus',()=>{
 const x=fixture();x.frame(40);
 x.controls.particlePreset.value='4';x.callbacks.change({target:x.controls.particlePreset});x.frame(90);
 assert.deepEqual(x.draws.slice(-1).map(d=>[d.mode,d.count]),[[4,6]]);
 assert.match(x.vfxStatus.textContent,/particules additionnelles désactivées/);
});
test('R160: zero shell retains volumetric core without extra particle overlays',()=>{
 const x=fixture();x.frame(40);
 x.controls.shellVisibility.value='0';x.callbacks.input({target:x.controls.shellVisibility});x.frame(90);
 assert.equal(x.uniforms.get('uShape')[1],0);
 assert.deepEqual(x.draws.slice(-1).map(d=>d.count),[6]);
});
test('R152: nucleus flux stays independent of nucleus radius',()=>{
 const x=fixture();x.frame(40);
 const size=x.uniforms.get('uShape')[2];
 x.controls.coreLight.value='500';x.callbacks.input({target:x.controls.coreLight});x.frame(90);
 assert.equal(x.uniforms.get('uShape')[3],5);
 assert.equal(x.uniforms.get('uShape')[2],size);
});
test('R152: legacy shader pathway remains reversible and resets to hidden pure mode',()=>{
 const x=fixture();x.frame(40);
 x.controls.particlePreset.value='2';x.callbacks.change({target:x.controls.particlePreset});x.frame(90);
 assert.equal(x.uniforms.get('uControls')[0],2);
 x.callbacks.reset({preventDefault(){}});x.frame(140);
 assert.equal(x.uniforms.get('uControls')[0],4);
 assert.equal(x.controls.coreLight.value,'135');
});
test('R152: compile and link failures never pretend to have active GPU rendering',()=>{
 const a=fixture({failCompile:true}),b=fixture({failLink:true}),c=fixture({noWebGL:true});
 a.frame();b.frame();c.frame();
 for(const x of [a,b,c])assert.equal(x.draws.length,0);
 assert.match(a.mainStatus.textContent,/Échec compilation GPU/);
 assert.match(b.mainStatus.textContent,/Échec liaison GPU/);
 assert.match(c.mainStatus.textContent,/GPU indisponible/);
});
test('R152: accessible reduced motion keeps static original plasma fallback',()=>{
 const x=fixture({reduceMotion:true});x.frame();
 assert.equal(x.contextCalls,0);
 assert.match(x.mainStatus.textContent,/Animation réduite/);
 assert.match(html,/<svg class="core-r108-art"/);
});
test('R152: independently bounded mobile GPU work and narrow arc segments',()=>{
 assert.match(js,/const MAX=2048/);
 assert.match(js,/mobile\?1480:MAX/);
 assert.match(js,/Math\.min\(mobile\?928:1740,/);
 assert.match(js,/const coreCount=mobile\?160:260/);
 assert.match(js,/float segment=floor\(i\/2\.\)/);
 assert.match(js,/float fork=step\(17\.,bead\)/);
});

test('R154: four presets affect real 3D plasma ray samples, not only optional particles',()=>{
 const field=js.slice(js.indexOf('if(uPass>3.5){',js.indexOf('const fragment=')),
                      js.indexOf('vec2 c=gl_PointCoord'));
 for(const key of [
  'float halfDepth=sqrt(max(0.,radius*radius-dot(p,p)));',
  'float stride=(2.*halfDepth)/max(uVolumeSteps,1.);',
  'for(int i=0;i<22;i++){',
  'if(float(i)>=uVolumeSteps)break;',
  'float z=halfDepth-(float(i)+.5)*stride;',
  'vec3 q=vec3(p,z);',
  'float winding=angle*5.0+5.8*log(planar+.15)',
  'float electrical=0.,vortex=0.,fusion=0.;',
  'electrical=pow(max(0.,.5+.5*cos(winding*2.2+detail*9.)),23.);',
  'vortex=pow(max(0.,.5+.5*cos(winding*.8+q.z*8.)),9.);',
  'fusion=pow(max(0.,.5+.5*cos(angle*10.+depthWarp*2.-t*.5)),14.)',
  'float violetBand=.5+.5*sin(angle*3.0+q.z*4.0+broad*2.2);',
  'accum+=trans*radiance*absorption;',
  'trans*=1.-absorption;',
  'float nucleusRadius=max(.018,radius*uShape.z*.105);'
 ])assert.ok(field.includes(key),key);
 assert.doesNotMatch(field,/float helix=theta/,'do not regress to flat 2D marble');
 const x=fixture();x.frame(40);
 assert.equal(x.uniforms.get('uVolumeSteps'),14);
 for(const i of [1,2,3,4]){
  x.controls.particlePreset.value=String(i);
  x.callbacks.change({target:x.controls.particlePreset});x.frame(50+i*45);
  assert.equal(x.uniforms.get('uControls')[0],i);
 }
});
test('R153: electrical bolt starts distributed inside volume, while points form finer streaks',()=>{
 const v=js.slice(js.indexOf('const vertex='),js.indexOf('const fragment='));
 const f=js.slice(js.indexOf('const fragment='),js.indexOf('function compile('));
 for(const key of [
  'float originAngle=rnd(chain*13.+epoch*21.)*6.283185;',
  'float originRadius=.025+.38*rnd(chain*19.+epoch*7.);',
  'vec2 origin=vec2(cos(originAngle),sin(originAngle))*originRadius;',
  'float zig=stepNoise*.028+sin(bead*.92+chain*3.7)*.008;',
  'float fork=step(17.,bead)',
  'p=vec3((origin+dir*reach+vec2(-dir.y,dir.x)*zig)*uShape.x,',
  'vAxis=dir;sizeFactor=.77;'
 ])assert.ok(v.includes(key),key);
 assert.ok(f.includes('if(uPass>1.5&&uPass<2.5){'));
 assert.ok(!v.includes('p=vec3((cos(ang)*reach-sin(ang)*zig)'),'old center-origin arcs must be removed');
});
test('R153: failure-first and simple palette still intact after effect redesign',()=>{
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((js.match(/gl.createProgram\(\)/g)||[]).length,1);
 const x=fixture({failLink:true});x.frame(40);
 assert.equal(x.draws.length,0);
 assert.match(x.mainStatus.textContent,/Échec liaison GPU/);
 const y=fixture();y.frame(40);
 assert.match(y.mainStatus.textContent,/Nouvelle sphère plasma WebGL active/);
});


test('R154: physically volumetric optical depth, quality budget and interactive 3D orientation',()=>{
 for(const mark of [
  'float halfDepth=sqrt(max(0.,radius*radius-dot(p,p)));',
  'q=vec3(q.x*cy+q.z*sy,',
  'float distance3D=length(q)/radius;',
  'float coreHalo=exp(-dot(q,q)/(nucleusRadius*nucleusRadius)*.18);',
  'vec3 result=accum*2.05+',
  'result=vec3(1.)-exp(-max(result,vec3(0.))*1.15);',
  'gl.uniform1f(U.uVolumeSteps,mobile?14:22);'
 ])assert.ok(js.includes(mark),mark);
 const x=fixture();x.frame(40);
 assert.equal(x.uniforms.get('uVolumeSteps'),14,'mobile volume sampling bounded');
 assert.equal((js.match(/gl.createProgram\(\)/g)||[]).length,1);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
});
test('R154: energy reference is legible on mobile and still shares palette and engine',()=>{
 assert.match(html,/R172.1 · COMPARER/);
 assert.match(html,/transform:scale\(calc\(1\.22 \* var\(--sphere-zoom,1\)\)\)/);
 assert.match(html,/transform:scale\(calc\(\.92 \* var\(--sphere-zoom,1\)\)\)/);
 assert.match(js,/if\(uPass>\.5&&uPass<1\.5\)energy\*=\.025/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
});


test('R155: all polar harmonics reconnect after a full 2π turn, preventing left horizontal shader seam',()=>{
 const frag=js.slice(js.indexOf('const fragment='),js.indexOf('function compile('));
 assert.match(frag,/float winding=angle\*5\.0\+/);
 assert.match(frag,/float sideFilament=pow\(max\(0\.,\.5\+\.5\*cos\(winding\*1\.8\+/);
 assert.match(frag,/float stream=pow\(max\(0\.,\.5\+\.5\*cos\(winding\*\.8-q\.z\*7\.2\)\),8\.\);/);
 assert.match(frag,/vortex=pow\(max\(0\.,\.5\+\.5\*cos\(winding\*\.8\+q\.z\*8\.\)\),9\.\);/);
 assert.match(frag,/float violetBand=\.5\+\.5\*sin\(angle\*3\.0\+q\.z\*4\.0\+broad\*2\.2\);/);
 const harmonics=[5,5*1.8,5*.8,5*.8,3];
 for(const n of harmonics)assert.ok(Math.abs(n-Math.round(n))<1e-8,'integer angular harmonics must be 2pi-periodic: '+n);
 for(const old of ['winding*.78','winding*.72','angle*2.7'])assert.ok(!frag.includes(old),'discontinuous R154 angular phase must not regress: '+old);
});


test('R156: export button is accessible, stays separate from reset and contains only live control values',()=>{
 assert.match(html,/<button[^>]*type="button"[^>]*data-export-json/);
 assert.match(html,/aria-describedby="sf-export-description"/);
 assert.match(html,/data-export-status role="status" aria-live="polite"/);
 const x=fixture();
 x.controls.arcIntensity.value='287';
 x.controls.coreLight.value='420';
 x.controls.particleDensity.value='213';
 x.controls.secondary.value='#aa55ee';
 x.exportCallbacks.click();
 assert.equal(x.download.clicked,1);
 assert.equal(x.download.filename,'synestra-siteforge-plasma-settings.json');
 assert.equal(x.download.blob.type,'application/json;charset=utf-8');
 const parsed=JSON.parse(x.download.blob.parts.join(''));
 assert.equal(parsed.schema,'synestra.siteforge.plasma-settings.v1');
 assert.equal(parsed.version,1);
 assert.equal(parsed.engine,'siteforge-plasma-webgl1');
 assert.deepEqual(Object.keys(parsed.parameters).sort(),Object.keys(defaults).sort());
 assert.equal(parsed.parameters.particlePreset,4);
 assert.equal(parsed.parameters.arcIntensity,287);
 assert.equal(parsed.parameters.coreLight,420);
 assert.equal(parsed.parameters.particleDensity,213);
 assert.equal(parsed.parameters.secondary,'#aa55ee');
 assert.equal(typeof parsed.parameters.arcIntensity,'number');
 assert.equal(typeof parsed.parameters.rim,'string');
 assert.ok(x.download.blob.parts.join('').endsWith('\n'));
 assert.equal(x.download.removed,true);
 assert.deepEqual(x.download.revoked,[]);
 x.download.revokeLater();
 assert.deepEqual(x.download.revoked,['blob:siteforge-export-test']);
 assert.match(x.exportStatus.textContent,/18 paramètres actuels/);
});
test('R156: export continues to work with zero GPU, shader link error, reduced motion and after reset',()=>{
 for(const option of [{noWebGL:true},{failLink:true},{reduceMotion:true}]){
  const x=fixture(option);
  x.controls.coreSize.value='153';
  x.exportCallbacks.click();
  assert.equal(JSON.parse(x.download.blob.parts.join('')).parameters.coreSize,153);
  assert.equal(x.download.clicked,1);
 }
 const x=fixture();
 x.controls.opacity.value='10';
 x.callbacks.reset({preventDefault(){}});
 x.exportCallbacks.click();
 assert.equal(JSON.parse(x.download.blob.parts.join('')).parameters.opacity,100);
});


test('R160: five material families stay independent of the locked pure overlay preset',()=>{
 assert.match(html,/data-sphere-control="flowType"/);
 assert.match(html,/data-sphere-control="flowStructure"/);
 for(const name of ['Flux plasma','Rubans magnétiques','Voiles d’aurore','Brume ionique','Jets de fusion'])assert.ok(html.includes(name),name);
 const x=fixture();x.frame(40);
 assert.deepEqual(x.uniforms.get('uFlow'),[0,1]);
 for(let i=1;i<=4;i++){
  x.controls.flowType.value=String(i);x.controls.flowStructure.value=String(50+i*25);
  x.callbacks.change({target:x.controls.flowType});x.frame(41+i*45);
  assert.equal(x.uniforms.get('uFlow')[0],i);
  assert.equal(x.uniforms.get('uFlow')[1],(50+i*25)/100);
 }
 assert.equal(x.controls.particlePreset.value,'4');
});
test('R157: five physically distinct volume materials share one GPU program',()=>{
 const fragment=js.slice(js.indexOf('const fragment='),js.indexOf('function compile('));
 for(const term of ['uniform vec2 uFlow;','if(uFlow.x<.5){','else if(uFlow.x<1.5){','else if(uFlow.x<2.5){','else if(uFlow.x<3.5){','float ribbonWidth=clamp(uFlow.y,.3,2.);','currents=flowCurrents;','float density=(currents*.43*emission+','float core=exp(-dot(q,q)/(nucleusRadius*nucleusRadius)*1.65);'])assert.ok(fragment.includes(term),term);
 assert.equal((js.match(/gl.createProgram\(\)/g)||[]).length,1);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
});
test('R157: owner-disabled arcs and extra sprites stay disabled for every flow family',()=>{
 const x=fixture();x.controls.particlePreset.value='4';x.controls.arcIntensity.value='0';x.controls.arcDensity.value='0';x.controls.opacity.value='9';
 for(let i=0;i<=4;i++){
  x.controls.flowType.value=String(i);x.callbacks.change({target:x.controls.flowType});x.frame(80+i*50);
  assert.equal(x.uniforms.get('uFlow')[0],i);
  assert.equal(x.uniforms.get('uEffects')[0],0);
  assert.equal(x.uniforms.get('uEffects')[1],0);
  assert.equal(x.uniforms.get('uControls')[0],4);
 }
 assert.deepEqual(x.draws.filter(d=>d.mode===0).map(d=>d.count),[]);
});
test('R157: JSON export includes new flow family and structure and retains old saved fields',()=>{
 const x=fixture();x.controls.flowType.value='3';x.controls.flowStructure.value='174';
 x.controls.particlePreset.value='4';x.controls.arcIntensity.value='0';x.controls.arcDensity.value='0';x.controls.opacity.value='9';
 x.exportCallbacks.click();
 const p=JSON.parse(x.download.blob.parts.join('')).parameters;
 assert.equal(Object.keys(p).length,18);assert.equal(p.flowType,3);assert.equal(p.flowStructure,174);
 assert.equal(p.particlePreset,4);assert.equal(p.arcIntensity,0);assert.equal(p.arcDensity,0);assert.equal(p.opacity,9);
 assert.match(x.exportStatus.textContent,/18 paramètres/);
});


test('R157: aurora and nebula material shader variables are scoped, regression of real GPU failure',()=>{
 const f=js.slice(js.indexOf('const fragment='),js.indexOf('function compile('));
 assert.ok(f.includes('float hollow=1.-smoothstep('));
 assert.ok(f.includes('float sideFilament=pow('));
 assert.ok(f.includes('flowCurrents=veil*(.38+.67*feather);'));
 assert.ok(f.includes('flowCurrents=densityCloud*(.28+.28*swirls);'));
 assert.doesNotMatch(f,/\bwisps\b/,'undefined wisps must never reach WebGL shader compiler');
});


test('R158: material-only composition draws no duplicated shell/core sprites and honors disabled effects',()=>{
 const source=js.slice(js.indexOf('const emit=(pass,count,mode=gl.POINTS)'),js.indexOf('gl.disable(gl.BLEND);',js.indexOf('const emit=(pass,count,mode=gl.POINTS)')));
 assert.doesNotMatch(source,/emit\(1,/);
 assert.doesNotMatch(source,/emit\(3,/);
 assert.match(source,/if\(lightningCount>0\)\{/);
 const x=fixture();x.controls.arcIntensity.value='0';x.controls.arcDensity.value='0';
 x.controls.particlePreset.value='4';x.frame(40);
 assert.deepEqual(x.draws.map(x=>[x.mode,x.count]),[[4,6]]);
});
