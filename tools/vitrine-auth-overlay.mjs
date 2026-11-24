// WEBAPP-AUTH-20261124: exact R169 public vitrine + existing approved portal.
// Build only on the dedicated preview branch. No private resources.
import {readFileSync,writeFileSync,mkdirSync,lstatSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const old="href=\"https://synestra-client-portal.synestra-studio.workers.dev/\" rel=\"noreferrer\"";
const navOld="<a class=\"nav-cta\" href=\"https://synestra-client-portal.synestra-studio.workers.dev/\" rel=\"noreferrer\">Espace pilote ",navNew="<a class=\"nav-cta\" href=\"./connexion/\" rel=\"noreferrer\">Se connecter ";
const heroOld="href=\"https://synestra-client-portal.synestra-studio.workers.dev/\" rel=\"noreferrer\">Accéder à l’espace pilote ",heroNew="href=\"./connexion/\" rel=\"noreferrer\">Se connecter ";
const count=(s,x)=>s.split(x).length-1;
const blob=s=>createHash('sha1').update('blob '+Buffer.byteLength(s)+'\0').update(s).digest('hex');
export function transformVitrine(source){
 assert.equal(blob(source),'f51f71e4b6a7236daceb1ce1091c2ba390513a3f','approved R169 source drift');
 assert.equal(count(source,old),3);
 assert.equal(count(source,navOld),1);
 assert.equal(count(source,heroOld),2);
 const html=source.replace(navOld,navNew).replaceAll(heroOld,heroNew);
 assert.equal(count(html,'href="./connexion/"'),3);
 assert.equal(count(html,'>Se connecter <span'),3);
 assert.equal(count(html,old),0);
 assert.equal(html.replace(navNew,navOld).replaceAll(heroNew,heroOld),source,'only CTA changes permitted');
 return html;
}
export function validatePortal(html){
 assert.ok(html.includes('<a class="site" href="../" rel="noreferrer">Site officiel'));
 assert.ok(html.includes('href="https://synestra-client-portal-staging.synestra-studio.workers.dev/studio/continuity/"'));
 assert.doesNotMatch(html,/<(?:form|script)\b/i);
 const fields=html.match(/<input\b[^>]*>/g)||[];
 assert.equal(fields.length,2);
 for(const f of fields){assert.match(f,/\bdisabled\b/);assert.doesNotMatch(f,/\b(?:name|value)\s*=/);}
 assert.equal((html.match(/<button\b[^>]*\bdisabled\b[^>]*>/g)||[]).length,4);
}
export function buildVitrineAuth(root,output,checkOnly){
 const source=readFileSync(join(root,'vitrine-r169-studio-palette-preview.html'),'utf8');
 const loginPath=join(root,'connexion','index.html');
 assert.ok(lstatSync(loginPath).isFile()&&!lstatSync(loginPath).isSymbolicLink());
 const portal=readFileSync(loginPath,'utf8');
 // Failure-first: changed source and enabled credential controls rejected.
 assert.throws(()=>transformVitrine(source.replace(navOld,navNew)));
 assert.throws(()=>validatePortal(portal.replace('placeholder="E-mail" disabled','placeholder="E-mail"')));
 assert.throws(()=>validatePortal(portal.replace('href="../"','href="https://wrong.example/"')));
 const html=transformVitrine(source);validatePortal(portal);
 const origin='https://preview.example/';
 assert.equal(new URL('./connexion/',origin).href,origin+'connexion/');
 assert.equal(new URL('../',origin+'connexion/').href,origin);
 const headers=readFileSync(join(root,'_headers'),'utf8')+"\n/connexion\n  Cache-Control: no-store\n  Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'\n/connexion/*\n  Cache-Control: no-store\n  Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'\n";
 if(!checkOnly){
  mkdirSync(join(output,'connexion'));
  writeFileSync(join(output,'index.html'),html);
  writeFileSync(join(output,'connexion','index.html'),portal);
  writeFileSync(join(output,'_headers'),headers);
  assert.equal(readFileSync(join(output,'index.html'),'utf8'),html);
  assert.equal(readFileSync(join(output,'connexion','index.html'),'utf8'),portal);
  assert.equal(readFileSync(join(output,'_headers'),'utf8'),headers);
 }
 console.log('SYNESTRA_R169_AUTH_ROUNDTRIP=PASS; RED=3/3; CTA=3/3; PORTAL_GUARDS=PASS; EXACT_DESIGN_DELTA=PASS; mode='+(checkOnly?'check':'export'));
}
