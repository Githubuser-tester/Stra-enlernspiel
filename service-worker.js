const CACHE_NAME = 'map-tile-cache-v1';
const TILE_CACHE_URLS = [
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' // OpenStreetMap URL Template
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(TILE_CACHE_URLS);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(function(response) {
                return caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
