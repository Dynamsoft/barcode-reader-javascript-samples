import { Component, OnInit } from '@angular/core';
import DBR from '../dbr';
@Component({
  selector: 'app-video-decode',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class VideoDecodeComponent implements OnInit {
  pScanner = null;

  async ngOnInit(): Promise<void> {
    try {
      const scanner = await (this.pScanner = DBR.BarcodeScanner.createInstance());
      scanner.setUIElement((document.querySelector('.component-barcode-scanner') as any));
      scanner.onFrameRead = (results: any) => {
        for (const result of results) {
          console.log(result.barcodeText);
        }
      };
      scanner.onUnduplicatedRead = (txt, result) => {
        alert(txt);
      };
      await scanner.open();
    } catch (ex) {
      console.error(ex);
    }
  }
  async ngOnDestroy() {
    if (this.pScanner) {
      (await this.pScanner).destroy();
      console.log('BarcodeScanner Component Unmount');
    }
  }
}
