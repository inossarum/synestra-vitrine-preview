import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const src=new URL('../src/',import.meta.url);
const ribbon=readFileSync(new URL('plasma-ribbons.js',src),'utf8');
const main=readFileSync(new URL('main.js',src),'utf8');
const heart=readFileSync(new URL('plasma-field.js',src),'utf8');

// R202.28: retired analytical sphere test; real GPU depth/stencil owns occlusion.
test('exact six scene node streams, separate overlay group, same animated paths and disposal',()=>{
 assert.match(ribbon,/const foregroundNodeMeshes=nodeMeshes\.map\(\(mesh,i\)=>/);
 assert.match(ribbon,/foreground\.makeGeometryUnique\(\)/);
 assert.match(ribbon,/foreground\.renderingGroupId=3/);
 assert.match(ribbon,/vec3 vWorld;/);
 assert.match(ribbon,/shader\.stencil\.func=514/);
 assert.match(ribbon,/shader\.stencil\.mask=0x00/);
 assert.match(ribbon,/const samePaths=organicPlasmaRibbonPaths\(bridgePath\(i,time\),i\+100,time\)/);
 assert.match(ribbon,/instance:front/);
 assert.match(ribbon,/foregroundNodeMeshes\]\)mesh\.dispose\(\)/);
 assert.match(main,/\.\.\.plasma\.foregroundNodeMeshes\]\)mesh\.parent=sphereRoot/);
 assert.match(main,/scene\.setRenderingAutoClearDepthStencil\(3,false\)/);
 assert.match(main,/frontStreams=String\(plasma\.foregroundNodeMeshes\.filter/);
});
test('immutable 80-facet nucleus and existing R202.26 flow shader',()=>{
 assert.match(main,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/core\.renderingGroupId=1/);
 assert.match(heart,/for\(int i=0;i<3;i\+\+\)/);
 assert.match(heart,/alpha\*depthTransmission/);
 assert.doesNotMatch(main,/new Engine\(.*new Engine\(/);
});
