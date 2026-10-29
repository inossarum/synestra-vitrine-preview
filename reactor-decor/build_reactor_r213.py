# Synestra R212 - architecture-only Blender 5.2 -> Babylon 9.33 GLB contract.
# No core/sphere, no cables; CORE_SOCKET is an EMPTY reserved for Labo 3D.
import bpy, math, json, os, mathutils, time
from mathutils import Vector
from pathlib import Path
ROOT=Path(__file__).resolve().parent
OUT=ROOT/"r213-dist"
OUT.mkdir(exist_ok=True,parents=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
for c in list(bpy.data.collections):
    if c.name=="Collection":continue
    if not c.objects:bpy.data.collections.remove(c)
sc=bpy.context.scene
sc.unit_settings.system='METRIC'
sc.unit_settings.scale_length=1
sc.render.engine='CYCLES'
sc.cycles.samples=12
sc.render.resolution_x=1280
sc.render.resolution_y=720
sc.render.resolution_percentage=75
sc.render.image_settings.file_format='PNG'
sc.render.film_transparent=False
sc.view_settings.view_transform='AgX'
sc.view_settings.look='AgX - Medium High Contrast'
sc.render.filepath=str(OUT/"reactor-decor-1280-preview.png")
world=bpy.data.worlds.new("Synestra_Reactor_World")
sc.world=world
world.use_nodes=True
bg=world.node_tree.nodes.get('Background')
bg.inputs['Color'].default_value=(.009,.015,.027,1)
bg.inputs['Strength'].default_value=.48
collections={}
def collection(name):
    c=bpy.data.collections.new(name);sc.collection.children.link(c);collections[name]=c;return c
for name in ("ARCH_WALLS","ARCH_CEILING","ARCH_GANTRY","ARCH_FLOOR","ARCH_PLATFORM","LIGHTS","INTERFACES"):collection(name)
def move(obj,coll):
    for c in list(obj.users_collection):c.objects.unlink(obj)
    collections[coll].objects.link(obj)
    return obj
def mat(name,col,metal=.7,rough=.37,em=(0,0,0),power=0):
    m=bpy.data.materials.new(name);m.diffuse_color=(*col,1);m.use_nodes=True
    p=m.node_tree.nodes.get("Principled BSDF")
    p.inputs['Base Color'].default_value=(*col,1)
    p.inputs['Metallic'].default_value=metal
    p.inputs['Roughness'].default_value=rough
    p.inputs['Emission Color'].default_value=(*em,1)
    p.inputs['Emission Strength'].default_value=power
    return m
dark=mat("PBR_Dark_Gunmetal",(.036,.055,.085),.88,.32)
wall=mat("PBR_Titanium_Panels",(.102,.143,.191),.87,.4)
steel=mat("PBR_Cold_Steel",(.24,.32,.38),.9,.25)
brushed=mat("PBR_Brushed_Steel",(.16,.22,.30),.91,.34)
black=mat("PBR_Obsidian_Reactor",(.022,.03,.049),.82,.27)
floor_mat=mat("PBR_Panelled_Floor",(.067,.079,.098),.72,.39)
purple=mat("EMISSIVE_Violet",(.045,.027,.09),.30,.35,(.48,.16,.97),2.2)
mint=mat("EMISSIVE_Mint",(.024,.075,.063),.28,.38,(.04,.83,.56),2.3)
cyan=mat("EMISSIVE_Cyan",(.028,.08,.09),.28,.35,(.15,.71,1),1.9)
white=mat("EMISSIVE_Ice",(.15,.28,.31),.28,.30,(.57,.92,1),1.35)
mint_low=mat("EMISSIVE_Mint_Architectural",(.029,.072,.062),.45,.36,(.09,.31,.26),.48)
melody_low=mat("EMISSIVE_Violet_Architectural",(.046,.029,.068),.45,.36,(.31,.14,.44),.42)
# Bake deterministic procedural PBR color maps to image assets inside the GLB.
# Primitive cube UVs remain intact; no network textures or runtime generator.
import random
def add_panel_map(material,name,base,grain=.022):
    rng=random.Random(1212+len(name))
    size=256
    img=bpy.data.images.new(name,width=size,height=size,alpha=True)
    px=[0.0]*(size*size*4)
    for y in range(size):
        for x in range(size):
            v=(rng.random()-.5)*grain
            seam=(x%64<2 or y%64<2)
            notch=(x%64 in (7,8) and y%64 in (7,8))
            scratch=(y%43==0 and x%7<5)
            c=.53 if seam else (1.13 if notch else (.82 if scratch else 1.0))
            idx=(y*size+x)*4
            for k in range(3):px[idx+k]=max(0.0,min(1.0,base[k]*c+v))
            px[idx+3]=1.0
    img.pixels.foreach_set(px);img.pack()
    bsdf=material.node_tree.nodes.get('Principled BSDF')
    tex=material.node_tree.nodes.new('ShaderNodeTexImage')
    tex.image=img;tex.interpolation='Linear'
    material.node_tree.links.new(tex.outputs['Color'],bsdf.inputs['Base Color'])
add_panel_map(wall,'ReactorWall_PanelColor',(.16,.21,.29),.025)
add_panel_map(floor_mat,'ReactorFloor_PanelColor',(.09,.12,.16),.022)
add_panel_map(brushed,'ReactorSteel_BrushColor',(.23,.31,.38),.018)
def box(name,where,scale,material,coll,bev=.02):
    bpy.ops.mesh.primitive_cube_add(size=1,location=where)
    o=bpy.context.object;o.name=name
    o.dimensions=scale
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    if material:o.data.materials.append(material)
    if bev:
        mod=o.modifiers.new("machined_edges","BEVEL");mod.width=bev;mod.segments=2
        o.modifiers.new("weighted_normals","WEIGHTED_NORMAL")
    move(o,coll)
    return o
def cyl(name,where,radius,depth,material,coll,vertices=96,inner=0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=where)
    o=bpy.context.object;o.name=name
    o.data.materials.append(material)
    move(o,coll)
    return o
def torus(name,where,radius,minor,material,coll,segments=112):
    bpy.ops.mesh.primitive_torus_add(major_segments=segments,minor_segments=8,location=where,major_radius=radius,minor_radius=minor)
    o=bpy.context.object;o.name=name
    o.data.materials.append(material)
    move(o,coll)
    return o
def line(name,start,end,thickness,material,coll):
    a,b=Vector(start),Vector(end);mid=(a+b)*.5;delta=b-a
    o=box(name,mid,(thickness,thickness,delta.length),material,coll,.008)
    o.rotation_euler=delta.to_track_quat('Z','Y').to_euler()
    return o
# Floor, recessed leading platforms, radial panel seams.
box('FLOOR_BASE',(0,1.85,-.22),(15.1,17.2,.27),floor_mat,"ARCH_FLOOR",.07)
for i in range(-7,8):
    x=i*.99
    line('FLOOR_SEAM_LONG_%02d'%(i+7),(x,-5.5,-.075),(x,9.1,-.075),.012,brushed,"ARCH_FLOOR")
for j in range(-6,9):
    y=j*.98+.8
    line('FLOOR_SEAM_CROSS_%02d'%(j+6),(-7.3,y,-.072),(7.3,y,-.072),.01,brushed,"ARCH_FLOOR")
# Cylinder arc wall, 28 actual PBR faceted panels behind the core.
R=7.0
panels=28
for i in range(panels):
    a=-math.radians(78)+(i+.5)*math.radians(156)/panels
    x=R*math.sin(a);y=R*math.cos(a)+1.0
    p=box('WALL_SEGMENT_%02d'%i,(x,y,2.65),(.72,.23,5.6),
          wall if i%4 else dark,"ARCH_WALLS",.035)
    p.rotation_euler[2]=-a
    # Angled structural ribs and lighted mechanical insets
    if i%2==0:
        zbar=box('WALL_RIB_%02d'%i,(x-.32,y-.13,2.63),(.09,.26,5.65),
            steel,"ARCH_WALLS",.018);zbar.rotation_euler[2]=-a
    if i%4==1:
        inset=box('WALL_TECH_ACCESS_%02d'%i,(x,y-.28,2.63),(.46,.055,2.85),
            black,'ARCH_WALLS',.014);inset.rotation_euler[2]=-a
        for k in range(4):
            linebar=box('WALL_TECH_STATUS_%02d_%d'%(i,k),
                (x,y-.322,1.70+k*.57),(.33,.017,.022),
                cyan if k==0 else brushed,'ARCH_WALLS',.003)
            linebar.rotation_euler[2]=-a
    if i%4==0:
        led=box('WALL_VIOLET_LIGHT_%02d'%i,(x,y-.17,2.63),(.027,.035,3.15),
            purple if i<panels//2 else mint,"ARCH_WALLS",.0)
        led.rotation_euler[2]=-a
    if i%3==0:
        p2=box('WALL_RECESS_%02d'%i,(x,y-.21,3.05),(.47,.05,1.04),
              black,"ARCH_WALLS",.014);p2.rotation_euler[2]=-a
# Layered central floor ring: core hovers above, no tether geometry.
for name,z,r,depth,material in [
    ("BASE_OUTER",.08,2.45,.18,black),
    ("BASE_METAL",.19,2.28,.12,steel),
    ("BASE_MACHINED",.28,2.10,.08,dark),
    ("BASE_CONTACT_DISC",.333,1.91,.04,brushed)]:
    cyl(name,(0,0,z),r,depth,material,"ARCH_PLATFORM")
for r,z,t,m,n in [
 (2.45,.17,.029,purple,"BASE_VIOLET_RIM"),
 (2.26,.28,.030,cyan,"BASE_CYAN_RIM"),
 (2.01,.36,.018,mint,"BASE_MINT_RIM"),
 (1.81,.366,.014,steel,"BASE_INNER_SEAL")]:
    torus(n,(0,0,z),r,t,m,"ARCH_PLATFORM")
torus('BASE_FLOOR_VIOLET_AMBIENT',(0,0,-.048),3.18,.018,purple,'ARCH_PLATFORM')
torus('BASE_FLOOR_MINT_AMBIENT',(0,0,-.047),2.93,.014,mint,'ARCH_PLATFORM')
for i in range(16):
    a=i*2*math.pi/16
    p=box('BASE_LOCK_%02d'%i,(2.30*math.cos(a),2.30*math.sin(a),.19),(.25,.33,.16),
          brushed if i%4 else mint,"ARCH_PLATFORM",.019)
    p.rotation_euler[2]=a
# Half-height support columns physically independent of core.
for side in (-1,1):
    x=side*4.45
    box('COLUMN_BODY_%s'%side,(x,2.4,2.37),(.68,.72,5.2),steel,"ARCH_WALLS",.04)
    for h in (.1,4.9):
        box('COLUMN_COLLAR_%s_%s'%(side,h),(x,2.4,h),(.98,.95,.27),brushed,"ARCH_WALLS",.04)
    box('COLUMN_LIGHT_%s'%side,(x-side*.38,2.06,2.41),(.07,.12,3.8),
         purple if side<0 else mint,"ARCH_WALLS",0)
    box('COLUMN_PANEL_%s'%side,(x,2.02,2.53),(.39,.13,1.75),black,"ARCH_WALLS",.02)
    box('COLUMN_LOW_WARM_ILLUMINATOR_%s'%side,(x,2.04,.18),(.42,.10,.065),white,"ARCH_WALLS",.002)
# Elevated bridge and rails at rear, following a semicircular route
walkr=5.62
for i in range(22):
    a=-math.radians(72)+(i+.5)*math.radians(144)/22
    x=walkr*math.sin(a);y=walkr*math.cos(a)+.88
    deck=box('CATWALK_DECK_%02d'%i,(x,y,3.19),(.80,1.05,.13),
           steel,"ARCH_GANTRY",.018);deck.rotation_euler[2]=-a
    rail=box('CATWALK_RAIL_%02d'%i,(x,y-.44,4.05),(.83,.06,.05),
           brushed,"ARCH_GANTRY",.008);rail.rotation_euler[2]=-a
    if i%2==0:
        post=box('CATWALK_POST_%02d'%i,(x,y-.44,3.64),(.055,.06,.88),
           brushed,"ARCH_GANTRY",.012);post.rotation_euler[2]=-a
    if i%3==0:
        foot=box('CATWALK_LAMP_%02d'%i,(x,y-.19,3.23),(.34,.13,.033),
           mint,"ARCH_GANTRY",0);foot.rotation_euler[2]=-a
# Ceiling outer deck and layered concentric engineered confinement halo.
# Open ceiling: exposed concentric confinement mechanism rather than a giant dark slab.
for i in range(16):
    a=i*2*math.pi/16
    line('CEILING_RADIAL_SUPPORT_%02d'%i,(3.98*math.cos(a),3.98*math.sin(a),6.30),
         (5.40*math.cos(a),5.40*math.sin(a),6.44),.15,steel,'ARCH_CEILING')
for side in (-1,1):
    box('CEILING_LONGITUDINAL_TRUSS_%s'%side,(side*5.55,1.5,6.44),
        (.20,9.8,.30),dark,'ARCH_CEILING',.03)
for radius,height,thick,material,name in [
 (4.66,5.99,.16,steel,'CEILING_01_MAIN'),
 (4.30,5.89,.14,brushed,'CEILING_02_RECESS'),
 (3.99,5.82,.052,mint,'CEILING_03_TEAL_EMITTER'),
 (3.72,5.78,.10,dark,'CEILING_04_NECk'),
 (3.33,5.73,.065,purple,'CEILING_05_VIOLET'),
 (3.02,5.69,.12,steel,'CEILING_06_INNER_FRAME'),
 (2.74,5.67,.03,cyan,'CEILING_07_CORE_HALO')]:
    torus(name,(0,0,height),radius,thick,material,"ARCH_CEILING")
torus('CEILING_LOWER_MINT_APERTURE',(0,0,5.43),4.34,.054,mint_low,'ARCH_CEILING')
torus('CEILING_LOWER_VIOLET_APERTURE',(0,0,5.46),3.16,.042,melody_low,'ARCH_CEILING')
# Confinement light slots follow the ceiling ring, not the reactor Core.
for i in range(36):
    a=i*2*math.pi/36
    rad=3.96
    slot=box('CEILING_LUMINOUS_SLOT_%02d'%i,
        (rad*math.cos(a),rad*math.sin(a),5.795),(.28,.17,.041),
        mint if i%3 else cyan,'ARCH_CEILING',.005)
    slot.rotation_euler[2]=a
for i in range(24):
    a=i*2*math.pi/24;r=4.1
    p=box('CEILING_BOLT_%02d'%i,(r*math.cos(a),r*math.sin(a),5.86),
          (.17,.46,.14),brushed if i%3 else mint,"ARCH_CEILING",.019)
    p.rotation_euler[2]=a
# Linear recessed alcove lights and framing at the rear.
for side in (-1,1):
    x=side*5.05
    box('ALCOVE_%s'%side,(x,5.2,2.54),(.72,.35,2.72),black,"ARCH_WALLS",.02)
    for j in range(4):
        box('ALCOVE_INSET_%s_%s'%(side,j),(x,4.99,1.64+j*.52),
            (.45,.045,.04),cyan if side>0 else purple,"ARCH_WALLS",0)
# R213 — fully enclosed, physically connected reactor bay.
# Camera is INSIDE the chamber; exterior camera-facing wall is behind the camera.
# No radial cables or mechanical links to CORE_SOCKET.
bulk=mat("PBR_Architectural_Bulkhead",(.063,.084,.112),.81,.36)
edge=mat("PBR_Architectural_LightMetal",(.19,.26,.32),.85,.31)
caution=mat("PBR_Amber_Diagnostic",(.19,.089,.038),.62,.45,(.69,.28,.04),.36)
# Floor extends beneath camera; roof and side panels close the whole hall.
floor_base=bpy.data.objects.get('FLOOR_BASE')
if floor_base:
    floor_base.dimensions=(15.1,25.4,.27)
    floor_base.location=(0,-2.1,-.22)
    bpy.context.view_layer.objects.active=floor_base
    floor_base.select_set(True)
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    floor_base.select_set(False)
# Real closed ceiling with layered ceiling access bays, recessed luminaires,
# and circular apparatus hanging beneath roof (camera below roof).
box("CEILING_ROOF_CLOSED",(0,-2.0,7.30),(15.2,25.5,.29),dark,"ARCH_CEILING",.06)
for side in (-1,1):
    x=side*6.65
    box("CEILING_CABLE_RACE_%s"%side,(x,-2.0,6.87),(.45,22.4,.28),steel,"ARCH_CEILING",.025)
    for j in range(10):
        y=-11.6+j*2.18
        p=box("CEILING_MAINTENANCE_RECESS_%s_%02d"%(side,j),
              (x-side*.68,y,7.11),(1.15,1.68,.065),black,"ARCH_CEILING",.025)
        box("CEILING_MAINTENANCE_LIP_%s_%02d"%(side,j),
              (x-side*.68,y-.73,7.05),(1.14,.036,.055),edge,"ARCH_CEILING",.005)
# Side walls, modeled as actual panelling with recessed machinery and no openings.
# 12 modules span floor to ceiling from camera to back-wall continuation.
for side in (-1,1):
    x=side*7.17
    for j in range(12):
        y=-11.88+j*1.17
        panel=box("SIDE_BULKHEAD_%s_%02d"%(side,j),(x,y,3.35),
                (.29,1.19,7.22),bulk if j%3 else wall,"ARCH_WALLS",.035)
        # Inner material panel, physically separated from wall and bevelled.
        bx=x-side*.22
        box("SIDE_PANEL_INSET_%s_%02d"%(side,j),
            (bx,y,3.13),(.085,.97,4.62),wall if j%2 else dark,"ARCH_WALLS",.022)
        for z in (1.04,5.24):
            box("SIDE_BULKHEAD_RAIL_%s_%02d_%s"%(side,j,z),
                (bx-side*.022,y,z),(.068,1.1,.075),edge,"ARCH_WALLS",.010)
        if j%3==0:
            box("SIDE_BULKHEAD_LIGHT_%s_%02d"%(side,j),
                (bx-side*.12,y,5.62),(.044,.78,.06),
                mint_low if side>0 else melody_low,"ARCH_WALLS",.006)
            box("SIDE_GRILLE_%s_%02d"%(side,j),
                (bx-side*.09,y,2.0),(.065,.58,.62),black,"ARCH_WALLS",.015)
            for k in range(4):
                box("SIDE_GRILLE_SLOT_%s_%02d_%d"%(side,j,k),
                    (bx-side*.126,y,1.79+k*.13),(.015,.48,.027),edge,
                    "ARCH_WALLS",.002)
        elif j%3==1:
            box("SIDE_ACCESS_BAY_%s_%02d"%(side,j),
                (bx-side*.065,y,3.42),(.035,.66,2.16),black,
                "ARCH_WALLS",.016)
            for k in range(3):
                box("SIDE_ACCESS_STATUS_%s_%02d_%d"%(side,j,k),
                    (bx-side*.09,y,3.03+k*.49),(.022,.45,.045),
                    caution if k==0 else cyan,"ARCH_WALLS",.005)
    # Continuous realistic architectural base and suspended upper framing.
    box("SIDE_WALL_KICK_%s"%side,(x-side*.16,-5.45,.18),
        (.31,14.2,.29),steel,"ARCH_WALLS",.023)
    box("SIDE_WALL_UPPER_CHANNEL_%s"%side,(x-side*.14,-5.45,6.45),
        (.27,14.2,.22),edge,"ARCH_CEILING",.016)
# Seal both side-to-rear transitions: no void between longitudinal walls and curved back.
for side in (-1,1):
    for j in range(5):
        y=1.1+j*.86
        x=side*(7.10-j*.10)
        seal=box("SIDE_REAR_SEALED_WING_%s_%02d"%(side,j),
                 (x,y,3.35),(.48,1.02,7.17),bulk,"ARCH_WALLS",.024)
        seal.rotation_euler[2]=side*j*.014
        box("SIDE_REAR_WING_PANEL_%s_%02d"%(side,j),
            (x-side*.25,y,3.15),(.055,.75,4.82),wall,"ARCH_WALLS",.018)
        if j%2==0:
            box("SIDE_REAR_BULKHEAD_RIB_%s_%02d"%(side,j),
                (x-side*.29,y-.35,3.28),(.084,.06,6.12),edge,"ARCH_WALLS",.011)
    box("SIDE_REAR_TOP_GUSSET_%s"%side,
        (side*6.97,2.7,6.83),(.50,4.8,.24),steel,"ARCH_CEILING",.024)
# Closing rear bulkhead: existing curved wall closes the rear; add central heavy door
# in front of it with depth, layered bevels and independent diagnostic panels.
box("REAR_MAINTENANCE_FRAME",(0,7.71,2.65),(3.12,.48,4.55),steel,"ARCH_WALLS",.07)
box("REAR_MAINTENANCE_GASKET",(0,7.30,2.65),(2.75,.12,4.19),black,"ARCH_WALLS",.04)
door=box("REAR_MAINTENANCE_DOOR",(0,7.20,2.65),(2.56,.14,4.0),bulk,"ARCH_WALLS",.045)
for side in (-1,1):
    box("REAR_DOOR_LOCK_ACTUATOR_%s"%side,(side*1.03,7.096,2.63),
         (.22,.13,.9),steel,"ARCH_WALLS",.02)
    box("REAR_DOOR_SECURITY_LED_%s"%side,(side*1.22,7.089,3.84),
         (.04,.06,.36),mint_low if side>0 else melody_low,"ARCH_WALLS",.008)
box("REAR_DOOR_EMERGENCY_STATUS",(0,7.085,4.53),(.54,.12,.105),caution,"ARCH_WALLS",.013)
# Closed camera-facing wall is located BEHIND the camera at y=-14.45.
box("CAMERA_BACK_WALL",(0,-14.47,3.34),(15.2,.26,7.17),bulk,"ARCH_WALLS",.035)
for side in (-1,1):
    box("CAMERA_BACK_FRAME_%s"%side,(side*6.53,-14.24,3.30),(.24,.25,6.94),steel,"ARCH_WALLS",.02)
# Delineate four overhead longitudinal struts; visible depth from camera.
for side in (-1,1):
    for channel in (3.0,5.30):
        box("CEILING_OVERHEAD_TRUSS_%s_%s"%(side,channel),
          (side*channel,-3.7,6.88),(.16,15.8,.25),steel,"ARCH_CEILING",.015)
# In-world industrial controls not overly stylized: ribs, embedded service sockets.
for side in (-1,1):
    for i in range(4):
        y=-9.4+i*2.70
        box("SIDE_INSTRUMENT_CONSOLE_%s_%02d"%(side,i),
            (side*6.56,y,2.41),(.42,1.15,1.08),black,"ARCH_WALLS",.03)
        for k in range(3):
            box("SIDE_INSTRUMENT_LED_%s_%02d_%d"%(side,i,k),
                (side*6.29,y,2.21+k*.24),(.027,.55,.039),
                (caution if k==0 else (mint_low if side>0 else melody_low)),
                "ARCH_WALLS",.004)
# Render-only low haze simulated via transparent low horizontal planes.
# Babylon fog is separate runtime capability; volumes aren't exported to glTF.
fogMat=bpy.data.materials.new("RENDER_ONLY_Fog_Transparent")
fogMat.use_nodes=True
fp=fogMat.node_tree.nodes.get('Principled BSDF')
fp.inputs['Base Color'].default_value=(.18,.25,.35,1)
fp.inputs['Alpha'].default_value=.095
fp.inputs['Roughness'].default_value=1
for i in range(3):
    bpy.ops.mesh.primitive_plane_add(size=2,location=(0,2.0,.56+i*.12))
    o=bpy.context.object;o.name="RENDER_ONLY_FOG_%02d"%i
    o.scale=(3.4,3.5,1)
    o.data.materials.append(fogMat);move(o,"INTERFACES")
    o.hide_render=True  # No fake fog overlay; main Babylon runtime owns fog
# Dedicated interfaces: no mesh, no sphere, no cables. Core's runtime injects later.
def empty(name,where,display=.3):
    o=bpy.data.objects.new(name,None)
    collections["INTERFACES"].objects.link(o)
    o.location=where;o.empty_display_size=display
    return o
empty('CORE_SOCKET',(0,0,2.62),.4)
empty('CORE_LIGHT_SOCKET',(0,0,2.62),.25)
empty('CAMERA_TARGET',(0,0,2.67),.25)
empty('FOG_VOLUME_SOCKET',(0,0,.48),.18)
# Lighting, lamps and cinematic matched camera.
def light(name,kind,where,power,col,shape=None,size=None):
    data=bpy.data.lights.new(name,kind);data.energy=power;data.color=col
    if kind=='AREA':
        data.shape=shape or 'DISK';data.size=size or 5.0
    o=bpy.data.objects.new(name,data);collections["LIGHTS"].objects.link(o);o.location=where
    if kind=='AREA':o.rotation_euler=(Vector((0,0,1.9))-o.location).to_track_quat('-Z','Y').to_euler()
    return o
light('KEY_COOL','AREA',(0,-4,6.2),520,(.45,.78,1),'DISK',6)
light('PRACTICAL_VIOLET','AREA',(-4.1,1.2,3.9),440,(.38,.15,1),'DISK',4.2)
light('PRACTICAL_MINT','AREA',(4.1,1.4,3.9),470,(.15,1,.70),'DISK',4.2)
light('FILL_WALL','AREA',(0,5.1,4.4),620,(.65,.82,1),'DISK',7)
light('FLOOR_KICK','AREA',(0,-2.8,1.6),155,(.25,.55,.7),'DISK',4)
camera_data=bpy.data.cameras.new("REACTOR_CAMERA_DATA")
camera=bpy.data.objects.new("REACTOR_CAMERA_DEFAULT",camera_data)
collections["INTERFACES"].objects.link(camera)
camera.location=(0,-12.6,5.8)
target=Vector((0,1.3,2.7))
camera.rotation_euler=(target-camera.location).to_track_quat('-Z','Y').to_euler()
camera_data.type='PERSP';camera_data.lens=32
sc.camera=camera
# Metadata
sc['atlas_id']='ATLAS_BABYLON_3D'
sc['delivery_mode']='DECOR_ONLY'
sc['core_geometry_objects']=0
sc['scene_units']='meters'
sc['core_socket']='CORE_SOCKET'
sc['target_engine']='Babylon.js 9.33.0'
sc['export_format']='GLB_2.0'
sc['reference_status']='COMPOSITION_TARGET_NOT_PIXEL_IDENTICAL'
sc.render.image_settings.color_mode='RGBA'
# Save source and export, excluding only render-only fog and lamps.
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'synestra_reactor_decor_r213.blend'))
for o in bpy.context.selected_objects:o.select_set(False)
for o in bpy.context.scene.objects:
    if o.type=='MESH' and not o.name.startswith('RENDER_ONLY_'):
        o.select_set(True)
    elif o.type=='EMPTY' and o.name in ('CORE_SOCKET','CORE_LIGHT_SOCKET','CAMERA_TARGET','FOG_VOLUME_SOCKET'):
        o.select_set(True)
    else:o.select_set(False)
