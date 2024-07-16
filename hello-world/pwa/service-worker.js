const engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.2.10/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.2.30/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.2.30/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.2.21/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.2.30/dist/",
  dbr: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.2.10/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.3/dist/"
};

// Files to cache
const cacheName = "helloworld-pwa";
const appShellFiles = [
  "./helloworld-pwa.html",
  "./dynamsoft-192x192.png",
  "./dynamsoft-512x512.png",
  "./helloworld-pwa.json",
  `${engineResourcePaths.std}std.js`,
  `${engineResourcePaths.std}std.wasm`,
  `${engineResourcePaths.dip}dip.wasm`,
  `${engineResourcePaths.core}core.js`,
  `${engineResourcePaths.core}core.worker.js`,
  `${engineResourcePaths.core}core.wasm`,
  `${engineResourcePaths.license}license.js`,
  `${engineResourcePaths.license}dls.license.dialog.html`,
  `${engineResourcePaths.license}license.wasm`,
  `${engineResourcePaths.utility}utility.js`,
  `${engineResourcePaths.dbr}dbr.js`,
  `${engineResourcePaths.dbr}dbr.wasm`,
  `${engineResourcePaths.dbr}DBR-PresetTemplates.json`,
  `${engineResourcePaths.cvr}cvr.js`,
  `${engineResourcePaths.cvr}cvr.wasm`,
  `${engineResourcePaths.cvr}cvr.worker.js`,
  `${engineResourcePaths.dce}dce.js`,
  `${engineResourcePaths.dce}dce.ui.html`,
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(appShellFiles);
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      // Fetch cached response if exists
      const cachedResponse = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from network
      const response = await fetch(e.request);

      if(
        e.request.method !== "POST" &&
        // Authorization requests should not be cached
        !/https:\/\/.*?\.dynamsoft.com\/auth/.test(e.request.url)
        // You can add other filter conditions
      ){
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
      }
      
      return response;
    })()
  );
});
