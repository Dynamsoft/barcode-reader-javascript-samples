import Dynamsoft from "dynamsoft-javascript-barcode";
Dynamsoft.BarcodeReader.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7.4.0-v1/dist/";
Dynamsoft.BarcodeReader.productKeys = "f0068MgAAAGuU/0UxO4tDnbZTOAi22E2trYhJ9vJjh5ApvJVDbCqybz1gs7oWNBSBDZ2TEJB6LSQXKdVBKcrwRTcB3WUPN2k=";
Dynamsoft.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default Dynamsoft;
