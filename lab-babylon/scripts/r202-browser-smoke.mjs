import {createServer} from 'node:http';
import {readFileSync,existsSync,statSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync,execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
const exec=promisify(execFile);
const root=resolve(import.meta.dirname,'..');
const paths=new Map([['/lab-babylon/','index.html'],['/lab-babylon/index.html','index.html'],['/lab-babylon/style.css','style.css'],['/lab-babylon/dist/babylon-lab.js','dist/babylon-lab.js']]);
const server=createServer((req,res)=>{const f=paths.get(new URL(req.url,'http://127.0.0.1').pathname);if(!f){res.writeHead(404);res.end();return;}let mime=f.endsWith('.html')?'text/html':f.endsWith('.css')?'text/css':'application/javascript';res.writeHead(200,{'Content-Type':mime});res.end(readFileSync(join(root,f)));});
await new Promise((ok,fail)=>{server.once('error',fail);server.listen(0,'127.0.0.1',ok)});
try{
 const chrome=['google-chrome','google-chrome-stable','chromium','chromium-browser'].find(bin=>spawnSync(bin,['--version'],{encoding:'utf8',timeout:2000}).status===0);
 if(!chrome)throw Error('R202_CHROME_BINARY_UNAVAILABLE');
 for(const width of [1100,390]){
  const shot=join(process.env.RUNNER_TEMP||tmpdir(),'r202-ci-'+width+'.png');
  const args=['--headless=new','--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-gl=angle','--use-angle=swiftshader','--enable-webgl','--virtual-time-budget=5000','--window-size='+width+',900','--screenshot='+shot,'--dump-dom','http://127.0.0.1:'+server.address().port+'/lab-babylon/'];
  const {stdout}=await exec(chrome,args,{timeout:35000,maxBuffer:3000000});
  for(const val of ['data-sphere-ready="true"','data-plasma-field="r202-plasma-field"','data-canvas-count="1"','data-visible-plasma-field="2"'])
   if(!stdout.includes(val))throw Error('R202_CHROME_ASSERTION_'+width+'_'+val);
  if(!existsSync(shot)||statSync(shot).size<20000)throw Error('R202_EMPTY_SCREENSHOT_'+width);
  const data=readFileSync(shot);
  console.log(JSON.stringify({status:'R202_NATIVE_CHROME_SMOKE_PASS',width,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')}));
 }
}finally{await new Promise(ok=>server.close(ok))}
