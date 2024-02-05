# Hello World Sample for Angular

[Angular](https://angular.io/) is one of the most popular and mature JavaScript frameworks. Check out the following on how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into an Angular application.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/angular/dist/angular/">Hello World in Angular - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/angular">Hello World in Angular - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) installed. `node 16.20.1` and `Angular CLI 16.2.7` are used in the example below.

## Create the sample project

### Create an out-of-the-box raw Angular application 

```cmd
ng new my-app
```

### **CD** to the root directory of the application and install necessary libraries

```cmd
cd my-app
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

### Generate three components
* `video-capture` component helps read barcode from camera.
```cmd
ng generate component video-capture
```
* `image-capture` component helps read barcode from still images.
```cmd
ng generate component image-capture
```
* `hello-world` component offers buttons to switch components above.
```cmd
ng generate component hello-world
```

### Edit the video-capture component

* Replace the original code in `video-capture.component.html` with code below.

```html
<div #uiContainer class="div-ui-container"></div>
Results:
<br>
<div #resultsContainer class="div-results-container"></div>
```

* Add CSS style in `video-capture.component.css`.

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

* In `video-capture.component.ts`, add code for initializing and destroying some instances.

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { EnumCapturedResultItemType } from 'dynamsoft-core'
import { DecodedBarcodesResult } from 'dynamsoft-barcode-reader';
import {
  CameraEnhancer,
  CameraView,
} from 'dynamsoft-camera-enhancer';
import {
  CapturedResultReceiver,
  CaptureVisionRouter,
} from 'dynamsoft-capture-vision-router';
import { MultiFrameResultCrossFilter } from 'dynamsoft-utility';
import '../../cvr'; // import side effects. The license, engineResourcePath, so on.

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css'],
})
export class VideoCaptureComponent {
  pInit: Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    router: CaptureVisionRouter;
  }> | null = null;

  @ViewChild('uiContainer') uiContainer: ElementRef<HTMLDivElement> | null =
    null;
  @ViewChild('resultsContainer') resultsContainer: ElementRef<HTMLDivElement> | null =
    null;

  async init(): Promise<{
    cameraView: CameraView;
    cameraEnhancer: CameraEnhancer;
    router: CaptureVisionRouter;
  }> {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      this.uiContainer!.nativeElement.append(cameraView.getUIElement()); // Get default UI and append it to DOM.
      
      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      const router = await CaptureVisionRouter.createInstance();
      router.setInput(cameraEnhancer);
      
      // Define a callback for results.
      const resultReceiver = new CapturedResultReceiver();
      resultReceiver.onDecodedBarcodesReceived = (result: DecodedBarcodesResult) => {
        if (!result.barcodeResultItems.length) return;

        this.resultsContainer!.nativeElement.textContent = '';
        console.log(result);
        for (let item of result.barcodeResultItems) {
          this.resultsContainer!.nativeElement.append(
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
      await router.startCapturing('ReadSingleBarcode');
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
  }

  async ngOnInit(): Promise<void> {
    this.pInit = this.init();
  }

  async ngOnDestroy() {
    if (this.pInit) {
      const { cameraView, cameraEnhancer, router } = await this.pInit;
      router.dispose();
      cameraEnhancer.dispose();
      cameraView.dispose();
    }
    this.uiContainer!.nativeElement.innerText = "";
    console.log('VideoCapture Component Unmount');
  }
}
```

### Edit the image-capture component

* Replace the original code in `image-capture.component.html` with code below to select a local image via `input` element.

```html
<div class="div-image-capture"><input type="file" accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp" (change)="decodeImg($event)"/></div>
```

* Add CSS style in `image-capture.component.css`.

```css
.div-image-capture {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid black;
}
```

* In `image-capture.component.ts`, add code for initializing and destroying the `CaptureVisionRouter` instance.

```typescript
import { Component } from '@angular/core';
import { BarcodeResultItem } from 'dynamsoft-barcode-reader';
import { CaptureVisionRouter } from 'dynamsoft-capture-vision-router';
import '../../cvr'; // import side effects. The license, engineResourcePath, so on.

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css'],
})
export class ImageCaptureComponent {
  pInit: Promise<CaptureVisionRouter> | null = null;

  decodeImg = async (e: any) => {
    try {
      const router = await this.pInit;
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await router!.capture(
        e.target.files[0],
        'ReadBarcodes_SpeedFirst'
      );
      let texts = '';
      for (let item of result.items) {
        console.log((item as BarcodeResultItem).text);
        texts += (item as BarcodeResultItem).text + '\n';
      }
      if (texts != '') alert(texts);
      if (!result.items.length) alert('No barcode found');
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = '';
  };

  async ngOnInit(): Promise<void> {
    this.pInit = CaptureVisionRouter.createInstance();
  }

  async ngOnDestroy() {
    if (this.pInit) {
      const router = await this.pInit;
      router.dispose();
    }
    console.log('ImageCapture Component Unmount');
  }
}

```

### Edit the hello-world component

* Use the components in `hello-world.component.html`.

```html
<div class="div-hello-world">
  <h1>Hello World for Angular</h1>
  <div>
      <button [ngStyle]="{'margin-right': '10px', 'background-color': bShowVideoCapture ? 'rgb(255,174,55)' : 'white'}" (click)="showVideoCapture()">Decode Video</button>
      <button [ngStyle]="{'background-color': !bShowVideoCapture ? 'rgb(255,174,55)' : 'white'}" (click)="showImageCapture()">Decode Image</button>
  </div>
  <div class="container">
      <app-video-capture *ngIf="bShowVideoCapture"></app-video-capture>
      <app-image-capture *ngIf="bShowImageCapture"></app-image-capture>
  </div>
</div>
```

* Define the style of the element in `hello-world.component.css`.

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

button {
  font-size: 1.5rem;
  margin: 1.5vh 0;
  border: 1px solid black;
  background-color: white;
  color: black;
}

.container {
  margin: 2vmin auto;
  height: 70vh;
  width: 80vw;
}

h1 {
  font-size: 1.5em;
}
```

* Add following code to `hello-world.component.ts`.

```typescript
import { Component } from '@angular/core';
import '../../cvr'; // import side effects. The license, engineResourcePath, so on.

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent {
  bShowVideoCapture = true;
  bShowImageCapture = false;
  
  showVideoCapture(): void {
    this.bShowVideoCapture = true;
    this.bShowImageCapture = false;
  }
  showImageCapture(): void {
    this.bShowVideoCapture = false;
    this.bShowImageCapture = true;
  }
}
```

### Add the hello-world component to `app.component.html`

Edit the file `app.component.html` to contain nothing but the following 

```html
<app-hello-world></app-hello-world>
```

* Try running the project.

```cmd
ng serve
```

If you have followed all the steps correctly, you should now have a functioning page that allows you to scan barcodes from a webcam or a built-in camera. Additionally, if you want to decode a local image, you can click the `Decode Image` button and select the image you want to decode. Any barcodes that are detected will be displayed in a dialog.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
