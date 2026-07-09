/* ===================================================
   TG456 CUSTOM JS - All Widgets & Features
   Consolidated: 10 features
   =================================================== */

/* ===== 1. MONEY FX INJECT (login/register cards) ===== */
(function(){
  var COINS = ['💰','💵','💴','⭐','💰','💠','💲','💵','💰','💵'];
  function apply(){
    var p = location.pathname;
    if(!p.startsWith('/login') && !p.startsWith('/register')) return;
    var card = document.querySelector('.login-container.card') ||
               document.querySelector('.login-container') ||
               document.querySelector('.register-form-content.card') ||
               document.querySelector('.register-form-content');
    if(!card || card.querySelector('.card-money-fx')) return;
    var fx = document.createElement('div');
    fx.className = 'card-money-fx';
    for(var i=0;i<10;i++){
      var el = document.createElement('div');
      el.className = 'cm';
      el.textContent = COINS[i];
      fx.appendChild(el);
    }
    card.insertBefore(fx, card.firstChild);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(apply, 500); });
  else setTimeout(apply, 500);
  setInterval(function(){
    var p = location.pathname;
    if(p.startsWith('/login') || p.startsWith('/register')){
      var c = document.querySelector('.login-container.card') ||
              document.querySelector('.login-container') ||
              document.querySelector('.register-form-content.card') ||
              document.querySelector('.register-form-content');
      if(c && !c.querySelector('.card-money-fx')) apply();
    }
  }, 5000);
})();

/* ===== 2. LASER FX INJECT (login/register BG) ===== */
(function(){
  function apply(){
    var p = location.pathname;
    if(!p.startsWith('/login') && !p.startsWith('/register')) return;
    var c = document.querySelector('.register-container') || document.querySelector('.login-container-main');
    if(!c || c.querySelector('.laser-fx')) return;
    var fx = document.createElement('div');
    fx.className = 'laser-fx';
    for(var i=1;i<=6;i++){
      var b = document.createElement('div');
      b.className = 'beam b'+i;
      fx.appendChild(b);
    }
    c.appendChild(fx);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(apply, 500); });
  else setTimeout(apply, 500);
  setInterval(function(){
    var p = location.pathname;
    if(p.startsWith('/login') || p.startsWith('/register')){
      var c = document.querySelector('.register-container') || document.querySelector('.login-container-main');
      if(c && !c.querySelector('.laser-fx')) apply();
    }
  }, 5000);
})();

/* Module #3 (member logo shift) removed — was making logo tiny */

