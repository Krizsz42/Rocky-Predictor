// ===================== HISTORIAL Y APRENDIZAJE =====================
let lastPrediction=null;
let SHARE=null;
let APP_READY=false;   // evita auto-scroll en la carga inicial
let HIST=[];
let histShowAll=false;
let APPLY_FORM=true;
function toggleHistAll(){ histShowAll=!histShowAll; renderHistory(); }
const LEARN={apply:false, goalAdj:1, ready:false, n:0, accRes:0, accScore:0, accOU:0, accBtts:0, avgErr:0, bias:0};

function histKey(suffix){ return 'rp_'+CURRENT_LEAGUE+'_'+suffix+'_v1'; }
function loadHist(){
  try{HIST=JSON.parse(localStorage.getItem(histKey('hist')))||[];}catch(e){HIST=[];}
  const lk=localStorage.getItem(histKey('learnApply'));
  LEARN.apply = (lk===null) ? true : (lk==='1');
  const fk=localStorage.getItem(histKey('formApply'));
  APPLY_FORM = (fk===null) ? true : (fk==='1');
  dedupHist();
}
function persistHist(){localStorage.setItem(histKey('hist'),JSON.stringify(HIST));}
// elimina duplicados de HIST (por espnId como preferencia, luego por equipo+marcador+ctx)
function dedupHist(){
  var seen={}, keep=[];
  HIST.forEach(x=>{
    var key = x.espnId ? 'id:'+x.espnId : 'tm:'+norm(x.A)+'|'+norm(x.B)+'|'+x.actualA+'-'+x.actualB+'|'+(x.ctx||'');
    if(!seen[key]){ seen[key]=1; keep.push(x); }
  });
  if(keep.length!==HIST.length){ HIST=keep; persistHist(); }
}

// construye una predicción corriendo el modelo real (mismas probabilidades que el simulador)
function buildPred(A,B,ctx,lamH,lamA,rho,realA,realB){
  const R=simulate(lamH,lamA,rho); const best=R.scores[0];
  const favO2 = R.h>=R.d&&R.h>=R.a?'H':(R.a>=R.d?'A':'D');
  const bestO2 = best.i>best.j?'H':(best.i===best.j?'D':'A');
  let cons2=null;
  if(favO2!==bestO2){ for(const s of R.scores){ const o=s.i>s.j?'H':(s.i===s.j?'D':'A'); if(o===favO2){cons2=s;break;} } }
  const possA=possShare(lamH,lamA);
  const shA=teamShots(lamH,possA), shB=teamShots(lamA,1-possA);
  const coTot=teamCorners(shA)+teamCorners(shB);
  const sotA=shA*0.38, sotB=shB*0.38;
  const redPred=0.18;
  return {
    A,B,ctx,lamH,lamA,rho,
    pH:R.h,pD:R.d,pA:R.a,
    predResult: R.h>=R.d&&R.h>=R.a ? 'H' : (R.a>=R.d ? 'A':'D'),
    si:best.i,sj:best.j,sp:best.p,
    si2:cons2?cons2.i:null, sj2:cons2?cons2.j:null, sp2:cons2?cons2.p:null,
    xgH:R.xgH,xgA:R.xgA,o25:R.o25,btts:R.btts,
    predPossA:possA, predShotsA:shA, predShotsB:shB, predCornersTot:coTot, predYellowTot:4.2, predRedTot:redPred,
    sotA:sotA, sotB:sotB,
    actualA:realA,actualB:realB
  };
}

// precarga (una sola vez) los partidos del 21 jun 2026 con su resultado real
function seedHistory(){
  if(CURRENT_LEAGUE!=='worldcup') return;
  var sk=histKey('seed');
  if(localStorage.getItem(sk)==='1') return;
  if(HIST.length){localStorage.setItem(sk,'1'); return;}
  const seeds=[
    // [A, B, contexto, λA, λB, ρ, golesRealesA, golesRealesB]
    ['España','Arabia Saudita','Grupo H · Atlanta · 21 jun 2026', 2.45, 0.48, -0.055, 4, 0],
    ['Uruguay','Cabo Verde','Grupo G · Los Ángeles · 21 jun 2026', 2.11, 0.80, -0.06, 2, 2],
    ['Bélgica','Irán','21 jun 2026', 1.85, 0.72, -0.06, 0, 0],   // predicción del propio simulador
  ];
  seeds.forEach((s,i)=>{const p=buildPred(...s); p.id='seed-'+i; p.ts=Date.now()+i; HIST.push(p);});
  persistHist();
  localStorage.setItem(histKey('seed'),'1');
}

function savePrediction(){
  if(!lastPrediction){saveMsg.textContent='Simula un partido primero.';return;}
  const p=Object.assign({}, lastPrediction, {id:Date.now()+'-'+Math.random().toString(36).slice(2,7), ts:Date.now(), actualA:null, actualB:null});
  HIST.unshift(p);
  persistHist(); computeLearning(); renderHistory();
  var vbR=document.getElementById('viewBracket');
  if(vbR&&!vbR.classList.contains('hidden')&&CURRENT_LEAGUE!=='worldcup'&&CURRENT_LEAGUE!=='champions') renderBracket();
  saveMsg.textContent='✓ Predicción guardada en el historial. Carga el resultado real cuando se juegue.';
}

function setResult(id){
  const it=HIST.find(x=>x.id===id); if(!it)return;
  const a=parseInt(document.getElementById('ra_'+id).value,10);
  const b=parseInt(document.getElementById('rb_'+id).value,10);
  if(isNaN(a)||isNaN(b)||a<0||b<0){alert('Carga un marcador real válido (ej: 2 y 0).');return;}
  it.actualA=a; it.actualB=b;
  persistHist(); computeLearning(); renderHistory();
}
function delItem(id){HIST=HIST.filter(x=>x.id!==id); persistHist(); computeLearning(); renderHistory();}
function clearHistory(){
  if(!HIST.length){return;}
  var ln=LEAGUES[CURRENT_LEAGUE]?LEAGUES[CURRENT_LEAGUE].name:CURRENT_LEAGUE;
  if(!confirm('¿Vaciar el historial de '+ln+'?'))return;
  HIST=[]; persistHist(); computeLearning(); renderHistory();
}
function toggleLearn(cb){
  LEARN.apply=cb.checked; try{localStorage.setItem(LKEY, cb.checked?'1':'0');}catch(e){}
  renderHistory();
  if(modeAuto && !modeAuto.classList.contains('hidden')) autoCalc();
  const vb=document.getElementById('viewBracket'); if(vb && !vb.classList.contains('hidden')) renderBracket();
}
// ingrediente: forma reciente ajustada por rival (afecta modo automático, en vivo y bracket)
function toggleForm(cb){
  APPLY_FORM=cb.checked; try{localStorage.setItem(FKEY, cb.checked?'1':'0');}catch(e){}
  renderHistory();
  if(modeAuto && !modeAuto.classList.contains('hidden')) autoCalc();
  const vb=document.getElementById('viewBracket'); if(vb && !vb.classList.contains('hidden')) renderBracket();
}

