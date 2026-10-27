from pathlib import Path
from math import sin
import re

ROOT=Path(r'I:\_STUDIO_STAGING\siteforge_r169_chamber_20261027')
original=(ROOT/'assets/vitrine-r168-room.svg').read_text(encoding='utf-8')
svg=original.replace('class="syn-r168-room"','class="syn-r169-room"',1)
assert svg != original

def inject(anchor,markup):
    global svg
    assert svg.count(anchor)==1,(anchor,svg.count(anchor))
    svg=svg.replace(anchor,markup+'\n'+anchor,1)

defs="""
    <!-- R169: free, procedural material shading with bounded noise in metal surfaces only -->
    <linearGradient id="r169-armor" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#060b16"/><stop offset=".12" stop-color="#455166"/>
      <stop offset=".26" stop-color="#273348"/><stop offset=".54" stop-color="#111d2c"/>
      <stop offset=".76" stop-color="#344356"/><stop offset=".91" stop-color="#121827"/>
      <stop offset="1" stop-color="#536178"/>
    </linearGradient>
    <linearGradient id="r169-bevel" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#67758b"/><stop offset=".11" stop-color="#1e3145"/>
      <stop offset=".48" stop-color="#0a1222"/><stop offset=".84" stop-color="#19283b"/>
      <stop offset="1" stop-color="#707991"/>
    </linearGradient>
    <linearGradient id="r169-titanium" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#38465b"/><stop offset=".16" stop-color="#121d2e"/>
      <stop offset=".42" stop-color="#263249"/><stop offset=".62" stop-color="#101b30"/>
      <stop offset=".9" stop-color="#263447"/><stop offset="1" stop-color="#0a1525"/>
    </linearGradient>
    <linearGradient id="r169-glass" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#35445d" stop-opacity=".62"/><stop offset=".25" stop-color="#091a2b"/>
      <stop offset=".7" stop-color="#0f1d33"/><stop offset="1" stop-color="#476075" stop-opacity=".45"/>
    </linearGradient>
    <linearGradient id="r169-metal-green" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#69dcb4" stop-opacity=".05"/><stop offset=".48" stop-color="#8bf4d1" stop-opacity=".77"/>
      <stop offset="1" stop-color="#69dcb4" stop-opacity=".05"/>
    </linearGradient>
    <linearGradient id="r169-metal-purple" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#53318d" stop-opacity=".08"/><stop offset=".5" stop-color="#ae8bdd" stop-opacity=".77"/>
      <stop offset="1" stop-color="#53318d" stop-opacity=".08"/>
    </linearGradient>
    <radialGradient id="r169-portal-halo">
      <stop stop-color="#40516d" stop-opacity=".17"/>
      <stop offset=".38" stop-color="#53318d" stop-opacity=".12"/>
      <stop offset="1" stop-color="#000410" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="r169-overhead">
      <stop stop-color="#69dcb4" stop-opacity=".21"/>
      <stop offset=".38" stop-color="#53318d" stop-opacity=".045"/>
      <stop offset="1" stop-color="#0a1020" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="r169-floor-refl" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#a4eddb" stop-opacity=".20"/><stop offset=".48" stop-color="#6543a1" stop-opacity=".08"/>
      <stop offset="1" stop-color="#0a1220" stop-opacity="0"/>
    </linearGradient>
    <pattern id="r169-metal-grain" patternUnits="userSpaceOnUse" width="7" height="7">
      <path d="M0 2h7M0 5h7" stroke="#c0e8f3" stroke-opacity=".075" stroke-width=".34"/>
      <circle cx="2" cy="6" r=".43" fill="#6f96a5" opacity=".15"/>
    </pattern>
    <filter id="r169-surface-noise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="17" stitchTiles="stitch" result="metal-grain"/>
      <feColorMatrix in="metal-grain" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer>
    </filter>
    <filter id="r169-light-bloom" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur stdDeviation="4.5"/>
    </filter>
"""
inject('  </defs>',defs)

