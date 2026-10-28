import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const base=readFileSync(new URL('../siteforge-r186-autonome.html',import.meta.url),'utf8');
const next=readFileSync(new URL('../siteforge-r187-autonome.html',import.meta.url),'utf8');
const head="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){";
const tail=" if(uPass>3.5&&uPass<4.5){";
function extract(s) {
 const a=s.indexOf(head), b=s.indexOf(tail,a+head.length);
 assert.ok(a>=0&&b>a,'material6 isolated shader branch');
 return [a,b,s.slice(a,b)];
}
const [a,b,legacy]=extract(base);
const [c,e,changed]=extract(next);
const digest=s=>createHash('sha256').update(s.replace(/\r\n?/g,'\n')).digest('base64');
const inline=s=>{const m=s.match(/<script>([\s\S]*?)<\/script>/);assert.ok(m);return m[1]};
const hash=s=>{const m=s.match(/script-src 'sha256-([^']+)'/);assert.ok(m);return m[1]};
test('R187 uses a scoped seventh material shader only',()=>{
 assert.equal(base.slice(0,a).includes('value="6"'),true);
 assert.equal(changed.includes('R187 REFINED NEW MATERIAL ONLY'),true);
 assert.equal(changed.includes('uPass>3.5'),true);
 const selector=next.match(/<select id="sf-flowType"[\s\S]*?<\/select>/)?.[0];
 assert.ok(selector,'material selector exists');
 assert.equal(selector.match(/<option value="[0-6]"/g).length,7);
 assert.equal((next.match(/data-default="0"/g)||[]).length,(base.match(/data-default="0"/g)||[]).length);
});
test('R187 old materials untouched byte for byte',()=>{
 let reconstructed=next.slice(0,c)+legacy+next.slice(e);
 reconstructed=reconstructed.replace('<title>SiteForge — Laboratoire énergétique 3D R187</title>','<title>SiteForge — Laboratoire énergétique 3D R185</title>')
 .replace('Rubans néon 3D · R187','Rubans néon 3D · R186')
 .replace(hash(reconstructed),hash(base));
 assert.equal(reconstructed,base);
});
test('CSP sha256 matches inline script exactly, without unsafe-inline',()=>{
 assert.equal(hash(next),digest(inline(next)));
 assert.equal(next.includes("script-src 'unsafe-inline'"),false);
});
test('R186 baseline remains intact, real R187 delta is not a mislabeled copy',()=>{
 assert.notEqual(legacy,changed);
 assert.ok(changed.includes('float shellA=exp(-pow((tubeA-.23)*25.,2.));'));
 assert.ok(changed.includes('uCore*coreNeon*.35'));
});
