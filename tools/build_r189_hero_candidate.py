"""Additive R189 hero candidate from pinned R186: does not edit the original page."""
from pathlib import Path
import hashlib

root = Path(__file__).resolve().parent.parent
source = root / "index.html"
destination = root / "r189-hero-candidate.html"
original = source.read_text(encoding="utf-8")
assert original.count('<body>') == 1
assert original.count('        <div class="core-r108-top">') == 1
assert original.count("</style>") == 1
assert original.count('<canvas class="core-r109-canvas"') == 1

css = """
/* R189 ISOLATED VISUAL CANDIDATE — editorial layer and topology around the original R186 shader.
   CSS/HTML only; no camera, WebGL, mouse, control, CSP or product route changes. */
.r189-composition{background:#050a16}
.r189-composition .hero-v2{
  display:block;isolation:isolate;position:relative;
  width:min(100% - 40px,1580px);max-width:none;
  padding:10px 0 0;min-height:auto;margin:0 auto;
}
.r189-composition .hero-copy{
  position:absolute;top:26%;left:clamp(24px,5.5vw,100px);
  width:min(26.5%,355px);z-index:9;padding:0;
}
.r189-composition .hero-v2 .eyebrow{
  padding:0;border:0;background:none;box-shadow:none;
  font-size:.58rem;letter-spacing:.2em;color:#92b6d0;
}
.r189-composition .hero-topline{
  margin:1.5rem 0 .35rem;font-size:.60rem;letter-spacing:.18em;color:#8eabc0;
}
.r189-composition .hero-v2 h1{
  font-size:clamp(2.1rem,3.3vw,3.55rem);max-width:11.5ch;
  letter-spacing:-.062em;line-height:1.10;margin:.7rem 0 1rem;
  text-wrap:balance;
}
.r189-composition .hero-v2 .hero-lead{
  font-size:clamp(.76rem,.98vw,.9rem);line-height:1.72;
  max-width:32ch;color:#a5b9cc;
}
.r189-composition .hero-v2 .hero-actions{
  margin:1.4rem 0 0;display:flex;flex-wrap:wrap;gap:.55rem;
}
.r189-composition .hero-v2 .hero-actions .button{
  padding:.72rem .9rem;min-height:38px;font-size:.69rem;letter-spacing:.01em;
}
.r189-composition .hero-v2 .pilot-caption{
  max-width:36ch;font-size:.66rem;line-height:1.5;margin-top:1rem;opacity:.73;
}
.r189-composition .hero-index{
  margin-top:1.25rem;padding-top:.8rem;gap:.5rem 1.1rem;
  font-size:.55rem;letter-spacing:.1em;
}
.r189-composition .hero-index b{font-size:.58rem}
.r189-composition .system-stage{
  position:relative;z-index:1;width:100%;
  height:clamp(660px,calc(100svh - 110px),980px);
  min-height:660px;border:0;border-radius:0;
  box-shadow:none;transform:none!important;
  background:radial-gradient(ellipse 43% 45% at 51% 52%,rgba(51,60,133,.18),transparent 73%),
    linear-gradient(180deg,#040916,#080e20 72%,#13152b);
}
.r189-composition .system-stage:before{
  content:"";position:absolute;inset:0;pointer-events:none;opacity:.6;
  background:
   radial-gradient(ellipse 42% 17% at 50% 86%,rgba(94,91,160,.16),transparent 87%),
   linear-gradient(90deg,transparent,rgba(120,179,224,.055) 49.96%,transparent 50.04%);
}
.r189-composition .core-r108-top{top:26px;left:29px;right:29px}
.r189-geometry{position:absolute;z-index:1;inset:0;pointer-events:none;overflow:hidden}
.r189-geometry::before,.r189-geometry::after{
  content:"";position:absolute;top:20%;height:52%;width:1px;
  background:linear-gradient(transparent,rgba(125,179,214,.16) 20%,rgba(127,180,213,.16) 80%,transparent);
}
.r189-geometry::before{left:4.5%}
.r189-geometry::after{right:4.5%}
.r189-system-map{
  position:absolute;right:clamp(26px,5.3vw,94px);top:28%;z-index:5;
  width:min(22%,265px);pointer-events:none;
  color:#c4d7e6;font:500 .82rem/1.5 system-ui,sans-serif;
}
.r189-system-heading{
  margin:0 0 1.1rem;color:#8cabcd;
  font:700 .57rem/1.5 ui-monospace,Consolas,monospace;
  letter-spacing:.22em;text-transform:uppercase;
}
.r189-system-node{
  display:grid;grid-template-columns:20px 1fr;align-items:start;
  gap:11px;padding:1rem 0;
  border-top:1px solid rgba(135,182,222,.21);
}
.r189-system-node::before{
  content:"";width:7px;height:7px;border-radius:50%;
  margin-top:.5rem;background:#8de8ed;box-shadow:0 0 12px rgba(109,223,243,.35);
}
.r189-system-node:nth-of-type(2)::before{background:#aa91ee}
.r189-system-node:nth-of-type(3)::before{background:#7be0be}
.r189-system-node strong{display:block;font-weight:700;font-size:.89rem;color:#eaf5ff}
.r189-system-node small{display:block;margin-top:.24rem;font-size:.69rem;line-height:1.65;color:#93a9c0}
.r189-system-foot{
  margin:1.35rem 0 0;font:.55rem/1.5 ui-monospace,monospace;
  letter-spacing:.1em;color:#637f9b;
}
.r189-composition .core-r108-links{bottom:60px;max-width:550px;margin:auto;left:0;right:0}
.r189-composition .core-r108-links a{background:rgba(10,22,40,.62);backdrop-filter:blur(7px)}
.r189-composition .core-r108-note{bottom:20px;letter-spacing:.08em;font-size:.58rem}
@media(max-width:1040px){
 .r189-composition .hero-v2{width:calc(100% - 30px)}
 .r189-composition .hero-copy{
   position:relative;left:auto;top:auto;width:min(100%,690px);
   margin:0 auto;padding:36px 18px 24px;
 }
 .r189-composition .hero-v2 h1{max-width:18ch}
 .r189-composition .hero-v2 .hero-lead{max-width:57ch}
 .r189-composition .system-stage{min-height:560px;height:clamp(560px,62svh,720px)}
 .r189-system-map{right:25px;top:13%;width:175px}
 .r189-composition .core-r108-links{bottom:56px}
}
@media(max-width:680px){
 .r189-composition .site-header{
   width:calc(100% - 32px);display:flex;flex-direction:column;
   align-items:flex-start;gap:10px;padding:12px 0;
 }
 .r189-composition .site-header .brand{max-width:100%}
 .r189-composition .site-header .brand img{max-width:min(220px,72vw);height:auto}
 .r189-composition .site-header .nav-r105{
   display:flex;flex-wrap:wrap!important;gap:4px!important;
   justify-content:flex-start;width:100%;max-width:100%;
 }
 .r189-composition .site-header .nav-r105>a:not(.nav-cta){
   font-size:.66rem;min-height:30px;padding:6px 2px;
 }
 .r189-composition .site-header .nav-explore summary{
   padding:.48rem .56rem;font-size:.7rem;
 }
 .r189-composition .site-header .nav-r105:after{
   content:"";display:block;order:1;flex:0 0 100%;height:0;
 }
 .r189-composition .site-header .nav-r105 .nav-cta{
   margin-left:0;order:2;
 }
 .r189-composition .hero-v2{width:100%;padding:0}
 .r189-composition .hero-copy{padding:20px 20px 12px}
 .r189-composition .hero-v2 h1{
   font-size:clamp(1.72rem,7.3vw,2.2rem)!important;
   max-width:100%;white-space:normal;overflow-wrap:normal;letter-spacing:-.045em;
 }
 .r189-composition .system-stage{height:460px;min-height:460px;border-radius:0}
 .r189-composition .core-r108-top{top:18px;left:18px;right:18px}
 .r189-system-map{display:none}
 .r189-geometry::before,.r189-geometry::after{height:40%}
 .r189-composition .core-r108-links{left:12px;right:12px;gap:5px}
 .r189-composition .core-r108-note{font-size:.52rem}
}
@media(prefers-reduced-motion:reduce){
 .r189-composition .r189-geometry::before,
 .r189-composition .r189-geometry::after{animation:none!important}
}
"""
overlay = """
        <!-- R189: static, screen-reader-neutral topology. Original WebGL canvas and products untouched. -->
        <div class="r189-geometry" aria-hidden="true"></div>
        <div class="r189-system-map" aria-hidden="true">
          <p class="r189-system-heading">01 / Un écosystème</p>
          <div class="r189-system-node"><span><strong>SiteForge</strong><small>Donner forme aux idées</small></span></div>
          <div class="r189-system-node"><span><strong>Connect</strong><small>Relier les capacités et les outils</small></span></div>
          <div class="r189-system-node"><span><strong>Bridge</strong><small>Agir dans un cadre autorisé</small></span></div>
          <p class="r189-system-foot">CRÉATION · CONNEXION · CONTRÔLE</p>
        </div>
"""
# No engine source and no launch script is edited; new HTML file is the only rendered delta.
candidate = original.replace("<body>", '<body class="r189-composition">', 1)
candidate = candidate.replace("</style>", css + "\n</style>", 1)
needle = '        <canvas class="core-r109-canvas"'
assert candidate.count(needle) == 1
candidate = candidate.replace(needle, overlay + needle, 1)
assert candidate.count('class="r189-system-map"') == 1
assert candidate.count('<canvas class="core-r109-canvas"') == 1
assert candidate.count('<script') == original.count('<script')
destination.write_text(candidate, encoding="utf-8")
print("R189_CANDIDATE=GENERATED")
print("SOURCE_SHA256=" + hashlib.sha256(source.read_bytes()).hexdigest())
print("PREVIEW_SHA256=" + hashlib.sha256(destination.read_bytes()).hexdigest())
print("PREVIEW=" + str(destination))
