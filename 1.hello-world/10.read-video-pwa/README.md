# JavaScript Hello World Sample - PWA

[PWA](https://web.dev/progressive-web-apps/) is short for Progressive Web Apps which stand for web applications that have been designed to behave like platform-specific (native) applications. Check out the following on how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into a PWA application.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/1.hello-world/10.read-video-pwa/helloworld-pwa.html">Hello World in PWA - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/1.hello-world/10.read-video-pwa">Hello World in PWA - Source Code</a>

## Preparation

We will try to turn our most basic hello world sample into a PWA. 

First, create a file with the name "helloworld-pwa.html" and fill it with the following code:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Dynamsoft Barcode Reader PWA Sample - Hello World (Decoding via Camera)</title>
</head>

<body>
    <h1 style="font-size: 1.5em;">Hello World for PWA</h1>
    Loading...
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.20/dist/dbr.js"></script>
    <script>
        Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9';
        (async function() {
            try {
                const scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
                scanner.onFrameRead = results => {
                    console.log("Barcodes on one frame:");
                    for (let result of results) {
                        const format = result.barcodeFormatString;
                        console.log(format + ": " + result.barcodeText);
                    }
                };
                scanner.onUniqueRead = (txt, result) => {
                    alert(txt);
                    console.log("Unique Code Found: ", result);
                }
                await scanner.show();
            } catch (ex) {
                let errMsg = ex.message||ex;
                console.error(errMsg);
                alert(errMsg);
            }
        })();
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js');
        };
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

In our example, we first create a file "helloworld-pwa.webmanifest" with the following content:

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
<link rel="manifest" href="helloworld-pwa.webmanifest">
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
const dbrVersion = "9.6.20";
const dbrCdn = `https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@${dbrVersion}/dist/`;

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
```

## Summary

In this article we took a look at how you can turn a simple barcode reading page into a PWA that is installable, re-engageable and capable of working offline. To learn more about Progressive web apps, you can click [here](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).