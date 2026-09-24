import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

const output = 'data/sports.json';
const age = (time, now) => now - Date.parse(time || '') ;
export function transform(fixtures, odds) {
  const prices = new Map(odds.map(item => [item.fixture?.id, item]));
  return fixtures.filter(x => x.fixture?.id && x.teams?.home && x.teams?.away).map(x => {
    const quote = prices.get(x.fixture.id);
    const bookmaker = quote?.bookmakers?.find(b => b.bets?.some(v => v.id === 1));
    const selections = (bookmaker?.bets?.find(b => b.id === 1)?.values || []).map(v => ({
      outcomeType: {Home:'Home', Draw:'Tie', Away:'Away'}[v.value], odds:Number(v.odd)
    })).filter(v => v.outcomeType && Number.isFinite(v.odds) && v.odds > 0);
    const status = x.fixture.status?.short;
    return {id:x.fixture.id, leagueName:x.league.name, startTime:x.fixture.date,
      isLive:['1H','HT','2H','ET','BT','P','LIVE'].includes(status),
      status:['FT','AET','PEN'].includes(status) ? 'finished' : ['PST','CANC','ABD','SUSP','INT'].includes(status) ? 'unavailable' : 'scheduled',
      statusLabel:{PST:'เลื่อนการแข่งขัน',CANC:'ยกเลิก',ABD:'ยุติการแข่งขัน',SUSP:'พักการแข่งขัน',INT:'หยุดชั่วคราว'}[status],
      homeTeam:{name:x.teams.home.name,logo:x.teams.home.logo,score:x.goals?.home},
      awayTeam:{name:x.teams.away.name,logo:x.teams.away.logo,score:x.goals?.away},
      selections, oddsSource:bookmaker?.name || null, oddsUpdatedAt:quote?.update || null};
  }).sort((a,b) => Number(b.isLive)-Number(a.isLive) || Number(b.selections.length>0)-Number(a.selections.length>0) || Date.parse(a.startTime)-Date.parse(b.startTime)).slice(0,100);
}

export async function update() {
  const key = process.env.APISPORTS_KEY;
  if (!key) throw new Error('APISPORTS_KEY secret is required');
  const now = Date.now();
  const date = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
  let previous = {};
  try { previous = JSON.parse(await readFile(output,'utf8')); } catch {}
  if (previous.date === date && age(previous.updatedAt,now) < 25*60000) return;
  // A persisted daily ceiling also limits repeated manual runs. Leave quota for dashboard testing.
  const quotaDay = new Date(now).toISOString().slice(0,10);
  const usage = previous.usage?.day === quotaDay ? previous.usage : {day:quotaDay,count:0};
  async function api(path, params) {
    if (usage.count >= 85) throw new Error('Daily collection budget reached');
    usage.count++;
    const response = await fetch('https://v3.football.api-sports.io/'+path+'?'+new URLSearchParams(params),{
      headers:{'x-apisports-key':key},signal:AbortSignal.timeout(20000)
    });
    if (!response.ok) throw new Error('Provider HTTP '+response.status);
    const payload = await response.json();
    if (Object.keys(payload.errors || {}).length || !Array.isArray(payload.response)) throw new Error('Provider rejected request');
    return payload;
  }
  const state = {...previous,usage};
  let failed = false;
  try {
    const fixtures = await api('fixtures',{date,timezone:'Asia/Bangkok'});
    let odds = previous.date === date ? previous.odds || [] : [];
    let oddsFetchedAt = previous.date === date ? previous.oddsFetchedAt : null;
    if (!oddsFetchedAt || age(oddsFetchedAt,now) >= 3*3600000) {
      try {
        // At most 20 fixtures with odds per update: 2 pages every three hours.
        const first = await api('odds',{date,timezone:'Asia/Bangkok',bet:'1',page:'1'});
        const next = first.paging?.total > 1 ? await api('odds',{date,timezone:'Asia/Bangkok',bet:'1',page:'2'}) : {response:[]};
        odds = [...first.response,...next.response]; oddsFetchedAt = new Date(now).toISOString();
      } catch { console.warn('Odds refresh unavailable; retaining timestamped prior quotes.'); }
    }
    // Do not keep pre-match quotes once an event is in play or completed.
    const data = transform(fixtures.response,odds).map(m => m.isLive || m.status !== 'scheduled' ? {...m,selections:[],oddsSource:null,oddsUpdatedAt:null} : m);
    Object.assign(state,{date,updatedAt:new Date(now).toISOString(),source:'API-SPORTS',sports:{soccer:{data}},odds,oddsFetchedAt});
  } catch { failed = true; console.error('Sports refresh failed; prior successful data is retained.'); }
  await mkdir('data',{recursive:true});
  await writeFile(output,JSON.stringify(state)+'\n');
  if (failed) process.exitCode = 1;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await update();
