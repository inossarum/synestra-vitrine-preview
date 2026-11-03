import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../style.css',import.meta.url),'utf8');
test('mobile settings cannot be covered by a sticky 3D viewport',()=>{
  assert.match(css,/@media\(max-width:850px\)[^\n]*\.viewport\{position:relative;top:auto;z-index:1\}/);
});
test('mobile users have a labelled direct camera distance input, independent of pinch',()=>{
  assert.match(html,/for="camera-distance"/);
  assert.match(html,/id="camera-distance" min="280" max="700" step="10" value="480"/);
  assert.match(html,/Zoom : curseur/);
  assert.doesNotMatch(html,/Glisser : orbite · Molette : zoom/);
});
test('camera control changes only existing Babylon camera radius and resets safely',()=>{
  assert.match(main,/const distanceControl=document\.getElementById\('camera-distance'\)/);
  assert.match(main,/scene\.activeCamera\.radius=Number\(distanceControl\.value\)\/100/);
  assert.match(main,/distanceControl\.addEventListener\('input',syncCameraDistance\)/);
  assert.match(main,/distanceControl\.value='480';syncCameraDistance\(\)/);
  assert.match(main,/new ArcRotateCamera\('orbit'/);
  assert.equal((main.match(/new ArcRotateCamera\(/g)||[]).length,1);
});
