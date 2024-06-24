# Hello World Sample for React

[React](https://reactjs.org/) is a JavaScript library meant explicitly for creating interactive UIs. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a React application. Note that in this sample we will use `TypeScript` and define components as classes. Also, there is another sample `react-hooks` using `Hooks` in React.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.2.1000`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.2.1000).

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/react/build/">Hello World in React - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/react">Hello World in React - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) installed. `node 16.20.1` and `react 18.2.0` are used in the example below.

## Quick Start 

```cmd
npm install
npm start
```
Then open http://localhost:3000/ to view the sample app. 

## Creating the sample project

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
npm install dynamsoft-barcode-reader-bundle
```

## Start to implement

### Add file "dynamsoft.config.ts" at the root of the app to configure libraries

```typescript
import { CoreModule } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";
import "dynamsoft-barcode-reader";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

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

// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(["DBR"]);
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePaths` tells the library where to get the necessary resources at runtime.


### Build directory structure

* Create a directory "components" under "/src/", and then create another three directories "HelloWorld", "VideoCapture" and "ImageCapture" under "/src/components/".

### Create and edit the `VideoCapture` component

* Create `VideoCapture.tsx` under "/src/components/VideoCapture/". The `VideoCapture` component helps decode barcodes via camera. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

* In `VideoCapture.tsx`, add code for initializing and destroying some instances. 

```tsx
import React from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { DecodedBarcodesResult } from "dynamsoft-barcode-reader";
import { CameraEnhancer, CameraView } from "dynamsoft-camera-enhancer";
import { CapturedResultReceiver, CaptureVisionRouter } from "dynamsoft-capture-vision-router";
import { MultiFrameResultCrossFilter } from "dynamsoft-utility";

class VideoCapture extends React.Component {
  cameraViewContainer: React.RefObject<HTMLDivElement> = React.createRef();
  resultsContainer: React.RefObject<HTMLDivElement> = React.createRef();

  // pInit tracks the promise of the cameraView, cameraEnhancer, and cvRouter
  pInit: Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> | null = null;
  // pDestroy tracks the promise for destruction of the initialized components
  pDestroy: Promise<void> | null = null;

  async init(): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    cvRouter: CaptureVisionRouter;
  }> {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      this.cameraViewContainer.current!.innerText = "";
      this.cameraViewContainer.current!.append(cameraView.getUIElement()); // Get default UI and append it to DOM.

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const cvRouter = await CaptureVisionRouter.createInstance();
      cvRouter.setInput(cameraEnhancer);

      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (result: DecodedBarcodesResult) => {
        if (!result.barcodeResultItems.length) return;

        this.resultsContainer.current!.textContent = "";
        console.log(result);
        for (let item of result.barcodeResultItems) {
          this.resultsContainer.current!.textContent += `${item.formatString}: ${item.text}\n\n`;
        }
      };
      cvRouter.addResultReceiver(resultReceiver);

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      // Filter out unchecked barcodes.
      filter.enableResultCrossVerification("barcode", true);
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication("barcode", true);
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
      // Ensure components are initialized before we destroy
      const { cameraView, cameraEnhancer, cvRouter } = await this.pInit;
      cvRouter.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
  }

  async componentDidMount() {
    try {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (this.pDestroy) {
        await this.pDestroy;
        this.pInit = this.init();
      } else {
        this.pInit = this.init();
      }
    } catch (_) {}
  }

  async componentWillUnmount() {
    try {
      await (this.pDestroy = this.destroy());
      console.log("VideoCapture Component Unmount");
    } catch (_) {}
  }

  shouldComponentUpdate() {
    // Never update UI after mount, sdk use native way to bind event, update will remove it.
    return false;
  }

  render() {
    return (
      <div>
        <div ref={this.cameraViewContainer} className="camera-view-container"></div>
        Results:
        <br></br>
        <div ref={this.resultsContainer} className="results"></div>
      </div>
    );
  }
}

