<div align="center">

<img src="favicon.png" alt="Rocky Predictor" width="96" height="96" />

# ⚽ Rocky Predictor · Mundial 2026

**Predicciones de fútbol con un modelo estadístico real, marcador en vivo, cuadro de eliminatorias interactivo y tu propio "bet builder".**

Poisson bivariado + ajuste Dixon-Coles · datos en vivo de ESPN · 100 % en el navegador · instalable como app (PWA)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-instalable-5A0FC8?logo=pwa&logoColor=white)
![Sin dependencias](https://img.shields.io/badge/dependencias-0-brightgreen)
![Uso](https://img.shields.io/badge/uso-educativo%20%2F%20pron%C3%B3sticos-orange)

</div>

---

## ✨ ¿Qué es?

Rocky Predictor es una app web que **estima probabilidades de partidos del Mundial 2026** usando un modelo de goles tipo **Poisson bivariado con corrección de Dixon-Coles**. No inventa números "a ojo": parte del rating de fuerza de cada selección, lo ajusta con la **forma reciente real** (datos de ESPN) y lo **calibra** con los resultados que se van jugando.

Todo corre en el navegador, sin backend ni base de datos: los datos en vivo salen de la API pública de ESPN y tu historial/cartillas se guardan localmente en tu dispositivo.

---

## 🚀 Funciones

### ⚽ Partido
- **Modo automático**: elige dos selecciones (selector visual con banderas) y obtén al instante 1X2, marcador más probable, goles esperados (xG), Over/Under, Ambos Marcan, córners, tarjetas y un índice de confianza.
- **Modo manual**: carga tus propios λ (xG) y el ρ de Dixon-Coles para un control fino.
- **Mapa de calor de marcadores** con la distribución exacta del modelo.
- **Modo eliminatoria**: quién avanza considerando prórroga y penales.

### 🔴 En vivo
- Barra con los **partidos del día** (por jugar, en juego y recientes), autorefresco cada **15 segundos**.
- Al tocar un partido se abre con la **predicción del modelo vs lo real**: marcador y minuto, goleadores (con penales separados por país), y barras por equipo de **posesión, remates, tiros al arco, córners y tarjetas** comparadas con lo que decía el modelo.

### 🏆 Camino al título (bracket)
- **Cuadro visual** de eliminatorias con banderas a ambos lados y el trofeo al centro.
- Editable directo sobre el cuadro: cambia selecciones y marca tu ganador **en cualquier fase** (predicción de fanático).
- **Simulación Monte Carlo** del torneo completo (probabilidad de llegar a cada ronda y ser campeón).
- Se sincroniza con **resultados reales de ESPN** y respeta los cruces ya jugados.

### 🎟️ Arma tu cartilla (bet builder)
- Combina mercados de varios partidos y calcula la **probabilidad de que toda la cartilla se cumpla**, con su cuota justa equivalente.
- Correlación **real dentro de cada partido** (los goles no se multiplican ingenuamente) e independencia entre partidos.
- **Guarda tus cartillas** y se **siguen solas**: marcan ✓ / ✗ / ⏳ cada selección conforme se juegan los partidos.

### 📈 Historial y aprendizaje
- Guarda predicciones, carga resultados reales y mide aciertos (resultado, marcador exacto, Over/Under, Ambos Marcan).
- **Ingredientes del modelo** como interruptores: rating base, forma reciente ajustada por rival y calibración por partidos jugados.

---

## 🧠 Cómo funciona el modelo

| Ingrediente | Qué hace |
|---|---|
| **Rating base** | Fuerza de cada selección (aprox. ranking FIFA). Es la base y siempre está activa. |
| **Forma reciente (ESPN)** | Ajusta el rating según el **rendimiento real** en el torneo, **ponderado por la calidad del rival** (ganarle a un grande pesa más que golear a un débil). |
| **Calibración** | Factor global que corrige el sesgo de goles/córners comparando predicciones vs resultados reales. |

Con esos ingredientes se calculan los goles esperados (λ) de cada equipo, se aplica **Dixon-Coles** para corregir los marcadores bajos (0-0, 1-0, 1-1) y se obtiene la **distribución exacta** de resultados (equivalente a un Monte Carlo, pero sin ruido).

---

## 📲 Instalar como app (PWA)

La app es una **PWA**: se instala en iPhone y Android sin tiendas.

1. Abre la URL (servida por HTTPS, p. ej. Netlify o GitHub Pages) en el navegador del móvil.
2. **iPhone (Safari)**: botón *Compartir* → **Añadir a pantalla de inicio**.
3. **Android (Chrome)**: menú **⋮** → **Instalar aplicación**.

Queda a pantalla completa, con ícono propio y el cascarón funciona sin conexión.

---

## 🛠️ Uso local

No requiere instalación ni dependencias. Para probar en tu red (y verlo en el móvil) conviene un servidor estático simple:

```bash
# Python 3
python -m http.server 8000

# o con Node
npx serve
```

Luego abre `http://localhost:8000` (o `http://TU-IP-LOCAL:8000` desde el móvil en la misma WiFi).

> El *service worker* y la instalación PWA solo se activan en **HTTPS** o en **localhost**.

---

## 📁 Estructura

```
.
├── index.html      # interfaz y estilos
├── engine.js       # modelo, datos de ESPN, vistas y lógica
├── logo.js         # logo
├── manifest.json   # configuración PWA
├── sw.js           # service worker (offline + actualizaciones)
├── favicon.png     # ícono de la app
└── favicon.ico
```

---

## 🌐 Datos

Los datos en vivo (partidos, marcadores, estadísticas, goleadores) provienen de la **API pública de ESPN**. Tu historial, predicciones y cartillas se guardan en el **almacenamiento local** de tu navegador; nada se envía a ningún servidor propio.

---

## ⚠️ Aviso

Este proyecto es de **uso educativo y de pronóstico**. Las cifras son **probabilidades del modelo, no certezas**: los mercados de córners y tarjetas son más ruidosos que los goles, y las tarjetas dependen mucho del árbitro. Úsalo con criterio y responsabilidad.

<div align="center">

Hecho con ⚽, estadística y un poco de fe futbolera.

</div>