# Ceiling: closed industrial vault with ribs, vents and 3 banks of recessed lamps.
ceil=['<g class="r169-ceiling-machinery">']
ceil += [
'<path d="M96 4L704 4L627 143H173Z" fill="#0d1829" stroke="#6e7b90" stroke-opacity=".22" stroke-width="5"/>',
'<path d="M125 20L675 20L612 135H188Z" fill="url(#r169-titanium)" opacity=".64"/>',
'<path d="M270 23H530L555 55H245Z" fill="#070f1e" stroke="#65718e" stroke-opacity=".46" stroke-width="3"/>',
'<path d="M295 33H505" stroke="#69dcb4" stroke-opacity=".42" stroke-width="3" filter="url(#r169-light-bloom)"/>',
'<path d="M295 33H505" stroke="#b2efdf" stroke-opacity=".76" stroke-width="1.7"/>',
'<path d="M203 111L597 111L620 140H180Z" fill="url(#r169-bevel)" stroke="#7a8ca1" stroke-opacity=".21" stroke-width="3"/>',
'<path d="M238 123H562" stroke="#a18ad0" stroke-opacity=".58" stroke-width="2"/>',
'<path d="M231 134H570" stroke="#69dcb4" stroke-opacity=".28" stroke-width="2"/>'
]
for i in range(5):
    x=153+i*104
    ceil.append(f'<polygon points="{x},50 {x+78},50 {x+66},82 {x+12},82" fill="#080e1e" stroke="#536179" stroke-opacity=".39" stroke-width="2"/>')
    for j in range(4):
        yy=57+j*6
        ceil.append(f'<path d="M{x+18},{yy}H{x+60}" stroke="#a4b6c9" stroke-opacity=".14" stroke-width="1.3"/>')
for i in range(6):
    x=204+i*79
    ceil.append(f'<path d="M{x},83L{x-11},111" stroke="#293c51" stroke-width="12" opacity=".68"/>')
    ceil.append(f'<path d="M{x-3},84L{x-12},110" stroke="#a0aac4" stroke-opacity=".20" stroke-width="1.5"/>')
for i in range(9):
    x=265+i*34
    ceil.append(f'<rect x="{x}" y="114" width="19" height="2.2" rx="1" fill="#a8e8dd" opacity=".14"/>')
ceil+=['<polygon points="226,88 574,88 599,101 201,101" fill="#040a16" stroke="#728099" stroke-opacity=".23"/>',
'<path d="M257 97H544" stroke="#ac8bdc" stroke-opacity=".40" stroke-width="3"/>','</g>']
inject('  <g class="syn-r168-far-wall">','\n'.join(ceil))

rear=['<g class="r169-rear-console">']
rear += [
'<path d="M178 158H621V404H178Z" fill="url(#r169-metal-grain)" opacity=".27"/>',
'<path d="M188 164H612M187 389H613" stroke="#a3b4c3" opacity=".13" stroke-width="2"/>',
'<path d="M195 178H247V399H195Z M553 178H605V399H553Z" fill="url(#r169-titanium)" stroke="#8195ad" stroke-opacity=".17" stroke-width="3"/>'
]
for left in [202,560]:
    for i in range(11):
        y=198+i*15.6
        rear.append(f'<rect x="{left}" y="{y:.1f}" width="31" height="6.4" rx="1" fill="#050e19" stroke="#718196" stroke-opacity=".28"/>')
        rear.append(f'<path d="M{left+4},{y+3:.1f}H{left+23}" stroke="{["#69dcb4","#7962ae","#9bc4d7"][i%3]}" stroke-opacity=".38" stroke-width="1.4"/>')
rear+=['<rect x="186" y="175" width="6" height="218" fill="url(#r169-metal-green)" opacity=".30"/>',
'<rect x="607" y="175" width="6" height="218" fill="url(#r169-metal-purple)" opacity=".30"/>','</g>']
inject('  <g class="syn-r168-portal">','\n'.join(rear))

