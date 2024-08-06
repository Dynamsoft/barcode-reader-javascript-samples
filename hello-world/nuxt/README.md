# Hello World Sample for NuxtJS

[Nuxt](https://nuxtjs.org/) is a higher-level framework that builds on top of [Vue](https://vuejs.org/). Check out the following guide on how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a Nuxt application. Note that in this sample `TypeScript` is used.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.2.1000`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.2.1000).

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/nuxt">Hello World in Nuxt - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `nuxt 3.2.3` are used in this article.

## Quick Start

```cmd
npm install
npm run dev
```

Then open `https://localhost:3000/` to view the sample app.

## Creating the sample project

In this section, we will be creating a NuxtJS application utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Create a Bootstrapped Nuxt Application

```cmd
npx nuxi@latest init my-app
```

You will be asked to configure quite a few things for the application during the creation. In our example, we chose the default one in every step.

### **CD** to the root directory of the application and install the dependencies

```cmd
cd my-app
npm install dynamsoft-barcode-reader-bundle -E
```

## Start to implement

### Add file "dynamsoft.config.ts" at the root of the app to configure libraries

```typescript
/* /dynamsoft.config.ts */
import { CoreModule } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";
import "dynamsoft-barcode-reader";

// Configures the paths where the .wasm files and other necessary resources for modules are located.
CoreModule.engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.2.10/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.2.30/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.2.30/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.2.21/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.2.30/dist/",
  dbr: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.2.10/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.3/dist/",
};

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", true);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=samples#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(["DBR"]);
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePaths` tells the library where to get the necessary resources at runtime.

### Create a directory "components" and create the following files inside it to represent two components

* `VideoCapture.client.vue`
* `ImageCapture.client.vue`

`.client` suffix means the component is rendered only client-side.

### Edit the `VideoCapture` component

* In `VideoCapture.client.vue`, add code for initializing and destroying some instances. The `VideoCapture` component helps decode barcodes via camera.  For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```vue
<!-- /components/VideoCapture.client.vue -->
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
    await pInit;
    cvRouter?.dispose();
    cameraEnhancer?.dispose();
  } catch (_) { }
});
</script>

<template>
  <div>
    <div ref="cameraViewContainer" class="camera-view-container"></div>
    <br />
    Results:
    <div ref="resultsContainer" class="results"></div>
  </div>
</template>
```
> Note:
>
> If you're looking to customize the UI, the UI customization feature are provided by the auxiliary SDK "Dynamsoft Camera Enhancer". For more details, refer to our [User Guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html#customize-the-ui)

### Edit the `ImageCapture` component

* In `ImageCapture.client.vue`, add code for initializing and destroying the `CaptureVisionRouter` instance. The `ImageCapture` helps decode barcodes in an image.  For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```vue
<!-- /components/ImageCapture.client.vue -->
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

### Add `VideoCapture` and `ImageCapture` components in `app.vue`

* On `/app.vue`, we will edit the component so that it offers buttons to switch components between `VideoCapture` and `ImageCapture`.

* Add following code to `app.vue`.  For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```vue
<!-- /app.vue -->
<template>
  <div class='hello-world-page'>
    <div class='title'>
      <h2 class='title-text'>Hello World for NuxtJS</h2>
    </div>
    <div class='buttons-container'>
      <button @click="mode = 'video'"
        :style="{ backgroundColor: mode === 'video' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Video Capture</button>
      <button @click="mode = 'image'"
        :style="{ backgroundColor: mode === 'image' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Image Capture</button>
    </div>
    <client-only>
      <VideoCapture v-if="mode === 'video'" />
      <ImageCapture v-else />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import "./assets/main.css";

import { ref, type Ref } from "vue";
import VideoCapture from "./components/VideoCapture.client.vue";
import ImageCapture from "./components/ImageCapture.client.vue";

const mode: Ref<string> = ref("video");
</script>
```
> Note: 
>
> Since `VideoCapture` and `ImageCapture` components are only rendered on the client side, we want to make sure that these components are not causing sie effects during the server rendering phase. We can solve this using the `client-only` component.

* Try running the project.

```cmd
npm run dev
```

If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Decode Image` button and select the image you want to decode. Once barcodes are found, the results will show in a dialog. 

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