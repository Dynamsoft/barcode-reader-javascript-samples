const resourcePaths = {
  std: Dynamsoft.Core.engineResourcePaths.std.path || Dynamsoft.Core.engineResourcePaths.std,
  dip: Dynamsoft.Core.engineResourcePaths.dip.path || Dynamsoft.Core.engineResourcePaths.dip,
  core: Dynamsoft.Core.engineResourcePaths.core.path || Dynamsoft.Core.engineResourcePaths.core,
  license: Dynamsoft.Core.engineResourcePaths.license.path || Dynamsoft.Core.engineResourcePaths.license,
  utility: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-utility@1.0.20-dev-20240115141008/dist/",
  dbr: Dynamsoft.Core.engineResourcePaths.dbr.path || Dynamsoft.Core.engineResourcePaths.dbr,
  cvr: Dynamsoft.Core.engineResourcePaths.cvr.path || Dynamsoft.Core.engineResourcePaths.cvr,
  dce: Dynamsoft.Core.engineResourcePaths.dce.path || Dynamsoft.Core.engineResourcePaths.dce,
}

// Files to cache
const cacheName = "helloworld-pwa";
const appShellFiles = [
  "./helloworld-pwa.html",
  "./dynamsoft-192x192.png",
  "./dynamsoft-512x512.png",
  "./helloworld-pwa.json",
  `${resourcePaths.std}std.js`,
  `${resourcePaths.std}std.wasm`,
  `${resourcePaths.dip}dip.wasm`,
  `${resourcePaths.core}core.js`,
  `${resourcePaths.core}core.worker.js`,
  `${resourcePaths.core}core.wasm`,
  `${resourcePaths.license}license.js`,
  `${resourcePaths.license}dls.license.dialog.html`,
  `${resourcePaths.license}license.wasm`,
  `${resourcePaths.utility}utility.js`,
  `${resourcePaths.dbr}dbr.js`,
  `${resourcePaths.dbr}dbr.wasm`,
  `${resourcePaths.dbr}DBR-PresetTemplates.json`,
  `${resourcePaths.cvr}cvr.js`,
  `${resourcePaths.cvr}cvr.wasm`,
  `${resourcePaths.cvr}cvr.worker.js`,
  `${resourcePaths.dce}dce.js`,
  `${resourcePaths.dce}dce.ui.html`,
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
