# UI Customization Sample Set

In this sample set, we will focus on the library's flexible UI that allows developers to create the look and feel for their web application that they desire. To learn more about UI customization, please refer to its corresponding [section](https://github.com/Dynamsoft/javascript-barcode#233-customize-the-ui) in the user guide.

Let's begin by breaking down each of the samples in this set

### Read Barcodes via Video and Display Results

In this sample, we perform simple tweak of the default UI to include a couple of `span` elements that will display the barcode text and barcode format as they are detected via video. Our basic 'Hello World' samples displayed the results in the console or via an alert box, so this sample will offer a more user-friendly way of showing the results as they are found.

In the `onFrameRead` event function, a pair of `span` elements are created for each found barcode. The `span` elements are then populated with the barcode text and the barcode format. Afterwards, the scanner UI (via `getUIElement`) is appended to the newly created `span` elements to complete this custom UI.