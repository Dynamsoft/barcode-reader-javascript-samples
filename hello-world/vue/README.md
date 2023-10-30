# Hello World Sample for Vue3

[Vue 3](https://v3.vuejs.org/) is version 3 of Vue which is a progressive framework for building user interfaces. Check out the following guide on how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into a Vue 3 application. Note that in this sample, `TypeScript` is used.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/vue3/dist/">Hello World in Vue 3 - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/vue3">Hello World in Vue 3 - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `vue 3.3.4` are used in the example below. 

## Create the sample project

### Create a Bootstrapped Raw Vue Application

```cmd
npm create vue@3
# When asked 'Add TypeScript?', select 'Yes'.
```

### **CD** to the root directory of the application and install necessary libraries

```cmd
npm install
npm install dynamsoft-utility
npm install dynamsoft-capture-vision-router
npm install dynamsoft-camera-enhancer
```

## Start to implement

### Add files "dbr.ts", "cvr.ts" and "dce.ts" under "/src/" to configure libraries

```typescript
// dbr.ts
import { BarcodeReaderModule } from "@dynamsoft/dynamsoft-barcode-reader";
BarcodeReaderModule.engineResourcePath = "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-barcode-reader@10.0.20-dev-20231020180049/dist/";
```

```typescript
// cvr.ts
import { CaptureVisionRouter, LicenseManager } from '@dynamsoft/dynamsoft-capture-vision-router';
CaptureVisionRouter.engineResourcePath = 'https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-capture-vision-router@2.0.20-dev-20231027145739/dist/';
LicenseManager.initLicense('DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9');
// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CaptureVisionRouter.preloadModule(['DBR']).catch((ex) => {
  let errMsg;
  if (ex?.message.includes('network connection error')) {
    errMsg =
      'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
  } else {
    errMsg = ex.message || ex;
  }
  console.error(errMsg);
  alert(errMsg);
});
```

```typescript
// dce.ts
import { CameraView } from "@dynamsoft/dynamsoft-camera-enhancer";
CameraView.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.0/dist/";
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePath` tells the library where to get the necessary resources at runtime.

### Create and edit the `VideoCapture` component

* Add a file `VideoCapture.vue` under "/components/" as the `VideoCapture` component. The `VideoCapture` component helps decode barcodes via camera.

* In `VideoCapture.vue`, add the following code for initializing and destroying some instances.

```vue
<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  getCurrentInstance,
  type Ref,
} from "vue";
import { EnumCapturedResultItemType } from "@dynamsoft/dynamsoft-core";
import { type DecodedBarcodesResult } from "@dynamsoft/dynamsoft-barcode-reader";
import {
  CameraEnhancer,
  CameraView,
} from "@dynamsoft/dynamsoft-camera-enhancer";
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from "@dynamsoft/dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "@dynamsoft/dynamsoft-utility";

const pInit: Ref<Promise<{
  cameraView: CameraView;
  cameraEnhancer: CameraEnhancer;
  router: CaptureVisionRouter;
}> | null> = ref(null);
const elRefs: Ref<HTMLElement | null> = ref(null);

const init = async (): Promise<{
  cameraView: CameraView;
  cameraEnhancer: CameraEnhancer;
  router: CaptureVisionRouter;
}> => {
  try {
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await CameraView.createInstance();
    const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    elRefs.value!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    const router = await CaptureVisionRouter.createInstance();
    router.setInput(cameraEnhancer);

    // Define a callback for results.
    const resultReceiver = new CapturedResultReceiver();
    resultReceiver.onDecodedBarcodesReceived = (
      result: DecodedBarcodesResult
    ) => {
      for (let item of result.barcodesResultItems) {
        console.log(item.text);
        alert(item.text);
      }
    };
    router.addResultReceiver(resultReceiver);

    // Filter out unchecked and duplicate results.
    const filter = new MultiFrameResultCrossFilter();
    filter.enableResultCrossVerification(
      EnumCapturedResultItemType.CRIT_BARCODE,
      true
    ); // Filter out unchecked barcodes.
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication(
      EnumCapturedResultItemType.CRIT_BARCODE,
      true
    );
    filter.setDuplicateForgetTime(
      EnumCapturedResultItemType.CRIT_BARCODE,
      3000
    );
    await router.addResultFilter(filter);

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    await router.startCapturing("ReadSingleBarcode");
    return {
      cameraView,
      cameraEnhancer,
      router,
    };
  } catch (ex: any) {
    let errMsg;
    if (ex?.message.includes("network connection error")) {
      errMsg =
        "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
    } else {
      errMsg = ex.message || ex;
    }
    console.error(errMsg);
    alert(errMsg);
    throw ex;
  }
};

onMounted(async () => {
  pInit.value = init();
});

onBeforeUnmount(async () => {
  if (pInit.value) {
    const { cameraView, cameraEnhancer, router } = await pInit.value;
    router.dispose();
    cameraEnhancer.dispose();
    cameraView.dispose();
  }
  console.log("VideoCapture Component Unmount");
});
</script>

<template>
  <div ref="elRefs" class="div-ui-container"></div>
</template>

<style scoped>
.div-ui-container {
  width: 100%;
  height: 70vh;
  /* min-width: 640px; */
  /* min-height: 480px; */
  background: #eee;
  position: relative;
  resize: both;
}
</style>
```

### Create and edit the `ImageCapture` component

* Add a file `ImageCapture.vue` under "/components/" as the `ImageCapture` component. The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.vue`, add code for initializing and destroying `CaptureVisionRouter` instance.

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import { type BarcodeResultItem } from "@dynamsoft/dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "@dynamsoft/dynamsoft-capture-vision-router";

const pInit: Ref<Promise<CaptureVisionRouter> | null> = ref(null);

const decodeImg = async (e: Event) => {
  try {
    const router = await pInit.value;
    // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
    const result = await router!.capture(
      (e.target as any).files[0],
      "ReadBarcodes_SpeedFirst"
    );
    let texts = "";
    for (let item of result.items) {
      console.log((item as BarcodeResultItem).text);
      texts += (item as BarcodeResultItem).text + "\n";
    }
    if (texts !== "") alert(texts);
    if (!result.items.length) alert("No barcode found");
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    if (errMsg.includes("network connection error")) {
      errMsg =
        "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
    }
    console.error(errMsg);
    alert(errMsg);
  }
  (e.target as HTMLInputElement).value = "";
};

onMounted(async () => {
  pInit.value = CaptureVisionRouter.createInstance();
});

onBeforeUnmount(async () => {
  if (pInit.value) {
    const router = await pInit.value;
    router.dispose();
  }
  console.log("ImageCapture Component Unmount");
});
</script>

<template>
  <div class="div-image-capture">
    <input
      type="file"
      accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
      @change="decodeImg"
    />
  </div>
</template>

<style scoped>
.div-image-capture {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}
</style>
```

### Add `VideoCapture` and `ImageCapture` components in `HelloWorld.vue`

```vue
<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import "../cvr"; // import side effects. The license, engineResourcePath, so on.
import "../dce"; // import side effects. The license, engineResourcePath, so on.
import VideoCapture from "./VideoCapture.vue";
import ImageCapture from './ImageCapture.vue'

const bShowVideoCapture: Ref<boolean> = ref(true);
const bShowImageCapture: Ref<boolean> = ref(false)

const showVideoCapture = () => {
  bShowVideoCapture.value = true;
  bShowImageCapture.value = false;
};
const showImageCapture = () => {
  bShowVideoCapture.value = false;
  bShowImageCapture.value = true;
}
</script>

<template>
  <div className="div-hello-world">
    <h1>Hello World for Vue 3</h1>
    <div>
      <button :style="{ marginRight: '10px', backgroundColor: bShowVideoCapture ? 'rgb(255,174,55)' : 'white' }"
        @click="showVideoCapture">Decode Video</button>
      <button :style="{ backgroundColor: bShowImageCapture ? 'rgb(255,174,55)' : 'white' }" @click="showImageCapture">Decode Image</button>
    </div>
    <div class="container">
      <VideoCapture v-if="bShowVideoCapture"></VideoCapture>
      <ImageCapture v-if="bShowImageCapture"></ImageCapture>
    </div>
  </div>
</template>

<style scoped>
.div-hello-world {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #455a64;
}

button {
  font-size: 1.5rem;
  margin-bottom: 2vh;
  border: 1px solid black;
}

.container {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  width: 100%;
}

h1 {
  font-size: 1.5em;
}
</style>
```

### Add the `HelloWorld` component to `App.vue`

Edit the file `App.vue` to be like this

```vue
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>

<style scoped>
</style>
```

* Try running the project.

```cmd
npm run dev
```

If you have followed all the steps correctly, you should now have a functioning page that allows you to scan barcodes from a webcam or a built-in camera. Additionally, if you want to decode a local image, click the `Decode Image` button and select the image you want to decode. Any barcodes that are detected will be displayed in a dialog.

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
