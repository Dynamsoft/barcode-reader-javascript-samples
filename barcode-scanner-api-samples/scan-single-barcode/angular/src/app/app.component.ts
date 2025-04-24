import { Component } from '@angular/core';
import { BarcodeScanner } from '@dynamsoft/dynamsoft-barcode-reader-bundle';

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

            // Specify custom paths for the engine resources
            engineResourcePaths: {
                rootDirectory: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
            },

            // Configuration for the scanner UI
            scannerViewConfig: {
                // Specify the path for the definition file "barcode-scanner.ui.xml" for the scanner view.
                cameraEnhancerUIPath: "https://cdn.jsdelivr.net/npm/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
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
