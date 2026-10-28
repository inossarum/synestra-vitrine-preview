import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const base=readFileSync(new URL('../siteforge-r187-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const next=readFileSync(new URL('../siteforge-r1871-autonome.html',import.meta.url),'utf8').replace(/\r\n/g,'\n');
const start='  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){';
const end=' if(uPass>3.5&&uPass<4.5){';
function branch(s){const a=s.indexOf(start),b=s.indexOf(end,a+start.length);assert.ok(a>=0&&b>a);return {a,b,text:s.slice(a,b)}}
const old=branch(base),newBranch=branch(next);
function hash(s){const m=s.match(/script-src 'sha256-([^']+)'/);assert.ok(m);return m[1]}
test('R187.1 retains 7 material controls and independent live clock',()=>{
 const select=next.match(/<select id="sf-flowType"[\s\S]*?<\/select>/)?.[0];
 assert.ok(select);assert.equal((select.match(/<option value="[0-6]"/g)||[]).length,7);
 assert.ok(newBranch.text.includes('float flowTime=uLabTime'));
 assert.ok(newBranch.text.includes('float bendA='));
 assert.ok(newBranch.text.includes('float bendB='));
 assert.ok(newBranch.text.includes('float bendC='));
 assert.ok(next.includes('gl.uniform1f(U.uLabTime,(now*.001)%3600)'));
 assert.equal(next.includes('if(minimum<.011)'),false);
});
test('R187.1 strict CSP script hash survives modifications',()=>{
 const m=next.match(/<script>([\s\S]*?)<\/script>/);
 assert.ok(m);
 assert.equal(hash(next),createHash('sha256').update(m[1]).digest('base64'));
 assert.equal(next.includes("script-src 'unsafe-inline'"),false);
});
test('R187 source is recoverable exactly; six historical materials preserved',()=>{
 let restored=next.slice(0,newBranch.a)+old.text+next.slice(newBranch.b);
 restored=restored.replace('\nuniform float uLabTime; // R187.1 energy flux time, material 6 only','');
 restored=restored.replace("'uMoteShape','uMoteFinish','uLabTime'];","'uMoteShape','uMoteFinish'];");
 restored=restored.replace('\n   gl.uniform1f(U.uLabTime,(now*.001)%3600); // R187.1: independent of particleSpeed','');
 restored=restored.replace('<title>SiteForge — Laboratoire énergétique 3D R187.1</title>','<title>SiteForge — Laboratoire énergétique 3D R187</title>');
 restored=restored.replace('Rubans énergétiques 3D · R187.1','Rubans néon 3D · R187');
 restored=restored.replace(hash(restored),hash(base));
 assert.equal(restored,base);
});
