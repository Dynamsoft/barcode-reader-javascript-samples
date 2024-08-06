# Hello World Sample for React with Hooks

[React](https://reactjs.org/) is a JavaScript library meant explicitly for creating interactive UIs. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a React application. Note that in this sample we will use `TypeScript` and [Hooks](https://reactjs.org/docs/hooks-intro.html). Also, there is another sample `react` defining components as classes in React.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.2.1000`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.2.1000).

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/react-hooks/build/">Hello World in React with Hooks - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/react-hooks">Hello World in React with Hooks - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `react 18.2.0` are used in the example below.

## Quick Start 

```cmd
npm install
npm start
```
Then open http://localhost:3000/ to view the sample app. 

## Create the sample project

In this section, we will be creating a React application utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Create a Bootstrapped Raw React Application with TypeScript

```cmd
npx create-react-app my-app --template typescript
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

### Build directory structure

* Create a directory `components` under `/src/`, and then create two other directories, `VideoCapture` and `ImageCapture` under `/components/`.

### Create and edit the `VideoCapture` component

* Create `VideoCapture.tsx` under `/src/components/VideoCapture/`. The `VideoCapture` component helps decode barcodes via camera.

* In `VideoCapture.tsx`, add code for initializing and destroying some instances. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample). 

```tsx
/* /src/components/VideoCapture/VideoCapture.tsx */
import { useEffect, useRef } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

const componentDestroyedErrorMsg = "VideoCapture Component Destroyed";

function VideoCapture() {
  const cameraViewContainer = useRef<HTMLDivElement>(null);
  const resultsContainer = useRef<HTMLDivElement>(null);

  useEffect((): any => {
    let resolveInit: () => void;
    const pInit: Promise<void> = new Promise((r) => {
      resolveInit = r;
    });
    let isDestroyed = false;

    let cvRouter: CaptureVisionRouter;
    let cameraEnhancer: CameraEnhancer;

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
        cameraViewContainer.current!.append(cameraView.getUIElement());

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

            resultsContainer.current!.textContent = "";
            console.log(result);
            for (let item of result.barcodeResultItems) {
              resultsContainer.current!.textContent += `${item.formatString}: ${item.text}\n\n`;
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

        // Open camera and start scanning single barcode.
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
    })();

    // Resolve pInit promise once initialization is complete.
    resolveInit!();

    // componentWillUnmount. dispose cvRouter when it's no longer needed
    return async () => {
      isDestroyed = true;
      try {
        // Wait for the pInit to complete before disposing resources.
        await pInit;
        cvRouter?.dispose();
        cameraEnhancer?.dispose();
      } catch (_) {}
    };
  }, []);

  return (
    <div>
      <div ref={cameraViewContainer} className="camera-view-container"></div>
      <br />
      Results:
      <div ref={resultsContainer} className="results"></div>
    </div>
  );
}

export default VideoCapture;
```

> Note:
>
> * The component should never update so that events bound to the UI stay valid. In this copmonent, the useEffect() hook is used to handle the component’s mount and unmount lifecycle events, and there are no state updates that would cause a re-render.
> * If you're looking to customize the UI, the UI customization feature are provided by the auxiliary SDK "Dynamsoft Camera Enhancer". For more details, refer to our [User Guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html#customize-the-ui)

### Create and edit the `ImageCapture` component

* Create `ImageCapture.tsx` under `/src/components/ImageCapture/`. The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.tsx`, add code for initializing and destroying the `CaptureVisionRouter` instance. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```tsx
/* /src/components/ImageCapture/ImageCapture.tsx */
import React, { useRef, useEffect, MutableRefObject, useCallback } from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { EnumCapturedResultItemType } from "dynamsoft-core";
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

function ImageCapture() {
  const resultsContainer: MutableRefObject<HTMLDivElement | null> = useRef(null);

  let pCvRouter: MutableRefObject<Promise<CaptureVisionRouter> | null> = useRef(null);
  let isDestroyed = useRef(false);

  const decodeImg = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = [...(e.target.files as any as File[])];
    e.target.value = ""; // reset input
    resultsContainer.current!.innerText = "";

    try {
      // ensure cvRouter is created only once
      const cvRouter = await (pCvRouter.current = pCvRouter.current || CaptureVisionRouter.createInstance());
      if (isDestroyed.current) return;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
        if (isDestroyed.current) return;

        // Print file name if there's multiple files
        if (files.length > 1) {
          resultsContainer.current!.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          resultsContainer.current!.innerText += item.text + "\n"; // output the decoded barcode text
          console.log(item.text);
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length) resultsContainer.current!.innerText += "No barcode found";
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  }, []);

  useEffect((): any => {
    // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
    isDestroyed.current = false;

    // componentWillUnmount. dispose cvRouter when it's no longer needed
    return async () => {
      isDestroyed.current = true;
      if (pCvRouter.current) {
        try {
          (await pCvRouter.current).dispose();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <div className="image-capture-container">
      <div className="input-container">
        <input type="file" multiple accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={decodeImg} />
      </div>
      <div className="results" ref={resultsContainer}></div>
    </div>
  );
}

export default ImageCapture;
```

### Add the `VideoCapture` and `ImageCapture` component to `App.tsx`

* On `/src/App.tsx`, we will edit the component so that it offers buttons to switch components between `VideoCapture` and `ImageCapture`.

* Add following code to `App.tsx`. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```tsx
/* /src/App.tsx */
import { useState } from "react";
import VideoCapture from "./components/VideoCapture/VideoCapture";
import ImageCapture from "./components/ImageCapture/ImageCapture";

enum Modes {
  VIDEO_CAPTURE = "video",
  IMAGE_CAPTURE = "image",
}

function App() {
  const [mode, setMode] = useState(Modes.VIDEO_CAPTURE);

  const showVideoCapture = () => setMode(Modes.VIDEO_CAPTURE);

  const showImageCapture = () => setMode(Modes.IMAGE_CAPTURE);

  return (
    <div className="hello-world-page">
      <div className="title">
        <h2 className="title-text">Hello World for React</h2>
      </div>
      <div className="buttons-container">
        <button
          style={{
            backgroundColor: mode === Modes.VIDEO_CAPTURE ? "rgb(255,174,55)" : "white",
          }}
          onClick={showVideoCapture}
        >
          Decode Video
        </button>
        <button
          style={{
            backgroundColor: mode === Modes.IMAGE_CAPTURE ? "rgb(255,174,55)" : "white",
          }}
          onClick={showImageCapture}
        >
          Decode Image
        </button>
      </div>
      <div className="container">{mode === Modes.VIDEO_CAPTURE ? <VideoCapture /> : <ImageCapture />}</div>
    </div>
  );
}

export default App;
```

* Try running the project.

```cmd
npm start
```

If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Decode Image` button and select the image you want to decode. Once barcodes are found, the results will show in a dialog. 

## Development server

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Build

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).