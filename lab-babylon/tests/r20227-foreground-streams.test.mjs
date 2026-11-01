import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=new URL('../src/',import.meta.url);
const ribbon=readFileSync(new URL('plasma-ribbons.js',src),'utf8');
const main=readFileSync(new URL('main.js',src),'utf8');
const heart=readFileSync(new URL('plasma-field.js',src),'utf8');

function frontClip(camera,core,fragment,radius){
 const v=fragment.map((x,i)=>x-camera[i]);
 const length=Math.hypot(...v);
 if(length<.0001||radius<=.0001)return false;
 const ray=v.map(x=>x/length),relative=camera.map((x,i)=>x-core[i]);
 const b=relative.reduce((s,x,i)=>s+x*ray[i],0);
 const discriminant=b*b-(relative.reduce((s,x)=>s+x*x,0)-radius*radius);
 if(discriminant<=0)return false;
 const entry=-b-Math.sqrt(discriminant);
 return entry>0&&length<entry-.004;
}

test('failure-first: behind or inside core cannot be overpainted',()=>{
 const camera=[0,0,4.8],center=[0,0,0],radius=.35;
 assert.equal(frontClip(camera,center,[0,0,-.8],radius),false);
 assert.equal(frontClip(camera,center,[0,0,0],radius),false);
 assert.equal(frontClip(camera,center,[0,0,.33],radius),false);
 assert.equal(frontClip(camera,center,[.9,0,0],radius),false);
 assert.equal(frontClip(camera,center,[0,0,.8],0),false);
});
test('nominal: genuinely foreground stream sections are admitted',()=>{
 const camera=[0,0,4.8],center=[0,0,0],radius=.35;
 assert.equal(frontClip(camera,center,[0,0,.6],radius),true);
 assert.equal(frontClip(camera,center,[.1,0,.65],radius),true);
 const translated=[3,1,-2],shift=v=>v.map((x,i)=>x+translated[i]);
 assert.equal(frontClip(shift(camera),shift(center),shift([0,0,.6]),radius),true);
});
test('exact six scene node streams, separate overlay group, same animated paths and disposal',()=>{
 assert.match(ribbon,/const foregroundNodeMeshes=nodeMeshes\.map\(\(mesh,i\)=>/);
 assert.match(ribbon,/foreground\.makeGeometryUnique\(\)/);
 assert.match(ribbon,/foreground\.renderingGroupId=2/);
 assert.match(ribbon,/vec3 vWorld;/);
 assert.match(ribbon,/fragmentDistance>=entry-\.004/);
 assert.match(ribbon,/if\(discriminant<=0\.0\)discard/);
 assert.match(ribbon,/const samePaths=organicPlasmaRibbonPaths\(bridgePath\(i,time\),i\+100,time\)/);
 assert.match(ribbon,/instance:front/);
 assert.match(ribbon,/foregroundNodeMeshes\]\)mesh\.dispose\(\)/);
 assert.match(main,/\.\.\.plasma\.foregroundNodeMeshes\]\)mesh\.parent=sphereRoot/);
 assert.match(main,/cameraPosition:camera\.position,coreCenter:core\.getAbsolutePosition\(\),coreRadius:\.35\*r/);
 assert.match(main,/frontStreams=String\(plasma\.foregroundNodeMeshes\.filter/);
});
test('immutable 80-facet nucleus and existing R202.26 flow shader',()=>{
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/core\.renderingGroupId=1/);
 assert.match(heart,/for\(int i=0;i<3;i\+\+\)/);
 assert.match(heart,/alpha\*depthTransmission/);
 assert.doesNotMatch(main,/new Engine\(.*new Engine\(/);
});
