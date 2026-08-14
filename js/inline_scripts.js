const TEAMS=[
{es:"Argentina",s:92,f:"🇦🇷"},{es:"España",s:91,f:"🇪🇸"},{es:"Francia",s:90,f:"🇫"},{es:"Inglaterra",s:88,f:"🏴󠁧󠁢󠁮󠁿"},
{es:"Brasil",s:87,f:"🇧🇷"},{es:"Portugal",s:87,f:"🇵🇹"},{es:"Países Bajos",s:85,f:"🇳🇱"},{es:"Alemania",s:84,f:"🇩🇪"},
{es:"Bélgica",s:82,f:"🇧🇪"},{es:"Croacia",s:80,f:"🇭🇷"},{es:"Marruecos",s:80,f:"🇲🇦"},{es:"Colombia",s:79,f:"🇨🇴"},
{es:"Uruguay",s:79,f:"🇺🇾"},{es:"Senegal",s:76,f:"🇸🇳"},{es:"Suiza",s:76,f:"🇨🇭"},{es:"Dinamarca",s:75,f:"🇩"},
{es:"Costa de Marfil",s:70,f:"🇨🇮"},{es:"Canadá",s:70,f:"🇨🇦"},{es:"Escocia",s:70,f:"🏴󠁧󠁢󠁳󠁣󠁿"},{es:"Ghana",s:69,f:"🇬🇭"},
{es:"Irán",s:68,f:"🇮🇷"},{es:"Paraguay",s:68,f:"🇵🇾"},{es:"Argelia",s:68,f:"🇩🇿"},{es:"República Checa",s:68,f:"🇨🇿"},
{es:"Bosnia",s:67,f:"🇧🇦"},{es:"Túnez",s:66,f:"🇹🇳"},{es:"RD del Congo",s:65,f:"🇨🇩"},{es:"Panamá",s:64,f:"🇵🇦"},
{es:"Uzbekistán",s:62,f:"🇺🇿"},{es:"Sudáfrica",s:62,f:"🇿🇦"},{es:"Irak",s:61,f:"🇮🇶"},{es:"Arabia Saudita",s:60,f:"🇸🇦"},
{es:"Catar",s:60,f:"🇶🇦"},{es:"Jordania",s:58,f:"🇯"},{es:"Cabo Verde",s:58,f:"🇨🇻"},{es:"Curazao",s:56,f:"🇨🇼"},
{es:"Nueva Zelanda",s:56,f:"🇳🇿"},{es:"Haití",s:54,f:"🇭🇹"}];
const C=(es,s,espn,en)=>({es,s,espn,en:en||es,f:'⚽'});
const CLUB_TEAMS={
premier:[C("Manchester City",90,382),C("Arsenal",88,359),C("Liverpool",88,364),C("Chelsea",84,363),C("Manchester United",83,360),C("Tottenham",82,367),C("Newcastle",81,361),C("Aston Villa",80,362),C("Brighton",78,331),C("West Ham",77,379),C("Everton",77,368),C("Fulham",75,370),C("Crystal Palace",74,384),C("Wolverhampton",73,380),C("Nottingham Forest",72,393),C("Brentford",71,337),C("Leeds United",71,369),C("Bournemouth",70,349),C("Burnley",69,389),C("Sunderland",67,381)],
laliga:[C("Real Madrid",92,86),C("Barcelona",90,83),C("Atlético Madrid",86,1068),C("Real Sociedad",80,89),C("Athletic Club",79,93),C("Villarreal",78,102),C("Betis",76,244),C("Sevilla",75,243),C("Valencia",74,94),C("Girona",73,9812),C("Osasuna",71,97),C("Celta de Vigo",70,85),C("Rayo Vallecano",69,101),C("Mallorca",68,84),C("Getafe",67,2922),C("Espanyol",66,88),C("Alavés",65,96),C("Levante",65,1538),C("Elche",63,3751),C("Real Oviedo",62,92)],
bundes:[C("Bayern Múnich",91,132,"Bayern Munich"),C("Borussia Dortmund",85,124),C("RB Leipzig",83,11420),C("Bayer Leverkusen",82,131),C("Stuttgart",77,134),C("Eintracht Frankfurt",76,125),C("Wolfsburgo",74,138),C("Friburgo",73,126),C("Borussia Mönchengladbach",72,268),C("Mainz",71,2950),C("Werder Bremen",70,137),C("Hoffenheim",69,7911),C("Union Berlin",68,598),C("Augsburgo",67,3841),C("1. FC Köln",67,122),C("Heidenheim",65,6418),C("St. Pauli",64,270),C("Hamburger SV",63,127)],
seriea:[C("Inter",87,110),C("AC Milan",85,103),C("Juventus",84,111),C("Napoli",83,114),C("Atalanta",81,105),C("Roma",80,104),C("Lazio",79,112),C("Fiorentina",75,109),C("Bologna",73,107),C("Torino",72,239),C("Udinese",71,118),C("Genoa",70,3263),C("Cremonese",68,4050),C("Pisa",67,3956),C("Lecce",67,113),C("Parma",66,115),C("Como",65,2572),C("Cagliari",64,2925),C("Hellas Verona",63,119),C("Sassuolo",63,3997)],
ligue1:[C("PSG",87,160),C("Olympique Lyon",80,167),C("Marsella",79,176),C("Mónaco",78,174),C("Lille",77,166),C("Niza",76,2502),C("Rennes",74,169),C("Lens",73,175),C("Toulouse",70,179),C("Strasburgo",69,180),C("Brest",69,6997),C("Lorient",67,273),C("Paris FC",66,6851),C("Nantes",66,165),C("Angers",65,7868),C("FC Metz",64,177),C("Auxerre",63,172),C("Le Havre",62,3236)],
champions:[C("Manchester City",92,382),C("Real Madrid",92,86),C("Bayern Múnich",91,132),C("PSG",90,160),C("Barcelona",90,83),C("Liverpool",88,364),C("Arsenal",88,359),C("Inter",87,110),C("Atlético Madrid",86,1068),C("Borussia Dortmund",85,124),C("AC Milan",85,103),C("Juventus",84,111),C("Chelsea",84,363),C("Napoli",83,114),C("Manchester United",83,360),C("RB Leipzig",83,11420),C("Tottenham",82,367),C("Bayer Leverkusen",82,131),C("Newcastle",81,361),C("Atalanta",81,105),C("Roma",80,104),C("Aston Villa",80,362),C("Olympique Lyon",80,167),C("Marsella",79,176),C("Sporting CP",78,2250),C("PSV",78,148),C("Porto",78,437),C("Benfica",77,1929),C("Ajax",77,139),C("Celtic",76,256),C("Feyenoord",76,142),C("Mónaco",78,174),C("Club Brujas",74,570),C("Shakhtar Donetsk",74,493),C("Lille",77,166),C("Estrella Roja",72,2290)],
  libertadores:[C("Flamengo",82,819),C("Palmeiras",81,2029),C("Boca Juniors",79,5),C("Fluminense",78,3445),C("Botafogo",76,6086),C("Corinthians",75,874),C("Cruzeiro",75,2022),C("Peñarol",75,2683),C("Nacional",74,2684),C("Estudiantes LP",72,8),C("Cerro Porteño",72,2671),C("Bahia",73,9967),C("LDU Quito",69,4816),C("Lanús",67,12),C("Libertad",70,2670),C("Rosario Central",67,17),C("Barcelona SC",70,2686),C("Universidad Católica",70,885),C("Independiente del Valle",68,17086),C("Bolívar",66,2681),C("O'Higgins",62,6072),C("Guaraní",68,7385),C("Deportes Tolima",65,5489),C("Mirassol",68,9169),C("Argentinos Juniors",65,3),C("Atlético Junior",68,4815),C("Coquimbo Unido",60,8186),C("Huachipato",61,4134),C("Independiente Medellín",66,2690),C("Independiente Rivadavia",62,9744),C("Independiente Santa Fe",65,5488),C("Deportivo Táchira",63,4818),C("Sporting Cristal",65,2673),C("Universitario",66,2685),C("Always Ready",64,19425),C("Cusco FC",63,11995),C("Deportivo La Guaira",62,17090),C("Nacional Potosí",62,10311),C("Liverpool (Uruguay)",66,5492),C("Platense",61,7764),C("Carabobo",61,6037),C("Juventud",62,8416),C("UCV FC",60,10094),C("2 de Mayo",60,6097)],
  sudamericana:[C("Racing",71,15),C("River Plate",80,16),C("San Lorenzo",69,18),C("São Paulo",78,2026),C("Santos",74,2674),C("Vasco da Gama",72,3454),C("Grêmio",76,6273),C("Botafogo",76,6086),C("Atlético Mineiro",77,7632),C("RB Bragantino",70,6079),C("Cruzeiro",75,2022),C("Corinthians",75,874),C("Boca Juniors",79,5),C("Lanús",67,12),C("Independiente",70,11),C("Estudiantes LP",72,8),C("Tigre",62,7767),C("Barracas Central",62,10060),C("Deportivo Riestra",60,17702),C("Millonarios",68,5484),C("Atlético Nacional",69,5264),C("Independiente Medellín",66,2690),C("Independiente Santa Fe",65,5488),C("América de Cali",67,8109),C("Atlético Bucaramanga",63,6137),C("Bolívar",66,2681),C("Olimpia",71,2675),C("Nacional",74,2684),C("Nacional Asunción",63,5584),C("Defensor Sporting",65,1007),C("Montevideo City Torque",62,19002),C("Racing (Montevideo)",64,9903),C("Boston River",63,9999),C("Juventud",62,8416),C("Liverpool (Uruguay)",66,5492),C("Universidad de Chile",71,4139),C("Palestino",66,4422),C("Cobresal",59,4133),C("Audax Italiano",61,4138),C("O'Higgins",62,6072),C("Cienciano",63,3372),C("Sporting Cristal",65,2673),C("Melgar",64,7312),C("Alianza Atlético",61,5267),C("Deportivo Garcilaso",60,21819),C("Macará",62,18439),C("Deportivo Cuenca",65,4812),C("Orense",64,20695),C("Libertad (Ecuador)",62,21843),C("UCV FC",60,10094),C("Caracas FC",63,4811),C("Metropolitanos",60,13481),C("Monagas SC",59,6041),C("Academia Puerto Cabello",60,18995),C("Deportivo Recoleta",58,22517),C("San Antonio Bulo Bulo",60,22137),C("Blooming",61,6047),C("Guabirá",60,9497),C("Independiente Petrolero",61,20889),C("Sportivo Trinidense",64,7466),C("Carabobo",61,6037)],
  liga_arg:[C("River Plate",80,16),C("Boca Juniors",79,5),C("Independiente",70,11),C("Racing",71,15),C("San Lorenzo",69,18),C("Huracán",65,10),C("Rosario Central",67,17),C("Newell's",66,14),C("Estudiantes LP",72,8),C("Gimnasia LP",64,9),C("Talleres",68,19),C("Belgrano",64,4),C("Lanús",67,12),C("Defensa y Justicia",66,8950),C("Vélez Sarsfield",68,21),C("Argentinos Jrs",65,3),C("Banfield",64,235),C("Independiente Rivadavia",62,9744),C("Platense",61,7764),C("Tigre",62,7767),C("Unión",63,20),C("Central Córdoba",60,11989),C("Instituto",61,2975),C("Barracas Central",59,10060),C("Sarmiento",58,10158),C("Atlético Tucumán",62,9785),C("Deportivo Riestra",57,17702),C("Aldosivi",61,9739),C("Estudiantes RC",60,19685),C("Gimnasia (Mendoza)",61,11972)],
  liga_chil:[C("Colo Colo",73,2688),C("Universidad de Chile",71,4139),C("Universidad Católica",70,885),C("Palestino",66,4422),C("Unión Española",65,4132),C("Everton VM",63,4129),C("Audax Italiano",61,4138),C("Deportes Iquique",60,10142),C("Cobresal",59,4133),C("O'Higgins",62,6072),C("Huachipato",61,4134),C("Coquimbo Unido",60,8186),C("Ñublense",59,7427),C("Unión La Calera",58,10144),C("Cobreloa",58,2678),C("Deportes Copiapó",56,10139),C("Deportes Concepción",56,8110),C("Deportes Limache",57,19195),C("U de Concepción",57,5362),C("La Serena",58,4137)]};
const LEAGUES={
worldcup:{name:'Mundial 2026',icon:'🏆',color:'#c9a24a',espn:'fifa.world',ko:true,logo:4,sub:'Fase final en Estados Unidos, Canadá y México.'},
premier:{name:'Premier League',icon:'🏴󠁢󠁮',color:'#e90052',espn:'eng.1',teams:'premier',logo:23,sub:'Temporada 2026/27 · 20 equipos.'},
laliga:{name:'La Liga',icon:'🇪🇸',color:'#c90b1e',espn:'esp.1',teams:'laliga',logo:15,sub:'Temporada 2026/27 · 20 equipos.'},
bundes:{name:'Bundesliga',icon:'🇩🇪',color:'#ff5c4a',espn:'ger.1',teams:'bundes',logo:10,sub:'Temporada 2026/27 · 18 equipos.'},
seriea:{name:'Serie A',icon:'🇮🇹',color:'#3d7ed9',espn:'ita.1',teams:'seriea',logo:12,sub:'Temporada 2026/27 · 20 equipos.'},
ligue1:{name:'Ligue 1',icon:'🇫🇷',color:'#5a8cc9',espn:'fra.1',teams:'ligue1',logo:9,sub:'Temporada 2026/27 · 18 equipos.'},
champions:{name:'Champions League',icon:'⭐',color:'#4a7cc9',espn:'uefa.champions',teams:'champions',ko:true,logo:2,sub:'Temporada 2026/27 · eliminatorias.'},
  libertadores:{name:'Copa Libertadores',icon:'🏆',color:'#003da5',espn:'conmebol.libertadores',teams:'libertadores',ko:true,logo:58,sub:'Torneo de clubes más importante de Sudamérica.'},
  sudamericana:{name:'Copa Sudamericana',icon:'🥈',color:'#ff6600',espn:'conmebol.sudamericana',teams:'sudamericana',ko:true,logo:1208,sub:'Segunda competición de clubes de Sudamérica.'},
  liga_arg:{name:'Liga Argentina',icon:'🇦🇷',color:'#75aadb',espn:'arg.1',teams:'liga_arg',logo:1,sub:'Primera División de Argentina 2026.'},
  liga_chil:{name:'Campeonato Chileno',icon:'🇨🇱',color:'#d92323',espn:'chi.1',teams:'liga_chil',logo:86,sub:'Primera División de Chile 2026.'}};
let CURRENT_LEAGUE='worldcup';
try{const sv=localStorage.getItem('rp_league_v6');if(sv&&LEAGUES[sv])CURRENT_LEAGUE=sv;}catch(e){}
const FLAG_CODE={"Argentina":"ar","España":"es","Francia":"fr","Inglaterra":"gb-eng","Brasil":"br","Portugal":"pt","Países Bajos":"nl","Alemania":"de","Bélgica":"be","Croacia":"hr","Marruecos":"ma","Colombia":"co","Uruguay":"uy","Senegal":"sn","Suiza":"ch","Dinamarca":"dk","Noruega":"no","Japón":"jp","Estados Unidos":"us","México":"mx","Ecuador":"ec","Austria":"at","Turquía":"tr","Nigeria":"ng","Suecia":"se","Corea del Sur":"kr","Australia":"au","Egipto":"eg","Costa de Marfil":"ci","Canadá":"ca","Irán":"ir","Paraguay":"py","Argelia":"dz","República Checa":"cz","Bosnia":"ba","Túnez":"tn","Panamá":"pa","Uzbekistán":"uz","Sudáfrica":"za","Arabia Saudita":"sa","Catar":"qa","Jordania":"jo","Cabo Verde":"cv","Curazao":"cw","Nueva Zelanda":"nz","Haití":"ht","Escocia":"gb-sct","Ghana":"gh","RD del Congo":"cd","Irak":"iq"};
const ESPN_ID={"Argelia":"624","Argentina":"202","Australia":"628","Austria":"474","Bélgica":"459","Bosnia":"452","Brasil":"205","Canadá":"206","Cabo Verde":"2597","Colombia":"208","RD del Congo":"2850","Croacia":"477","Curazao":"11678","República Checa":"450","Ecuador":"209","Egipto":"2620","Inglaterra":"448","Francia":"478","Alemania":"481","Ghana":"4469","Haití":"2654","Irán":"469","Irak":"4375","Costa de Marfil":"4789","Japón":"627","Jordania":"2917","México":"203","Marruecos":"2869","Países Bajos":"449","Nueva Zelanda":"2666","Noruega":"464","Panamá":"2659","Paraguay":"210","Portugal":"482","Catar":"4398","Arabia Saudita":"655","Escocia":"580","Senegal":"654","Sudáfrica":"467","Corea del Sur":"451","España":"164","Suecia":"466","Suiza":"475","Túnez":"659","Turquía":"465","Estados Unidos":"660","Uruguay":"212","Uzbekistán":"2570"};
const PRESET_MATCHUPS={
worldcup:[{a:"Argentina",b:"Brasil"},{a:"España",b:"Francia"},{a:"Inglaterra",b:"Alemania"},{a:"Marruecos",b:"Portugal"},{a:"México",b:"Estados Unidos"},{a:"Japón",b:"Corea del Sur"}],
premier:[{a:"Manchester City",b:"Manchester United"},{a:"Liverpool",b:"Everton"},{a:"Arsenal",b:"Tottenham"},{a:"Manchester United",b:"Liverpool"},{a:"Chelsea",b:"Fulham"},{a:"Newcastle",b:"Aston Villa"}],
laliga:[{a:"Real Madrid",b:"Barcelona"},{a:"Real Madrid",b:"Atlético Madrid"},{a:"Barcelona",b:"Espanyol"},{a:"Betis",b:"Sevilla"},{a:"Athletic Club",b:"Real Sociedad"},{a:"Barcelona",b:"Valencia"}],
bundes:[{a:"Bayern Múnich",b:"Borussia Dortmund"},{a:"Bayern Múnich",b:"Bayer Leverkusen"},{a:"Borussia Dortmund",b:"Borussia Mönchengladbach"},{a:"Stuttgart",b:"Eintracht Frankfurt"},{a:"RB Leipzig",b:"Bayern Múnich"},{a:"Werder Bremen",b:"Hamburger SV"}],
seriea:[{a:"Inter",b:"AC Milan"},{a:"Roma",b:"Lazio"},{a:"Juventus",b:"Torino"},{a:"Napoli",b:"Roma"},{a:"AC Milan",b:"Juventus"},{a:"Inter",b:"Juventus"}],
ligue1:[{a:"PSG",b:"Marsella"},{a:"PSG",b:"Paris FC"},{a:"Lille",b:"Lens"},{a:"Mónaco",b:"Niza"},{a:"PSG",b:"Olympique Lyon"},{a:"Marsella",b:"Mónaco"}],
champions:[{a:"Real Madrid",b:"Barcelona"},{a:"Manchester City",b:"Real Madrid"},{a:"Bayern Múnich",b:"Barcelona"},{a:"Liverpool",b:"AC Milan"},{a:"PSG",b:"Bayern Múnich"},{a:"Inter",b:"AC Milan"}],
libertadores:[{a:"Flamengo",b:"Fluminense"},{a:"River Plate",b:"Boca Juniors"},{a:"Palmeiras",b:"São Paulo"},{a:"Nacional",b:"Peñarol"},{a:"Colo Colo",b:"Universidad de Chile"},{a:"Atlético Mineiro",b:"Cruzeiro"}],
  sudamericana:[{a:"Independiente",b:"Racing"},{a:"São Paulo",b:"Santos"},{a:"LDU Quito",b:"Barcelona SC"},{a:"Cruzeiro",b:"Corinthians"},{a:"Defensa y Justicia",b:"Lanús"},{a:"River Plate",b:"Boca Juniors"}],
liga_arg:[{a:"River Plate",b:"Boca Juniors"},{a:"Independiente",b:"Racing"},{a:"San Lorenzo",b:"Huracán"},{a:"Rosario Central",b:"Newell's"},{a:"Estudiantes LP",b:"Gimnasia LP"},{a:"Talleres",b:"Belgrano"}],
  liga_chil:[{a:"Colo Colo",b:"Universidad de Chile"},{a:"Universidad Católica",b:"Universidad de Chile"},{a:"Colo Colo",b:"Universidad Católica"},{a:"Palestino",b:"Unión Española"},{a:"Everton VM",b:"Coquimbo Unido"},{a:"Audax Italiano",b:"Unión Española"}]};
const WC2026_TEAMS=['Alemania','Paraguay','Francia','Suecia','Canadá','Sudáfrica','Países Bajos','Marruecos','Portugal','Croacia','España','Austria','Estados Unidos','Bosnia','Bélgica','Senegal','Brasil','Japón','Costa de Marfil','Noruega','México','Ecuador','Inglaterra','RD del Congo','Argentina','Cabo Verde','Australia','Egipto','Suiza','Argelia','Colombia','Ghana'];
const WC2026_LOCK={0:2,2:1,8:1};
const EN_NAME={"Argentina":"Argentina","España":"Spain","Francia":"France","Inglaterra":"England","Brasil":"Brazil","Portugal":"Portugal","Países Bajos":"Netherlands","Alemania":"Germany","Bélgica":"Belgium","Croacia":"Croatia","Marruecos":"Morocco","Colombia":"Colombia","Uruguay":"Uruguay","Senegal":"Senegal","Suiza":"Switzerland","Dinamarca":"Denmark","Noruega":"Norway","Japón":"Japan","Estados Unidos":"United States","México":"Mexico","Ecuador":"Ecuador","Austria":"Austria","Turquía":"Turkey","Nigeria":"Nigeria","Suecia":"Sweden","Corea del Sur":"South Korea","Australia":"Australia","Egipto":"Egypt","Costa de Marfil":"Ivory Coast","Canadá":"Canada","Irán":"Iran","Paraguay":"Paraguay","Argelia":"Algeria","República Checa":"Czech Republic","Bosnia":"Bosnia","Túnez":"Tunisia","Panamá":"Panama","Uzbekistán":"Uzbekistan","Sudáfrica":"South Africa","Arabia Saudita":"Saudi Arabia","Catar":"Qatar","Jordania":"Jordan","Cabo Verde":"Cape Verde","Curazao":"Curacao","Nueva Zelanda":"New Zealand","Haití":"Haiti","Escocia":"Scotland","Ghana":"Ghana","RD del Congo":"Congo DR","Irak":"Iraq"};
const MES_ES=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

/* ═══════════ HELPERS ═══════════ */
const pc=x=>(100*x).toFixed(1)+'%';
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
const norm=t=>String(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z ]/g,'').trim();
/* alias de nombres: ESPN no usa los mismos nombres que la base → mapeo normalizado */
const ALIAS={};
Object.keys(EN_NAME).forEach(es=>{ALIAS[norm(EN_NAME[es])]=es;});
Object.assign(ALIAS,{
  'athletic bilbao':'Athletic Club',
  'colocolo':'Colo Colo',
  'ldu de quito':'LDU Quito','liga de quito':'LDU Quito',
  'estudiantes de la plata':'Estudiantes LP',
  'racing club':'Racing',
  'ca independiente':'Independiente',
  'gimnasia la plata':'Gimnasia LP','gimnasia y esgrima la plata':'Gimnasia LP',
  'argentinos juniors':'Argentinos Jrs',
  'everton de vina del mar':'Everton VM',
  'man utd':'Manchester United','man united':'Manchester United','manchester united fc':'Manchester United',
  'man city':'Manchester City','manchester city fc':'Manchester City',
  'spurs':'Tottenham','tottenham hotspur':'Tottenham',
  'newcastle united':'Newcastle',
  'wolverhampton wanderers':'Wolverhampton',
  'paris saint-germain':'PSG','paris saint germain':'PSG','paris fc':'Paris FC',
  'bayern munich':'Bayern Múnich','bayern':'Bayern Múnich',
  'fc koln':'1. FC Köln','fc koeln':'1. FC Köln',
  'olympique lyonnais':'Olympique Lyon',
  'sporting lisboa':'Sporting CP','sporting cp':'Sporting CP',
  'feyenoord rotterdam':'Feyenoord',
  'club brugge':'Club Brujas',
  'red star belgrade':'Estrella Roja','crvena zvezda':'Estrella Roja',
  'atletico nacional':'Atlético Nacional','millonarios':'Millonarios','america de cali':'América de Cali',
  'atleticomg':'Atlético Mineiro','everton cd':'Everton VM',
  'cienciano del cusco':'Cienciano','club olimpia':'Olimpia','red bull bragantino':'RB Bragantino',
  'belgrano cordoba':'Belgrano','talleres cordoba':'Talleres','central cordoba santiago del estero':'Central Córdoba',
  'sarmiento junin':'Sarmiento','instituto cordoba':'Instituto','union santa fe':'Unión',
  'gimnasia mendoza':'Gimnasia (Mendoza)','estudiantes de rio cuarto':'Estudiantes RC',
  'newells old boys':'Newell\'s','estudiantes (buenos aires)':'Estudiantes RC','universidad de concepcion':'U de Concepción','deportes concepcion':'Deportes Concepción'});
function ensureTeam(name,espnId,leagueId){
  const q=norm(name);if(!q)return null;
  const t=findAnyTeam(name);if(t)return t;
  const nt={es:String(name||'').trim(),s:65,espn:espnId?Number(espnId):null,f:'⚽',auto:true};
  const teamsKey=leagueId&&LEAGUES[leagueId]&&LEAGUES[leagueId].teams;
  if(teamsKey&&CLUB_TEAMS[teamsKey])CLUB_TEAMS[teamsKey].push(nt);
  else TEAMS.push(nt);
  return nt;
}
const lsGet=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v;}catch(e){return d;}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
function showToast(m){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t);}t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2600);}
function countUp(el,to,dec,suffix,dur){const t0=performance.now();dur=dur||900;function fr(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=(to*e).toFixed(dec)+(suffix||'');if(k<1)requestAnimationFrame(fr);}requestAnimationFrame(fr);}
function poolTeams(){return CURRENT_LEAGUE==='worldcup'?TEAMS:(CLUB_TEAMS[LEAGUES[CURRENT_LEAGUE].teams]||TEAMS);}
function poolAll(){let a=TEAMS.slice();Object.keys(CLUB_TEAMS).forEach(k=>a=a.concat(CLUB_TEAMS[k]));return a;}
function findAnyTeam(name){const q=norm(name);if(!q)return null;const cur=poolTeams();let t=cur.find(t=>norm(t.es)===q);if(t)return t;t=cur.find(t=>q.length>=3&&norm(t.es).includes(q));if(t)return t;const all=poolAll();t=all.find(t=>norm(t.es)===q);if(t)return t;t=all.find(t=>q.length>=3&&norm(t.es).includes(q));if(t)return t;const via=ALIAS[q];if(!via)return null;return all.find(t=>norm(t.es)===norm(via))||null;}
function teamEnglish(es){return EN_NAME[es]||(findAnyTeam(es)&&findAnyTeam(es).en)||es;}
const ratingClass=s=>s>=88?'r-gold':s>=80?'r-green':s>=70?'r-blue':'r-gray';
function ymdLocal(d){return d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0');}
function fmtKick(iso){const d=new Date(iso);if(isNaN(d))return 'Por jugar';
  const hm=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});const now=new Date();
  if(d.toDateString()===now.toDateString())return hm;
  if(new Date(now.getTime()+864e5).toDateString()===d.toDateString())return 'mañana '+hm;
  return d.toLocaleDateString([],{day:'2-digit',month:'2-digit'})+' '+hm;}
function fmtDateEs(iso){const d=new Date(iso);if(isNaN(d))return '';return d.getUTCDate()+' '+MES_ES[d.getUTCMonth()]+' '+d.getUTCFullYear();}
function abbrName(n){const w=String(n||'').trim().split(/\s+/);if(w.length>=2&&w[0].length<=3)return (w[0].slice(0,1)+w[1].slice(0,2)).toUpperCase();return String(n||'').slice(0,3).toUpperCase();}
function abbrLeague(id){const n=LEAGUES[id]?LEAGUES[id].name:id;const w=n.split(/\s+/);return w.length>1?(w[0].slice(0,3)+' '+w[1].slice(0,3)).toUpperCase():n.slice(0,6).toUpperCase();}
/* escudos con imagen (ESPN clubs / flagcdn selecciones) y fallback emoji */
// ESCUDOS DE EQUIPOS (clubes + selecciones)
function crestHTML(es, px) {
  const t = findAnyTeam(es);
  const fb = t ? (t.f || '⚽') : '⚽';
  const size = px || 24;
  
  // Clubes → ESPN
  if (t && t.espn) {
    const url = 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/' + t.espn + '.png&w=' + (size*2) + '&h=' + (size*2);
    return '<span class="crest" style="width:' + size + 'px;height:' + size + 'px">' +
           '<span class="crest-fb" style="font-size:' + size + 'px">' + fb + '</span>' +
           '<img src="' + url + '" alt="" loading="eager" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()">' +
           '</span>';
  }
  
  // Selecciones → flagcdn
  if (t && FLAG_CODE[es]) {
    const url = 'https://flagcdn.com/w' + (size >= 40 ? 80 : 40) + '/' + FLAG_CODE[es] + '.png';
    return '<span class="crest" style="width:' + size + 'px;height:' + size + 'px">' +
           '<span class="crest-fb" style="font-size:' + size + 'px">' + fb + '</span>' +
           '<img src="' + url + '" alt="" loading="eager" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()">' +
           '</span>';
  }
  
  // Fallback emoji
  return '<span class="crest" style="width:' + size + 'px;height:' + size + 'px">' +
         '<span class="crest-fb" style="font-size:' + size + 'px">' + fb + '</span>' +
         '</span>';
}

// LOGOS DE COMPETICIONES
function leagueLogoHTML(id, px) {
  const L = LEAGUES[id];
  if (!L) return '<span style="font-size:' + (px||24) + 'px">🏆</span>';
  const size = px || 24;
  const url = 'https://a.espncdn.com/combiner/i?img=/i/leaguelogos/soccer/500/' + L.logo + '.png&w=' + (size*2) + '&h=' + (size*2);
  return '<span class="crest" style="width:' + size + 'px;height:' + size + 'px">' +
         '<span class="crest-fb" style="font-size:' + size + 'px">🏆</span>' +
         '<img src="' + url + '" alt="" loading="eager" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()">' +
         '</span>';
}

/* ═══════════ MODELO ═══════════ */
const BASE=1.30,KK=2.3;
function logFact(n){let s=0;for(let k=2;k<=n;k++)s+=Math.log(k);return s;}
function poissonPmf(k,l){return Math.exp(-l+k*Math.log(l)-logFact(k));}
function poissonCdf(k,l){let s=0;for(let i=0;i<=k;i++)s+=poissonPmf(i,l);return s;}
function overLine(mean,line){return 1-poissonCdf(Math.floor(line),mean);}
function dcAdj(i,j,l,m,r){if(i===0&&j===0)return 1-l*m*r;if(i===0&&j===1)return 1+l*r;if(i===1&&j===0)return 1+m*r;if(i===1&&j===1)return 1-r;return 1;}
function simulate(lamH,lamA,rho){
  const mg=8,P=[];let sum=0;
  for(let i=0;i<=mg;i++){P[i]=[];for(let j=0;j<=mg;j++){let v=poissonPmf(i,lamH)*poissonPmf(j,lamA)*dcAdj(i,j,lamH,lamA,rho);if(v<0)v=0;P[i][j]=v;sum+=v;}}
  for(let i=0;i<=mg;i++)for(let j=0;j<=mg;j++)P[i][j]/=sum;
  let h=0,d=0,a=0,o25=0,btts=0,csH=0,csA=0,xgH=0,xgA=0;const scores=[];
  for(let i=0;i<=mg;i++)for(let j=0;j<=mg;j++){const p=P[i][j];
    if(i>j)h+=p;else if(i===j)d+=p;else a+=p;
    if(i+j>2.5)o25+=p;
    if(i>0&&j>0)btts+=p;if(j===0)csH+=p;if(i===0)csA+=p;
    xgH+=i*p;xgA+=j*p;scores.push({i,j,p});}
  scores.sort((x,y)=>y.p-x.p);
  return {h,d,a,o25,btts,csH,csA,xgH,xgA,scores};
}
function autoLambdas(sa,sb){const dd=(sa-sb)/100;return [clamp(BASE*Math.exp(KK*dd),.25,3.2),clamp(BASE*Math.exp(-KK*dd),.25,3.2)];}
function autoRho(t){return t<2?-0.08:t<2.5?-0.07:t<3?-0.06:t<3.5?-0.05:-0.04;}
function knockoutAdvance(lamH,lamA,rho,R){
  const f=1/3,ET=simulate(lamH*f,lamA*f,rho);
  const diff=(lamH-lamA)/(lamH+lamA),penH=clamp(0.5+0.18*diff,0.38,0.62);
  const advH=R.h+R.d*(ET.h+ET.d*penH),advA=R.a+R.d*(ET.a+ET.d*(1-penH));
  return {advH,advA,penH,pProrroga:R.d*(ET.h+ET.a),pPenales:R.d*ET.d,p90:1-R.d};
}
function possShare(la,lb){const a=Math.pow(la,.6),b=Math.pow(lb,.6);return a/(a+b);}
function teamShots(lam,poss){return lam/(0.13-0.05*poss);}
function teamCorners(shots){return 2.0+0.22*shots;}
function teamPasses(poss){return 250+poss*650;}
function jointGoals(R,preds){let p=0;for(const s of R.scores){if(preds.every(f=>f(s.i,s.j)))p+=s.p;}return p;}
function jointPoisson(mean,preds){let p=0,Kk=Math.max(25,Math.ceil(mean*3));for(let k=0;k<=Kk;k++){const pk=poissonPmf(k,mean);if(preds.every(f=>f(k)))p+=pk;}return p;}
const LEARN={apply:lsGet('rp_learn_apply_v6',true),ready:false,goalAdj:1,cornerAdj:1,cornerReady:false,n:0,accRes:0,accScore:0,accOU:0,accBtts:0,avgErr:0,bias:0,nStats:0,accPoss:0,accCorners:0,accYellow:0};
function applyLearning(la,lb){if(LEARN.apply&&LEARN.ready)return [clamp(la*LEARN.goalAdj,.25,3.2),clamp(lb*LEARN.goalAdj,.25,3.2)];return [la,lb];}
function applyCornerLearn(c){return (LEARN.apply&&LEARN.cornerReady)?c*LEARN.cornerAdj:c;}

