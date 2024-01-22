import { CoreModule } from 'dynamsoft-core';
import { LicenseManager } from 'dynamsoft-license';
import '@dynamsoft/dynamsoft-barcode-reader';
// import 'dynamsoft-camera-enhancer';

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense(
  'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9'
);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=9.6.20&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

CoreModule.engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.0.0/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.0.30/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.0.31/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.0.20/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.0.30/dist/",
  dbr: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-barcode-reader@10.0.20-dev-20240115142402/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.1/dist/"
};

// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(['DBR']);
