# Hello World Sample for PWA

[PWA](https://web.dev/progressive-web-apps/) is short for Progressive Web Apps, which are web applications designed to mimic the functionality and user experience of platform-specific (native) applications. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a PWA application.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 11.4.2001](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/11.4.2001).

> Note:
>
> If you're looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/frameworks/pwa">Hello World in PWA - Source Code</a>

## Preparation

We will try to turn our basic "Hello World" sample into a PWA. Follow these steps:

* Create new file named `helloworld-pwa.html` and add the following code:

```html
<!-- /helloworld-pwa.html -->
 <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta name="description" content="Read barcodes from camera with Dynamsoft Barcode Reader in a PWA application." />
  <meta name="keywords" content="barcode, camera, PWA" />
  <title>Dynamsoft Barcode Reader PWA Sample - Hello World (Decode via Camera)</title>
</head>

<body>
  <h1>Hello World for PWA</h1>
  <div id="camera-view-container" style="width: 100%; height: 80vh"></div>
  <br />
  Results:
  <div id="results" style="width: 100%; height: 10vh; overflow: auto"></div>
  <!-- crossorigin="anonymous" is required for service worker caching. -->
  <script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2001/dist/dbr.bundle.js"></script>
  <script>
    /** LICENSE ALERT - README
     * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
     */

    Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

    /**
     * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
     * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
     * For more information, see https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html?ver=11.4.2001&cVer=true#specify-the-license&utm_source=samples or contact support@dynamsoft.com.
     * LICENSE ALERT - THE END
     */

    // Optional. Used to load wasm resources in advance, reducing latency between video playing and barcode decoding.
    Dynamsoft.Core.CoreModule.loadWasm();

    // Defined globally for easy debugging.
    let cameraEnhancer, cvRouter;

    (async () => {
      try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
        cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
        // Get default UI and append it to DOM.
        document.querySelector("#camera-view-container").append(cameraView.getUIElement());

        // Hide the "Powered by Message" overlay on the scanner view
        // cameraView.setPowerByMessageVisible(false);

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        await cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;

            const resultsContainer = document.querySelector("#results");
            resultsContainer.textContent = "";
            console.log(result);
            for (let item of result.barcodeResultItems) {
              resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
            }
          },
        });

        // Filter out unchecked and duplicate results.
        const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        // Open camera and start scanning barcode.
        await cameraEnhancer.open();
        
        if('disabled' === cameraEnhancer.singleFrameMode){
          // Video played successfully.
          cameraView.setScanLaserVisible(true);
        }else{
          // In iOS PWA, if camera open failed,
          // failback to `singleFrameMode = 'camera'`.
          // In iOS PWA wasm is slow, so we increase the timeout.
          const cvrSettings = await cvRouter.outputSettings('ReadBarcodes_SpeedFirst');
          cvrSettings.CaptureVisionTemplates[0].Timeout = 15000; 
          await cvRouter.initSettings(cvrSettings);
        }

        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
      } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(ex);
        alert(errMsg);
      }
    })();
  </script>
</body>

</html>
```

* Next, set up a secure environment (HTTPS) to run the page `helloworld-pwa.html`. This is required as PWAs only run in secure environments. 
> Note: 
> 
> In this sample, we're using IIS to set up a secure site at https://localhost. The page will be located at the root of the site so that it can be accessed at https://localhost/helloworld-pwa.html.

## Make the app progressive

### Register a service worker for offline support

Service Workers form the foundation of PWAs, acting as the virtual proxy between the browser and the network. They enable offline content delivery, manage notifications, and perform heavy calculations on a separate thread

* To use a service worker, we first need to register it. In the `helloworld-pwa.html` file, add the following code at the end of the script:

```javascript
/* /helloworld-pwa.html */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
};
```

* Next, create the `service-worker.js` file with the following content:

```javascript
// Files to cache
const CACHE_PREFIX = "helloworld-pwa-";
const CACHE_NAME = `${CACHE_PREFIX}v1`;
// Here we choose some files into ASSETS_TO_CACHE to cache.
// You can find these files in "node_modules/dynamsoft-barcode-reader-bundle/dist".
const ASSETS_TO_CACHE = [
  "./helloworld-pwa.html",
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
          const clonedRep = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, clonedRep);
            console.log(`[Service Worker] Cache updated: ${e.request.url}`);
          });
        }
        return networkResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
```

With the above code, the application can now work offline because the service worker will cache the `helloworld-pwa.html` page and its related resources.

For more information, refer to [Making PWAs work offline with Service workers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers).

### Use a web manifest file to make the application installable

A web manifest file contains a list of information about a website in JSON format. This information is used to enable the web app to be installed on a device.

* Create a file named `helloworld-pwa.json` with the following content:

```json
/* /helloworld-pwa.json */
{
  "name": "Dynamsoft Barcode Reader Progressive Web App",
  "short_name": "DBR-PWA",
  "description": "Progressive Web App that reads barcodes from a video input with Dynamsoft Barcode Reader.",
  "start_url": "./helloworld-pwa.html",
  "scope": ".",
  "display": "standalone",
  "theme_color": "#B12A34",
  "background_color": "#B12A34",
  "icons": [
    {
      "src": "./dynamsoft-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "./dynamsoft-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

> Note: The icon files can be found in the github repository.

* Then we include the file in the `<head>` block of the `helloworld-pwa.html` file as such:

```html
<!-- /helloworld-pwa.html -->
<link rel="manifest" href="helloworld-pwa.json">
```

* For compatibility on safari, we need add some `meta` in `<head>`.

```html
<!-- /helloworld-pwa.html -->

<meta name="theme-color" content="#B12A34">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="sample for ios">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" sizes="192x192" href="./dynamsoft-192x192.png" />
<link rel="apple-touch-icon" sizes="512x512" href="./dynamsoft-512x512.png" />
```

Now, if you open the application again in your browser, you will notice an install icon appear on the right side of the address bar. When you click on it, a pop-up will appear asking if you want to install the app.

Once installed, you can use it just like any native app.

To enable offline functionality for Dynamsoft Barcode Reader, you'll need to cache more files.

### Enabling offline functionality for Dynamsoft Barcode Reader

These directories below are the resources required for Dynamsoft Barcode Reader functionality. Once added, these files are cached on installation of the service worker (i.e. `install` event), wensuring the PWA remains fully functional without any internet.

Add this code below to the `service-worker.js`
```javascript
/* /service-worker.js */
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
```

## Summary

In this article we took a look at how you can turn a simple barcode reading page into a PWA that is installable, re-engageable and capable of working offline. To learn more about Progressive web apps, you can click [here](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).