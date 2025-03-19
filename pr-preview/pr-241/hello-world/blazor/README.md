# Hello World Sample for Blazor

[Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) is a framework for building interactive client-side web apps with .NET and C#. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a Blazor application using [JavaScript Interlop](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions).

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 10.4.3100`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/10.4.3100). We also used .NET 8.0 (version 8.0.8) to develop this sample. To ensure the sample app runs properly, please refer to this guide to update your .NET installation - https://learn.microsoft.com/en-us/dotnet/core/install/upgrade.

> Note:
>
> If you’re looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/hello-world/blazor">Hello World in Blazor - Source Code</a>

## Preparation

This sample was developed using Visual Studio 2022. For a more in-depth guide on creating a Blazor web application with Visual Studio 2022, please follow Microsoft's tutorial on [Building your first web app with ASP.NET Core using Blazor](https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/intro).

## Quick Start 

1. **Open the application** in Visual Studio 2022 by clicking the `Open a Project or Solution` button, and choosing on the `BlazorApp.csproj` file.

2. **Run the application** by clicking the `Start Debugging` button (a green arrow) in the Debug Toolbar.

3.  A window should open to view the sample application

> Note: 
>
> This sample uses the packages `Microsoft.AspNetCore.Components.WebAssembly` v8.0.8 and `Microsoft.AspNetCore.Components.WebAssembly.DevServer` v8.0.8 which require .NET v8.0.8.
> Refer to the `BlazorApp.csproj` file to change the versions as needed.

## Creating the sample project

In this section, we will be creating a Blazor application utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Initialize project

Please follow the guide created by Microsoft on [Building your first web app with ASP.NET Code using Blazor](https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/intro).

This tutorial will guide you through downloading Visual Studio, and set up needed to create a Blazor Web Application.

**IMPORTANT**: When creating a new project, please select **"Blazor WebAssembly Standalone App"** instead of "Blazor Web App".

## Start to implement

### Create a `DecodeVideo.razor` component under the `Pages\` folder

In `Pages\DecodeVideo.razor`, we will modify the component to enable barcode decoding via camera. This page will be accessible at the `/video` URL.

```razor
@page "/video"
@inject IJSRuntime JS

<PageTitle>Dynamsoft Barcode Reader Hello World - Blazor</PageTitle>

<h1>Decode Video</h1>
<button @onclick="ToggleVideoTask" style="margin-bottom: 1rem">@videoDecodeBtn</button>
<div id="camera-view-container" style="width: 100%; height: 50vh; display: none"></div>
<h3>Results:</h3>
<div id="results" style="width: 100%; height: 30vh; overflow: auto; white-space: pre-wrap; border: 1px solid black;"></div>


