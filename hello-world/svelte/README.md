# Hello World for Vite + Svelte + TS - Dynamsoft Barcode Reader Sample

[Svelte](https://svelte.dev/) is a JavaScript library meant explicitly for creating interactive UIs. Svelte compiles components into code that directly manipulates the DOM, unlike other frameworks such as Vue and React that relies on a virtual DOM for updates.  Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a Svelte application using Vite. Note that in this sample we will use TypeScript.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.4.2000-beta-202409252259](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.4.2000-beta-202409252259.

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/svelte">Hello World for Vite + Svelte + TS - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `svelte 4.2.12` are used in the example below.

## Quick Start 

```cmd
npm install
npm run dev
```
Then open http://localhost:5173/ to view the sample app. 

## Create the sample project

If you're planning to start the project from scratch, in this section, we will be creating a Svelte application with Vite utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Create a Bootstrapped Svelte Application with Vite and TypeScript

```cmd
npm create vite@latest my-app                  

<!-- Configurations -->
√ Select a framework: » Svelte
√ Select a variant: » TypeScript
```

### **CD** to the root directory of the application and install necessary libraries

```cmd
cd my-app
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
CoreModule.engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.4.10/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.4.20/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.4.20/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.4.20/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.4.20/dist/",
  dbr: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.4.20/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.1.0/dist/",
};

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", {
  executeNow: true,
});

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.4.2000&utm_source=samples#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(["DBR"]);
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePaths` tells the library where to get the necessary resources at runtime.

### Build directory structure

* Create a directory `components` under `/src/`

### Create and edit the `VideoCapture` component

* Create `VideoCapture.svelte` under `/src/components/`. The `VideoCapture` component helps decode barcodes via camera.

* In `VideoCapture.svelte`, add code for initializing and destroying some instances. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample). 

```svelte
<!-- /src/components/VideoCapture.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import "../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
  import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
  import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
  import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

  const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

  let cameraViewContainer: HTMLDivElement;
  let resultsContainer: HTMLDivElement;

  let resolveInit: () => void;
  const pInit: Promise<void> = new Promise((r) => {
    resolveInit = r;
  });
  let isDestroyed = false;

  let cvRouter: CaptureVisionRouter;
  let cameraEnhancer: CameraEnhancer;

  onMount(() => {
    (async () => {
      try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await CameraView.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        } // Check if component is destroyed after every async
        cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        // Get default UI and append it to DOM.
        cameraViewContainer.append(cameraView.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await CaptureVisionRouter.createInstance();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        cvRouter.addResultReceiver({
          onDecodedBarcodesReceived: (result) => {
            if (!result.barcodeResultItems.length) return;

            resultsContainer.textContent = "";
            console.log(result);
            for (let item of result.barcodeResultItems) {
              resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
            }
          },
        });

        // Filter out unchecked and duplicate results.
        const filter = new MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }

        //  Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
        await cvRouter.startCapturing("ReadSingleBarcode");
        if (isDestroyed) {
          throw Error(componentDestroyedErrorMsg);
        }
      } catch (ex: any) {
        if ((ex as Error)?.message === componentDestroyedErrorMsg) {
          console.log(componentDestroyedErrorMsg);
        } else {
          let errMsg = ex.message || ex;
          console.error(errMsg);
          alert(errMsg);
        }
      }

      // distroy function will wait pInit
      resolveInit!();
    })();

    // onBeforeUnmount
    return async () => {
      isDestroyed = true;
      try {
        await pInit;
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      } catch (_) {}
    };
  });
</script>

<div>
  <div bind:this={cameraViewContainer} style="width: 100%; height: 70vh; background: #eee;"></div>
  Results:<br />
  <div bind:this={resultsContainer} class="results"></div>
</div>
```

> Note:
> 
> * If you're looking to customize the UI, the UI customization feature are provided by the auxiliary SDK "Dynamsoft Camera Enhancer". For more details, refer to our [User Guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html#customize-the-ui)

### Create and edit the `ImageCapture` component

* Create `ImageCapture.svelte` under `/src/components/`. The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.svelte`, add code for initializing and destroying some instances. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample). 

```svelte
<!-- /src/components/ImageCapture.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import "../dynamsoft.config";
  import { EnumCapturedResultItemType } from "dynamsoft-core";
  import { type BarcodeResultItem } from "dynamsoft-barcode-reader";
  import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

  let resultsContainer: HTMLDivElement;

  let pCvRouter: Promise<CaptureVisionRouter>;
  let isDestroyed = false;

  const captureImage = async (e: Event) => {
    let files = [...(e.target! as HTMLInputElement).files!];
    (e.target! as HTMLInputElement).value = ""; // reset input
    resultsContainer.innerText = "";

    try {
      const cvRouter = await (pCvRouter = pCvRouter || CaptureVisionRouter.createInstance());
      if (isDestroyed) return;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
        if (isDestroyed) return;

        // Print file name if there's multiple files
        if (files.length > 1) {
          resultsContainer.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          resultsContainer.innerText += item.text + "\n"; // output the decoded barcode text
          console.log(item.text);
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length) resultsContainer.innerText += "No barcode found\n";
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  };

  onMount(() => {
    // onBeforeUnmount. dispose cvRouter when it's no longer needed
    return async () => {
      isDestroyed = true;
      if (pCvRouter) {
        try {
          (await pCvRouter).dispose();
        } catch (_) {}
      }
    };
  });
</script>

<div class="image-capture-container">
  <div class="input-container">
    <input type="file" multiple on:change={captureImage} accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" />
  </div>
  <div class="result" bind:this={resultsContainer}></div>
</div>
```

### Add the `VideoCapture` and `ImageCapture` component to `App.svelte`

* On `/src/App.svelte`, we will edit the component so that it offers buttons to switch components between `VideoCapture` and `ImageCapture`.

* Add following code to `App.svelte`. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).
  
```svelte
<!-- /* src/App.svelte */ -->
<script lang="ts">
  import VideoCapture from "./components/VideoCapture.svelte";
  import ImageCapture from "./components/ImageCapture.svelte";

  let mode = "video";
</script>

<main>
  <div class="App">
    <div class="title">
      <h2 class="title-text">Hello World for Svelte</h2>
      <img class="title-logo" src="https://www.svelte.cn/svelte-logo-horizontal.svg" alt="svelte" />
    </div>
    <div class="buttons-container">
      <button
        style="background-color: {mode === 'video' ? 'rgb(255, 174, 55)' : 'white'}"
        on:click={() => {
          mode = "video";
        }}>Decode Video</button
      >
      <button
        style="background-color: {mode === 'image' ? 'rgb(255, 174, 55)' : 'white'}"
        on:click={() => {
          mode = "image";
        }}>Decode Image</button
      >
    </div>
    {#if mode === "video"}
      <VideoCapture></VideoCapture>
    {:else}
      <ImageCapture></ImageCapture>
    {/if}
  </div>
</main>
```

* Try running the project.

```cmd
npm run dev
```

If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Decode Image` button and select the image you want to decode. Once barcodes are found, the results will show in a dialog. 

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).