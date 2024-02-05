# Hello World Sample for PWA

[PWA](https://web.dev/progressive-web-apps/) is short for Progressive Web Apps which stand for web applications that have been designed to behave like platform-specific (native) applications. Check out the following on how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into a PWA application.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/pwa/helloworld-pwa.html">Hello World in PWA - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/pwa">Hello World in PWA - Source Code</a>

## Preparation

We will try to turn our most basic hello world sample into a PWA. 

First, create a file with the name "helloworld-pwa.html" and fill it with the following code:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Hello World</title>
</head>

<body>
<h1>Hello World for PWA</h1>
<div id="div-ui-container" style="width: 100%; height: 80vh"></div>
Results:
<br>
<div id="div-results-container" style="width: 100%; height: 10vh; overflow: auto;"></div>
<script>
    if (location.protocol === "file:") {
        const message = `The page is opened via file:// and our SDKs may not work properly. Please open the page via https:// or host it on "http://localhost/".`;
        console.warn(message);
        alert(message);
    }
</script>
<script>
    /** LICENSE ALERT - README
     * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
     */

    Dynamsoft.License.LicenseManager.initLicense(
    "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLWRicl9qc19zYW1wbGVzIiwib3JnYW5pemF0aW9uSUQiOiIyMDAwMDAifQ=="
    );

    /**
     * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
     * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
     * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.0.21&utm_source=github#specify-the-license or contact support@dynamsoft.com.
     * LICENSE ALERT - THE END
     */

    (async function () {
    try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
        const cameraEnhancer =
        await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
        document
        .querySelector("#div-ui-container")
        .append(cameraView.getUIElement()); // Get default UI and append it to DOM.

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        const router =
        await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
        router.setInput(cameraEnhancer);

        // Define a callback for results.
        const resultReceiver = new Dynamsoft.CVR.CapturedResultReceiver();
        resultReceiver.onDecodedBarcodesReceived = (result) => {
        for (let item of result.barcodeResultItems) {
            if (!result.barcodeResultItems.length) return;

            const resultsContainer = document.querySelector("#div-results-container");
            resultsContainer.textContent = '';
            console.log(result);
            for (let item of result.barcodeResultItems) {
              resultsContainer.append(
                `${item.formatString}: ${item.text}`,
                document.createElement('br'),
                document.createElement('hr'),
              );
            }
        }
        };
        router.addResultReceiver(resultReceiver);

        // Filter out unchecked and duplicate results.
        const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
        filter.enableResultCrossVerification(
        Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
        true
        ); // Filter out unchecked barcodes.
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication(
        Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
        true
        );
        filter.setDuplicateForgetTime(
        Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE,
        3000
        );
        await router.addResultFilter(filter);

        // Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        await router.startCapturing("ReadSingleBarcode");
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(errMsg);
        alert(errMsg);
    }
    })();
</script>
</body>

</html>
```

Next, set up a secure environment (HTTPs) to run the page "helloworld-pwa.html". This is required because PWAs only run in secure environments.

In our case, we use IIS to set up a secure site at "https://localhost" and the page is put at the root so that it can be accessed at "https://localhost/helloworld-pwa.html".

## Make the app progressive

### Register a service worker for offline support

As the basis for PWAs, Service Workers are a virtual proxy between the browser and the network. A service worker can serve content offline, handle notifications and perform heavy calculations, etc. all on a separate thread.

To use a service worker, we first need to register it. In the helloworld-pwa.html file, add the following at the end of the script:

```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
};
```

Create the service-worker.js file with the following content:

```javascript
// Files to cache
const cacheName = 'helloworld-pwa';
const appShellFiles = [
    './helloworld-pwa.html',
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
```

With the above code, the application can now work offline because the service worker will cache the page helloworld-pwa.html and its related resources.

For more information, refer to [Making PWAs work offline with Service workers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers).

> NOTE
> 
> Since the files are being cached, changes we make in later steps may not be reflected. Therefore, don't forget to clear the cache after a change is made. To do so, you can run the following in the browser console.
> 
> ```javascript
> const cacheName = 'helloworld-pwa';
> const cache = await caches.delete(cacheName);
> ```

### Use a web manifest file to make the application installable

A web manifest file contains a list of information about a website in a JSON format. This information is used to present the web app correctly for installation on a device.

In our example, we first create a file "helloworld-pwa.json" with the following content:

```json
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

> The icon files can be found in the github repository.

Then we include the file in the &lt;head&gt; block of the helloworld-pwa.html file:

```html
<link rel="manifest" href="helloworld-pwa.json">
```

For compatibility on safari, we need add some `meta` in `<head>`:

```html
<meta name="theme-color" content="#B12A34">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="sample for ios">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" sizes="192x192" href="./dynamsoft-192x192.png" />
<link rel="apple-touch-icon" sizes="512x512" href="./dynamsoft-512x512.png" />
```

Now, if you open the application again in your browser, you will notice an install icon appear on the right side of the address bar. When you click on it, a pop-up will appear asking if you want to install the app.

Once installed, you can use it like a native app.

For offline use, you need to cache more files.

service-worker.js
```javascript
const coreResourcesDir =
    "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.0.33/dist/",
  utilityResourcesDir =
    "https://cdn.jsdelivr.net/npm/dynamsoft-utility@1.0.21/dist/",
  dbrResourcesDir =
    "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.0.21/dist/",
  cvrResourcesDir =
    "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.0.32/dist/",
  dceResourcesDir =
    "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.1/dist/";

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
```

## Summary

In this article we took a look at how you can turn a simple barcode reading page into a PWA that is installable, re-engageable and capable of working offline. To learn more about Progressive web apps, you can click [here](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).