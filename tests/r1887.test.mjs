import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../siteforge-r1887-autonome.html',import.meta.url),'utf8');
test('nucleus fields are sampled in XYZ',()=>assert.equal((s.match(/nucleusFlow3D\(q\/max/g)||[]).length,2));
