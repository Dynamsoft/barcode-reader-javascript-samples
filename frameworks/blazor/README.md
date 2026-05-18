# Hello World Sample for Blazor

[Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) is a framework for building interactive client-side web apps with .NET and C#. Follow this guide to learn how to implement [Dynamsoft Barcode Reader JavaScript SDK](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) (hereafter called "the library") into a Blazor application using [JavaScript Interlop](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions).

In this guide, we will be using [`dynamsoft-barcode-reader-bundle 11.4.2001`](https://www.npmjs.com/package/dynamsoft-barcode-reader-bundle/v/11.4.2001). We also used .NET 10.0 (version 10.0.6) to develop this sample. To ensure the sample app runs properly, please refer to this guide to update your .NET installation - https://learn.microsoft.com/en-us/dotnet/core/install/upgrade.

> Note:
>
> If you're looking for a dotnet-maui-blazor-hybrid sample, please refer to the [maui-blazor-hybrid](https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/frameworks/maui-blazor-hybrid) folder.
>
> If you're looking to integrate DBR-JS into a framework that we don't yet have a sample, don't worry! We have a [comprehensive guide](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/use-in-framework.html) that provides detailed instruction and best practices for a seamless  integration into any frameworks!
>
> Additionally, we're here to help! Please don't hesitate to [contact us](#Support) for any support or questions you might have.

## Official Sample

* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/tree/main/frameworks/blazor">Hello World in Blazor - Source Code</a>

## Preparation

This sample was developed using Visual Studio 2026. For a more in-depth guide on creating a Blazor web application with Visual Studio 2026, please follow Microsoft's tutorial on [Building your first web app with ASP.NET Core using Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/tutorials/movie-database-app/part-1?view=aspnetcore-10.0&pivots=vs).

## Quick Start 

1. **Open the application** in Visual Studio 2026 by clicking the `Open a Project or Solution` button, and choosing on the `blazor.slnx` file.

2. **Run the application** by clicking the `Start Debugging` button (a green arrow) in the Debug Toolbar.

3.  A window should open to view the sample application

> Note: 
>
> This sample uses the packages `Microsoft.AspNetCore.Components.WebAssembly.Server` v10.0.6 and `Microsoft.AspNetCore.Components.WebAssembly` v10.0.6 which require .NET v10.0.6.
> Refer to the `blazor/blazor.csproj` and `blazor.Client/blazor.Client.csproj` to change the versions as needed.

## Creating the sample project

In this section, we will be creating a Blazor application utilizing the Dynamsoft Barcode Reader bundle sdk.

We'll be exploring how you could create a page that not only enables barcode scanning via a webcam or a built-in camera, but also decode barcodes from local images.

By the end of this guide, you'll have a good understanding of the SDK and be ready to discover more ways to use it!

### Initialize project

Please follow the guide created by Microsoft on [Building your first web app with ASP.NET Code using Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/tutorials/movie-database-app/part-1?view=aspnetcore-10.0&pivots=vs).

This tutorial will guide you through downloading Visual Studio, and set up needed to create a Blazor Web Application.

In the Additional information dialog, here is this sample's configuration:

* Framework: .NET 10.0 (Long Term Support)
* Authentication type: None
* Configure for HTTPS: Selected
* Interactive render mode: WebAssembly
* Interactivity location: Per page/component
* Include sample pages: Not selected
* Do not use top-level statements: Not selected
* Use the .dev.localhost TLD in the application URL: Not selected


## Start to implement

### Modify the `blazor/Components/App.razor` file

Inside the `App.razor` file, we will initialize the license and necessary modules for Dynamsoft Barcode Reader and create functions to dynamically load the video and image modules.

Add two script tags to the `App.razor` file:
```html
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.4.2001/dist/dbr.bundle.js"></script>

<script>
    Dynamsoft.License.LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

    // Optional. Used to load wasm resources in advance, reducing latency between video playing and barcode decoding.
    Dynamsoft.Core.CoreModule.loadWasm();
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
```

> Note:
>
> * `initLicense()` specify a license key to use the library. You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=sample&product=dbr&package=js to get your own trial license good for 30 days. 

### Create a `DecodeVideo.razor` component under the `blazor.Client/Pages/` folder

In `blazor.Client/Pages/DecodeVideo.razor`, we will modify the component to enable barcode decoding via camera. This page will be accessible at the `/video` URL.

```razor
@page "/video"
@rendermode InteractiveWebAssembly
@implements IAsyncDisposable
@inject IJSRuntime JS

<PageTitle>Dynamsoft Barcode Reader Hello World - Blazor</PageTitle>

<a href="/">&lt;Home</a>
<h1>Decode Video</h1>
<button @onclick="ToggleVideoTask" style="margin-bottom: 1rem">@videoDecodeBtn</button>
<div id="camera-view-container" style="width: 100%; height: 50vh; display: none"></div>
<h3>Results:</h3>
<div id="results" style="width: 100%; height: 30vh; overflow: auto; white-space: pre-wrap; border: 1px solid black;">
</div>


@code {
    // reference: https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions

    private string mode = "stop";
    private string videoDecodeBtn = "Decode Video";

    private async Task ToggleVideoTask()
    {
        // Proceed with camera access
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

    public async ValueTask DisposeAsync()
    {
        if (!RendererInfo.IsInteractive) { return; }
        if ("videoDecode" == mode)
        {
            await StopDecodeVideoTask();
        }
    }
}
```

> Note:
>
> We can significantly improve the initial load speed and performance when we dynamically import Dynamsoft's Barcode Scanning component on-demand. In the sample code above, we dynamically imported the decode video module through the line `await JS.InvokeVoidAsync("loadDecodeVideoModule");`.

### Create a `blazor/wwwroot/decodeVideo.js` file

In `decodeVideo.js`, we will instantiate `cvRouter` and `cameraEnhancer` to start decoding barcodes through the camera. 

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
        cameraViewContainer.style.display = ""
        cameraViewContainer.append(cameraView.getUIElement());

        // Hide the "Powered by Message" overlay on the scanner view
        // cameraView.setPowerByMessageVisible(false);

        // Create a `CaptureVisionRouter` instance and set `CameraEnhancer` instance as its image source.
        cvRouter = await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
        cvRouter.setInput(cameraEnhancer);

        // Define a callback for results.
        await cvRouter.addResultReceiver({
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

        // Open camera and start scanning barcode.
        await cameraEnhancer.open();

        cameraView.setScanLaserVisible(true);
        await cvRouter.startCapturing("ReadBarcodes_SpeedFirst");
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(ex);
    }
}

// Create JS function "stopVideoDecode"
window.stopVideoDecode = async () => {
    const cameraViewContainer = document.getElementById("camera-view-container");
    const resultsContainer = document.getElementById("results");

    try {
        if (cvRouter && !cvRouter.disposed) {
            await cvRouter?.dispose();
            cvRouter = null;
        }
        if (cameraEnhancer && !cameraEnhancer.disposed) {
            await cameraEnhancer?.dispose();
            cameraEnhancer = null;
        }

        // Reset components
        if (cameraViewContainer) {
            cameraViewContainer.style.display = "none";
            cameraViewContainer.innerHTML = "";
        }
        if (resultsContainer) {
            resultsContainer.textContent = "";
        }
    } catch (ex) {
        let errMsg = ex.message || ex;
        console.error(ex);
    }
}
```

### Create a `blazor.Client/Pages/DecodeImage.razor` component

In `DecodeImage.razor`, we will modify the component to enable barcode decoding through an image. This page will be accessible at the `/image` URL.

```razor
@page "/image"
@rendermode InteractiveWebAssembly
@implements IAsyncDisposable
@inject IJSRuntime JS

<PageTitle>Dynamsoft Barcode Reader Hello World - Blazor</PageTitle>

<a href="/">&lt;Home</a>
<h1>Decode Image</h1>
<InputFile id="inputElement" style="margin-bottom: 1rem" OnChange="DecodeImageTask" accept="image/*" multiple />
<h3 style="margin-bottom: 1rem">Results:</h3>
<div id="results" style="width: 100%; height: 30vh; overflow: auto; white-space: pre-wrap; border: 1px solid black;">
</div>

@code {
    // reference: https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet?view=aspnetcore-8.0#invoke-js-functions

    private async Task DecodeImageTask()
    {
        // Dynamically load decode image module
        await JS.InvokeVoidAsync("loadDecodeImageModule");
        await JS.InvokeAsync<string>("startImageDecode");
    }

    public async ValueTask DisposeAsync()
    {
        if (!RendererInfo.IsInteractive) { return; }
        await JS.InvokeAsync<string>("cleanUpImageDecode");
    }
}
```

> Note:
>
> We can significantly improve the initial load speed and performance when we dynamically import Dynamsoft's Barcode Scanning component on-demand. In the sample code above, we dynamically imported the decode image module through the line `await JS.InvokeVoidAsync("loadDecodeImageModule");`.

### Create a `blazor/wwwroot/decodeImage.js` file

In `decodeImage.js`, we will instantiate `cvRouter` to decode barcodes in images. 

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
        cvRouter ??= await Dynamsoft.CVR.CaptureVisionRouter.createInstance();
        for (let file of files) {
            // Decode selected image with 'ReadBarcodes_ReadRateFirst' template.
            const result = await cvRouter.capture(file, "ReadBarcodes_ReadRateFirst");
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
        console.error(ex);
        alert(errMsg);
    } finally {
        inputElement.value = "";
    }
};
// Create JS function "cleanUpImageDecode"
window.cleanUpImageDecode = async () => {
    await cvRouter?.dispose();
    cvRouter = null;
};
```

## Run the application

We can run the application by clicking the `Start Debugging` button (a green arrow) in the Debug Toolbar.

If you followed all the steps correctly, you will have a working page that turns one of the cameras hooked to or built in your computer or mobile device into a barcode scanner. Also, if you want to decode a local image, just click the `Decode Image` button and select the image you want to decode. 

## Support

If you have any questions, feel free to [contact Dynamsoft support](https://www.dynamsoft.com/company/contact?utm_source=sampleReadme).
