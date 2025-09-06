const CACHE_NAME = 'olivye-recipe-v2'; // Yangi versiya uchun nomni o'zgartirish yaxshi amaliyot
const urlsToCache = [
  '/',
  '/index.html' // Asosiy fayl nomi to'g'irlandi
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
