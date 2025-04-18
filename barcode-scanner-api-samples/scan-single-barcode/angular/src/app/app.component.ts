import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarcodeScanner } from '@dynamsoft/dynamsoft-barcode-reader-bundle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';

  async ngAfterViewInit(): Promise<void> {
    const config = {
      license: "YOUR-LICENSE-KEY",
      container: ".barcode-scanner-view",
      engineResourcePaths: {
        rootDirectory: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },
      scannerViewConfig: {
        cameraEnhancerUIPath: "https://npm.scannerproxy.com:802/cdn/@dynamsoft/dynamsoft-barcode-reader-bundle@10.5.1000-dev-20250417174703/dist/",
      },
    }
    const barcodeScanner = new BarcodeScanner(config);
    barcodeScanner.launch().then((result) => {
      console.log(result);
    });
  }
}
