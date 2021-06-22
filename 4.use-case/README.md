# Use Case Sample Set

This sample set explores some of the most popular real world applications of the `DBR` library that our team has encountered throughout our many years of experience.

### Filling a Form Field with the Barcode Scanner
The first sample will  demonstrate how to implement one of, if not the most common usage scenario our library encounters: Filling a form or form field based on the barcode result. 

Usually this scenario involves oopening the video scanner on the click of a button, and then once the barcode is scanned, the barcode result would show up in a corresponding form field. In some cases, the form field would come with a tooltip style of button to allow the user to open the scanner on the click of that icon.

This is done in the `onUnduplicatedRead` method of the `scanner` object, so that it is almost instantaneous with finding the barcode.

### Filling out Driver's License Info via the Barcode Scanner
Another very popular scenario is extracting the driver license info that is encoded on the back of driver licenses into a readable text. The text that is normally encoded in the barcode comes as one large string, separated by abbreviations only. The string will in turn require parsing and mapping to have all the info in its corresponding fields.

In order to ensure that the scanner picks up only PDF417 barcode types, we first ensure that the `barcodeFormatIds` of the `RuntimeSettings` is set to `BF_PDF417`. This way, the scanner is better configured to pick up the driver license barcodes.

The core text extraction happens in the function `extractInformation`. Please pay special attention to the `driverLicenseFields` variable, which contains all the mapping defintions for the different abbreviations.

By following a similar extraction and mapping mechanism, you can easily implement this feature in your own web application.
