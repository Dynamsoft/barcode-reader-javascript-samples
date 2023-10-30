# Hello World Sample for Angular

[Angular](https://angular.io/) is one of the most popular and mature JavaScript frameworks. Check out the following on how to implement Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") into an Angular application.

## Official Sample

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/1.hello-world/3.read-video-angular/dist/read-video-angular/">Hello World in Angular - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/1.hello-world/3.read-video-angular">Hello World in Angular - Source Code</a>

## Preparation

Make sure you have [node](https://nodejs.org/) and [Angular CLI](https://cli.angular.io/) installed. `node 14.21.3` and `Angular CLI 15.2.1` are used in the example below.

## Create the sample project

### Create an out-of-the-box raw Angular application 

```cmd
ng new my-app
```

### **CD** to the root directory of the application and install necessary library

```cmd
cd my-app
npm install dynamsoft-javascript-barcode
```

## Start to implement

### Add a file "dbr.ts" under "src/app/" to configure the library

```typescript
import { BarcodeReader } from 'dynamsoft-javascript-barcode';
BarcodeReader.license = 'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9';
BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/";
```

> Note:
>
> * `license` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 
> * `engineResourcePath` tells the library where to get the necessary resources at runtime.

### Generate three components
* `video-decode` component helps read barcode from camera.
```cmd
ng generate component video-decode
```
* `img-decode` component helps read barcode from still images.
```cmd
ng generate component img-decode
```
* `hello-world` component offers buttons to switch components above.
```cmd
ng generate component hello-world
```

### Edit the video-decode component

* There is a default UI in `.\node_modules\dynamsoft-javascript-barcode\dist\dbr.ui.html`, which we will use in this sample. Copy everything in this file and replace the original code in `video-decode.component.html`. If you want to customize the UI, see more in `2.ui-tweaking` or [User Guide](https://www.dynamsoft.com/barcode-reader/docs/core/programming/features/customize-the-ui.html?lang=js).

* In `video-decode.component.ts`, add code for initializing and destroying the `BarcodeScanner` instance.

```typescript
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';
@Component({
  selector: 'app-video-decode',
  templateUrl: './video-decode.component.html',
  styleUrls: ['./video-decode.component.css'],
})
export class VideoDecodeComponent implements OnInit {
  pScanner: Promise<BarcodeScanner> | null = null;

  async ngOnInit(): Promise<void> {
    try {
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      await scanner.setUIElement(
        (document.querySelector('.dce-video-container') as HTMLElement).parentElement as HTMLElement
      );
      scanner.onFrameRead = (results: any) => {
        for (const result of results) {
          console.log(result.barcodeText);
        }
      };
      scanner.onUniqueRead = (txt, result) => {
        alert(txt);
      };
      await scanner.open();
    } catch (ex: any) {
      let errMsg;
      if (ex.message?.includes('network connection error')) {
        errMsg =
          'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
      } else {
        errMsg = ex.message || ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
  }
  async ngOnDestroy() {
    if (this.pScanner) {
      (await this.pScanner).destroyContext();
      console.log('BarcodeScanner Component Unmount');
    }
  }
}
```

> Note:
>
> * The method `createInstance()` is called to initialize the library as soon as the component initializes.
> * To release resources timely, the `BarcodeScanner` instance is destroyed with the component in the callback `ngOnDestroy` .
> * The `setUIElement()` method is used to define the user interface (UI) for the library using the native element in `video-decode.component.html`, which was copied in the previous step.
### Edit the img-decode component

* Replace the original code in `img-decode.component.html` with code below to select a local image via `input` element.

```html
<div class="ImgDecode"><input type="file" (change)="decodeImg($event)"/></div>
```

* Add CSS style in `img-decode.component.css`.

```css
.ImgDecode {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid black
}
```

* In `img-decode.component.ts`, add code for initializing and destroying the `BarcodeReader` instance.

```typescript
import { Component, OnInit } from '@angular/core';
import { BarcodeReader } from 'dynamsoft-javascript-barcode'

@Component({
  selector: 'app-img-decode',
  templateUrl: './img-decode.component.html',
  styleUrls: ['./img-decode.component.css']
})
export class ImgDecodeComponent implements OnInit {
  pReader: Promise<BarcodeReader> | null = null;

  async ngOnInit(): Promise<void> { }

  decodeImg = async (e: any) => {
    try {
      const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
      const results = await reader.decode(e.target.files[0]);
      for (const result of results) {
        alert(result.barcodeText);
      }
      if (!results.length) { alert('No barcode found'); }
    } catch (ex: any) {
      let errMsg;
      if (ex.message?.includes("network connection error")) {
        errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message||ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
    e.target.value = '';
  }

  async ngOnDestroy() {
    if (this.pReader) {
      (await this.pReader).destroyContext();
      console.log('ImgDecode Component Unmount');
    }
  }
}
```

> Note:
>
> * The method `createInstance()` is called to initialize the library as soon as the component initializes.
> * To release resources timely, the `BarcodeReader` instance is destroyed with the component in the callback `ngOnDestroy` .

### Edit the hello-world component

* Use the components in `hello-world.component.html`.

```html
<div class="helloWorld">
    <h1>Hello World for Angular<img style="height: 25px;" alt="logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
        />
    </h1>
    <div>
        <button [ngStyle]="{'margin-right': '10px', 'background-color': bShowScanner ? 'rgb(255,174,55)' : 'white'}" (click)="showScanner()">Video Decode</button>
        <button [ngStyle]="{'background-color': !bShowScanner ? 'rgb(255,174,55)' : 'white'}" (click)="showImgDecode()">Image Decode</button>
    </div>
    <div class="container">
        <app-video-decode *ngIf="bShowScanner"></app-video-decode>
        <app-img-decode *ngIf="bShowImgDecode"></app-img-decode>
    </div>
</div>
```

* Define the style of the element in `hello-world.component.css`.

```css
.helloWorld {
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
import { Component, OnInit } from '@angular/core';
import '../dbr'; // import side effects. The license, engineResourcePath, so on.
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
  bShowScanner = true;
  bShowImgDecode = false;
  async ngOnInit(): Promise<void> {
    // Load the library on page load to speed things up.
    try {
      await BarcodeScanner.loadWasm();
    } catch (ex: any) {
      let errMsg;
      if (ex.message?.includes("network connection error")) {
        errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message||ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
  }
  showScanner(): void {
    this.bShowScanner = true;
    this.bShowImgDecode = false;
  }
  showImgDecode(): void {
    this.bShowScanner = false;
    this.bShowImgDecode = true;
  }
}
```

> NOTE :
>
> * The method `loadWasm()` initializes the library in the background.

### Add the hello-world component to `app.component.html`

Edit the file `app.component.html` to contain nothing but the following

```html
<app-hello-world></app-hello-world>
```

* Try running the project.

```cmd
ng serve
```

If you have followed all the steps correctly, you should now have a functioning page that allows you to scan barcodes from a webcam or a built-in camera. Additionally, if you want to decode a local image, you can click the `Image Decode` button and select the image you want to decode. Any barcodes that are detected will be displayed in a dialog.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
