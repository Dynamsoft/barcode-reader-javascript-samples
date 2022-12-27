# Use Case Sample Set

This sample set explores some of the most popular real world applications of Dynamsoft's barcode reader library:

- [fill a form with barcode reading](./1.fill-a-form-with-barcode-reading.html)
- [read driver license](./2.read-a-drivers-license.html)

## Filling a Form using Barcode Scanner

The first sample demonstrates how to automatically fill out a form using barcode scanning.

Users can click a button to read barcodes from a video, and once a barcode is scanned, the barcode result will be filled to the corresponding form field. You can customize it further to show a tooltip-style button for users to click and open the scanner.

## Filling Out Driver's License Info via Barcode Scanner

Another popular usage scenario is to scan the barcodes on driver licenses for automatic ID data extraction. 

With the barcode reader library, you can get a large text string from the driver license PDF417 barcode. You can then parse the string and get the value of corresponding fields.

In this use case, we want the scanner to pick up PDF417 barcode only, so we set `barcodeFormatIds` in `RuntimeSettings` to `BF_PDF417`. 

The core information extraction happens in the function `extractResultAlert()`, in which we are using the SDK **Dynamsoft Code Parser** to parse the raw string and get the actual encoded information.

## Support

If you have any questions, feel free to [contact Dynamsoft](https://www.dynamsoft.com/company/contact/).
