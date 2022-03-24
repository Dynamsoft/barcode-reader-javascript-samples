/** LICENSE ALERT - README 
 * To use the library, you need to first specify a license key using the API "license" as shown below.
 */

Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9';
        
/** 
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days. 
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=9.0.0&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END 
 */

Dynamsoft.DBR.BarcodeReader.loadWasm();
let pScanner = null;
document.getElementById('readBarcode').onclick = async () => {
    try {
        const scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
        scanner.onFrameRead = results => {
            if (results.length) {
                console.log(results);
            }
        };
        scanner.onUniqueRead = (txt, result) => {
            alert(txt, result);
        };
        document.getElementById("barcodeScannerUI").appendChild(scanner.getUIElement());
        await scanner.show();
    } catch (ex) {
        alert(ex.message);
        throw ex;
    }
};