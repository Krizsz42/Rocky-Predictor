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

