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

