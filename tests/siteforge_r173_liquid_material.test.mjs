import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const blob=s=>{const v=s.replace(/\r\n/g,'\n');return createHash('sha1').update('blob '+Buffer.byteLength(v)+'\0'+v).digest('hex')};
const js=read('assets/siteforge-lab-r166-flow.js'),html=read('siteforge/core-3d-lab/index.html');
test('R173: approved home and Core are byte-identical; one canvas 18 JSON parameters',()=>{
 assert.equal(blob(read('index.html')),'1413e30138ba1657f7056401818e697ddbd32ac8');
 assert.equal(blob(read('assets/siteforge-r116-sphere-only.js')),'dd63d75fdb966de2052595c95b7b6cb736d6c7cc');
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
});
test('R173: sixth genuine liquid material without changing other five material branches',()=>{
 assert.match(html,/<option value="5">Courants liquides<\/option>/);
 for(let i=0;i<6;i++)assert.match(html,new RegExp('<option value="'+i+'">'));
 assert.match(js,/else if\(uFlow\.x<4\.5\)/);
 const material=js.slice(js.indexOf('// R173.1: spherical'),js.indexOf('float currents=0.;'));
 for(const key of ['liquidPhase','liquidSheet','liquidCurl','curlingWake','liquidEdge','depthTide','travellingCrest'])assert.match(material,new RegExp('float '+key+'='));
 assert.match(material,/flowCurrents=\(liquidMain/);
 assert.match(material,/flowFog=\.36/);
 assert.doesNotMatch(material,/gl\.create|gl\.draw|texture2D|sampler2D/);
});
test('R173: direct demo and button, preserve magnetic A/B and its behavior',()=>{
 assert.match(html,/R173.1 · LIQUIDE SPHÉRIQUE/);
 assert.match(html,/data-liquid-demo/);
 assert.match(html,/data-magnetic-compare-hint hidden/);
 assert.match(js,/compareHint.hidden=sel\('flowType'\)!==1/);
 assert.match(js,/if\(launchDemo==='liquid'\)applyLiquidDemo\(\)/);
 assert.match(js,/flowType','5/);
 assert.match(js,/if\(launchDemo==='magnetic'\)applyDemo\(\)/);
 assert.match(html,/data-magnetic-compare="r171"/);
 assert.match(html,/data-magnetic-compare="r172"/);
 assert.match(js,/gl\.uniform1f\(U\.uCompare,compareVariant\)/);
});
