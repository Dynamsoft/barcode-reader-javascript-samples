import { CoreModule, LicenseManager } from "dynamsoft-barcode-reader-bundle";

// Configures the paths where the .wasm files and other necessary resources for modules are located.
CoreModule.engineResourcePaths.rootDirectory = "https://cdn.jsdelivr.net/npm/";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=samples&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/user-guide/index.html?ver=11.2.4000&cVer=true#specify-the-license&utm_source=samples or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Optional. Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm();
