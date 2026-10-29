import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=n=>readFileSync(new URL('../'+n,import.meta.url),'utf8').replaceAll(String.fromCharCode(13,10),String.fromCharCode(10));
const html=read('siteforge-r189-autonome.html');
test('R189 constrained WebGL recovery UI',()=>{for(const x of ['data-gpu-reload','gpuStatus','webglcontextlost','Relancer le moteur 3D'])assert.ok(html.includes(x),x);});
test('CSP exact and single renderer canvas',()=>{const script=html.split('<script>')[1].split('</script>')[0];assert.ok(html.includes("script-src 'sha256-"+createHash('sha256').update(script).digest('base64')+"'"));assert.equal(html.split('<canvas ').length,2);});
test('native recovery and reduced motion in Chrome',()=>{const r=JSON.parse(read('evidence/SITEFORGE_LAB_R189_BROWSER_20261029.json'));assert.equal(r.status,'PASS');assert.equal(r.recovery.status,'PASS');assert.equal(r.reducedMotion.status,'PASS');for(const w of [1100,390])for(const mode of [0,1,2,3]){const e=r.screens.find(x=>x.version==='189'&&x.width===w&&x.mode===mode);assert.ok(e);assert.equal(e.state.error,0);}});