// ===== búsqueda automática de resultados (TheSportsDB, clave gratuita 123) =====
const SDB='https://www.thesportsdb.com/api/v1/json/123/eventsday.php';
const SDB_SEASON='https://www.thesportsdb.com/api/v1/json/123/eventsseason.php';
const WC_LEAGUE='4429';   // FIFA World Cup
let WC_CACHE={};          // calendario por año, para no rebajarlo cada vez
async function fetchWCSeason(year){
  if(WC_CACHE[year]) return WC_CACHE[year];
  try{
    const r=await fetch(`${SDB_SEASON}?id=${WC_LEAGUE}&s=${year}`);
    if(!r.ok) return [];
    const d=await r.json(); const ev=(d&&d.events)||[];
    WC_CACHE[year]=ev; return ev;
  }catch(e){ return []; }
}
function setStatus(id,msg,kind){const el=document.getElementById('st_'+id); if(el){ if(kind==='load'){el.innerHTML='<span class="spin"></span>'+msg;}else{el.textContent=msg;} el.style.color = kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)';}}
// ===== fuente 2: ESPN (API oculta, sin clave, CORS abierto) =====
function espnBase(){ return 'https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[CURRENT_LEAGUE].espn+'/scoreboard'; }

async function fetchESPNday(ymdCompact){
  try{
    var url=espnBase();
    if(ymdCompact) url+='?dates='+ymdCompact;
    const r=await fetch(url);
    if(!r.ok) return [];
    const d=await r.json(); return (d&&d.events)||[];
  }catch(e){ return []; }
}
// normaliza un evento de ESPN al mismo formato que TheSportsDB (+ estadísticas)
// busca un stat en el competitor (home o away), prueba varios nombres
function statOn(c,names){
  if(!c||!c.statistics) return null;
  for(const n of names){
    const a=c.statistics.find(s=>s.name===n);
    if(a!=null&&a.displayValue!=null) return parseFloat(a.displayValue);
  }
  return null;
}
// busca un stat en el nivel competición (groups home/away)
function statOnComp(comp,names){
  const cats=comp.statistics||[];
  for(const n of names){
    const cat=cats.find(s=>s.name===n);
    if(cat&&cat.groups){
      const hg=cat.groups.find(g=>g.group&&(g.group.name==='home'||g.group.id==='0'));
      const ag=cat.groups.find(g=>g.group&&(g.group.name==='away'||g.group.id==='1'));
      const hv=hg&&hg.statistics&&hg.statistics[0]!=null? parseFloat(hg.statistics[0].displayValue||hg.statistics[0]) : null;
      const av=ag&&ag.statistics&&ag.statistics[0]!=null? parseFloat(ag.statistics[0].displayValue||ag.statistics[0]) : null;
      if(hv!=null||av!=null) return {home:hv, away:av};
    }
  }
  return null;
}
function espnParse(ev){
  const comp=ev&&ev.competitions&&ev.competitions[0]; if(!comp) return null;
  const cs=comp.competitors||[];
  const home=cs.find(c=>c.homeAway==='home'), away=cs.find(c=>c.homeAway==='away');
  if(!home||!away) return null;
  const st=comp.status&&comp.status.type;
  const homeId=home.team&&home.team.id;
  let yellow=0, red=0, yA=0, yB=0, rA=0, rB=0; const scorers=[];
  (comp.details||[]).forEach(d=>{
    const isHome=(d.team&&d.team.id)===homeId;
    if(d.yellowCard){ yellow++; if(isHome)yA++; else yB++; }
    if(d.redCard){ red++; if(isHome)rA++; else rB++; }
    if(d.scoringPlay){
      const ath=d.athletesInvolved&&d.athletesInvolved[0];
      scorers.push({name: ath? ath.displayName:'', min:(d.clock&&d.clock.displayValue)||'', ownGoal:!!d.ownGoal, home:(d.team&&d.team.id)===homeId, pen:!!d.penaltyKick, shootout:!!d.shootout});
    }
  });
  // intenta ambos niveles: competitor-level y comp-level
  function bestStat(altNames){
    var r=statOnComp(comp,altNames);
    if(r) return r;
    return {home:statOn(home,altNames), away:statOn(away,altNames)};
  }
  const p=bestStat(['possessionPct','ballPossession','possession']);
  const sh=bestStat(['totalShots','shotsTotal','shots']);
  const sot=bestStat(['shotsOnTarget','shotsOnGoal','sog']);
  const co=bestStat(['wonCorners','corners','cornerKicks']);
  const fo=bestStat(['foulsCommitted','fouls','totalFouls']);
  return {
    strHomeTeam:(home.team&&(home.team.displayName||home.team.name))||'',
    strAwayTeam:(away.team&&(away.team.displayName||away.team.name))||'',
    intHomeScore: home.score, intAwayScore: away.score,
    strStatus: st? (st.completed?'FT':(st.state==='pre'?'NS':'IN')) : '',
    phaseNote: compNoteText(comp),
    homeWinner: !!home.winner, awayWinner: !!away.winner,
    homeColor:(home.team&&home.team.color)||null, awayColor:(away.team&&away.team.color)||null,
    homeShootout: home.shootoutScore!=null?home.shootoutScore:null,
    awayShootout: away.shootoutScore!=null?away.shootoutScore:null,
    stats:{
      homePoss:p.home, awayPoss:p.away,
      homeShots:sh.home, awayShots:sh.away,
      homeSOT:sot.home, awaySOT:sot.away,
      homeCorners:co.home, awayCorners:co.away,
      homeFouls:fo.home, awayFouls:fo.away,
      yellow, red, yellowA:yA, yellowB:yB, redA:rA, redB:rB, scorers
    }
  };
}
// genera una ventana de ±3 días alrededor de una fecha YYYY-MM-DD
function windowYmd(date,fmt){
  const base=new Date(date+'T12:00:00Z'); const out=[];
  for(let off=-3;off<=3;off++){const d=new Date(base); d.setUTCDate(d.getUTCDate()+off);
    const s=d.toISOString().slice(0,10); out.push(fmt==='compact'? s.replace(/-/g,''): s);}
  return out;
}

// ===== buscar contexto del partido (fecha, sede, grupo) desde ESPN =====
const MES_ES=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
function fmtDateEs(iso){const d=new Date(iso); if(isNaN(d))return ''; return d.getUTCDate()+' '+MES_ES[d.getUTCMonth()]+' '+d.getUTCFullYear();}
function ctxMsg(m,kind){const el=document.getElementById('ctxMsg'); if(el){ if(kind==='load'){el.innerHTML='<span class="spin"></span>'+m;}else{el.textContent=m;} el.style.color=kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)';}}
function activeTeams(){
  const auto = modeAuto && !modeAuto.classList.contains('hidden');
  return auto? [selA.value, selB.value] : [teamA.value, teamB.value];
}
// ids de ESPN por selección (fijos, evita depender de la lista remota)
const ESPN_ID={
  "Argelia":"624","Argentina":"202","Australia":"628","Austria":"474","Bélgica":"459","Bosnia":"452",
  "Brasil":"205","Canadá":"206","Cabo Verde":"2597","Colombia":"208","RD del Congo":"2850","Croacia":"477",
  "Curazao":"11678","República Checa":"450","Ecuador":"209","Egipto":"2620","Inglaterra":"448","Francia":"478",
  "Alemania":"481","Ghana":"4469","Haití":"2654","Irán":"469","Irak":"4375","Costa de Marfil":"4789",
  "Japón":"627","Jordania":"2917","México":"203","Marruecos":"2869","Países Bajos":"449","Nueva Zelanda":"2666",
  "Noruega":"464","Panamá":"2659","Paraguay":"210","Portugal":"482","Catar":"4398","Arabia Saudita":"655",
  "Escocia":"580","Senegal":"654","Sudáfrica":"467","Corea del Sur":"451","España":"164","Suecia":"466",
  "Suiza":"475","Túnez":"659","Turquía":"465","Estados Unidos":"660","Uruguay":"212","Uzbekistán":"2570"
};
function espnTeamId(esName){
  var id=ESPN_ID[esName];
  if(id) return id;
  if(CURRENT_LEAGUE!=='worldcup'){
    var ct=leagueTeams(CURRENT_LEAGUE);
    if(ct){
      var t=ct.find(function(x){return x.es===esName||x.en===esName;});
      if(t&&t.espn) return t.espn;
    }
  }
  return null;
}

// ===== detección de fase (grupos vs eliminatoria) desde la nota de ESPN =====
// los partidos de grupos traen "Group X"; los de eliminatoria, el nombre de la ronda.
function compNoteText(comp){
  if(!comp) return '';
  let t=comp.altGameNote||'';
  if(!t && comp.notes && comp.notes.length) t=comp.notes.map(n=>n.headline||n.text||'').join(' ');
  return t;
}
function detectPhase(noteText){
  const t=noteText||'';
  const mg=t.match(/Group\s+([A-Z])/i);
  if(mg) return {group:'Grupo '+mg[1].toUpperCase(), knockout:false, label:''};
  // rondas eliminatorias (el orden importa: semi/cuartos antes que "final")
  const KO=[
    [/round of 32|1\s*\/\s*16|dieciseisavos/i,'Dieciseisavos'],
    [/round of 16|1\s*\/\s*8|octavos/i,'Octavos de final'],
    [/quarter|1\s*\/\s*4|cuartos/i,'Cuartos de final'],
    [/semi/i,'Semifinal'],
    [/(3rd|third)\s*place|tercer\s*puesto/i,'Tercer puesto'],
    [/final/i,'Final'],
  ];
  for(const [re,lab] of KO){ if(re.test(t)) return {group:'', knockout:true, label:lab}; }
  // ligas regulares: fase de grupos siempre
  if(CURRENT_LEAGUE!=='worldcup'&&CURRENT_LEAGUE!=='champions') return {group:'', knockout:false, label:''};
  // sin grupo y sin ronda reconocida: probablemente eliminatoria
  return {group:'', knockout:true, label:'', unknown:true};
}
// promedio de goles a favor/en contra en los partidos FINALIZADOS del calendario de un equipo
function recentAvg(events, teamId){
  let gf=0,ga=0,n=0;
  (events||[]).forEach(e=>{
    const comp=e.competitions&&e.competitions[0]; if(!comp)return;
    const st=comp.status&&comp.status.type; if(!st||!st.completed)return;
    const cs=comp.competitors||[];
    const me=cs.find(c=>c.id===teamId||(c.team&&c.team.id===teamId)); const opp=cs.find(c=>c!==me);
    if(!me||!opp)return;
    const sv=c=>{const s=c.score; if(s==null)return null; if(typeof s==='object')return s.value!=null?s.value:parseFloat(s.displayValue); return parseFloat(s);};
    const mg=sv(me), og=sv(opp);
    if(mg==null||og==null||isNaN(mg)||isNaN(og))return;
    gf+=mg; ga+=og; n++;
  });
  return n? {gf:gf/n, ga:ga/n, n} : null;
}
// busca un partido (jugado o PROGRAMADO) en el scoreboard, recorriendo días; próximos primero
async function findMatchScore(aN,bN){
  const DAY=86400000, now=Date.now();
  const isWC=CURRENT_LEAGUE==='worldcup';
  const isQual=CURRENT_LEAGUE==='champions_classif';
  const tStart=isWC ? Date.UTC(2026,5,11) : isQual ? Date.UTC(2026,6,1) : Date.UTC(2026,7,1);
  const tEnd=isWC ? Date.UTC(2026,6,19) : isQual ? Date.UTC(2026,8,1) : Date.UTC(2027,5,1);
  const order=[];
  for(let t=Math.max(tStart, now-2*DAY); t<=tEnd; t+=DAY) order.push(t);
  for(let t=tStart; t<Math.max(tStart, now-2*DAY); t+=DAY) order.push(t);
  for(const t of order){
    const ymd=new Date(t).toISOString().slice(0,10).replace(/-/g,'');
    const day=await fetchESPNday(ymd);
    const de=day.find(x=>{const p=espnParse(x); return p&&eventMatches(p,aN,bN);});
    if(de){
      const comp=(de.competitions&&de.competitions[0])||{};
      const ph=detectPhase(compNoteText(comp));
      return {date:de.date, venue:(comp.venue&&comp.venue.fullName)||'', city:((comp.venue&&comp.venue.address&&comp.venue.address.city)||'').split(',')[0].trim(), group:ph.group, knockout:ph.knockout, phaseLabel:ph.label, phaseUnknown:!!ph.unknown};
    }
  }
  return null;
}
async function fetchContext(){
  const [nA,nB]=activeTeams();
  const ta=findTeam(nA), tb=findTeam(nB);
  if(!ta||!tb){ ctxMsg('No reconozco '+(!ta?('"'+nA+'"'):'')+(!ta&&!tb?' ni ':'')+(!tb?('"'+nB+'"'):'')+'.','err'); return; }
  ctxMsg('Buscando contexto en ESPN…','load');
  try{
    const idA=await espnTeamId(ta.es);
    if(!idA){ ctxMsg('No encontré a '+ta.es+' en ESPN. Carga el contexto a mano.','err'); return; }
    const r=await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${LEAGUES[CURRENT_LEAGUE].espn}/teams/${idA}/schedule`);
    if(!r.ok){ ctxMsg('La API respondió con error. Inténtalo de nuevo.','err'); return; }
    const d=await r.json(); const events=d.events||[];
    const bN=norm(teamEnglish(tb.es)), aN=norm(teamEnglish(ta.es));
    // 1) calendario del equipo (partidos ya jugados)
    let ev=events.find(e=>{
      const comps=(e.competitions&&e.competitions[0]&&e.competitions[0].competitors)||[];
      return comps.some(c=>{const n=norm((c.team&&(c.team.displayName||c.team.location))||''); return n&&(n===bN||n.includes(bN)||bN.includes(n));});
    });
    let info=null;
    if(ev){
      const comp=ev.competitions[0]||{};
      info={date:ev.date, venue:(comp.venue&&comp.venue.fullName)||'', city:((comp.venue&&comp.venue.address&&comp.venue.address.city)||'').split(',')[0].trim(), group:'', knockout:false, phaseLabel:'', phaseUnknown:false};
      try{ const day=await fetchESPNday(ev.date.slice(0,10).replace(/-/g,'')); const de=day.find(x=>x.id===ev.id);
        const dcomp=(de&&de.competitions&&de.competitions[0])||comp;
        const ph=detectPhase(compNoteText(dcomp));
        info.group=ph.group; info.knockout=ph.knockout; info.phaseLabel=ph.label; info.phaseUnknown=!!ph.unknown;
      }catch(e){}
    }else{
      // 2) fallback: scoreboard (cubre partidos PROGRAMADOS / futuros)
      ctxMsg('Buscando el partido (incluye próximos)…','load');
      info=await findMatchScore(aN,bN);
    }
    if(!info){ ctxMsg('No encontré '+ta.es+' vs '+tb.es+' (ni jugado ni programado) en '+(LEAGUES[CURRENT_LEAGUE]?LEAGUES[CURRENT_LEAGUE].name:'esta competición')+'. Carga el contexto a mano.','err'); return; }
    const dateStr=fmtDateEs(info.date);
    const phaseTxt = info.group ? info.group : (info.knockout ? (info.phaseLabel||'Eliminatoria') : '');
    const parts=[]; if(phaseTxt)parts.push(phaseTxt); if(info.city)parts.push(info.city); else if(info.venue)parts.push(info.venue); if(dateStr)parts.push(dateStr);
    ctx.value=parts.join(' · ');
    // detección automática de fase eliminatoria → activa "quién avanza"
    if(typeof koToggle!=='undefined' && koToggle){ koToggle.checked=!!info.knockout; }

    // ===== λ desde la forma reciente real (mezcla con el rating base) =====
    let [rlA,rlB]=autoLambdas(ta.s,tb.s);
    const ra=recentAvg(events, String(idA));
    let rb=null;
    try{ const idB=await espnTeamId(tb.es);
      if(idB){ const r2=await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${LEAGUES[CURRENT_LEAGUE].espn}/teams/${idB}/schedule`);
        if(r2.ok){ const d2=await r2.json(); rb=recentAvg(d2.events||[], String(idB)); } }
    }catch(e){}
    let laA=rlA, laB=rlB, src='rating base';
    if(ra && rb){
      const dA=(ra.gf+rb.ga)/2, dB=(rb.gf+ra.ga)/2;        // ataque propio + defensa rival
      const w=Math.max(0,Math.min(0.5, 0.12*Math.min(ra.n,rb.n)));   // peso de la forma (capado en 0.5)
      laA=w*dA+(1-w)*rlA; laB=w*dB+(1-w)*rlB; src='forma reciente + rating';
    }
    laA=Math.min(3.2,Math.max(0.25,laA)); laB=Math.min(3.2,Math.max(0.25,laB));
    const rr=autoRho(laA+laB);
    teamA.value=ta.es; teamB.value=tb.es;
    lamA.value=laA.toFixed(2); lamB.value=laB.toFixed(2);
    rho.value=rr; rhoVal.textContent=rr.toFixed(3);
    const pA=possShare(laA,laB);
    cornA.value=applyCornerLearn(teamCorners(teamShots(laA,pA))).toFixed(1);
    cornB.value=applyCornerLearn(teamCorners(teamShots(laB,1-pA))).toFixed(1);
    setMode('man'); run();
    const form = (ra?`${ta.es} GF ${ra.gf.toFixed(1)}/GA ${ra.ga.toFixed(1)} (${ra.n})`:'')+(rb?` · ${tb.es} GF ${rb.gf.toFixed(1)}/GA ${rb.ga.toFixed(1)} (${rb.n})`:'');
    let phaseNote='';
    if(info.knockout) phaseNote = info.phaseUnknown
      ? ' 🏆 No detecté grupo → asumo eliminatoria (activé "quién avanza"; desmárcalo si es fase de grupos).'
      : ` 🏆 Fase eliminatoria${info.phaseLabel?(' ('+info.phaseLabel+')'):''} → activé "quién avanza".`;
    ctxMsg(`✓ Contexto y λ cargados (${src}).`+(form?' '+form:'')+phaseNote+' Ajusta en Manual si quieres.','ok');
  }catch(e){ ctxMsg('No se pudo conectar (posible bloqueo CORS/red). Carga el contexto a mano.','err'); }
}

