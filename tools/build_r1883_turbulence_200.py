"""R188.3 extends user-facing energy turbulence to 200%, with real GPU amplitude."""
from pathlib import Path
from hashlib import sha256
import re,base64
root=Path(__file__).resolve().parent.parent
original=root/'siteforge-r1882-autonome.html'
dest=root/'siteforge-r1883-autonome.html'
s=original.read_bytes().decode('utf8').replace('\r\n','\n')
assert sha256(s.encode('utf8')).hexdigest()=='919339dc811da8c1d16f51752d8925e6dbcbc5826da75dc601e7676024acf112','BASE_CHANGED'
def once(a,b):
 global s
 assert s.count(a)==1,(a,s.count(a))
 s=s.replace(a,b,1)
once('data-energy-turbulence type="range" min="0" max="100"','data-energy-turbulence type="range" min="0" max="200"')
once('0 % : rendu R188.1 inchangé. Augmente pour faire onduler le champ des flux de l\'intérieur, sans épaissir les cylindres ni ajouter d\'éclats.',
     '0 % : effet désactivé. 100 % : intensité R188.2. 200 % : déformation interne doublée, sans épaissir les flux ni ajouter de particules.')
once('dynamics.turbulence<0||dynamics.turbulence>100','dynamics.turbulence<0||dynamics.turbulence>200')
once('uniform float uEnergyTurbulence; // R188.2 dimensionless 0..1, material 6 only',
     'uniform float uEnergyTurbulence; // R188.3 0..2, R188.2 backward-compatible at 0..1')
once('float energyEddy=clamp(uEnergyTurbulence,0.,1.);','float energyEddy=clamp(uEnergyTurbulence,0.,2.);')
once('     // R188.2: smooth advected energy field, NOT opaque geometry or extra sprites.',
     '     // R188.3: smooth advected field, max 200% with 100% backward-compatible.')
once('<title>SiteForge — Laboratoire énergétique 3D R188.2</title>','<title>SiteForge — Laboratoire énergétique 3D R188.3</title>')
once('Flux vivants · R188.2','Flux vivants · R188.3')
once('LAB R188.2','LAB R188.3')
once('Architecture des flux · R188.2','Architecture des flux · R188.3')
m=re.search(r'(?s)<script>(.*?)</script>',s)
assert m and s.count('<script>')==1
digest=base64.b64encode(sha256(m.group(1).encode('utf8')).digest()).decode('ascii')
csp=re.search(r"script-src 'sha256-[^']+'",s)
assert csp and "script-src 'unsafe-inline'" not in s
s=s.replace(csp.group(0),"script-src 'sha256-"+digest+"'",1)
assert s.count('data-energy-turbulence type="range"')==1
assert s.count('energyDynamics')>=2
dest.write_bytes(s.encode('utf8'))
print("R1883_BUILD_PASS",sha256(dest.read_bytes()).hexdigest(),"CSP",digest)
