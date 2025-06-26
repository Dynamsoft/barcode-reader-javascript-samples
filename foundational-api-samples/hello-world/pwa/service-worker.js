const engineResourcePaths = {
  dbrBundle: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.0.3000/dist/",
};

// Files to cache
const cacheName = "helloworld-pwa";
const appShellFiles = [
  "./helloworld-pwa.html",
  "./dynamsoft-192x192.png",
  "./dynamsoft-512x512.png",
  "./helloworld-pwa.json",
  `${engineResourcePaths.dbrBundle}DBR-PresetTemplates.json`,
  `${engineResourcePaths.dbrBundle}dce.ui.xml`,
  `${engineResourcePaths.dbrBundle}barcode-reader.ui.xml`,
  `${engineResourcePaths.dbrBundle}dbr-with-onnx-simd.js`,
  `${engineResourcePaths.dbrBundle}dbr-with-onnx-simd.wasm`,
  `${engineResourcePaths.dbrBundle}dbr-with-onnx.js`,
  `${engineResourcePaths.dbrBundle}dbr-with-onnx.wasm`,
  `${engineResourcePaths.dbrBundle}dbr-without-onnx.js`,
  `${engineResourcePaths.dbrBundle}dbr-without-onnx.wasm`,
  `${engineResourcePaths.dbrBundle}dbr.bundle.esm.js`,
  `${engineResourcePaths.dbrBundle}dbr.bundle.js`,
  `${engineResourcePaths.dbrBundle}dbr.bundle.mjs`,
  `${engineResourcePaths.dbrBundle}dbr.bundle.worker.js`,
  `${engineResourcePaths.dbrBundle}dls.license.dialog.html`,
  `${engineResourcePaths.dbrBundle}OneDDeblur.data`,
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log(cache);
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

      if (
        e.request.method !== "POST" &&
        // Authorization requests should not be cached
        !/https:\/\/.*?\.dynamsoft.com\/auth/.test(e.request.url)
        // You can add other filter conditions
      ) {
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
      }

      return response;
    })()
  );
});
