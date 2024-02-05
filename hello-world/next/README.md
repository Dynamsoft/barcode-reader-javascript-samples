# Hello World Sample for Next.js

[Next.js](https://nextjs.org/) is an open-source development framework built on top of Node.js enabling [React](https://reactjs.org/) based web applications functionalities such as server-side rendering and generating static websites. Follow this guide to learn how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into a Next.js application. Note that in this sample `TypeScript` is used.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/1.hello-world/7.read-video-nextjs">Hello World in Next.js - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `next 13.5.6` are used in the example below.

## Create the sample project

### Create a Bootstrapped Raw Next.js Application

```cmd
npx create-next-app@latest --typescript --no-tailwind
```

### **CD** to the root directory of the application and install necessary dependencies

```cmd
npm install dynamsoft-core
npm install dynamsoft-license
npm install dynamsoft-utility
npm install dynamsoft-barcode-reader
npm install dynamsoft-capture-vision-router
npm install dynamsoft-camera-enhancer
```

## Start to implement

### Add file "cvr.ts" under "/src/" to configure libraries

```typescript
import { CoreModule } from 'dynamsoft-core';
import { LicenseManager } from 'dynamsoft-license';
import 'dynamsoft-barcode-reader';

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense(
  'DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAwLWRicl9qc19zYW1wbGVzIiwib3JnYW5pemF0aW9uSUQiOiIyMDAwMDAifQ=='
);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.0.21&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

CoreModule.engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.0.0/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.0.30/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.0.33/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.0.40/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.0.32/dist/",
  dbr: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.0.21/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.1/dist/"
};

// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(['DBR']);
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePaths` tells the library where to get the necessary resources at runtime.

### Build directory structure

* Create a directory "components", and then create another three directories "HelloWorld", "VideoCapture" and "ImageCapture" under "/src/components/".

### Create and edit the `VideoCapture` component

* Create `VideoCapture.tsx` and `VideoCapture.css` under "/components/VideoCapture/". The `VideoCapture` component helps decode barcodes via camera.

* In `VideoCapture.tsx`, add code for initializing and destroying some instances.

```tsx
"use client"

import React, { useEffect, useRef } from "react";
import { EnumCapturedResultItemType } from "dynamsoft-core";
import { DecodedBarcodesResult } from "dynamsoft-barcode-reader";
import {
  CameraEnhancer,
  CameraView,
} from "dynamsoft-camera-enhancer";
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";
import "./VideoCapture.css";

function VideoCapture() {
  const uiContainer = useRef<HTMLDivElement>(null);
  const resultsContainer = useRef<HTMLDivElement>(null);

  const pInit = useRef(
    null as Promise<{
      cameraView: CameraView;
      cameraEnhancer: CameraEnhancer;
      router: CaptureVisionRouter;
    }> | null
  );
  const pDestroy = useRef(null as Promise<void> | null);

  const init = async (): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    router: CaptureVisionRouter;
  }> => {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      uiContainer.current!.innerText = "";
      uiContainer.current!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const router = await CaptureVisionRouter.createInstance();
      router.setInput(cameraEnhancer);

      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (
        result: DecodedBarcodesResult
      ) => {
        if (!result.barcodeResultItems.length) return;

        resultsContainer.current!.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          resultsContainer.current!.append(
            `${item.formatString}: ${item.text}`,
            document.createElement('br'),
            document.createElement('hr'),
          );
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
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
      throw ex;
    }
  };

  const destroy = async (): Promise<void> => {
    if (pInit.current) {
      const { cameraView, cameraEnhancer, router } = await pInit.current;
      router.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
  };

  useEffect(() => {
    (async () => {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (pDestroy.current) {
        await pDestroy.current;
        pInit.current = init();
      } else {
        pInit.current = init();
      }
    })();

    return () => {
      (async () => {
        await (pDestroy.current = destroy());
        console.log("VideoCapture Component Unmount");
      })();
    };
  }, []);

  return (
    <div>
      <div ref={uiContainer} className="div-ui-container"></div>
      Results:
      <br />
      <div ref={resultsContainer} className="div-results-container"></div>
    </div>
  );
}

export default VideoCapture;
```

> Note:
>
> * The component should never update (check the code for `shouldComponentUpdate()`) so that events bound to the UI stay valid.

* Define the style of the element in `VideoCapture.css`

```css
.div-ui-container {
  width: 100%;
  height: 70vh;
}

.div-results-container {
  width: 100%;
  height: 10vh;
  overflow: auto;
}
```

### Create and edit the `ImageCapture` component

* Create `ImageCapture.tsx` and `ImageCapture.css` under "/components/ImageCapture/". The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.tsx`, add code for initializing and destroying the `CaptureVisionRouter` instance.

```tsx
"use client"

import React, { useRef, useEffect } from "react";
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import "./ImageCapture.css";

function ImageCapture() {
  const pInit = useRef(null as null | Promise<CaptureVisionRouter>);
  const pDestroy = useRef(null as null | Promise<void>);

  const init = async (): Promise<CaptureVisionRouter> => {
    const router = await CaptureVisionRouter.createInstance();
    return router;
  };

  const destroy = async (): Promise<void> => {
    if (pInit.current) {
      const router = (await pInit.current)!;
      router.dispose();
    }
  };

  const decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const router = (await pInit.current)!;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await router.capture(
        e.target.files![0],
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
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = "";
  };

  useEffect(() => {
    (async () => {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (pDestroy) {
        await pDestroy;
        pInit.current = init();
      } else {
        pInit.current = init();
      }
    })();

    return () => {
      (async () => {
        await (pDestroy.current = destroy());
        console.log("ImageCapture Component Unmount");
      })();
    };
  }, []);

  return (
    <div className="div-image-capture">
      <input
        type="file"
        accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
        onChange={decodeImg}
      />
    </div>
  );
}

export default ImageCapture;
```

* Define the style of the element in `ImageCapture.css`

```css
.div-image-capture {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid black;
}
```

### Create and edit the `HelloWorld` component

* Create `HelloWorld.tsx` and `HelloWorld.css` under "/src/components/HelloWorld/". The `HelloWorld` component offers buttons to switch components between `VideoCapture` and `ImageCapture`;

* Add following code to `HelloWorld.tsx`.

```tsx
"use client"

import React, { useState } from "react";
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import VideoCapture from "../VideoCapture/VideoCapture";
import ImageCapture from "../ImageCapture/ImageCapture";
import "./HelloWorld.css";

function HelloWorld() {
  let [bShowVideoCapture, setBShowVideoCapture] = useState(true);
  let [bShowImageCapture, setBShowImageCapture] = useState(false);

  const showVideoCapture = () => {
    setBShowVideoCapture(true);
    setBShowImageCapture(false);
  };

  const showImageCapture = () => {
    setBShowVideoCapture(false);
    setBShowImageCapture(true);
  };

  return (
    <div className="div-hello-world">
      <h1>Hello World for Next</h1>
      <div>
        <button
          style={{
            marginRight: "10px",
            backgroundColor: bShowVideoCapture ? "rgb(255,174,55)" : "white",
          }}
          onClick={showVideoCapture}
        >
          Decode Video
        </button>
        <button
          style={{
            backgroundColor: bShowImageCapture ? "rgb(255,174,55)" : "white",
          }}
          onClick={showImageCapture}
        >
          Decode Image
        </button>
      </div>
      <div className="container">
        {bShowVideoCapture ? <VideoCapture></VideoCapture> : ""}
        {bShowImageCapture ? <ImageCapture></ImageCapture> : ""}
      </div>
    </div>
  );
}

export default HelloWorld;
```

* Define the style of the element in `HelloWorld.css`

```css
.div-hello-world {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #455A64;
}

h1 {
    font-size: 1.5em;
}

button {
    font-size: 1.5rem;
    margin: 1.5vh 0;
    border: 1px solid black;
    background-color: white;
    color: black;
}

.container {
    margin: 2vmin auto;
    font-size: medium;
    width: 80vw;
}
```

### Add the `HelloWorld` component to /app/page.tsx

In `page.tsx`, import the `next/dynamic` to dynamically load `HelloWorld` component on the client side and disable server-rendering.

```jsx
import dynamic from "next/dynamic";

// disable server-rendering for 'HelloWorld' component.
const DynamicHeader = dynamic(
  () => import("../components/HelloWorld/HelloWorld"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <DynamicHeader />;
}
```

* Try running the project.

```cmd
npm run dev
```

If you have followed all the steps correctly, you should now have a functioning page that allows you to scan barcodes from a webcam or a built-in camera. Additionally, if you want to decode a local image, you can click the `Decode Image` button and select the image you want to decode. Any barcodes that are detected will be displayed in a dialog.

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