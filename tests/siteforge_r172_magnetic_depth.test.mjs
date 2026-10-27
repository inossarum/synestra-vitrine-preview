import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>{const u=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(u)+'\0'+u).digest('hex');};
const lab=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
const magnetic=lab.slice(lab.indexOf('}else if(uFlow.x<1.5){'),lab.indexOf('}else if(uFlow.x<2.5){'));
test('R172: preserve official core, approved sphere diameter and JSON ABI',()=>{
 assert.equal(sha(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(sha(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((lab.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
test('R172: improve only existing magnetic field with subtle 3D braiding, preserve closed spherical loop',()=>{
 assert.match(magnetic,/float fieldAngle=angle\*4\.\+q\.z\*6\.5/);
 assert.match(magnetic,/float fieldLoop=pow/);
 assert.match(magnetic,/float layering=pow/);
 assert.match(magnetic,/float depthRibbon=/);
 assert.match(magnetic,/float fineStrand=/);
 assert.match(magnetic,/float braidedPhase=angle\*8\./);
 assert.match(magnetic,/float flowingHighlight=/);
 assert.match(magnetic,/flowCurrents=fieldLoop\*/);
 assert.match(magnetic,/flowFog=\.54;/);
 assert.doesNotMatch(magnetic,/gl\.draw|uShell|uPass|noise3\(/);
});
test('R172: 5 material paths kept and UI labels magnetic prototype, no new shell or particles',()=>{
 for(const n of [".5","1.5","2.5","3.5"])assert.ok(lab.includes('uFlow.x<'+n));
 assert.match(html,/R172 · RUBANS 3D/);
 assert.match(html,/Rubans magnétiques/);
 assert.match(html,/Le noyau, les couleurs et le volume restent indépendants/);
});
