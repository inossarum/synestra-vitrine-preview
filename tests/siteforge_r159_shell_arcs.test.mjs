import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('assets/siteforge-r116-sphere-only.js');
const html=read('siteforge/core-3d-lab/index.html');
const volume=js.slice(js.indexOf('const fragment='),js.indexOf('function compile('));

test('R159: shell visibility controls only shell haze/rim, never interior flow currents',()=>{
 assert.match(volume,/float shellFog=.*uShape\.y/);
 assert.match(volume,/float density=\(shellFog\+currents\*\.27\*emission\+/);
 assert.doesNotMatch(volume,/currents\*\.27\*emission\*uShape\.y/);
 assert.match(volume,/rimTint\*rim\*uShape\.y/);
 assert.match(volume,/coreScreen\*\.69/);
});

test('R159: lightning is an explicit electrical-mode-only option, hidden for other materials',()=>{
 assert.match(html,/<fieldset[^>]+data-electric-options[^>]+hidden/);
 assert.match(js,/const electricalMode=sel\('flowType'\)===0&&preset===1/);
 assert.match(js,/const lightningCount=electricalMode&&num\('arcIntensity'\)>0&&num\('arcDensity'\)>0/);
 assert.match(js,/arcPanel\.hidden=!electricMode/);
 assert.match(html,/Plasma électrique/);
});

test('R159: actual connected lightning segments instead of disconnected GPU point sprites',()=>{
 assert.match(js,/float segment=floor\(i\/2\.\)/);
 assert.match(js,/bead=mod\(segment,29\.\)\+mod\(i,2\.\)/);
 assert.match(js,/gl\.drawArrays\(gl\.LINES,0,lightningCount\)/);
 assert.match(volume,/if\(uPass>1\.5&&uPass<2\.5\)\{/);
 assert.match(js,/gl\.drawArrays\(gl\.TRIANGLES,0,6\)/);
});

test('R159: preserve geometry, material presets, export and 18 legacy settings',()=>{
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
 assert.equal((html.match(/<canvas /g)||[]).length,1);
});
