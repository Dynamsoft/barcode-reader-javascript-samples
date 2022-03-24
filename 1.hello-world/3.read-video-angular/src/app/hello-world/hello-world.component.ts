import { Component, OnInit } from '@angular/core';
import '../dbr'; // import side effects. The license, engineResourcePath, so on.
import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {
  bShowScanner = true;
  bShowImgDecode = false;
  async ngOnInit(): Promise<void> {
    // Load the library on page load to speed things up.
    try {
      await BarcodeScanner.loadWasm();
    } catch (ex) {
      alert(ex.message);
    }
  }
  showScanner(): void {
    this.bShowScanner = true;
    this.bShowImgDecode = false;
  }
  showImgDecode(): void {
    this.bShowScanner = false;
    this.bShowImgDecode = true;
  }
}
