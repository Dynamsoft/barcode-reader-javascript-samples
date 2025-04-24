import { Component } from '@angular/core';
import { BarcodeScanner } from 'dynamsoft-barcode-reader-bundle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular';

  async ngAfterViewInit(): Promise<void> {
    // Configuration object for initializing the BarcodeScanner instance
    const config = {
      license: "YOUR-LICENSE-KEY", // Replace with your Dynamsoft license key
      container: ".barcode-scanner-view", // Specify where to render the scanner UI

      // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
      uiPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.3000/dist/",

      // Specify custom paths for the engine resources
      engineResourcePaths: {
        rootDirectory: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.3000/dist/",
      },
    }

    // Create an instance of the BarcodeScanner with the provided configuration
    const barcodeScanner = new BarcodeScanner(config);

    // Launch the scanner; once a barcode is detected, display its text in an alert
    barcodeScanner.launch().then((result) => {
      alert(result.barcodeResults[0].text);
    });
  }
}