/* ═══════════ ESPN ═══════════ */
// Fetch con varios caminos para vencer el bloqueo CORS del navegador:
//  1) directo (sirve cuando la app corre con proxy propio o en hosting sin CORS)
//  2) proxy local /espn?url= (python serve.py)
//  3) proxy público allorigins (último recurso)
async function espnFetch(url){
  try{const r=await fetch(url);if(r.ok)return await r.json();}catch(e){}
  try{const r=await fetch('/espn?url='+encodeURIComponent(url));if(r.ok)return await r.json();}catch(e){}
  try{const r=await fetch('https://api.allorigins.win/raw?url='+encodeURIComponent(url));if(r.ok)return await r.json();}catch(e){}
  return null;
}
async function fetchESPNday(leagueId,ymd){
  const url='https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[leagueId].espn+'/scoreboard'+(ymd?'?dates='+ymd:'');
  const d=await espnFetch(url);return (d&&d.events)||[];
}
/* ═══════════ FORMA RECIENTE POR EQUIPO (ESPN) ═══════════ */
let TEAM_FORM={};                 // esName -> {n, gf, ga, delta, ts} (delta=ajuste de rating por forma real)
let APPLY_FORM=lsGet('rp_app_form_v6',true);
let _formBusy={};
function formKey(){return 'rp_form_'+CURRENT_LEAGUE+'_v6';}
function loadFormCache(){try{TEAM_FORM=JSON.parse(lsGet(formKey(),'{}')||'{}');}catch(e){TEAM_FORM={};}}
function saveFormCache(){lsSet(formKey(),TEAM_FORM);}
function toggleFormCb(cb){APPLY_FORM=cb.checked;lsSet('rp_app_form_v6',!!cb.checked);renderHistory();fillAutoParams(false);runSim(false);}
function formInfo(es){const f=TEAM_FORM[es];return f&&f.n?f:null;}
// Trae los últimos partidos reales del equipo desde ESPN y calcula:
//  GF/GC promedio y "delta": diferencia de gol real vs. la esperada por el rating base
//  (rendimiento ajustado por rival, igual que usa el bracket). Cacheado 6 horas.
async function loadTeamForm(esName,force){
  const ex=TEAM_FORM[esName];
  if(!force&&ex&&ex.n>0&&ex.ts&&(Date.now()-ex.ts<6*3600e3))return ex;
  if(_formBusy[esName])return _formBusy[esName];
  const id=espnTeamId(esName);if(!id)return null;
  const league=CURRENT_LEAGUE;
  const url='https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[league].espn+'/teams/'+id+'/schedule';
  _formBusy[esName]=(async()=>{
    try{
      const d=await espnFetch(url);const evs=(d&&d.events)||[];if(!evs.length)return null;
      const base=findAnyTeam(esName);const br=base?base.s:62;
      let gf=0,ga=0,sumOp=0,n=0;
      evs.forEach(e=>{
        const comp=e.competitions&&e.competitions[0];if(!comp)return;
        const st=comp.status&&comp.status.type;if(!st||!st.completed)return;
        const cs=comp.competitors||[];
        const me=cs.find(c=>c.id===id||(c.team&&c.team.id===id));const opp=cs.find(c=>c!==me);
        if(!me||!opp)return;
        const sv=c=>{const s=c.score;if(s==null)return null;if(typeof s==='object')return s.value!=null?s.value:parseFloat(s);return parseFloat(s);};
        const mgs=sv(me),ogs=sv(opp);if(mgs==null||ogs==null||isNaN(mgs)||isNaN(ogs))return;
        gf+=mgs;ga+=ogs;n++;
        const ot=findAnyTeam((opp.team&&(opp.team.displayName||opp.team.name))||'');
        const or=ot?ot.s:62;
        const [ela,elb]=autoLambdas(br,or);
        const home=me.homeAway==='home';
        sumOp+=(mgs-ogs)-(home?ela-elb:elb-ela);
      });
      if(!n)return null;
      if(CURRENT_LEAGUE!==league)return null;
      const conf=Math.min(n/3,1);
      const delta=clamp((sumOp/n)*14,-13,13)*conf;
      TEAM_FORM[esName]={n,gf,ga,delta,ts:Date.now()};
      saveFormCache();
      return TEAM_FORM[esName];
    }catch(e){return null;}finally{delete _formBusy[esName];}
  })();
  return _formBusy[esName];
}
// Asegura la forma de los dos equipos elegidos y re-simula si llegó data nueva
async function ensureFormFor(esA,esB){
  const before=JSON.stringify([formInfo(esA),formInfo(esB)]);
  await Promise.all([loadTeamForm(esA),loadTeamForm(esB)]);
  const after=JSON.stringify([formInfo(esA),formInfo(esB)]);
  if(after!==before&&state.A===esA&&state.B===esB){fillAutoParams(false);runSim(false);}
}
// Precarga la forma de los equipos de la liga activa (máx 12 por pasada, secuencial)
async function refreshLeagueForm(){
  const pool=poolTeams();
  const need=pool.filter(t=>{const f=TEAM_FORM[t.es];return !(f&&f.n>0&&f.ts&&(Date.now()-f.ts<6*3600e3));}).slice(0,12);
  for(const t of need)await loadTeamForm(t.es);
  if(state.A&&state.B)ensureFormFor(state.A,state.B);
}
function espnParse(ev){
  const comp=ev&&ev.competitions&&ev.competitions[0];if(!comp)return null;
  const cs=comp.competitors||[];
  const home=cs.find(c=>c.homeAway==='home'),away=cs.find(c=>c.homeAway==='away');
  if(!home||!away)return null;
  const st=comp.status&&comp.status.type;const homeId=home.team&&home.team.id;
  let yellow=0,red=0,yA=0,yB=0,rA=0,rB=0;const scorers=[];
  (comp.details||[]).forEach(d=>{
    const isHome=(d.team&&d.team.id)===homeId;
    if(d.yellowCard){yellow++;if(isHome)yA++;else yB++;}
    if(d.redCard){red++;if(isHome)rA++;else rB++;}
    if(d.scoringPlay){const ath=d.athletesInvolved&&d.athletesInvolved[0];
      scorers.push({min:(d.clock&&d.clock.displayValue)||'',name:ath?ath.displayName:'',home:isHome,pen:!!d.penaltyKick,ownGoal:!!d.ownGoal,shootout:!!d.shootout});}});
  function statOnComp(names){const cats=comp.statistics||[];
    for(const n of names){const cat=cats.find(c=>c.name===n);
      if(cat&&cat.groups){const hg=cat.groups.find(g=>g.group&&(g.group.name==='home'||g.group.id==='0'));
        const ag=cat.groups.find(g=>g.group&&(g.group.name==='away'||g.group.id==='1'));
        const hv=hg&&hg.statistics&&hg.statistics[0]!=null?parseFloat(hg.statistics[0].displayValue||hg.statistics[0]):null;
        const av=ag&&ag.statistics&&ag.statistics[0]!=null?parseFloat(ag.statistics[0].displayValue||ag.statistics[0]):null;
        if(hv!=null||av!=null)return {home:hv,away:av};}}
    return null;}
  function statOn(c,names){if(!c||!c.statistics)return null;
    for(const n of names){const a=c.statistics.find(s=>s.name===n);
      if(a!=null&&a.displayValue!=null)return parseFloat(a.displayValue);}
    return null;}
  function bestStat(altNames){const r=statOnComp(altNames);
    if(r)return r;
    return {home:statOn(home,altNames),away:statOn(away,altNames)};}
  const poss=bestStat(['possessionPct','ballPossession','possession']);
  const sh=bestStat(['totalShots','shotsTotal','shots']);
  const sot=bestStat(['shotsOnTarget','shotsOnGoal','sog']);
  const co=bestStat(['wonCorners','corners','cornerKicks']);
  const fo=bestStat(['foulsCommitted','fouls','totalFouls']);
  return {id:ev.id,date:ev.date,
    strHomeTeam:(home.team&&(home.team.displayName||home.team.name))||'',
    strAwayTeam:(away.team&&(away.team.displayName||away.team.name))||'',
    intHomeScore:home.score,intAwayScore:away.score,
    strStatus:st?(st.completed?'FT':(st.state==='pre'?'NS':'IN')):'',
    homeWinner:!!home.winner,awayWinner:!!away.winner,
    homeColor:(home.team&&home.team.color)||null,awayColor:(away.team&&away.team.color)||null,
    homeShootout:home.shootoutScore!=null?home.shootoutScore:null,
    awayShootout:away.shootoutScore!=null?away.shootoutScore:null,
    stats:{homePoss:poss.home,awayPoss:poss.away,homeShots:sh.home,awayShots:sh.away,homeSOT:sot.home,awaySOT:sot.away,homeCorners:co.home,awayCorners:co.away,homeFouls:fo.home,awayFouls:fo.away,yellow,red,yellowA:yA,yellowB:yB,redA:rA,redB:rB,scorers}};
}
function eventMatches(ev,A,B){const set=[norm(ev.strHomeTeam||''),norm(ev.strAwayTeam||'')];const inSet=x=>set.some(s=>s&&x&&(s===x||s.includes(x)||x.includes(s)));return inSet(A)&&inSet(B);}
function windowYmd(date){const base=new Date(date+'T12:00:00Z'),out=[];for(let off=-3;off<=3;off++){const d=new Date(base);d.setUTCDate(d.getUTCDate()+off);out.push(d.toISOString().slice(0,10).replace(/-/g,''));}return out;}
function mapEspnName(name){const t=findAnyTeam(name);return t?t.es:(name||'');}
function compNoteText(comp){if(!comp)return '';let t=comp.altGameNote||'';if(!t&&comp.notes&&comp.notes.length)t=comp.notes.map(n=>n.headline||n.text||'').join(' ');return t;}
function detectPhase(noteText){
  const t=noteText||'';
  const mg=t.match(/Group\s+([A-Z])/i);
  if(mg)return {group:'Grupo '+mg[1].toUpperCase(),knockout:false,label:''};
  const KO=[[/round of 32|dieciseisavos/i,'Dieciseisavos'],[/round of 16|octavos/i,'Octavos de final'],[/quarter|cuartos/i,'Cuartos de final'],[/semi/i,'Semifinal'],[/(3rd|third)\s place|tercer\s puesto/i,'Tercer puesto'],[/final/i,'Final']];
  for(const [re,lab] of KO){if(re.test(t))return {group:'',knockout:true,label:lab};}
  if(CURRENT_LEAGUE!=='worldcup'&&CURRENT_LEAGUE!=='champions')return {group:'',knockout:false,label:''};
  return {group:'',knockout:true,label:'',unknown:true};
}
function espnTeamId(esName){
  const id=ESPN_ID[esName];if(id)return id;
  const t=findAnyTeam(esName);return (t&&t.espn)?String(t.espn):null;
}
function recentAvg(events,teamId){
  let gf=0,ga=0,n=0;
  (events||[]).forEach(e=>{
    const comp=e.competitions&&e.competitions[0];if(!comp)return;
    const st=comp.status&&comp.status.type;if(!st||!st.completed)return;
    const cs=comp.competitors||[];
    const me=cs.find(c=>c.id===teamId||(c.team&&c.team.id===teamId));const opp=cs.find(c=>c!==me);
    if(!me||!opp)return;
    const sv=c=>{const s=c.score;if(s==null)return null;if(typeof s==='object')return s.value!=null?s.value:parseFloat(s);return parseFloat(s);};
    const mgs=sv(me),ogs=sv(opp);
    if(mgs==null||ogs==null||isNaN(mgs)||isNaN(ogs))return;
    gf+=mgs;ga+=ogs;n++;});
  return n?{gf:gf/n,ga:ga/n,n}:null;
}
async function findMatchScore(aN,bN){
  const now=Date.now();
  for(let off=-2;off<=4;off++){
    const ymd=new Date(now+off*864e5).toISOString().slice(0,10).replace(/-/g,'');
    const day=await fetchESPNday(CURRENT_LEAGUE,ymd);
    const de=day.find(x=>{const p=espnParse(x);return p&&eventMatches(p,aN,bN);});
    if(de){const comp=(de.competitions&&de.competitions[0])||{};
      const ph=detectPhase(compNoteText(comp));
      return {date:de.date,venue:(comp.venue&&comp.venue.fullName)||'',city:((comp.venue&&comp.venue.address&&comp.venue.address.city)||'').split(',')[0].trim(),group:ph.group,knockout:ph.knockout,phaseLabel:ph.label};}
  }
  return null;
}
function ctxMsg(m,kind){const el=document.getElementById('ctxMsg');if(el){el.textContent=m;el.style.color=kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)';}}
async function fetchContext(){
  const ta=findAnyTeam(state.A),tb=findAnyTeam(state.B);
  if(!ta||!tb){ctxMsg('No reconozco los equipos.','err');return;}
  ctxMsg('Buscando contexto en ESPN…','load');
  try{
    const idA=espnTeamId(ta.es);
    if(!idA){ctxMsg('No encontré a '+ta.es+' en ESPN. Carga el contexto a mano.','err');return;}
    const dA0=await espnFetch('https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[CURRENT_LEAGUE].espn+'/teams/'+idA+'/schedule');
    if(!dA0)throw 0;
    const events=dA0.events||[];
    const bN=norm(teamEnglish(tb.es)),aN=norm(teamEnglish(ta.es));
    let ev=events.find(e=>{const comps=(e.competitions&&e.competitions[0]&&e.competitions[0].competitors)||[];
      return comps.some(c=>{const n=norm((c.team&&(c.team.displayName||c.team.location))||'');return n&&(n===bN||n.includes(bN)||bN.includes(n));});});
    let info=null;
    if(ev){const comp=ev.competitions[0]||{};
      info={date:ev.date,venue:(comp.venue&&comp.venue.fullName)||'',city:((comp.venue&&comp.venue.address&&comp.venue.address.city)||'').split(',')[0].trim(),group:'',knockout:false,phaseLabel:''};
      try{const day=await fetchESPNday(CURRENT_LEAGUE,ev.date.slice(0,10).replace(/-/g,''));
        const de=day.find(x=>x.id===ev.id);
        const dcomp=(de&&de.competitions&&de.competitions[0])||comp;
        const ph=detectPhase(compNoteText(dcomp));
        info.group=ph.group;info.knockout=ph.knockout;info.phaseLabel=ph.label;}catch(e){}}
    else{info=await findMatchScore(aN,bN);}
    if(!info){ctxMsg('No encontré '+ta.es+' vs '+tb.es+' en ESPN. Carga el contexto a mano.','err');return;}
    const dateStr=fmtDateEs(info.date);
    const phaseTxt=info.group?info.group:(info.knockout?(info.phaseLabel||'Eliminatoria'):'');
    const parts=[];if(phaseTxt)parts.push(phaseTxt);if(info.city)parts.push(info.city);else if(info.venue)parts.push(info.venue);if(dateStr)parts.push(dateStr);
    document.getElementById('ctxInput').value=parts.join(' · ');
    if(info.knockout&&!state.ko){state.ko=true;document.getElementById('koSwitch').classList.add('on');}
    let [laA,laB]=autoLambdas(ta.s,tb.s);const lr=applyLearning(laA,laB);laA=lr[0];laB=lr[1];
    const ra=recentAvg(events,String(idA));let rb=null;
    try{const idB=espnTeamId(tb.es);
      if(idB){const d2=await espnFetch('https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[CURRENT_LEAGUE].espn+'/teams/'+idB+'/schedule');
        if(d2)rb=recentAvg(d2.events||[],String(idB));}}catch(e){}
    let src='rating base';
    if(ra&&rb){const dA=(ra.gf+rb.ga)/2,dB=(rb.gf+ra.ga)/2;
      const w=Math.max(0,Math.min(0.5,0.12*Math.min(ra.n,rb.n)));
      laA=clamp(w*dA+(1-w)*laA,.25,3.2);laB=clamp(w*dB+(1-w)*laB,.25,3.2);src='forma reciente + rating';}
    setParamInputs(laA,laB,autoRho(laA+laB));
    ctxMsg('✓ Contexto y λ cargados ('+src+').'+(ra?' '+ta.es+' GF '+ra.gf.toFixed(1)+'/GC '+ra.ga.toFixed(1)+' ('+ra.n+' pj).':''),'ok');
    runSim(false);
  }catch(e){ctxMsg('No se pudo conectar (CORS/red). Carga el contexto a mano.','err');}
}
/* prompt para IA */
let ASK_PROMPT='';
function buildAsk(){
  const box=document.getElementById('askBox');
  if(!box.classList.contains('hidden')){box.classList.add('hidden');return;}
  const A=state.A,B=state.B;
  const ctxTxt=document.getElementById('ctxInput').value?(' ('+document.getElementById('ctxInput').value+')'):'';
  ASK_PROMPT='Actúa como analista de fútbol. Uso un simulador Poisson bivariado con ajuste Dixon-Coles.\nPARTIDO: '+A+' vs '+B+ctxTxt+'\nBasa los números en DATOS REALES (forma reciente, goles a favor/en contra, córners, bajas, localía, árbitro). Calcula cada valor y devuelve EXACTAMENTE estas 7 líneas con punto decimal:\nLocal=\nVisita=\nRho=\nCorners local=\nCorners visita=\nTarjeta arbitro=\nRojas arbitro=\nRangos: λ 0.2–3.5 · Rho -0.08 a -0.03 · córners 2–8 · amarillas 3–6 · rojas 0.05–0.30. Si un equipo se cierra atrás, baja su λ y usa Rho más negativo. Debajo, 3–5 líneas de razonamiento.';
  box.classList.remove('hidden');
  box.innerHTML='<button class="ghostb" style="margin-bottom:8px" onclick="copyAsk(this)">📋 Copiar prompt</button><pre id="askText"></pre>';
  document.getElementById('askText').textContent=ASK_PROMPT;
}
function copyAsk(btn){
  const done=()=>{const t=btn.textContent;btn.textContent='✓ Copiado';setTimeout(()=>btn.textContent=t,1500);};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(ASK_PROMPT).then(done).catch(()=>{showToast('No se pudo copiar');});}
  else showToast('No se pudo copiar');
}
function togglePaste(){document.getElementById('pasteWrap').classList.toggle('hidden');}
function loadPasted(){
  const txt=document.getElementById('pasteBox').value;
  const msg=document.getElementById('pasteMsg');
  if(!txt.trim()){msg.textContent='Pega la respuesta en el formato indicado.';msg.style.color='var(--mut)';return;}
  const T=txt.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const get=key=>{const re=new RegExp(key+'\\s*=\\s*(-?[0-9]+(?:[.,][0-9]+)?)','i');const m=T.match(re);return m?parseFloat(m[1].replace(',','.')):null;};
  const map=[['local','pLamA'],['visita','pLamB'],['rho','pRho'],['corners local','pCornA'],['corners visita','pCornB'],['tarjeta arbitro','pCardY'],['rojas arbitro','pCardR']];
  let n=0;
  map.forEach(([key,id])=>{const v=get(key);if(v!==null&&!isNaN(v)){document.getElementById(id).value=v;n++;}});
  if(n===0){msg.textContent='No reconocí ningún valor. Revisa el formato (ej: Local=2.45).';msg.style.color='var(--red)';return;}
  msg.textContent='Cargué '+n+' valor(es). Simulando…';msg.style.color='var(--acc)';
  runSim(false);
}

/* ═══════════ HISTORIAL ═══════════ */
let HIST=lsGet('rp_hist_'+CURRENT_LEAGUE+'_v6',[]);
let lastPrediction=null,histShowAll=false;
function persistHist(){lsSet('rp_hist_'+CURRENT_LEAGUE+'_v6',HIST);}
function judge(it){
  const a=it.actualA,b=it.actualB;
  const realRes=a>b?'H':(a===b?'D':'A');
  const j={realRes,hitRes:it.predResult===realRes,hitScore:(it.si===a&&it.sj===b),hitOU:(it.o25>=0.5)===((a+b)>2.5),hitBtts:(it.btts>=0.5)===(a>0&&b>0),predTot:it.xgH+it.xgA,realTot:a+b};
  const s=it.actualStats;
  if(s){if(it.predPossA!=null&&s.possA!=null)j.hitPoss=(it.predPossA>=0.5)===(s.possA>=50);
    if(it.predCornersTot!=null&&s.cornersTot!=null)j.hitCorners=(overLine(it.predCornersTot,9.5)>=0.5)===(s.cornersTot>9.5);
    if(it.predYellowTot!=null&&s.yellowTot!=null)j.hitYellow=(overLine(it.predYellowTot,3.5)>=0.5)===(s.yellowTot>3.5);}
  return j;
}
function computeLearning(){
  const done=HIST.filter(x=>x.actualA!=null&&x.actualB!=null);const n=done.length;
  let res=0,sc=0,ou=0,bt=0,sumP=0,sumR=0,absErr=0,nStats=0,hp=0,hc=0,hy=0,sumPC=0,sumRC=0;
  done.forEach(it=>{const j=judge(it);
    if(j.hitRes)res++;if(j.hitScore)sc++;if(j.hitOU)ou++;if(j.hitBtts)bt++;
    sumP+=j.predTot;sumR+=j.realTot;absErr+=Math.abs(j.predTot-j.realTot);
    if(it.actualStats){nStats++;if(j.hitPoss)hp++;if(j.hitCorners)hc++;if(j.hitYellow)hy++;
      if(it.predCornersTot!=null&&it.actualStats.cornersTot!=null){sumPC+=it.predCornersTot;sumRC+=it.actualStats.cornersTot;}}});
  Object.assign(LEARN,{n,accRes:res,accScore:sc,accOU:ou,accBtts:bt,avgErr:n?absErr/n:0,bias:n?(sumR-sumP)/n:0,nStats,accPoss:hp,accCorners:hc,accYellow:hy,
    cornerAdj:(nStats>=3&&sumPC>0)?clamp(sumRC/sumPC,.7,1.4):1,cornerReady:nStats>=3&&sumPC>0,
    goalAdj:(n>=3&&sumP>0)?clamp(sumR/sumP,.8,1.25):1,ready:n>=3});
}
function savePrediction(){
  if(!lastPrediction){document.getElementById('saveMsg').textContent='Simula un partido primero.';return;}
  HIST.unshift(Object.assign({},lastPrediction,{id:Date.now()+'-'+Math.random().toString(36).slice(2,7),ts:Date.now(),actualA:null,actualB:null}));
  persistHist();computeLearning();renderHistory();renderDashboard();renderStatsView();renderResumen();
  document.getElementById('saveMsg').textContent='✓ Guardada en el historial';
  setTimeout(()=>{const e=document.getElementById('saveMsg');if(e)e.textContent='';},2600);
}
function setResult(id){const it=HIST.find(x=>x.id===id);if(!it)return;
  const a=parseInt(document.getElementById('ra_'+id).value,10),b=parseInt(document.getElementById('rb_'+id).value,10);
  if(isNaN(a)||isNaN(b)||a<0||b<0){showToast('Carga un marcador válido');return;}
  it.actualA=a;it.actualB=b;persistHist();computeLearning();renderHistory();renderDashboard();renderStatsView();renderCartilla();renderResumen();}
function delItem(id){HIST=HIST.filter(x=>x.id!==id);persistHist();computeLearning();renderHistory();renderDashboard();renderStatsView();}
function clearHistory(){if(!HIST.length)return;if(!confirm('¿Vaciar el historial de '+LEAGUES[CURRENT_LEAGUE].name+'?'))return;HIST=[];persistHist();computeLearning();renderHistory();renderDashboard();renderStatsView();renderCartilla();}
function toggleHistAll(){histShowAll=!histShowAll;renderHistory();}
function toggleDetail(id){const d=document.getElementById('det_'+id),c=document.getElementById('cv_'+id);if(!d)return;const hid=d.classList.toggle('hidden');if(c)c.textContent=hid?'▸':'▾';}
function toggleLearnCb(cb){LEARN.apply=cb.checked;lsSet('rp_learn_apply_v6',cb.checked);renderHistory();}
function buildFromESPN(ev){
  const p=espnParse(ev);if(!p)return null;
  if(p.intHomeScore==null||p.intHomeScore===''||p.intAwayScore==null||p.intAwayScore==='')return null;
  const ta=findAnyTeam(p.strHomeTeam)||{es:p.strHomeTeam||'?',s:62};
  const tb=findAnyTeam(p.strAwayTeam)||{es:p.strAwayTeam||'?',s:62};
  let [la,lb]=autoLambdas(ta.s,tb.s);const rho=autoRho(la+lb);
  const R=simulate(la,lb,rho);const best=R.scores[0];
  const favO=R.h>=R.d&&R.h>=R.a?'H':(R.a>=R.d?'A':'D');
  const possA=possShare(la,lb),shA=teamShots(la,possA),shB=teamShots(lb,1-possA);
  const coTot=teamCorners(shA)+teamCorners(shB);
  const hs=parseInt(p.intHomeScore,10),as=parseInt(p.intAwayScore,10);
  return {id:'imp-'+(ev.id||Math.random().toString(36).slice(2)),espnId:ev.id||null,ts:Date.now(),
    A:ta.es,B:tb.es,ctx:LEAGUES[CURRENT_LEAGUE].name+(ev.date?(' · '+ev.date.slice(0,10)):''),
    lamH:la,lamA:lb,rho,pH:R.h,pD:R.d,pA:R.a,predResult:favO,
    si:best.i,sj:best.j,sp:best.p,xgH:R.xgH,xgA:R.xgA,o25:R.o25,btts:R.btts,
    predPossA:possA,predShotsA:shA,predShotsB:shB,predCornersTot:coTot,predYellowTot:4.2,
    actualA:hs,actualB:as,
    actualStats:{possA:p.stats.homePoss,possB:p.stats.awayPoss,shotsA:p.stats.homeShots,shotsB:p.stats.awayShots,
      cornersTot:(p.stats.homeCorners||0)+(p.stats.awayCorners||0),yellowTot:p.stats.yellow,scorers:p.stats.scorers}};
}
function setStatusH(id,msg,kind){const el=document.getElementById('st_'+id);if(el){el.textContent=msg;el.style.color=kind==='ok'?'var(--acc)':kind==='err'?'var(--red)':'var(--mut)';}}
async function fetchResult(id){
  const it=HIST.find(x=>x.id===id);if(!it)return;
  setStatusH(id,'Buscando resultado…');
  const date=parseCtxDateSafe(it.ctx);
  const A=norm(teamEnglish(it.A)),B=norm(teamEnglish(it.B));
  let ev=null;
  try{
    const days=date?windowYmd(date):[new Date().toISOString().slice(0,10).replace(/-/g,'')];
    for(const ymd of days){
      const parsed=(await fetchESPNday(CURRENT_LEAGUE,ymd)).map(espnParse).filter(Boolean);
      ev=parsed.find(e=>eventMatches(e,A,B));if(ev)break;}
    if(!ev){setStatusH(id,'No encontré '+it.A+' vs '+it.B+' en ESPN. Cárgalo a mano.','err');return;}
    if(ev.intHomeScore==null||ev.intHomeScore===''||ev.intAwayScore==null||ev.intAwayScore===''){setStatusH(id,'El partido aún no tiene marcador final.','mut');return;}
    if(!/FT/.test(ev.strStatus)){setStatusH(id,'El partido todavía no terminó.','mut');return;}
    const hs=parseInt(ev.intHomeScore,10),as=parseInt(ev.intAwayScore,10);
    const homeIsA=norm(ev.strHomeTeam||'')===A||norm(ev.strHomeTeam||'').includes(A)||A.includes(norm(ev.strHomeTeam||''));
    it.actualA=homeIsA?hs:as;it.actualB=homeIsA?as:hs;
    if(ev.stats){const s=ev.stats,pick=(h,a)=>homeIsA?h:a;
      it.actualStats={possA:pick(s.homePoss,s.awayPoss),possB:pick(s.awayPoss,s.homePoss),
        shotsA:pick(s.homeShots,s.awayShots),shotsB:pick(s.awayShots,s.homeShots),
        cornersTot:(s.homeCorners||0)+(s.awayCorners||0),yellowTot:s.yellow,scorers:s.scorers};}
    persistHist();computeLearning();renderHistory();renderDashboard();renderStatsView();renderCartilla();
  }catch(e){setStatusH(id,'No se pudo conectar (CORS/red). Cárgalo a mano.','err');}
}
function parseCtxDateSafe(ctx){if(!ctx)return null;const t=ctx.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const m=t.match(/(\d{1,2})\s+([a-z]{3,}).?\s+(\d{4})/);if(!m)return null;const MO={ene:'01',feb:'02',mar:'03',abr:'04',may:'05',jun:'06',jul:'07',ago:'08',sep:'09',oct:'10',nov:'11',dic:'12'};const mon=MO[m[2].slice(0,3)];if(!mon)return null;return m[3]+'-'+mon+'-'+String(m[1]).padStart(2,'0');}
async function fetchAllPending(){
  const pend=HIST.filter(x=>x.actualA==null);
  if(!pend.length){showToast('No hay predicciones pendientes');return;}
  for(const it of pend){await fetchResult(it.id);}
  showToast('Búsqueda terminada');
}
/* ═══════════ FIX 2 · IMPORTAR TEMPORADA COMPLETA (no solo agosto) ═══════════ */
/* ═══════════ FIX 2 · IMPORTAR TEMPORADA COMPLETA (no solo agosto) ═══════════ */
const SEASON_START={
  worldcup:Date.UTC(2026,5,11),
  premier:Date.UTC(2026,7,8),laliga:Date.UTC(2026,7,15),bundes:Date.UTC(2026,7,21),
  seriea:Date.UTC(2026,7,22),ligue1:Date.UTC(2026,7,14),
  champions:Date.UTC(2026,6,7),champions_classif:Date.UTC(2026,6,7),
  argentina:Date.UTC(2026,0,23),chile:Date.UTC(2026,1,6),
  libertadores:Date.UTC(2026,1,3),sudamericana:Date.UTC(2026,1,3),
  // Mapeo directo para las ligas locales
  liga_arg:Date.UTC(2026,0,23),liga_chil:Date.UTC(2026,1,6)
};

window.importPlayed=async function(){
  const msg=document.getElementById('importMsg');
  const set=(t,c)=>{if(msg){msg.textContent=t;msg.style.color=c||'var(--mut)';}};
  const id=CURRENT_LEAGUE;
  
  // Fechas base
  let start=SEASON_START[id]||Date.UTC(2026,7,1);
  const end=Date.now();
  
  const days=[];
  for(let t=start;t<=end;t+=864e5) days.push(new Date(t).toISOString().slice(0,10).replace(/-/g,''));
  
  set('Importando temporada completa de '+LEAGUES[id].name+' (0/'+days.length+' días)…');
  
  const byId={},byKey={};
  HIST.forEach(x=>{if(x.actualA!=null){if(x.espnId)byId[x.espnId]=x;byKey['tm:'+norm(x.A)+'|'+norm(x.B)+'|'+x.actualA+'-'+x.actualB]=x;}});
  
  let added=0,refreshed=0,scanned=0;
  
  // CHUNK SIZE: 10 para internacionales, 3 para locales (argentina/chile/liga_arg/liga_chil) para evitar timeout
  let CH = 10;
  if((id==='argentina'||id==='chile'||id==='liga_arg'||id==='liga_chil') && days.length > 30) CH = 3; 

  const fetchWithRetry = async (dateStr) => {
    try {
      return await fetchESPNday(id, dateStr);
    } catch (e) {
      console.warn(`Reintentando ${dateStr}...`, e);
      await new Promise(r=>setTimeout(r, 500));
      return await fetchESPNday(id, dateStr);
    }
  };

  try{
    for(let i=0;i<days.length;i+=CH){
      const chunk=days.slice(i,i+CH);
      const res=await Promise.all(chunk.map(d=>fetchWithRetry(d)));
      
      res.forEach(events=>{(events||[]).forEach(ev=>{
        const stt=ev.competitions&&ev.competitions[0]&&ev.competitions[0].status&&ev.competitions[0].status.type;
        if(!stt||!stt.completed)return;
        const it=buildFromESPN(ev);if(!it)return;
        const k='tm:'+norm(it.A)+'|'+norm(it.B)+'|'+it.actualA+'-'+it.actualB;
        const prev=byKey[k]||(it.espnId?byId[it.espnId]:null);
        if(prev){if(prev.actualStats&&prev.actualStats.cornersTot==null&&it.actualStats){prev.actualStats=it.actualStats;refreshed++;}return;}
        byKey[k]=it;if(ev.id)byId[ev.id]=it;
        it.ts=Date.now()+added;
        HIST.push(it);added++;
      });});
      
      scanned+=chunk.length;
      set('Importando '+LEAGUES[id].name+'… '+Math.round(scanned/days.length*100)+'% ('+added+' partidos)');
      
      // Pequeña pausa cada 3 tandas para no saturar la API en ligas locales
      if(CH===3 && (i/CH)%3===0 && i>0) await new Promise(r=>setTimeout(r, 300));
    }
  }catch(e){set('Error al importar (red/CORS).','var(--red)');console.error(e);return;}
  
  if(added||refreshed){persistHist();computeLearning();renderHistory();renderDashboard();renderStatsView();renderCartilla();renderResumen();}
  const parts=[];
  if(added)parts.push('importé '+added+' partido'+(added!==1?'s':''));
  if(refreshed)parts.push('actualicé stats de '+refreshed+' partido'+(refreshed!==1?'s':''));
  set(parts.length?('✓ '+parts.join(' y ')+' de '+LEAGUES[id].name+'.'):'Sin novedades.','var(--acc)');
  if(typeof showToast==='function')showToast(parts.length?parts.join(' + '):'Sin novedades');
};
function loadBulkResults(){
  const txt=(document.getElementById('bulkBox').value||'').trim();
  const msg=document.getElementById('bulkMsg');
  if(!txt){msg.textContent='Pega al menos una línea.';msg.style.color='var(--mut)';return;}
  let ok=0;const fail=[];
  txt.split(/\n+/).forEach(line=>{
    const t=line.trim();if(!t)return;
    const m=t.match(/^(.+?)\s+(\d+)\s*(?:-|:|a)\s*(\d+)\s+(.+)$/i);
    if(!m){fail.push(t);return;}
    const n1=norm(m[1]),s1=parseInt(m[2],10),s2=parseInt(m[3],10),n2=norm(m[4]);
    const match=(a,b)=>a&&b&&(a===b||a.includes(b)||b.includes(a));
    let it=HIST.find(x=>match(norm(x.A),n1)&&match(norm(x.B),n2));
    if(it){it.actualA=s1;it.actualB=s2;ok++;return;}
    it=HIST.find(x=>match(norm(x.A),n2)&&match(norm(x.B),n1));
    if(it){it.actualA=s2;it.actualB=s1;ok++;return;}
    fail.push(t);});
  if(ok){persistHist();computeLearning();renderHistory();renderDashboard();renderStatsView();renderCartilla();}
  msg.style.color=ok?'var(--acc)':'var(--red)';
  msg.textContent='Cargué '+ok+' resultado(s).'+(fail.length?' Sin emparejar: '+fail.join(' · '):'');
  if(ok)document.getElementById('bulkBox').value='';
}
function renderHistory(){
  const learn=document.getElementById('learnStats');const n=LEARN.n;
  if(n===0){learn.innerHTML='<div class="empty">Aún no hay resultados cargados. Guarda predicciones y carga los marcadores reales: con 3 o más, el modelo calibra los goles.</div>'+
    '<label class="learn-toggle"><input type="checkbox" checked disabled> Rating base (siempre activo)</label>'+
    '<label class="learn-toggle"><input type="checkbox" '+(LEARN.apply?'checked':'')+' disabled onchange="toggleLearnCb(this)"> Calibración por partidos jugados</label>'+
    '<label class="learn-toggle"><input type="checkbox" '+(APPLY_FORM?'checked':'')+' onchange="toggleFormCb(this)"> Forma reciente ajustada por rival (ESPN)</label>';}
  else{
    const frac=x=>x+'/'+n+' <span style="color:var(--gray)">('+(100*x/n).toFixed(0)+'%)</span>';
    const biasTxt=LEARN.bias>0.10?('subestimando goles (+'+LEARN.bias.toFixed(2)+')'):(LEARN.bias<-0.10?('sobreestimando goles ('+LEARN.bias.toFixed(2)+')'):'bien calibrado');
    learn.innerHTML='<div class="learn-grid">'+
      '<div class="learn-cell"><small>Con resultado</small><b>'+n+'</b></div>'+
      '<div class="learn-cell"><small>Acierto resultado</small><b>'+frac(LEARN.accRes)+'</b></div>'+
      '<div class="learn-cell"><small>Marcador exacto</small><b>'+frac(LEARN.accScore)+'</b></div>'+
      '<div class="learn-cell"><small>Over/Under 2.5</small><b>'+frac(LEARN.accOU)+'</b></div>'+
      '<div class="learn-cell"><small>Ambos marcan</small><b>'+frac(LEARN.accBtts)+'</b></div>'+
      '<div class="learn-cell"><small>Error goles</small><b>'+LEARN.avgErr.toFixed(2)+'</b></div></div>'+
      '<p style="font-size:12px;color:var(--mut)">Diagnóstico: <b style="color:var(--txt)">'+biasTxt+'</b>. Calibración '+(LEARN.ready?'<b style="color:var(--gold)">×'+LEARN.goalAdj.toFixed(3)+'</b>':'(requiere 3+ resultados)')+(LEARN.cornerReady?' · córners <b style="color:var(--gold)">×'+LEARN.cornerAdj.toFixed(3)+'</b>':'')+'.</p>'+
      '<label class="learn-toggle"><input type="checkbox" checked disabled> Rating base (siempre activo)</label>'+
      '<label class="learn-toggle"><input type="checkbox" '+(LEARN.apply?'checked':'')+' '+(LEARN.ready?'':'disabled')+' onchange="toggleLearnCb(this)"> Calibración por partidos jugados</label>'+
      '<label class="learn-toggle"><input type="checkbox" '+(APPLY_FORM?'checked':'')+' onchange="toggleFormCb(this)"> Forma reciente ajustada por rival (ESPN)</label>';
  }
  const list=document.getElementById('histList');
  if(!HIST.length){list.innerHTML='<div class="empty">Sin predicciones guardadas.</div>';return;}
  const bdg=(ok,t)=>'<span class="badge '+(ok?'ok':'no')+'">'+(ok?'✓':'✗')+' '+t+'</span>';
  const items=HIST.slice().sort((a,b)=>(b.ts||0)-(a.ts||0));
  const shown=histShowAll?items:items.slice(0,5);
  list.innerHTML=shown.map(it=>{
    const done=it.actualA!=null;
    const predTxt=it.predResult==='H'?'Gana '+it.A:it.predResult==='A'?'Gana '+it.B:'Empate';
    let icons,realChip;
    if(done){const j0=judge(it);
      const dot=(ok,t)=>'<span class="hr-dot '+(ok?'ok':'no')+'" title="'+t+'">'+(ok?'✓':'✗')+'</span>';
      icons=dot(j0.hitRes,'Resultado')+dot(j0.hitScore,'Marcador')+dot(j0.hitOU,'O/U 2.5')+dot(j0.hitBtts,'BTTS');
      realChip='<span class="hr-real">real '+it.A+' '+it.actualA+'-'+it.actualB+' '+it.B+'</span>';
    }else{icons='<span class="hr-pend">⏳ pendiente</span>';realChip='<span class="hr-real">'+(it.ctx||'')+'</span>';}
    const row='<div class="hist-row" onclick="toggleDetail(\''+it.id+'\')"><span class="hr-match">'+it.A+' '+it.si+'-'+it.sj+' '+it.B+'</span>'+realChip+'<span class="hr-icons">'+icons+'</span><span class="chev" id="cv_'+it.id+'">▸</span><button class="del-x" onclick="event.stopPropagation();delItem(\''+it.id+'\')">✕</button></div>';
    let detail;
    if(!done){
      detail='<div class="hist-meta">'+(it.ctx||'')+' · pred: '+predTxt+' · '+it.si+'-'+it.sj+' ('+pc(it.sp)+')</div>'+
        '<div class="res-in"><span>Real:</span><input type="number" min="0" id="ra_'+it.id+'"><span>-</span><input type="number" min="0" id="rb_'+it.id+'"><button class="go" onclick="setResult(\''+it.id+'\')">Guardar</button><button class="ghostb" onclick="fetchResult(\''+it.id+'\')">🔎 Buscar</button></div><div style="margin-top:6px;font-size:11px" id="st_'+it.id+'"></div>';
    }else{
      const j=judge(it);let extra='';const s=it.actualStats;
      const metaPct=it.sp!=null?' ('+pc(it.sp)+')':'';
      const meta2=it.si2!=null?' · 2.º: '+it.si2+'-'+it.sj2+(it.sp2!=null?' ('+pc(it.sp2)+')':''):'';
      const ouP=it.o25>=0.5?'Over 2.5':'Under 2.5', btP=it.btts>=0.5?'Sí':'No';
      if(s){
        let mb='';
        if(j.hitPoss!=null)mb+=bdg(j.hitPoss,'Posesión');
        if(j.hitCorners!=null)mb+=bdg(j.hitCorners,'Córners 9.5 · hubo '+s.cornersTot);
        if(j.hitYellow!=null)mb+=bdg(j.hitYellow,'Amarillas 3.5 · hubo '+s.yellowTot);
        const row2=(lab,p,r)=>'<tr><td>'+lab+'</td><td class="r">'+p+'</td><td class="r"><b>'+r+'</b></td></tr>';
        extra='<div class="badges" style="margin-top:8px">'+mb+'</div>'+
          '<table class="hr-table"><thead><tr><th>Mercado</th><th class="r">Predicho</th><th class="r">Real</th></tr></thead><tbody>'+
          row2('Goles totales',(it.xgH+it.xgA).toFixed(2),it.actualA+it.actualB)+
          row2('Posesión '+it.A,it.predPossA!=null?(it.predPossA*100).toFixed(0)+'%':'–',s.possA!=null?s.possA.toFixed(0)+'%':'–')+
          row2('Remates '+it.A,it.predShotsA!=null?it.predShotsA.toFixed(0):'–',s.shotsA!=null?s.shotsA:'–')+
          row2('Córners totales',it.predCornersTot!=null?it.predCornersTot.toFixed(1):'–',s.cornersTot!=null?s.cornersTot:'–')+
          row2('Amarillas totales',it.predYellowTot!=null?it.predYellowTot.toFixed(1):'–',s.yellowTot!=null?s.yellowTot:'–')+
          '</tbody></table>';
        if(s.scorers&&s.scorers.length)extra+='<div style="margin-top:7px">⚽ '+s.scorers.map(g=>g.min+' '+g.name).join(' · ')+'</div>';}
      detail='<div class="hist-meta">'+(it.ctx||'')+' · pred: '+predTxt+' · marcador '+it.si+'-'+it.sj+metaPct+meta2+'</div>'+
        '<div class="badges">'+bdg(j.hitRes,'Resultado')+bdg(j.hitScore,'Marcador')+bdg(j.hitOU,'Goles: '+ouP+' · hubo '+(it.actualA+it.actualB))+bdg(j.hitBtts,'Ambos marcan: '+btP)+'</div>'+extra;
    }
    return row+'<div class="hist-detail hidden" id="det_'+it.id+'">'+detail+'</div>';
  }).join('')+(items.length>5?'<div style="margin-top:8px"><button class="ghostb" onclick="toggleHistAll()">'+(histShowAll?'▲ Menos':'▼ Ver más')+'</button></div>':'');
}
function renderDashboard(){
  const el=document.getElementById('rendBody');
  const done=HIST.filter(x=>x.actualA!=null&&x.actualB!=null);const n=done.length;
  if(!n){el.innerHTML='<div class="empty">No hay partidos con resultado real. Guarda predicciones e importa resultados.</div>';return;}
  let res=0,sc=0,ou=0,bt=0,sumP=0,sumR=0,absErr=0,maxRacha=0,last10ok=0;
  done.forEach((it,i)=>{const j=judge(it);
    if(j.hitRes)res++;if(j.hitScore)sc++;if(j.hitOU)ou++;if(j.hitBtts)bt++;
    sumP+=j.predTot;sumR+=j.realTot;absErr+=Math.abs(j.predTot-j.realTot);
    if(j.hitRes){maxRacha=Math.max(maxRacha,(i>0&&judge(done[i-1]).hitRes?maxRacha:0)+1);}
    if(i>=n-10&&j.hitRes)last10ok++;});
  let rachaAct=0;for(let i=done.length-1;i>=0;i--){if(judge(done[i]).hitRes)rachaAct++;else break;}
  const avgErr=absErr/n,bias=sumR-sumP;
  const roi=done.reduce((acc,it)=>{const j=judge(it);if(!j.hitRes)return acc-10;const odds=j.realRes==='D'?3.3:(j.realRes==='H'?2.1:3.0);return acc+10*(odds-1);},0);
  let html='<div class="rend-grid">'+
    '<div class="rend-cell"><b>'+n+'</b><span>Partidos</span></div>'+
    '<div class="rend-cell"><b>'+pc(res/n)+'</b><span>Resultado</span></div>'+
    '<div class="rend-cell gold"><b>'+pc(sc/n)+'</b><span>Exacto</span></div>'+
    '<div class="rend-cell blue"><b>'+pc(ou/n)+'</b><span>O/U 2.5</span></div>'+
    '<div class="rend-cell"><b>'+pc(bt/n)+'</b><span>BTTS</span></div>'+
    '<div class="rend-cell gold"><b>'+avgErr.toFixed(2)+'</b><span>Error</span></div>'+
    '<div class="rend-cell '+(bias>0?'red':'')+'"><b>'+(bias>0?'+':'')+bias.toFixed(2)+'</b><span>Sesgo</span></div></div>';
  html+='<div class="rlab"><span>Acertados <b>'+res+'/'+n+'</b></span><span>'+pc(res/n)+'</span></div><div class="rbar"><div class="rfill" data-w="'+(res/n*100)+'"></div></div>';
  html+='<div class="rlab"><span>Fallados <b>'+(n-res)+'/'+n+'</b></span><span>'+pc(1-res/n)+'</span></div><div class="rbar"><div class="rfill" data-w="'+((n-res)/n*100)+'" style="background:linear-gradient(90deg,var(--red),#a04050)"></div></div>';
  html+='<p style="font-size:12.5px;color:var(--mut);line-height:1.9">Racha actual: <b style="color:var(--txt)">'+rachaAct+'</b> · Mejor racha: <b style="color:var(--txt)">'+maxRacha+'</b> · Últimos 10: <b style="color:var(--txt)">'+last10ok+'/10</b><br>ROI simulado ($10 al favorito): <b style="color:'+(roi>=0?'var(--acc)':'var(--red)')+';font-size:15px">'+(roi>=0?'+':'')+'$'+roi.toFixed(2)+'</b></p>';
  const mk=[['Resultado',res/n],['Marcador exacto',sc/n],['Over/Under 2.5',ou/n],['Ambos marcan',bt/n]];
  if(done.some(x=>x.actualStats)){const st=done.filter(x=>x.actualStats);
    mk.push(['Posesión',st.filter(x=>judge(x).hitPoss).length/st.length],['Córners 9.5',st.filter(x=>judge(x).hitCorners).length/st.length],['Amarillas 3.5',st.filter(x=>judge(x).hitYellow).length/st.length]);}
  html+='<div class="panel-h" style="margin-top:8px"><h3>Por mercado</h3><span class="rule"></span></div>'+mk.map(m=>'<div class="mktrow"><span class="mname">'+m[0]+'</span><span class="mseg"><span class="mfill" data-w="'+(m[1]*100)+'"></span></span><span class="mp">'+pc(m[1])+'</span></div>').join('');
  el.innerHTML=html;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{el.querySelectorAll('[data-w]').forEach(f=>f.style.width=f.dataset.w+'%');}));
}