portal=['<g class="r169-portal-mechanics">']
portal+= [
'<path d="M286 161H513L568 209V406H232V209Z" fill="none" stroke="#040815" stroke-width="17" opacity=".80"/>',
'<path d="M287 165H512L559 210V406H241V210Z" fill="none" stroke="url(#r169-bevel)" stroke-width="12" opacity=".95"/>',
'<path d="M292 178H506L545 216V395H255V216Z" fill="none" stroke="#96b5c5" stroke-width="2" opacity=".35"/>',
'<path d="M310 182H492L529 219V389H272V219Z" fill="none" stroke="#516884" stroke-width="6" opacity=".40"/>',
'<path d="M322 191H479" stroke="url(#r169-metal-purple)" stroke-width="5" opacity=".76"/>',
'<path d="M249 237V361M551 237V361" stroke="#85d6bb" stroke-opacity=".21" stroke-width="3"/>',
'<path d="M284 400H516" stroke="url(#r169-metal-green)" stroke-width="2.5" opacity=".54"/>'
]
for x in [240,558]:
    for i in range(5):
        y=229+i*31
        portal.append(f'<polygon points="{x-4},{y} {x+4},{y} {x+4},{y+20} {x-4},{y+20}" fill="url(#r169-titanium)" stroke="#849bab" stroke-opacity=".39"/>')
        portal.append(f'<path d="M{x},{y+4}v11" stroke="{["#69dcb4","#7d64b7"][i%2]}" stroke-opacity=".60" stroke-width="2"/>')
for i in range(11):
    x=333+i*13
    portal.append(f'<rect x="{x}" y="177.4" width="6.5" height="2" rx=".7" fill="{["#69dcb4","#9981cf"][i%2]}" opacity=".42"/>')
portal.append('</g>')
inject('  <g class="syn-r168-left-wall">','\n'.join(portal))

# Symmetrical but physically dimensional wall racks, service doors, rib plates.
def wall_details(side):
    tag=f'r169-{side}-equipment'
    mirror='transform="translate(800 0) scale(-1 1)"' if side=="right" else ''
    out=[f'<g class="{tag}" {mirror}>']
    out +=[
'<polygon points="0,93 156,157 169,405 0,546" fill="url(#r169-armor)" stroke="#60738c" stroke-opacity=".38" stroke-width="6"/>',
'<polygon points="12,128 134,174 142,387 12,500" fill="#08111d" stroke="#53647b" stroke-opacity=".45" stroke-width="4"/>',
'<polygon points="25,150 116,185 126,365 25,452" fill="url(#r169-glass)" stroke="#677a95" stroke-opacity=".55" stroke-width="3"/>',
'<polygon points="35,165 98,190 106,347 35,409" fill="#091727" stroke="#647990" stroke-opacity=".25" stroke-width="2"/>',
'<path d="M17 143L122 181 M17 489L135 386" stroke="#d0e3ee" stroke-opacity=".21" stroke-width="1.4"/>',
'<path d="M48 179L93 195M49 396L100 346" stroke="#9fb4cf" stroke-opacity=".18" stroke-width="2"/>',
'<path d="M11 130L17 135V483L9 490Z" fill="#566578" opacity=".37"/>',
'<path d="M132 175L141 171L151 395L142 388Z" fill="url(#r169-bevel)" opacity=".72"/>',
'<path d="M138 205L149 211L154 374L143 378Z" fill="#040d1b" stroke="#4d6076" stroke-opacity=".53"/>',
'<path d="M146 224L150 357" stroke="url(#r169-metal-green)" opacity=".64" stroke-width="2.4"/>',
'<path d="M29 160L35 164V409L29 415Z" fill="#75619f" opacity=".35"/>',
'<path d="M48 211L94 232L99 337L47 372Z" fill="url(#r169-titanium)" stroke="#41576c" stroke-opacity=".65" stroke-width="2.5"/>',
'<path d="M56 226L84 239L87 325L56 347Z" fill="#040e1b" stroke="#445879" stroke-opacity=".7"/>',
'<rect x="59" y="265" width="21" height="4" rx="1" fill="#69dcb4" opacity=".42"/>',
'<rect x="59" y="275" width="21" height="2" rx="1" fill="#c3c4fa" opacity=".30"/>',
'<path d="M38 383L99 340" stroke="#9b82ca" stroke-opacity=".40" stroke-width="2"/>'
    ]
    for i in range(8):
        y=248+i*11
        out.append(f'<path d="M59 {y}H84" stroke="#93aec3" stroke-opacity=".12" stroke-width="1.4"/>')
    for i in range(3):
        y=180+i*96
        out.append(f'<path d="M5 {y}L27 {y+10}" stroke="#9eacc3" opacity=".17" stroke-width="4"/>')
    for y in [168,215,380,432]:
        out.append(f'<circle cx="21" cy="{y}" r="2.4" fill="#71849b"/><circle cx="21" cy="{y}" r="1.1" fill="#0b1728"/>')
    out+=['<path d="M18 471L125 384" stroke="#69dcb4" stroke-opacity=".25" stroke-width="3"/>',
          '<path d="M37 417L102 366" stroke="#9b76c8" stroke-opacity=".27" stroke-width="2"/>','</g>']
    return '\n'.join(out)

