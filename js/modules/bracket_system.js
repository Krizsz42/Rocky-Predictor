// ===================== BRACKET / CAMINO AL TÍTULO (Monte Carlo) =====================
const BKEY='mundial_bracket_v1';
const PICKKEY='mundial_bracket_picks_v1';
const CONFKEY='mundial_bracket_conf_v1';
let BRACKET_SIZE=32;            // tamaño por defecto (Mundial 2026: ronda de 32)
let BRACKET=[];                   // array de nombres; longitud potencia de 2
let PICKS={};                     // predicciones del usuario: clave = par de equipos, valor = ganador elegido
let CONFIRMED={};                 // ganadores reales (ESPN): clave = par de equipos, valor = nombre ganador
function confKey(a,b){ return [norm(a),norm(b)].sort().join('|'); }
function loadConfirmed(){ try{const c=JSON.parse(localStorage.getItem(CONFKEY)); if(c&&typeof c==='object')CONFIRMED=c;}catch(e){} }
function saveConfirmed(){ try{localStorage.setItem(CONFKEY,JSON.stringify(CONFIRMED));}catch(e){} }
function loadPicks(){ try{const p=JSON.parse(localStorage.getItem(PICKKEY)); if(p&&typeof p==='object')PICKS=p;}catch(e){} }
function savePicks(){ try{localStorage.setItem(PICKKEY,JSON.stringify(PICKS));}catch(e){} }
// ganador mostrado en el árbol: manda tu predicción (✓); si no marcaste, el resultado real (ESPN)
function pickedWinner(a,b){ if(!a||!b)return null; const ck=confKey(a,b); if(PICKS[ck]!=null)return PICKS[ck]; if(CONFIRMED[ck]!=null)return CONFIRMED[ck]; return null; }
function isReal(a,b){ if(!a||!b)return false; return CONFIRMED[confKey(a,b)]!=null; }

// ===== forma reciente por selección (datos reales de ESPN) =====
const FORMKEY='mundial_bracket_form_v1';
let TEAM_FORM={};                 // esName -> {g, gf, ga, delta}  (delta = ajuste de rating por forma)
let _espnFetchedAt=0;
function loadForm(){ try{const f=JSON.parse(localStorage.getItem(FORMKEY)); if(f&&typeof f==='object')TEAM_FORM=f;}catch(e){} }
function saveForm(){ try{localStorage.setItem(FORMKEY,JSON.stringify(TEAM_FORM));}catch(e){} }

// Trae de ESPN, en una sola pasada, TODOS los partidos terminados del Mundial:
//  - forma reciente de cada selección (goles a favor/en contra por partido)
//  - ganadores confirmados de las eliminatorias ya jugadas
async function fetchESPNTournamentData(force){
  if(!force && (Date.now()-_espnFetchedAt < 600000) && Object.keys(TEAM_FORM).length){
    return {teams:Object.keys(TEAM_FORM).length, winners:Object.keys(CONFIRMED).length, cached:true};
  }
  const DAY=86400000, tStart=Date.UTC(2026,5,10), tEnd=Date.UTC(2026,6,20);   // 10 jun – 20 jul 2026
  const days=[]; for(let t=tStart;t<=tEnd;t+=DAY) days.push(new Date(t).toISOString().slice(0,10).replace(/-/g,''));
  const chunks=await Promise.all(days.map(d=>fetchESPNday(d)));               // en paralelo (rápido)
  const seen={}, acc={}; let winners=0;
  const baseR=n=>{ const t=findTeam(n); return t? t.s : 62; };                 // rating base (sin forma) del rival
  for(const day of chunks){
    for(const ev of day){
      if(ev.id&&seen[ev.id])continue; if(ev.id)seen[ev.id]=1;
      const comp=ev.competitions&&ev.competitions[0]; if(!comp)continue;
      const p=espnParse(ev); if(!p || p.strStatus!=='FT')continue;            // solo terminados
      const A=mapBracketName(p.strHomeTeam), B=mapBracketName(p.strAwayTeam);
      const ha=+p.intHomeScore, aa=+p.intAwayScore;
      if(!A||!B||isNaN(ha)||isNaN(aa))continue;
      // rendimiento AJUSTADO POR RIVAL: diferencia de gol real vs la esperada por los ratings base
      const [ela,elb]=autoLambdas(baseR(A),baseR(B));
      const ovp=(ha-aa)-(ela-elb);                                            // >0 = rindió por encima de lo esperado
      (acc[A]=acc[A]||{g:0,gf:0,ga:0,op:0}); acc[A].g++; acc[A].gf+=ha; acc[A].ga+=aa; acc[A].op+=ovp;
      (acc[B]=acc[B]||{g:0,gf:0,ga:0,op:0}); acc[B].g++; acc[B].gf+=aa; acc[B].ga+=ha; acc[B].op-=ovp;
      const ph=detectPhase(compNoteText(comp));
      if(ph.knockout){
        let w=null;
        if(p.homeWinner)w=A; else if(p.awayWinner)w=B;
        else if(p.homeShootout!=null&&p.awayShootout!=null) w=(+p.homeShootout>+p.awayShootout)?A:B;
        else if(ha!==aa) w=(ha>aa)?A:B;
        if(w){ CONFIRMED[confKey(A,B)]=w; winners++; }
      }
    }
  }
  // convertir el rendimiento ajustado por rival en un ajuste de rating por equipo
  TEAM_FORM={};
  Object.keys(acc).forEach(t=>{
    const s=acc[t]; const conf=Math.min(s.g/3,1);                             // 3+ partidos = confianza plena
    const avgOp=s.op/s.g;                                                     // sobre/bajo-rendimiento medio vs rival
    const delta=clamp(avgOp*14, -13, 13)*conf;                               // mejor de lo esperado → más rating
    TEAM_FORM[t]={g:s.g, gf:s.gf, ga:s.ga, delta, op:avgOp};
  });
  _espnFetchedAt=Date.now();
  saveForm(); saveConfirmed();
  return {teams:Object.keys(TEAM_FORM).length, winners};
}

// Cuadro de ejemplo del Mundial 2026 (orden del árbol, según el bracket "al momento").
const WC2026_TEAMS=[
  'Alemania','Paraguay', 'Francia','Suecia', 'Canadá','Sudáfrica', 'Países Bajos','Marruecos',
  'Portugal','Croacia', 'España','Austria', 'Estados Unidos','Bosnia', 'Bélgica','Senegal',
  'Brasil','Japón', 'Costa de Marfil','Noruega', 'México','Ecuador', 'Inglaterra','RD del Congo',
  'Argentina','Cabo Verde', 'Australia','Egipto', 'Suiza','Algeria', 'Colombia','Ghana'
];
// ganadores ya confirmados: Paraguay (llave 1, abajo), Brasil (llave 9, arriba), Canadá (llave 15, arriba)
const WC2026_LOCK={0:2, 2:1, 8:1};

function loadBracket(){
  try{const b=JSON.parse(localStorage.getItem(BKEY)); if(Array.isArray(b)&&b.length)BRACKET=b;}catch(e){}
  if(!BRACKET.length) BRACKET=new Array(BRACKET_SIZE).fill('');
}
function saveBracket(){ try{localStorage.setItem(BKEY,JSON.stringify(BRACKET));}catch(e){} }

// carga el cuadro de ejemplo del Mundial 2026 con su orden y ganadores ya marcados como predicción
function loadWCBracket(){
  BRACKET=WC2026_TEAMS.slice();
  PICKS={};
  Object.keys(WC2026_LOCK).forEach(k=>{
    const p=+k, side=WC2026_LOCK[k], a=BRACKET[2*p], b=BRACKET[2*p+1];
    if(a&&b) PICKS[confKey(a,b)]= (side===1)?a:b;
  });
  saveBracket(); savePicks(); renderBracket();
  setBkMsg('Cargué el cuadro del Mundial 2026 con el orden del bracket. Revisa y simula.','ok');
}

