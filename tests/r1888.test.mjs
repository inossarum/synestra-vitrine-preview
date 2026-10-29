import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../siteforge-r1888-autonome.html',import.meta.url),'utf8');
test('presets versioned with A/B controls',()=>{for(const part of ['nucleus-presets.v1','save-a','save-b','load-a','load-b','snapshotSlots'])assert.ok(s.includes(part),part);});
test('fixed capture clock with bounded input',()=>{for(const part of ['labFrame','labFrameValue<=60','captureClock','fixedFrame===null'])assert.ok(s.includes(part),part);});
test('browser A/B and fixed screenshot passed',()=>{const j=JSON.parse(readFileSync(new URL('../evidence/SITEFORGE_LAB_R1888_BROWSER_20261029.json',import.meta.url),'utf8'));assert.equal(j.status,'PASS');assert.equal(j.presetAB.status,'PASS');assert.equal(j.presetAB.restoredA,'2');assert.equal(j.presetAB.restoredB,'1');});
