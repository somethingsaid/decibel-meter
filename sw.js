const cacheName = 'cache-v1';
const resourcesToPrecache = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/main.js',
  '/js/soundmeter.js'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for: ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activate event!');
});