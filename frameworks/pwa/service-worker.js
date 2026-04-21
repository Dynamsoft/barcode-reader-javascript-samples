const engineResourcePaths = {
  dbrBundle: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2000/dist/",
};

// Files to cache
const cacheName = "helloworld-pwa";
// Here we choose some files into appShellFiles to cache.
// To keep it simple, you can put all the files
// in "node_modules/dynamsoft-barcode-reader-bundle/dist" into the list.
const appShellFiles = [
  "./helloworld-pwa.html",
  "./dynamsoft-192x192.png",
  "./dynamsoft-512x512.png",
  "./helloworld-pwa.json",
  `${engineResourcePaths.dbrBundle}dbr.bundle.worker.js`,
  `${engineResourcePaths.dbrBundle}dynamsoft-barcode-reader-bundle-ml-simd.js`,
  `${engineResourcePaths.dbrBundle}dynamsoft-barcode-reader-bundle-ml-simd.wasm`,
  `${engineResourcePaths.dbrBundle}models/Code128Decoder.data`,
  `${engineResourcePaths.dbrBundle}models/EAN13Decoder.data`,
  `${engineResourcePaths.dbrBundle}models/Code39ITFDecoder.data`,
  `${engineResourcePaths.dbrBundle}templates/DBR-PresetTemplates.json`,
  `${engineResourcePaths.dbrBundle}ui/dce.ui.xml`,
  `${engineResourcePaths.dbrBundle}ui/dls.license.dialog.html`,
  
  // `${engineResourcePaths.dbrBundle}dynamsoft-barcode-reader-bundle.js`,
  // `${engineResourcePaths.dbrBundle}dynamsoft-barcode-reader-bundle.wasm`,
  // `${engineResourcePaths.dbrBundle}dynamsoft-barcode-reader-bundle-ml-simd-pthread.js`,
  // `${engineResourcePaths.dbrBundle}dynamsoft-barcode-reader-bundle-ml-simd-pthread.worker.js`,
  // `${engineResourcePaths.dbrBundle}dynamsoft-barcode-reader-bundle-ml-simd-pthread.wasm`,
  // `${engineResourcePaths.dbrBundle}models/OneDDeblur.data`,
  // `${engineResourcePaths.dbrBundle}models/OneDLocalization.data`,
  // `${engineResourcePaths.dbrBundle}models/DataMatrixQRCodeLocalization.data`,
  // `${engineResourcePaths.dbrBundle}models/DataMatrixQRCodeDeblur.data`,
  // `${engineResourcePaths.dbrBundle}models/PDF417Deblur.data`,
  // `${engineResourcePaths.dbrBundle}models/PDF417Localization.data`,
  // `${engineResourcePaths.dbrBundle}parser-resources/AADHAAR.data`,
  // `${engineResourcePaths.dbrBundle}parser-resources/AAMVA_DL_ID.data`,
  // `${engineResourcePaths.dbrBundle}parser-resources/GS1_AI.data`,
  // `${engineResourcePaths.dbrBundle}parser-resources/MRTD.data`,
  // `${engineResourcePaths.dbrBundle}parser-resources/SOUTH_AFRICA_DL.data`,
  // `${engineResourcePaths.dbrBundle}parser-resources/VIN.data`,
];

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log(cache);
      console.log("[Service Worker] Caching all: app shell and content");
      // Avoid failing the whole install if one resource is temporarily unreachable.
      await Promise.allSettled(appShellFiles.map((file) => cache.add(file)));
    })()
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      try {
        // Fetch cached response if exists
        const cachedResponse = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        const response = await fetch(e.request);

        if (
          e.request.method === "GET" &&
          response.ok &&
          // Authorization requests should not be cached
          !/https:\/\/.*?\.dynamsoft.com\/auth/.test(e.request.url)
          // You can add other filter conditions
        ) {
          const cache = await caches.open(cacheName);
          console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
          cache.put(e.request, response.clone());
        }

        return response;
      } catch (error) {
        // Network fallback: try cache one more time before failing.
        const fallbackResponse = await caches.match(e.request);
        if (fallbackResponse) {
          return fallbackResponse;
        }
        throw error;
      }
    })()
  );
});
