#!/usr/bin/env node
// Rocky Predictor - servidor local con proxy ESPN (resuelve el bloqueo CORS del navegador)
// Uso: node serve.js [puerto]    (default 8011)  → abrir http://localhost:8011
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = +(process.argv[2] || 8011);
const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.ico': 'image/x-icon', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'text/xml', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
};

const server = http.createServer(async (req, res) => {
  const u = url.parse(req.url, true);
  // Proxy ESPN: la app llama /espn?url=<api> para evitar el bloqueo CORS del navegador
  if (u.pathname === '/espn') {
    const target = u.query.url || '';
    if (!/^https:\/\/site\.api\.espn\.com\//.test(target)) {
      res.writeHead(403, { 'Access-Control-Allow-Origin': '*' });
      res.end('Solo se permite el proxy a site.api.espn.com');
      return;
    }
    try {
      const r = await fetch(target, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });
      const body = Buffer.from(await r.arrayBuffer());
      res.writeHead(r.status, {
        'Content-Type': r.headers.get('content-type') || 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(body);
    } catch (e) {
      res.writeHead(502, { 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ error: String(e) }));
    }
    return;
  }
  // Archivos estáticos
  let p;
  try { p = decodeURIComponent(u.pathname); } catch (_) { p = '/'; }
  if (p === '/') p = '/index.html';
  const f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Rocky Predictor en http://localhost:' + PORT + ' (proxy ESPN activo)');
});
