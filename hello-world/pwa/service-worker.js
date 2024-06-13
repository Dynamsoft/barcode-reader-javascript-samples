const cacheName = "dbrjs-helloworld-pwa";

const cdn = "https://cdn.jsdelivr.net/npm/dynamsoft-";
// you can get file list from `F12 ==> console ==> network`,
// and choose what you want to cache
const filesShouldCache = [
  "./helloworld-pwa.html",
  "./dynamsoft-192x192.png",
  "./dynamsoft-512x512.png",
  "./helloworld-pwa.json",
  `${cdn}barcode-reader-bundle@10.2.1000/dist/dbr.bundle.js`,
  `${cdn}core@3.2.30/dist/core.worker.js`,
  `${cdn}camera-enhancer@4.0.3/dist/dce.ui.html`,
  `${cdn}capture-vision-std@1.2.10/dist/std.js`,
  `${cdn}capture-vision-std@1.2.10/dist/std.wasm`,
  `${cdn}core@3.2.30/dist/core.wasm`,
  `${cdn}license@3.2.21/dist/license.wasm`,
  `${cdn}image-processing@2.2.30/dist/dip.wasm`,
  `${cdn}barcode-reader@10.2.10/dist/dbr.wasm`,
  `${cdn}license@3.2.21/dist/dls.license.dialog.html`,
  `${cdn}capture-vision-router@2.2.30/dist/cvr.worker.js`,
  `${cdn}capture-vision-router@2.2.30/dist/cvr.wasm`,
  `${cdn}barcode-reader@10.2.10/dist/DBR-PresetTemplates.json`,
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.log("[Service Worker] installation started");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(filesShouldCache);
      console.log("[Service Worker] Installation completed");
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      if (r) { return r; }
      const response = await fetch(e.request);
      // ** You can control whether you want to cache a resource
      // ** e.g.
      // if(e.request.url.startsWith('xxx')){
      //   const cache = await caches.open(cacheName);
      //   cache.put(e.request, response.clone());
      // }
      return response;
    })()
  );
});
