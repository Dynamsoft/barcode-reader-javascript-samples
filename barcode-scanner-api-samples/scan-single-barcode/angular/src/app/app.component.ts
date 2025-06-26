import { Component, ElementRef, ViewChild } from '@angular/core';
import { BarcodeScanner, BarcodeScannerConfig, CameraEnhancer, CameraView, CaptureVisionRouter } from 'dynamsoft-barcode-reader-bundle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular';

  @ViewChild('scannerView') scannerView!: ElementRef<HTMLDivElement>;

  async ngAfterViewInit(): Promise<void> {
    // Configuration object for initializing the BarcodeScanner instance
    const config: BarcodeScannerConfig = {
      license: "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9", // Replace with your Dynamsoft license key
      container: this.scannerView.nativeElement, // Specify where to render the scanner UI

      // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
      uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@11.0.3000/dist/",

      // Specify custom paths for the engine resources
      engineResourcePaths: {
        rootDirectory: "https://cdn.jsdelivr.net/npm/",
      },
    }

    // Create an instance of the BarcodeScanner with the provided configuration
    const barcodeScanner = new BarcodeScanner(config);

    // Launch the scanner; once a barcode is detected, display its text in an alert
    barcodeScanner.launch().then((result) => {
      if (result.barcodeResults.length) {
        alert(result.barcodeResults[0].text);
      }
    });
  }
}
