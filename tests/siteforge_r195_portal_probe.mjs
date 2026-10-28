/* Public, unauthenticated UI only. Do not follow Access login or expose tokens. */
import{writeFileSync}from'node:fs';import{join,dirname}from'node:path';import{fileURLToPath}from'node:url';
const root=join(dirname(fileURLToPath(import.meta.url)),'..');
const tabs=await(await fetch('http://127.0.0.1:18851/json')).json();
const page=tabs.find(t=>t.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let seq=0;const q=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&q.has(m.id)){const f=q.get(m.id);q.delete(m.id);f(m)}});
const cmd=(method,params={})=>new Promise(r=>{const id=++seq;q.set(id,r);ws.send(JSON.stringify({id,method,params}))});
await cmd('Page.enable');await cmd('Runtime.enable');
const result=[];
for(const name of['synestra-client-portal','synestra-client-portal-staging']){
 const requested='https://'+name+'.synestra-studio.workers.dev/';
 let nav;
 try{nav=await cmd('Page.navigate',{url:requested});await new Promise(r=>setTimeout(r,1500));
 const evaled=await cmd('Runtime.evaluate',{expression:"({url:location.origin+location.pathname,title:document.title,headings:[...document.querySelectorAll('h1,h2')].map(x=>x.textContent.trim().slice(0,65)).slice(0,4),needsAuthentication:/(cloudflare access|sign in|connexion|log in)/i.test(document.body?.innerText||''),visibleText:(document.body?.innerText||'').slice(0,180)})",returnByValue:true});
 result.push({name,navigateError:nav.error?.message||null,document:evaled.result?.result?.value||null});
 }catch(error){result.push({name,error:String(error)})}
 console.log('PORTAL_PUBLIC_STATUS',JSON.stringify(result.at(-1)));
}
writeFileSync(join(root,'evidence/SITEFORGE_R195_PORTAL_OBSERVATION_20261028.json'),JSON.stringify({schema:'synestra.siteforge.r195.portal.public-observation.v1',status:'OBSERVATION_ONLY',result},null,2)+'\n');
ws.close();