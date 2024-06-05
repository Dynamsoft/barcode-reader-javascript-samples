# Hello World Sample for Vue3

[Vue 3](https://v3.vuejs.org/) is version 3 of Vue which is a progressive framework for building user interfaces. Check out the following guide on how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into a Vue 3 application. Note that in this sample, `TypeScript` is used.

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
npm install dynamsoft-capture-vision-std@1.2.0 -E
npm install dynamsoft-image-processing@2.2.10 -E
npm install dynamsoft-barcode-reader-bundle@10.2.1000 -E
```

## Start to implement

### ### Add file "dynamsoft.config.ts" under "/src/" to configure libraries

```typescript
import { CoreModule } from 'dynamsoft-core';
import { LicenseManager } from 'dynamsoft-license';
import 'dynamsoft-barcode-reader';

// Configures the paths where the .wasm files and other necessary resources for modules are located.
CoreModule.engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.2.10/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.2.30/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.2.30/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.2.21/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.2.30/dist/",
  dbr: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.2.10/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.3/dist/"
};

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense(
  'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9'
);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(['DBR']);
```

> Note:
> 
> * `engineResourcePaths` tells the library where to get the necessary resources at runtime.
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days.

### Build directory structure

* Create a directory "components" under "/src/", and then create another two directories "VideoCapture" and "ImageCapture" under "/src/components/".

### Create and edit the `VideoCapture` component

* Add a file `VideoCapture.vue` under "/components/" as the `VideoCapture` component. The `VideoCapture` component helps decode barcodes via camera.

* In `VideoCapture.vue`, add the following code for initializing and destroying some instances.

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

const strErrorDistoryed = 'videoCapture component destoryed';

const uiContainer: Ref<HTMLElement | null> = ref(null);
const resultsContainer: Ref<HTMLElement | null> = ref(null);

let resolveInit:()=>void;
const pInit:Promise<void> = new Promise(r=>{resolveInit=r});
let bDestoryed = false;

let cvRouter:CaptureVisionRouter;
let cameraEnhancer:CameraEnhancer;

onMounted(async () => {

  try{
    // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
    const cameraView = await CameraView.createInstance();
    if(bDestoryed){ throw Error(strErrorDistoryed); } // Check if component is destroyed after every async
    cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
    if(bDestoryed){ throw Error(strErrorDistoryed); }

    // Get default UI and append it to DOM.
    uiContainer.value!.append(cameraView.getUIElement());

    // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
    cvRouter = await CaptureVisionRouter.createInstance();
    if(bDestoryed){ throw Error(strErrorDistoryed); }
    cvRouter.setInput(cameraEnhancer);

    // Define a callback for results.
    cvRouter.addResultReceiver({ onDecodedBarcodesReceived: (result) => {
      if (!result.barcodeResultItems.length) return;

      resultsContainer.value!.textContent = '';
      console.log(result);
      for (let item of result.barcodeResultItems) {
        resultsContainer.value!.append(
          `${item.formatString}: ${item.text}`,
          document.createElement('br'),
          document.createElement('hr'),
        );
      }
    }});

    // Filter out unchecked and duplicate results.
    const filter = new MultiFrameResultCrossFilter();
    // Filter out unchecked barcodes.
    filter.enableResultCrossVerification("barcode", true);
    // Filter out duplicate barcodes within 3 seconds.
    filter.enableResultDeduplication("barcode", true);
    await cvRouter.addResultFilter(filter);
    if(bDestoryed){ throw Error(strErrorDistoryed); }

    // Open camera and start scanning single barcode.
    await cameraEnhancer.open();
    if(bDestoryed){ throw Error(strErrorDistoryed); }
    await cvRouter.startCapturing("ReadSingleBarcode");
    if(bDestoryed){ throw Error(strErrorDistoryed); }

  }catch(ex:any){
    
    if((ex as Error)?.message === strErrorDistoryed){
      console.log(strErrorDistoryed);
    }else{
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }

  // distroy function will wait pInit
  resolveInit!();
});

onBeforeUnmount(async () => {
  bDestoryed = true;
  try{
    await pInit;
    cvRouter?.dispose();
    cameraEnhancer?.dispose();
  }catch(_){}
});
</script>

<template>
  <div>
    <div ref="uiContainer" class="div-ui-container"></div>
    Results:<br />
    <div ref="resultsContainer" class="div-results-container"></div>
  </div>
</template>
    
<style scoped>
.div-ui-container {
  width: 100%;
  height: 70vh;
  background: #eee;
}

.div-results-container {
  width: 100%;
  height: 10vh;
  overflow: auto;
}
</style>
```

