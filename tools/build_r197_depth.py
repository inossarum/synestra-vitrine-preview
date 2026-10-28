"""R197 volume material + unlit metal plane. Pinned R196, shader from R190 copied only."""
from pathlib import Path
import hashlib
root=Path(__file__).resolve().parent.parent
source=root/"r196";out=root/"r197";out.mkdir(exist_ok=True)
shader_src=root/"assets/siteforge-r190-hover-flux.js"
assert hashlib.sha256(shader_src.read_bytes()).hexdigest()=="d5b64dfccba2096d6cc6f1198a4656c6320569ff627caf11f84fb5eb0e493eae"
assert hashlib.sha256((source/"index.html").read_bytes()).hexdigest()=="43c2fa3845b2b0cdc7072dcd369c30df442e8c4fa3a8e882ce2fce5853773574"
shader=shader_src.read_text(encoding="utf-8").replace("\r\n","\n")
assert shader.count("float rotY=uTilt.x*1.5,rotX=uTilt.y*1.5;")==1
# Very slow autonomous field turn reveals genuine interior occlusion, NEVER pointer tilt.
shader=shader.replace("float rotY=uTilt.x*1.5,rotX=uTilt.y*1.5;",
                      "float rotY=sin(t*.10)*.24,rotX=sin(t*.075)*.105;",1)
# The existing shader IS a ray-marched 3D volume. Restore observable depth by front/back
# attenuation + directional self-shading, preserving nucleus, pointer and WebGL budget.
needle="""    vec3 filamentColor=mix(blue,ion,clamp(currents*.83+.11,0.,1.));
    vec3 radiance=filamentColor*(.50+currents*1.30)
                  +uCyan*coreHalo*.50"""
replacement="""    vec3 filamentColor=mix(blue,ion,clamp(currents*.83+.11,0.,1.));
    // R197 — Depth visibility: far-side streamlines recede behind the front envelope.
    // This shades the real ray-marched 3D samples, not a screen-space fake overlay.
    float frontness=smoothstep(-.67,.78,z/max(radius,.001));
    float keyLight=clamp(.94-.26*q.x/max(radius,.001)
                         +.20*q.y/max(radius,.001),.60,1.33);
    float contour=mix(.90,1.05,smoothstep(.12,.88,planar));
    float depthShade=mix(.68,1.21,frontness)*keyLight*contour;
    vec3 radiance=filamentColor*(.48+currents*1.31)*depthShade
                  +uCyan*coreHalo*.50"""
assert shader.count(needle)==1
shader=shader.replace(needle,replacement,1)
needle="""  vec3 result=accum*2.05+
              uCore*coreScreen*pow(max(uShape.w,0.),1.26)*.56;"""
replacement="""  // Limit highlight flattening; retain local nucleus brightness and gas transparency.
  vec3 result=accum*2.05+
              uCore*coreScreen*pow(max(uShape.w,0.),1.26)*.56;
  result*=mix(1.,.86,smoothstep(.62,.94,silhouette));"""
assert shader.count(needle)==1
shader=shader.replace(needle,replacement,1)
newshader=root/"assets/siteforge-r197-depth.js"
newshader.write_text(shader,encoding="utf-8",newline="\n")
print("SHADER_R197",hashlib.sha256(newshader.read_bytes()).hexdigest())
for slug in ("","connect/","bridge/","siteforge/","offres/"):
    html=(source/slug/"index.html").read_text(encoding="utf-8").replace("\r\n","\n")
    if not slug:
        assert html.count("siteforge-r190-hover-flux.js")==1
        html=html.replace("siteforge-r190-hover-flux.js","siteforge-r197-depth.js",1)
        assert html.count('class="r192-floor-sheen"')==1
        assert html.count('class="r192-floor-light"')==1
        assert html.count('class="r192-light-falloff"')==1
        html=html.replace('          <div class="r192-floor-sheen"></div>','          <div class="r197-contact-shadow"></div>')
        html=html.replace('          <div class="r192-floor-light"></div>','')
        html=html.replace('        <div class="r192-light-falloff" aria-hidden="true"></div>','')
        anchor='<div class="r192-depth-haze" aria-hidden="true"></div>'
        assert html.count(anchor)==1
        html=html.replace(anchor,anchor+'\n        <div class="r197-volume-backdrop" aria-hidden="true"></div>',1)
        canvas='<canvas class="core-r109-canvas" aria-hidden="true" width="960" height="570"></canvas>'
        assert html.count(canvas)==1
        html=html.replace(canvas,canvas+'\n        <div class="r197-foreground-arc" aria-hidden="true"></div>',1)
        html=html.replace('syn-r196-home','syn-r196-home syn-r197-home',1)
        html=html.replace('</head>','<link rel="stylesheet" href="../assets/r197-depth.css"></head>',1)
        assert html.count('<canvas class="core-r109-canvas"')==1
    target=out/slug/"index.html"
    target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(html,encoding="utf-8",newline="\n")
    print("BUILT",target.relative_to(root),hashlib.sha256(target.read_bytes()).hexdigest()[:18])
print("SOURCE_R196_UNTOUCHED",hashlib.sha256((source/"index.html").read_bytes()).hexdigest())
