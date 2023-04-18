# JavaScript UI Customization Samples

Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") provides a built-in GUI to help developers build an interactive barcode reading interface.

## Default GUI

The following official sample demonstrates the default GUI built into the library.

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/2.ui-tweaking/1.read-video-show-result.html">Use the Default Camera UI - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/2.ui-tweaking/1.read-video-show-result.html">Use the Default Camera UI - Source Code</a>

**GUI Elements**

If you check the GUI on the demo page, you will find that it consists of the following elements

* The video element that streams the video from a camera
* A laser beam moving vertically which indicates the working status of the library
* A dropdown box for selecting a camera
* A dropdown box for specifying the resolution for the selected camera
* A close button that closes the GUI when clicked

There are a few other elements

* Before the video starts streaming, there is a spinner that indicates the loading process
* When a barcode is found, the barcode is highlighted with an overlay
* If no camera is found on the device or camera access is denied on the page, the GUI will show a camera icon, which, when clicked, allows the user to select a local image or invoke the system camera interface

## Hide Built-in Controllers

The default UI of the BarcodeReader class includes several elements that may not match the style of your application. The following code snippet demonstrates how to remove the camera selector, resolution selector, and close button, as well as change the background color:

```html
<div id="UIElement">
    <span id='lib-load' style='font-size:x-large' hidden>Loading Library...</span>
    <div id="div-ui-container" style="width:100%;height:100%;">
        <div class="dce-video-container" style="position:relative;width:100%;height:100%;"></div>
    </div>
</div>
```

```javascript
await scanner.setUIElement(document.getElementById('div-ui-container'));
```

Official sample:

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/2.ui-tweaking/2.read-video-no-extra-control.html">Hide Built-in Controllers - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/2.ui-tweaking/2.read-video-no-extra-control.html">Hide Built-in Controllers - Source Code</a>

## Use External Controllers

Based on the previous sample, you can build your own UI elements to control the barcode scanning process.

For example, the following code adds a camera selector

```html
<select id="cameraList"></select>
```

```javascript
async function updateCameras() {
    let cameras = await scanner.getAllCameras();
    let cameraList = document.getElementById('cameraList');
    cameraList.options.length = 0;
    for (let camera of cameras) {
        let opt = new Option(camera.label, camera.deviceId);
        cameraList.options.add(opt);
    }
}
document.getElementById('cameraList').onchange = async function() {
    try {
        await scanner.setCurrentCamera(document.getElementById('cameraList').value);
    } catch (ex) {
        alert('Play video failed: ' + (ex.message || ex));
    }
};
```

For more related customization, check out the following official sample:

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/2.ui-tweaking/3.read-video-with-external-control.html">Use External Controllers - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/2.ui-tweaking/3.read-video-with-external-control.html">Use External Controllers - Source Code</a>

## Enlarge the Video Stream

The library is usually used on mobile devices which have small screens. When scanning barcodes with the mobile camera, the video stream will be limited in the video element and may not be clear enough. Ideally, we should use the whole screen to play the video and find barcodes.

The GUI is pure HTML. Thus modifying the size of the element is easy. The following code expands the element to fill the entire viewport:

```javascript
document.getElementById('UIElement').style.height = '100vh';
document.getElementById('UIElement').style.width = '100vw';
document.getElementById('UIElement').style.position = 'absolute';
```

Check out the following example code to see how you can expand the video stream to read a barcode and then restore it to its normal size:

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/2.ui-tweaking/4.difference-video-size.html">Enlarge the Video Stream - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/2.ui-tweaking/4.difference-video-size.html">Enlarge the Video Stream - Source Code</a>

## Customize the Default Ui

Check out the following example code that demonstrates how to create a custom viewer that is vastly different from the default one. You can feel the possibilities of customization:

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/2.ui-tweaking/5.read-video-with-custom-default-ui.html">Customize the Default Ui - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/2.ui-tweaking/5.read-video-with-custom-default-ui.html">Customize the Default Ui - Source Code</a>

To learn more about UI customization, please refer to its corresponding [section](https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/?ver=latest#customize-the-ui-optional) in the user guide.

## Support

If you have any questions, feel free to contact Dynamsoft support via [email](mailto:support@dynamsoft.com) or [live chat](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) via the "Let's Chat" button.
