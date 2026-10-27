from pathlib import Path
root=Path(r'I:\_STUDIO_STAGING\siteforge_r167_backdrop_20261027')
source=root/'index.html'
html=source.read_text(encoding='utf-8')
css=(root/'assets/vitrine-r167-backdrop-proposal.css').read_text(encoding='utf-8')
canvas='<canvas class="core-r109-canvas" aria-hidden="true" width="960" height="570"></canvas>'
assert html.count(canvas)==1
html=html.replace(canvas,'<div class="syn-r167-backdrop" aria-hidden="true"></div>\n        '+canvas)
assert html.count('</style>')==1
html=html.replace('</style>','\n'+css+'\n</style>')
html=html.replace('<title>Synestra','<title>Prototype R167 · Synestra',1) if '<title>Synestra' in html else html
(root/'vitrine-r167-backdrop-preview.html').write_text(html,encoding='utf-8',newline='\n')
print('R167_BACKDROP_PREVIEW_GENERATED','home_original_untouched',source.stat().st_size,'preview_size',len(html))
