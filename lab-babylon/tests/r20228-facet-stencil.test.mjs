import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const ribbons=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');

test('R202.28 failure-first: invisible 80-triangle depth mask does not color or erase the visible core',()=>{
 assert.match(main,/core=MeshBuilder.CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(main,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(main,/coreDepthMask\.position\.setAll\(0\)/);
 assert.match(main,/coreDepthMask\.rotation\.setAll\(0\)/);
 assert.match(main,/coreDepthMask\.scaling\.setAll\(1\)/);
 assert.match(main,/coreDepthMaterial\.disableColorWrite=true/);
 assert.match(main,/coreDepthMaterial\.forceDepthWrite=true/);
 assert.match(main,/glow\.addExcludedMesh\(coreDepthMask\)/);
 assert.match(main,/core\.renderingGroupId=1/);
 assert.match(main,/coreDepthMask\.renderingGroupId=2/);
});
test('R202.28 GPU stencil is exact facet footprint and cannot leak behind the mask',()=>{
 assert.match(main,/coreDepthMaterial\.stencil\.func=519/);
 assert.match(main,/coreDepthMaterial\.stencil\.opStencilDepthPass=7681/);
 assert.match(main,/coreDepthMaterial\.stencil\.funcRef=1/);
 assert.match(main,/scene\.setRenderingAutoClearDepthStencil\(3,false\)/);
 assert.match(ribbons,/foreground\.renderingGroupId=3/);
 assert.match(ribbons,/shader\.stencil\.func=514/);
 assert.match(ribbons,/shader\.stencil\.funcRef=1/);
 assert.match(ribbons,/shader\.stencil\.mask=0x00/);
 assert.match(ribbons,/shader\.disableDepthWrite=true/);
 assert.doesNotMatch(ribbons,/fragmentDistance>=entry-\.004/);
 assert.doesNotMatch(ribbons,/float discriminant=projection/);
});
test('R202.28 retains original scene and exact 6 foreground meshes',()=>{
 assert.match(main,/scene=new Scene\(engine\)/);
 assert.match(main,/coreDepthMask\.getTotalIndices\(\)\/3/);
 assert.match(ribbons,/const foregroundNodeMeshes=nodeMeshes\.map/);
 assert.match(ribbons,/foreground\.makeGeometryUnique\(\)/);
 assert.match(main,/plasma\.foregroundNodeMeshes\]/);
 assert.doesNotMatch(main,/new DepthRenderer|new RenderTargetTexture/);
});
