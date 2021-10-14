/// <reference path="./node_modules/dynamsoft-javascript-barcode/dist/dbr.reference.d.ts" />

/** LICENSE ALERT - README
 * The library requires a license to work, you use the API organizationID to tell the program where to fetch your license.
 * If the Organizaion ID is not specified, a 7-day (public) trial license will be used by default which is the case in this sample.
 * Note that network connection is required for this license to work.
 */

/* When using your own license, uncomment the following line and specify your Organization ID. */

// Dynamsoft.DBR.organizationID = "YOUR-ORGANIZATION-ID";

/* If you don't have a license yet, you can request a trial on this page: https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=samples */
/* For more information, please refer to https://www.dynamsoft.com/license-server/docs/about/licensefaq.html?ver=latest#how-to-use-a-trackable-license. */

/* The API "productKeys" is an alternative way to license the library, the major difference is that it does not require a network. Contact support@dynamsoft.com for more information. */

// Dynamsoft.DBR.productKeys = "YOUR-PRODUCT-KEY";

/** LICENSE ALERT - THE END */

Dynamsoft.DBR.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.0/dist/";

let pScanner: Promise<BarcodeScanner> = null;

// decode video from camera
(document.getElementById('btn-show-scanner') as HTMLButtonElement).addEventListener('click', async () => {
    try {
        let scanner = await (pScanner = pScanner || Dynamsoft.DBR.BarcodeScanner.createInstance());
        scanner.onFrameRead = results => {
            if (results.length) {
                console.log(results);
            }
        };
        scanner.onUnduplicatedRead = (txt, result) => {
            if (txt.indexOf("Attention(exceptionCode") !== -1) {
                alert((<any>result).exception.message);
            } else
                alert(result.barcodeFormatString + ': ' + txt);
        };
        await scanner.show();
    } catch (ex) {
        alert(ex.message);
        throw ex;
    }
});