/* Rutherford Scatter service worker.
   Bump CACHE whenever the cached asset list or caching behaviour changes;
   the old cache is dropped on activate. index.html is served network-first so
   a fresh deploy always reaches online users; static assets are cache-first
   with background refresh (stale-while-revalidate). Offline falls back to cache. */
const CACHE = 'rutherford-v1';
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // network-first: newest page when online, cached page when offline
    e.respondWith(
      fetch(req)
        .then(res => { caches.open(CACHE).then(c => c.put(req, res.clone())); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
  } else {
    // stale-while-revalidate for static assets
    e.respondWith(
      caches.match(req).then(cached => {
        const net = fetch(req)
          .then(res => { caches.open(CACHE).then(c => c.put(req, res.clone())); return res; })
          .catch(() => cached);
        return cached || net;
      })
    );
  }
});
