import DBR from "dynamsoft-javascript-barcode";

/** LICENSE ALERT - README
 * The library requires a license to work, the APIs organizationID and handshakeCode specify how to acquire a license.
 * If nothing is specified, a 7-day (public) trial license will be used by default which is the case in this sample.
 * Note that network connection is required for this license to work.
 */

/* When using your own license, please uncomment the following lines and fill in your own information. */
/* For more information, please refer to https://www.dynamsoft.com/license-tracking/docs/about/licensefaq.html?ver=latest#how-to-use-a-trackable-license. */

// DBR.BarcodeReader.organizationID = "YOUR-ORGANIZATION-ID";
// DBR.BarcodeReader.handshakeCode = "A-SPECIFIC-HANDSHAKECODE";
// DBR.BarcodeReader.sessionPassword = "PASSWORD-TO-PROTECT-YOUR-LICENSE"; // Important field to protect your license.
// DBR.BarcodeReader.licenseServer = ["YOUR-OWN-MAIN-LTS", "YOUR-OWN-STANDBY-LTS"]; // Ignore this line if you are using Dynamsoft-hosting LTS

/* The API "productKeys" is an alternative way to license the library, the major difference is that it does not require a network. Contact support@dynamsoft.com for more information. */

// DBR.BarcodeReader.productKeys = "YOUR-PRODUCT-KEY";

/** LICENSE ALERT - THE END */

DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.5/dist/";

// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.

export default DBR;
