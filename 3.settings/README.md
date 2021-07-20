# Using the Runtime Settings

In this sample set, we will mainly focus on how to utilize the various runtime settings of DBR to offer a better overall performance and experience for your users.

DBR comes with a variety of runtime settings that you can find organizaed and classified by their functionality on this page: [Dynamsoft Barcode Reader Parameter Reference - Main Page](https://www.dynamsoft.com/barcode-reader/parameters/reference/?ver=latest)

The next few sections will dive into each of the samples, explaining which runtime settings are used and which scenarios they correspond to.

All of the samples come with plenty of comments in the code as well to guide you through the process of translating the user inputs to the RuntimeSettings of the scanner (or reader) instance.

Please note that most of the styling is common across the samples in this sample set. So in order to make the code clearer, we grouped the styling all in one file, `settings-css.css`. Furthermore, the samples also share the same scanner initialization code. For the sake of clarity, the initialization code was also grouped in the same JS file, `initScanner.js`, and referenced throughout the different samples in this set.

Now to explore each of the samples.

## Barcode Formats and Expected Number of Barcodes

In this sample, we visit two of the most widely used runtime settings that DBR offers, BarcodeFormatIds and ExpectedBarcodesCount.

[BarcodeFormatIds](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/format-control.html#barcodeformatids) sets the barcode formats to be read. The SDK will automatically discard any barcode results that do not belong to the specified formats. To learn of DBR's supported formats, please visit this [page](https://www.dynamsoft.com/barcode-reader/features/#Supported-Barcode-Types).

[ExpectedBarcodesCount](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/cost-control.html#expectedbarcodescount) is used to control the number of barcodes detected for each image or frame.

To learn how these two parameters can help reduce time cost and improve performance in various scenarios, please refer to this [article](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/barcode-format-and-expected-barcode-counts.html).

## Localization and Binarization

Localization and binarization are two essential steps in barcode reading. DBR comes with a variety of modes for each process, and depending on the scenario, using the right localization mode or binarization mode can provide a boost to the performance.

[LocalizationModes](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/LocalizationModes.html#localizationmodes) sets the modes and priority of those modes. Different localization modes correspond to different scenarios and barcode formats. For instance, in an interactive video scenario, it is recommended to prioritize the `Connected Blocks` and `Scan Directly` modes. If you are dealing only with 1D barcodes, then it is a good idea to have the `Lines` mode higher on the priority list. Please read through this [article](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-localization-modes.html) to learn more.

[BinarizationModes](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/BinarizationModes.html#binarizationmodes) sets the mode and priority for binarization. Like localization, the different binarization modes correspond to different situations and scenarios. To learn more about the aforementioned scenarios, please go through this [article](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-binarization-modes.html).

## Dealing with Blurry or Small Barcodes

Every now and then the library might encounter a barcode that is too blurry, causing the decoding process to fail. In other scenarios, it could encounter a barcode that is relatively very small to the entire image or frame, which we found to be a common scenario when dealing with barcodes on machinery, for instance.

Luckily, DBR comes equipped with the appropriate parameters to combat those scenarios. Namely, we will be focussing on the `DeblurModes` and `ScaleUpModes`.

The SDK comes with seven distinct deblur modes that can be used to help improve the clarity of an image, all of which are listed [here](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/DeblurModes.html?ver=latest#deblurmodes). It is recommended that the more blurry an image is, the more modes should be included in the `DeblurModes` array. To learn more about each mode, please refer to this [page](https://www.dynamsoft.com/barcode-reader/parameters/enum/parameter-mode-enums.html?ver=latest#deblurmode).

[ScaleUpModes](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/ScaleUpModes.html#scaleupmodes) are used to enlarge a barcode that is very small compared to the entire image or frame. By default, the SDK goes with the automatic mode, which allows the SDK to choose whether the barcode area needs to be enlarged, and which method to employ. The two methods are linear interpolation and nearest neighbour interpolation, each coming with a set of mode arguments that offer even more control over the enlargement process.

To learn more about the ScaleUpModes and its methods, please refer to this [article](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-scaleup-modes.html?ver=latest).

## Dealing with Deformed and Incomplete Barcodes
In the same vein as the previous sample, users might face a situation where they are scanning a deformed or incomplete barcode. Deformed barcodes usually form when the barcode is printed on an irregular surface, such as a cylindrical one, or perhaps if the barcode is on a wrinkled piece of paper. Incomplete barcodes, on the other hand, can occur due to misprinting.

To deal with both situations, DBR offers [DeformationResistingModes](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/DeformationResistingModes.html#deformationresistingmodes) for deformed barcodes, and [BarcodeComplementModes](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/BarcodeComplementModes.html#barcodecomplementmodes) for incomplete barcodes.

Please note that `DeformationResistingModes` is currently only compatible with QR and Datamatrix codes. To learn more about how this parameter helps fix the deformity in the aformentioned scenarios, please refer to this [article](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/resist-deformation.html).

Similar to `DeformationResistingModes`, `BarcodeComplementModes` is currently only compatible with QR and Datamatrix codes. To learn more about how `BarcodeComplementModes` please check out the following [article](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-set-barcode-complememt-modes.html?ver=latest).

## Region of Interest and Region Pre-detection
Usually, DBR will traverse the entire area of an image or frame to locate and decode any barcodes that are there. However, there are some situations where the user is only concerned about a specific area of an image or want to restrict the video view to a specific region. This sample demonstrates how to manually define a [RegionDefinition](https://www.dynamsoft.com/barcode-reader/programming/javascript/api-reference/global-interfaces.html#regiondefinition). Once the region is defined, DBR will only decode barcodes that are within that region.

To define the region, the top-most, left-most, right-most, and bottom-most coordinate or percentage of the region must be defined. Whether coordinate or percentage is used is defined by `regionMeasuredByPercentage`. In most cases, percentage is easier to use. Please refer to the following image to get an idea of how the percentages are taken into account:
![RegionOfInterest Percentages](https://tst.dynamsoft.com/public/samples/dbr/JS/assets/regionOfInterest.png)

To learn more about `RegionDefinition` and how to use them, please refer to this [article](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/manually-define-region-of-interest.html?ver=latest).

Region detection can also be used to pre-detect the region of interest of a large image to get several areas where the barcodes may exist to reduce processing time. The different modes of [RegionPredetectionModes](https://www.dynamsoft.com/barcode-reader/parameters/reference/image-parameter/RegionPredetectionModes.html#regionpredetectionmodes) correspond to different scenarios, some of which are clarified [here](https://www.dynamsoft.com/barcode-reader/parameters/scenario-settings/how-to-use-region-predetection.html).

## Support
If you have any questions, feel free to contact Dynamsoft support via [email](mailto:support@dynamsoft.com) or [live chat](https://www.dynamsoft.com/barcode-reader/overview/) via the "Let's Chat" button.
