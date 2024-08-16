# Hello World Sample for Angular

[Angular](https://angular.dev/) is one of the most popular and mature JavaScript frameworks. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into an Angular application. Note that in this sample, `TypeScript` is used.

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.2.1000`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.2.1000).

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/angular">Hello World in Angular - Source Code</a>
* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/hello-world/angular/dist/dbrjs-sample-angular/browser/">Hello World in Angular - Demo</a>

## Preparation
Make sure you have [node](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) installed. 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Quick Start

```cmd
ng serve
```
Then open `https://localhost:4200/` to view the sample app.

## Creating the sample project

In this section, we will be creating an Angular application utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Create an [Angular](https://angular.dev) Application bootstrapped with [Angular CLI](https://cli.angular.io/)
```cmd
ng new my-app
```

On installation, you will be prompted to configure your project.\
You can customize these options according to your preferences.\
Below is the configuration used for this sample.

```
? Which stylesheet format would you like to use? CSS
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? No
```

On installation, you will be prompted to configure your project.\
You can customize these options according to your preferences.\
Below is the configuration used for this sample.

### **CD** to the root directory of the application and install necessary libraries

```cmd
cd my-app
npm install dynamsoft-barcode-reader-bundle -E
```

## Start to implement

### Add file "dynamsoft.config.ts" at the root of the app to configure libraries

```typescript
/* /dynamsoft.config.ts */
import { CoreModule } from 'dynamsoft-core';
import { LicenseManager } from 'dynamsoft-license';
import 'dynamsoft-barcode-reader';

// Configures the paths where the .wasm files and other necessary resources for modules are located.
CoreModule.engineResourcePaths = {
  std: 'https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.2.10/dist/',
  dip: 'https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.2.30/dist/',
  core: 'https://cdn.jsdelivr.net/npm/dynamsoft-core@3.2.30/dist/',
  license: 'https://cdn.jsdelivr.net/npm/dynamsoft-license@3.2.21/dist/',
  cvr: 'https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.2.30/dist/',
  dbr: 'https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.2.10/dist/',
  dce: 'https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.3/dist/',
};

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense('DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9', true);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=samples#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(['DBR']);
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePaths` tells the library where to get the necessary resources at runtime.

### Generate and edit the `video-capture` component

* Generate the `video-capture`. The `video-capture` component helps decode barcodes via camera.

```cmd
ng generate component video-capture
```

* In `video-capture.component.html`, add code to setup the component's HTML

```html
<!-- /src/app/video-capture/video-capture.component.html -->
<div #cameraViewContainer class="camera-view-container"></div>
<br />
Results:
<div #results class="results"></div>
```

* In `video-capture.component.ts`, add code for initializing and destroying some instances. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```ts
/* /src/app/video-capture/video-capture.component.ts */
import { Component, ElementRef, ViewChild } from '@angular/core';
import '../dynamsoft.config';
import { CameraEnhancer, CameraView } from 'dynamsoft-camera-enhancer';
import { CaptureVisionRouter } from 'dynamsoft-capture-vision-router';
import { MultiFrameResultCrossFilter } from 'dynamsoft-utility';

const componentDestroyedErrorMsg = 'VideoCapture Component Destroyed';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.css'],
  standalone: true,
})
export class VideoCaptureComponent {
  @ViewChild('cameraViewContainer') cameraViewContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('results') resultsContainer?: ElementRef<HTMLDivElement>;

  resolveInit?: () => void;
  pInit: Promise<void> = new Promise((r) => {
    this.resolveInit = r;
  });
  isDestroyed = false;

  cvRouter?: CaptureVisionRouter;
  cameraEnhancer?: CameraEnhancer;

  async ngAfterViewInit(): Promise<void> {
    try {
      // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
      const cameraView = await CameraView.createInstance();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      } // Check if component is destroyed after every async
      this.cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }

      // Get default UI and append it to DOM.
      this.cameraViewContainer!.nativeElement.append(cameraView.getUIElement());

      // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
      this.cvRouter = await CaptureVisionRouter.createInstance();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      this.cvRouter.setInput(this.cameraEnhancer);

      // Define a callback for results.
      this.cvRouter.addResultReceiver({
        onDecodedBarcodesReceived: (result) => {
          if (!result.barcodeResultItems.length) return;

          this.resultsContainer!.nativeElement.textContent = '';
          console.log(result);
          for (let item of result.barcodeResultItems) {
            this.resultsContainer!.nativeElement.textContent += `${item.formatString}: ${item.text}\n\n`;
          }
        },
      });

      // Filter out unchecked and duplicate results.
      const filter = new MultiFrameResultCrossFilter();
      // Filter out unchecked barcodes.
      filter.enableResultCrossVerification('barcode', true);
      // Filter out duplicate barcodes within 3 seconds.
      filter.enableResultDeduplication('barcode', true);
      await this.cvRouter.addResultFilter(filter);
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }

      // Open camera and start scanning single barcode.
      await this.cameraEnhancer.open();
      if (this.isDestroyed) {
        throw Error(componentDestroyedErrorMsg);
      }
      await this.cvRouter.startCapturing('ReadSingleBarcode');
      if (this.isDestroyed) {
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

    // Resolve pInit promise once initialization is complete.
    this.resolveInit!();
  }

  // dispose cvRouter when it's no longer needed
  async ngOnDestroy() {
    this.isDestroyed = true;
    try {
      // Wait for the pInit to complete before disposing resources.
      await this.pInit;
      this.cvRouter?.dispose();
      this.cameraEnhancer?.dispose();
    } catch (_) {}
  }
}
```
> Note:
>
> If you're looking to customize the UI, the UI customization feature are provided by the auxiliary SDK "Dynamsoft Camera Enhancer". For more details, refer to our [User Guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html#customize-the-ui)


### Generate and edit the `image-capture` component

* Generate the `image-capture`. The `image-capture` component helps decode barcodes in an image.

```cmd
ng generate component image-capture
```

* In `image-capture.component.html`, add code to setup the component's HTML

```html
<!-- /src/app/image-capture/image-capture.component.html -->
<div class="image-capture-container">
  <div class="input-container">
    <input
      type="file"
      multiple
      (change)="captureImage($event)"
      accept=".jpg,.jpeg,.icon,.gif,.svg,.webp,.png,.bmp"
    />
  </div>
  <div class="results" #results></div>
</div>
```

* In `image-capture.component.ts`, add code for initializing and destroying some instances. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```ts
/* /src/app/image-capture/image-capture.component.ts */
import { Component, ViewChild, ElementRef } from '@angular/core';
import '../dynamsoft.config';
import { EnumCapturedResultItemType } from 'dynamsoft-core';
import type { BarcodeResultItem } from 'dynamsoft-barcode-reader';
import { CaptureVisionRouter } from 'dynamsoft-capture-vision-router';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css'],
  standalone: true,
})
export class ImageCaptureComponent {
  @ViewChild('results') resultsContainer?: ElementRef<HTMLDivElement>;

  pCvRouter?: Promise<CaptureVisionRouter>;
  isDestroyed = false;

  captureImage = async (e: Event) => {
    let files = [...((e.target! as HTMLInputElement).files as any as File[])];
    (e.target! as HTMLInputElement).value = ''; // reset input
    this.resultsContainer!.nativeElement.innerText = '';
    try {
      // ensure cvRouter is created only once
      const cvRouter = await (this.pCvRouter =
        this.pCvRouter || CaptureVisionRouter.createInstance());
      if (this.isDestroyed) return;

      for (let file of files) {
        // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
        const result = await cvRouter.capture(file, 'ReadBarcodes_SpeedFirst');
        if (this.isDestroyed) return;

        // Print file name if there's multiple files
        if (files.length > 1) {
          this.resultsContainer!.nativeElement.innerText += `\n${file.name}:\n`;
        }
        for (let _item of result.items) {
          if (_item.type !== EnumCapturedResultItemType.CRIT_BARCODE) {
            continue; // check if captured result item is a barcode
          }
          let item = _item as BarcodeResultItem;
          this.resultsContainer!.nativeElement.innerText += item.text + '\n'; // output the decoded barcode text
          console.log(item.text);
        }
        // If no items are found, display that no barcode was detected
        if (!result.items.length)
          this.resultsContainer!.nativeElement.innerText +=
            'No barcode found\n';
      }
    } catch (ex: any) {
      let errMsg = ex.message || ex;
      console.error(errMsg);
      alert(errMsg);
    }
  };

  // dispose cvRouter when it's no longer needed
  async ngOnDestroy() {
    this.isDestroyed = true;
    if (this.pCvRouter) {
      try {
        (await this.pCvRouter).dispose();
      } catch (_) {}
    }
  }
}
```

### Add the `video-capture` and `image-capture` component to the `app` component

* On the `app` component, we will edit the component so that it offers buttons to switch components between `video-capture` and `image-capture`.

* In `app.component.html`, add the following code.

```html
<!-- /src/app/app.component.html -->
<div class='App'>
  <div class='title'>
    <h2 class='title-text'>Hello World for Angular</h2>
  </div>
  <div class='buttons-container'>
    <button (click)="switchMode('video')" [ngStyle]="{'background-color': mode === 'video' ? 'rgb(255,174,55)' : 'white'}">Decode Video</button>
    <button (click)="switchMode('image')" [ngStyle]="{'background-color': mode === 'image' ? 'rgb(255,174,55)' : 'white'}">Decode Image</button>
  </div>
  @if (mode === 'video') {
    <app-video-capture></app-video-capture>
  } @else {
    <app-image-capture></app-image-capture>
  }
</div>
```

* In `app.component.ts`, add the following code. For our stylesheet (CSS) specification, please refer to our [source code](#Official-Sample).

```ts
/* /src/app/app.component.ts */
import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

import { ImageCaptureComponent } from './image-capture/image-capture.component';
import { VideoCaptureComponent } from './video-capture/video-capture.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NgStyle, ImageCaptureComponent, VideoCaptureComponent],
})
export class AppComponent {
  title = 'dbrjs-angular-sample';

  mode: string = 'video';

  switchMode(value: string) {
    this.mode = value;
  }
}
```

* Try running the project.

```cmd
ng serve
```

If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Decode Image` button and select the image you want to decode. Once barcodes are found, the results will show in a dialog.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help - Angular

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Support

If you have any questions, feel free to [contact Dynamsoft Support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).