import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'keillion-dynamsoft-javascript-barcode'
@Component({
  selector: 'app-video-decode',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class VideoDecodeComponent implements OnInit {
  pScanner = null;

  async ngOnInit(): Promise<void> {
    try {
      const scanner = await (this.pScanner = BarcodeScanner.createInstance());
      scanner.setUIElement((document.querySelector('.component-barcode-scanner') as any));
      scanner.onFrameRead = (results: any) => {
        for (const result of results) {
          console.log(result.barcodeText);
        }
      };
      scanner.onUniqueRead = (txt, result) => {
        alert(txt);
      };
      await scanner.open();
    } catch (ex) {
      console.error(ex);
    }
  }
  async ngOnDestroy() {
    if (this.pScanner) {
      (await this.pScanner).destroyContext();
      console.log('BarcodeScanner Component Unmount');
    }
  }
}
