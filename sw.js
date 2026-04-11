const CACHE_NAME = 'gojeon-v1';
const ASSETS = [
  '/gojeon/',
  '/gojeon/index.html',
  '/gojeon/chaegundam/',
  '/gojeon/chaegundam/index.html',
  '/gojeon/chaegundam/data.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
