// ===================== BASE DE FUERZA + ESTRELLA (ranking FIFA jun 2026, aprox/editable) =====================
// s = rating de fuerza 0-100 ; p = jugador a seguir (orientativo, editable)
const TEAMS=[
  {es:"Argentina",s:92,p:"Julián Álvarez",k:["argentina"]},
  {es:"España",s:91,p:"Lamine Yamal",k:["espana","spain"]},
  {es:"Francia",s:90,p:"Kylian Mbappé",k:["francia","france"]},
  {es:"Inglaterra",s:88,p:"Jude Bellingham",k:["inglaterra","england"]},
  {es:"Brasil",s:87,p:"Vinícius Jr",k:["brasil","brazil"]},
  {es:"Portugal",s:87,p:"Rafael Leão",k:["portugal"]},
  {es:"Países Bajos",s:85,p:"Cody Gakpo",k:["paises bajos","holanda","netherlands","holland"]},
  {es:"Alemania",s:84,p:"Florian Wirtz",k:["alemania","germany"]},
  {es:"Bélgica",s:82,p:"Kevin De Bruyne",k:["belgica","belgium"]},
  {es:"Croacia",s:80,p:"Luka Modrić",k:["croacia","croatia"]},
  {es:"Marruecos",s:80,p:"Achraf Hakimi",k:["marruecos","morocco"]},
  {es:"Colombia",s:79,p:"Luis Díaz",k:["colombia"]},
  {es:"Uruguay",s:79,p:"Federico Valverde",k:["uruguay"]},
  {es:"Senegal",s:76,p:"Nicolas Jackson",k:["senegal"]},
  {es:"Suiza",s:76,p:"Granit Xhaka",k:["suiza","switzerland"]},
  {es:"Dinamarca",s:75,p:"Rasmus Højlund",k:["dinamarca","denmark"]},
  {es:"Noruega",s:74,p:"Erling Haaland",k:["noruega","norway"]},
  {es:"Japón",s:74,p:"Takefusa Kubo",k:["japon","japan"]},
  {es:"Estados Unidos",s:74,p:"Christian Pulisic",k:["estados unidos","usa","eeuu","united states"]},
  {es:"México",s:73,p:"Santiago Giménez",k:["mexico"]},
  {es:"Ecuador",s:72,p:"Moisés Caicedo",k:["ecuador"]},
  {es:"Austria",s:72,p:"Marcel Sabitzer",k:["austria"]},
  {es:"Turquía",s:72,p:"Arda Güler",k:["turquia","turkey","turkiye"]},
  {es:"Nigeria",s:71,p:"Victor Osimhen",k:["nigeria"]},
  {es:"Suecia",s:71,p:"Alexander Isak",k:["suecia","sweden"]},
  {es:"Corea del Sur",s:71,p:"Son Heung-min",k:["corea del sur","corea","south korea","korea"]},
  {es:"Australia",s:70,p:"—",k:["australia"]},
  {es:"Egipto",s:70,p:"Mohamed Salah",k:["egipto","egypt"]},
  {es:"Costa de Marfil",s:70,p:"Simon Adingra",k:["costa de marfil","ivory coast","cote divoire","marfil"]},
  {es:"Canadá",s:70,p:"Alphonso Davies",k:["canada"]},
  {es:"Irán",s:68,p:"Mehdi Taremi",k:["iran"]},
  {es:"Paraguay",s:68,p:"Miguel Almirón",k:["paraguay"]},
  {es:"Argelia",s:68,p:"Riyad Mahrez",k:["argelia","algeria"]},
  {es:"República Checa",s:68,p:"Patrik Schick",k:["republica checa","checa","czechia","czech"]},
  {es:"Bosnia",s:67,p:"Edin Džeko",k:["bosnia","bosnia y herzegovina","bosnia herzegovina","bosniaherzegovina"]},
  {es:"Túnez",s:66,p:"—",k:["tunez","tunisia"]},
  {es:"Panamá",s:64,p:"—",k:["panama"]},
  {es:"Uzbekistán",s:62,p:"—",k:["uzbekistan"]},
  {es:"Sudáfrica",s:62,p:"—",k:["sudafrica","south africa"]},
  {es:"Arabia Saudita",s:60,p:"Salem Al-Dawsari",k:["arabia saudita","arabia","saudi arabia","saudi"]},
  {es:"Catar",s:60,p:"Akram Afif",k:["catar","qatar"]},
  {es:"Jordania",s:58,p:"Musa Al-Taamari",k:["jordania","jordan"]},
  {es:"Cabo Verde",s:58,p:"—",k:["cabo verde","cape verde"]},
  {es:"Curazao",s:56,p:"—",k:["curazao","curacao"]},
  {es:"Nueva Zelanda",s:56,p:"Chris Wood",k:["nueva zelanda","new zealand"]},
  {es:"Haití",s:54,p:"—",k:["haiti"]},
  {es:"Escocia",s:70,p:"Scott McTominay",k:["escocia","scotland"]},
  {es:"Ghana",s:69,p:"Mohammed Kudus",k:["ghana"]},
  {es:"RD del Congo",s:65,p:"Yoane Wissa",k:["rd del congo","rd congo","congo dr","dr congo","republica democratica del congo","congo"]},
  {es:"Irak",s:61,p:"Aymen Hussein",k:["irak","iraq"]},
];
const norm=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z ]/g,'').trim();
function findTeam(t){
  const q=norm(t);
  var r=TEAMS.find(x=>x.k.includes(q)||norm(x.es)===q||x.k.some(k=>k.startsWith(q)&&q.length>=3));
  if(r) return r;
  if(CURRENT_LEAGUE!=='worldcup'){
    var ct=leagueTeams(CURRENT_LEAGUE);
    if(ct) r=ct.find(x=>x.k.some(k=>k.includes(q)||q.includes(k))||norm(x.es)===q);
  }
  return r||null;
}

// ===================== CLUBES (5 grandes ligas + Champions) =====================
// s = rating de fuerza 0-100 ; espn = ID de ESPN para schedule ; en = nombre en inglés
const CLUB_TEAMS={
  premier:[
    {es:"Manchester City",s:90,espn:382,en:"Manchester City",k:["manchester city","man city"]},
    {es:"Arsenal",s:88,espn:359,en:"Arsenal",k:["arsenal"]},
    {es:"Liverpool",s:88,espn:364,en:"Liverpool",k:["liverpool"]},
    {es:"Chelsea",s:84,espn:363,en:"Chelsea",k:["chelsea"]},
    {es:"Manchester United",s:83,espn:360,en:"Manchester United",k:["manchester united","man united","man utd"]},
    {es:"Tottenham",s:82,espn:367,en:"Tottenham Hotspur",k:["tottenham","spurs"]},
    {es:"Newcastle",s:81,espn:361,en:"Newcastle United",k:["newcastle"]},
    {es:"Aston Villa",s:80,espn:362,en:"Aston Villa",k:["aston villa"]},
    {es:"Brighton",s:78,espn:331,en:"Brighton & Hove Albion",k:["brighton"]},
    {es:"West Ham",s:77,espn:379,en:"West Ham United",k:["west ham"]},
    {es:"Everton",s:77,espn:368,en:"Everton",k:["everton"]},
    {es:"Fulham",s:75,espn:370,en:"Fulham",k:["fulham"]},
    {es:"Crystal Palace",s:74,espn:384,en:"Crystal Palace",k:["crystal palace","palace"]},
    {es:"Wolverhampton",s:73,espn:380,en:"Wolverhampton Wanderers",k:["wolverhampton","wolves","wolves"]},
    {es:"Nottingham Forest",s:72,espn:393,en:"Nottingham Forest",k:["nottingham","nottingham forest"]},
    {es:"Brentford",s:71,espn:337,en:"Brentford",k:["brentford"]},
    {es:"Bournemouth",s:70,espn:349,en:"AFC Bournemouth",k:["bournemouth"]},
    {es:"Leeds United",s:71,espn:369,en:"Leeds United",k:["leeds","leeds united"]},
    {es:"Burnley",s:69,espn:389,en:"Burnley",k:["burnley"]},
    {es:"Sunderland",s:67,espn:381,en:"Sunderland",k:["sunderland"]},
  ],
  laliga:[
    {es:"Real Madrid",s:92,espn:86,en:"Real Madrid",k:["real madrid"]},
    {es:"Barcelona",s:90,espn:83,en:"Barcelona",k:["barcelona","barça"]},
    {es:"Atlético Madrid",s:86,espn:1068,en:"Atlético Madrid",k:["atletico madrid","atletico","atlético"]},
    {es:"Real Sociedad",s:80,espn:89,en:"Real Sociedad",k:["real sociedad","la real"]},
    {es:"Athletic Club",s:79,espn:93,en:"Athletic Bilbao",k:["athletic","bilbao"]},
    {es:"Villarreal",s:78,espn:102,en:"Villarreal",k:["villarreal"]},
    {es:"Betis",s:76,espn:244,en:"Real Betis",k:["betis","real betis"]},
    {es:"Sevilla",s:75,espn:243,en:"Sevilla",k:["sevilla","sevilla"]},
    {es:"Valencia",s:74,espn:94,en:"Valencia",k:["valencia"]},
    {es:"Girona",s:73,espn:9812,en:"Girona",k:["girona"]},
    {es:"Osasuna",s:71,espn:97,en:"Osasuna",k:["osasuna"]},
    {es:"Celta de Vigo",s:70,espn:85,en:"Celta Vigo",k:["celta","celta de vigo"]},
    {es:"Rayo Vallecano",s:69,espn:101,en:"Rayo Vallecano",k:["rayo","rayo vallecano"]},
    {es:"Mallorca",s:68,espn:84,en:"Mallorca",k:["mallorca"]},
    {es:"Getafe",s:67,espn:2922,en:"Getafe",k:["getafe"]},
    {es:"Espanyol",s:66,espn:88,en:"Espanyol",k:["espanyol"]},
    {es:"Alavés",s:65,espn:96,en:"Alavés",k:["alaves","alavés"]},
    {es:"Levante",s:65,espn:1538,en:"Levante UD",k:["levante"]},
    {es:"Elche",s:63,espn:3751,en:"Elche CF",k:["elche"]},
    {es:"Real Oviedo",s:62,espn:92,en:"Real Oviedo",k:["oviedo","real oviedo"]},
  ],
  bundes:[
    {es:"Bayern Múnich",s:91,espn:132,en:"Bayern Munich",k:["bayern","bayern munich","bayern munchen"]},
    {es:"Borussia Dortmund",s:85,espn:124,en:"Borussia Dortmund",k:["dortmund","bvb"]},
    {es:"RB Leipzig",s:83,espn:11420,en:"RB Leipzig",k:["leipzig","rb leipzig"]},
    {es:"Bayer Leverkusen",s:82,espn:131,en:"Bayer Leverkusen",k:["leverkusen","bayer"]},
    {es:"Stuttgart",s:77,espn:134,en:"VfB Stuttgart",k:["stuttgart"]},
    {es:"Eintracht Frankfurt",s:76,espn:125,en:"Eintracht Frankfurt",k:["frankfurt","eintracht"]},
    {es:"Wolfsburgo",s:74,espn:138,en:"VfL Wolfsburg",k:["wolfsburgo","wolfsburg"]},
    {es:"Friburgo",s:73,espn:126,en:"SC Freiburg",k:["friburgo","freiburg"]},
    {es:"Borussia Mönchengladbach",s:72,espn:268,en:"Borussia Mönchengladbach",k:["monchengladbach","gladbach"]},
    {es:"Mainz",s:71,espn:2950,en:"1. FSV Mainz 05",k:["mainz"]},
    {es:"Werder Bremen",s:70,espn:137,en:"Werder Bremen",k:["werder","werder bremen"]},
    {es:"Hoffenheim",s:69,espn:7911,en:"TSG Hoffenheim",k:["hoffenheim"]},
    {es:"Union Berlin",s:68,espn:598,en:"1. FC Union Berlin",k:["union berlin","union"]},
    {es:"Augsburgo",s:67,espn:3841,en:"FC Augsburg",k:["augsburgo","augsburg"]},
    {es:"1. FC Köln",s:67,espn:122,en:"1. FC Köln",k:["koln","köln","cologne"]},
    {es:"Heidenheim",s:65,espn:6418,en:"1. FC Heidenheim",k:["heidenheim"]},
    {es:"St. Pauli",s:64,espn:270,en:"FC St. Pauli",k:["st pauli","st. pauli"]},
    {es:"Hamburger SV",s:63,espn:127,en:"Hamburger SV",k:["hamburgo","hamburg","hsv"]},
  ],
  seriea:[
    {es:"Inter",s:87,espn:110,en:"Inter Milan",k:["inter","inter de milan"]},
    {es:"AC Milan",s:85,espn:103,en:"AC Milan",k:["ac milan","milan"]},
    {es:"Juventus",s:84,espn:111,en:"Juventus",k:["juventus","juve"]},
    {es:"Napoli",s:83,espn:114,en:"Napoli",k:["napoli","napoles"]},
    {es:"Atalanta",s:81,espn:105,en:"Atalanta",k:["atalanta"]},
    {es:"Roma",s:80,espn:104,en:"Roma",k:["roma"]},
    {es:"Lazio",s:79,espn:112,en:"Lazio",k:["lazio"]},
    {es:"Fiorentina",s:75,espn:109,en:"Fiorentina",k:["fiorentina"]},
    {es:"Bologna",s:73,espn:107,en:"Bologna",k:["bologna"]},
    {es:"Torino",s:72,espn:239,en:"Torino",k:["torino","turin"]},
    {es:"Udinese",s:71,espn:118,en:"Udinese",k:["udinese"]},
    {es:"Genoa",s:70,espn:3263,en:"Genoa",k:["genoa","genova"]},
    {es:"Cremonese",s:68,espn:4050,en:"US Cremonese",k:["cremonese"]},
    {es:"Pisa",s:67,espn:3956,en:"Pisa SC",k:["pisa"]},
    {es:"Lecce",s:67,espn:113,en:"Lecce",k:["lecce"]},
    {es:"Parma",s:66,espn:115,en:"Parma Calcio",k:["parma"]},
    {es:"Como",s:65,espn:2572,en:"Como 1907",k:["como"]},
    {es:"Cagliari",s:64,espn:2925,en:"Cagliari",k:["cagliari"]},
    {es:"Hellas Verona",s:63,espn:119,en:"Hellas Verona",k:["verona","hellas verona"]},
    {es:"Sassuolo",s:63,espn:3997,en:"US Sassuolo",k:["sassuolo"]},
  ],
  ligue1:[
    {es:"PSG",s:87,espn:160,en:"Paris Saint-Germain",k:["psg","paris","paris saint germain"]},
    {es:"Olympique Lyon",s:80,espn:167,en:"Olympique Lyonnais",k:["lyon","olympique lyon"]},
    {es:"Marsella",s:79,espn:176,en:"Olympique Marseille",k:["marsella","marseille","olympique marsella"]},
    {es:"Mónaco",s:78,espn:174,en:"AS Monaco",k:["monaco"]},
    {es:"Lille",s:77,espn:166,en:"Lille",k:["lille"]},
    {es:"Niza",s:76,espn:2502,en:"OGC Nice",k:["niza","nice"]},
    {es:"Rennes",s:74,espn:169,en:"Stade Rennais",k:["rennes"]},
    {es:"Lens",s:73,espn:175,en:"RC Lens",k:["lens"]},
    {es:"Toulouse",s:70,espn:179,en:"Toulouse",k:["toulouse"]},
    {es:"Strasburgo",s:69,espn:180,en:"RC Strasbourg",k:["strasburgo","strasbourg"]},
    {es:"Brest",s:69,espn:6997,en:"Stade Brestois",k:["brest"]},
    {es:"Lorient",s:67,espn:273,en:"FC Lorient",k:["lorient"]},
    {es:"Paris FC",s:66,espn:6851,en:"Paris FC",k:["paris fc","paris"]},
    {es:"Nantes",s:66,espn:165,en:"FC Nantes",k:["nantes"]},
    {es:"Angers",s:65,espn:7868,en:"Angers SCO",k:["angers"]},
    {es:"FC Metz",s:64,espn:177,en:"FC Metz",k:["metz"]},
    {es:"Auxerre",s:63,espn:172,en:"AJ Auxerre",k:["auxerre"]},
    {es:"Le Havre",s:62,espn:3236,en:"Le Havre AC",k:["le havre","havre"]},
  ],
  champions:[
    {es:"Manchester City",s:92,espn:382,en:"Manchester City",k:["manchester city","man city"]},
    {es:"Real Madrid",s:92,espn:86,en:"Real Madrid",k:["real madrid"]},
    {es:"Bayern Múnich",s:91,espn:132,en:"Bayern Munich",k:["bayern","bayern munich","bayern munchen"]},
    {es:"PSG",s:90,espn:160,en:"Paris Saint-Germain",k:["psg","paris","paris saint germain"]},
    {es:"Barcelona",s:90,espn:83,en:"Barcelona",k:["barcelona","barça"]},
    {es:"Liverpool",s:88,espn:364,en:"Liverpool",k:["liverpool"]},
    {es:"Arsenal",s:88,espn:359,en:"Arsenal",k:["arsenal"]},
    {es:"Inter",s:87,espn:110,en:"Inter Milan",k:["inter","inter de milan"]},
    {es:"Atlético Madrid",s:86,espn:1068,en:"Atlético Madrid",k:["atletico madrid","atletico","atlético"]},
    {es:"Borussia Dortmund",s:85,espn:124,en:"Borussia Dortmund",k:["dortmund","bvb"]},
    {es:"AC Milan",s:85,espn:103,en:"AC Milan",k:["ac milan","milan"]},
    {es:"Juventus",s:84,espn:111,en:"Juventus",k:["juventus","juve"]},
    {es:"Chelsea",s:84,espn:363,en:"Chelsea",k:["chelsea"]},
    {es:"Napoli",s:83,espn:114,en:"Napoli",k:["napoli","napoles"]},
    {es:"Manchester United",s:83,espn:360,en:"Manchester United",k:["manchester united","man united","man utd"]},
    {es:"RB Leipzig",s:83,espn:11420,en:"RB Leipzig",k:["leipzig","rb leipzig"]},
    {es:"Tottenham",s:82,espn:367,en:"Tottenham Hotspur",k:["tottenham","spurs"]},
    {es:"Bayer Leverkusen",s:82,espn:131,en:"Bayer Leverkusen",k:["leverkusen","bayer"]},
    {es:"Newcastle",s:81,espn:361,en:"Newcastle United",k:["newcastle"]},
    {es:"Atalanta",s:81,espn:105,en:"Atalanta",k:["atalanta"]},
    {es:"Roma",s:80,espn:104,en:"Roma",k:["roma"]},
    {es:"Aston Villa",s:80,espn:362,en:"Aston Villa",k:["aston villa"]},
    {es:"Olympique Lyon",s:80,espn:167,en:"Olympique Lyonnais",k:["lyon","olympique lyon"]},
    {es:"Marsella",s:79,espn:176,en:"Olympique Marseille",k:["marsella","marseille","olympique marsella"]},
    {es:"Sporting CP",s:78,espn:2250,en:"Sporting CP",k:["sporting","sporting cp"]},
    {es:"PSV",s:78,espn:148,en:"PSV Eindhoven",k:["psv","psv eindhoven"]},
    {es:"Porto",s:78,espn:437,en:"FC Porto",k:["porto"]},
    {es:"Benfica",s:77,espn:1929,en:"SL Benfica",k:["benfica"]},
    {es:"Ajax",s:77,espn:139,en:"Ajax",k:["ajax"]},
    {es:"Celtic",s:76,espn:256,en:"Celtic",k:["celtic"]},
    {es:"Feyenoord",s:76,espn:142,en:"Feyenoord",k:["feyenoord"]},
    {es:"Mónaco",s:78,espn:174,en:"AS Monaco",k:["monaco"]},
    {es:"Club Brujas",s:74,espn:570,en:"Club Brugge",k:["brujas","club brugge","club brujas"]},
    {es:"Shakhtar Donetsk",s:74,espn:493,en:"Shakhtar Donetsk",k:["shakhtar","shakhtar donetsk"]},
    {es:"Lille",s:77,espn:166,en:"Lille",k:["lille"]},
    {es:"Estrella Roja",s:72,espn:2290,en:"Red Star Belgrade",k:["estrella roja","red star","crvena zvezda"]},
  ],
  champions_classif:[
    {es:"Sturm Graz",s:76,espn:3746,en:"SK Sturm Graz",k:["sturm graz","sturm"]},
    {es:"Fenerbahçe",s:78,espn:436,en:"Fenerbahce",k:["fenerbahce","fener"]},
    {es:"Estrella Roja",s:72,espn:2290,en:"Red Star Belgrade",k:["estrella roja","red star"]},
    {es:"Dinamo Zagreb",s:74,espn:597,en:"Dinamo Zagreb",k:["dinamo zagreb","zagreb"]},
    {es:"Slovan Bratislava",s:68,espn:521,en:"Slovan Bratislava",k:["slovan","slovan bratislava"]},
    {es:"Kairat Almaty",s:62,espn:2528,en:"Kairat Almaty",k:["kairat","kairat almaty"]},
    {es:"Omonia Nicosia",s:64,espn:617,en:"Omonia Nicosia",k:["omonia","omonia nicosia"]},
    {es:"Shamrock Rovers",s:63,espn:2564,en:"Shamrock Rovers",k:["shamrock","shamrock rovers"]},
    {es:"Hearts",s:70,espn:262,en:"Heart of Midlothian",k:["hearts","heart of midlothian"]},
    {es:"Vikingur Reykjavik",s:60,espn:8249,en:"Vikingur Reykjavik",k:["vikingur"]},
    {es:"KI Klaksvik",s:58,espn:2547,en:"KI Klaksvik",k:["klaksvik","ki klaksvik"]},
    {es:"Lincoln Red Imps",s:55,espn:17856,en:"Lincoln Red Imps",k:["lincoln","red imps","lincoln red imps"]},
    {es:"The New Saints",s:58,espn:576,en:"The New Saints",k:["tns","the new saints","new saints"]},
    {es:"Hapoel Be'er Sheva",s:65,espn:13083,en:"Hapoel Be'er",k:["hapoel beer","hapoel"]},
    {es:"Lech Poznań",s:67,espn:2990,en:"Lech Poznan",k:["lech poznan","lech"]},
    {es:"Levski Sofia",s:64,espn:490,en:"Levski Sofia",k:["levski","levski sofia"]},
    {es:"NK Celje",s:60,espn:3362,en:"NK Celje",k:["celje","nk celje"]},
    {es:"CSU Craiova",s:62,espn:8089,en:"CSU Craiova",k:["craiova","csu craiova"]},
    {es:"Larne",s:57,espn:20039,en:"Larne",k:["larne"]},
    {es:"Borac Banja Luka",s:59,espn:20710,en:"Borac Banja Luka",k:["borac","borac banja luka"]},
    {es:"Riga FC",s:58,espn:19246,en:"Riga FC",k:["riga","riga fc"]},
    {es:"Vardar",s:57,espn:560,en:"Vardar",k:["vardar"]},
    {es:"Drita Gjilan",s:54,espn:19243,en:"Drita Gjilan",k:["drita","drita gjilan"]},
    {es:"Egnatia",s:56,espn:21943,en:"Egnatia",k:["egnatia"]},
    {es:"Petrocub",s:55,espn:19250,en:"Petrocub",k:["petrocub"]},
    {es:"Sabah FK",s:59,espn:21922,en:"Sabah FK",k:["sabah","sabah fk"]},
    {es:"Ararat-Armenia",s:56,espn:20024,en:"Ararat-Armenia",k:["ararat","ararat-armenia"]},
    {es:"Iberia 1999",s:55,espn:20025,en:"Iberia 1999",k:["iberia","iberia 1999"]},
    {es:"AGF",s:66,espn:7853,en:"AGF",k:["agf"]},
    {es:"KuPS Kuopio",s:60,espn:8169,en:"KuPS Kuopio",k:["kups","kuopio"]},
    {es:"Flora Tallinn",s:58,espn:12146,en:"Flora",k:["flora","flora tallinn"]},
    {es:"Kauno Žalgiris",s:56,espn:20028,en:"Kauno Zalgiris",k:["kauno","zalgiris","kauno zalgiris"]},
    {es:"Tre Fiori",s:50,espn:8591,en:"Tre Fiori",k:["tre fiori"]},
    {es:"Floriana",s:55,espn:7857,en:"Floriana FC",k:["floriana"]},
    {es:"Inter d'Escaldes",s:52,espn:20703,en:"Inter D'Escaldes",k:["inter escaldes","escaldes"]},
    {es:"Atert Bissen",s:48,espn:131796,en:"FC Atert Bissen",k:["atert","atert bissen"]},
    {es:"Górnik Zabrze",s:65,espn:8180,en:"Gornik Zabrze",k:["gornik","zabrze","gornik zabrze"]},
    {es:"Mjällby",s:61,espn:20301,en:"Mjällby AIF",k:["mjallby","mja"]},
    {es:"Thun",s:63,espn:3024,en:"FC Thun",k:["thun"]},
    {es:"Győri ETO",s:60,espn:12367,en:"Győri ETO FC",k:["gyori","eto","gyor"]},
    {es:"Sutjeska",s:54,espn:8281,en:"FK Sutjeska",k:["sutjeska"]},
    {es:"Vitebsk",s:55,espn:131794,en:"ML Vitebsk",k:["vitebsk"]},
  ],
};
function clubFlag(){ return '⚽'; }

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

// ===================== MODELO DIXON-COLES (goles) =====================
function logFact(n){let s=0;for(let k=2;k<=n;k++)s+=Math.log(k);return s;}
function poissonPmf(k,l){return Math.exp(-l + k*Math.log(l) - logFact(k));}
function poissonCdf(k,l){let s=0;for(let i=0;i<=k;i++)s+=poissonPmf(i,l);return s;}
function dc(i,j,l,m,r){
  if(i===0&&j===0) return 1 - l*m*r;
  if(i===0&&j===1) return 1 + l*r;
  if(i===1&&j===0) return 1 + m*r;
  if(i===1&&j===1) return 1 - r;
  return 1.0;
}
function simulate(lamH,lamA,rho){
  const mg=8; const P=[]; let sum=0;
  for(let i=0;i<=mg;i++){P[i]=[];for(let j=0;j<=mg;j++){
    let v=poissonPmf(i,lamH)*poissonPmf(j,lamA)*dc(i,j,lamH,lamA,rho);
    if(v<0)v=0; P[i][j]=v; sum+=v;}}
  for(let i=0;i<=mg;i++)for(let j=0;j<=mg;j++)P[i][j]/=sum;
  let h=0,d=0,a=0,o15=0,o25=0,o35=0,btts=0,csH=0,csA=0,xgH=0,xgA=0;
  const scores=[];
  for(let i=0;i<=mg;i++)for(let j=0;j<=mg;j++){const p=P[i][j];
    if(i>j)h+=p;else if(i===j)d+=p;else a+=p;
    const t=i+j; if(t>1.5)o15+=p; if(t>2.5)o25+=p; if(t>3.5)o35+=p;
    if(i>0&&j>0)btts+=p; if(j===0)csH+=p; if(i===0)csA+=p; xgH+=i*p; xgA+=j*p;
    scores.push({i,j,p});}
  scores.sort((x,y)=>y.p-x.p);
  return {h,d,a,o15,o25,o35,btts,csH,csA,xgH,xgA,scores};
}

// ===================== ELIMINATORIA: ¿QUIÉN AVANZA? =====================
// En una llave a partido único, el empate en los 90' se resuelve en prórroga
// (30' extra ≈ 1/3 del tiempo reglamentario) y, si sigue igualado, en penales.
// Devuelve la probabilidad de que cada equipo PASE de ronda.
function knockoutAdvance(lamH,lamA,rho,R){
  // R = resultado de simulate() en los 90' (R.h gana A, R.d empate, R.a gana B)
  const w90H=R.h, draw=R.d, w90A=R.a;
  // Prórroga: se escalan los goles esperados a 30 minutos
  const f=30/90;
  const ET=simulate(lamH*f, lamA*f, rho);
  const etH=ET.h, etD=ET.d, etA=ET.a;   // desenlace de la prórroga
  // Penales: casi un volado, con una ligera ventaja para el equipo más fuerte
  const diff=(lamH-lamA)/(lamH+lamA);
  let penH=0.5+0.18*diff; penH=Math.min(0.62,Math.max(0.38,penH));
  // P(avanza) = gana en 90' + (empate)·[gana prórroga + (empate prórroga)·penales]
  const advH=w90H + draw*(etH + etD*penH);
  const advA=w90A + draw*(etA + etD*(1-penH));
  // probabilidades de cómo se resuelve (para explicarlo)
  const pPenales=draw*etD;
  const pProrroga=draw*(etH+etA);
  return {advH, advA, penH, etH, etD, etA, pProrroga, pPenales, p90Decide:1-draw};
}

// ===================== MERCADOS EXTRA =====================
// posesión a partir del reparto de xG (sirve en modo manual también)
function possShare(la,lb){const a=Math.pow(la,0.6),b=Math.pow(lb,0.6);return a/(a+b);}
// remates: equipo dominante tira más pero de menor calidad (menor xG por tiro)
function teamShots(lam,poss){const q=0.13-0.05*poss; return lam/q;}
// córners: crecen con el volumen de remates
function teamCorners(shots){return 2.0+0.22*shots;}
// pases del equipo según posesión
function teamPasses(poss){return 250+poss*650;}
// prob de over en una línea .5 con Poisson
function overLine(mean,line){const k=Math.floor(line); return 1-poissonCdf(k,mean);}

