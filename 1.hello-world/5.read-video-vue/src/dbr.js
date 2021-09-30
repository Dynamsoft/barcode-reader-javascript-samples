import DBR from "dynamsoft-javascript-barcode";

/** LICENSE ALERT - README
 * The library requires a license to work, you use the API organizationID to tell the program where to fetch your license.
 * If the Organizaion ID is not specified, a 7-day (public) trial license will be used by default which is the case in this sample.
 * Note that network connection is required for this license to work.
 */

/* When using your own license, uncomment the following line and specify your Organization ID. */

// DBR.BarcodeReader.organizationID = "YOUR-ORGANIZATION-ID";

/* If you don't have a license yet, you can request a trial on this page: https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=github */
/* For more information, please refer to https://www.dynamsoft.com/license-tracking/docs/about/licensefaq.html?ver=latest#how-to-use-a-trackable-license. */

/* The API "productKeys" is an alternative way to license the library, the major difference is that it does not require a network. Contact support@dynamsoft.com for more information. */

// DBR.BarcodeReader.productKeys = "YOUR-PRODUCT-KEY";

/** LICENSE ALERT - THE END */

DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.6.3/dist/";

// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.

export default DBR;