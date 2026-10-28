import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const js=readFileSync(new URL('../assets/siteforge-lab-r166-flow.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../siteforge/core-3d-lab/index.html',import.meta.url),'utf8');
const pick=(start,end,name)=>{
 const a=js.indexOf(start),b=js.indexOf(end,a);
 assert.ok(a>0&&b>a,name+' source anchors');
 return js.slice(a,b).trim();
};
const chooseSource=pick('const chooseVolumeSteps=','// Hysteresis','chooseVolumeSteps');
const autoSource=pick('const nextAutoPenalty=','function resize()','nextAutoPenalty');
const ctx=runInNewContext(chooseSource+'\n'+autoSource+'\n({chooseVolumeSteps,nextAutoPenalty})',{Math});
const {chooseVolumeSteps,nextAutoPenalty}=ctx;
test('R183 four quality modes actually select bounded WebGL1 volume steps',()=>{
 assert.equal(chooseVolumeSteps(true,14,'balanced',0),14);
 assert.equal(chooseVolumeSteps(true,12,'balanced',0),12);
 assert.equal(chooseVolumeSteps(false,22,'balanced',0),22);
 assert.equal(chooseVolumeSteps(true,14,'performance',0),10);
 assert.equal(chooseVolumeSteps(false,22,'performance',0),16);
 assert.equal(chooseVolumeSteps(true,14,'quality',0),18);
 assert.equal(chooseVolumeSteps(false,22,'quality',0),22);
 assert.equal(chooseVolumeSteps(true,14,'auto',0),14);
 assert.equal(chooseVolumeSteps(true,14,'auto',1),12);
 assert.equal(chooseVolumeSteps(true,12,'auto',2),8);
 assert.equal(chooseVolumeSteps(false,22,'auto',2),16);
 assert.equal(chooseVolumeSteps(false,22,'auto',12),14);
});
test('R183 quality hysteresis ignores cold start, short slow spikes and cool-down',()=>{
 assert.equal(nextAutoPenalty(0,90,12,10000,0),0);
 assert.equal(nextAutoPenalty(0,90,25,2000,0),0);
 assert.equal(nextAutoPenalty(0,90,25,4000,0),1);
 assert.equal(nextAutoPenalty(1,90,80,4000,0),2);
 assert.equal(nextAutoPenalty(2,90,80,9500,0),2);
 assert.equal(nextAutoPenalty(2,40,80,5000,0),2);
 assert.equal(nextAutoPenalty(2,40,80,10000,0),1);
 assert.equal(nextAutoPenalty(1,48,80,10000,0),1);
});
test('R183 cadence telemetry has explicit limit, excludes stalled tabs and hides GPU attribution',()=>{
 assert.match(js,/frameDelta>=32&&frameDelta<250/);
 assert.match(js,/frameDelta>=250/);
 assert.match(js,/cadenceMs=cadenceSamples===0\?frameDelta:cadenceMs\*\.88\+frameDelta\*\.12/);
 assert.match(js,/lastFrame&&now-lastFrame<32/);
 assert.match(js,/stage\.dataset\.renderFps=cadenceFps\.toFixed\(1\)/);
 assert.match(html,/pas un benchmark du GPU physique/);
});
test('R183 all modes selectable with accessible markup; old JSON schema untouched',()=>{
 const modes=['balanced','auto','performance','quality'];
 assert.equal((html.match(/data-render-quality/g)||[]).length,1);
 for(const m of modes)assert.match(html,new RegExp('<option value="'+m+'"'));
 assert.match(html,/data-quality-fps/);
 assert.match(html,/data-quality-steps/);
 assert.equal((html.match(/data-sphere-control=/g)||[]).length,18);
 assert.equal((html.match(/data-mote-control=/g)||[]).length,10);
 assert.match(js,/schema:'synestra\.siteforge\.plasma-settings\.v1'/);
 assert.match(js,/version:1,/);
 assert.match(js,/if\(qualitySelect\)qualitySelect\.value='balanced'/);
});
test('R183 shader, shared clock, orbit and old mobile baseline preserved',()=>{
 assert.match(js,/for\(int i=0;i<22;i\+\+\)/);
 assert.match(js,/const mobileDense=mobile&&\(canvas\.width\*canvas\.height>240000\|\|moteCount>75\)/);
 assert.match(js,/const baselineSteps=mobile\?\(mobileDense\?12:14\):22/);
 assert.match(js,/gl\.uniform1f\(U\.uVolumeSteps,volumeSteps\)/);
 assert.match(js,/const spinPhase=elapsed\*\.104/);
 assert.match(js,/stage\.dataset\.moteSpinPhase=spinPhase\.toFixed\(4\)/);
 assert.equal((js.match(/gl\.createProgram\(\)/g)||[]).length,1);
});
