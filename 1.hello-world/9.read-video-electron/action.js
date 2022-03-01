window.onload = function () {
    /** LICENSE ALERT - README
     * 
     * The library requires a license to work.
     * If the license is not specified, a free public trial license will be used by default which is the case in this sample.
     * Note that network connection is required for the public license to work.
     * For more info, please check https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=8.8.7&utm_source=github#specify-the-license or contact support@dynamsoft.com.
     */

    /* When using your own license, uncomment the following line and specify your license. */

    // Dynamsoft.DBR.BarcodeReader.license = "YOUR-ORGANIZATION-ID or YOUR-HANDSHAKECODE or AN-OFFLINE-LICENSE or ANY-OTHER-TYPE-OF-SUPPORTED-LICENSE-STRING";

    /** LICENSE ALERT - THE END */

    Dynamsoft.DBR.BarcodeReader.loadWasm();
    document.getElementById('readBarcode').onclick = async () => {
        try {
            const scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
            scanner.onFrameRead = results => {
                if (results.length) {
                    console.log(results);
                }
            };
            scanner.onUnduplicatedRead = (txt, result) => {
                alert(txt, result);
            };
            document.getElementById("barcodeScannerUI").appendChild(scanner.getUIElement());
            await scanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    };
}