function setBkMsg(m,kind){const el=document.getElementById('bkMsg'); if(el){ if(kind==='load'){el.innerHTML='<span class="spin"></span>'+m;}else{el.textContent=m;} el.style.color=kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)';}}
function setBkResMsg(m,kind){const el=document.getElementById('bkResMsg'); if(el){ if(kind==='load'){el.innerHTML='<span class="spin"></span>'+m;}else{el.textContent=m;} el.style.color=kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)';}}

// ===== Vista "En Vivo": todas las competiciones en una fecha =====
var LV_DATE=new Date();   // fecha seleccionada en la vista En Vivo
var liveMatchFilter="all"; // "all" | "live"

function setLiveMatchFilter(filter){
  liveMatchFilter=filter;
  document.querySelectorAll('.live-filter-btn').forEach(function(b){
    var active=b.dataset.liveFilter===filter;
    b.classList.toggle('active',active);
    b.setAttribute('aria-pressed',active?'true':'false');
  });
  if(typeof renderEnVivo==='function'&&!document.getElementById('viewEnVivo').classList.contains('hidden')) renderEnVivo();
}

function lvMove(d){ LV_DATE.setDate(LV_DATE.getDate()+d); renderEnVivo(); }
function lvToday(){ LV_DATE=new Date(); renderEnVivo(); }

function _liveCrest(teamName,px){
  var t=findTeam(teamName);
  if(t&&t.espn) return 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/'+t.espn+'.png&w='+px+'&h='+px;
  var code=FLAG_CODE[teamName];
  if(code) return 'https://flagcdn.com/w'+px+'/'+code+'.png';
  return '';
}

function _liveStatusClass(state,stt){
  if(state==='in'){
    var clock=((stt&&stt.displayClock)||'').toLowerCase();
    if(clock.indexOf('halftime')>=0||clock.indexOf('descanso')>=0) return 'status-halftime';
    return 'status-live';
  }
  if(state==='post') return 'status-finished';
  if(state==='pre') return 'status-scheduled';
  return 'status-cancelled';
}

function _liveStatusLabel(state,stt,ev){
  if(state==='pre') return {text:fmtKick(ev.date),sub:'No iniciado'};
  var clock=stt.displayClock||'';
  var detail=(stt.type&&stt.type.shortDetail)||'';
  var cl=clock.toLowerCase();
  if(cl.indexOf('halftime')>=0||cl.indexOf('descanso')>=0) return {text:'HT',sub:'Descanso'};
  if(state==='in') return {text:detail||clock||'En juego',sub:'En vivo'};
  if(state==='post') return {text:'FT',sub:'Finalizado'};
  return {text:detail||clock||'—',sub:''};
}

function _liveStateBadge(state,stt){
  if(state==='in'){
    var cl=((stt&&stt.displayClock)||'').toLowerCase();
    if(cl.indexOf('halftime')>=0||cl.indexOf('descanso')>=0) return '⏸️';
    return '🔴';
  }
  if(state==='post') return '✓';
  return '🕒';
}

function _liveEventsList(comp,homeTeamId){
  var items=[];
  if(!comp||!comp.details) return items;
  comp.details.forEach(function(d){
    if(!d.scoringPlay&&!d.yellowCard&&!d.redCard) return;
    var min=d.clock&&d.clock.displayValue||'';
    var player=d.athletesInvolved&&d.athletesInvolved[0]?d.athletesInvolved[0].displayName:'';
    var isHome=d.team&&d.team.id===homeTeamId;
    if(d.scoringPlay){
      var icon='⚽';
      if(d.ownGoal) icon='⚽(og)';
      else if(d.penaltyKick) icon='⚽(p)';
      else if(d.shootout) icon='⚽(pen)';
      items.push({type:'goal',side:isHome?'home':'away',min:min,icon:icon,player:player});
    }
    if(d.yellowCard) items.push({type:'yellow',side:isHome?'home':'away',min:min,icon:'🟨',player:player});
    if(d.redCard) items.push({type:'red',side:isHome?'home':'away',min:min,icon:'🟥',player:player});
  });
  return items;
}

async function renderEnVivo(){
  var el=document.getElementById('lvBody'); if(!el) return;
  var dateStrip=document.getElementById('lvDateStrip');
  var dias=['dom','lun','mar','mié','jue','vie','sáb'];
  var meses=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

  // Render date strip
  if(dateStrip){
    var today=new Date();
    today.setHours(0,0,0,0);
    var sel=new Date(LV_DATE);
    sel.setHours(0,0,0,0);
    var htmlDates='';
    for(var i=-2;i<=2;i++){
      var d=new Date(sel);
      d.setDate(sel.getDate()+i);
      var isToday=d.getTime()===today.getTime();
      var isSel=d.getTime()===sel.getTime();
      var day=d.getDate();
      var dow=dias[d.getDay()];
      var ymd=d.toISOString().slice(0,10);
      htmlDates+=
        '<button class="live-date-btn'+(isSel?' active':'')+'" data-ymd="'+ymd+'" onclick="LV_DATE=new Date(\''+ymd+'T12:00:00\');renderEnVivo()">'+
          '<span class="live-date-dow">'+(i===0?'Hoy':dow)+'</span>'+
          '<span class="live-date-day">'+day+'</span>'+
          (isToday?'<span class="live-date-today">Hoy</span>':'')+
        '</button>';
    }
    dateStrip.innerHTML=htmlDates;
  }

  var ymd=LV_DATE.toISOString().slice(0,10).replace(/-/g,'');
  el.innerHTML='<div class="live-loading">Cargando partidos…</div>';

  // Update heading
  var heading=document.querySelector('.live-heading');
  if(heading){
    var d=LV_DATE, dow=dias[d.getDay()];
    heading.textContent=dow+', '+d.getDate()+' '+meses[d.getMonth()];
  }

  // Fetch all leagues for this date
  var leagueIds=Object.keys(LEAGUES);
  try{
    var results=await Promise.all(leagueIds.map(async function(id){
      try{
        var url='https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[id].espn+'/scoreboard?dates='+ymd;
        var r=await fetch(url);
        if(!r.ok) return null;
        var d=await r.json(); return {id:id, events:(d&&d.events)||[]};
      }catch(e){ return null; }
    }));
    var allEvents=[];
    results.filter(Boolean).forEach(function(r){
      if(!r.events.length) return;
      var L=LEAGUES[r.id]; if(!L) return;
      r.events.forEach(function(ev){
        allEvents.push({id:r.id, L:L, ev:ev});
      });
    });

    // Apply filter
    if(liveMatchFilter==='live'){
      allEvents=allEvents.filter(function(item){
        var comp=item.ev.competitions&&item.ev.competitions[0];
        if(!comp) return false;
        var stt=comp.status||{}, st=stt.type||{}, state=st.state||'';
        return state==='in';
      });
    }

    // Group by league
    var groups={};
    allEvents.forEach(function(item){
      if(!groups[item.id]) groups[item.id]={L:item.L, events:[]};
      groups[item.id].events.push(item.ev);
    });

    var matchCount=0;
    var totalHtml='';

    Object.keys(groups).forEach(function(gid,gi){
      var g=groups[gid];
      var L=g.L;
      var evs=g.events;
      var nLive=0;
      evs.forEach(function(ev){
        var comp=ev.competitions&&ev.competitions[0];
        if(comp){ var stt=comp.status||{}, st=stt.type||{}; if(st.state==='in') nLive++; }
      });
      matchCount+=evs.length;

      var logoUrl='https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/'+(L.logo||'4')+'.png&w=40&h=40';
      var compRound='';
      // Try to get round/group from first event
      if(evs[0]){
        var comp0=evs[0].competitions&&evs[0].competitions[0];
        if(comp0){
          var noteText=compNoteText(comp0);
          if(noteText){
            var ph=detectPhase(noteText);
            if(ph&&ph.label) compRound=ph.label;
            else if(ph&&ph.group) compRound=ph.group;
          }
        }
      }

      totalHtml+=
        '<div class="live-competition-group" data-league="'+gid+'">'+
          '<div class="live-competition-header" onclick="this.parentElement.classList.toggle(\'collapsed\');var t=this.querySelector(\'.live-comp-toggle\');if(t)t.textContent=this.parentElement.classList.contains(\'collapsed\')?\'▶\':\'▼\'">'+
            '<img class="live-comp-logo" src="'+logoUrl+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">'+
            '<span class="live-comp-name">'+(L.icon||'')+' '+L.name+'</span>'+
            (compRound?'<span class="live-comp-round">'+compRound+'</span>':'')+
            '<span class="live-comp-badges">'+
              '<span class="live-comp-badge">'+evs.length+' partido'+(evs.length!==1?'s':'')+'</span>'+
              (nLive>0?'<span class="live-comp-badge live">'+nLive+' en vivo</span>':'')+
            '</span>'+
            '<span class="live-comp-toggle">▼</span>'+
          '</div>';

      evs.forEach(function(ev){
        var comp=ev.competitions&&ev.competitions[0]; if(!comp)return;
        var stt=comp.status||{}, st=stt.type||{}, state=st.state||'';
        var cs=comp.competitors||[];
        var home=cs.find(function(c){return c.homeAway==='home';});
        var away=cs.find(function(c){return c.homeAway==='away';});
        if(!home||!away) return;

        var hN=mapBracketName((home.team&&(home.team.displayName||home.team.name))||'');
        var aN=mapBracketName((away.team&&(away.team.displayName||away.team.name))||'');
        var hs=home.score!=null?home.score:'–';
        var as=away.score!=null?away.score:'–';
        var homeId=home.team&&home.team.id;

        var statusInfo=_liveStatusLabel(state,stt,ev);
        var statusClass=_liveStatusClass(state,stt);
        var statusBadge=_liveStateBadge(state,stt);

        // Events (goals/cards)
        var events=_liveEventsList(comp,homeId);

        // Team crests
        var hCrest=_liveCrest(hN,20);
        var aCrest=_liveCrest(aN,20);
        var hCrestHtml=hCrest?'<img class="live-team-crest" src="'+hCrest+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">':flagImg(hN,14);
        var aCrestHtml=aCrest?'<img class="live-team-crest" src="'+aCrest+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">':flagImg(aN,14);

        // Penalties
        var pen='';
        if(home.shootoutScore!=null||away.shootoutScore!=null){
          pen='<span class="live-score-num" style="font-size:11px;color:var(--app-text-muted)">('+(home.shootoutScore||0)+'–'+(away.shootoutScore||0)+')</span>';
        }

        totalHtml+=
          '<div class="live-match-card '+statusClass+'"'+(ev.id?' data-event-id="'+ev.id+'"':'')+'>'+
            '<div class="live-match-status">'+
              '<span class="live-min-text">'+statusBadge+' '+statusInfo.text+'</span>'+
              (statusInfo.sub?'<span class="live-min-sub">'+statusInfo.sub+'</span>':'')+
            '</div>'+
            '<div class="live-match-main">'+
              '<div class="live-team home">'+
                '<span class="live-team-name">'+hN+'</span>'+
                hCrestHtml+
              '</div>'+
              '<div class="live-score">'+
                '<span class="live-score-num">'+hs+'</span>'+
                '<span class="live-score-sep">–</span>'+
                '<span class="live-score-num">'+as+'</span>'+
                pen+
              '</div>'+
              '<div class="live-team away">'+
                aCrestHtml+
                '<span class="live-team-name">'+aN+'</span>'+
              '</div>'+
            '</div>'+
            (events.length?'<div class="live-match-events"><div class="live-event-list">'+events.slice(0,4).map(function(e){
              return '<span class="live-event-item"><span class="live-event-min">'+e.min+'</span><span class="live-event-icon">'+e.icon+'</span>'+e.player+'</span>';
            }).join('')+'</div></div>':'')+
          '</div>';
      });

      totalHtml+='</div>';
    });

    // Update match count
    var countEl=document.getElementById('liveMatchCount');
    if(countEl){
      var nLiveTotal=0;
      allEvents.forEach(function(item){
        var comp=item.ev.competitions&&item.ev.competitions[0];
        if(comp){ var stt2=comp.status||{}, st2=stt2.type||{}; if(st2.state==='in') nLiveTotal++; }
      });
      var cntText=matchCount+' partido'+(matchCount!==1?'s':'');
      if(nLiveTotal>0) cntText+=' · '+nLiveTotal+' en vivo';
      countEl.textContent=cntText;
    }

    el.innerHTML=totalHtml||'<div class="live-empty"><div class="live-empty-icon">📭</div>No hay partidos esta fecha.</div>';
  }catch(e){
    el.innerHTML='<div class="live-empty"><div class="live-empty-icon">⚠️</div>Error al cargar. Verifica la conexión.<br><button class="live-retry-btn" onclick="renderEnVivo()">Reintentar</button></div>';
  }
}
// cambia entre la vista de partido y la de bracket
function showView(v, opts){
  const views={envivo:'viewEnVivo',match:'viewMatch',bracket:'viewBracket',estadisticas:'viewStats',cartilla:'viewCartilla',rend:'viewRend',idolo:'viewIdolo',competition:'viewCompetition'};
  Object.keys(views).forEach(k=>{ const e=document.getElementById(views[k]); if(e) e.classList.toggle('hidden', k!==v); });
  const tabs={match:'navMatch',bracket:'navBracket',estadisticas:'navStats',cartilla:'navCart',rend:'navRend'};
  Object.keys(tabs).forEach(k=>{ const e=document.getElementById(tabs[k]); if(e) e.classList.toggle('active', k===v); });
  const fab=document.getElementById('fab'); if(fab) fab.style.display = (v==='match')? '' : 'none';
  updateAppNavigation(v);
  if(v==='envivo') renderEnVivo();
  if(v==='bracket') renderBracket();
  if(v==='estadisticas') renderStatsView();
  if(v==='cartilla'){ renderCartPicker(); renderCartDay(); renderCartilla(); }
  if(v==='rend') renderDashboard();
  if(v==='idolo'){ idoloRender(); }
  if(v==='competition'){
    var ctx = opts && opts.context ? opts.context : 'global';
    currentCompetitionHubContext = ctx;
    renderCurrentCompetitionHub();
  }
}

function updateAppNavigation(view) {
  var mainNav = document.getElementById('mainNav');
  var predictorViews = ['match', 'bracket', 'estadisticas', 'cartilla', 'rend'];
  if (mainNav) {
    mainNav.classList.toggle('hidden', predictorViews.indexOf(view) === -1);
  }
  var headerLinks = {
    headerNavEnVivo: ['envivo'],
    headerNavPredictor: ['match', 'bracket', 'estadisticas', 'cartilla', 'rend'],
    headerNavCompetition: ['competition'],
    headerNavIdolo: ['idolo']
  };
  Object.keys(headerLinks).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.classList.toggle('active', headerLinks[id].indexOf(view) !== -1);
    }
  });
}

function renderDashboard(){
  const el=document.getElementById('rendBody'); if(!el)return;
  const done=HIST.filter(x=>x.actualA!=null&&x.actualB!=null);
  const n=done.length;
  if(!n){ el.innerHTML='<div class="hist-empty">No hay partidos con resultado real cargado. Guarda predicciones e importa/carga resultados para ver el rendimiento.</div>'; return; }
  let res=0,sc=0,ou=0,bt=0,sc2=0,sumP=0,sumR=0,absErr=0;
  let racha=0, rachaTipo='', maxRacha=0, maxRachaTipo='';
  let last10ok=0;
  done.forEach((it,i)=>{
    const j=judge(it);
    if(j.hitRes)res++; if(j.hitScore)sc++; if(j.hitOU)ou++; if(j.hitBtts)bt++;
    if(j.hitScore2)sc2++;
    sumP+=j.predTot; sumR+=j.realTot; absErr+=Math.abs(j.predTot-j.realTot);
    const ok=j.hitRes?1:0;
    if(ok===1){ racha++; if(racha>maxRacha){maxRacha=racha; maxRachaTipo='✅';} }else{ racha=0; }
    if(i>=n-10) last10ok+=ok;
  });
  const rachaAct=()=>{ let r=0; for(let i=done.length-1;i>=0;i--){if(judge(done[i]).hitRes)r++;else break;} return r; };
  const rachaActual=rachaAct();
  const avgErr=n?absErr/n:0;
  const bias=sumR-sumP;
  const roi=done.reduce((acc,it)=>{ const j=judge(it); if(!j.hitRes)return acc-10; const odds=j.realRes==='D'?3.3:(j.realRes==='H'?2.1:3.0); return acc+10*(odds-1); },0);
  const pc=x=>(100*x).toFixed(1)+'%';
  const bar=(v,max,w)=>`<div class="rend-bar"><div class="rend-fill" style="width:${max>0?(v/max*100).toFixed(0):0}%;background:var(--acc);border-radius:4px;height:12px;max-width:${w||200}px"></div></div>`;
  const cell=(t,v)=>`<div class="rend-cell"><div class="rend-cell-v">${v}</div><div class="rend-cell-t">${t}</div></div>`;
  const seg=(cls,w)=>`<span class="rend-seg-${cls}" style="width:${(w*100).toFixed(1)}%"></span>`;
  const tendencia = last10ok>=7?'📈':(last10ok<=3?'📉':'➡️');

  // evolución: aciertos acumulados por tanda de 3
  const evo=[];
  for(let i=0;i<done.length;i+=3){
    const chunk=done.slice(i,Math.min(i+3,done.length));
    const ok=chunk.filter(x=>judge(x).hitRes).length;
    evo.push(ok+'/'+chunk.length);
  }

  let html='<div class="rend-grid">';
  html+=cell('Partidos con resultado', n);
  html+=cell('Acierto resultado', pc(res/n));
  html+=cell('Marcador exacto', pc(sc/n));
  html+=cell('Over/Under 2.5', pc(ou/n));
  html+=cell('Ambos marcan', pc(bt/n));
  if(sc2) html+=cell('2.º resultado acertado', sc2);
  html+=cell('Error medio goles', avgErr.toFixed(2));
  html+=cell('Sesgo', (bias>0?'+':'')+bias.toFixed(2));
  html+=`</div>`;

  // barra resultado
  html+=`<h3 class="sec" style="margin:14px 0 6px">🎯 Precisión en resultado</h3>
    <div class="rend-label"><span>Acertados <b>${res}/${n}</b></span><span>${pc(res/n)}</span></div>${bar(res,n,300)}
    <div class="rend-label"><span>Fallados <b>${n-res}/${n}</b></span><span>${pc(1-res/n)}</span></div>${bar(n-res,n,300)}`;

  // racha
  html+=`<h3 class="sec" style="margin:14px 0 6px">🔥 Rachas</h3>
    <div class="rend-stat">Racha actual: <b>${rachaActual}</b> aciertos consecutivos ${rachaActual>=3?'🔥':''}</div>
    <div class="rend-stat">Mejor racha: <b>${maxRacha}</b> aciertos consecutivos</div>
    <div class="rend-stat">Últimos 10: <b>${last10ok}/10</b> aciertos ${tendencia}</div>`;

  // ROI
  html+=`<h3 class="sec" style="margin:14px 0 6px">💰 ROI simulado</h3>
    <div class="rend-stat">Si apostaste <b>$10</b> al favorito del modelo en cada partido:</div>
    <div class="rend-stat" style="font-size:20px;font-weight:800;color:${roi>=0?'var(--acc)':'var(--red)'}">${roi>=0?'+':''}$${roi.toFixed(2)}</div>
    <div class="sub" style="color:var(--gray)">Simulación educativa · cuota fija estimada (local 2.1, empate 3.3, visita 3.0) · sin comisión</div>`;

  // por mercado
  html+=`<h3 class="sec" style="margin:14px 0 6px">📋 Por mercado</h3><div class="rend-grid-sm">`;
  html+=`<div class="rend-mkt"><span>Resultado</span><b>${pc(res/n)}</b>${seg('h',res/n)}</div>`;
  html+=`<div class="rend-mkt"><span>Marcador exacto</span><b>${pc(sc/n)}</b>${seg('h',sc/n)}</div>`;
  html+=`<div class="rend-mkt"><span>Over/Under 2.5</span><b>${pc(ou/n)}</b>${seg('h',ou/n)}</div>`;
  html+=`<div class="rend-mkt"><span>Ambos marcan</span><b>${pc(bt/n)}</b>${seg('h',bt/n)}</div>`;
  if(done.some(x=>x.actualStats)){
    const st=done.filter(x=>x.actualStats);
    const hp=st.filter(x=>judge(x).hitPoss).length, hc=st.filter(x=>judge(x).hitCorners).length, hy=st.filter(x=>judge(x).hitYellow).length;
    if(st.length) html+=`<div class="rend-mkt"><span>Posexión dominante</span><b>${pc(hp/st.length)}</b>${seg('h',hp/st.length)}</div>`;
    if(st.length) html+=`<div class="rend-mkt"><span>Córners O/U 9.5</span><b>${pc(hc/st.length)}</b>${seg('h',hc/st.length)}</div>`;
    if(st.length) html+=`<div class="rend-mkt"><span>Amarillas O/U 3.5</span><b>${pc(hy/st.length)}</b>${seg('h',hy/st.length)}</div>`;
  }
  html+=`</div>`;

  // evolución
  if(evo.length>1){
    html+=`<h3 class="sec" style="margin:14px 0 6px">📈 Evolución (tandas de 3 partidos)</h3><div class="rend-evo">`;
    evo.forEach((e,i)=>{
      const ok=parseInt(e.split('/')[0]), total=parseInt(e.split('/')[1]);
      html+=`<div class="rend-evo-item"><div class="rend-evo-num">${e}</div><div class="rend-evo-bar"><div class="rend-fill" style="width:${(ok/total*100).toFixed(0)}%;background:var(--acc);height:20px;border-radius:4px;min-width:4px"></div></div></div>`;
    });
    html+=`</div>`;
  }

  html+=`<div class="note" style="margin-top:16px">Los datos se actualizan automáticamente al cargar resultados reales. El ROI es puramente educativo y usa cuotas fijas estimadas.</div>`;
  el.innerHTML=html;
}

