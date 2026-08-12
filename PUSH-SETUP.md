# 🔔 Notificaciones de gol con Supabase — Guía paso a paso

Objetivo: que tu iPhone (PWA instalada) reciba un aviso cuando se marque un gol, aunque la app esté cerrada. Resolución aproximada: **~18–60 segundos**.

> Requisitos: cuenta gratis en **Supabase**, **Node** instalado (para generar claves y, opcional, el CLI de Supabase). Tu iPhone debe tener la app **agregada a la pantalla de inicio** (iOS 16.4+).

---

## 1) Generar las claves VAPID
En tu PC:
```bash
npx web-push generate-vapid-keys
```
Anota **Public Key** y **Private Key**.

## 2) Crear el proyecto en Supabase
- Entra a supabase.com → New project. Anota el **Project Ref** (el subdominio, ej. `abcd1234`) y tu **anon key** (Project Settings → API).

## 3) Crear las tablas y el cron
- Abre **SQL Editor** y pega el contenido de `supabase/sql/setup.sql`.
- Antes de ejecutar, reemplaza en la parte del cron:
  - `<PROJECT_REF>` por tu ref.
  - `<ANON_KEY>` por tu anon key.
- Ejecuta. (Si `pg_cron`/`pg_net` no se activan por SQL, habilítalos en **Database → Extensions**.)

## 4) Cargar los secretos de las funciones
En **Project Settings → Edge Functions → Secrets** (o con el CLI) agrega:
- `VAPID_PUBLIC` = tu public key
- `VAPID_PRIVATE` = tu private key
- `VAPID_SUBJECT` = `mailto:tucorreo@ejemplo.com`

(Las variables `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` ya vienen incluidas automáticamente.)

## 5) Desplegar las Edge Functions
Con el **Supabase CLI** (recomendado):
```bash
supabase login
supabase link --project-ref TU_PROJECT_REF
supabase functions deploy subscribe --no-verify-jwt
supabase functions deploy check-goals --no-verify-jwt
```
> También puedes crear ambas funciones desde el dashboard (Edge Functions → New) y pegar el código de `supabase/functions/*/index.ts`. Marca "Verify JWT = off".

## 6) Conectar la app
En `engine.js`, arriba del bloque de notificaciones, rellena:
```js
const PUSH = {
  vapidPublic: 'TU_VAPID_PUBLIC_KEY',
  subscribeUrl: 'https://TU_PROJECT_REF.functions.supabase.co/subscribe'
};
```
Vuelve a subir la app a Netlify/GitHub Pages.

## 7) Activar en el iPhone
1. Abre la PWA desde la **pantalla de inicio** (no desde Safari suelto).
2. Toca **🔔 Avisarme de goles** y acepta el permiso.
3. Listo: cuando el vigilante detecte un gol, te llega la notificación.

---

## Notas honestas
- **Retraso**: el cron corre cada 1 min y la función sondea 3 veces (~cada 18s), así que el aviso llega en ~18–60 s. No es instantáneo.
- **API no oficial de ESPN**: podría cambiar o limitar el acceso; el vigilante dejaría de detectar goles si eso pasa.
- **Límites gratis**: para uso personal el plan free de Supabase alcanza de sobra. Si tuvieras muchísimas invocaciones, revisa los límites de Edge Functions.
- **iOS**: la notificación solo funciona con la PWA instalada en la pantalla de inicio.
- Si el envío de push fallara por incompatibilidad de `web-push` en Deno, una alternativa es la librería `jsr:@negrel/webpush` (usa otro formato de claves VAPID).
- Para no golpear ESPN de más, puedes afinar el vigilante para que solo sondee rápido cuando hay partidos en vivo.
