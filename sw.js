const CACHE_NAME = 'gojeon-20260520';
const ASSETS = [
  '/gojeon/',
  '/gojeon/index.html',
  '/gojeon/chaegundam/',
  '/gojeon/chaegundam/index.html',
  '/gojeon/chaegundam/data.js',
  '/gojeon/banyasimgyeong/',
  '/gojeon/banyasimgyeong/index.html',
  '/gojeon/banyasimgyeong/data.js'
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
    caches.open(CACHE_NAME).then(cache =>
      fetch(e.request)
        .then(r => {
          cache.put(e.request, r.clone());
          return r;
        })
        .catch(() => cache.match(e.request))
    )
  );
});
