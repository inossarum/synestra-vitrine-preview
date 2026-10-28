import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const r=new URL('../',import.meta.url);
const js=readFileSync(new URL('assets/siteforge-lab-r166-flow.js',r),'utf8');
const html=readFileSync(new URL('siteforge/core-3d-lab/index.html',r),'utf8');
const sha=t=>{const b=Buffer.from(t);return createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex')};
const oldJS='49baa2104c4200f25ff9bde63b90fda4ba9d1c60';
const oldHTML='a76dbbbd16fcf9bb36b807413bab84c12d4adaaa';
test('R186: removing only inserted shader recovers exact R185 shader Git blob',()=>{
 const first=js.indexOf('  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){');
 const second=js.indexOf(' if(uPass>3.5&&uPass<4.5){\n  // True 3D ray integration.',first+10);
 assert.ok(first>0&&second>first);
 assert.equal(sha(js.slice(0,first)+js.slice(second)),oldJS);
});
test('R186: removing only seventh option recovers exact R185 HTML Git blob',()=>{
 const old='<option value="5">Courants liquides</option></select>';
 const added='<option value="5">Courants liquides</option><option value="6">Rubans néon 3D · R186</option></select>';
 assert.equal(html.split(added).length,2);
 assert.equal(sha(html.replace(added,old)),oldHTML);
});
test('R186: original six options, default 0, colors, A/B/C presets untouched',()=>{
 const match=html.match(/<select id="sf-flowType"[^>]*>(.*?)<\/select>/s);
 assert.ok(match);
 for(let i=0;i<7;i++)assert.match(match[1],new RegExp('<option value="'+i+'">'));
 assert.match(html,/data-sphere-control="flowType" data-default="0"/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 assert.equal((html.match(/data-art-preset=/g)||[]).length,3);
 assert.match(html,/data-sphere-control="secondary" type="color" value="#53318d"/);
 assert.match(html,/data-sphere-control="rim" type="color" value="#51dfff"/);
});
test('R186: 3D toroidal cyan/magenta depth remains one ray-march path',()=>{
 assert.match(js,/uFlow\.x>5\.5/);
 assert.match(js,/length\(a\.xy\),thetaA=atan\(a\.z,ra-\.52\)/);
 assert.match(js,/length\(b\.yz\),thetaB=atan\(b\.x,rb-\.51\)/);
 assert.match(js,/uSpinPhase/);
 assert.match(js,/float zNeon=halfNeon-\(float\(i\)\+\.5\)\*dzNeon/);
 assert.match(js,/if\(float\(i\)>=uVolumeSteps\)break/);
 assert.match(js,/gl_FragColor=vec4\(outNeon\+skyNeon,alphaNeon\*edgeNeon\*uEffects\.w\)/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.match(js,/gl_FragColor=vec4\(lightCol\*alpha,alpha\)/);
});
