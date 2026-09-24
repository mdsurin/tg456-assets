import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const output='data/lottery.json';
const groups=['thai','lao','hanoi','foreign','stock'];
const clean=value=>typeof value==='string'&&/^[0-9 ,.-]+$/.test(value)?value.trim():'';
export function transformLottery(payload,date){
 if(payload?.ok!==true||payload.date!==date||!payload.categories||typeof payload.categories!=='object')throw Error('Invalid lottery feed');
 const result=Object.fromEntries(groups.map(g=>[g,[]]));
 for(const [category,section] of Object.entries(payload.categories)){
  for(const x of section.items||[]){
   if(!x.key||!x.label||!/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(x.drawDate||''))continue;
   const drawDate=x.drawDate.slice(0,10);if(drawDate>date)continue;
   const group=category==='stock'?'stock':/hanoy|hanoi/i.test(x.key)?'hanoi':category==='maekhong'||/laos|^lpp$/.test(x.key)?'lao':category==='lottothaihot'?'thai':'foreign';
   const hasResult=x.status==='success';
   const rows=[];const add=(label,value)=>{const v=hasResult?clean(value):'';if(v)rows.push({label,value:v});};
   add(x.key==='thailotto'?'รางวัลที่ 1':'เลขที่ออก',x.result);
   add('3 ตัวบน',x.top3);add('2 ตัวบน',x.top2);
   // This provider combines Thai front/back three-digit prizes in one field.
   add(x.key==='thailotto'?'เลข 3 ตัว (รวมหน้า–ท้าย)':'3 ตัวล่าง',x.bottom3);
   add('2 ตัวล่าง',x.bottom2);
   const status=hasResult&&rows.length?'success':x.status==='pending'?'pending':x.status==='close'||x.status==='reject'?'closed':'unavailable';
   result[group].push({id:x.key,name:String(x.label).slice(0,120),drawDate,status,rows:status==='success'?rows:[],source:'ThaiLottoAPI'});
  }
 }
 if(!Object.values(result).some(x=>x.length))throw Error('Empty provider response');
 return result;
}
export async function updateLottery(){
 const now=new Date(),date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 let previous={};try{previous=JSON.parse(await readFile(output,'utf8'));}catch{}
 let state;
 try{
  const response=await fetch('https://thailottoapi.com/api/results?'+new URLSearchParams({date}),{headers:{Accept:'application/json'},signal:AbortSignal.timeout(25000)});
  if(!response.ok)throw Error('HTTP '+response.status);
  const groups=transformLottery(await response.json(),date);
  state={version:1,date,updatedAt:now.toISOString(),source:'ThaiLottoAPI',sourceUrl:'https://www.thailottoapi.com/docs',error:false,groups};
  console.log('Lottery: '+Object.values(groups).flat().length+' entries; '+Object.values(groups).flat().filter(x=>x.status==='success').length+' published results');
 }catch(e){state={...previous,error:true};console.error('Lottery refresh failed; retaining last successful dated results.');process.exitCode=1;}
 await mkdir('data',{recursive:true});await writeFile(output,JSON.stringify(state)+'\n');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await updateLottery();
