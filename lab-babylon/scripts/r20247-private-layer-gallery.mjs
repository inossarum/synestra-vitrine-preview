// Private Synestra R202.47 visual gallery; isolated GitHub Actions only.
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
const exec=promisify(execFile),root=resolve(import.meta.dirname,'..');
const out=process.env.R20247_GALLERY_DIR,chrome=process.env.R202_CHROME_BIN;
const exp=process.env.R20247_EXPERIMENTAL_BUNDLE,base=join(root,'dist/babylon-lab.js');
if(!out||!chrome||!exp||!existsSync(exp)||!existsSync(base))throw Error('R20247_INPUT_MISSING');
const sha=b=>createHash('sha256').update(b).digest('hex');
const screens=[
{id:'reference',mode:'full',bundle:'base',title:'R202.44 — référence conservée',note:'Candidat actuel en PR #52.'},
{id:'sans-volume',mode:'no-volume',bundle:'base',title:'R202.44 — sans volume',note:'Masque le carrier volumétrique pour isoler le brouillard.'},
{id:'sans-rubans',mode:'no-ribbons',bundle:'base',title:'R202.44 — sans rubans',note:'Masque les rubans, gaines et flux du groupe plasma.'},
{id:'noyau-seul',mode:'core-only',bundle:'base',title:'R202.44 — noyau isolé',note:'Conserve seulement les faces du noyau et son masque.'},
{id:'essai-r20246',mode:'full',bundle:'experimental',title:'R202.46 — expérimentation rejetée',note:'Ouverture centrale excessive qui assombrit le plasma.'}
];
function qaInjection(mode){
const js="(()=>{const mode="+JSON.stringify(mode)+";if(mode==='full')return;const t=setInterval(()=>{const a=globalThis.__synestraLabAtlasInterop,s=a?.getScene?.(),c=document.querySelector('canvas');if(!s||!c||!s.meshes.some(m=>m.name==='r20215-volume-carrier'))return;const off=m=>{const n=m.name;if(mode==='no-volume')return n==='r20215-volume-carrier';if(mode==='no-ribbons')return /^(plasma-ribbon-|plasma-sheath-|node-plasma-)/.test(n);if(mode==='core-only')return n!=='central nucleus'&&n!=='central nucleus facet depth mask';return false};const hide=s.meshes.filter(off);if(!hide.length){c.dataset.qaLayer='INVALID';clearInterval(t);return;}const set=()=>hide.forEach(m=>m.isVisible=false);s.onBeforeRenderObservable.add(set);set();c.dataset.qaLayer=mode;c.dataset.qaHidden=String(hide.length);clearInterval(t);},10);})();";
return '<script>'+js+'</script>';
}
const server=createServer((req,res)=>{
const u=new URL(req.url,'http://127.0.0.1'),m=u.pathname.match(/^\/(base|experimental)\/lab-babylon\/(.*)$/);
if(!m){res.writeHead(404);res.end();return;}const file=m[2]||'index.html';
if(!['index.html','style.css','dist/babylon-lab.js'].includes(file)){res.writeHead(404);res.end();return;}
const type=file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css':'application/javascript';
let body;
if(file==='dist/babylon-lab.js')body=readFileSync(m[1]==='base'?base:exp);
else if(file==='index.html'){const mode=u.searchParams.get('qaLayer')||'full';
if(!['full','no-volume','no-ribbons','core-only'].includes(mode)){res.writeHead(400);res.end();return;}
body=readFileSync(join(root,file),'utf8').replace('</body>',qaInjection(mode)+'</body>');
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
if(!result.stdout.includes(key))throw Error('R20247_READINESS_'+item.id+'_'+key);}
if(item.mode!=='full'&&!result.stdout.includes('data-qa-layer="'+item.mode+'"'))throw Error('R20247_LAYER_MISSING_'+item.id);
if(!existsSync(dest)||statSync(dest).size<20000)throw Error('R20247_SCREENSHOT_MISSING_'+item.id);
const data=readFileSync(dest);if(data.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('R20247_BAD_PNG_'+item.id);
const meta={...item,file,bytes:data.length,sha256:sha(data)};manifest.push(meta);
console.log('R20247_CAPTURE_PASS '+JSON.stringify(meta));
}
const htmlParts=['<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Synestra · Labo 3D</title>',
'<style>:root{color-scheme:dark}body{margin:0;background:#090e1d;color:#e9eefb;font:16px system-ui,Arial}header{padding:28px 4vw;background:linear-gradient(105deg,#101833,#281447)}h1{margin:0;font-size:36px}p{color:#bbc5dd;line-height:1.5}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;max-width:1300px;margin:24px auto;padding:0 20px}article{background:#121b31;border:1px solid #273453;border-radius:14px;overflow:hidden;padding-bottom:14px}img{display:block;width:100%;height:auto}h2{font-size:18px;margin:14px 16px 4px}article p,small{margin:0 16px}small{color:#8d9abd}footer{padding:30px;color:#a1acc7}</style>',
'<header><h1>Synestra · Labo 3D</h1><p>Rendus comparatifs R202.44 / R202.46 · Chrome 155 / SwiftShader · Frame 6 · Ultra · Puissance 145 %.</p><p>Images réelles, statiques et en pleine résolution. Galerie privée, sans mise en ligne publique.</p></header><main>'];
for(const item of manifest)htmlParts.push('<article><img src="'+item.file+'" alt="'+item.title+'"><h2>'+item.title+'</h2><p>'+item.note+'</p><small>SHA256 '+item.sha256.slice(0,20)+'…</small></article>');
htmlParts.push('</main><footer>R202.44 est la référence retenue. R202.46 est une expérience rejetée. Le rendu RTX 3090 n’est pas attesté.</footer></html>');
writeFileSync(join(out,'index.html'),htmlParts.join('\n'));
writeFileSync(join(out,'manifest.json'),JSON.stringify({schema:'synestra.r20247.private.layer.gallery.v1',viewport:'1100x900',renderer:'Chrome 155 SwiftShader',reference_sha:'40831cc0df4b65346ebe84c5503638eadfa70156',experimental_sha:'8392805de2dc790c6ed68857671afa82d1d04f05',images:manifest},null,2));
console.log('R20247_PRIVATE_GALLERY_PASS image_count='+manifest.length+' artifact_only=true');
}finally{await new Promise(ok=>server.close(ok));}
