const CACHE = 'video-player-20261030-002013';
const ASSETS = [
  '/ipad-video-player/',
  '/ipad-video-player/index.html',
  '/ipad-video-player/manifest.json',
  '/ipad-video-player/icon-192.png',
  '/ipad-video-player/icon-512.png'
];

self.addEventListener('install', e => {
  // cache:'reload' でHTTPキャッシュ(GitHub Pagesは10分)を通さず取得する。
  // 通すと新しいSWに古いindex.htmlが保存され、更新しても旧版のままになる
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // 画面(HTML)はネット優先: オンラインなら常に最新版、オフライン時だけ保存済みを使う
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put('/ipad-video-player/index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('/ipad-video-player/index.html').then(r => r || caches.match(req)))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(r => r || fetch(req))
  );
});
