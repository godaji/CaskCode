// 구 /frugal/ PWA 자가해제 — 캐시 전체 삭제 후 등록 해제(새 /dj/ 로 이동 유도).
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll()) c.navigate(c.url);
})()));
