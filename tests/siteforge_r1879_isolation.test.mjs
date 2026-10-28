import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base=readFileSync(new URL('../siteforge-r1878-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const cur=readFileSync(new URL('../siteforge-r1879-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const hash=s=>s.match(/script-src 'sha256-([^']+)'/)?.[1];
test('single inline JS CSP SHA is exact, no weakened security',()=>{
 const m=cur.match(/<script>([\s\S]*?)<\/script>/);assert.ok(m);
 assert.equal((cur.match(/<script>/g)||[]).length,1);
 assert.equal(hash(cur),createHash('sha256').update(m[1]).digest('base64'));
 assert.ok(!cur.includes("script-src 'unsafe-inline'"));
});
test('legacy schema and flow settings unchanged',()=>{
 const ids=(s,x)=>[...s.matchAll(new RegExp('data-'+x+'-control="([^"]+)"','g'))].map(m=>m[1]).sort();
 assert.equal(ids(cur,'sphere').length,18);
 assert.equal(ids(cur,'mote').length,10);
 assert.equal(ids(cur,'flow').length,4);
 for(const group of ['sphere','mote','flow'])assert.deepEqual(ids(cur,group),ids(base,group));
 const mat=cur.match(/<select id="sf-flowType"[\s\S]*?<\/select>/)?.[0];
 assert.equal((mat?.match(/<option value="[0-6]"/g)||[]).length,7);
 assert.ok(cur.includes("schema:'synestra.siteforge.plasma-settings.v1'"));
});
test('six palettes, three custom colors, accessible toggle',()=>{
 const choices=cur.match(/<select id="sf-energyPalette"[\s\S]*?<\/select>/)?.[0];
 for(const key of ['synestra','emerald','gold','electric','ice','rose','custom'])assert.ok(choices?.includes('value="'+key+'"'));
 assert.equal((cur.match(/data-energy-color="/g)||[]).length,3);
 assert.ok(cur.includes('data-energy-mouse-toggle aria-pressed="true"'));
 assert.ok(cur.includes('energyMouseEnabled=!energyMouseEnabled'));
 assert.ok(cur.includes('pointerForce=0;lastPointerX=null;lastPointerY=null'));
});
test('real mouse gating and WebGL palette uniforms confined to energy material',()=>{
 const start='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){';
 const end=' if(uPass>3.5&&uPass<4.5){';
 const a=cur.indexOf(start),b=cur.indexOf(end,a+start.length);
 assert.ok(a>0&&b>a);
 const shader=cur.slice(a,b);
 for(const v of ['uEnergyMouse','uEnergyA','uEnergyB','uEnergyCore','mouseKick=uPointer.z*uEnergyMouse','cyanNeon=uEnergyA','pinkNeon=uEnergyB'])assert.ok(shader.includes(v),v);
 for(const v of ['gl.uniform1f(U.uEnergyMouse','gl.uniform3fv(U.uEnergyA','gl.uniform3fv(U.uEnergyB','gl.uniform3fv(U.uEnergyCore'])assert.ok(cur.includes(v),v);
 assert.ok(!shader.includes('float cylinderA='));
});
test('energyVisual import is optional, strict, atomic, and exportable',()=>{
 assert.match(cur,/energyFlow,\s+energyVisual/);
 assert.ok(cur.includes("const ev=doc.energyVisual"));
 assert.ok(cur.includes('const nextVisual=ev===undefined?'));
 assert.ok(cur.indexOf('const nextVisual=')<cur.indexOf('for(const [k,v] of Object.entries(values.nextPlasma))'));
 assert.ok(cur.includes("energyMouseEnabled=visual.mouseEnabled"));
 assert.ok(cur.includes("energyPalette.value=visual.palette"));
 assert.ok(cur.includes("energyPalette.value='custom'"));
 assert.ok(cur.includes("energyMouseEnabled=true;energyPalette.value='synestra'"));
});