function eventMatches(ev,A,B){
  const set=[norm(ev.strHomeTeam||''), norm(ev.strAwayTeam||'')];
  const inSet=x=>set.some(s=>s&&x&&(s===x||s.includes(x)||x.includes(s)));
  return inSet(A)&&inSet(B);
}

async function fetchResult(id){
  const it=HIST.find(x=>x.id===id); if(!it)return;
  const date=parseCtxDate(it.ctx);            // puede ser null
  const year=date? date.slice(0,4) : '2026';
  const A=norm(teamEnglish(it.A)), B=norm(teamEnglish(it.B));
  setStatus(id,'Buscando resultado…','load');
  let ev=null, all=[];
  try{
    // fuente 1: ESPN por ventana de ±3 días (la más completa)
    if(date){
      for(const ymd of windowYmd(date,'compact')){
        const espn=(await fetchESPNday(ymd)).map(espnParse).filter(Boolean);
        all=all.concat(espn); ev=espn.find(e=>eventMatches(e,A,B)); if(ev) break;
      }
    }else{
      const espn=(await fetchESPNday('')).map(espnParse).filter(Boolean);
      all=all.concat(espn); ev=espn.find(e=>eventMatches(e,A,B));
    }
    // fuente 2: TheSportsDB, calendario del Mundial (no depende de la fecha)
    if(!ev){
      const season=await fetchWCSeason(year); all=all.concat(season);
      ev=season.find(e=>eventMatches(e,A,B));
    }
    // fuente 3: TheSportsDB por día (respaldo)
    if(!ev && date){
      for(const ymd of windowYmd(date,'dash')){
        const r=await fetch(`${SDB}?d=${ymd}&s=Soccer`); if(!r.ok) continue;
        const data=await r.json(); const events=(data&&data.events)||[];
        all=all.concat(events); ev=events.find(e=>eventMatches(e,A,B)); if(ev) break;
      }
    }
    if(!ev){
      if(all.length===0){
        setStatus(id,'Ninguna fuente devolvió partidos (revisa la conexión o carga a mano).','err');
      }else{
        const sample=all.slice(0,8).map(e=>e.strHomeTeam+'–'+e.strAwayTeam).join(', ');
        setStatus(id,'No encontré '+it.A+' vs '+it.B+' en ninguna fuente. Quizá el rival real fue otro o el nombre difiere. Ej: '+sample+'. Pásamelo y lo ajusto, o cárgalo a mano.','err');
      }
      return;
    }
    if(ev.intHomeScore==null||ev.intHomeScore===''||ev.intAwayScore==null||ev.intAwayScore===''){
      setStatus(id,'Encontré el partido pero aún no tiene marcador final. Inténtalo más tarde.','mut');return;
    }
    const st=(ev.strStatus||'').trim();
    if(/^(NS|TBD|PPD|POSTP|CANC|IN|Not Started|Postponed|Cancelled)$/i.test(st)){
      setStatus(id,'El partido todavía no terminó (estado: '+st+'). Inténtalo cuando finalice.','mut');return;
    }
    const hs=parseInt(ev.intHomeScore,10), as=parseInt(ev.intAwayScore,10);
    const homeIsA = norm(ev.strHomeTeam||'')===A || norm(ev.strHomeTeam||'').includes(A) || A.includes(norm(ev.strHomeTeam||''));
    it.actualA = homeIsA? hs : as;
    it.actualB = homeIsA? as : hs;
    
    // Si no hay predicción previa (partido importado sin guardar predicción), generarla ahora
    if(it.xgH==null && it.predPossA==null){
      const ta=findTeam(it.A), tb=findTeam(it.B);
      if(ta && tb){
        const [la,lb]=autoLambdas(ta.s,tb.s);
        const rho=autoRho(la+lb);
        const R=simulate(la,lb,rho);
        const possA=possShare(la,lb), shA=teamShots(la,possA), shB=teamShots(lb,1-possA);
        const coTot=teamCorners(shA)+teamCorners(shB);
        const sotA=shA*0.38, sotB=shB*0.38;
        it.lamH=la; it.lamA=lb; it.rho=rho;
        it.xgH=R.xgH; it.xgA=R.xgA; it.o25=R.o25; it.btts=R.btts;
        it.predPossA=possA; it.predShotsA=shA; it.predShotsB=shB;
        it.predCornersTot=coTot; it.predYellowTot=4.2; it.predRedTot=0.18;
        it.sotA=sotA; it.sotB=sotB;
      }
    }
    
    if(ev.stats){
      const s=ev.stats, pick=(h,a)=>homeIsA? h : a;
      it.actualStats={
        possA:pick(s.homePoss,s.awayPoss), possB:pick(s.awayPoss,s.homePoss),
        shotsA:pick(s.homeShots,s.awayShots), shotsB:pick(s.awayShots,s.homeShots),
        sotA:pick(s.homeSOT,s.awaySOT), sotB:pick(s.awaySOT,s.homeSOT),
        cornersTot:(s.homeCorners||0)+(s.awayCorners||0),
        yellowTot:s.yellow, redTot:s.red,
        scorers:(s.scorers||[]).map(g=>({name:g.name,min:g.min,ownGoal:g.ownGoal, forA:(g.home===homeIsA)}))
      };
    }else{ 
      // Si ESPN no trajo stats, crear estructura vacía para que igual se muestre la tabla con lo disponible
      it.actualStats={
        possA:null, possB:null,
        shotsA:null, shotsB:null,
        sotA:null, sotB:null,
        cornersTot:null,
        yellowTot:null, redTot:null,
        scorers:[]
      };
    }
    // si es eliminatoria y ESPN marca al ganador (incluye penales), registrar quién avanzó
    if(it.ko && it.ko.on && (ev.homeWinner||ev.awayWinner)){
      it.koActualAdv = ev.homeWinner ? (homeIsA?'A':'B') : (homeIsA?'B':'A');
      if(ev.homeShootout!=null||ev.awayShootout!=null){
        it.koShootout = homeIsA? {A:ev.homeShootout,B:ev.awayShootout} : {A:ev.awayShootout,B:ev.homeShootout};
      }
    }
    persistHist(); computeLearning(); renderHistory();
  }catch(e){
    setStatus(id,'No se pudo conectar (posible bloqueo CORS o sin internet). Carga el resultado a mano.','err');
  }
}