inject('  <g class="syn-r168-right-wall">',wall_details('left'))
inject('  <g class="syn-r168-floor">',wall_details('right'))

# Metal floor tile detail in correct perspective plus floating core dock below the sphere.
floor=['<g class="r169-floor-detail">']
floor+=['<polygon points="172,415 628,415 800,640 0,640" fill="url(#r169-metal-grain)" opacity=".23"/>']
def bounds(t):
    return 173-173*t,627+173*t,413+227*t
for a,b in [(0,.10),(.12,.28),(.30,.50),(.52,.77),(.79,1)]:
    x1,x2,y1=bounds(a);xx1,xx2,y2=bounds(b)
    for i in range(7):
        u=i/7;v=(i+1)/7;gap=.014
        xa=x1+(x2-x1)*(u+gap);xb=x1+(x2-x1)*(v-gap)
        ya=xx1+(xx2-xx1)*(u+gap);yb=xx1+(xx2-xx1)*(v-gap)
        opacity=.37 if (i+int(a*100))%2==0 else .22
        floor.append(f'<polygon points="{xa:.1f},{y1+2:.1f} {xb:.1f},{y1+2:.1f} {yb:.1f},{y2-2:.1f} {ya:.1f},{y2-2:.1f}" fill="url(#r169-titanium)" fill-opacity="{opacity}" stroke="#59718a" stroke-opacity=".27" stroke-width="1.2"/>')
        if i%2==0:
            floor.append(f'<path d="M{xa+5:.1f},{y1+5:.1f}H{xb-4:.1f}" stroke="#a6cccb" stroke-opacity=".13" stroke-width="1.2"/>')
floor+= [
'<polygon points="321,419 479,419 532,463 482,485 318,485 268,463" fill="#060c18" opacity=".9"/>',
'<polygon points="323,420 477,420 516,452 484,474 316,474 284,452" fill="url(#r169-bevel)" stroke="#61798d" stroke-opacity=".45" stroke-width="2.4"/>',
'<polygon points="332,426 469,426 499,450 474,465 324,465 299,450" fill="#0b1827" stroke="#374f68" stroke-opacity=".58" stroke-width="2"/>',
'<path d="M338 429H462" stroke="url(#r169-metal-green)" stroke-opacity=".58" stroke-width="2"/>',
'<path d="M321 466H480" stroke="#9d83d4" stroke-opacity=".18" stroke-width="3"/>',
'<ellipse cx="400" cy="449" rx="74" ry="19" fill="url(#r169-floor-refl)" opacity=".22"/>',
'<path d="M252 490H548M195 559H605" stroke="#69dcb4" stroke-opacity=".19" stroke-width="2"/>'
]
for x,y in [(297,450),(503,450),(320,475),(482,475),(370,440),(430,440)]:
    floor.append(f'<circle cx="{x}" cy="{y}" r="1.7" fill="#9bcbcc" opacity=".39"/>')
