"""R193 -- full-viewport plasma stage, logo-pinned violet/green, NO reflection.
Local candidate: R192 is immutable; no WebGL engine changes, new CSS sheet only.
"""
from pathlib import Path
import re,hashlib
root=Path(__file__).resolve().parent.parent
base=root/"r192"
out=root/"r193"
out.mkdir(exist_ok=True)
original_css=(root/"assets/r192-experience.css").read_text(encoding="utf-8")
css=original_css
# No duplication of animated WebGL image. Delete all reflection and repeated blur animation.
css,n=re.subn(r'\s*/\* Chromium reflects the same live WebGL raster;.*?\*/\s*-webkit-box-reflect:[^;]+;', '', css, count=1,flags=re.S)
assert n==1, 'R192 raster reflection anchor lost'
css,n=re.subn(r'\.r192-floor-reflection\{[^}]*\}', '',css,count=1,flags=re.S)
assert n==1, 'R192 CSS floor mirror anchor lost'
css,n=re.subn(r'@keyframes r192-reflected-light\{[^}]*\}', '',css,count=1,flags=re.S)
assert n==1, 'R192 pulsing blur keyframe missing'
css=css.replace('animation:r192-reflected-light 10s ease-in-out infinite alternate','animation:none')
css=css.replace('animation:r192-reflected-light 9s ease-in-out infinite alternate-reverse','animation:none')
# NO blur() CSS filters on emissive floor (large repaint area).
css=re.sub(r'filter:blur\([^)]+\);','',css)
# Previous webkit reflection removed: no box-reflect allowed, even disabled.
assert 'box-reflect' not in css and 'floor-reflection{' not in css
css+="""
/* R193 / full first viewport: no intro overlapping the energy scene. */
:root{
 --r193-violet:#552a9d; --r193-violet-lit:#a775e8;
 --r193-green:#2d9c6e; --r193-green-lit:#70e3af;
 --r193-ink:#eef5ff; --r193-horizon:75%;
}
body.syn-r193-home{background:#050812}
/* R191 skip link was incorrectly in normal flow, adding 21px before the stage. */
.syn-r193-home > .skip{position:absolute!important;left:-9999px!important;top:0}
.syn-r193-home > .skip:focus{left:1rem!important;top:1rem!important;z-index:90}
.syn-r193-home .site-header{
 position:absolute!important;top:0;left:50%;transform:translateX(-50%);
 z-index:40;width:min(calc(100% - 38px),1272px)!important;max-width:none;
 border-bottom:1px solid rgba(156,187,216,.15);background:linear-gradient(180deg,rgba(4,8,18,.8),transparent)!important
}
.syn-r193-home main{position:relative;z-index:1}
.syn-r193-home .r192-hero{
 display:block;position:relative;width:100%;max-width:none;
 height:100svh;min-height:600px;padding:0!important;margin:0!important;
 isolation:isolate;overflow:hidden;
}
.syn-r193-home .r192-scene-shell{position:absolute;inset:0;width:100%;height:100%;min-height:0}
.syn-r193-home .r192-scene{
 position:relative;width:100%;height:100%!important;min-height:0!important;
 background:
  radial-gradient(ellipse 28% 37% at 50% 46%,rgba(85,42,157,.085),transparent 80%),
  radial-gradient(ellipse 23% 30% at 51% 58%,rgba(45,156,110,.06),transparent 85%),
  #050914;
}
.syn-r193-home .r192-scene .core-r109-canvas{
 height:100%!important;width:100%!important;top:0!important;left:0!important;
 transform:scale(.73)!important;transform-origin:center 43%!important;
 will-change:auto;pointer-events:none;
}
.syn-r193-home .r192-scene .core-r108-art{top:13%;transform:translateX(-50%) scale(.78)}
/* Metal is opaque and physically situated under the glowing object. */
.syn-r193-home .r192-floor{
 top:75%;left:-30%;width:160%;height:94%;
 transform:perspective(760px) rotateX(68deg) scale(1.06);
 background:linear-gradient(180deg,#142036 0%,#0b1322 55%,#060c18 100%);
 border-top:1px solid rgba(147,183,214,.21);
 box-shadow:inset 0 23px 34px rgba(139,169,195,.05);
}
.syn-r193-home .r192-floor:before{
 background:linear-gradient(180deg,rgba(150,178,197,.07),transparent);
 border-top:1px solid rgba(210,227,239,.05)
}
.syn-r193-home .r192-floor-grid{
 opacity:.32;
 background:repeating-linear-gradient(90deg,transparent 0 110px,rgba(159,182,209,.075) 111px,transparent 112px),
 repeating-linear-gradient(0deg,transparent 0 57px,rgba(155,182,202,.08) 58px,transparent 59px);
 mask-image:linear-gradient(#000,rgba(0,0,0,.5) 55%,transparent 95%);
}
/* Light projected on metal -- radial falloff approximation, not a reflected image.
   All fields are static CSS backgrounds; no filters, readback, mirror or new frame loop. */
.syn-r193-home .r192-floor-sheen{
 inset:0;
 background:
  radial-gradient(ellipse 22% 18% at 45% 6%,rgba(167,117,232,.23) 0%,rgba(85,42,157,.08) 42%,transparent 82%),
  radial-gradient(ellipse 24% 19% at 55% 6%,rgba(112,227,175,.26) 0%,rgba(45,156,110,.08) 45%,transparent 82%);
 filter:none!important;animation:none!important;opacity:1;
}
.syn-r193-home .r192-floor-light{
 position:absolute;top:-3%;left:50%;width:min(60%,850px);height:25%;
 transform:translateX(-50%);filter:none!important;animation:none!important;
 background:
 radial-gradient(ellipse 35% 29% at 50% 15%,rgba(230,255,239,.72),rgba(151,243,195,.38) 45%,transparent 100%),
 radial-gradient(ellipse 65% 52% at 43% 20%,rgba(133,76,218,.25),transparent 85%),
 radial-gradient(ellipse 63% 54% at 58% 21%,rgba(60,186,128,.28),transparent 86%);
 box-shadow:none;opacity:.94;
}
.syn-r193-home .r192-light-falloff{
 left:50%;top:73%;width:min(65%,880px);height:8%;
 transform:translateX(-50%);filter:none!important;
 background:radial-gradient(ellipse at center,rgba(224,252,235,.19),rgba(116,68,186,.1) 40%,rgba(56,173,118,.05) 60%,transparent 80%);
}
.syn-r193-home .r192-depth-haze{
 background:radial-gradient(ellipse 21% 33% at 50% 46%,rgba(95,47,162,.08),transparent 83%);
}
.syn-r193-home .r192-scene-caption{bottom:11%;left:clamp(18px,4vw,70px);right:clamp(18px,4vw,70px);opacity:.55}
.syn-r193-home .r192-scene .core-r108-top{top:clamp(130px,17vh,180px);left:clamp(20px,4vw,72px);right:clamp(20px,4vw,72px);opacity:.48}
/* Only scroll invitation stays in the first view. Editorial title now begins BELOW fold. */
.syn-r193-home .r192-hero-outro{
 position:absolute;left:50%;bottom:clamp(20px,3.8vh,39px);
 z-index:9;transform:translateX(-50%);
 display:flex;align-items:center;justify-content:center;gap:20px;
 padding:0;white-space:nowrap
}
.syn-r193-home .r192-hero-outro .r192-primary-link{border-color:rgba(158,199,181,.23);background:rgba(5,15,25,.35)}
.syn-r193-home .r192-scroll-hint b{color:var(--r193-green-lit)}
.syn-r193-home .r192-chapter-intro{
 padding-top:clamp(80px,9vw,126px);border-top:0;
}
.syn-r193-home .r192-hero-intro{
 max-width:1000px;margin:0 0 clamp(70px,9vw,135px);text-align:left
}
.syn-r193-home .r192-hero-intro .r192-eyebrow{justify-content:flex-start;color:#baa5e1}
.syn-r193-home .r192-hero-intro h1{
 max-width:16ch;margin:22px 0 18px;text-align:left;
 font-size:clamp(2.7rem,5.2vw,5rem)
}
.syn-r193-home .r192-hero-intro h1 span{background:linear-gradient(105deg,#c0a5f1,#9d7ae9 40%,#82e0ba 100%);color:transparent;-webkit-background-clip:text;background-clip:text}
.syn-r193-home .r192-product-rail a:hover{background:linear-gradient(120deg,rgba(96,52,157,.08),rgba(45,156,110,.07))}
.syn-r193-home .r192-signal{background:var(--r193-green-lit);box-shadow:none}
.syn-r193-home .r192-chapter-layout h2 em{background:linear-gradient(105deg,#a978e3,#75d6a8);color:transparent;-webkit-background-clip:text;background-clip:text}
@media(max-width:720px){
 .syn-r193-home .site-header{width:calc(100% - 32px)!important}
 .syn-r193-home .r192-hero{height:100svh;min-height:620px}
 .syn-r193-home .r192-scene .core-r109-canvas{width:175vw!important;left:50%!important;transform:translateX(-50%) scale(.56)!important;transform-origin:center 48%!important}
 .syn-r193-home .r192-floor{top:74%;width:220%;left:-60%;height:85%;transform:perspective(500px) rotateX(69deg) scale(1.03)}
 .syn-r193-home .r192-light-falloff{top:72%;width:90%}
 .syn-r193-home .r192-floor-light{width:82%;height:29%}
 .syn-r193-home .r192-scene .core-r108-top{top:clamp(155px,21vh,215px)}
 .syn-r193-home .r192-scene-caption{bottom:12%;font-size:7px}
 .syn-r193-home .r192-hero-outro{bottom:27px;gap:0}
 .syn-r193-home .r192-scroll-hint{display:none}
 .syn-r193-home .r192-hero-intro{margin-bottom:70px}
}
@media(prefers-reduced-motion:reduce){
 .syn-r193-home .r192-floor-sheen,.syn-r193-home .r192-floor-light{animation:none!important}
}
"""
assert 'box-reflect:below' not in css
assert '.r192-floor-reflection{' not in css
assert 'r192-reflected-light' not in css
(root/"assets/r193-experience.css").write_text(css,encoding="utf-8")
for slug in ("","connect/","bridge/","siteforge/","offres/"):
    src=base/slug/"index.html"
    dst=out/slug/"index.html"
    dst.parent.mkdir(parents=True,exist_ok=True)
    html=src.read_text(encoding="utf-8")
    assert html.count("r192-experience.css")==1
    html=html.replace("r192-experience.css","r193-experience.css",1)
    if not slug:
        assert html.count('class="r192-hero-intro"')==1
        begin=html.index('      <div class="r192-hero-intro">')
        finish=html.index('      <div class="r192-scene-shell">',begin)
        intro=html[begin:finish]
        assert intro.count('<h1')==1 and intro.count('</h1>')==1
        html=html[:begin]+html[finish:]
        target='    <section class="r192-chapter-intro" aria-labelledby="r192-next-title">\n'
        assert html.count(target)==1
        html=html.replace(target,target+intro,1)
        html=html.replace('<section class="r192-hero" aria-labelledby="hero-title">',
                          '<section class="r192-hero" aria-label="Sphère de plasma Synestra sur sol métallique éclairé">',1)
        html=html.replace('syn-r192-home','syn-r192-home syn-r193-home',1)
        assert html.count('<div class="r192-floor-reflection"></div>')==1
        html=html.replace('          <div class="r192-floor-reflection"></div>\n','',1)
        # Use sampled dominant logo purple and green for shader inputs; keep bright white core.
        assert 'data-default="#53318d" value="#53318d"' in html
        assert 'data-default="#69dcb4" value="#69dcb4"' in html
        html=html.replace('data-default="#53318d" value="#53318d"','data-default="#552a9d" value="#552a9d"',1)
        html=html.replace('data-default="#69dcb4" value="#69dcb4"','data-default="#55d49a" value="#55d49a"',1)
        html=html.replace('data-default="#08142e" value="#08142e"','data-default="#190d35" value="#190d35"',1)
        # SVG fallback inherits same logo-based color family.
        html=html.replace('#53318d','#552a9d').replace('#69dcb4','#55d49a')
        assert html.count('class="core-r109-canvas"')==1
        assert html.count('<h1')==1
        assert html.index('<h1')>html.index('r192-hero-outro')
        assert 'r192-floor-reflection' not in html
    dst.write_text(html,encoding="utf-8")
    print("BUILT",dst.relative_to(root),hashlib.sha256(dst.read_bytes()).hexdigest()[:18])
print("SOURCE_R192_UNCHANGED",hashlib.sha256((base/"index.html").read_bytes()).hexdigest())
print("REFLECTION_REMOVED","box-reflect:below" not in css and "floor-reflection" not in css)
