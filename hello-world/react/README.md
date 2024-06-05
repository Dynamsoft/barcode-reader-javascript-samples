# Hello World Sample for React

[React](https://reactjs.org/) is a JavaScript library meant explicitly for creating interactive UIs. Follow this guide to learn how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into a React application. Note that in this sample we will use `TypeScript` and define components as classes. Also, there is another sample `react-hooks` using `Hooks` in React.

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `react 18.2.0` are used in the example below.

## Create the sample project

### Create a Bootstrapped Raw React Application with TypeScript

```cmd
npx create-react-app my-app --template typescript
```

### **CD** to the root directory of the application and install necessary libraries

```cmd
cd my-app
npm install 
npm install dynamsoft-capture-vision-std@1.2.0 -E
npm install dynamsoft-image-processing@2.2.10 -E
npm install dynamsoft-barcode-reader-bundle@10.2.1000 -E
```

## Start to implement

### Add file "dynamsoft.config.ts" under "/src/" to configure libraries

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

* Create `VideoCapture.tsx` and `VideoCapture.css` under "/src/components/VideoCapture/". The `VideoCapture` component helps decode barcodes via camera.

* In `VideoCapture.tsx`, add code for initializing and destroying some instances.

```tsx
import React from "react";
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

class VideoCapture extends React.Component {
  pInit: Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> | null = null;
  pDestroy: Promise<void> | null = null;

  uiContainer: React.RefObject<HTMLDivElement> = React.createRef();
  resultsContainer: React.RefObject<HTMLDivElement> = React.createRef();

  async init(): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      this.uiContainer.current!.innerText = "";
      this.uiContainer.current!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

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
      cvRouter.addResultReceiver(resultReceiver);

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      filter.enableResultCrossVerification(
        "barcode",
        true
      ); // Filter out unchecked barcodes.
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication(
        "barcode",
        true
      );
      filter.setDuplicateForgetTime(
        "barcode",
        3000
      );
      await cvRouter.addResultFilter(filter);

      // Open camera and start scanning single barcode.
      await cameraEnhancer.open();
      await cvRouter.startCapturing("ReadSingleBarcode");
      return {
        cameraView,
        cameraEnhancer,
        cvRouter,
      };
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
      throw ex;
    }
  }

  async destroy(): Promise<void> {
    if (this.pInit) {
      const { cameraView, cameraEnhancer, cvRouter } = await this.pInit;
      cvRouter.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
  }

  async componentDidMount() {
    // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
    if (this.pDestroy) {
      await this.pDestroy;
      this.pInit = this.init();
    } else {
      this.pInit = this.init();
    }
  }

  async componentWillUnmount() {
    await (this.pDestroy = this.destroy());
    console.log("VideoCapture Component Unmount");
  }

  shouldComponentUpdate() {
    // Never update UI after mount, sdk use native way to bind event, update will remove it.
    return false;
  }

  render() {
    return (
      <div>
        <div ref={this.uiContainer} className="div-ui-container"></div>
        Results:
        <br></br>
        <div ref={this.resultsContainer} className="div-results-container"></div>
      </div>
    );
  }
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

* Create `ImageCapture.tsx` and `ImageCapture.css` under "/src/components/ImageCapture/". The `ImageCapture` component helps decode barcodes in an image.

* In `ImageCapture.tsx`, add code for initializing and destroying the `CaptureVisionRouter` instance.

```tsx
import React from "react";
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import "../../cvr"; // import side effects. The license, engineResourcePath, so on.
import "./ImageCapture.css";

class ImageCapture extends React.Component {
  pInit: Promise<CaptureVisionRouter> | null = null;
  pDestroy: Promise<void> | null = null;

  async init(): Promise<CaptureVisionRouter> {
    const cvRouter = await CaptureVisionRouter.createInstance();
    return cvRouter;
  }

  async destroy(): Promise<void> {
    if (this.pInit) {
      const cvRouter = await this.pInit;
      cvRouter.dispose();
    }
  }

  decodeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const cvRouter = await this.pInit;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter!.capture(
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

  async componentDidMount() {
    // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
    if (this.pDestroy) {
      await this.pDestroy;
      this.pInit = this.init();
    } else {
      this.pInit = this.init();
    }
  }

  async componentWillUnmount() {
    await (this.pDestroy = this.destroy());
    console.log("ImageCapture Component Unmount");
  }

  render() {
    return (
      <div className="div-image-capture">
        <input
          type="file"
          accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
          onChange={this.decodeImg}
        />
      </div>
    );
  }
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

### Edit the `App` component

* Edit `App.tsx` and `Appd.css` under "/src/". The `App` component offers buttons to switch components between `VideoCapture` and `ImageCapture`;

* Add following code to `App.tsx`.

```tsx
import React from 'react';
import reactLogo from './assets/logo.svg';
import VideoCapture from './components/VideoCapture/VideoCapture';
import ImageCapture from './components/ImageCapture/ImageCapture';
import './App.css';

class App extends React.Component {
  state = {
    mode: "video"
  };

  render() {
    return (
      <div className='App'>
        <div className='title'>
          <h2 className='title-text'>Hello World for React</h2>
          <img className='title-logo' src={reactLogo} alt="logo"></img>
        </div>
        <div className='top-btns'>
          <button onClick={() => { this.setState({ mode: "video" }) }} style={{ backgroundColor: this.state.mode === "video" ? "rgb(255, 174, 55)" : "#fff" }}>Video Capture</button>
          <button onClick={() => { this.setState({ mode: "image" }) }} style={{ backgroundColor: this.state.mode === "image" ? "rgb(255, 174, 55)" : "#fff" }}>Image Capture</button>
        </div>
        {this.state.mode === "video" ? <VideoCapture /> : <ImageCapture />}
      </div>
    );
  }
}

export default App;

```

* Define the style of the element in `App.css`

```css
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.title .title-logo {
  width: 60px;
  height: 60px;
  animation: retate 5s infinite linear;
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

@keyframes retate {
  from {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
}
```

## Try running the project

```cmd
npm start
```

If you have followed all the steps correctly, you should now have a functioning page that allows you to scan barcodes from a webcam or a built-in camera. Additionally, if you want to decode a local image, you can click the `Decode Image` button and select the image you want to decode. Any barcodes that are detected will be displayed in a dialog.

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

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).