@code {
    // reference: https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions
    private string mode = "stop";
    private string videoDecodeBtn = "Decode Video";

    private async Task ToggleVideoTask()
    {
        await JS.InvokeVoidAsync("loadDecodeVideoModule");

        if (mode == "videoDecode")
        {
            await StopDecodeVideoTask();
        }
        else if (mode == "stop")
        {
            await DecodeVideoTask();

        }
    }

    private async Task DecodeVideoTask()
    {
        mode = "videoDecode";
        videoDecodeBtn = "Stop Decode";
        await JS.InvokeAsync<string>("startVideoDecode");
    }

    private async Task StopDecodeVideoTask()
    {
        mode = "stop";
        videoDecodeBtn = "Decode Video";
        await JS.InvokeAsync<string>("stopVideoDecode");
    }
}
```

> Note:
>
> We can significantly improve the initial load speed and performance when we dynamically import Dynamsoft's Barcode Scanning component on-demand. In the sample code above, we dynamically imported the decode video module through the line `await JS.InvokeVoidAsync("loadDecodeVideoModule");`.

### Create a `wwwroot\decodeVideo.js` file

In `wwwroot\decodeVideo.js`, we will instantiate `cvRouter` and `cameraEnhancer` to start decoding barcodes through the camera. 

Additionally, we'll include a function to clean up `cvRouter` and `cameraEnhancer` when they are no longer needed.

These functions will be called by the Blazor components through JavaScript Interop.

Reference: https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions

```javascript
// Create JS function "startVideoDecode"
window.startVideoDecode = async () => {
    const cameraViewContainer = document.getElementById("camera-view-container");
    const resultsContainer = document.getElementById("results");

    try {
        // Create a `CameraEnhancer` instance for camera control and a `CameraView` instance for UI control.
        const cameraView = await Dynamsoft.DCE.CameraView.createInstance();
        cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance(cameraView);
        // Get default UI and append it to DOM.
        cameraViewContainer.style.display = "block"
        cameraViewContainer.append(cameraView.getUIElement());

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        cvRouter.addResultReceiver({
            onDecodedBarcodesReceived: (result) => {
                if (!result.barcodeResultItems.length) return;

                resultsContainer.textContent = "";
                for (let item of result.barcodeResultItems) {
                    resultsContainer.textContent += `${item.formatString}: ${item.text}\n\n`;
                }
            },
        });

        // Filter out unchecked and duplicate results.
        const filter = new Dynamsoft.Utility.MultiFrameResultCrossFilter();
        // Filter out unchecked barcodes.
        filter.enableResultCrossVerification("barcode", true);
        // Filter out duplicate barcodes within 3 seconds.
        filter.enableResultDeduplication("barcode", true);
        await cvRouter.addResultFilter(filter);

        // Open camera and start scanning single barcode.
        await cameraEnhancer.open();
        
        cameraView.setScanLaserVisible(true);
        await cvRouter.startCapturing("ReadSingleBarcode");
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(errMsg);
    }
}

// Create JS function "stopVideoDecode"
window.stopVideoDecode = async () => {
    const cameraViewContainer = document.getElementById("camera-view-container");
    const resultsContainer = document.getElementById("results");

    try {
        if (!cvRouter?.disposed) {
            await cvRouter?.dispose();
        }
        if (!cameraEnhancer?.disposed) {
            await cameraEnhancer?.dispose();
        }

        // Reset components
        cameraViewContainer.style.display = "none";
        cameraViewContainer.innerHTML = "";
        resultsContainer.textContent = "";
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(errMsg);
    }
}
```

### Create a `Pages\DecodeImage.razor` component

In `Pages\DecodeImage.razor`, we will modify the component to enable barcode decoding through an image. This page will be accessible at the `/image` URL.

```razor
@page "/image"
@inject IJSRuntime JS

<PageTitle>Dynamsoft Barcode Reader Hello World - Blazor</PageTitle>

<h1>Decode Image</h1>
<InputFile id="inputElement" style="margin-bottom: 1rem" OnChange="DecodeImageTask" accept="image/*" multiple />
<h3 style="margin-bottom: 1rem">Results:</h3>
<div id="results" style="width: 100%; height: 30vh; overflow: auto; white-space: pre-wrap; border: 1px solid black;"></div>

