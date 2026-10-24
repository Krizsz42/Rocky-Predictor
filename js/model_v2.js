/* ═══════════════════════════════════════════════════════════════════════════
   Rocky Predictor · Modelo v2 (Fase 0 + Fase 1 + Fase 2)
   ---------------------------------------------------------------------------
   Este archivo se carga SOLO desde index_deepseek.html, después de
   js/inline_scripts.js. No modifica index.html ni el motor original.

   Fase 0:
   - IndexedDB con stores separados: prematch_predictions, results,
     user_predictions y backtest_predictions.
   - Predicciones pre-partido ocultas: se congelan al ver el calendario para
     partidos futuros y nunca se crean después del kickoff.
   - Evaluación de esas predicciones solo por espnId y solo si
     createdAt < kickoff. Si no existe una predicción congelada, el partido
     queda fuera de la métrica (missing), no se inventa una post-hoc.
   - Las métricas de aprendizaje del historial usan SOLO predicciones del
     usuario. Los resultados importados se usan para perfiles de equipo, no
     para inflar la precisión.

   Fase 1:
   - Ventaja de local por liga en los lambdas (y en la expectativa de forma).
   - liveScoreProbs usa la matriz Dixon-Coles real (simulate) en vez de una
     Poisson independiente que ignoraba rho.
   - nextGoalProbs usa los lambdas efectivos (con ajuste xG), no los originales.

   Fase 2:
   - Modelos separados de c�rners, tarjetas y remates, con priors por liga y
     perfiles reales de equipo (a favor / en contra) cuando hay muestra.
   - Los tres mercados se congelan en la predicci�n pre-partido y se eval�an
     con datos reales de ESPN (MAE y acierto de l�nea), sin mezclarlos con
     las m�tricas 1X2 del usuario.
   - El predictor visible usa el mismo plan de remates que la predicci�n
     congelada; no hay dos versiones del modelo para el mismo partido.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const RP_VERSION = 'v2-phase2';
  const RP_DB_NAME = 'rocky_predictor_v2';
  const RP_DB_VERSION = 1;
  const RP_DB_STORES = {
    prematch_predictions: 'prematch_predictions',
    results: 'results',
    user_predictions: 'user_predictions',
    backtest_predictions: 'backtest_predictions'
  };

  /* ───────────────────────────────────────────────────────────────────────
     1. VENTAJA DE LOCAL
     Valor = diferencia esperada de goles entre local y visitante.
     Se reparte +mitad / -mitad para conservar el total del partido.
     ─────────────────────────────────────────────────────────────────────── */
  const RP_HOME_ADV = {
    worldcup: 0.22,
    premier: 0.30,
    laliga: 0.32,
    bundes: 0.34,
    seriea: 0.30,
    ligue1: 0.28,
    champions: 0.24,
    libertadores: 0.30,
    sudamericana: 0.28,
    liga_arg: 0.30,
    liga_chil: 0.28,
    efl_cup: 0.24,
    nations: 0.20
  };

  function rpHomeAdvForLeague(league) {
    const v = RP_HOME_ADV[league];
    return typeof v === 'number' ? v : 0.28;
  }

  function rpBaseLambdas(sa, sb) {
    const dd = (sa - sb) / 100;
    return [
      clamp(BASE * Math.exp(KK * dd), 0.25, 3.2),
      clamp(BASE * Math.exp(-KK * dd), 0.25, 3.2)
    ];
  }

  function rpLambdasForLeague(sa, sb, league) {
    const base = rpBaseLambdas(sa, sb);
    const half = rpHomeAdvForLeague(league) / 2;
    return [
      clamp(base[0] + half, 0.25, 3.2),
      clamp(base[1] - half, 0.25, 3.2)
    ];
  }

  // Reemplaza el autoLambdas original. Todos los llamados por nombre dentro
  // del motor resuelven esta versión global. El override permite que una
  // importación de otra liga use SU ventaja de local aunque el usuario esté
  // viendo otra competición.
  let _rpLeagueOverride = null;
  window.autoLambdas = function (sa, sb) {
    return rpLambdasForLeague(sa, sb, _rpLeagueOverride || CURRENT_LEAGUE);
  };

  // El cuadro de eliminatorias es neutral: no debe heredar la ventaja de
  // local que autoLambdas aplica a los partidos con local/visitante.
  window.advProb = function (nameA, nameB, cache) {
    cache = cache || {};
    const key = nameA + '|' + nameB;
    if (cache[key] != null) return cache[key];
    const sa = ratingOf(nameA), sb = ratingOf(nameB);
    let p;
    if (sa == null && sb == null) p = 0.5;
    else if (sa == null) p = 0;
    else if (sb == null) p = 1;
    else {
      let lr = rpBaseLambdas(sa, sb);
      lr = applyLearning(lr[0], lr[1]);
      const r = autoRho(lr[0] + lr[1]);
      p = knockoutAdvance(lr[0], lr[1], r, simulate(lr[0], lr[1], r)).advH;
    }
    cache[key] = p;
    return p;
  };

  /* =========================================================================
     FASE 2: CORNERS, TARJETAS Y REMATES
     Cada mercado tiene su propio modelo. Los priors por liga solo se usan
     como punto de partida; cuando hay muestra real de los equipos, el perfil
     a favor/en contra pesa m�s que el prior. Ning�n mercado se deriva de una
     sola probabilidad de goles.
     ========================================================================= */
  const RP_STYLE = {
    worldcup:      { corners: 9.8,  yellow: 3.8, red: 0.11, shots: 24.0 },
    premier:       { corners: 10.2, yellow: 3.9, red: 0.12, shots: 25.0 },
    laliga:        { corners: 9.4,  yellow: 4.8, red: 0.16, shots: 23.5 },
    bundes:        { corners: 10.0, yellow: 4.1, red: 0.12, shots: 25.5 },
    seriea:        { corners: 10.4, yellow: 4.9, red: 0.15, shots: 24.5 },
    ligue1:        { corners: 9.6,  yellow: 4.3, red: 0.14, shots: 23.8 },
    champions:     { corners: 9.8,  yellow: 4.0, red: 0.12, shots: 24.0 },
    libertadores:  { corners: 9.4,  yellow: 5.2, red: 0.18, shots: 22.5 },
    sudamericana:  { corners: 9.2,  yellow: 5.0, red: 0.18, shots: 22.0 },
    liga_arg:      { corners: 9.0,  yellow: 5.1, red: 0.17, shots: 22.0 },
    liga_chil:     { corners: 9.2,  yellow: 4.9, red: 0.16, shots: 22.5 },
    efl_cup:       { corners: 10.0, yellow: 4.0, red: 0.12, shots: 24.5 },
    nations:       { corners: 9.8,  yellow: 3.8, red: 0.10, shots: 24.0 },
    default:       { corners: 9.8,  yellow: 4.4, red: 0.14, shots: 24.0 }
  };

  function rpStyle(league) {
    return RP_STYLE[league] || RP_STYLE.default;
  }

  let TEAM_SHOTS = {};
  let TEAM_CARDS = {};
  const RP_SHOT_MIN = 3;
  const RP_CARD_MIN = 3;

  function rpProfile(store, name, min) {
    const p = store && store[name];
    return p && p.n >= min ? p : null;
  }

  // P(mercado > l�nea) con una Poisson. Para 9.5 se suma hasta 9.
  function rpOver(mean, line) {
    if (!(mean > 0)) return 0;
    const k = Math.floor(line);
    let cdf = 0;
    for (let i = 0; i <= k; i++) cdf += poissonPmf(i, mean);
    return clamp(1 - cdf, 0, 1);
  }

  function rpShotsBaseline(lam, poss, league) {
    const style = rpStyle(league);
    const p = clamp(Number.isFinite(Number(poss)) ? Number(poss) : 0.5, 0, 1);
    const conv = clamp(0.13 - 0.05 * p, 0.085, 0.15);
    const raw = Number(lam) / conv;
    return clamp(0.75 * raw + 0.25 * (style.shots / 2 + 0.5), 3.5, 27);
  }

  function rpPredictShots(home, away, lamH, lamA, possA, league) {
    const lg = league || CURRENT_LEAGUE;
    const style = rpStyle(lg);
    const ph = clamp(Number.isFinite(Number(possA)) ? Number(possA) : 0.5, 0.2, 0.8);
    let shH = rpShotsBaseline(lamH, ph, lg);
    let shA = rpShotsBaseline(lamA, 1 - ph, lg);
    const profH = rpProfile(TEAM_SHOTS, home, RP_SHOT_MIN);
    const profA = rpProfile(TEAM_SHOTS, away, RP_SHOT_MIN);

    if (profH && profA) {
      shH = 0.50 * shH + 0.30 * profH.f + 0.20 * profA.a;
      shA = 0.50 * shA + 0.30 * profA.f + 0.20 * profH.a;
    } else if (profH) {
      shH = 0.60 * shH + 0.40 * profH.f;
      shA = 0.60 * shA + 0.40 * profH.a;
    } else if (profA) {
      shH = 0.60 * shH + 0.40 * profA.a;
      shA = 0.60 * shA + 0.40 * profA.f;
    }

    shH = 0.82 * shH + 0.18 * (style.shots / 2 + 0.5);
    shA = 0.82 * shA + 0.18 * (style.shots / 2 + 0.5);
    const edge = 0.35 + 0.90 * rpHomeAdvForLeague(lg);
    shH = clamp(shH + edge, 3.5, 27);
    shA = clamp(shA - edge, 3.5, 27);

    let sotH = shH * 0.33;
    let sotA = shA * 0.33;
    if (profH && profH.sotN && profH.f > 0) sotH = shH * clamp(profH.sotF / profH.f, 0.20, 0.55);
    if (profA && profA.sotN && profA.f > 0) sotA = shA * clamp(profA.sotF / profA.f, 0.20, 0.55);

    const total = shH + shA;
    return {
      home: shH,
      away: shA,
      total,
      sotHome: sotH,
      sotAway: sotA,
      sotTotal: sotH + sotA,
      pOver245: rpOver(total, 24.5)
    };
  }

  function rpPredictCorners(home, away, lamH, lamA, possA, league) {
    const lg = league || CURRENT_LEAGUE;
    const style = rpStyle(lg);
    const shots = rpPredictShots(home, away, lamH, lamA, possA, lg);
    let cH = teamCorners(shots.home);
    let cA = teamCorners(shots.away);
    const profH = rpProfile(TEAM_CORNERS, home, 3);
    const profA = rpProfile(TEAM_CORNERS, away, 3);

    if (profH && profA) {
      cH = 0.50 * cH + 0.30 * profH.f + 0.20 * profA.a;
      cA = 0.50 * cA + 0.30 * profA.f + 0.20 * profH.a;
    } else if (profH) {
      cH = 0.60 * cH + 0.40 * profH.f;
      cA = 0.60 * cA + 0.40 * profH.a;
    } else if (profA) {
      cH = 0.60 * cH + 0.40 * profA.a;
      cA = 0.60 * cA + 0.40 * profA.f;
    }

    cH = 0.82 * cH + 0.18 * (style.corners / 2 + 0.2);
    cA = 0.82 * cA + 0.18 * (style.corners / 2 + 0.2);
    const edge = 0.12 + 0.30 * rpHomeAdvForLeague(lg);
    cH = clamp(cH + edge, 1.5, 13);
    cA = clamp(cA - edge, 1.5, 13);
    const total = cH + cA;
    return {
      home: cH,
      away: cA,
      total,
      pOver85: rpOver(total, 8.5),
      pOver95: rpOver(total, 9.5),
      pOver105: rpOver(total, 10.5),
      pOver115: rpOver(total, 11.5)
    };
  }

  function rpPredictCards(home, away, lamH, lamA, league) {
    const lg = league || CURRENT_LEAGUE;
    const style = rpStyle(lg);
    const profH = rpProfile(TEAM_CARDS, home, RP_CARD_MIN);
    const profA = rpProfile(TEAM_CARDS, away, RP_CARD_MIN);
    let yH = style.yellow / 2;
    let yA = style.yellow / 2;

    if (profH && profA) {
      yH = 0.50 * yH + 0.30 * profH.yf + 0.20 * profA.ya;
      yA = 0.50 * yA + 0.30 * profA.yf + 0.20 * profH.ya;
    } else if (profH) {
      yH = 0.60 * yH + 0.40 * profH.yf;
      yA = 0.60 * yA + 0.40 * profH.ya;
    } else if (profA) {
      yH = 0.60 * yH + 0.40 * profA.ya;
      yA = 0.60 * yA + 0.40 * profA.yf;
    }

    const intensity = clamp(0.88 + 0.06 * ((Number(lamH) || 0) + (Number(lamA) || 0)), 0.88, 1.18);
    yH = clamp(yH * intensity * 0.96, 1.2, 6.5);
    yA = clamp(yA * intensity * 1.04, 1.2, 6.5);

    let rH = style.red / 2;
    let rA = style.red / 2;
    if (profH && profA) {
      rH = 0.50 * rH + 0.30 * profH.rf + 0.20 * profA.ra;
      rA = 0.50 * rA + 0.30 * profA.rf + 0.20 * profH.ra;
    } else if (profH) {
      rH = 0.60 * rH + 0.40 * profH.rf;
      rA = 0.60 * rA + 0.40 * profH.ra;
    } else if (profA) {
      rH = 0.60 * rH + 0.40 * profA.ra;
      rA = 0.60 * rA + 0.40 * profA.rf;
    }
    rH = clamp(rH, 0.02, 0.60);
    rA = clamp(rA, 0.02, 0.60);

    const yellowTotal = yH + yA;
    const redTotal = rH + rA;
    return {
      yellowHome: yH,
      yellowAway: yA,
      yellowTotal,
      redHome: rH,
      redAway: rA,
      redTotal,
      pRed: 1 - Math.exp(-redTotal),
      pOver25: rpOver(yellowTotal, 2.5),
      pOver35: rpOver(yellowTotal, 3.5),
      pOver45: rpOver(yellowTotal, 4.5),
      pOver55: rpOver(yellowTotal, 5.5)
    };
  }

  // Reconstruye perfiles con TODOS los resultados reales disponibles. Esto es
  // entrenamiento, no evaluaci�n: no infla la precisi�n del usuario.
  function rpRebuildProfiles() {
    const hist = Array.isArray(HIST) ? HIST : [];
    const rawC = {}, rawS = {}, rawK = {};

    hist.forEach(it => {
      const s = it && it.actualStats;
      if (!s || !it.A || !it.B) return;

      if (s.cornersA != null && s.cornersB != null) {
        const a = rawC[it.A] || (rawC[it.A] = { n: 0, f: 0, a: 0 });
        const b = rawC[it.B] || (rawC[it.B] = { n: 0, f: 0, a: 0 });
        a.n++; a.f += Number(s.cornersA) || 0; a.a += Number(s.cornersB) || 0;
        b.n++; b.f += Number(s.cornersB) || 0; b.a += Number(s.cornersA) || 0;
      }

      if (s.shotsA != null && s.shotsB != null) {
        const a = rawS[it.A] || (rawS[it.A] = { n: 0, f: 0, a: 0, sotF: 0, sotA: 0, sotN: 0 });
        const b = rawS[it.B] || (rawS[it.B] = { n: 0, f: 0, a: 0, sotF: 0, sotA: 0, sotN: 0 });
        a.n++; a.f += Number(s.shotsA) || 0; a.a += Number(s.shotsB) || 0;
        b.n++; b.f += Number(s.shotsB) || 0; b.a += Number(s.shotsA) || 0;
        if (s.sotA != null && s.sotB != null) {
          a.sotN++; a.sotF += Number(s.sotA) || 0; a.sotA += Number(s.sotB) || 0;
          b.sotN++; b.sotF += Number(s.sotB) || 0; b.sotA += Number(s.sotA) || 0;
        }
      }

      if (s.yellowA != null && s.yellowB != null) {
        const a = rawK[it.A] || (rawK[it.A] = { n: 0, yf: 0, ya: 0, rf: 0, ra: 0 });
        const b = rawK[it.B] || (rawK[it.B] = { n: 0, yf: 0, ya: 0, rf: 0, ra: 0 });
        a.n++; a.yf += Number(s.yellowA) || 0; a.ya += Number(s.yellowB) || 0;
        b.n++; b.yf += Number(s.yellowB) || 0; b.ya += Number(s.yellowA) || 0;
        a.rf += Number(s.redA) || 0; a.ra += Number(s.redB) || 0;
        b.rf += Number(s.redB) || 0; b.ra += Number(s.redA) || 0;
      }
    });

    const outC = {}, outS = {}, outK = {};
    Object.keys(rawC).forEach(k => {
      const p = rawC[k];
      outC[k] = { n: p.n, f: p.f / p.n, a: p.a / p.n };
    });
    Object.keys(rawS).forEach(k => {
      const p = rawS[k];
      outS[k] = {
        n: p.n,
        f: p.f / p.n,
        a: p.a / p.n,
        sotF: p.sotN ? p.sotF / p.sotN : null,
        sotA: p.sotN ? p.sotA / p.sotN : null,
        sotN: p.sotN
      };
    });
    Object.keys(rawK).forEach(k => {
      const p = rawK[k];
      outK[k] = { n: p.n, yf: p.yf / p.n, ya: p.ya / p.n, rf: p.rf / p.n, ra: p.ra / p.n };
    });

    if (typeof TEAM_CORNERS === 'object' && TEAM_CORNERS) {
      Object.keys(TEAM_CORNERS).forEach(k => { delete TEAM_CORNERS[k]; });
      Object.assign(TEAM_CORNERS, outC);
    }
    TEAM_SHOTS = outS;
    TEAM_CARDS = outK;
  }

  /* ───────────────────────────────────────────────────────────────────────
     2. FORMA: misma lógica original, pero la expectativa neutral usa
     rpBaseLambdas y luego aplica la ventaja de local del partido.
     ─────────────────────────────────────────────────────────────────────── */
  window.loadTeamForm = async function (esName, force) {
    const ex = TEAM_FORM[esName];
    if (!force && ex && ex.n > 0 && ex.ts && (Date.now() - ex.ts < 6 * 3600e3)) return ex;
    if (_formBusy[esName]) return _formBusy[esName];
    const id = espnTeamId(esName);
    if (!id) return null;
    const league = CURRENT_LEAGUE;
    const url = 'https://site.api.espn.com/apis/site/v2/sports/soccer/' + LEAGUES[league].espn + '/teams/' + id + '/schedule';

    _formBusy[esName] = (async () => {
      try {
        const d = await espnFetch(url);
        const evs = (d && d.events) || [];
        if (!evs.length) return null;
        const base = findAnyTeam(esName);
        const br = base ? base.s : 62;
        const ha = rpHomeAdvForLeague(league);
        let gf = 0, ga = 0, sumOp = 0, n = 0;

        evs.forEach(e => {
          const comp = e.competitions && e.competitions[0];
          if (!comp) return;
          const st = comp.status && comp.status.type;
          if (!st || !st.completed) return;
          const cs = comp.competitors || [];
          const me = cs.find(c => c.id === id || (c.team && c.team.id === id));
          const opp = cs.find(c => c !== me);
          if (!me || !opp) return;
          const sv = c => {
            const s = c.score;
            if (s == null) return null;
            if (typeof s === 'object') return s.value != null ? s.value : parseFloat(s);
            return parseFloat(s);
          };
          const mgs = sv(me), ogs = sv(opp);
          if (mgs == null || ogs == null || isNaN(mgs) || isNaN(ogs)) return;
          gf += mgs;
          ga += ogs;
          n++;

          const ot = findTeamByEspnId(opp.team && opp.team.id) || findAnyTeam((opp.team && (opp.team.displayName || opp.team.name)) || '');
          const or = ot ? ot.s : 62;
          const neutral = rpBaseLambdas(br, or);
          const home = me.homeAway === 'home';
          // Diferencia esperada para ESTE equipo, ya con localía.
          const expected = home
            ? (neutral[0] + ha / 2) - (neutral[1] - ha / 2)
            : (neutral[1] - ha / 2) - (neutral[0] + ha / 2);
          sumOp += (mgs - ogs) - expected;
        });

        if (!n) return null;
        if (CURRENT_LEAGUE !== league) return null;

        const conf = Math.min(n / 3, 1);
        const delta = clamp((sumOp / n) * 14, -13, 13) * conf;
        TEAM_FORM[esName] = { n, gf, ga, delta, ts: Date.now() };

        // Forma cruzada para copas de clubes (misma lógica original, con
        // expectativa neutral + localía).
        try {
          const _L = LEAGUES[league];
          if (_L && _L.ko && _L.teams && n < 3 && CURRENT_LEAGUE === league) {
            const need = 3 - n, codes = homeLeaguesOf(esName);
            const cross = [];
            for (const code of codes) {
              if (cross.length >= need) break;
              const u2 = 'https://site.api.espn.com/apis/site/v2/sports/soccer/' + code + '/teams/' + id + '/schedule';
              const d2 = await espnFetch(u2);
              const evs2 = (d2 && d2.events) || [];
              const done2 = evs2.filter(e => {
                const c = e.competitions && e.competitions[0];
                return c && c.status && c.status.type && c.status.type.completed;
              });
              done2.sort((a, b) => new Date(b.date) - new Date(a.date));
              for (const e of done2) {
                if (cross.length >= need) break;
                cross.push(e);
              }
            }
            if (cross.length && CURRENT_LEAGUE === league) {
              let sumX = 0, kn = 0;
              cross.forEach(e => {
                const comp = e.competitions && e.competitions[0];
                if (!comp) return;
                const cs = comp.competitors || [];
                const me = cs.find(c => c.id === id || (c.team && c.team.id === id));
                const opp = cs.find(c => c !== me);
                if (!me || !opp) return;
                const sM = typeof me.score === 'object' ? (me.score && me.score.value) : me.score;
                const sO = typeof opp.score === 'object' ? (opp.score && opp.score.value) : opp.score;
                const mgs = parseFloat(sM), ogs = parseFloat(sO);
                if (isNaN(mgs) || isNaN(ogs)) return;
                const ot = findTeamByEspnId(opp.team && opp.team.id) || findAnyTeam((opp.team && (opp.team.displayName || opp.team.name)) || '');
                const or = ot ? ot.s : 62;
                const neutral = rpBaseLambdas(br, or);
                const home = me.homeAway === 'home';
                const expected = home
                  ? (neutral[0] + ha / 2) - (neutral[1] - ha / 2)
                  : (neutral[1] - ha / 2) - (neutral[0] + ha / 2);
                sumX += ((mgs - ogs) - expected) * 0.7;
                kn++;
              });
              if (kn) {
                const gap = 1 - Math.min(n / 3, 1);
                TEAM_FORM[esName].xn = kn;
                TEAM_FORM[esName].xdelta = clamp((sumX / kn) * 14, -13, 13) * Math.min(kn / 3, 1) * gap;
              }
            }
          }
        } catch (_xe) { /* la forma cruzada es opcional */ }

        saveFormCache();
        return TEAM_FORM[esName];
      } catch (e) {
        return null;
      } finally {
        delete _formBusy[esName];
      }
    })();

    return _formBusy[esName];
  };

  /* ───────────────────────────────────────────────────────────────────────
     3. MODELO EN VIVO
     ─────────────────────────────────────────────────────────────────────── */
  window.liveScoreProbs = function (lamH, lamA, rho, hs, as, minute, xgH, xgA) {
    const pct = Math.max(0.05, Math.min(0.95, (90 - Math.max(0, Math.min(90, minute || 90))) / 90));
    let lamHrem = clamp(lamH * pct, 0.05, 3.2);
    let lamArem = clamp(lamA * pct, 0.05, 3.2);

    if (xgH != null && xgA != null && minute > 15) {
      const elapsedPct = Math.min(0.95, minute / 90);
      const expectedH = lamH * elapsedPct, expectedA = lamA * elapsedPct;
      const perfH = expectedH > 0.1 ? clamp(xgH / expectedH, 0.3, 2.5) : 1;
      const perfA = expectedA > 0.1 ? clamp(xgA / expectedA, 0.3, 2.5) : 1;
      lamHrem = clamp(lamH * pct * perfH, 0.05, 3.2);
      lamArem = clamp(lamA * pct * perfA, 0.05, 3.2);
    }

    // Matriz Dixon-Coles completa. Antes se calculaba R pero se ignoraba y se
    // usaba una Poisson independiente con los lambdas restantes.
    const R = simulate(lamHrem, lamArem, rho);
    let pH = 0, pD = 0, pA = 0, pOver25 = 0, pBTTS = 0;
    let bestScore = { i: 0, j: 0, p: 0 };
    const scores = [];

    for (const s of R.scores) {
      const fi = (hs || 0) + s.i;
      const fj = (as || 0) + s.j;
      const p = s.p;
      if (fi > fj) pH += p;
      else if (fi === fj) pD += p;
      else pA += p;
      if (fi + fj > 2.5) pOver25 += p;
      if (fi > 0 && fj > 0) pBTTS += p;
      if (p > bestScore.p) bestScore = { i: fi, j: fj, p };
      scores.push({ i: fi, j: fj, p });
    }

    scores.sort((a, b) => b.p - a.p);
    const tot = pH + pD + pA;
    if (tot > 0) {
      pH /= tot;
      pD /= tot;
      pA /= tot;
      pOver25 /= tot;
      pBTTS /= tot;
      for (const s of scores) s.p /= tot;
      bestScore.p /= tot;
    }

    return { pH, pD, pA, pOver25, pBTTS, scores, bestScore, pct, lamHrem, lamArem };
  };

  window.nextGoalProbs = function (lamH, lamA, minute, xgH, xgA) {
    const remPct = Math.max(0, Math.min(1, (90 - Math.max(0, Math.min(90, minute || 90))) / 90));
    let effH = lamH, effA = lamA;

    if (xgH != null && xgA != null && minute > 15) {
      const elapsedPct = Math.min(0.95, minute / 90);
      const expectedH = lamH * elapsedPct, expectedA = lamA * elapsedPct;
      const perfH = expectedH > 0.1 ? clamp(xgH / expectedH, 0.3, 2.5) : 1;
      const perfA = expectedA > 0.1 ? clamp(xgA / expectedA, 0.3, 2.5) : 1;
      effH = lamH * perfH;
      effA = lamA * perfA;
    }

    const totalRem = (effH + effA) * remPct;
    const pNone = Math.exp(-totalRem);
    const pSome = 1 - pNone;
    const denom = effH + effA || 1;
    const pH = pSome * (effH / denom);
    const pA = pSome * (effA / denom);
    const ratePerMin = totalRem / (90 * remPct || 1);
    const expNextMin = ratePerMin > 0 ? (1 / ratePerMin) : 999;
    const minuteNext = Math.min(90, Math.round(minute + expNextMin));

    return { pH, pA, pNone, expNextMin: Math.round(expNextMin), minuteNext };
  };

  /* ───────────────────────────────────────────────────────────────────────
     4. SEPARACIÓN DE FUENTES EN EL HISTORIAL
     ─────────────────────────────────────────────────────────────────────── */
  function rpIsUserPrediction(x) {
    if (!x) return false;
    if (x.source) return x.source === 'user';
    // Compatibilidad con historiales viejos: los importados usan id "imp-".
    return !String(x.id || '').startsWith('imp-');
  }

  const _origComputeLearning = window.computeLearning;
  window.computeLearning = function () {
    // Primero se deja que el motor construya TEAM_CORNERS y perfiles usando
    // todos los resultados reales disponibles (eso es entrenamiento, no
    // evaluación).
    try {
      _origComputeLearning.apply(this, arguments);
    } catch (e) {
      console.warn('[v2] computeLearning base:', e);
    }

    // Fase 2: perfiles de remates y tarjetas con todos los resultados reales.
    // Se hace despu�s del motor base para que TEAM_CORNERS tambi�n incluya
    // los campos que el motor antiguo no guardaba.
    try {
      rpRebuildProfiles();
    } catch (e) {
      console.warn('[v2] perfiles fase 2:', e);
    }

    const done = HIST.filter(x => x.actualA != null && x.actualB != null && rpIsUserPrediction(x));
    const n = done.length;
    let res = 0, sc = 0, ou = 0, bt = 0, ht = 0, nHt = 0;
    let sumP = 0, sumR = 0, absErr = 0, nStats = 0, hp = 0, hc = 0, hy = 0;
    let sumPC = 0, sumRC = 0;

    done.forEach(it => {
      const j = judge(it);
      if (j.hitRes) res++;
      if (j.hitScore) sc++;
      if (j.hitOU) ou++;
      if (j.hitBtts) bt++;
      if (j.hitHtft != null) {
        nHt++;
        if (j.hitHtft) ht++;
      }
      sumP += j.predTot;
      sumR += j.realTot;
      absErr += Math.abs(j.predTot - j.realTot);
      if (it.actualStats) {
        nStats++;
        if (j.hitPoss) hp++;
        if (j.hitCorners) hc++;
        if (j.hitYellow) hy++;
        if (it.predCornersTot != null && it.actualStats.cornersTot != null) {
          sumPC += it.predCornersTot;
          sumRC += it.actualStats.cornersTot;
        }
      }
    });

    Object.assign(LEARN, {
      n,
      accRes: res,
      accScore: sc,
      accOU: ou,
      accBtts: bt,
      accHtft: ht,
      nHtft: nHt,
      avgErr: n ? absErr / n : 0,
      bias: n ? (sumR - sumP) / n : 0,
      nStats,
      accPoss: hp,
      accCorners: hc,
      accYellow: hy,
      cornerAdj: (nStats >= 3 && sumPC > 0) ? clamp(sumRC / sumPC, 0.7, 1.4) : 1,
      cornerReady: nStats >= 3 && sumPC > 0,
      goalAdj: (n >= 3 && sumP > 0) ? clamp(sumR / sumP, 0.8, 1.25) : 1,
      ready: n >= 3
    });
  };

  // Rendimiento y Resumen también calculan métricas directamente desde HIST.
  // Se filtran temporalmente para que solo cuenten predicciones del usuario.
  // La lista del historial sigue mostrando todo, pero sus métricas usan LEARN.
  const _origRenderDashboard = window.renderDashboard;
  window.renderDashboard = function () {
    const all = HIST;
    try {
      HIST = all.filter(rpIsUserPrediction);
      return _origRenderDashboard.apply(this, arguments);
    } finally {
      HIST = all;
    }
  };

  const _origRenderResumen = window.renderResumen;
  window.renderResumen = function () {
    const all = HIST;
    try {
      HIST = all.filter(rpIsUserPrediction);
      return _origRenderResumen.apply(this, arguments);
    } finally {
      HIST = all;
    }
  };

  /* ───────────────────────────────────────────────────────────────────────
     5. INDEXEDDB · adaptador PrematchStore
     ─────────────────────────────────────────────────────────────────────── */
  let _rpDBPromise = null;

  function rpOpenDB() {
    if (_rpDBPromise) return _rpDBPromise;
    _rpDBPromise = new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        reject(new Error('IndexedDB no disponible'));
        return;
      }
      const req = indexedDB.open(RP_DB_NAME, RP_DB_VERSION);
      req.onupgradeneeded = function () {
        const db = req.result;

        if (!db.objectStoreNames.contains(RP_DB_STORES.prematch_predictions)) {
          const s = db.createObjectStore(RP_DB_STORES.prematch_predictions, { keyPath: 'id' });
          s.createIndex('espnId', 'espnId', { unique: false });
          s.createIndex('kickoff', 'kickoff', { unique: false });
          s.createIndex('status', 'status', { unique: false });
          s.createIndex('league', 'league', { unique: false });
        }
        if (!db.objectStoreNames.contains(RP_DB_STORES.results)) {
          const s = db.createObjectStore(RP_DB_STORES.results, { keyPath: 'espnId' });
          s.createIndex('league', 'league', { unique: false });
          s.createIndex('kickoff', 'kickoff', { unique: false });
        }
        if (!db.objectStoreNames.contains(RP_DB_STORES.user_predictions)) {
          const s = db.createObjectStore(RP_DB_STORES.user_predictions, { keyPath: 'id' });
          s.createIndex('espnId', 'espnId', { unique: false });
          s.createIndex('league', 'league', { unique: false });
          s.createIndex('kickoff', 'kickoff', { unique: false });
        }
        if (!db.objectStoreNames.contains(RP_DB_STORES.backtest_predictions)) {
          const s = db.createObjectStore(RP_DB_STORES.backtest_predictions, { keyPath: 'id' });
          s.createIndex('espnId', 'espnId', { unique: false });
          s.createIndex('league', 'league', { unique: false });
          s.createIndex('kickoff', 'kickoff', { unique: false });
          s.createIndex('status', 'status', { unique: false });
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
    return _rpDBPromise;
  }

  function rpPut(store, obj) {
    return rpOpenDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readwrite');
      tx.oncomplete = () => resolve(obj);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
      tx.objectStore(store).put(obj);
    }));
  }

  function rpGetAll(store) {
    return rpOpenDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    }));
  }

  function rpGetAllByIndex(store, index, value) {
    return rpOpenDB().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(store, 'readonly');
      const req = tx.objectStore(store).index(index).getAll(value);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    }));
  }

  /* ───────────────────────────────────────────────────────────────────────
     6. PREDICCIÓN PRE-PARTIDO OCULTA
     ─────────────────────────────────────────────────────────────────────── */
  const _rpQueue = [];
  const _rpSeen = Object.create(null);
  let _rpRunning = 0;

  function rpWithTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise(resolve => setTimeout(() => resolve(null), ms))
    ]);
  }

  function rpKickoff(m) {
    const t = new Date(m && m.date).getTime();
    return isFinite(t) ? t : null;
  }

  function rpSchedulePrematch(flat) {
    if (!Array.isArray(flat)) return;
    const now = Date.now();
    flat.forEach(m => {
      if (!m || m.state !== 'pre' || !m.id || !m.date) return;
      const ko = rpKickoff(m);
      if (ko == null) return;
      // No se crean predicciones a menos de 5 minutos del kickoff ni para
      // partidos fuera de la ventana de 8 días.
      if (ko <= now + 5 * 60e3) return;
      if (ko > now + 8 * 864e5) return;
      const key = String(m.id) + '|' + ko;
      if (_rpSeen[key]) return;
      _rpSeen[key] = 1;
      _rpQueue.push(m);
    });
    rpPump();
  }

  function rpPump() {
    if (_rpRunning >= 2) return;
    while (_rpRunning < 2 && _rpQueue.length) {
      const m = _rpQueue.shift();
      _rpRunning++;
      Promise.resolve(rpCaptureOne(m))
        .catch(e => console.warn('[v2] prematch:', e))
        .finally(() => {
          _rpRunning--;
          rpPump();
        });
    }
  }

  async function rpCaptureOne(m) {
    if (!m || !m.id || !m.date || !m.A || !m.B) return null;
    const ko = rpKickoff(m);
    if (ko == null || ko <= Date.now() + 5 * 60e3) return null;

    let existing = [];
    try {
      existing = await rpGetAllByIndex(RP_DB_STORES.prematch_predictions, 'espnId', String(m.id));
    } catch (e) {
      console.warn('[v2] IndexedDB no disponible:', e && e.message);
      return null;
    }
    if (existing.some(p => Number(p.kickoff) === ko && p.status !== 'missing')) return null;

    const comp = m.ev && m.ev.competitions && m.ev.competitions[0];
    const cs = (comp && comp.competitors) || [];
    const cH = cs.find(c => c.homeAway === 'home');
    const cA = cs.find(c => c.homeAway === 'away');

    const ta = ensureTeam(m.A, cH && cH.team && cH.team.id, m.league);
    const tb = ensureTeam(m.B, cA && cA.team && cA.team.id, m.league);
    if (!ta || !tb) return null;

    // La forma se carga solo si el partido pertenece a la liga activa; para
    // otras ligas se usa el rating base y se marca inputsComplete=false.
    let formReady = false;
    if (m.league === CURRENT_LEAGUE) {
      await Promise.all([
        rpWithTimeout(loadTeamForm(ta.es), 5000),
        rpWithTimeout(loadTeamForm(tb.es), 5000)
      ]);
      formReady = !!(formInfo(ta.es) && formInfo(tb.es));
    }

    // Para la liga activa se usa ratingOf (incluye forma cacheada). Para otras
    // ligas se usa el rating base del equipo encontrado, evitando mezclar
    // pools/forma de la liga que el usuario está viendo.
    const rA = m.league === CURRENT_LEAGUE ? ratingOf(ta.es) : ta.s;
    const rB = m.league === CURRENT_LEAGUE ? ratingOf(tb.es) : tb.s;
    let lambdas = rpLambdasForLeague(rA, rB, m.league);
    lambdas = applyLearning(lambdas[0], lambdas[1]);
    const lamH = lambdas[0], lamA = lambdas[1];
    const rho = autoRho(lamH + lamA);
    const R = simulate(lamH, lamA, rho);
    const HTF = htftProbs(lamH, lamA);
    const possA = possShare(lamH, lamA);
    const shots = rpPredictShots(ta.es, tb.es, lamH, lamA, possA, m.league);
    const corners = rpPredictCorners(ta.es, tb.es, lamH, lamA, possA, m.league);
    const cards = rpPredictCards(ta.es, tb.es, lamH, lamA, m.league);

    const record = {
      id: 'pre:' + String(m.id) + ':' + ko,
      source: 'prematch',
      status: 'frozen',
      modelVersion: RP_VERSION,
      league: m.league,
      espnId: String(m.id),
      homeTeam: ta.es,
      awayTeam: tb.es,
      homeTeamId: cH && cH.team && cH.team.id ? String(cH.team.id) : null,
      awayTeamId: cA && cA.team && cA.team.id ? String(cA.team.id) : null,
      kickoff: ko,
      createdAt: Date.now(),
      asOf: Date.now(),
      inputsComplete: formReady,
      inputs: {
        ratingHome: rA,
        ratingAway: rB,
        formHome: (m.league === CURRENT_LEAGUE && formInfo(ta.es)) ? formInfo(ta.es).delta : null,
        formAway: (m.league === CURRENT_LEAGUE && formInfo(tb.es)) ? formInfo(tb.es).delta : null,
        homeAdvantage: rpHomeAdvForLeague(m.league),
        lamH,
        lamA,
        rho,
        learningApplied: !!(LEARN.apply && LEARN.ready)
      },
      outputs: {
        pHome: R.h,
        pDraw: R.d,
        pAway: R.a,
        over25: R.o25,
        btts: R.btts,
        xgHome: R.xgH,
        xgAway: R.xgA,
        topScores: R.scores.slice(0, 8),
        htft: { best: HTF.best, p: HTF.bp, htH: HTF.htH, htD: HTF.htD, htA: HTF.htA },
        corners: {
          home: corners.home,
          away: corners.away,
          total: corners.total,
          pOver85: corners.pOver85,
          pOver95: corners.pOver95,
          pOver105: corners.pOver105,
          pOver115: corners.pOver115
        },
        cards: {
          yellowHome: cards.yellowHome,
          yellowAway: cards.yellowAway,
          yellowTotal: cards.yellowTotal,
          redHome: cards.redHome,
          redAway: cards.redAway,
          redTotal: cards.redTotal,
          pRed: cards.pRed,
          pOver25: cards.pOver25,
          pOver35: cards.pOver35,
          pOver45: cards.pOver45,
          pOver55: cards.pOver55
        },
        shots: {
          home: shots.home,
          away: shots.away,
          total: shots.total,
          sotHome: shots.sotHome,
          sotAway: shots.sotAway,
          sotTotal: shots.sotTotal,
          pOver245: shots.pOver245
        }
      }
    };

    // Última barrera: si por cualquier motivo el kickoff ya pasó mientras se
    // cargaba la forma, no se crea la predicción.
    if (Date.now() >= ko) return null;

    await rpPut(RP_DB_STORES.prematch_predictions, record);
    return record;
  }

  /* ───────────────────────────────────────────────────────────────────────
     7. RESULTADOS Y EVALUACIÓN
     ─────────────────────────────────────────────────────────────────────── */
  let _rpSyncing = false;

  function rpActualForPrematch(p, it) {
    let a = it.actualA, b = it.actualB;
    if (norm(it.A) === norm(p.awayTeam) && norm(it.B) === norm(p.homeTeam)) {
      return [b, a];
    }
    return [a, b];
  }

  function rpStatsForPrematch(p, it) {
    const s = it && it.actualStats;
    if (!s) return null;
    const same = norm(it.A) === norm(p.homeTeam) && norm(it.B) === norm(p.awayTeam);
    if (same) return s;
    const swapped = norm(it.A) === norm(p.awayTeam) && norm(it.B) === norm(p.homeTeam);
    if (!swapped) return s;

    const out = Object.assign({}, s);
    let t;
    t = out.possA; out.possA = out.possB; out.possB = t;
    t = out.shotsA; out.shotsA = out.shotsB; out.shotsB = t;
    t = out.sotA; out.sotA = out.sotB; out.sotB = t;
    t = out.xgA; out.xgA = out.xgB; out.xgB = t;
    t = out.foulsA; out.foulsA = out.foulsB; out.foulsB = t;
    t = out.cornersA; out.cornersA = out.cornersB; out.cornersB = t;
    t = out.yellowA; out.yellowA = out.yellowB; out.yellowB = t;
    t = out.redA; out.redA = out.redB; out.redB = t;
    return out;
  }

  function rpMetrics(p, homeScore, awayScore, stats) {
    const out = p.outputs || {};
    const probs = { H: out.pHome, D: out.pDraw, A: out.pAway };
    const actual = homeScore > awayScore ? 'H' : (homeScore === awayScore ? 'D' : 'A');
    const pH = Number(probs.H) || 0, pD = Number(probs.D) || 0, pA = Number(probs.A) || 0;
    const brier = Math.pow(pH - (actual === 'H' ? 1 : 0), 2)
      + Math.pow(pD - (actual === 'D' ? 1 : 0), 2)
      + Math.pow(pA - (actual === 'A' ? 1 : 0), 2);
    const pActual = Math.max(1e-12, probs[actual] || 0);
    const over = (homeScore + awayScore) > 2.5;
    const btts = homeScore > 0 && awayScore > 0;
    const m = {
      actualOutcome: actual,
      brier,
      logLoss: -Math.log(pActual),
      hit1x2: actual === (out.pHome >= out.pDraw && out.pHome >= out.pAway ? 'H' : (out.pAway >= out.pDraw ? 'A' : 'D')),
      hitOver25: over === (Number(out.over25) >= 0.5),
      hitBtts: btts === (Number(out.btts) >= 0.5)
    };

    const num = v => Number.isFinite(Number(v)) ? Number(v) : null;
    const s = stats || null;
    if (s) {
      const c = out.corners;
      if (c && num(c.total) != null && num(s.cornersTot) != null) {
        m.corners = {
          pred: num(c.total),
          actual: num(s.cornersTot),
          error: Math.abs(num(c.total) - num(s.cornersTot)),
          hitOver95: num(c.pOver95) != null ? ((num(c.pOver95) >= 0.5) === (num(s.cornersTot) > 9.5)) : null
        };
      }
      const k = out.cards;
      if (k && num(k.yellowTotal) != null && num(s.yellowTot) != null) {
        m.cards = {
          pred: num(k.yellowTotal),
          actual: num(s.yellowTot),
          error: Math.abs(num(k.yellowTotal) - num(s.yellowTot)),
          hitOver35: num(k.pOver35) != null ? ((num(k.pOver35) >= 0.5) === (num(s.yellowTot) > 3.5)) : null
        };
      }
      const sh = out.shots;
      if (sh && num(sh.home) != null && num(sh.away) != null && num(s.shotsA) != null && num(s.shotsB) != null) {
        const pred = num(sh.home) + num(sh.away);
        const real = num(s.shotsA) + num(s.shotsB);
        m.shots = {
          pred,
          actual: real,
          error: Math.abs(pred - real),
          hitOver245: num(sh.pOver245) != null ? ((num(sh.pOver245) >= 0.5) === (real > 24.5)) : null
        };
        if (num(sh.sotHome) != null && num(sh.sotAway) != null && num(s.sotA) != null && num(s.sotB) != null) {
          const predSot = num(sh.sotHome) + num(sh.sotAway);
          const realSot = num(s.sotA) + num(s.sotB);
          m.shots.sotError = Math.abs(predSot - realSot);
        }
      }
    }
    return m;
  }

  async function rpSyncResults() {
    if (_rpSyncing) return;
    _rpSyncing = true;
    try {
      const items = HIST.filter(x => x && x.actualA != null && x.actualB != null && x.espnId);
      for (const it of items) {
        const espnId = String(it.espnId);
        const kickoff = it.kickoff || (parseCtxDateSafe(it.ctx) ? new Date(parseCtxDateSafe(it.ctx) + 'T12:00:00').getTime() : null);
        const resultRecord = {
          espnId,
          league: CURRENT_LEAGUE,
          homeTeam: it.A,
          awayTeam: it.B,
          aTeam: it.A,
          bTeam: it.B,
          kickoff,
          homeScore: it.actualA,
          awayScore: it.actualB,
          actualA: it.actualA,
          actualB: it.actualB,
          stats: it.actualStats || null,
          source: 'espn',
          importedAt: it.importedAt || Date.now()
        };
        try {
          await rpPut(RP_DB_STORES.results, resultRecord);
        } catch (e) {
          console.warn('[v2] results store:', e && e.message);
          break;
        }

        let frozen = [];
        try {
          frozen = await rpGetAllByIndex(RP_DB_STORES.prematch_predictions, 'espnId', espnId);
        } catch (e) {
          break;
        }

        for (const p of frozen) {
          if (p.status === 'evaluated' || p.status === 'missing') continue;
          if (!p.kickoff || !p.createdAt || Number(p.createdAt) >= Number(p.kickoff)) {
            p.status = 'missing';
            p.missingReason = 'created_at_not_before_kickoff';
            p.evaluatedAt = Date.now();
            await rpPut(RP_DB_STORES.prematch_predictions, p);
            continue;
          }
          const actual = rpActualForPrematch(p, it);
          const stats = rpStatsForPrematch(p, it);
          p.result = {
            homeScore: actual[0],
            awayScore: actual[1],
            stats: stats
          };
          p.metrics = rpMetrics(p, actual[0], actual[1], stats);
          p.status = 'evaluated';
          p.evaluatedAt = Date.now();
          await rpPut(RP_DB_STORES.prematch_predictions, p);
        }
      }
    } finally {
      _rpSyncing = false;
    }
  }

  // Espeja las predicciones propias del historial actual en IndexedDB. No
  // sustituye todavía el almacenamiento histórico (compatibilidad), pero deja
  // la base local preparada para migrar la UI en la siguiente fase.
  async function rpSyncUserPredictions() {
    const items = (HIST || []).filter(rpIsUserPrediction);
    for (const it of items) {
      try {
        await rpPut(RP_DB_STORES.user_predictions, Object.assign({}, it, {
          source: 'user',
          league: CURRENT_LEAGUE
        }));
      } catch (e) {
        console.warn('[v2] user predictions sync:', e && e.message);
        break;
      }
    }
  }

  /* ───────────────────────────────────────────────────────────────────────
     8. HOOKS AL MOTOR ORIGINAL
     ─────────────────────────────────────────────────────────────────────── */
  // Cach� de espnParse para poder enriquecer resultados obtenidos con
  // fetchResult (que no expone el evento original). No cambia su salida.
  const RP_PARSED = new Map();
  const _origEspnParse = window.espnParse;
  window.espnParse = function (ev) {
    const p = _origEspnParse.apply(this, arguments);
    try {
      if (p && p.id != null) {
        RP_PARSED.set(String(p.id), p);
        if (RP_PARSED.size > 240) {
          const first = RP_PARSED.keys().next().value;
          if (first != null) RP_PARSED.delete(first);
        }
      }
    } catch (e) {}
    return p;
  };

  function rpMergeStats(stats, p, swap) {
    if (!stats || !p || !p.stats) return stats;
    const s = p.stats;
    const pick = (home, away) => swap ? away : home;
    stats.possA = pick(s.homePoss, s.awayPoss);
    stats.possB = pick(s.awayPoss, s.homePoss);
    stats.shotsA = pick(s.homeShots, s.awayShots);
    stats.shotsB = pick(s.awayShots, s.homeShots);
    stats.sotA = pick(s.homeSOT, s.awaySOT);
    stats.sotB = pick(s.awaySOT, s.homeSOT);
    stats.xgA = pick(s.homeXg, s.awayXg);
    stats.xgB = pick(s.awayXg, s.homeXg);
    stats.foulsA = pick(s.homeFouls, s.awayFouls);
    stats.foulsB = pick(s.awayFouls, s.homeFouls);
    stats.cornersA = pick(s.homeCorners, s.awayCorners);
    stats.cornersB = pick(s.awayCorners, s.homeCorners);
    stats.cornersTot = (Number(stats.cornersA) || 0) + (Number(stats.cornersB) || 0);
    stats.yellowA = pick(s.yellowA, s.yellowB);
    stats.yellowB = pick(s.yellowB, s.yellowA);
    stats.redA = pick(s.redA, s.redB);
    stats.redB = pick(s.redB, s.redA);
    stats.yellowTot = (Number(stats.yellowA) || 0) + (Number(stats.yellowB) || 0);
    stats.homeCorners = s.homeCorners;
    stats.awayCorners = s.awayCorners;
    stats.homeShots = s.homeShots;
    stats.awayShots = s.awayShots;
    return stats;
  }

  function rpStatsSwapForItem(it, p) {
    const a = norm(it && it.A);
    const h = norm(p && p.strHomeTeam);
    const w = norm(p && p.strAwayTeam);
    if (a && h && (a === h || h.includes(a) || a.includes(h))) return false;
    if (a && w && (a === w || w.includes(a) || a.includes(w))) return true;
    return false;
  }

  function rpApplyPhase2Prediction(it, leagueId) {
    if (!it || it.lamH == null || it.lamA == null) return;
    const lg = leagueId || CURRENT_LEAGUE;
    const poss = Number(it.predPossA);
    const possA = Number.isFinite(poss) ? poss : possShare(it.lamH, it.lamA);
    const shots = rpPredictShots(it.A, it.B, it.lamH, it.lamA, possA, lg);
    const corners = rpPredictCorners(it.A, it.B, it.lamH, it.lamA, possA, lg);
    const cards = rpPredictCards(it.A, it.B, it.lamH, it.lamA, lg);
    it.predPossA = possA;
    it.predShotsA = shots.home;
    it.predShotsB = shots.away;
    it.predShotsSotA = shots.sotHome;
    it.predShotsSotB = shots.sotAway;
    it.predCornersA = corners.home;
    it.predCornersB = corners.away;
    it.predCornersTot = corners.total;
    it.predYellowA = cards.yellowHome;
    it.predYellowB = cards.yellowAway;
    it.predYellowTot = cards.yellowTotal;
    it.predRedTot = cards.redTotal;
    it.marketModelVersion = RP_VERSION;
  }

  const _origBuildFromESPN = window.buildFromESPN;
  window.buildFromESPN = function (ev, leagueId) {
    const prev = _rpLeagueOverride;
    _rpLeagueOverride = leagueId || CURRENT_LEAGUE;
    let it;
    try {
      it = _origBuildFromESPN.apply(this, arguments);
    } finally {
      _rpLeagueOverride = prev;
    }
    if (it) {
      it.source = 'imported';
      it.kickoff = ev && ev.date ? new Date(ev.date).getTime() : null;
      it.importedAt = Date.now();
      try {
        const p = window.espnParse(ev);
        rpApplyPhase2Prediction(it, leagueId || CURRENT_LEAGUE);
        rpMergeStats(it.actualStats, p, false);
      } catch (e) {
        console.warn('[v2] fase 2 import:', e);
      }
    }
    return it;
  };

  const _origImportPlayed = window.importPlayed;
  window.importPlayed = async function () {
    const r = await _origImportPlayed.apply(this, arguments);
    try { await rpSyncResults(); } catch (e) { console.warn('[v2] sync results:', e); }
    return r;
  };

  const _origFetchResult = window.fetchResult;
  window.fetchResult = async function () {
    const id = arguments[0];
    const r = await _origFetchResult.apply(this, arguments);
    try {
      const it = (HIST || []).find(x => x && x.id === id);
      if (it && it.espnId && RP_PARSED.has(String(it.espnId))) {
        const p = RP_PARSED.get(String(it.espnId));
        rpMergeStats(it.actualStats, p, rpStatsSwapForItem(it, p));
        rpApplyPhase2Prediction(it, CURRENT_LEAGUE);
        rpRebuildProfiles();
      }
      await rpSyncResults();
    } catch (e) {
      console.warn('[v2] sync result:', e);
    }
    return r;
  };

  const _origSetResult = window.setResult;
  window.setResult = function () {
    const r = _origSetResult.apply(this, arguments);
    try { rpSyncResults().catch(e => console.warn('[v2] sync manual result:', e)); } catch (e) {}
    return r;
  };

  const _origLoadBulkResults = window.loadBulkResults;
  window.loadBulkResults = function () {
    const r = _origLoadBulkResults.apply(this, arguments);
    try { rpSyncResults().catch(e => console.warn('[v2] sync bulk result:', e)); } catch (e) {}
    return r;
  };

  const _origSavePrediction = window.savePrediction;
  window.savePrediction = function () {
    try {
      if (lastPrediction) {
        lastPrediction.source = 'user';
        lastPrediction.modelVersion = RP_VERSION;
        lastPrediction.savedAt = Date.now();
        if (!lastPrediction.kickoff) {
          try {
            if (typeof _liveOpenMatch !== 'undefined' && _liveOpenMatch && _liveOpenMatch.date) {
              lastPrediction.kickoff = new Date(_liveOpenMatch.date).getTime();
            } else {
              const d = parseCtxDateSafe(lastPrediction.ctx);
              if (d) lastPrediction.kickoff = new Date(d + 'T12:00:00').getTime();
            }
          } catch (_ke) {}
        }
      }
    } catch (_e) {}

    const r = _origSavePrediction.apply(this, arguments);

    try {
      if (lastPrediction && HIST && HIST[0]) {
        rpPut(RP_DB_STORES.user_predictions, Object.assign({}, HIST[0], {
          source: 'user',
          league: CURRENT_LEAGUE
        })).catch(e => console.warn('[v2] user store:', e && e.message));
      }
    } catch (_e) {}

    return r;
  };

  const _origFetchDayGroups = window.fetchDayGroups;
  window.fetchDayGroups = async function () {
    const out = await _origFetchDayGroups.apply(this, arguments);
    try { rpSchedulePrematch(out && out.flat); } catch (e) { console.warn('[v2] prematch schedule:', e); }
    return out;
  };

  // El motor original llama teamShots(lam, poss) dos veces por simulaci�n.
  // El plan se calcula con el modelo de Fase 2 y se consume en ese orden.
  let RP_SHOT_PLAN = null;
  window.teamShots = function (lam, poss) {
    if (RP_SHOT_PLAN && RP_SHOT_PLAN.calls < 2) {
      const out = RP_SHOT_PLAN.calls === 0 ? RP_SHOT_PLAN.home : RP_SHOT_PLAN.away;
      RP_SHOT_PLAN.calls++;
      return out;
    }
    return rpShotsBaseline(lam, poss, CURRENT_LEAGUE);
  };

  const _origRunSim = window.runSim;
  window.runSim = function (scroll) {
    try {
      const ta = findAnyTeam(state.A), tb = findAnyTeam(state.B);
      if (ta && tb) {
        const lamH = clamp(parseFloat(el('pLamA').value) || 1.3, .05, 5);
        const lamA = clamp(parseFloat(el('pLamB').value) || 1.3, .05, 5);
        const possA = possShare(lamH, lamA);
        RP_SHOT_PLAN = Object.assign(
          rpPredictShots(ta.es, tb.es, lamH, lamA, possA, CURRENT_LEAGUE),
          { calls: 0 }
        );
      }
    } catch (e) {}
    try {
      return _origRunSim.apply(this, arguments);
    } finally {
      RP_SHOT_PLAN = null;
    }
  };

  const _origFillAutoParams = window.fillAutoParams;
  window.fillAutoParams = function (rerun) {
    // Se llama sin rerun para que el motor no simule con c�rners/tarjetas
    // viejos; despu�s se actualizan los tres mercados y se simula una vez.
    const r = _origFillAutoParams.call(this, false);
    try {
      const ta = findAnyTeam(state.A), tb = findAnyTeam(state.B);
      if (ta && tb) {
        const lamH = clamp(parseFloat(el('pLamA').value) || 1.3, .05, 5);
        const lamA = clamp(parseFloat(el('pLamB').value) || 1.3, .05, 5);
        const possA = possShare(lamH, lamA);
        const corners = rpPredictCorners(ta.es, tb.es, lamH, lamA, possA, CURRENT_LEAGUE);
        const cards = rpPredictCards(ta.es, tb.es, lamH, lamA, CURRENT_LEAGUE);
        el('pCornA').value = corners.home.toFixed(1);
        el('pCornB').value = corners.away.toFixed(1);
        el('pCardY').value = cards.yellowTotal.toFixed(1);
        el('pCardR').value = cards.redTotal.toFixed(2);
      }
    } catch (e) {}
    if (rerun) {
      try { runSim(false); } catch (e) {}
    }
    return r;
  };

  /* ───────────────────────────────────────────────────────────────────────
     9. ARRANQUE Y API DE DIAGNÓSTICO
     ─────────────────────────────────────────────────────────────────────── */
  window.RP_MODEL_V2 = {
    version: RP_VERSION,
    homeAdvantage: rpHomeAdvForLeague,
    baseLambdas: rpBaseLambdas,
    lambdasForLeague: rpLambdasForLeague,
    isUserPrediction: rpIsUserPrediction,
    db: rpOpenDB,
    syncResults: rpSyncResults,
    syncUserPredictions: rpSyncUserPredictions,
    predictShots: rpPredictShots,
    predictCorners: rpPredictCorners,
    predictCards: rpPredictCards,
    rebuildProfiles: rpRebuildProfiles,
    profiles: function () {
      return { corners: TEAM_CORNERS, shots: TEAM_SHOTS, cards: TEAM_CARDS };
    }
  };

  window.RP_PREMATCH = {
    version: RP_VERSION,
    db: rpOpenDB,
    stores: RP_DB_STORES,
    schedule: rpSchedulePrematch,
    capture: rpCaptureOne,
    evaluate: rpSyncResults,
    list: async function (limit) {
      const all = await rpGetAll(RP_DB_STORES.prematch_predictions);
      all.sort((a, b) => Number(b.kickoff) - Number(a.kickoff));
      return typeof limit === 'number' ? all.slice(0, limit) : all;
    },
    results: async function () {
      return rpGetAll(RP_DB_STORES.results);
    },
    stats: async function () {
      const all = await rpGetAll(RP_DB_STORES.prematch_predictions);
      const byStatus = {};
      const byLeague = {};
      all.forEach(p => {
        byStatus[p.status] = (byStatus[p.status] || 0) + 1;
        byLeague[p.league] = (byLeague[p.league] || 0) + 1;
      });
      return { total: all.length, byStatus, byLeague };
    },
    // Métricas de las predicciones pre-partido congeladas. No incluye
    // predicciones del usuario ni backtest. Los partidos con resultado pero
    // sin predicción congelada se reportan como "missing".
    metrics: async function () {
      const all = await rpGetAll(RP_DB_STORES.prematch_predictions);
      const results = await rpGetAll(RP_DB_STORES.results);
      const evaluated = all.filter(p => p.status === 'evaluated' && p.metrics);
      const n = evaluated.length;
      let brier = 0, logLoss = 0, hit1x2 = 0, hitOver25 = 0, hitBtts = 0;
      let nCorners = 0, cornersErr = 0, nCornersHit = 0, cornersHit = 0;
      let nCards = 0, cardsErr = 0, nCardsHit = 0, cardsHit = 0;
      let nShots = 0, shotsErr = 0, nShotsHit = 0, shotsHit = 0, nSot = 0, sotErr = 0;
      const byLeague = {};
      evaluated.forEach(p => {
        brier += Number(p.metrics.brier) || 0;
        logLoss += Number(p.metrics.logLoss) || 0;
        if (p.metrics.hit1x2) hit1x2++;
        if (p.metrics.hitOver25) hitOver25++;
        if (p.metrics.hitBtts) hitBtts++;
        const cm = p.metrics.corners;
        if (cm) {
          nCorners++;
          cornersErr += Number(cm.error) || 0;
          if (cm.hitOver95 != null) {
            nCornersHit++;
            if (cm.hitOver95) cornersHit++;
          }
        }
        const km = p.metrics.cards;
        if (km) {
          nCards++;
          cardsErr += Number(km.error) || 0;
          if (km.hitOver35 != null) {
            nCardsHit++;
            if (km.hitOver35) cardsHit++;
          }
        }
        const sm = p.metrics.shots;
        if (sm) {
          nShots++;
          shotsErr += Number(sm.error) || 0;
          if (sm.hitOver245 != null) {
            nShotsHit++;
            if (sm.hitOver245) shotsHit++;
          }
          if (sm.sotError != null) {
            nSot++;
            sotErr += Number(sm.sotError) || 0;
          }
        }
        const l = p.league || 'unknown';
        const b = byLeague[l] || (byLeague[l] = { n: 0, brier: 0, logLoss: 0 });
        b.n++;
        b.brier += Number(p.metrics.brier) || 0;
        b.logLoss += Number(p.metrics.logLoss) || 0;
      });
      Object.keys(byLeague).forEach(l => {
        const b = byLeague[l];
        b.brier = b.n ? b.brier / b.n : null;
        b.logLoss = b.n ? b.logLoss / b.n : null;
      });
      const evaluatedIds = new Set(evaluated.map(p => String(p.espnId)));
      const missing = results.filter(r => !evaluatedIds.has(String(r.espnId))).length;
      const nComplete = evaluated.filter(p => p.inputsComplete).length;
      return {
        n,
        nComplete,
        nPartial: n - nComplete,
        missing,
        brier: n ? brier / n : null,
        logLoss: n ? logLoss / n : null,
        hit1x2: n ? hit1x2 / n : null,
        hitOver25: n ? hitOver25 / n : null,
        hitBtts: n ? hitBtts / n : null,
        markets: {
          corners: nCorners ? {
            n: nCorners,
            mae: cornersErr / nCorners,
            hitOver95: nCornersHit ? cornersHit / nCornersHit : null
          } : null,
          cards: nCards ? {
            n: nCards,
            mae: cardsErr / nCards,
            hitOver35: nCardsHit ? cardsHit / nCardsHit : null
          } : null,
          shots: nShots ? {
            n: nShots,
            mae: shotsErr / nShots,
            hitOver245: nShotsHit ? shotsHit / nShotsHit : null,
            sotMae: nSot ? sotErr / nSot : null
          } : null
        },
        byLeague
      };
    }
  };

  // Recalcular métricas con la separación de fuentes y reaplicar la ventaja
  // de local en el predictor visible. Se hace después de que el motor original
  // haya terminado su init.
  setTimeout(function () {
    try { window.computeLearning(); } catch (e) { console.warn('[v2] recompute:', e); }
    try { rpSyncResults().catch(e => console.warn('[v2] startup sync:', e)); } catch (e) {}
    try { rpSyncUserPredictions().catch(e => console.warn('[v2] startup user sync:', e)); } catch (e) {}
    try {
      if (typeof renderHistory === 'function') renderHistory();
      if (typeof renderDashboard === 'function') renderDashboard();
      if (typeof renderStatsView === 'function') { renderStatsView(); }
      if (typeof renderResumen === 'function') renderResumen();
    } catch (e) {}
    try {
      if (typeof _bkCache !== 'undefined') _bkCache = {};
      if (typeof renderBracket === 'function') renderBracket();
    } catch (e) {}
    try {
      if (typeof fillAutoParams === 'function') fillAutoParams(false);
      if (typeof runSim === 'function') runSim(false);
    } catch (e) {}
    try {
      if (typeof _liveFlat !== 'undefined' && _liveFlat && _liveFlat.length) {
        rpSchedulePrematch(_liveFlat);
      }
    } catch (e) {}
  }, 350);
})();
