const cacheName = 'cache-v1';
const resourcesToPrecache = [
  '../',
  '../index.html',
  '../css/main.css',
  'main.js',
  'soundmeter.js'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for: ', event.request.url);
});