/* ═══════════ NOTIFICACIONES DE GOL ═══════════ */
let NOTIF_ON=lsGet('rp_notif_v1',false);let _prevScores={};
function updateNotifBtn(){const b=document.getElementById('notifBtn');if(b){b.textContent=NOTIF_ON?'🔔':'🔕';b.classList.toggle('on',NOTIF_ON);}}
function toggleNotifs(){
  if(!('Notification' in window)){showToast('Este navegador no soporta notificaciones');return;}
  if(!NOTIF_ON){
    Notification.requestPermission().then(p=>{
      if(p==='granted'){NOTIF_ON=true;lsSet('rp_notif_v1',true);updateNotifBtn();showToast('🔔 Avisos de gol activados (mientras la app está abierta)');}
      else showToast('Permiso denegado en el navegador');});
  }else{NOTIF_ON=false;lsSet('rp_notif_v1',false);updateNotifBtn();showToast('Notificaciones desactivadas');}
}
function checkGoalNotifs(flat){
  if(!NOTIF_ON||!('Notification' in window)||Notification.permission!=='granted')return;
  flat.forEach(m=>{
    if(m.state!=='in'||m.hs==null||m.as==null)return;
    const k=m.league+'|'+m.A+'|'+m.B;
    const prev=_prevScores[k];const cur=m.hs+m.as;
    if(prev!=null&&cur>prev){
      try{new Notification('⚽ GOL · '+m.A+' '+m.hs+'-'+m.as+' '+m.B,{body:(LEAGUES[m.league]?LEAGUES[m.league].name:'')+' · en vivo'});}catch(e){}
      showToast('⚽ GOL: '+m.A+' '+m.hs+'-'+m.as+' '+m.B);
    }
    _prevScores[k]=cur;});
}

/* ═══════════ EN VIVO + TICKER ═══════════ */
let LV_DATE=new Date(),liveFilter='all',_liveFlat=[],_tickerFlat=[],_lvLoading=false,_tkrLoading=false,_tickerAt=0,_lvAt=0,_autoSyncRunning=false;
function setLiveFilter(f){liveFilter=f;document.querySelectorAll('.lv-segbtn').forEach(b=>b.classList.toggle('on',b.dataset.f===f));renderLive();}
function lvMove(d){LV_DATE=new Date(LV_DATE.getTime()+d*864e5);renderLive(true);}
function lvSet(ymd){LV_DATE=new Date(ymd.slice(0,4)+'-'+ymd.slice(4,6)+'-'+ymd.slice(6,8)+'T12:00:00');renderLive(true);}
async function fetchDayGroups(ymd){
  const results=await Promise.all(Object.keys(LEAGUES).map(async id=>{
    try{const evs=await fetchESPNday(id,ymd);return{id,events:evs};}catch(e){return{id,events:[]};}}));
  const groups=[],flat=[];
  results.forEach(r=>{
    if(!r.events.length)return;
    const evs=[];
    r.events.forEach(ev=>{
      const comp=ev.competitions&&ev.competitions[0];if(!comp)return;
      const cs=comp.competitors||[];
      const home=cs.find(c=>c.homeAway==='home'),away=cs.find(c=>c.homeAway==='away');
      if(!home||!away)return;
      const stt=comp.status&&comp.status.type;const state=stt.state||'pre';
      const homeId=home.team&&home.team.id;const sc=[];
      (comp.details||[]).forEach(d=>{
        if(d.scoringPlay&&!d.shootout){const ath=d.athletesInvolved&&d.athletesInvolved[0];
          sc.push({min:(d.clock&&d.clock.displayValue)||'',name:ath?ath.displayName:''});}});
      const m={league:r.id,A:mapEspnName((home.team&&(home.team.displayName||home.team.name))||''),
        B:mapEspnName((away.team&&(away.team.displayName||away.team.name))||''),
        hs:home.score!=null?parseInt(home.score,10):null,as:away.score!=null?parseInt(away.score,10):null,
        state,date:ev.date||'',label:state==='pre'?fmtKick(ev.date):(stt.shortDetail||stt.displayClock||(state==='post'?'FT':'')),scorers:sc};
      m.idx=flat.length;flat.push(m);evs.push(m);
      m.ev=ev;m.id=ev.id;});
    if(evs.length)groups.push({id:r.id,evs});});
  return {groups,flat};
}
async function renderLive(force){
  const body=document.getElementById('lvBody'),strip=document.getElementById('lvDateStrip');
  const dias=['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'];
  const sel=new Date(LV_DATE);sel.setHours(0,0,0,0);
  const today=new Date();today.setHours(0,0,0,0);
  strip.innerHTML=[-2,-1,0,1,2].map(i=>{
    const d=new Date(sel.getTime()+i*864e5);
    const on=d.getTime()===sel.getTime();
    return '<button class="lv-day'+(on?' on':'')+'" onclick="lvSet(\''+ymdLocal(d)+'\')"><span class="dw">'+(d.getTime()===today.getTime()?'HOY':dias[d.getDay()])+'</span><span class="dn">'+d.getDate()+'</span></button>';}).join('');
  if(_lvLoading&&!force)return;_lvLoading=true;
  body.innerHTML='<div class="empty">Cargando partidos…</div>';
  try{
    const {groups,flat}=await fetchDayGroups(ymdLocal(sel));
    _liveFlat=flat;_lvAt=Date.now();checkGoalNotifs(flat);
    const nLive=flat.filter(m=>m.state==='in').length;
    document.getElementById('lvCountPill').textContent=flat.length+' partido'+(flat.length!==1?'s':'');
    document.getElementById('lvTitle').textContent=(sel.getTime()===today.getTime())?'Partidos de hoy':'Partidos del día';
    const slc=document.getElementById('sideLiveCnt');if(slc)slc.textContent=nLive>0?('🔴'+nLive):'–';
    const shown=groups.map(g=>({id:g.id,evs:liveFilter==='live'?g.evs.filter(e=>e.state==='in'):g.evs})).filter(g=>g.evs.length);
    if(!shown.length){body.innerHTML='<div class="empty">No hay partidos '+(liveFilter==='live'?'en vivo ':'')+'en esta fecha.</div>';_lvLoading=false;return;}
    body.innerHTML=shown.map(g=>{
      const L=LEAGUES[g.id];
      const nLiveG=g.evs.filter(e=>e.state==='in').length;
      return '<div><div class="lv2-grp-h">'+
        '<span class="lv2-logo">'+leagueLogoHTML(g.id,20)+'</span>'+
        '<span class="lv2-gname">'+L.name+'</span>'+
        '<span class="lv2-gcount">'+g.evs.length+'</span>'+
        '<span class="lv2-gsub">'+(nLiveG>0?nLiveG+' en vivo':'Jornada del día')+'</span>'+
        '<button class="lv2-chev" onclick="this.closest(\'div\').parentElement.querySelectorAll(\'.lv2-match\').forEach(m=>m.classList.toggle(\'hidden\'))">▾</button></div>'+
        g.evs.map(m=>{
          const hasScore=m.hs!=null&&m.as!=null;
          const hWin=hasScore&&m.hs>m.as,aWin=hasScore&&m.as>m.hs;
          return '<div class="lv2-match'+(m.state==='in'?' live':'')+'" id="lvCard-'+m.idx+'" onclick="openLiveInPlace(_liveFlat['+m.idx+'])">'+
            '<div class="lv2-inner"><div class="lv2-status">'+(m.state==='in'?'En vivo':(m.state==='post'?'Final':m.label))+'</div>'+
            '<div><div class="lv2-main">'+
            '<div class="lv2-team home"><span class="lv2-name'+(hWin?' win':'')+'">'+m.A+'</span>'+crestHTML(m.A,20)+'</div>'+
            '<div class="lv2-score"><b>'+(m.hs!=null?m.hs:'–')+'</b><i>|</i><b>'+(m.as!=null?m.as:'–')+'</b></div>'+
            '<div class="lv2-team away">'+crestHTML(m.B,20)+'<span class="lv2-name'+(aWin?' win':'')+'">'+m.B+'</span></div>'+
            '</div>'+
            (m.scorers.length?'<div class="lv2-events">'+m.scorers.slice(0,4).map(s=>'<span><b>'+s.min+'</b> '+s.name+'</span>').join('')+'</div>':'')+
            '</div></div></div>';}).join('')+'</div>';}).join('');
  }catch(e){body.innerHTML='<div class="empty">Error al cargar. <button class="ghostb" onclick="renderLive(true)">Reintentar</button></div>';}
  if(_liveOpenMatch){
    const fresh=_liveFlat.find(x=>x.idx===_liveOpenMatch.idx);
    const card=document.getElementById('lvCard-'+_liveOpenMatch.idx);
    if(fresh&&card){
      _liveOpenMatch=fresh;
      let box=el('lvCompareBox');
      if(!box){box=document.createElement('div');box.id='lvCompareBox';}
      card.after(box);
      renderLiveCompare();
    }else{
      const box=el('lvCompareBox');
      if(box)box.remove();
      _liveOpenMatch=null;
    }
  }
  _lvLoading=false;
}
async function renderTicker(){
  const bar=document.getElementById('tickerBar'),track=document.getElementById('tickerTrack2');
  if(!bar||!track)return;
  if(_tkrLoading)return;_tkrLoading=true;
  try{
    const {flat}=await fetchDayGroups(ymdLocal(new Date()));
    _tickerFlat=flat;_tickerAt=Date.now();checkGoalNotifs(flat);
    const order={in:0,pre:1,post:2};
    const sorted=flat.slice().sort((a,b)=>(order[a.state]-order[b.state])||String(a.date).localeCompare(String(b.date)));
    if(!sorted.length){bar.style.display='none';_tkrLoading=false;return;}
    bar.style.display='';
    track.innerHTML=sorted.map(m=>{
      const L=LEAGUES[m.league];
      const st=m.state==='in'?'<span class="st-live">● EN VIVO</span>':(m.state==='post'?'<span class="st-ft">FINAL</span>':'<span class="st-pre">'+m.label+'</span>');
      const hasScore=m.hs!=null&&m.as!=null;
      const hWin=hasScore&&m.hs>m.as,aWin=hasScore&&m.as>m.hs;
      return '<button class="tk2" onclick="openLiveMatchObj(_tickerFlat['+m.idx+'])">'+
        '<div class="tk2-top"><span class="lg">'+leagueLogoHTML(m.league,12)+' '+abbrLeague(m.league)+'</span>'+st+'</div>'+
        '<div class="tk2-row'+(hWin?' win':'')+'"><span class="tk2-cr">'+crestHTML(m.A,13)+'</span><span class="tk2-nm">'+abbrName(m.A)+'</span><span class="tk2-sc">'+(m.hs!=null?m.hs:'–')+'</span></div>'+
        '<div class="tk2-row'+(aWin?' win':'')+'"><span class="tk2-cr">'+crestHTML(m.B,13)+'</span><span class="tk2-nm">'+abbrName(m.B)+'</span><span class="tk2-sc">'+(m.as!=null?m.as:'–')+'</span></div>'+
        '</button>';}).join('');
  }catch(e){}
  _tkrLoading=false;
}
function openLiveMatchObj(m){
  if(!m)return;
  const comp=m.ev&&m.ev.competitions&&m.ev.competitions[0];
  const cH=comp&&comp.competitors&&comp.competitors.find(c=>c.homeAway==='home');
  const cA=comp&&comp.competitors&&comp.competitors.find(c=>c.homeAway==='away');
  const ta=ensureTeam(m.A,cH&&cH.team&&cH.team.id,m.league),tb=ensureTeam(m.B,cA&&cA.team&&cA.team.id,m.league);
  if(!ta||!tb){showToast('Esos equipos no están en la base del modelo');return;}
  if(ta.auto||tb.auto)showToast((ta.auto?ta.es+' ':'')+(tb.auto?tb.es+' ':'')+'no estaba en la base: sumado con rating 65');
  if(m.league!==CURRENT_LEAGUE)setLeague(m.league);
  state.A=ta.es;state.B=tb.es;
  renderPicker('A');renderPicker('B');
  document.getElementById('ctxInput').value=(m.state==='pre'?'🕒 ':'🔴 ')+m.label+' · '+ta.es+' vs '+tb.es;
  fillAutoParams(false);
  _liveOpenMatch=m;
  const vb0=el('lvCompareBox');if(vb0)vb0.remove();
  showView('match');runSim(false);
  renderLiveCompare();
  showToast(ta.es+' vs '+tb.es+' cargado en el predictor');
}
function openLiveInPlace(m){
  if(!m)return;
  const comp=m.ev&&m.ev.competitions&&m.ev.competitions[0];
  const cH=comp&&comp.competitors&&comp.competitors.find(c=>c.homeAway==='home');
  const cA=comp&&comp.competitors&&comp.competitors.find(c=>c.homeAway==='away');
  const ta=ensureTeam(m.A,cH&&cH.team&&cH.team.id,m.league),tb=ensureTeam(m.B,cA&&cA.team&&cA.team.id,m.league);
  if(!ta||!tb){showToast('Esos equipos no están en la base del modelo');return;}
  if(ta.auto||tb.auto)showToast((ta.auto?ta.es+' ':'')+(tb.auto?tb.es+' ':'')+'no estaba en la base: sumado con rating 65');
  if(m.league!==CURRENT_LEAGUE)setLeague(m.league);
  state.A=ta.es;state.B=tb.es;
  renderPicker('A');renderPicker('B');
  document.getElementById('ctxInput').value=(m.state==='pre'?'🕒 ':'🔴 ')+m.label+' · '+ta.es+' vs '+tb.es;
  fillAutoParams(false);
  _liveOpenMatch=m;
  runSim(false);
  const card=document.getElementById('lvCard-'+m.idx);
  if(!card){_liveOpenMatch=null;return;}
  let box=el('lvCompareBox');
  if(!box){box=document.createElement('div');box.id='lvCompareBox';}
  card.after(box);
  renderLiveCompare();
  showToast(ta.es+' vs '+tb.es+' abierto debajo del partido');
  try{box.scrollIntoView({behavior:'smooth',block:'nearest'});}catch(e){}
}
function closeLiveCompare(){
  _liveOpenMatch=null;
  const box=el('lvCompareBox');if(box)box.remove();
  const lc=el('liveCompare');if(lc){lc.classList.add('hidden');lc.innerHTML='';}
}
/* ═══════════ COMPARATIVA MODELO VS REAL ═══════════ */
let _liveOpenMatch=null;
function teamColor(hex){
  if(!hex)return null;
  hex=(''+hex).replace('#','');if(hex.length!==6)return null;
  let r=parseInt(hex.slice(0,2),16),g=parseInt(hex.slice(2,4),16),b=parseInt(hex.slice(4,6),16);
  if([r,g,b].some(isNaN))return null;
  const lum=0.2126*r+0.7152*g+0.0722*b;
  if(lum<70){const f=0.5;r=Math.round(r+(255-r)*f);g=Math.round(g+(255-g)*f);b=Math.round(b+(255-b)*f);}
  return 'rgb('+r+','+g+','+b+')';
}
function statBar(label,a,b,ma,mb,unit,colA,colB){
  colA=colA||'var(--blue)';colB=colB||'var(--red)';unit=unit||'';
  const fmt=v=>v==null?'–':(unit==='%'?Math.round(v)+'%':(Number.isInteger(v)?v:(+v).toFixed(1)));
  const tot=(+a||0)+(+b||0),aw=tot>0?(+a/tot*100):50;
  const mtot=(+ma||0)+(+mb||0),maw=(ma!=null&&mb!=null&&mtot>0)?(+ma/mtot*100):null;
  let h='<div class="sb">'+
    '<div class="sb-top"><span class="sb-a" style="color:'+colA+'">'+fmt(a)+'</span><span class="sb-lab">'+label+'</span><span class="sb-b" style="color:'+colB+'">'+fmt(b)+'</span></div>'+
    '<div class="sb-bar"><span class="sb-seg-a" style="width:'+aw+'%;background:'+colA+'"></span><span class="sb-seg-b" style="width:'+(100-aw)+'%;background:'+colB+'"></span></div>';
  if(maw!=null){
    h+='<div class="sb-mrow"><span class="sb-ma">'+fmt(ma)+'</span><span class="sb-mlab">modelo</span><span class="sb-mb">'+fmt(mb)+'</span></div>'+
      '<div class="sb-bar sb-bar-m"><span class="sb-seg-am" style="width:'+maw+'%"></span><span class="sb-seg-bm" style="width:'+(100-maw)+'%"></span></div>';
  }
  return h+'</div>';
}
function genVeredicto(pred,hs,as,A,B){
  if(!pred)return '';
  const predA=Math.round(pred.predA||0),predB=Math.round(pred.predB||0);
  const exact=predA===hs&&predB===as;
  const diff=Math.abs(predA-hs)+Math.abs(predB-as);
  const res=hs>as?'Gana '+A:(as>hs?'Gana '+B:'Empate');
  const est=exact?'✅ Exacto':(diff<=1?'✅ Cercano (dif '+diff+')':(diff<=3?'🟡 Aceptable (dif '+diff+')':'🔴 Lejano (dif '+diff+')'));
  return '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:4px 0;border-top:1px solid var(--line);margin-top:4px">'+
    '<span><b>Pronóstico:</b> '+(pred.predA!=null?+pred.predA.toFixed(1):'?')+' — '+(pred.predB!=null?+pred.predB.toFixed(1):'?')+'</span>'+
    '<span><b>Real:</b> '+hs+' — '+as+' ('+res+')</span>'+
    '<span>'+est+'</span></div>';
}
async function renderLiveCompare(){
  const inPlace=!!el('lvCompareBox');
  const box=inPlace?el('lvCompareBox'):el('liveCompare');
  if(!box)return;
  const m=_liveOpenMatch;
  if(!m){if(!inPlace){box.classList.add('hidden');box.innerHTML='';}return;}
  const L=LEAGUES[m.league];if(!L){box.classList.add('hidden');return;}
  let ev=m.ev||null;
  const comp0=ev&&ev.competitions&&ev.competitions[0];
  const hasStats=(comp0&&comp0.statistics&&comp0.statistics.length>0)||(comp0&&comp0.competitors&&comp0.competitors.some(c=>c.statistics&&c.statistics.length>0));
  if(!hasStats&&m.id){
    try{
      const r=await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/'+L.espn+'/events/'+m.id);
      if(r.ok){ev=await r.json();m.ev=ev;}
    }catch(e){}
  }
  const p=espnParse(ev);if(!p){box.classList.add('hidden');box.innerHTML='';return;}
  const comp=ev.competitions&&ev.competitions[0];
  const stt=(comp&&comp.status&&comp.status.type)||{};
  const stState=stt.state||'pre';
  const isKO=detectPhase(compNoteText(comp)).knockout;
  const A=m.A||p.strHomeTeam,B=m.B||p.strAwayTeam;
  const min=stt.shortDetail||stt.displayClock||(stState==='post'?'FT':'');
  const tag=stState==='in'?'🔴 EN VIVO':(stState==='post'?'✓ FINAL':'🕒 POR JUGAR');
  const pred=lastPrediction||{};
  const s=p.stats||{};
  const hs=parseInt(p.intHomeScore,10)||0,as=parseInt(p.intAwayScore,10)||0;
  const pen=(p.homeShootout!=null||p.awayShootout!=null)?' <span class="pen">(pen '+p.homeShootout+'-'+p.awayShootout+')</span>':'';
  let html='<div class="lc-wrap'+(stState==='post'?' post':'')+'">'+
    '<div class="lc-top"><span class="lc-min">'+tag+' · '+min+'</span><span class="sub" style="margin:0">vs predicción del modelo</span></div>';
  if(stState==='pre'){
    html+='<div class="lc-score">'+crestHTML(A,22)+' '+A+' <b>vs</b> '+B+' '+crestHTML(B,22)+'</div>'+
      '<div class="sub" style="margin:6px 0 0">El partido aún no comienza. Abajo tenés la predicción del modelo; cuando arranque, acá verás goleadores, córners y tarjetas reales.</div></div>';
    box.innerHTML=html;box.classList.remove('hidden');return;
  }
  html+='<div class="lc-score">'+crestHTML(A,22)+' '+A+' <b>'+hs+'</b> - <b>'+as+'</b> '+B+' '+crestHTML(B,22)+pen+'</div>';
  const allSc=s.scorers||[];
  const goalSc=allSc.filter(g=>!g.shootout);
  const shootSc=allSc.filter(g=>g.shootout);
  html+='<div class="lc-goals">'+(goalSc.length
    ? goalSc.map(g=>'<div class="lc-goal">⚽ <b>'+(g.min||'')+'</b> '+(g.name||'—')+' <span style="color:var(--mut)">('+(g.home?A:B)+')</span>'+(g.pen?' <span style="color:var(--acc2)">de penal</span>':'')+(g.ownGoal?' <span style="color:var(--red)">e.c.</span>':'')+'</div>').join('')
    :(hs>0||as>0)?'<div class="sub" style="margin:0">Goles registrados sin detalle de goleador.</div>':'<div class="sub" style="margin:0">Sin goles.</div>')+'</div>';
  if(shootSc.length||p.homeShootout!=null||p.awayShootout!=null){
    const aPk=shootSc.filter(g=>g.home).map(g=>g.name||'—');
    const bPk=shootSc.filter(g=>!g.home).map(g=>g.name||'—');
    html+='<div class="lc-pens"><div class="lc-pen-h">⚽ Tanda de penales · <b>'+(p.homeShootout!=null?p.homeShootout:'?')+'-'+(p.awayShootout!=null?p.awayShootout:'?')+'</b></div>'+
      '<div class="lc-pen-row"><span class="lc-pen-tm">'+crestHTML(A,14)+' '+A+':</span> '+(aPk.length?aPk.join(', '):'—')+'</div>'+
      '<div class="lc-pen-row"><span class="lc-pen-tm">'+crestHTML(B,14)+' '+B+':</span> '+(bPk.length?bPk.join(', '):'—')+'</div></div>';
  }
  const shA=pred.predShotsA,shB=pred.predShotsB,shTot=(shA||0)+(shB||0);
  const mPossA=pred.predPossA;
  const shareA=(mPossA!=null)?(0.5-0.4*(mPossA-0.5)):0.5;
  const mCornA=(pred.predCornersTot!=null&&shTot>0)?pred.predCornersTot*(shA/shTot):null;
  const mCornB=(pred.predCornersTot!=null&&shTot>0)?pred.predCornersTot*(shB/shTot):null;
  const myA=(pred.predYellowTot!=null)?pred.predYellowTot*shareA:null;
  const myB=(pred.predYellowTot!=null)?pred.predYellowTot*(1-shareA):null;
  const colA=teamColor(p.homeColor)||'var(--blue)',colB=teamColor(p.awayColor)||'var(--red)';
  const bars=[];
  if(s.homePoss!=null||s.awayPoss!=null)bars.push(statBar('% Posesión',s.homePoss,s.awayPoss,mPossA!=null?mPossA*100:null,mPossA!=null?(1-mPossA)*100:null,'%',colA,colB));
  bars.push(statBar('Remates',s.homeShots,s.awayShots,shA,shB,'',colA,colB));
  bars.push(statBar('Tiros al arco',s.homeSOT,s.awaySOT,shA!=null?shA*0.34:null,shB!=null?shB*0.34:null,'',colA,colB));
  bars.push(statBar('Córners',s.homeCorners,s.awayCorners,mCornA,mCornB,'',colA,colB));
  if(s.homeFouls!=null||s.awayFouls!=null)bars.push(statBar('Faltas',s.homeFouls,s.awayFouls,null,null,'',colA,colB));
  bars.push(statBar('Amarillas',s.yellowA||0,s.yellowB||0,myA,myB,'',colA,colB));
  if((s.redA||0)+(s.redB||0)>0)bars.push(statBar('Rojas',s.redA||0,s.redB||0,null,null,'',colA,colB));
  html+='<div class="lc-bars">'+bars.join('')+'</div>';
  if(isKO&&pred.lamH){
    const Rk=simulate(pred.lamH,pred.lamA,pred.rho),KO=knockoutAdvance(pred.lamH,pred.lamA,pred.rho,Rk);
    const favAdv=KO.advH>=KO.advA?A:B;
    let kv='🏆 <b>Quién avanza (modelo)</b>: '+A+' '+pc(KO.advH)+' · '+B+' '+pc(KO.advA)+' — favorito <b>'+favAdv+'</b>.';
    if(stState==='post'){
      let realAdv=p.homeWinner?A:(p.awayWinner?B:null);
      if(!realAdv&&p.homeShootout!=null&&p.awayShootout!=null)realAdv=(+p.homeShootout>+p.awayShootout)?A:B;
      if(realAdv)kv+=' Avanzó <b>'+realAdv+'</b> · '+(norm(realAdv)===norm(favAdv)?'✅ acertó':'❌ sorpresa')+'.';
    }
    html+='<div class="lc-verdict">'+kv+'</div>';
  }
  if(pred.pH!=null){
    const favO=pred.pH>=pred.pD&&pred.pH>=pred.pA?'H':(pred.pA>=pred.pD?'A':'D');
    const curO=hs>as?'H':(hs===as?'D':'A');
    const nm=o=>o==='H'?('gana '+A):o==='A'?('gana '+B):'empate';
    let v;
    if(stState==='post'){
      v=(curO===favO)?'✅ El resultado final coincide con lo que más probable veía el modelo ('+nm(favO)+').'
        :'❌ Sorpresa respecto al modelo: esperaba <b>'+nm(favO)+'</b> y terminó en <b>'+nm(curO)+'</b>.';
    }else{
      v=(curO===favO)?'✅ Por ahora va en línea con la predicción ('+nm(favO)+', '+pc(Math.max(pred.pH,pred.pD,pred.pA))+' previo).'
        :'⚠️ Va distinto a lo previsto: el modelo veía <b>'+nm(favO)+'</b> y ahora mismo es <b>'+nm(curO)+'</b>.';
    }
    const tot=hs+as;
    if(pred.o25!=null)v+=' · Goles: <b>'+tot+'</b> (el modelo daba '+pc(pred.o25)+' a Over 2.5).';
    html+='<div class="lc-verdict">'+v+'</div>';
  }else if(pred.predA!=null){
    html+='<div class="lc-verdict">'+genVeredicto(pred,hs,as,A,B)+'</div>';
  }
  if(el('lvCompareBox'))html+='<div style="margin-top:8px;text-align:right"><button class="btn btn-ghost btn-sm" onclick="closeLiveCompare()">✕ Cerrar</button></div>';
  html+='</div>';
  box.innerHTML=html;box.classList.remove('hidden');
}
setInterval(()=>{if(document.hidden)return;
  const lv=document.getElementById('view-envivo').classList.contains('active');
  const mv=document.getElementById('view-match').classList.contains('active');
  if(lv&&(Date.now()-_lvAt>60000||_liveFlat.some(m=>m.state==='in')))renderLive();
  else if(_liveOpenMatch&&(mv||lv)&&_liveOpenMatch.state!=='post')renderLiveCompare();
},15000);
/* ═══════════ AUTOSYNC ═══════════ */
async function autoSyncResults(){
  if(_autoSyncRunning||document.hidden)return;
  _autoSyncRunning=true;
  try{
    try{await window.importPlayed();}catch(e){}
    const vs=document.getElementById('view-stats');
    if(vs&&vs.classList.contains('active'))renderStatsView();
    const vc=document.getElementById('view-cartilla');
    if(vc&&vc.classList.contains('active'))renderCartDay();
  }catch(e){}
  _autoSyncRunning=false;
}
setTimeout(autoSyncResults,800);
setInterval(autoSyncResults,180000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden){autoSyncResults();if(document.getElementById('view-envivo').classList.contains('active'))renderLive();}});
setInterval(()=>{if(document.hidden)return;
  if(document.getElementById('view-envivo').classList.contains('active'))renderLive();
  else if(Date.now()-_tickerAt>120000)renderTicker();
},60000);

