"""R187.6 — controlled ten satellite helices braided around five zero-radius energy paths."""
from pathlib import Path
from hashlib import sha256
import base64,re
root=Path(__file__).resolve().parent.parent
src=root/"siteforge-r1875-autonome.html"
dest=root/"siteforge-r1876-autonome.html"
raw=src.read_bytes()
assert sha256(raw.replace(b"\r\n",b"\n")).hexdigest()=="d7250dc8323074d4da3f8558c9d0e5be4e6da3d82ea5b9e058d1c2ebf0894ec1"
source=raw.decode("utf-8").replace("\r\n","\n")
start="  if(uPass>3.5&&uPass<4.5&&uFlow.x>5.5){"
end=" if(uPass>3.5&&uPass<4.5){"
assert source.count(start)==1
a=source.index(start);b=source.index(end,a+len(start))
old=source[a:b]
new=old
# Preserve toroidal geometry and the existing five independently moving centerlines.
# Track local 2D cross sections so satellites can orbit each actual centerline, not world axes.
for label,coord in [
 ('A','vec2(ra-ca,a.z+.029*sin(ta*4.+flowTime*.89))'),
 ('B','vec2(rb-cb,b.x+.031*cos(tb*5.-flowTime*.98))'),
 ('C','vec2(rc-cc,c.y+.025*sin(tc*5.+flowTime*1.1))'),
 ('D','vec2(rd-cd,d.z+.022*cos(td*5.-flowTime*.92))'),
 ('E','vec2(re-ce,e.y+.024*sin(te*4.+flowTime*.85))')
]:
 before=f"float d{label}=length({coord});"
 after=f"vec2 cross{label}={coord};\n    float d{label}=length(cross{label});"
 assert new.count(before)==1,("CROSS_SECTION_TARGET",before)
 new=new.replace(before,after,1)
# Insert ten thin orbital lines. A/B/C/D/E centers follow exact previous geometry.
braids="""    // R187.6: two slender counterphase orbiting currents per main filament.
    // The orbital offsets are perpendicular to each 3D centerline.
    // This is NOT a solid tube: all lines have zero geometrical cross-section.
"""
for label,t, freq, speed, phase in [
 ('A','ta','8.','3.9','0.0'),('B','tb','9.','4.2','1.1'),
 ('C','tc','10.','3.7','2.1'),('D','td','8.','4.5','2.8'),
 ('E','te','9.','4.0','3.7')]:
 braids+=f"""    float theta{label}={t}*{freq}-flowTime*{speed}+{phase};
    vec2 orbit{label}=vec2(cos(theta{label}),sin(theta{label}))* .030;
    float braid{label}=exp(-pow(length(cross{label}-orbit{label})*83./widthNeon,2.))
                 +exp(-pow(length(cross{label}+orbit{label})*83./widthNeon,2.));
"""
assert new.count("    // Traveling electrical crests keep each path clearly alive.")==1
new=new.replace("    // Traveling electrical crests keep each path clearly alive.",braids+"    // Traveling electrical crests keep each path clearly alive.",1)
# Braid is subordinate to the original five major filaments. Traveling brightness ripples.
for label,pulse,core,halo,base in [
 ('A','pa','aCore','aHalo','(.65+pa*1.15)'),
 ('B','pb','bCore','bHalo','(.65+pb*1.15)'),
 ('C','pc','cCore','cHalo','(.48+pc*1.00)'),
 ('D','pd','dCore','dHalo','(.55+pd*1.10)'),
 ('E','pe','eCore','eHalo','(.55+pe*1.10)')
]:
 before=f"float l{label}=({core}*{base}+{halo})*front*border;"
 after=f"float l{label}=({core}*{base}+{halo}+braid{label}*(.20+.27*{pulse}))*front*border;"
 assert new.count(before)==1,("INTENSITY_TARGET",before)
 new=new.replace(before,after,1)
# Depth cue: back strands remain, but much darker than the illuminated front.
assert new.count("float front=.31+.77*smoothstep(-.83,.83,q.z);")==1
new=new.replace("float front=.31+.77*smoothstep(-.83,.83,q.z);",
                "float front=.29+.80*smoothstep(-.80,.83,q.z);",1)
# Subtle crossing discharge, only when two actual centerlines are close in the same 3D sample.
before="    Lneon+=(cyanNeon*(lA+lD*.83)+pinkNeon*(lB+lE*.83)"
after="""    float crossing=(aCore*bCore+bCore*cCore+cCore*dCore+dCore*eCore+
                      eCore*aCore)*.22;
    float flash=.55+.45*sin(flowTime*7.4+q.z*12.);
    Lneon+=vec3(.68,.87,1.)*crossing*flash*front*border*dzNeon*7.0;
    Lneon+=(cyanNeon*(lA+lD*.83)+pinkNeon*(lB+lE*.83)"""
assert new.count(before)==1
new=new.replace(before,after,1)
# A restrained throbbing core, deliberately small and not a white disk.
assert new.count("Lneon+=uCore*coreNeon*.18+(cyanNeon*.09+pinkNeon*.07)*haloNeon;")==1
new=new.replace("Lneon+=uCore*coreNeon*.18+(cyanNeon*.09+pinkNeon*.07)*haloNeon;",
                "Lneon+=uCore*coreNeon*(.14+.045*sin(flowTime*3.5))+(cyanNeon*.09+pinkNeon*.07)*haloNeon;",1)
# Bound total energy to avoid a white-wire ball.
assert new.count("*dzNeon*28.;")==1
new=new.replace("*dzNeon*28.;","*dzNeon*29.;",1)
out=source[:a]+new+source[b:]
assert out.replace(new,old,1)==source
for before,after in [
 ("<title>SiteForge — Laboratoire énergétique 3D R187.5</title>","<title>SiteForge — Laboratoire énergétique 3D R187.6</title>"),
 ("Filaments sans tubes · R187.5","Flux tressés vivants · R187.6"),
 ("LAB R187.5","LAB R187.6")
]:
 assert out.count(before)==1,(before,out.count(before))
 out=out.replace(before,after,1)
script=re.search(r"(?s)<script>(.*?)</script>",out)
assert script and out.count("<script>")==1
digest=base64.b64encode(sha256(script.group(1).encode("utf-8")).digest()).decode("ascii")
oldhash=re.search(r"script-src 'sha256-[^']+'",out)
assert oldhash and "script-src 'unsafe-inline'" not in out
out=out.replace(oldhash.group(0),"script-src 'sha256-"+digest+"'",1)
assert out.count("data-sphere-control=")==source.count("data-sphere-control=")
assert out.count("data-mote-control=")==source.count("data-mote-control=")
dest.write_bytes(out.encode("utf-8"))
print("R1876_BUILD_PASS",sha256(dest.read_bytes()).hexdigest(),"CSP",digest)
