const dbrVersion = "9.6.20";
const dbrCdn = `https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@${dbrVersion}/dist/`;

// Files to cache
const cacheName = 'helloworld-pwa';
const appShellFiles = [
    './helloworld-pwa.html',
    './dynamsoft-192x192.png',
    './dynamsoft-512x512.png',
    './helloworld-pwa.json',
    `${dbrCdn}dbr.js`,
    `${dbrCdn}dbr-${dbrVersion}.full.wasm`,
    `${dbrCdn}dbr-${dbrVersion}.full.wasm.js`,
    `${dbrCdn}dbr-${dbrVersion}.browser.worker.js`,
];

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(appShellFiles);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) { return r; }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        if (e.request.method !== "POST")
            cache.put(e.request, response.clone());
        return response;
    })());
});




