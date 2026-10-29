import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('../siteforge-r1889-autonome.html',import.meta.url),'utf8');
const packet=JSON.parse(readFileSync(new URL('../evidence/SITEFORGE_LAB_R1889_BROWSER_20261029.json',import.meta.url),'utf8'));
test('GPU timing guarded by supported extension',()=>{for(const x of ['EXT_disjoint_timer_query','GPU_DISJOINT_EXT','QUERY_RESULT_AVAILABLE_EXT','GPU :']){}assert.ok(code.includes('EXT_disjoint_timer_query'));assert.ok(code.includes('GPU_DISJOINT_EXT'));assert.ok(code.includes('gpuQuery'));});
test('108 native browser shader and quality matrix',()=>{assert.equal(packet.status,'PASS');assert.equal(packet.matrix.cases.length,108);assert.ok(packet.matrix.cases.every(c=>c.error===0&&c.energySamples>=24&&c.energySamples<=40));});
test('No invalid metric if hardware extension absent',()=>{assert.ok(code.includes('unsupported'));assert.ok(code.includes('unavailable'));assert.equal(packet.matrix.validGpuSamples,108);});