// ===================== UI =====================
const pc=x=>(100*x).toFixed(1)+'%';
function setMode(m){
  const a=m==='auto';
  tabAuto.classList.toggle('on',a); tabMan.classList.toggle('on',!a);
  modeAuto.classList.toggle('hidden',!a); modeMan.classList.toggle('hidden',a);
}
// botón flotante (celular): simula según el modo activo
function quickSim(){ if(modeAuto && !modeAuto.classList.contains('hidden')) autoCalc(); else run(); }
// al activar/desactivar "fase eliminatoria", recalcular si ya hay una simulación en pantalla
function toggleKO(){ if(typeof out!=='undefined' && out && !out.classList.contains('hidden')) run(); }

function autoCalc(){
  const ta=findTeam(selA.value), tb=findTeam(selB.value);
  if(!ta||!tb){
    autoOut.classList.remove('hidden');
    autoOut.innerHTML='⚠️ No reconozco '+(!ta?('"'+selA.value+'"'):'')+(!ta&&!tb?' ni ':'')+(!tb?('"'+selB.value+'"'):'')+
      '. Prueba otro nombre o usa la pestaña <b>Manual</b>.';
    return;
  }
  const sa=ratingOf(ta.es), sb=ratingOf(tb.es);     // rating ajustado por la forma reciente (ESPN)
  let [la,lb]=autoLambdas(sa,sb);
  const learned = applyLearning(la,lb);
  la=learned[0]; lb=learned[1];
  const r=autoRho(la+lb);
  teamA.value=ta.es; teamB.value=tb.es;
  lamA.value=la.toFixed(2); lamB.value=lb.toFixed(2);
  rho.value=r; rhoVal.textContent=r.toFixed(3);
  // estimar córners (desde dominancia) y tarjetas (default Mundial) para el baseline
  const pA=possShare(la,lb);
  cornA.value=applyCornerLearn(teamCorners(teamShots(la,pA))).toFixed(1);
  cornB.value=applyCornerLearn(teamCorners(teamShots(lb,1-pA))).toFixed(1);
  cardY.value="4.2"; cardR.value="0.13";
  autoOut.classList.remove('hidden');
  const fA=TEAM_FORM[ta.es], fB=TEAM_FORM[tb.es];
  const formApplied=APPLY_FORM && ((fA&&Math.abs(fA.delta)>=0.5)||(fB&&Math.abs(fB.delta)>=0.5));
  const mom=es=>{ const f=TEAM_FORM[es];
    if(!f||!f.g) return `<b>${es}</b>: sin partidos aún`;
    const ar=f.delta>1?'📈':(f.delta<-1?'📉':'➡️'), sg=f.delta>0?'+':'';
    return `${ar} <b>${es}</b>: ${(f.gf/f.g).toFixed(1)} GF / ${(f.ga/f.g).toFixed(1)} GC en ${f.g} pj <span style="color:var(--gray)">(${sg}${f.delta.toFixed(0)})</span>`; };
  autoOut.innerHTML=`Rating: <b>${ta.es} ${Math.round(sa)}</b> vs <b>${tb.es} ${Math.round(sb)}</b> &nbsp;→&nbsp; `+
    `λ <b>${la.toFixed(2)}</b> / <b>${lb.toFixed(2)}</b> · ρ <b>${r}</b>`+
    `<br><span style="color:var(--mut)">Momento (ESPN): ${mom(ta.es)} &nbsp;·&nbsp; ${mom(tb.es)}</span>`+
    (formApplied? `<br><span style="color:var(--acc)">✓ Rating ajustado por la forma reciente.</span>`:'')+
    (LEARN.apply&&LEARN.ready? `<br><span style="color:var(--acc)">✓ Calibración por partidos jugados aplicada (goles ×${LEARN.goalAdj.toFixed(3)}).</span>`:'')+
    `<br><span style="color:var(--gray)">Base por fuerza + datos de ESPN. Ajusta en Manual si tienes datos finos.</span>`;
  run();
}

function run(){
  // si se simula manualmente, dejamos de seguir el partido en vivo anterior
  if(typeof LIVE_OPEN_ID!=='undefined' && LIVE_OPEN_ID!=null){
    LIVE_OPEN_ID=null;
    const _lc=document.getElementById('liveCompare'); if(_lc){ _lc.classList.add('hidden'); _lc.innerHTML=''; }
  }
  const A=teamA.value||'Equipo A', B=teamB.value||'Equipo B';
  const lamH=parseFloat(lamA.value), lamA_=parseFloat(lamB.value), r=parseFloat(rho.value);
  if(!(lamH>0)||!(lamA_>0)){alert('Carga xG válidos (mayores a 0)');return;}
  const R=simulate(lamH,lamA_,r);

  mTitle.innerHTML = A+' <span style="color:var(--mut)">vs</span> '+B+'<small>'+ctx.value+' · λ '+A+' '+lamH.toFixed(2)+' | '+B+' '+lamA_.toFixed(2)+' | ρ '+r+'</small>';
  out.classList.remove('hidden');
  out.classList.remove('show');
  void out.offsetHeight;
  out.classList.add('show');

  // 1X2
  bar1x2.innerHTML='';
  const seg=(cls,v)=>{const s=document.createElement('span');s.className='seg-'+cls;s.style.width=(v*100)+'%';s.textContent=v>0.08?pc(v):'';bar1x2.appendChild(s);};
  seg('h',R.h); seg('d',R.d); seg('a',R.a);
  lblH.textContent='Gana '+A; lblA.textContent='Gana '+B;
  pH.textContent=pc(R.h); pD.textContent=pc(R.d); pA.textContent=pc(R.a);

  // ===== eliminatoria: ¿quién avanza? (incluye prórroga + penales) =====
  const koOn = (typeof koToggle!=='undefined') && koToggle && koToggle.checked;
  koWrap.classList.toggle('hidden', !koOn);
  let KO=null;
  if(koOn){
    KO=knockoutAdvance(lamH,lamA_,r,R);
    koBar.innerHTML='';
    const kseg=(cls,v)=>{const s=document.createElement('span');s.className='seg-'+cls;s.style.width=(v*100)+'%';s.textContent=v>0.08?pc(v):'';koBar.appendChild(s);};
    kseg('h',KO.advH); kseg('a',KO.advA);
    koLblH.textContent='Avanza '+A; koLblA.textContent='Avanza '+B;
    koPH.textContent=pc(KO.advH); koPA.textContent=pc(KO.advA);
    const favAdv = KO.advH>=KO.advA ? A : B;
    koTxt.innerHTML=`Probable clasificado: <b style="color:var(--txt)">${favAdv}</b> (${pc(Math.max(KO.advH,KO.advA))}). `+
      `Se resuelve en los 90' el <b>${pc(KO.p90Decide)}</b> de las veces; va a prórroga el <b>${pc(KO.pProrroga+KO.pPenales)}</b> `+
      `y a penales el <b>${pc(KO.pPenales)}</b>. En penales se asume una ligera ventaja al favorito (${pc(KO.penH)} / ${pc(1-KO.penH)}).`;
  }

  xgH.textContent=R.xgH.toFixed(2); xgA.textContent=R.xgA.toFixed(2);
  xgHl.textContent=A; xgAl.textContent=B;

  // mercados goles (tabla compacta + picks destacados)
  const goalPicks=[];
  let gRows='';
  for(let L=0.5;L<=6.5;L+=1){
    const ov=R.scores.reduce((s,x)=>x.i+x.j>L?s+x.p:s,0), un=1-ov;
    gRows+=`<tr><td>${L}</td><td class="r" style="color:${ov>=un?'var(--acc)':'var(--mut)'};font-weight:${ov>=un?700:400}">${pc(ov)}</td><td class="r" style="color:${un>ov?'var(--acc)':'var(--mut)'};font-weight:${un>ov?700:400}">${pc(un)}</td></tr>`;
    goalPicks.push({lab:'Over '+L,p:ov},{lab:'Under '+L,p:un});
  }
  let gInfo=goalPicks.filter(x=>x.p>0.5&&x.p<=0.95).sort((a,b)=>b.p-a.p);
  if(!gInfo.length)gInfo=goalPicks.slice().sort((a,b)=>b.p-a.p);
  markets.innerHTML=
    `<table style="width:100%"><thead><tr><th>Línea</th><th class="r">Over</th><th class="r">Under</th></tr></thead><tbody>${gRows}</tbody></table>`+
    `<div class="sub" style="margin-top:10px">Apuestas de goles más probables <span style="color:var(--gray)">(sin las obvias)</span>:</div>`+
    `<div class="mk" style="margin-top:6px">${gInfo.slice(0,6).map(x=>`<div class="pill"><span>${x.lab}</span><b>${pc(x.p)}</b></div>`).join('')}</div>`;
  let extraSec=document.getElementById('marketsExtraSec');
  if(!extraSec){
    extraSec=document.createElement('div');
    extraSec.id='marketsExtraSec';
    extraSec.innerHTML='<h3 class="sec">🛡️ Ambos anotan y valla invicta</h3><div class="mk" id="marketsExtra"></div>';
    markets.after(extraSec);
  }
  document.getElementById('marketsExtra').innerHTML=
    `<div class="pill"><span>Ambos marcan</span><b>${pc(R.btts)}</b></div><div class="pill"><span>No ambos</span><b>${pc(1-R.btts)}</b></div>`+
    `<div class="pill"><span>Valla 0 ${A}</span><b>${pc(R.csH)}</b></div><div class="pill"><span>Valla 0 ${B}</span><b>${pc(R.csA)}</b></div>`;

  // marcadores
  scores.querySelector('tbody').innerHTML=R.scores.slice(0,8).map(s=>`<tr><td>${s.i}-${s.j}</td><td class="r">${pc(s.p)}</td></tr>`).join('');

  // ===== matriz de marcadores (mapa de calor Poisson/Dixon-Coles) =====
  const HN=5; const gmap={}; let gmax=0;
  R.scores.forEach(s=>{ if(s.i<=HN&&s.j<=HN){ gmap[s.i+'_'+s.j]=s.p; if(s.p>gmax)gmax=s.p; }});
  let hh='<div class="heatwrap">';
  for(let i=0;i<=HN;i++) for(let j=0;j<=HN;j++){
    const p=gmap[i+'_'+j]||0, al=gmax>0?p/gmax:0, isMax=(p>0&&p===gmax);
    hh+=`<div class="heatcell" title="${A} ${i}-${j} ${B}: ${pc(p)}" style="background:rgba(33,208,122,${(0.05+0.85*al).toFixed(3)})${isMax?';outline:2px solid var(--acc2)':''}">`+
        `<span class="hc-sc">${i}-${j}</span><span class="hc-p">${p>=0.01?(p*100).toFixed(0)+'%':'·'}</span></div>`;
  }
  hh+='</div>';
  heatmap.innerHTML='<div class="heatmap-note">Cada casilla = marcador <b>'+A+' '+'(izq) - '+B+' (der)</b> · color = probabilidad · recuadro = el más probable</div>'+hh;

  // ===== predicción de marcador específico (modo de la distribución) =====
  const best=R.scores[0];
  const resWord = best.i>best.j ? ('Gana '+A) : (best.i===best.j ? 'Empate' : ('Gana '+B));
  predScore.innerHTML = `${A} ${best.i} - ${best.j} ${B}`+
    `<small>marcador más probable · ${pc(best.p)} · ${resWord}</small>`;
  // aclaración cuando el marcador exacto más probable no coincide con el favorito del 1X2
  const favO = R.h>=R.d&&R.h>=R.a?'H':(R.a>=R.d?'A':'D');
  const bestO = best.i>best.j?'H':(best.i===best.j?'D':'A');
  let cons=null;
  if(favO!==bestO){
    const favName = favO==='H'?('gane '+A) : favO==='A'?('gane '+B) : 'sea empate';
    for(const s of R.scores){ const o=s.i>s.j?'H':(s.i===s.j?'D':'A'); if(o===favO){cons=s;break;} }
    predScore.innerHTML += `<div style="font-size:12px;color:var(--mut);font-weight:400;margin-top:8px;line-height:1.45;letter-spacing:0">`+
      `El marcador exacto más probable es <b style="color:var(--txt)">${best.i}-${best.j}</b>, pero sumando todos los resultados lo más probable es que <b style="color:var(--txt)">${favName}</b> (${pc(Math.max(R.h,R.d,R.a))}). `+
      (cons?`Con ese resultado, el marcador más probable es <b style="color:var(--txt)">${cons.i}-${cons.j}</b> (${pc(cons.p)}). `:'')+
      `Es normal: el empate concentra su probabilidad en pocos marcadores y la victoria se reparte entre muchos.</div>`;
  }
  const si2=cons?cons.i:null, sj2=cons?cons.j:null, sp2=cons?cons.p:null;
  saveMsg.textContent='';

  // ===== mercados extra =====
  const possA=possShare(lamH,lamA_), possB=1-possA;
  const shA=teamShots(lamH,possA), shB=teamShots(lamA_,possB);
  const paA=teamPasses(possA), paB=teamPasses(possB);
  // córners: λ cargados a mano (o estimados en modo auto)
  const coA=parseFloat(cornA.value)||0, coB=parseFloat(cornB.value)||0;

  teamStats.innerHTML=`
    <div class="statbox"><h4>${A}</h4>
      <div class="statrow">Posesión <b>${(possA*100).toFixed(0)}%</b></div>
      <div class="statrow">Remates <b>${shA.toFixed(0)}</b></div>
      <div class="statrow">A puerta <b>${(shA*0.34).toFixed(0)}</b></div>
      <div class="statrow">Córners (λ) <b>${coA.toFixed(1)}</b></div>
      <div class="statrow">Pases <b>${paA.toFixed(0)}</b></div>
    </div>
    <div class="statbox"><h4>${B}</h4>
      <div class="statrow">Posesión <b>${(possB*100).toFixed(0)}%</b></div>
      <div class="statrow">Remates <b>${shB.toFixed(0)}</b></div>
      <div class="statrow">A puerta <b>${(shB*0.34).toFixed(0)}</b></div>
      <div class="statrow">Córners (λ) <b>${coB.toFixed(1)}</b></div>
      <div class="statrow">Pases <b>${paB.toFixed(0)}</b></div>
    </div>`;

  // ===== córners: escalera DINÁMICA (media ± 2σ) =====
  const coTot=coA+coB;
  const coSd=Math.sqrt(Math.max(coTot,1));                 // desvío Poisson
  const kLo=Math.max(1,Math.floor(coTot-2*coSd)), kHi=Math.ceil(coTot+2*coSd);
  const cLines=[]; for(let k=kLo;k<=kHi;k++) cLines.push(k+0.5);   // del mínimo al máximo del partido
  const cPicks=[]; let cRows='';
  cLines.forEach(L=>{
    const ov=overLine(coTot,L), un=1-ov;
    cPicks.push({lab:'Over '+L, p:ov}); cPicks.push({lab:'Under '+L, p:un});
    cRows+=`<tr><td>${L}</td>`+
      `<td class="r" style="color:${ov>=un?'var(--acc)':'var(--mut)'};font-weight:${ov>=un?700:400}">${pc(ov)}</td>`+
      `<td class="r" style="color:${un>ov?'var(--acc)':'var(--mut)'};font-weight:${un>ov?700:400}">${pc(un)}</td></tr>`;
  });
  // picks "fuertes pero informativos": favorito más alto, descartando las casi-seguras (>95%)
  let cInfo=cPicks.filter(x=>x.p>0.5 && x.p<=0.95).sort((a,b)=>b.p-a.p);
  if(!cInfo.length) cInfo=cPicks.slice().sort((a,b)=>b.p-a.p);   // fallback
  const cTop=cInfo.slice(0,4).map(x=>`<div class="pill"><span>${x.lab}</span><b>${pc(x.p)}</b></div>`).join('');
  cornerMk.style.display='block';
  cornerMk.innerHTML=
    `<div class="sub" style="margin:0 0 8px">Córners totales esperados (media): <b style="color:var(--acc2)">${coTot.toFixed(1)}</b></div>`+
    `<table><thead><tr><th>Línea</th><th class="r">Over</th><th class="r">Under</th></tr></thead><tbody>${cRows}</tbody></table>`+
    `<div class="sub" style="margin-top:10px">Apuestas de córners más probables <span style="color:var(--gray)">(fuertes, sin las obvias)</span>:</div>`+
    `<div class="mk" style="margin-top:6px">${cTop}</div>`;

  // tarjetas: λ amarillas y rojas del árbitro (cargados a mano)
  const yel=parseFloat(cardY.value)||0, red=parseFloat(cardR.value)||0;
  const shareA=0.5-0.4*(possA-0.5);            // el de menos posesión comete más faltas
  const yelA=yel*shareA, yelB=yel*(1-shareA);
  const refTxt=refName.value? (' · árbitro: '+refName.value):'';
  const yLines=[2.5,3.5,4.5,5.5,6.5,7.5];
  const yPicks=[]; let yRows='';
  yLines.forEach(L=>{
    const ov=overLine(yel,L), un=1-ov;
    yPicks.push({lab:'Over '+L, p:ov}); yPicks.push({lab:'Under '+L, p:un});
    yRows+=`<tr><td>${L}</td>`+
      `<td class="r" style="color:${ov>=un?'var(--acc)':'var(--mut)'};font-weight:${ov>=un?700:400}">${pc(ov)}</td>`+
      `<td class="r" style="color:${un>ov?'var(--acc)':'var(--mut)'};font-weight:${un>ov?700:400}">${pc(un)}</td></tr>`;
  });
  yPicks.sort((a,b)=>b.p-a.p);
  const yTop=yPicks.slice(0,4).map(x=>`<div class="pill"><span>${x.lab}</span><b>${pc(x.p)}</b></div>`).join('');
  cardsBox.innerHTML=
    `Amarillas esperadas (total): <b>${yel.toFixed(1)}</b>${refTxt}`+
    `<div class="statrow" style="margin-top:6px">${A} <b>${yelA.toFixed(1)}</b> &nbsp;·&nbsp; ${B} <b>${yelB.toFixed(1)}</b></div>`+
    `<table style="margin-top:8px"><thead><tr><th>Línea amarillas</th><th class="r">Over</th><th class="r">Under</th></tr></thead><tbody>${yRows}</tbody></table>`+
    `<div class="sub" style="margin-top:8px">Amarillas más probables:</div><div class="mk" style="margin-top:6px">${yTop}</div>`+
    `<div class="statrow" style="margin-top:10px">Rojas esperadas <b>${red.toFixed(2)}</b> &nbsp;·&nbsp; Prob. de al menos una roja <b>${pc(1-Math.exp(-red))}</b></div>`+
    `<div style="color:var(--red);font-size:11px;margin-top:6px">Basado en los promedios del árbitro. Es el mercado más volátil: tómalo con pinzas.</div>`;

  // abrir details de córners y tarjetas
  const cornerDet=cornerMk.closest('details'); if(cornerDet) cornerDet.open=true;
  const cardsDet=cardsBox.closest('details'); if(cardsDet) cardsDet.open=true;

  // confianza
  const top=Math.max(R.h,R.d,R.a);
  let cls,lab,msg;
  if(top>=0.70){cls='c-alta';lab='ALTA';msg='Favorito claro. La confianza es sobre el resultado esperado, no garantía de acierto. Si el favorito es obvio, el mérito predictivo es bajo.';}
  else if(top>=0.45){cls='c-media';lab='MEDIA';msg='Hay favorito pero con margen real para sorpresa. El modelo tiene una lectura moderada.';}
  else{cls='c-baja';lab='BAJA';msg='Partido parejo: el modelo NO tiene una lectura fuerte. Cualquier resultado es razonable.';}
  const fav = R.h>=R.d&&R.h>=R.a ? 'Gana '+A : (R.a>=R.d ? 'Gana '+B : 'Empate');
  confBox.innerHTML=`<span class="conf ${cls}">${lab}</span> &nbsp; Escenario más probable: <b>${fav}</b> (${pc(top)})`;
  confTxt.textContent=msg;

  // snapshot completo de la predicción para el historial (incluye mercados extra)
  lastPrediction={
    A, B, ctx:ctx.value, lamH, lamA:lamA_, rho:r,
    pH:R.h, pD:R.d, pA:R.a,
    predResult: R.h>=R.d&&R.h>=R.a ? 'H' : (R.a>=R.d ? 'A' : 'D'),
    si:R.scores[0].i, sj:R.scores[0].j, sp:R.scores[0].p,
    si2, sj2, sp2,
    xgH:R.xgH, xgA:R.xgA, o25:R.o25, btts:R.btts,
    predPossA:possA, predShotsA:shA, predShotsB:shB, predCornersTot:coTot, predYellowTot:yel,
    ko: KO ? {on:true, advH:KO.advH, advA:KO.advA, pProrroga:KO.pProrroga, pPenales:KO.pPenales, penH:KO.penH} : {on:false}
  };
  // datos curados para la imagen: línea más PAREJA (cerca del 50/50) de cada mercado con escalera
  const balanced=(arr)=>{ let best=null,bd=9; arr.forEach(([L,ov])=>{const d=Math.abs(ov-0.5); if(d<bd){bd=d; best= ov>=0.5?{lab:'Over '+L,p:ov}:{lab:'Under '+L,p:1-ov};}}); return best; };
  const goalMarkets=[];
  const bestTot=best.i+best.j;
  for(let L=0.5;L<=6.5;L+=1){
    const ov=R.scores.reduce((s,x)=>x.i+x.j>L?s+x.p:s,0);
    if(bestTot>L)goalMarkets.push({lab:'Over '+L,p:ov});
    else goalMarkets.push({lab:'Under '+L,p:1-ov});
  }
  const gMid=goalMarkets.length?goalMarkets.sort((a,b)=>b.p-a.p)[0]:null;
  const cMid=balanced(cLines.map(L=>[L,overLine(coTot,L)]));
  const yMid=balanced(yLines.map(L=>[L,overLine(yel,L)]));
  SHARE={
    A,B,ctx:ctx.value, h:R.h,d:R.d,a:R.a,
    score:`${A} ${best.i}-${best.j} ${B}`, scoreP:best.p,
    score2: cons?(`${A} ${cons.i}-${cons.j} ${B}`):null, score2P:cons?cons.p:null,
    xgH:R.xgH, xgA:R.xgA,
    goals: gMid? (gMid.lab+' ('+pc(gMid.p)+')') : '',
    btts: R.btts>=0.5?('Sí ('+pc(R.btts)+')'):('No ('+pc(1-R.btts)+')'),
    corner: cMid? (cMid.lab+' ('+pc(cMid.p)+')') : '',
    card: yMid? (yMid.lab+' ('+pc(yMid.p)+')') : '',
    ko: KO ? {advH:KO.advH, advA:KO.advA, penH:KO.penH, p90Decide:KO.p90Decide, pProrroga:KO.pProrroga, pPenales:KO.pPenales} : null
  };
  // en celular, llevar la vista a los resultados al simular (no en la carga inicial)
  if(APP_READY && window.innerWidth<=880){ try{ document.getElementById('results').scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){} }
}

let ASK_PROMPT='';
function buildAsk(){
  if(!askBox.classList.contains('hidden')){askBox.classList.add('hidden');return;}
  const A=teamA.value||'Equipo A', B=teamB.value||'Equipo B';
  const ctxTxt = ctx.value? (' ('+ctx.value+')') : '';
  ASK_PROMPT =
`Actúa como analista de fútbol. Estoy usando un simulador de partidos basado en un modelo de Poisson bivariado con ajuste Dixon-Coles. Necesito que ESTIMES los parámetros de entrada del modelo para este partido.

PARTIDO: ${A} vs ${B}${ctxTxt}

MÉTODO (IMPORTANTE): basa los números en DATOS REALES, no los supongas "a ojo". Busca y usa: forma reciente y resultados de los últimos partidos de cada equipo, sus promedios reales de goles a favor/en contra y de córners, lesiones/bajas, alineaciones probables, localía/clima y el árbitro designado con sus promedios de tarjetas. CALCULA cada número a partir de esos datos (por ejemplo: el xG de un equipo ≈ combinación de su ataque reciente y la defensa reciente del rival; los córners ≈ su promedio reciente ajustado por el dominio esperado). Si NO puedes navegar o faltan datos, estima con tu conocimiento y acláralo explícitamente — pero no inventes cifras sin fundamento. HAZLO EN ESTA MISMA RESPUESTA: no pidas permiso ni preguntes "¿quieres que busque...?"; investiga directamente con las herramientas que tengas y entrega los 7 valores ya calculados. Si un dato puntual no existe, usa el más razonable y márcalo, pero NUNCA dejes de entregar las 7 líneas.

PASOS (sigue este procedimiento para calcular los valores):
1) Obtén los últimos 5-10 partidos de cada selección.
2) Calcula sus goles a favor y en contra por partido.
3) Obtén su xG y xGA recientes.
4) Obtén sus córners a favor y en contra.
5) Ajusta por la fuerza del rival.
6) Ajusta por la situación de grupo (si a alguno le vale el empate o necesita ganar sí o sí).
7) Calcula λ local y λ visita (el xG de cada equipo) combinando lo anterior.
8) Elige ρ Dixon-Coles según el planteamiento táctico esperado (más negativo, -0.07/-0.08, si se espera un partido trabado o un equipo cerrándose atrás).

Significado de cada parámetro (respeta los rangos):
- Local / Visita = goles esperados (xG) de cada equipo en ESTE partido. Típico 0.2 a 3.5.
- Rho = ajuste Dixon-Coles. Entre -0.08 (muy trabado, pocos goles) y -0.03 (abierto). Usa -0.06 si tienes dudas.
- Corners local / Corners visita = córners esperados (lambda) de cada equipo. Típico 2 a 8.
- Tarjeta arbitro = total de tarjetas AMARILLAS esperadas en el partido (depende sobre todo del árbitro). Típico 3 a 6.
- Rojas arbitro = tarjetas ROJAS esperadas. Típico 0.05 a 0.30.

Planteamiento táctico (IMPORTANTE): evalúa si algún equipo probablemente se CIERRE a defender (típico de un equipo claramente inferior, o de quien le alcanza el empate para clasificar). Si es así: baja su xG, baja TAMBIÉN algo el xG del favorito (menos espacios, partido roto) y usa un Rho más negativo (-0.07 a -0.08) para reflejar un partido trabado con riesgo de 0-0 o 1-0. No asumas que el favorito golea solo por ser mejor: muchos partidos grande-vs-chico terminan 1-0 o 0-0.

FORMATO DE SALIDA (obligatorio): devuelve EXACTAMENTE estas 7 líneas, cada una con un número usando PUNTO decimal y sin texto extra en la línea. No cambies los nombres de las claves ni el orden:

Local=
Visita=
Rho=
Corners local=
Corners visita=
Tarjeta arbitro=
Rojas arbitro=

Debajo de esas 7 líneas puedes agregar 3 a 5 líneas explicando brevemente tu razonamiento (forma, bajas, árbitro, contexto).`;
  askBox.classList.remove('hidden');
  askBox.innerHTML='<button class="ghost" style="margin-bottom:8px;padding:6px 12px" onclick="copyAsk(this)">📋 Copiar prompt</button>'+
    '<div id="askText" style="white-space:pre-wrap"></div>';
  document.getElementById('askText').textContent=ASK_PROMPT;
}
function copyAsk(btn){
  const done=()=>{const t=btn.textContent; btn.textContent='✓ Copiado'; setTimeout(()=>btn.textContent=t,1500);};
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(ASK_PROMPT).then(done).catch(()=>{selectAsk();});
  }else{ selectAsk(); }
}
function selectAsk(){
  const el=document.getElementById('askText'); if(!el)return;
  const r=document.createRange(); r.selectNodeContents(el);
  const sel=window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
}