function renderLeagueTable(){
  const L=LEAGUES[CURRENT_LEAGUE];
  const ct=leagueTeams(CURRENT_LEAGUE);
  const bkvCard=document.querySelector('.bkv-card');
  const bkvHeading=bkvCard?bkvCard.querySelector('.bkv-heading'):null;
  const bkGrid=document.querySelector('.bk-grid');
  if(bkvHeading) bkvHeading.textContent = (L?L.icon:'')+' CAMINO AL TÍTULO · '+(L?L.name:'');
  if(bkGrid) bkGrid.style.display='none';
  if(!ct){ const v=document.getElementById('bracketVisual'); if(v) v.innerHTML='<div class="league-empty">No hay datos de equipos para esta competición.</div>'; return; }
  // inicializar stats
  const stats={};
  ct.forEach(t=>{ stats[t.es]={team:t, gp:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}; });
  // escanear historial
  HIST.forEach(p=>{
    const ha=findTeam(p.A), hb=findTeam(p.B);
    if(!ha||!hb) return;
    const ta=stats[ha.es], tb=stats[hb.es];
    if(!ta||!tb) return;
    // escoger resultado más probable
    var res='D';
    if(p.pH>=p.pD&&p.pH>=p.pA) res='H';
    else if(p.pA>=p.pD) res='A';
    ta.gp++; tb.gp++;
    if(res==='H'){ ta.w++; tb.l++; ta.pts+=3; }
    else if(res==='A'){ tb.w++; ta.l++; tb.pts+=3; }
    else{ ta.d++; tb.d++; ta.pts++; tb.pts++; }
    // goles del marcador más probable
    const gi=parseInt(p.si,10)||0, gj=parseInt(p.sj,10)||0;
    ta.gf+=gi; ta.ga+=gj; tb.gf+=gj; tb.ga+=gi;
  });
  // ordenar
  const sorted=Object.values(stats).sort((a,b)=>{
    if(a.pts!==b.pts) return b.pts-a.pts;
    const gda=a.gf-a.ga, gdb=b.gf-b.ga;
    if(gda!==gdb) return gdb-gda;
    return b.gf-a.gf;
  });
  // cabecera de la tabla
  let html='<table class="league-table"><thead><tr><th>#</th><th>Equipo</th><th class="r">PJ</th><th class="r">G</th><th class="r">E</th><th class="r">P</th><th class="r">GF</th><th class="r">GC</th><th class="r">DG</th><th class="r">Pts</th></tr></thead><tbody>';
  sorted.forEach((row,i)=>{
    const gd=row.gf-row.ga, gdS=gd>0?'+'+gd:''+gd;
    html+=`<tr${i===0?' class="top"':''}><td>${i+1}</td><td>${flagImg(row.team.es,14)} ${row.team.es}</td><td class="r">${row.gp}</td><td class="r">${row.w}</td><td class="r">${row.d}</td><td class="r">${row.l}</td><td class="r">${row.gf}</td><td class="r">${row.ga}</td><td class="r">${gdS}</td><td class="r b">${row.pts}</td></tr>`;
  });
  html+='</tbody></table>';
  const noData=!sorted.length||!sorted.reduce((s,r)=>s+r.gp,0);
  if(noData) html='<div class="league-empty">Sin predicciones para esta liga todavía. Simula y guarda partidos para construir la tabla.</div>';
  const el=document.getElementById('bracketVisual');
  if(el) el.innerHTML=html;
}
// ===== sección de estadísticas por competición (desde API de ESPN) =====
async function renderStatsView(){
  const el=document.getElementById('statsBody'); if(!el) return;
  const L=LEAGUES[CURRENT_LEAGUE]; if(!L) return;
  el.innerHTML='<div class="sub" style="padding:20px;text-align:center">Cargando estadísticas…</div>';
  var html='<div class="sub" style="font-size:11px;color:var(--gray);margin-bottom:8px">📆 Temporada 26/27</div>';
  var scorers=[], standingsData=[];
  // competiciones ligueras con tabla de posiciones; torneos sin ella
  var hasStandings=CURRENT_LEAGUE!=='worldcup'&&CURRENT_LEAGUE!=='champions_classif';

  // intentar API solo para ligas con datos de tabla
  if(hasStandings){
    try{
      var [sJson, stJson]=await Promise.all([
        fetchESPNStats('scoring').catch(()=>null),
        fetchESPNStandings().catch(()=>null)
      ]);
      // goleadores desde estadísticas de jugadores
      if(sJson && sJson.athletes){
        var goalIdx=0;
        if(sJson.categories && sJson.categories[0] && sJson.categories[0].labels){
          var lblIdx=sJson.categories[0].labels.findIndex(l=>/gol|goal/i.test(l));
          if(lblIdx>=0) goalIdx=lblIdx;
        }
        sJson.athletes.forEach(a=>{
          if(!a||!a.team) return;
          const tm=mapBracketName(a.team.displayName||a.team.name||'');
          var g=0;
          if(a.statistics && Array.isArray(a.statistics)) g=parseInt(a.statistics[goalIdx]||'0',10);
          else if(a.statistics && typeof a.statistics==='object' && a.statistics.goals) g=parseInt(a.statistics.goals,10);
          if(tm && g>0) scorers.push({name:a.displayName||a.firstName||'?', team:tm, goals:g});
        });
        // filtrar solo jugadores de equipos de la liga actual
        var ctNames=(leagueTeams(CURRENT_LEAGUE)||[]).map(t=>norm(t.es));
        scorers=scorers.filter(s=>ctNames.includes(norm(s.team)));
      }
      // tabla de posiciones
      if(stJson && stJson.standings){
        const entries=stJson.standings[0]&&stJson.standings[0].entries;
        if(entries) entries.forEach(e=>{
          const tm=mapBracketName((e.team&&(e.team.displayName||e.team.name))||'');
          const s=e.stats||[];
          const get=(n)=> { const x=s.find(st=>st.name===n); return x? parseFloat(x.displayValue) : 0; };
          if(tm){
            const gp=get('gamesPlayed'), w=get('wins'), d=get('ties'), l=get('losses'), gf=get('pointsFor'), ga=get('pointsAgainst');
            const formArr=[];
            if(e.form){
              const raw=(''+e.form).toUpperCase();
              formArr.push(...raw.split('').filter(c=>c==='W'||c==='D'||c==='L'));
            }
            standingsData.push({tm,gp:Math.round(gp),w:Math.round(w),d:Math.round(d),l:Math.round(l),gf:Math.round(gf),ga:Math.round(ga),pts:Math.round(get('points')),form:formArr});
          }
        });
        // filtrar solo equipos de la liga actual
        var ctNames2=(leagueTeams(CURRENT_LEAGUE)||[]).map(t=>norm(t.es));
        standingsData=standingsData.filter(s=>ctNames2.includes(norm(s.tm)));
      }
    }catch(e){}
  }

  // si la API no devolvió datos o no hay standings, calcular desde HIST
  var usedFallback=!scorers.length && !standingsData.some(t=>t.gp>0);
  if(usedFallback){
    const ct=leagueTeams(CURRENT_LEAGUE);
    const localScorers={}, teamTotals={};
    HIST.forEach(p=>{
      // goleadores nominales si existen
      if(p.actualStats&&p.actualStats.scorers){
        p.actualStats.scorers.forEach(g=>{
          if(!g.name||g.ownGoal||g.shootout) return;
          const tn=g.forA?p.A:p.B;
          const key=g.name+'|'+tn;
          if(!localScorers[key]) localScorers[key]={name:g.name, team:tn, goals:0};
          localScorers[key].goals++;
        });
      }
      // total de goles por equipo
      if(p.actualA!=null){
        if(!teamTotals[p.A]) teamTotals[p.A]={gf:0,ga:0};
        if(!teamTotals[p.B]) teamTotals[p.B]={gf:0,ga:0};
        teamTotals[p.A].gf+=+p.actualA; teamTotals[p.A].ga+=+p.actualB;
        teamTotals[p.B].gf+=+p.actualB; teamTotals[p.B].ga+=+p.actualA;
      }
    });
    scorers=Object.values(localScorers).sort((a,b)=>b.goals-a.goals).slice(0,10);
    if(ct){
      const tf={};
      ct.forEach(t=>{ tf[t.es]={form:[],gf:(teamTotals[t.es]||{}).gf||0,ga:(teamTotals[t.es]||{}).ga||0,gp:0}; });
      HIST.filter(p=>p.actualA!=null).forEach(p=>{
        const ha=findTeam(p.A), hb=findTeam(p.B);
        if(!ha||!hb||!tf[ha.es]||!tf[hb.es]) return;
        tf[ha.es].gp++; tf[hb.es].gp++;
        if(+p.actualA>+p.actualB){ tf[ha.es].form.push('W'); tf[hb.es].form.push('L'); }
        else if(+p.actualA<+p.actualB){ tf[ha.es].form.push('L'); tf[hb.es].form.push('W'); }
        else{ tf[ha.es].form.push('D'); tf[hb.es].form.push('D'); }
      });
      standingsData=ct.map(t=>{
        const f=tf[t.es]||{form:[],gf:0,ga:0,gp:0};
        return {tm:t.es,gp:f.gp,gf:f.gf,ga:f.ga,form:f.form};
      }).sort((a,b)=>{
        const pa=a.gp?a.gf/a.gp:0, pb=b.gp?b.gf/b.gp:0;
        return pb-pa;
      });
    }
  }

  // próximos partidos desde liveData (solo de la liga actual)
  const nextByTeam={};
  (_liveData||[]).filter(m=>m.state==='pre').forEach(m=>{
    if(!nextByTeam[m.A]) nextByTeam[m.A]=[];
    if(!nextByTeam[m.B]) nextByTeam[m.B]=[];
    if(nextByTeam[m.A].length<3) nextByTeam[m.A].push({opp:m.B, date:m.date, label:m.label});
    if(nextByTeam[m.B].length<3) nextByTeam[m.B].push({opp:m.A, date:m.date, label:m.label});
  });

  // ranking de goleadores
  const topG=scorers.slice(0,10);
  var topHtml='<div><h3>⚽ Goleadores</h3>';
  if(topG.length){
    topHtml+='<table><thead><tr><th>Jugador</th><th class="r">Goles</th></tr></thead><tbody>'+
      topG.map(s=>`<tr><td><span class="scorer-name">${flagImg(s.team,12)} ${s.name}</span></td><td class="r b">${s.goals}</td></tr>`).join('')+
      '</tbody></table>';
  } else {
    topHtml+='<div class="league-empty" style="padding:6px;font-size:11px">Aún no hay goles registrados esta temporada.</div>';
  }
  topHtml+='</div>';

  // tabla de promedios y forma
  const hasData=standingsData.some(t=>t.gp>0);
  var formHtml='<div><h3>📊 Promedios · Forma</h3>';
  if(hasData){
    formHtml+='<table><thead><tr><th>Equipo</th><th class="r">PJ</th><th class="r">GF</th><th class="r">GC</th><th class="r">Prom.</th><th>Últimos</th></tr></thead><tbody>'+
      standingsData.map(t=>{
        const avg=t.gp?(t.gf/t.gp).toFixed(2):'-';
        const last5=(t.form||[]).slice(-5).map(r=>`<span class="form-dot ${r}">${r==='W'?'G':r}</span>`).join('');
        return `<tr><td>${flagImg(t.tm,12)} ${t.tm}</td><td class="r">${t.gp||0}</td><td class="r">${t.gf||0}</td><td class="r">${t.ga||0}</td><td class="r b">${avg}</td><td>${last5||'—'}</td></tr>`;
      }).join('')+'</tbody></table>';
  } else {
    formHtml+='<div class="league-empty" style="padding:6px;font-size:11px">Sin partidos jugados esta temporada. Importa resultados o simula partidos.</div>';
  }
  formHtml+='</div>';

  // próximos partidos
  var nextHtml='<div><h3>📅 Próximos</h3>';
  var hasNext=false;
  Object.keys(nextByTeam).forEach(tm=>{
    const nx=nextByTeam[tm];
    if(!nx||!nx.length) return;
    hasNext=true;
    const items=nx.slice(0,2).map(m=>`${flagImg(m.opp,12)} ${m.opp} <span style="color:var(--mut);font-size:10px">${m.label}</span>`).join(' <span style="color:var(--mut)">·</span> ');
    nextHtml+=`<div style="display:flex;align-items:center;gap:6px;padding:2px 0;font-size:11px">${flagImg(tm,14)} ${tm}: ${items}</div>`;
  });
  nextHtml+=hasNext?'</div>':'<div class="league-empty" style="padding:6px;font-size:11px">No hay próximos partidos programados.</div></div>';
  el.innerHTML=html+'<div class="stats-box">'+topHtml+formHtml+nextHtml+'</div>';
}