async function fetchAllPending(){
  const pend=HIST.filter(x=>x.actualA==null);
  if(!pend.length){return;}
  for(const it of pend){ await fetchResult(it.id); }
}

// expandir/colapsar el detalle de una fila del historial
function toggleDetail(id){
  const d=document.getElementById('det_'+id), c=document.getElementById('cv_'+id);
  if(!d)return; const nowHidden=d.classList.toggle('hidden'); if(c)c.textContent=nowHidden?'▸':'▾';
}
function setImportMsg(msg,kind){const el=document.getElementById('importMsg'); if(el){ if(kind==='load'){el.innerHTML='<span class="spin"></span>'+msg;}else{el.textContent=msg;} el.style.color=kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)';}}

// construye un item de historial desde un evento de ESPN, autoprediciéndolo con el modelo (rating de fuerza)
const DEFAULT_RATING=62;          // rating aproximado para selecciones no presentes en la base
let IMPORT_UNKNOWN=[];            // nombres no reconocidos durante el último import
function getTeamLoose(name){
  const t=findTeam(name);
  if(t) return t;
  if(name && IMPORT_UNKNOWN.indexOf(name)<0) IMPORT_UNKNOWN.push(name);
  return {es:name||'?', s:DEFAULT_RATING, fallback:true};   // no perdemos el partido
}
function buildFromESPN(ev){
  const p=espnParse(ev); if(!p) return null;
  if(p.intHomeScore==null||p.intHomeScore===''||p.intAwayScore==null||p.intAwayScore==='') return null;
  const ta=getTeamLoose(p.strHomeTeam), tb=getTeamLoose(p.strAwayTeam);
  const [la,lb]=autoLambdas(ta.s,tb.s);         // predicción baseline (sin aplicar aprendizaje)
  const rho=autoRho(la+lb);
  const R=simulate(la,lb,rho); const best=R.scores[0];
  const favO2=R.h>=R.d&&R.h>=R.a?'H':(R.a>=R.d?'A':'D');
  const bestO2=best.i>best.j?'H':(best.i===best.j?'D':'A');
  let cons2=null;
  if(favO2!==bestO2){ for(const s of R.scores){ const o=s.i>s.j?'H':(s.i===s.j?'D':'A'); if(o===favO2){cons2=s;break;} } }
  const possA=possShare(la,lb), shA=teamShots(la,possA), shB=teamShots(lb,1-possA);
  const coTot=teamCorners(shA)+teamCorners(shB);
  const hs=parseInt(p.intHomeScore,10), as=parseInt(p.intAwayScore,10);
  const s=p.stats;
  // ===== fase eliminatoria: pronóstico de quién avanza + quién avanzó realmente =====
  const ph=detectPhase(p.phaseNote);
  let ko={on:false}, koActualAdv=null;
  if(ph.knockout){
    const KO=knockoutAdvance(la,lb,rho,R);
    ko={on:true, advH:KO.advH, advA:KO.advA, pProrroga:KO.pProrroga, pPenales:KO.pPenales, penH:KO.penH};
    // ESPN marca con winner al que avanza (sirve también en penales)
    if(p.homeWinner) koActualAdv='A'; else if(p.awayWinner) koActualAdv='B';
  }
  const phaseTxt = ph.knockout ? (ph.label||'Eliminatoria') : ph.group;
  const sotA=shA*0.38, sotB=shB*0.38;
  const redPred=0.18;
  return {
    id:'imp-'+(ev.id||Math.random().toString(36).slice(2)), espnId:ev.id||null, ts:Date.now(),
    A:ta.es, B:tb.es,     ctx:(LEAGUES[CURRENT_LEAGUE]?LEAGUES[CURRENT_LEAGUE].name:'')+(phaseTxt?(' · '+phaseTxt):'')+(ev.date?(' · '+ev.date.slice(0,10)):''),
    lamH:la, lamA:lb, rho,
    pH:R.h,pD:R.d,pA:R.a,
    predResult: R.h>=R.d&&R.h>=R.a?'H':(R.a>=R.d?'A':'D'),
    si:best.i,sj:best.j,sp:best.p,
    si2:cons2?cons2.i:null, sj2:cons2?cons2.j:null, sp2:cons2?cons2.p:null,
    xgH:R.xgH,xgA:R.xgA,o25:R.o25,btts:R.btts,
    predPossA:possA,predShotsA:shA,predShotsB:shB,predCornersTot:coTot,predYellowTot:4.2,predRedTot:redPred,
    sotA:sotA,sotB:sotB,
    ko, koActualAdv,
    koShootout: (p.homeShootout!=null||p.awayShootout!=null)? {A:p.homeShootout, B:p.awayShootout} : null,
    approx: !!(ta.fallback||tb.fallback),
    actualA:hs, actualB:as,
    actualStats: s? {
      possA:s.homePoss,possB:s.awayPoss,shotsA:s.homeShots,shotsB:s.awayShots,
      sotA:s.homeSOT,sotB:s.awaySOT,cornersTot:(s.homeCorners||0)+(s.awayCorners||0),
      yellowTot:s.yellow,redTot:s.red,
      scorers:(s.scorers||[]).map(g=>({name:g.name,min:g.min,ownGoal:g.ownGoal,forA:g.home}))
    } : null
  };
}

// importa todos los partidos jugados desde ESPN, autopredichos y comparados
async function importPlayed(){
  var ln=LEAGUES[CURRENT_LEAGUE]?LEAGUES[CURRENT_LEAGUE].name:CURRENT_LEAGUE;
  setImportMsg('Importando partidos jugados de '+ln+'… (puede tardar unos segundos)','load');
  IMPORT_UNKNOWN=[];
  var isWC=CURRENT_LEAGUE==='worldcup';
  var isQual=CURRENT_LEAGUE==='champions_classif';
  var start=new Date(isWC?Date.UTC(2026,5,11,12):isQual?Date.UTC(2026,6,1,12):Date.UTC(2026,7,1,12));
  var tournEnd=new Date(isWC?Date.UTC(2026,6,19,12):isQual?Date.UTC(2026,8,1,12):Date.UTC(2027,5,1,12));
  var today=new Date();
  var end = today<tournEnd? today : tournEnd;
  const byId={}, byKey={};
  HIST.forEach(x=>{ if(x.actualA!=null){
    if(x.espnId) byId[x.espnId]=x;
    byKey['tm:'+norm(x.A)+'|'+norm(x.B)+'|'+x.actualA+'-'+x.actualB]=x;
    byKey['tm:'+norm(x.B)+'|'+norm(x.A)+'|'+x.actualB+'-'+x.actualA]=x;
  }});
  let added=0, upgraded=0;
  try{
    for(let d=new Date(start); d<=end; d.setUTCDate(d.getUTCDate()+1)){
      const ymd=d.toISOString().slice(0,10).replace(/-/g,'');
      const events=await fetchESPNday(ymd);
      for(const ev of events){
        const stt=ev.competitions&&ev.competitions[0]&&ev.competitions[0].status&&ev.competitions[0].status.type;
        if(!stt||!stt.completed) continue;            // solo finalizados
        const it=buildFromESPN(ev);
        if(!it) continue;
        const k1='tm:'+norm(it.A)+'|'+norm(it.B)+'|'+it.actualA+'-'+it.actualB;
        const exist = (it.espnId&&byId[it.espnId]) || byKey[k1];
        if(exist){
          // auto-corrección: si el existente era aproximado/en inglés y ahora reconocemos ambas selecciones
          if(!it.approx && (exist.approx || exist.A!==it.A || exist.B!==it.B)){
            const keepId=exist.id; Object.assign(exist,it); exist.id=keepId; upgraded++;
          }
          continue;
        }
        HIST.push(it); added++;
        if(it.espnId)byId[it.espnId]=it; byKey[k1]=it;
      }
    }
  }catch(e){ setImportMsg('Error al importar (posible bloqueo de red/CORS). Inténtalo de nuevo.','err'); return; }
  if(added||upgraded){dedupHist(); persistHist(); computeLearning(); renderHistory();}
  const unk = IMPORT_UNKNOWN.length? ' ⚠️ Selecciones no reconocidas (rating aproximado, ajustables): '+IMPORT_UNKNOWN.join(', ')+'. Pásamelas y les pongo el rating y nombre correctos.' : '';
  const head = (added||upgraded)? `Importé ${added} nuevo(s)`+(upgraded?`, corregí ${upgraded} ya cargado(s)`:'')+`. Toca una fila para ver el detalle.` : 'Sin novedades (ya estaba todo cargado).';
  setImportMsg(head+unk, IMPORT_UNKNOWN.length?'mut':((added||upgraded)?'ok':'mut'));
}

// carga rápida: pegás varias líneas tipo "España 4-0 Arabia Saudita" y completa los marcadores
function loadBulkResults(){
  const txt=(bulkBox.value||'').trim();
  if(!txt){bulkMsg.textContent='Pega al menos una línea (ej: España 4-0 Arabia Saudita).';bulkMsg.style.color='var(--mut)';return;}
  const match=(a,b)=>a&&b&&(a===b||a.includes(b)||b.includes(a));
  let ok=0; const fail=[];
  txt.split(/\n+/).forEach(line=>{
    const t=line.trim(); if(!t)return;
    const m=t.match(/^(.+?)\s+(\d+)\s*(?:-|:|a)\s*(\d+)\s+(.+)$/i);
    if(!m){fail.push(t);return;}
    const n1=norm(m[1]), s1=parseInt(m[2],10), s2=parseInt(m[3],10), n2=norm(m[4]);
    let it=HIST.find(x=>match(norm(x.A),n1)&&match(norm(x.B),n2));
    if(it){it.actualA=s1; it.actualB=s2; ok++; return;}
    it=HIST.find(x=>match(norm(x.A),n2)&&match(norm(x.B),n1));   // por si lo pegaste al revés
    if(it){it.actualA=s2; it.actualB=s1; ok++; return;}
    fail.push(t);
  });
  if(ok){persistHist(); computeLearning(); renderHistory();}
  bulkMsg.style.color = ok? 'var(--acc)':'var(--red)';
  bulkMsg.textContent = `Cargué ${ok} resultado(s).`+(fail.length? ' Sin emparejar: '+fail.join(' · ')+'. (¿Guardaste la predicción de ese partido?)':'');
  if(ok) bulkBox.value='';
}

// resultado real -> H/D/A y aciertos del item
function judge(it){
  const a=it.actualA, b=it.actualB;
  const realRes = a>b?'H':(a===b?'D':'A');
  const hitScore2 = it.si2!=null && it.sj2!=null && it.si2===a && it.sj2===b;
  const j={
    realRes,
    hitRes: it.predResult===realRes,
    hitScore: (it.si===a && it.sj===b) || hitScore2,
    hitScore2,
    hitOU: (it.o25>=0.5) === ((a+b)>2.5),
    hitBtts: (it.btts>=0.5) === (a>0&&b>0),
    predTot: it.xgH+it.xgA, realTot: a+b
  };
  const s=it.actualStats;
  if(s){
    const CL=9.5, YL=3.5;
    if(it.predPossA!=null && s.possA!=null) j.hitPoss=((it.predPossA>=0.5)===(s.possA>=50));
    if(it.predCornersTot!=null && s.cornersTot!=null) j.hitCorners=((overLine(it.predCornersTot,CL)>=0.5)===(s.cornersTot>CL));
    if(it.predYellowTot!=null && s.yellowTot!=null) j.hitYellow=((overLine(it.predYellowTot,YL)>=0.5)===(s.yellowTot>YL));
  }
  return j;
}

function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}