@code {
    // reference: https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions

private async Task DecodeImageTask()
    {
        // Dynamically load decode image module
        await JS.InvokeVoidAsync("loadDecodeImageModule");
        await JS.InvokeAsync<string>("startImageDecode");
    }

    public void Dispose()
    {
        JS.InvokeAsync<string>("cleanUpImageDecode");
    }
}
```

> Note:
>
> We can significantly improve the initial load speed and performance when we dynamically import Dynamsoft's Barcode Scanning component on-demand. In the sample code above, we dynamically imported the decode image module through the line `await JS.InvokeVoidAsync("loadDecodeImageModule");`.

### Create a `wwwroot\decodeImage.js` file

In `wwwroot\decodeImage.js`, we will instantiate `cvRouter` to decode barcodes in images. 

These functions will be called by the Blazor components through JavaScript Interop.

Reference: https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions

```javascript
// Create JS function "startImageDecode"
window.startImageDecode = async () => {
  const inputElement = document.getElementById("inputElement");
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerText = ""; // Reset results container

  const { files } = inputElement;

  try {
    for (let file of files) {
      cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
      // Decode selected image with 'ReadBarcodes_SpeedFirst' template.
      const result = await cvRouter.capture(file, "ReadBarcodes_SpeedFirst");
      if (files.length > 1) {
        resultsContainer.innerText += `\nFile: ${file.name}\n`;
      }
      for (let item of result.items) {
        if (item.type !== Dynamsoft.Core.EnumCapturedResultItemType.CRIT_BARCODE) {
          continue;
        }
        resultsContainer.innerText += item.text + "\n";
        console.log(item.text);
      }
      if (!result.items.length) resultsContainer.innerText += "No barcode found\n";
    }
  } catch (ex) {
    let errMsg = ex.message || ex;
    console.error(errMsg);
    alert(errMsg);
  } finally {
    inputElement.value = "";
    await cvRouter?.dispose();
  }
};
```

### Modify the `wwwroot\index.html` file

Inside the `wwwroot\index.html` file, we will initialize the license and necessary modules for Dynamsoft Barcode Reader and create functions to dynamically load the video and image modules.

```html
<!DOCTYPE html>
<html lang="en">
...
<body>
    <div id="app">
      ...
    <script src="_framework/blazor.webassembly.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.4.3100/dist/dbr.bundle.min.js"></script>
    <script>
      /** LICENSE ALERT - README
       * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
       */
      Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

      /**
       * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
       * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
       * For more information, see https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html?ver=10.4.3100&cVer=true#specify-the-license&utm_source=samples or contact support@dynamsoft.com.
       * LICENSE ALERT - THE END
       */

      // Optional. Used to load wasm resources in advance, reducing latency between video playing and barcode decoding.
      Dynamsoft.Core.CoreModule.loadWasm(["DBR"]);

      // Defined globally for easy debugging.
      let cameraEnhancer, cvRouter;
      let videoModuleLoaded = false;
      let imageModuleLoaded = false;

      // Lazy load Decode video module until needed
      async function loadDecodeVideoModule() {
        if (!videoModuleLoaded) {
          await import("./decodeVideo.js");
          videoModuleLoaded = true;
        }
      }

      // Lazy load decode image module until needed
      async function loadDecodeImageModule() {
        if (!imageModuleLoaded) {
          await import("./decodeImage.js");
          imageModuleLoaded = true;
        }
      }
    </script>
  </body>
</html>
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 


### Modify the `Layout\NavMenu.razor` and `Layout\NavMenu.razor.css` file

To make sure the `Decode Video` and `Decode Image` pages are accessible from the sidebar, add the following code block to `Layout\NavMenu.razor`.

```html
...
        <div class="nav-item px-3">
            <NavLink class="nav-link" href="video" Match="NavLinkMatch.All">
                <span class="bi bi-video-fill-nav-menu" aria-hidden="true"></span> Decode Video
            </NavLink>
        </div>
        <div class="nav-item px-3">
            <NavLink class="nav-link" href="image" Match="NavLinkMatch.All">
                <span class="bi bi-image-fill-nav-menu" aria-hidden="true"></span> Decode Image
            </NavLink>
        </div>
...
```

We'll also add the following CSS code to include the icons for `Decode Video` and `Decode Image` in the `Layout\NavMenu.razor.css` file.

```css
.bi-video-fill-nav-menu {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-camera-video-fill' viewBox='0 0 16 16'%3E%3Cpath d='M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z'/%3E%3C/svg%3E");
}

.bi-image-fill-nav-menu {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-camera-fill' viewBox='0 0 16 16'%3E%3Cpath d='M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z'/%3E%3C/svg%3E");
}
```

## Run the application

We can run the application by clicking the `Start Debugging` button (a green arrow) in the Debug Toolbar.

If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Decode Image` button and select the image you want to decode. 

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
