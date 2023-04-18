# JavaScript Parameter Settings Samples

Dynamsoft Barcode Reader JavaScript SDK (hereafter called "the library") is built based on Dynamsoft's algorithm. The algorithm is very flexible and has many configurable parameters. In this article, we'll take a look at how the library makes use of these parameters.

Please note that most of the styling is common across the samples in this sample set. To improve the readability, we grouped the styling all in one file, settings-css.css. Additionally, the samples also share the same scanner initialization code. For the sake of clarity, the initialization code was also grouped in the same JS file, initScanner.js, and referenced throughout the different samples in this set.

## Specify the Barcode Types and Number of Barcodes Per Image

In many scenarios, an application only needs to decode one or a few types of barcodes that are predetermined. In fact, the algorithm can operate more efficiently when it is aware of the number of barcodes expected on an image. The following code snippet demonstrates how to decode two QR codes from an image.

```javascript
const settings = await scanner.getRuntimeSettings();
settings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE;
settings.expectedBarcodesCount = 2;
await scanner.updateRuntimeSettings(settings);
```

The following official sample showcases the same features.

* <a target = "_blank" href="https://demo.dynamsoft.com/samples/dbr/js/3.settings/1.barcodeFormats-expectedBarcodes.html">Specify Barcode Types and Count - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/3.settings/1.barcodeFormats-expectedBarcodes.html">Specify Barcode Types and Count - Source Code</a>

## Set Localization and Binarization Modes

Localization and binarization are two essential steps in the barcode reading process. 

* Localization Modes

