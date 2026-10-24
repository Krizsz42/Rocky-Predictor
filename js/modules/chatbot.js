/* ============================================================
   Rocky Chat — asistente de apuestas de Rocky Predictor
   ------------------------------------------------------------
   - Cerebro local: simula con el modelo, consulta historial,
     navega entre vistas y explica conceptos. Funciona sin API.
   - Cerebro IA (opcional): Gemini vía /api/chat. El servidor
     guarda la key y aporta datos reales de ESPN + cuotas.
   ============================================================ */
(function () {
  'use strict';

  var LS_KEY = 'rp_chat_v1';
  var MAX_MSGS = 40;
  var AI_TIMEOUT = 150000;

  var msgs = [];
  var busy = false;
  var isOpen = false;
  var status = { ai: false, model: '', odds: false };
  var typingEl = null;

  function $(id) { return document.getElementById(id); }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ---------------- persistencia ---------------- */
  function loadMsgs() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.filter(function (m) {
        return m && (m.role === 'user' || m.role === 'bot') && typeof m.text === 'string';
      }).slice(-MAX_MSGS) : [];
    } catch (e) { return []; }
  }
  function saveMsgs() {
    try {
      msgs = msgs.slice(-MAX_MSGS);
      localStorage.setItem(LS_KEY, JSON.stringify(msgs));
    } catch (e) {}
  }

  /* ---------------- utilidades ---------------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fmt(text) {
    var s = esc(text);

    function inline(x) {
      x = x.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
      x = x.replace(/`([^`\n]+)`/g, '<code>$1</code>');
      x = x.replace(/\*([^*\n]+)\*/g, '<i>$1</i>');
      return x;
    }

    var lines = s.split(/\r?\n/);
    var out = '', inList = false;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var item = line.match(/^\s*[-•*]\s+(.*)$/);
      if (item) {
        if (!inList) { out += '<ul>'; inList = true; }
        out += '<li>' + inline(item[1]) + '</li>';
      } else {
        if (inList) { out += '</ul>'; inList = false; }
        if (line.trim()) out += '<div>' + inline(line) + '</div>';
      }
    }
    if (inList) out += '</ul>';
    return out;
  }

  function pct(x) {
    if (typeof x !== 'number' || !isFinite(x)) return '—';
    return (x * 100).toFixed(1) + '%';
  }

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function currentLeague() {
    try { return (typeof LEAGUES !== 'undefined' && LEAGUES[CURRENT_LEAGUE]) || null; }
    catch (e) { return null; }
  }

  /* ---------------- UI ---------------- */
  function buildUI() {
    if ($('rcFab')) return;

    var fab = document.createElement('button');
    fab.id = 'rcFab';
    fab.className = 'rc-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Abrir chat de apuestas');
    fab.setAttribute('title', 'Chat de apuestas · datos reales');
    fab.innerHTML = '💬<span class="rc-pulse"></span>';

    var panel = document.createElement('div');
    panel.id = 'rcPanel';
    panel.className = 'rc-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Rocky Chat');
    panel.innerHTML =
      '<div class="rc-head">' +
        '<div class="rc-head-t">' +
          '<span class="rc-logo">⚽</span>' +
          '<div><b>Rocky Chat</b><small id="rcStatus"><span class="rc-off"></span>Comprobando IA…</small></div>' +
        '</div>' +
        '<div class="rc-actions">' +
          '<button type="button" id="rcClear" title="Nueva conversación" aria-label="Nueva conversación">⟳</button>' +
          '<button type="button" id="rcClose" title="Cerrar" aria-label="Cerrar chat">✕</button>' +
        '</div>' +
      '</div>' +
      '<div class="rc-quick" id="rcQuick"></div>' +
      '<div class="rc-body" id="rcBody" aria-live="polite"></div>' +
      '<div class="rc-foot">' +
        '<textarea id="rcInput" class="rc-input" rows="1" maxlength="1200" placeholder="Preguntá por un partido, cuotas o forma…"></textarea>' +
        '<button type="button" id="rcSend" class="rc-send" aria-label="Enviar">➤</button>' +
      '</div>' +
      '<div class="rc-note">Datos: ESPN · cuotas: The Odds API / ESPN. Probabilidades, no certezas. Juego responsable.</div>';

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    fab.addEventListener('click', toggle);
    $('rcClose').addEventListener('click', close);
    $('rcClear').addEventListener('click', clearChat);
    $('rcSend').addEventListener('click', function () { send(); });
    $('rcInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    $('rcInput').addEventListener('input', autoGrow);

    var quick = $('rcQuick');
    [
      '¿Quién gana Argentina vs Brasil?',
      'Últimos 5 de River',
      'Cuotas Real Madrid vs Barcelona',
      'Mis aciertos',
      '¿Qué es el value?'
    ].forEach(function (q) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rc-chip';
      b.textContent = q;
      b.addEventListener('click', function () { send(q); });
      quick.appendChild(b);
    });
  }

  function autoGrow() {
    var t = $('rcInput');
    if (!t) return;
    t.style.height = 'auto';
    t.style.height = Math.min(t.scrollHeight, 110) + 'px';
  }

  function toggle() { isOpen ? close() : open(); }

  function open() {
    isOpen = true;
    document.body.classList.add('rc-open');
    $('rcPanel').classList.add('rc-open');
    renderStatus();
    if (!msgs.length) addMsg('bot', welcomeText());
    renderMessages();
    setTimeout(function () {
      if (!busy) { try { $('rcInput').focus(); } catch (e) {} }
    }, 180);
  }

  function close() {
    isOpen = false;
    document.body.classList.remove('rc-open');
    $('rcPanel').classList.remove('rc-open');
  }

  function clearChat() {
    if (busy) return;
    msgs = [];
    saveMsgs();
    renderMessages();
    addMsg('bot', welcomeText());
  }

  function welcomeText() {
    return '👋 Soy **Rocky Chat**, el asistente de apuestas de la app.\n\n' +
      'Puedo:\n' +
      '- Simular un partido con el modelo Poisson/Dixon-Coles.\n' +
      '- Buscar **partidos reales, últimos resultados y cuotas** (ESPN + The Odds API).\n' +
      '- Comparar la probabilidad del modelo con la cuota y calcular el **valor esperado**.\n' +
      '- Revisar tus aciertos y la calibración del historial.\n\n' +
      'Probá con «últimos 5 de River» o «cuotas de Real Madrid vs Barcelona». Si falta un dato, te lo digo: no invento cuotas.';
  }

  function renderStatus() {
    var el = $('rcStatus');
    if (!el) return;
    if (status.ai) {
      el.innerHTML = '<span class="rc-on"></span>' + esc(status.model || 'Gemini') +
        (status.odds ? ' · cuotas ✓' : ' · cuotas ESPN');
    } else {
      el.innerHTML = '<span class="rc-off"></span>Modo local · sin API';
    }
  }

  function renderMessages() {
    var body = $('rcBody');
    if (!body) return;
    body.innerHTML = '';
    msgs.forEach(function (m) {
      var row = document.createElement('div');
      row.className = 'rc-msg ' + m.role;
      var bub = document.createElement('div');
      bub.className = 'rc-bub';
      bub.innerHTML = fmt(m.text) + (m.meta ? '<span class="rc-src">' + esc(m.meta) + '</span>' : '');
      row.appendChild(bub);
      body.appendChild(row);
    });
    if (typingEl) body.appendChild(typingEl);
    body.scrollTop = body.scrollHeight;
  }

  function addMsg(role, text, meta) {
    msgs.push({ role: role, text: text, meta: meta || '', ts: Date.now() });
    saveMsgs();
    if (isOpen) renderMessages();
  }

  function showTyping(on) {
    var body = $('rcBody');
    if (!body) return;
    if (on && !typingEl) {
      typingEl = document.createElement('div');
      typingEl.className = 'rc-msg bot';
      typingEl.innerHTML = '<div class="rc-bub rc-typing"><i></i><i></i><i></i></div>';
      body.appendChild(typingEl);
      body.scrollTop = body.scrollHeight;
    } else if (!on && typingEl) {
      if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
      typingEl = null;
    }
  }

  /* ---------------- equipos / ligas ---------------- */
  function allTeamNames() {
    var names = [];
    try {
      if (typeof poolAll === 'function') {
        poolAll().forEach(function (t) { if (t && t.es) names.push(t.es); });
      }
    } catch (e) {}
    // Fallback mínimo si la app todavía no cargó sus datos
    if (!names.length && typeof TEAMS !== 'undefined') {
      TEAMS.forEach(function (t) { if (t && t.es) names.push(t.es); });
    }
    return names.filter(function (v, i, a) { return a.indexOf(v) === i; });
  }

  // Devuelve hasta `limit` equipos mencionados, priorizando la liga activa.
  function extractTeams(text, limit) {
    limit = limit || 2;
    var hay = norm(text);
    if (!hay) return [];
    var pools = [];
    try {
      if (typeof poolTeams === 'function') pools.push(poolTeams().map(function (t) { return t.es; }));
    } catch (e) {}
    pools.push(allTeamNames());

    var seen = {};
    var hits = [];
    pools.forEach(function (pool, rank) {
      pool.forEach(function (name) {
        if (!name || seen[name]) return;
        var n = norm(name);
        if (n.length < 3) return;
        var idx = hay.indexOf(n);
        if (idx < 0) return;
        // límites de palabra para evitar coincidencias dentro de otra palabra
        var before = idx === 0 ? ' ' : hay.charAt(idx - 1);
        var after = hay.charAt(idx + n.length) || ' ';
        if (!/[\s]/.test(before) || !/[\s]/.test(after)) return;
        seen[name] = 1;
        hits.push({ name: name, idx: idx, len: n.length, rank: rank });
      });
    });

    // descartar nombres contenidos dentro de otro nombre más largo
    // (ej.: "Chile" dentro de "Universidad de Chile", "Madrid" dentro de "Real Madrid")
    hits = hits.filter(function (h) {
      return !hits.some(function (o) {
        return o !== h && o.rank <= h.rank && o.idx <= h.idx &&
          (o.idx + o.len) >= (h.idx + h.len) && o.len > h.len;
      });
    });

    hits.sort(function (a, b) { return (a.idx - b.idx) || (a.rank - b.rank) || (b.len - a.len); });

    var out = [], used = {};
    for (var i = 0; i < hits.length && out.length < limit; i++) {
      var key = norm(hits[i].name);
      if (used[key]) continue;
      used[key] = 1;
      out.push(hits[i].name);
    }
    return out;
  }

  function findLeague(text) {
    if (typeof LEAGUES === 'undefined') return null;
    var q = norm(text);
    var ids = Object.keys(LEAGUES);
    for (var i = 0; i < ids.length; i++) {
      var L = LEAGUES[ids[i]];
      var names = [ids[i], L.name, L.espn, L.abbreviation].filter(Boolean).map(norm);
      for (var j = 0; j < names.length; j++) {
        if (names[j] && q.indexOf(names[j]) >= 0) return { id: ids[i], league: L };
      }
    }
    return null;
  }

  /* ---------------- modelo local ---------------- */
  async function modelFor(A, B) {
    if (typeof state === 'undefined' || typeof runSim !== 'function') return null;
    var ta = typeof findAnyTeam === 'function' ? findAnyTeam(A) : null;
    var tb = typeof findAnyTeam === 'function' ? findAnyTeam(B) : null;
    if (!ta || !tb) return null;

    state.A = ta.es;
    state.B = tb.es;
    try {
      if (typeof renderPicker === 'function') { renderPicker('A'); renderPicker('B'); }
      if (typeof fillAutoParams === 'function') fillAutoParams(false);
      if (typeof ensureFormFor === 'function') {
        await Promise.race([ensureFormFor(ta.es, tb.es), delay(4000)]);
      }
      if (typeof fillAutoParams === 'function') fillAutoParams(true);
      else if (typeof runSim === 'function') runSim(false);
    } catch (e) { return null; }

    var p = (typeof lastPrediction !== 'undefined') ? lastPrediction : null;
    if (!p) return null;
    return p;
  }

  function predictionText(p) {
    var top = Math.max(p.pH, p.pD, p.pA);
    var fav = (p.pH >= p.pD && p.pH >= p.pA) ? ('gana ' + p.A)
      : (p.pA >= p.pD ? ('gana ' + p.B) : 'empate');
    var conf = top >= 0.70 ? 'ALTA' : (top >= 0.45 ? 'MEDIA' : 'BAJA');
    return '**' + p.A + ' vs ' + p.B + '** · modelo Rocky\n' +
      '- 1X2: **' + pct(p.pH) + ' / ' + pct(p.pD) + ' / ' + pct(p.pA) + '** (' + fav + ')\n' +
      '- Marcador más probable: **' + p.si + '-' + p.sj + '** (' + pct(p.sp) + ')\n' +
      '- xG: ' + p.xgH.toFixed(2) + ' – ' + p.xgA.toFixed(2) + '\n' +
      '- Over 2.5: ' + pct(p.o25) + ' · Ambos marcan: ' + pct(p.btts) + '\n' +
      '- Confianza del resultado: **' + conf + '**\n\n' +
      'Cargué el partido en el Predictor. Si querés, pedime las cuotas y comparo el valor.';
  }

  /* ---------------- cerebro local ---------------- */
  async function localBrain(text) {
    var t = norm(text);
    var league = currentLeague();

    // Saludo / ayuda
    if (/^(hola|buenas|buen dia|hey|que tal|hello)\b/.test(t) && t.length < 30) {
      return { text: welcomeText() };
    }
    if (/\b(ayuda|que podes hacer|qué podés hacer|como funciona|help)\b/.test(t) && t.length < 60) {
      return { text: welcomeText() };
    }

    // Simulación explícita (sin intención de apuestas)
    var betting = /\b(cuota|cuotas|odds|apuesta|apuestas|apostar|valor|value|handicap|over|under|ambos marcan|btts|bankroll|stake|combinada|parlay|ganancia|ev)\b/.test(t);
    var wantsSim = /\b(simula|simul[aá]|simular|pronostica|pronostico|pronosticar|predice|prediccion|predecir|quien gana|quien va a ganar|como sale|resultado del partido)\b/.test(t);
    var mentionMatch = wantsSim || /\b(vs|contra)\b/.test(t);
    var dataIntent = /\b(ultimos|ultima|forma|racha|tabla|posiciones|clasificacion|estadisticas|historial|goleadores|lesiones|bajas|alineacion|arbitro|sede|cuando juega|proximo|proximos|valor|cuota|cuotas)\b/.test(t);
    if (mentionMatch && !betting && !dataIntent) {
      var teams = extractTeams(text, 2);
      if (teams.length >= 2 && (wantsSim || t.split(' ').length <= 6)) {
        if (typeof showView === 'function') showView('match');
        var p = await modelFor(teams[0], teams[1]);
        if (p) {
          if (typeof runSim === 'function') runSim(true);
          return { text: predictionText(p) };
        }
        return { text: 'No encontré a **' + teams[0] + '** vs **' + teams[1] + '** en la base de equipos. Probá con el nombre tal como aparece en el Predictor.' };
      }
      if (wantsSim && teams.length === 1) {
        return { text: 'Me falta el rival. Escribí, por ejemplo: «simulá ' + teams[0] + ' vs Brasil».' };
      }
    }

    // Historial / aciertos
    if (/\b(mis aciertos|aciertos|precision del modelo|precisión del modelo|calibracion|calibración|como voy|historial del modelo|rendimiento del modelo|estadisticas del modelo)\b/.test(t)) {
      if (typeof computeLearning === 'function') computeLearning();
      if (typeof LEARN !== 'undefined' && LEARN) {
        var n = LEARN.n || 0;
        if (!n) {
          return { text: 'Todavía no hay partidos evaluados en **' + (league ? league.name : 'esta liga') + '**.\n\nCargá resultados reales en **Rendimiento** y te calculo aciertos, sesgo y calibración.' };
        }
        return {
          text: '**' + (league ? league.name : 'Liga activa') + '** · ' + n + ' partidos evaluados\n' +
            '- Acierto 1X2: **' + pct(LEARN.accRes / n) + '**\n' +
            '- Marcador exacto: ' + pct(LEARN.accScore / n) + '\n' +
            '- Over/Under 2.5: ' + pct(LEARN.accOU / n) + '\n' +
            '- Ambos marcan: ' + pct(LEARN.accBtts / n) + '\n' +
            '- Error medio de goles: ' + (LEARN.avgErr || 0).toFixed(2) + '\n' +
            '- Sesgo: ' + ((LEARN.bias || 0) > 0 ? 'el modelo se queda **corto** en goles' : (LEARN.bias || 0) < 0 ? 'el modelo **sobreestima** goles' : 'sin sesgo relevante') + '\n\n' +
            'Con ' + n + ' partidos, tomalo como referencia: la muestra todavía es chica.'
        };
      }
    }

    // Navegación
    var navMatch = t.match(/\b(abre|abrir|ir a|ve a|vamos a|ll[eé]vame a|muestra|mostrar)\b/);
    var viewWords = [
      ['predictor', 'match'], ['pronosticador', 'match'], ['simulador', 'match'],
      ['en vivo', 'envivo'], ['envivo', 'envivo'],
      ['cuadro', 'bracket'], ['bracket', 'bracket'],
      ['tabla', 'stats'], ['posiciones', 'stats'], ['estadisticas', 'stats'],
      ['cartilla', 'cartilla'], ['bet builder', 'cartilla'],
      ['historial', 'rend'], ['rendimiento', 'rend'],
      ['resumen', 'resumen'], ['inicio', 'resumen'],
      ['idolo', 'idolo'], ['ranking', 'ranking']
    ];
    if (navMatch) {
      for (var i = 0; i < viewWords.length; i++) {
        if (t.indexOf(viewWords[i][0]) >= 0 && typeof showView === 'function') {
          showView(viewWords[i][1]);
          return { text: 'Listo, abrí **' + viewWords[i][0] + '**.' };
        }
      }
    }
    // Sin IA: si piden una sección por nombre, la abrimos igual
    if (!status.ai && t.split(' ').length <= 4) {
      for (var k = 0; k < viewWords.length; k++) {
        if (t.indexOf(viewWords[k][0]) >= 0 && typeof showView === 'function') {
          showView(viewWords[k][1]);
          return { text: 'Listo, abrí **' + viewWords[k][0] + '**.' };
        }
      }
    }

    // Cambiar de liga
    if (/\b(cambia|cambiar|pon|poner|liga)\b/.test(t)) {
      var found = findLeague(t);
      if (found && typeof setLeague === 'function') {
        setLeague(found.id);
        return { text: 'Cambié la competición a **' + found.league.name + '**.' };
      }
    }

    // Conceptos de apuestas / modelo
    if (t.length < 120) {
      if (/\bvalue\b|\bvalor esperado\b|\bev\b/.test(t)) {
        return { text: '**Value (valor esperado)**\n' +
          'EV = (probabilidad del modelo × cuota decimal) − 1.\n' +
          '- Si EV > 0, la cuota paga más de lo que el modelo considera justo.\n' +
          '- Ejemplo: modelo 45% y cuota 2.50 → 0.45 × 2.50 − 1 = **+0.125** (12,5% teórico).\n\n' +
          'Ojo: el value depende de que el modelo esté bien calibrado. Una cuota con value puede perder igual; la ventaja solo se ve en muchas apuestas.' };
      }
      if (/\bbankroll\b|\bstake\b|\bcuanto apostar\b|\bcuánto apostar\b|\bgestion\b|\bgestion de banca\b/.test(t)) {
        return { text: '**Gestión de bankroll**\n' +
          '- Stake plano: 1–2% del bankroll por apuesta. Nunca más del 5%.\n' +
          '- No persigas pérdidas ni dupliques para recuperar.\n' +
          '- Separá el bankroll del dinero de todos los días.\n' +
          '- Registrá cada apuesta (cuota, stake, resultado) para medir tu ROI real.\n\n' +
          'La app puede medir aciertos del modelo, pero no garantiza ganancias.' };
      }
      if (/\boverround\b|\bmargen de la casa\b|\bmargen\b/.test(t)) {
        return { text: '**Overround / margen de la casa**\n' +
          'Es el exceso de probabilidad implícita que cobran las casas. Si 1/cuota local + 1/cuota empate + 1/cuota visitante = 1.06, el margen es **6%**.\n\n' +
          'Comparar cuotas entre casas y buscar mercados con menos margen (asiáticas, exchanges) mejora el valor esperado.' };
      }
      if (/\bdixon\b|\bcoles\b|\bpoisson\b|\bxg\b|\brho\b/.test(t)) {
        return { text: '**El modelo de la app**\n' +
          '- **Poisson bivariado:** estima los goles de cada equipo a partir de su xG (λ).\n' +
          '- **Dixon-Coles:** corrige la dependencia en marcadores bajos (0-0, 1-0, 1-1) con el parámetro ρ.\n' +
          '- **Ajustes:** rating base + forma reciente ponderada por rival + calibración con resultados reales.\n\n' +
          'El resultado es una distribución exacta de marcadores, no un Monte Carlo con ruido.' };
      }
    }

    return null;
  }

  /* ---------------- contexto para la IA ---------------- */
  async function buildContext(userText) {
    var L = currentLeague() || {};
    if (typeof computeLearning === 'function') {
      try { computeLearning(); } catch (e) {}
    }
    var n = (typeof LEARN !== 'undefined' && LEARN && LEARN.n) || 0;

    var ctx = {
      fecha: new Date().toISOString().slice(0, 10),
      liga_activa: L.name || String(CURRENT_LEAGUE || ''),
      liga_espn: L.espn || '',
      equipos_predictor: (typeof state !== 'undefined' && state) ? [state.A, state.B] : [],
      calibracion_modelo: n ? {
        partidos: n,
        acierto_1x2_pct: +((LEARN.accRes / n) * 100).toFixed(1),
        acierto_marcador_pct: +((LEARN.accScore / n) * 100).toFixed(1),
        acierto_over25_pct: +((LEARN.accOU / n) * 100).toFixed(1),
        acierto_ambos_marcan_pct: +((LEARN.accBtts / n) * 100).toFixed(1),
        error_medio_goles: +(LEARN.avgErr || 0).toFixed(2),
        sesgo_goles: +(LEARN.bias || 0).toFixed(2)
      } : null
    };

    if (typeof HIST !== 'undefined' && Array.isArray(HIST) && HIST.length) {
      ctx.historial_reciente = HIST.slice(0, 6).map(function (h) {
        return {
          partido: h.A + ' vs ' + h.B,
          prediccion: h.si + '-' + h.sj,
          real: (h.actualA != null ? h.actualA + '-' + h.actualB : null),
          confianza: h.sp
        };
      });
    }

    var teams = extractTeams(userText, 2);
    if (teams.length >= 2) {
      var p = await modelFor(teams[0], teams[1]);
      if (p) {
        ctx.partido_consultado = { local: p.A, visitante: p.B };
        ctx.prediccion_modelo = {
          fuente: 'modelo Rocky (Poisson bivariado + Dixon-Coles)',
          prob_1x2: { local: +p.pH.toFixed(4), empate: +p.pD.toFixed(4), visitante: +p.pA.toFixed(4) },
          marcador_mas_probable: p.si + '-' + p.sj,
          prob_marcador: +p.sp.toFixed(4),
          xg: { local: +p.xgH.toFixed(2), visitante: +p.xgA.toFixed(2) },
          over_2_5: +p.o25.toFixed(4),
          ambos_marcan: +p.btts.toFixed(4),
          corners_totales: +(p.predCornersTot || 0).toFixed(1),
          amarillas_totales: +(p.predYellowTot || 0).toFixed(1),
          lambda_local: +p.lamH.toFixed(2),
          lambda_visitante: +p.lamA.toFixed(2),
          rho: +p.rho.toFixed(3)
        };
      }
    }
    return ctx;
  }

  /* ---------------- IA ---------------- */
  async function callAI(userText) {
    var history = msgs.slice(-16).map(function (m) {
      return { role: m.role === 'user' ? 'user' : 'model', text: m.text };
    });
    if (!history.length || history[history.length - 1].text !== userText) {
      history.push({ role: 'user', text: userText });
    }

    var context = await buildContext(userText);

    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, AI_TIMEOUT);
    var r, data;
    try {
      r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, context: context }),
        signal: ctrl.signal
      });
      data = await r.json().catch(function () { return {}; });
    } catch (e) {
      if (e && e.name === 'AbortError') throw new Error('la IA tardó demasiado');
      throw new Error('no se pudo conectar con el proxy /api/chat (¿corrés `node serve.js`?)');
    } finally {
      clearTimeout(timer);
    }

    if (!r.ok) throw new Error(data.error || ('HTTP ' + r.status));
    if (!data.reply) throw new Error('la IA devolvió una respuesta vacía');

    if (data.model && data.model !== status.model) {
      status.model = data.model;
      renderStatus();
    }

    var meta = '';
    if (Array.isArray(data.tools) && data.tools.length) {
      var names = { buscar_partidos: 'ESPN partidos', detalle_partido: 'ESPN ficha', ultimos_partidos: 'ESPN forma', cuotas: 'cuotas', tabla: 'ESPN tabla' };
      var uniq = [];
      data.tools.forEach(function (n) { var v = names[n] || n; if (uniq.indexOf(v) < 0) uniq.push(v); });
      meta = '🔎 ' + uniq.join(' · ');
    }
    return { reply: data.reply, meta: meta };
  }

  function noAIHelp(short) {
    var base = 'No hay IA conectada. Para activarla:\n' +
      '1. Generá una API key en **aistudio.google.com/apikey** (la suscripción Gemini Plus no incluye API).\n' +
      '2. Creá un archivo `.env` en la carpeta del proyecto:\n' +
      '   `GEMINI_API_KEY=tu_key`\n' +
      '3. Opcional para cuotas de casas: `ODDS_API_KEY=...` (the-odds-api.com).\n' +
      '4. Reiniciá `node serve.js` y recargá la página.';
    if (short) return base;
    return base + '\n\nMientras tanto puedo **simular partidos**, revisar tus **aciertos** y explicarte **value, bankroll o Dixon-Coles**.';
  }

  /* ---------------- envío ---------------- */
  async function send(forced) {
    var input = $('rcInput');
    var text = String(forced != null ? forced : (input ? input.value : '')).trim();
    if (!text || busy) return;

    if (!isOpen) open();
    if (input) { input.value = ''; autoGrow(); }

    addMsg('user', text);
    busy = true;
    var btn = $('rcSend');
    if (btn) btn.disabled = true;
    showTyping(true);

    try {
      var local = await localBrain(text);
      if (local) {
        showTyping(false);
        addMsg('bot', local.text, local.meta);
      } else if (!status.ai) {
        showTyping(false);
        addMsg('bot', noAIHelp(true));
      } else {
        var out = await callAI(text);
        showTyping(false);
        addMsg('bot', out.reply, out.meta);
      }
    } catch (e) {
      showTyping(false);
      var reason = String(e && e.message ? e.message : 'error desconocido').replace(/[.\s]+$/, '');
      var msg = '⚠️ No pude responder: ' + reason + '.';
      if (!status.ai) msg += '\n\n' + noAIHelp();
      else msg += '\n\nMientras tanto puedo simular un partido, revisar tus aciertos o explicarte conceptos.';
      addMsg('bot', msg);
    } finally {
      busy = false;
      if (btn) btn.disabled = false;
      if (isOpen) renderMessages();
      if (isOpen) { try { $('rcInput').focus(); } catch (e) {} }
    }
  }

  /* ---------------- estado del backend ---------------- */
  async function checkStatus() {
    try {
      var r = await fetch('/api/chat/status', { cache: 'no-store' });
      if (!r.ok) throw 0;
      var d = await r.json();
      status = { ai: !!d.ai, model: d.model || '', odds: !!d.odds };
    } catch (e) {
      status = { ai: false, model: '', odds: false };
    }
    renderStatus();
  }

  /* ---------------- init ---------------- */
  function init() {
    buildUI();
    msgs = loadMsgs();
    renderStatus();
    if (!msgs.length) addMsg('bot', welcomeText());
    else renderMessages();
    checkStatus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
