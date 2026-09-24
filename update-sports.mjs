import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const output='data/sports.json';
const hosts={soccer:'v3.football',basketball:'v1.basketball',volleyball:'v1.volleyball',baseball:'v1.baseball',mma:'v1.mma'};
const finished=['FT','AET','PEN','AOT','AP'];
const unavailable=['PST','CANC','ABD','SUSP','INT','AWD','WO'];
const live=['1H','HT','2H','ET','BT','P','LIVE','Q1','Q2','Q3','Q4','OT','BT','S1','S2','S3','S4','S5','IN1','IN2','IN3','IN4','IN5','IN6','IN7','IN8','IN9','IN10','IN11','IN12'];
export function selections(quote,sport){
  for(const book of quote?.bookmakers||[]){
    for(const bet of book.bets||[]){
      if(sport==='soccer' ? bet.id!==1 : !/^(match winner|home\/away|winner|moneyline)$/i.test(bet.name||'')) continue;
      const values=(bet.values||[]).map(v=>({outcomeType:({Home:'Home',Away:'Away',Draw:'Tie','1':'Home','2':'Away'})[v.value],odds:Number(v.odd)})).filter(v=>v.outcomeType&&Number.isFinite(v.odds)&&v.odds>1);
      if(values.some(v=>v.outcomeType==='Home')&&values.some(v=>v.outcomeType==='Away'))return {selections:values,oddsSource:book.name,oddsUpdatedAt:quote.update||null};
    }
  }
  return {selections:[],oddsSource:null,oddsUpdatedAt:null};
}
export function transform(items,odds=[],sport='soccer'){
  const prices=new Map(odds.map(x=>[x.fixture?.id||x.game?.id||x.fight?.id,x]));
  return items.map(x=>{
    const e=sport==='soccer'?x.fixture:x;
    const a=sport==='mma'?x.fighters?.first:x.teams?.home,b=sport==='mma'?x.fighters?.second:x.teams?.away;
    if(!e?.id||!a||!b)return null;
    const short=e.status?.short;
    const isLive=live.includes(short)||/in progress|in play|round \d|set \d|quarter \d|inning/i.test(e.status?.long||'');
    const status=finished.includes(short)?'finished':unavailable.includes(short)?'unavailable':'scheduled';
    const score=v=>typeof v==='number'?v:v?.total??null;
    const m={id:e.id,leagueName:sport==='mma'?x.slug:x.league?.name,startTime:e.date,isLive,status,
      statusLabel:{PST:'เลื่อนการแข่งขัน',CANC:'ยกเลิก',ABD:'ยุติการแข่งขัน',SUSP:'พักการแข่งขัน',INT:'หยุดชั่วคราว'}[short],
      homeTeam:{name:a.name,logo:a.logo,score:sport==='soccer'?x.goals?.home:sport==='mma'?null:score(x.scores?.home)},
      awayTeam:{name:b.name,logo:b.logo,score:sport==='soccer'?x.goals?.away:sport==='mma'?null:score(x.scores?.away)},
      ...selections(prices.get(e.id),sport)};
    if(sport==='mma'){m.homeTeam.winner=a.winner;m.awayTeam.winner=b.winner;m.resultText=a.winner?'ผู้ชนะ: '+a.name:b.winner?'ผู้ชนะ: '+b.name:status==='finished'?'จบการแข่งขัน':null;}
    if(isLive||status!=='scheduled')Object.assign(m,{selections:[],oddsSource:null,oddsUpdatedAt:null});
    return m;
  }).filter(Boolean).sort((a,b)=>Number(b.isLive)-Number(a.isLive)||Number(b.leagueName?.includes('Thai'))-Number(a.leagueName?.includes('Thai'))||Number(b.selections.length>0)-Number(a.selections.length>0)||Date.parse(a.startTime)-Date.parse(b.startTime)).slice(0,150);
}
export async function update(){
  const key=process.env.APISPORTS_KEY;if(!key)throw new Error('APISPORTS_KEY required');
  const now=Date.now(),stamp=new Date(now).toISOString();
  const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  let previous={};try{previous=JSON.parse(await readFile(output,'utf8'));}catch{}
  const state={schemaVersion:2,date,updatedAt:previous.updatedAt||stamp,source:'API-SPORTS',sports:{...previous.sports},oddsCache:previous.oddsCache||{},usage:{day:stamp.slice(0,10),bySport:previous.usage?.day===stamp.slice(0,10)?previous.usage.bySport||{}:{}}};
  async function api(sport,path,params){
    const count=state.usage.bySport[sport]||0;if(count>=10000)throw new Error('Collection budget reached');state.usage.bySport[sport]=count+1;
    const response=await fetch('https://'+hosts[sport]+'.api-sports.io/'+path+'?'+new URLSearchParams(params),{headers:{'x-apisports-key':key},signal:AbortSignal.timeout(20000)});
    if(!response.ok)throw new Error('Provider HTTP '+response.status);
    const body=await response.json();if(Object.keys(body.errors||{}).length||!Array.isArray(body.response))throw new Error('Provider rejected '+path+': '+Object.keys(body.errors||{}).join(','));return body;
  }
  let successes=0;
  for(const sport of Object.keys(hosts)){
    try{
      const payload=await api(sport,sport==='soccer'?'fixtures':sport==='mma'?'fights':'games',sport==='mma'?{season:date.slice(0,4),timezone:'Asia/Bangkok'}:{date,timezone:'Asia/Bangkok'});
      let items=payload.response;
      if(sport==='mma')items=items.filter(x=>{const t=Date.parse(x.date);return t>=now-7*86400000&&t<=now+14*86400000;});
      let cache=state.oddsCache[sport];
      if(!cache||cache.date!==date||now-Date.parse(cache.fetchedAt)>30*60000){
        try{
          let quotes=[];
          if(sport==='soccer'){
            const first=await api(sport,'odds',{date,timezone:'Asia/Bangkok',bet:'1',page:'1'});quotes=first.response;
            for(let page=2;page<=Math.min(first.paging?.total||1,20);page++)quotes.push(...(await api(sport,'odds',{date,timezone:'Asia/Bangkok',bet:'1',page:String(page)})).response);
          }else{
            const upcoming=transform(items,[],sport).filter(x=>x.status==='scheduled'&&!x.isLive&&Date.parse(x.startTime)>now).slice(0,20);
            for(const game of upcoming){const response=await api(sport,'odds',{[sport==='mma'?'fight':'game']:String(game.id)});quotes.push(...response.response);}
          }
          cache={date,fetchedAt:stamp,quotes};state.oddsCache[sport]=cache;
        }catch(error){console.warn(sport+': odds unavailable ('+error.message+'); keeping prior quotes.');}
      }
      const quotes=cache?.date===date&&now-Date.parse(cache.fetchedAt)<2*3600000?cache.quotes:[];
      const data=transform(items,quotes,sport);
      state.sports[sport]={data,updatedAt:stamp,date,window:sport==='mma'?'past7-next14':'today',error:false};successes++;
      console.log(sport+': '+data.length+' matches, '+data.filter(x=>x.selections.length).length+' with prematch odds');
    }catch(error){console.warn(sport+': '+error.message);state.sports[sport]={...(previous.sports?.[sport]||{data:[],updatedAt:null}),error:true};}
  }
  if(successes)state.updatedAt=stamp;
  await mkdir('data',{recursive:true});await writeFile(output,JSON.stringify(state)+'\n');
  if(successes!==Object.keys(hosts).length)process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await update();