// fetch de estadísticas de una categoría (scoring, passing, etc.)
async function fetchESPNStats(group){
  const base=espnBase().replace('/scoreboard','');
  try{
    const r=await fetch(base+'/statistics?type=player&group='+(group||'scoring')+'&season=2026');
    if(!r.ok) return null;
    const d=await r.json(); return d;
  }catch(e){ return null; }
}
// fetch de tabla de posiciones desde ESPN
async function fetchESPNStandings(){
  const base=espnBase().replace('/scoreboard','');
  try{
    const r=await fetch(base+'/standings?season=2026');
    if(!r.ok) return null;
    const d=await r.json(); return d;
  }catch(e){ return null; }
}
function renderBracket(){
  const isWorldCup=CURRENT_LEAGUE==='worldcup';
  const isChamps=CURRENT_LEAGUE==='champions';
  if(!isWorldCup&&!isChamps){ renderLeagueTable(); return; }
  const bkvCard=document.querySelector('.bkv-card');
  const bkvHeading=bkvCard?bkvCard.querySelector('.bkv-heading'):null;
  const bkGrid=document.querySelector('.bk-grid');
  if(isChamps){
    if(bkvHeading) bkvHeading.textContent = '⭐ CAMINO AL TÍTULO · CHAMPIONS LEAGUE';
    if(bkGrid) bkGrid.style.display='';
    var wcBtn=document.querySelector('[onclick="loadWCBracket()"]');
    var chBtn=document.getElementById('btnChampBracket');
    if(wcBtn) wcBtn.style.display='none';
    if(chBtn) chBtn.style.display='';
    renderLeagueTable();
    var chost=document.getElementById('bracketEditor'); if(!chost)return;
    var ch='';
    for(var ci=0;ci<BRACKET.length;ci+=2){
      var cm=ci/2+1;
      var ca=(BRACKET[ci]||'').replace(/"/g,'&quot;'), cb=(BRACKET[ci+1]||'').replace(/"/g,'&quot;');
      var cw=pickedWinner(BRACKET[ci],BRACKET[ci+1]);
      var con1=cw&&norm(cw)===norm(BRACKET[ci]||''), con2=cw&&norm(cw)===norm(BRACKET[ci+1]||'');
      ch+=`<div class="bk-match"><span class="bk-no">${cm}</span>`+
         `<div class="bk-side">`+
           `<input list="teamlist" value="${ca}" oninput="onBracketEdit(${ci},this.value)" placeholder="Equipo">`+
           `<button class="bk-win ${con1?'on':''}" title="Marcar como ganador" onclick="lockWin(${ci})">✓</button>`+
         `</div>`+
         `<span class="bk-vs">vs</span>`+
         `<div class="bk-side">`+
           `<input list="teamlist" value="${cb}" oninput="onBracketEdit(${ci+1},this.value)" placeholder="Equipo">`+
           `<button class="bk-win ${con2?'on':''}" title="Marcar como ganador" onclick="lockWin(${ci+1})">✓</button>`+
         `</div>`+
         `</div>`;
    }
    chost.innerHTML=ch;
    // no renderizamos el árbol visual para no pisar la tabla de posiciones
    return;
  }
  if(bkvHeading) bkvHeading.textContent = '🏆 CAMINO AL TÍTULO · BRACKET 2026';
  if(bkGrid) bkGrid.style.display='';
  var wcB=document.querySelector('[onclick="loadWCBracket()"]');
  var chB=document.getElementById('btnChampBracket');
  if(wcB) wcB.style.display='';
  if(chB) chB.style.display='none';
  const host=document.getElementById('bracketEditor'); if(!host)return;
  let h='';
  for(let i=0;i<BRACKET.length;i+=2){
    const m=i/2+1;
    const a=(BRACKET[i]||'').replace(/"/g,'&quot;'), b=(BRACKET[i+1]||'').replace(/"/g,'&quot;');
    const w=pickedWinner(BRACKET[i],BRACKET[i+1]);
    const on1=w&&norm(w)===norm(BRACKET[i]||''), on2=w&&norm(w)===norm(BRACKET[i+1]||'');
    h+=`<div class="bk-match"><span class="bk-no">${m}</span>`+
       `<div class="bk-side">`+
         `<input list="teamlist" value="${a}" oninput="onBracketEdit(${i},this.value)" placeholder="Equipo">`+
         `<button class="bk-win ${on1?'on':''}" title="Marcar como ganador" onclick="lockWin(${i})">✓</button>`+
       `</div>`+
       `<span class="bk-vs">vs</span>`+
       `<div class="bk-side">`+
         `<input list="teamlist" value="${b}" oninput="onBracketEdit(${i+1},this.value)" placeholder="Equipo">`+
         `<button class="bk-win ${on2?'on':''}" title="Marcar como ganador" onclick="lockWin(${i+1})">✓</button>`+
       `</div>`+
       `</div>`;
  }
  host.innerHTML=h;
  renderBracketVisual();
}
function onBracketEdit(i,v){ BRACKET[i]=v.trim(); saveBracket(); renderBracketVisual(); }
// marca al equipo del índice i como ganador de su cruce (contra el equipo hermano i^1)
function lockWin(i){
  const a=(BRACKET[i]||'').trim(), b=(BRACKET[i^1]||'').trim();
  if(!a||!b)return;
  const ck=confKey(a,b);
  if(PICKS[ck]===a) delete PICKS[ck]; else PICKS[ck]=a;
  savePicks(); renderBracket();
}

