import DBR from "dynamsoft-javascript-barcode";
DBR.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.2.3/dist/";
/**
 * Please note that the organizationID '200001' corresponds to Dynamsoft's public trial license which is reserved for public samples.
 * When hosting the sample in your own environment, please obtain a private trial license or a full license by contacting the
 * Dynamsoft Support Team via support@dynamsoft.com
 */
DBR.BarcodeReader.organizationID = "100448235";
// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default DBR;
