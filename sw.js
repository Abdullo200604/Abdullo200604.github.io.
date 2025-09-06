const CACHE_NAME = 'olivye-recipe-v3'; // Versiyani yangiladim
const urlsToCache = [
  './',              // Joriy papka
  './index.html',     // Joriy papkadagi index.html
  './manifest.json'   // Manifestni ham keshlaymiz
];

// O'rnatish (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// So'rovlarni ushlab qolish (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Keshdan qaytarish
        }
        return fetch(event.request); // Internetdan so'rov yuborish
      })
  );
});

// Eski keshni tozalash
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
