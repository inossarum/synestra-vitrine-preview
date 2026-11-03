import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {synchronizeFacetLifecycle} from '../src/facet-lifecycle.mjs';

const sourceCode=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
function mesh({enabled=true,isVisible=true,visibility=1}={}){
 return {
  _enabled:enabled,isVisible,visibility,
  isEnabled(){return this._enabled},
  setEnabled(value){this._enabled=Boolean(value)}
 };
}
function fixture(){
 const core=mesh(),mask=mesh(),sources=Array.from({length:6},()=>mesh()),foreground=Array.from({length:6},()=>mesh());
 return {core,mask,sources,foreground,power:1.45,radius:1};
}
function result(f){return synchronizeFacetLifecycle(f)}
test('failure-first: missing/incorrect six-node shape rejected without mutation',()=>{
 const f=fixture();
 assert.throws(()=>result({...f,foreground:f.foreground.slice(1)}),/INPUTS_INVALID/);
 assert.equal(f.mask.isEnabled(),true);
 assert.equal(f.foreground.every(x=>x.isEnabled()),true);
});
test('failure-first: NaN controls revoke stale mask and foreground before error',()=>{
 for(const invalid of [{power:NaN},{power:Infinity},{radius:NaN},{radius:-Infinity}]){
  const f=fixture();
  assert.throws(()=>result({...f,...invalid}),/NUMERIC_INVALID/);
  assert.equal(f.mask.isEnabled(),false);
  assert.equal(f.foreground.every(x=>!x.isEnabled()),true);
 }
});
test('power off immediately clears invisible mask and all six foreground streams',()=>{
 const f=fixture();
 assert.deepEqual(result(f),{maskActive:true,foregroundCount:6});
 f.power=0;
 assert.deepEqual(result(f),{maskActive:false,foregroundCount:0});
 assert.equal(f.mask.isEnabled(),false);
 assert.equal(f.foreground.every(x=>!x.isEnabled()),true);
 f.power=1.45;
 assert.deepEqual(result(f),{maskActive:true,foregroundCount:6});
});
test('zero radius, disabled core, hidden core and opacity zero fail closed',()=>{
 const variants=[
  f=>{f.radius=0},
  f=>{f.core.setEnabled(false)},
  f=>{f.core.isVisible=false},
  f=>{f.core.visibility=0}
 ];
 for(const change of variants){
  const f=fixture();change(f);
  assert.deepEqual(result(f),{maskActive:false,foregroundCount:0});
  assert.equal(f.foreground.every(x=>!x.isEnabled()),true);
 }
});
test('quality budget and source visibility cannot resurrect an invisible stream',()=>{
 const f=fixture();
 f.sources[1].setEnabled(false);
 f.sources[2].isVisible=false;
 f.sources[3].visibility=0;
 assert.deepEqual(result(f),{maskActive:true,foregroundCount:3});
 assert.equal(f.foreground[1].isEnabled(),false);
 assert.equal(f.foreground[2].isEnabled(),false);
 assert.equal(f.foreground[3].isEnabled(),false);
 f.sources[1].setEnabled(true);
 f.sources[2].isVisible=true;
 f.sources[3].visibility=1;
 assert.deepEqual(result(f),{maskActive:true,foregroundCount:6});
});
test('source integration runs per frame after geometry cadence check and before scene.render',()=>{
 const a=sourceCode.indexOf('const geometryStep=geometryUpdateDecision');
 const b=sourceCode.indexOf('if(geometryStep.update)');
 const c=sourceCode.indexOf('const facetState=synchronizeFacetLifecycle');
 const e=sourceCode.indexOf('scene.render();');
 assert.ok(a>=0&&b>a&&c>b&&e>c);
 assert.match(sourceCode,/core\.rotation\.y=time\*\.18;\s*\/\/ R202\.29/);
 assert.match(sourceCode,/mask:coreDepthMask,sources:plasma\.nodeMeshes,foreground:plasma\.foregroundNodeMeshes,power,radius:r/);
 assert.match(sourceCode,/cv\.dataset\.facetMaskActive=String\(facetState\.maskActive\)/);
 assert.match(sourceCode,/cv\.dataset\.facetForegroundActive=String\(facetState\.foregroundCount\)/);
 assert.match(sourceCode,/coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(sourceCode,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
});