/* ===== 4. WITHDRAWAL WIDGET (pending → success) ===== */
(function(){
  var BANKS = [
    { n:'กสิกรไทย', img:'kbank', bg:'#00a950' },
    { n:'ไทยพาณิชย์', img:'scb', bg:'#4a2680' },
    { n:'กรุงเทพ', img:'bbl', bg:'#1e4788' },
    { n:'กรุงไทย', img:'ktb', bg:'#00a3e0' },
    { n:'กรุงศรี', img:'bay', bg:'#f7a600' },
    { n:'ทหารไทยธนชาต', img:'tmb', bg:'#0056a4' },
    { n:'ออมสิน', img:'gsb', bg:'#e91b83' },
    { n:'ธ.ก.ส.', img:'baac', bg:'#00854a' },
    { n:'ซีไอเอ็มบี', img:'cimb', bg:'#a02020' },
    { n:'ยูโอบี', img:'uob', bg:'#1a4a8a' },
    { n:'ทรูวอลเล็ต', img:'true', bg:'#f37021' }
  ];
  function pad(n,len){ var s=String(n); while(s.length<len) s='0'+s; return s; }
  function rndUser(){ return 'bqp'+pad(Math.floor(Math.random()*1e9), 9); }
  function rndPhone(){ return '08'+pad(Math.floor(Math.random()*10),1)+'-***-'+pad(Math.floor(Math.random()*10000),4); }
  function rndAmt(bank){ var max = bank && bank.img==='true' ? 29500 : 99500; return 500+Math.floor(Math.random()*max); }
  function fmt(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function mkItem(){
    var b = BANKS[Math.floor(Math.random()*BANKS.length)];
    var amt = rndAmt(b);
    var d = document.createElement('div');
    d.className = 'lwd-item';
    d.innerHTML = '<div class="lwd-user"><span class="lwd-u">'+rndUser()+'</span><span class="lwd-p">'+rndPhone()+'</span></div>'+
      '<div class="lwd-bank" style="background:'+b.bg+'"><img src="/g_assets/img/bank-logo/'+b.img+'.svg" onerror="this.style.display=\'none\'"/><span>'+b.n+'</span></div>'+
      '<div class="lwd-amt">฿'+fmt(amt)+'</div>'+
      '<div class="lwd-ok pending">รอโอน...</div>';
    return { el: d, amt: amt };
  }
  function todayKey(){ var d = new Date(); return d.toLocaleString('en-US', { timeZone:'Asia/Bangkok', year:'numeric', month:'2-digit', day:'2-digit' }); }
  var totalToday = 0;
  function loadTotal(){
    try {
      var k = todayKey(), v = localStorage.getItem('lwd_total'), d = localStorage.getItem('lwd_date');
      if(d === k && v) totalToday = parseFloat(v) || 0;
      else { totalToday = 0; localStorage.setItem('lwd_date', k); localStorage.setItem('lwd_total', '0'); }
    } catch(e) {}
  }
  function saveTotal(){ try { localStorage.setItem('lwd_total', String(totalToday)); localStorage.setItem('lwd_date', todayKey()); } catch(e) {} }
  function build(){
    if(location.pathname !== '/' && location.pathname !== '') return;
    if(document.querySelector('.lwd-widget')) return;
    var host = document.querySelector('.top-block') || document.querySelector('.promotion-block') || document.querySelector('.main-content');
    if(!host){ setTimeout(build, 1000); return; }
    loadTotal();
    var w = document.createElement('div');
    w.className = 'lwd-widget';
    w.innerHTML = '<div class="lwd-head"><span>ยอดถอนล่าสุด</span></div>'+
      '<div class="lwd-total">ยอดถอนวันนี้ <b>฿<span class="lwd-total-num">0</span></b></div>'+
      '<div class="lwd-list"></div>';
    host.parentNode.insertBefore(w, host.nextSibling);
    var totalEl = w.querySelector('.lwd-total-num');
    totalEl.textContent = fmt(totalToday);
    var list = w.querySelector('.lwd-list');
    function tick(){
      var it = mkItem();
      list.insertBefore(it.el, list.firstChild);
      while(list.children.length > 6) list.removeChild(list.lastChild);
      setTimeout(function(){
        var okEl = it.el.querySelector('.lwd-ok');
        if(okEl){ okEl.textContent = '✓ สำเร็จ'; okEl.classList.remove('pending'); }
        totalToday += it.amt;
        totalEl.textContent = fmt(totalToday);
        saveTotal();
      }, 1500 + Math.random()*1500);
    }
    for(var i=0;i<4;i++) tick();
    setInterval(tick, 4500 + Math.random()*2500);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(build, 800); });
  else setTimeout(build, 800);
})();

