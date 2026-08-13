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