### Create and edit the `ImageCapture` component

* Add a file `ImageCapture.vue` under "/components/" as the `ImageCapture` component. The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.vue`, add code for initializing and destroying `CaptureVisionRouter` instance.

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref, type Ref } from "vue";
import "../dynamsoft.config";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import type { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

const resDiv: Ref<HTMLDivElement | null> = ref(null);

let pCvRouter: Promise<CaptureVisionRouter>;
let bDestoried = false;

const captureImage = async (e: Event) => {
  let files = [...(e.target! as HTMLInputElement).files!];
  (e.target! as HTMLInputElement).value = '';
  resDiv.value!.innerText = "";
  try {
    const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
    if (bDestoried) return;
    
    for(let file of files){
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
      if (bDestoried) return;

      if(files.length > 1){
        resDiv.value!.innerText += `\n${file.name}:\n`;
      }
      for (let _item of result.items) {
        if(_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) { continue; }
        let item = _item as BarcodeResultItem;
        resDiv.value!.innerText += item.text + "\n";
        console.log(item.text);
      }
      if (!result.items.length) resDiv.value!.innerText += 'No barcode found\n';
    }
  } catch (ex: any) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  }
}

onBeforeUnmount(async () => {
  bDestoried = true;
  if(pCvRouter){
    try{
      (await pCvRouter).dispose();
    }catch(_){}
  }
});
</script>

<template>
  <div class="capture-img">
    <div class="img-ipt">
      <input type="file" multiple @change="captureImage" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"/>
    </div>
    <div class="result-area" ref="resDiv"></div>
  </div>
</template>
    
<style scoped>
.capture-img {
  width: 100%;
  height: 100%;
  font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
}

.capture-img .img-ipt {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  margin: 0 auto;
}

.capture-img .result-area {
  margin-top: 20px;
}
</style>
```

### Add `VideoCapture` and `ImageCapture` components in `App.vue`

```vue
<script setup lang="ts">
import { ref, type Ref } from "vue";
import vueLogo from "./assets/logo.svg";
import VideoCapture from "./components/VideoCapture.vue";
import ImageCapture from "./components/ImageCapture.vue";

const mode: Ref<string> = ref("video");
</script>

<template>
  <div class='App'>
    <div class='title'>
      <h2 class='title-text'>Hello World for Vue</h2>
      <img class='title-logo' :src="vueLogo" alt="logo" />
    </div>
    <div class='top-btns'>
      <button @click="mode = 'video'" :style="{ backgroundColor: mode === 'video' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Video Capture</button>
      <button @click="mode = 'image'" :style="{ backgroundColor: mode === 'image' ? 'rgb(255, 174, 55)' : '#FFFFFF' }">Image Capture</button>
    </div>
    <VideoCapture v-if="mode === 'video'"/> 
    <ImageCapture v-else/>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.title .title-logo {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}

.top-btns {
  width: 30%;
  margin: 20px auto;
}

.top-btns button {
  display: inline-block;
  border: 1px solid black;
  padding: 5px 15px;
  background-color: transparent;
  cursor: pointer;
}

.top-btns button:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: transparent;
}
.top-btns button:nth-child(2) {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: transparent;
}

@media screen and (max-width: 500px) {
  .top-btns {
    width: 70%;
  }
}
</style>
```

### Try running the project.

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