function computeLearning(){
  const done=HIST.filter(x=>x.actualA!=null&&x.actualB!=null);
  const n=done.length;
  let res=0,sc=0,ou=0,bt=0,sumP=0,sumR=0,absErr=0;
  let nStats=0,hp=0,hc=0,hy=0,sumPC=0,sumRC=0;
  done.forEach(it=>{const j=judge(it);
    if(j.hitRes)res++; if(j.hitScore)sc++; if(j.hitOU)ou++; if(j.hitBtts)bt++;
    sumP+=j.predTot; sumR+=j.realTot; absErr+=Math.abs(j.predTot-j.realTot);
    if(it.actualStats){nStats++; if(j.hitPoss)hp++; if(j.hitCorners)hc++; if(j.hitYellow)hy++;
      if(it.predCornersTot!=null && it.actualStats.cornersTot!=null){sumPC+=it.predCornersTot; sumRC+=it.actualStats.cornersTot;}}});
  LEARN.n=n; LEARN.accRes=res; LEARN.accScore=sc; LEARN.accOU=ou; LEARN.accBtts=bt;
  LEARN.nStats=nStats; LEARN.accPoss=hp; LEARN.accCorners=hc; LEARN.accYellow=hy;
  LEARN.cornerAdj = (nStats>=3 && sumPC>0) ? clamp(sumRC/sumPC, 0.70, 1.40) : 1;
  LEARN.cornerReady = (nStats>=3 && sumPC>0);
  LEARN.avgErr = n? absErr/n : 0;
  LEARN.bias = n? (sumR-sumP)/n : 0;          // >0 => el modelo subestima los goles
  LEARN.goalAdj = (n>=3 && sumP>0) ? clamp(sumR/sumP, 0.80, 1.25) : 1;
  LEARN.ready = n>=3;
}

