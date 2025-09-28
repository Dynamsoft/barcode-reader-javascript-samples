// Configuration object for initializing the BarcodeScanner instance. Refer to https://www.dynamsoft.com/barcode-reader/docs/web/programming/javascript/api-reference/barcode-scanner.html#barcodescannerconfig
let config = {
  license: "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", // Replace with your Dynamsoft license key
  container: document.querySelector(".barcode-scanner-view"), // Specify where to render the scanner UI

  // showUploadImageButton: true,
  // scannerViewConfig: {
  //   showFlashButton: true,
  //   cameraSwitchControl: "toggleFrontBack",
  // },
};

// Create a new instance of the Dynamsoft Barcode Scanner
const barcodeScanner = new Dynamsoft.BarcodeScanner(config);

// Launch the scanner and handle the scanned result
barcodeScanner.launch().then((result) => {
  // Display the first detected barcode's text in an alert
  if (result.barcodeResults.length) {
    alert(result.barcodeResults[0].text);
  }
});
