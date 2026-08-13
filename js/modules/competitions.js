// ===================== CLÁSICOS / DERBIS POR LIGA =====================
const PRESET_MATCHUPS={
  premier:[
    {a:"Manchester City",b:"Manchester United",label:"Derbi de Mánchester"},
    {a:"Liverpool",b:"Everton",label:"Derbi de Merseyside"},
    {a:"Arsenal",b:"Tottenham",label:"Derbi del Norte de Londres"},
    {a:"Chelsea",b:"Fulham",label:"Derbi del Oeste de Londres"},
    {a:"Newcastle",b:"Aston Villa",label:"Duelo de históricos"},
    {a:"Manchester United",b:"Liverpool",label:"North West Derby"},
  ],
  laliga:[
    {a:"Real Madrid",b:"Barcelona",label:"El Clásico"},
    {a:"Real Madrid",b:"Atlético Madrid",label:"Derbi Madrileño"},
    {a:"Barcelona",b:"Espanyol",label:"Derbi Barceloní"},
    {a:"Betis",b:"Sevilla",label:"Derbi Sevillano"},
    {a:"Athletic Club",b:"Real Sociedad",label:"Derbi Vasco"},
    {a:"Barcelona",b:"Valencia",label:"Duelo del Mediterráneo"},
  ],
  bundes:[
    {a:"Bayern Múnich",b:"Borussia Dortmund",label:"Der Klassiker"},
    {a:"Bayern Múnich",b:"Bayer Leverkusen",label:"Duelo de campeones"},
    {a:"Borussia Dortmund",b:"Borussia Mönchengladbach",label:"Derbi del Ruhr"},
    {a:"Stuttgart",b:"Eintracht Frankfurt",label:"Duelo del Suroeste"},
    {a:"RB Leipzig",b:"Bayern Múnich",label:"Alsacia vs Baviera"},
    {a:"Werder Bremen",b:"Hamburgo",label:"Derbi del Norte"},
  ],
  seriea:[
    {a:"Inter",b:"AC Milan",label:"Derby della Madonnina"},
    {a:"Roma",b:"Lazio",label:"Derby della Capitale"},
    {a:"Juventus",b:"Torino",label:"Derby della Mole"},
    {a:"Napoli",b:"Roma",label:"Derbi del Sur"},
    {a:"AC Milan",b:"Juventus",label:"Clásico de Italia"},
    {a:"Inter",b:"Juventus",label:"Derby d'Italia"},
  ],
  ligue1:[
    {a:"PSG",b:"Marsella",label:"Le Classique"},
    {a:"PSG",b:"Paris FC",label:"Derby de Paris"},
    {a:"Lille",b:"Lens",label:"Derby du Nord"},
    {a:"Mónaco",b:"Niza",label:"Derby de la Costa Azul"},
    {a:"PSG",b:"Olympique Lyon",label:"Duelo de gigantes"},
    {a:"Marsella",b:"Mónaco",label:"Duelo del Mediterráneo"},
  ],
  champions:[
    {a:"Real Madrid",b:"Barcelona",label:"El Clásico europeo"},
    {a:"Manchester City",b:"Real Madrid",label:"Final 2023"},
    {a:"Bayern Múnich",b:"Barcelona",label:"Duelo de gigantes"},
    {a:"Liverpool",b:"AC Milan",label:"Finales 2005/2007"},
    {a:"PSG",b:"Bayern Múnich",label:"Final 2020"},
    {a:"Inter",b:"AC Milan",label:"Derby della Madonnina"},
  ],
  champions_classif:[
    {a:"Fenerbahçe",b:"Sturm Graz",label:"Duelo de aspirantes"},
    {a:"Dinamo Zagreb",b:"Estrella Roja",label:"Derbi balcánico"},
    {a:"Hearts",b:"Shamrock Rovers",label:"Duelo celta"},
    {a:"Lech Poznań",b:"Górnik Zabrze",label:"Derbi polaco"},
    {a:"Slovan Bratislava",b:"Vardar",label:"Duelo del este"},
    {a:"Omonia Nicosia",b:"Hapoel Be'er Sheva",label:"Duelo mediterráneo"},
  ],
};
let _classicIdx=0;

