const coreResourcesDir =
    "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-core@3.0.20-dev-20231010152155/dist/",
  utilityResourcesDir =
    "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-utility@1.0.10-dev-20231023103736/dist/",
  dbrResourcesDir =
    "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-barcode-reader@10.0.20-dev-20231020140243/dist/",
  dbrResourcesDir =
    "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-barcode-reader@10.0.20-dev-20231020140243/dist/",
  cvrResourcesDir =
    "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-capture-vision-router@2.0.20-dev-20231027145739/dist/",
  dceResourcesDir =
    "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-camera-enhancer@4.0.1-dev-20231023131759/dist/";

// Files to cache
const cacheName = "helloworld-pwa";
const appShellFiles = [
  "./helloworld-pwa.html",
  "./dynamsoft-192x192.png",
  "./dynamsoft-512x512.png",
  "./helloworld-pwa.json",
  `${coreResourcesDir}core.js`,
  `${utilityResourcesDir}utility.js`,
  `${dbrResourcesDir}dbr.js`,
  `${dbrResourcesDir}dbr.wasm`,
  `${dbrResourcesDir}DBR-PresetTemplates.json`,
  `${cvrResourcesDir}cvr.js`,
  `${cvrResourcesDir}cvr.wasm`,
  `${cvrResourcesDir}cvr.wasm.js`,
  `${cvrResourcesDir}cvr_wasm_glue.js`,
  `${cvrResourcesDir}cvr.browser.worker.js`,
  `${cvrResourcesDir}dls.license.dialog.html`,
  `${cvrResourcesDir}dce.js`,
  `${cvrResourcesDir}dce.ui.html`,
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
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      if (e.request.method !== "POST") cache.put(e.request, response.clone());
      return response;
    })()
  );
});