/* ═══════════ PREDICTOR ═══════════ */
const state={A:'Bélgica',B:'Irán',filterA:'',filterB:'',ko:false};
function el(id){return document.getElementById(id);}
function setParamInputs(la,lb,rho){
  el('pLamA').value=la.toFixed(2);el('pLamB').value=lb.toFixed(2);el('pRho').value=rho.toFixed(3);
  const possA=possShare(la,lb);
  el('pCornA').value=applyCornerLearn(teamCorners(teamShots(la,possA))).toFixed(1);
  el('pCornB').value=applyCornerLearn(teamCorners(teamShots(lb,1-possA))).toFixed(1);
}
function fillAutoParams(rerun){
  const ta=findAnyTeam(state.A),tb=findAnyTeam(state.B);if(!ta||!tb)return;
  let [la,lb]=autoLambdas(ratingOf(ta.es),ratingOf(tb.es));const lr=applyLearning(la,lb);la=lr[0];lb=lr[1];
  setParamInputs(la,lb,autoRho(la+lb));
  if(rerun)runSim(false);
  ensureFormFor(ta.es,tb.es);
}
function renderPicker(side){
  const list=el('list'+side);
  const q=norm(side==='A'?state.filterA:state.filterB);
  const pool=poolTeams();
  const other=side==='A'?state.B:state.A;
  const sel=side==='A'?state.A:state.B;
  let html='';
  pool.forEach((t,i)=>{
    if(q&&!norm(t.es).includes(q))return;
    const cls=(t.es===sel?('sel-'+side.toLowerCase()):'')+(t.es===other?' taken':'');
    html+='<button class="tchip '+cls+'" onclick="pickTeam(\''+side+'\','+i+')"><span class="fl">'+crestHTML(t.es,16)+'</span><span class="nm">'+t.es+'</span><span class="rt">'+t.s+'</span></button>';});
  list.innerHTML=html;
  const tt=findAnyTeam(sel)||{f:'🏳️',es:sel,s:62};
  el('flag'+side).innerHTML=crestHTML(tt.es,28);
  el('name'+side).textContent=tt.es;
  const rb=el('rate'+side);rb.textContent=tt.s;rb.className='pick-rating '+ratingClass(tt.s);
}
function pickTeam(side,idx){
  const t=poolTeams()[idx];if(!t)return;
  if(side==='A'){if(t.es===state.B){state.B=state.A;state.A=t.es;}else state.A=t.es;}
  else{if(t.es===state.A){state.A=state.B;state.B=t.es;}else state.B=t.es;}
  renderPicker('A');renderPicker('B');fillAutoParams(false);
}
function swapTeams(){const tmp=state.A;state.A=state.B;state.B=tmp;
  const b=el('swapBtn');b.classList.remove('spin');void b.offsetWidth;b.classList.add('spin');
  renderPicker('A');renderPicker('B');fillAutoParams(false);}
function toggleKO(e){state.ko=!state.ko;e.classList.toggle('on',state.ko);runSim(false);}
function buildPresets(){
  const row=el('presetRow');
  const derbies=PRESET_MATCHUPS[CURRENT_LEAGUE]||PRESET_MATCHUPS.worldcup;
  row.innerHTML='<span class="mini-label" style="align-self:center">Clásicos:</span>'+derbies.map((p,i)=>'<button class="chip" onclick="applyPreset('+i+')">'+p.a+' vs '+p.b+'</button>').join('');
}
function applyPreset(i){const p=(PRESET_MATCHUPS[CURRENT_LEAGUE]||PRESET_MATCHUPS.worldcup)[i];
  state.A=p.a;state.B=p.b;renderPicker('A');renderPicker('B');fillAutoParams(false);runSim(true);}
function buildTeamlist(){
  const dl=el('teamlist');const names={};
  poolAll().forEach(t=>names[t.es]=1);
  dl.innerHTML=Object.keys(names).sort().map(n=>'<option value="'+n+'">').join('');
}
/* gráficos Chart.js */
let CH={};
function destroyChart(k){if(CH[k]){CH[k].destroy();delete CH[k];}}
function renderCharts(R,ta,tb,possA,shA,shB,coA,coB){
  if(!window.Chart)return;
  Chart.defaults.color='#8fa0ac';Chart.defaults.borderColor='rgba(33,42,51,.6)';Chart.defaults.font.family='Inter,system-ui,sans-serif';Chart.defaults.font.size=10;
  destroyChart('d1');
  CH.d1=new Chart(el('ch1x2'),{type:'doughnut',data:{labels:['Gana '+ta.es,'Empate','Gana '+tb.es],datasets:[{data:[+(R.h*100).toFixed(1),+(R.d*100).toFixed(1),+(R.a*100).toFixed(1)],backgroundColor:['#5aa7e8','#7c89a8','#e8616f'],borderColor:'#10151a',borderWidth:3}]},options:{responsive:true,maintainAspectRatio:false,cutout:'62%',plugins:{legend:{position:'bottom',labels:{boxWidth:10,boxHeight:10,padding:12}},tooltip:{callbacks:{label:c=>c.label+': '+c.parsed+'%'}}}}});
  const tot=[];for(let k=0;k<=8;k++){let p=0;R.scores.forEach(s=>{if(s.i+s.j===k)p+=s.p;});tot.push(+(p*100).toFixed(1));}
  destroyChart('g1');
  CH.g1=new Chart(el('chGoals'),{type:'bar',data:{labels:tot.map((_,i)=>i),datasets:[{data:tot,backgroundColor:'rgba(55,201,120,.5)',borderColor:'#37c978',borderWidth:1,borderRadius:5}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{callback:v=>v+'%'}},x:{title:{display:true,text:'Goles totales'}}}}});
  const mA=[Math.min(100,ta? (R.xgH/3.2*100):0),possA*100,Math.min(100,shA/25*100),Math.min(100,coA/9*100),R.csH*100];
  const mB=[Math.min(100,R.xgA/3.2*100),(1-possA)*100,Math.min(100,shB/25*100),Math.min(100,coB/9*100),R.csA*100];
  destroyChart('r1');
  CH.r1=new Chart(el('chRadar'),{type:'radar',data:{labels:['Ataque','Posesión','Remates','Córners','Valla en cero'],datasets:[
    {label:ta.es,data:mA.map(v=>+v.toFixed(0)),backgroundColor:'rgba(90,167,232,.18)',borderColor:'#5aa7e8',pointBackgroundColor:'#5aa7e8'},
    {label:tb.es,data:mB.map(v=>+v.toFixed(0)),backgroundColor:'rgba(232,97,111,.15)',borderColor:'#e8616f',pointBackgroundColor:'#e8616f'}]},
    options:{responsive:true,maintainAspectRatio:false,scales:{r:{min:0,max:100,ticks:{display:false},grid:{color:'rgba(33,42,51,.7)'},angleLines:{color:'rgba(33,42,51,.7)'}}},plugins:{legend:{position:'bottom',labels:{boxWidth:10}}}}});
  const top=R.scores.slice(0,6);
  destroyChart('s1');
  CH.s1=new Chart(el('chScores'),{type:'bar',data:{labels:top.map(s=>s.i+'-'+s.j),datasets:[{data:top.map(s=>+(s.p*100).toFixed(1)),backgroundColor:'rgba(217,180,91,.55)',borderColor:'#d9b45b',borderWidth:1,borderRadius:5}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{callback:v=>v+'%'}}}}});
}
function runSim(scroll){
  if(_liveOpenMatch&&(norm(_liveOpenMatch.A)!==norm(state.A)||norm(_liveOpenMatch.B)!==norm(state.B))){
    _liveOpenMatch=null;const lb=el('liveCompare');if(lb){lb.classList.add('hidden');lb.innerHTML='';}
    const vb=el('lvCompareBox');if(vb)vb.remove();}
  const ta=findAnyTeam(state.A),tb=findAnyTeam(state.B);
  if(!ta||!tb)return;
  const lamH=clamp(parseFloat(el('pLamA').value)||1.3,.05,5);
  const lamA=clamp(parseFloat(el('pLamB').value)||1.3,.05,5);
  const rho=clamp(parseFloat(el('pRho').value)||-0.06,-0.12,0);
  const coA=parseFloat(el('pCornA').value)||0,coB=parseFloat(el('pCornB').value)||0;
  const yel=parseFloat(el('pCardY').value)||4.2,red=parseFloat(el('pCardR').value)||0.13;
  const refName=el('pRef').value||'';
  const R=simulate(lamH,lamA,rho);
  const ctxVal=el('ctxInput').value.trim();
  el('mTitle').innerHTML=crestHTML(ta.es,24)+' '+ta.es+' <span style="color:var(--mut)">vs</span> '+tb.es+' '+crestHTML(tb.es,24);
  const fNote=(()=>{const fA=APPLY_FORM?formInfo(ta.es):null,fB=APPLY_FORM?formInfo(tb.es):null;
    if(!fA&&!fB)return '';
    const parts=[];if(fA)parts.push(ta.es+' '+fA.gf.toFixed(1)+'-'+fA.ga.toFixed(1)+' ('+fA.n+' pj'+(Math.abs(fA.delta)>=0.5?', Δ'+(fA.delta>0?'+':'')+fA.delta.toFixed(0):'')+')');
    if(fB)parts.push(tb.es+' '+fB.gf.toFixed(1)+'-'+fB.ga.toFixed(1)+' ('+fB.n+' pj'+(Math.abs(fB.delta)>=0.5?', Δ'+(fB.delta>0?'+':'')+fB.delta.toFixed(0):'')+')');
    return ' · forma ESPN '+parts.join(' · ');})();
  el('mSub').textContent='λ '+lamH.toFixed(2)+' · '+lamA.toFixed(2)+' · ρ '+rho.toFixed(3)+(LEARN.apply&&LEARN.ready?' · calibración ×'+LEARN.goalAdj.toFixed(3):'')+fNote;
  el('lblH').textContent='Gana '+ta.es;el('lblA').textContent='Gana '+tb.es;
  const bar=el('bar1x2');bar.innerHTML='';
  [['seg-h',R.h],['seg-d',R.d],['seg-a',R.a]].forEach(sg=>{
    const s=document.createElement('span');s.className='seg '+sg[0];
    s.textContent=sg[1]>0.08?pc(sg[1]):'';bar.appendChild(s);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{s.style.width=(sg[1]*100)+'%';}));});
  countUp(el('pH'),R.h*100,1,'%');countUp(el('pD'),R.d*100,1,'%');countUp(el('pA'),R.a*100,1,'%');
  const koBox=el('koBox');let KO=null;
  if(state.ko){
    KO=knockoutAdvance(lamH,lamA,rho,R);koBox.style.display='';
    const kb=el('koBar');kb.innerHTML='';
    const s1=document.createElement('span');s1.className='seg seg-h';s1.style.width='0';s1.textContent=KO.advH>0.08?pc(KO.advH):'';
    const s2=document.createElement('span');s2.className='seg seg-a';s2.style.width='0';s2.textContent=KO.advA>0.08?pc(KO.advA):'';
    kb.appendChild(s1);kb.appendChild(s2);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{s1.style.width=(KO.advH*100)+'%';s2.style.width=(KO.advA*100)+'%';}));
    const fav=KO.advH>=KO.advA?ta.es:tb.es;
    el('koTxt').innerHTML='Probable clasificado: <b>'+fav+'</b> ('+pc(Math.max(KO.advH,KO.advA))+'). 90′: <b>'+pc(KO.p90)+'</b> · prórroga: <b>'+pc(KO.pProrroga+KO.pPenales)+'</b> · penales: <b>'+pc(KO.pPenales)+'</b>.';
  }else koBox.style.display='none';
  const best=R.scores[0];
  const resWord=best.i>best.j?'Gana '+ta.es:(best.i===best.j?'Empate':'Gana '+tb.es);
  const favO=R.h>=R.d&&R.h>=R.a?'H':(R.a>=R.d?'A':'D');
  const bestO=best.i>best.j?'H':(best.i===best.j?'D':'A');
  let cons=null;
  if(favO!==bestO){for(const s of R.scores){const o=s.i>s.j?'H':(s.i===s.j?'D':'A');if(o===favO){cons=s;break;}}}
  const scB=el('scBig');scB.textContent=best.i+' – '+best.j;
  scB.style.animation='none';void scB.offsetWidth;scB.style.animation='';
  el('scSub').innerHTML=ta.es+' '+best.i+'-'+best.j+' '+tb.es+' · <b>'+pc(best.p)+'</b> · '+resWord+(cons?'<br><span style="font-size:11px">Con el resultado favorito: '+cons.i+'-'+cons.j+' ('+pc(cons.p)+').</span>':'');
  el('xgHl').textContent=ta.es;el('xgAl').textContent=tb.es;
  countUp(el('xgH'),R.xgH,2,'',700);countUp(el('xgA'),R.xgA,2,'',700);
  const top=Math.max(R.h,R.d,R.a);
  const cb=el('confBadge');let cls,lab,msg;
  if(top>=0.70){cls='c-alta';lab='ALTA';msg='Favorito claro: confianza sobre el resultado esperado, no garantía.';}
  else if(top>=0.45){cls='c-media';lab='MEDIA';msg='Hay favorito, pero con margen real para la sorpresa.';}
  else{cls='c-baja';lab='BAJA';msg='Partido parejo: cualquier resultado es razonable.';}
  cb.className='conf-badge '+cls;cb.textContent='CONFIANZA '+lab;
  el('confTxt').innerHTML='Escenario más probable: <b>'+(R.h>=R.d&&R.h>=R.a?'Gana '+ta.es:(R.a>=R.d?'Gana '+tb.es:'Empate'))+'</b> ('+pc(top)+').';
  el('confMsg').textContent=msg;
  /* stats esperadas */
  const possA=possShare(lamH,lamA),possB=1-possA;
  const shA=teamShots(lamH,possA),shB=teamShots(lamA,possB);
  const paA=teamPasses(possA),paB=teamPasses(possB);
  const shareA=0.5-0.4*(possA-0.5);
  const yelA=yel*shareA,yelB=yel*(1-shareA);
  el('teamStats').innerHTML=
    '<div class="statbox"><h4>'+crestHTML(ta.es,16)+' '+ta.es+'</h4>'+
    '<div class="statrow"><span>Posesión</span><b>'+(possA*100).toFixed(0)+'%</b></div>'+
    '<div class="statrow"><span>Remates</span><b>'+shA.toFixed(0)+'</b></div>'+
    '<div class="statrow"><span>A puerta</span><b>'+(shA*0.34).toFixed(0)+'</b></div>'+
    '<div class="statrow"><span>Córners (λ)</span><b>'+coA.toFixed(1)+'</b></div>'+
    '<div class="statrow"><span>Pases</span><b>'+paA.toFixed(0)+'</b></div>'+
    '<div class="statrow"><span>Amarillas</span><b>'+yelA.toFixed(1)+'</b></div></div>'+
    '<div class="statbox"><h4>'+crestHTML(tb.es,16)+' '+tb.es+'</h4>'+
    '<div class="statrow"><span>Posesión</span><b>'+(possB*100).toFixed(0)+'%</b></div>'+
    '<div class="statrow"><span>Remates</span><b>'+shB.toFixed(0)+'</b></div>'+
    '<div class="statrow"><span>A puerta</span><b>'+(shB*0.34).toFixed(0)+'</b></div>'+
    '<div class="statrow"><span>Córners (λ)</span><b>'+coB.toFixed(1)+'</b></div>'+
    '<div class="statrow"><span>Pases</span><b>'+paB.toFixed(0)+'</b></div>'+
    '<div class="statrow"><span>Amarillas</span><b>'+yelB.toFixed(1)+'</b></div></div>';
  /* heatmap */
  const HN=5,gmap={};let gmax=0;
  R.scores.forEach(s=>{if(s.i<=HN&&s.j<=HN){gmap[s.i+'_'+s.j]=s.p;if(s.p>gmax)gmax=s.p;}});
  const hm=el('heatmap');hm.innerHTML='';const cells=[];
  for(let i=0;i<=HN;i++)for(let j=0;j<=HN;j++){
    const p=gmap[i+'_'+j]||0,al=gmax>0?p/gmax:0,isMax=p>0&&p===gmax;
    const c=document.createElement('div');
    c.className='heatcell';c.title=ta.es+' '+i+'-'+j+' '+tb.es+': '+pc(p);
    c.style.background='rgba(55,201,120,'+(0.05+0.85*al).toFixed(3)+')';
    if(isMax)c.style.outline='2px solid var(--gold)';
    c.innerHTML='<span class="hc-sc">'+i+'-'+j+'</span><span class="hc-p">'+(p>=0.01?(p*100).toFixed(0)+'%':'·')+'</span>';
    hm.appendChild(c);cells.push(c);}
  cells.forEach((c,idx)=>{c.style.transitionDelay=(idx*12)+'ms';requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.add('in')));});
  el('heatNames').textContent='Cada casilla: '+ta.es+' (izq.) – '+tb.es+' (der.) · recuadro dorado = más probable.';
  /* goles O/U */
  let rows='';const goalPicks=[];
  for(let L=0.5;L<=5.5;L+=1){
    const ov=R.scores.reduce((s,x)=>x.i+x.j>L?s+x.p:s,0),un=1-ov;
    rows+='<tr><td><b>'+L+'</b></td><td class="r" style="color:'+(ov>=un?'var(--acc)':'var(--mut)')+';font-weight:'+(ov>=un?700:400)+'">'+pc(ov)+'</td><td class="r" style="color:'+(un>ov?'var(--acc)':'var(--mut)')+';font-weight:'+(un>ov?700:400)+'">'+pc(un)+'</td></tr>';
    goalPicks.push({lab:'Over '+L,p:ov},{lab:'Under '+L,p:un});}
  el('ouBody').innerHTML=rows;
  let gInfo=goalPicks.filter(x=>x.p>0.5&&x.p<=0.95).sort((a,b)=>b.p-a.p);
  if(!gInfo.length)gInfo=goalPicks.slice().sort((a,b)=>b.p-a.p);
  el('pickPills').innerHTML=gInfo.slice(0,5).map((x,idx)=>'<span class="pill" style="animation-delay:'+(idx*70)+'ms"><span>'+x.lab+'</span><b>'+pc(x.p)+'</b></span>').join('');
  el('extraPills').innerHTML=
    '<span class="pill"><span>Ambos marcan: '+(R.btts>=0.5?'Sí':'No')+'</span><b>'+pc(R.btts>=0.5?R.btts:1-R.btts)+'</b></span>'+
    '<span class="pill"><span>Valla 0 '+ta.es+'</span><b>'+pc(R.csH)+'</b></span>'+
    '<span class="pill"><span>Valla 0 '+tb.es+'</span><b>'+pc(R.csA)+'</b></span>';
  /* córners dinámico */
  const coTot=coA+coB,coSd=Math.sqrt(Math.max(coTot,1));
  const kLo=Math.max(1,Math.floor(coTot-2*coSd)),kHi=Math.ceil(coTot+2*coSd);
  const cPicks=[];let cRows='';
  for(let k=kLo;k<=kHi;k++){const L=k+0.5;const ov=overLine(coTot,L),un=1-ov;
    cPicks.push({lab:'Over '+L,p:ov},{lab:'Under '+L,p:un});
    cRows+='<tr><td>'+L+'</td><td class="r" style="color:'+(ov>=un?'var(--acc)':'var(--mut)')+';font-weight:'+(ov>=un?700:400)+'">'+pc(ov)+'</td><td class="r" style="color:'+(un>ov?'var(--acc)':'var(--mut)')+';font-weight:'+(un>ov?700:400)+'">'+pc(un)+'</td></tr>';}
  let cInfo=cPicks.filter(x=>x.p>0.5&&x.p<=0.95).sort((a,b)=>b.p-a.p);
  if(!cInfo.length)cInfo=cPicks.slice().sort((a,b)=>b.p-a.p);
  el('cornerMk').innerHTML='<div style="font-size:12px;color:var(--mut);margin-bottom:8px">Córners totales esperados: <b style="color:var(--gold)">'+coTot.toFixed(1)+'</b> ('+ta.es+' '+coA.toFixed(1)+' · '+tb.es+' '+coB.toFixed(1)+')</div>'+
    '<table><thead><tr><th>Línea</th><th class="r">Over</th><th class="r">Under</th></tr></thead><tbody>'+cRows+'</tbody></table>'+
    '<div class="pills">'+cInfo.slice(0,4).map(x=>'<span class="pill"><span>'+x.lab+'</span><b>'+pc(x.p)+'</b></span>').join('')+'</div>';
  /* tarjetas */
  const yLines=[2.5,3.5,4.5,5.5,6.5,7.5];
  const yPicks=[];let yRows='';
  yLines.forEach(L=>{const ov=overLine(yel,L),un=1-ov;
    yPicks.push({lab:'Over '+L,p:ov},{lab:'Under '+L,p:un});
    yRows+='<tr><td>'+L+'</td><td class="r" style="color:'+(ov>=un?'var(--acc)':'var(--mut)')+';font-weight:'+(ov>=un?700:400)+'">'+pc(ov)+'</td><td class="r" style="color:'+(un>ov?'var(--acc)':'var(--mut)')+';font-weight:'+(un>ov?700:400)+'">'+pc(un)+'</td></tr>';});
  yPicks.sort((a,b)=>b.p-a.p);
  el('cardsBox').innerHTML='<div style="font-size:12px;color:var(--mut);margin-bottom:8px">Amarillas esperadas: <b>'+yel.toFixed(1)+'</b>'+(refName?' · árbitro: '+refName:'')+' · '+ta.es+' <b>'+yelA.toFixed(1)+'</b> / '+tb.es+' <b>'+yelB.toFixed(1)+'</b></div>'+
    '<table><thead><tr><th>Línea</th><th class="r">Over</th><th class="r">Under</th></tr></thead><tbody>'+yRows+'</tbody></table>'+
    '<div class="pills">'+yPicks.slice(0,4).map(x=>'<span class="pill"><span>'+x.lab+'</span><b>'+pc(x.p)+'</b></span>').join('')+'</div>'+
    '<div style="font-size:11.5px;color:var(--mut);margin-top:10px">Rojas esperadas <b>'+red.toFixed(2)+'</b> · prob. de al menos una roja <b style="color:var(--red)">'+pc(1-Math.exp(-red))+'</b>. Mercado muy volátil.</div>';
  renderCharts(R,ta,tb,possA,shA,shB,coA,coB);
  lastPrediction={A:ta.es,B:tb.es,ctx:ctxVal,lamH,lamA,rho,pH:R.h,pD:R.d,pA:R.a,
    predResult:favO,si:best.i,sj:best.j,sp:best.p,si2:cons?cons.i:null,sj2:cons?cons.j:null,sp2:cons?cons.p:null,
    xgH:R.xgH,xgA:R.xgA,o25:R.o25,btts:R.btts,
    predPossA:possA,predShotsA:shA,predShotsB:shB,predCornersTot:coTot,predYellowTot:yel,
    ko:KO?{on:true,advH:KO.advH,advA:KO.advA}:{on:false}};
  if(scroll){try{el('results').scrollIntoView({behavior:'smooth',block:'start'});}catch(e){}}
}