// ===================== LIGAS / COMPETICIONES =====================
const LEAGUES={
  worldcup:{name:'Mundial',espn:'fifa.world',color:'#e6b53c',color2:'#ffd76a',icon:'🏆',tabs:true,teams:null,logo:4},
  premier:{name:'Premier League',espn:'eng.1',color:'#e90052',color2:'#ff6b8a',icon:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',tabs:true,teams:'premier',logo:23},
  laliga:{name:'La Liga',espn:'esp.1',color:'#c90b1e',color2:'#e8493d',icon:'🇪🇸',tabs:true,teams:'laliga',logo:15},
  bundes:{name:'Bundesliga',espn:'ger.1',color:'#ff1800',color2:'#ff5c4a',icon:'🇩🇪',tabs:true,teams:'bundes',logo:10},
  seriea:{name:'Serie A',espn:'ita.1',color:'#003da5',color2:'#3d7ed9',icon:'🇮🇹',tabs:true,teams:'seriea',logo:12},
  ligue1:{name:'Ligue 1',espn:'fra.1',color:'#004170',color2:'#3d8ec9',icon:'🇫🇷',tabs:true,teams:'ligue1',logo:9},
  champions:{name:'Champions League',espn:'uefa.champions',color:'#1a3b6b',color2:'#4a7cc9',icon:'⭐',tabs:true,teams:'champions',koLeague:true,logo:2},
  champions_classif:{name:'Champs Clasif.',espn:'uefa.champions_qual',color:'#2d5a8e',color2:'#5a8cc9',icon:'🔰',tabs:true,teams:'champions_classif',logo:2},
};
let CURRENT_LEAGUE='worldcup';

function loadClassicMatch(){
  const id=CURRENT_LEAGUE;
  if(id==='worldcup'){ document.getElementById('classicMsg').textContent='Solo disponible para ligas y Champions.'; return; }
  const derbies=PRESET_MATCHUPS[id];
  if(!derbies||!derbies.length) return;
  const derby=derbies[_classicIdx%derbies.length];
  _classicIdx=(_classicIdx+1)%derbies.length;
  document.getElementById('teamA').value=derby.a;
  document.getElementById('teamB').value=derby.b;
  PICK_A=derby.a; PICK_B=derby.b;
  document.getElementById('classicMsg').textContent='⚡ '+derby.label+': '+derby.a+' vs '+derby.b;
  if(typeof renderTeamPicker==='function') renderTeamPicker();
}
// precarga un cuadro de Champions con los 16 clasificados a R16 (simulado)
function loadChampionsBracket(){
  BRACKET_SIZE=16;
  BRACKET=new Array(BRACKET_SIZE).fill('');
  var ct=leagueTeams('champions');
  if(!ct||ct.length<16){ setBkMsg('No hay suficientes equipos para armar el cuadro.','err'); return; }
  // ordenar por rating y tomar los 16 mejores
  var top16=ct.slice().sort(function(a,b){return b.s-a.s;}).slice(0,16);
  // emparejar: 1° vs 16°, 2° vs 15°, etc. (simula el sorteo)
  for(var i=0;i<8;i++){ BRACKET[2*i]=top16[i].es; BRACKET[2*i+1]=top16[15-i].es; }
  PICKS={}; CONFIRMED={};
  saveBracket(); savePicks(); saveConfirmed();
  if(typeof renderBracket==='function') renderBracket();
  setBkMsg('Cuadro de Champions (Octavos) armado con los 16 mejores clubs. Ajusta los cruces a mano si quieres.','ok');
}
function leagueTeams(leagueId){
  const L=LEAGUES[leagueId];
  if(!L||!L.teams||!CLUB_TEAMS[L.teams]) return null;
  return CLUB_TEAMS[L.teams];
}
function switchLeague(id){
  if(!LEAGUES[id]) return;
  CURRENT_LEAGUE=id;
  try{localStorage.setItem('rp_league',id);}catch(e){}
  document.body.dataset.league=id;
  document.title='Rocky Predictor · '+(LEAGUES[id]?LEAGUES[id].name:id);
  var ll=document.getElementById('leagueLabelInner');
  if(ll) ll.textContent=(LEAGUES[id]?LEAGUES[id].icon+' ':'')+(LEAGUES[id]?LEAGUES[id].name:id);
  var logoImg=document.getElementById('contentLogo');
  if(logoImg&&LEAGUES[id]) logoImg.src='https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/'+LEAGUES[id].logo+'.png&w=40&h=40';
  var meta=document.getElementById('leagueMeta');
  if(meta) meta.textContent=LEAGUES[id].name+(id==='worldcup'?' · Estados Unidos 2026':id==='champions'?' · 2025-26':id==='champions_classif'?' · Clasificación':' · 2025-26');
  var mt=document.querySelector('meta[name="theme-color"]');
  if(mt) mt.content=LEAGUES[id].color;
  // cargar historial de esta liga
  loadHist(); if(typeof computeLearning==='function') computeLearning();
  if(typeof renderHistory==='function') renderHistory();
  // actualizar sidebar
  document.querySelectorAll('.sidebar-item').forEach(function(t){
    t.classList.toggle('active',t.dataset.league===id);
  });
  // reset equipos para nueva liga
  if(id==='worldcup'){ PICK_A='Bélgica'; PICK_B='Irán'; }
  else {
    var st=sortedTeams();
    if(st.length){ PICK_A=st[0].es; PICK_B=st.length>1?st[1].es:st[0].es; }
  }
  if(typeof renderTeamPicker==='function') renderTeamPicker();
  if(typeof renderCartPicker==='function') renderCartPicker();
  _classicIdx=0;  // reiniciar clásicos al cambiar de liga
  // resetear bracket según tipo de competición
  if(id==='champions'){
    BRACKET_SIZE=16;
    if(!BRACKET.length||BRACKET.length!==16) BRACKET=new Array(16).fill('');
    if(!BRACKET.some(Boolean)) loadChampionsBracket();
  } else if(id==='worldcup'){
    BRACKET_SIZE=32;
    if(!BRACKET.length||BRACKET.length!==32) BRACKET=new Array(32).fill('');
  } else {
    BRACKET=new Array(32).fill(''); BRACKET_SIZE=32;
    PICKS={}; CONFIRMED={}; TEAM_FORM={}; _espnFetchedAt=0;
    saveBracket(); savePicks(); saveConfirmed(); saveForm();
  }
  // KO toggle solo para Mundial y Champions
  var koEl=document.getElementById('koToggle');
  if(koEl) koEl.parentElement.style.display=(id==='worldcup'||id==='champions')?'':'none';
  // clásicos solo para ligas y Champions (no Mundial)
  var classicBtn=document.querySelector('[onclick*="loadClassicMatch"]');
  if(classicBtn) classicBtn.parentElement.style.display=(id==='worldcup')?'none':'';
  // botones de cuadro
  var wcBtn=document.querySelector('[onclick="loadWCBracket()"]');
  var chBtn=document.getElementById('btnChampBracket');
  if(wcBtn) wcBtn.style.display=(id==='worldcup')?'':'none';
  if(chBtn) chBtn.style.display=(id==='champions')?'':'none';
  // recargar vista actual
  var _views={envivo:'viewEnVivo',match:'viewMatch',bracket:'viewBracket',estadisticas:'viewStats',cartilla:'viewCartilla',rend:'viewRend',competition:'viewCompetition'};
  var _reloaded=false;
  for(var _vk in _views){
    var _ve=document.getElementById(_views[_vk]);
    if(_ve&&!_ve.classList.contains('hidden')){ if(_vk==='competition'&&currentCompetitionHubContext==='global'){ renderCurrentCompetitionHub(); } else if(typeof showView==='function'){ showView(_vk); } _reloaded=true; break; }
  }
  if(!_reloaded&&typeof showView==='function') showView('envivo');
  // refrescar en vivo al cambiar de liga
  if(typeof fetchLive==='function') fetchLive();
}
// restaurar liga guardada
try{
  var saved=localStorage.getItem('rp_league');
  if(saved&&LEAGUES[saved]) CURRENT_LEAGUE=saved;
}catch(e){}
// inicial: ocultar KO toggle y clásicos según liga
(function(){ var k=document.getElementById('koToggle'); if(k) k.parentElement.style.display=(CURRENT_LEAGUE==='worldcup'||CURRENT_LEAGUE==='champions')?'':'none';
  var cb=document.querySelector('[onclick*="loadClassicMatch"]'); if(cb) cb.parentElement.style.display=(CURRENT_LEAGUE==='worldcup')?'none':'';
  var wcI=document.querySelector('[onclick="loadWCBracket()"]'); if(wcI) wcI.style.display=(CURRENT_LEAGUE==='worldcup')?'':'none';
  var chI=document.getElementById('btnChampBracket'); if(chI) chI.style.display=(CURRENT_LEAGUE==='champions')?'':'none'; })();

// ===================== BANDERAS (emoji por selección) =====================
const FLAGS={
  "Argentina":"🇦🇷","España":"🇪🇸","Francia":"🇫🇷","Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Brasil":"🇧🇷","Portugal":"🇵🇹",
  "Países Bajos":"🇳🇱","Alemania":"🇩🇪","Bélgica":"🇧🇪","Croacia":"🇭🇷","Marruecos":"🇲🇦","Colombia":"🇨🇴",
  "Uruguay":"🇺🇾","Senegal":"🇸🇳","Suiza":"🇨🇭","Dinamarca":"🇩🇰","Noruega":"🇳🇴","Japón":"🇯🇵",
  "Estados Unidos":"🇺🇸","México":"🇲🇽","Ecuador":"🇪🇨","Austria":"🇦🇹","Turquía":"🇹🇷","Nigeria":"🇳🇬",
  "Suecia":"🇸🇪","Corea del Sur":"🇰🇷","Australia":"🇦🇺","Egipto":"🇪🇬","Costa de Marfil":"🇨🇮","Canadá":"🇨🇦",
  "Irán":"🇮🇷","Paraguay":"🇵🇾","Argelia":"🇩🇿","República Checa":"🇨🇿","Bosnia":"🇧🇦","Túnez":"🇹🇳",
  "Panamá":"🇵🇦","Uzbekistán":"🇺🇿","Sudáfrica":"🇿🇦","Arabia Saudita":"🇸🇦","Catar":"🇶🇦","Jordania":"🇯🇴",
  "Cabo Verde":"🇨🇻","Curazao":"🇨🇼","Nueva Zelanda":"🇳🇿","Haití":"🇭🇹","Escocia":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Ghana":"🇬🇭",
  "RD del Congo":"🇨🇩","Irak":"🇮🇶"
};
function flagFor(es){
  if(FLAGS[es]) return FLAGS[es];
  if(CURRENT_LEAGUE!=='worldcup') return '⚽';
  return "🏳️";
}
// códigos ISO para imágenes de bandera (flagcdn.com). Inglaterra/Escocia usan subdivisión gb-*
const FLAG_CODE={
  "Argentina":"ar","España":"es","Francia":"fr","Inglaterra":"gb-eng","Brasil":"br","Portugal":"pt",
  "Países Bajos":"nl","Alemania":"de","Bélgica":"be","Croacia":"hr","Marruecos":"ma","Colombia":"co",
  "Uruguay":"uy","Senegal":"sn","Suiza":"ch","Dinamarca":"dk","Noruega":"no","Japón":"jp",
  "Estados Unidos":"us","México":"mx","Ecuador":"ec","Austria":"at","Turquía":"tr","Nigeria":"ng",
  "Suecia":"se","Corea del Sur":"kr","Australia":"au","Egipto":"eg","Costa de Marfil":"ci","Canadá":"ca",
  "Irán":"ir","Paraguay":"py","Argelia":"dz","República Checa":"cz","Bosnia":"ba","Túnez":"tn",
  "Panamá":"pa","Uzbekistán":"uz","Sudáfrica":"za","Arabia Saudita":"sa","Catar":"qa","Jordania":"jo",
  "Cabo Verde":"cv","Curazao":"cw","Nueva Zelanda":"nz","Haití":"ht","Escocia":"gb-sct","Ghana":"gh",
  "RD del Congo":"cd","Irak":"iq"
};
// devuelve la imagen de la bandera o escudo (ESPN para clubs, flagcdn para selecciones); si no hay, emoji
function flagImg(es, px){
  px=px||16;
  const code=FLAG_CODE[es];
  // club / champions: logo ESPN con fallback a emoji
  var t=findTeam(es);
  if(t&&t.espn){
    var sz=Math.round(px*1.4);
    var fb=flagFor(es);
    return `<span style="display:inline-flex;align-items:center;gap:2px">`+
      `<img class="flagimg" src="https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/${t.espn}.png&w=${sz}&h=${sz}" alt="${es}" loading="lazy" style="width:${sz}px;height:${sz}px" onerror="this.style.display='none';this.parentNode.querySelector('.ffb').style.display='inline'">`+
      `<span class="ffb flagimg-fb" style="font-size:${px}px;display:none;line-height:1">${fb}</span></span>`;
  }
  // selección: bandera flagcdn
  if(!code) return `<span class="flagimg-fb" style="font-size:${px}px">${flagFor(es)}</span>`;
  const w = px<=15?'w40':(px<=22?'w80':'w160');     // pide buena resolución y se escala por CSS
  const cw=Math.round(px*4/3);                       // ancho fijo (proporción 4:3) para que TODAS midan igual
  return `<img class="flagimg" src="https://flagcdn.com/${w}/${code}.png" alt="${es}" loading="lazy" style="width:${cw}px;height:${px}px" onerror="this.style.display='none'">`;
}



// nombres en inglés para emparejar con TheSportsDB
const EN_NAME={
  "Argentina":"Argentina","España":"Spain","Francia":"France","Inglaterra":"England",
  "Brasil":"Brazil","Portugal":"Portugal","Países Bajos":"Netherlands","Alemania":"Germany",
  "Bélgica":"Belgium","Croacia":"Croatia","Marruecos":"Morocco","Colombia":"Colombia",
  "Uruguay":"Uruguay","Senegal":"Senegal","Suiza":"Switzerland","Dinamarca":"Denmark",
  "Noruega":"Norway","Japón":"Japan","Estados Unidos":"United States","México":"Mexico",
  "Ecuador":"Ecuador","Austria":"Austria","Turquía":"Turkey","Nigeria":"Nigeria",
  "Suecia":"Sweden","Corea del Sur":"South Korea","Australia":"Australia","Egipto":"Egypt",
  "Costa de Marfil":"Ivory Coast","Canadá":"Canada","Irán":"Iran","Paraguay":"Paraguay",
  "Argelia":"Algeria","República Checa":"Czech Republic","Bosnia":"Bosnia",
  "Túnez":"Tunisia","Panamá":"Panama","Uzbekistán":"Uzbekistan","Sudáfrica":"South Africa",
  "Arabia Saudita":"Saudi Arabia","Catar":"Qatar","Jordania":"Jordan","Cabo Verde":"Cape Verde",
  "Curazao":"Curacao","Nueva Zelanda":"New Zealand","Haití":"Haiti",
  "Escocia":"Scotland","Ghana":"Ghana","RD del Congo":"Congo DR","Irak":"Iraq"
};
function teamEnglish(es){
  var en=EN_NAME[es];
  if(en) return en;
  if(CURRENT_LEAGUE!=='worldcup'){
    var ct=leagueTeams(CURRENT_LEAGUE);
    if(ct){
      var t=ct.find(function(x){return x.es===es;});
      if(t&&t.en) return t.en;
    }
  }
  return es;
}

// extrae fecha YYYY-MM-DD de un contexto tipo "Grupo H · Atlanta · 21 jun 2026"
const MONTHS={ene:'01',feb:'02',mar:'03',abr:'04',may:'05',jun:'06',jul:'07',ago:'08',sep:'09',set:'09',oct:'10',nov:'11',dic:'12'};
function parseCtxDate(ctx){
  if(!ctx)return null;
  const t=ctx.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const m=t.match(/(\d{1,2})\s+([a-z]{3,})\.?\s+(\d{4})/);
  if(!m)return null;
  const mon=MONTHS[m[2].slice(0,3)]; if(!mon)return null;
  return `${m[3]}-${mon}-${m[1].padStart(2,'0')}`;
}

// calibración automática (Dixon-Coles por diferencia de fuerza)
const BASE=1.30, K=2.3;
function autoLambdas(sa,sb){
  const d=(sa-sb)/100;
  let la=BASE*Math.exp(K*d), lb=BASE*Math.exp(-K*d);
  return [Math.min(3.2,Math.max(0.25,la)), Math.min(3.2,Math.max(0.25,lb))];
}
function autoRho(total){
  if(total<2.0)return -0.08; if(total<2.5)return -0.07;
  if(total<3.0)return -0.06; if(total<3.5)return -0.05; return -0.04;
}

