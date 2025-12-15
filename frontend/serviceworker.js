self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('complaints-store').then((cache) => cache.addAll([
            '/siob/index.html',
            '/siob/src/App.tsx',
            '/siob/src/Pages/Home/Home.tsx',
            '/siob/src/Pages/Home/Home.css',
            '/siob/src/main.tsx',
            '/manifest.json'
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});