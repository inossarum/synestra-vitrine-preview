import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../vitrine-r169-studio-palette-preview.html',import.meta.url),'utf8');
const style=html.slice(html.indexOf('<style>')+7,html.indexOf('</style>'));
const swatch=(s)=>s.replace('#','').match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
const luminance=s=>swatch(s).reduce((v,x,i)=>v+x*[.2126,.7152,.0722][i],0);
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
test('R171 pilot button has consistent accessible foreground on both ends of each gradient',()=>{
  const ink='#071523';
  for(const bg of ['#b0d5ff','#90e0ec','#cae2ff','#a7ecf3']){
    assert.ok(contrast(ink,bg)>=7,'CTA should maintain strong contrast on '+bg);
  }
  assert.ok(style.includes('R171 accessible pilot CTA'));
  assert.match(style,/header\.site-header nav\.site-nav a\.nav-cta \{[^}]*-webkit-text-fill-color:#071523/);
  assert.match(style,/header\.site-header nav\.site-nav a\.nav-cta span \{[^}]*color:#071523/);
  assert.match(html,/<a class="nav-cta" href="https:\/\/synestra-client-portal\.synestra-studio\.workers\.dev\/"[^>]*>Espace pilote /);
});
test('R171 CTA keyboard and mobile target size, motion choice and dynamic feedback',()=>{
  const rules=style.slice(style.indexOf('/* R171 accessible pilot CTA:'));
  assert.match(rules,/min-width:148px/);
  assert.match(rules,/min-height:48px/);
  assert.match(rules,/font-size:\.94rem/);
  assert.match(rules,/a\.nav-cta:focus-visible \{[^}]*outline:3px solid #c4efff/);
  assert.match(rules,/a\.nav-cta:hover \{[^}]*color:#071523/);
  assert.match(rules,/@media\(max-width:720px\)[\s\S]*?min-height:48px/);
  assert.match(rules,/@media\(prefers-reduced-motion:reduce\)[\s\S]*?transition:none!important/);
  assert.equal((html.match(/<script\b/g)||[]).length,1);
});
