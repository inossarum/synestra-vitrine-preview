// Private Synestra R202.49 visual gallery; isolated GitHub Actions only.
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
const exec=promisify(execFile),root=resolve(import.meta.dirname,'..');
const out=process.env.R20249_GALLERY_DIR,chrome=process.env.R202_CHROME_BIN;
const base=join(root,'dist/babylon-lab.js');
if(!out||!chrome||!existsSync(base))throw Error('R20249_INPUT_MISSING');
const sha=b=>createHash('sha256').update(b).digest('hex');
const screens=[
{id:'reference',mode:'full',bundle:'base',title:'R202.44 · Rendu complet',note:'Référence de contrôle : noyau, raymarch, rubans et GlowLayer.'},
{id:'sans-emission-analytique',mode:'no-analytic',bundle:'base',title:'Sans émission analytique du volume',note:'uCorePower du volume neutralisé après mise à jour ; facettes maintenues.'},
{id:'sans-facettes',mode:'no-facets',bundle:'base',title:'Sans noyau facetté',note:'Noyau matériel et masque retirés, émission analytique volumique maintenue.'},
{id:'sans-glow',mode:'no-glow',bundle:'base',title:'Sans GlowLayer',note:'Couche de glow existante neutralisée ; sources lumineuses conservées.'},
{id:'sans-volume',mode:'no-volume',bundle:'base',title:'Sans raymarch volumique',note:'Volume et son émission analytique absents ; facettes et filaments maintenus.'}
];
function qaInjection(mode){
const js="(()=>{const mode="+JSON.stringify(mode)+";if(mode==='full')return;let tries=0;const t=setInterval(()=>{const a=globalThis.__synestraLabAtlasInterop,s=a?.getScene?.(),cv=document.querySelector('canvas');const vol=s?.meshes?.find(m=>m.name==='r20215-volume-carrier');const core=s?.meshes?.find(m=>m.name==='central nucleus');const mask=s?.meshes?.find(m=>m.name==='central nucleus facet depth mask');if(!s||!cv||!vol||!core||!mask){if(++tries>350){if(cv)cv.dataset.qaLayer='TIMEOUT';clearInterval(t);}return;}let fn=null;if(mode==='no-analytic'){if(!vol.material?.setFloat){cv.dataset.qaLayer='BAD_MATERIAL';clearInterval(t);return;}fn=()=>vol.material.setFloat('uCorePower',0);}else if(mode==='no-facets'){fn=()=>{core.isVisible=false;mask.isVisible=false;};}else if(mode==='no-glow'){const g=s.effectLayers?.find(x=>x.name==='glow');if(!g){cv.dataset.qaLayer='BAD_GLOW';clearInterval(t);return;}fn=()=>{g.intensity=0;};}else if(mode==='no-volume'){fn=()=>{vol.isVisible=false;};}else{cv.dataset.qaLayer='BAD_MODE';clearInterval(t);return;}s.onBeforeRenderObservable.add(fn);fn();cv.dataset.qaLayer=mode;clearInterval(t);},10);})();";
return js;
}
const server=createServer((req,res)=>{
const u=new URL(req.url,'http://127.0.0.1'),m=u.pathname.match(/^\/base\/lab-babylon\/(.*)$/);
if(!m){res.writeHead(404);res.end();return;}const file=m[1]||'index.html';
if(!['index.html','style.css','dist/babylon-lab.js','qa-layer-controller.js'].includes(file)){res.writeHead(404);res.end();return;}
const type=file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css':'application/javascript';
let body;
if(file==='dist/babylon-lab.js')body=readFileSync(base);
else if(file==='qa-layer-controller.js'){
 const mode=u.searchParams.get('qaLayer')||'full';
 if(!['full','no-volume','no-analytic','no-facets','no-glow'].includes(mode)){res.writeHead(400);res.end();return;}
 body=qaInjection(mode);
}
else if(file==='index.html'){const mode=u.searchParams.get('qaLayer')||'full';
if(!['full','no-volume','no-analytic','no-facets','no-glow'].includes(mode)){res.writeHead(400);res.end();return;}
body=readFileSync(join(root,file),'utf8').replace('</body>','<script src="./qa-layer-controller.js?qaLayer='+mode+'" defer></script></body>');
}else body=readFileSync(join(root,file));
res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(body);
});
await new Promise((yes,no)=>{server.once('error',no);server.listen(0,'127.0.0.1',yes)});
const manifest=[];
try{
mkdirSync(out,{recursive:true});
for(const item of screens){
const url='http://127.0.0.1:'+server.address().port+'/'+item.bundle+'/lab-babylon/?labFrame=6&qaQuality=ultra&qaPower=145&qaLayer='+item.mode;
const file=item.id+'.png',dest=join(out,file);
const args=['--headless=new','--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--enable-webgl','--virtual-time-budget=4500','--window-size=1100,900','--screenshot='+dest,'--dump-dom',url];
const result=await exec(chrome,args,{timeout:50000,maxBuffer:5000000});
for(const key of ['data-sphere-ready="true"','data-canvas-count="1"','data-facet-depth-active="true"']){
if(!result.stdout.includes(key))throw Error('R20249_READINESS_'+item.id+'_'+key);}
if(item.mode!=='full'&&!result.stdout.includes('data-qa-layer="'+item.mode+'"'))throw Error('R20249_LAYER_MISSING_'+item.id);
if(!existsSync(dest)||statSync(dest).size<20000)throw Error('R20249_SCREENSHOT_MISSING_'+item.id);
const data=readFileSync(dest);if(data.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('R20249_BAD_PNG_'+item.id);
const meta={...item,file,bytes:data.length,sha256:sha(data)};
if(item.id==='reference'&&meta.sha256!=='aa6a1f600a19ac8b61da7e4d7e6c2213ef03722cbdcd2304531a8f3ed0087135')throw Error('R20249_REFERENCE_SHA_MISMATCH');
manifest.push(meta);
console.log('R20249_CAPTURE_PASS '+JSON.stringify(meta));
}
const htmlParts=['<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Synestra · Labo 3D</title>',
'<style>:root{color-scheme:dark}body{margin:0;background:#090e1d;color:#e9eefb;font:16px system-ui,Arial}header{padding:28px 4vw;background:linear-gradient(105deg,#101833,#281447)}h1{margin:0;font-size:36px}p{color:#bbc5dd;line-height:1.5}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;max-width:1300px;margin:24px auto;padding:0 20px}article{background:#121b31;border:1px solid #273453;border-radius:14px;overflow:hidden;padding-bottom:14px}img{display:block;width:100%;height:auto}h2{font-size:18px;margin:14px 16px 4px}article p,small{margin:0 16px}small{color:#8d9abd}footer{padding:30px;color:#a1acc7}</style>',
'<header><h1>Synestra · Labo 3D</h1><p>Décomposition des contributions lumineuses · Chrome 155 / SwiftShader · Frame 6 · Ultra · Puissance 145 %.</p><p>Images réelles, statiques et en pleine résolution. Galerie privée, sans mise en ligne publique.</p></header><main>'];
for(const item of manifest)htmlParts.push('<article><img src="'+item.file+'" alt="'+item.title+'"><h2>'+item.title+'</h2><p>'+item.note+'</p><small>SHA256 '+item.sha256.slice(0,20)+'…</small></article>');
htmlParts.push('</main><footer>Diagnostic temporaire : aucun shader modifié. Aucun rendu RTX 3090 attesté.</footer></html>');
writeFileSync(join(out,'index.html'),htmlParts.join('\n'));
writeFileSync(join(out,'manifest.json'),JSON.stringify({schema:'synestra.r20249.composition.gallery.v1',viewport:'1100x900',renderer:'Chrome 155 SwiftShader',reference_sha:'40831cc0df4b65346ebe84c5503638eadfa70156',images:manifest},null,2));
console.log('R20249_PRIVATE_GALLERY_PASS image_count='+manifest.length+' artifact_only=true');
}finally{await new Promise(ok=>server.close(ok));}