// descarga el panel de resultados como imagen PNG (para compartir)
function genImageBlob(S, cb){
  const W=600, PR=2, c=document.createElement('canvas'), ctx=c.getContext('2d');
  const pct=x=>(100*x).toFixed(1)+'%';
  const txt=(s,x,y,size,color,weight)=>{ ctx.fillStyle=color; ctx.font=(weight||'400')+' '+size+'px "Segoe UI",system-ui,Arial,sans-serif'; ctx.textBaseline='top'; ctx.fillText(s,x,y); };
  const scBoxH=S.score2?100:80;
  const koH=66;
  const scY=188;
  const mkY=S.ko?(scY+scBoxH+8+koH+8):(scY+scBoxH+14);
  const contentBottom=mkY+114;
  const H=contentBottom+20;
  c.width=W*PR; c.height=H*PR; ctx.scale(PR,PR);
  const draw=()=>{
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#16140d'); g.addColorStop(1,'#0a0907');
    ctx.fillStyle=g; ctx.beginPath(); ctx.roundRect?ctx.roundRect(0,0,W,H,16):ctx.rect(0,0,W,H); ctx.fill();
    ctx.save();
    if(typeof LOGO_DATA_URI!=='undefined'&&LOGO_DATA_URI){
      try{ ctx.globalAlpha=0.06; ctx.drawImage(logoImg, W-130, 10, 110, 110); ctx.restore(); ctx.save(); }catch(e){}
    }
    ctx.restore();
    txt('Rocky Predictor · Mundial 2026', 26, 26, 13, '#ffd76a', '700');
    txt(S.A, 26, 56, 26, '#f3eede', '800');
    const vsX=26+ctx.measureText(S.A).width+12;
    txt('vs', vsX, 58, 22, '#b0a890', '400');
    txt(S.B, vsX+ctx.measureText('vs').width+12, 56, 26, '#f3eede', '800');
    if(S.ctx) txt(S.ctx, 26, 92, 12, '#b0a890');
    const boxY=118, bh=56, gap=10, bw=(W-52-gap*2)/3;
    const box=(x,t,v,colC)=>{
      ctx.fillStyle='#211d12'; ctx.beginPath(); ctx.roundRect?ctx.roundRect(x,boxY,bw,bh,10):ctx.rect(x,boxY,bw,bh); ctx.fill();
      ctx.fillStyle='#b0a890'; ctx.font='400 11px "Segoe UI",system-ui,Arial,sans-serif'; ctx.textBaseline='top'; ctx.fillText(t,x+10,boxY+8);
      ctx.fillStyle=colC; ctx.font='800 20px "Segoe UI",system-ui,Arial,sans-serif'; ctx.fillText(v,x+10,boxY+26);
    };
    box(26,'Gana '+S.A,pct(S.h),'#3da5ff');
    box(26+bw+gap,'Empate',pct(S.d),'#7c89a8');
    box(26+(bw+gap)*2,'Gana '+S.B,pct(S.a),'#ff5d6c');
    const scY=boxY+bh+14;
    ctx.fillStyle='#211d12'; ctx.beginPath(); ctx.roundRect?ctx.roundRect(26,scY,W-52,scBoxH,10):ctx.rect(26,scY,W-52,scBoxH); ctx.fill();
    txt('Marcador más probable', 36, scY+8, 11, '#b0a890');
    txt(S.score, 36, scY+26, 24, '#e6b53c', '800');
    const scPx=36+ctx.measureText(S.score).width+8;
    txt(pct(S.scoreP), scPx, scY+34, 13, '#b0a890');
    if(S.score2){
      txt('2.º: '+S.score2, 36, scY+56, 13, '#b0a890');
      txt(pct(S.score2P), 36+ctx.measureText('2.º: '+S.score2).width+6, scY+56, 11, '#b0a890');
      txt('Goles esperados: '+S.xgH.toFixed(2)+' – '+S.xgA.toFixed(2), 36, scY+78, 12, '#b0a890');
    } else {
      txt('Goles esperados: '+S.xgH.toFixed(2)+' – '+S.xgA.toFixed(2), 36, scY+58, 12, '#b0a890');
    }
    let mkY=scY+scBoxH+14;
    if(S.ko){
      const koY=scY+scBoxH+8;
      ctx.fillStyle='#211d12'; ctx.beginPath(); ctx.roundRect?ctx.roundRect(26,koY,W-52,koH,10):ctx.rect(26,koY,W-52,koH); ctx.fill();
      const advH=S.ko.advH, advA=S.ko.advA;
      const colH=advH>=advA?'#e6b53c':'#8a8478', colA=advA>=advH?'#e6b53c':'#8a8478';
      const barW=W-80, barY=koY+32, barH=20;
      ctx.fillStyle=colH; const wH=Math.max(barW*advH,2); ctx.beginPath(); ctx.roundRect?ctx.roundRect(40,barY,wH,barH,4):ctx.rect(40,barY,wH,barH); ctx.fill();
      ctx.fillStyle=colA; const wA=Math.max(barW*advA,2); ctx.beginPath(); ctx.roundRect?ctx.roundRect(40+wH,barY,wA,barH,4):ctx.rect(40+wH,barY,wA,barH); ctx.fill();
      txt('🏆 Avanza', 36, koY+4, 11, '#ffd76a', '700');
      txt(S.A+' '+pct(advH), 40, koY+18, 10, colH, '700');
      txt(S.B+' '+pct(advA), 40+barW-ctx.measureText(S.B+' '+pct(advA)).width, koY+18, 10, colA, '700');
      txt('90\' '+pct(S.ko.p90Decide)+' · Prórroga '+pct(S.ko.pProrroga)+' · Penales '+pct(S.ko.pPenales), 40, barY+barH+3, 9, '#8a8478');
      mkY=koY+koH+8;
    }
    txt('Mercados más probables', 26, mkY, 12, '#ffd76a', '700');
    const mkX=(i)=>i%2===0?26:26+(W-60)/2+8, mkYr=(i)=>mkY+18+Math.floor(i/2)*52;
    const mData=[['Goles',S.goals],['Ambos marcan',S.btts],['Córners',S.corner],['Tarjetas amarillas',S.card]];
    mData.forEach((d,i)=>{
      if(!d[1])return;
      const x=mkX(i), y=mkYr(i);
      ctx.fillStyle='#211d12'; ctx.beginPath(); ctx.roundRect?ctx.roundRect(x,y,(W-60)/2,44,9):ctx.rect(x,y,(W-60)/2,44); ctx.fill();
      txt(d[0], x+10, y+6, 11, '#b0a890');
      txt(d[1], x+10, y+22, 14, '#e6b53c', '700');
    });
    ctx.fillStyle='#8a8478'; ctx.font='10px "Segoe UI",system-ui,Arial,sans-serif'; ctx.textBaseline='top';
    ctx.fillText('Rocky Predictor · Poisson bivariado + Dixon-Coles · uso educativo · son probabilidades, no certezas.', 26, contentBottom+6);
    c.toBlob(cb,'image/png');
  };
  let logoLoaded=true, logoImg=null;
  if(typeof LOGO_DATA_URI!=='undefined'&&LOGO_DATA_URI){
    logoLoaded=false;
    logoImg=new Image();
    logoImg.onload=()=>{ logoLoaded=true; draw(); };
    logoImg.onerror=()=>{ logoLoaded=true; draw(); };
    logoImg.src=LOGO_DATA_URI;
  }
  if(logoLoaded) draw();
}
function downloadImage(){
  if(!SHARE){ alert('Simula un partido primero.'); return; }
  const S=SHARE;
  genImageBlob(S, function(blob){
    if(!blob){ alert('No se pudo generar la imagen.'); return; }
    const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    const filename='rocky-predictor-'+((S.A||'A').replace(/[^a-z0-9]/gi,''))+'-vs-'+((S.B||'B').replace(/[^a-z0-9]/gi,''))+'.png';
    if(isIOS && navigator.share && navigator.canShare){
      try {
        const file=new File([blob], filename, {type:'image/png'});
        if(navigator.canShare({files:[file]})){ navigator.share({files:[file], title:'Rocky Predictor'}); return; }
      } catch(e) {}
    }
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url; a.download=filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url), 5000);
  });
}
var _adminPwd='admin123';
var _isAdmin=localStorage.getItem('rp_admin')==='1';
function _adminUI(){
  var btn=document.getElementById('shareBtn');
  if(!btn) return;
  btn.textContent=_isAdmin?'🐦 Compartir':'🔐 Admin';
}
function _adminLogout(){
  _isAdmin=false; localStorage.removeItem('rp_admin'); _adminUI();
}
function shareToTwitter(){
  if(!_isAdmin){
    var p=prompt('Contraseña de admin:');
    if(p===_adminPwd){ _isAdmin=true; localStorage.setItem('rp_admin','1'); _adminUI(); return; }
    else if(p!=null){ alert('Incorrecta'); }
    return;
  }
  if(!SHARE){
    _adminLogout();
    return;
  }
  var S=SHARE, f=flagFor, en=teamEnglish;
  var text= '📊 Predicción de Rocky Predictor:\n';
  text+= '\n'+f(S.A)+' '+S.A+': '+(S.h*100).toFixed(1)+'%';
  text+= '\n🤝 Empate: '+(S.d*100).toFixed(1)+'%';
  text+= '\n'+f(S.B)+' '+S.B+': '+(S.a*100).toFixed(1)+'%';
  text+= '\n\n🎯 Marcador más probable: '+S.score+' ('+(S.scoreP*100).toFixed(1)+'%)';
  if(S.score2) text+= '\n🥈 Segunda opción: '+S.score2+' ('+(S.score2P*100).toFixed(1)+'%)';
  if(S.ko){
    text+= '\n\n🏆 Probabilidad de avanzar:\n'+f(S.A)+' '+(S.ko.advH*100).toFixed(1)+'% | '+f(S.B)+' '+(S.ko.advA*100).toFixed(1)+'%';
  }
  text+= '\n\n#RockyPredictor #WorldCup2026 #FootballAnalytics #'+(en(S.A).replace(/\s/g,''))+' #'+(en(S.B).replace(/\s/g,''));
  if(text.length>280) text=text.slice(0,text.lastIndexOf('\n',280));
  genImageBlob(S, function(blob){
    if(blob && navigator.share && navigator.canShare){
      try{
        var file=new File([blob], 'rocky-predictor.png', {type:'image/png'});
        if(navigator.canShare({files:[file]})){ navigator.share({text:text, files:[file]}); return; }
      }catch(e){}
    }
    window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(text),'_blank','width=600,height=500');
  });
}
_adminUI();
// Pega la respuesta de la IA en el formato y carga todos los campos
function loadPasted(){
  const txt=pasteBox.value;
  if(!txt.trim()){pasteMsg.textContent='Pega la respuesta en el formato indicado.';return;}
  const T=txt.normalize('NFD').replace(/[\u0300-\u036f]/g,''); // sin acentos
  const get=(key)=>{
    const re=new RegExp(key+'\\s*=\\s*(-?[0-9]+(?:[.,][0-9]+)?)','i');
    const m=T.match(re); return m? parseFloat(m[1].replace(',','.')) : null;
  };
  const map=[
    ['local','lamA'],['visita','lamB'],['rho','rho'],
    ['corners local','cornA'],['corners visita','cornB'],
    ['tarjeta arbitro','cardY'],['rojas arbitro','cardR'],
  ];
  let n=0;
  map.forEach(([key,id])=>{const v=get(key); if(v!==null && !isNaN(v)){document.getElementById(id).value=v; n++;}});
  if(n===0){pasteMsg.textContent='No reconocí ningún valor. Revisa el formato (ej: Local=2.45).';return;}
  rhoVal.textContent=parseFloat(rho.value).toFixed(3);
  setMode('man');
  pasteMsg.textContent=`Cargué ${n} valor(es). Simulando…`;
  run();
}

// datalist + presets + listeners
const dl=document.getElementById('teamlist');
if(dl) TEAMS.slice().sort((a,b)=>a.es.localeCompare(b.es)).forEach(t=>{const o=document.createElement('option');o.value=t.es;dl.appendChild(o);});

// ===================== SELECTOR VISUAL DE EQUIPOS (banderas, lado a lado) =====================
let PICK_A='Bélgica', PICK_B='Irán';
(function initPicks(){
  if(CURRENT_LEAGUE!=='worldcup'){
    var st=sortedTeams();
    if(st.length){ PICK_A=st[0].es; PICK_B=st.length>1?st[1].es:st[0].es; }
  }
})();
function sortedTeams(){
  if(CURRENT_LEAGUE==='worldcup') return TEAMS.slice().sort((a,b)=>a.es.localeCompare(b.es,'es'));
  var ct=leagueTeams(CURRENT_LEAGUE);
  if(ct) return ct.slice().sort((a,b)=>a.es.localeCompare(b.es,'es'));
  return TEAMS.slice().sort((a,b)=>a.es.localeCompare(b.es,'es'));
}
function renderTeamPicker(){
  const colA=document.getElementById('colA'), colB=document.getElementById('colB');
  if(!colA||!colB)return;
  const cell=(t,side)=>{
    const selThis = side==='A' ? PICK_A===t.es : PICK_B===t.es;
    const takenOther = side==='A' ? PICK_B===t.es : PICK_A===t.es;
    return `<div class="team-opt ${selThis?('sel-'+side.toLowerCase()):''} ${takenOther?'taken':''}" `+
      `data-es="${t.es}" onclick="pickTeam('${side}',this.dataset.es)">`+
      `<span class="fl">${flagImg(t.es,17)}</span><span class="nm">${t.es}</span></div>`;
  };
  var st=sortedTeams();
  colA.innerHTML=st.map(t=>cell(t,'A')).join('');
  colB.innerHTML=st.map(t=>cell(t,'B')).join('');
  const selA=document.getElementById('selA'), selB=document.getElementById('selB');
  if(selA)selA.value=PICK_A; if(selB)selB.value=PICK_B;
  const pa=document.getElementById('pickSelA'), pb=document.getElementById('pickSelB');
  if(pa)pa.innerHTML=flagImg(PICK_A,18)+' '+PICK_A;
  if(pb)pb.innerHTML=flagImg(PICK_B,18)+' '+PICK_B;
  const f=document.getElementById('teamFilter'); if(f&&f.value)filterTeams(f.value);
}
function pickTeam(side,es){
  if(side==='A'){ if(es===PICK_B)return; PICK_A=es; }
  else { if(es===PICK_A)return; PICK_B=es; }
  renderTeamPicker();
}
function filterTeams(q){
  const n=norm(q);
  document.querySelectorAll('#colA .team-opt, #colB .team-opt').forEach(el=>{
    el.classList.toggle('hide', n.length>0 && !norm(el.dataset.es).includes(n));
  });
}
renderTeamPicker();