// se aplica a los λ del modo automático si el usuario lo activa
function applyLearning(la,lb){
  if(LEARN.apply && LEARN.ready){
    return [clamp(la*LEARN.goalAdj,0.25,3.2), clamp(lb*LEARN.goalAdj,0.25,3.2)];
  }
  return [la,lb];
}
// factor de córners aprendido (mismo toggle que los goles)
function applyCornerLearn(c){ return (LEARN.apply && LEARN.cornerReady)? c*LEARN.cornerAdj : c; }

// línea de "quién avanza" para el historial (solo en partidos de eliminatoria)
function koLine(it){
  if(!it.ko || !it.ko.on) return '';
  const advWhich = it.ko.advH>=it.ko.advA ? 'A' : 'B';
  const adv = advWhich==='A'? it.A : it.B;
  const advP = Math.max(it.ko.advH, it.ko.advA);
  let head = `🏆 Pronóstico de clasificación: <b style="color:var(--txt)">${adv}</b> avanza (${pc(advP)})`;
  const done = it.actualA!=null && it.actualB!=null;
  // quién avanzó realmente: 1) dato cargado/ESPN; 2) deducido del marcador no-empate
  const realWhich = it.koActualAdv || (done && it.actualA!==it.actualB ? (it.actualA>it.actualB?'A':'B') : null);
  if(realWhich){
    const realAdv = realWhich==='A'? it.A : it.B;
    const ok = realWhich===advWhich;
    const pen = it.koShootout ? ` (penales ${it.koShootout.A}-${it.koShootout.B})` : '';
    head += ` · <span style="color:${ok?'var(--acc)':'var(--red)'}">real: avanzó ${realAdv}${pen} ${ok?'✓':'✗'}</span>`;
  } else if(done){
    head += ` · <span style="color:var(--acc2)">empate ${it.actualA}-${it.actualB}: se definió en prórroga/penales</span>`;
  }
  let sel='';
  if(done && !realWhich){
    sel = `<div class="res-in" style="margin-top:6px"><span>¿Quién avanzó?</span>`+
      `<button class="ghost" onclick="setAdvancer('${it.id}','A')">${it.A}</button>`+
      `<button class="ghost" onclick="setAdvancer('${it.id}','B')">${it.B}</button></div>`;
  }
  return `<div class="sub" style="margin-top:6px">${head}</div>`+sel;
}
// el usuario fija a mano quién avanzó (útil para llaves definidas por penales)
function setAdvancer(id,which){
  const it=HIST.find(x=>x.id===id); if(!it)return;
  it.koActualAdv=which; persistHist(); renderHistory();
}

