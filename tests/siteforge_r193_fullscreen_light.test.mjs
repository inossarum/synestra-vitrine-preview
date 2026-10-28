import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const read=(name)=>readFileSync(join(root,name),'utf8');
const source=read('r192/index.html');
const home=read('r193/index.html');
const style=read('assets/r193-experience.css');
const originalShader=read('assets/siteforge-r190-hover-flux.js');
const sourceHash=createHash('sha256').update(source).digest('hex');
const originalHash=createHash('sha256').update(originalShader).digest('hex');
const routes=['','connect/','bridge/','siteforge/','offres/'];

test('R193 source immutable, shader unchanged, one WebGL canvas',()=>{
 assert.equal(sourceHash,'3f1774eced877fd688d6423fef572b316a904bc367d1edcd508dff01f61c2416');
 assert.equal(originalHash,'d5b64dfccba2096d6cc6f1198a4656c6320569ff627caf11f84fb5eb0e493eae');
 assert.equal((home.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 assert.match(home,/siteforge-r190-hover-flux\.js/);
});
test('R193 reflection removed from source and original mirror DOM',()=>{
 assert.doesNotMatch(style,/-webkit-box-reflect|box-reflect:below|r192-floor-reflection|@keyframes r192-reflected-light/);
 assert.doesNotMatch(home,/class="r192-floor-reflection"/);
 assert.match(style,/filter:none!important;animation:none!important/);
 assert.match(style,/radial-gradient/);
});
test('R193 full first viewport, editorial remains below fold',()=>{
 assert.match(home,/class="r189-composition syn-r191 syn-r191-home syn-r192-home syn-r193-home"/);
 assert.match(style,/height:100svh/);
 assert.match(style,/\.syn-r193-home > \.skip\{position:absolute!important/);
 assert.ok(home.indexOf('<h1')>home.indexOf('class="r192-hero-outro"'));
 assert.equal((home.match(/<h1\b/g)||[]).length,1);
 assert.match(home,/<section class="r192-hero" aria-label=/);
 assert.match(home,/href="#plateforme"/);
});
test('R193 purple / green from sampled official logo, foreground and background',()=>{
 assert.match(style,/--r193-violet:#552a9d/);
 assert.match(style,/--r193-green:#2d9c6e/);
 assert.match(home,/data-default="#552a9d" value="#552a9d"/);
 assert.match(home,/data-default="#55d49a" value="#55d49a"/);
 assert.match(style,/rgba\(133,76,218,\.25\)/);
 assert.match(style,/rgba\(60,186,128,\.28\)/);
});
test('R193 five pages keep shared assets and internal routes',()=>{
 for(const path of routes){
  const html=read('r193/'+path+'index.html');
  assert.equal((html.match(/r193-experience\.css/g)||[]).length,1);
  assert.equal((html.match(/r192-experience\.js/g)||[]).length,1);
  assert.match(html,/noindex,nofollow/);
  for(const ref of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const url=ref[1];
   if(!url||url.startsWith('#')||/^https?:/.test(url))continue;
   const resolved=new URL(url,'http://localhost/r193/'+path);
   const target=join(root,resolved.pathname.replace(/^\//,''));
   assert.ok(existsSync(target)||existsSync(join(target,'index.html')),'missing '+path+' '+url);
  }
 }
});
test('R193 accessibility and responsive: reduce motion, no hidden essential content',()=>{
 assert.match(style,/prefers-reduced-motion:reduce/);
 assert.match(style,/@media\(max-width:720px\)/);
 assert.match(home,/class="skip" href="#contenu"/);
 assert.match(home,/aria-label="Navigation principale"/);
 assert.match(style,/\.syn-r193-home > \.skip:focus/);
});
test('R193 failure-first: reflection and missing pointer canvas both rejected',()=>{
 const validate=(h,c)=>{
  assert.doesNotMatch(c,/-webkit-box-reflect|r192-floor-reflection/);
  assert.equal((h.match(/<canvas class="core-r109-canvas"/g)||[]).length,1);
 };
 assert.throws(()=>validate(home,style+'.r192-floor-reflection{opacity:1}'));
 assert.throws(()=>validate(home,style+'-webkit-box-reflect:below 0;'));
 assert.throws(()=>validate(home.replace('class="core-r109-canvas"','class="no-canvas"'),style));
});
