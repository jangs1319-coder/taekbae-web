// 택배등기대조2 웹판 1.0.25 — 받아 둔 앱을 먼저 열고(인터넷 없어도 됨), 뒤에서 새 판을 확인
const V = 'tb2-1.0.25-99ec1a7bb3';
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  const key = r.mode === 'navigate' ? 'index.html' : r;
  e.respondWith(caches.open(V).then((c) => c.match(key, { ignoreSearch: true }).then((hit) => hit || fetch(r).then((res) => { if (res.ok && r.mode !== 'navigate') c.put(r, res.clone()); return res; }))));
});