function renderHistory(){
  // panel de aprendizaje
  const n=LEARN.n;
  if(n===0){
    learnStats.innerHTML='<div class="hist-empty" style="margin-top:8px">Aún no hay resultados de la <b>Temporada 26/27</b>. Guarda predicciones y carga los marcadores reales: con 3 o más, el modelo empieza a calibrar los goles.</div>';
  }else{
    const cell=(t,v)=>`<div class="learn-cell"><small>${t}</small><b>${v}</b></div>`;
    const frac=(x)=>`${x}/${n} <span style="color:var(--mut);font-size:12px">(${(100*x/n).toFixed(0)}%)</span>`;
    const fracN=(x,d)=>d? `${x}/${d} <span style="color:var(--mut);font-size:12px">(${(100*x/d).toFixed(0)}%)</span>`:'–';
    let biasTxt;
    if(LEARN.bias>0.10) biasTxt=`subestimando los goles (+${LEARN.bias.toFixed(2)}/partido)`;
    else if(LEARN.bias<-0.10) biasTxt=`sobreestimando los goles (${LEARN.bias.toFixed(2)}/partido)`;
    else biasTxt='bien calibrado en goles';
    const marketGrid = LEARN.nStats>0 ? (
      `<div class="learn-grid">`+
        cell('Con stats (ESPN)', LEARN.nStats)+
        cell('Posesión dominante', fracN(LEARN.accPoss,LEARN.nStats))+
        cell('Córners O/U 9.5', fracN(LEARN.accCorners,LEARN.nStats))+
        cell('Amarillas O/U 3.5', fracN(LEARN.accYellow,LEARN.nStats))+
      `</div>`) : '';
    learnStats.innerHTML=
      `<div class="sub" style="margin-bottom:6px;font-size:11px;color:var(--gray)">📆 Datos de la <b>Temporada 26/27</b> — calibración específica para esta temporada.</div>`+
      `<div class="learn-grid">`+
        cell('Con resultado', n)+
        cell('Acierto resultado', frac(LEARN.accRes))+
        cell('Marcador exacto', frac(LEARN.accScore))+
        cell('Over/Under 2.5', frac(LEARN.accOU))+
        cell('Ambos marcan', frac(LEARN.accBtts))+
        cell('Error medio de goles', LEARN.avgErr.toFixed(2))+
      `</div>`+ marketGrid +
      `<div class="sub">Diagnóstico: el modelo está <b style="color:var(--txt)">${biasTxt}</b>. `+
      `Factor de calibración goles ${LEARN.ready?'<b style="color:var(--acc2)">×'+LEARN.goalAdj.toFixed(3)+'</b>':'(necesita 3+ resultados)'}`+
      (LEARN.cornerReady?` · córners <b style="color:var(--acc2)">×${LEARN.cornerAdj.toFixed(3)}</b>`:'')+`.</div>`+
      `<h3 class="sec" style="margin:14px 0 6px">🧪 Ingredientes del modelo <span style="color:var(--gray);font-weight:400">· Temporada 26/27</span></h3>`+
      `<label class="learn-toggle" title="Es la base del modelo: no se puede desactivar"><input type="checkbox" checked disabled> Rating base de fuerza <span style="color:var(--gray)">(siempre activo)</span></label>`+
      `<label class="learn-toggle"><input type="checkbox" ${APPLY_FORM?'checked':''} onchange="toggleForm(this)"> Forma reciente ajustada por rival (ESPN)</label>`+
      `<label class="learn-toggle"><input type="checkbox" ${LEARN.apply?'checked':''} ${LEARN.ready?'':'disabled'} onchange="toggleLearn(this)"> Calibración por partidos jugados (goles ×${LEARN.goalAdj.toFixed(3)}${LEARN.cornerReady?' · córners ×'+LEARN.cornerAdj.toFixed(3):''})</label>`;
  }

  // lista de predicciones (vista compacta plegable: una fila por partido, clic para ver detalle)
  if(!HIST.length){histList.innerHTML='<div class="hist-empty">Sin predicciones guardadas todavía.</div>';return;}
  const bdg=(ok,t)=>`<span class="badge ${ok?'ok':'no'}">${ok?'✓':'✗'} ${t}</span>`;
  const items=HIST.slice().sort((a,b)=>(b.ts||0)-(a.ts||0));   // más nuevo → más viejo
  const shown=histShowAll? items : items.slice(0,3);
  histList.innerHTML=shown.map(it=>{
    const done = it.actualA!=null;
    const predTxt = it.predResult==='H'?'Gana '+it.A:it.predResult==='A'?'Gana '+it.B:'Empate';
    // ---- fila compacta ----
    let icons, realChip;
    if(done){
      const j0=judge(it);
      const ouP=it.o25>=0.5?'Over 2.5':'Under 2.5', btP=it.btts>=0.5?'Ambos: Sí':'Ambos: No';
      const dot=(ok,t)=>`<span class="hr-dot ${ok?'ok':'no'}" title="${t}">${ok?'✓':'✗'}</span>`;
      icons = dot(j0.hitRes,'Resultado')+dot(j0.hitScore,'Marcador exacto')+dot(j0.hitOU,'Pred: '+ouP)+dot(j0.hitBtts,'Pred: '+btP);
      realChip = `<span class="hr-real">real ${it.A} ${it.actualA}-${it.actualB} ${it.B}</span>`;
    }else{
      icons = `<span class="hr-pend">⏳ pendiente</span>`;
      realChip = `<span class="hr-real">${it.ctx||''}</span>`;
    }
    const row = `<div class="hist-row" onclick="toggleDetail('${it.id}')">`+
      `<span class="hr-match">${it.ko&&it.ko.on?'🏆 ':''}${it.A} ${it.si}-${it.sj} ${it.B}</span>`+
      realChip+
      `<span class="hr-icons">${icons}</span>`+
      `<span class="chev" id="cv_${it.id}">▸</span>`+
      `<button class="del-x" title="Borrar" onclick="event.stopPropagation();delItem('${it.id}')">✕</button>`+
    `</div>`;
    // ---- detalle plegado ----
    let detail;
    if(!done){
      // Mostrar tabla comparativa si hay stats reales disponibles (importadas desde ESPN)
      // Ahora muestra la tabla aunque no se haya guardado la predicción, siempre que haya stats reales
      let extra=''; const s=it.actualStats;
      // Condición relajada: mostrar tabla si hay stats reales O si es un partido importado sin predicción previa
      let showTable = s && (s.possA != null || s.cornersTot != null || s.shotsA != null || it.xgH != null || it.predPossA != null);
      
      if(showTable){
        const j=judge(it);
        let mb='';
        if(s){
          if(j.hitPoss!=null) mb+=bdg(j.hitPoss,'Posesión '+(it.predPossA>=0.5?it.A:it.B));
          if(j.hitCorners!=null) mb+=bdg(j.hitCorners,'Córners: '+(overLine(it.predCornersTot,9.5)>=0.5?'Over':'Under')+' 9.5 · hubo '+s.cornersTot);
          if(j.hitYellow!=null) mb+=bdg(j.hitYellow,'Amarillas: '+(overLine(it.predYellowTot,3.5)>=0.5?'Over':'Under')+' 3.5 · hubo '+s.yellowTot);
        }
        
        const cmpRow=(label,pred,real,predSuffix='',realSuffix='')=>{
          const predVal = pred!=null ? pred+predSuffix : '–';
          const realVal = real!=null ? real+realSuffix : '–';
          // Solo mostrar punto verde/gris si ambos valores existen
          const status = (pred!=null && real!=null) ? (Math.abs(pred-real)/(real||1)<0.2 ? '<span class="ok-dot">●</span>' : '<span class="off-dot">○</span>') : '';
          return `<tr><td>${label}</td><td class="r pred-col">${status}${predVal}</td><td class="r real-col">${realVal}</td></tr>`;
        };
        
        const pPoss=it.predPossA!=null?(it.predPossA*100).toFixed(0):null;
        const rPoss=s&&s.possA!=null?s.possA.toFixed(0):null;
        const pShotsA=it.predShotsA!=null?it.predShotsA.toFixed(0):null;
        const pShotsB=it.predShotsB!=null?it.predShotsB.toFixed(0):null;
        const pCorners=it.predCornersTot!=null?it.predCornersTot.toFixed(1):null;
        const pYellow=it.predYellowTot!=null?it.predYellowTot.toFixed(1):null;
        const pRed=it.predRedTot!=null?it.predRedTot.toFixed(1):null;
        const pSotA=it.sotA!=null?it.sotA.toFixed(0):null;
        const pSotB=it.sotB!=null?it.sotB.toFixed(0):null;
        
        extra=(mb?`<div class="badges">${mb}</div>`:'')+
          `<div class="comparison-table-container" style="margin-top:10px">`+
            `<div class="comparison-header">📊 Tabla Comparativa: Predicho vs Real</div>`+
            `<table class="comparison-table">`+
              `<thead><tr><th class="stat-label">Estadística</th><th class="stat-pred">Predicho</th><th class="stat-real">Real</th></tr></thead>`+
              `<tbody>`+
                cmpRow('⚽ Goles totales',(it.xgH!=null&&it.xgA!=null)?(it.xgH+it.xgA).toFixed(2):null,it.actualA+it.actualB,'','') +
                cmpRow('🎯 Posesión '+it.A,pPoss,rPoss,'%','%')+
                cmpRow('🎯 Posesión '+it.B,(it.predPossA!=null?(100-it.predPossA*100).toFixed(0):null),(s&&s.possB!=null?s.possB.toFixed(0):null),'%','%')+
                cmpRow('🔫 Remates '+it.A,pShotsA,s&&s.shotsA!=null?s.shotsA:null,'','')+
                cmpRow('🔫 Remates '+it.B,pShotsB,s&&s.shotsB!=null?s.shotsB:null,'','')+
                cmpRow('🎯 Remates al arco '+it.A,pSotA,s&&s.sotA!=null?s.sotA:null,'','')+
                cmpRow('🎯 Remates al arco '+it.B,pSotB,s&&s.sotB!=null?s.sotB:null,'','')+
                cmpRow('🚩 Córners totales',pCorners,s?s.cornersTot:null,'','')+
                cmpRow('🟨 Amarillas totales',pYellow,s?s.yellowTot:null,'','')+
                cmpRow('🟥 Rojas totales',pRed,s?s.redTot:null,'','')+
              `</tbody>`+
            `</table>`+
            `<div class="comparison-legend"><span class="ok-dot">●</span> Cerca (<20% error) · <span class="off-dot">○</span> Lejos (≥20% error)</div>`+
          `</div>`;
        
        if(s&&s.scorers&&s.scorers.length){
          const gl=s.scorers.map(g=>`${g.min} ${g.name}${g.ownGoal?' (e.c.)':''} <span style="color:var(--mut)">[${g.forA?it.A:it.B}]</span>`).join(' · ');
          extra+=`<div class="sub" style="margin-top:6px">⚽ ${gl}</div>`;
        }
      }
      
      detail = `<div class="hist-meta">${it.ctx||''} · pred: ${predTxt} · marcador ${it.si}-${it.sj} (${pc(it.sp)})`+
        (it.si2!=null?` · 2.º: ${it.si2}-${it.sj2} (${pc(it.sp2)})`:'')+` · O2.5 ${pc(it.o25)} · BTTS ${pc(it.btts)}</div>`+
        koLine(it)+
        `<div class="res-in"><span>Resultado real:</span>`+
        `<input type="number" min="0" id="ra_${it.id}" placeholder="${it.A.slice(0,3)}">`+
        `<span>-</span>`+
        `<input type="number" min="0" id="rb_${it.id}" placeholder="${it.B.slice(0,3)}">`+
        `<button class="go" onclick="setResult('${it.id}')">Guardar</button>`+
        `<button class="ghost" onclick="fetchResult('${it.id}')">🔎 Buscar</button></div>`+
        `<div class="sub" id="st_${it.id}" style="margin-top:6px"></div>`+extra;
    }else{
      const j=judge(it);
      let extra=''; const s=it.actualStats;
      // Mostrar tabla si hay stats reales O si al menos tenemos los goles reales (partido importado)
      if(s || (it.actualA!=null && it.actualB!=null)){
        let mb='';
        if(s){
          if(j.hitPoss!=null) mb+=bdg(j.hitPoss,'Posesión '+(it.predPossA>=0.5?it.A:it.B));
          if(j.hitCorners!=null) mb+=bdg(j.hitCorners,'Córners: '+(overLine(it.predCornersTot,9.5)>=0.5?'Over':'Under')+' 9.5 · hubo '+s.cornersTot);
          if(j.hitYellow!=null) mb+=bdg(j.hitYellow,'Amarillas: '+(overLine(it.predYellowTot,3.5)>=0.5?'Over':'Under')+' 3.5 · hubo '+s.yellowTot);
        }
        
        // Función auxiliar para crear filas comparativas con indicador visual de precisión
        const cmpRow=(label,pred,real,predSuffix='',realSuffix='')=>{
          const predVal = pred!=null ? pred+predSuffix : '–';
          const realVal = real!=null ? real+realSuffix : '–';
          // Solo mostrar punto verde/gris si ambos valores existen
          const status = (pred!=null && real!=null) ? (Math.abs(pred-real)/(real||1)<0.2 ? '<span class="ok-dot">●</span>' : '<span class="off-dot">○</span>') : '';
          return `<tr><td>${label}</td><td class="r pred-col">${status}${predVal}</td><td class="r real-col">${realVal}</td></tr>`;
        };
        
        const pPoss=it.predPossA!=null?(it.predPossA*100).toFixed(0):null;
        const rPoss=s&&s.possA!=null?s.possA.toFixed(0):null;
        const pShotsA=it.predShotsA!=null?it.predShotsA.toFixed(0):null;
        const pShotsB=it.predShotsB!=null?it.predShotsB.toFixed(0):null;
        const pCorners=it.predCornersTot!=null?it.predCornersTot.toFixed(1):null;
        const pYellow=it.predYellowTot!=null?it.predYellowTot.toFixed(1):null;
        const pRed=it.predRedTot!=null?it.predRedTot.toFixed(1):null;
        const pSotA=it.sotA!=null?it.sotA.toFixed(0):null;
        const pSotB=it.sotB!=null?it.sotB.toFixed(0):null;
        
        extra=(mb?`<div class="badges">${mb}</div>`:'')+
          `<div class="comparison-table-container" style="margin-top:10px">`+
            `<div class="comparison-header">📊 Tabla Comparativa: Predicho vs Real</div>`+
            `<table class="comparison-table">`+
              `<thead><tr><th class="stat-label">Estadística</th><th class="stat-pred">Predicho</th><th class="stat-real">Real</th></tr></thead>`+
              `<tbody>`+
                cmpRow('⚽ Goles totales',(it.xgH!=null&&it.xgA!=null)?(it.xgH+it.xgA).toFixed(2):null,it.actualA+it.actualB,'','') +
                cmpRow('🎯 Posesión '+it.A,pPoss,rPoss,'%','%')+
                cmpRow('🎯 Posesión '+it.B,(it.predPossA!=null?(100-it.predPossA*100).toFixed(0):null),(s&&s.possB!=null?s.possB.toFixed(0):null),'%','%')+
                cmpRow('🔫 Remates '+it.A,pShotsA,s&&s.shotsA!=null?s.shotsA:null,'','')+
                cmpRow('🔫 Remates '+it.B,pShotsB,s&&s.shotsB!=null?s.shotsB:null,'','')+
                cmpRow('🎯 Remates al arco '+it.A,pSotA,s&&s.sotA!=null?s.sotA:null,'','')+
                cmpRow('🎯 Remates al arco '+it.B,pSotB,s&&s.sotB!=null?s.sotB:null,'','')+
                cmpRow('🚩 Córners totales',pCorners,s?s.cornersTot:null,'','')+
                cmpRow('🟨 Amarillas totales',pYellow,s?s.yellowTot:null,'','')+
                cmpRow('🟥 Rojas totales',pRed,s?s.redTot:null,'','')+
              `</tbody>`+
            `</table>`+
            `<div class="comparison-legend"><span class="ok-dot">●</span> Cerca (<20% error) · <span class="off-dot">○</span> Lejos (≥20% error)</div>`+
          `</div>`;
        
        if(s&&s.scorers&&s.scorers.length){
          const gl=s.scorers.map(g=>`${g.min} ${g.name}${g.ownGoal?' (e.c.)':''} <span style="color:var(--mut)">[${g.forA?it.A:it.B}]</span>`).join(' · ');
          extra+=`<div class="sub" style="margin-top:6px">⚽ ${gl}</div>`;
        }
      }
      const ouP=it.o25>=0.5?'Over 2.5':'Under 2.5', btP=it.btts>=0.5?'Sí':'No';
      const scoreLabel = it.si2!=null && j.hitScore2 ? 'Marcador exacto (2.º)' : 'Marcador exacto';
      detail = `<div class="hist-meta">${it.ctx||''} · pred: ${predTxt} · marcador ${it.si}-${it.sj} (${pc(it.sp)})`+
        (it.si2!=null?` · 2.º: ${it.si2}-${it.sj2} (${pc(it.sp2)})`:'')+`</div>`+
        koLine(it)+
        `<div class="badges" style="margin-top:6px">`+
          bdg(j.hitRes,'Resultado')+bdg(j.hitScore,scoreLabel)+bdg(j.hitOU,'Goles: '+ouP+' · hubo '+(it.actualA+it.actualB))+bdg(j.hitBtts,'Ambos marcan: '+btP)+
        `</div>`+extra;
    }
    return row + `<div class="hist-detail hidden" id="det_${it.id}">${detail}</div>`;
  }).join('') + (items.length>3? `<div class="btns" style="margin-top:10px"><button class="ghost" onclick="toggleHistAll()">${histShowAll?'▲ Mostrar menos':'▼ Ver más ('+(items.length-3)+')'}</button></div>` : '');
}