bpy.ops.export_scene.gltf(filepath=str(OUT/'synestra_reactor_decor_r213.glb'),
                          export_format='GLB',use_selection=True,
                          export_apply=True,export_materials='EXPORT',
                          export_yup=True,export_cameras=False,export_lights=False)
# Unselect all, render camera preview (no sphere); preview is proof of actual decor.
bpy.ops.object.select_all(action='DESELECT')
sc.render.filepath=str(OUT/'reactor-r213-preview.png')
sc.render.resolution_percentage=70
sc.cycles.samples=12
bpy.ops.render.render(write_still=True)
stats={
 'schema':'synestra.atlas.babylon.decor.r213.v1','engine':'Blender 5.2.2 LTS',
 'target':'Babylon.js 9.33.0','core_status':'CORE_SOCKET_ONLY',
 'objects':len(sc.objects),'meshes':sum(o.type=='MESH' for o in sc.objects),
 'core_socket':'CORE_SOCKET',
 'revision':'R213', 'room_closed':True, 'side_wall_panels':24,
 'side_rear_seal_segments':10, 'front_wall':True, 'rear_door':True, 'closed_roof':True,
 'materials':len(bpy.data.materials),'wall_panels':panels,
 'ceiling_rings':7,'catwalk_segments':22,
 'glb_path':'r213-dist/synestra_reactor_decor_r213.glb',
 'blend_path':'r213-dist/synestra_reactor_decor_r213.blend',
 'preview_path':'r213-dist/reactor-r213-preview.png'
}
(OUT/'r213_manifest.json').write_text(json.dumps(stats,indent=2))
print('REACTOR_R213_DONE='+json.dumps(stats),flush=True)
