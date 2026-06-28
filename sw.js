const CACHE = 'video-player-20260629-021210';
const ASSETS = [
  '/ipad-video-player/',
  '/ipad-video-player/index.html',
  '/ipad-video-player/manifest.json',
  '/ipad-video-player/icon-192.png',
  '/ipad-video-player/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
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
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
