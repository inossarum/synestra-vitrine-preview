from pathlib import Path
import hashlib,json,re
base=Path(__file__).resolve().parent.parent
source=base/"assets/siteforge-r200-unified-scene.js"
assert hashlib.sha256(source.read_bytes()).hexdigest()=="b067b8d9d223502e4d4e5ec9d6bde35c4b7cc8e64db40dbad33f32ed9657994f"
js=source.read_text("utf-8")
f=js.split(" const fragment=`",1)[1].split("\n`;",1)[0]
assert "uniform vec3 uCore,uCyan,uViolet,uDeep;" in f
f=f.replace("if(xy>=radius*1.025){gl_FragColor=vec4(background,1.);return;}",
            "if(xy>=radius*1.025){gl_FragColor=vec4(0.,0.,0.,0.);return;}")
f=f.replace("vec3 incident=background*(1.-plasmaAlpha*.63)+saturated*streamVisibility*1.55;",
            "vec3 incident=saturated*streamVisibility*1.38;")
f=f.replace("gl_FragColor=vec4(min(vec3(1.),composed),1.);",
            "gl_FragColor=vec4(min(vec3(1.),composed),clamp(plasmaAlpha*1.5+coreStar*.6,0.,.99));")
assert "clamp(plasmaAlpha*1.5+coreStar*.6,0.,.99)" in f
v="""precision highp float;
varying float vLife,vGlint;
varying vec2 vAxis;
void main(){
 vLife=1.;vGlint=1.;vAxis=vec2(1.,0.);
 gl_Position=vec4(position.xy,0.,1.);
}"""
target=base/"r201-build/plasma-shader.mjs"
target.write_text("/* Adapted from Synestra R200 pinned volumetric fragment. */\nexport const plasmaVertex="+json.dumps(v)+";\nexport const plasmaFragment="+json.dumps(f)+";\n",encoding="utf-8")
print("SHADER_EXTRACTED",len(f),"sha256",hashlib.sha256(target.read_bytes()).hexdigest())
