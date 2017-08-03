importScripts('/js/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('testcache').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/images/glass.jpg'
     ]);
   })
 );
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});