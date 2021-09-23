import DBR from "dynamsoft-javascript-barcode";

/** LICENSE ALERT - README
 * The library requires a license to work. If no license is specified, a 7-day built-in
 * trial license will be used by default which is the case in this sample.
 * Note that network connection is required for this built-in license to work.
 */

/* When using your own license, uncomment the following line and specify your own license string. */

// DBR.initLicense("DLS2eyJvcmdhbml6YXR****");

/** If you don't have a license yet, you can request a trial on this page:
 * https://www.dynamsoft.com/customer/license/trialLicense?product=dbr&package=js&utm_source=sample
 * or, you can purchase a license on this page:
 * https://www.dynamsoft.com/store/dynamsoft-barcode-reader/#js?product=dbr&package=js&utm_source=sample
 */

/** LICENSE ALERT - THE END */

DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.6.1/dist/";

export default DBR;
