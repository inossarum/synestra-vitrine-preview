const pages=await(await fetch('http://127.0.0.1:18851/json')).json();
const pg=pages.find(x=>x.type==='page');
if(!pg?.webSocketDebuggerUrl)throw Error('Chrome CDP unavailable');
const ws=new WebSocket(pg.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let i=0;const queue=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&queue.has(m.id)){const c=queue.get(m.id);queue.delete(m.id);c(m.result)}});
const send=(method,params={})=>new Promise(resolve=>{const id=++i;queue.set(id,resolve);ws.send(JSON.stringify({id,method,params}))});
await send('Page.navigate',{url:'http://127.0.0.1:18850/r192/'});
await new Promise(r=>setTimeout(r,450));
const expression="(async()=>{"+
"const img=new Image();img.src='/assets/synestra-studio-official-header.webp';await img.decode();"+
"const c=document.createElement('canvas');c.width=img.width;c.height=img.height;"+
"const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);"+
"const data=ctx.getImageData(0,0,c.width,c.height).data;const groups={purple:[],green:[],cyan:[]};"+
"for(let k=0;k<data.length;k+=16){const r=data[k],g=data[k+1],b=data[k+2],a=data[k+3];"+
"if(a<180)continue;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),diff=mx-mn;"+
"if(diff<65||mx<85)continue;let h=0;if(mx===r)h=((g-b)/diff)%6;else if(mx===g)h=(b-r)/diff+2;else h=(r-g)/diff+4;h=(h*60+360)%360;"+
"const type=h>=252&&h<=320?'purple':h>=95&&h<=170?'green':h>170&&h<=215?'cyan':null;"+
"if(type)groups[type].push([r,g,b]);}"+
"const median=v=>v.slice().sort((a,b)=>a-b)[Math.floor(v.length/2)];"+
"return Object.fromEntries(Object.entries(groups).map(([name,colors])=>[name,{count:colors.length,rgb:colors.length?[0,1,2].map(k=>median(colors.map(c=>c[k]))):[]}]));"+
"})()";
const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});
if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));
console.log(JSON.stringify(r.result.value));ws.close();