Localization modes specify how the algorithm localize a barcode. At present, 8 modes are available: "Connected Blocks", "Statistics", "Lines", "Scan Directly", "Statistics Marks", "Statistics Postal Code", "Center" and "OneD Fast Scan". More information can be found [here](https://www.dynamsoft.com/barcode-reader/parameters/reference/localization-modes.html?ver=latest). A barcode reading session will attempt all of the set modes. The session will end once either the predefined number of barcodes are found or all of the set modes have been completed. The following code shows how to set multiple modes.

```javascript
const settings = await scanner.getRuntimeSettings();
settings.localizationModes = [2, 16, 4, 8, 32, 64, 0, 0];
await scanner.updateRuntimeSettings(settings);
```

Note that each mode is represented by a number.

Read more on [How to use different localization modes](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-localization-modes.html).

* Binarization Modes

Binarization modes specify how the algorithm binarizes a colored or gray image. Right now, there are only two modes available: "Local Block" and "Threshold". More information can be found [here](https://www.dynamsoft.com/barcode-reader/parameters/reference/binarization-modes.html?ver=latest).

For each mode, there are a few arguments to fine-tune it for best performance. Read more on [How to configure the binarization parameters](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-binarization-modes.html?ver=latest).

The following official sample demonstrates how to set Localization and Binarization modes.

* <a target = "_blank" href="https://demo.dynamsoft.com/samples/dbr/js/3.settings/2.localizationModes-binarizationModes.html">Localization and Binarization - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/3.settings/2.localizationModes-binarizationModes.html">Localization and Binarization - Source Code</a>

## Set Deblur Modes and Scale-up Modes

* Deblur Modes

The barcode reader often needs to handle blurry images, setting the deblur modes will help the algorithm better process them. In the library, there are 7 available modes: "Direct Binarization", "Threshold_Binarization", "Gray_Equalization", "Smoothing", "Morphing", "Deep_Analysis" and "Sharpening". More information can be found [here](https://www.dynamsoft.com/barcode-reader/parameters/reference/deblur-modes.html?ver=latest). A barcode reading session will attempt all of the set modes. The session will end once either the predefined number of barcodes are found or all of the set modes have been completed. The following code shows how to set multiple deblur modes.

```javascript
const settings = await scanner.getRuntimeSettings();
settings.deblurModes = [1, 2, 4, 8, 0, 0, 0, 0, 0, 0];
await scanner.updateRuntimeSettings(settings);
```

* Scale-up Modes

In many cases, the barcodes appear very small on the image and makes it difficult to read. The scale-up modes can be used to enlarge such barcodes before reading them. In the library, there are 2 available modes: "Linear_Interpolation" and "Nearest_Neighbour_Interpolation". More information can be found [here](https://www.dynamsoft.com/barcode-reader/parameters/reference/scale-up-modes.html?ver=latest).

For each mode, there are a few arguments to fine-tune it for best performance. Read more on [How to read barcodes with small module sizes](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-scaleup-modes.html?ver=latest).

The following official sample demonstrates how to set Deblur modes and Scale-up modes.

* <a target = "_blank" href="https://demo.dynamsoft.com/samples/dbr/js/3.settings/3.blurred-small-barcodes.html">Deblur Modes and Scale-Up Modes - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/3.settings/2.localizationModes-binarizationModes.html">Deblur Modes and Scale-Up Modes - Source Code</a>

## Deformation-Resisting Modes and Barcode-Complement Modes

* Deformation-Resisting Modes

As the name suggests, deformation-resisting modes deal with deformed barcocdes. Read more on [How to deal with deformed barcodes](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/resist-deformation.html?ver=latest).

For now, there is only one available mode: "General".

The following code enables deformation resisting.

```javascript
const settings = await scanner.getRuntimeSettings();
settings.furtherModes.deformationResistingModes = [2, 0, 0, 0, 0, 0, 0, 0];
await scanner.updateRuntimeSettings(settings);
```

* Barcode-Complement Modes

QR codes and Data Matrix codes can be picked up even if they are incomplete. Read more on [How to decode incomplete barcodes](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-barcode-complememt-modes.html?ver=latest).

The parameter for this case is called [ `BarcodeComplementMode` ](https://www.dynamsoft.com/barcode-reader/parameters/reference/barcode-complement-modes.html?ver=latest) which has only one available mode at present: "General".

The following code enables incomplete barcode reading.

```javascript
const settings = await scanner.getRuntimeSettings();
settings.furtherModes.deformationResistingModes = [2, 0, 0, 0, 0, 0, 0, 0];
await scanner.updateRuntimeSettings(settings);
```

The following official sample showcases deformation resisting and barcode complementing.

* <a target = "_blank" href="https://demo.dynamsoft.com/samples/dbr/js/3.settings/4.deformed-incomplete-barcodes.html">Deformation-Resisting Modes and Barcode-Complement Modes - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/3.settings/4.deformed-incomplete-barcodes.html">Deformation-Resisting Modes and Barcode-Complement Modes - Source Code</a>

## Define or Detect the Region of Interest

When reading barcodes from a video input, the barcode normally takes up only a small portion of the video frame. If the barcode always appear around the same spot, we can configure the ROI (Region of Interest) to speed up the barcode reading process. There are two ways to do this.

* Manually define the ROI

If the ROI is predetermined in the use case, we can manually set the limit. For example, the following only reads 25% of the central area.

```javascript
const settings = await scanner.getRuntimeSettings();
settings.region.regionMeasuredByPercentage = 1;
settings.region.regionLeft = 25;
settings.region.regionTop = 25;
settings.region.regionRight = 75;
settings.region.regionBottom = 75;
await scanner.updateRuntimeSettings(settings);
```

* Automatically detect the ROI

To let the algorithm detect the ROI automatically, we can set the parameter [ `RegionPredetectionModes` ](https://www.dynamsoft.com/barcode-reader/parameters/reference/region-predetection-modes.html?ver=latest) which has four available modes: "General", "General_RGB_Contrast", "General_Gray_Contrast" and "General_HSV_Contrast". 

For each mode, there are a few arguments to fine-tune it for best performance. Read more on [How To Use Region Predetection](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-use-region-predetection.html?ver=latest).

The following official sample showcases both ways to specify ROI.

* <a target = "_blank" href="https://demo.dynamsoft.com/samples/dbr/js/3.settings/5.regionOfInterest-regionPredetection.html">Define or Detect the Region of Interest - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/3.settings/5.regionOfInterest-regionPredetection.html">Define or Detect the Region of Interest - Source Code</a>

## Dealing with Dense Barcodes

Some barcodes are designed to hold a lot of information which makes them very dense. To read such barcodes, we need to do two things

1. Use a high resolution 
2. Use the built-in "dense" template

```javascript
await scanner.setResolution(3840, 2160);
await scanner.updateRuntimeSettings("dense");
```

The following official sample showcases the performance of picking up dense barcodes with specific settings.

* <a target = "_blank" href="https://demo.dynamsoft.com/samples/dbr/js/3.settings/6.dense-barcodes.html">Dealing with Dense Barcodes - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/3.settings/6.dense-barcodes.html">Dealing with Dense Barcodes - Source Code</a>

## Support

If you have any questions, feel free to contact Dynamsoft support via [email](mailto:support@dynamsoft.com) or [live chat](https://www.dynamsoft.com/barcode-reader/sdk-javascript/) via the "Let's Chat" button.