export default VideoCapture;
```

> Note:
>
> * The component should never update (check the code for `shouldComponentUpdate()`) so that events bound to the UI stay valid.

### Create and edit the `ImageCapture` component

* Create `ImageCapture.tsx` under "/src/components/ImageCapture/". The `ImageCapture` component helps decode barcodes in an image. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

* In `ImageCapture.tsx`, add code for initializing and destroying the `CaptureVisionRouter` instance.

```tsx
import React from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeResultItem } from "dynamsoft-barcode-reader";
import { CaptureVisionRouter } from "dynamsoft-capture-vision-router";

class ImageCapture extends React.Component {
  resultsContainer: React.RefObject<HTMLDivElement> = React.createRef();

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
      const result = await cvRouter!.capture(e.target.files![0], "ReadBarcodes_SpeedFirst");

      // Initialize an empty string to hold the decoded barcode texts
      let texts = "";
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + "\n";
      }
      // If the 'texts' string is not empty, display the decoded bacode texts
      if (texts !== "") this.resultsContainer.current!.innerText = texts;

      // If no items are found, display that no barcode was detected
      if (!result.items.length) this.resultsContainer.current!.innerText = "No barcode found";
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = "";
  };

  async componentDidMount() {
    try {
      // In 'development', React runs setup and cleanup one extra time before the actual setup in Strict Mode.
      if (this.pDestroy) {
        await this.pDestroy;
        this.pInit = this.init();
      } else {
        this.pInit = this.init();
      }
    } catch (_) {}
  }

  async componentWillUnmount() {
    try {
      await (this.pDestroy = this.destroy());
      console.log("ImageCapture Component Unmount");
    } catch (_) {}
  }

  render() {
    return (
      <div className="image-capture-container">
        <div className="input-container">
          <input type="file" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" onChange={this.decodeImg} />
        </div>
        <div className="results" ref={this.resultsContainer}></div>
      </div>
    );
  }
}

export default ImageCapture;
```

### Create and edit the `HelloWorld` component

* Create `HelloWorld.tsx` under "/src/components/HelloWorld/". The `HelloWorld` component offers buttons to switch components between `VideoCapture` and `ImageCapture`. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

* Add following code to `HelloWorld.tsx`.

```tsx
import React from "react";
import "../../dynamsoft.config"; // import side effects. The license, engineResourcePath, so on.
import VideoCapture from "../VideoCapture/VideoCapture";
import ImageCapture from "../ImageCapture/ImageCapture";

enum Modes {
  VIDEO_CAPTURE = "video",
  IMAGE_CAPTURE = "image",
}

class HelloWorld extends React.Component {
  state = {
    mode: Modes.VIDEO_CAPTURE,
  };

  showVideoCapture = () => {
    this.setState({
      mode: Modes.VIDEO_CAPTURE,
    });
  };

  showImageCapture = () => {
    this.setState({
      mode: Modes.IMAGE_CAPTURE,
    });
  };

  render() {
    return (
      <div className="hello-world-page">
        <h1>Hello World for React</h1>
        <div>
          <button
            style={{
              backgroundColor: this.state.mode === Modes.VIDEO_CAPTURE ? "rgb(255,174,55)" : "white",
            }}
            onClick={this.showVideoCapture}
          >
            Decode Video
          </button>
          <button
            style={{
              backgroundColor: this.state.mode === Modes.IMAGE_CAPTURE ? "rgb(255,174,55)" : "white",
            }}
            onClick={this.showImageCapture}
          >
            Decode Image
          </button>
        </div>
          <div className="container">{this.state.mode === Modes.VIDEO_CAPTURE ? <VideoCapture /> : <ImageCapture />}</div>
      </div>
    );
  }
}

export default HelloWorld;
```

### Add the `HelloWorld` component to `App.tsx`

Edit the file `App.tsx` to be like this

```jsx
import HelloWorld from './components/HelloWorld/HelloWorld';
import './App.css';

function App() {
  return (
    <div className="App">
      <HelloWorld></HelloWorld>
    </div>
  );
}

export default App;
```

* Try running the project.

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

See the section about [deployment](https://create-react-app.dev/docs/deployment/) for more information.

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).