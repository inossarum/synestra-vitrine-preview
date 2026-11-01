import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('R202.35 hide redundant legacy cylindrical node links',()=>{
 assert.match(s,/const m=bridges\[i\],visible=power>0&&\(quality!=='economy'\|\|i<3\);/);
 assert.match(s,/m\.setEnabled\(false\);energyNodes\[i\]\.setEnabled\(visible\);/);
 assert.match(s,/aura\.setEnabled\(false\);/);
 assert.match(s,/const auraVisible=visible&&i<veilCount;/);
});
test('R202.35 preserve 80 facets, GPU ribbon connectors and rollback source',()=>{
 assert.match(s,/CreateIcoSphere\('central nucleus',\{radius:\.38,subdivisions:2\}/);
 assert.match(s,/const coreDepthMask=core\.clone\('central nucleus facet depth mask',core,true\)/);
 assert.match(s,/bridgeVeils\.push\(wire\('core-shell soft aura '/);
 assert.match(s,/bridges\.push\(wire\('heart-to-node-flux-'/);
 assert.match(s,/installPlasmaRibbons\(\{scene,colors:/);
 assert.match(s,/plasma\.update\(\{time,quality,parent:sphereRoot,/);
 assert.match(s,/visibleCoreShellSheaths=String\(bridgeVeils\.filter\(m=>m\.isEnabled\(\)\)\.length\)/);
});
