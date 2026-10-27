import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../assets/siteforge-r116-sphere-only.js',import.meta.url),'utf8');
const fragment=js.slice(js.indexOf('const fragment='),js.indexOf('function compile('));
const volumetric=fragment.slice(fragment.indexOf('if(uPass>3.5){'),fragment.indexOf('if(uPass>1.5&&uPass<2.5){'));
const organic=volumetric.slice(volumetric.indexOf('if(uFlow.x<.5){'),volumetric.indexOf('}else if(uFlow.x<1.5){'));
test('R162: primary plasma uses depth-varying warped filament trajectories instead of five repeating blades',()=>{
 for(const keyword of ['float organicLane=','float depthTwist=','float primaryVein=','float hairline=','float pulse=','float wander='])assert.ok(organic.includes(keyword),keyword);
 assert.ok(!organic.includes('float ribbon=pow(max(0.,.5+.5*cos(winding))'),'old blade retained');
 assert.ok(organic.includes('q.z'),'3D depth coupling absent');
});
test('R162: filaments mix at least three independent spatial scales; preserve energy material boundaries',()=>{
 for(const marker of ['float primaryVein=','float tributary=','float hairline=','float wisp='])assert.ok(organic.includes(marker),marker);
 assert.ok(organic.includes('flowCurrents='),'material output missing');
 for(const family of ['}else if(uFlow.x<1.5){','}else if(uFlow.x<2.5){','}else if(uFlow.x<3.5){'])assert.ok(volumetric.includes(family),family);
});
test('R162: shape, shell-free treatment, JSON and one WebGL renderer stay unchanged',()=>{
 assert.equal((html.match(/<canvas /g)||[]).length,1);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.ok(js.includes("schema:'synestra.siteforge.plasma-settings.v1'"));
 assert.ok(!volumetric.includes('shellFog='));
 assert.ok(js.includes('gl.drawArrays(gl.TRIANGLES,0,6)'));
 for(const key of ['sf-shellVisibility','sf-particleDensity','sf-particleSize'])assert.ok(html.includes('id="'+key+'" type="hidden"')||new RegExp('id="'+key+'"[^>]*type="hidden"').test(html),key);
});