// ===================== ÁRBOL VISUAL DEL BRACKET (banderas + trofeo) =====================
// ganador "proyectado" de un bloque contiguo de BRACKET [lo,hi): respeta ganadores fijados
// en la 1ª ronda y, si no, avanza el favorito por rating (mismo modelo del Monte Carlo).
const _bkvCache={};
function bkvBlockWinner(lo,hi){
  if(hi-lo===1) return BRACKET[lo]||'';
  const mid=(lo+hi)/2;
  const wa=bkvBlockWinner(lo,mid), wb=bkvBlockWinner(mid,hi);
  if(!wa||!wb) return wa||wb||'';
  const w=pickedWinner(wa,wb);                       // resultado real (ESPN) o tu predicción (✓)
  if(w) return norm(w)===norm(wa)?wa:wb;
  return advProb(wa,wb,_bkvCache)>=0.5 ? wa : wb;     // si no, avanza el favorito del modelo
}
// ¿el equipo "name" es el ganador elegido de su cruce contra "opp"?
function bkvSel(name,opp){ const w=pickedWinner(name,opp); return !!(w&&norm(w)===norm(name)); }
// botón ✓ de un equipo para que avance pasando a "opp" (su rival en esta fase)
function bkvTick(name,opp){
  if(!name||!opp) return '';
  const sel=bkvSel(name,opp);
  return `<button class="bkv-lock${sel?' on':''}" `+
    `data-team="${name.replace(/"/g,'&quot;')}" data-opp="${opp.replace(/"/g,'&quot;')}" `+
    `title="Marcar ganador de esta fase" onclick="bkvPick(event,this)">✓</button>`;
}
function bkvPick(e,btn){
  e.stopPropagation();
  const t=btn.dataset.team, o=btn.dataset.opp; if(!t||!o)return;
  const ck=confKey(t,o);
  if(PICKS[ck]===t) delete PICKS[ck]; else PICKS[ck]=t;
  savePicks(); renderBracket();
}
function bkvTeam(name){
  const safe=(name||'').replace(/"/g,'&quot;');
  return `<div class="bkv-team${name?'':' empty'}" title="${safe}">`+
    `<span class="bkv-fl">${name?flagImg(name,13):'·'}</span>`+
    `<span class="bkv-nm">${name||''}</span></div>`;
}
// casilla de equipo INICIAL (ronda 0): editable in situ + ✓ para fijar ganador de su cruce
let bkvEditing=null;
function bkvLeaf(i, opp){
  const name=BRACKET[i]||'';
  if(bkvEditing===i){
    return `<div class="bkv-leaf"><input class="bkv-input" data-i="${i}" list="teamlist" `+
      `value="${name.replace(/"/g,'&quot;')}" placeholder="Equipo" `+
      `onblur="bkvCommit(${i},this.value)" onkeydown="if(event.key==='Enter'){this.blur();}"></div>`;
  }
  return `<div class="bkv-leaf">`+
    `<div class="bkv-team bkv-editable${name?'':' empty'}${bkvSel(name,opp)?' bkv-locked':''}" title="Clic para editar" onclick="bkvEditTeam(${i})">`+
      `<span class="bkv-fl">${name?flagImg(name,13):'·'}</span>`+
      `<span class="bkv-nm">${name||'—'}</span></div>`+
    bkvTick(name,opp)+
  `</div>`;
}
// casilla de un GANADOR proyectado (rondas interiores): no editable + ✓ para elegir quién pasa
function bkvWinBox(name, opp){
  const safe=(name||'').replace(/"/g,'&quot;');
  return `<div class="bkv-leaf">`+
    `<div class="bkv-team${name?'':' empty'}${bkvSel(name,opp)?' bkv-locked':''}" title="${safe}">`+
      `<span class="bkv-fl">${name?flagImg(name,13):'·'}</span>`+
      `<span class="bkv-nm">${name||''}</span></div>`+
    bkvTick(name,opp)+
  `</div>`;
}
function bkvEditTeam(i){
  bkvEditing=i; renderBracketVisual();
  const inp=document.querySelector('.bkv-input[data-i="'+i+'"]');
  if(inp){ inp.focus(); inp.select(); }
}
function bkvCommit(i,v){
  bkvEditing=null;
  const t=findTeam(v.trim());            // normaliza al nombre oficial si lo reconoce
  BRACKET[i]= t? t.es : v.trim();
  saveBracket(); renderBracket();
}
function bkvNode(lo,hi,opp){
  if(hi-lo===1) return bkvLeaf(lo,opp);
  const mid=(lo+hi)/2;
  const wa=bkvBlockWinner(lo,mid), wb=bkvBlockWinner(mid,hi);
  return `<div class="bkv-match">`+
    `<div class="bkv-children">${bkvNode(lo,mid,wb)}${bkvNode(mid,hi,wa)}</div>`+
    `<div class="bkv-conn"></div>`+
    `<div class="bkv-win">${bkvWinBox(bkvBlockWinner(lo,hi),opp)}</div>`+
  `</div>`;
}
function renderBracketVisual(){
  const host=document.getElementById('bracketVisual'); if(!host)return;
  for(const k in _bkvCache) delete _bkvCache[k];   // recalcular favoritos al editar
  const n=BRACKET.length;
  if(!n || (n&(n-1))!==0){
    host.innerHTML='<div class="hist-empty" style="text-align:center;padding:18px">Carga un cuadro de 2, 4, 8, 16 o 32 equipos para ver el árbol visual.</div>';
    return;
  }
  const half=n/2, fL=bkvBlockWinner(0,half), fR=bkvBlockWinner(half,n), champ=bkvBlockWinner(0,n);
  host.innerHTML=
    `<div class="bkv-wrap">`+
      `<div class="bkv-half bkv-L">${bkvNode(0,half,fR)}</div>`+
      `<div class="bkv-center">`+
        `<div class="bkv-camp">CAMPEÓN</div>`+
        `<div class="bkv-champ">${bkvTeam(champ)}</div>`+
        `<div class="bkv-trophy">🏆</div>`+
      `</div>`+
      `<div class="bkv-half bkv-R bkv-mirror">${bkvNode(half,n,fL)}</div>`+
    `</div>`;
  fitBracket();
}
// escala el árbol para que quepa en el ancho disponible; en pantallas muy chicas (móvil)
// no lo reduce tanto que sea ilegible: a partir de cierto punto deja scroll horizontal solo ahí
function fitBracket(){
  const stage=document.getElementById('bracketVisual'); if(!stage) return;
  const wrap=stage.querySelector('.bkv-wrap'); if(!wrap){ stage.style.height=''; return; }
  wrap.style.transform='none'; stage.style.height=''; stage.style.overflowX='hidden';
  const avail=stage.clientWidth, natural=wrap.scrollWidth;
  if(avail>0 && natural>avail){
    const s=avail/natural;
    if(s>=0.6){                                   // cabe con una reducción legible: escalar, sin scroll
      wrap.style.transform='scale('+s+')';
      stage.style.height=Math.ceil(wrap.scrollHeight*s)+'px';
    } else {                                      // demasiado grande (móvil): tamaño legible + scroll
      stage.style.overflowX='auto';
    }
  }
}
window.addEventListener('resize',()=>{
  const vb=document.getElementById('viewBracket');
  if(vb && !vb.classList.contains('hidden')) fitBracket();
});
function clearBracket(){ BRACKET=new Array(BRACKET_SIZE).fill(''); PICKS={}; CONFIRMED={}; TEAM_FORM={}; _espnFetchedAt=0; saveBracket(); savePicks(); saveConfirmed(); saveForm(); renderBracket(); setBkMsg('Cuadro vaciado (predicciones, ganadores y forma de ESPN). Cárgalo desde ESPN, usa el cuadro del Mundial o escríbelo a mano.','mut'); }

// convierte el nombre de ESPN (inglés) al nombre en español de la base, si lo reconoce
function mapBracketName(espnName){ const t=findTeam(espnName); return t? t.es : (espnName||''); }

// trae de ESPN los GANADORES reales y la FORMA reciente (no cambia el orden de tu cuadro)
async function loadBracketESPN(){
  if(BRACKET.filter(Boolean).length<2){
    setBkMsg('Primero arma el cuadro (usa "🏆 Cuadro Mundial 2026" o escríbelo). Luego trae los datos reales.','err'); return;
  }
  setBkMsg('Buscando resultados y forma reciente en ESPN…','load');
  let r=null;
  try{ r=await fetchESPNTournamentData(true); }
  catch(e){ setBkMsg('No se pudo conectar con ESPN (posible bloqueo CORS/red). Marca los ganadores a mano con ✓ e intenta más tarde.','err'); return; }
  // los resultados reales (CONFIRMED) ya aparecen como ✓ azul en su fase del cuadro
  renderBracket();
  if(!r.winners && !r.teams){ setBkMsg('ESPN aún no devuelve partidos terminados del Mundial. Cuando se jueguen, vuelve a tocar este botón.','mut'); return; }
  setBkMsg(`Traje ${r.winners} resultado(s) de eliminatoria y la forma reciente de ${r.teams} selección(es) desde ESPN. Los ganadores ya jugados aparecen como ✓ azul en su fase del cuadro; la forma ajusta los goles esperados de cada cruce al simular.`,'ok');
}

// probabilidad de que A avance sobre B (rating → λ → prórroga/penales), con caché por enfrentamiento
function ratingOf(name){
  const t=findTeam(name); if(!t) return name? 62 : null;
  const f=APPLY_FORM? TEAM_FORM[t.es] : null;        // forma solo si el ingrediente está activo
  return clamp(t.s + (f? f.delta : 0), 40, 99);
}
function advProb(nameA,nameB,cache){
  // 1) si ese cruce ya se jugó en la realidad (ESPN o ✓), el resultado es seguro
  const ck=confKey(nameA,nameB);
  if(CONFIRMED[ck]!=null) return (norm(CONFIRMED[ck])===norm(nameA))?1:0;
  const key=nameA+'|'+nameB; if(cache[key]!=null) return cache[key];
  const sa=ratingOf(nameA), sb=ratingOf(nameB);
  let p;
  if(sa==null&&sb==null) p=0.5;
  else if(sa==null) p=0;
  else if(sb==null) p=1;
  else {
    // 2) mismo motor que el modo automático: rating → λ, con ajuste de aprendizaje si está activo
    let [la,lb]=autoLambdas(sa,sb);
    [la,lb]=applyLearning(la,lb);
    const r=autoRho(la+lb); const R=simulate(la,lb,r); p=knockoutAdvance(la,lb,r,R).advH;
  }
  cache[key]=p; return p;
}

// Monte Carlo del torneo completo
async function simTournament(){
  const teams=BRACKET.map(x=>(x||'').trim());
  const n=teams.length;
  if(n<2 || (n&(n-1))!==0){ setBkResMsg('El cuadro debe tener 2, 4, 8, 16 o 32 llaves (ahora hay '+n+' equipos). Carga desde ESPN o ajusta.','err'); return; }
  const iters=Math.max(1000,Math.min(200000, parseInt(document.getElementById('bkIters').value,10)||20000));
  // 1) cargar datos reales de ESPN (forma + ganadores), igual que el modo automático usa sus datos
  setBkResMsg('Cargando datos de ESPN (forma reciente y resultados)…','load');
  let espn=null;
  try{ espn=await fetchESPNTournamentData(); renderBracketVisual(); }
  catch(e){ /* sin conexión: seguimos con el rating base + aprendizaje */ }
  setBkResMsg('Simulando '+iters.toLocaleString('es-MX')+' torneos…','load');
  // el bucle bloquea el hilo; lo lanzamos con un pequeño retardo para que pinte el mensaje
  setTimeout(()=>{
    const rounds=Math.round(Math.log2(n));
    const stat={}; teams.forEach(t=>{ if(t&&!stat[t]) stat[t]={played:new Array(rounds+1).fill(0),champ:0}; });
    const cache={};
    for(let it=0; it<iters; it++){
      let cur=teams.slice(), r=1;
      while(cur.length>1){
        for(let k=0;k<cur.length;k++){ const t=cur[k]; if(t&&stat[t]) stat[t].played[r]++; }
        const next=[];
        for(let i=0;i<cur.length;i+=2){
          const A=cur[i],B=cur[i+1];
          let w;
          // advProb respeta los resultados reales (CONFIRMED) y las predicciones (PICKS) en TODA ronda
          if(A&&B) w=(Math.random()<advProb(A,B,cache))?A:B;
          else w=A||B||'';
          next.push(w);
        }
        cur=next; r++;
      }
      const champ=cur[0]; if(champ&&stat[champ]) stat[champ].champ++;
    }
    renderTournament(stat,iters,rounds);
    const filled=teams.filter(Boolean).length;
    const warn = filled<n? ' ⚠️ Hay llaves vacías; esos cruces se tratan como pase libre.' : '';
    const nConf=Object.keys(CONFIRMED).length;
    const nForm=Object.keys(TEAM_FORM).length;
    const learnNote = (LEARN.apply&&LEARN.ready)? ' · aprendizaje aplicado (goles ×'+LEARN.goalAdj.toFixed(3)+')' : '';
    const formNote = nForm? ' · forma ESPN de '+nForm+' selección(es)' : '';
    const confNote = nConf? ' · '+nConf+' resultado(s) real(es) respetados' : '';
    setBkResMsg('Listo: '+iters.toLocaleString('es-MX')+' torneos simulados (λ por rating'+formNote+learnNote+confNote+').'+warn,'ok');
  },30);
}

function renderTournament(stat,iters,rounds){
  const host=document.getElementById('bracketResults'); if(!host)return;
  const names=Object.keys(stat).filter(t=>t);
  if(!names.length){ host.innerHTML='<div class="hist-empty">Sin equipos en el cuadro.</div>'; return; }
  names.sort((a,b)=>(stat[b].champ-stat[a].champ) || (stat[b].played[rounds]-stat[a].played[rounds]));
  const showQF = rounds>=3;
  let h=`<table style="margin-top:12px"><thead><tr><th>Equipo</th><th class="r">Campeón</th><th class="r">Final</th><th class="r">Semis</th>${showQF?'<th class="r">Cuartos</th>':''}</tr></thead><tbody>`;
  names.forEach(t=>{ const s=stat[t];
    h+=`<tr><td>${t}</td>`+
       `<td class="r" style="color:var(--acc2);font-weight:700">${pc(s.champ/iters)}</td>`+
       `<td class="r">${pc(s.played[rounds]/iters)}</td>`+
       `<td class="r">${pc(s.played[rounds-1]/iters)}</td>`+
       (showQF?`<td class="r">${pc(s.played[rounds-2]/iters)}</td>`:'')+
       `</tr>`;
  });
  h+='</tbody></table>';
  host.innerHTML=h;
}

// ===================== NOTIFICACIONES DE GOL (Web Push · Supabase) =====================
// ⚠️ Configura estos dos valores tras montar Supabase (ver PUSH-SETUP.md):
const PUSH = {
  vapidPublic: 'BNH2-B6aPbFNR_OylfOHvS9VgnnaRAHWHayerI9YsgwsKgmbZCnFK6uZV8M4kDu_fy0hKVvwVeBZzmWLLfXlmJI',    // <-- pega aquí tu VAPID PUBLIC key
  subscribeUrl: 'https://awzzyvaytagxfcgvemfy.supabase.co/functions/v1/subscribe'    // <-- pega aquí la URL de tu Edge Function "subscribe"
};
function urlB64ToUint8Array(b64){
  const pad='='.repeat((4-b64.length%4)%4); const s=(b64+pad).replace(/-/g,'+').replace(/_/g,'/');
  const raw=atob(s); const arr=new Uint8Array(raw.length); for(let i=0;i<raw.length;i++)arr[i]=raw.charCodeAt(i); return arr;
}
function setNotifMsg(m,kind){ const el=document.getElementById('notifMsg'); if(el){ el.textContent=m; el.style.color=kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)'; } }
async function subscribeGoals(){
  if(!('serviceWorker' in navigator) || !('PushManager' in window)){ setNotifMsg('Este dispositivo/navegador no soporta notificaciones push.','err'); return; }
  if(!PUSH.vapidPublic || !PUSH.subscribeUrl){ setNotifMsg('Falta configurar Supabase (VAPID + URL) en engine.js. Mira PUSH-SETUP.md.','err'); return; }
  try{
    const perm=await Notification.requestPermission();
    if(perm!=='granted'){ setNotifMsg('Permiso denegado. Actívalo en Ajustes del sistema.','err'); return; }
    const reg=await navigator.serviceWorker.ready;
    let sub=await reg.pushManager.getSubscription();
    if(!sub){ sub=await reg.pushManager.subscribe({ userVisibleOnly:true, applicationServerKey:urlB64ToUint8Array(PUSH.vapidPublic) }); }
    const r=await fetch(PUSH.subscribeUrl,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(sub) });
    if(!r.ok) throw new Error('subscribe '+r.status);
    setNotifMsg('✅ Listo, te avisaré de los goles.','ok');
    const b=document.getElementById('notifBtn'); if(b) b.textContent='🔔 Notificaciones activadas';
  }catch(e){ console.error('push subscribe error', e); setNotifMsg('No se pudo activar: '+((e&&e.name)?e.name+' · ':'')+((e&&e.message)||e),'err'); }
}
// refleja estado si ya estaba suscrito
async function initNotifState(){
  try{ if(!('serviceWorker' in navigator)||!('PushManager' in window))return;
    const reg=await navigator.serviceWorker.ready; const sub=await reg.pushManager.getSubscription();
    if(sub && Notification.permission==='granted'){ const b=document.getElementById('notifBtn'); if(b)b.textContent='🔔 Notificaciones activadas'; }
  }catch(e){}
}

// ===================== ARMA TU CARTILLA (bet builder) =====================
let CART=[];   // cada item: {id, A, B, R, corTot, yelTot, sel:[keys]}
let CPICK_A='', CPICK_B='';
const CSAVEKEY='mundial_cartillas_v1';
let SAVED_CARTS=[];
function loadSavedCarts(){ try{SAVED_CARTS=JSON.parse(localStorage.getItem(CSAVEKEY))||[];}catch(e){SAVED_CARTS=[];} }
function persistSavedCarts(){ try{localStorage.setItem(CSAVEKEY,JSON.stringify(SAVED_CARTS));}catch(e){} }
function setCartMsg(m,kind){const el=document.getElementById('cartMsg'); if(el){ el.textContent=m; el.style.color=kind==='err'?'var(--red)':'var(--mut)'; }}
// probabilidad conjunta de varias condiciones de GOLES sobre la matriz de marcadores (respeta correlación)
function jointGoals(R,preds){ let p=0; for(const s of R.scores){ if(preds.every(f=>f(s.i,s.j))) p+=s.p; } return p; }
// probabilidad conjunta de varias condiciones sobre una Poisson (córners o tarjetas)
function jointPoisson(mean,preds){ let p=0, K=Math.max(25,Math.ceil(mean*3)); for(let k=0;k<=K;k++){ const pk=poissonPmf(k,mean); if(preds.every(f=>f(k))) p+=pk; } return p; }

// ---- selector visual (misma forma que el modo automático) ----
function renderCartPicker(){
  const colA=document.getElementById('ctColA'), colB=document.getElementById('ctColB'); if(!colA||!colB)return;
  const cell=(t,side)=>{
    const selThis= side==='A'? CPICK_A===t.es : CPICK_B===t.es;
    const takenOther= side==='A'? CPICK_B===t.es : CPICK_A===t.es;
    return `<div class="team-opt ${selThis?('sel-'+side.toLowerCase()):''} ${takenOther?'taken':''}" data-es="${t.es}" onclick="pickCartTeam('${side}',this.dataset.es)"><span class="fl">${flagImg(t.es,17)}</span><span class="nm">${t.es}</span></div>`;
  };
  var st=sortedTeams();
  colA.innerHTML=st.map(t=>cell(t,'A')).join('');
  colB.innerHTML=st.map(t=>cell(t,'B')).join('');
  const ia=document.getElementById('cartA'), ib=document.getElementById('cartB'); if(ia)ia.value=CPICK_A; if(ib)ib.value=CPICK_B;
  const pa=document.getElementById('ctPickA'), pb=document.getElementById('ctPickB');
  if(pa)pa.innerHTML=CPICK_A?flagImg(CPICK_A,18)+' '+CPICK_A:'—';
  if(pb)pb.innerHTML=CPICK_B?flagImg(CPICK_B,18)+' '+CPICK_B:'—';
  const f=document.getElementById('ctFilter'); if(f&&f.value)filterCartTeams(f.value);
}
function pickCartTeam(side,es){ if(side==='A'){ if(es===CPICK_B)return; CPICK_A=es; } else { if(es===CPICK_A)return; CPICK_B=es; } renderCartPicker(); }
function filterCartTeams(q){ const n=norm(q); document.querySelectorAll('#ctColA .team-opt, #ctColB .team-opt').forEach(el=>{ el.classList.toggle('hide', n.length>0 && !norm(el.dataset.es).includes(n)); }); }

// ---- partidos del día (desde la barra en vivo) ----
function renderCartDay(){
  const el=document.getElementById('ctDayMatches'); if(!el)return;
  const list=(_liveData||[]).filter(m=> m.state!=='post' && findTeam(m.A)&&findTeam(m.B));   // solo por jugar / en vivo
  if(!list.length){ el.innerHTML='<div class="sub" style="margin:0">No hay partidos próximos cargados por ahora (se llenan solos).</div>'; return; }
  el.innerHTML=list.map(m=>`<button class="ct-day" data-a="${m.A.replace(/"/g,'&quot;')}" data-b="${m.B.replace(/"/g,'&quot;')}" onclick="addCartByNames(this.dataset.a,this.dataset.b)">${m.state==='in'?'🔴 ':''}${flagImg(m.A,14)} ${m.A} <span style="color:var(--mut)">vs</span> ${m.B} ${flagImg(m.B,14)}</button>`).join('');
}

// ---- agregar / quitar partidos ----
function addCartTeams(ta,tb,sel){
  let [la,lb]=autoLambdas(ratingOf(ta.es),ratingOf(tb.es)); [la,lb]=applyLearning(la,lb);
  const r=autoRho(la+lb), R=simulate(la,lb,r);
  const possA=possShare(la,lb);
  const corTot=applyCornerLearn(teamCorners(teamShots(la,possA)))+applyCornerLearn(teamCorners(teamShots(lb,1-possA)));
  CART.push({id:'ct'+Date.now().toString(36)+Math.random().toString(36).slice(2,5), A:ta.es, B:tb.es, R, corTot, yelTot:4.2, sel:sel?sel.slice():[]});
}
function addCartMatch(){
  const a=document.getElementById('cartA'), b=document.getElementById('cartB');
  const ta=findTeam(a.value), tb=findTeam(b.value);
  if(!ta||!tb){ setCartMsg('Elige las dos selecciones (en los partidos del día o en las columnas).','err'); return; }
  if(norm(ta.es)===norm(tb.es)){ setCartMsg('Elige dos selecciones distintas.','err'); return; }
  addCartTeams(ta,tb); CPICK_A=''; CPICK_B=''; renderCartPicker(); setCartMsg('','mut'); renderCartilla();
}
function addCartByNames(a,b){ const ta=findTeam(a), tb=findTeam(b); if(!ta||!tb)return; addCartTeams(ta,tb); renderCartilla(); }
function removeCartMatch(id){ CART=CART.filter(m=>m.id!==id); renderCartilla(); }
function clearCart(){ CART=[]; renderCartilla(); }

// catálogo de mercados de un partido, con su probabilidad individual del modelo
function cartLegs(m){
  const A=m.A, B=m.B, R=m.R;
  const groups=[
    {t:'Resultado', legs:[
      {k:'1',grp:'res',dom:'g',lab:'Gana '+A,pred:(i,j)=>i>j},
      {k:'X',grp:'res',dom:'g',lab:'Empate',pred:(i,j)=>i===j},
      {k:'2',grp:'res',dom:'g',lab:'Gana '+B,pred:(i,j)=>i<j},
    ]},
    {t:'Doble oportunidad', legs:[
      {k:'1X',grp:'dc',dom:'g',lab:A+' o empate',pred:(i,j)=>i>=j},
      {k:'12',grp:'dc',dom:'g',lab:'Sin empate',pred:(i,j)=>i!==j},
      {k:'X2',grp:'dc',dom:'g',lab:B+' o empate',pred:(i,j)=>i<=j},
    ]},
    {t:'Goles', legs:[]},
    {t:'Ambos marcan', legs:[
      {k:'BTTS',grp:'btts',dom:'g',lab:'Sí',pred:(i,j)=>i>0&&j>0},
      {k:'BTTSN',grp:'btts',dom:'g',lab:'No',pred:(i,j)=>!(i>0&&j>0)},
    ]},
  ];
  const gLegs=[];
  for(let L=0.5;L<=6.5;L+=1){
    const n=(L*10).toFixed(0).padStart(2,'0');
    gLegs.push({k:'O'+n,grp:'gls',dom:'g',lab:'Over '+L,pred:(i,j)=>i+j>L});
    gLegs.push({k:'U'+n,grp:'gls',dom:'g',lab:'Under '+L,pred:(i,j)=>i+j<L});
  }
  groups.find(x=>x.t==='Goles').legs=gLegs;
  const cLegs=[];
  for(let L=4.5;L<=16.5;L+=1){
    cLegs.push({k:'CO'+L,grp:'c',dom:'c',lab:'Over '+L,pred:k=>k>L});
    cLegs.push({k:'CU'+L,grp:'c',dom:'c',lab:'Under '+L,pred:k=>k<L});
  }
  groups.push({t:'Córners', legs:cLegs});
  const yLegs=[];
  for(let L=0.5;L<=7.5;L+=1){
    yLegs.push({k:'YO'+L,grp:'y',dom:'y',lab:'Over '+L,pred:k=>k>L});
    yLegs.push({k:'YU'+L,grp:'y',dom:'y',lab:'Under '+L,pred:k=>k<L});
  }
  groups.push({t:'Tarjetas amarillas', legs:yLegs});
  groups.forEach(gr=>gr.legs.forEach(l=>{
    l.prob = l.dom==='g'? jointGoals(R,[l.pred]) : (l.dom==='c'? jointPoisson(m.corTot,[l.pred]) : jointPoisson(m.yelTot,[l.pred]));
  }));
  return groups;
}
function toggleCartLeg(mid,key){
  const m=CART.find(x=>x.id===mid); if(!m)return;
  const groups=cartLegs(m); const byKey={}; let leg=null;
  groups.forEach(gr=>gr.legs.forEach(l=>{ byKey[l.k]=l; if(l.k===key)leg=l; }));
  if(!leg)return;
  if(m.sel.includes(key)){ m.sel=m.sel.filter(k=>k!==key); renderCartilla(); return; }
  // quitar la otra opción del mismo grupo (ej. Over/Under de la misma línea)
  const grpKeys=groups.reduce((a,gr)=>a.concat(gr.legs),[]).filter(l=>l.grp===leg.grp).map(l=>l.k);
  m.sel=m.sel.filter(k=>!grpKeys.includes(k));
  // quitar selecciones del MISMO dominio que sean imposibles junto a la nueva (ej. Under 1.5 + Over 2.5)
  m.sel=m.sel.filter(k=>{
    const ol=byKey[k]; if(!ol||ol.dom!==leg.dom) return true;
    const j = leg.dom==='g'? jointGoals(m.R,[leg.pred,ol.pred]) : leg.dom==='c'? jointPoisson(m.corTot,[leg.pred,ol.pred]) : jointPoisson(m.yelTot,[leg.pred,ol.pred]);
    return j>1e-9;
  });
  m.sel.push(key);
  renderCartilla();
}
// probabilidad de que se cumplan TODAS las selecciones de un partido (goles con correlación; córners/tarjetas aparte)
function cartMatchProb(m){
  const groups=cartLegs(m), byKey={}; groups.forEach(gr=>gr.legs.forEach(l=>byKey[l.k]=l));
  const gp=[],cp=[],yp=[];
  m.sel.forEach(k=>{ const l=byKey[k]; if(!l)return; (l.dom==='g'?gp:l.dom==='c'?cp:yp).push(l.pred); });
  return (gp.length?jointGoals(m.R,gp):1) * (cp.length?jointPoisson(m.corTot,cp):1) * (yp.length?jointPoisson(m.yelTot,yp):1);
}

// ---- guardar / cargar cartillas ----
function saveCart(){
  const picked=CART.filter(m=>m.sel.length);
  if(!picked.length){ setCartMsg('Elige al menos un mercado antes de guardar.','err'); return; }
  const name=(prompt('Nombre para esta cartilla:','Cartilla '+(SAVED_CARTS.length+1))||'').trim();
  if(!name)return;
  let total=1; picked.forEach(m=>total*=cartMatchProb(m));
  SAVED_CARTS.unshift({id:'cs'+Date.now().toString(36), name, ts:Date.now(), prob:total,
    matches:picked.map(m=>({A:m.A,B:m.B,sel:m.sel.slice()}))});
  persistSavedCarts(); renderCartilla();
}
function loadSavedCart(id){
  const c=SAVED_CARTS.find(x=>x.id===id); if(!c)return;
  CART=[];
  c.matches.forEach(mm=>{ const ta=findTeam(mm.A), tb=findTeam(mm.B); if(ta&&tb) addCartTeams(ta,tb,mm.sel); });
  renderCartilla();
}
function deleteSavedCart(id){ SAVED_CARTS=SAVED_CARTS.filter(x=>x.id!==id); persistSavedCarts(); renderCartilla(); }

// ---- seguimiento: evaluar cada cartilla guardada contra los resultados reales (HIST/ESPN) ----
function findPlayed(A,B){
  const na=norm(A), nb=norm(B);
  return HIST.find(x=>x.actualA!=null && ((norm(x.A)===na&&norm(x.B)===nb)||(norm(x.A)===nb&&norm(x.B)===na)));
}
function legResult(key,hg,ag,cor,yel){
  const tot=hg+ag;
  if(key==='1')return hg>ag; if(key==='X')return hg===ag; if(key==='2')return hg<ag;
  if(key==='1X')return hg>=ag; if(key==='12')return hg!==ag; if(key==='X2')return hg<=ag;
  if(key==='BTTS')return hg>0&&ag>0; if(key==='BTTSN')return !(hg>0&&ag>0);
  if(key[0]==='O'||key[0]==='U'){ const L=parseInt(key.slice(1))/10; return key[0]==='O'? tot>L : tot<L; }
  if(key[0]==='C'){ if(cor==null)return null; const L=parseFloat(key.slice(2)); return key[1]==='O'? cor>L : cor<L; }
  if(key[0]==='Y'){ if(yel==null)return null; const L=parseFloat(key.slice(2)); return key[1]==='O'? yel>L : yel<L; }
  return null;
}
function legLabel(k,A,B){
  const m={'1':'Gana '+A,'X':'Empate','2':'Gana '+B,'1X':A+' o empate','12':'Sin empate','X2':B+' o empate','BTTS':'Ambos marcan: Sí','BTTSN':'Ambos marcan: No'};
  if(m[k])return m[k];
  if(k[0]==='O'||k[0]==='U'){ const L=(parseInt(k.slice(1))/10).toFixed(1); return (k[0]==='O'?'Over ':'Under ')+L+' goles'; }
  if(k[0]==='C') return 'Córners '+(k[1]==='O'?'Over':'Under')+' '+k.slice(2);
  if(k[0]==='Y') return 'Tarjetas '+(k[1]==='O'?'Over':'Under')+' '+k.slice(2);
  return k;
}
function evalSavedCart(c){
  let anyFalse=false, anyPending=false; const matchInfos=[];
  c.matches.forEach(mm=>{
    const played=findPlayed(mm.A,mm.B);
    let hg=null,ag=null,cor=null,yel=null;
    if(played){
      if(norm(played.A)===norm(mm.A)){ hg=played.actualA; ag=played.actualB; } else { hg=played.actualB; ag=played.actualA; }
      if(played.actualStats){ cor=played.actualStats.cornersTot; yel=played.actualStats.yellowTot; }
    }
    const legs=mm.sel.map(k=>{
      const res = played? legResult(k,hg,ag,cor,yel) : null;
      if(res===false)anyFalse=true; else if(res==null)anyPending=true;
      return {label:legLabel(k,mm.A,mm.B), res};
    });
    matchInfos.push({A:mm.A,B:mm.B, played:!!played, hg,ag, legs});
  });
  return {status: anyFalse?'fail':(anyPending?'pend':'ok'), matchInfos};
}
function savedCartsHTML(){
  if(!SAVED_CARTS.length) return '';
  return `<h3 class="sec" style="margin-top:16px">💾 Cartillas guardadas</h3>`+
    SAVED_CARTS.map(c=>{
      const ev=evalSavedCart(c);
      const badge= ev.status==='ok'?'<span style="color:var(--acc)">✅ Se cumplió</span>'
                 : ev.status==='fail'?'<span style="color:var(--red)">❌ No se cumplió</span>'
                 : '<span style="color:var(--acc2)">⏳ Pendiente</span>';
      const body=ev.matchInfos.map(mi=>{
        const sc= mi.played? `<span style="color:var(--mut)">${mi.hg}-${mi.ag}</span>` : '<span style="color:var(--gray)">sin jugar</span>';
        const legs=mi.legs.map(l=>{ const ic= l.res===true?'<span style="color:var(--acc)">✓</span>':l.res===false?'<span style="color:var(--red)">✗</span>':'<span style="color:var(--gray)">·</span>'; return `<div class="ct-leg" style="border:0;padding:1px 0">${ic} ${l.label}</div>`; }).join('');
        return `<div style="margin-top:7px"><div style="font-size:12px;display:flex;align-items:center;gap:5px">${flagImg(mi.A,13)} ${mi.A} <span style="color:var(--mut)">vs</span> ${mi.B} ${flagImg(mi.B,13)} ${sc}</div>${legs}</div>`;
      }).join('');
      return `<div class="ct-saved"><div class="ct-saved-h"><b>${c.name}</b> ${badge}<span class="p">${pc(c.prob)}</span></div>${body}`+
        `<div class="btns" style="margin:8px 0 0"><button class="ghost" onclick="loadSavedCart('${c.id}')">Cargar</button><button class="ghost" onclick="deleteSavedCart('${c.id}')">Eliminar</button></div></div>`;
    }).join('');
}

function renderCartilla(){
  const host=document.getElementById('cartMatches'); if(!host)return;
  if(!CART.length){ host.innerHTML='<div class="hist-empty" style="margin-top:10px">Agrega un partido para empezar a armar tu cartilla.</div>'; }
  else host.innerHTML=CART.map(m=>{
    const groups=cartLegs(m), sel=new Set(m.sel);
    const body=groups.map(gr=>{
      const isPaired = gr.legs.length>1 && (gr.legs[0].dom==='c' || gr.legs[0].dom==='y' || gr.t==='Goles');
      if(isPaired){
        let rows='';
        for(let i=0; i<gr.legs.length; i+=2){
          const o=gr.legs[i], u=gr.legs[i+1];
          if(!u) break;
          rows+=`<div class="ct-pair"><span class="ct-chip${sel.has(o.k)?' on':''}" onclick="toggleCartLeg('${m.id}','${o.k}')">${o.lab} <b>${pc(o.prob)}</b></span><span class="ct-chip${sel.has(u.k)?' on':''}" onclick="toggleCartLeg('${m.id}','${u.k}')">${u.lab} <b>${pc(u.prob)}</b></span></div>`;
        }
        return `<div class="ct-grp"><div class="ct-grp-t">${gr.t}</div><div class="ct-pairs">${rows}</div></div>`;
      }
      return `<div class="ct-grp"><div class="ct-grp-t">${gr.t}</div><div class="ct-chips">`+
        gr.legs.map(l=>`<span class="ct-chip${sel.has(l.k)?' on':''}" onclick="toggleCartLeg('${m.id}','${l.k}')">${l.lab} <b>${pc(l.prob)}</b></span>`).join('')+
        `</div></div>`;
    }).join('');
    return `<div class="ct-match"><div class="ct-match-h">${flagImg(m.A,16)} ${m.A} <span style="color:var(--mut)">vs</span> ${flagImg(m.B,16)} ${m.B}`+
      `<button class="del-x" title="Quitar partido" onclick="removeCartMatch('${m.id}')">✕</button></div>${body}</div>`;
  }).join('');
  renderCartSlip();
}
function renderCartSlip(){
  const el=document.getElementById('cartSlip'); if(!el)return;
  const picked=CART.filter(m=>m.sel.length);
  let html='';
  if(!picked.length){ html='<div class="hist-empty">Elige al menos un mercado en un partido para ver la probabilidad de tu cartilla.</div>'; }
  else {
    let total=1, nLegs=0, rows='';
    picked.forEach(m=>{
      const groups=cartLegs(m), byKey={}; groups.forEach(gr=>gr.legs.forEach(l=>byKey[l.k]=l));
      const mp=cartMatchProb(m); total*=mp; nLegs+=m.sel.length;
      const legs=m.sel.map(k=>byKey[k]?`<div class="ct-leg">${byKey[k].lab} <span>${pc(byKey[k].prob)}</span></div>`:'').join('');
      rows+=`<div class="ct-slip-m"><div class="ct-slip-h">${flagImg(m.A,14)} ${m.A} <span style="color:var(--mut)">vs</span> ${m.B} ${flagImg(m.B,14)} <span class="p">${pc(mp)}</span></div>${legs}</div>`;
    });
    const totS = total>=0.01? pc(total) : (total>0? (total*100).toFixed(2)+'%' : '0%');
    const oneIn = total>0? Math.round(1/total) : 0;
    html=rows+
      `<div class="ct-total"><div class="sub" style="margin:0">Probabilidad de que se cumpla TODA la cartilla<br>(${nLegs} selección/es en ${picked.length} partido/s)</div>`+
      `<div class="ct-total-p">${totS}</div>`+
      `<div class="sub" style="margin:0">Cuota justa equivalente: <b style="color:var(--acc2)">${total>0?(1/total).toFixed(2):'—'}</b>`+
      (oneIn?` · ~1 de cada <b style="color:var(--txt)">${oneIn.toLocaleString('es-MX')}</b> veces`:'')+`</div></div>`+
      `<div class="btns"><button class="go" onclick="saveCart()">💾 Guardar cartilla</button><button class="ghost" onclick="clearCart()">Vaciar</button></div>`+
      `<div class="note">El modelo asume que los <b>partidos son independientes</b> entre sí (multiplica). Dentro de un mismo partido, los goles se calculan con su <b>correlación real</b>; córners y tarjetas, independientes de los goles. Son probabilidades del modelo, no certezas.</div>`;
  }
  if(SAVED_CARTS.length){ html += savedCartsHTML(); }
  el.innerHTML=html;
}

// migrar historial antiguo (Mundial) al nuevo formato por liga
(function(){
  var old=localStorage.getItem('mundial_hist_v1')||localStorage.getItem('rp_hist_v1');
  if(old && !localStorage.getItem('rp_worldcup_hist_v1')){
    localStorage.setItem('rp_worldcup_hist_v1',old);
    localStorage.removeItem('mundial_hist_v1');
    localStorage.removeItem('rp_hist_v1');
  }
})();
loadHist(); seedHistory(); computeLearning(); renderHistory();
loadBracket(); loadConfirmed(); loadForm(); loadPicks(); loadSavedCarts();

// arranque limpio: no se simula ningún partido hasta que el usuario lo pida
APP_READY=true;

// ===== sincronización automática con ESPN: al abrir y "en vivo" cada pocos minutos =====
let _autoSyncRunning=false;
async function autoSyncResults(){
  if(_autoSyncRunning || document.hidden) return;
  _autoSyncRunning=true;
  try{
    try{ await fetchESPNTournamentData(); }catch(e){}   // forma reciente + ganadores (cacheado 10 min)
    await importPlayed();                                // resultados jugados → calibración del modelo
    const vb=document.getElementById('viewBracket');
    if(vb && !vb.classList.contains('hidden')) renderBracket();   // refresca el cuadro si está abierto
    const vc=document.getElementById('viewCartilla');
    if(vc && !vc.classList.contains('hidden')) renderCartilla();  // refresca el seguimiento de cartillas
  }catch(e){}
  _autoSyncRunning=false;
}
setTimeout(autoSyncResults, 800);                 // autocarga al abrir (en segundo plano)
setInterval(autoSyncResults, 180000);             // refresco de resultados terminados cada 3 min
initNotifState();                                 // refleja si ya activaste las notificaciones de gol

// ===== marcador EN VIVO de los partidos en juego (autorefresco cada 30 s) =====
async function fetchLive(){
  const DAY=86400000, now=Date.now();
  const days=[]; for(let i=-1;i<=3;i++) days.push(new Date(now+i*DAY).toISOString().slice(0,10).replace(/-/g,''));  // ayer + 3 días
  let chunks=[];
  try{ chunks=await Promise.all(days.map(d=>fetchESPNday(d))); }catch(e){ return; }
  const evs=[]; const seenEv={};
  chunks.forEach(arr=>arr.forEach(ev=>{ if(ev.id&&seenEv[ev.id])return; if(ev.id)seenEv[ev.id]=1; evs.push(ev); }));
  const matches=[]; const byId={};
  for(const ev of evs){
    const comp=ev.competitions&&ev.competitions[0]; if(!comp)continue;
    const stt=comp.status||{}, st=stt.type||{};
    const state=st.state||'';                           // pre | in | post
    const cs=comp.competitors||[];
    const home=cs.find(c=>c.homeAway==='home'), away=cs.find(c=>c.homeAway==='away');
    if(!home||!away)continue;
    if(ev.id) byId[ev.id]=ev;                            // guardamos el evento completo para el panel
    const A=mapBracketName((home.team&&(home.team.displayName||home.team.name))||'');
    const B=mapBracketName((away.team&&(away.team.displayName||away.team.name))||'');
    const label = (state==='pre') ? fmtKick(ev.date) : (st.shortDetail || stt.displayClock || (state==='post'?'FT':'En juego'));
    const ph=detectPhase(compNoteText(comp));
    matches.push({
      id:ev.id||null, A, B, state, label, date:ev.date||'', knockout:!!ph.knockout,
      hs:(home.score!=null?home.score:'-'), as:(away.score!=null?away.score:'-'),
      penA: home.shootoutScore!=null? home.shootoutScore : null,
      penB: away.shootoutScore!=null? away.shootoutScore : null
    });
  }
  const rank={in:0,pre:1,post:2};                       // en juego primero, luego por jugar, luego terminados
  matches.sort((x,y)=> (rank[x.state]-rank[y.state]) || (x.date||'').localeCompare(y.date||''));
  _liveEventsById=byId;
  renderLive(matches);
  renderLiveCompare();                                  // refresca el panel del partido abierto (si hay)
  renderCartDay();                                      // refresca los "partidos del día" de la cartilla
}
// etiqueta de inicio para próximos partidos: hora si es hoy, si no día + hora
function fmtKick(iso){
  const d=new Date(iso); if(isNaN(d))return 'Por jugar';
  const now=new Date();
  const hm=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  if(d.toDateString()===now.toDateString()) return hm;
  if(new Date(now.getTime()+86400000).toDateString()===d.toDateString()) return 'mañana '+hm;
  return d.toLocaleDateString([],{day:'2-digit',month:'2-digit'})+' '+hm;
}
let _liveData=[];
let _liveEventsById={};
let LIVE_OPEN_ID=null, LIVE_OPEN_A='', LIVE_OPEN_B='';
function renderLive(matches){
  const bar=document.getElementById('liveBar'); if(!bar)return;
  _liveData=matches;
  if(!matches.length){ bar.classList.add('hidden'); bar.innerHTML=''; return; }
  bar.classList.remove('hidden');
  const nLive=matches.filter(m=>m.state==='in').length;
  const head = nLive
    ? `<span class="live-dot"></span>En vivo · ${nLive} en juego`
    : `📅 Partidos · ${matches.length}`;
  bar.classList.toggle('haslive', nLive>0);
  const now=new Date(); const todayStr=now.toISOString().slice(0,10);
  const badge=s=> s==='in'?'🔴':(s==='post'?'✓':'🕒');
  const goals=(g,p)=> g+(p!=null?` <small style="color:var(--acc2)">(${p})</small>`:'');
  var todayMatches=matches.filter(m=>m.date&&m.date.slice(0,10)===todayStr);
  var otherMatches=matches.filter(m=>!m.date||m.date.slice(0,10)!==todayStr);
  var html='<div class="live-h">'+head+' <span style="color:var(--gray);font-weight:400;text-transform:none;letter-spacing:0">· toca un partido para ver la predicción</span></div>';
  if(todayMatches.length){
    html+='<div class="today-label">HOY</div>'+
      '<div class="live-cards">'+ todayMatches.map((m,idx)=>{
        var mi=matches.indexOf(m);
        return `<div class="live-card ${m.state} today" onclick="openLiveMatch(${mi})" title="Ver la predicción del modelo">`+
          `<div class="live-min">${badge(m.state)} ${m.label}${(m.penA!=null||m.penB!=null)?' · penales':''}</div>`+
          `<div class="live-row"><span class="live-tm"><span class="fl">${flagImg(m.A,15)}</span>${m.A}</span><b>${goals(m.hs,m.penA)}</b></div>`+
          `<div class="live-row"><span class="live-tm"><span class="fl">${flagImg(m.B,15)}</span>${m.B}</span><b>${goals(m.as,m.penB)}</b></div>`+
        `</div>`;
      }).join('')+'</div>';
  }
  if(otherMatches.length){
    html+='<div class="other-label">OTROS DÍAS</div>'+
      '<div class="live-cards">'+ otherMatches.map((m,idx)=>{
        var mi=matches.indexOf(m);
        return `<div class="live-card ${m.state}" onclick="openLiveMatch(${mi})" title="Ver la predicción del modelo">`+
          `<div class="live-min">${badge(m.state)} ${m.label}${(m.penA!=null||m.penB!=null)?' · penales':''}</div>`+
          `<div class="live-row"><span class="live-tm"><span class="fl">${flagImg(m.A,15)}</span>${m.A}</span><b>${goals(m.hs,m.penA)}</b></div>`+
          `<div class="live-row"><span class="live-tm"><span class="fl">${flagImg(m.B,15)}</span>${m.B}</span><b>${goals(m.as,m.penB)}</b></div>`+
        `</div>`;
      }).join('')+'</div>';
  }
  bar.innerHTML=html;
}
// abre el partido en la pestaña "Partido" con la predicción del modelo (para comparar con lo real)
async function openLiveMatch(idx){
  const m=_liveData[idx]; if(!m)return;
  setMode('auto'); showView('match');
  PICK_A=m.A; PICK_B=m.B;
  const sA=document.getElementById('selA'), sB=document.getElementById('selB');
  if(sA)sA.value=m.A; if(sB)sB.value=m.B;
  if(typeof renderTeamPicker==='function') renderTeamPicker();
  const koT=document.getElementById('koToggle'); if(koT) koT.checked=!!m.knockout;   // eliminatoria → mostrar quién avanza
  const pen=(m.penA!=null||m.penB!=null)? ` (pen ${m.penA}-${m.penB})` : '';
  const tag = m.state==='in'?'🔴 EN VIVO ' : m.state==='post'?'✓ FINAL ' : '🕒 ';
  ctx.value = (m.state==='pre')
    ? `${tag}${m.label} · ${m.A} vs ${m.B}`
    : `${tag}${m.label} · ${m.A} ${m.hs}-${m.as} ${m.B}${pen}`;
  const liveEv = m.id!=null ? _liveEventsById[m.id] : null;
  autoCalc();                                  // corre la predicción (esto limpia LIVE_OPEN_ID)
  LIVE_OPEN_ID=m.id; LIVE_OPEN_A=m.A; LIVE_OPEN_B=m.B;   // fijamos el partido seguido
  renderLiveCompare();
  try{ document.getElementById('results').scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){}
}
// color del equipo (hex de ESPN); aclara los muy oscuros para que se vean en fondo oscuro
function teamColor(hex){
  if(!hex) return null;
  hex=(''+hex).replace('#',''); if(hex.length!==6) return null;
  let r=parseInt(hex.slice(0,2),16), g=parseInt(hex.slice(2,4),16), b=parseInt(hex.slice(4,6),16);
  if([r,g,b].some(isNaN)) return null;
  const lum=0.2126*r+0.7152*g+0.0722*b;
  if(lum<70){ const f=0.5; r=Math.round(r+(255-r)*f); g=Math.round(g+(255-g)*f); b=Math.round(b+(255-b)*f); }
  return `rgb(${r},${g},${b})`;
}
// barra de una estadística: real (color de cada selección) y, debajo, la del modelo
function statBar(label, a, b, ma, mb, unit, colA, colB){
  colA=colA||'var(--blue)'; colB=colB||'var(--red)';
  unit=unit||'';
  const fmt=v=> v==null?'–':(unit==='%'? Math.round(v)+'%' : (Number.isInteger(v)? v : (+v).toFixed(1)));
  const tot=(+a||0)+(+b||0), aw= tot>0? (+a/tot*100):50;
  const mtot=(+ma||0)+(+mb||0), maw=(ma!=null&&mb!=null&&mtot>0)? (+ma/mtot*100):null;
  let h=`<div class="sb">`+
    `<div class="sb-top"><span class="sb-a" style="color:${colA}">${fmt(a)}</span><span class="sb-lab">${label}</span><span class="sb-b" style="color:${colB}">${fmt(b)}</span></div>`+
    `<div class="sb-bar"><span class="sb-seg-a" style="width:${aw}%;background:${colA}"></span><span class="sb-seg-b" style="width:${100-aw}%;background:${colB}"></span></div>`;
  if(maw!=null){
    h+=`<div class="sb-mrow"><span class="sb-ma">${fmt(ma)}</span><span class="sb-mlab">modelo</span><span class="sb-mb">${fmt(mb)}</span></div>`+
       `<div class="sb-bar sb-bar-m"><span class="sb-seg-am" style="width:${maw}%"></span><span class="sb-seg-bm" style="width:${100-maw}%"></span></div>`;
  }
  return h+`</div>`;
}
// veredicto resumido de cuán cerca estuvo el modelo
function genVeredicto(pred,hs,as,A,B,state){
  if(!pred) return '';
  const predA = Math.round(pred.predA||0), predB = Math.round(pred.predB||0);
  const exact = predA===hs && predB===as;
  const diff = Math.abs(predA-hs)+Math.abs(predB-as);
  const res = hs>as?'Gana '+A : (as>hs?'Gana '+B : 'Empate');
  const est = exact?'✅ Exacto':(diff<=1?'🎯 Cercano (dif '+diff+')':(diff<=3?'🔶 Aceptable (dif '+diff+')':'🔴 Lejano (dif '+diff+')'));
  return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:4px 0;border-top:1px solid var(--line);margin-top:4px">
    <span><b>Pronóstico:</b> ${pred.predA!=null?+pred.predA.toFixed(1):'?'} — ${pred.predB!=null?+pred.predB.toFixed(1):'?'}</span>
    <span><b>Real:</b> ${hs} — ${as} (${res})</span>
    <span>${est}</span>
  </div>`;
}
// panel "En vivo vs predicción": stats reales (goleadores, córners, tarjetas) comparadas con el modelo
async function renderLiveCompare(){
  const box=document.getElementById('liveCompare'); if(!box) return;
  let ev = LIVE_OPEN_ID!=null ? _liveEventsById[LIVE_OPEN_ID] : null;
  if(!ev){ box.classList.add('hidden'); box.innerHTML=''; return; }
  let comp=ev.competitions&&ev.competitions[0]; if(!comp){ box.classList.add('hidden'); return; }
  // si el scoreboard no trajo estadísticas detalladas, intenta el endpoint del evento completo
  const hasStats = (comp.competitors||[]).some(c => c.statistics && c.statistics.length > 0) ||
    (comp.statistics && comp.statistics.length > 0);
  if (!hasStats && LIVE_OPEN_ID != null) {
    try {
      const base = LEAGUES[CURRENT_LEAGUE] ? (espnBase().replace('/scoreboard','')) : null;
      if (base) {
        const r = await fetch(base + '/events/' + LIVE_OPEN_ID);
        if (r.ok) {
          const full = await r.json();
          ev = full; comp = full.competitions && full.competitions[0];
          if (comp) _liveEventsById[LIVE_OPEN_ID] = full;
        }
      }
    } catch(e) {}
  }
  const p=espnParse(ev); if(!p){ box.classList.add('hidden'); return; }
  const st=comp.status||{}, sttype=st.type||{}, state=sttype.state||'';
  const isKO=detectPhase(compNoteText(comp)).knockout;
  const A=LIVE_OPEN_A||p.strHomeTeam, B=LIVE_OPEN_B||p.strAwayTeam;
  const min = sttype.shortDetail || st.displayClock || (state==='post'?'FT':'');
  const tag = state==='in'?'🔴 EN VIVO':(state==='post'?'✓ FINAL':'🕒 POR JUGAR');
  const pred = lastPrediction||{};
  const s = p.stats||{};
  const hs=parseInt(p.intHomeScore,10)||0, as=parseInt(p.intAwayScore,10)||0;   // ESPN los manda como texto
  const pen=(p.homeShootout!=null||p.awayShootout!=null)? `<span class="pen"> (pen ${p.homeShootout}-${p.awayShootout})</span>`:'';

  // marcador
  let html=`<div class="lc-wrap ${state==='post'?'post':''}">`+
    `<div class="lc-top"><span class="lc-min">${tag} · ${min}</span>`+
    `<span class="sub" style="margin:0">vs predicción del modelo</span></div>`;
  if(state==='pre'){
    html+=`<div class="lc-score">${flagImg(A,22)} ${A} <b>vs</b> ${B} ${flagImg(B,22)}</div>`+
      `<div class="sub" style="margin:6px 0 0">El partido aún no comienza. Abajo tienes la predicción del modelo; cuando arranque, aquí verás goleadores, córners y tarjetas reales.</div></div>`;
    box.innerHTML=html; box.classList.remove('hidden'); return;
  }
  html+=`<div class="lc-score">${flagImg(A,22)} ${A} <b>${hs}</b> - <b>${as}</b> ${B} ${flagImg(B,22)}${pen}</div>`;

  // goleadores del partido (separados de la tanda de penales)
  const allSc=(s.scorers||[]);
  const goalSc=allSc.filter(g=>!g.shootout);          // goles del partido (incluye penales en juego)
  const shootSc=allSc.filter(g=>g.shootout);          // penales de la tanda (no cuentan como gol)
  html+='<div class="lc-goals">'+ (goalSc.length
    ? goalSc.map(g=>`<div class="lc-goal">⚽ <b>${g.min||''}</b> ${g.name||'—'} <span style="color:var(--mut)">(${g.home?A:B})</span>${g.pen?' <span style="color:var(--acc2)">de penal</span>':''}${g.ownGoal?' <span style="color:var(--red)">e.c.</span>':''}</div>`).join('')
    : (hs>0||as>0)?'<div class="sub" style="margin:0">Goles registrados sin detalle de goleador.</div>':'<div class="sub" style="margin:0">Sin goles.</div>')+'</div>';
  if(shootSc.length || p.homeShootout!=null || p.awayShootout!=null){
    const aPk=shootSc.filter(g=>g.home).map(g=>g.name||'—');
    const bPk=shootSc.filter(g=>!g.home).map(g=>g.name||'—');
    html+='<div class="lc-pens"><div class="lc-pen-h">🥅 Tanda de penales · <b>'+(p.homeShootout!=null?p.homeShootout:'?')+'-'+(p.awayShootout!=null?p.awayShootout:'?')+'</b></div>'+
      `<div class="lc-pen-row"><span class="lc-pen-tm">${flagImg(A,14)} ${A}:</span> ${aPk.length?aPk.join(', '):'—'}</div>`+
      `<div class="lc-pen-row"><span class="lc-pen-tm">${flagImg(B,14)} ${B}:</span> ${bPk.length?bPk.join(', '):'—'}</div>`+
    '</div>';
  }

  // siempre mostramos las barras (real con — si falta, modelo siempre)
  // comparativas real vs modelo — barras por equipo (local azul / visitante rojo)
  const shA=pred.predShotsA, shB=pred.predShotsB, shTot=(shA||0)+(shB||0);
  const mPossA=pred.predPossA;
  const shareA = (mPossA!=null)? (0.5-0.4*(mPossA-0.5)) : 0.5;      // el de menos posesión hace más faltas/amarillas
  const mCornA = (pred.predCornersTot!=null&&shTot>0)? pred.predCornersTot*(shA/shTot) : null;
  const mCornB = (pred.predCornersTot!=null&&shTot>0)? pred.predCornersTot*(shB/shTot) : null;
  const myA = (pred.predYellowTot!=null)? pred.predYellowTot*shareA : null;
  const myB = (pred.predYellowTot!=null)? pred.predYellowTot*(1-shareA) : null;
  const colA=teamColor(p.homeColor)||'var(--blue)', colB=teamColor(p.awayColor)||'var(--red)';
  const bars=[];
  if(s.homePoss!=null||s.awayPoss!=null) bars.push(statBar('% Posesión', s.homePoss, s.awayPoss, mPossA!=null?mPossA*100:null, mPossA!=null?(1-mPossA)*100:null, '%', colA, colB));
  bars.push(statBar('Remates', s.homeShots, s.awayShots, shA, shB, '', colA, colB));
  bars.push(statBar('Tiros al arco', s.homeSOT, s.awaySOT, shA!=null?shA*0.34:null, shB!=null?shB*0.34:null, '', colA, colB));
  bars.push(statBar('Córners', s.homeCorners, s.awayCorners, mCornA, mCornB, '', colA, colB));
  if(s.homeFouls!=null||s.awayFouls!=null) bars.push(statBar('Faltas', s.homeFouls, s.awayFouls, null, null, '', colA, colB));
  bars.push(statBar('Amarillas', s.yellowA||0, s.yellowB||0, myA, myB, '', colA, colB));
  if((s.redA||0)+(s.redB||0)>0) bars.push(statBar('Rojas', s.redA||0, s.redB||0, null, null, '', colA, colB));
  html+='<div class="lc-bars">'+bars.join('')+'</div>';

  // predicción de quién avanza (solo en eliminatorias)
  if(isKO && pred.lamH){
    const Rk=simulate(pred.lamH,pred.lamA,pred.rho), KO=knockoutAdvance(pred.lamH,pred.lamA,pred.rho,Rk);
    const favAdv=KO.advH>=KO.advA?A:B;
    let kv=`🏆 <b>Quién avanza (modelo)</b>: ${A} ${pc(KO.advH)} · ${B} ${pc(KO.advA)} — favorito <b>${favAdv}</b>.`;
    if(state==='post'){
      let realAdv = p.homeWinner? A : (p.awayWinner? B : null);
      if(!realAdv && p.homeShootout!=null && p.awayShootout!=null) realAdv=(+p.homeShootout>+p.awayShootout)?A:B;
      if(realAdv) kv+=` Avanzó <b>${realAdv}</b> · ${norm(realAdv)===norm(favAdv)?'✅ acertó':'❌ sorpresa'}.`;
    }
    html+=`<div class="lc-verdict">${kv}</div>`;
  }

  // veredicto: ¿va como dijo la página?
  if(pred.pH!=null){
    const favO = pred.pH>=pred.pD&&pred.pH>=pred.pA?'H':(pred.pA>=pred.pD?'A':'D');
    const curO = hs>as?'H':(hs===as?'D':'A');
    const nm=o=> o==='H'?('gana '+A):o==='A'?('gana '+B):'empate';
    let v;
    if(state==='post'){
      v = (curO===favO) ? `✅ El resultado final coincide con lo que más probable veía el modelo (${nm(favO)}).`
                        : `❌ Sorpresa respecto al modelo: esperaba <b>${nm(favO)}</b> y terminó en <b>${nm(curO)}</b>.`;
    } else {
      v = (curO===favO) ? `✅ Por ahora va en línea con la predicción (${nm(favO)}, ${pc(Math.max(pred.pH,pred.pD,pred.pA))} previo).`
                        : `⚠️ Va distinto a lo previsto: el modelo veía <b>${nm(favO)}</b> y ahora mismo es <b>${nm(curO)}</b>.`;
    }
    const tot=hs+as;
    if(pred.o25!=null){ v+= ` · Goles: <b>${tot}</b> (el modelo daba ${pc(pred.o25)} a Over 2.5).`; }
    html+=`<div class="lc-verdict">${v}</div>`;
  } else if(pred.predA!=null){
    html+=`<div class="lc-verdict">${genVeredicto(pred,hs,as,A,B,state)}</div>`;
  }
  html+='</div>';
  box.innerHTML=html; box.classList.remove('hidden');
}
setTimeout(fetchLive, 1200);                      // marcadores en vivo al abrir
setInterval(()=>{ if(!document.hidden) fetchLive(); }, 15000);   // refresco en vivo cada 15 s
document.addEventListener('visibilitychange',()=>{ if(!document.hidden){ fetchLive(); autoSyncResults(); } });

