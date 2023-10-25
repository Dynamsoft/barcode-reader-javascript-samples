# Read Barcodes and Fill Form Fields

It's difficult to type long text on mobile devices, but if that text is encoded in a barcode, we can use the sdk to read the barcode and automatically enter the text.

The following code shows how to automatically invoke the sdk to read a barcode and fill in an input box.

```html
<input id="input-to-fill" type="text" readonly="true" placeholder="Barcode Result">
```

```javascript
let scanner = null;
Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9';
(async function () {
    document.getElementById("input-to-fill").addEventListener('click', async function () {
        try {
            scanner = scanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();
            scanner.onUniqueRead = (txt, result) => {
                this.value = result.barcodeText;
                scanner.hide();
            };
            await scanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    });
})();
```

The following sample demonstrates how to utilize the SDK to fill out form fields.

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/4.use-case/1.fill-a-form-with-barcode-reading.html">Read Barcodes and Fill Form Fields - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/4.use-case/1.fill-a-form-with-barcode-reading.html">Read Barcodes and Fill Form Fields - Source Code</a>

# Read the PDF417 Barcode on the Driver's License

The PDF417 barcode on an AAMVA compatible driver's license contains a lot of information which is encoded following the DL/ID Card Design Standard. Together with a simple parse function, we can use the SDK to read and extract the information.

The following official sample shows how to use the sdk to read and extract driver's license information.

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/4.use-case/2.read-a-drivers-license.html">Read the PDF417 Barcode on the Driver&apos;s License - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/4.use-case/2.read-a-drivers-license.html">Read the PDF417 Barcode on the Driver&apos;s License - Source Code</a>

Also see [Driver's License Scanner SDK for Mobile and Web](https://www.dynamsoft.com/use-cases/driver-license/).

# Read barcodes via camera and show result texts on the video

When the SDK picks up a barcode in video stream, it will highlight them with built-in style automatically. But it is also possible to show the text of the barcode on the video with the help of the function 'convertToPageCoordinates()' or 'convertToClientCoordinates()'.

The following official sample shows how to show result texts on the video.

* <a target = "_blank" href="https://demo.dynamsoft.com/Samples/DBR/JS/4.use-case/3.show-result-texts-on-the-video.html">Read barcodes via camera and show result texts on the video - Demo</a>
* <a target = "_blank" href="https://github.com/Dynamsoft/barcode-reader-javascript-samples/blob/main/4.use-case/3.show-result-texts-on-the-video.html">Read barcodes via camera and show result texts on the video - Source Code</a>

## Support

If you have any questions, feel free to [contact Dynamsoft](https://www.dynamsoft.com/company/contact/).