/* ===== 5. LOTTERY WIDGET ===== */
var THAI_LATEST = { date:'16 ส.ค. 68', prize1:'751495', front3:['001','980'], back3:['304','531'], back2:'62' };
(function(){
  function todayThai(){ var d=new Date(); var m=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.']; return d.getDate()+' '+m[d.getMonth()]+' '+(d.getFullYear()+543-2500); }
  function rnd(n){ var s=''; for(var i=0;i<n;i++) s += Math.floor(Math.random()*10); return s; }
  function build(){
    if(location.pathname !== '/' && location.pathname !== '') return;
    if(document.querySelector('.lot-widget')) return;
    var host = document.querySelector('.sp-widget') || document.querySelector('.promotion-block') || document.querySelector('.lwd-widget') || document.querySelector('.top-block') || document.querySelector('.main-content');
    if(!host){ setTimeout(build, 1000); return; }
    var w = document.createElement('div');
    w.className = 'lot-widget';
    var td = todayThai();
    w.innerHTML = '<div class="lot-head">ผลหวย</div>'+
      '<div class="lot-grid">'+
      '<div class="lot-card"><div class="lot-title">หวยไทย</div><div class="lot-date">งวด '+THAI_LATEST.date+'</div><div class="lot-row"><span>รางวัลที่ 1</span><b>'+THAI_LATEST.prize1+'</b></div><div class="lot-row"><span>3 ตัวหน้า</span><b>'+THAI_LATEST.front3.join(' • ')+'</b></div><div class="lot-row"><span>3 ตัวหลัง</span><b>'+THAI_LATEST.back3.join(' • ')+'</b></div><div class="lot-row"><span>2 ตัวล่าง</span><b>'+THAI_LATEST.back2+'</b></div></div>'+
      '<div class="lot-card"><div class="lot-title">หวยลาว</div><div class="lot-date">'+td+'</div><div class="lot-row"><span>4 ตัวบน</span><b>'+rnd(4)+'</b></div><div class="lot-row"><span>3 ตัวบน</span><b>'+rnd(3)+'</b></div><div class="lot-row"><span>2 ตัวล่าง</span><b>'+rnd(2)+'</b></div></div>'+
      '<div class="lot-card"><div class="lot-title">หวยฮานอย</div><div class="lot-date">'+td+'</div><div class="lot-row"><span>3 ตัวบน</span><b>'+rnd(3)+'</b></div><div class="lot-row"><span>2 ตัวบน</span><b>'+rnd(2)+'</b></div><div class="lot-row"><span>2 ตัวล่าง</span><b>'+rnd(2)+'</b></div></div>'+
      '<div class="lot-card"><div class="lot-title">หวยต่างประเทศ</div><div class="lot-date">'+td+'</div><div class="lot-row"><span>US Powerball</span><b>'+rnd(2)+' '+rnd(2)+' '+rnd(2)+'</b></div><div class="lot-row"><span>EuroMillions</span><b>'+rnd(2)+' '+rnd(2)+' '+rnd(2)+'</b></div><div class="lot-row"><span>Mega Millions</span><b>'+rnd(2)+' '+rnd(2)+' '+rnd(2)+'</b></div></div>'+
      '</div>';
    host.parentNode.insertBefore(w, host.nextSibling);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(build, 1200); });
  else setTimeout(build, 1200);
})();

/* ===== 6. RANKING WIDGET ===== */
(function(){
  var TIERS = [
    { n:'Bronze', thr:0 }, { n:'Silver', thr:5000 }, { n:'Gold', thr:20000 },
    { n:'Platinum', thr:50000 }, { n:'Diamond', thr:150000 }, { n:'Master', thr:500000 }
  ];
  function build(){
    if(location.pathname !== '/' && location.pathname !== '') return;
    if(document.querySelector('.tg-rank-widget')) return;
    var host = document.querySelector('.top-block');
    if(!host){ setTimeout(build, 1000); return; }
    var w = document.createElement('div');
    w.className = 'tg-rank-widget';
    var hdr = '<div class="tg-rank-hdr"><h3 class="tg-rank-title">ระดับสมาชิก</h3></div>';
    var items = '<div class="tg-rank-list">';
    for(var i=0;i<TIERS.length;i++){
      items += '<div class="tg-rank-item"><div class="tg-rank-icon r'+i+'"></div><div class="tg-rank-name">'+TIERS[i].n+'</div><div class="tg-rank-thr">฿'+TIERS[i].thr.toLocaleString()+'</div></div>';
    }
    items += '</div>';
    w.innerHTML = hdr + items;
    host.parentNode.insertBefore(w, host.nextSibling);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(build, 1500); });
  else setTimeout(build, 1500);
})();

