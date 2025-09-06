const CACHE_NAME = 'olivye-recipe-v1';
const urlsToCache = [
  '/',
  '/index.html', // Agar asosiy faylingiz shunday nomlansa
  '/salat.html'    // Yoki sizdagi nom
];

// 1. O'rnatish (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. So'rovlarni ushlab qolish (Fetch)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar keshda mavjud bo'lsa, keshdan qaytarish
        if (response) {
          return response;
        }
        // Aks holda, internet orqali so'rov yuborish
        return fetch(event.request);
      })
  );
});
