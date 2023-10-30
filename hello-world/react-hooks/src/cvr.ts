import {
  CaptureVisionRouter,
  LicenseManager,
} from '@dynamsoft/dynamsoft-capture-vision-router';

CaptureVisionRouter.engineResourcePath =
  'https://npm.scannerproxy.com/cdn/@dynamsoft/dynamsoft-capture-vision-router@2.0.20-dev-20231027145739/dist/';

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense(
  'DLS2eyJoYW5kc2hha2VDb2RlIjoiNjY2Ni03Nzc3IiwibWFpblNlcnZlclVSTCI6Imh0dHBzOi8vMTkyLjE2OC44LjEyMi9kbHMvIiwib3JnYW5pemF0aW9uSUQiOiI2NjY2IiwiY2hlY2tDb2RlIjoxNTEyMTgzMzg3fQ=='
);

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=10.0.20&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

// Preload "BarcodeReader" module for reading barcodes. It will save time on the initial decoding by skipping the module loading.
CaptureVisionRouter.preloadModule(['DBR']).catch((ex) => {
  let errMsg;
  if (ex.?message.includes('network connection error')) {
    errMsg =
      'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
  } else {
    errMsg = ex.message || ex;
  }
  console.error(errMsg);
  alert(errMsg);
});