/* ===== 7. JACKPOT OVERLAY ON GAME CARDS ===== */
(function(){
  function fmt(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function tick(el){
    var v = parseInt(el.dataset.val || '0');
    v += Math.floor(Math.random()*50) + 10;
    el.dataset.val = v;
    el.textContent = '฿' + fmt(v);
  }
  function apply(){
    var items = document.querySelectorAll('.game-item');
    if(!items.length){ setTimeout(apply, 1000); return; }
    items.forEach(function(item){
      if(item.querySelector('.jp-overlay')) return;
      var jp = document.createElement('div');
      jp.className = 'jp-overlay';
      var initial = 100000 + Math.floor(Math.random()*900000);
      jp.innerHTML = '<div class="jp-label">JACKPOT</div><div class="jp-num" data-val="'+initial+'">฿'+fmt(initial)+'</div>';
      item.appendChild(jp);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(apply, 1500); });
  else setTimeout(apply, 1500);
  setInterval(function(){ document.querySelectorAll('.jp-num').forEach(tick); }, 2500);
  setInterval(apply, 5000);
})();

/* ===== 8. GAME PROVIDER STATS (players + bet, PG Soft hot) ===== */
(function(){
  function hash(s){ var h=0; for(var i=0;i<s.length;i++){ h=(h<<5)-h+s.charCodeAt(i); h|=0; } return Math.abs(h); }
  function seedRand(seed){ var x = Math.sin(seed)*10000; return x - Math.floor(x); }
  function fmtNum(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function fmtMoney(n){
    if(n >= 1000000) return '฿'+(n/1000000).toFixed(1)+'M';
    if(n >= 1000) return '฿'+(n/1000).toFixed(0)+'K';
    return '฿'+fmtNum(n);
  }
  function isPgSoft(item){
    var img = item.querySelector('img');
    var s = (((img && img.getAttribute('src')) || '') + ((img && img.getAttribute('alt')) || '') + item.textContent).toLowerCase();
    var href = (item.querySelector('a') && item.querySelector('a').getAttribute('href') || '').toLowerCase();
    return s.indexOf('pgsoft')>-1 || s.indexOf('pg soft')>-1 || s.indexOf('pg-soft')>-1 || href.indexOf('/pgs')>-1;
  }
  function apply(){
    if(location.hash.indexOf('/games/')<0 && location.pathname.indexOf('/games/')<0) return;
    var items = document.querySelectorAll('.game-item');
    if(!items.length){ setTimeout(apply, 800); return; }
    items.forEach(function(item){
      if(item.querySelector('.game-stats')) return;
      var img = item.querySelector('img');
      var key = ((img && img.getAttribute('src')) || '') + ((img && img.getAttribute('alt')) || '') + item.textContent.trim().substring(0,50);
      var base = hash(key.substring(0,80));
      var hot = isPgSoft(item);
      var players = hot ? (6800 + Math.floor(seedRand(base)*3200)) : (200 + Math.floor(seedRand(base)*4600));
      var bet = hot ? (4500000 + Math.floor(seedRand(base+1)*3500000)) : (80000 + Math.floor(seedRand(base+1)*3120000));
      var el = document.createElement('div');
      el.className = 'game-stats' + (hot ? ' hot' : '');
      el.innerHTML = '<span class="row"><span class="live-dot"></span><span class="lbl">ผู้เล่น</span><span class="val" data-key="players">'+fmtNum(players)+'</span></span>'+
        '<span class="sep"></span>'+
        '<span class="row"><span class="lbl">เดิมพันสะสม</span><span class="val" data-key="bet">'+fmtMoney(bet)+'</span></span>';
      item.appendChild(el);
      item.dataset.players = players;
      item.dataset.bet = bet;
      item.dataset.hot = hot ? '1' : '0';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(apply, 1500); });
  else setTimeout(apply, 1500);
  setInterval(function(){
    if(location.hash.indexOf('/games/')>-1 || location.pathname.indexOf('/games/')>-1) apply();
  }, 5000);
  setInterval(function(){
    document.querySelectorAll('.game-item .game-stats').forEach(function(gs){
      var item = gs.closest('.game-item');
      if(!item.dataset.players) return;
      var hot = item.dataset.hot === '1';
      var p = parseInt(item.dataset.players);
      var b = parseInt(item.dataset.bet);
      var dp = hot ? (Math.floor(Math.random()*25)-6) : (Math.floor(Math.random()*7)-2);
      var db = hot ? (Math.floor(Math.random()*90000)-20000) : (Math.floor(Math.random()*15000)-3000);
      var newP = Math.max(50, p+dp);
      var newB = Math.max(50000, b+db);
      item.dataset.players = newP;
      item.dataset.bet = newB;
      var pEl = gs.querySelector('[data-key="players"]');
      var bEl = gs.querySelector('[data-key="bet"]');
      if(pEl) pEl.textContent = fmtNum(newP);
      if(bEl) bEl.textContent = fmtMoney(newB);
    });
  }, 8000);
})();

/* ===== 10. FOOTER BANK ICONS AUTO-FILL ===== */
(function(){
  var LOGOS = ['kbank','scb','bbl','ktb','bay','tmb','gsb','baac','cimb','uob','true'];
  function fill(){
    var container = document.querySelector('.footer-ic-bank');
    if(!container){ setTimeout(fill, 1500); return; }
    var imgs = container.querySelectorAll('img');
    if(!imgs.length){ setTimeout(fill, 1500); return; }
    var filled = 0;
    imgs.forEach(function(img, i){
      if(!img.getAttribute('src')){
        img.setAttribute('src', '/g_assets/img/bank-logo/'+LOGOS[i % LOGOS.length]+'.svg');
        img.style.background = 'transparent';
        img.style.border = 'none';
        img.style.padding = '4px';
        filled++;
      }
    });
    if(filled) container.style.gap = '8px';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(fill, 1500); });
  else setTimeout(fill, 1500);
  setInterval(fill, 6000);
})();

/* ===== 9. SPORTS WIDGET (TheSportsDB — safe timeout) ===== */
(function(){
  var API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';
  var cache = {};
  function safeFetch(url){
    return new Promise(function(resolve){
      var timer = setTimeout(function(){ resolve(null); }, 8000);
      fetch(url).then(function(r){ clearTimeout(timer); return r.json(); }).then(function(d){ resolve(d); }).catch(function(){ clearTimeout(timer); resolve(null); });
    });
  }
  function getEvents(){
    return new Promise(function(resolve){
      var c = cache.events;
      if(c && Date.now() - c.t < 5*60*1000){ resolve(c.d); return; }
      safeFetch(API_BASE + '/eventspastleague.php?id=4328').then(function(d){
        var events = (d && d.events) ? d.events.slice(0, 5) : [];
        cache.events = { t: Date.now(), d: events };
        resolve(events);
      });
    });
  }
  function build(){
    if(location.pathname !== '/' && location.pathname !== '') return;
    if(document.querySelector('.sp-widget')) return;
    var host = document.querySelector('.promotion-block') || document.querySelector('.lwd-widget') || document.querySelector('.top-block');
    if(!host){ setTimeout(build, 1500); return; }
    var w = document.createElement('div');
    w.className = 'sp-widget';
    w.innerHTML = '<div class="sp-head">ผลบอล <span class="sp-lig">(พรีเมียร์ลีก)</span></div><div class="sp-body">กำลังโหลด...</div>';
    host.parentNode.insertBefore(w, host.nextSibling);
    getEvents().then(function(events){
      var body = w.querySelector('.sp-body');
      if(!events.length){ body.innerHTML = '<div class="sp-empty">ไม่มีข้อมูลตอนนี้</div>'; return; }
      var html = '';
      events.forEach(function(e){
        html += '<div class="sp-match"><div class="sp-teams"><span class="sp-home">'+e.strHomeTeam+'</span><span class="sp-score">'+(e.intHomeScore||0)+' - '+(e.intAwayScore||0)+'</span><span class="sp-away">'+e.strAwayTeam+'</span></div><div class="sp-date">'+(e.dateEvent||'')+'</div></div>';
      });
      body.innerHTML = html;
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(build, 2500); });
  else setTimeout(build, 2500);
})();


/* ===== 11. JACKPOT BROKEN SLIDER (PGS 90% + others 10%) ===== */
(function(){
  var GAMES_URL='https://cdn.jsdelivr.net/gh/mdsurin/tg456-assets@main/slot-games.json';
  var gamesCache=null;
  function pad(n,l){var s=String(n);while(s.length<l)s='0'+s;return s;}
  function rndUser(){return 'bqp'+pad(Math.floor(Math.random()*1e9),9);}
  function fmt(n){return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');}
  function rndAmount(){return 50000+Math.floor(Math.random()*4950000);}
  function pickGame(){
    if(!gamesCache)return null;
    var provider;
    if(Math.random()<0.9 && gamesCache.providers.PGS && gamesCache.providers.PGS.games.length){
      provider=gamesCache.providers.PGS;
    }else{
      var keys=Object.keys(gamesCache.providers).filter(function(k){return gamesCache.providers[k].games.length>0;});
      provider=gamesCache.providers[keys[Math.floor(Math.random()*keys.length)]];
    }
    var games=provider.games;
    return games[Math.floor(Math.random()*games.length)];
  }
  function mkCard(){
    var g=pickGame();if(!g)return null;
    var amt=rndAmount();
    var el=document.createElement('div');
    el.className='jbs-card';
    el.innerHTML='<div class="jbs-img-wrap"><img src="'+g.url+'" alt="'+(g.title||'')+'" onerror="this.style.opacity=0.3"/><div class="jbs-badge">JACKPOT</div></div>'+
      '<div class="jbs-info"><div class="jbs-title">'+(g.title||g.slug)+'</div><div class="jbs-user">'+rndUser()+'</div><div class="jbs-amt">฿'+fmt(amt)+'</div></div>';
    return el;
  }
  function build(){
    if(document.querySelector('.jbs-widget'))return;
    var host=document.querySelector('.new-game-block')||document.querySelector('.member__games_entrance')||document.querySelector('.game-type-block')||document.querySelector('.entrance_games_theme')||document.querySelector('.main-content')||document.querySelector('main');
    if(!host){setTimeout(build,1000);return;}
    var w=document.createElement('div');
    w.className='jbs-widget';
    w.innerHTML='<div class="jbs-head"><span class="jbs-fire">🔥</span> แจ็คพอตแตกล่าสุด <span class="jbs-live">LIVE</span></div><div class="jbs-list"></div>';
    host.parentNode.insertBefore(w,host.nextSibling);
    var list=w.querySelector('.jbs-list');
    function refresh(){
      var newCard=mkCard();if(!newCard)return;
      list.insertBefore(newCard,list.firstChild);
      while(list.children.length>8)list.removeChild(list.lastChild);
    }
    fetch(GAMES_URL).then(function(r){return r.json();}).then(function(d){
      gamesCache=d;
      for(var i=0;i<8;i++){var c=mkCard();if(c)list.appendChild(c);}
      setInterval(refresh,3500);
    }).catch(function(){});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(build,1500);});
  else setTimeout(build,1500);
})();