<div align="center">

<img src="favicon.png" alt="Rocky Predictor" width="96" height="96" />

# ⚽ Rocky Predictor · Fútbol con datos

**Predicciones de fútbol con un modelo estadístico real, marcador en vivo, cuadro de eliminatorias interactivo, bet builder y modo carrera.**

Poisson bivariado + ajuste Dixon-Coles · datos en vivo de ESPN · 100 % en el navegador · optimizado para celular e instalable como app

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![Sin dependencias](https://img.shields.io/badge/dependencias-0-brightgreen)
![Responsive](https://img.shields.io/badge/m%C3%B3vil-optimizado-37c978)
![Uso](https://img.shields.io/badge/uso-educativo%20%2F%20pron%C3%B3sticos-orange)

</div>

---

## ✨ ¿Qué es?

Rocky Predictor es una app web que **estima probabilidades de partidos** usando un modelo de goles tipo **Poisson bivariado con corrección de Dixon-Coles**. No inventa números "a ojo": parte del rating de fuerza de cada equipo, lo ajusta con la **forma reciente real** (datos de ESPN) y lo **calibra** con los resultados que se van jugando.

Funciona con **múltiples competiciones**: Mundial 2026, Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League, Copa Libertadores, Copa Sudamericana, Liga Argentina y Campeonato Chileno.

Todo corre en el navegador, sin backend ni base de datos: los datos en vivo salen de la API pública de ESPN y tu historial/cartillas/carreras se guardan localmente en tu dispositivo.

---

## 🚀 Funciones

### ⚽ Predictor
- **Modo automático**: elige dos equipos (selector visual con escudos y banderas) y obtén al instante 1X2, marcador más probable, goles esperados (xG), Over/Under, Ambos Marcan, córners, tarjetas y un índice de confianza.
- **Modo manual**: carga tus propios λ (xG), el ρ de Dixon-Coles y promedios de córners/tarjetas para un control fino.
- **Herramientas ESPN / IA**: buscador de contexto real (alineaciones, sedes, fechas), generador de prompt para IA y pegado directo de la respuesta para cargar parámetros.
- **Mapa de calor de marcadores** con la distribución exacta del modelo y **gráficos profesionales** (1X2, goles, radar, escalera de córners y tarjetas).
- **Modo eliminatoria**: quién avanza considerando prórroga y penales.

### 🔴 En vivo
- Selector de **fechas** y filtro **Todos / En vivo**, con autorefresco periódico.
- Barra superior con los **partidos del día** (por jugar, en juego y recientes).
- Al tocar un partido se abre la **comparación del modelo vs lo real**: marcador, minuto, goleadores y barras por equipo de **posesión, remates, tiros al arco, córners y tarjetas**.

### 🏆 Cuadro (bracket)
- **Cuadro visual** de eliminatorias con escudos a ambos lados y el trofeo al centro.
- Editable directo sobre el cuadro: cambia equipos y marca tu ganador **en cualquier fase**.
- **Simulación Monte Carlo** del torneo completo (probabilidad de llegar a cada ronda y ser campeón).
- Se sincroniza con **resultados reales de ESPN** y respeta los cruces ya jugados.

### 🎟️ Arma tu cartilla (bet builder)
- Combina mercados de varios partidos y calcula la **probabilidad de que toda la cartilla se cumpla**, con su cuota justa equivalente.
- Correlación **real dentro de cada partido** e independencia entre partidos.
- **Guarda tus cartillas** y se **siguen solas**: marcan ✓ / ✗ / ⏳ cada selección conforme se juegan los partidos.

### 📈 Historial y aprendizaje
- Guarda predicciones, carga resultados reales y mide aciertos (resultado, marcador exacto, Over/Under, Ambos Marcan).
- **Ingredientes del modelo** como interruptores: rating base, forma reciente ajustada por rival y calibración por partidos jugados.

### 👑 El Ídolo (modo carrera)
- Crea un jugador, entrena atributos y construye una **carrera de fútbol** completa: temporadas, partidos, mercado de pases, rivales, títulos y retiro.
- Mini-juegos (gol, penales, córner directo), idolatría y decisión de retirarse: ¿llegarás a ser leyenda?
- Historial exportable y guardado automático local.

### 📱 Navegación móvil
- **Barra de pestañas inferior** con las 5 vistas principales (Resumen, En vivo, Predictor, Cuadro, Tabla) al alcance del pulgar.
- Menú lateral mejorado: botones más grandes, **gesto de deslizar para cerrar**, overlay y bloqueo de scroll de fondo.
- Vistas **resumen, en vivo y predictor optimizadas** para pantallas chicas: tarjetas de partido en una línea, KPIs en 2 columnas, botones a todo el ancho y respeto de zonas seguras (notch / home indicator).

---

## 🧠 Cómo funciona el modelo

| Ingrediente | Qué hace |
|---|---|
| **Rating base** | Fuerza de cada equipo (aprox. ranking FIFA). Es la base y siempre está activa. |
| **Forma reciente (ESPN)** | Ajusta el rating según el **rendimiento real** en el torneo, **ponderado por la calidad del rival** (ganarle a un grande pesa más que golear a un débil). |
| **Calibración** | Factor global que corrige el sesgo de goles/córners comparando predicciones vs resultados reales. |

Con esos ingredientes se calculan los goles esperados (λ) de cada equipo, se aplica **Dixon-Coles** para corregir los marcadores bajos (0-0, 1-0, 1-1) y se obtiene la **distribución exacta** de resultados (equivalente a un Monte Carlo, pero sin ruido).

---

## 📲 Instalar como app

Agrega la app a la pantalla de inicio (debe servirse por **HTTPS** o `localhost`):

1. Abre la URL (p. ej. GitHub Pages o Netlify) en el navegador del móvil.
2. **iPhone (Safari)**: botón *Compartir* → **Añadir a pantalla de inicio** (usa `favicon.png` como ícono vía *apple-touch-icon*).
3. **Android (Chrome)**: menú **⋮** → **Agregar a pantalla principal**.

Queda a pantalla completa con ícono propio (también visible en la pestaña del navegador y en el logo de la sidebar).

---

## 🛠️ Uso local

Para ver los datos de ESPN en vivo hace falta el **proxy local** incluido (la API bloquea peticiones directas desde el navegador por CORS):

```bash
node serve.js          # → http://localhost:8011
node serve.js 8080     # puerto a elección
```

Abre `http://localhost:8011` (o `http://TU-IP-LOCAL:8011` desde el móvil en la misma WiFi).

> Sin el proxy, la interfaz carga pero los datos de ESPN no (solo servidores estáticos como `python -m http.server`).

---

## 📁 Estructura

```
.
├── index.html              # interfaz, estilos y responsive
├── js/
│   ├── inline_scripts.js   # lógica principal (vistas, datos, modelo)
│   └── modules/
│       ├── competitions.js   # competiciones y datos ESPN
│       ├── match_engine.js   # motor de predicción (Poisson + Dixon-Coles)
│       ├── team_picker.js    # selector de equipos
│       ├── teams_data.js     # base de equipos
│       ├── bracket_system.js # cuadro y Monte Carlo
│       ├── history_learning.js # historial y calibración
│       ├── idolo_career.js   # modo carrera "El Ídolo"
│       └── ui_functions.js   # helpers de interfaz
├── serve.js                # servidor local + proxy ESPN (CORS)
├── modo_carrera_equipos_2026.json  # datos del modo carrera
├── favicon.png / favicon.ico       # ícono (pestaña, sidebar e iOS)
└── SEGMENTACION.md         # notas de arquitectura
```

---

## 🌐 Datos

Los datos en vivo (partidos, marcadores, estadísticas, goleadores) provienen de la **API pública de ESPN**. Tu historial, predicciones, cartillas y carreras se guardan en el **almacenamiento local** de tu navegador; nada se envía a ningún servidor propio.

---

## ⚠️ Aviso

Este proyecto es de **uso educativo y de pronóstico**. Las cifras son **probabilidades del modelo, no certezas**: los mercados de córners y tarjetas son más ruidosos que los goles, y las tarjetas dependen mucho del árbitro. Úsalo con criterio y responsabilidad.

<div align="center">

Hecho con ⚽, estadística y un poco de fe futbolera.

</div>