/* ═══════════ BRACKET ═══════════ */
let BRACKET=lsGet('rp_bracket_v6',[]),PICKS=lsGet('rp_picks_v6',{});let _bkCache={};
function confKey(a,b){return [norm(a),norm(b)].sort().join('|');}
function saveBracket(){lsSet('rp_bracket_v6',BRACKET);lsSet('rp_picks_v6',PICKS);}
function pickedWinner(a,b){if(!a||!b)return null;return PICKS[confKey(a,b)]||null;}
function ratingOf(name){const t=findAnyTeam(name);if(!t)return name?62:null;const f=APPLY_FORM&&TEAM_FORM[t.es];return (f&&Math.abs(f.delta)>=0.5)?clamp(t.s+f.delta,40,90):t.s;}
function advProb(nameA,nameB,cache){
  const key=nameA+'|'+nameB;if(cache[key]!=null)return cache[key];
  const sa=ratingOf(nameA),sb=ratingOf(nameB);let p;
  if(sa==null&&sb==null)p=0.5;else if(sa==null)p=0;else if(sb==null)p=1;
  else{let [la,lb]=autoLambdas(sa,sb);const lr=applyLearning(la,lb);la=lr[0];lb=lr[1];
    const r=autoRho(la+lb);p=knockoutAdvance(la,lb,r,simulate(la,lb,r)).advH;}
  cache[key]=p;return p;
}
function bktWinnerOf(a,b){
  if(!a&&!b)return '';if(!a)return b;if(!b)return a;
  const w=pickedWinner(a,b);if(w)return w;
  return advProb(a,b,_bkCache)>=0.5?a:b;
}
function loadWCBracket(){
  BRACKET=WC2026_TEAMS.slice();PICKS={};
  Object.keys(WC2026_LOCK).forEach(k=>{const p=+k,side=WC2026_LOCK[k],a=BRACKET[2*p],b=BRACKET[2*p+1];if(a&&b)PICKS[confKey(a,b)]=(side===1)?a:b;});
  saveBracket();renderBracket();
  el('bkMsg').textContent='Cuadro del Mundial 2026 cargado. Marca ganadores con ✓ y simula.';
}
function loadChampionsBracket(){
  const ct=CLUB_TEAMS.champions.slice().sort((a,b)=>b.s-a.s);
  const top16=[];const seen={};
  ct.forEach(t=>{if(!seen[t.es]){seen[t.es]=1;top16.push(t.es);}});
  top16.length=16;
  BRACKET=new Array(16).fill('');
  for(let i=0;i<8;i++){BRACKET[2*i]=top16[i];BRACKET[2*i+1]=top16[15-i];}
  PICKS={};saveBracket();renderBracket();
  el('bkMsg').textContent='Octavos de Champions armados (1° vs 16°, 2° vs 15°…).';
}
function loadClubBracket(poolKey,label){
  const ct=CLUB_TEAMS[poolKey].slice().sort((a,b)=>b.s-a.s);
  const top16=[];const seen={};
  ct.forEach(t=>{if(!seen[t.es]){seen[t.es]=1;top16.push(t.es);}});
  top16.length=16;
  BRACKET=new Array(16).fill('');
  for(let i=0;i<8;i++){BRACKET[2*i]=top16[i];BRACKET[2*i+1]=top16[15-i];}
  PICKS={};saveBracket();renderBracket();
  el('bkMsg').textContent='Octavos de '+label+' armados (1° vs 16°, 2° vs 15°…).';
}
function loadLibBracket(){loadClubBracket('libertadores','la Libertadores');}
function loadSudBracket(){loadClubBracket('sudamericana','la Sudamericana');}
function clearBracket(){BRACKET=new Array(BRACKET.length||16).fill('');PICKS={};saveBracket();renderBracket();el('bkResults').innerHTML='';el('bkMsg').textContent='Cuadro vaciado.';}
function onBracketEdit(i,v){BRACKET[i]=v.trim();saveBracket();_bkCache={};renderBracket();}
function lockWin(i){
  const a=(BRACKET[i]||'').trim(),b=(BRACKET[i^1]||'').trim();
  if(!a||!b)return;
  const ck=confKey(a,b);
  if(PICKS[ck]===a)delete PICKS[ck];else PICKS[ck]=a;
  saveBracket();renderBracket();
}
function renderBracket(){
  _bkCache={};
  const host=el('bkVisual');
  const isKO=!!LEAGUES[CURRENT_LEAGUE].ko;
  el('btnWC').style.display=CURRENT_LEAGUE==='worldcup'?'':'none';
  el('btnCH').style.display=CURRENT_LEAGUE==='champions'?'':'none';
  el('btnLIB').style.display=CURRENT_LEAGUE==='libertadores'?'':'none';
  el('btnSUD').style.display=CURRENT_LEAGUE==='sudamericana'?'':'none';
  const n=BRACKET.length;
  if(!isKO){host.innerHTML='<div class="empty" style="min-width:320px">Cuadro disponible solo en competiciones eliminatorias (Mundial, Champions, Libertadores y Sudamericana). Para ligas, consultá la Tabla.</div>';el('bkEditor').innerHTML='';return;}
  if(!n||(n&(n-1))!==0){host.innerHTML='<div class="empty" style="min-width:320px">Carga un cuadro (16 o 32 equipos).</div>';el('bkEditor').innerHTML='';return;}
  const rounds=Math.round(Math.log2(n));
  const labels=rounds===5?['Dieciseisavos','Octavos','Cuartos','Semifinal','Final']:rounds===4?['Octavos','Cuartos','Semifinal','Final']:['Semifinal','Final'];
  let cur=BRACKET.map(x=>(x||'').trim());const cols=[];
  while(cur.length>1){const pairs=[];for(let i=0;i<cur.length;i+=2)pairs.push([cur[i],cur[i+1]]);cols.push(pairs);cur=pairs.map(([a,b])=>bktWinnerOf(a,b));}
  const champ=cur[0];
  let html='';
  cols.forEach((pairs,ri)=>{
    html+='<div class="bkt-col"><div class="bkt-colh">'+(labels[ri]||('Ronda '+(ri+1)))+'</div>'+pairs.map(([a,b])=>{
      const w=bktWinnerOf(a,b);const pw=pickedWinner(a,b);
      const pickA=pw&&norm(pw)===norm(a),pickB=pw&&norm(pw)===norm(b);
      return '<div class="bkt-m">'+
        '<div class="bkt-t'+(w&&a&&norm(w)===norm(a)?' win':'')+(pickA?' pick':'')+'">'+crestHTML(a||'',13)+'<span class="nm">'+(a||'—')+'</span><span class="ck">✓</span></div>'+
        '<div class="bkt-t'+(w&&b&&norm(w)===norm(b)?' win':'')+(pickB?' pick':'')+'">'+crestHTML(b||'',13)+'<span class="nm">'+(b||'—')+'</span><span class="ck">✓</span></div></div>';
    }).join('')+'</div>';});
  html+='<div class="bkt-col"><div class="bkt-colh">Campeón</div><div class="bkt-champ"><span style="font-size:30px">🏆</span><span class="ttl">CAMPEÓN</span><span class="nm">'+crestHTML(champ||'',16)+' '+(champ||'—')+'</span></div></div>';
  host.innerHTML=html;
  let eh='';
  for(let i=0;i<BRACKET.length;i+=2){
    const m=i/2+1,a=BRACKET[i]||'',b=BRACKET[i+1]||'';
    const w=pickedWinner(a,b);
    const on1=w&&norm(w)===norm(a),on2=w&&norm(w)===norm(b);
    eh+='<div class="bk-em"><span class="no">'+m+'</span><input list="teamlist" value="'+a.replace(/"/g,'&quot;')+'" oninput="onBracketEdit('+i+',this.value)" placeholder="Equipo"><button class="bk-win'+(on1?' on':'')+'" onclick="lockWin('+i+')">✓</button><span style="color:var(--gray)">vs</span><input list="teamlist" value="'+b.replace(/"/g,'&quot;')+'" oninput="onBracketEdit('+(i+1)+',this.value)" placeholder="Equipo"><button class="bk-win'+(on2?' on':'')+'" onclick="lockWin('+(i+1)+')">✓</button></div>';}
  el('bkEditor').innerHTML=eh;
}
function simTournament(){
  const n=BRACKET.length;
  if(n<2||(n&(n-1))!==0){el('bkMsg').textContent='El cuadro debe tener 16 o 32 equipos.';return;}
  const iters=clamp(parseInt(el('bkIters').value,10)||20000,1000,200000);
  el('bkMsg').textContent='Simulando '+iters.toLocaleString('es')+' torneos…';el('bkMsg').style.color='var(--gold)';
  setTimeout(()=>{
    const rounds=Math.round(Math.log2(n));
    const stat={};BRACKET.forEach(t=>{if(t&&!stat[t])stat[t]={played:new Array(rounds+1).fill(0),champ:0};});
    const cache={};
    for(let it=0;it<iters;it++){
      let cur=BRACKET.map(x=>(x||'').trim()),r=1;
      while(cur.length>1){
        for(const t of cur){if(t&&stat[t])stat[t].played[r]++;}
        const next=[];
        for(let i=0;i<cur.length;i+=2){const A=cur[i],B=cur[i+1];
          next.push(A&&B?(Math.random()<advProb(A,B,cache)?A:B):(A||B||''));}
        cur=next;r++;}
      if(cur[0]&&stat[cur[0]])stat[cur[0]].champ++;}
    const names=Object.keys(stat).sort((a,b)=>(stat[b].champ-stat[a].champ)||(stat[b].played[rounds]-stat[a].played[rounds]));
    const showQF=rounds>=3;
    let h='<table style="margin-top:14px"><thead><tr><th>Equipo</th><th class="r">Campeón</th><th class="r">Final</th><th class="r">Semis</th>'+(showQF?'<th class="r">Cuartos</th>':'')+'</tr></thead><tbody>';
    names.slice(0,16).forEach(t=>{const s=stat[t];
      h+='<tr><td>'+crestHTML(t,14)+' '+t+'</td><td class="r" style="color:var(--gold);font-weight:700">'+pc(s.champ/iters)+'<div class="champ-bar"><div class="champ-fill" data-w="'+(s.champ/iters*100)+'"></div></div></td><td class="r">'+pc(s.played[rounds]/iters)+'</td><td class="r">'+pc(s.played[rounds-1]/iters)+'</td>'+(showQF?'<td class="r">'+pc(s.played[rounds-2]/iters)+'</td>':'')+'</tr>';});
    h+='</tbody></table>';
    el('bkResults').innerHTML=h;
    el('bkMsg').textContent=iters.toLocaleString('es')+' torneos simulados.';el('bkMsg').style.color='var(--acc)';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{document.querySelectorAll('#bkResults .champ-fill').forEach(f=>f.style.width=f.dataset.w+'%');}));
  },40);
}

/* ═══════════ TABLA ═══════════ */
const ESPN_SEASON=2026;
async function fetchESPNStandings(){
  const base='https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[CURRENT_LEAGUE].espn+'/scoreboard';
  return espnFetch(base.replace('/scoreboard','/standings')+'?season='+ESPN_SEASON);
}
async function fetchESPNStats(group){
  const base='https://site.api.espn.com/apis/site/v2/sports/soccer/'+LEAGUES[CURRENT_LEAGUE].espn+'/scoreboard';
  return espnFetch(base.replace('/scoreboard','/statistics')+'?type=player&group='+(group||'scoring')+'&season='+ESPN_SEASON);
}
async function renderStatsView(){
  const elm=el('statsBody');
  const L=LEAGUES[CURRENT_LEAGUE];
  const pool=poolTeams();const poolSet={};pool.forEach(t=>poolSet[t.es]=1);
  const stats={};pool.forEach(t=>stats[t.es]={t,gp:0,w:0,d:0,l:0,gf:0,ga:0,pts:0,form:[]});
  const scorers={};
  // datos reales de ESPN (tabla + goleadores) en competiciones ligueras
  const hasStandings=L.id!=='worldcup'&&L.id!=='champions_classif';
  let espnOk=false;
  if(hasStandings){
    try{
      const [sJson,stJson]=await Promise.all([
        fetchESPNStats('scoring').catch(()=>null),
        fetchESPNStandings().catch(()=>null)
      ]);
      const espnScorers=[];
      if(sJson&&sJson.athletes){
        let goalIdx=0;
        if(sJson.categories&&sJson.categories[0]&&sJson.categories[0].labels){
          const li=sJson.categories[0].labels.findIndex(l=>/gol|goal/i.test(l));
          if(li>=0)goalIdx=li;
        }
        sJson.athletes.forEach(a=>{
          if(!a||!a.team)return;
          const tm=mapEspnName(a.team.displayName||a.team.name||'');
          if(!poolSet[tm])return;
          let g=0;
          if(a.statistics&&Array.isArray(a.statistics))g=parseInt(a.statistics[goalIdx]||'0',10);
          else if(a.statistics&&typeof a.statistics==='object'&&a.statistics.goals)g=parseInt(a.statistics.goals,10);
          if(g>0)espnScorers.push({name:a.displayName||a.firstName||'?',team:tm,goals:g});
        });
      }
      let stRows=0;
      if(stJson&&stJson.standings){
        const entries=stJson.standings[0]&&stJson.standings[0].entries;
        if(entries)entries.forEach(e=>{
          const tm=mapEspnName((e.team&&(e.team.displayName||e.team.name))||'');
          const st=e.stats||[];
          const get=n=>{const x=st.find(s=>s.name===n);return x?parseFloat(x.displayValue):0;};
          if(!tm||!poolSet[tm])return;
          const gp=Math.round(get('gamesPlayed')),w=Math.round(get('wins')),d=Math.round(get('ties')),
                l=Math.round(get('losses')),gf=Math.round(get('pointsFor')),ga=Math.round(get('pointsAgainst')),
                pts=Math.round(get('points')),form=[];
          if(e.form){(''+e.form).toUpperCase().split('').forEach(c=>{if(c==='W'||c==='D'||c==='L')form.push(c);});}
          if(gp>0){
            stats[tm].gp=gp;stats[tm].w=w;stats[tm].d=d;stats[tm].l=l;
            stats[tm].gf=gf;stats[tm].ga=ga;stats[tm].pts=pts;stats[tm].form=form;
            stRows++;
          }
        });
      }
      if(espnScorers.length){for(const k in scorers)delete scorers[k];
        espnScorers.forEach(s=>scorers[s.name+'|'+s.team]={name:s.name,team:s.team,goals:s.goals});}
      espnOk=stRows>0||espnScorers.length>0;
    }catch(e){}
  }
  // si ESPN no dio datos, calcular desde el historial
  if(!espnOk){
    HIST.slice().sort((a,b)=>(a.ts||0)-(b.ts||0)).forEach(p=>{
      if(!poolSet[p.A]||!poolSet[p.B])return;
      const A=stats[p.A],B=stats[p.B];
      let res;
      if(p.actualA!=null&&p.actualB!=null)res=p.actualA>p.actualB?'H':(p.actualA===p.actualB?'D':'A');
      else res=p.predResult||(p.pH>=p.pD&&p.pH>=p.pA?'H':(p.pA>=p.pD?'A':'D'));
      A.gp++;B.gp++;
      if(res==='H'){A.w++;B.l++;A.pts+=3;A.form.push('W');B.form.push('L');}
      else if(res==='A'){B.w++;A.l++;B.pts+=3;B.form.push('W');A.form.push('L');}
      else{A.d++;B.d++;A.pts++;B.pts++;A.form.push('D');B.form.push('D');}
      const gi=p.actualA!=null?p.actualA:p.si,gj=p.actualB!=null?p.actualB:p.sj;
      A.gf+=gi;A.ga+=gj;B.gf+=gj;B.ga+=gi;
      if(p.actualStats&&p.actualStats.scorers){p.actualStats.scorers.forEach(g=>{
        if(!g.name||g.ownGoal)return;
        const tn=g.forA?p.A:p.B;const key=g.name+'|'+tn;
        if(!scorers[key])scorers[key]={name:g.name,team:tn,goals:0};
        scorers[key].goals++;});}});
  }
  const sorted=Object.values(stats).sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf);
  const noData=!sorted.some(r=>r.gp>0);
  let tableHtml;
  if(noData){tableHtml='<div class="empty">Sin partidos de '+L.name+' en tu historial.</div>';}
  else{
    const nT=sorted.length;
    tableHtml='<table class="st-table"><thead><tr><th>#</th><th>Equipo</th><th class="r">PJ</th><th class="r">G</th><th class="r">E</th><th class="r">P</th><th class="r">GF</th><th class="r">GC</th><th class="r">DG</th><th class="r">Pts</th><th>Últimos</th></tr></thead><tbody>';
    sorted.forEach((r,i)=>{
      const gd=r.gf-r.ga;let zone='';
      if(nT>=16){if(i<4)zone='zone-cl';else if(i<6)zone='zone-el';else if(i>=nT-3)zone='zone-rel';}
      const five=r.form.slice(-5).map(f=>'<span class="fdot fd-'+f.toLowerCase()+'">'+(f==='W'?'G':f==='D'?'E':'P')+'</span>').join('');
      tableHtml+='<tr class="'+zone+(i===0?' top1':'')+'"><td>'+(i+1)+'</td><td>'+crestHTML(r.t.es,15)+' <b>'+r.t.es+'</b></td><td class="r">'+r.gp+'</td><td class="r">'+r.w+'</td><td class="r">'+r.d+'</td><td class="r">'+r.l+'</td><td class="r">'+r.gf+'</td><td class="r">'+r.ga+'</td><td class="r">'+(gd>0?'+'+gd:gd)+'</td><td class="r" style="color:var(--gold);font-weight:700">'+r.pts+'</td><td>'+(five||'—')+'</td></tr>';});
    tableHtml+='</tbody></table>';
    if(nT>=16)tableHtml+='<div class="note">Zonas: continental (azul) · secundaria (dorado) · descenso (rojo).</div>';}
  const topG=Object.values(scorers).sort((a,b)=>b.goals-a.goals).slice(0,8);
  const scHtml=topG.length?'<table><thead><tr><th>Jugador</th><th>Equipo</th><th class="r">Goles</th></tr></thead><tbody>'+topG.map(s=>'<tr><td><b>'+s.name+'</b></td><td>'+crestHTML(s.team,13)+' '+s.team+'</td><td class="r" style="color:var(--gold);font-weight:700">'+s.goals+'</td></tr>').join('')+'</tbody></table>':'<div class="empty">Sin goles registrados.</div>';
  elm.innerHTML='<div class="panel"><div class="panel-h"><h3>Tabla · '+L.name+'</h3><span class="rule"></span></div>'+tableHtml+'</div>'+
    '<div><div class="panel"><div class="panel-h"><h3>Goleadores</h3><span class="rule"></span></div>'+scHtml+'</div>'+
    '<div class="panel" style="margin-top:16px"><div class="panel-h"><h3>Fuente</h3><span class="rule"></span></div><p style="font-size:12px;color:var(--mut);line-height:1.7">'+(espnOk?'Tabla de posiciones y goleadores reales (ESPN · temporada '+ESPN_SEASON+'). Si la API no responde, se usa tu historial.':'Cada predicción guardada suma un partido: con resultado real se usa ese; si no, el escenario más probable del modelo.')+'</p></div></div>';
}

/* ═══════════ CARTILLA ═══════════ */
let CART=[],SAVED_CARTS=lsGet('rp_carts_v6',[]);
function cartMsg(m,err){const e=el('cartMsg');e.textContent=m||'';e.style.color=err?'var(--red)':'var(--mut)';}
function addCartTeams(ta,tb,sel){
  let [la,lb]=autoLambdas(ta.s,tb.s);const lr=applyLearning(la,lb);la=lr[0];lb=lr[1];
  const r=autoRho(la+lb),R=simulate(la,lb,r);
  const possA=possShare(la,lb);
  const corTot=applyCornerLearn(teamCorners(teamShots(la,possA)))+applyCornerLearn(teamShots(lb,1-possA)?teamCorners(teamShots(lb,1-possA)):0);
  CART.push({id:'ct'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),A:ta.es,B:tb.es,R,corTot,yelTot:4.2,sel:sel?sel.slice():[]});
}
function addCartMatch(){
  const a=el('cartA').value,b=el('cartB').value;
  const ta=findAnyTeam(a),tb=findAnyTeam(b);
  if(!ta||!tb){cartMsg('Elige los dos equipos de la lista.',true);return;}
  if(norm(ta.es)===norm(tb.es)){cartMsg('Elige dos equipos distintos.',true);return;}
  addCartTeams(ta,tb);el('cartA').value='';el('cartB').value='';
  cartMsg('');renderCartilla();
}
function addCartByNames(a,b){const ta=findAnyTeam(a),tb=findAnyTeam(b);if(!ta||!tb)return;addCartTeams(ta,tb);renderCartilla();}
function addCartDayIdx(i){const m=_liveToday[i];if(m)addCartByNames(m.A,m.B);}
let _liveToday=[];
function removeCartMatch(id){CART=CART.filter(m=>m.id!==id);renderCartilla();}
function clearCart(){CART=[];renderCartilla();}
function cartLegs(m){
  const R=m.R,groups=[
    {t:'Resultado',legs:[{k:'1',grp:'res',dom:'g',lab:'Gana '+m.A,pred:(i,j)=>i>j},{k:'X',grp:'res',dom:'g',lab:'Empate',pred:(i,j)=>i===j},{k:'2',grp:'res',dom:'g',lab:'Gana '+m.B,pred:(i,j)=>i<j}]},
    {t:'Doble oportunidad',legs:[{k:'1X',grp:'dc',dom:'g',lab:m.A+' o empate',pred:(i,j)=>i>=j},{k:'12',grp:'dc',dom:'g',lab:'Sin empate',pred:(i,j)=>i!==j},{k:'X2',grp:'dc',dom:'g',lab:m.B+' o empate',pred:(i,j)=>i<=j}]},
    {t:'Goles totales',legs:[]},
    {t:'Ambos marcan',legs:[{k:'BTTS',grp:'btts',dom:'g',lab:'Sí',pred:(i,j)=>i>0&&j>0},{k:'BTTSN',grp:'btts',dom:'g',lab:'No',pred:(i,j)=>!(i>0&&j>0)}]}];
  const gLegs=[];
  for(let L=0.5;L<=4.5;L+=1){
    gLegs.push({k:'O'+(L*10).toFixed(0).padStart(2,'0'),grp:'g'+L,dom:'g',lab:'Over '+L,pred:(i,j)=>i+j>L});
    gLegs.push({k:'U'+(L*10).toFixed(0).padStart(2,'0'),grp:'g'+L,dom:'g',lab:'Under '+L,pred:(i,j)=>i+j<L});}
  groups[2].legs=gLegs;
  const cLegs=[];[8.5,9.5,10.5,11.5].forEach(L=>{cLegs.push({k:'CO'+L,grp:'c'+L,dom:'c',lab:'Over '+L,pred:k=>k>L});cLegs.push({k:'CU'+L,grp:'c'+L,dom:'c',lab:'Under '+L,pred:k=>k<L});});
  groups.push({t:'Córners totales',legs:cLegs});
  const yLegs=[];[2.5,3.5,4.5,5.5].forEach(L=>{yLegs.push({k:'YO'+L,grp:'y'+L,dom:'y',lab:'Over '+L,pred:k=>k>L});yLegs.push({k:'YU'+L,grp:'y'+L,dom:'y',lab:'Under '+L,pred:k=>k<L});});
  groups.push({t:'Tarjetas amarillas',legs:yLegs});
  groups.forEach(gr=>gr.legs.forEach(l=>{l.prob=l.dom==='g'?jointGoals(R,[l.pred]):(l.dom==='c'?jointPoisson(m.corTot,[l.pred]):jointPoisson(m.yelTot,[l.pred]));}));
  return groups;
}
function toggleCartLeg(mid,key){
  const m=CART.find(x=>x.id===mid);if(!m)return;
  const groups=cartLegs(m),byKey={};let leg=null;
  groups.forEach(gr=>gr.legs.forEach(l=>{byKey[l.k]=l;if(l.k===key)leg=l;}));
  if(!leg)return;
  if(m.sel.includes(key)){m.sel=m.sel.filter(k=>k!==key);renderCartilla();return;}
  const grpKeys=groups.reduce((a,gr)=>a.concat(gr.legs),[]).filter(l=>l.grp===leg.grp).map(l=>l.k);
  m.sel=m.sel.filter(k=>!grpKeys.includes(k));
  m.sel=m.sel.filter(k=>{const ol=byKey[k];if(!ol||ol.dom!==leg.dom)return true;
    const j=leg.dom==='g'?jointGoals(m.R,[leg.pred,ol.pred]):leg.dom==='c'?jointPoisson(m.corTot,[leg.pred,ol.pred]):jointPoisson(m.yelTot,[leg.pred,ol.pred]);
    return j>1e-9;});
  m.sel.push(key);renderCartilla();
}
function cartMatchProb(m){
  const groups=cartLegs(m),byKey={};groups.forEach(gr=>gr.legs.forEach(l=>byKey[l.k]=l));
  const gp=[],cp=[],yp=[];
  m.sel.forEach(k=>{const l=byKey[k];if(!l)return;(l.dom==='g'?gp:l.dom==='c'?cp:yp).push(l.pred);});
  return (gp.length?jointGoals(m.R,gp):1)*(cp.length?jointPoisson(m.corTot,cp):1)*(yp.length?jointPoisson(m.yelTot,yp):1);
}
function findPlayed(A,B){const na=norm(A),nb=norm(B);return HIST.find(x=>x.actualA!=null&&((norm(x.A)===na&&norm(x.B)===nb)||(norm(x.A)===nb&&norm(x.B)===na)));}
function legResult(key,hg,ag,cor,yel){
  const tot=hg+ag;
  if(key==='1')return hg>ag;if(key==='X')return hg===ag;if(key==='2')return hg<ag;
  if(key==='1X')return hg>=ag;if(key==='12')return hg!==ag;if(key==='X2')return hg<=ag;
  if(key==='BTTS')return hg>0&&ag>0;if(key==='BTTSN')return !(hg>0&&ag>0);
  if(key[0]==='C'){if(cor==null)return null;const L=parseFloat(key.slice(2));return key[1]==='O'?cor>L:cor<L;}
  if(key[0]==='Y'){if(yel==null)return null;const L=parseFloat(key.slice(2));return key[1]==='O'?yel>L:yel<L;}
  if(key[0]==='O'||key[0]==='U'){const L=parseInt(key.slice(1))/10;return key[0]==='O'?tot>L:tot<L;}
  return null;
}
function legLabel(k,A,B){
  const m={'1':'Gana '+A,'X':'Empate','2':'Gana '+B,'1X':A+' o empate','12':'Sin empate','X2':B+' o empate','BTTS':'Ambos marcan: Sí','BTTSN':'Ambos marcan: No'};
  if(m[k])return m[k];
  if(k[0]==='C')return 'Córners '+(k[1]==='O'?'Over':'Under')+' '+k.slice(2);
  if(k[0]==='Y')return 'Amarillas '+(k[1]==='O'?'Over':'Under')+' '+k.slice(2);
  if(k[0]==='O'||k[0]==='U')return (k[0]==='O'?'Over ':'Under ')+(parseInt(k.slice(1))/10).toFixed(1)+' goles';
  return k;
}
function evalSavedCart(c){
  let anyFalse=false,anyPending=false;const matchInfos=[];
  c.matches.forEach(mm=>{
    const played=findPlayed(mm.A,mm.B);
    let hg=null,ag=null,cor=null,yel=null;
    if(played){if(norm(played.A)===norm(mm.A)){hg=played.actualA;ag=played.actualB;}else{hg=played.actualB;ag=played.actualA;}
      if(played.actualStats){cor=played.actualStats.cornersTot;yel=played.actualStats.yellowTot;}}
    const legs=mm.sel.map(k=>{const res=played?legResult(k,hg,ag,cor,yel):null;
      if(res===false)anyFalse=true;else if(res==null)anyPending=true;
      return {label:legLabel(k,mm.A,mm.B),res};});
    matchInfos.push({A:mm.A,B:mm.B,played:!!played,hg,ag,legs});});
  return {status:anyFalse?'fail':(anyPending?'pend':'ok'),matchInfos};
}
function saveCart(){
  const picked=CART.filter(m=>m.sel.length);
  if(!picked.length){cartMsg('Elige al menos un mercado antes de guardar.',true);return;}
  const name=(prompt('Nombre para esta cartilla:','Cartilla '+(SAVED_CARTS.length+1))||'').trim();
  if(!name)return;
  let total=1;picked.forEach(m=>total*=cartMatchProb(m));
  SAVED_CARTS.unshift({id:'cs'+Date.now().toString(36),name,ts:Date.now(),prob:total,matches:picked.map(m=>({A:m.A,B:m.B,sel:m.sel.slice()}))});
  lsSet('rp_carts_v6',SAVED_CARTS);renderCartilla();showToast('Cartilla guardada');
}
function loadSavedCart(id){const c=SAVED_CARTS.find(x=>x.id===id);if(!c)return;CART=[];c.matches.forEach(mm=>{const ta=findAnyTeam(mm.A),tb=findAnyTeam(mm.B);if(ta&&tb)addCartTeams(ta,tb,mm.sel);});renderCartilla();}
function deleteSavedCart(id){SAVED_CARTS=SAVED_CARTS.filter(x=>x.id!==id);lsSet('rp_carts_v6',SAVED_CARTS);renderCartilla();}
function renderCartDay(){
  const e=el('ctDayMatches');
  const src=(_liveFlat.length?_liveFlat:_tickerFlat).filter(m=>m.state!=='post'&&findAnyTeam(m.A)&&findAnyTeam(m.B));
  _liveToday=src.slice(0,6);
  e.innerHTML=_liveToday.length?_liveToday.map((m,i)=>'<button class="ct-dayb" onclick="addCartDayIdx('+i+')">'+(m.state==='in'?'🔴 ':'')+crestHTML(m.A,14)+' '+m.A+' vs '+m.B+' '+crestHTML(m.B,14)+'</button>').join(''):'<span style="font-size:11px;color:var(--gray)">Los partidos del día aparecen solos al cargar la agenda.</span>';
}
function renderCartilla(){
  const host=el('cartMatches');
  if(!CART.length){host.innerHTML='<div class="empty" style="margin-top:12px">Agrega un partido para empezar.</div>';}
  else host.innerHTML=CART.map(m=>{
    const groups=cartLegs(m),selSet={};m.sel.forEach(k=>selSet[k]=1);
    const body=groups.map(gr=>{
      let rows='';
      for(let i=0;i<gr.legs.length;i+=2){
        const o=gr.legs[i],u=gr.legs[i+1];
        if(!u){rows+='<span class="ctk'+(selSet[o.k]?' on':'')+'" onclick="toggleCartLeg(\''+m.id+'\',\''+o.k+'\')">'+o.lab+' <b>'+pc(o.prob)+'</b></span>';continue;}
        rows+='<span class="ctk'+(selSet[o.k]?' on':'')+'" onclick="toggleCartLeg(\''+m.id+'\',\''+o.k+'\')">'+o.lab+' <b>'+pc(o.prob)+'</b></span><span class="ctk'+(selSet[u.k]?' on':'')+'" onclick="toggleCartLeg(\''+m.id+'\',\''+u.k+'\')">'+u.lab+' <b>'+pc(u.prob)+'</b></span>';}
      return '<div class="ct-grp"><div class="ct-grp-t">'+gr.t+'</div><div class="ct-chips">'+rows+'</div></div>';}).join('');
    return '<div class="ct-match"><div class="ct-match-h">'+crestHTML(m.A,16)+' '+m.A+' <span style="color:var(--mut)">vs</span> '+crestHTML(m.B,16)+' '+m.B+'<button class="del" onclick="removeCartMatch(\''+m.id+'\')">✕</button></div>'+body+'</div>';}).join('');
  renderCartSlip();
}
function renderCartSlip(){
  const e=el('cartSlip');
  const picked=CART.filter(m=>m.sel.length);
  let html='';
  if(!picked.length){html='<div class="empty">Elige al menos un mercado para ver la probabilidad conjunta.</div>';}
  else{
    let total=1,nLegs=0,rows='';
    picked.forEach(m=>{
      const groups=cartLegs(m),byKey={};groups.forEach(gr=>gr.legs.forEach(l=>byKey[l.k]=l));
      const mp=cartMatchProb(m);total*=mp;nLegs+=m.sel.length;
      const legs=m.sel.map(k=>byKey[k]?'<div class="ct-leg"><span>'+byKey[k].lab+'</span><span>'+pc(byKey[k].prob)+'</span></div>':'').join('');
      rows+='<div class="ct-slip-m"><div class="ct-slip-h">'+crestHTML(m.A,14)+' '+m.A+' vs '+m.B+' '+crestHTML(m.B,14)+'<span class="p">'+pc(mp)+'</span></div>'+legs+'</div>';});
    const totS=total>=0.01?pc(total):(total>0?(total*100).toFixed(2)+'%':'0%');
    const oneIn=total>0?Math.round(1/total):0;
    html=rows+'<div class="ct-total"><div class="mini-label">Probabilidad conjunta ('+nLegs+' selecciones · '+picked.length+' partidos)</div><div class="ct-total-p">'+totS+'</div><div style="font-size:12px;color:var(--mut)">Cuota justa: <b style="color:var(--gold)">'+(total>0?(1/total).toFixed(2):'—')+'</b>'+(oneIn?' · ~1 de cada <b style="color:var(--txt)">'+oneIn.toLocaleString('es')+'</b>':'')+'</div></div>'+
      '<div style="display:flex;gap:8px;margin-top:10px"><button class="go" style="flex:1" onclick="saveCart()">Guardar cartilla</button><button class="ghostb" onclick="clearCart()">Vaciar</button></div>'+
      '<div class="note">Partidos independientes entre sí; goles con correlación real dentro de cada uno.</div>';}
  if(SAVED_CARTS.length){
    html+='<div class="panel-h" style="margin-top:16px"><h3>Guardadas</h3><span class="rule"></span></div>'+SAVED_CARTS.map(c=>{
      const ev=evalSavedCart(c);
      const badge=ev.status==='ok'?'<span style="color:var(--acc)">✓ cumplida</span>':ev.status==='fail'?'<span style="color:var(--red)">✗ fallada</span>':'<span style="color:var(--gold)">⏳ pendiente</span>';
      const body=ev.matchInfos.map(mi=>{
        const sc=mi.played?'<span style="color:var(--mut)">'+mi.hg+'-'+mi.ag+'</span>':'<span style="color:var(--gray)">sin jugar</span>';
        const legs=mi.legs.map(l=>'<span style="margin-right:8px">'+(l.res===true?'✅':l.res===false?'❌':'⚪')+' '+l.label+'</span>').join('');
        return '<div style="margin-top:6px">'+crestHTML(mi.A,13)+' '+mi.A+' vs '+mi.B+' '+crestHTML(mi.B,13)+' '+sc+'<div style="color:var(--mut);font-size:11px;margin-top:2px">'+legs+'</div></div>';}).join('');
      return '<div class="ct-saved"><div class="ct-saved-h"><b>'+c.name+'</b> '+badge+'<span class="p">'+pc(c.prob)+'</span></div>'+body+'<div style="display:flex;gap:7px;margin-top:8px"><button class="ghostb" onclick="loadSavedCart(\''+c.id+'\')">Cargar</button><button class="ghostb" onclick="deleteSavedCart(\''+c.id+'\')">Eliminar</button></div></div>';}).join('');}
  e.innerHTML=html;
}

