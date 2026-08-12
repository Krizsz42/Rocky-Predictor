// Service worker de Rocky Predictor · Mundial 2026 (PWA)
// Estrategia: network-first para el cascarón (siempre trae lo último si hay internet),
// con caché de respaldo para uso sin conexión. Sube el número de versión al desplegar cambios.
const CACHE = 'rocky-predictor-v3';
const ASSETS = ['./', './index.html', './engine.js', './logo.js', './favicon.ico', './favicon.png', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Llamadas externas (ESPN, flagcdn, CDN html2canvas): directo a la red, sin tocar caché.
  if (url.origin !== location.origin || e.request.method !== 'GET') return;
  // App shell: network-first → última versión si hay internet; caché si no hay.
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});

// ===== Notificaciones push (goles) =====
self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) { data = { body: e.data && e.data.text() }; }
  const title = data.title || '⚽ ¡Gol!';
  const opts = {
    body: data.body || 'Hubo un gol en un partido.',
    icon: './favicon.png',
    badge: './favicon.png',
    tag: data.tag || 'goal',
    renotify: true,
    data: { url: data.url || './' }
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(cs => {
      for (const c of cs) { if ('focus' in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});