floor+=['</g>']
inject('  <g class="syn-r168-wall-lights">','\n'.join(floor))

ambient=['<g class="r169-ambient-light">',
'<ellipse cx="400" cy="320" rx="190" ry="180" fill="url(#r169-portal-halo)" opacity=".78"/>',
'<ellipse cx="400" cy="72" rx="260" ry="120" fill="url(#r169-overhead)" opacity=".45"/>',
'<path d="M201 146L240 415M599 146L560 415" stroke="#69dcb4" stroke-opacity=".17" stroke-width="5" filter="url(#r169-light-bloom)"/>',
'<path d="M338 138H462" stroke="#c5b6ff" stroke-opacity=".34" stroke-width="3" filter="url(#r169-light-bloom)"/>',
'</g>',
'<g class="r169-fasteners">']
for y in [165,200,368,403]:
    for x in [175,633]:
        ambient.append(f'<circle cx="{x}" cy="{y}" r="3.1" fill="#586a7c"/><path d="M{x-1.5} {y}h3" stroke="#0a1728" stroke-width=".9"/>')
for x in [249,550]:
    for y in [206,395]:
        ambient.append(f'<circle cx="{x}" cy="{y}" r="2.3" fill="#7a8099"/><circle cx="{x}" cy="{y}" r=".8" fill="#121727"/>')
ambient.append('</g>')
inject('</svg>','\n'.join(ambient))

# Keep the approved prototype untouched. A derivative gets R169 only.
(ROOT/'assets/vitrine-r169-room.svg').write_text(svg,encoding='utf-8',newline='\n')
css="""/* R169 architectural room review; static, zero extra renderers, no touched home. */
.core-r109-stage .syn-r169-room{
 position:absolute;inset:0;width:100%;height:100%;z-index:0;
 display:block;pointer-events:none;user-select:none;opacity:1;
}
.core-r109-stage .syn-r169-room .r169-ceiling-machinery,
.core-r109-stage .syn-r169-room .r169-portal-mechanics,
.core-r109-stage .syn-r169-room .r169-left-equipment,
.core-r109-stage .syn-r169-room .r169-right-equipment,
.core-r109-stage .syn-r169-room .r169-floor-detail{opacity:.93}
.core-r109-stage .syn-r169-room .r169-ambient-light{opacity:.70}
.core-r109-stage .core-r108-art{z-index:2}
.core-r109-stage .core-r109-canvas{z-index:3}
.core-r109-stage{background:#070d18!important}
@media(max-width:620px){
 .core-r109-stage .syn-r169-room{opacity:.96}
 .core-r109-stage .syn-r169-room .r169-ambient-light{opacity:.52}
}
@media(prefers-reduced-motion:reduce){
 .core-r109-stage .syn-r169-room,
 .core-r109-stage .syn-r169-room *{animation:none!important;transition:none!important}
}
"""
(ROOT/'assets/vitrine-r169-chamber.css').write_text(css,encoding='utf-8',newline='\n')
index=(ROOT/'index.html').read_text(encoding='utf-8')
canvas='<canvas class="core-r109-canvas" aria-hidden="true" width="960" height="570"></canvas>'
assert index.count(canvas)==1
index=index.replace(canvas,svg+'\n        '+canvas,1)
assert index.count('</style>')==1
index=index.replace('</style>','\n'+css+'\n</style>',1)
(ROOT/'vitrine-r169-chamber-preview.html').write_text(index,encoding='utf-8',newline='\n')
print('R169_SUCCESS',len(svg),'bytes, gradients',svg.count('<linearGradient'),'paths',svg.count('<path '))