/* ═══════════ EL ÍDOLO (corregido) ═══════════ */
const IDOLO_KEY='rp_idolo_v7';
let idoloState=lsGet(IDOLO_KEY,null);
let idoloSel={country:'Argentina',pos:'ST',arch:null};
const IDOLO_COUNTRIES=['Argentina','Brasil','España','Francia','Alemania','Inglaterra','Italia','Países Bajos','Portugal','Uruguay','Colombia','México','Bélgica','Croacia','Marruecos','Japón','Estados Unidos','Nigeria','Ghana','Ecuador'];
const IDOLO_ATR=['pac','sho','pas','def','dri','phy'];
const IDOLO_ATR_L={pac:'PAC',sho:'SHO',pas:'PAS',def:'DEF',dri:'DRI',phy:'PHY'};
const IDOLO_IDOL=[{name:'Cantera',min:0},{name:'Promesa',min:15},{name:'Titular',min:30},{name:'Ídolo',min:50},{name:'Leyenda',min:70},{name:'Inmortal',min:90}];
const IDOLO_ARCH=[
{id:'finisher',name:'🎯 Finisher',pos:'ST',desc:'Definición letal',bonus:{sho:15,pac:5,dri:8}},
{id:'speedster',name:'⚡ Speedster',pos:'ST',desc:'Explosividad pura',bonus:{pac:18,sho:5,dri:5}},
{id:'targetman',name:'🦅 Target Man',pos:'ST',desc:'Juego aéreo y físico',bonus:{phy:15,sho:8,pac:3}},
{id:'playmaker',name:'🧠 Playmaker',pos:'CAM',desc:'Visión y pase',bonus:{pas:15,dri:8,sho:5}},
{id:'trequartista',name:'🎭 Trequartista',pos:'CAM',desc:'Lujo y fantasía',bonus:{dri:15,pas:8,pac:5}},
{id:'box2box',name:'🏃 Box-to-Box',pos:'CAM',desc:'Llegada desde atrás',bonus:{phy:10,pas:8,sho:6}}];
const IDOLO_EVENTS=[
{id:'derby',cat:'PARTIDO CLAVE',acc:'#4aa8ff',title:'Superclásico',desc:'El partido del año contra el archirrival. La cancha está que arde.',opts:[
{text:'Salir a imponer tu jerarquía',d:'Te hacés cargo desde el primer minuto.',g:.6,ovr:.4,form:2,idol:5,risk:'high'},
{text:'Jugar con cabeza fría',d:'Esperás el momento justo.',g:.3,ovr:.2,form:1,idol:2,risk:'safe'}]},
{id:'penalty',cat:'MOMENTO DECISIVO',acc:'#ffd166',title:'Penal sobre la hora',desc:'0-0, minuto 89, penal. Todos te miran.',opts:[
{text:'Pedir la pelota',d:'Asumís la responsabilidad.',g:.8,ovr:.25,form:3,idol:6,risk:'high'},
{text:'Que patee el 9',d:'Cedés la responsabilidad.',g:0,ovr:-.05,form:-1,idol:-1,risk:'safe'}]},
{id:'transfer',cat:'MERCADO',acc:'#a855f7',title:'Oferta millonaria',desc:'Un club grande preguntó por vos.',opts:[
{text:'Aceptar, quiero crecer',d:'Nuevos horizontes.',g:.2,ovr:.15,form:1,idol:2,risk:'high'},
{text:'Quedarme en mi club',d:'Lealtad.',g:.1,ovr:.05,form:2,idol:5,risk:'safe'}]},
{id:'injury',cat:'SALUD',acc:'#ff9d5c',title:'Molestia en entrenamiento',desc:'Sentiste un tirón feo.',opts:[
{text:'Descansar',d:'Precaución.',g:0,ovr:0,form:1,idol:1,risk:'safe'},
{text:'Infiltrarse',d:'Cueste lo que cueste.',g:.15,ovr:-.25,form:-2,idol:2,risk:'high'}]},
{id:'captain',cat:'LIDERAZGO',acc:'#ffd166',title:'El brazalete',desc:'El DT te ofrece la cinta.',opts:[
{text:'Aceptarlo',d:'Orgullo y responsabilidad.',g:.15,ovr:.12,form:2,idol:4,risk:'high'},
{text:'Que lo lleve otro',d:'Perfil bajo.',g:0,ovr:-.02,form:-1,idol:-2,risk:'safe'}]},
{id:'nacional',cat:'SELECCIÓN',acc:'#4aa8ff',title:'Convocatoria',desc:'El técnico quiere probarte.',opts:[
{text:'Ir y rendir',d:'Vidriera internacional.',g:.25,ovr:.18,form:2,idol:5,risk:'high'},
{text:'Rechazar',d:'Te enfocás en tu club.',g:0,ovr:-.1,form:-1,idol:-2,risk:'safe'}]},
{id:'training',cat:'ENTRENAMIENTO',acc:'#2ee584',title:'Pretemporada en altura',desc:'Doble turno. Todos miran.',opts:[
{text:'Darlo todo',d:'VO2 máx.',g:.15,ovr:.3,form:1,idol:2,risk:'high'},
{text:'Regular',d:'Dosificás.',g:0,ovr:0,form:0,idol:0,risk:'safe'}]},
{id:'hattrick',cat:'MOMENTO HISTÓRICO',acc:'#ffd166',title:'Hat-trick en puerta',desc:'Llevás dos goles. Quedan 20 minutos.',opts:[
{text:'Ir por el tercero',d:'Gloria individual.',g:.5,ovr:.2,form:2,idol:5,risk:'high'},
{text:'Cedérsela al compañero',d:'Generosidad.',g:.1,ovr:.05,form:1,idol:2,risk:'safe'}]},
{id:'redcard',cat:'CONFLICTO',acc:'#ff5d6c',title:'Entrada fuerte',desc:'El árbitro corre hacia vos.',opts:[
{text:'Disculparse',d:'Madurez.',g:0,ovr:-.05,form:0,idol:2,risk:'safe'},
{text:'Reclamar airado',d:'Puede costar caro.',g:0,ovr:-.15,form:-1,idol:-3,risk:'high'}]},
{id:'rookie',cat:'VESTUARIO',acc:'#a855f7',title:'La promesa te admira',desc:'Un pibe te pide consejo.',opts:[
{text:'Dedicarle tiempo',d:'Mentoría.',g:.05,ovr:.05,form:1,idol:3,risk:'safe'},
{text:'Seguir con lo tuyo',d:'Cada uno en la suya.',g:0,ovr:-.02,form:0,idol:-2,risk:'safe'}]}];
function idoloSave(){lsSet(IDOLO_KEY,idoloState);}
function idoloDelete(){try{localStorage.removeItem(IDOLO_KEY);}catch(e){}idoloState=null;idoloRender();}
function idoloOverall(atr){return Math.round((atr.pac+atr.sho+atr.pas+atr.def+atr.dri+atr.phy)/6);}
function idoloIdolLvl(p){let l=IDOLO_IDOL[0];IDOLO_IDOL.forEach(x=>{if(p>=x.min)l=x;});return l;}
function idoloBaseStats(pos){
  const b={pac:55+Math.floor(Math.random()*15),sho:50+Math.floor(Math.random()*15),pas:50+Math.floor(Math.random()*15),def:35+Math.floor(Math.random()*15),dri:50+Math.floor(Math.random()*15),phy:45+Math.floor(Math.random()*15)};
  if(pos==='ST'){b.sho+=8;b.pac+=5;b.dri+=3;}else{b.pas+=8;b.dri+=5;b.pac+=2;}
  return b;
}
function idoloRandomRival(){
  const names=['Elías Valverde','Mateo Centurión','Benjamín Farías','Santiago Lagos','Thiago Montenegro','Joaquín Paz','Facundo Olivera','Lautaro Méndez'];
  const ctrs=['Argentina','Uruguay','Colombia','Brasil','España'];
  return {name:names[Math.floor(Math.random()*names.length)],country:ctrs[Math.floor(Math.random()*ctrs.length)],goals:0,apps:0};
}
const IDOLO_CLUBS=[{name:'Atlético Juventud',tier:0},{name:'Club Progreso',tier:0},{name:'Deportivo Norte',tier:1},{name:'Real Cordillera',tier:1},{name:'Racing del Sur',tier:2},{name:'Unión FC',tier:2},{name:'Atlético Central',tier:3},{name:'Club Gigante',tier:3},{name:'Real Estrella',tier:4}];
function idoloSeasonStats(p){
  const ovr=idoloOverall(p.atr),fm=p.form/10,op=ovr/100;
  const ap=Math.max(0.5,1-(p.age-32)*0.03);
  const apps=Math.max(3,Math.round((12+op*28)*fm*ap)+Math.floor(Math.random()*6)-3);
  let gr,ar;
  if(p.position==='ST'){gr=0.10+op*0.55;ar=0.03+op*0.18;}else{gr=0.04+op*0.25;ar=0.06+op*0.32;}
  return {apps,goals:Math.round(apps*gr*(Math.random()*0.4+0.8)),asts:Math.round(apps*ar*(Math.random()*0.5+0.75))};
}
function idoloRender(){
  const e=el('idoloBody');if(!e)return;
  if(idoloState&&idoloState.step==='creating'){e.innerHTML=idoCreation();return;}
  if(!idoloState||!idoloState.player||idoloState.player.retired){e.innerHTML=idoMenu();return;}
  const s=idoloState.step;
  if(s==='events')e.innerHTML=idoEvents();
  else if(s==='season_result')e.innerHTML=idoSeasonResult();
  else if(s==='training')e.innerHTML=idoTraining();
  else if(s==='transfer')e.innerHTML=idoTransfer();
  else e.innerHTML=idoDashboard();
}
function idoMenu(){
  const has=idoloState&&idoloState.player&&!idoloState.player.retired;
  return '<div class="panel" style="text-align:center;padding:34px 24px"><div style="font-size:40px">👑</div><div class="kicker" style="margin-top:8px">Modo carrera</div><h3 style="font-size:24px;margin:4px 0 8px">EL ÍDOLO</h3><p style="font-size:13px;color:var(--mut);max-width:380px;margin:0 auto 18px">Debutá a los 17, atravesá eventos, ganá títulos y decidí cuándo colgar los botines.</p>'+
    (has?'<button class="ido-btn" style="max-width:280px" onclick="idoloRender()">▶ Continuar carrera</button><button class="ido-btn ghost" style="max-width:280px;margin-top:9px" onclick="if(confirm(\'¿Borrar la carrera actual?\'))idoloDelete()">🗑 Nueva carrera</button>':'<button class="ido-btn" style="max-width:280px" onclick="idoloNew()">⚽ Empezar carrera</button>')+'</div>';
}
function idoloNew(){idoloState={player:null,step:'creating',events:[],currentEvent:0,rival:null};idoloSel={country:'Argentina',pos:'ST',arch:null};idoloRender();}
function idoCreation(){
  if(!idoloSel.arch||!IDOLO_ARCH.some(a=>a.id===idoloSel.arch&&a.pos===idoloSel.pos)){
    const first=IDOLO_ARCH.find(a=>a.pos===idoloSel.pos);
    idoloSel.arch=first?first.id:IDOLO_ARCH[0].id;}
  const cBtns=IDOLO_COUNTRIES.map(c=>'<button class="ido-c'+(idoloSel.country===c?' on':'')+'" onclick="idoloPickCountry(\''+c+'\')">'+((TEAMS.find(t=>t.es===c)||{f:'🏳️'}).f)+' '+c+'</button>').join('');
  const arcs=IDOLO_ARCH.filter(a=>a.pos===idoloSel.pos).map(a=>'<button class="ido-arc'+(idoloSel.arch===a.id?' on':'')+'" onclick="idoloPickArch(\''+a.id+'\')"><div class="n">'+a.name+'</div><div class="d">'+a.desc+'</div><div class="b">'+Object.keys(a.bonus).map(k=>'<span>'+IDOLO_ATR_L[k]+' +'+a.bonus[k]+'</span>').join('')+'</div></button>').join('');
  const arch=IDOLO_ARCH.find(a=>a.id===idoloSel.arch);
  const ovr=idoloOverall(idoloApplyArch(idoloBaseStats(idoloSel.pos),arch));
  return '<div class="panel"><div class="kicker">Creación del jugador</div><h3 style="margin:2px 0 0">CREÁ TU ESTRELLA</h3>'+
    '<div class="ido-lbl">Datos básicos</div>'+
    '<div style="display:flex;gap:9px"><input class="inp" id="idoName" placeholder="Nombre del jugador" style="flex:3"><input class="inp" id="idoNum" type="number" value="10" min="1" max="99" style="flex:1"></div>'+
    '<div class="ido-lbl">Nacionalidad</div><div class="ido-cgrid">'+cBtns+'</div>'+
    '<div class="ido-lbl">Posición</div><div class="ido-pgrid">'+
    '<button class="ido-posc'+(idoloSel.pos==='ST'?' on':'')+'" onclick="idoloPickPos(\'ST\')"><div class="n">9</div><div class="l">Delantero · ST</div></button>'+
    '<button class="ido-posc'+(idoloSel.pos==='CAM'?' on':'')+'" onclick="idoloPickPos(\'CAM\')"><div class="n">10</div><div class="l">Mediapunta · CAM</div></button></div>'+
    '<div class="ido-lbl">Arquetipo</div><div class="ido-agrid">'+arcs+'</div>'+
    '<div class="note" style="margin-top:12px">Media inicial estimada: <b style="color:var(--acc)">'+ovr+'</b> · '+idoloSel.country+' · '+idoloSel.pos+'</div>'+
    '<button class="ido-btn" style="margin-top:16px" onclick="idoCreate()">🚀 Comenzar mi carrera</button></div>';
}
function idoloApplyArch(atr,arch){if(arch)Object.keys(arch.bonus).forEach(k=>{atr[k]=Math.min(99,atr[k]+arch.bonus[k]);});return atr;}
function idoloPickCountry(c){idoloSel.country=c;idoloRender();}
function idoloPickPos(p){idoloSel.pos=p;idoloSel.arch=null;idoloRender();}
function idoloPickArch(a){idoloSel.arch=a;idoloRender();}
function idoCreate(){
  const nameEl=el('idoName'),numEl=el('idoNum');
  const name=nameEl?nameEl.value.trim():'';
  const num=numEl?parseInt(numEl.value,10)||10:10;
  if(!name){showToast('Escribí el nombre de tu jugador');return;}
  const arch=IDOLO_ARCH.find(a=>a.id===idoloSel.arch&&a.pos===idoloSel.pos);
  if(!arch){showToast('Elegí un arquetipo válido');return;}
  const atr=idoloApplyArch(idoloBaseStats(idoloSel.pos),arch);
  const ovr=idoloOverall(atr);
  const startClub=IDOLO_CLUBS[Math.floor(Math.random()*2)];
  idoloState={player:{name,number:num,country:idoloSel.country,position:idoloSel.pos,archetype:arch.id,age:17,season:0,
    atr,potential:ovr+5+Math.floor(Math.random()*15),form:6,goals:0,assists:0,appearances:0,
    titles:[],idolatry:5,money:50000,club:startClub.name,clubTier:startClub.tier,
    history:[],nationalApps:0,nationalGoals:0,legend:false,retired:false},
    rival:idoloRandomRival(),step:'dashboard',events:[],currentEvent:0};
  idoloSave();idoloRender();
  showToast('Debut confirmado en '+idoloState.player.club);
}
function idoDashboard(){
  const p=idoloState.player,ovr=idoloOverall(p.atr),r=idoloState.rival;
  const lvl=idoloIdolLvl(p.idolatry);
  const atrH=IDOLO_ATR.map(k=>{const v=p.atr[k],c=v>=85?'var(--acc)':v>=70?'var(--gold)':v>=50?'var(--txt)':'var(--red)';return '<div><b style="color:'+c+'">'+v+'</b>'+IDOLO_ATR_L[k]+'</div>';}).join('');
  const hasEvents=idoloState.events&&idoloState.events.length>0&&idoloState.currentEvent<idoloState.events.length;
  const hist=p.history.slice(-4).reverse().map(h=>'<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--gray);padding:3px 0;border-bottom:1px solid var(--line)"><span>Temp '+h.season+'</span><span>'+h.club+'</span><span>'+h.apps+' PJ · '+h.goals+' G · OVR '+h.ovr+'</span></div>').join('');
  const canRetire=p.age>=34;
  return '<div class="ido-hero"><div class="mini-label">'+p.country+' · '+p.position+' · '+p.age+' años · #'+p.number+'</div>'+
    '<div class="ido-name">'+p.name+'</div>'+
    '<div class="ido-club">🏟 '+p.club+' · Temporada '+(p.season+1)+'</div>'+
    '<div style="display:flex;align-items:center;justify-content:center;gap:18px;margin-top:12px">'+
    '<div><div class="ido-ovr">'+ovr+'</div><div class="mini-label">OVR / '+p.potential+'</div></div>'+
    '<div style="text-align:left;font-size:12px;color:var(--mut)">Forma '+'▮'.repeat(Math.max(1,Math.ceil(p.form/2)))+'▯'.repeat(Math.max(0,5-Math.ceil(p.form/2)))+'<br>Idolatría: <b style="color:var(--gold)">'+lvl.name+'</b> ('+p.idolatry+'/100)</div></div>'+
    '<div class="ido-atr">'+atrH+'</div><div class="ido-idol"><i style="width:'+Math.min(100,p.idolatry)+'%"></i></div></div>'+
    '<div class="ido-row2"><div class="panel"><div class="panel-h"><h3>Carrera</h3><span class="rule"></span></div>'+
    '<div class="rend-grid" style="grid-template-columns:repeat(3,1fr);margin:0">'+
    '<div class="rend-cell"><b>'+p.appearances+'</b><span>PJ</span></div><div class="rend-cell gold"><b>'+p.goals+'</b><span>Goles</span></div><div class="rend-cell blue"><b>'+p.assists+'</b><span>Asist.</span></div>'+
    '<div class="rend-cell"><b>'+p.nationalApps+'</b><span>Sel. PJ</span></div><div class="rend-cell gold"><b>'+p.nationalGoals+'</b><span>Sel. G</span></div><div class="rend-cell"><b>$'+(p.money/1000).toFixed(0)+'k</b><span>Dinero</span></div></div></div>'+
    '<div class="panel"><div class="panel-h"><h3>Rival: '+r.name+'</h3><span class="rule"></span></div>'+
    '<div style="display:flex;justify-content:space-around;text-align:center;padding:8px 0">'+
    '<div><div style="font-weight:700">'+p.name+'</div><div style="color:var(--acc);font-family:var(--disp)">'+p.goals+' G</div></div>'+
    '<div style="color:var(--gold);align-self:center;font-weight:700">VS</div>'+
    '<div><div style="font-weight:700;color:var(--gold)">'+r.name+'</div><div style="color:var(--mut);font-family:var(--disp)">'+r.goals+' G</div></div></div>'+
    '<div class="panel-h" style="margin-top:8px"><h3>Títulos ('+p.titles.length+')</h3><span class="rule"></span></div>'+
    (p.titles.length?'<div style="font-size:12px;color:var(--gold)">'+p.titles.map(t=>'🏆 '+t).join(' · ')+'</div>':'<div class="empty" style="padding:8px">Ninguno todavía</div>')+'</div></div>'+
    (p.legend?'<div class="panel" style="text-align:center;border-color:var(--gold);margin-bottom:14px"><b style="color:var(--gold)">👑 ERES UNA LEYENDA DEL FÚTBOL</b></div>':'')+
    '<div class="ido-btns">'+(hasEvents?'<button class="ido-btn" onclick="idoloRender()">▶ Continuar eventos</button>':'<button class="ido-btn" onclick="idoloStartSeason()">📅 Jugar temporada '+(p.season+1)+'</button>')+
    '<button class="ido-btn ghost" onclick="idoloState.step=\'training\';idoloSave();idoloRender()">🏋️ Entrenar</button></div>'+
    '<div class="ido-btns" style="margin-top:9px"><button class="ido-btn ghost" onclick="idoloState.step=\'transfer\';idoloSave();idoloRender()">🔁 Mercado de pases</button>'+(canRetire?'<button class="ido-btn danger" onclick="idoloRetire()">👋 Retirarse</button>':'')+'</div>'+
    (hist?'<div class="panel" style="margin-top:14px"><div class="panel-h"><h3>Historial</h3><span class="rule"></span></div>'+hist+'</div>':'')+
    '<div class="ido-btns" style="margin-top:12px"><button class="ido-btn ghost" onclick="idoloExport()">📤 Exportar historia</button><button class="ido-btn danger" onclick="if(confirm(\'¿Borrar carrera?\'))idoloDelete()">🗑 Borrar carrera</button></div>';
}
function idoloStartSeason(){
  delete idoloState._showResult;delete idoloState._choiceResult;
  const p=idoloState.player;p.season++;p.age++;
  const pool=IDOLO_EVENTS.slice(),n=1+Math.floor(Math.random()*2),sel=[];
  for(let i=0;i<n&&pool.length;i++){const idx=Math.floor(Math.random()*pool.length);sel.push(pool[idx]);pool.splice(idx,1);}
  idoloState.events=sel;idoloState.currentEvent=0;
  idoloState.step='events';idoloSave();idoloRender();
}
function idoEvents(){
  if(!idoloState.events.length||idoloState.currentEvent>=idoloState.events.length)return idoFinishSeason();
  const ev=idoloState.events[idoloState.currentEvent],p=idoloState.player,total=idoloState.events.length;
  if(idoloState._showResult&&idoloState._choiceResult){
    const r=idoloState._choiceResult;
    const titles={success:'¡LA ROMPISTE!',mixed:'DECISIÓN CUMPLIDA',fail:'NO SALIÓ'};
    const descs={success:'Te impusiste en el momento clave.',mixed:'No todo salió perfecto, pero plantaste cara.',fail:'La jugada no salió. A aprender.'};
    const ch=[];
    if(r.bonusG)ch.push('+'+r.bonusG+' goles');
    if(r.formChange)ch.push((r.formChange>0?'+':'')+r.formChange+' forma');
    if(r.idolChange)ch.push((r.idolChange>0?'+':'')+r.idolChange+' idolatría');
    if(r.atrChange)ch.push(r.atrKey.toUpperCase()+(r.atrChange>0?'+':'')+r.atrChange);
    return '<div class="ido-event"><div class="ido-ev-accent" style="background:'+ev.acc+'"></div><div class="ido-ev-body">'+
      '<div class="ido-ev-cat" style="color:'+ev.acc+'">'+ev.cat+' · TEMPORADA '+p.season+'</div>'+
      '<div class="ido-ev-title">'+ev.title+'</div>'+
      '<div class="ido-res '+r.type+'"><div style="font-family:var(--disp);font-size:19px;font-weight:700">'+titles[r.type]+'</div>'+
      '<p style="font-size:13px;color:var(--mut);margin-top:6px">'+descs[r.type]+'</p>'+
      (ch.length?'<div style="margin-top:9px;display:flex;gap:7px;justify-content:center;flex-wrap:wrap">'+ch.map(c=>'<span class="badge ok">'+c+'</span>').join('')+'</div>':'')+
      '<button class="ido-btn" style="margin-top:14px" onclick="idoNextEvent()">Continuar ▶</button></div></div></div>';
  }
  const choices=ev.opts.map((o,i)=>{
    const rc=o.risk==='high'?'var(--gold)':'var(--acc)';
    const sp=[];
    if(o.g)sp.push('+'+Math.round(o.g*100)+'% gol');
    if(o.form)sp.push((o.form>0?'+':'')+o.form+' forma');
    if(o.idol)sp.push((o.idol>0?'+':'')+o.idol+' idolatría');
    return '<button class="ido-choice" onclick="idoChoose('+i+')"><div class="t">'+o.text+'</div><div class="d">'+o.d+'</div><span class="f" style="color:'+rc+';background:rgba(255,255,255,.05)">'+(o.risk==='high'?'🎯 ALTO RIESGO':'🛡 SEGURO')+'</span> <span style="font-size:10px;color:var(--gray)">'+sp.join(' · ')+'</span></button>';}).join('');
  return '<div class="ido-event"><div class="ido-ev-accent" style="background:'+ev.acc+'"></div><div class="ido-ev-body">'+
    '<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--gray)"><span>'+p.club+' · '+p.age+' años</span><span>EVENTO '+(idoloState.currentEvent+1)+'/'+total+'</span></div>'+
    '<div class="ido-ev-cat" style="color:'+ev.acc+';margin-top:8px">'+ev.cat+'</div>'+
    '<div class="ido-ev-title">'+ev.title+'</div>'+
    '<div class="ido-ev-desc">'+ev.desc+'</div>'+choices+'</div></div>';
}
function idoChoose(idx){
  const ev=idoloState.events[idoloState.currentEvent],choice=ev.opts[idx];if(!choice)return;
  const p=idoloState.player;
  const roll=Math.random();
  let bonusG=0,bonusA=0;
  if(choice.g&&roll<choice.g)bonusG=1+Math.floor(Math.random()*2);
  if(Math.random()<0.2)bonusA=1;
  p.goals+=bonusG;p.assists+=bonusA;
  const key=IDOLO_ATR[Math.floor(Math.random()*IDOLO_ATR.length)];
  const atrChange=Math.round(((choice.ovr||0)*8)+(Math.random()*3-1));
  p.atr[key]=clamp(p.atr[key]+atrChange,30,99);
  p.form=clamp(p.form+(choice.form||0),0,10);
  p.idolatry=clamp(p.idolatry+(choice.idol||0),0,100);
  if(ev.id==='nacional'&&idx===0){p.nationalApps+=1+Math.floor(Math.random()*4);if(Math.random()<0.3)p.nationalGoals+=1+Math.floor(Math.random()*2);}
  if(bonusG>0){
    if(ev.id==='derby'&&!p.titles.includes('Superclásico'))p.titles.push('Superclásico');
    if(ev.id==='hattrick'&&!p.titles.includes('Hat-trick memorable'))p.titles.push('Hat-trick memorable');}
  if(ev.id==='transfer'&&idx===0&&bonusG>0){const nc=IDOLO_CLUBS[Math.min(IDOLO_CLUBS.length-1,p.clubTier+1)];if(nc.tier>p.clubTier){p.club=nc.name;p.clubTier=nc.tier;}}
  const type=bonusG>0?'success':((choice.ovr||0)>0.1?'mixed':'fail');
  idoloState._choiceResult={type,bonusG,formChange:choice.form||0,idolChange:choice.idol||0,atrKey:key,atrChange};
  idoloState._showResult=true;
  idoloSave();idoloRender();
}
function idoNextEvent(){
  delete idoloState._showResult;delete idoloState._choiceResult;
  idoloState.currentEvent++;
  if(idoloState.currentEvent>=idoloState.events.length){idoFinishSeason();return;}
  idoloSave();idoloRender();
}
function idoFinishSeason(){
  const p=idoloState.player,ss=idoloSeasonStats(p);
  p.appearances+=ss.apps;p.goals+=ss.goals;p.assists+=ss.asts;
  const growth=p.season<5?1+Math.floor(Math.random()*3):Math.floor(Math.random()*2);
  for(let i=0;i<growth;i++){const k=IDOLO_ATR[Math.floor(Math.random()*6)];p.atr[k]=Math.min(99,p.atr[k]+1);}
  p.form=Math.min(10,p.form+Math.floor(Math.random()*3));
  p.money+=20000+Math.floor(Math.random()*20000);
  p.idolatry=Math.min(100,p.idolatry+1+Math.floor(Math.random()*4));
  const titleChance=p.clubTier>=3?0.5:p.clubTier>=2?0.35:0.2;
  if(Math.random()<titleChance)p.titles.push('Liga '+p.club);
  if(p.season%4===0&&p.idolatry>=30){p.titles.push('Copa Internacional');p.nationalApps+=5+Math.floor(Math.random()*3);p.nationalGoals+=Math.floor(Math.random()*3);}
  const r=idoloState.rival;r.apps+=5+Math.floor(Math.random()*15);r.goals+=Math.floor(Math.random()*8);
  const ovr=idoloOverall(p.atr);
  const isLegend=ovr>=90&&p.goals>=300&&p.titles.length>=5&&p.nationalApps>=40;
  if(isLegend&&!p.legend)p.legend=true;
  if(p.age>=41)p.retired=true;
  p.history.push({season:p.season,club:p.club,apps:ss.apps,goals:ss.goals,asts:ss.asts,ovr});
  idoloState.step='season_result';idoloSave();
  return idoSeasonResult();
}
function idoSeasonResult(){
  const p=idoloState.player;
  const headlines=['¡Temporada histórica de '+p.name+'!',''+p.name+' brilló este año','Actuación estelar de '+p.name+'',''+p.name+' se consagra en '+p.club];
  const stories=['El talento de '+p.country+' sigue demostrando su calidad.','La hinchada ya lo canta: es el ídolo del club.','Los medios hablan de una temporada para el recuerdo.'];
  const canRetire=p.age>=34;
  return '<div class="ido-news"><div class="hl">'+headlines[Math.floor(Math.random()*headlines.length)]+'</div>'+
    '<div class="dt">Temporada '+p.season+' · '+p.club+'</div>'+
    '<div class="st">'+stories[Math.floor(Math.random()*stories.length)]+'</div></div>'+
    '<div class="rend-grid" style="grid-template-columns:repeat(4,1fr)">'+
    '<div class="rend-cell"><b>'+p.appearances+'</b><span>PJ</span></div><div class="rend-cell gold"><b>'+p.goals+'</b><span>Goles</span></div><div class="rend-cell blue"><b>'+p.assists+'</b><span>Asist.</span></div><div class="rend-cell"><b>'+idoloOverall(p.atr)+'</b><span>OVR</span></div></div>'+
    (p.retired?'<div class="panel" style="text-align:center;border-color:var(--gold);margin:14px 0"><h3 style="color:var(--gold)">👋 Carrera terminada</h3><p style="font-size:13px;color:var(--mut);margin-top:6px">'+p.name+' se retiró a los '+p.age+' años con '+p.goals+' goles, '+p.appearances+' partidos y '+p.titles.length+' títulos.'+(p.legend?'<br><b style="color:var(--gold)">👑 ERES UNA LEYENDA INMORTAL.</b>':'')+'</p><div class="ido-btns" style="margin-top:12px"><button class="ido-btn" onclick="idoloDelete()">⚽ Nueva carrera</button></div></div>':
    '<div class="ido-btns"><button class="ido-btn" onclick="idoloState.step=\'dashboard\';idoloSave();idoloRender()">Continuar ▶</button><button class="ido-btn ghost" onclick="idoloState.step=\'transfer\';idoloSave();idoloRender()">🔁 Mercado</button>'+(canRetire?'<button class="ido-btn danger" onclick="idoloRetire()">👋 Retirarse</button>':'')+'</div>');
}
function idoTraining(){
  const p=idoloState.player,cost=15000;
  const items=IDOLO_ATR.map(k=>{const v=p.atr[k],maxed=v>=99,can=p.money>=cost&&!maxed;
    return '<button class="ctk'+(maxed?' on':'')+'" style="padding:10px 14px;font-size:12.5px;'+(maxed?'opacity:.6':'')+'" '+(can?'onclick="idoloTrain(\''+k+'\')"':'')+'>'+IDOLO_ATR_L[k]+' <b>'+v+'</b> '+(maxed?'MAX':'· $15k → +1/3')+'</button>';}).join(' ');
  return '<div class="panel"><div class="panel-h"><h3>Entrenamiento</h3><span class="rule"></span></div>'+
    '<p style="font-size:12.5px;color:var(--mut)">Disponible: <b style="color:var(--acc)">$'+p.money.toLocaleString()+'</b> · $15.000 por sesión.</p>'+
    '<div class="ct-chips" style="margin-top:12px">'+items+'</div>'+
    '<button class="ido-btn ghost" style="margin-top:16px;flex:0" onclick="idoloState.step=\'dashboard\';idoloSave();idoloRender()">◀ Volver</button></div>';
}
function idoloTrain(k){const p=idoloState.player;if(p.money<15000||p.atr[k]>=99)return;p.money-=15000;p.atr[k]=Math.min(99,p.atr[k]+1+Math.floor(Math.random()*3));idoloSave();idoloRender();}
function idoTransfer(){
  const p=idoloState.player,ovr=idoloOverall(p.atr);
  if(!idoloState._offers){
    const offers=[{name:p.club,current:true,tier:p.clubTier}];
    const renPct=clamp(30+p.idolatry/2+(p.season-p.clubTier)*3,10,95);
    offers.push({name:p.club,renewal:true,tier:p.clubTier,renewalPct:Math.round(renPct)});
    const pool=IDOLO_CLUBS.filter(c=>c.name!==p.club&&Math.abs(c.tier-p.clubTier)<=1+(ovr>=80?1:0));
    for(let i=0;i<2&&pool.length;i++){const idx=Math.floor(Math.random()*pool.length);offers.push(pool.splice(idx,1)[0]);}
    idoloState._offers=offers;}
  const rows=idoloState._offers.map((o,i)=>{
    if(o.renewal)return '<button class="ido-choice" onclick="idoloPickOffer('+i+')"><div class="t">★ Renovación · '+o.name+'</div><div class="d">'+o.renewalPct+'% de renovar</div></button>';
    return '<button class="ido-choice" onclick="idoloPickOffer('+i+')"><div class="t">'+(o.current?'● ':'')+o.name+'</div><div class="d">Nivel: '+['Ascenso','Media Tabla','Primera','Élite','Champions'][o.tier]+(o.current?' · (actual)':' · -8 idolatría')+'</div></button>';}).join('');
  return '<div class="panel"><div class="panel-h"><h3>Mercado de pases · OVR '+ovr+'</h3><span class="rule"></span></div>'+
    '<p style="font-size:12.5px;color:var(--mut);margin-bottom:8px">Elegí tu club para la próxima temporada.</p>'+rows+
    '<button class="ido-btn ghost" style="margin-top:14px;flex:0" onclick="delete idoloState._offers;idoloState.step=\'dashboard\';idoloSave();idoloRender()">◀ Volver</button></div>';
}
function idoloPickOffer(i){
  const sel=(idoloState._offers||[])[i];if(!sel)return;
  const p=idoloState.player;
  if(sel.renewal){
    if(Math.random()*100<=sel.renewalPct){p.idolatry=Math.min(100,p.idolatry+3);p.form=Math.min(10,p.form+1);showToast('Renovaste con '+p.club);}
    else showToast('La renovación no llegó a buen puerto');}
  else if(!sel.current){p.club=sel.name;p.clubTier=sel.tier;p.idolatry=Math.max(0,p.idolatry-8);showToast('Nuevo club: '+sel.name);}
  delete idoloState._offers;
  idoloState.events=[];idoloState.step='dashboard';
  idoloSave();idoloRender();
}
function idoloRetire(){if(!confirm('¿Retirarte ahora?'))return;idoloState.player.retired=true;idoloState.step='season_result';idoloSave();idoloRender();}
function idoloExport(){
  const p=idoloState.player;
  let t='=== EL ÍDOLO: '+p.name+' ===\nPaís: '+p.country+' · Pos: '+p.position+' · #'+p.number+'\nEdad: '+p.age+'\n\nTotales:\nPJ:'+p.appearances+' G:'+p.goals+' A:'+p.assists+'\nSel: '+p.nationalApps+' PJ · '+p.nationalGoals+' G\nTítulos: '+p.titles.length+' · Idolatría: '+p.idolatry+'\nLeyenda: '+(p.legend?'SÍ':'No')+'\n\nHistorial:\n';
  p.history.forEach(h=>{t+='Temp '+h.season+': '+h.club+' '+h.apps+'PJ '+h.goals+'G '+h.asts+'A OVR'+h.ovr+'\n';});
  const b=new Blob([t],{type:'text/plain'}),a=document.createElement('a');
  a.href=URL.createObjectURL(b);a.download='el_idolo_'+p.name.replace(/\s+/g,'_')+'.txt';a.click();URL.revokeObjectURL(a.href);
}

