from pathlib import Path
root=Path(r'I:\_STUDIO_STAGING\siteforge_r168_chamber_20261027')
source=root/'index.html'
s=source.read_text(encoding='utf8')
room=(root/'assets/vitrine-r168-room.svg').read_text(encoding='utf8')
css=(root/'assets/vitrine-r168-chamber-preview.css').read_text(encoding='utf8')
target='<canvas class="core-r109-canvas" aria-hidden="true" width="960" height="570"></canvas>'
assert s.count(target)==1
s=s.replace(target,room+'\n        '+target)
assert s.count('</style>')==1
s=s.replace('</style>','\n'+css+'\n</style>')
p=root/'vitrine-r168-chamber-preview.html'
p.write_text(s,encoding='utf8',newline='\n')
print('R168_ARCHITECTURAL_PREVIEW_READY',len(s),'home_ref_untouched')
