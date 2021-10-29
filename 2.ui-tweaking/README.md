# UI Customization Sample Set

In this sample set, we will focus on the library's flexible UI that allows developers to create the look and feel for their web application that they desire. To learn more about UI customization, please refer to its corresponding [section](https://github.com/Dynamsoft/javascript-barcode#233-customize-the-ui) in the user guide.

Let's begin by breaking down each of the samples in this set

### Display Barcode Results in Real-Time

In this sample, we perform simple tweak of the default UI to include a couple of `span` elements that will display the barcode text and barcode format as they are detected via video. Our basic 'Hello World' samples displayed the results in the console or via an alert box, so this sample will offer a more user-friendly way of showing the results as they are found.

In the `onFrameRead` event function, a pair of `span` elements are created for each found barcode. The `span` elements are then populated with the barcode text and the barcode format. Afterwards, the scanner UI (via `getUIElement`) is appended to the newly created `span` elements to complete this custom UI.

This is a simple tweak to the UI, but offers a much less intrusive way of displaying the barcode results as they are acquired.

### Hide Display Controls
As explained in the user guide, the default UI comes with 3 core components: a video viewer, a source select dropdown, and a resolution select dropdown. The UI also comes with a built-in close button which allows the user to close the video viewer and barcode scanner.

However, you might encounter a situation where you do not require those extra components and would like to simply display the video viewer, and perhaps automatically close it when a barcode is found.

In this sample, we've chosen to hide the source select dropdown (`dce-sel-camera`), the resolution select (`dce-sel-resolution`), and the close button (`dce-btn-close`). This way, only the video viewer will show up when `scanner.show()` is called.

### Set up External Controls

In the last sample, we chose to hide the extra control options that come with the default UI. This time around, we will choose to hide the default control elements that come with the UI (e.g. `dce-sel-camera`) and set up our own controls instead using simple `select` and `button` elements.

First off, the external elements must be included in the HTML body, whether they are created programatically in JS or declared manually in the HTML code. In our sample, these elements are contained within the parent `div`, `externalControls`. The following external controls are set up:
- `cameraList`: This `select` element is populated with all the currently connected and available cameras. This is done in the `updateCameras()` function. This function utilizes the `getAllCameras` API method, which retrieves all the camera info once called. Should the user select a different camera (`onchange`), then the scanner will switch to that camera via the `scanner.play()` method.
- `resolutionList`: Similar to the camera list, this `select` element will be populated with a list of resolution values. However, these values are manually included as options rather than automatically populated via a certain function. Whenever the resolution is changed, the `setResolution` method is used to translate this change to the video viewer.
- `toggleScanRect`: Cycles through various scan regions, where the scan region will be a subset of the total video viewer. This control is not found in the default UI of the scanner, but can be easily configured using the `region` property of the `RuntimeSettings`. In this sample, we assigned a set of 5 scan regions and each time the user clicks the button, the library cycles to the next scan region.
- `toggleScanLight`: Controls whether the scan "light" is toggled on. Please note that this light does not actually improve the performance of the scanning process, but offers a user-friendly visual representation of the scanning process that is ocurring. Whenever the button is clicked, the style of the `dbrScanner-scanlight` element is reversed.
- `toggleSound`: Controls whether the library beeps or not on a found barcode. This is translated to the library API via the `bPlaySoundOnSuccessfulRead` property.

These are just a few of the external controls that you can easily set up using the library API, offering your users more control over the scanner.

### Changing Size of Video Viewer
In the last sample of the set, we explore how to switch the video viewer from occupying a limited screen area to a full screen view.

This customization does not involve any of the library API directly, and and is done simply via the `style` properties, as shown in the click event listener of the `fitPage` button or the `exitFullPage` function.