// ===================== ROCKY PREDICTOR - ENGINE PRINCIPAL =====================
// Este archivo carga todos los módulos y exporta las funciones principales

// Cargar módulos en orden de dependencia
(function() {
  // 1. Utilidades + Datos de equipos (TEAMS, CLUB_TEAMS, FLAGS, norm, pc, etc.)
  const teamsScript = document.createElement('script');
  teamsScript.src = 'js/modules/teams_data.js';
  document.head.appendChild(teamsScript);
  
  // 2. Competiciones y ligas
  const compScript = document.createElement('script');
  compScript.src = 'js/modules/competitions.js';
  document.head.appendChild(compScript);
  
  // 3. Motor de simulación de partidos (Dixon-Coles)
  const matchScript = document.createElement('script');
  matchScript.src = 'js/modules/match_engine.js';
  document.head.appendChild(matchScript);
  
  // 4. Funciones de UI
  const uiScript = document.createElement('script');
  uiScript.src = 'js/modules/ui_functions.js';
  document.head.appendChild(uiScript);
  
  // 5. Selector visual de equipos
  const pickerScript = document.createElement('script');
  pickerScript.src = 'js/modules/team_picker.js';
  document.head.appendChild(pickerScript);
  
  // 6. Historial y aprendizaje
  const histScript = document.createElement('script');
  histScript.src = 'js/modules/history_learning.js';
  document.head.appendChild(histScript);
  
  // 7. Sistema de bracket/torneo
  const bracketScript = document.createElement('script');
  bracketScript.src = 'js/modules/bracket_system.js';
  document.head.appendChild(bracketScript);
  
  // 8. Modo Ídolo/Carrera
  const idoloScript = document.createElement('script');
  idoloScript.src = 'js/modules/idolo_career.js';
  document.head.appendChild(idoloScript);
  
  // Callback cuando todo esté cargado
  teamsScript.onload = function() {
    console.log('✅ Rocky Predictor Engine cargado correctamente');
    if (typeof window.onEngineReady === 'function') {
      window.onEngineReady();
    }
  };
})();

// Variables globales compartidas entre módulos
var CURRENT_LEAGUE = 'worldcup';
var modeAuto = null;
var out = null;
var HIST = [];
var LEARN = {apply:false, goalAdj:1, ready:false, n:0, accRes:0, accScore:0, accOU:0, accBtts:0, avgErr:0, bias:0};
var APPLY_FORM = true;
var BRACKET_SIZE = 32;
var BRACKET = [];
var PICKS = {};
var CONFIRMED = {};
var TEAM_FORM = {};
var idoloState = null;

// Funciones de inicialización global
function initRockyPredictor() {
  console.log('🚀 Inicializando Rocky Predictor...');
  loadHist();
  loadConfirmed();
  loadPicks();
  if (typeof renderTeamPicker === 'function') renderTeamPicker();
  if (typeof idoloLoad === 'function') idoloLoad();
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRockyPredictor);
} else {
  initRockyPredictor();
}
