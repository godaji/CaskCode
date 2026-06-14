/* 위스키 적금 PWA 서비스워커 — 앱 셸 캐시(오프라인) + floor 네트워크 우선 */
const CACHE = 'frugal-v1';
const SHELL = ['./', 'index.html', 'app.css', 'app.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // floor JSON = 네트워크 우선(최신 수집값), 실패 시 캐시
  if (url.pathname.endsWith('whisky_floor.json')) {
    e.respondWith(
      fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; })
        .catch(() => caches.match(req))
    );
    return;
  }
  // 그 외 = 캐시 우선(앱 셸), 없으면 네트워크
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
