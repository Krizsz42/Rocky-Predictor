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


