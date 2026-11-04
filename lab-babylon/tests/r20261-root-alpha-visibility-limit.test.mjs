/**
 * R202.61 analytic regression for the REJECTED rootGlow hypothesis.
 * Source-only Node tests: NOT a GPU fragment-visibility or artistic E2E test.
 * Verifies why near-node alpha adds opacity mainly inside the core,
 * plus a numerically tiny residue at the far node endpoint.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleCoreShellFlow, FLOW_SEED_RADIUS, FLOW_NODE_COUNT} from '../src/core-shell-flow.mjs';

const NODE_DIRECTIONS=[
 [-.54,.71,.46],[.70,.58,.38],[-.73,-.32,.47],
 [.70,-.55,.29],[-.02,-.92,.40],[.32,.89,-.38]
];
const TIMES=[0,.3,1,4,18];
const SEGMENTS=72;
const CORE_RADIUS=.38;
const CORE_INRADIUS=.38*Math.sqrt((5+2*Math.sqrt(5))/15);
const radius=p=>Math.hypot(...p);
const clamp01=n=>Math.max(0,Math.min(1,n));
const originalFade=k=>clamp01(Math.sin(Math.PI*k/SEGMENTS)*3.2);
const rejectedRootFade=k=>clamp01(originalFade(k)+.90*Math.pow(1-k/SEGMENTS,4));

// A conservative geometric bound; no claim that an actual GPU fragment is hidden.
test('R202.61 checks exact 6-source flow contract and 73 points',()=>{
 assert.equal(FLOW_NODE_COUNT,6);
 assert.equal(FLOW_SEED_RADIUS,.085);
 for(const time of TIMES)for(let node=0;node<FLOW_NODE_COUNT;node++){
  const path=sampleCoreShellFlow(node,time,NODE_DIRECTIONS,SEGMENTS);
  assert.equal(path.length,SEGMENTS+1);
  assert.ok(path.every(p=>p.length===3&&p.every(Number.isFinite)));
  assert.ok(Math.abs(radius(path[0])-FLOW_SEED_RADIUS)<1e-9);
 }
});

test('R202.61 rootGlow affects eight core samples and only a tiny outer-tail residue',()=>{
 const changed=[];
 for(let k=0;k<=SEGMENTS;k++){
  if(rejectedRootFade(k)>originalFade(k)+1e-12)changed.push(k);
 }
 assert.deepEqual(changed,[0,1,2,3,4,5,6,7,65,66,67,68,69,70,71]);
 assert.ok(originalFade(7)<1);
 assert.equal(originalFade(8),1);
 for(let k=8;k<=64;k++)assert.ok(Math.abs(rejectedRootFade(k)-originalFade(k))<1e-12);
 for(let k=65;k<SEGMENTS;k++)assert.ok(rejectedRootFade(k)-originalFade(k)<.000081);
 assert.ok(Math.abs(rejectedRootFade(SEGMENTS)-originalFade(SEGMENTS))<1e-12);
});

test('R202.61 all affected centerline points are inside the conservative core inradius',()=>{
 assert.ok(CORE_INRADIUS>.30&&CORE_INRADIUS<CORE_RADIUS);
 for(const time of TIMES)for(let node=0;node<FLOW_NODE_COUNT;node++){
  const path=sampleCoreShellFlow(node,time,NODE_DIRECTIONS,SEGMENTS);
  for(let k=0;k<8;k++){
   assert.ok(radius(path[k])<.30,`node ${node}, time ${time}, k ${k}: ${radius(path[k])}`);
  }
 }
});

test('R202.61 flow centerlines leave core bounding sphere only at index 15',()=>{
 for(const time of TIMES)for(let node=0;node<FLOW_NODE_COUNT;node++){
  const path=sampleCoreShellFlow(node,time,NODE_DIRECTIONS,SEGMENTS);
  const firstOutside=path.findIndex(p=>radius(p)>=CORE_RADIUS);
  assert.equal(firstOutside,15,`node ${node}, time ${time}`);
  assert.equal(originalFade(firstOutside),1);
  assert.equal(rejectedRootFade(firstOutside),1);
 }
});

test('R202.61 five-rail width bounds keep all boosted root vertices inside the core',()=>{
 let maxVertexRadiusBound=0;
 for(const time of TIMES)for(let node=0;node<FLOW_NODE_COUNT;node++){
  const path=sampleCoreShellFlow(node,time,NODE_DIRECTIONS,SEGMENTS);
  const ribbonIndex=node+100;
  for(let k=0;k<8;k++){
   const u=k/SEGMENTS;
   // organicPlasmaRibbonPaths uses base=.095 and rails in [-1,1].
   const flare=.28+.72*Math.pow(Math.sin(Math.PI*u),.58);
   const irregular=1+.19*Math.sin(u*2*Math.PI*(2+ribbonIndex%4)+ribbonIndex*.9+time*.37);
   const width=.095*flare*irregular;
   const upperBound=radius(path[k])+width;
   maxVertexRadiusBound=Math.max(maxVertexRadiusBound,upperBound);
   assert.ok(upperBound<CORE_INRADIUS,`near-node ribbon ${node}, time ${time}, index ${k}: ${upperBound}`);
  }
 }
 assert.ok(maxVertexRadiusBound<=.300357);
});

test('R202.61 analytic scope does not substitute for real rasterized stencil proof',()=>{
 // The face-level stencil, ribbon width and pixel occlusion require GPU E2E.
 const scope={centerline_only:true,ribbon_vertices_measured:false,
  gpu_stencil_fragments_measured:false,art_signoff:false};
 assert.equal(scope.centerline_only,true);
 assert.equal(scope.gpu_stencil_fragments_measured,false);
 assert.equal(scope.art_signoff,false);
});
