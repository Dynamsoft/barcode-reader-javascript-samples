import DBR from "dynamsoft-javascript-barcode";

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

DBR.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.8.3/dist/";

let pScanner = null;
if (document.getElementById('readBarcode')) {
    document.getElementById('readBarcode').onclick = async function() {
        try {
            let scanner = await (pScanner = pScanner || DBR.BarcodeScanner.createInstance());
            scanner.onFrameRead = results => {
                console.log("Barcodes on one frame:");
                for (let result of results) {
                    console.log(result.barcodeFormatString + ": " + result.barcodeText);
                }
            };
            scanner.onUnduplicatedRead = (txt, result) => {
                alert(txt);
                console.log("Unique Code Found: " + result);
            }
            await scanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    };
}