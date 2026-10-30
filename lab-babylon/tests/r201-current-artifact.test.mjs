import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
test('R201 current GitHub gzip is intact and reconstructs the exact CI executable in memory',()=>{
 const gz=readFileSync(new URL('../dist/babylon-lab-r201-mist.js.gz',import.meta.url));
 assert.equal(gz.length,1646071);
 assert.equal(sha(gz),'a97b7fed6de8aa26a3d1ae3e5ba8c8e62963287737c804376a3538a459458043');
 const built=gunzipSync(gz);
 assert.equal(built.length,7407057);
 assert.equal(sha(built),'fe01472c48665f7759b8fb586f067b834b197359e63d0c28014fb2c17ff5d3f3');
 assert.ok(built.includes(Buffer.from('core-shell-fusion-r201')));
 assert.ok(built.includes(Buffer.from('visibleCoreMist')));
});
test('R201 historical gzip remains intact and independently reproducible',()=>{
 const gz=readFileSync(new URL('../dist/babylon-lab-r201.js.gz',import.meta.url));
 assert.equal(sha(gz),'5d21f008c4178969caaac0549e26a38a79d65bdd226831b10d861bf620c66042');
 const built=gunzipSync(gz);
 assert.equal(built.length,7406119);
 assert.equal(sha(built),'3f305842f11e9aef0f9a831d38e8c8a5eba7540f00de0237531e231415ccc2de');
});
