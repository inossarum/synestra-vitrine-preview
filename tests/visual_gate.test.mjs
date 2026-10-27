import {test} from 'node:test';
import assert from 'node:assert/strict';
import {deflateSync} from 'node:zlib';
import {spawnSync} from 'node:child_process';
import {fingerprintPng,compareVisualFingerprints,inspectVisualFingerprint} from '../tools/visual_fingerprint.mjs';
const T=Uint32Array.from({length:256},(_,i)=>{let c=i;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
const crc=b=>{let c=0xffffffff;for(const a of b)c=T[(c^a)&255]^(c>>>8);return (c^0xffffffff)>>>0;};
function chunk(t,b){const n=Buffer.alloc(4),tail=Buffer.alloc(4),type=Buffer.from(t);n.writeUInt32BE(b.length);tail.writeUInt32BE(crc(Buffer.concat([type,b])));return Buffer.concat([n,type,b,tail]);}
function png({changed=false,width=320,height=240}={}){
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=2;
 const rows=[];for(let y=0;y<height;y++){
  const b=Buffer.alloc(width*3);
  for(let x=0;x<width;x++){const i=x*3,inside=changed&&x>55&&x<220&&y>35&&y<160;b[i]=inside?180:20;b[i+1]=inside?25:55;b[i+2]=inside?25:90;}
  rows.push(Buffer.from([0]),b);
 }
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(Buffer.concat(rows))),chunk('IEND',Buffer.alloc(0))]);
}
const a=()=>fingerprintPng(png());
test('synthetic true RGB PNG produces derived only map',()=>{
 const f=a();assert.equal(f.rgb.length,576);assert.equal(f.tileHashes.length,192);assert.equal(inspectVisualFingerprint(f).status,'ADVISORY_FINGERPRINT');
});
test('same pixel image produces no difference without quality claim',()=>{
 const r=compareVisualFingerprints(a(),a());assert.equal(r.changedTileCount,0);assert.equal(r.qualityProven,false);
});
test('colored change triggers actual per-tile delta',()=>{
 const r=compareVisualFingerprints(a(),fingerprintPng(png({changed:true})));assert.ok(r.changedTileCount>0);assert.equal(r.visualDefectProven,false);
});
test('untrusted screenshot path and forged PASS are rejected',()=>{
 const f=a();f.path='C:\\secret';assert.equal(inspectVisualFingerprint(f).status,'REJECTED');
 const g=a();g.qualityProven=true;assert.equal(inspectVisualFingerprint(g).status,'REJECTED');
});
test('different dimensions fail closed',()=>assert.equal(compareVisualFingerprints(a(),fingerprintPng(png({width:400}))).reason,'VIEWPORT_CONTEXT_MISMATCH'));
test('corrupt PNG / CRC rejected',()=>{
 const bytes=png();bytes[48]^=100;assert.throws(()=>fingerprintPng(bytes),/PNG_/);
});
test('forged identical digest conflicts with visual data',()=>{
 const one=a(),two=structuredClone(one);two.rgb[0]=255;assert.equal(compareVisualFingerprints(one,two).reason,'FINGERPRINT_CONTENT_CONFLICT');
});
function call(items){
 const result=spawnSync(process.execPath,[new URL('../tools/web_pilot_mcp_stdio.mjs',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1')],{
 input:items.map(x=>JSON.stringify(x)).join('\n')+'\n',encoding:'utf8',timeout:5000,maxBuffer:1024*1024});
 assert.equal(result.status,0,result.stderr);return result.stdout.trim().split(/\r?\n/).map(JSON.parse);
}
const msg=(id,method,params)=>({jsonrpc:'2.0',id,method,...(params?{params}:{})});
const init=msg(1,'initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'isolated-qa',version:'1'}});
test('existing MCP dispatcher retains four plus two visual tools',()=>{
 const r=call([init,msg(2,'tools/list')]);assert.equal(r[1].result.tools.length,6);
 assert.ok(r[1].result.tools.every(t=>t.annotations.readOnlyHint));
});
test('actual local MCP inspect accepts only fingerprint',()=>{
 const r=call([init,msg(2,'tools/call',{name:'synestra_web_inspect_visual_fingerprint',arguments:{visual:a()}})]);
 assert.equal(r[1].result.structuredContent.status,'ADVISORY_FINGERPRINT');
 assert.equal(r[1].result.structuredContent.screenshotBytesTransferred,false);
});
test('actual local MCP visual compare detects change and recovery',()=>{
 const f=a(),g=fingerprintPng(png({changed:true}));
 const r=call([init,msg(2,'tools/call',{name:'synestra_web_compare_visual_fingerprints',arguments:{before:f,after:g}}),
 msg(3,'tools/call',{name:'synestra_web_compare_visual_fingerprints',arguments:{before:f,after:f}})]);
 assert.equal(r[1].result.structuredContent.status,'ADVISORY_VISUAL_CHANGE');
 assert.equal(r[2].result.structuredContent.changedTileCount,0);
});
test('MCP refuses host commands and screenshot bytes',()=>{
 const r=call([init,msg(2,'tools/call',{name:'shell.exec',arguments:{command:'whoami'}}),
 msg(3,'tools/call',{name:'synestra_web_inspect_visual_fingerprint',arguments:{visual:a(),path:'D:\\'}})]);
 assert.equal(r[1].error.code,-32602);assert.equal(r[2].error.code,-32602);
});
