import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const source=readFileSync(new URL('../siteforge-r1872-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const candidate=readFileSync(new URL('../siteforge-r1873-autonome.html',import.meta.url),'utf8').replace(/\r\n?/g,'\n');
const start='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){';
const end=' if(uPass>3.5&&uPass<4.5){';
const part=s=>{const a=s.indexOf(start),b=s.indexOf(end,a+start.length);assert.ok(a>=0&&b>a);return {a,b,text:s.slice(a,b)}};
const old=part(source),next=part(candidate);
const csp=s=>{const m=s.match(/script-src 'sha256-([^']+)'/);assert.ok(m);return m[1]};
const inline=s=>{const m=s.match(/<script>([\s\S]*?)<\/script>/);assert.ok(m);return m[1]};
test('exact strict CSP hash, not unsafe-inline',()=>{
 assert.equal(csp(candidate),createHash('sha256').update(inline(candidate)).digest('base64'));
 assert.equal(candidate.includes("script-src 'unsafe-inline'"),false);
});
test('isolate three shaded energy cylinder sections to flowType 6',()=>{
 for(const x of ['float bodyA=','float bodyB=','float bodyC=','float specA=','float specB=','float specC=','float cylinderA=','float cylinderB='])assert.ok(next.text.includes(x),x);
 assert.ok(next.text.includes('uLabTime'));
 assert.ok(!next.text.includes('if(minimum<.011)'));
 assert.ok(!next.text.includes('float minimum=min('));
});
test('full R187.2 source reconstructible outside material 6, labels and CSP',()=>{
 let oldHTML=candidate.slice(0,next.a)+old.text+candidate.slice(next.b);
 oldHTML=oldHTML.replace('<title>SiteForge — Laboratoire énergétique 3D R187.3</title>','<title>SiteForge — Laboratoire énergétique 3D R187.2</title>')
 .replace('Flux cylindriques vivants · R187.3','Flux énergétiques 3D · R187.2')
 .replace('LAB R187.3','LAB R187.2')
 .replace(csp(candidate),csp(source));
 assert.equal(oldHTML,source);
});
test('all seven materials, 18 scene and 10 mote controls survive cleanup',()=>{
 const options=s=>[...s.matchAll(/<option value="([0-6])"/g)].map(x=>x[1]);
 const controls=(s,re)=>[...s.matchAll(re)].map(x=>x[1]).sort();
 assert.deepEqual(options(candidate),options(source));
 assert.equal(controls(candidate,/data-sphere-control="([^"]+)"/g).length,18);
 assert.equal(controls(candidate,/data-mote-control="([^"]+)"/g).length,10);
 assert.deepEqual(controls(candidate,/data-sphere-control="([^"]+)"/g),controls(source,/data-sphere-control="([^"]+)"/g));
 assert.deepEqual(controls(candidate,/data-mote-control="([^"]+)"/g),controls(source,/data-mote-control="([^"]+)"/g));
 assert.ok(candidate.includes('data-lab-optional'));
 assert.ok(candidate.includes('data-export-json')&&candidate.includes('data-import-json'));
});
test('extra material keeps independent motion and translucent volumetric output',()=>{
 assert.ok(next.text.includes('flowTime=uLabTime'));
 assert.ok(next.text.includes('gl_FragColor=vec4(outNeon+skyNeon,alphaNeon*edgeNeon*uEffects.w)'));
 assert.ok(!next.text.includes('gl_FragColor=vec4(light,.94*uEffects.w)'));
});