/* ═══════════ RESUMEN / NAV ═══════════ */
function renderResumen(){
  const L=LEAGUES[CURRENT_LEAGUE];
  el('resBadge').innerHTML=leagueLogoHTML(CURRENT_LEAGUE,16)+' '+L.name;
  el('resBadge').style.color=L.color;
  el('resTitle').textContent=L.name;
  el('resSub').textContent=L.sub;
  const pool=poolTeams();
  const done=HIST.filter(x=>x.actualA!=null&&x.actualB!=null);
  const res=done.filter(x=>judge(x).hitRes).length;
  el('resStats').innerHTML=
    '<div class="kpi g"><b>'+pool.length+'</b><span>Equipos en la base</span></div>'+
    '<div class="kpi a"><b>'+HIST.length+'</b><span>Predicciones guardadas</span></div>'+
    '<div class="kpi o"><b>'+(done.length?pc(res/done.length):'—')+'</b><span>Acierto de resultado</span></div>'+
    '<div class="kpi"><b>'+(LEARN.ready?'×'+LEARN.goalAdj.toFixed(2):'—')+'</b><span>Calibración activa</span></div>';
  const src=(_liveFlat.length?_liveFlat:_tickerFlat).filter(m=>m.state!=='post'&&m.league===CURRENT_LEAGUE).slice(0,4);
  el('resNext').innerHTML=src.length?src.map(m=>{
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px;cursor:pointer" onclick="openLiveMatchObj((_liveFlat.length?_liveFlat:_tickerFlat)['+m.idx+'])"><span>'+crestHTML(m.A,15)+' '+m.A+' <span style="color:var(--gray)">vs</span> '+m.B+' '+crestHTML(m.B,15)+'</span><span style="color:var(--mut);font-size:11px">'+(m.state==='in'?'🔴 en vivo':m.label)+'</span></div>';}).join(''):'<div class="empty">Sin partidos próximos para '+L.name+' hoy. La vista «En vivo» muestra todas las competiciones.</div>';
}
const VIEW_TITLES={resumen:'Resumen',envivo:'En vivo',match:'Predictor',bracket:'Cuadro',stats:'Tabla',cartilla:'Cartilla',rend:'Rendimiento',idolo:'El Ídolo',ranking:'Ranking'};
function showView(v){
  document.querySelectorAll('.view').forEach(s=>s.classList.toggle('active',s.id==='view-'+v));
  document.querySelectorAll('.side-item[data-v]').forEach(t=>t.classList.toggle('active',t.dataset.v===v));
  document.querySelectorAll('.tab-item[data-v]').forEach(t=>t.classList.toggle('active',t.dataset.v===v));
  el('tbTitle').textContent=VIEW_TITLES[v]||v;
  const chip=el('tbChip');
  if(v==='envivo'){chip.innerHTML='<span class="lg-dot" style="background:var(--live)"></span>Global · todas las competiciones';}
  else if(v==='idolo'){chip.innerHTML='<span class="lg-dot" style="background:var(--gold)"></span>Modo carrera';}
  else{const L=LEAGUES[CURRENT_LEAGUE];chip.innerHTML='<span class="lg-dot" style="background:'+L.color+'"></span>'+leagueLogoHTML(CURRENT_LEAGUE,14)+' '+L.name;}
  const bar=el('tickerBar');
  if(bar){
    if(v==='envivo'){bar.style.display='none';}
    else{bar.style.display='';if(Date.now()-_tickerAt>60000)renderTicker();}
  }
  if(v==='envivo')renderLive();
  if(v==='bracket'){
    const L=LEAGUES[CURRENT_LEAGUE];
    if(L&&L.ko&&CURRENT_LEAGUE!=='worldcup'){
      const names={};poolTeams().forEach(t=>names[norm(t.es)]=1);
      const hasAny=BRACKET.some(x=>x&&names[norm(x)]);
      if(!BRACKET.length||!hasAny)loadClubBracket(L.teams,L.name);
    }
    renderBracket();
  }
  if(v==='stats')renderStatsView();
  if(v==='cartilla'){renderCartDay();renderCartilla();}
  if(v==='rend'){renderDashboard();renderHistory();}
  if(v==='idolo')idoloRender();
  if(v==='resumen')renderResumen();
  closeSidebar();
  window.scrollTo({top:0});
}
function buildSideLeagues(){
  const e=el('sideLeagues');
  e.innerHTML=Object.keys(LEAGUES).map(id=>{
    const L=LEAGUES[id];
    return '<button class="side-item'+(id===CURRENT_LEAGUE?' active':'')+'" onclick="setLeague(\''+id+'\')"><span class="ic">'+leagueLogoHTML(id,16)+'</span>'+L.name+'</button>';}).join('');
}
function setLeague(id){
  if(!LEAGUES[id])return;
  CURRENT_LEAGUE=id;lsSet('rp_league_v6',id);
  loadFormCache();
  HIST=lsGet('rp_hist_'+id+'_v6',[]);
  computeLearning();
  const pool=poolTeams();
  if(id==='worldcup'){state.A='Bélgica';state.B='Irán';}
  else if(pool.length){state.A=pool[0].es;state.B=pool.length>1?pool[1].es:pool[0].es;}
  state.filterA='';state.filterB='';
  el('searchA').value='';el('searchB').value='';
  el('koWrap').style.display=(id==='worldcup'||id==='champions')?'':'none';
  buildSideLeagues();
  renderPicker('A');renderPicker('B');buildPresets();buildTeamlist();fillAutoParams(false);
  renderStatsView();renderCartDay();renderHistory();renderDashboard();renderResumen();
  refreshLeagueForm();
  document.title='Rocky Predictor · '+LEAGUES[id].name;
  const chip=el('tbChip');
  if(!el('view-envivo').classList.contains('active')&&!el('view-idolo').classList.contains('active')){
    chip.innerHTML='<span class="lg-dot" style="background:'+LEAGUES[id].color+'"></span>'+leagueLogoHTML(id,14)+' '+LEAGUES[id].name;}
}
function toggleSidebar(){const sb=el('sidebar'),open=!sb.classList.contains('open');sb.classList.toggle('open');el('sideOverlay').classList.toggle('show');document.body.classList.toggle('sb-open',open);}
function closeSidebar(){el('sidebar').classList.remove('open');el('sideOverlay').classList.remove('show');}
(function(){
  const sb=el('sidebar');let sx=0,sy=0,onControl=false;
  sb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY;onControl=!!e.target.closest('button,input,select,a');},{passive:true});
  sb.addEventListener('touchend',e=>{
    if(onControl)return;
    const t=e.changedTouches[0];
    if(sx-t.clientX>70&&Math.abs(t.clientY-sy)<60)closeSidebar();
  },{passive:true});
})();
function buildRanking(){
  const top=TEAMS.slice().sort((a,b)=>b.s-a.s).slice(0,12);
  el('rankCard').innerHTML=top.map((t,i)=>
    '<div class="rank-row"><span class="rank-pos">'+(i+1)+'</span><span class="rank-fl">'+crestHTML(t.es,20)+'</span><div class="rank-mid"><span class="rank-name">'+t.es+'</span><div class="rank-bar"><div class="rank-fill" data-w="'+t.s+'"></div></div></div><span class="rank-val">'+t.s+'</span></div>').join('');
}

