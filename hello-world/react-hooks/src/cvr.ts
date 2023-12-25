import { CoreModule } from '@dynamsoft/dynamsoft-core';
import { LicenseManager } from '@dynamsoft/dynamsoft-license';
import '@dynamsoft/dynamsoft-barcode-reader';

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
  std: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-capture-vision-std@1.0.0-dev-20231222202916/dist/",
  dip: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-image-processing@2.0.30-dev-20231219135109/dist/",
  core: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-core@3.0.20-dev-20231222181259/dist/",
  license: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-license@3.0.0-dev-20231222153411/dist/",
  cvr: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-capture-vision-router@2.0.20-dev-20231222144235/dist/",
  dbr: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-barcode-reader@10.0.20-dev-20231222153407/dist/",
  dce: "https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-camera-enhancer@4.0.1-dev-20231222174818/dist/"
};

// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CoreModule.loadWasm(['DBR']).catch((ex) => {
  let errMsg;
  if (ex.message?.includes('network connection error')) {
    errMsg =
      'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
  } else {
    errMsg = ex.message || ex;
  }
  console.error(errMsg);
  alert(errMsg);
});