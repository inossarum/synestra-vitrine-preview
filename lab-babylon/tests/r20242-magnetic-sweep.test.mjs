import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
import{Vector3}from'@babylonjs/core';
import{shellAnchorPair}from'../src/shell-coverage.js';
import{organicPlasmaCenterline,organicPlasmaRibbonPaths}from'../src/plasma-ribbons.js';
const src=readFileSync(new URL('../src/plasma-ribbons.js',import.meta.url),'utf8');
const dirs=[[-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],[.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]].map(p=>new Vector3(...p).normalize());
test('R202.42 coherent 3D magnetic twist occupies existing 28 rails; anchors remain fixed',()=>{
 assert.match(src,/const magneticTwist=\.15\*Math\.pow\(envelope,1\.45\)\*Math\.sin\(u\*TWOPI\*\(1\.35\+orbit\*\.13\)\+phase\*\.41\+time\*\.22\);/);
 assert.match(src,/\.add\(side\.scale\(\.23\*envelope\*Math\.sin\(u\*TWOPI\*\(1\.25\+orbit\*\.32\)\+phase\+time\*\.11\)\+magneticTwist\)\)/);
 assert.match(src,/const radius=1\.54-inner\*envelope\+\.09\*envelope\*Math\.sin/);
 for(let i=0;i<28;i++){const path=organicPlasmaCenterline(i,1.4,dirs),[a,b]=shellAnchorPair(i);
  assert.equal(path.length,85);assert.ok(Vector3.Distance(path[0],new Vector3(...a).scale(1.54))<1e-7);
  assert.ok(Vector3.Distance(path.at(-1),new Vector3(...b).scale(1.54))<1e-6);
  assert.ok(path.every(x=>Number.isFinite(x.x)&&Number.isFinite(x.y)&&Number.isFinite(x.z)&&x.length()>.6&&x.length()<1.8));
  assert.equal(organicPlasmaRibbonPaths(path,i,1.4).length,5);
 }
});
test('R202.42 magnetic twist is animated and bounded, no new scene or mesh passes',()=>{
 let nontrivial=0;
 for(let i=0;i<28;i++){const a=organicPlasmaCenterline(i,0,dirs),b=organicPlasmaCenterline(i,2.4,dirs);
  nontrivial+=Vector3.Distance(a[42],b[42]);for(let j=1;j<a.length;j++)assert.ok(Vector3.Distance(a[j],a[j-1])<.24,'discontinuous path '+i+'/'+j);
 }
 assert.ok(nontrivial>.3);
 assert.match(src,/field.scale\(\.74\*Math.pow\(envelope,1\.25\)\)/);
 assert.match(src,/const RAILS=\[-1,-\.55,0,\.55,1\], STEPS=84/);
 assert.doesNotMatch(src,/new Scene\(|new Engine\(/);
});
