# Hello World Sample for Vue3

[Vue 3](https://v3.vuejs.org/) is version 3 of Vue which is a progressive framework for building user interfaces. Check out the following guide on how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a Vue 3 application. Note that in this sample, `TypeScript` is used.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.4.2002](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.4.2002).

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/vue3">Hello World in Vue 3 - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `vue 3.3.4` are used in the example below. 

## Quick Start 

```cmd
npm install
npm run dev
```
Then open http://localhost:5173/ to view the sample app. 

## Creating the sample project

In this section, we will be creating a Vue application utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Create a Bootstrapped Raw Vue Application

```cmd
npm create vue@3
```

On installation, you will be prompted to configure your project.\
You can customize these options according to your preferences.\
Below is the configuration used for this sample.

```
√ Project name: ... vue-project
√ Add TypeScript? ... Yes
√ Add JSX Support? ... No
√ Add Vue Router for Single Page Application development? ... No
√ Add Pinia for state management? ... No
√ Add Vitest for Unit Testing? ... No
√ Add an End-to-End Testing Solution? » No
√ Add ESLint for code quality? ... No
√ Add Vue DevTools 7 extension for debugging? (experimental) ... No
```

### **CD** to the root directory of the application and install necessary libraries

```cmd
cd vue-project
npm install dynamsoft-barcode-reader-bundle -E
```

## Start to implement

### Add file "dynamsoft.config.ts" under "/src/" to configure libraries

```typescript
/* /src/dynamsoft.config.ts */
import { CoreModule } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";
import "dynamsoft-barcode-reader";

// Configures the paths where the .wasm files and other necessary resources for modules are located.
CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", {
  executeNow: true,
});

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html?ver=10.4.2002&cVer=true#specify-the-license&utm_source=samples or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(["DBR"]);
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePaths` tells the library where to get the necessary resources at runtime.

### Create and edit the `VideoCapture` component

* Create `VideoCapture.vue` under `/components/`. The VideoCapture component helps decode barcodes via camera.

* In `VideoCapture.vue`, add the following code for initializing and destroying some instances. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```vue
<!-- /src/components/VideoCapture.vue -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

const cameraViewContainer: Ref<HTMLElement | null> = ref(null);
const resultsContainer: Ref<HTMLElement | null> = ref(null);

let resolveInit: () => void;
const pInit: Promise<void> = new Promise(r => { resolveInit = r });
let isDestroyed = false;

let cvRouter: CaptureVisionRouter;
let cameraEnhancer: CameraEnhancer;

onMounted(async () => {

  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await CameraView.createInstance();
    if (isDestroyed) { throw Error(componentDestroyedErrorMsg); } // Check if component is destroyed after every async

    cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    if (isDestroyed) { throw Error(componentDestroyedErrorMsg); }

    // Get default UI and append it to DOM.
    cameraViewContainer.value!.append(cameraView.getUIElement());

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    cvRouter = await CaptureVisionRouter.createInstance();
    if (isDestroyed) { throw Error(componentDestroyedErrorMsg); }
    cvRouter.setInput(cameraEnhancer);

    // Define a callback for results.
    cvRouter.addResultReceiver({
      onDecodedBarcodesReceived: (result) => {
        if (!result.barcodeResultItems.length) return;

        resultsContainer.value!.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          resultsContainer.value!.textContent += `${item.formatString}: ${item.text}\n\n`;
        }
      }
    });

    // Filter out unchecked and duplicate results.
    const filter = new MultiFrameResultCrossFilter();
    // Filter out unchecked barcodes.
    filter.enableResultCrossVerification("barcode", true);
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication("barcode", true);
    await cvRouter.addResultFilter(filter);
    if (isDestroyed) { throw Error(componentDestroyedErrorMsg); }

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    if (isDestroyed) { throw Error(componentDestroyedErrorMsg); }
    await cvRouter.startCapturing("ReadSingleBarcode");
    if (isDestroyed) { throw Error(componentDestroyedErrorMsg); }

  } catch (ex: any) {

    if ((ex as Error)?.message === componentDestroyedErrorMsg) {
      console.log(componentDestroyedErrorMsg);
    } else {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  // Resolve pInit promise once initialization is complete.
  resolveInit!();
});

// dispose cvRouter when it's no longer needed
onBeforeUnmount(async () => {
  isDestroyed = true;
  try {
    await pInit; // Wait for the pInit to complete before disposing resources.
    cvRouter?.dispose();
    cameraEnhancer?.dispose();
  } catch (_) { }
});
</script>

<template>
  <div>
    <div ref="cameraViewContainer" style="width: 100%; height: 70vh; background: #eee;"></div>
    <br />
    Results:
    <div ref="resultsContainer" class="results"></div>
  </div>
</template>
```
> Note:
>
> If you're looking to customize the UI, the UI customization feature are provided by the auxiliary SDK "Dynamsoft Camera Enhancer". For more details, refer to our [User Guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html#customize-the-ui)

### Create and edit the `ImageCapture` component

* Create `ImageCapture.vue` under `/components/`. The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.vue`, add code for initializing and destroying `CaptureVisionRouter` instance. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```vue
<!-- /src/components/ImageCapture.vue -->
<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

const resultContainer: Ref<HTMLDivElement | null> = ref(null);

let pCvRouter: Promise<CaptureVisionRouter>;
let isDestroyed = false;

const captureImage = async (e: Event) => {
  let files = [...(e.target! as HTMLInputElement).files!];
  (e.target! as HTMLInputElement).value = ''; // reset input
  resultContainer.value!.innerText = "";
  try {
    // ensure cvRouter is created only once
    const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
    if (isDestroyed) return;

    for (let file of files) {
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
      if (isDestroyed) return;

      // Print file name if there's multiple files
      if (files.length > 1) {
        resultContainer.value!.innerText += `\n${file.name}:\n`;
      }
      for (let _item of result.items) {
        if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
          continue;  // check if captured result item is a barcode
        }
        let item = _item as BarcodeResultItem;
        resultContainer.value!.innerText += item.text + "\n";  // output the decoded barcode text
        console.log(item.text);
      }
      // If no items are found, display that no barcode was detected
      if (!result.items.length) resultContainer.value!.innerText += 'No barcode found\n';
    }
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
}

onBeforeUnmount(async () => {
  isDestroyed = true;
  if (pCvRouter) {
    try {
      (await pCvRouter).dispose();
    } catch (_) { }
  }
});
</script>

<template>
  <div class="image-capture-container">
    <div class="input-container">
      <input type="file" multiple @change="captureImage" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" />
    </div>
    <div class="results" ref="resultContainer"></div>
  </div>
</template>
```

### Add the `VideoCapture` and `ImageCapture` component to `App.vue`

* On `/src/App.vue`, we will edit the component so that it offers buttons to switch components between `VideoCapture` and `ImageCapture`.

* Add following code to `App.vue`. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```vue
<!-- /src/App.vue -->
<script setup lang="ts">
import { ref, type Ref } from "vue";
import VideoCapture from "./components/VideoCapture.vue";
import ImageCapture from "./components/ImageCapture.vue";

const mode: Ref<string> = ref("video");

</script>

<template>
  <div class='App'>
    <div class='title'>
      <h2 class='title-text'>Hello World for Vue</h2>
    </div>
    <div class='buttons-container'>
      <button @click="mode = 'video'"
        :style="{ backgroundColor: mode === 'video' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Decode Video</button>
      <button @click="mode = 'image'"
        :style="{ backgroundColor: mode === 'image' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Decode Image</button>
    </div>
    <VideoCapture v-if="mode === 'video'" />
    <ImageCapture v-else />
  </div>
</template>
```
> Note:
>
> With Vue's `defineAsyncComponent` we can improve the initial load speed and performance of the application.
>
> `defineAsyncComponent` allows us to load components such as `VideoCapture` and `ImageCapture` asynchronously, which means that the component's code is only loaded when it's needed. This will result in a faster initial load times.
>
> However, if you're implementing server-side rendering with Vue, using `defineAsyncComponent` might cause issues while loading `VideoCapture` and `ImageCapture` as we use the window/document object. Make sure to load these components on the client-side!
>
> Read more: https://vuejs.org/guide/components/async.html 

* Try running the project.

```cmd
npm run dev
```
If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Decode Image` button and select the image you want to decode. Once barcodes are found, the results will show in a dialog. 

### Comment out the following code in `assets/main.css`. (optional)

```css
@media (min-width: 1024px) {
  /* body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  } */
}
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