/* ═══════════ INIT ═══════════ */
(function init(){
  buildSideLeagues();
  buildPresets();buildTeamlist();buildRanking();
  renderPicker('A');renderPicker('B');
  el('koWrap').style.display=(CURRENT_LEAGUE==='worldcup'||CURRENT_LEAGUE==='champions')?'':'none';
  setLeague(CURRENT_LEAGUE);
  fillAutoParams(false);
  runSim(false);
  if(CURRENT_LEAGUE==='worldcup'&&!BRACKET.length)loadWCBracket();
  else renderBracket();
  idoloRender();
  renderResumen();
  updateNotifBtn();
  showView('envivo');
  setTimeout(()=>{renderLive(true);renderTicker();renderCartDay();},700);
})();
// Pre-cargar escudos más comunes en segundo plano
(function precacheCrests() {
  const precache = ['Real Madrid', 'Barcelona', 'Argentina', 'Francia', 'Brasil'];
  precache.forEach(name => {
    const t = findAnyTeam(name);
    if (t && t.espn) {
      new Image().src = 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/' + t.espn + '.png&w=64&h=64';
    }
  });
})();
/* ═══════════ SCANNER · shader portado a vanilla WebGL2 ═══════════ */
(function(){
  const canvas=document.getElementById('scanCanvas');
  if(!canvas)return;
  const gl=canvas.getContext('webgl2',{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false});
  if(!gl){canvas.remove();return;}

  const VERT=`#version 300 es
  in vec2 position;
  void main(){gl_Position=vec4(position,0.0,1.0);}`;

  const FRAG=`#version 300 es
  precision highp float;
  uniform vec2 iResolution;uniform float iTime;
  uniform float uSpeed,uSweepSpeed,uSweepWidth,uSweepFalloff,uScale,uFrequency,uRipple;
  uniform float uBandDensity,uLineSharpness,uGlow,uColorSpread,uBrightness,uContrast,uSoftness;
  uniform float uVignette,uOpacity,uScanline,uGrain,uGrainIntensity;
  uniform vec3 uColor1,uColor2,uColor3;
  uniform vec2 uMouse;uniform float uMouseEnabled,uMouseRadius,uMouseStrength,uMouseActive;
  out vec4 fragColor;
  const float TAU=6.2831853;
  float signalField(vec2 p,float t){
    float w=sin(p.x*1.3+t*0.7);
    w+=sin(p.y*1.7-t*0.52)*0.8;
    w+=sin((p.x+p.y)*0.9+t*0.91)*0.6;
    w+=sin((p.x-p.y)*1.53-t*0.63)*0.42;
    return w*0.35;
  }
  vec3 palette(float f){
    f=clamp(f,0.0,1.0);f=pow(f,uContrast);
    vec3 c=mix(uColor1,uColor2,smoothstep(0.08,0.6,f));
    return mix(c,uColor3,smoothstep(0.68,1.0,f));
  }
  float scanBand(float x,float aa,float sharp){
    float v=mix(0.5,0.5+0.5*cos(x*TAU),aa);
    return pow(v,sharp);
  }
  void main(){
    float aspect=iResolution.x/iResolution.y;
    vec2 uv0=(gl_FragCoord.xy*2.0-iResolution.xy)/iResolution.y;
    vec2 p=uv0/max(uScale,0.001);
    float t=iTime*uSpeed;
    float mouseBoost=0.0;
    if(uMouseEnabled>0.5){
      vec2 mUv=vec2((uMouse.x*2.0-1.0)*aspect,uMouse.y*2.0-1.0);
      vec2 md=uv0-mUv;float r=max(uMouseRadius,0.001);
      mouseBoost=exp(-dot(md,md)/(r*r))*uMouseStrength*uMouseActive;
    }
    float axis=p.y; // vertical scan
    float sig=signalField(p*uFrequency,t);
    float coord=axis+sig*uRipple;
    float phase=coord/max(uSweepWidth,0.05)-t*uSweepSpeed;
    float sweep=pow(0.5+0.5*cos(phase*TAU),max(uSweepFalloff,0.1));
    float lc=coord*uBandDensity;
    float aa=1.0/(1.0+uSoftness*fwidth(lc)*3.0);
    aa=clamp(aa*(1.0+mouseBoost*0.6),0.0,1.0);
    float bodyBase=clamp(0.5+0.5*sig,0.0,1.0);
    float body=bodyBase*bodyBase*uGlow*sweep;
    float sharp=max(uLineSharpness,0.1);
    float split=uColorSpread*0.16;
    float fr=clamp(scanBand(lc+split,aa,sharp)*sweep+body,0.0,1.0);
    float fg=clamp(scanBand(lc,aa,sharp)*sweep+body,0.0,1.0);
    float fb=clamp(scanBand(lc-split,aa,sharp)*sweep+body,0.0,1.0);
    vec3 col=vec3(palette(fr).r,palette(fg).g,palette(fb).b);
    float inten=(fr+fg+fb)*0.3333333*uBrightness;
    inten*=1.0+mouseBoost*0.9;
    if(uScanline>0.5){
      inten*=1.0-0.18*(0.5+0.5*cos(gl_FragCoord.y*1.7));
    }
    inten*=clamp(1.0-uVignette*smoothstep(0.55,1.65,length(uv0)),0.0,1.0);
    inten=clamp(inten,0.0,1.0);
    float a=clamp(inten*uOpacity,0.0,1.0);
    fragColor=vec4(clamp(col,0.0,1.0)*a,a);
  }`;

  function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);
    if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)){console.warn(gl.getShaderInfoLog(o));return null;}return o;}
  const vs=sh(gl.VERTEX_SHADER,VERT),fs=sh(gl.FRAGMENT_SHADER,FRAG);
  if(!vs||!fs){canvas.remove();return;}
  const prog=gl.createProgram();
  gl.attachShader(prog,vs);gl.attachShader(prog,fs);gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS)){canvas.remove();return;}
  gl.useProgram(prog);

  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'position');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

  const U=n=>gl.getUniformLocation(prog,n);
  const u={};['iResolution','iTime','uSpeed','uSweepSpeed','uSweepWidth','uSweepFalloff',
  'uScale','uFrequency','uRipple','uBandDensity','uLineSharpness','uGlow','uColorSpread',
  'uBrightness','uContrast','uSoftness','uVignette','uOpacity','uScanline','uGrain',
  'uGrainIntensity','uColor1','uColor2','uColor3','uMouse','uMouseEnabled','uMouseRadius',
  'uMouseStrength','uMouseActive'].forEach(n=>u[n]=U(n));

  // Configuración "domada" para app de datos
  gl.uniform1f(u.uSpeed,0.65);
  gl.uniform1f(u.uSweepSpeed,0.2);
  gl.uniform1f(u.uSweepWidth,1.8);
  gl.uniform1f(u.uSweepFalloff,5);
  gl.uniform1f(u.uScale,1.6);
  gl.uniform1f(u.uFrequency,1.8);
  gl.uniform1f(u.uRipple,0.18);
  gl.uniform1f(u.uBandDensity,12);
  gl.uniform1f(u.uLineSharpness,4.5);
  gl.uniform1f(u.uGlow,0.2);
  gl.uniform1f(u.uColorSpread,0.6);
  gl.uniform1f(u.uBrightness,0.95);
  gl.uniform1f(u.uContrast,1.1);
  gl.uniform1f(u.uSoftness,1.5);
  gl.uniform1f(u.uVignette,0.5);
  gl.uniform1f(u.uOpacity,1.0);
  gl.uniform1f(u.uScanline,1.0);
  gl.uniform1f(u.uGrain,0.0); // grain=false como pediste
  gl.uniform1f(u.uMouseEnabled,1.0);
  gl.uniform1f(u.uMouseRadius,0.4);
  gl.uniform1f(u.uMouseStrength,0.3);
  gl.uniform1f(u.uMouseActive,0.0);

  // Colores iniciales (verde Rocky)
  gl.uniform3f(u.uColor1,0.07,0.22,0.15);       // verde oscuro
  gl.uniform3f(u.uColor2,0.216,0.788,0.47);     // tu --acc
  gl.uniform3f(u.uColor3,0.5,0.9,0.6);          // verde claro/brillante

  // Permite cambiar colores en vivo
  window.scannerColors=function(c1,c2,c3){
    gl.uniform3f(u.uColor1,c1[0],c1[1],c1[2]);
    gl.uniform3f(u.uColor2,c2[0],c2[1],c2[2]);
    gl.uniform3f(u.uColor3,c3[0],c3[1],c3[2]);
  };

  const SCALE=0.7;
  function resize(){
    const w=Math.max(1,Math.floor(innerWidth*SCALE)),h=Math.max(1,Math.floor(innerHeight*SCALE));
    canvas.width=w;canvas.height=h;
    gl.viewport(0,0,w,h);
    gl.uniform2f(u.iResolution,w,h);
  }
  addEventListener('resize',resize);resize();

  // Mouse interaction
  let currentMouse=[0.5,0.5],targetMouse=[0.5,0.5],mouseActive=0,targetMouseActive=0;
  canvas.addEventListener('mousemove',e=>{
    const rect=canvas.getBoundingClientRect();
    targetMouse=[(e.clientX-rect.left)/rect.width,1.0-(e.clientY-rect.top)/rect.height];
    targetMouseActive=1;
  });
  canvas.addEventListener('mouseleave',()=>{targetMouseActive=0;});

  gl.clearColor(0,0,0,0);
  let raf=0;const t0=performance.now();
  function loop(t){
    gl.uniform1f(u.iTime,(t-t0)*0.001);
    currentMouse[0]+=0.05*(targetMouse[0]-currentMouse[0]);
    currentMouse[1]+=0.05*(targetMouse[1]-currentMouse[1]);
    gl.uniform2f(u.uMouse,currentMouse[0],currentMouse[1]);
    mouseActive+=0.05*(targetMouseActive-mouseActive);
    gl.uniform1f(u.uMouseActive,mouseActive);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,3);
    raf=requestAnimationFrame(loop);
  }
  function start(){if(!raf)raf=requestAnimationFrame(loop);}
  function stop(){cancelAnimationFrame(raf);raf=0;}
  document.addEventListener('visibilitychange',()=>{document.hidden?stop():start();});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)start();
  else{gl.uniform1f(u.iTime,5);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,3);}
})();
/* ═══════════ TEMAS POR COMPETICIÓN (actualizado para Scanner) ═══════════ */
(function(){
  const CUSTOM={ worldcup:'#d9b45b' };
  const rgb=h=>{const n=parseInt(h.slice(1),16);return[(n>>16)&255,(n>>8)&255,n&255];};

  function applyTheme(id){
    const hex=CUSTOM[id]||(LEAGUES[id]&&LEAGUES[id].color)||'#37c978';
    const[r,g,b]=rgb(hex);
    const rs=document.documentElement.style;
    rs.setProperty('--acc',hex);
    rs.setProperty('--acc-dim',`rgba(${r},${g},${b},.12)`);
    rs.setProperty('--acc-deep',`rgb(${r*.30|0},${g*.30|0},${b*.30|0})`);
    rs.setProperty('--acc-deeper',`rgb(${r*.16|0},${g*.16|0},${b*.16|0})`);
    rs.setProperty('--acc-border',`rgba(${r},${g},${b},.4)`);
    
    // Scanner: 3 tonos del color de la liga
    if(window.scannerColors)scannerColors(
      [r*.25/255,g*.25/255,b*.25/255],  // oscuro
      [r/255,g/255,b/255],               // medio (tu acento)
      [Math.min(1,r*1.3/255),Math.min(1,g*1.3/255),Math.min(1,b*1.3/255)] // brillante
    );
  }

  const _setLeague=window.setLeague;
  window.setLeague=function(id){_setLeague(id);applyTheme(id);};
  applyTheme(CURRENT_LEAGUE);
})();
/* ═══════════ LINE SIDEBAR EFFECT (múltiples secciones) ═══════════ */
(function(){
  const allNavs=document.querySelectorAll('.side-nav');
  if(!allNavs.length)return;
  
  const PROXIMITY=80;
  const SMOOTHING=60;
  
  allNavs.forEach(nav=>{
    const items=[...nav.querySelectorAll('.side-item')];
    if(!items.length)return;
    
    const targets=new Array(items.length).fill(0);
    const current=new Array(items.length).fill(0);
    let raf=null;
    let lastTime=performance.now();
    
    function runFrame(now){
      const dt=Math.min((now-lastTime)/1000,0.05);
      lastTime=now;
      const tau=Math.max(SMOOTHING,1)/1000;
      const k=1-Math.exp(-dt/tau);
      
      let moving=false;
      items.forEach((el,i)=>{
        if(!el)return;
        const active=el.classList.contains('active');
        const target=Math.max(targets[i],active?1:0);
        const cur=current[i];
        const next=cur+(target-cur)*k;
        const settled=Math.abs(target-next)<0.0015;
        const value=settled?target:next;
        current[i]=value;
        el.style.setProperty('--effect',value.toFixed(4));
        if(!settled)moving=true;
      });
      
      raf=moving?requestAnimationFrame(runFrame):null;
    }
    
    function startLoop(){
      if(raf!=null)cancelAnimationFrame(raf);
      lastTime=performance.now();
      raf=requestAnimationFrame(runFrame);
    }
    
    function handlePointerMove(e){
      const rect=nav.getBoundingClientRect();
      const pointerY=e.clientY-rect.top;
      
      items.forEach((el,i)=>{
        if(!el)return;
        const elRect=el.getBoundingClientRect();
        const center=elRect.top-rect.top+elRect.height/2;
        const distance=Math.abs(pointerY-center);
        const p=Math.max(0,1-distance/PROXIMITY);
        targets[i]=p*p*(3-2*p); // smooth falloff
      });
      startLoop();
    }
    
    function handlePointerLeave(){
      targets.fill(0);
      startLoop();
    }
    
    nav.addEventListener('pointermove',handlePointerMove);
    nav.addEventListener('pointerleave',handlePointerLeave);
    
    items.forEach(el=>el.style.setProperty('--effect','0'));
    startLoop();
  });
})();
/* ═══════════ HOME V2 · liga recordada + selector + home vivo ═══════════ */
(function(){
  // 1) Recordar la competición elegida
  const _sl=window.setLeague;
  window.setLeague=function(id){try{localStorage.setItem('rp_league',id);}catch(e){} _sl(id);};

  // 2) Selector de primera visita
  function showLeaguePicker(){
    const ov=document.createElement('div');
    ov.id='leaguePick';
    ov.innerHTML='<div class="lp-box"><h2>⚽ Elegí tu competición</h2>'+
      '<p class="lp-sub">Será tu liga principal al abrir la app. Podés cambiarla cuando quieras desde el menú lateral.</p>'+
      '<div class="lp-grid">'+Object.keys(LEAGUES).map(id=>
        '<button class="lp-item" data-l="'+id+'">'+leagueLogoHTML(id,26)+'<span>'+LEAGUES[id].name+'</span></button>').join('')+'</div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click',e=>{
      const b=e.target.closest('.lp-item');if(!b)return;
      setLeague(b.getAttribute('data-l'));
      ov.remove();
    });
  }

  // 3) Fila de partido para el fallback global
  function rowHTML(m,i){
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px;cursor:pointer" onclick="openLiveMatchObj(window.__glob['+i+'])">'+
      '<span style="display:flex;align-items:center;gap:8px">'+crestHTML(m.A,16)+' '+m.A+' <span style="color:var(--gray)">vs</span> '+m.B+' '+crestHTML(m.B,16)+'</span>'+
      '<span style="color:var(--gray);font-size:11px">'+abbrLeague(m.league)+'</span></div>';
  }

  // 4) Panel de últimas predicciones (se crea solo una vez)
  function renderRecent(){
    let host=el('resRecent');
    if(!host){
      const grid=document.querySelector('#view-resumen .grid2');
      if(!grid)return;
      const p=document.createElement('div');
      p.className='panel';
      p.innerHTML='<div class="panel-h"><h3>Últimas predicciones</h3><span class="rule"></span><button class="btn btn-ghost btn-sm" onclick="showView(\'rend\')">Ver todas</button></div><div id="resRecent"></div>';
      grid.parentNode.insertBefore(p,grid.nextSibling);
      host=el('resRecent');
    }
    const rec=HIST.slice(-4).reverse();
    host.innerHTML=rec.length?rec.map(x=>{
      const A=x.A||x.home||'—',B=x.B||x.away||'—';
      const done=x.actualA!=null&&x.actualB!=null;
      const ok=done?judge(x).hitRes:false;
      return '<div class="rc-row">'+crestHTML(A,16)+
        '<span class="rc-nm"><b>'+A+'</b> vs <b>'+B+'</b></span>'+
        (done?'<span style="font-weight:700">'+x.actualA+'–'+x.actualB+'</span>':'<span class="rc-tag pend">⏳</span>')+
        '<span class="rc-tag '+(done?(ok?'ok':'no'):'pend')+'">'+(done?(ok?'✓':'✗'):'—')+'</span></div>';
    }).join(''):'<div class="empty">Todavía no guardaste predicciones. Probá el Predictor 🎯</div>';
  }

  // 5) Envolver renderResumen: KPIs clickeables + fallback global + recientes
  const _rr=window.renderResumen;
  window.renderResumen=function(){
    _rr();
    const ks=el('resStats').children,acts=['stats','rend','rend','rend'];
    for(let i=0;i<ks.length&&i<acts.length;i++){ks[i].style.cursor='pointer';ks[i].onclick=function(){showView(acts[i]);};}
    const box=el('resNext');
    if(box&&box.textContent.indexOf('Sin partidos')>-1){
      const glob=(_liveFlat.length?_liveFlat:_tickerFlat).filter(m=>m.state!=='post'&&m.league!==CURRENT_LEAGUE).slice(0,4);
      window.__glob=glob;
      if(glob.length)box.innerHTML='<div style="font-size:11px;color:var(--gray);margin:2px 0 6px">Sin partidos próximos en '+LEAGUES[CURRENT_LEAGUE].name+'. Otras competiciones:</div>'+glob.map(rowHTML).join('');
    }
    renderRecent();
  };

  // 6) Arranque: liga recordada o selector
  let saved=null;try{saved=localStorage.getItem('rp_league');}catch(e){}
  if(saved&&LEAGUES[saved]){if(saved!==CURRENT_LEAGUE)setLeague(saved);}
  else showLeaguePicker();
})();
/* ═══════════ HOME V3 · selector inline + agenda al arranque ═══════════ */
(function(){
  let picked=false;

  // Elegir liga (sidebar o selector) marca la sesión
  const _sl=window.setLeague;
  window.setLeague=function(id){picked=true;_sl(id);};

  function showPicker(){
    el('resBadge').innerHTML='🏟️ ELEGÍ TU COMPETICIÓN';
    el('resBadge').style.color='var(--acc)';
    el('resTitle').textContent='¿Qué liga querés ver hoy?';
    el('resSub').textContent='Tocá una competición para cargar su resumen. Podés cambiarla cuando quieras desde el menú lateral.';
    let host=el('resPick');
    if(!host){host=document.createElement('div');host.id='resPick';
      document.querySelector('#view-resumen .banner-body').appendChild(host);}
    host.innerHTML=Object.keys(LEAGUES).map(id=>
      '<button class="lp-item" onclick="setLeague(\''+id+'\')">'+leagueLogoHTML(id,28)+'<span>'+LEAGUES[id].name+'</span></button>').join('');
    el('resStats').style.display='none';
    const g=document.querySelector('#view-resumen .grid2');if(g)g.style.display='none';
    const rp=el('resRecentPanel');if(rp)rp.style.display='none';
  }

  function showHome(){
    el('resStats').style.display='';
    const g=document.querySelector('#view-resumen .grid2');if(g)g.style.display='';
    const rp=el('resRecentPanel');if(rp)rp.style.display='';
    const pk=el('resPick');if(pk)pk.remove();
  }

  function rowHTML(m,i){
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px;cursor:pointer" onclick="openLiveMatchObj(window.__glob['+i+'])">'+
      '<span style="display:flex;align-items:center;gap:8px">'+crestHTML(m.A,16)+' '+m.A+' <span style="color:var(--gray)">vs</span> '+m.B+' '+crestHTML(m.B,16)+'</span>'+
      '<span style="color:var(--gray);font-size:11px">'+abbrLeague(m.league)+'</span></div>';
  }

  function renderRecent(){
    let host=el('resRecent');
    if(!host){
      const grid=document.querySelector('#view-resumen .grid2');if(!grid)return;
      const p=document.createElement('div');p.className='panel';
      p.innerHTML='<div class="panel-h"><h3>Últimas predicciones</h3><span class="rule"></span><button class="btn btn-ghost btn-sm" onclick="showView(\'rend\')">Ver todas</button></div><div id="resRecent"></div>';
      grid.parentNode.insertBefore(p,grid.nextSibling);host=el('resRecent');
    }
    const rec=HIST.slice(-4).reverse();
    host.innerHTML=rec.length?rec.map(x=>{
      const A=x.A||x.home||'—',B=x.B||x.away||'—';
      const done=x.actualA!=null&&x.actualB!=null;
      const ok=done?judge(x).hitRes:false;
      return '<div class="rc-row">'+crestHTML(A,16)+
        '<span class="rc-nm"><b>'+A+'</b> vs <b>'+B+'</b></span>'+
        (done?'<span style="font-weight:700">'+x.actualA+'–'+x.actualB+'</span>':'<span class="rc-tag pend">⏳</span>')+
        '<span class="rc-tag '+(done?(ok?'ok':'no'):'pend')+'">'+(done?(ok?'✓':'✗'):'—')+'</span></div>';
    }).join(''):'<div class="empty">Todavía no guardaste predicciones. Probá el Predictor 🎯</div>';
  }

  const _rr=window.renderResumen;
  window.renderResumen=function(){
    if(!picked){showPicker();return;}
    showHome();_rr();
    const ks=el('resStats').children,acts=['stats','rend','rend','rend'];
    for(let i=0;i<ks.length&&i<acts.length;i++){ks[i].style.cursor='pointer';ks[i].onclick=function(){showView(acts[i]);};}
    const box=el('resNext');
    if(box&&box.textContent.indexOf('Sin partidos')>-1){
      const glob=(_liveFlat.length?_liveFlat:_tickerFlat).filter(m=>m.state!=='post'&&m.league!==CURRENT_LEAGUE).slice(0,4);
      window.__glob=glob;
      if(glob.length)box.innerHTML='<div style="font-size:11px;color:var(--gray);margin:2px 0 6px">Sin partidos próximos en '+LEAGUES[CURRENT_LEAGUE].name+'. Otras competiciones:</div>'+glob.map(rowHTML).join('');
    }
    renderRecent();
  };

  // Tema neutro (verde) hasta que elijas liga
  const rs=document.documentElement.style;
  rs.setProperty('--acc','#37c978');
  rs.setProperty('--acc-dim','rgba(55,201,120,.12)');
  if(window.scannerColors)scannerColors([0.07,0.22,0.15],[0.216,0.788,0.47],[0.5,0.9,0.6]);

  // 📅 Cargar agenda de partidos FUTUROS al arranque (sin entrar a En vivo)
  setTimeout(()=>{
    try{if(typeof renderLive==='function')renderLive(false);}catch(e){}
    try{if(typeof renderTicker==='function')renderTicker();}catch(e){}
  },900);

  // Primer render con selector
  renderResumen();
})();
/* ═══════════ PRÓXIMOS PARTIDOS v2 · liga elegida + fallback global ═══════════ */
(function(){
  const SLUGS={worldcup:'fifa.world',premier:'eng.1',laliga:'esp.1',bundes:'ger.1',
    seriea:'ita.1',ligue1:'fra.1',champions:'uefa.champions',champions_classif:'uefa.champions_qual'};
  const cache={};
  window.__up=[];

  async function fetchUpcoming(id,maxDays,maxRes){
    const L=LEAGUES[id];if(!L)return[];
    const slug=L.slug||L.api||SLUGS[id];if(!slug)return[];
    const out=[];const now=new Date();
    for(let d=0;d<maxDays&&out.length<maxRes;d++){
      const dt=new Date(now.getTime()+d*864e5);
      const ymd=dt.getFullYear()+String(dt.getMonth()+1).padStart(2,'0')+String(dt.getDate()).padStart(2,'0');
      try{
        const r=await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/'+slug+'/scoreboard?dates='+ymd);
        if(!r.ok)continue;
        const j=await r.json();
        (j.events||[]).forEach(ev=>{
          const comp=ev.competitions&&ev.competitions[0];
          const h=comp&&comp.competitors&&comp.competitors.find(c=>c.homeAway==='home');
          const a=comp&&comp.competitors&&comp.competitors.find(c=>c.homeAway==='away');
          if(!h||!a)return;
          const st=ev.status&&ev.status.type?ev.status.type.state:'pre';
          if(st==='post')return;
          out.push({id:ev.id,league:id,state:st,date:ev.date,kick:ev.date,hs:null,as:null,
            A:mapEspnName((h.team&&(h.team.displayName||h.team.name))||''),
            B:mapEspnName((a.team&&(a.team.displayName||a.team.name))||'')});
        });
      }catch(e){}
    }
    return out.slice(0,maxRes);
  }

  // Busca en las demás competiciones (usa caché para no pedir de más)
  async function fetchGlobal(skipId){
    const out=[];
    for(const lid of Object.keys(LEAGUES)){
      if(lid===skipId)continue;
      if(!cache[lid])cache[lid]=await fetchUpcoming(lid,4,4);
      (cache[lid]||[]).forEach(m=>{if(out.length<4&&!out.some(x=>x.id===m.id))out.push(m);});
      if(out.length>=4)break;
    }
    return out;
  }

  function paint(list,label,mixed){
    const box=el('resNext');if(!box)return;
    window.__up=list;
    if(!list.length){box.innerHTML='<div class="empty">Sin partidos programados en los próximos 7 días en ninguna competición.</div>';return;}
    box.innerHTML='<div style="font-size:11px;color:var(--gray);margin:2px 0 6px">📅 Próximos partidos · '+label+'</div>'+
      list.map((m,i)=>'<div class="rc-row" style="cursor:pointer" onclick="openLiveMatchObj(window.__up['+i+'])">'+
        crestHTML(m.A,16)+'<span class="rc-nm"><b>'+m.A+'</b> vs <b>'+m.B+'</b></span>'+
        (mixed?'<span style="color:var(--gray);font-size:10px">'+abbrLeague(m.league)+'</span>':'')+
        '<span style="color:var(--mut);font-size:11px;white-space:nowrap">'+fmtKick(m.date)+'</span></div>').join('');
  }

  function vacio(txt){return txt.indexOf('Sin partidos')>-1||txt.indexOf('Otras competiciones')>-1||txt.indexOf('Buscando')>-1;}

  async function ensure(){
    if(document.getElementById('resPick'))return;
    const box=el('resNext');if(!box||!vacio(box.textContent))return;
    const id=CURRENT_LEAGUE;
    box.innerHTML='<div style="font-size:11px;color:var(--gray);margin:4px 0">🔎 Buscando próximos partidos…</div>';
    if(!cache[id])cache[id]=await fetchUpcoming(id,8,4);
    let list=cache[id]||[],label=LEAGUES[id].name,mixed=false;
    if(!list.length){list=await fetchGlobal(id);label='otras competiciones';mixed=true;}
    if(document.getElementById('resPick'))return;
    const b2=el('resNext');if(!b2||!vacio(b2.textContent))return;
    paint(list,label,mixed);
    console.log('[próximos] '+id+': '+(mixed?'fallback global':'liga propia')+' → '+list.length);
  }

  const _rr=window.renderResumen;
  window.renderResumen=function(){_rr();ensure();};
  setTimeout(()=>ensure(),2500);
})();
/* ═══════════ ESPACIADO FORZADO (inline, a prueba de CSS perdido) ═══════════ */
(function(){
  function fix(){
    const g=document.querySelector('#view-resumen .grid2');
    if(g){g.style.gap='24px';g.style.alignItems='start';}
    const r=document.getElementById('resRecent');
    if(r){
      const p=r.closest('.panel');
      if(p&&!p.id){p.id='resRecentPanel';p.style.marginTop='24px';}
    }
  }
  fix(); // por si ya existe
  // cuando se cree el panel (al elegir liga), aplicar de nuevo
  const ob=new MutationObserver(()=>{if(document.getElementById('resRecent')){fix();ob.disconnect();}});
  ob.observe(document.body,{childList:true,subtree:true});
})();
/* ═══════════ EL ÍDOLO 2.0 · carrera con peso + minijuegos ═══════════ */
(function(){
const LS='rp_idol2';const $=s=>document.getElementById(s);
let S=null,D=null;
const save=()=>localStorage.setItem(LS,JSON.stringify(S));
try{S=JSON.parse(localStorage.getItem(LS));}catch(e){S=null;}

async function getDB(){if(D)return D;
 if(window.CAREER_DB&&window.CAREER_DB.clubs){D=window.CAREER_DB;return D;}
 const r=await fetch('modo_carrera_equipos_2026.json');D=await r.json();return D;}

function rng(seed,n){let h=0;const s=seed+':'+n;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return Math.abs(h%1000000)/1000000;}
const ovr=p=>Math.round((p.atr.pac+p.atr.sho+p.atr.pas+p.atr.def+p.atr.dri+p.atr.phy)/6);
function effOvr(p){let v=ovr(p);if(p.age<=18)v+=5;else if(p.age<=21)v+=3;else if(p.age<=24)v+=1;else if(p.age>=33)v-=5;else if(p.age>=30)v-=2;return Math.max(1,Math.min(99,v));}
function interestF(eff,minO,p){const d=eff-minO,fb=Math.max(0,(p.form-5)*2),sb=Math.min(8,p.season*0.5),rb=Math.min(6,Math.max(0,(eff-75)*0.15)),sp=Math.max(0,(eff-65)*0.5);return Math.max(3,Math.min(92,Math.round(30+7*d+fb+sb+rb-sp)));}
function renewalF(p){const tr=Math.min(50,p.idolatry*0.4+(p.history||[]).length*2),fb=Math.max(0,(p.form-5)*3),y=p.season-(p._clubSinceSeason||0),rem=Math.max(0,3-(p.season-(p._lastContractSeason||p.season)));return Math.max(5,Math.min(95,Math.round(20+0.4*tr+0.25*p.idolatry+fb+3*y-12*rem)));}
function bandF(o){for(const b of D.offerSystem.overallBands){const[lo,hi]=b.overall.split('-').map(Number);if(o>=lo&&o<=hi)return b;}return D.offerSystem.overallBands[D.offerSystem.overallBands.length-1];}
const findClub=(n,c)=>D.clubs.find(x=>x.name===n||x.id===n)||(c?D.clubs.find(x=>x.name===n&&x.country===c):null);
function wSample(items,gw,count,seed){const pool=items.map(it=>({it,w:Math.max(0,gw(it))})).filter(x=>x.w>0);const out=[];for(let k=0;k<count&&pool.length;k++){const tot=pool.reduce((s,x)=>s+x.w*x.w,0);if(tot<=0)break;let r=rng(seed,k)*tot,idx=pool.length-1;for(let i=0;i<pool.length;i++){r-=pool[i].w*pool[i].w;if(r<=0){idx=i;break;}}out.push(pool[idx].it);pool.splice(idx,1);}return out;}

/* ── overlays ── */
function mkOv(html){const ov=document.createElement('div');ov.className='i2-ov';ov.innerHTML='<div class="i2-box">'+html+'</div>';document.body.appendChild(ov);return ov;}
const closeOv=(ov,v)=>{ov.remove();return v;};

/* ── MINIJUEGOS ── */
function mgTiming(){return new Promise(res=>{let x=0,dir=1,round=0,tot=0,raf;
 const ov=mkOv('<h3>🎯 Definición</h3><p class="i2-sub">Frená el marcador en la zona verde · 3 intentos</p><div class="i2-bar"><div class="i2-zone"></div><div class="i2-mark" id="i2mk"></div></div><button class="btn btn-primary" id="i2kick">¡Patear!</button><div class="i2-res" id="i2r"></div>');
 const mk=$('i2mk');(function step(){x+=dir*1.7;if(x>100||x<0)dir*=-1;mk.style.left=x+'%';raf=requestAnimationFrame(step);})();
 $('i2kick').onclick=()=>{const sc=Math.max(0,Math.round(100-Math.abs(x-50)*4));tot+=sc;round++;$('i2r').innerHTML+='<span class="i2-chip">'+sc+'</span>';
  if(round>=3){cancelAnimationFrame(raf);setTimeout(()=>res(closeOv(ov,Math.round(tot/3))),600);}};});}
function mgReact(){return new Promise(res=>{let tot=0,round=0,armed=false,tm,t0;
 const ov=mkOv('<h3>⚡ Reacción</h3><p class="i2-sub">Clic apenas se ponga verde · 3 rondas</p><div class="i2-pad" id="i2pad">Esperá…</div>');
 const pad=$('i2pad');
 function next(){round++;if(round>3){res(closeOv(ov,Math.round(tot/3)));return;}armed=false;pad.style.background='var(--red-dim)';pad.textContent='Esperá el verde…';
  tm=setTimeout(()=>{armed=true;t0=performance.now();pad.style.background='var(--acc-dim)';pad.textContent='¡YA!';},800+Math.random()*1600);}
 pad.onclick=()=>{if(!armed){clearTimeout(tm);tot+=25;pad.textContent='¡Temprano! +25';setTimeout(next,600);return;}
  const ms=performance.now()-t0,sc=Math.max(10,Math.min(100,Math.round(120-ms/4)));tot+=sc;pad.textContent=(ms|0)+' ms → +'+sc;setTimeout(next,600);};
 next();});}
const VIS=[{q:'Contraataque 3v2, compañero libre a la derecha',b:1,o:['Remate lejano','Pase al libre','Conducción al medio']},
{q:'Recibís de espaldas con la marca pegada',b:2,o:['Giro y conducción','Pase de primera','Aguantar y pedir falta']},
{q:'Tu central sale conduciendo y el 9 pica al hueco',b:0,o:['Pase filtrado','Centro desde lejos','Pelotazo al área']},
{q:'Última jugada, empatados, tiro libre lateral',b:0,o:['Centro cerrado al primer palo','Pase raso al borde del área','Remate directo al arco']},
{q:'Salida propia, presión alta del rival, arquero libre',b:1,o:['Pelotazo frontal','Tercer hombre por banda','Conducción del arquero']}];
function mgVision(){return new Promise(res=>{let i=0,tot=0,tm;
 function round(){if(i>=VIS.length){res(closeOv(ov,Math.round(tot/VIS.length)));return;}
  const v=VIS[i];ov.querySelector('.i2-q').textContent=(i+1)+'/5 · '+v.q;
  const box=ov.querySelector('.i2-opts');box.innerHTML=v.o.map((o,j)=>'<button data-j="'+j+'">'+o+'</button>').join('');
  let done=false;tm=setTimeout(()=>{if(!done){done=true;tot+=20;i++;box.innerHTML='<button disabled>⏱ Sin respuesta (+20)</button>';setTimeout(round,700);}},5000);
  box.onclick=e=>{const b=e.target.closest('button');if(!b||done)return;done=true;clearTimeout(tm);
   tot+=(+b.dataset.j===v.b)?100:35;i++;setTimeout(round,500);};}
 const ov=mkOv('<h3>🧠 Visión de juego</h3><p class="i2-sub">Elegí la mejor decisión en 5 segundos</p><div class="i2-q" style="font-weight:700;margin:8px 0"></div><div class="i2-opts"></div>');
 round();});}

/* ── eventos con peso ── */
const EVENTS=[
 {t:'El técnico quiere que juegues infiltrado un partido clave.',o:[['Jugar igual: +forma esta temporada, riesgo de lesión','risk'],['Descansar: el técnico se molesta','safe']],f:(p,c)=>{if(c===0){p.form=Math.min(10,p.form+1);p._perfBonus=(p._perfBonus||0)+6;if(Math.random()<0.25){p.form=Math.max(3,p.form-2);p.log.push('🩹 Jugaste infiltrado y la lesión te pasó factura');}}else{p.form=Math.min(10,p.form+0.5);p.idolatry=Math.max(0,p.idolatry-2);}}},
 {t:'Un sponsor te ofrece mucho dinero por una campaña publicitaria en plena temporada.',o:[['Aceptar: +confianza, -foco','yes'],['Rechazar: +foco','no']],f:(p,c)=>{if(c===0){p.idolatry=Math.min(100,p.idolatry+4);p._perfBonus=(p._perfBonus||0)-5;}else{p._perfBonus=(p._perfBonus||0)+4;}}},
 {t:'La hinchada pide que seas el capitán, pero el vestuario tiene otros líderes.',o:[['Aceptar el brazalete','yes'],['Cederlo al referente','no']],f:(p,c)=>{if(c===0){p.idolatry=Math.min(100,p.idolatry+5);}else{p.form=Math.min(10,p.form+0.5);p.idolatry=Math.min(100,p.idolatry+1);}}}];
function showEvent(){return new Promise(res=>{const ev=EVENTS[Math.floor(Math.random()*EVENTS.length)];
 const ov=mkOv('<h3>📰 Decisión</h3><p class="i2-sub" style="font-size:13px;color:var(--txt)">'+ev.t+'</p><div class="i2-opts">'+ev.o.map((o,j)=>'<button data-j="'+j+'">'+o[0]+'</button>').join('')+'</div>');
 ov.querySelector('.i2-opts').onclick=e=>{const b=e.target.closest('button');if(!b)return;ev.f(S.p,+b.dataset.j);save();res(closeOv(ov));};});}

/* ── simulación de temporada ── */
function simLeague(p,perf){
 const club=findClub(p.club,p.country);
 const mates=club?D.clubs.filter(c=>c.league===club.league&&c.division===club.division):[];
 const n=Math.max(mates.length,2),md={20:38,18:34}[n]||(n-1)*2;
 const o=ovr(p),boost=Math.max(0,(o-50)/200);
 const base=club?club.leagueTitleProbabilityPct/100:0;
 const seed='league '+p.season+' '+(club?club.id:'x');
 const champion=rng(seed,'ch')<Math.min(0.45,base+boost*0.3+p.form*0.008+perf*0.0008);
 const ws=mates.map(c=>{let w=(c.strength/100)*0.6+((c.leagueTitleProbabilityPct||0.01)/100)*0.4;if(club&&c.id===club.id)w+=boost+perf*0.0006;return{c,w:Math.max(0.01,w)};});
 const order=[],pool=ws.slice();
 for(let i=0;i<n&&pool.length;i++){const tot=pool.reduce((s,x)=>s+x.w,0);let r=rng(seed,i)*tot,idx=pool.length-1;for(let j=0;j<pool.length;j++){r-=pool[j].w;if(r<=0){idx=j;break;}}order.push(pool[idx].c);pool.splice(idx,1);}
 let pos=champion?1:(club?order.findIndex(x=>x.id===club.id)+1:Math.ceil(n/2));if(!pos)pos=n;
 let q=null;const reg=club?club.region:null;
 if(reg==='europe'){if(pos<=4)q='Champions League';else if(pos<=8)q='Europa League';}
 else if(reg==='south_america'){if(pos<=4)q='Copa Libertadores';else if(pos<=8)q='Copa Sudamericana';}
 return{club,n,md,pos,champion,q,relegated:pos>n-3,seed};
}
function genOffers(p){
 const o=ovr(p),eff=effOvr(p),b=bandF(o);
 const[sMin,sMax]=b.clubStrengthRange.split('-').map(Number);
 const cur=findClub(p.club,p.country);
 const cands=D.clubs.filter(c=>c.strength>=sMin&&c.strength<=sMax&&(!cur||c.id!==cur.id));
 const scored=cands.map(c=>({c,int:interestF(eff,c.minOfferOverall,p)})).filter(x=>x.int>5);
 const seed='market '+p.season+' '+p.club+'_'+o;
 const rPct=renewalF(p),hasRen=cur&&rng(seed,1)<rPct/100;
 const picked=wSample(scored,x=>x.int,Math.max(0,4-(hasRen?1:0)),seed);
 const offers=[];if(hasRen)offers.push({type:'renewal',club:cur,rPct});
 picked.forEach(x=>offers.push({type:'transfer',club:x.c,int:x.int}));
 return offers;
}

/* ── flujo de temporada ── */
async function playSeason(){
 const p=S.p;
 if(Math.random()<0.45)await showEvent();
 const s1=await mgDefinicion(),s2=await mgTanda(),s3=await mgVision();
 const perf=Math.max(5,Math.min(100,Math.round((s1+s2+s3)/3)+(p._perfBonus||0)));
 p._perfBonus=0;
 const R=simLeague(p,perf);
 const apps=Math.max(3,Math.round(R.md*(0.45+perf/220+p.form/120)));
 const att=/DEL|MED/.test(p.pos)?1:0.25;
 const goals=Math.max(0,Math.round(apps*(ovr(p)-48)/90*att*(0.6+rng('g'+p.season,1)*0.8)));
 p.appearances+=apps;p.goals+=goals;
 p.form=Math.max(3,Math.min(10,p.form+(perf-55)/12));
 p.idolatry=Math.max(0,Math.min(100,p.idolatry+(R.champion?8:R.pos<=4?4:R.pos<=8?2:0)+(perf-50)/8));
 const L=[];
 L.push('🎮 Rendimiento en entrenamientos: <b>'+perf+'</b>');
 L.push('🏟️ '+ (R.club?R.club.league:'—')+' → puesto <b>'+R.pos+'</b> de '+R.n+' · '+apps+' PJ · '+goals+' goles');
 if(R.champion){L.push('🏆 ¡CAMPEÓN de '+(R.club?R.club.league:'liga')+'!');p.trophies.push('🏆 '+(R.club?R.club.league:'Liga')+' '+ (2026+p.season));}
 if(R.q)L.push('🌍 Clasificados a <b>'+R.q+'</b>');
 if(R.q&&/Champions|Libertadores/.test(R.q)){const cc=R.club?R.club.continentalTitleProbabilityIfQualifiedPct:0;
  if(rng('cont'+p.season,2)<cc/100){L.push('🌟 ¡GANASTE la '+R.q+'!');p.trophies.push('🌟 '+R.q+' '+(2026+p.season));p.idolatry=Math.min(100,p.idolatry+10);
   const cw=R.club?R.club.clubWorldCupProbabilityIfContinentalChampionPct:0;
   if(rng('cw'+p.season,3)<cw/100){L.push('👑 ¡Mundial de Clubes!');p.trophies.push('👑 Mundial de Clubes '+(2026+p.season));}}
  else L.push('🌍 Campaña continental: sin título.');}
 const nt=D.nationalTeams.find(t=>t.name===p.country);
 if(nt&&ovr(p)>=nt.minCallupOverall){const ca=2+Math.round(rng('nat'+p.season,4)*5+perf/30);p.nationalApps+=ca;
  L.push('🇦🇷 Convocado a '+p.country+': '+ca+' PJ');
  if(rng('natT'+p.season,5)<nt.continentalTitleProbabilityPct/100){L.push(' ¡Campeón de '+nt.continentalCompetition+'!');p.trophies.push('🥇 '+nt.continentalCompetition+' '+(2026+p.season));}}
 else L.push('📵 Sin convocatoria este año.');
 if(R.relegated)L.push('⬇️ ¡Descenso! La próxima temporada será en el ascenso.');
 p.history.push({s:p.season,club:p.club,pos:R.pos,apps,goals,perf});
 // crecimiento / declive
 const g=p.age<=23?2:(p.age<=29?1:0),dec=p.age>=30?1:0;
 const ks=Object.keys(p.atr);
 for(let i=0;i<g;i++){const k=ks[Math.floor(rng('gr'+p.season,i)*6)];if(perf>55)p.atr[k]=Math.min(99,p.atr[k]+1);}
 if(dec){const k=ks[Math.floor(rng('dc'+p.season,1)*6)];p.atr[k]=Math.max(40,p.atr[k]-1);}
 p.age++;
 S.offers=genOffers(p);S.phase='offers';save();
 const ov=mkOv('<h3>📋 Fin de temporada '+(2026+p.season-1)+'</h3><div class="i2-log" style="margin:10px 0">'+L.map(x=>'<div class="i2-ev">'+x+'</div>').join('')+'</div><button class="btn btn-primary" id="i2ok">Ver ofertas →</button>');
 $('i2ok').onclick=()=>{closeOv(ov);showOffers();};
 p.log=(p.log||[]).concat(L);save();render();
}

function showOffers(){
 const p=S.p,offs=S.offers||[];
 const html='<h3>✍️ Ofertas · temporada '+(2026+p.season)+'</h3><p class="i2-sub">Renovación: '+renewalF(p)+'% de chance · Elegí con cabeza: el interés indica cuánto te quieren ahí.</p><div class="i2-offers">'+
  offs.map((o,i)=>{const c=o.club;
   return '<button class="i2-off'+(o.type==='renewal'?' ren':'')+'" data-i="'+i+'"><h4>'+(o.type==='renewal'?'🔄 Renovación · ':'')+c.name+'</h4>'+
   '<span class="tag">'+c.country+' · '+c.league+' · fuerza '+c.strength+(c.continentalCompetition?' · '+c.continentalCompetition:'')+'</span>'+
   '<div class="i2-int"><i style="width:'+(o.type==='renewal'?o.rPct:o.int)+'%"></i></div>'+
   '<span class="tag">'+(o.type==='renewal'?'Confianza del club: '+o.rPct+'%':'Interés: '+o.int+'%')+'</span></button>';}).join('')+
  '</div><button class="btn btn-ghost" id="i2stay" style="margin-top:12px">Quedarme sin renovar</button>';
 const ov=mkOv(html);
 ov.querySelectorAll('.i2-off').forEach(b=>b.onclick=()=>{const o=offs[+b.dataset.i];accept(o);closeOv(ov);});
 $('i2stay').onclick=()=>{p.idolatry=Math.max(0,p.idolatry-3);accept(null);closeOv(ov);};
}
function accept(o){
 const p=S.p;
 if(o&&o.type==='renewal'){p._lastContractSeason=p.season;}
 else if(o){p.club=o.club.name;p.country=o.club.country;p._clubSinceSeason=p.season;p._lastContractSeason=p.season;
  if(o.int<25)p._perfBonus=(p._perfBonus||0)-4; // llegás a un club que no te quería: menos rodaje
  p.log.push('✈️ Transferido a '+o.club.name);}
 else p.log.push(' Te quedaste sin renovar: la dirigencia te mira de reojo.');
 S.phase='pre';save();render();
}

/* ── render ── */
function view(){return document.querySelector('#view-idolo .wrap')||document.querySelector('#view-idolo');}
async function render(){
 D=await getDB();if(!D){view().innerHTML='<div class="wrap"><div class="empty">No se pudo cargar modo_carrera_equipos_2026.json</div></div>';return;}
 const v=view();
 if(!S){renderCreate(v);return;}
 const p=S.p,o=ovr(p),e=effOvr(p);
 v.innerHTML='<div class="wrap i2-wrap">'+
  '<div class="panel i2-card"><div class="i2-head"><div class="i2-ava">👑</div>'+
  '<div><h3 style="font-family:var(--disp)">'+p.name+' <span style="color:var(--mut);font-size:12px">'+p.pos+' · '+p.age+' años · '+p.country+'</span></h3>'+
  '<div class="i2-stat"><span>OVR <b>'+o+'</b></span><span>Efectivo <b>'+e+'</b></span><span>Forma <b>'+p.form.toFixed(1)+'</b></span><span>🏟 '+p.club+'</span><span>🇦 '+p.nationalApps+'</span><span>⚽ '+p.goals+'</span></span></div></div>'+
  '<div class="i2-bars"><div class="i2-barw"><div class="i2-barf" style="width:'+p.idolatry+'%;background:var(--gold)"></div></div><span style="font-size:10px;color:var(--gray)">Idolatría '+Math.round(p.idolatry)+'/100</span></div></div>'+
  (S.phase==='pre'?'<div class="ido-btns"><button class="btn btn-primary" id="i2play">🎮 Entrenar y jugar temporada '+(2026+p.season)+'</button><button class="btn btn-ghost" id="i2ret">👴 Retirarse</button></div>':'')+
  '<div class="panel i2-card"><div class="panel-h"><h3>📜 Historia</h3><span class="rule"></span></div><div class="i2-log">'+(p.log||[]).slice(-14).reverse().map(x=>'<div class="i2-ev">'+x+'</div>').join('')+'</div></div>'+
  (p.trophies.length?'<div class="panel i2-card"><div class="panel-h"><h3>🏆 Vitrina</h3><span class="rule"></span></div><div class="i2-stat">'+p.trophies.map(t=>'<span>'+t+'</span>').join('')+'</div></div>':'')+
  '</div>';
 if(S.phase==='pre'){$('i2play').onclick=playSeason;$('i2ret').onclick=retire;}
}
function retire(){const p=S.p;S.phase='legacy';save();
 const v=view();v.innerHTML='<div class="wrap i2-wrap"><div class="panel i2-card"><h2 style="font-family:var(--disp)">👑 Leyenda de '+p.name+'</h2>'+
 '<div class="i2-stat" style="margin:12px 0"><span>PJ <b>'+p.appearances+'</b></span><span>Goles <b>'+p.goals+'</b></span><span>Selección <b>'+p.nationalApps+'</b></span><span>Idolatría final <b>'+Math.round(p.idolatry)+'</b></span></div>'+
 '<div class="i2-stat">'+(p.trophies.length?p.trophies.map(t=>'<span>'+t+'</span>').join(''):'<span>Sin trofeos, pero con historia.</span>')+'</div>'+
 '<button class="btn btn-primary" style="margin-top:14px" id="i2new">Nueva carrera</button></div></div>';
 $('i2new').onclick=()=>{S=null;localStorage.removeItem(LS);render();};}
function renderCreate(v){
 v.innerHTML='<div class="wrap i2-wrap"><div class="panel i2-card"><div class="panel-h"><h3>👑 Crear futbolista</h3><span class="rule"></span></div>'+
 '<div class="i2-form"><label>Nombre<input class="inp" id="i2name" value="Rocky"></label>'+
 '<label>Edad<input class="inp" id="i2age" type="number" min="16" max="30" value="17"></label>'+
 '<label>País<select class="inp" id="i2cty">'+D.nationalTeams.map(t=>'<option>'+t.name+'</option>').join('')+'</select></label>'+
 '<label>Posición<select class="inp" id="i2pos"><option>DEL</option><option>MED</option><option>DEF</option><option>ARQ</option></select></label></div>'+
 '<button class="btn btn-primary" id="i2go">Elegir club inicial →</button></div></div>';
 $('i2go').onclick=async()=>{
  const pos=$('i2pos').value,a={pac:45,sho:45,pas:45,def:45,dri:45,phy:45};
  ({DEL:['sho','pac','dri'],MED:['pas','dri','pac'],DEF:['def','phy','pac'],ARQ:['def','phy','dri']})[pos].forEach((k,i)=>a[k]+=14-i*3);
  Object.keys(a).forEach(k=>a[k]+=Math.floor(Math.random()*6)-2);
  const p={name:$('i2name').value||'Rocky',age:+$('i2age').value||17,pos,country:$('i2cty').value,atr:a,form:6,season:1,idolatry:10,club:null,appearances:0,goals:0,nationalApps:0,history:[],trophies:[],log:[]};
  const home=D.clubs.filter(c=>c.country===p.country&&c.strength<=70);
  const opts=wSample(home.length?home:D.clubs.filter(c=>c.strength<=70),c=>1,3,'start'+p.name);
  const ov=mkOv('<h3>🏟 Elegí tu primer club</h3><div class="i2-offers">'+opts.map((c,i)=>'<button class="i2-off" data-i="'+i+'"><h4>'+c.name+'</h4><span class="tag">'+c.league+' · fuerza '+c.strength+'</span></button>').join('')+'</div>');
  ov.querySelectorAll('.i2-off').forEach(b=>b.onclick=()=>{const c=opts[+b.dataset.i];
   p.club=c.name;p._clubSinceSeason=1;p._lastContractSeason=1;p.log.push(' Firmaste con '+c.name+' ('+c.league+')');
   S={p,phase:'pre'};save();closeOv(ov);render();});
 };
}

/* ── hook al view existente ── */
const _ir=window.idoloRender;
window.idoloRender=function(){ if(localStorage.getItem(LS)||!S&&document.querySelector('#view-idolo')) render(); else if(_ir)_ir(); };
setTimeout(render,300);
})();
/* ═══════════ MINIJUEGOS DE FÚTBOL (habilidad, no suerte) ═══════════ */
function _ov(html){const o=document.createElement('div');o.className='i2-ov';o.innerHTML='<div class="i2-box">'+html+'</div>';document.body.appendChild(o);return o;}
function _close(o,v){o.remove();return v;}

/* 🥅 1) Mano a mano: pateá lejos del arquero y cerca del palo */
function mgDefinicion(){return new Promise(res=>{
 let round=0,tot=0,raf,t=0,x=50,kx=50;
 const ov=_ov('<h3>🥅 Mano a mano</h3><p class="i2-sub">Clic cuando tu ⚽ esté en el palo contrario al 🧤 del arquero · 3 intentos</p><div class="i2-goal"><div class="i2-gk" id="gk">🧤</div><div class="i2-ball" id="bl">⚽</div></div><button class="btn btn-primary" id="sh">¡Definir!</button><div class="i2-res" id="rs"></div>');
 const gk=ov.querySelector('#gk'),bl=ov.querySelector('#bl');
 (function st(){t+=0.03;kx=50+38*Math.sin(t*1.1);x=50+46*Math.sin(t*2.3+1.7);gk.style.left=kx+'%';bl.style.left=x+'%';raf=requestAnimationFrame(st);})();
 ov.querySelector('#sh').onclick=()=>{
  const d=Math.abs(x-kx),corner=Math.abs(x-50);
  const sc=Math.round(Math.min(100,d*1.6+corner*0.5));
  const goal=d>25&&corner>18;
  tot+=goal?sc:Math.round(sc*0.3);round++;
  ov.querySelector('#rs').innerHTML+='<span class="i2-chip">'+(goal?'⚽ '+sc:'🧤 '+sc)+'</span>';
  if(round>=3){cancelAnimationFrame(raf);setTimeout(()=>res(_close(ov,Math.round(tot/3))),600);}
 };});}

/* 🏆 2) La tanda: leé al arquero + colocación con barra */
function mgTanda(){return new Promise(res=>{
 const ov=_ov('<h3>🏆 La tanda</h3><p class="i2-sub">Leé al arquero, elegí el palo y clavalá.</p><div class="i2-q" style="font-weight:700;margin:8px 0"></div><div class="i2-opts"></div><div class="i2-bar" id="tb" style="display:none"><div class="i2-zone"></div><div class="i2-mark" id="tmk"></div></div><button class="btn btn-primary" id="tk" style="display:none">¡Patear!</button><div class="i2-res"></div>');
 const q=ov.querySelector('.i2-q'),opts=ov.querySelector('.i2-opts'),bar=ov.querySelector('#tb'),mk=ov.querySelector('#tmk'),kick=ov.querySelector('#tk'),rs=ov.querySelector('.i2-res');
 let pen=0,goals=0;
 const sides=['⬅️ Palo izquierdo','⬆️ Al medio','➡️ Palo derecho'];
 const tells=['El arquero se apoya en el palo izquierdo…','El arquero duda, se queda al medio…','El arquero muestra el palo derecho…'];
 function next(){
  if(pen>=3){res(_close(ov,Math.round(goals/3*100)));return;}
  const tell=Math.floor(Math.random()*3);
  q.textContent='Penal '+(pen+1)+' de 3 · '+tells[tell];
  opts.innerHTML=sides.map((s,j)=>'<button data-j="'+j+'">'+s+'</button>').join('');
  opts.onclick=e=>{
   const b=e.target.closest('button');if(!b)return;
   const pick=+b.dataset.j,risky=pick===tell;
   opts.innerHTML='';
   q.textContent=risky?'¡El arquero va a tu palo! Solo un ángulo perfecto entra.':'Buena lectura. Asegurá la colocación.';
   bar.style.display='block';kick.style.display='';
   let x=0,dir=1,raf;
   (function st(){x+=dir*2.1;if(x>100||x<0)dir*=-1;mk.style.left=x+'%';raf=requestAnimationFrame(st);})();
   kick.onclick=()=>{
    cancelAnimationFrame(raf);
    const quality=100-Math.abs(x-50)*2.2;
    const goal=quality>=(risky?80:45);
    if(goal)goals++;
    rs.innerHTML+='<span class="i2-chip">'+(goal?'⚽':'🧤')+'</span>';
    bar.style.display='none';kick.style.display='none';
    pen++;setTimeout(next,450);
   };
  };
 }
 next();});}

/* 🎯 3) Centro y cabezazo: timing puro en el área */
function mgCabezazo(){return new Promise(res=>{
 let round=0,tot=0,raf,t=0;
 const ov=_ov('<h3>🎯 Centro y cabezazo</h3><p class="i2-sub">Clic cuando el ⚽ entre a la zona del 9 · 3 centros</p><div class="i2-cross"><div class="i2-zone9"></div><div class="i2-nine">🏃</div><div class="i2-ball9" id="b9">⚽</div></div><button class="btn btn-primary" id="hd">¡Cabecear!</button><div class="i2-res" id="rs9"></div>');
 const b9=ov.querySelector('#b9');
 (function st(){t+=0.02;b9.style.left=(50+48*Math.sin(t*2))+'%';b9.style.top=(25+55*Math.abs(Math.cos(t*2)))+'%';raf=requestAnimationFrame(st);})();
 ov.querySelector('#hd').onclick=()=>{
  const bl=parseFloat(b9.style.left),bt=parseFloat(b9.style.top);
  const d=Math.hypot(bl-50,bt-76);
  const sc=Math.max(0,Math.round(100-d*3));
  tot+=sc;round++;
  ov.querySelector('#rs9').innerHTML+='<span class="i2-chip">'+(sc>60?'⚽ '+sc:'😤 '+sc)+'</span>';
  if(round>=3){cancelAnimationFrame(raf);setTimeout(()=>res(_close(ov,Math.round(tot/3))),600);}
 };});}
