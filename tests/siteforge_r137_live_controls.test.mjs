import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('siteforge/core-3d-lab/index.html');
const js=read('assets/siteforge-r116-sphere-only.js');
const keys=['diameter','opacity','rotation','agitation','details','shine','contrast',
  'coreLight','rimLight','primary','secondary','core','rim'];

test('R137: exactly 13 unique, labelled native browser controls, 4 colors and a reset',()=>{
 const found=[...html.matchAll(/data-sphere-control="([^"]+)"/g)].map(x=>x[1]);
 assert.deepEqual(found.sort(),[...keys].sort());
 for(const key of keys) {
   assert.match(html,new RegExp('for="sf-'+key+'"'));
   assert.match(html,new RegExp('data-sphere-value="'+key+'"'));
 }
 assert.equal((html.match(/type="color"/g)||[]).length,4);
 assert.equal((html.match(/type="range"/g)||[]).length,9);
 assert.match(html,/<button class="reset" type="reset">/);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.match(html,/\.core-r108-stage\{position:sticky;top:env\(safe-area-inset-top,0px\)/);
});

test('R137: real native WebGL shader uniforms and retina sampling replace CSS scaled resolution',()=>{
 for(const key of ['speedRatio','detailRatio','agitationRatio','shineRatio','contrastRatio',
    'coreRatio','rimRatio','sphereAlpha','primaryColor','secondaryColor','coreColor','rimColor']){
   assert.match(js,new RegExp('uniform (?:vec3|float) '+key+';'));
 }
 assert.match(js,/canvas\.clientWidth, logicalHeight = canvas\.clientHeight/);
 assert.match(js,/1900000/);
 assert.match(js,/gl\.uniform3fv\(/);
 assert.match(js,/micro=noise3/);
 assert.match(js,/webglcontextlost/);
 assert.doesNotMatch(js,/fetch\(|WebSocket|localStorage|sessionStorage|document\.cookie/);
});

function buildFixture(){
 const u1=new Map(),u3=new Map(),events={},raf=[];
 const keysAndValues={diameter:'100',opacity:'100',rotation:'100',agitation:'100',
   details:'100',shine:'100',contrast:'100',coreLight:'100',rimLight:'100',
   primary:'#092b63',secondary:'#1f174d',core:'#b8edff',rim:'#4fddff'};
 const controls=Object.fromEntries(Object.entries(keysAndValues).map(([key,value])=>
   [key,{dataset:{sphereControl:key},value,defaultValue:value,
     type:value[0]==='#'?'color':'range',hasAttribute:n=>n==='data-sphere-control'}]));
 const outputs=Object.fromEntries(Object.keys(controls).map(k=>[k,{textContent:''}]));
 const panel={addEventListener:(type,fn)=>events[type]=fn};
 const fallback={querySelector:()=>({setAttribute(){}})};
 const attributes=new Set(),css={};
 const gl={
   VERTEX_SHADER:35633,FRAGMENT_SHADER:35632,COMPILE_STATUS:35713,LINK_STATUS:35714,
   ARRAY_BUFFER:34962,STATIC_DRAW:35044,FLOAT:5126,TRIANGLES:4,COLOR_BUFFER_BIT:16384,
   createShader:()=>({}),shaderSource(){},compileShader(){},getShaderParameter:()=>true,
   deleteShader(){},createProgram:()=>({}),attachShader(){},linkProgram(){},
   getProgramParameter:()=>true,useProgram(){},createBuffer:()=>({}),
   bindBuffer(){},bufferData(){},getAttribLocation:()=>0,enableVertexAttribArray(){},
   vertexAttribPointer(){},getUniformLocation:(_,key)=>key,
   uniform1f:(key,value)=>u1.set(key,value),
   uniform2f(){},uniform3fv:(key,value)=>u3.set(key,Array.from(value)),
   viewport(){},clearColor(){},clear(){},drawArrays(){},
 };
 const canvas={clientWidth:420,clientHeight:260,width:960,height:570,
   getContext:()=>gl,addEventListener(){}};
 const scene={
   querySelector:selector=>selector==='.core-r109-canvas'?canvas:fallback,
   style:{setProperty:(k,v)=>css[k]=v},
   setAttribute:(name)=>attributes.add(name),
   removeAttribute:name=>attributes.delete(name),
   hasAttribute:name=>attributes.has(name),addEventListener(){}
 };
 const renderStatus={textContent:''};
 const document={
   querySelector:(selector)=>{
     if(selector==='.core-r108-stage')return scene;
     if(selector==='.lab-controls')return panel;
     if(selector==='[data-render-status]')return renderStatus;
     const m=selector.match(/^\[data-sphere-value="(.+)"\]$/);
     return m?outputs[m[1]]:null;
   },
   querySelectorAll:selector=>selector==='[data-sphere-control]'?Object.values(controls):[],
   visibilityState:'visible',addEventListener(){}
 };
 const window={devicePixelRatio:2,innerWidth:390,
   matchMedia:()=>({matches:false,addEventListener(){}})};
 const Observer=class{constructor(cb){this.cb=cb}observe(){this.cb([{isIntersecting:true}])}disconnect(){}};
 const Resize=class{observe(){}disconnect(){}};
 runInNewContext(js,{window,document,IntersectionObserver:Observer,ResizeObserver:Resize,
   requestAnimationFrame:callback=>{raf.push(callback);return raf.length;},
   cancelAnimationFrame:()=>{},Float32Array});
 const next=clock=>{const fn=raf.shift();assert.equal(typeof fn,'function');fn(clock)};
 return {controls,outputs,events,scene,renderStatus,css,u1,u3,canvas,next};
}

test('R137: slider changes drive the GPU; reset returns exact UI defaults',()=>{
 const fx=buildFixture();
 fx.next(40);
 assert.equal(fx.u1.get('speedRatio'),1);
 assert.equal(fx.u1.get('sphereAlpha'),1);
 assert.equal(fx.canvas.width,840);
 assert.equal(fx.css['--sphere-zoom'],'1');
 assert.match(fx.renderStatus.textContent,/WebGL actif/);
 fx.controls.rotation.value='250';
 fx.controls.opacity.value='35';
 fx.controls.diameter.value='130';
 fx.controls.primary.value='#ff0000';
 fx.events.input({target:fx.controls.rotation});
 fx.next(82);
 assert.equal(fx.u1.get('speedRatio'),2.5);
 assert.equal(fx.u1.get('sphereAlpha'),.35);
 assert.equal(fx.css['--sphere-zoom'],'1.3');
 assert.ok(Math.abs(fx.u3.get('primaryColor')[0]-1)<.0001);
 assert.ok(Math.abs(fx.u3.get('primaryColor')[1])<.0001);
 fx.events.reset({preventDefault(){}});
 fx.next(125);
 assert.equal(fx.controls.primary.value,'#092b63');
 assert.equal(fx.controls.opacity.value,'100');
 assert.equal(fx.u1.get('sphereAlpha'),1);
 assert.equal(fx.u1.get('speedRatio'),1);
 assert.equal(fx.css['--sphere-zoom'],'1');
});
