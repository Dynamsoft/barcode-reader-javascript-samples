const engineResourcePaths = {
  dbrBundle: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2001/dist/",
};

// Files to cache
const CACHE_PREFIX = "helloworld-pwa-";
const CACHE_NAME = `${CACHE_PREFIX}v1`;
// Here we choose some files into ASSETS_TO_CACHE to cache.
// You can find these files in "node_modules/dynamsoft-barcode-reader-bundle/dist".
const ASSETS_TO_CACHE = [
  "./helloworld-pwa.html",
  "./dynamsoft-192x192.png",
  "./dynamsoft-512x512.png",
  "./helloworld-pwa.json",
  `${engineResourcePaths.dbrBundle}dbr.bundle.js`,
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
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  // Force the waiting service worker to become the active one
  self.skipWaiting();
});

// 2. Activate: Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Fetch: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Return cached response if found, but fetch a fresh version anyway
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        if(
          'GET' === e.request.method && networkResponse.ok &&
          // Authorization requests should not be cached
          !/https:\/\/.*?\.dynamsoft.com\/auth/.test(e.request.url)
          // You can add other filter conditions
        ){
          // Update the cache with the new version
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            console.log(`[Service Worker] Cache updated: ${e.request.url}`);
          });
        }
        return networkResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
