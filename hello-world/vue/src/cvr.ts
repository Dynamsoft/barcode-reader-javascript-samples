import "dynamsoft-license";
import "dynamsoft-capture-vision-router";
import "dynamsoft-barcode-reader";

import { CoreModule } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9");

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.2.10&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

CoreModule.engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.2.0/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.2.10/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.2.10/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.2.10/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.2.10/dist/",
  dbr: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader@10.2.10/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.2/dist/"
};

// Preload "LabelRecogznier" module for recognizing text. It will save time on the initial recognizing by skipping the module loading.
CoreModule.loadWasm(["DBR"]).catch((ex) => {
  let errMsg = ex.message || ex;
  console.error(errMsg);
  alert(errMsg);
});