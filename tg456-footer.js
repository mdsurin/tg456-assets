(function(){var v=new Date().toISOString().slice(0,13);var b='https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/';var l=document.createElement('link');l.rel='stylesheet';l.href=b+'custom.css?v='+v;document.head.appendChild(l);var s=document.createElement('script');s.src=b+'custom.js?v='+v;document.body.appendChild(s);function fixLogo(){if(window.innerWidth>768)return;var logo=document.querySelector('.navbar-brand, .main-logo-member');if(!logo)return;var nav=document.querySelector('.navbar, #main-nav');if(nav)nav.style.setProperty('position','relative','important');logo.style.setProperty('position','absolute','important');logo.style.setProperty('left','60px','important');logo.style.setProperty('top','5px','important');logo.style.setProperty('transform','none','important');logo.style.setProperty('margin','0','important');logo.style.setProperty('z-index','5','important');var h=window.innerWidth<=480?80:80;var img=logo.querySelector('img');if(img){img.style.setProperty('height',h+'px','important');img.style.setProperty('max-height',h+'px','important');img.style.setProperty('width','auto','important');}}function fixWrapper(){if(window.innerWidth>768)return;var wrapper=document.querySelector('.wrapper.sub-page');if(wrapper)wrapper.style.setProperty('padding-top','0','important');}function run(){fixLogo();fixWrapper();}run();window.addEventListener('resize',run);document.addEventListener('DOMContentLoaded',run);var target=document.body;if(target){new MutationObserver(run).observe(target,{childList:true,subtree:true});}})();
(function(){function upOne(sel){var h=document.querySelector(sel);if(!h||h.dataset.hex)return;h.dataset.hex='1';var inner=h.innerHTML.trim();h.classList.add('line-block','container','hex-head');h.innerHTML='<span class="line"></span><div class="hexagon-x"></div><span class="txt-center-xy">'+inner+'</span>';}function up(){upOne('.lwd-widget .lwd-head');upOne('.sp-widget .sp-head');upOne('.lot-widget .lot-head');}setInterval(up,1500);setTimeout(up,2500);})();
(function(){var GU='https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/slot-games.json';var GC=null;function pad(n,l){var s=String(n);while(s.length<l)s='0'+s;return s;}function ru(){return 'bqp'+pad(Math.floor(Math.random()*1e9),9);}function ft(t){if(!t)return '';t=String(t).replace(/-\d+-[a-z]$/,'').replace(/-\d+$/,'').replace(/-/g,' ').trim();return t.replace(/\b\w/g,function(c){return c.toUpperCase();});}function fmt(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}function ra(){var r=Math.random();if(r<0.5)return 5000+Math.floor(Math.random()*45000);if(r<0.8)return 50000+Math.floor(Math.random()*150000);if(r<0.95)return 200000+Math.floor(Math.random()*600000);return 800000+Math.floor(Math.random()*1200000);}var FALLBK=[{name:'กสิกรไทย',bg:'#138f2d',logo:'/g_assets/img/bank-logo/kbank.svg'},{name:'กสิกรไทย',bg:'#138f2d',logo:'/g_assets/img/bank-logo/kbank.svg'},{name:'กสิกรไทย',bg:'#138f2d',logo:'/g_assets/img/bank-logo/kbank.svg'},{name:'ไทยพาณิชย์',bg:'#4e2e7f',logo:'/g_assets/img/bank-logo/scb.svg'},{name:'ไทยพาณิชย์',bg:'#4e2e7f',logo:'/g_assets/img/bank-logo/scb.svg'},{name:'ไทยพาณิชย์',bg:'#4e2e7f',logo:'/g_assets/img/bank-logo/scb.svg'},{name:'กรุงเทพ',bg:'#1e4598',logo:'/g_assets/img/bank-logo/bbl.svg'},{name:'กรุงเทพ',bg:'#1e4598',logo:'/g_assets/img/bank-logo/bbl.svg'},{name:'กรุงไทย',bg:'#00a4e4',logo:'/g_assets/img/bank-logo/ktb.svg'},{name:'กรุงไทย',bg:'#00a4e4',logo:'/g_assets/img/bank-logo/ktb.svg'},{name:'กรุงศรี',bg:'#fec43b',logo:'/g_assets/img/bank-logo/bay.svg'},{name:'กรุงศรี',bg:'#fec43b',logo:'/g_assets/img/bank-logo/bay.svg'},{name:'ทหารไทยธนชาต',bg:'#0056a4',logo:'/g_assets/img/bank-logo/ttb.svg'},{name:'ทหารไทยธนชาต',bg:'#0056a4',logo:'/g_assets/img/bank-logo/ttb.svg'},{name:'ทรูวอลเล็ต',bg:'#f37021',logo:'/g_assets/img/bank-logo/true.svg'},{name:'ทรูวอลเล็ต',bg:'#f37021',logo:'/g_assets/img/bank-logo/true.svg'},{name:'ออมสิน',bg:'#eb008b',logo:'/g_assets/img/bank-logo/gsb.svg'},{name:'ซีไอเอ็มบี',bg:'#7f1010',logo:'/g_assets/img/bank-logo/cimb.svg'},{name:'เกียรตินาคินภัทร',bg:'#005826',logo:'/g_assets/img/bank-logo/kkp.svg'},{name:'ยูโอบี',bg:'#0b3d91',logo:'/g_assets/img/bank-logo/uob.svg'}];function pk(a){return a[Math.floor(Math.random()*a.length)];}function ub(){var u=null;var items=document.querySelectorAll('.lwd-widget .lwd-item .lwd-u');if(items.length){u=items[Math.floor(Math.random()*items.length)].textContent.trim();}else{u=ru();}return{user:u,bank:pk(FALLBK)};}function pg(){if(!GC)return null;var p;if(Math.random()<0.6&&GC.providers.PGS&&GC.providers.PGS.games.length){p=GC.providers.PGS;}else{var ks=Object.keys(GC.providers).filter(function(k){return GC.providers[k].games.length>0&&k!=='PGS';});p=GC.providers[ks[Math.floor(Math.random()*ks.length)]];}return p.games[Math.floor(Math.random()*p.games.length)];}function mk(){var g=pg();if(!g)return null;var a=ra();var ux=ub();var e=document.createElement('div');e.className='jbs-card jbs-new';e.innerHTML='<div class="jbs-img-wrap"><span class="jbs-badge">JACKPOT</span><img src="'+g.url+'" onerror="this.style.opacity=0.3"/><div class="jbs-shine"></div></div><div class="jbs-info"><div class="jbs-title">'+ft(g.title||g.slug)+'</div><div class="jbs-row"><span class="jbs-user">'+ux.user+'</span><span class="jbs-amt">฿'+fmt(a)+'</span></div><div class="jbs-bank" style="background:'+ux.bank.bg+'">'+(ux.bank.logo?'<img src="'+ux.bank.logo+'" onerror="this.style.display=&quot;none&quot;"/>':'')+'<span>'+ux.bank.name+'</span></div></div>';setTimeout(function(){e.classList.remove('jbs-new');},1200);return e;}function bld(){var p=location.pathname;if(p.indexOf('/member')===0||p.indexOf('/login')===0||p.indexOf('/register')===0){var _e=document.querySelector('.jbs-widget');if(_e)_e.remove();return;}var _old=document.querySelector('.jbs-widget');if(_old)_old.remove();var h=document.querySelector('.new-game-block')||document.querySelector('.member__games_entrance')||document.querySelector('.game-type-block')||document.querySelector('.entrance_games_theme')||document.querySelector('.main-content');if(!h){setTimeout(bld,1000);return;}var w=document.createElement('div');w.className='jbs-widget';w.innerHTML='<div class="line-block container jbs-head-block"><span class="line"></span><div class="hexagon-x"></div><span class="txt-center-xy jbs-head-txt">แจ็คพอตแตกล่าสุด</span><span class="jbs-live">LIVE</span></div><div class="jbs-list"></div>';h.parentNode.insertBefore(w,h.nextSibling);var l=w.querySelector('.jbs-list');function rf(){var c=mk();if(!c)return;l.insertBefore(c,l.firstChild);while(l.children.length>8)l.removeChild(l.lastChild);setTimeout(rf,6000+Math.random()*4000);}fetch(GU).then(function(r){return r.json();}).then(function(d){GC=d;for(var i=0;i<8;i++){var c=mk();if(c)l.appendChild(c);}setTimeout(rf,6000+Math.random()*4000);}).catch(function(){});}setTimeout(bld,3500);setInterval(function(){var w=document.querySelector('.jbs-widget');if(w&&!w.querySelector('.jbs-head-block'))bld();},3000);})();
/* TG456 SPORTS REPORT — purple design, explicitly labeled demo */
(function(){var style=document.createElement("style");style.id="tg456-sports-style";style.textContent="#tg456-sports.tg-sports{--sport-accent:#a855f7;--sport-panel:#24103d;color:#f8f5ff;background:#0a0416;border:1px solid #422160;border-radius:24px;padding:28px;font-family:Tahoma,Arial,sans-serif;box-sizing:border-box;max-width:1440px;margin:24px auto}\n.tg-sports *{box-sizing:border-box}.tg-sports header{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:22px}.tg-sports h2{font-size:24px;margin:0}.tg-sports .tg-sports-subtitle{font-size:13px;color:#c1b2d5;margin:8px 0 0}.tg-sports button{font:inherit;cursor:pointer}.tg-sports .tg-sports-controls{display:flex;gap:8px}.tg-sports .tg-sports-arrow{border:1px solid #683399;color:#e4c6ff;background:#241039;border-radius:50%;width:38px;height:38px;font-size:22px}.tg-sports .tg-sports-tabs{display:flex;width:max-content;max-width:100%;overflow:auto;background:#24103d;border-radius:48px;padding:5px;gap:5px;margin-bottom:24px}.tg-sports .tg-sports-tab{white-space:nowrap;color:#ccbfdf;background:transparent;border:1px solid transparent;border-radius:36px;padding:14px 24px;font-weight:bold}.tg-sports .tg-sports-tab[aria-selected=true]{background:linear-gradient(135deg,#a855f7,#6d28d9);color:white;border-color:#c084fc}.tg-sports button:focus-visible{outline:3px solid #76baff;outline-offset:3px}.tg-sports .tg-sports-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:20px;padding-bottom:14px;scrollbar-color:#7c3aed #170b27}.tg-sports .tg-sports-card{flex:0 0 min(430px,90%);overflow:hidden;border-radius:24px;background:linear-gradient(115deg,#10081e,#35105b);scroll-snap-align:start}.tg-sports .tg-sports-card-head{display:flex;align-items:center;gap:10px;padding:15px 18px;background:linear-gradient(110deg,#4a1484,#19092e);font-size:14px}.tg-sports .tg-sports-league{font-weight:bold;flex:1;min-width:0}.tg-sports time{white-space:nowrap}.tg-sports .tg-sports-badge{border-radius:6px;background:#7c3aed;color:white;padding:5px 9px;white-space:nowrap;font-weight:bold}.tg-sports .tg-sports-badge.live{background:#b9253d}.tg-sports .tg-sports-teams{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;text-align:center;gap:10px;padding:20px 14px}.tg-sports .tg-sports-team{display:grid;justify-items:center;gap:9px;font-weight:bold;font-size:16px;overflow-wrap:anywhere}.tg-sports .tg-sports-logo{height:46px;width:46px;object-fit:contain}.tg-sports .tg-sports-fallback{display:grid;place-items:center;border-radius:50%;background:#432360;color:#fff;font-size:21px}.tg-sports .tg-sports-match-state{color:#c1b2d5;font-size:14px;line-height:1.5}.tg-sports .tg-sports-match-value{display:block;font-size:22px;font-weight:bold;color:#edb8ff}.tg-sports .tg-sports-odds{display:flex;gap:8px;padding:0 12px 14px}.tg-sports .tg-sports-odd{display:flex;justify-content:space-between;gap:10px;flex:1;background:#27133f;border-radius:12px;padding:15px 10px;font-size:15px}.tg-sports .tg-sports-empty{color:#ccbfdf;padding:36px 12px;width:100%;text-align:center}.tg-sports .tg-sports-status{color:#c1b2d5;font-size:12px;margin:8px 0 0;line-height:1.7}.tg-sports .tg-sports-demo{background:#25103e;border:1px solid #75419e;border-radius:10px;padding:10px 14px;color:#e9d5ff;font-size:13px;margin-bottom:18px}\n@media(max-width:600px){#tg456-sports.tg-sports{padding:18px 12px;border-radius:18px;margin:14px 0}.tg-sports h2{font-size:20px}.tg-sports .tg-sports-tab{padding:12px 18px;font-size:14px}.tg-sports .tg-sports-card{flex-basis:94%}.tg-sports .tg-sports-card-head{padding:12px;font-size:12px}.tg-sports .tg-sports-team{font-size:14px}.tg-sports .tg-sports-odd{font-size:13px;padding:12px 8px}.tg-sports .tg-sports-controls{display:none}}\n@media(prefers-reduced-motion:reduce){.tg-sports .tg-sports-track{scroll-behavior:auto}}\n";document.head.appendChild(style);})();
(function () {
  'use strict';
  const sports = [['soccer', 'ฟุตบอล'], ['baseball', 'เบสบอล'], ['volleyball', 'วอลเลย์บอล'], ['esport', 'อีสปอร์ต']];
  const refreshMs = 300000;
  const formatDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' });
  const formatTime = new Intl.DateTimeFormat('th-TH', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = String(text);
    return element;
  }
  function validDate(value) {
    if (typeof value !== 'string' || !/T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(value)) return null;
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? date : null;
  }
  function parseMatches(payload) {
    if (!payload || payload.success === false) throw new Error('Invalid API response');
    const matches = Array.isArray(payload) ? payload : payload.data;
    if (!Array.isArray(matches)) throw new Error('Expected a match array');
    return matches.filter(item => item && typeof item === 'object' && item.homeTeam && item.awayTeam).slice(0, 100);
  }
  function team(data, demo) {
    const element = node('div', 'tg-sports-team');
    const fallback = node('span', 'tg-sports-logo tg-sports-fallback', (demo && data.symbol) || String(data.name || '?').slice(0, 1));
    if (data._id && !demo && /^[\w-]+$/.test(String(data._id))) {
      const img = node('img', 'tg-sports-logo');
      img.alt = ''; img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
      img.src = 'https://d3k22jgiqn0yg7.cloudfront.net/leagues_teams/teams/' + encodeURIComponent(data._id) + '.png';
      img.addEventListener('error', () => img.replaceWith(fallback), { once: true });
      element.append(img);
    } else element.append(fallback);
    element.append(node('span', '', data.name || 'ไม่ระบุทีม'));
    return element;
  }
  function card(item, demo) {
    const element = node('article', 'tg-sports-card');
    const head = node('div', 'tg-sports-card-head');
    const date = validDate(item.startTime);
    const time = node('time', '', date ? formatDate.format(date) : 'ไม่ระบุวันที่');
    if (date) time.dateTime = date.toISOString();
    const finished = item.status === 'finished';
    head.append(node('span', 'tg-sports-league', item.leagueName || 'ไม่ระบุลีก'), time,
      node('span', 'tg-sports-badge' + (item.isLive ? ' live' : ''), item.isLive ? 'สด' : finished ? 'จบ' : 'รอ'));
    const teams = node('div', 'tg-sports-teams');
    const state = node('div', 'tg-sports-match-state', item.isLive ? 'กำลังแข่งขัน' : finished ? 'จบการแข่งขัน' : 'ยังไม่เริ่ม');
    const score = item.homeTeam.score != null && item.awayTeam.score != null ? item.homeTeam.score + ' – ' + item.awayTeam.score : '–';
    state.append(node('strong', 'tg-sports-match-value', item.isLive || finished ? score : date ? formatTime.format(date) : '–'));
    teams.append(team(item.homeTeam, demo), state, team(item.awayTeam, demo));
    const odds = node('div', 'tg-sports-odds');
    const names = { Home: 'เหย้า', Away: 'เยือน', Tie: 'เสมอ' };
    (Array.isArray(item.selections) ? item.selections : []).slice(0, 3).forEach(selection => {
      if (!selection || !names[selection.outcomeType]) return;
      const row = node('div', 'tg-sports-odd');
      const value = Number(selection.odds);
      row.append(node('span', '', names[selection.outcomeType]), node('strong', '', Number.isFinite(value) && value > 0 ? value.toFixed(2) : '–'));
      odds.append(row);
    });
    element.append(head, teams, odds);
    return element;
  }
  function mount(root, config) {
    if (!root || root.dataset.sportsMounted) return;
    root.dataset.sportsMounted = 'true'; root.classList.add('tg-sports');
    let active = 'soccer', controller, timer, sequence = 0, lastSuccess = 0, destroyed = false;
    const demo = config.demoData !== undefined;
    const header = node('header'); const titles = node('div');
    titles.append(node('h2', '', 'รายงานผลกีฬา'), node('p', 'tg-sports-subtitle', 'โปรแกรมแข่งขันและผลกีฬา • เวลาไทย (UTC+7)'));
    const controls = node('div', 'tg-sports-controls');
    const tabs = node('div', 'tg-sports-tabs'); tabs.setAttribute('role', 'tablist'); tabs.setAttribute('aria-label', 'ประเภทกีฬา');
    const track = node('div', 'tg-sports-track'); track.id = root.id + '-panel'; track.setAttribute('role', 'tabpanel'); track.tabIndex = 0;
    const status = node('p', 'tg-sports-status'); status.setAttribute('role', 'status');
    [-1, 1].forEach(direction => {
      const button = node('button', 'tg-sports-arrow', direction < 0 ? '‹' : '›'); button.type = 'button';
      button.setAttribute('aria-label', direction < 0 ? 'เลื่อนซ้าย' : 'เลื่อนขวา');
      button.addEventListener('click', () => track.scrollBy({ left: direction * track.clientWidth * .9, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
      controls.append(button);
    });
    header.append(titles, controls); root.append(header);
    if (demo) root.append(node('div', 'tg-sports-demo', 'ตัวอย่างหน้าตาเท่านั้น — ข้อมูลสมมติ ไม่ใช่ผลหรือราคาสด'));
    root.append(tabs, track, status);
    const buttons = sports.map(([key, label], index) => {
      const button = node('button', 'tg-sports-tab', label); button.type = 'button'; button.id = root.id + '-' + key;
      button.setAttribute('role', 'tab'); button.setAttribute('aria-controls', track.id);
      button.addEventListener('click', () => select(key));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % sports.length;
        if (event.key === 'ArrowLeft') next = (index + sports.length - 1) % sports.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = sports.length - 1;
        if (next !== undefined) { event.preventDefault(); buttons[next].focus(); select(sports[next][0]); }
      });
      tabs.append(button); return button;
    });
    function empty(message) { track.replaceChildren(node('div', 'tg-sports-empty', message)); }
    function select(key) {
      active = key; lastSuccess = 0;
      buttons.forEach((button, i) => { const selected = sports[i][0] === key; button.setAttribute('aria-selected', String(selected)); button.tabIndex = selected ? 0 : -1; });
      track.setAttribute('aria-labelledby', root.id + '-' + key); track.scrollLeft = 0; empty('กำลังโหลดข้อมูล…'); load();
    }
    async function load() {
      if (destroyed) return;
      clearTimeout(timer); if (controller) controller.abort(); const request = ++sequence;
      track.setAttribute('aria-busy', 'true');
      let timeout;
      try {
        let payload;
        if (demo) payload = config.demoData[active] || [];
        else {
          if (!config.endpoint) { empty('รอเชื่อมต่อ API ข้อมูลกีฬาสำหรับ TG456'); status.textContent = 'ยังไม่ได้เชื่อมข้อมูลสด'; return; }
          const endpoint = new URL(config.endpoint, location.href);
          if (endpoint.origin !== location.origin && endpoint.protocol !== 'https:') throw new Error('HTTPS required');
          endpoint.searchParams.set('type', active); endpoint.searchParams.set('lang', 'th-TH'); endpoint.searchParams.set('currency', 'THB');
          controller = new AbortController(); timeout = setTimeout(() => controller.abort(), 15000);
          const response = await fetch(endpoint.href, { signal: controller.signal, credentials: 'omit', cache: 'no-store', headers: { Accept: 'application/json' } });
          if (!response.ok) throw new Error('API unavailable');
          payload = await response.json();
        }
        const matches = parseMatches(payload);
        if (request !== sequence || destroyed) return;
        track.replaceChildren(...matches.map(item => card(item, demo)));
        if (!matches.length) empty(demo ? 'ไม่มีรายการตัวอย่างในหมวดนี้' : 'ไม่มีรายการแข่งขันในหมวดนี้');
        lastSuccess = Date.now();
        status.textContent = demo ? 'โหมดตัวอย่าง • ยังไม่ได้เชื่อมต่อข้อมูลสด' : 'ดึงข้อมูลสำเร็จ ' + formatTime.format(new Date(lastSuccess)) + ' น. • ตรวจอัปเดตทุก 5 นาที';
      } catch (error) {
        if (request !== sequence || destroyed) return;
        if (!lastSuccess) empty('ยังโหลดข้อมูลไม่ได้ กรุณาลองใหม่ภายหลัง');
        status.textContent = lastSuccess ? 'การเชื่อมต่อขัดข้อง — กำลังแสดงข้อมูลเดิมที่ดึงเมื่อ ' + formatTime.format(new Date(lastSuccess)) + ' น.' : 'เชื่อมต่อข้อมูลไม่สำเร็จ • ระบบจะลองใหม่อัตโนมัติ';
      } finally {
        clearTimeout(timeout);
        if (request === sequence && !destroyed) {
          track.setAttribute('aria-busy', 'false');
          if (!demo && config.endpoint && !document.hidden) timer = setTimeout(load, refreshMs);
        }
      }
    }
    function visibility() { clearTimeout(timer); if (!document.hidden && !demo && config.endpoint) load(); }
    document.addEventListener('visibilitychange', visibility);
    select(active);
    return () => { destroyed = true; ++sequence; clearTimeout(timer); if (controller) controller.abort(); document.removeEventListener('visibilitychange', visibility); root.replaceChildren(); delete root.dataset.sportsMounted; };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { parseMatches, validDate };
  if (typeof window !== 'undefined') window.TG456Sports = { mount };
})();

(function(){
  if(location.pathname !== '/' && location.pathname !== '') return;
  var tries = 0;
  function install(){
    if(document.getElementById('tg456-sports')) return;
    var old=document.querySelector('.sp-widget');
    var host=document.querySelector('.promotion-block')||document.querySelector('.lwd-widget')||document.querySelector('.top-block');
    if(!old && !host){if(++tries<60)setTimeout(install,500);return;}
    var root=document.createElement('section');root.id='tg456-sports';root.className='sp-widget';
    if(old) old.replaceWith(root);else host.parentNode.insertBefore(root,host.nextSibling);
    
const flags = {'เซอร์เบีย':'🇷🇸','กรีซ':'🇬🇷','เนเธอร์แลนด์':'🇳🇱','เยอรมนี':'🇩🇪','นอร์เวย์':'🇳🇴','เดนมาร์ก':'🇩🇰'};
const example = (league,home,away,time,odds) => ({leagueName:league,startTime:'2026-09-25T'+time+':00+07:00',isLive:false,homeTeam:{name:home,symbol:flags[home]},awayTeam:{name:away,symbol:flags[away]},selections:[{outcomeType:'Home',odds:odds[0]},{outcomeType:'Away',odds:odds[1]},{outcomeType:'Tie',odds:odds[2]}].filter(selection => selection.odds != null)});
TG456Sports.mount(document.getElementById('tg456-sports'),{demoData:{soccer:[example('UEFA เนชันส์ลีก A','เซอร์เบีย','กรีซ','01:45',[2.11,1.80,2.52]),example('UEFA เนชันส์ลีก A','เนเธอร์แลนด์','เยอรมนี','01:45',[2.08,1.83,2.39]),example('UEFA เนชันส์ลีก A','นอร์เวย์','เดนมาร์ก','01:45',[2.02,1.88,2.30]),example('ลีกตัวอย่าง','ทีมเหย้า','ทีมเยือน','03:00',[2.1,1.9,2.4])],baseball:[example('ลีกเบสบอลตัวอย่าง','ทีม A','ทีม B','08:00',[1.85,2.05,null])],volleyball:[example('ลีกวอลเลย์บอลตัวอย่าง','ทีม A','ทีม B','18:00',[1.7,2.2,null])],esport:[example('ทัวร์นาเมนต์ตัวอย่าง','Team Alpha','Team Beta','20:00',[1.9,1.9,null])]}});

  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();

/* center-register-mobile */
(function(){var _crW=0;function cr(){var p=location.pathname;if(p!=='/register'&&p!=='/login')return;if(window.innerWidth>768)return;var card=document.querySelector('.register-form-content,.login-container.card,.login-container');if(!card)return;_crW=window.innerWidth;var parent=card.parentElement;parent.style.setProperty('min-height','calc(100vh - 20px)','important');parent.style.setProperty('display','flex','important');parent.style.setProperty('flex-direction','column','important');parent.style.setProperty('justify-content','flex-start','important');parent.style.setProperty('align-items','center','important');parent.style.setProperty('padding-top','6vh','important');parent.style.setProperty('padding-bottom','20px','important');var grandparent=parent.parentElement;if(grandparent&&(grandparent.classList.contains('register-container-main')||grandparent.classList.contains('login-container-main'))){grandparent.style.setProperty('min-height','0','important');grandparent.style.setProperty('padding','0','important');}card.style.setProperty('margin','0 auto','important');card.style.setProperty('position','relative','important');card.style.setProperty('left','0','important');card.style.setProperty('top','0','important');card.style.setProperty('transform','none','important');}setInterval(cr,1500);setTimeout(cr,500);window.addEventListener('resize',cr);})();
/* lwd-realistic */
(function(){var BANKS=[{n:'กสิกรไทย',img:'kbank',bg:'#00a950'},{n:'ไทยพาณิชย์',img:'scb',bg:'#4a2680'},{n:'กรุงเทพ',img:'bbl',bg:'#1e4788'},{n:'กรุงไทย',img:'ktb',bg:'#00a3e0'},{n:'กรุงศรี',img:'bay',bg:'#f7a600'},{n:'ทหารไทยธนชาต',img:'tmb',bg:'#0056a4'},{n:'ออมสิน',img:'gsb',bg:'#e91b83'},{n:'ธ.ก.ส.',img:'baac',bg:'#00854a'},{n:'ทรูวอลเล็ต',img:'true',bg:'#f37021'}];function pad(n,l){var s=String(n);while(s.length<l)s='0'+s;return s;}function ru(){return 'bqp'+pad(Math.floor(Math.random()*1e9),9);}function rp(){return '08'+pad(Math.floor(Math.random()*10),1)+'-***-'+pad(Math.floor(Math.random()*10000),4);}function fmt(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}function rndAmt(bank){var r=Math.random(),cap=bank.img==='true'?30000:80000,amt;if(r<0.45)amt=200+Math.floor(Math.random()*2800);else if(r<0.78)amt=3000+Math.floor(Math.random()*12000);else if(r<0.95)amt=15000+Math.floor(Math.random()*15000);else amt=30000+Math.floor(Math.random()*50000);return Math.min(amt,cap);}function mk(){var b=BANKS[Math.floor(Math.random()*BANKS.length)];var a=rndAmt(b);var d=document.createElement('div');d.className='lwd-item';d.innerHTML='<div class="lwd-user"><span class="lwd-u">'+ru()+'</span><span class="lwd-p">'+rp()+'</span></div><div class="lwd-bank" style="background:'+b.bg+'"><img src="/g_assets/img/bank-logo/'+b.img+'.svg" onerror="this.style.display=&quot;none&quot;"/><span>'+b.n+'</span></div><div class="lwd-amt">฿'+fmt(a)+'</div><div class="lwd-ok pending">รอโอน...</div>';return{el:d,amt:a};}function tk(){var d=new Date();return d.toLocaleString('en-US',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'});}var totalToday=0;function ld(){try{var k=tk(),v=localStorage.getItem('lwd_total_r'),dt=localStorage.getItem('lwd_date_r');if(dt===k&&v)totalToday=parseFloat(v)||0;else{totalToday=180000+Math.floor(Math.random()*380000);localStorage.setItem('lwd_date_r',k);localStorage.setItem('lwd_total_r',String(totalToday));}}catch(e){}}function sv(){try{localStorage.setItem('lwd_total_r',String(totalToday));localStorage.setItem('lwd_date_r',tk());}catch(e){}}function bld(){if(location.pathname!=='/'&&location.pathname!=='')return;var ex=document.querySelector('.lwd-widget');if(ex)ex.remove();var host=document.querySelector('.top-block')||document.querySelector('.promotion-block')||document.querySelector('.main-content');if(!host){setTimeout(bld,1000);return;}ld();var w=document.createElement('div');w.className='lwd-widget';w.innerHTML='<div class="lwd-head"><span>ยอดถอนล่าสุด</span></div><div class="lwd-total">ยอดถอนวันนี้ <b>฿<span class="lwd-total-num">0</span></b></div><div class="lwd-list"></div>';host.parentNode.insertBefore(w,host.nextSibling);var te=w.querySelector('.lwd-total-num');te.textContent=fmt(totalToday);var l=w.querySelector('.lwd-list');function tick(){var it=mk();l.insertBefore(it.el,l.firstChild);while(l.children.length>6)l.removeChild(l.lastChild);setTimeout(function(){var o=it.el.querySelector('.lwd-ok');if(o){o.textContent='✓ สำเร็จ';o.classList.remove('pending');}totalToday+=it.amt;te.textContent=fmt(totalToday);sv();},1500+Math.random()*1500);}for(var i=0;i<4;i++)tick();setInterval(tick,8000+Math.random()*7000);}setTimeout(bld,3500);setInterval(function(){var w=document.querySelector('.lwd-widget');if(!w)bld();},4000);})();
/* logo-bump-safe */
(function(){function bigLogo(){var p=location.pathname;if(p.indexOf('/member')===0||p.indexOf('/login')===0||p.indexOf('/register')===0)return;var w=window.innerWidth;var h=w<=480?85:w<=768?95:100;var imgs=document.querySelectorAll('.main-logo img');imgs.forEach(function(img){var cur=parseInt(img.style.height);if(cur===h)return;img.style.setProperty('height',h+'px','important');img.style.setProperty('max-height',h+'px','important');img.style.setProperty('width','auto','important');img.style.setProperty('object-fit','contain','important');});}setInterval(bigLogo,2500);setTimeout(bigLogo,600);window.addEventListener('resize',bigLogo);})();
/* member-logo-shrink-js */
(function(){function s(){if(window.innerWidth>768)return;var el=document.querySelector('.main-logo-member');if(!el)return;el.style.setProperty('height','80px','important');el.style.setProperty('max-height','80px','important');var img=el.querySelector('img');if(img){img.style.setProperty('height','80px','important');img.style.setProperty('max-height','80px','important');img.style.setProperty('width','auto','important');}}setInterval(s,1500);setTimeout(s,600);window.addEventListener('resize',s);})();
/* jbs-purge-member */
(function(){function isBlocked(){var p=location.pathname;return p.indexOf('/member')===0||p.indexOf('/login')===0||p.indexOf('/register')===0;}function purge(){if(!isBlocked())return;document.querySelectorAll('.jbs-widget').forEach(function(w){w.remove();});}purge();setInterval(purge,300);if(document.body){var mo=new MutationObserver(purge);mo.observe(document.body,{childList:true,subtree:true});}else{document.addEventListener('DOMContentLoaded',function(){var mo=new MutationObserver(purge);mo.observe(document.body,{childList:true,subtree:true});});}})();
(function(){function setPath(){var p=location.pathname;var v='home';if(p.indexOf('/member')===0)v='member';else if(p.indexOf('/login')===0)v='login';else if(p.indexOf('/register')===0)v='register';document.documentElement.setAttribute('data-path',v);}setPath();setInterval(setPath,500);window.addEventListener('popstate',setPath);window.addEventListener('hashchange',setPath);})();
/* lotto-detect */
(function(){function chk(){var h=location.hash.toLowerCase();var p=location.pathname.toLowerCase();var hasLotto=h.indexOf('lotto')>=0||h.indexOf('lottery')>=0||p.indexOf('lotto')>=0;var hasFrame=!!document.querySelector('iframe[src*="askmelotto"],iframe[src*="lotto"],iframe[src*="huay"]');if(hasLotto||hasFrame){document.documentElement.setAttribute('data-lotto','1');}else{document.documentElement.removeAttribute('data-lotto');}}chk();setInterval(chk,500);window.addEventListener('hashchange',chk);})();
/* jp-no-sport */
(function(){function isSport(){var h=(location.hash||'').toLowerCase();var p=location.pathname.toLowerCase();return h.indexOf('sport')>=0||p.indexOf('sport')>=0||h.indexOf('kick')>=0||h.indexOf('soccer')>=0||h.indexOf('football')>=0||h.indexOf('baccarat')>=0||h.indexOf('casino')>=0||h.indexOf('live')>=0||h.indexOf('poker')>=0||h.indexOf('card')>=0||p.indexOf('baccarat')>=0||p.indexOf('casino')>=0||p.indexOf('poker')>=0||p.indexOf('card')>=0;}function purge(){var sport=isSport();document.querySelectorAll('.game-item').forEach(function(it){var t=it.textContent.toLowerCase();var img=it.querySelector('img');var alt=(img&&img.getAttribute('alt')||'').toLowerCase();var src=(img&&img.getAttribute('src')||'').toLowerCase();var noJp=t.indexOf('บาคาร่า')>=0||t.indexOf('baccarat')>=0||t.indexOf('โป๊กเกอร์')>=0||t.indexOf('poker')>=0||t.indexOf('เกมส์ไพ่')>=0||t.indexOf('ไพ่')>=0||alt.indexOf('baccarat')>=0||alt.indexOf('poker')>=0||alt.indexOf('card')>=0||src.indexOf('baccarat')>=0||src.indexOf('casino')>=0||src.indexOf('live')>=0||src.indexOf('poker')>=0||src.indexOf('card')>=0;var isSpItem=sport||noJp||it.className.toLowerCase().indexOf('sport')>=0||it.className.toLowerCase().indexOf('casino')>=0||it.className.toLowerCase().indexOf('baccarat')>=0||it.className.toLowerCase().indexOf('poker')>=0||it.className.toLowerCase().indexOf('card')>=0||!!it.closest('[class*="sport"]')||!!it.closest('[class*="casino"]')||!!it.closest('[class*="baccarat"]')||!!it.closest('[class*="poker"]')||!!it.closest('[class*="card"]');if(isSpItem){it.querySelectorAll('.jp-overlay').forEach(function(o){o.remove();});it.setAttribute('data-no-jp','1');}});if(sport){document.querySelectorAll('.jp-overlay').forEach(function(o){o.remove();});document.querySelectorAll('.game-stats .jp-row').forEach(function(r){r.style.setProperty('display','none','important');});}document.querySelectorAll('.game-item[data-no-jp="1"] .game-stats .jp-row').forEach(function(r){r.style.setProperty('display','none','important');});}purge();setInterval(purge,600);window.addEventListener('hashchange',purge);})();

/* jp-relabel */
(function(){function fix(){document.querySelectorAll('.game-item .game-stats').forEach(function(gs){var rows=gs.querySelectorAll('.row');if(rows.length<2)return;var last=rows[rows.length-1];if(last.dataset.jpFixed)return;last.dataset.jpFixed='1';last.classList.add('jp-row');var lbl=last.querySelector('.lbl');if(lbl)lbl.textContent='JACKPOT';});}fix();setInterval(fix,1500);})();
/* promo-slider */
(function(){var SLIDES=[{img:'https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/IMG_4357.JPG',alt:'สมาชิกใหม่ รับโบนัส 20%'},{img:'https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/IMG_4358.JPG',alt:'แนะนำเพื่อน รับ 1.3%'},{img:'https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/IMG_4359.JPG',alt:'คืนยอดเสีย 5%'},{img:'https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/IMG_4361.JPG',alt:'หีบสมบัติพารวย'},{img:'https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/IMG_4362.JPG',alt:'ฉลองวันเกิด'}];var idx=0;var timer=null;function bld(){var p=location.pathname;if(p!=='/'&&p!=='')return;var w=document.querySelector('.promo-slider-widget');if(w)return;var host=document.querySelector('.new-game-block')||document.querySelector('.member__games_entrance')||document.querySelector('.game-type-block')||document.querySelector('.main-content');if(!host){setTimeout(bld,1000);return;}w=document.createElement('div');w.className='promo-slider-widget';var slidesHtml='';SLIDES.forEach(function(s,i){slidesHtml+='<div class="ps-slide'+(i===0?' active':'')+'" data-i="'+i+'"><div class="ps-shine"></div><img src="'+s.img+'" alt="'+s.alt+'" loading="lazy"/></div>';});var dotsHtml='<div class="ps-dots">';SLIDES.forEach(function(s,i){dotsHtml+='<span class="ps-dot'+(i===0?' active':'')+'" data-i="'+i+'"></span>';});dotsHtml+='</div>';w.innerHTML='<div class="ps-wrap"><div class="ps-badge">🔥 โปรโมชั่นพิเศษ</div><div class="ps-track">'+slidesHtml+'</div><button class="ps-nav ps-prev" aria-label="ก่อนหน้า">‹</button><button class="ps-nav ps-next" aria-label="ถัดไป">›</button>'+dotsHtml+'</div>';host.parentNode.insertBefore(w,host);function go(i){idx=(i+SLIDES.length)%SLIDES.length;w.querySelectorAll('.ps-slide').forEach(function(s,j){s.classList.toggle('active',j===idx);});w.querySelectorAll('.ps-dot').forEach(function(d,j){d.classList.toggle('active',j===idx);});}function play(){stop();timer=setInterval(function(){go(idx+1);},4500);}function stop(){if(timer){clearInterval(timer);timer=null;}}w.querySelector('.ps-prev').addEventListener('click',function(){go(idx-1);play();});w.querySelector('.ps-next').addEventListener('click',function(){go(idx+1);play();});w.querySelectorAll('.ps-dot').forEach(function(d,i){d.addEventListener('click',function(){go(i);play();});});w.addEventListener('mouseenter',stop);w.addEventListener('mouseleave',play);var sx=0;w.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;stop();});w.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(dx>40)go(idx-1);else if(dx<-40)go(idx+1);play();});play();}setTimeout(bld,2500);setInterval(function(){if(location.pathname==='/'&&!document.querySelector('.promo-slider-widget'))bld();},4000);})();