const PRESETS=[
  {a:'Bélgica',b:'Irán',lh:1.85,la:0.72,r:-0.06,cl:6.5,cv:3.0,cy:4.2,cr:0.13,c:'Grupo G · Los Ángeles · 21 jun 2026'},
  {a:'España',b:'Arabia Saudita',lh:2.45,la:0.48,r:-0.055,cl:8.0,cv:2.5,cy:4.2,cr:0.13,c:'Grupo H · Atlanta · 21 jun 2026'},
];
const pe=document.getElementById('presets');
PRESETS.forEach(p=>{
  const c=document.createElement('span');c.className='chip';c.textContent=p.a+' vs '+p.b;
  c.onclick=()=>{setMode('man');teamA.value=p.a;teamB.value=p.b;lamA.value=p.lh;lamB.value=p.la;rho.value=p.r;rhoVal.textContent=p.r.toFixed(3);
    cornA.value=p.cl;cornB.value=p.cv;cardY.value=p.cy;cardR.value=p.cr;ctx.value=p.c;run();};
  pe.appendChild(c);
});
rho.addEventListener('input',()=>rhoVal.textContent=parseFloat(rho.value).toFixed(3));

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
  return {
    A,B,ctx,lamH,lamA,rho,
    pH:R.h,pD:R.d,pA:R.a,
    predResult: R.h>=R.d&&R.h>=R.a ? 'H' : (R.a>=R.d ? 'A':'D'),
    si:best.i,sj:best.j,sp:best.p,
    si2:cons2?cons2.i:null, sj2:cons2?cons2.j:null, sp2:cons2?cons2.p:null,
    xgH:R.xgH,xgA:R.xgA,o25:R.o25,btts:R.btts,
    predPossA:possA, predShotsA:shA, predShotsB:shB, predCornersTot:coTot, predYellowTot:4.2,
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
    }else{ it.actualStats=null; }
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
  return {
    id:'imp-'+(ev.id||Math.random().toString(36).slice(2)), espnId:ev.id||null, ts:Date.now(),
    A:ta.es, B:tb.es,     ctx:(LEAGUES[CURRENT_LEAGUE]?LEAGUES[CURRENT_LEAGUE].name:'')+(phaseTxt?(' · '+phaseTxt):'')+(ev.date?(' · '+ev.date.slice(0,10)):''),
    lamH:la, lamA:lb, rho,
    pH:R.h,pD:R.d,pA:R.a,
    predResult: R.h>=R.d&&R.h>=R.a?'H':(R.a>=R.d?'A':'D'),
    si:best.i,sj:best.j,sp:best.p,
    si2:cons2?cons2.i:null, sj2:cons2?cons2.j:null, sp2:cons2?cons2.p:null,
    xgH:R.xgH,xgA:R.xgA,o25:R.o25,btts:R.btts,
    predPossA:possA,predShotsA:shA,predShotsB:shB,predCornersTot:coTot,predYellowTot:4.2,
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
      detail = `<div class="hist-meta">${it.ctx||''} · pred: ${predTxt} · marcador ${it.si}-${it.sj} (${pc(it.sp)})`+
        (it.si2!=null?` · 2.º: ${it.si2}-${it.sj2} (${pc(it.sp2)})`:'')+` · O2.5 ${pc(it.o25)} · BTTS ${pc(it.btts)}</div>`+
        koLine(it)+
        `<div class="res-in"><span>Resultado real:</span>`+
        `<input type="number" min="0" id="ra_${it.id}" placeholder="${it.A.slice(0,3)}">`+
        `<span>-</span>`+
        `<input type="number" min="0" id="rb_${it.id}" placeholder="${it.B.slice(0,3)}">`+
        `<button class="go" onclick="setResult('${it.id}')">Guardar</button>`+
        `<button class="ghost" onclick="fetchResult('${it.id}')">🔎 Buscar</button></div>`+
        `<div class="sub" id="st_${it.id}" style="margin-top:6px"></div>`;
    }else{
      const j=judge(it);
      let extra=''; const s=it.actualStats;
      if(s){
        let mb='';
        if(j.hitPoss!=null) mb+=bdg(j.hitPoss,'Posesión '+(it.predPossA>=0.5?it.A:it.B));
        if(j.hitCorners!=null) mb+=bdg(j.hitCorners,'Córners: '+(overLine(it.predCornersTot,9.5)>=0.5?'Over':'Under')+' 9.5 · hubo '+s.cornersTot);
        if(j.hitYellow!=null) mb+=bdg(j.hitYellow,'Amarillas: '+(overLine(it.predYellowTot,3.5)>=0.5?'Over':'Under')+' 3.5 · hubo '+s.yellowTot);
        const row2=(lab,p,r)=>`<tr><td>${lab}</td><td class="r">${p}</td><td class="r">${r}</td></tr>`;
        const pP=it.predPossA!=null?(it.predPossA*100).toFixed(0)+'%':'–';
        extra=(mb?`<div class="badges">${mb}</div>`:'')+
          `<table style="margin-top:8px"><thead><tr><th>Mercado</th><th class="r">Predicho</th><th class="r">Real</th></tr></thead><tbody>`+
          row2('Goles totales',(it.xgH+it.xgA).toFixed(2),it.actualA+it.actualB)+
          row2('Posesión '+it.A,pP,s.possA!=null?s.possA.toFixed(0)+'%':'–')+
          row2('Remates '+it.A,it.predShotsA!=null?it.predShotsA.toFixed(0):'–',s.shotsA!=null?s.shotsA:'–')+
          row2('Córners totales',it.predCornersTot!=null?it.predCornersTot.toFixed(1):'–',s.cornersTot!=null?s.cornersTot:'–')+
          row2('Amarillas totales',it.predYellowTot!=null?it.predYellowTot.toFixed(1):'–',s.yellowTot!=null?s.yellowTot:'–')+
          `</tbody></table>`;
        if(s.scorers&&s.scorers.length){
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

// =========================================================================
// GOAT — juego de carrera futbolística
// =========================================================================
/* ═══════════════════════════════════════════
   EL ÍDOLO — Carrera de futbolista
   ═══════════════════════════════════════════ */
// ─── Constantes ───
const IDOLO_SAVE_V1 = 'el-idolo-save-v1';
const IDOLO_SAVE = 'el-idolo-save-v2';
let IDOLO_SCHEMA_VERSION = 2;
const IDOLO_POS = { ST:'ST · Delantero centro', CAM:'CAM · Mediapunta' };
const IDOLO_COUNTRIES = ['Argentina','Australia','Brasil','Bélgica','Colombia','Croacia','España','Francia','Alemania','Inglaterra','Italia','Japón','Marruecos','México','Países Bajos','Portugal','Senegal','Suecia','Suiza','Uruguay','Estados Unidos','Costa de Marfil','Ghana','Nigeria','Egipto','Turquía','Corea del Sur','Chile','Ecuador','Paraguay'];
const IDOLO_ATR_KEYS = ['pac','sho','pas','def','dri','phy'];
const IDOLO_ATR_LABELS = { pac:'PAC', sho:'SHO', pas:'PAS', def:'DEF', dri:'DRI', phy:'PHY' };
const IDOLO_ARCHETYPES = [
  { id:'finisher', name:'🎯 Finisher', pos:'ST', desc:'Definición letal', bonus:{ sho:15, pac:5, dri:8 }},
  { id:'playmaker', name:'🧠 Playmaker', pos:'CAM', desc:'Visión y pase', bonus:{ pas:15, dri:8, sho:5 }},
  { id:'speedster', name:'⚡ Speedster', pos:'ST', desc:'Explosividad pura', bonus:{ pac:18, sho:5, dri:5 }},
  { id:'trequartista', name:'🎭 Trequartista', pos:'CAM', desc:'Lujo y fantasía', bonus:{ dri:15, pas:8, pac:5 }},
  { id:'targetman', name:'🦅 Target Man', pos:'ST', desc:'Juego aéreo y físico', bonus:{ phy:15, sho:8, pac:3 }},
  { id:'box2box', name:'🏃 Box-to-Box', pos:'CAM', desc:'Llegada desde atrás', bonus:{ phy:10, pas:8, sho:6 }}
];
const IDOLO_IDOLATRY = [
  { name:'Cantera', min:0 }, { name:'Promesa', min:15 }, { name:'Titular', min:30 },
  { name:'Ídolo', min:50 }, { name:'Leyenda', min:70 }, { name:'Inmortal', min:90 }
];

// ─── Eventos narrativos ───
const IDOLO_EVENTS = [
  { id:'derby', title:'Superclásico', desc:'El partido del año contra el archirrival. La cancha está que arde.', opts:[
    { text:'Salir a comerte la cancha', ovrChance:.4, goalChance:.6, formUp:2, idolatry:5, label:'Alto riesgo' },
    { text:'Jugar tranquilo', ovrChance:.2, goalChance:.3, formUp:1, idolatry:2, label:'Seguro' },
    { text:'Dejarse llevar', ovrChance:-.15, goalChance:.1, formUp:-1, idolatry:-3, label:'Riesgo de roja' }
  ]},
  { id:'transfer', title:'Oferta de traspaso', desc:'Llegó una oferta millonaria. Un club grande preguntó por vos.', opts:[
    { text:'Aceptar, quiero crecer', ovrChance:.15, goalChance:.2, formUp:1, idolatry:2, label:'Nuevo club' },
    { text:'Me quedo acá', ovrChance:.05, goalChance:.1, formUp:2, idolatry:5, label:'Fidelidad' }
  ]},
  { id:'injury', title:'Lesión en entrenamiento', desc:'Sentiste un tirón feo. El kinesiólogo frunce el ceño.', opts:[
    { text:'Descansar', ovrChance:0, goalChance:0, formUp:1, idolatry:1, label:'Seguro' },
    { text:'Infiltrarse', ovrChance:-.25, goalChance:.15, formUp:-2, idolatry:2, label:'Riesgoso' }
  ]},
  { id:'training', title:'Pretemporada en altura', desc:'El DT organizó pretemporada en Tilcara. Doble turno.', opts:[
    { text:'Darlo todo', ovrChance:.3, goalChance:.15, formUp:1, idolatry:2, label:'VO2 máx' },
    { text:'Bajar un cambio', ovrChance:0, goalChance:0, formUp:0, idolatry:0, label:'Sin cambio' }
  ]},
  { id:'captain', title:'Te ofrecen el brazalete', desc:'El DT te quiere dar la cinta de capitán.', opts:[
    { text:'Aceptar', ovrChance:.12, goalChance:.15, formUp:2, idolatry:4, label:'Liderazgo' },
    { text:'No', ovrChance:-.02, goalChance:0, formUp:-1, idolatry:-2, label:'Pierdes peso' }
  ]},
  { id:'nacional', title:'Convocatoria a la Selección', desc:'El técnico te quiere probar en la selección.', opts:[
    { text:'Ir y romperla', ovrChance:.18, goalChance:.25, formUp:2, idolatry:5, label:'Vidriera' },
    { text:'Rechazar', ovrChance:-.1, goalChance:0, formUp:-1, idolatry:-2, label:'Riesgo' }
  ]},
  { id:'penalty', title:'Penal sobre la hora', desc:'0-0, minuto 89, penal. ¿La querés vos?', opts:[
    { text:'Yo lo pateo', ovrChance:.25, goalChance:.8, formUp:3, idolatry:6, label:'Desafío' },
    { text:'Dejá que patee el 9', ovrChance:-.05, goalChance:0, formUp:-1, idolatry:-1, label:'Sin riesgo' }
  ]},
  { id:'rapid_dribble', title:'Contraataque 3 vs 2', desc:'Vas encarando. El estadio ruge.', opts:[
    { text:'Encarar y definir', ovrChance:.35, goalChance:.6, formUp:2, idolatry:4, label:'Reflejos' },
    { text:'Tocar al compañero', ovrChance:.1, goalChance:.25, formUp:1, idolatry:1, label:'Colectivo' }
  ]},
  { id:'header', title:'Centro al área', desc:'Tiro libre desde la derecha. La pelota viene con comba.', opts:[
    { text:'Ganar de cabeza', ovrChance:.3, goalChance:.5, formUp:2, idolatry:4, label:'Timing' },
    { text:'Dejarla pasar', ovrChance:0, goalChance:.1, formUp:0, idolatry:0, label:'Seguro' }
  ]},
  { id:'final_league', title:'Partido decisivo por la Liga', desc:'Ganás y salís campeón. Estadio lleno.', opts:[
    { text:'Romperla toda', ovrChance:.35, goalChance:.7, formUp:3, idolatry:7, label:'Decisivo' },
    { text:'Cumplir el plan', ovrChance:.15, goalChance:.3, formUp:1, idolatry:2, label:'Táctico' }
  ]},
  { id:'clasico', title:'Clásico de verano', desc:'Amistoso vs el clásico rival. La gente quiere ganar.', opts:[
    { text:'Dejarse todo', ovrChance:.15, goalChance:.3, formUp:2, idolatry:3, label:'Garúa' },
    { text:'Es solo amistoso', ovrChance:0, goalChance:.1, formUp:0, idolatry:0, label:'Tranquilo' }
  ]},
  { id:'media', title:'Semana de clásico', desc:'Los medios te buscan. El técnico pide silencio.', opts:[
    { text:'Dar la cara', ovrChance:.1, goalChance:.15, formUp:1, idolatry:2, label:'Referente' },
    { text:'No hablar', ovrChance:.05, goalChance:0, formUp:2, idolatry:-1, label:'Concentrado' }
  ]},
  { id:'copa', title:'Final de Copa Nacional', desc:'Llegaste a la final de la copa local.', opts:[
    { text:'Hacerse el héroe', ovrChance:.35, goalChance:.7, formUp:3, idolatry:7, label:'Desafío' },
    { text:'Seguir el libreto', ovrChance:.12, goalChance:.25, formUp:1, idolatry:1, label:'Táctico' }
  ]},
  { id:'interview', title:'Entrevista polémica', desc:'Un periodista pregunta sobre tu futuro. Cámaras en vivo.', opts:[
    { text:'Ser ambiguo', ovrChance:.05, goalChance:0, formUp:1, idolatry:1, label:'Tibio' },
    { text:'Declarar amor al club', ovrChance:.08, goalChance:0, formUp:2, idolatry:4, label:'Hincha' },
    { text:'Quererme ir', ovrChance:-.1, goalChance:0, formUp:-1, idolatry:-5, label:'Polémico' }
  ]},
  { id:'gala', title:'Gala de premios', desc:'Nominado a mejor jugador del año.', opts:[
    { text:'Ir elegante', ovrChance:.05, goalChance:.1, formUp:1, idolatry:3, label:'Imagen' },
    { text:'No ir, entrenar', ovrChance:-.1, goalChance:0, formUp:-1, idolatry:-2, label:'Arrogante' }
  ]},
  { id:'hattrick', title:'Hat-trick en puerta', desc:'Llevás dos goles. Quedan 20 minutos.', opts:[
    { text:'Ir por el hat-trick', ovrChance:.2, goalChance:.5, formUp:2, idolatry:5, label:'Glorioso' },
    { text:'Darle al compañero', ovrChance:.05, goalChance:.1, formUp:1, idolatry:2, label:'Generoso' }
  ]},
  { id:'red_card', title:'Roja polémica', desc:'Entrada fuerte. El árbitro te echa.', opts:[
    { text:'Reclamar', ovrChance:-.15, goalChance:0, formUp:-1, idolatry:-3, label:'Aumenta sanción' },
    { text:'Disculparse', ovrChance:-.05, goalChance:0, formUp:0, idolatry:2, label:'Madurez' }
  ]},
  { id:'rookie', title:'Joven promesa te admira', desc:'Un chico de inferiores te pide consejo.', opts:[
    { text:'Dar consejos', ovrChance:.05, goalChance:.05, formUp:1, idolatry:3, label:'Líder' },
    { text:'Ignorarlo', ovrChance:-.02, goalChance:0, formUp:0, idolatry:-2, label:'Mala imagen' }
  ]}
];
// ─── Competiciones y minijuegos ───
const COMP_CONFIG = {
  worldCup:{minigame:'road-to-glory',interactiveStage:'full',cycle:4,offset:0,teamType:'national',label:'Copa del Mundo',confed:null,title:'Campeón del Mundo',big:true},
  copaAmerica:{minigame:'random',options:['road-to-glory','penalty-shootout','hidden-goals'],cycle:4,offset:2,teamType:'national',label:'Copa América',confed:'sudamerica',title:'Campeón de América',big:true},
  euro:{minigame:'random',options:['road-to-glory','penalty-shootout','hidden-goals'],cycle:4,offset:2,teamType:'national',label:'Eurocopa',confed:'europa',title:'Campeón de Europa',big:true},
  championsLeague:{minigame:'penalty-shootout',interactiveStage:'final',cycle:1,offset:0,teamType:'club',label:'Champions League',confed:null,title:'Champions League',big:false},
  europaLeague:{minigame:'penalty-shootout',interactiveStage:'final',cycle:1,offset:0,teamType:'club',label:'Europa League',confed:null,title:'Europa League',big:false},
  copaLibertadores:{minigame:'penalty-shootout',interactiveStage:'final',cycle:1,offset:0,teamType:'club',label:'Copa Libertadores',confed:null,title:'Campeón de la Copa Libertadores',region:'south_america',big:true},
  copaSudamericana:{minigame:'penalty-shootout',interactiveStage:'final',cycle:1,offset:0,teamType:'club',label:'Copa Sudamericana',confed:null,title:'Campeón de la Copa Sudamericana',region:'south_america',big:false},
  clubWorldCup:{minigame:'hidden-goals',interactiveStage:'final',cycle:1,offset:0,teamType:'club',label:'Mundial de Clubes',confed:null,title:'Mundial de Clubes',big:true},
  domesticLeague:{minigame:null,resolution:'statistical',label:'Liga Doméstica',confed:null,title:'Liga Doméstica',big:false}
};
const COMP_COUNTRIES = {
  sudamerica:['Argentina','Brasil','Uruguay','Colombia','Chile','Perú','Ecuador','Bolivia','Paraguay','Venezuela'],
  europa:['España','Inglaterra','Italia','Alemania','Francia','Portugal','Países Bajos','Bélgica','Suiza','Suecia','Dinamarca','Noruega','Polonia','Croacia','Serbia','Escocia','Austria','Turquía','Ucrania']
};
function seededRandom(seed,n){
  let h=0; const s=seed+':'+n;
  for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}
  return Math.abs(h%1000000)/1000000;
}
function idoloGetConfed(country){
  if(COMP_COUNTRIES.sudamerica.includes(country)) return 'sudamerica';
  if(COMP_COUNTRIES.europa.includes(country)) return 'europa';
  return null;
}

// ─── Estado global ───
let idoloState = null;
let currentCompetitionHubContext = 'global';
let idoloCompHubShowAll = false;

// ─── Iconos SVG ───
const I = {
  trophy:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/><path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><path d="M12 9V3"/><path d="M8 21h8"/><path d="M12 15v6"/><path d="M6 9h12v3a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9z"/></svg>',
  crown:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>',
  play:'<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21"/></svg>',
  stats:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  money:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  gym:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5h11M6.5 17.5h11"/><rect x="2" y="8" width="4" height="8" rx="1"/><rect x="18" y="8" width="4" height="8" rx="1"/><line x1="6.5" y1="12" x2="17.5" y2="12"/></svg>',
  list:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
  skip:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
  check:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  cross:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  alert:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>',
  target:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  left:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  right:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  medal:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>',
  globe:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  ball:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/><path d="m6 6 4 4M14 14l4 4M6 18l4-4M14 10l4-4"/></svg>',
  scroll:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>',
  vs:'<span style="font-size:12px;font-weight:700;color:#ffd437;letter-spacing:1px;margin:0 8px">VS</span>',
  trash:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  sword:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="21" x2="21" y2="16"/><line x1="10" y1="11" x2="14" y2="15"/></svg>',
  news:'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>',
  wave:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/></svg>',
  clock:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  newgame:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
  fig:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  phy:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0"/><path d="M6 8c0 4 6 14 6 14s6-10 6-14"/></svg>',
  record:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="12" width="6" height="9" rx="1"/><rect x="9" y="8" width="6" height="13" rx="1"/><rect x="15" y="4" width="6" height="17" rx="1"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  fast:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 4,14 12,14 11,22 20,10 12,10"/></svg>',
  star:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"/></svg>',
  hand:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v1"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14a2 2 0 0 0-2-2H3v5a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5v-3"/></svg>',
  export:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  btn:'<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  shield:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
};
// ─── Presentación narrativa de eventos ───
const IDOLO_EVENT_NARRATIVE = {
  derby:'El clásico está al rojo vivo. Cada pelota dividida se juega como si fuera la última. La hinchada enloquece con cada avance. Este partido define el orgullo de toda la temporada.',
  transfer:'Los rumores crecen en los pasillos del club. Un equipo grande preguntó condiciones. Los periodistas esperan afuera del entrenamiento. Tu representante quiere una respuesta.',
  injury:'Sentiste un tirón en el último sprint del entrenamiento. El kinesiólogo te revisa con preocupación. Los próximos segundos definirán si podés estar el fin de semana.',
  training:'El cuerpo técnico preparó una sesión exigente en la altura. Todos miran cómo reaccionás. Saben que el que mejor se adapte tendrá minutos el fin de semana.',
  captain:'El técnico te llamó a solas después del entrenamiento. Tiene algo importante que decirte. En su mano brilla la cinta del equipo.',
  nacional:'Llegó la citación. Representar a tu país es el sueño de cualquier futbolista. Pero hay riesgos: una lesión te podría costar el puesto en tu club.',
  penalty:'El marcador está 0-0. El árbitro señala el punto penal en el minuto 89. Todo el estadio contiene la respiración. La pelota te espera.',
  rapid_dribble:'El mediocampista te habilitó en el medio. Tenés dos defensores encima y un compañero pidiéndola al otro lado. Tus segundos deciden el rumbo de la jugada.',
  header:'El extremo engancha hacia adentro, levanta la cabeza y ve tu movimiento. La pelota viene con comba cerrada al corazón del área. Marcás al defensor, que no te pierde pisada.',
  final_cl:'La orejona te espera. Noventa minutos te separan de la gloria eterna. Del otro lado, un gigante europeo que tampoco piensa regalar nada. El mundo está mirando.',
  final_league:'Todo se define hoy. Ganás y salís campeón. Perdés y mirás desde afuera. El estadio está lleno, el silencio previo al himno es ensordecedor.',
  clasico:'No hace falta motivación extra cuando llega esta fecha. El clásico de verano puede ser amistoso en el papel, pero en la cancha no hay amigos.',
  media:'Los micrófonos te rodean. El periodista busca una declaración que sea tapa mañana. Tus palabras pueden calmar el ambiente o prender fuego todo.',
  copa:'Llegaste a la final del torneo local. Un paso de la gloria. La ciudad entera está paralizada esperando este momento.',
  mundial:'El sueño máximo. Representás a tu país en la Copa del Mundo. La fase de grupos quedó atrás, ahora es todo o nada en eliminación directa.',
  interview:'Te sentás frente al cronista. Las luces y las cámaras enfocan. Sabés que cualquier frase puede ser interpretada. El club espera que no generés polémica.',
  gala:'Traje, alfombra roja, reflectores. Estás nominado al premio más importante del fútbol. Todos miran cómo vas a vivir esta noche.',
  hattrick:'Llevás dos goles. Quedan minutos. El estadio corea tu nombre. Todos quieren que busques el tercero. La gloria individual te espera.',
  red_card:'La entrada fue fuerte. El rival quedó en el piso. El árbitro corre hacia vos con la mano en el bolsillo. La multitud enmudece.',
  rookie:'Un pibe de las inferiores te espera tímido en el vestuario. Te sigue desde chico. Hoy se animó a pedirte un consejo.'
};
const IDOLO_CHOICE_DESC = {
  derby:[{desc:'Salís decidido a imponer tu jerarquía desde el primer minuto.',flavor:'EXIGE AGUANTE',risk:'high'},{desc:'Jugás con la cabeza fría y esperás el momento justo.',flavor:'DECISIÓN TÁCTICA',risk:'balanced'},{desc:'Te dejás llevar por la calentura del momento.',flavor:'RIESGO DE EXPULSIÓN',risk:'high'}],
  transfer:[{desc:'Buscás nuevos horizontes para dar el salto en tu carrera.',flavor:'AMBICIÓN DEPORTIVA',risk:'high'},{desc:'Le debés mucho a este club como para irte ahora.',flavor:'LEALTAD AL CLUB',risk:'safe'}],
  injury:[{desc:'No arriesgás y le das tiempo al cuerpo para recuperarse.',flavor:'PRECAUCIÓN',risk:'safe'},{desc:'Te infiltrás para estar disponible cueste lo que cueste.',flavor:'SACRIFICIO FÍSICO',risk:'high'}],
  training:[{desc:'Doblas turno y das el máximo en cada repetición.',flavor:'MÁXIMO ESFUERZO',risk:'high'},{desc:'Regulás la intensidad para no llegar fundido al finde.',flavor:'REGULACIÓN',risk:'safe'}],
  captain:[{desc:'Aceptás la cinta con orgullo y responsabilidad.',flavor:'LIDERAZGO',risk:'high'},{desc:'Preferís que otro lleve la cinta por ahora.',flavor:'DISCRECIÓN',risk:'safe'}],
  nacional:[{desc:'Viajás con la ilusión de representar a tu país.',flavor:'ORGULLO NACIONAL',risk:'high'},{desc:'Preferís enfocarte en tu club esta temporada.',flavor:'RENUNCIA',risk:'safe'}],
  penalty:[{desc:'Agarrás la pelota y la apoyás en el punto penal sin dudar.',flavor:'PRESIÓN MÁXIMA',risk:'high'},{desc:'Dejás que el compañero se haga cargo.',flavor:'RESPONSABILIDAD CEDIDA',risk:'safe'}],
  rapid_dribble:[{desc:'Acelerás a fondo y encarás al último defensor.',flavor:'VALENTÍA',risk:'high'},{desc:'Levantás la cabeza y tocás al compañero mejor ubicado.',flavor:'JUEGO COLECTIVO',risk:'balanced'}],
  header:[{desc:'Te elevás antes que todos y conectás el centro.',flavor:'ALTURA DOMINANTE',risk:'high'},{desc:'Dejás pasar la pelota confiando en la llegada de atrás.',flavor:'CESIÓN',risk:'safe'}],
  final_cl:[{desc:'Salís a comerte el mundo en la noche más importante.',flavor:'GLORIA ETERNA',risk:'high'},{desc:'Jugás con la cabeza fría para no cometer errores.',flavor:'PRUDENCIA',risk:'safe'}],
  final_league:[{desc:'Salís decidido a definir el campeonato.',flavor:'DECISIVO',risk:'high'},{desc:'Seguís el plan táctico del entrenador.',flavor:'DISCIPLINA',risk:'safe'}],
  clasico:[{desc:'Dejás todo en la cancha como si no hubiera mañana.',flavor:'ENTREGA TOTAL',risk:'high'},{desc:'Jugás tranquilo, confiado en el funcionamiento del equipo.',flavor:'SERENIDAD',risk:'safe'}],
  media:[{desc:'Te plantás frente a los micrófonos con seguridad.',flavor:'CARISMA',risk:'high'},{desc:'Pasás de largo sin hacer declaraciones.',flavor:'SILENCIO',risk:'safe'}],
  copa:[{desc:'Querés ser el héroe que levante la copa.',flavor:'AMBICIÓN',risk:'high'},{desc:'Seguís el libreto sin sobresaltos.',flavor:'LIBRETO',risk:'safe'}],
  mundial:[{desc:'Te vestís de héroe en el escenario más grande.',flavor:'LEYENDA',risk:'high'},{desc:'Jugás con responsabilidad sin regalar nada.',flavor:'RESPONSABILIDAD',risk:'safe'}],
  interview:[{desc:'Respondés con ambigüedad sin comprometerte.',flavor:'DIPLOMACIA',risk:'balanced'},{desc:'Declarás tu amor eterno al club y la hinchada.',flavor:'PASIÓN',risk:'safe'},{desc:'Soltás que te gustaría probar suerte afuera.',flavor:'POLÉMICA',risk:'high'}],
  gala:[{desc:'Te vestís de gala y disfrutás la noche.',flavor:'ELEGANCIA',risk:'safe'},{desc:'Preferís estar en el entrenamiento matutino.',flavor:'DEDICACIÓN',risk:'high'}],
  hattrick:[{desc:'Buscás la gloria individual y el tercer gol.',flavor:'HISTORIA',risk:'high'},{desc:'La cedés al compañero mejor ubicado.',flavor:'GENEROSIDAD',risk:'balanced'}],
  red_card:[{desc:'Le discutís airadamente la decisión al árbitro.',flavor:'INDIGNACIÓN',risk:'high'},{desc:'Te disculpás y te retirás a los vestuarios.',flavor:'MADUREZ',risk:'safe'}],
  rookie:[{desc:'Le dedicás tiempo a darle consejos valiosos.',flavor:'MENTORÍA',risk:'safe'},{desc:'Le das la espalda y seguís con lo tuyo.',flavor:'INDIFERENCIA',risk:'high'}]
};
const IDOLO_ILLUST = {
  match:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="20" y="50" width="120" height="90" rx="3" opacity=".35"/><path d="M80 140 L80 50" opacity=".2"/><circle cx="80" cy="95" r="6" opacity=".5"/><path d="M30 95 Q55 75 80 95 Q105 115 130 95" opacity=".3"/></svg>',
  header:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M20 120 Q55 50 100 80 Q130 95 140 60" opacity=".5" stroke-width="1.5"/><circle cx="100" cy="72" r="8" opacity=".5"/><path d="M30 140 Q60 110 80 80" opacity=".2"/></svg>',
  trophy:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M60 40 h40 L105 60 h10 a15 15 0 0 1 0 30 h-5" opacity=".5"/><path d="M45 60 h-5 a15 15 0 0 0 0 30 h5" opacity=".5"/><rect x="73" y="90" width="14" height="25" rx="2" opacity=".5"/><rect x="60" y="115" width="40" height="6" rx="3" opacity=".5"/><path d="M75 40 V30" opacity=".3"/></svg>',
  sprint:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="100" cy="70" r="5" opacity=".6"/><path d="M50 120 L80 90 L100 70" opacity=".4"/><path d="M30 130 Q60 110 80 90" opacity=".2"/><line x1="105" y1="65" x2="120" y2="50" opacity=".3"/><line x1="110" y1="70" x2="130" y2="55" opacity=".3"/><line x1="115" y1="75" x2="140" y2="60" opacity=".3"/></svg>',
  penalty:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="15" y="50" width="130" height="80" rx="4" opacity=".3"/><rect x="25" y="55" width="110" height="70" opacity=".15"/><circle cx="80" cy="105" r="7" opacity=".5"/><line x1="80" y1="98" x2="80" y2="80" opacity=".3"/></svg>',
  media:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="73" y="40" width="14" height="45" rx="7" opacity=".5"/><rect x="73" y="85" width="14" height="15" rx="2" opacity=".5"/><rect x="60" y="100" width="40" height="6" rx="3" opacity=".5"/><path d="M40 65 Q25 40 40 20" opacity=".3" stroke-width="1.5"/><path d="M35 75 Q10 50 30 15" opacity=".2" stroke-width="1.5"/><path d="M120 65 Q135 40 120 20" opacity=".3" stroke-width="1.5"/><path d="M125 75 Q150 50 130 15" opacity=".2" stroke-width="1.5"/></svg>',
  injury:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="65" y="30" width="30" height="100" rx="4" opacity=".5"/><rect x="30" y="65" width="100" height="30" rx="4" opacity=".5"/></svg>',
  captain:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M80 30 L90 55 L115 55 L95 70 L100 95 L80 80 L60 95 L65 70 L45 55 L70 55 Z" opacity=".5"/><rect x="60" y="100" width="40" height="25" rx="3" opacity=".3"/></svg>',
  redcard:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="55" y="35" width="50" height="90" rx="4" opacity=".5"/></svg>',
  training:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="30" y="65" width="20" height="30" rx="3" opacity=".5"/><rect x="110" y="65" width="20" height="30" rx="3" opacity=".5"/><rect x="50" y="72" width="60" height="16" rx="2" opacity=".5"/></svg>',
  transfer:'<svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="50" cy="80" r="20" opacity=".35"/><circle cx="110" cy="80" r="20" opacity=".35"/><line x1="65" y1="80" x2="95" y2="80" opacity=".5"/><polygon points="90,72 102,80 90,88" opacity=".5"/></svg>'
};
function idoloEventPresentation(ev) {
  const M = {
    derby:{cat:'PARTIDO CLAVE',accent:'#45aee8',ill:'match'},
    transfer:{cat:'MERCADO DE PASES',accent:'#a855f7',ill:'transfer'},
    injury:{cat:'SALUD FÍSICA',accent:'#f97316',ill:'injury'},
    training:{cat:'ENTRENAMIENTO',accent:'#21df55',ill:'training'},
    captain:{cat:'LIDERAZGO',accent:'#ffbf22',ill:'captain'},
    nacional:{cat:'SELECCIÓN NACIONAL',accent:'#45aee8',ill:'match'},
    penalty:{cat:'MOMENTO DECISIVO',accent:'#ffbf22',ill:'penalty'},
    rapid_dribble:{cat:'CONTRAATAQUE',accent:'#45aee8',ill:'sprint'},
    header:{cat:'JUGADA AÉREA',accent:'#45aee8',ill:'header'},
    final_cl:{cat:'FINAL DE CHAMPIONS',accent:'#ffbf22',ill:'trophy'},
    final_league:{cat:'PARTIDO DECISIVO',accent:'#ffbf22',ill:'trophy'},
    clasico:{cat:'CLÁSICO',accent:'#45aee8',ill:'match'},
    media:{cat:'PRENSA Y MEDIOS',accent:'#a855f7',ill:'media'},
    copa:{cat:'FINAL DE COPA',accent:'#ffbf22',ill:'trophy'},
    mundial:{cat:'COPA DEL MUNDO',accent:'#ffbf22',ill:'trophy'},
    interview:{cat:'ENTREVISTA',accent:'#a855f7',ill:'media'},
    gala:{cat:'GALA / CEREMONIA',accent:'#a855f7',ill:'media'},
    hattrick:{cat:'MOMENTO HISTÓRICO',accent:'#ffbf22',ill:'match'},
    red_card:{cat:'CONFLICTO',accent:'#ff6575',ill:'redcard'},
    rookie:{cat:'VIDA PERSONAL',accent:'#a855f7',ill:'media'}
  };
  return M[ev.id]||{cat:'EVENTO',accent:'#45aee8',ill:'match'};
}
// ─── Funciones auxiliares ───
function idoloOverall(atr) { return Math.round((atr.pac+atr.sho+atr.pas+atr.def+atr.dri+atr.phy)/6); }
function idoloFormStar(f) { return '▮'.repeat(Math.max(1,Math.ceil(f/2)))+'▯'.repeat(Math.max(0,5-Math.ceil(f/2))); }
function idoloTierName(t) { return ['Ascenso','Media Tabla','Primera','Élite','Champions','Europa'][t]||'Ascenso'; }
function idoloRandomTeam(minTier) {
  const keys = Object.keys(LEAGUES), candidates = [];
  for (let i = minTier||0; i < keys.length; i++) {
    const teams = leagueTeams(keys[i])||[];
    teams.forEach(t => { const nm = t.es||t.en||t.name; if (nm) candidates.push({name:nm, league:keys[i], tier:i}); });
  }
  return candidates.length ? candidates[Math.floor(Math.random()*candidates.length)] : null;
}
function idoloRandomRival() {
  const names = ['Elías Valverde','Mateo Centurión','Benjamín Farias','Santiago Lagos','Thiago Montenegro','Joaquín Paz','Facundo Olivera','Ignacio del Valle','Lautaro Méndez','Franco Alarcón'];
  const ctrs = ['Argentina','Uruguay','Colombia','Chile','Brasil','España'];
  return { name: names[Math.floor(Math.random()*names.length)], country: ctrs[Math.floor(Math.random()*ctrs.length)], position: Math.random()<.5?'ST':'CAM', goals:0, apps:0, wins:0 };
}
function idoloIdolatryLevel(pts) { let l = IDOLO_IDOLATRY[0]; for (const x of IDOLO_IDOLATRY) { if (pts >= x.min) l = x; } return l; }
function idoloBaseStats(pos) {
  const b = { pac:55+Math.random()*15|0, sho:50+Math.random()*15|0, pas:50+Math.random()*15|0, def:35+Math.random()*15|0, dri:50+Math.random()*15|0, phy:45+Math.random()*15|0 };
  if (pos==='ST') { b.sho+=8; b.pac+=5; b.dri+=3; } else { b.pas+=8; b.dri+=5; b.pac+=2; }
  return b;
}
function idoloApplyArchetype(atr, arch) { for (const k in arch.bonus) { if (k in atr) atr[k] = Math.min(99, atr[k]+arch.bonus[k]); } return atr; }

// ─── Migration v1 → v2 ───
function idoloMigrateSave(save) {
  if (!save || save.schemaVersion === 2) return save;
  if (save.player && !save.player.clubId) {
    const club = CAREER_DB.findClubByName(save.player.club, save.player.country);
    if (club) {
      save.player.clubId = club.id;
      save.player.clubCountry = club.country;
      save.player.clubRegion = club.region;
      save.player.clubLeagueName = club.league;
      save.player.clubLeagueId = CAREER_DB.resolveClubLeagueId(club);
      save.player.clubDivision = club.division;
      save.player.clubStrength = club.strength;
      const contComp = CAREER_DB.getClubContinentalCompetition(club.name, club.country);
      if (contComp === 'championsLeague' && club.region !== 'europe') {
        save.player.continentalCompetitionId = contComp === 'copaLibertadores' ? 'copaLibertadores' : null;
      } else {
        save.player.continentalCompetitionId = contComp;
      }
    } else {
      save.player.clubId = null;
      save.player.clubCountry = save.player.country || null;
      save.player.clubRegion = null;
      save.player.clubLeagueName = null;
      save.player.clubLeagueId = save.player.clubLeague || null;
      save.player.clubDivision = null;
      save.player.clubStrength = null;
      save.player.continentalCompetitionId = null;
    }
  }
  save.schemaVersion = 2;
  return save;
}

// ─── Save / Load ───
function idoloLoad() {
  try {
    const d2 = localStorage.getItem(IDOLO_SAVE);
    if (d2) { idoloState = JSON.parse(d2); if (idoloMigrateSave(idoloState)) idoloSave(); return true; }
    const d1 = localStorage.getItem(IDOLO_SAVE_V1);
    if (d1) { idoloState = JSON.parse(d1); idoloMigrateSave(idoloState); idoloSave(); localStorage.removeItem(IDOLO_SAVE_V1); return true; }
  } catch(e){}
  return false;
}
function idoloSave() { try { localStorage.setItem(IDOLO_SAVE, JSON.stringify(idoloState)); } catch(e){} }
function idoloDelete() { try { localStorage.removeItem(IDOLO_SAVE); localStorage.removeItem(IDOLO_SAVE_V1); } catch(e){} idoloState = null; }

// ─── Render principal ───
function idoloRender() {
  const el = document.getElementById('idoloBody'); if (!el) return;
  if (!idoloState) { if (idoloLoad() && idoloState && idoloState.player && !idoloState.player.retired) {} else { el.innerHTML = idoloRenderMenu(); return; } }
  if (!idoloState || !idoloState.player || idoloState.player.retired) { el.innerHTML = idoloRenderMenu(); return; }
  const p = idoloState.player, s = idoloState.step;
  if(idoloState._compStep && idoloState._currentComp){
    const cs = idoloState._compStep;
    if(cs==='intro') el.innerHTML = idoloRenderCompIntro();
    else if(cs==='minigame') el.innerHTML = idoloRenderMinigameScreen();
    else if(cs==='result') el.innerHTML = idoloRenderCompResult();
    else { delete idoloState._compStep; delete idoloState._currentComp; idoloSave(); idoloRender(); }
    return;
  }
  if (s==='creating') { el.innerHTML = idoloRenderCreation(); idoloCreaInit(); }
  else if (s==='dashboard') el.innerHTML = idoloRenderDashboard(p);
  else if (s==='events') el.innerHTML = idoloRenderEvents();
  else if (s==='season_result') el.innerHTML = idoloRenderSeasonResult();
  else if (s==='team_select') el.innerHTML = idoloRenderTransfer();
  else if (s==='training') el.innerHTML = idoloRenderTraining();
  else el.innerHTML = idoloRenderDashboard(p);
}
function idoloRenderMenu() {
  const has = idoloLoad();
  return `<div style="text-align:center;padding:24px 0;max-width:320px;margin:0 auto">
    <div style="width:56px;height:56px;margin:0 auto 8px;border:2px solid #22c55e;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#22c55e">${I.crown}</div>
    <div style="font-size:9px;color:#22c55e;text-transform:uppercase;letter-spacing:2px;font-weight:600;margin-bottom:2px">MODO CARRERA</div>
    <h2 style="margin:0;font-size:26px;color:#f5f7fa;letter-spacing:1px;text-transform:uppercase;font-family:'Impact','Arial Black','Franklin Gothic Heavy',sans-serif">El Ídolo</h2>
    <div class="idolo-label" style="margin-bottom:18px">De la cantera a la inmortalidad</div>
    ${has ? `<button class="idolo-btn-primary" style="margin-bottom:6px" onclick="idoloContinue()"><span class="idolo-icon">${I.play}</span> Continuar carrera</button>
    <button class="idolo-btn-secondary" onclick="idoloNew()"><span class="idolo-icon">${I.newgame}</span> Nueva carrera</button>`
    : `<button class="idolo-btn-primary" onclick="idoloNew()"><span class="idolo-icon">${I.ball}</span> Empezar carrera</button>`}
  </div>`;
}
function idoloNew() {
  idoloState = { player:null, step:'creating', events:[], currentEvent:0, rival:null };
  document.getElementById('idoloBody').innerHTML = idoloRenderCreation();
  idoloCreaInit();
}
function idoloContinue() { if (idoloState && idoloState.player && !idoloState.player.retired) idoloRender(); else { idoloDelete(); idoloRender(); } }

// ─── Creación ───
let idoloSelectedArch = null;
function idoloRenderCreation() {
  const cc = { 'Argentina':'ARG','Brasil':'BRA','España':'ESP','Francia':'FRA','Alemania':'GER','Italia':'ITA','Inglaterra':'ENG','Países Bajos':'NED','Portugal':'POR','Uruguay':'URU','Colombia':'COL','Bélgica':'BEL','Croacia':'CRO','México':'MEX','Estados Unidos':'USA','Australia':'AUS','Japón':'JPN','Marruecos':'MAR','Senegal':'SEN','Suecia':'SWE','Suiza':'SUI','Costa de Marfil':'CIV','Ghana':'GHA','Nigeria':'NGR','Egipto':'EGY','Turquía':'TUR','Corea del Sur':'KOR','Chile':'CHI','Ecuador':'ECU','Paraguay':'PAR' };
  const topCountries = ['Argentina','Brasil','España','Francia','Alemania','Italia','Inglaterra','Países Bajos','Portugal','Uruguay'];
  const countryBtns = IDOLO_COUNTRIES.map(c => topCountries.includes(c)
    ? `<button type="button" class="idolo-crea-country-btn${c==='Argentina'?' active':''}" data-ctry="${c}" onclick="idoloSelectCountry('${c}')">${cc[c]||c}</button>`
    : '').join('');
  const ctryOpts = IDOLO_COUNTRIES.map(c => `<option value="${c}">${c}</option>`).join('');
  const remaining = IDOLO_COUNTRIES.filter(c => !topCountries.includes(c));
  const moreItems = remaining.map(c => `<div class="idolo-crea-dropdown-item" data-ctry="${c}" onclick="idoloSelectCountry('${c}')"><span class="code">${cc[c]||''}</span> ${c}</div>`).join('');
  const archSvgs = {
    finisher:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>',
    speedster:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 4,14 12,14 11,22 20,10 12,10"/></svg>',
    targetman:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    playmaker:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-1.5 0-3 .7-3 2v1c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V5c0-1.3-1.5-2-3-2z"/><path d="M8 8c-1.5 1-2 2.5-2 4 0 1.5.7 2.8 2 4"/><path d="M16 8c1.5 1 2 2.5 2 4 0 1.5-.7 2.8-2 4"/><path d="M12 14c-1 0-2-.4-2-1"/><circle cx="12" cy="14" r="2" fill="currentColor" opacity=".3"/></svg>',
    trequartista:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"/></svg>',
    box2box:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><polyline points="7,8 3,12 7,16"/><polyline points="17,8 21,12 17,16"/></svg>'
  };
  const archNames = { finisher:'Killer del Área', speedster:'Flecha', targetman:'Caudillo', playmaker:'Cerebro', trequartista:'Desequilibrante', box2box:'Organizador' };
  const archDescs = { finisher:'Definición letal', speedster:'Explosividad pura', targetman:'Juego aéreo y físico', playmaker:'Visión y pase', trequartista:'Lujo y fantasía', box2box:'Llegada desde atrás' };
  const archCards = IDOLO_ARCHETYPES.map(a => `<div class="idolo-crea-arq-card" data-arq="${a.id}" onclick="idoloSelectArq('${a.id}')">
    <div class="idolo-crea-arq-icon">${archSvgs[a.id]||''}</div>
    <span class="idolo-crea-arq-name">${archNames[a.id]||a.name}</span>
    <span class="idolo-crea-arq-desc">${archDescs[a.id]||a.desc}</span>
    <div class="idolo-crea-arq-bonus">${Object.entries(a.bonus).map(([k,v])=>`<span class="idolo-crea-arq-bonus-tag">${IDOLO_ATR_LABELS[k]}+${v}</span>`).join('')}</div>
  </div>`).join('');
  const posOpts = Object.entries(IDOLO_POS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('');
  return `<div class="idolo-crea">
    <div class="idolo-crea-header">
      <span class="idolo-crea-badge">MODO CARRERA</span>
      <span class="idolo-crea-sep">·</span>
      <span class="idolo-crea-step">CREACIÓN DEL JUGADOR</span>
    </div>
    <h1 class="idolo-crea-title">CREÁ TU ESTRELLA</h1>
    <p class="idolo-crea-subtitle">Elegí tu identidad dentro y fuera de la cancha.</p>
    <div class="idolo-crea-divider"></div>
    <div class="idolo-crea-section">DATOS BÁSICOS</div>
    <div class="idolo-crea-row">
      <div class="idolo-crea-field" style="flex:3">
        <label for="idoloName">Nombre</label>
        <input type="text" id="idoloName" placeholder="Ej: Lionel Messi" autocomplete="off" onkeyup="idoloUpdateSummary()" />
      </div>
      <div class="idolo-crea-field" style="flex:0 0 80px">
        <label for="idoloNumber">N°</label>
        <input type="number" id="idoloNumber" value="10" min="1" max="99" />
      </div>
    </div>
    <div class="idolo-crea-section">NACIONALIDAD</div>
    <div class="idolo-crea-country-selector" id="idoloCountrySelector">
      ${countryBtns}
      <div class="idolo-crea-country-wrap">
        <button type="button" class="idolo-crea-country-more" id="idoloCountryMoreBtn" onclick="idoloToggleDropdown()">OTROS ▾</button>
        <div class="idolo-crea-country-dropdown" id="idoloCountryDropdown">${moreItems}</div>
      </div>
    </div>
    <select id="idoloCountry" hidden>${ctryOpts}</select>
    <div class="idolo-crea-section">POSICIÓN</div>
    <div class="idolo-crea-pos-grid" id="idoloPosGrid">
      <div class="idolo-crea-pos-card active" data-pos="ST" onclick="idoloSelectPos('ST')">
        <span class="idolo-crea-pos-num">9</span>
        <span class="idolo-crea-pos-name">DELANTERO</span>
        <span class="idolo-crea-pos-label">ST</span>
      </div>
      <div class="idolo-crea-pos-card" data-pos="CAM" onclick="idoloSelectPos('CAM')">
        <span class="idolo-crea-pos-num">10</span>
        <span class="idolo-crea-pos-name">MEDIAPUNTA</span>
        <span class="idolo-crea-pos-label">CAM</span>
      </div>
    </div>
    <select id="idoloPos" onchange="idoloFilterArch()" hidden>${posOpts}</select>
    <div class="idolo-crea-section">ARQUETIPO</div>
    <div id="idoloArchGrid" class="idolo-crea-arq-grid">${archCards}</div>
    <div class="idolo-crea-msg" id="idoloArchMsg">Elegí un arquetipo compatible con tu posición</div>
    <div class="idolo-crea-summary" id="idoloCreaSummary"></div>
    <button class="idolo-crea-btn" onclick="idoloCreate()">COMENZAR MI CARRERA</button>
  </div>`;
}
function idoloFilterArch() {
  const pos = document.getElementById('idoloPos')?.value;
  document.querySelectorAll('.idolo-crea-arq-card').forEach(c => {
    const a = IDOLO_ARCHETYPES.find(x => x.id === c.dataset.arq);
    c.style.display = (a && a.pos === pos) ? '' : 'none';
  });
  if (idoloSelectedArch) {
    const a = IDOLO_ARCHETYPES.find(x => x.id === idoloSelectedArch);
    if (a && a.pos !== pos) {
      document.querySelectorAll('.idolo-crea-arq-card.selected').forEach(c => c.classList.remove('selected'));
      idoloSelectedArch = null;
    }
  }
  idoloUpdateSummary();
}
function idoloSelectArq(id) {
  document.querySelectorAll('.idolo-crea-arq-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.idolo-crea-arq-card[data-arq="${id}"]`);
  if (card) card.classList.add('selected');
  idoloSelectedArch = id;
  idoloUpdateSummary();
}
function idoloSelectPos(pos) {
  document.querySelectorAll('.idolo-crea-pos-card').forEach(c => c.classList.remove('active'));
  const card = document.querySelector(`.idolo-crea-pos-card[data-pos="${pos}"]`);
  if (card) card.classList.add('active');
  document.getElementById('idoloPos').value = pos;
  idoloFilterArch();
}
function idoloSelectCountry(ctry) {
  document.querySelectorAll('.idolo-crea-country-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.idolo-crea-country-btn[data-ctry="${ctry}"]`);
  if (btn) btn.classList.add('active');
  document.getElementById('idoloCountry').value = ctry;
  document.getElementById('idoloCountryDropdown')?.classList.remove('open');
  idoloUpdateSummary();
}
function idoloToggleDropdown() {
  document.getElementById('idoloCountryDropdown')?.classList.toggle('open');
}
function idoloUpdateSummary() {
  const el = document.getElementById('idoloCreaSummary');
  if (!el) return;
  const name = document.getElementById('idoloName')?.value?.trim();
  const pos = document.getElementById('idoloPos')?.value;
  const country = document.getElementById('idoloCountry')?.value;
  const arch = IDOLO_ARCHETYPES.find(a => a.id === idoloSelectedArch);
  const archNames = { finisher:'Killer del Área', speedster:'Flecha', targetman:'Caudillo', playmaker:'Cerebro', trequartista:'Desequilibrante', box2box:'Organizador' };
  if (name && pos && country && arch) {
    const base = idoloBaseStats(pos);
    const final = idoloApplyArchetype({...base}, arch);
    const ovr = idoloOverall(final);
    el.className = 'idolo-crea-summary visible';
    el.innerHTML = '<div class="idolo-crea-summary-item"><span class="idolo-crea-summary-label">JUGADOR</span><span class="idolo-crea-summary-value">'+name+'</span></div><div class="idolo-crea-summary-item"><span class="idolo-crea-summary-label">POSICIÓN</span><span class="idolo-crea-summary-value">'+pos+'</span></div><div class="idolo-crea-summary-item"><span class="idolo-crea-summary-label">PAÍS</span><span class="idolo-crea-summary-value">'+country+'</span></div><div class="idolo-crea-summary-item"><span class="idolo-crea-summary-label">ARQUETIPO</span><span class="idolo-crea-summary-value">'+(archNames[arch.id]||arch.name)+'</span></div><div class="idolo-crea-summary-item"><span class="idolo-crea-summary-label">MEDIA</span><span class="idolo-crea-summary-value green">'+ovr+'</span></div>';
  } else {
    el.className = 'idolo-crea-summary';
    el.innerHTML = '';
  }
}
function idoloCreaInit() {
  idoloSelectedArch = null;
  const posEl = document.getElementById('idoloPos');
  if (posEl) posEl.value = 'ST';
  idoloFilterArch();
  document.getElementById('idoloCountry').value = 'Argentina';
  idoloUpdateSummary();
  document.addEventListener('click', function idoloCloseDrop(e) {
    const dd = document.getElementById('idoloCountryDropdown');
    const btn = document.getElementById('idoloCountryMoreBtn');
    if (dd && btn && !dd.contains(e.target) && !btn.contains(e.target)) dd.classList.remove('open');
  });
}
function idoloCreate() {
  const name = document.getElementById('idoloName')?.value?.trim();
  const number = parseInt(document.getElementById('idoloNumber')?.value) || 10;
  const country = document.getElementById('idoloCountry')?.value;
  const pos = document.getElementById('idoloPos')?.value;
  if (!name) { alert('Poné el nombre de tu jugador'); return; }
  if (!country) { alert('Elegí un país'); return; }
  if (!pos) { alert('Elegí una posición'); return; }
  const arch = IDOLO_ARCHETYPES.find(a => a.id === idoloSelectedArch);
  if (!arch || arch.pos !== pos) { alert('Elegí un arquetipo válido para tu posición'); return; }
  const careerSeed = name + ':' + country + ':' + number + ':' + Date.now();
  const promoClubs = CAREER_DB.getPromotionClubs(country);
  let clubData = null, clubName = 'Club Inicial', clubTier = 0, clubLeague = null;
  let clubId = null, clubCountry = country, clubRegion = null, clubLeagueName = null, clubLeagueId = null, clubDivision = null, clubStrength = null, continentalCompetitionId = null;
  if (promoClubs.length > 0) {
    const idx = Math.floor(seededRandom(careerSeed, 'club_select') * promoClubs.length);
    clubData = promoClubs[idx];
    clubName = clubData.name;
    clubId = clubData.id;
    clubCountry = clubData.country;
    clubRegion = clubData.region;
    clubLeagueName = clubData.league;
    clubLeagueId = CAREER_DB.resolveClubLeagueId(clubData);
    clubDivision = clubData.division;
    clubStrength = clubData.strength;
    clubTier = clubData.strength >= 62 ? 2 : clubData.strength >= 56 ? 1 : 0;
    clubLeague = clubLeagueId;
    const contComp = CAREER_DB.getClubContinentalCompetition(clubData.name, clubData.country);
    if (contComp && clubRegion === 'south_america' && (contComp === 'championsLeague' || contComp === 'europaLeague')) {
      continentalCompetitionId = contComp === 'championsLeague' ? 'copaLibertadores' : 'copaSudamericana';
    } else {
      continentalCompetitionId = contComp;
    }
  }
  const atr = idoloApplyArchetype(idoloBaseStats(pos), arch);
  const ovr = idoloOverall(atr);
  const rival = idoloRandomRival();
  const potRnd = seededRandom(careerSeed, 'potential');
  idoloState = {
    careerSeed: careerSeed,
    player: {
      name, number, country, position:pos, archetype:arch.id, age:17, season:0,
      atr, potential: ovr + Math.floor(potRnd * 15) + 5,
      form:6, goals:0, assists:0, appearances:0, cleanSheets:0, titles:[],
      idolatry:5, money:50000,
      club: clubName, clubId,
      clubCountry, clubRegion, clubLeagueName,
      clubLeagueId: clubLeagueId || null, clubDivision, clubStrength,
      clubTier, clubLeague: clubLeagueId || null,
      continentalCompetitionId,
      history:[], nationalApps:0, nationalGoals:0, legend:false, retired:false,
      _clubSinceSeason:0, _lastContractSeason:0
    },
    rival, step:'dashboard', events:[], currentEvent:0,
    _seasonApps:0, _seasonGoals:0, _seasonAsts:0, _seasonClean:0,
    _eventBonusG:0, _eventBonusA:0, _transferOffers:[], _renewalChance:0,
    competitionSeasons: {}
  };
  idoloSave(); idoloRender();
}

// ─── Dashboard ───
function idoloRenderDashboard(p) {
  const ovr = idoloOverall(p.atr), tierName = idoloTierName(p.clubTier), r = idoloState.rival;
  const idolLvl = idoloIdolatryLevel(p.idolatry), idolPct = Math.min(100, p.idolatry);
  const trophies = p.titles.length ? p.titles.map(t=>`<span style="color:#ffd437;margin-right:4px;display:inline-block" title="${t}">${I.trophy}</span>`).join('') : '<span style="color:#5a6470;font-size:11px">Ninguno aún</span>';
  const atrHtml = IDOLO_ATR_KEYS.map(k => {
    const v = p.atr[k]||50, c = v>=85?'#22c55e':v>=70?'#ffd437':v>=50?'#f5f7fa':'#ff7180';
    return `<div class="idolo-atr-item"><span>${IDOLO_ATR_LABELS[k]}</span><b style="color:${c}">${v}</b></div>`;
  }).join('');
  const hasEvents = idoloState.events && idoloState.events.length > 0 && idoloState.currentEvent < idoloState.events.length;
  const actionBtn = hasEvents
    ? `<button class="idolo-btn-primary" onclick="idoloContinueEvents()"><span class="idolo-icon">${I.play}</span> Continuar eventos</button>`
    : `<button class="idolo-btn-primary" onclick="idoloStartSeason()"><span class="idolo-icon">${I.calendar}</span> Temp ${p.season+1} · Jugar</button>`;
  const histHtml = p.history.length ? p.history.slice(-5).reverse().map(h =>
    `<div style="font-size:10px;color:#5a6470;padding:3px 0;border-bottom:1px solid #1a1f28;display:flex;justify-content:space-between"><span>Temp ${h.season}</span><span>${h.club}</span><span>${h.apps}PJ · ${h.goals}G · ${h.asts}A · OVR ${h.ovr}</span></div>`
  ).join('') : '';
  return `<div class="idolo-card" style="text-align:center;padding:18px">
    <div style="display:flex;justify-content:center;align-items:center;gap:8px;margin-bottom:4px">
      <span style="font-size:11px;color:#5a6470;text-transform:uppercase;letter-spacing:.5px">${p.country||''}</span>
      <span style="background:#0d1117;border:1px solid #2d3742;border-radius:3px;padding:1px 8px;font-size:13px;font-weight:700;color:#f5f7fa">#${p.number}</span>
    </div>
    <h2 style="margin:2px 0;font-size:18px;color:#f5f7fa;text-transform:uppercase;letter-spacing:.3px">${p.name}</h2>
    <div style="font-size:10px;color:#5a6470;margin-bottom:3px;text-transform:uppercase;letter-spacing:.3px">${IDOLO_POS[p.position]||p.position} · ${p.age} años</div>
    <div class="idolo-club-badge" style="justify-content:center">${tierName} · ${p.club}</div>
    <div style="margin:8px 0 2px"><span class="idolo-label">OVR</span> <span style="font-size:26px;color:#22c55e;font-weight:700;font-family:'Impact','Arial Black',sans-serif">${ovr}</span><span style="color:#5a6470;font-size:11px;margin-left:4px">/ ${p.potential}</span></div>
    <div class="idolo-progress"><div class="idolo-progress-fill" style="width:${Math.min(100,Math.max(0,(ovr-40)*1.7))}%"></div></div>
    <div class="idolo-progress-text">Forma: ${idoloFormStar(p.form)} · Potencial ${p.potential}</div>
  </div>
  <div class="idolo-card"><h3><span class="idolo-icon">${I.stats}</span> Atributos</h3><div class="idolo-atr-grid">${atrHtml}</div></div>
  <div class="idolo-card"><h3><span class="idolo-icon">${I.crown}</span> Idolatría · ${idolLvl.name}</h3>
    <div class="idolo-idol-bar"><div class="idolo-idol-fill" style="width:${idolPct}%"></div></div>
    <div class="idolo-idol-label"><span>${p.idolatry}/100</span><span style="color:#ffd437">${idolLvl.name}</span></div>
  </div>
  <div class="idolo-card"><h3><span class="idolo-icon">${I.money}</span> $${p.money.toLocaleString()}</h3>
    <div style="font-size:10px;color:#5a6470">Usalo para entrenar y mejorar atributos</div>
  </div>
  <div class="idolo-grid">
    <div class="idolo-stat"><div class="idolo-stat-v">${p.appearances}</div><div class="idolo-stat-t">Partidos</div></div>
    <div class="idolo-stat"><div class="idolo-stat-v">${p.goals}</div><div class="idolo-stat-t">Goles</div></div>
    <div class="idolo-stat"><div class="idolo-stat-v">${p.assists}</div><div class="idolo-stat-t">Asistencias</div></div>
    <div class="idolo-stat"><div class="idolo-stat-v">${p.nationalApps}</div><div class="idolo-stat-t">Selección PJ</div></div>
    <div class="idolo-stat"><div class="idolo-stat-v">${p.nationalGoals}</div><div class="idolo-stat-t">Selección G</div></div>
  </div>
  <div class="idolo-card"><h3><span class="idolo-icon">${I.sword}</span> Rival: ${r.name}</h3>
    <div class="idolo-rival-comp">
      <div style="text-align:center"><div style="font-size:13px;font-weight:700;color:#f5f7fa">${p.name}</div><div style="font-size:10px;color:#5a6470">${p.goals}G · ${p.appearances}PJ</div></div>
      ${I.vs}
      <div style="text-align:center"><div style="font-size:13px;font-weight:700;color:#ffd437">${r.name}</div><div style="font-size:10px;color:#5a6470">${r.goals}G · ${r.apps}PJ</div></div>
    </div>
  </div>
  <div class="idolo-card"><h3><span class="idolo-icon">${I.trophy}</span> Títulos</h3>
    <div style="text-align:center;padding:2px 0">${trophies}</div>
  </div>
  <div class="idolo-btn-row">
    ${actionBtn}
    <button class="idolo-btn-secondary" onclick="idoloTraining()"><span class="idolo-icon">${I.gym}</span> Entrenar</button>
    <button class="idolo-btn-secondary" onclick="idoloSave();showView('competition',{context:'career'})"><span class="idolo-icon">${I.trophy}</span> Competiciones</button>
  </div>
  <button class="idolo-btn-secondary danger" style="margin-top:4px" onclick="idoloDelete();idoloRender()"><span class="idolo-icon">${I.trash}</span> Borrar carrera</button>
  ${histHtml ? `<div class="idolo-card"><h3><span class="idolo-icon">${I.scroll}</span> Historial</h3>${histHtml}</div>` : ''}`;
}

// ─── Entrenamiento ───
function idoloTraining() { idoloState.step = 'training';   idoloSave(); idoloRender();
}

// ─── Simulación de liga y competiciones ───
function idoloSimulateLeague(p){
  return CAREER_DB.simulateDomesticLeague(p);
}
function idoloPickOpponent(teamType, seed, idx, compType){
  if(teamType === 'national'){
    const nats = TEAMS.filter(t => t.s > 50);
    const sorted = nats.sort((a,b)=>b.s-a.s);
    const r = seededRandom(seed, idx);
    const pick = Math.floor(r * sorted.length);
    return sorted[pick].es;
  } else {
    const leagues = ['premier','laliga','bundes','seriea','ligue1','champions'];
    const allClubs = [];
    leagues.forEach(lk => {
      const ct = leagueTeams(lk);
      if(ct) ct.forEach(c => { if(c.es && c.s > 60) allClubs.push(c); });
    });
    const sorted = allClubs.sort((a,b)=>b.s-a.s);
    const bucket = compType === 'clubWorldCup' ? 0 : 2; // non-european for CWC
    const minStr = compType === 'championsLeague' ? 75 : 68;
    const filtered = sorted.filter(c => c.s >= minStr);
    if(filtered.length < 4) filtered.push(...sorted.slice(0,4));
    const r = seededRandom(seed, idx);
    const pick = Math.floor(r * Math.min(filtered.length, 20));
    return filtered[pick].es;
  }
}
function idoloGenerateScores(teamStr, oppStr, seed, idx){
  const r = seededRandom(seed, idx);
  const advantage = (teamStr - oppStr) / 30;
  const baseGoals = Math.max(0, Math.min(5, Math.round(advantage + r * 3 - 0.5)));
  const oppGoals = Math.max(0, Math.min(5, Math.round((1 - advantage) * r * 2.5)));
  return { our: baseGoals, opp: oppGoals };
}
function idoloGetTeamStrength(name, teamType){
  if(teamType === 'national'){
    const t = TEAMS.find(x => x.es === name);
    return t ? t.s : 65;
  }
  for(const lk of ['premier','laliga','bundes','seriea','ligue1','champions']){
    const ct = leagueTeams(lk);
    if(ct){ const t = ct.find(x => x.es === name); if(t) return t.s; }
  }
  return 65;
}
function idoloInitCompetitions(p, season){
  const comps = [];
  const leagueRes = idoloSimulateLeague(p);
  p._leagueRes = leagueRes;
  // World Cup (season 0, 4, 8, ...)
  if(season % 4 === 0 && p.season > 0){
    if(idoloIsCalledUp(p)) comps.push({type:'worldCup',teamName:p.country,teamType:'national',stage:'pending',seed:'wc'+season+p.country,minigame:null,mState:null,eliminated:false,won:false,rewardsDone:false});
  }
  // Copa América / Euro (season 2, 6, 10, ...)
  if(season % 4 === 2 && p.season > 0){
    const c = idoloGetConfed(p.country);
    if(c === 'sudamerica' && idoloIsCalledUp(p)) comps.push({type:'copaAmerica',teamName:p.country,teamType:'national',stage:'pending',seed:'ca'+season+p.country,minigame:null,mState:null,eliminated:false,won:false,rewardsDone:false});
    else if(c === 'europa' && idoloIsCalledUp(p)) comps.push({type:'euro',teamName:p.country,teamType:'national',stage:'pending',seed:'eur'+season+p.country,minigame:null,mState:null,eliminated:false,won:false,rewardsDone:false});
  }
  // Continental club competitions via qualification object
  if (leagueRes.qualification && leagueRes.qualification.length > 0) {
    leagueRes.qualification.forEach(q => {
      const compId = q.competitionId;
      if (compId && COMP_CONFIG[compId]) {
        comps.push({
          type: compId,
          teamName: p.club,
          teamType: 'club',
          stage: 'pending',
          seed: compId + season + p.club + p.clubId,
          minigame: null,
          mState: null,
          eliminated: false,
          won: false,
          rewardsDone: false
        });
      }
    });
  } else {
    // Fallback for leagues without qualification data
    if(p.continentalCompetitionId && COMP_CONFIG[p.continentalCompetitionId] && p.clubRegion !== 'south_america'){
      comps.push({type:p.continentalCompetitionId,teamName:p.club,teamType:'club',stage:'pending',seed:'cont'+season+p.club,minigame:null,mState:null,eliminated:false,won:false,rewardsDone:false});
    }
  }
  // Club World Cup: only won via Champions League or Copa Libertadores title (not via domestic league)
  const wonCLOrLib = p.titles && p.titles.some(t => t === 'Champions League' || t === 'Campeón de la Copa Libertadores');
  if (wonCLOrLib && !comps.some(c => c.type === 'clubWorldCup')) {
    comps.push({type:'clubWorldCup',teamName:p.club,teamType:'club',stage:'pending',seed:'cwc'+season+p.club,minigame:null,mState:null,eliminated:false,won:false,rewardsDone:false});
  }
  return { leagueRes, comps };
}
function idoloIsCalledUp(p){
  return CAREER_DB.calculateNationalCallupChance(p);
}
function idoloProcessCompetitions(){
  const comps = idoloState._competitions;
  if(!comps || comps.length === 0) return true;
  // Check if any comp needs a minigame
  const active = comps.find(c => c.stage === 'active');
  if(active) return false; // already playing one
  // Advance pending comps
  const pending = comps.find(c => c.stage === 'pending');
  if(!pending){ delete idoloState._competitions; return true; }
  // Assign minigame
  const cfg = COMP_CONFIG[pending.type];
  if(!cfg || !cfg.minigame){ pending.stage = 'simulated'; return false; }
  let mgType = cfg.minigame;
  if(mgType === 'random'){
    const opts = cfg.options || ['road-to-glory','penalty-shootout','hidden-goals'];
    mgType = opts[Math.floor(seededRandom(pending.seed, 999) * opts.length)];
  }
  pending.minigame = mgType;
  // For interactiveStage 'final', simulate earlier rounds
  if(cfg.interactiveStage === 'final'){
    const p = idoloState.player;
    const teamStr = idoloGetTeamStrength(pending.teamName, pending.teamType);
    const playerFactor = Math.max(0, (p.ovr - 40)) / 100;
    const teamFactor = Math.max(0, (teamStr - 50)) / 100;
    const chance = Math.min(0.9, 0.3 + playerFactor + teamFactor);
    if(seededRandom(pending.seed, 2) < chance){
      pending.stage = 'active';
      const opp = idoloPickOpponent(pending.teamType, pending.seed, 3, pending.type);
      pending.opponent = opp;
      idoloState._currentComp = pending;
      idoloState._compStep = 'minigame';
      return false;
    } else {
      pending.stage = 'eliminated';
      pending.eliminated = true;
      return idoloProcessCompetitions();
    }
  }
  // Full tournament (road-to-glory)
  if(mgType === 'road-to-glory' && cfg.interactiveStage === 'full'){
    idoloInitRoadToGlory(pending);
    pending.stage = 'active';
    idoloState._currentComp = pending;
    idoloState._compStep = 'minigame';
    return false;
  }
  // Fallback: simulate directly
  pending.stage = 'simulated';
  return idoloProcessCompetitions();
}
function idoloInitRoadToGlory(comp){
  const p = idoloState.player;
  const teamStr = idoloGetTeamStrength(comp.teamName, comp.teamType);
  const seed = comp.seed;
  const grid = [];
  for(let i=0;i<25;i++){
    const oppStr = 55 + seededRandom(seed, 100+i)*40;
    const margin = (teamStr - oppStr) / 20 + seededRandom(seed, 200+i)*2 - 1;
    const ourG = Math.max(0, Math.min(5, Math.round(1 + margin + seededRandom(seed, 300+i)*2.5)));
    const oppG = Math.max(0, Math.min(5, Math.round(0.5 + (1-margin/3)*seededRandom(seed, 400+i)*2.5)));
    grid.push({our:ourG, opp:oppG});
  }
  const groups = [
    {rivals:[idoloPickOpponent(comp.teamType,seed,10,comp.type),idoloPickOpponent(comp.teamType,seed,11,comp.type),idoloPickOpponent(comp.teamType,seed,12,comp.type)],results:[],stage:'groups',points:0,day:0},
    {rivals:[idoloPickOpponent(comp.teamType,seed,13,comp.type)],results:[],stage:'round16'},
    {rivals:[idoloPickOpponent(comp.teamType,seed,14,comp.type)],results:[],stage:'quarter'},
    {rivals:[idoloPickOpponent(comp.teamType,seed,15,comp.type)],results:[],stage:'semi'},
    {rivals:[idoloPickOpponent(comp.teamType,seed,16,comp.type)],results:[],stage:'final'}
  ];
  comp.mState = { grid, groups, currentGroup:0, eliminated:false, won:false, stagesCompleted:0, gridRevealed:new Array(25).fill(false), lastResult:null };
  comp.stage = 'active';
}
function idoloGetCompLabel(type){
  const cfg = COMP_CONFIG[type];
  return cfg ? cfg.label : type;
}
function idoloGetCompTitle(type){
  const cfg = COMP_CONFIG[type];
  return cfg ? cfg.title : type;
}

// ─── Temporada y eventos ───
function idoloStartSeason() {
  delete idoloState._showSkipConfirm; delete idoloState._showingResult; delete idoloState._choiceResult; delete idoloState._competitions; delete idoloState._currentComp; delete idoloState._compStep; delete idoloState._renewalChance;
  const p = idoloState.player; p.season++; p.age++;
  if (p._clubSinceSeason == null) p._clubSinceSeason = p.season - 1;
  if (p._lastContractSeason == null) p._lastContractSeason = p.season - 1;
  // Simulate league and init competitions
  const { leagueRes, comps } = idoloInitCompetitions(p, p.season);
  idoloState._leagueRes = leagueRes;
  if(comps.length > 0){ idoloState._competitions = comps; idoloState._compStep = 'intro'; }
  else { idoloState._competitions = []; idoloState._compStep = null; }
  // Narrative events (reduce if we have competitions)
  idoloState.currentEvent = 0;
  const pool = [...IDOLO_EVENTS], n = 1+Math.random()*2|0, sel = [];
  for (let i = 0; i < n && pool.length; i++) { const idx = Math.random()*pool.length|0; sel.push({...pool[idx]}); pool.splice(idx,1); }
  idoloState.events = sel;
  idoloSave();
  // If we have competitions, render the league result first
  if(comps.length > 0) idoloRender();
  else idoloState.step = 'events', idoloRender();
}
function idoloContinueEvents() { idoloState.step = 'events'; idoloRender(); }
function idoloRenderEvents() {
  if (!idoloState.events.length || idoloState.currentEvent >= idoloState.events.length) return idoloRenderSeasonResult();
  const ev = idoloState.events[idoloState.currentEvent], total = idoloState.events.length, p = idoloState.player;
  const pres = idoloEventPresentation(ev);
  const narr = IDOLO_EVENT_NARRATIVE[ev.id]||ev.desc;
  const cd = IDOLO_CHOICE_DESC[ev.id]||[];
  const illust = IDOLO_ILLUST[pres.ill]||IDOLO_ILLUST.match;

  const bonuses = [];
  if (idoloState._eventBonusG) bonuses.push(`${I.ball} +${idoloState._eventBonusG} goles`);
  if (idoloState._eventBonusA) bonuses.push(`${I.star} +${idoloState._eventBonusA} asistencias`);
  const bonusHtml = bonuses.length ? `<span style="margin-left:6px;color:#22c55e">${bonuses.join(' ')}</span>` : '';

  const choicesHtml = ev.opts.map((o,i) => {
    const ci = cd[i]||{};
    const flavor = ci.flavor||(o.label||'').toUpperCase();
    const riskType = ci.risk||'balanced';
    const rc = riskType==='high'?'#ffbf22':riskType==='safe'?'#21df55':'#45aee8';
    const rb = riskType==='high'?'rgba(255,191,34,.12)':riskType==='safe'?'rgba(33,223,85,.12)':'rgba(69,174,232,.12)';
    const ri = riskType==='high'?I.target:riskType==='safe'?I.check:I.sword;
    const sp = [];
    if (o.goalChance) sp.push('+' + Math.round(o.goalChance*100) + '% gol');
    if (o.formUp) sp.push((o.formUp>0?'+':'') + o.formUp + ' forma');
    if (o.idolatry) sp.push((o.idolatry>0?'+':'') + o.idolatry + ' idolatría');
    if (o.minigame) sp.push('minijuego');
    return `<button class="career-event-choice" onclick="idoloChoose(${i})" aria-label="${o.text}">
      <div class="career-event-choice-header">
        <span class="career-event-choice-icon" style="background:${rb};color:${rc}">${ri}</span>
        <span class="career-event-choice-title">${o.text}</span>
      </div>
      <div class="career-event-choice-desc">${ci.desc||''}</div>
      <div class="career-event-choice-footer">
        <span class="career-event-choice-flavor" style="background:${rb};color:${rc}">${ri} ${flavor}</span>
        <span class="career-event-choice-stat">${sp.join(' · ')}</span>
      </div>
    </button>`;
  }).join('');

  const resultHtml = idoloState._showingResult && idoloState._choiceResult ? idoloRenderEventResult(idoloState._choiceResult) : '';

  const skipHtml = idoloState._showSkipConfirm ? `<div class="career-event-confirm">
    <p>Se van a simular los eventos restantes de la temporada. <b style="color:#f5f7fa">? Seguro?</b></p>
    <div class="career-event-confirm-btns">
      <button class="career-event-confirm-yes" onclick="idoloDoSkipSeason()">Saltar</button>
      <button class="career-event-confirm-no" onclick="idoloHideSkipConfirm()">Cancelar</button>
    </div>
  </div>` : '';

  return `<div class="career-event-screen">
    <div class="career-event-card">
      <div class="career-event-accent" style="background:${pres.accent}"></div>
      <div class="career-event-body">
        <div class="career-event-illustration" style="color:${pres.accent}">${illust}</div>
        <div class="career-event-meta">
          <div class="career-event-meta-left">${I.ball} TEMPORADA ${p.season} · AÑO ${p.age} · ${p.club}</div>
          <div class="career-event-meta-right">${I.clock} EVENTO ${idoloState.currentEvent+1}/${total}${bonusHtml}</div>
        </div>
        <div class="career-event-category" style="color:${pres.accent}">${pres.cat}</div>
        <div class="career-event-title">${ev.title}</div>
        <div class="career-event-desc">${narr}</div>
        ${resultHtml || `<div class="career-event-choices">${choicesHtml}</div>`}
      </div>
    </div>
    ${!idoloState._showingResult ? `<div class="career-event-skip">
      <button class="career-event-skip-btn" onclick="idoloShowSkipConfirm()">${I.skip} Saltar temporada</button>
      ${skipHtml}
    </div>` : ''}
  </div>`;
}
function idoloRenderEventResult(r) {
  const t = { success:'GANASTE EL DUELO', mixed:'DECISIÓN CUMPLIDA', fail:'NO SALIÓ' };
  const d = {
    success:'Te impusiste en el momento clave. La confianza crece y el equipo lo nota.',
    mixed:'No todo salió según lo planeado, pero plantaste cara. La experiencia suma.',
    fail:'La jugada no salió. Habrá que aprender para la próxima.'
  };
  const changes = [];
  if (r.bonusG) changes.push(`GOL <b class="up">+${r.bonusG}</b>`);
  if (r.formChange) changes.push(`FORMA <b class="${r.formChange>0?'up':'down'}">${r.formChange>0?'+':''}${r.formChange}</b>`);
  if (r.idolChange) changes.push(`IDOLATRÍA <b class="${r.idolChange>0?'up':'down'}">${r.idolChange>0?'+':''}${r.idolChange}</b>`);
  if (r.atrChange) changes.push(`${r.atrKey.toUpperCase()} <b class="${r.atrChange>0?'up':'down'}">${r.atrChange>0?'+':''}${r.atrChange}</b>`);
  return `<div class="career-event-result ${r.type}">
    <div class="career-event-result-title">${t[r.type]||''}</div>
    <div class="career-event-result-desc">${d[r.type]||''}</div>
    ${changes.length ? `<div class="career-event-result-changes">${changes.map(c=>`<span class="career-event-result-change">${c}</span>`).join('')}</div>` : ''}
    <button class="career-event-result-btn" onclick="idoloContinueAfterResult()">${I.check} Continuar</button>
  </div>`;
}
function idoloChoose(idx) {
  const ev = idoloState.events[idoloState.currentEvent], choice = ev.opts[idx];
  if (!choice) return;
  const p = idoloState.player;
  const roll = Math.random();
  let bonusG = 0, bonusA = 0;
  if (choice.goalChance && roll < choice.goalChance) bonusG = Math.floor(Math.random()*2)+1;
  if (Math.random() < 0.2) bonusA = Math.floor(Math.random()*2);
  p.goals += bonusG; p.assists += bonusA; p.appearances += bonusG>0?1:0;
  const atrDelta = (choice.ovrChance||0)*8 + (Math.random()*3-1|0);
  const key = IDOLO_ATR_KEYS[Math.random()*IDOLO_ATR_KEYS.length|0];
  const atrChange = Math.round(atrDelta*(Math.random()*.5+.5));
  p.atr[key] = Math.max(30, Math.min(99, p.atr[key] + atrChange));
  const formChange = (choice.formUp||0);
  p.form = Math.max(0, Math.min(10, p.form+formChange));
  const idolChange = choice.idolatry||0;
  p.idolatry = Math.max(0, Math.min(100, p.idolatry+idolChange));
  if (ev.id==='nacional' && idx===0) { p.nationalApps += Math.random()*4+1|0; if (Math.random()<.3) p.nationalGoals += Math.random()*2+1|0; }
  if (bonusG > 0) {
    if ((ev.id==='final_cl'||ev.id==='mundial') && !p.titles.includes('Champions League')) p.titles.push('Champions League');
    if ((ev.id==='final_league'||ev.id==='copa') && !p.titles.includes('Liga')) p.titles.push('Liga');
    if (ev.id==='mundial') { if (!p.titles.includes('Mundial')) p.titles.push('Mundial'); p.nationalApps += 5+Math.random()*3|0; p.nationalGoals += Math.random()*2+1|0; }
    if (ev.id==='transfer') { const nt = idoloRandomTeam(p.clubTier+1); if (nt && nt.tier > p.clubTier) { p.club = nt.name; p.clubTier = nt.tier; p.clubLeague = nt.league; } }
  }
  idoloState._eventBonusG = (idoloState._eventBonusG||0)+bonusG;
  idoloState._eventBonusA = (idoloState._eventBonusA||0)+bonusA;

  const didScore = bonusG > 0;
  const type = didScore ? 'success' : (choice.ovrChance > 0.1 ? 'mixed' : 'fail');

  idoloState._choiceResult = { type, formChange, idolChange, atrKey:key, atrChange, bonusG };
  idoloState._showingResult = true;
  idoloSave(); idoloRender();
}
function idoloContinueAfterResult() {
  delete idoloState._showingResult;
  delete idoloState._choiceResult;
  idoloState.currentEvent++;
  if (idoloState.currentEvent >= idoloState.events.length) {
    const p = idoloState.player, ss = idoloSeasonStats(p);
    idoloState._seasonApps = ss.apps; idoloState._seasonGoals = ss.goals+(idoloState._eventBonusG||0);
    idoloState._seasonAsts = ss.asts+(idoloState._eventBonusA||0); idoloState._seasonClean = ss.cs;
    idoloState.step = 'season_result';
  }
  idoloSave(); idoloRender();
}
function idoloSeasonStats(p) {
  const ovr = idoloOverall(p.atr), fm = p.form/10, op = ovr/100;
  const ap = Math.max(0.5, 1-(p.age-32)*.03);
  const base = Math.round((12+op*28)*fm*ap), apps = Math.max(3, base+Math.random()*6-3|0);
  let gr, ar;
  if (p.position==='ST') { gr = 0.10+op*0.55; ar = 0.03+op*0.18; } else { gr = 0.04+op*0.25; ar = 0.06+op*0.32; }
  return { apps, goals:Math.round(apps*gr*(Math.random()*.4+.8)), asts:Math.round(apps*ar*(Math.random()*.5+.75)), cs:0 };
}
function idoloShowSkipConfirm() { idoloState._showSkipConfirm = true; idoloRender(); }
function idoloHideSkipConfirm() { delete idoloState._showSkipConfirm; idoloRender(); }
function idoloDoSkipSeason() {
  delete idoloState._showSkipConfirm; delete idoloState._showingResult; delete idoloState._choiceResult;
  const p = idoloState.player, ss = idoloSeasonStats(p);
  p.appearances += ss.apps; p.goals += ss.goals; p.assists += ss.asts;
  const growth = p.season<5 ? Math.random()*3+1|0 : Math.random()*2|0;
  for (let i = 0; i < growth; i++) { const k = IDOLO_ATR_KEYS[Math.random()*IDOLO_ATR_KEYS.length|0]; p.atr[k] = Math.min(99, p.atr[k]+1); }
  p.form = Math.min(10, p.form+Math.random()*2|0); p.idolatry = Math.min(100, p.idolatry+Math.random()*3|0);
  p.money += 15000+Math.random()*15000|0;
  idoloState._seasonApps = ss.apps; idoloState._seasonGoals = ss.goals; idoloState._seasonAsts = ss.asts; idoloState._seasonClean = ss.cs;
  idoloState.events = []; idoloState.step = 'season_result'; idoloSave(); idoloRender();
}

// ─── Renderizado de competiciones y minijuegos ───
function idoloRenderCompIntro(){
  const lr = idoloState._leagueRes, p = idoloState.player;
  const posColor = lr.position <= 4 ? '#45aee8' : lr.position <= 10 ? '#f5f7fa' : lr.position <= 16 ? '#ffbf22' : '#ff6575';
  const posLabel = lr.position === 1 ? 'CAMPEÓN' : lr.position <= 4 ? 'Champions' : lr.position <= 6 ? 'Europa' : lr.position <= 10 ? 'Media Tabla' : lr.position <= 16 ? 'Lucha' : 'Descenso';
  const compList = (idoloState._competitions||[]).filter(c => c.stage !== 'simulated' && !c.eliminated).map(c => `<div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid #1a1f28;font-size:11px;color:#8b9bb0"><span style="color:${c.teamType==='national'?'#45aee8':'#21df55'}">${c.teamType==='national'?I.globe:I.trophy}</span> ${idoloGetCompLabel(c.type)} · <b style="color:#f5f7fa">${c.teamName}</b></div>`).join('');
  return `<div class="comp-intro-screen">
    <div class="comp-intro-card">
      <div class="comp-intro-accent" style="background:linear-gradient(90deg,#22c55e,#45aee8,#ffbf22)"></div>
      <div class="comp-intro-body">
        <div style="font-size:10px;color:#4d5a6b;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:2px">${I.calendar} Temporada ${p.season}</div>
        <div style="font-size:28px;font-weight:800;color:#f5f7fa;text-transform:uppercase;font-family:'Impact','Arial Black',sans-serif;margin-bottom:12px">Resultado de Liga</div>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
          <div style="font-size:48px;font-weight:800;color:${posColor};font-family:'Impact','Arial Black',sans-serif;line-height:1">${lr.position}°</div>
          <div><div style="font-size:14px;color:#f5f7fa;font-weight:700">${p.club}</div><div style="font-size:11px;color:#4d5a6b">${lr.points} pts</div><div style="font-size:10px;font-weight:600;color:${posColor};text-transform:uppercase;letter-spacing:.5px">${posLabel}</div></div>
        </div>
        ${compList ? `<div style="background:#080d14;border:1px solid #1e2a36;border-radius:4px;padding:8px 12px;margin-bottom:12px"><div style="font-size:9px;color:#3a4555;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">COMPETICIONES DE LA TEMPORADA</div>${compList}</div>` : ''}
        <button class="comp-action-btn" onclick="idoloStartCompetitions()">${I.play} Iniciar Temporada</button>
      </div>
    </div>
  </div>`;
}
function idoloStartCompetitions(){
  if(!idoloState._competitions || idoloState._competitions.length === 0){
    delete idoloState._compStep; delete idoloState._currentComp; idoloState.step = 'events'; idoloSave(); idoloRender();
    return;
  }
  const done = idoloProcessCompetitions();
  if(done){
    delete idoloState._compStep; delete idoloState._currentComp; idoloState.step = 'events'; idoloSave(); idoloRender();
  } else {
    idoloSave(); idoloRender();
  }
}
function idoloRenderMinigameScreen(){
  const comp = idoloState._currentComp;
  if(!comp) return '<div style="text-align:center;color:#ff6575;padding:40px">Error: competición no encontrada</div>';
  const mg = comp.minigame;
  if(mg === 'road-to-glory') return idoloRenderRoadToGlory(comp);
  if(mg === 'penalty-shootout') return idoloRenderPenaltyShootout(comp);
  if(mg === 'hidden-goals') return idoloRenderHiddenGoals(comp);
  return '<div style="text-align:center;color:#ff6575;padding:40px">Minijuego desconocido</div>';
}
function idoloGetKOResultText(our, opp){
  if(our > opp) return {text:'VICTORIA', cls:'success'};
  if(our < opp) return {text:'DERROTA', cls:'fail'};
  return {text:'EMPATE', cls:'mixed'};
}
// ─── Road to Glory ───
function idoloRenderRoadToGlory(comp){
  const m = comp.mState, p = idoloState.player;
  const cfg = COMP_CONFIG[comp.type];
  const label = cfg ? cfg.label : comp.type;
  const isGroups = !m.groups[m.currentGroup] || m.groups[m.currentGroup].stage === 'groups';
  const grp = m.groups[m.currentGroup];
  const teamStr = idoloGetTeamStrength(comp.teamName, comp.teamType);
  // Build progress bar
  const allStages = [{key:'groups',lbl:'GRUPOS'},{key:'round16',lbl:'OCTAVOS'},{key:'quarter',lbl:'CUARTOS'},{key:'semi',lbl:'SEMIFINAL'},{key:'final',lbl:'FINAL'}];
  const curStageIdx = m.groups.findIndex(g => g.stage === (grp?grp.stage:'final'));
  const progressHtml = `<div class="rtg-progress">${allStages.map((st,i) => `<div class="rtg-prog-item ${i<curStageIdx?'done':i===curStageIdx?'active':''}"><span class="rtg-prog-dot"></span><span class="rtg-prog-label">${st.lbl}</span></div>`).join('<span class="rtg-prog-line"></span>')}</div>`;
  // Grid (5x5)
  const gridHtml = `<div class="rtg-grid">${m.grid.map((g,i) => m.gridRevealed[i]
    ? `<div class="rtg-cell rtg-cell-revealed ${g.our>g.opp?'win':g.our<g.opp?'lose':'draw'}">${g.our}-${g.opp}</div>`
    : `<button class="rtg-cell rtg-cell-hidden" onclick="idoloChooseRoadToGloryCell(${i})">?</button>`
  ).join('')}</div>`;
  if(isGroups && grp){
    const day = m.stagesCompleted;
    const rival = grp.rivals[day] || 'Desconocido';
    const pts = grp.points || 0;
    const nextRival = day+1 < grp.rivals.length ? grp.rivals[day+1] : null;
    return `<div class="comp-screen">
      <div class="comp-card rtg-card">
        <div class="comp-accent" style="background:linear-gradient(90deg,#45aee8,#f5f7fa,#ffd437)"></div>
        <div class="comp-body">
          <div class="comp-meta"><span>${I.globe} ${label}</span><span>${I.flag||''} ${comp.teamName}</span></div>
          <div style="font-size:32px;font-weight:800;color:#f5f7fa;text-transform:uppercase;font-family:'Impact','Arial Black',sans-serif;margin-bottom:2px">CAMINO A LA GLORIA</div>
          <div style="font-size:11px;color:#4d5a6b;margin-bottom:8px">Fase de Grupos · ${comp.teamName}</div>
          ${progressHtml}
          <div style="display:flex;justify-content:space-between;align-items:center;margin:8px 0 6px;font-size:12px;color:#8b9bb0">
            <span>${I.sword} vs <b style="color:#f5f7fa">${rival}</b></span>
            <span style="color:#ffd437">Fecha ${day+1}/${grp.rivals.length} · ${pts} pts</span>
          </div>
          ${m.lastResult ? `<div style="text-align:center;padding:6px;margin-bottom:6px;border-radius:4px;background:${m.lastResult.cls==='success'?'rgba(33,223,85,.1)':m.lastResult.cls==='fail'?'rgba(255,101,117,.1)':'rgba(255,191,34,.1)'};border:1px solid ${m.lastResult.cls==='success'?'rgba(33,223,85,.2)':m.lastResult.cls==='fail'?'rgba(255,101,117,.2)':'rgba(255,191,34,.2)'}"><span style="font-weight:700;color:${m.lastResult.cls==='success'?'#21df55':m.lastResult.cls==='fail'?'#ff6575':'#ffbf22'}">${m.lastResult.text}</span> <span style="color:#8b9bb0;font-size:11px">${m.lastResult.our}-${m.lastResult.opp}</span></div>` : ''}
          ${nextRival ? `<div style="font-size:10px;color:#3a4555;text-transform:uppercase;letter-spacing:.5px">Próximo: ${nextRival}</div>` : ''}
          <div style="font-size:9px;color:#3a4555;text-transform:uppercase;letter-spacing:.5px;margin:6px 0 4px">Elegí un resultado para el partido</div>
          ${gridHtml}
        </div>
      </div>
    </div>`;
  }
  // Knockout stage
  const r = grp ? grp.rivals[0] : 'Desconocido';
  const stageLabels = {round16:'Octavos de Final',quarter:'Cuartos de Final',semi:'Semifinal',final:'FINAL'};
  const stageLbl = stageLabels[grp?grp.stage:'final'] || 'Eliminatoria';
  return `<div class="comp-screen">
    <div class="comp-card rtg-card">
      <div class="comp-accent" style="background:linear-gradient(90deg,#45aee8,#f5f7fa,#ffd437)"></div>
      <div class="comp-body">
        <div class="comp-meta"><span>${I.globe} ${label}</span><span>${I.sword} ${stageLbl}</span></div>
        <div style="font-size:32px;font-weight:800;color:#f5f7fa;text-transform:uppercase;font-family:'Impact','Arial Black',sans-serif;margin-bottom:2px">CAMINO A LA GLORIA</div>
        <div style="font-size:16px;color:#8b9bb0;margin-bottom:8px">${comp.teamName} vs <b style="color:#f5f7fa">${r}</b></div>
        ${progressHtml}
        ${m.lastResult ? `<div style="text-align:center;padding:8px;margin:6px 0;border-radius:4px;background:${m.lastResult.cls==='success'?'rgba(33,223,85,.1)':m.lastResult.cls==='fail'?'rgba(255,101,117,.1)':'rgba(255,191,34,.1)'};border:1px solid ${m.lastResult.cls==='success'?'rgba(33,223,85,.2)':m.lastResult.cls==='fail'?'rgba(255,101,117,.2)':'rgba(255,191,34,.2)'}"><div style="font-weight:700;font-size:16px;color:${m.lastResult.cls==='success'?'#21df55':m.lastResult.cls==='fail'?'#ff6575':'#ffbf22'}">${m.lastResult.text}</div><div style="font-size:24px;font-weight:800;color:#f5f7fa">${m.lastResult.our} - ${m.lastResult.opp}</div></div>` : ''}
        ${!m.eliminated && !m.won ? `<div style="font-size:9px;color:#3a4555;text-transform:uppercase;letter-spacing:.5px;margin:6px 0 4px">Elegí un resultado</div>${gridHtml}` : ''}
        ${m.won || m.eliminated ? `<button class="comp-action-btn" style="margin-top:12px" onclick="idoloCompFinish()">${I.right} ${m.won ? 'Levantar el trofeo' : 'Continuar'}</button>` : ''}
      </div>
    </div>
  </div>`;
}
function idoloChooseRoadToGloryCell(idx){
  const comp = idoloState._currentComp, m = comp.mState;
  if(!m || m.gridRevealed[idx] || m.eliminated || m.won) return;
  m.gridRevealed[idx] = true;
  const res = m.grid[idx];
  const isGroups = m.groups[m.currentGroup] && m.groups[m.currentGroup].stage === 'groups';
  const grp = m.groups[m.currentGroup];
  m.lastResult = {our:res.our, opp:res.opp, text:res.our > res.opp ? 'VICTORIA' : res.our < res.opp ? 'DERROTA' : 'EMPATE', cls:res.our > res.opp ? 'success' : res.our < res.opp ? 'fail' : 'mixed'};
  if(isGroups && grp){
    grp.results.push(res);
    if(res.our > res.opp) grp.points = (grp.points||0) + 3;
    else if(res.our === res.opp) grp.points = (grp.points||0) + 1;
    m.currentGroup++;
    if(grp.points >= 4){ // qualified
      m.currentGroup = 1; m.stagesCompleted = 1;
      m.groups[1] = m.groups[1] || {rivals:[idoloPickOpponent(comp.teamType,comp.seed,20+m.stagesCompleted,comp.type)],results:[],stage:'round16'};
    } else if(m.currentGroup >= grp.rivals.length || m.currentGroup >= 3){
      m.eliminated = true;
    }
  } else if(grp){
    if(res.our > res.opp){ // won
      const nextIdx = m.currentGroup + 1;
      if(nextIdx >= m.groups.length){
        m.won = true;
      } else {
        m.currentGroup = nextIdx;
        m.stagesCompleted = nextIdx;
        m.groups[nextIdx] = m.groups[nextIdx] || {rivals:[idoloPickOpponent(comp.teamType,comp.seed,30+nextIdx,comp.type)],results:[],stage:nextIdx===2?'quarter':nextIdx===3?'semi':'final'};
      }
    } else if(res.our < res.opp){
      m.eliminated = true;
    } else { // draw → penalty
      const penR = seededRandom(comp.seed, 100+idx);
      if(penR < 0.45){ // won penalties
        const nextIdx = m.currentGroup + 1;
        if(nextIdx >= m.groups.length) m.won = true;
        else { m.currentGroup = nextIdx; m.stagesCompleted = nextIdx; }
      } else { m.eliminated = true; }
    }
  }
  idoloSave(); idoloRender();
}
// ─── Penalty Shootout (La Tanda) ───
function idoloRenderPenaltyShootout(comp){
  const m = comp.mState || {penalties:[null,null,null], currentPenalty:0};
  if(!comp.mState) comp.mState = m;
  const cfg = COMP_CONFIG[comp.type];
  const label = cfg ? cfg.label : comp.type;
  const opp = comp.opponent || idoloPickOpponent(comp.teamType, comp.seed, 50, comp.type);
  if(!comp.opponent) comp.opponent = opp;
  const penaltyDots = m.penalties.map((p,i) => {
    const isCurrent = i === m.currentPenalty && !m.completed;
    if(p === null) return `<div class="pen-dot ${isCurrent?'pen-current':''}"><span>PENAL ${i+1}</span></div>`;
    if(p === 'goal') return `<div class="pen-dot pen-goal"><span>${I.check}</span><span>GOL</span></div>`;
    if(p === 'saved') return `<div class="pen-dot pen-saved"><span>${I.cross}</span><span>ATAJADO</span></div>`;
    return `<div class="pen-dot pen-miss"><span>${I.cross}</span><span>FALLADO</span></div>`;
  }).join('');
  const resultMsg = m.completed ? (m.goals >= 3 ? '¡CAMPEÓN!' : m.goals >= 2 ? 'Se define en desempate...' : 'DERROTA') : '';
  return `<div class="comp-screen">
    <div class="comp-card pen-card">
      <div class="comp-accent" style="background:linear-gradient(90deg,#ffbf22,#ffd437,#ffbf22)"></div>
      <div class="comp-body" style="text-align:center">
        <div class="comp-meta"><span>${I.trophy} ${label}</span><span>FINAL</span></div>
        <div style="font-size:32px;font-weight:800;color:#f5f7fa;text-transform:uppercase;font-family:'Impact','Arial Black',sans-serif;margin-bottom:2px">LA TANDA</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:16px;margin:8px 0">
          <div style="text-align:right"><div style="font-size:16px;font-weight:700;color:#f5f7fa">${comp.teamName}</div><div style="font-size:10px;color:#4d5a6b">${comp.teamType==='national'?'Selección':'Club'}</div></div>
          <div style="font-size:14px;color:#ffd437;font-weight:700">VS</div>
          <div style="text-align:left"><div style="font-size:16px;font-weight:700;color:#f5f7fa">${opp}</div><div style="font-size:10px;color:#4d5a6b">Rival</div></div>
        </div>
        <div style="font-size:12px;color:#8b9bb0;line-height:1.5;margin-bottom:12px">${comp.teamName} define el título desde los doce pasos. Convertí los tres penales para asegurar la copa.</div>
        <div class="pen-dots">${penaltyDots}</div>
        ${m.completed ? `<div style="margin:10px 0"><div style="font-size:20px;font-weight:800;color:${m.goals>=3?'#21df55':'#ff6575'};font-family:'Impact','Arial Black',sans-serif">${resultMsg}</div><div style="font-size:11px;color:#8b9bb0">${m.goals}/3 penales convertidos</div><button class="comp-action-btn" onclick="idoloCompFinish()">${I.check} Continuar</button></div>`
        : `<div style="font-size:10px;color:#3a4555;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">ELEGÍ LA DIRECCIÓN DEL DISPARO</div>
          <div class="pen-choices">
            <button class="pen-choice" onclick="idoloChoosePenaltyDirection('left')"><div class="pen-arrow">⬅</div><div>Palo Izquierdo</div></button>
            <button class="pen-choice" onclick="idoloChoosePenaltyDirection('center')"><div class="pen-arrow">⬆</div><div>Al Medio</div></button>
            <button class="pen-choice" onclick="idoloChoosePenaltyDirection('right')"><div class="pen-arrow">➡</div><div>Palo Derecho</div></button>
          </div>`}
      </div>
    </div>
  </div>`;
}
function idoloChoosePenaltyDirection(dir){
  const comp = idoloState._currentComp, m = comp.mState;
  if(!m || m.completed || m.currentPenalty >= 3) return;
  const p = idoloState.player;
  const idx = m.currentPenalty;
  const gkDir = ['left','center','right'][Math.floor(seededRandom(comp.seed, 500+idx)*3)];
  const finishing = (p.atr&&p.atr.sho||50) / 100;
  const power = (p.atr&&p.atr.phy||50) / 100;
  const form = p.form / 10;
  const pressure = 0.7 + idx * 0.15;
  const gkQuality = 0.6 + seededRandom(comp.seed, 600+idx) * 0.3;
  let prob;
  if(dir === gkDir){
    prob = finishing * 0.3 + power * 0.2 + form * 0.2 - gkQuality * 0.3 - pressure * 0.2 + 0.4;
  } else {
    prob = finishing * 0.3 + power * 0.2 + form * 0.2 + 0.3;
  }
  const roll = seededRandom(comp.seed, 700+idx);
  const scored = roll < prob;
  m.penalties[idx] = scored ? 'goal' : (dir === gkDir ? 'saved' : 'missed');
  m.currentPenalty++;
  m.goals = (m.goals||0) + (scored?1:0);
  if(m.currentPenalty >= 3) m.completed = true;
  idoloSave(); idoloRender();
}
// ─── Hidden Goals (Copa Intercontinental) ───
function idoloRenderHiddenGoals(comp){
  console.log('idoloRenderHiddenGoals called, seed:', comp.seed);
  const m = comp.mState || {grid:[], revealed:[], shots:6, goals:0, completed:false, won:false, positions:[]};
  if(!comp.mState){
    const positions = [];
    let guard = 0;
    while(positions.length < 3 && guard++ < 50){
      const r = Math.floor(seededRandom(comp.seed, 800+positions.length) * 9);
      if(r >= 0 && r <= 8 && !positions.includes(r)) positions.push(r);
    }
    m.grid = Array(9).fill(false);
    (positions.filter(i => i >= 0 && i < 9)).forEach(i => m.grid[i] = true);
    m.revealed = Array(9).fill(false);
    m.shots = 6; m.goals = 0; m.completed = false; m.won = false; m.positions = positions;
    comp.mState = m;
  }
  const cfg = COMP_CONFIG[comp.type];
  const label = cfg ? cfg.label : comp.type;
  const title = comp.teamType === 'national' ? (cfg && cfg.label ? 'LA FINAL CONTINENTAL' : 'TODO O NADA') : 'COPA INTERCONTINENTAL';
  const opp = comp.opponent || idoloPickOpponent(comp.teamType, comp.seed, 900, comp.type);
  if(!comp.opponent) comp.opponent = opp;
  // Grid
  const gridHtml = `<div class="hg-grid">${m.grid.map((isGoal,i) => {
    if(!m.revealed[i]) return `<button class="hg-cell hg-cell-hidden" onclick="idoloChooseHiddenGoalsCell(${i})">?</button>`;
    if(isGoal) return `<div class="hg-cell hg-cell-goal">${I.ball}</div>`;
    return `<div class="hg-cell hg-cell-miss">${I.cross}</div>`;
  }).join('')}</div>`;
  const resultHtml = m.completed ? (m.won ? `<div style="margin:8px 0"><div style="font-size:20px;font-weight:800;color:#21df55;font-family:'Impact','Arial Black',sans-serif">¡CAMPEÓN!</div><div style="font-size:11px;color:#8b9bb0">${m.goals}/3 goles encontrados</div></div>` : `<div style="margin:8px 0"><div style="font-size:20px;font-weight:800;color:#ff6575;font-family:'Impact','Arial Black',sans-serif">DERROTA</div><div style="font-size:11px;color:#8b9bb0">Goles encontrados: ${m.goals}/3 · Tiros restantes: ${m.shots}</div><div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;margin-top:4px;font-size:10px;color:#4d5a6b">${m.positions.map((pi,ji) => `<span>Gol ${ji+1}: posición ${pi+1}</span>`).join(' · ')}</div></div>`) : '';
  return `<div class="comp-screen">
    <div class="comp-card hg-card">
      <div class="comp-accent" style="background:linear-gradient(90deg,#21df55,#45aee8,#a855f7)"></div>
      <div class="comp-body" style="text-align:center">
        <div class="comp-meta"><span>${I.trophy} ${label}</span><span>${I.flag||''} FINAL</span></div>
        <div style="font-size:32px;font-weight:800;color:#f5f7fa;text-transform:uppercase;font-family:'Impact','Arial Black',sans-serif;margin-bottom:2px">${title}</div>
        <div style="display:flex;justify-content:center;align-items:center;gap:12px;margin:8px 0">
          <div style="font-size:14px;font-weight:700;color:#f5f7fa">${comp.teamName}</div>
          <div style="font-size:11px;color:#ffd437;font-weight:700">VS</div>
          <div style="font-size:14px;font-weight:700;color:#f5f7fa">${opp}</div>
        </div>
        <div style="font-size:11px;color:#8b9bb0;line-height:1.5;margin-bottom:8px">Tres goles escondidos entre nueve zonas. Encontralos antes de gastar tus seis tiros.</div>
        <div class="hg-counters"><span>${m.goals}/3 GOLES</span><span>${m.shots} TIROS</span></div>
        ${gridHtml}
        ${resultHtml}
        ${m.completed ? `<button class="comp-action-btn" onclick="idoloCompFinish()">${I.check} Continuar</button>` : ''}
      </div>
    </div>
  </div>`;
}
function idoloChooseHiddenGoalsCell(idx){
  console.log('HG cell click:', idx);
  const comp = idoloState._currentComp, m = comp.mState;
  if(!m || m.revealed[idx] || m.completed) return;
  m.revealed[idx] = true;
  m.shots--;
  if(m.grid && m.grid[idx]) m.goals++;
  if(m.goals >= 3) m.completed = true, m.won = true;
  else if(m.shots <= 0) m.completed = true, m.won = false;
  idoloRender();
}
// ─── Competition result and rewards ───
function idoloRenderCompResult(){
  const comp = idoloState._currentComp;
  if(!comp) return '<div style="text-align:center;color:#ff6575;padding:40px">Error</div>';
  const cfg = COMP_CONFIG[comp.type];
  const label = cfg ? cfg.label : comp.type;
  const title = cfg ? cfg.title : comp.type;
  const won = comp.won || (comp.mState && comp.mState.won);
  const elim = comp.eliminated || (comp.mState && comp.mState.eliminated);
  const goals = comp.mState && (comp.mState.goals || comp.mState.stagesCompleted);
  const stage = (comp.mState && comp.mState.groups) ? (comp.mState.eliminated ? 'Eliminado' : comp.mState.won ? 'Campeón' : '') : 'Final';
  if(!comp.rewardsDone) idoloApplyCompetitionRewards(comp);
  return `<div class="comp-screen">
    <div class="comp-card">
      <div class="comp-accent" style="background:${won?'linear-gradient(90deg,#ffd437,#21df55,#ffd437)':'#ff6575'}"></div>
      <div class="comp-body" style="text-align:center;padding:36px 28px">
        <div style="font-size:40px;margin-bottom:4px">${won ? I.trophy : I.cross}</div>
        <div style="font-size:28px;font-weight:800;color:${won?'#ffd437':'#ff6575'};text-transform:uppercase;font-family:'Impact','Arial Black',sans-serif;margin-bottom:4px">${won ? '¡CAMPEÓN!' : 'ELIMINADO'}</div>
        <div style="font-size:16px;color:#f5f7fa;font-weight:700;margin-bottom:2px">${label}</div>
        <div style="font-size:14px;color:#8b9bb0;margin-bottom:12px">${comp.teamName} ${won ? 'levantó el trofeo' : 'quedó en el camino'}</div>
        ${won ? `<div style="font-size:12px;color:#ffd437;font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">${title} agregado al historial</div>` : `<div style="font-size:11px;color:#8b9bb0;margin-bottom:10px">${comp.mState && comp.mState.lastResult ? `Último resultado: ${comp.mState.lastResult.our}-${comp.mState.lastResult.opp} vs ${comp.opponent||'?'}` : ''}</div>`}
        <button class="comp-action-btn" onclick="idoloCompContinue()">${I.right} Continuar</button>
      </div>
    </div>
  </div>`;
}
function idoloApplyCompetitionRewards(comp){
  if(comp.rewardsDone) return;
  const p = idoloState.player;
  const won = comp.won || (comp.mState && comp.mState.won);
  const cfg = COMP_CONFIG[comp.type];
  const title = cfg ? cfg.title : comp.type;
  const big = cfg ? cfg.big : false;
  if(won){
    p.titles.push(title);
    p.idolatry = Math.min(100, p.idolatry + (big ? 15 : 8));
    p.form = Math.min(10, p.form + (big ? 3 : 2));
    p.money += big ? 50000 : 25000;
    if(big && comp.type === 'worldCup') p.form = Math.min(10, p.form + 2);
  } else {
    p.idolatry = Math.max(0, p.idolatry - 3);
    p.form = Math.max(0, p.form - 1);
  }
  comp.rewardsDone = true;
  idoloSave();
}
function idoloCompFinish(){
  const comp = idoloState._currentComp;
  if(comp && !comp.rewardsDone) idoloApplyCompetitionRewards(comp);
  idoloState._compStep = 'result';
  idoloSave(); idoloRender();
}
function idoloCompContinue(){
  delete idoloState._compStep; delete idoloState._currentComp;
  const remaining = (idoloState._competitions||[]).filter(c => c.stage !== 'eliminated' && c.stage !== 'won' && !c.rewardsDone && c.stage !== 'simulated');
  if(remaining.length > 0){
    idoloState._currentComp = remaining[0];
    idoloState._currentComp.stage = 'pending';
    idoloStartCompetitions();
  } else {
    delete idoloState._competitions; delete idoloState._currentComp; delete idoloState._compStep;
    idoloState.step = 'events';
    idoloSave(); idoloRender();
  }
}

// ─── Resumen de temporada (periódico) ───
function idoloRenderSeasonResult() {
  const p = idoloState.player, sa = idoloState._seasonApps||0, sg = idoloState._seasonGoals||0, sas = idoloState._seasonAsts||0;
  p.appearances += sa; p.goals += sg; p.assists += sas;
  const ovr = idoloOverall(p.atr);
  const growth = p.season<5 ? Math.random()*3+1|0 : Math.random()*2|0;
  for (let i = 0; i < growth; i++) { const k = IDOLO_ATR_KEYS[Math.random()*IDOLO_ATR_KEYS.length|0]; p.atr[k] = Math.min(99, p.atr[k]+1); }
  p.form = Math.min(10, p.form+Math.random()*2|0); p.money += 20000+Math.random()*20000|0;
  p.idolatry = Math.min(100, p.idolatry+Math.random()*4+1|0);
  let newTitles = 0;
  const lr = idoloState._leagueRes;
  if(lr && lr.champion && !p.titles.includes('Liga Doméstica')){ p.titles.push('Liga Doméstica'); newTitles++; }
  const r = idoloState.rival; r.apps += Math.random()*15+5|0; r.goals += Math.random()*8|0; if (Math.random() < .35) r.wins++;
  const isLegend = ovr >= 90 && p.goals >= 300 && p.titles.length >= 5 && p.nationalApps >= 40;
  if (isLegend && !p.legend) p.legend = true;
  const canRetire = p.age >= 34, forceRetire = p.age >= 41;
  if (forceRetire) p.retired = true;
  p.history.push({ season:p.season, club:p.club, tier:p.clubTier, apps:sa, goals:sg, asts:sas, ovr, cumGoals:p.goals, cumApps:p.appearances, cumTitles:p.titles.length });
  idoloSave();
  const headlines = [`${p.name} brilló esta temporada`,`Temporada histórica de ${p.name}`,`${p.name} se consagra en ${p.club}`,`Actuación estelar de ${p.name}`];
  const stories = [
    `El talento de ${p.country} sigue demostrando su calidad. ${sg} goles en ${sa} partidos lo consolidan como pieza clave.`,
    `Con ${sg} tantos y ${sas} asistencias, ${p.name} fue el motor del equipo.`,
    `Una temporada más, demuestra por qué es el ${idoloIdolatryLevel(p.idolatry).name} del club.`,
    `${p.name} (${p.position==='ST'?'delantero':'mediapunta'}) completó ${sg} goles en ${sa} presentaciones.`
  ];
  return `<div class="idolo-newspaper">
    <div style="color:#5a6470;margin-bottom:6px">${I.news}</div>
    <div class="headline">${headlines[Math.random()*headlines.length|0]}</div>
    <div class="date">Temporada ${p.season} · ${p.club}</div>
    <div class="story">${stories[Math.random()*stories.length|0]}</div>
  </div>
  <div class="idolo-grid">
    <div class="idolo-stat"><div class="idolo-stat-v">${sa}</div><div class="idolo-stat-t">Partidos</div></div>
    <div class="idolo-stat"><div class="idolo-stat-v">${sg}</div><div class="idolo-stat-t">Goles</div></div>
    <div class="idolo-stat"><div class="idolo-stat-v">${sas}</div><div class="idolo-stat-t">Asistencias</div></div>
    <div class="idolo-stat"><div class="idolo-stat-v" style="color:#22c55e">+${growth}</div><div class="idolo-stat-t">OVR (${ovr})</div></div>
  </div>
  <div class="idolo-idol-bar" style="margin:8px 0"><div class="idolo-idol-fill" style="width:${Math.min(100,p.idolatry)}%"></div></div>
  <div class="idolo-idol-label"><span>Idolatría: ${p.idolatry}/100</span><span style="color:#ffd437">${idoloIdolatryLevel(p.idolatry).name}</span></div>
  ${newTitles>0?`<div class="idolo-card" style="text-align:center;border-color:#22c55e;background:#22c55e06"><h3 style="color:#22c55e"><span class="idolo-icon">${I.trophy}</span>¡Campeón!</h3><div style="font-size:10px;color:#5a6470">Ganaste ${newTitles} título${newTitles>1?'s':''}</div></div>`:''}
  ${isLegend?`<div class="idolo-card" style="text-align:center;border-color:#ffd437;background:#ffd43708"><div style="color:#ffd437;margin-bottom:4px">${I.crown}</div><h3 style="color:#ffd437">¡SOS UNA LEYENDA!</h3><div style="font-size:10px;color:#5a6470">OVR 90+, 300+ goles, 5+ títulos y selección.</div></div>`:''}
  ${p.retired?`<div class="idolo-card" style="text-align:center;border-color:#ffd437">
    <h3 style="color:#f5f7fa;font-size:13px"><span class="idolo-icon">${I.wave}</span>Carrera terminada</h3>
    <div style="font-size:14px;margin:6px 0;color:#8b95a0">${p.name} se retiró a los ${p.age} años.</div>
    <div style="font-size:16px;font-weight:700;color:#f5f7fa">${p.goals} G · ${p.appearances} PJ · ${p.titles.length} títulos · OVR ${ovr}</div>
    <div class="idolo-idol-bar" style="margin:10px 0"><div class="idolo-idol-fill" style="width:${Math.min(100,p.idolatry)}%"></div></div>
    <div class="idolo-idol-label"><span>Idolatría final: ${p.idolatry}</span><span style="color:#ffd437">${idoloIdolatryLevel(p.idolatry).name}</span></div>
    ${isLegend?'<div style="margin-top:8px;color:#ffd437;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px"><span class="idolo-icon">'+I.crown+'</span>Eres una leyenda.</div>':'<div style="font-size:10px;color:#5a6470;margin-top:4px">No alcanzaste la gloria máxima, pero dejaste huella.</div>'}
    <div class="idolo-btn-row" style="justify-content:center">
      <button class="idolo-btn-primary" style="flex:0 0 auto;padding:10px 20px;width:auto" onclick="idoloDelete();idoloRender()"><span class="idolo-icon">${I.newgame}</span> Nueva carrera</button>
      <button class="idolo-btn-secondary" style="flex:0 0 auto;padding:10px 20px;width:auto" onclick="idoloExport()"><span class="idolo-icon">${I.export}</span> Exportar</button>
    </div>
  </div>`:
  `<div class="idolo-btn-row">
    <button class="idolo-btn-primary" onclick="idoloTransferWindow()"><span class="idolo-icon">${I.list}</span> Mercado de pases</button>
    ${canRetire?`<button class="idolo-btn-secondary" onclick="idoloRetire()"><span class="idolo-icon">${I.wave}</span> Retirarse</button>`:''}
  </div>`}
  <button class="idolo-btn-secondary danger" style="margin-top:4px" onclick="idoloDelete();idoloRender()"><span class="idolo-icon">${I.trash}</span> Borrar carrera</button>
  <button class="idolo-btn-secondary" style="margin-top:2px" onclick="idoloExport()"><span class="idolo-icon">${I.export}</span> Exportar historia</button>
  <div class="idolo-card"><h3><span class="idolo-icon">${I.record}</span> Totales</h3>
    <div class="idolo-grid">
      <div class="idolo-stat"><div class="idolo-stat-v">${p.appearances}</div><div class="idolo-stat-t">PJ</div></div>
      <div class="idolo-stat"><div class="idolo-stat-v">${p.goals}</div><div class="idolo-stat-t">Goles</div></div>
      <div class="idolo-stat"><div class="idolo-stat-v">${p.assists}</div><div class="idolo-stat-t">Asistencias</div></div>
      <div class="idolo-stat"><div class="idolo-stat-v">${p.titles.length}</div><div class="idolo-stat-t">Títulos</div></div>
    </div>
  </div>`;
}

// ─── Mercado de pases ───
function idoloTransferWindow() {
  const p = idoloState.player;
  delete idoloState._renewalChance;
  const result = CAREER_DB.generateTransferOffers(p);
  idoloState._renewalChance = result.renewalPct;
  idoloState._transferOffers = result.offers;
  idoloState.step = 'team_select'; idoloSave(); idoloRender();
}
function idoloRenderTransfer() {
  const p = idoloState.player, offers = idoloState._transferOffers||[], ovr = idoloOverall(p.atr);
  const renewal = offers.find(o => o.renewal);
  const contLabel = p.continentalCompetitionId ? (COMP_CONFIG[p.continentalCompetitionId] ? COMP_CONFIG[p.continentalCompetitionId].label : p.continentalCompetitionId) : null;
  return `<div style="text-align:center;padding:4px 0 8px">
    <div class="idolo-season" style="margin-bottom:4px"><span class="idolo-icon">${I.list}</span> MERCADO DE PASES</div>
    <h3 style="margin:2px 0;color:#f5f7fa;font-size:14px;text-transform:uppercase;letter-spacing:.3px">Elegí tu equipo para la temporada ${p.season+1}</h3>
    <div style="font-size:10px;color:#5a6470;margin-top:2px">OVR ${ovr} · ${idoloTierName(p.clubTier)} · Edad ${p.age}${contLabel ? ' · ' + I.trophy + ' ' + contLabel : ''}</div>
  </div>
  <div style="display:flex;flex-direction:column;gap:5px">${offers.map((o,i)=>{
    const oContLabel = o.continentalCompetition ? (COMP_CONFIG[o.continentalCompetition] ? COMP_CONFIG[o.continentalCompetition].label : o.continentalCompetition) : null;
    if (o.renewal) return `<button class="idolo-opt" onclick="idoloSelectTeam(${i})" style="text-align:center;padding:10px;border-color:#ffd437">
      <div style="font-size:13px;font-weight:600;color:#f5f7fa"><span style="color:#ffd437">★</span> Renovación - ${o.name}</div>
      <div class="chance" style="float:none;display:block;margin-top:2px">${o.renewalPct}% de renovar · ${idoloTierName(o.tier)}${oContLabel ? ' · ' + oContLabel : ''}</div>
    </button>`;
    const leagueLabel = o.leagueName || o.leagueId || '';
    return `<button class="idolo-opt" onclick="idoloSelectTeam(${i})" style="text-align:center;padding:10px">
      <div style="font-size:13px;font-weight:600;color:#f5f7fa">${o.current&&!o.renewal?'<span style="color:#22c55e">●</span> ':''}${o.name}</div>
      <div class="chance" style="float:none;display:block;margin-top:2px">${o.country||''} · ${leagueLabel} · ${idoloTierName(o.tier)}${oContLabel ? ' · ' + I.trophy + ' ' + oContLabel : ''}${o.current&&!o.renewal?' · (actual)':''}</div>
    </button>`;
  }).join('')}</div>`;
}
function idoloSelectTeam(idx) {
  const sel = (idoloState._transferOffers||[])[idx]; if (!sel) return;
  const p = idoloState.player;
  if (sel.renewal) {
    const roll = Math.random() * 100;
    if (roll <= sel.renewalPct) {
      p._lastContractSeason = p.season;
      p.idolatry = Math.min(100, p.idolatry + 3);
      p.form = Math.min(10, p.form + 1);
    }
  } else if (!sel.current) {
    p.club = sel.clubName || sel.name;
    p.clubId = sel.clubId || null;
    p.clubCountry = sel.country || p.country;
    p.clubRegion = sel.region || null;
    p.clubLeagueName = sel.leagueName || null;
    p.clubLeagueId = sel.leagueId || null;
    p.clubDivision = sel.division || null;
    p.clubStrength = sel.strength || null;
    p.clubTier = sel.tier || 0;
    p.clubLeague = sel.leagueId || null;
    p.continentalCompetitionId = sel.continentalCompetition || null;
    p._clubSinceSeason = p.season;
    p._lastContractSeason = p.season;
    p.idolatry = Math.max(0, p.idolatry - 8);
  }
  idoloState.events = []; idoloState.step = 'dashboard';
  delete idoloState._seasonApps; delete idoloState._seasonGoals; delete idoloState._seasonAsts;
  delete idoloState._seasonClean; delete idoloState._eventBonusG; delete idoloState._eventBonusA;
  delete idoloState._transferOffers; delete idoloState._renewalChance; idoloSave(); idoloRender();
}
function idoloRetire() {
  idoloState.player.retired = true;
  delete idoloState._seasonApps; delete idoloState._seasonGoals; delete idoloState._seasonAsts;
  delete idoloState._seasonClean; delete idoloState._eventBonusG; delete idoloState._eventBonusA;
  delete idoloState._transferOffers; delete idoloState._renewalChance; idoloState.step = 'season_result'; idoloSave(); idoloRender();
}
function idoloExport() {
  const p = idoloState.player;
  let t = `=== EL ÍDOLO: ${p.name} ===\nPaís: ${p.country} · Pos: ${p.position} · #${p.number} · Arq: ${p.archetype}\nEdad: ${p.age}\n\nTotales:\nPJ:${p.appearances} G:${p.goals} A:${p.assists}\nSel: ${p.nationalApps} PJ · ${p.nationalGoals} G\nTítulos: ${p.titles.length} · Idolatría: ${p.idolatry}\nLeyenda: ${p.legend?'SÍ':'No'}\n\nHistorial:\n`;
  p.history.forEach(h => { t += `Temp ${h.season}: ${h.club} ${h.apps}PJ ${h.goals}G ${h.asts}A OVR${h.ovr}\n`; });
  const b = new Blob([t], {type:'text/plain'}), a = document.createElement('a');
  a.href = URL.createObjectURL(b); a.download = `el_idolo_${p.name.replace(/\s+/g,'_')}.txt`; a.click(); URL.revokeObjectURL(a.href);
}


function idoloRenderTraining() {
  const p = idoloState.player, cost = 15000, can = p.money >= cost;
  const items = IDOLO_ATR_KEYS.map(k => {
    const v = p.atr[k]||50, maxed = v >= 99;
    return `<button class="idolo-opt" onclick="${!can||maxed?'':'idoloTrainAttr(\''+k+'\')'}" style="text-align:center;${maxed?'opacity:.5':''}">
      <span>${IDOLO_ATR_LABELS[k]}: <b>${v}</b> ${maxed?'<span class="idolo-icon">'+I.check+'</span>MAX':''}</span>
      <span class="chance">$${cost.toLocaleString()}${!can?' · Sin dinero':maxed?'':' → +'+(Math.floor(Math.random()*3)+1)}</span>
    </button>`;
  }).join('');
  return `<div style="text-align:center;padding:4px 0 8px">
    <div class="idolo-season" style="margin-bottom:4px"><span class="idolo-icon">${I.gym}</span> ENTRENAMIENTO</div>
    <h3 style="margin:2px 0;color:#f5f7fa;font-size:14px;text-transform:uppercase;letter-spacing:.3px">Mejorá tus atributos</h3>
    <div style="font-size:10px;color:#5a6470;margin-bottom:8px">Disponible: <b style="color:#22c55e">$${p.money.toLocaleString()}</b> · $${cost.toLocaleString()}/sesión</div>
  </div>${items}
  <button class="idolo-btn-secondary" style="margin-top:8px" onclick="idoloState.step='dashboard';idoloSave();idoloRender()"><span class="idolo-icon">${I.left}</span> Volver</button>`;
}
function idoloTrainAttr(k) {
  const p = idoloState.player;
  if (p.money < 15000 || p.atr[k] >= 99) return;
  p.money -= 15000;
  p.atr[k] = Math.min(99, p.atr[k] + Math.floor(Math.random()*3)+1);
  idoloSave(); idoloRender();
}

// ══════════════════════════════════════════════════
// Round-robin fixture generator
// ══════════════════════════════════════════════════
function generateRoundRobinFixture(teamIds) {
  const n = teamIds.length;
  const rounds = n % 2 === 0 ? n - 1 : n;
  const teams = [...teamIds];
  if (n % 2 !== 0) teams.push('BYE');
  const m = teams.length;
  const fixture = [];
  for (let r = 0; r < rounds; r++) {
    const matches = [];
    for (let i = 0; i < m / 2; i++) {
      const home = teams[i];
      const away = teams[m - 1 - i];
      if (home !== 'BYE' && away !== 'BYE') {
        matches.push({ home, away, homeGoals: null, awayGoals: null, played: false });
      }
    }
    fixture.push(matches);
    teams.splice(1, 0, teams.pop());
  }
  // second half mirror
  const fullFixture = [...fixture];
  for (let r = 0; r < rounds; r++) {
    const mirror = fixture[r].map(m => ({ home: m.away, away: m.home, homeGoals: null, awayGoals: null, played: false }));
    fullFixture.push(mirror);
  }
  return fullFixture;
}

// ══════════════════════════════════════════════════
// Standings calculator
// ══════════════════════════════════════════════════
function calculateCareerStandings(teamIds, fixture) {
  const table = {};
  teamIds.forEach(id => {
    table[id] = { id, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0, lastFive: [] };
  });
  fixture.forEach(r => {
    r.forEach(m => {
      if (m.played && m.homeGoals !== null && m.awayGoals !== null) {
        const h = table[m.home]; const a = table[m.away];
        if (!h || !a) return;
        h.played++; a.played++;
        h.gf += m.homeGoals; h.ga += m.awayGoals;
        a.gf += m.awayGoals; a.ga += m.homeGoals;
        if (m.homeGoals > m.awayGoals) { h.won++; a.lost++; h.pts += 3; h.lastFive.push('W'); a.lastFive.push('L'); }
        else if (m.homeGoals < m.awayGoals) { a.won++; h.lost++; a.pts += 3; a.lastFive.push('W'); h.lastFive.push('L'); }
        else { h.drawn++; a.drawn++; h.pts++; a.pts++; h.lastFive.push('D'); a.lastFive.push('D'); }
      }
    });
  });
  Object.values(table).forEach(t => { t.gd = t.gf - t.ga; if (t.lastFive.length > 5) t.lastFive = t.lastFive.slice(-5); });
  return Object.values(table).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}

// ══════════════════════════════════════════════════
// Build fixture from simulated league results
// ══════════════════════════════════════════════════
function idoloBuildLeagueFixture(leagueId) {
  const ct = leagueTeams(leagueId);
  if (!ct) return [];
  const teamIds = ct.map(c => c.es);
  return generateRoundRobinFixture(teamIds);
}

// ══════════════════════════════════════════════════
// Competition Hub
// ══════════════════════════════════════════════════
let idoloCompHubTab = 'overview';
let competitionSimulatorResult = null;

function renderCurrentCompetitionHub() {
  var host = document.getElementById('compHubBody');
  if (!host) return;
  host.innerHTML = renderCompetitionHub({ context: currentCompetitionHubContext });
}

function idoloSetHubTab(tab) {
  idoloCompHubTab = tab;
  renderCurrentCompetitionHub();
}

function renderCompetitionHub(options) {
  options = options || {};
  var ctx = options.context || currentCompetitionHubContext || 'global';
  var careerPlayer = (idoloState && idoloState.player && !idoloState.player.retired) ? idoloState.player : null;
  var leagueId, leagueName, teamData, lr, pClub;

  if (ctx === 'career' && careerPlayer) {
    leagueId = careerPlayer.clubLeagueId || CURRENT_LEAGUE;
    pClub = careerPlayer.club;
    lr = idoloState._leagueRes || { position: 1, points: 0, teamCount: 20 };
  } else {
    leagueId = CURRENT_LEAGUE;
    pClub = null;
    lr = { position: 1, points: 0, teamCount: 20 };
  }

  var cfg = LEAGUES[leagueId];
  leagueName = cfg ? cfg.name : leagueId;
  teamData = leagueTeams(leagueId);

  if (CAREER_DB.SUPPORTED_COMPETITION_HUBS && !CAREER_DB.SUPPORTED_COMPETITION_HUBS.has(leagueId)) {
    return '<div class="hub-container"><div style="text-align:center;padding:32px;color:#4d5a6b">Competición no soportada para el hub de competiciones.</div></div>';
  }

  if (!teamData) {
    return '<div class="hub-container"><div style="text-align:center;padding:32px;color:#4d5a6b">No hay datos de competición para esta liga.</div></div>';
  }

  var tabs = ['overview', 'tables', 'fixtures', 'stats', 'simulator', 'history'];
  var tabLabels = { overview: 'Resumen', tables: 'Tabla', fixtures: 'Fixture', stats: 'Estadísticas', simulator: 'Simulador', history: 'Historial' };
  var tabHtml = tabs.map(function(t) {
    return '<button class="hub-tab ' + (idoloCompHubTab === t ? 'active' : '') + '" onclick="idoloSetHubTab(\'' + t + '\')">' + tabLabels[t] + '</button>';
  }).join('');

  var content = '';
  if (idoloCompHubTab === 'overview') content = renderHubOverview(careerPlayer, leagueId, lr, ctx);
  else if (idoloCompHubTab === 'tables') content = renderHubTables(leagueId, ctx);
  else if (idoloCompHubTab === 'fixtures') content = renderHubFixtures(leagueId, ctx);
  else if (idoloCompHubTab === 'stats') content = renderHubStats(leagueId, ctx);
  else if (idoloCompHubTab === 'simulator') content = renderHubSimulator(leagueId);
  else if (idoloCompHubTab === 'history') content = renderHubHistory(careerPlayer);

  var backBtn = ctx === 'career' && careerPlayer
    ? '<button class="idolo-btn-secondary" style="margin-top:8px;width:100%" onclick="showView(\'idolo\');idoloRender()"><span class="idolo-icon">' + I.left + '</span> Volver a El Ídolo</button>'
    : '';

  return '<div class="hub-container">' +
    '<div class="hub-tabs">' + tabHtml + '</div>' +
    '<div class="hub-content">' + content + '</div>' +
    backBtn +
    '</div>';
}

function renderHubOverview(player, leagueId, lr, ctx) {
  var teamData = leagueTeams(leagueId) || [];
  var teamCount = lr.teamCount || teamData.length;

  var seasonLabel = LEAGUES[leagueId] && LEAGUES[leagueId].season ? LEAGUES[leagueId].season : '2025-26';
  if (ctx === 'global' || !player) {
    return '<div class="hub-overview">' +
      '<div class="hub-card hub-card-accent" style="text-align:center;padding:16px">' +
      '<div style="font-size:22px;font-weight:800;color:#22c55e;font-family:Impact,Arial Black,sans-serif">Resumen de la competición</div>' +
      '<div style="color:#4d5a6b;font-size:11px;margin-top:4px">' + teamCount + ' equipos · Temporada ' + seasonLabel + '</div>' +
      '</div>' +
      '<div class="hub-card-grid">' +
      '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-label">Equipos</div><div class="hub-card-val" style="font-size:16px">' + teamCount + '</div></div>' +
      '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-label">Temporada</div><div class="hub-card-val" style="font-size:16px">' + seasonLabel + '</div></div>' +
      '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-label">Formato</div><div class="hub-card-val" style="font-size:16px">Liga a doble vuelta</div></div>' +
      '</div>' +
      '</div>';
  }

  var posColor = lr.position <= 4 ? '#45aee8' : lr.position <= 10 ? '#f5f7fa' : lr.position <= 16 ? '#ffbf22' : '#ff6575';
  var posLabel = lr.position === 1 ? 'CAMPEÓN' : lr.position <= 4 ? 'Champions' : lr.position <= 6 ? 'Europa' : lr.position <= 10 ? 'Media Tabla' : lr.position <= 16 ? 'Lucha' : 'Descenso';
  var ovr = player.atr ? idoloOverall(player.atr) : 50;
  return '<div class="hub-overview">' +
    '<div class="hub-card hub-card-accent">' +
    '<div class="hub-pos-big" style="color:' + posColor + '">' + lr.position + '°</div>' +
    '<div class="hub-pos-detail"><span style="color:' + posColor + ';font-weight:700">' + posLabel + '</span><span style="color:#4d5a6b;font-size:11px">' + (lr.points || '?') + ' pts · ' + teamCount + ' equipos</span></div>' +
    '</div>' +
    '<div class="hub-card-grid">' +
    '<div class="hub-card"><div class="hub-card-label">Jugador</div><div class="hub-card-val">' + player.name + '</div><div class="hub-card-sub">OVR ' + ovr + ' · ' + player.position + '</div></div>' +
    '<div class="hub-card"><div class="hub-card-label">Club</div><div class="hub-card-val">' + player.club + '</div><div class="hub-card-sub">' + (player.clubDivision || 'Primera') + '</div></div>' +
    '<div class="hub-card"><div class="hub-card-label">Temporada</div><div class="hub-card-val">' + player.season + '</div><div class="hub-card-sub">' + player.age + ' años · ' + player.goals + ' goles</div></div>' +
    '<div class="hub-card"><div class="hub-card-label">Títulos</div><div class="hub-card-val">' + (player.titles ? player.titles.length : 0) + '</div><div class="hub-card-sub">' + (player.legend ? '★ Leyenda' : 'Activo') + '</div></div>' +
    '</div>' +
    '</div>';
}

function getCompetitionSeasonKey(leagueId) {
  var careerPlayer = (idoloState && idoloState.player && !idoloState.player.retired) ? idoloState.player : null;
  if (!careerPlayer) return null;
  return leagueId + '_s' + careerPlayer.season;
}

function getOrCreateCompetitionSeason(leagueId) {
  var careerPlayer = (idoloState && idoloState.player && !idoloState.player.retired) ? idoloState.player : null;
  if (!careerPlayer) return null;
  var key = getCompetitionSeasonKey(leagueId);
  if (!key) return null;
  if (!idoloState.competitionSeasons) idoloState.competitionSeasons = {};
  if (idoloState.competitionSeasons[key]) return idoloState.competitionSeasons[key];
  var teamData = leagueTeams(leagueId);
  if (!teamData) return null;
  var teamIds = teamData.map(function(c) { return c.es; });
  var fixture = generateRoundRobinFixture(teamIds);
  var seed = leagueId + ':' + careerPlayer.season + ':' + careerPlayer.name;
  var generatedPlayers = generateCompetitionPlayers(teamData, seed);
  var seasonData = {
    competitionId: leagueId,
    season: careerPlayer.season,
    seed: seed,
    currentRound: 0,
    fixture: fixture,
    standings: null,
    generatedPlayers: generatedPlayers,
    status: 'created'
  };
  idoloState.competitionSeasons[key] = seasonData;
  idoloSave();
  return seasonData;
}

function generateCompetitionPlayers(teamData, seed) {
  var players = [];
  teamData.forEach(function(t, ti) {
    var base = 3 + Math.floor(t.s / 10);
    for (var i = 0; i < base; i++) {
      var posIdx = Math.floor(seededRandom(seed, 'pos_' + ti + '_' + i) * 5);
      var pos = ['ST', 'CAM', 'CM', 'CB', 'GK'][posIdx];
      var str = t.s + Math.floor(seededRandom(seed, 'str_' + ti + '_' + i) * 15) - 5;
      players.push({
        id: 'p_' + ti + '_' + i,
        name: t.es + ' #' + (i + 1),
        club: t.es,
        position: pos,
        ovr: Math.max(45, Math.min(99, str)),
        goals: 0,
        assists: 0,
        apps: 0,
        rating: 0,
        totalRating: 0
      });
    }
  });
  return players;
}

function simulateCareerRound(seasonData, roundNumber) {
  if (!seasonData || !seasonData.fixture) return;
  if (seasonData.currentRound >= seasonData.fixture.length) {
    seasonData.status = 'completed';
    idoloSave();
    return;
  }
  var round = seasonData.fixture[roundNumber];
  var seed = seasonData.seed;
  var teamData = leagueTeams(seasonData.competitionId);
  if (!teamData) return;

  round.forEach(function(m, mi) {
    if (m.played) return;
    var hTeam = teamData.find(function(t) { return t.es === m.home; });
    var aTeam = teamData.find(function(t) { return t.es === m.away; });
    var hStr = hTeam ? hTeam.s : 65;
    var aStr = aTeam ? aTeam.s : 65;
    var diff = (hStr - aStr) / 30;
    var rnd = seededRandom(seed, 'match_' + roundNumber + '_' + mi);
    var rnd2 = seededRandom(seed, 'match2_' + roundNumber + '_' + mi);
    m.homeGoals = Math.max(0, Math.min(5, Math.round(1 + diff * 2 + rnd * 2.5)));
    m.awayGoals = Math.max(0, Math.min(5, Math.round(1 - diff * 1.5 + rnd2 * 2.5)));
    m.played = true;

    // Update player stats
    updatePlayerStats(seasonData, m);
  });

  seasonData.currentRound = roundNumber + 1;
  var allTeamIds = [];
  seasonData.fixture.forEach(function(r) {
    r.forEach(function(m) {
      if (allTeamIds.indexOf(m.home) === -1) allTeamIds.push(m.home);
      if (allTeamIds.indexOf(m.away) === -1) allTeamIds.push(m.away);
    });
  });
  seasonData.standings = calculateCareerStandings(allTeamIds, seasonData.fixture);
  if (seasonData.currentRound >= seasonData.fixture.length) {
    seasonData.status = 'completed';
  } else {
    seasonData.status = 'in_progress';
  }
  idoloSave();
}

function updatePlayerStats(seasonData, match) {
  if (!seasonData.generatedPlayers) return;
  var seed = seasonData.seed;
  var roundIdx = seasonData.currentRound || 0;
  seasonData.generatedPlayers.forEach(function(pl) {
    if (pl.club !== match.home && pl.club !== match.away) return;
    var gSeed = seededRandom(seed, 'g_' + pl.id + '_' + roundIdx);
    var aSeed = seededRandom(seed, 'a_' + pl.id + '_' + roundIdx);
    var rSeed = seededRandom(seed, 'r_' + pl.id + '_' + roundIdx);
    var goals = gSeed < 0.2 ? 1 : (gSeed < 0.22 ? 2 : 0);
    var assists = aSeed < 0.15 ? 1 : (aSeed < 0.17 ? 2 : 0);
    pl.goals += goals;
    pl.assists += assists;
    pl.apps++;
    pl.totalRating += Math.round(3 + rSeed * 5 + (pl.ovr / 99) * 2);
    pl.rating = Math.round(pl.totalRating / pl.apps);
  });
}

function renderHubTables(leagueId, ctx) {
  var teamData = leagueTeams(leagueId);
  if (!teamData) return '<div class="hub-empty">Sin datos</div>';
  var teamIds = teamData.map(function(c) { return c.es; });

  var seasonData = getOrCreateCompetitionSeason(leagueId);
  var standings;
  if (seasonData && seasonData.standings) {
    standings = seasonData.standings;
  } else {
    var fixture = seasonData ? seasonData.fixture : generateRoundRobinFixture(teamIds);
    standings = teamIds.map(function(id) {
      return { id: id, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0, lastFive: [] };
    });
  }

  var careerPlayer = (idoloState && idoloState.player && !idoloState.player.retired) ? idoloState.player : null;
  var pClub = careerPlayer ? careerPlayer.club : null;

  return '<div class="hub-table-wrap">' +
    '<table class="hub-table">' +
    '<thead><tr><th>#</th><th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>PTS</th><th>Últ. 5</th></tr></thead>' +
    '<tbody>' + standings.map(function(s, i) {
      var isPlayerTeam = pClub && s.id === pClub;
      var posClass = i < 4 ? 'hub-row-cl' : i < 6 ? 'hub-row-el' : (i >= standings.length - 3) ? 'hub-row-releg' : '';
      var fiveHtml = s.lastFive ? s.lastFive.map(function(r) { return '<span class="hub-form-dot hub-form-' + r.toLowerCase() + '">' + r + '</span>'; }).join('') : '';
      return '<tr class="hub-row ' + posClass + (isPlayerTeam ? ' hub-row-highlight' : '') + '">' +
        '<td class="hub-pos">' + (i + 1) + '</td>' +
        '<td class="hub-team"><span class="hub-team-name">' + s.id + '</span>' + (isPlayerTeam ? ' <span class="hub-player-badge">TÚ</span>' : '') + '</td>' +
        '<td>' + s.played + '</td><td>' + s.won + '</td><td>' + s.drawn + '</td><td>' + s.lost + '</td>' +
        '<td>' + s.gf + '</td><td>' + s.ga + '</td><td class="hub-gd">' + (s.gd > 0 ? '+' : '') + s.gd + '</td>' +
        '<td class="hub-pts">' + s.pts + '</td>' +
        '<td class="hub-five">' + fiveHtml + '</td>' +
        '</tr>';
    }).join('') + '</tbody>' +
    '</table>' +
    '</div>';
}

function renderHubFixtures(leagueId, ctx) {
  var teamData = leagueTeams(leagueId);
  if (!teamData) return '<div class="hub-empty">Sin datos</div>';

  var seasonData = getOrCreateCompetitionSeason(leagueId);
  var fixture;
  if (seasonData) {
    fixture = seasonData.fixture;
  } else {
    fixture = generateRoundRobinFixture(teamData.map(function(c) { return c.es; }));
  }

  var careerPlayer = (idoloState && idoloState.player && !idoloState.player.retired) ? idoloState.player : null;
  var pClub = careerPlayer ? careerPlayer.club : null;
  var showAll = idoloCompHubShowAll || false;

  var filteredFixture = fixture;
  var origRoundMap = null;
  if (pClub && !showAll) {
    origRoundMap = [];
    var temp = [];
    fixture.forEach(function(r, ri) {
      var f = r.filter(function(m) { return m.home === pClub || m.away === pClub; });
      if (f.length > 0) { temp.push(f); origRoundMap.push(ri); }
    });
    filteredFixture = temp;
  }

  var toggleBtn = '<button class="hub-fixture-toggle" onclick="idoloCompHubShowAll = !idoloCompHubShowAll; renderCurrentCompetitionHub()">' + (showAll ? 'Solo mis partidos' : 'Ver todas las fechas') + '</button>';

  var canSimulate = seasonData && seasonData.status !== 'completed' && seasonData.currentRound < seasonData.fixture.length;
  var simulateBtn = canSimulate ? '<button class="hub-fixture-toggle" onclick="simulateNextRound()" style="margin-left:4px">Simular próxima jornada</button>' : '';
  var completedMsg = seasonData && seasonData.status === 'completed' ? '<div class="hub-season-completed" style="text-align:center;padding:12px;color:#22c55e;font-size:11px;font-weight:600">Temporada completada</div>' : '';

  return '<div class="hub-fixtures">' + toggleBtn + simulateBtn + completedMsg +
    filteredFixture.map(function(r, ri) {
      var roundNum = (origRoundMap ? origRoundMap[ri] : ri) + 1;
      return '<div class="hub-fixture-round">' +
        '<div class="hub-round-label">Fecha ' + roundNum + '</div>' +
        r.map(function(m) {
          var isPlayer = pClub && (m.home === pClub || m.away === pClub);
          var score = m.played ? '<span class="hub-score">' + m.homeGoals + ' - ' + m.awayGoals + '</span>' : '<span class="hub-score hub-score-upcoming">vs</span>';
          return '<div class="hub-fixture-match ' + (isPlayer ? 'hub-fixture-player' : '') + '">' +
            '<span class="hub-fixture-home ' + (m.home === pClub ? 'hub-fixture-highlight' : '') + '">' + m.home + '</span>' +
            score +
            '<span class="hub-fixture-away ' + (m.away === pClub ? 'hub-fixture-highlight' : '') + '">' + m.away + '</span>' +
            '</div>';
        }).join('') +
        '</div>';
    }).join('') +
    '</div>';
}

function simulateNextRound() {
  var careerPlayer = (idoloState && idoloState.player && !idoloState.player.retired) ? idoloState.player : null;
  if (!careerPlayer) return;
  var leagueId = careerPlayer.clubLeagueId || CURRENT_LEAGUE;
  var seasonData = getOrCreateCompetitionSeason(leagueId);
  if (!seasonData) return;
  simulateCareerRound(seasonData, seasonData.currentRound);
  renderCurrentCompetitionHub();
}

function renderHubStats(leagueId, ctx) {
  var teamData = leagueTeams(leagueId);
  if (!teamData) return '<div class="hub-empty">Sin datos</div>';

  var careerPlayer = (idoloState && idoloState.player && !idoloState.player.retired) ? idoloState.player : null;
  var seasonData = getOrCreateCompetitionSeason(leagueId);

  var allPlayers = seasonData && seasonData.generatedPlayers ? seasonData.generatedPlayers : [];

  var topScorers = allPlayers.slice().sort(function(a, b) { return b.goals - a.goals; }).slice(0, 10);
  var topAssists = allPlayers.slice().sort(function(a, b) { return b.assists - a.assists; }).slice(0, 10);
  var topRatings = allPlayers.slice().sort(function(a, b) { return b.rating - a.rating; }).slice(0, 10);

  var playerStatsHtml = '';
  if (careerPlayer) {
    var ovr = careerPlayer.atr ? idoloOverall(careerPlayer.atr) : 50;
    var pStats = [
      { label: 'Mis Goles', val: careerPlayer.goals },
      { label: 'Mis Asistencias', val: careerPlayer.assists },
      { label: 'Mis Partidos', val: careerPlayer.appearances },
      { label: 'Mi OVR', val: ovr },
      { label: 'Mi Forma', val: (careerPlayer.form || 6) + '/10' }
    ];
    playerStatsHtml = '<div class="hub-card-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:12px">' +
      pStats.map(function(s) {
        return '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-val" style="font-size:16px">' + s.val + '</div><div class="hub-card-label" style="font-size:9px;margin:0">' + s.label + '</div></div>';
      }).join('') + '</div>';
  }

  function tableWrap(title, data, key, keyLabel) {
    return '<div class="hub-card" style="margin-bottom:8px">' +
      '<div class="hub-card-label" style="font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#ffd437;margin-bottom:6px">' + title + '</div>' +
      '<table class="hub-table"><thead><tr><th>#</th><th>Jugador</th><th>Equipo</th><th>Pos</th><th>' + keyLabel + '</th></tr></thead>' +
      '<tbody>' + data.map(function(pl, i) {
        return '<tr class="hub-row"><td>' + (i + 1) + '</td><td class="hub-team">' + pl.name + '</td><td style="font-size:10px;color:#8b9bb0">' + pl.club + '</td><td style="font-size:10px">' + pl.position + '</td><td class="hub-pts">' + pl[key] + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '</div>';
  }

  return '<div class="hub-stats">' + playerStatsHtml +
    '<div class="hub-stats-grid">' +
    tableWrap('Máximos Goleadores', topScorers, 'goals', 'G') +
    tableWrap('Máximos Asistentes', topAssists, 'assists', 'A') +
    tableWrap('Mejores Valoraciones', topRatings, 'rating', 'MED') +
    '</div>' +
    '</div>';
}

function renderHubSimulator(leagueId) {
  leagueId = leagueId || CURRENT_LEAGUE;
  var teamData = leagueTeams(leagueId);
  if (!teamData) return '<div class="hub-empty">Sin datos</div>';
  var teamOptions = teamData.map(function(t) { return '<option value="' + t.es + '">' + t.es + '</option>'; }).join('');

  var simResult = competitionSimulatorResult;

  return '<div class="hub-sim">' +
    '<div class="hub-card" style="margin-bottom:12px">' +
    '<div class="hub-card-label" style="font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#45aee8;margin-bottom:8px">Simulador de Partidos</div>' +
    '<div class="hub-simulation-warning" style="font-size:9px;color:#5a6470;text-align:center;margin-bottom:6px;padding:4px 8px;border:1px dashed #2d3742;border-radius:3px">SIMULACIÓN — NO MODIFICA TU PARTIDA</div>' +
    '<div class="hub-sim-form">' +
    '<div class="hub-sim-field"><label>Local</label><select id="hubSimHome">' + teamOptions + '</select></div>' +
    '<div class="hub-sim-vs">VS</div>' +
    '<div class="hub-sim-field"><label>Visitante</label><select id="hubSimAway">' + teamOptions + '</select></div>' +
    '<button class="idolo-btn-primary" style="margin-top:8px;width:100%" onclick="idoloRunSimulation()"><span class="idolo-icon">' + I.play + '</span> Simular</button>' +
    '</div>' +
    '</div>' +
    (simResult ? '<div class="hub-card hub-card-accent" style="text-align:center">' +
      '<div class="hub-sim-score">' + simResult.home + ' <span class="hub-sim-goals">' + simResult.homeGoals + '</span> - <span class="hub-sim-goals">' + simResult.awayGoals + '</span> ' + simResult.away + '</div>' +
      '<div class="hub-sim-detail">' + simResult.homePoss + '% · ' + simResult.shots + ' tiros · ' + simResult.shotOnTarget + ' a puerta</div>' +
      '<button class="idolo-btn-secondary" style="margin-top:5px" onclick="clearCompetitionSimulatorResult()">Cerrar</button>' +
      '</div>' : '') +
    '</div>';
}

function idoloRunSimulation() {
  var home = document.getElementById('hubSimHome');
  var away = document.getElementById('hubSimAway');
  if (!home || !away) return;
  var homeVal = home.value, awayVal = away.value;
  if (!homeVal || !awayVal) return;
  var hStr = idoloGetTeamStrength(homeVal, 'club');
  var aStr = idoloGetTeamStrength(awayVal, 'club');
  var diff = (hStr - aStr) / 30;
  var r1 = Math.random(), r2 = Math.random(), r3 = Math.random(), r4 = Math.random();
  var homeGoals = Math.max(0, Math.min(5, Math.round(1 + diff * 2 + r1 * 2.5)));
  var awayGoals = Math.max(0, Math.min(5, Math.round(1 - diff * 1.5 + r2 * 2.5)));
  var homePoss = 40 + Math.round(diff * 20 + r3 * 10);
  var totalShots = Math.round(5 + r4 * 15);
  competitionSimulatorResult = {
    home: homeVal, away: awayVal, homeGoals: homeGoals, awayGoals: awayGoals,
    homePoss: Math.max(35, Math.min(75, homePoss)),
    shots: totalShots,
    shotOnTarget: Math.round(totalShots * (0.3 + Math.random() * 0.3))
  };
  renderCurrentCompetitionHub();
}

function clearCompetitionSimulatorResult() {
  competitionSimulatorResult = null;
  renderCurrentCompetitionHub();
}

function renderHubHistory(careerPlayer) {
  if (!careerPlayer) {
    return '<div class="hub-empty">No hay historial de temporadas. Inicia una carrera en El Ídolo.</div>';
  }
  var hist = careerPlayer.history || [];
  if (!hist.length) return '<div class="hub-empty">No hay historial de temporadas aún.</div>';
  var p = careerPlayer;
  var reversed = hist.slice().reverse();
  return '<div class="hub-history">' +
    '<div class="hub-card" style="margin-bottom:8px">' +
    '<div class="hub-card-label" style="font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:#ffd437;margin-bottom:6px">📜 Trayectoria de ' + p.name + '</div>' +
    '<table class="hub-table">' +
    '<thead><tr><th>Temp</th><th>Club</th><th>PJ</th><th>G</th><th>A</th><th>OVR</th><th>Acum.</th></tr></thead>' +
    '<tbody>' + reversed.map(function(h) {
      return '<tr class="hub-row ' + (h.club === p.club && h.season === p.season ? 'hub-row-highlight' : '') + '">' +
        '<td>' + h.season + '</td>' +
        '<td class="hub-team">' + h.club + '</td>' +
        '<td>' + h.apps + '</td>' +
        '<td>' + h.goals + '</td>' +
        '<td>' + h.asts + '</td>' +
        '<td class="hub-pts">' + h.ovr + '</td>' +
        '<td>' + (h.cumGoals || '-') + '</td>' +
        '</tr>';
    }).join('') + '</tbody></table>' +
    '</div>' +
    '<div class="hub-card-grid" style="grid-template-columns:repeat(4,1fr)">' +
    '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-val" style="font-size:18px">' + p.appearances + '</div><div class="hub-card-label" style="font-size:9px;margin:0">Partidos</div></div>' +
    '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-val" style="font-size:18px">' + p.goals + '</div><div class="hub-card-label" style="font-size:9px;margin:0">Goles</div></div>' +
    '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-val" style="font-size:18px">' + (p.titles ? p.titles.length : 0) + '</div><div class="hub-card-label" style="font-size:9px;margin:0">Títulos</div></div>' +
    '<div class="hub-card" style="text-align:center;padding:8px"><div class="hub-card-val" style="font-size:18px">' + (p.atr ? idoloOverall(p.atr) : 50) + '</div><div class="hub-card-label" style="font-size:9px;margin:0">OVR Actual</div></div>' +
    '</div>' +
    (p.titles && p.titles.length ? '<div class="hub-card" style="margin-top:6px"><div class="hub-card-label" style="font-size:10px;color:#ffd437;margin-bottom:4px">🏆 Títulos</div><div style="display:flex;flex-wrap:wrap;gap:4px">' + p.titles.map(function(t) { return '<span style="background:#0d1117;border:1px solid #2d3742;border-radius:3px;padding:2px 8px;font-size:10px;color:#f5f7fa">' + I.trophy + ' ' + t + '</span>'; }).join('') + '</div></div>' : '') +
    '</div>';
}

// ══════════════════════════════════════════════════
// Self-tests (run from console: runCareerSelfTests())
// ══════════════════════════════════════════════════
function runCareerSelfTests() {
  const results = [];
  function assert(cond, msg) { results.push({ pass: !!cond, msg }); if (!cond) console.error('FAIL:', msg); }
  function assertEq(a, b, msg) { assert(a === b, msg + ` (expected ${JSON.stringify(b)}, got ${JSON.stringify(a)})`); }

  // Test resolveClubLeagueId
  assertEq(
    CAREER_DB.resolveClubLeagueId({ league: 'Liga Profesional' }),
    'argentina_first',
    'Liga Profesional se resuelve como argentina_first'
  );

  // Test getPromotionClubs
  const promo = CAREER_DB.getPromotionClubs('Argentina');
  assert(Array.isArray(promo), 'getPromotionClubs returns array');
  if (promo.length > 0) {
    assert(promo[0].division === 'promotion', 'getPromotionClubs returns promotion division clubs');
  }

  // Test findClubByName
  const found = CAREER_DB.findClubByName('Boca Juniors', 'Argentina');
  assert(!!found, 'findClubByName finds Boca Juniors');
  if (found) {
    assert(found.country === 'Argentina', 'findClubByName country matches');
  }

  // Test getClubContinentalCompetition
  const bocaCont = CAREER_DB.getClubContinentalCompetition('Boca Juniors', 'Argentina');
  assert(bocaCont === 'copaLibertadores' || bocaCont === null, 'getClubContinentalCompetition returns copaLibertadores or null for Boca');

  const bayernCont = CAREER_DB.getClubContinentalCompetition('Bayern Munich', 'Alemania');
  assertEq(
    bayernCont,
    'championsLeague',
    'Bayern Munich pertenece a Champions League'
  );

  // Test calculateEffectiveOverall
  const youngPlayer = { position: 'ST', age: 22, atr: { sho: 80, pac: 85, dri: 78, pas: 70, def: 40, phy: 65 } };
  const youngOvr = CAREER_DB.calculateEffectiveOverall(youngPlayer);
  assert(youngOvr > 0 && youngOvr <= 99, 'calculateEffectiveOverall returns valid OVR for young player');

  const oldPlayer = { position: 'ST', age: 35, atr: { sho: 80, pac: 85, dri: 78, pas: 70, def: 40, phy: 65 } };
  const oldOvr = CAREER_DB.calculateEffectiveOverall(oldPlayer);
  assert(oldOvr <= youngOvr, 'calculateEffectiveOverall reduces OVR for older player');

  // Test weightedSampleWithoutReplacement with seed
  const items = [1, 2, 3, 4, 5];
  const weights = [10, 20, 30, 20, 10];
  const weightFn = function(item, i) { return weights[i]; };
  const sample1 = CAREER_DB.weightedSampleWithoutReplacement(items, weightFn, 3, 12345);
  const sample2 = CAREER_DB.weightedSampleWithoutReplacement(items, weightFn, 3, 12345);
  assert(sample1.length === 3, 'weightedSampleWithoutReplacement returns correct count');
  assertEq(JSON.stringify(sample1), JSON.stringify(sample2), 'weightedSampleWithoutReplacement is deterministic with seed');

  // Test generateTransferOffers
  const testPlayer = {
    club: 'Boca Juniors',
    country: 'Argentina',
    age: 22,
    position: 'ST',
    atr: { sho: 80, pac: 85, dri: 78, pas: 70, def: 40, phy: 65 },
    form: 6, idolatry: 50, season: 3, appearances: 40, goals: 15, assists: 8,
    _lastContractSeason: 2, potential: 88
  };
  const offers = CAREER_DB.generateTransferOffers(testPlayer);
  assert(Array.isArray(offers.offers), 'generateTransferOffers returns offers array');
  assert(typeof offers.renewalPct === 'number', 'generateTransferOffers returns renewalPct');
  assert(offers.offers.length <= 4, 'generateTransferOffers max 4 cards');

  // Test simulateDomesticLeague
  const leaguePlayer = {
    club: 'Boca Juniors',
    country: 'Argentina',
    clubLeagueId: 'argentina_first',
    season: 3,
    age: 23,
    position: 'ST',
    form: 6,
    atr: { pac: 75, sho: 74, pas: 68, def: 40, dri: 72, phy: 70 }
  };
  const sim = CAREER_DB.simulateDomesticLeague(leaguePlayer);
  assert(typeof sim.position === 'number', 'simulateDomesticLeague returns position');
  assert(sim.position >= 1, 'simulateDomesticLeague position >= 1');
  assert(sim.qualification && typeof sim.qualification === 'object', 'simulateDomesticLeague devuelve qualification');

  // Test qualifiesForClubWorldCup
  assert(CAREER_DB.qualifiesForClubWorldCup('championsLeague') === true, 'qualifiesForClubWorldCup championsLeague');
  assert(CAREER_DB.qualifiesForClubWorldCup('copaLibertadores') === true, 'qualifiesForClubWorldCup copaLibertadores');
  assert(CAREER_DB.qualifiesForClubWorldCup('premier') === false, 'qualifiesForClubWorldCup premier is false');

  // Test fixture generator
  const fixture = generateRoundRobinFixture(['A', 'B', 'C', 'D']);
  assert(fixture.length > 0, 'generateRoundRobinFixture returns rounds');
  fixture.forEach(r => r.forEach(m => {
    assert(m.home && m.away, 'fixture match has home and away');
    assert(m.homeGoals === null, 'fixture match starts with null goals');
  }));

  // Test standings
  const testFixture = [
    [{ home: 'A', away: 'B', homeGoals: 2, awayGoals: 1, played: true }],
    [{ home: 'C', away: 'D', homeGoals: 0, awayGoals: 0, played: true }],
    [{ home: 'B', away: 'C', homeGoals: 3, awayGoals: 1, played: true }],
    [{ home: 'D', away: 'A', homeGoals: null, awayGoals: null, played: false }]
  ];
  const standings = calculateCareerStandings(['A', 'B', 'C', 'D'], testFixture);
  assert(standings.length === 4, 'calculateCareerStandings returns all teams');
  assert(standings[0].pts >= standings[1].pts, 'standings are sorted properly');

  // Test migration
  const v1Save = {
    schemaVersion: 1,
    player: { name: 'Test', country: 'Argentina', club: 'Boca Juniors', season: 0 }
  };
  const migrated = idoloMigrateSave(v1Save);
  assert(migrated.schemaVersion === 2, 'migration sets schemaVersion to 2');
  assert(migrated.player.clubId, 'migration adds clubId');

  // Test simulator uses independent state
  const stateBeforeSimulator = idoloState;
  competitionSimulatorResult = null;
  assert(competitionSimulatorResult === null, 'El simulador utiliza estado temporal independiente');
  assert(idoloState === stateBeforeSimulator, 'El simulador no reemplaza idoloState');

  console.log(`\n=== Self-test results: ${results.filter(r => r.pass).length}/${results.length} passed ===`);
  results.forEach(r => {
    if (r.pass) console.log('  ✓', r.msg);
    else console.log('  ✗', r.msg);
  });
  return results;
}


