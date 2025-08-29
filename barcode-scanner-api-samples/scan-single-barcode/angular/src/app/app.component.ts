import { Component, ElementRef, ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerConfig } from 'dynamsoft-barcode-reader-bundle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular';
  barcodeScanner: BarcodeScanner | null = null;

  @ViewChild('barcodeScannerViewRef') barcodeScannerViewRef!: ElementRef<HTMLDivElement>;

  async ngAfterViewInit(): Promise<void> {
    // Configuration object for initializing the BarcodeScanner instance
    const config: BarcodeScannerConfig = {
      license: "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", // Replace with your Dynamsoft license key

      // Specify where to render the scanner UI
      // If container is not specified, the UI will take up the full screen
      container: this.barcodeScannerViewRef.nativeElement, 

      // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
      uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.0.6000/dist/ui/barcode-scanner.ui.xml",

      // showUploadImageButton: true,
      // scannerViewConfig: {
      //   showFlashButton: true,
      //   cameraSwitchControl: "toggleFrontBack",
      // },

      // Specify custom paths for the engine resources
      engineResourcePaths: {
        rootDirectory: "https://cdn.jsdelivr.net/npm/",
      },
    }

    // Create an instance of the BarcodeScanner with the provided configuration
    this.barcodeScanner = new BarcodeScanner(config);

    // Launch the scanner; once a barcode is detected, display its text in an alert
    let result = await this.barcodeScanner.launch();
    if (result.barcodeResults.length) {
      alert(result.barcodeResults[0].text);
    }
  }
  async ngOnDestroy(): Promise<void> { 
    // Dispose of the barcode scanner when the component unmounts
    this.barcodeScanner?.dispose();
  }
}
